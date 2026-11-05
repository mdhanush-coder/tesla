# Validation record (2026-11-04)

All scenes were built with `assets/build.py` and rendered on EngineX (`motion-graphic/snapshot` + `render`, GPU).
- Stills with guides are in `stills/*_debug.png` / `v4*.png`.
- Final videos (no guides) are in `renders/`.

Measurements were read off the 1920×1080 debug stills.

| Test | Layout | Spec | Measured | Result |
|---|---|---|---|---|
| V1 centred character | A | face spans x 1/3–2/3; eyes at 0.50H | face 640–1280 px (0.333–0.667); eyes at y ≈ 545 (0.505H) | pass |
| | | content inside the 5% frame | hair top at y ≈ 25 (0.02H) | **deviation:** the rig's tall hair. Treated as bleed and recorded in COMPOSITION-SYSTEM §A |
| | | tag flush at x = 0 | bar 0–576 px, y 0.06–0.13 | pass (bleed exemption) |
| V2 scientific row | C, N=4 | centres 0.1625 / 0.3875 / 0.6125 / 0.8375; item height H/3 at 0.58; labels 0.88 | 312 / 744 / 1176 / 1608 px (exact); diameter 360 px (0.333H) at y 625 (0.579); labels y ≈ 950 (0.88) | pass |
| | | one glowing element | Earth only | pass |
| V3 wide environment | G | horizon / tabletops 2/3; every head on 0.45; top 25% framing; near silhouette | floor and tabletops y ≈ 720 (0.667); heads y 485–500 (0.45–0.46); awning to 0.25; silhouette bottom-right | pass after one revision |
| V4 continuous | A → B → C, one shot | B: points on thirds, centre at 0.47; C as V2 | planets centred 640/1280 × 360/720 px; Sun at y ≈ 508 (0.47); row identical to V2 | pass after one revision |

## Deviations found by looking at rendered frames, and what changed
1. **Blank frames on the first run** (all stills 8516 bytes): `scene-kit.js` was never included, so `bgFlat` was undefined.
   - Fixed `build.py` (it now asserts the kit is present).
   - Added `tests/smoke.js`, which catches this in about 1 s, locally.
2. **V3 v1 looked generic and broken:**
   - The seated presenter's legs ran off the frame.
   - The table was missing.
   - Grey pill bystanders.
   - The label sat on his head.

   Cause: the head was fitted too large for a seated wide shot. Fixed:
   - head width 0.068W, so the table top lands on 2/3 by itself;
   - flat-faced bystanders behind small tables;
   - the label moved to the wall;
   - the table split into leg and top so the pedestal sits behind the legs.
3. **V4 mid-transition defects** (only visible at 3.8 s and 8.0 s, not at the landings):
   - a full-strength bloom washed the frame grey (now `wipe.bloom(…, peak)` = 0.4);
   - the paths of Earth and Mars collided (now a reverse stagger: the rightmost leaves first);
   - the B label stayed over the C move (now fades at 6.8–7.1 s).

   Re-rendered and re-checked.
4. **Study contradiction:** labels "never cross 10%" vs the measured label row at 0.85–0.91H. `COMP.audit` now checks the label **centre** against 10% and the box against 5%, which matches the frames.
5. **Known, not fixed:** an RGB colour lerp between unrelated palettes passes through a muddy mid-tone (V4 at 3.8 s). The rule is recorded in ANIMATION-GRAMMAR §4: hide the swap under a wipe or bloom peak, or blend through a saturated midpoint.

## Not validated yet
- Layouts **D, E, F** have code slots and unit tests, but no rendered scene.
- The camera push-in and the `iris`, `diag` and `slide` wipes are untested in a render. V4 exercised `withCam`, `arc`, `stagger`, `fitPerson` and `bloom`.
- Narration-synced timing and sound: not part of this test set.
