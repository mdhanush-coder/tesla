# Animation grammar and transition system

**Evidence:** the study samples one frame every 6 s, so it proves *which* compositions follow each other inside one shot (STUDY §3: an 11.4 s mean shot, an 84 s longest shot), but not frame timing.
- Sequences read from the contact sheet are marked **[P]**.
- Durations and easing come from the house kit's own code (`vectoranimation.md` / the template's `back`, `eo`, `eio`), marked **[H]**.
- Our defaults are marked **[U]**.

**Code:** `COMP.arc`, `COMP.stagger`, `COMP.cam` / `camMix` / `withCam`, `COMP.parallax`, `COMP.wipe.*` in `assets/comp.js`, plus the template's `back(u, s)`, `eo`, `eio`, `seg(t, a, b)`, `mixPose`, `poseAt`.

## 1. The core rule: transform, don't cut
A new composition is reached by **moving what is already on screen** into its new slots. Cut only when the story jumps in place, time or topic (§4).

Sequences that prove it in the reference [P]:
- A molecule (B) is re-labelled, then becomes a lab bench.
- A row of patient faces (C) collapses into the "81%" matrix (E).
- An IV bag (F) drips into a body (D), then the camera pushes into the chest.
- Four organs build up in place over three frames (C).

## 2. Every move is written as a spec
Each move in the storyboard is one line:

```
<element>: <from slot> -> <to slot> | path | t0-t1 (dur) | ease | anticipation | follow-through | overlap
e.g. planet Earth: B.p1 -> C.item2 | COMP.arc bow -0.12 | 6.8-9.2 | eio | none | bob resumes | stagger 3-i, spread .45 (rightmost leaves first)
```

| Field | Rule |
|---|---|
| **From / to** | Named slots from `COMP.slots.X()`. A carried element must end exactly on its new slot. |
| **Path** | `COMP.arc(a, b, u, bow)`, a curved path. Never a dead-straight line for objects [H: reference arrows and sweeps are curved]. Bow ±0.1–0.25. Alternate the sign for neighbours so their paths don't cross. |
| **Duration** | See §3. |
| **Ease** | `back(u, 1.2–2.2)` for things appearing (pop-ins with overshoot); `eo` for arrivals and settling; `eio` for camera moves, morphs, relocations and draw-ons; `H.ease.in` for dives that accelerate. Serious or emotional beats get no overshoot. [H] |
| **Anticipation** | A 0.1–0.2 s counter-move before a big action: a lean back, a squash, a 3–5% scale dip, a 10 px pull opposite to the travel [U]. |
| **Follow-through** | The element overshoots or settles (`back` or `eo`), then its idle loop (bob, breath, glow pulse) resumes [H: nothing is ever dead still]. |
| **Overlap** | Groups move with `COMP.stagger(u, i, n, spread)`, with spread 0.3–0.45 [H: stagger 0.1–0.16 s]. Pick the order that avoids collisions (V4: the rightmost leaves first). Labels follow their object by about 0.3 s. |

## 3. Durations [H, scaled to the story]

| Move | Duration |
|---|---|
| Pop-in (object, label) | 0.3–0.4 s |
| Draw-on (arrow, outline) | 0.5–0.6 s |
| Relocation between slots | 0.8–2.4 s (depends on distance and how many elements move) |
| Camera move or punch-in | 0.5–1.3 s |
| Big zoom-out | about 1.25 s |
| Wipe or sweep | about 0.9 s |
| Hold after a composition lands | at least 1 s before the next transform starts |

**Overall pace:** about one visible change every 1–2 s. A composition then lasts as long as its narration idea, with no fixed 5–6 s.

## 4. Transition catalogue
Pick a transition from **why** the story moves:

| Story reason | Transition | How (code) |
|---|---|---|
| The same idea, re-arranged (A→B, B→C, C→E) | **Relocation / morph** | Carried elements travel on `COMP.arc` to the new slots; incoming ones arc in from off-screen; outgoing ones shrink to 0 or exit along their travel direction. **Validated in V4.** |
| Detail of the current thing ("inside", "how") | **Camera push-in** | `withCam(x, camMix(c0, c1, eio(u)))`, zooming toward the detail. Use log-space zoom (`camMix` does it). Optionally finish with a `wipe.bloom` whiteout to swap in the inside scene. |
| Context, scale, quantity | **Pull-out** | The reverse: z 1 → 0.06 [H `exA`]. Objects shrink until many become a pattern (a crowd, the dot matrix of E). |
| Another part of the same world | **Travel or parallax pan** | Move the camera `cx`. Layers follow by depth with `COMP.parallax(c, d)`. |
| A new topic, place or time | **Geometric wipe** | `wipe.iris` (from the focal point), `wipe.diag` (diagonal sweep), or the house foreground-planet sweep. |
| Before and after | **Split, then join** | Two A-halves, then slide them together. |
| Energy, reveal, the key moment | **Glow or particle bloom** | `wipe.bloom(…, peak)`: peak 1 hides a swap; 0.3–0.5 is a glow pass only. |
| Depth change (foreground to background) | **Layer swap** | A foreground silhouette crosses the frame (G's near layer) and the scene changes behind it. |
| Diagram construction | **Build-up in place** | Parts pop in one at a time with a stagger, labels after their part, then arrows draw on with `eio`. |
| Character movement | **Pose blend** | `mixPose(a, b, eio(u))` / `poseAt(keys, t)`, plus `walk` and `yaw` for turns. The head turns before the body (overlap); the eyes lead the head. |

**Background transforms:**
- Interpolate the background *colour* only between related palettes.
- Between unrelated palettes (cream ↔ violet), an RGB blend passes through a muddy grey (V4 at 3.8 s). Either hide the swap at the peak of a bloom, iris or sweep, or blend through a saturated midpoint colour.

## 5. Camera behaviour
- The camera is a world point plus a zoom: `COMP.cam(cx, cy, z)`. One `withCam` wraps the world; UI (tags, labels in fixed spots) is drawn **outside** it so it stays put.
- Move the camera **only** for a reason in §4. Settle with `eio`, then hold.
- Small "breaths" (z ± 0.03–0.05 during a transform) add life without a reframe (V4).
- After any camera move, the landing frame must satisfy the target layout's slots. Check it with a `--debug-grid` snapshot.

## 6. Character continuity
- There is one presenter (the `person` rig). His design never changes; only the pose and expression do. Carry him between compositions by re-fitting his head every frame: `COMP.fitPerson(rig, o, x, y, headW)` with an arc for the position and a log-lerp for `headW` (V4).
- The expression changes at the beat: neutral → thinking → surprised → happy. Switch mid-move, not after it.
- He looks at what matters: `headTurn` toward the new focal point while the transform plays.

## 7. Proven sequences (rendered)
- **V4 (12 s, one shot):** A (close-up, thinking) → [2.6–5.0 s] → B (Sun at 0.47 + four planets on the thirds) → [6.8–9.2 s] → C (row of four, labels at 0.88).
  - Carried over: the presenter (to the corner, then exits left), the idea-glow (becomes the Sun, then collapses), the planets.
  - Defects found and fixed:
    - a full bloom washed the frame grey (now peak 0.4);
    - two planet paths collided (now reverse stagger);
    - the B label lingered (now gone before the move).
