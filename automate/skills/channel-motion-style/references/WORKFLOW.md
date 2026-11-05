# Storytelling workflow: from narration to rendered video

Output folders follow the project rule: `<project>/script, research, plan, storyboard, pages, audio, renders`. Create a folder only when it has something in it.

## 1. Analyse the narration
- Read it all before planning anything. If there is only a topic, write a draft script and get it approved.
- Write down:
  - the one-sentence takeaway;
  - the key reveal or number;
  - every on-screen fact. Verify each one, or list it as assumed.

## 2. Find the beats
- **A beat** is one idea the viewer must get. Usually it is 1–3 sentences, not one sentence.
- Mark **informational turns** (new idea, new scale, new place, new time) and **emotional turns** (worry, curiosity, relief, wonder).
- Group beats into **sequences**: runs that share a place or a subject. A sequence is usually one continuous shot.

## 3. Plan the visual progression
- **Palette arc:** one bold palette per idea, changing at informational turns (`STYLE-BIBLE.md` §3).
- **Shot-size arc:** alternate close, medium and wide, and never stay at one size for long.
- **Composition per beat:** use the selector in `COMPOSITION-SYSTEM.md` §3. A continuous shot may hold several compositions.
- **Durations follow content, not a clock:** at least the narration time of the idea, plus about 0.5 s per element the viewer must read, plus at least 1 s to hold after landing. A complex diagram earns more; an emotional close-up can be short. The study's 11.4 s mean shot is about **shots**, not compositions.
- **Cuts:** only at a jump in place, time or topic (`ANIMATION-GRAMMAR.md` §4). Never cut per sentence.

## 4. Define reusable assets
- **Presenter poses and expressions** per beat (`character-recipe.md`).
- **Object functions** that take a size and a slot: draw once, reuse in every composition (e.g. `rocky(x, name, cx, cy, r)` is used in V2 and V4).
- **Recurring tag:** `barTag` top-left for the chapter or key variable.

## 5. Storyboard
- Fill in `assets/storyboard-template.md`: a sequence map plus one card per composition change.
- Render storyboard stills with `motion-graphic/snapshot` at each card's landing time, from a `--debug-grid` build. Check them against the slots, then show the user the **no-grid** stills.
- **Wait for approval.**

## 6. Animate
- Write each shot as `TL` times plus move specs (`ANIMATION-GRAMMAR.md` §2).
- Use one scene file per chapter (`DURATION`, `explainer(x, W, H_, t)`, a `//PLACEMENTS` block per landing composition).

## 7. Implement and render
Follow `ENGINEX-GUIDE.md`: build, smoke test, audit, snapshot, draft render, inspect, then the final render.

## 8. Inspect and refine (a loop, not a formality)
- Look at **actual frames**, including mid-transition frames, not only the landings. Most defects live there: V4's grey bloom and colliding planets were only visible at 3.8 s and 8.0 s.
- Write down each deviation, fix the cause, and re-render. Record anything that changes a rule in that reference file.
- Do a mute test on the draft.
- Narration sync: visual hits land on their stressed word within ±2 frames (`transcribe/words`).
