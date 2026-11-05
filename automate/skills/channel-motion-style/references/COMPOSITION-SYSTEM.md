# Composition system

Source: `kurzgesagt_grid_study/STUDY.md` (149 gridded frames of "How I Survived Late-Stage Cancer", 1080p60, every 6 s). The study's numbers are the **measured specification**. This file formalizes them and does not re-derive them. The code version is `assets/comp.js` (`COMP.slots.A()` … `COMP.slots.G()`); `tests/comp.test.js` checks it against the study's numbers.

**Units:** every position is normalized: x as a fraction of W, y as a fraction of H. `COMP.px(nx, ny, W, H)` converts. The page's logical canvas is 1280×720, so 0.5W = 640. The study's pixel numbers are for 1920×1080. The same fractions work at any size.

**This is geometry, not art.** It tells you *where* things go. *What* they look like comes from `STYLE-BIBLE.md`. The guide lines exist only in `--debug-grid` builds and never appear in final artwork (`build.py` asserts this).

## 0. Evidence levels
Each rule below is tagged with one of these:
- **[M] measured:** a number read off the gridded frames (STUDY §1–3).
- **[P] repeated pattern:** seen in several contact-sheet frames, not measured precisely.
- **[I] inferred principle:** a design reason that explains [M]/[P]. Used for decisions, not checked.
- **[U] unverified assumption:** our own default with no evidence. Can be changed freely.

Spot-checked again on 2026-11-04 against the full frames t=0, 474 and 684 s:
- **A** holds (the face spans 640–1280 px, eyes at about 0.48H).
- **C** holds (centres 0.17 / 0.38 / 0.59 / 0.82; labels 0.85–0.91H).
- **G** holds (heads at about 0.46H).

## 1. Constants

| Name | Value | Level |
|---|---|---|
| Thirds | x, y = 1/3, 2/3 | [M] |
| Golden lines | 0.382 / 0.618 | [M] |
| Centre | (0.5, 0.5) | [M] |
| Optical centre | y = 0.47 (about 3% above centre) | [M] (B centre atom) |
| Action-safe | 5% inset; all content stays inside | [M] |
| Title-safe | 10% inset (x 0.10–0.90, y 0.10–0.90) | [M] |

**Safe areas, exactly (verified):**
- A label's **centre** sits inside the 10% frame. Its **box** stays inside the 5% frame. The study says labels "never cross 10%", but its own label row (y 0.87–0.88) measures 0.85–0.91H, so the box edge does cross it.
- **Exempt on purpose:**
  - chapter and chart **title bars** start flush at x = 0 (role `tag`);
  - **bleed** elements (shoulders cropped by the frame, awnings, foreground silhouettes, `bleed`);
  - backgrounds (`bg`).
- `COMP.audit(placements)` enforces all of this. `node tests/audit.js scene.js` runs it on a scene's `//PLACEMENTS` block.

## 2. The seven presets
They are presets, not templates. Pick one only when it serves the beat (§3). A beat can also use a custom layout (§4).

### A. Centred hero: the middle third (most common shot) — `COMP.slots.A({fullBody})`
- [M] One subject, symmetrical on x = 0.5. Its main body spans **x 1/3–2/3**.
- [M] **Close-up:**
  - eye line at y = 0.5;
  - brows on the golden line 0.382;
  - mouth or chin on 2/3.
- [M] **Full body:** head top at 0.07, feet at 0.93 (`COMP.fitFullBody`).
- [I] Use it for the person the story is about, for direct address, and for a single object as "the thing".
- **House rig fit:** `COMP.fitPerson(rig, opts, 0.5, 0.5, 1/3)` puts the presenter's eyes on (0.5, 0.5) with the head 1/3 W wide. Validated in V1 (eyes at 0.50H, face 640–1280 px).
- **Exception (V1):** the presenter's tall hair reaches y ≈ 0.02 and crosses the 5% line. Treat hair above the head as `bleed`.

### B. Four-point star on the thirds intersections — `COMP.slots.B()`
- [M] Four items exactly on (1/3, 1/3), (2/3, 1/3), (1/3, 2/3), (2/3, 2/3).
- [M] The centre item sits at the optical centre (0.5, 0.47), not the true centre.
- [M] One label pill centred at y ≈ 0.87.
- [I] Use it for a structure with a hub (a molecule, an ecosystem, four causes around one effect).

### C. N items in a row — `COMP.slots.C({n, m})`
```
centre_i = m + (1 - 2m) * (i + 0.5) / N        m = 0.05; i = 0..N-1
N=4 -> 0.1625, 0.3875, 0.6125, 0.8375  (measured 0.166, 0.380, 0.594, 0.820)
```
- [M] Every item has the same visual height, about **1/3 H**, centred on **y = 0.58**.
- [M] One shared label row at **y = 0.88**. Each label has a small triangle pointing up at its item.
- [I] Use it for comparison of peers, a taxonomy, or a list the viewer must hold in mind.
- **Rules:**
  - Maximum item width = `pitch` = (1 − 2m)/N.
  - At N ≥ 6, use m = 0.10 and shrink item height, or switch to a grid.
  - Validated in V2 (centres exact, labels at 0.88).

### D. Subject + object on a third/golden split — `COMP.slots.D({flip})`
- [M] Subject at x ≈ 0.43; object at x ≈ 0.618 (golden line). They are linked by a curved connector (tube, arrow, gaze).
- [M] If one element must glow, it sits on the golden line, just below centre (chest port, t = 102 s).
- [M] A label goes on the **outside** of its object, never between the two subjects.
- [I] Use it for cause and effect, tool and user, or "this acts on that". Use `flip: true` when the story flows right to left.

