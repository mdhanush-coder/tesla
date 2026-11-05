---
name: channel-motion-style
description: The channel's production system for animated explainer videos. It holds the measured Kurzgesagt composition layouts A–G, a layout selector, a composition-to-composition animation grammar, the house Flat-Vector style with the presenter rig, and an EngineX build→render pipeline. Use it as the entry point whenever the user gives a narration, script or topic to turn into an animated video, scene, storyboard or shot. Also use it when they ask to plan, compose, animate, render or fix any scene for the channel, even without naming the style, Kurzgesagt, EngineX or this skill.
---

# Channel motion style

The rules, in priority order:
1. The visuals tell the story with the sound off.
2. Every frame sits on measured geometry.
3. Compositions **transform into each other** instead of cutting.
4. One house look and one presenter.
5. Everything renders on EngineX and is **inspected as frames** before it counts as done.

## Read, by need
- **Before planning:** `references/WORKFLOW.md` (the 8 steps), then `references/COMPOSITION-SYSTEM.md` (layouts A–G, the §3 selector, safe areas, label spots).
- **Before animating:** `references/ANIMATION-GRAMMAR.md` (move specs, durations, eases, transitions, camera, continuity).
- **Before drawing:** `references/STYLE-BIBLE.md`. For detail: `references/house-style-guide.md`, `references/character-recipe.md` (the presenter rig), `references/house-scene-grammar.md` (the user's rules 10–17).
- **Before any EngineX call:** `references/ENGINEX-GUIDE.md` (build, smoke, audit, snapshot, render) and `references/enginex-map.md` (voice, sound, 3D, concat). Use the `engine-x` skill rules: `describe_operation` first, `sign_output` for links.
- **Storyboard format:** `assets/storyboard-template.md`.
- **Worked, rendered examples:** `validation/` (V1 = A, V2 = C, V3 = G, V4 = A→B→C in one shot) and `validation/VALIDATION.md`.

## Non-negotiables
- **Choose layouts with the selector.** Fill in the muted takeaway, the subject, the mode, the count, the layout, the focal point, the labels and the link to the previous composition for every beat.
  - Use a custom layout when no preset fits.
  - No layout more than twice in a row.
- **Every composition change names its carried element and its move spec.** Cut only at a jump in place, time or topic.
- **Durations come from content** (narration, density, complexity), not a fixed 5–6 s.
- **On screen:**
  - only small coloured label tags (years, names, key numbers, one-word stamps);
  - no headlines, subtitles or narration text;
  - one glowing or high-contrast element per frame;
  - light from the upper left;
  - `finish()` on every frame.
- **The presenter:**
  - one design (the rig); he acts every beat;
  - no hands gripping devices;
  - real people only as silhouettes.
- **Guide lines exist only in `--debug-grid` builds.** Final art never has them (`build.py` asserts it).
- **Use only code that exists:** `comp.js`, `scene-kit.js` and the template's kit. If something is missing, write it into `scene-kit.js` (shared) or the scene file (one-off). Never assume an EngineX operation or parameter: describe it first.

## Done means
All of these hold:
- `tests/comp.test.js` passes.
- `tests/smoke.js` passes.
- `tests/audit.js` passes.
- Debug snapshots at the landing **and mid-transition** times were looked at.
- The final render was looked at and passes the mute test.
- Deviations were written down, and fixed or listed.

Report what was verified and what was not.
