# Flat-Vector Science: style guide (graphics only)

Distilled from `vectoranimation.md` / `flat-space.js`. Function names refer to the style kit in `assets/page-template.html`. All sizes are logical 1280×720 units.

## Contents
1. Look and palette
2. Light, shading and depth
3. Backgrounds and finishing
4. Typography and labels
5. Numbers and data
6. Motion and timing
7. Camera and transitions
8. Explaining devices
9. Composition
10. Adapting to any topic
11. 3D inside the look

## 1. Look and palette
Flat-vector illustration with no outlines. Every solid is a rich multi-stop gradient. Colours come from `C`:
- **sky:** `#090b2c` → `#18134f` → `#3a1a6c`
- **ink:** `#141846`
- **accents:**
  - `yellow #ffd23f`: highlight word, key number, success-ish
  - `cyan #56e8ff`: arrows, flow, info
  - `green #38e08e`: right
  - `red #ff3b5c`: wrong or error
  - `pink #ff5d8f`: tags
  - `violet #8b5cff`
- **ball triads** `[light, mid, dark]`: `C.teal`, `C.orange`, `C.tan`. Planets use `PL.magenta`, `PL.coral`, `PL.teal`, `PL.moon`.

A new subject gets its own triad in the same saturation: a light, nearly white tint, a vivid mid, and a deep shade pushed toward blue or violet.

## 2. Light, shading and depth
- One light, from the upper left (`la = -2.25`), everywhere.
- `ball()` is the core primitive: a linear gradient, two **stepped flat shadow crescents** at the lower right (`sha` ≈ 0.4–0.55), and a white **rim crescent** at the upper left. Build round things from it. Build other shapes the same way: base gradient, then a flat darker crescent or offset shape, then a thin light rim.
- Self-luminous things (stars, fire, screens) use `sha` ≈ 0.15, a stronger rim, and a big `glow()`.
- Depth comes from soft radial `glow()` halos behind important objects, star parallax (`sky()` with cam `x`, `y`, `z`), scale, and drop shadows `rgba(10,8,46,0.4)` offset slightly down. Never use blur.
- Planets: `planet()` with bands, back and front ring halves, and a limb atmosphere on the lit side.

## 3. Backgrounds and finishing
- `sky()` (a diagonal navy→violet gradient, nebula glows, parallax stars and sparkles) is **one environment, not the default stage**. Use it for space, history, mystery and transitions. Per `scene-grammar.md`, most beats get their own full illustrated place with a bold flat palette (rooms, streets, sky, ocean, cross-sections).
- `finish()` runs on every frame: an overlay of static fbm mottling (α 0.12) plus a 256 px grain tile jittered per frame at 24 fps (α 0.09). It removes gradient banding and is what makes the look read as printed. Never remove it or weaken it. The template glue already calls it.

## 4. Typography and labels
- Fonts:
  - **Nunito 900** for headlines, words in the title and numbers;
  - **Nunito 800** for secondary captions;
  - Fredoka is loaded as a fallback.
- `text()` is flat text with a long shadow (`rgba(10,8,46,0.55)`, offset 3%/7% of the font size). Use it for all text on the sky.
- `pill()` is a rounded label: drop shadow, gloss strip, ink text, optional pointer (`ptr`) pointing at the object. Backgrounds: white by default, `C.yellow` for the hero, `C.cyan`, `C.green` or `C.red` for state.
- **Hook title:** words pop in one at a time (`back`, stagger 0.12–0.13 s, rising 40 px). The key word is yellow. After about 1.6 s the title shrinks and glides into the **corner header pill** (top-left, 28 px), which stays for the rest of the chapter.
- Takeaway: two lines, white then yellow, popping in 0.25 s apart, optionally with the rounded `drawArrowGlyph` in front of the second line and twinkling sparks.
- Minimum sizes: headline 44, any label the story depends on 28, key number 64. Typical: title 84–88, takeaway 64–76, number 96–150.

## 5. Numbers and data
- **Counters** ease up with `v = target * seg^2.3`, use thousands separators, and have a unit word beside them (800 weight, `#bfe9ff`). On landing, the number turns yellow and pops (`1 + 0.22·sin`). Add `burst()`, and `flare()` for the biggest one.
- **Progress, percent and accuracy** become physical: a planet's ring fills, or rounded bars grow (gradient `#ffe680`→`#ff8d3f`, radius = width/2, drop shadow).
- Show "from X" in a muted colour first, so the change reads.

