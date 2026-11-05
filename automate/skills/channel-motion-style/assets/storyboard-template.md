# Storyboard: <video title>

**Takeaway (one sentence):**
**Key reveal / number:**
**Presenter's arc:** (e.g. confused → curious → delighted)
**Palette progression:** (e.g. cream (story) → violet (science) → cream (back to life))
**Assumed facts:** (anything on screen you couldn't verify)

## Sequence map
One line per *shot* (a shot = one continuous camera, possibly several compositions):

| Scene | Shot | Time | Compositions in this shot | Joined by | Ends with a cut because… |
|---|---|---|---|---|---|
| S1 | S1.1 | 0:00–0:14 | A → D → C | relocation, push-in | new place (hospital) |

## Shot cards (one per composition change)

### S1.1 / c1: <name>
| Field | Value |
|---|---|
| Narration segment | "…exact words…" (start–end seconds from `emotive-speech` lines / `transcribe/words`) |
| Muted takeaway | what a viewer with no sound understands |
| Subject / mode / count | one subject · emotional, explanatory, scientific, dramatic or comparative · N elements |
| Composition layout | A–G or custom (+ which constants) |
| Focal point | slot name + normalized x, y |
| Supporting elements and labels | slot names; label text (years, names, numbers, one-word stamps only) |
| Visual assets | presenter pose and expression; props; reused drawings (functions) |
| Starting state | where every element is at t0 |
| Ending state | where every element lands (slot names) |
| Moves | one spec line per element (ANIMATION-GRAMMAR §2) |
| Duration | t0–t1, plus why this length (narration, density, complexity) |
| Camera | `cam(cx, cy, z)` start → end, or "locked" |
| Transition in / out | from the catalogue (ANIMATION-GRAMMAR §4) + the story reason |
| Sound cues | sfx at TL times; volume |
| EngineX implementation | page file, scene function, TL keys; snapshot times for this card |
| Placements | `//PLACEMENTS` entries for `tests/audit.js` |

## Review gates
- [ ] Mute test passes on every card.
- [ ] No layout more than twice in a row; at least 4 layouts or customs per 60 s.
- [ ] Every composition change names its carried element (or names the story reason for a cut).
- [ ] `node tests/audit.js` passes; `--debug-grid` snapshots checked; final build has no grid.
