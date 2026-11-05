# EngineX implementation guide

Verified on 2026-11-04 by building and rendering the four validation scenes. For the operation catalogue (voice, sound, 3D, concat, duck), see `enginex-map.md`. Always `describe_operation` before a run, because parameters change.

## Files (all in `assets/`)

| File | What it is |
|---|---|
| `page-template.html` | The house style kit: the H library, `ball`, `glow`, `pill`, `arrow`, `sky`, `finish`, the presenter rig (`person`, `rig`, `mixPose`, `poseAt`, `chair`, `desk`, `laptop`…) and the `hf-seek` glue. **Do not edit.** It is a copy of the `youtube-motion-graphics` template. |
| `comp.js` | The composition engine (slots A–G, fit helpers, arcs, stagger, camera, wipes, audit, debug grid). |
| `scene-kit.js` | Shared helpers: `labelTag`, `barTag`, `bgFlat`, `softBlobs`, `rocky`, `earth`, `SUN`, `TAGC` colours. |
| `build.py` | `py build.py scene.js outdir [--debug-grid] [--audio cues.html]` assembles template + comp + kit + scene + glue into `outdir/index.html` and a zip. |
| `pointing-hand.js` | The only hand allowed for touches. |

A scene file defines `const DURATION = N;` and `function explainer(x, W, H_, t)`. It works in logical 1280×720 units; use `COMP.slots` fractions × W or H_.

**Gotchas found during validation:**
1. The template's demo section (`earth`, `SUN`) is cut out by `build.py`. Shared pieces live in `scene-kit.js`.
2. A runtime error renders as a **plain navy frame** (all three first snapshots were 8516-byte blanks). Always run the smoke test first. If a frame is blank, `motion-graphic/check` gives the error text (its output is long: look for `page_error`).
3. Building `--debug-grid` overwrites `outdir/index.html`. Build debug first, then final, or just use the zips: `<name>.zip` and `<name>_debug.zip` are separate.
4. `H.mix` returns an array: wrap it in `H.rgba(H.mix(a, b, u), 1)`.

## Per shot

```bash
cd .claude/skills/channel-motion-style
node tests/comp.test.js                                    # engine still matches STUDY numbers
py assets/build.py <scene>.js <out> --debug-grid           # guides ON (validation only)
py assets/build.py <scene>.js <out>                        # final, no guides (asserted)
node tests/smoke.js <out>/index.html 0 1.5 3               # catches ReferenceErrors in about 1 s, without EngineX
node tests/audit.js <scene>.js                             # placements vs safe areas
```

Then on EngineX:
1. `create_upload_url` for each zip, then `curl -sSf -T <zip> "<url>"`.
2. `motion-graphic/snapshot` with `{project: <debug key>, at: [landing times + mid-transition times]}` (about 2 s each). Download the stills via `sign_output` and **look at them**:
   - the slots on the guide lines;
   - eye lines;
   - label rows;
   - collisions in the middle of transitions.
3. `motion-graphic/render` with `{project: <final key>, format: "mp4", quality: "standard"}` for a draft (12 s took 11 s on the GPU), then `quality: "high"`. Add `resolution: "landscape-4k"` if wanted.
4. Narration: `emotive-speech/speak`, and pass it as the render's `audio`. Sound effects come from `find_sound`, passed as `media` with `<audio data-start>` cues via `build.py --audio`.
5. Join chapters with `video/concat`.

## Shot record (fill one per shot in the storyboard card)
Scene ID · Shot ID · Narration segment · Layout(s) · Assets · Start and end states · Duration · Camera · Transition · Page file and TL keys · Snapshot job · Render job.

## What EngineX cannot do (honest list)
- Snapshot and render outputs must be downloaded and looked at. Nothing checks *composition* automatically: `audit.js` checks declared placements, not pixels.
- `check` verifies runtime errors, text overflow and contrast. It does not judge art.
- There is no in-page WebAudio capture; sound comes from library files (see `enginex-map.md`).