## 6. Motion and timing
- `back(u, s)`: an overshoot pop for anything appearing (s 1.2 soft, 2–2.2 snappy for badges).
- `eo`: arrivals and settling. `eio`: camera moves, draw-ons, morphs. `H.ease.in`: dives that accelerate.
- `seg(t, a, b)` turns times into progress. All times live in one `TL` object.
- Durations:
  - pops 0.3–0.4 s;
  - draw-ons 0.5–0.6 s;
  - camera moves 0.5–1.3 s;
  - big zoom-outs about 1.25 s;
  - scene wipes about 0.9 s.
- Nothing is ever dead still:
  - bob `sin(t·1.8–2.4)·6–10 px`;
  - slow drift (`t·4–14 px`);
  - glows pulse;
  - stars twinkle;
  - characters blink every ~3.3 s.
- The pace is about one visible change every 1–2 s.

## 7. Camera and transitions
The reference changes scene in four ways. Use these, not generic cuts or wipes.
1. **Scale pull-back** (`exA` zoom): the world scale goes `s = exp(lerp(0, log(0.06), eio))` while the stars zoom with `z`. Objects shrink until many of them become a pattern (a galaxy of dots, a crowd, a texture). Use it to show quantity or context.
2. **Foreground-planet sweep** (`explainer()`): a huge `planet()` (r ≈ 880) crosses from `W+980` to `-980` over ~0.9 s with eio. The scene underneath swaps when its centre passes x = 640. Use it for a new topic or place.
3. **Dive-in bloom** (`exB` → `exC`): the camera scales ×16 into a glowing object (`H.ease.in`), a radial whiteout (`#fff6d0` → `#8ff0ff` → `#6a4cff`) covers the swap, then the new scene settles from `1 + 1.3·(1 - eo)` zoom. Use it for "inside", detail and mechanism.
4. **Camera tilt** (`exC` takeaway): the sky's `y` slides, the old elements slide up and fade, and a horizon planet rises. Use it for the conclusion.

Inside a scene:
- small punch-ins (zoom ×1.3 toward the detail, then back);
- a parallax travel (`sky` cam `x`);
- a hook pull-back at the start (`z = 1 + 1.8·(1 - eo(seg(t, 0, 1.4)))`).

## 8. Explaining devices
- **Cause and flow:** `arrow(P, prog, col, lw, {dots:true})`, a chunky dotted rounded cubic in cyan (red for an error signal), drawn on with eio, with the head appearing as it draws. Small glowing dots can travel along it to show flow.
- **Labels land on what they label:** a pill pops beside or above the object right after the object arrives (≈ +0.3 s), with its pointer toward the object.
- **Cycles:** a dotted elliptical loop with three or four pill stations. The active station is bigger, coloured and glowing.
- **Wrong and right:** speech `bubble()`; `badge()` ✗/✓ popping with snappy overshoot. Wrong also gets a red radial edge flash, a 0.4 s shake and a worried face. Right gets a burst and a happy face.
- **Emphasis on the key moment:** a number or object pop, plus `flare()` rays, `burst()` sparks, a white flash on a bar, and a short hold before it.
- **Legend pills** for encodings ("1 dot = 1 example").
- **People:** the house presenter, `person()` (see `character-recipe.md`). Real public figures appear only as a featureless silhouette.
- **Mascot characters (optional):** big-eyed round `ball()` bodies built with `eye()` (white, dark pupil, two catchlights, a blink, a happy arc). Use them only when a non-human character helps the story.

## 9. Composition
- The hero object takes about ⅓ of the frame width, off-centre. Labels sit close to it. Key numbers go lower-left or in a right-hand column.
- Keep 64 px side margins. The header pill sits at top-left (≈ 190, 44); a corner note sits at top-right.
- Fill the frame. Keep one focal point per beat, and dim or shrink the rest.

## 10. Adapting to any topic
- **Technology or AI:** devices and chips as rounded `ball`/`rr` forms with gradient faces, data as glowing dots along dotted arrows, networks as node glows plus curved edges (see `network()`).
- **Science:** draw true structure (orbits, cells, molecules) with balls and bands. State the scale.
- **Engineering or product:** an exploded view as rounded parts sliding apart with eio, each with a landing pill.
- **Documentary or history:** keep the stage. People become simple big-eyed round characters, places become planets or glowing map dots, and time jumps use the planet sweep.

## 11. 3D inside the look
Prefer three.js inside the page (EngineX loads it with `libraries: ["three"]`, drawn on `hf-seek`). Use:
- `MeshToonMaterial` or flat-coloured materials from the palette;
- one key light from the upper left, plus a rim light;
- no realistic textures;
- the sky drawn on a 2D canvas behind it, with `finish()` over the top.

Blender and Unreal renders look like lit studio shots: use them only for a deliberate stinger or a product beat, and composite them small into the page with a glow and a label.