### E. Big number — `COMP.slots.E()`
- [M] The number is centred on (0.5, 0.5), spans x 0.29–0.70, and is about H/4 tall.
- [M] An optional dot matrix fills x 0.08–0.92 and y 0.25–0.90 at a pitch of W/42.
- [M] A title bar flush left at y 0.06–0.13, width 0.65W. A source citation bottom-right at y ≈ 0.96 inside the 5% margin.
- [M] A variant puts a solid pill at dead centre with the subjects arranged symmetrically around it (t = 228 s).
- [I] Use it only for the **one** key number of a section. Two big numbers in a row dilute both.

### F. One-point room — `COMP.slots.F({k})`
- [M] The vanishing point is at (0.5, 0.5). The back-wall corners lie **on the frame diagonals**.
- **Build it:** draw the back wall as the frame scaled by k ≈ 0.55 about the centre, then join its corners to the frame corners.
- [M] The light cone and the key object are symmetrical on x = 0.5.
- [I] Use it for "a place where something happens to one thing" (a lab, a chamber, a room the camera will push into).

### G. Wide environment — `COMP.slots.G({n})`
- [M] The tabletop and horizon line sit at **y = 2/3**. **Every head is on one eye line, y ≈ 0.45**, whatever its distance.
- [M] Three depth layers:
  - far: 60–70% darker;
  - middle: the characters;
  - near: a dark silhouette over one corner (measured: bottom-right).
- [M] The top 25% is a framing element (an awning, a ceiling, foliage).
- [U] Characters spread at `rowCentres(n, 0.10)` as a default. The café frame groups them unevenly, which is also fine.
- **Seated presenter:** fit his head at (x, 0.45) with head width ≈ 0.068W. The desk or table top then lands on about 0.665H automatically (V3).

## 3. Selector: which layout for this beat
For each narration beat, answer these in order and write the answers into the storyboard row (`assets/storyboard-template.md`):

1. **Muted takeaway:** what must a viewer with no sound understand from this frame?
2. **Subject:** the one most important thing. If you can't name exactly one, the beat is two beats.
3. **Mode:** emotional, explanatory, scientific, dramatic or comparative.
4. **Count:** how many elements the takeaway *needs* (not how many could be drawn).
5. **Pick the layout:**

| Takeaway needs… | Count | Layout | Focal point |
|---|---|---|---|
| a person's feeling, a direct address, one thing to look at | 1 | **A** | eyes at (0.5, 0.5) |
| a hub and its four parts or forces | 4 + 1 | **B** | the centre at (0.5, 0.47) |
| a comparison or list of peers | 2–6 | **C** | the glowing item in the row |
| one thing acting on another | 2 | **D** | the object at 0.618 |
| the size of one number | 1 number | **E** | the number at the centre |
| a place where one event happens | 1 + room | **F** | the vanishing point and the object at the centre |
| a social or real-world setting, people together | 2+ in a place | **G** | the main character on the eye line |
| a process in time, a map, a cross-section, a scale jump | — | **custom** (§4) | — |

6. **Supporting elements and labels:** use the fixed spots in §5. Never put a label on a figure.
7. **Link to the previous composition:** which element **carries over**, and where does it go? (See `ANIMATION-GRAMMAR.md` §2.) A layout change is a *transform*, not a cut, unless the story jumps in place, time or topic.

**Anti-repetition rules:**
- No layout more than twice in a row. A and E never twice in a row.
- Across any 60 s, use at least 4 different layouts or customs.
- [I] Change the *shot size* (close-up, medium, wide) whenever the layout repeats.
- Don't force symmetry: emotional and comparative beats are centred; dramatic and explanatory beats are often off-centre (D, the thirds).

## 4. Custom compositions
When no preset fits, build a custom layout from the same constants and state which ones you used:
- Key points sit on the thirds, golden lines or the centre.
- Content stays in the 5% frame; label centres stay in the 10% frame.
- Exactly one high-contrast or glowing element per frame.
- Groups are optically centred at 0.47.

Common customs, all [U]:
- **Timeline:** left to right along y = 0.58, ticks at `rowCentres`.
- **Cross-section:** the subject cut on the golden line.
- **Map:** the key node on a thirds point.
- **Split screen:** two halves, each with its own A.

## 5. Text and label positions (fixed) [M]

| Element | Where |
|---|---|
| Year or chapter tag | flush to x = 0, y 0.06–0.14, text inset 0.04W (`barTag`) |
| Chart title bar | flush to x = 0, y 0.06–0.13, width about 0.65W; subtitle one line below, inset 0.09W |
| Source citation | bottom-right inside the 5% margin, y ≈ 0.96, small dark pill with ▶ |
| Object label | beside its object at the object's centre y, pointer toward it; never on a figure |
| Item labels | one shared row at about 0.87–0.88H |

House text rules (from the user, which override the reference):
- Every label is a small coloured tag (`labelTag`): no big headlines, no subtitles, no narration on screen.
- Text is limited to years, names, key numbers and one-word stamps.

## 6. Timing evidence [M]
- **Story section:** 61 shots in 11:36, a **mean of 11.4 s**; the longest single shot is 84 s.
- **Sponsor section:** a mean of 4.1 s.
- One shot holds several compositions, joined by push-ins, morphs and background wipes.

Implication [I]: plan compositions per *idea*, not per sentence, and join them with transforms. The study's "about 5–6 s per composition" comes only from the 6 s sampling rate, so it is **not** a rule. Set each composition's duration from the narration, the information density and the visual complexity (`WORKFLOW.md` §3).
