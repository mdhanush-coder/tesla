"""Assemble an EngineX page: style kit (template) + comp.js + scene-kit.js + your scene file + glue. Stdlib only.
   py build.py scene.js outdir [--debug-grid] [--audio cues.html]
   Writes outdir/index.html and outdir/<name>.zip (index.html at the zip root, what motion-graphic/render wants).
   scene.js must define `const DURATION = <seconds>;` and `function explainer(x, W, H_, t)`.
   --debug-grid draws the study's guide lines OVER the frame for validation snapshots. Never use it for a final render."""
import re, sys, zipfile, pathlib

here = pathlib.Path(__file__).parent
args = [a for a in sys.argv[1:] if not a.startswith('--')]
scene_path, out = pathlib.Path(args[0]), pathlib.Path(args[1])
debug = '--debug-grid' in sys.argv
audio = pathlib.Path(sys.argv[sys.argv.index('--audio') + 1]).read_text(encoding='utf-8') if '--audio' in sys.argv else ''

tpl = (here / 'page-template.html').read_text(encoding='utf-8')
bar = '// ' + '=' * 77
i_scenes = tpl.index('// SCENES:'); i_scenes = tpl.rindex(bar, 0, i_scenes)
i_glue = tpl.index('// GLUE'); i_glue = tpl.rindex(bar, 0, i_glue)
head, glue = tpl[:i_scenes], tpl[i_glue:]
scene = scene_path.read_text(encoding='utf-8')
m = re.search(r'const DURATION\s*=\s*([\d.]+)', scene)
assert m, 'scene.js must define const DURATION = <seconds>;'
head = re.sub(r'data-duration="[\d.]+"', f'data-duration="{m.group(1)}"', head, count=1)
head = re.sub(r'<!-- <audio.*?-->', audio, head, count=1, flags=re.S) if audio else head
if debug:
    glue = glue.replace('finish(ctx, LW, LH, t);', 'finish(ctx, LW, LH, t); COMP.debugGrid(ctx, LW, LH);')
    assert 'COMP.debugGrid' in glue
kit = ''.join((here / f).read_text(encoding='utf-8') + '\n' for f in ('comp.js', 'scene-kit.js'))
html = head + '\n' + kit + scene + '\n' + glue
for need in ('COMP', 'labelTag'):
    assert f'const {need}' in html or f'function {need}' in html, f'{need} missing from page'
assert debug or 'debugGrid(ctx' not in html, 'debug overlay leaked into a final build'
out.mkdir(parents=True, exist_ok=True)
(out / 'index.html').write_text(html, encoding='utf-8')
with zipfile.ZipFile(out / (scene_path.stem + ('_debug' if debug else '') + '.zip'), 'w', zipfile.ZIP_DEFLATED) as z:
    z.write(out / 'index.html', 'index.html')
print('built', out / 'index.html', 'duration', m.group(1), 'debug' if debug else 'final')
