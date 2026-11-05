# Scene grammar: how the animation should look (user's target)
Source: frame study of the Kurzgesagt Short "What If Gravity Was 10% Stronger?" (one frame every 2 s, 2026-11-03). The user's words: "i need it like this." This is design grammar to follow, **not** artwork to copy. Never reuse their characters, scenes or logos.

## The rules
1. **Every shot is a place, not a floating icon.** Build a full illustrated environment for each idea: a keynote theatre, a room with a window, a city street, the sky, the ocean, a cross-section of the Earth. Space or a plain dark field is one environment among many, not the default.
2. **A new scene every 2–4 s,** each with its own bold flat palette. Use bright saturated backgrounds (cyan, hot pink, orange, purple, sky blue) for "now" and "normal life"; dark navy or violet for history, mystery or space. A palette change is itself a cut.
3. **The subject fills the frame.** Go close: a hand touching a screen, a phone held in a hand, a face. Crop at the frame edges freely. Big shapes read on phones; small icons in the middle of empty space do not.
4. **Characters act it out.** Use the house presenter (`character-recipe.md`) and props doing the thing: reaching, holding, falling, sweating, smiling. Expressions carry the emotional beat.
5. **One recurring infographic tag** for the video's key variable, always in the same corner and the same style, e.g. a bold orange rounded tag with a big number or year and a small label under it. It updates in place (counts or flips) instead of new text appearing elsewhere.
6. **Diagrams are illustrations, not charts:** cross-sections (body, Earth, layers), maps with glowing nodes, depth markers, objects in orbit. Label them with small white rounded pills ("Graphite", "Diamond", "~12,000 Satellites", "Not to scale").
7. **Show material and motion graphically:** dot fields for substance or particles, speed lines for falling or moving fast, cracks for breaking, glow for energy.
8. **Transitions:**
   - **hard cuts** between palettes (most common);
   - **whip pans** (a fast slide plus speed lines) within a sequence;
   - **zooms into** a screen or object to enter the next scene, and **zoom back out** to summarise;
   - **split screen** for before/after.
9. **Flat, bold, outline-free shapes** with simple gradients and soft shadows: the house look. Humour is welcome where it fits (a reaper for "fatal", a "Yay?" bubble).
10. **No subtitles** (user rule: the reference burns captions in; we never do).
11. **No big headline text** (user rule). Every word on screen is a small **label tag**: a flat solid box (pink `#ff4f8b`, orange `#ff8a1f`, cyan `#1fb6ff`, violet `#8b5cff`) with a thin lighter border, small corner radius, white Nunito 900 CAPS (24–32 px, up to 2 lines), often tilted by a few degrees, popping in with `back`. Use `tag()` in `apple_touch/pages/ch1-hook/scene.js`. No banner headlines, no white pills, no corner header pill.
12. **No hands holding devices** (user rule, overrides the earlier grip rule): phones and tablets float on their own. Only the shaped pointing hand (`assets/pointing-hand.js`) appears, for touches.

## Reviewer pass (2026-11-03, applied in CH1 v8). Where it conflicts with rule 2, this wins.
13. **Hook = a story, not a presentation.** Open on a close-up of the problem (someone struggling), with the unexpected issue visible in the first 2 s. Reveal the history or context only once the viewer is curious (pull back to it).
14. **One connected journey.** Prefer match cuts and camera moves over hard cuts: go *through* a screen into the next scene, let the camera follow an object that travels between scenes, and reuse the same object to link two eras (for example the crossed-out 2010 laptop becomes the 2026 laptop as the camera comes back out).
15. **Characters act every beat:** head turns and eye direction toward what matters, natural gestures, body sway while seated, and a small anticipation (lean back, wind-up) before every important action.
16. **Controlled palette:** dark backgrounds for history, neutral backgrounds for the present, and bright colour only on the key objects and highlights. Every ✓/✗ is the same size in the same relative spot (top-right of its object), and the year tag never moves corners.
17. **Build to one final composition:** not separate panels. Put both sides in one continuous world and move the camera between them, ending wide.

## Planning checklist per chapter
- [ ] Each 2–4 s beat names its **environment** and **palette**, and the palette changes when the idea changes.
- [ ] The main subject takes up ≥ 50% of the frame in close-ups.
- [ ] At least one character or hand **acts** in every chapter.
- [ ] The recurring tag is present and updates in place.
- [ ] Transitions are chosen from rule 8, not random.

## Code gotcha
- `H.mix(a, b, u)` returns an RGB **array**, not a colour string. Always wrap it: `H.rgba(H.mix(a, b, u), 1)`. Passing the raw array to `fillStyle` is silently ignored, and to `addColorStop` it throws and blanks the frame.

## Hands
- Pointing hands use `assets/pointing-hand.js` (a fist with folded-finger creases, a jointed index finger with a nail, the thumb tucked across, a cuff and a sleeve). Never build a hand from separate balls; the user called that "meat balls".
