---
name: xplainedunseen-video
description: One-shot, fully self-contained XplainedUnseen video production. Give a topic plus details; it researches the topic on the live web from primary sources, then runs the complete XplainedUnseen pipeline (documentary research and script, Kurzgesagt-measured compositions, Flat-Vector house style, presenter rig, EngineX build/narration/render) through final QC and delivers the finished video. Every rule, reference, template and code file the pipeline needs is inside this one file. Use whenever the user gives a topic to turn into an XplainedUnseen video, even if they don't name the pipeline.
---

# XplainedUnseen: topic to finished video (self-contained)

This single file holds the whole production system: the master workflow (Part 1), the documentary workflow (Part 2, from the `youtube-science-documentary` / `youtube_science_documentarry` skill), the motion-graphics workflow (Part 3), the channel motion style with Kurzgesagt composition maths, animation grammar, style bible, character rig and EngineX guide (Part 4), and every code/template file (Part 5). No other skill file is needed.

**Input:** a topic and any details (angle, length, audience, language, must-include facts). Default length 7 minutes, 16:9.
**Output:** the rendered, QC'd video (file or signed link), the fact ledger with sources, and a verification report.

## How file references work in this document
The included parts mention paths such as `references/COMPOSITION-SYSTEM.md`, `assets/page-template.html`, `assets/comp.js` or `tests/smoke.js`. Every one of them is reproduced below under a heading carrying that same path. Read the section instead of opening the file.
For **code and templates (Part 5)**: before building, write each file out verbatim into the project at the path shown in its heading (e.g. `<project>/kit/assets/comp.js`), then run the commands as written. Only the binary image `references/character-reference.png` is not included; the presenter rig is fully specified in text by `references/character-recipe.md` and drawn by the kit in `assets/page-template.html`.

## Part 1: Master workflow

Run the phases in order without stopping for approval between them. Ask the user only if the topic is too ambiguous to research. Do not stop after research, script, storyboard or single scenes: the job ends at a final render that passed QC. (Where an included part says "wait for approval", treat it as a self-review checkpoint unless the user asked to approve steps.)

### Priority of rules (when parts conflict)
1. The user's direct instructions.
2. The house rules below.
3. Part 4 (channel motion style) for anything visual, compositional or about animation.
4. Part 2 (documentary) for research, story, script, sound and delivery.
5. Part 3 (motion graphics) for EngineX page/render mechanics not covered by Part 4.

### House rules (always)
- The visuals tell the story with the sound off. Every scene states its muted takeaway; mute-test every storyboard and the final render.
- On screen: only small coloured label tags (years, names, key numbers, one-word stamps). No headlines, subtitles, captions or narration text.
- One glowing or high-contrast focal element per frame; light from the upper left.
- Compositions transform into each other; cut only at a jump in place, time or topic.
- Hinglish/Hindi narration: Devanagari script, numbers spelled out as words, storytelling delivery with strategic emotion tags, voice `sameer` unless the user picks another.
- No glass-breaking sound effect unless glass actually breaks on screen.
- Never invent facts, numbers, quotes, EngineX operations or parameters. `describe_operation` before every EngineX operation; `sign_output` for links.

### Phase 1: Research (live web)
1. Search the web for the latest information. Prefer sources from the last 12 months and note when each figure was last updated.
2. Priority: official sites, primary sources (papers, agency/company releases, standards, technical documentation), then reputable secondary coverage.
3. Build the **fact ledger** (Part 2, Phase 1): claim, number/unit/date, exact evidence, source URL, confidence, caveat, planned visual proof. Verify important claims against a second independent source.
4. Drop or soften anything unverified; resolve source conflicts explicitly. Do not script on unverified key facts.

### Phase 2: Story and script
Part 2, Phases 2–3: premise, audience promise, story architecture, timed script (125–150 wpm) with source IDs and pronunciation notes. Every factual line traces to the ledger.

### Phase 3: Visual plan (Kurzgesagt-inspired)
Part 4: `references/WORKFLOW.md` steps 1–5. Find beats, pick a layout per beat with the selector (`references/COMPOSITION-SYSTEM.md` §3), plan palette and shot-size arcs, name the carried element and move spec for each composition change (`references/ANIMATION-GRAMMAR.md`), draw in the house style (`references/STYLE-BIBLE.md`, `references/house-style-guide.md`, `references/character-recipe.md`). Fill in `assets/storyboard-template.md` and snapshot storyboard stills.

### Phase 4: Build, narrate, render
Part 4 `references/ENGINEX-GUIDE.md` and `references/enginex-map.md`, plus Part 2 Phases 8–9: write the Part 5 kit files out, build each chapter page, smoke + audit, snapshot (landing and mid-transition), Emotive Speech narration per chapter, sound-library SFX/music via `find_sound`, draft render, inspect, final render, concat chapters.

### Phase 5: QC and delivery
All must hold:
- `tests/comp.test.js`, `tests/smoke.js`, `tests/audit.js` pass.
- Debug snapshots at landings and mid-transitions were looked at; the final render's frames were looked at.
- Mute test passes; facts on screen and in narration match the ledger.
- Narration in sync (±2 frames on stressed words), clean audio, no mispronunciation; `video/probe` on the master (duration, H.264, AAC 48 kHz, no gaps).
Fix failures at the cause and re-render the chapter. Deliver: the video (signed link), the fact ledger, the Part 2 deliverables folder, and a report of what was verified, what was not, and any deviations.

## Part 2: Documentary workflow (`youtube-science-documentary`)

### `youtube-science-documentary/SKILL.md`

### YouTube Science & Technology Documentary Skill

#### Mission

Turn a topic into a researched, visually coherent, 5–10 minute science and technology documentary (default 7 minutes). The result must feel like a crafted documentary, not a slideshow or a sequence of unrelated AI clips.

#### House decisions (these override anything below)

- **Visuals tell the story on their own:** a viewer with the sound off must still understand what every scene is saying, through what is drawn and how it changes, plus minimal English text for years, names, key numbers and short quotes. Narration adds depth and emotion; it is never the only carrier of meaning. Every scene in the plan states its muted takeaway, and QC includes a mute test (see `youtube-motion-graphics`, step 3 and step 8).
- **No subtitles and no narration text on screen:** no burned-in captions, and no quote cards repeating what the voice says. On-screen text is limited to years, name tags, key numbers, one-word stamps and section titles. An SRT is made only if the user asks for one, as a separate file.

- **Editing and rendering:** everything on EngineX, nothing rendered or edited locally. Local files are limited to plans and page sources.
- **Visuals:** all flat-vector, using the `youtube-motion-graphics` skill (style guide, page template, character kit, EngineX map). Real footage or photos appear only as clearly framed inserts (a card or screen inside the vector scene), never as full-frame B-roll. Do this only when the user wants it.
- **Pacing:**
  - a scene change every 5–20 s;
  - a visual "interrupt" (new illustration, zoom into a component, diagram, comparison or statistic) every 5–8 s;
  - constant small motion (bob, drift, glow pulse) so no frame is ever static.
- **Motion:** overshoot pops for objects and labels. Soft or no overshoot (`eo` / `eio` only) for serious or emotional beats: people, history, quotes, the ending.
- **Runtime:** 5–10 minutes, default 7. If a supplied script is shorter, say so and propose what to expand, rather than padding.

Production mix:
- 2D flat-vector motion graphics for scenes, characters, labels, callouts, timelines, data reveals and comparisons.
- Infographics and diagrams for mechanisms, comparisons, processes, architecture and evidence, in the same style.
- EngineX assets and operations (see `youtube-motion-graphics/references/enginex-map.md`). Reuse them before creating new assets.

The selected reference YouTube channel and its `vectoranimation.md` file are the visual-style authority when supplied. Extract its design grammar; do not copy individual scenes or reproduce copyrighted footage.

#### Operating rules

1. **Research before scripting.** Separate verified facts, estimates, disputed claims, and creative interpretation. Cite the research sources in the research pack.
2. **Never invent technical facts, statistics, quotations, dates, or visual evidence.** Mark unknowns and request verification.
3. **One clear idea per scene.** Every visual must explain, prove, contextualize, or emotionally reinforce the narration.
4. **Narration leads the edit.** Build the scene plan against the approved voiceover script and timestamps.
5. **Reuse the asset library.** Inspect EngineX documentation, examples, components, presets, and existing project assets before proposing custom animation. Do not invent EngineX API names, node names, or capabilities.
6. **Keep a consistent visual system.** Establish typography, colors, line weights, icon style, camera language, transition rules, and chart conventions once per video.
7. **AI output is a draft, not evidence.** Fact-check generated text and inspect every generated image/video frame for artifacts, false labels, incorrect mechanisms, and visual contradictions.
8. **Respect rights and provenance.** Track licenses/permissions for footage, music, images, fonts, and generated assets. Do not use unlicensed copyrighted clips or music.
9. **Avoid visual monotony.** Do not use the same zoom, card layout, kinetic typography, or transition repeatedly.
10. **Do not over-animate.** Motion should clarify hierarchy, causality, scale, direction, or change.

#### Required inputs

Use what the user provides. If a critical item is missing, ask only for that item; otherwise proceed with sensible defaults.

- Topic / working title.
- Target audience and assumed prior knowledge.
- Desired tone (default: curious, precise, cinematic, accessible).
- Target runtime (default: 7 minutes; allowed range: 5–10 minutes).
- Reference channel/video and `vectoranimation.md` (if available).
- EngineX library path, docs, examples, or repository (if available).
- Available tools, model/API access, budget, and hardware constraints.
- Language, narrator/voice preference, and publishing region.
- Any required claims, sources, footage, brand elements, or exclusions.

#### Production pipeline

##### Phase 1 — Topic framing and research

Create:
- One-sentence premise.
- Audience promise: what the viewer will understand by the end.
- Central question and 3–5 supporting questions.
- Scope boundaries: what is included and excluded.
- Research dossier with source title, publisher, URL, publication date, claim supported, and confidence.
- Fact ledger: claim, exact evidence, source, confidence, caveat, and planned visual proof.

Prioritize primary sources: peer-reviewed papers, official technical documentation, standards bodies, government/science institutions, original datasets, and direct interviews. Use reputable secondary sources for context. Verify important claims against at least two independent sources where practical. Distinguish correlation from causation and prototype claims from deployed capabilities.

##### Phase 2 — Story architecture

For a 5–10 minute video, use this flexible structure:
- 0:00–0:20 — Cold open: striking question, consequence, mystery, or visual reveal.
- 0:20–0:45 — Promise and context: why the subject matters.
- 0:45–2:00 — Foundations: explain the minimum concepts needed.
- 2:00–5:30 — Main explanation: mechanism, timeline, experiment, engineering, or evidence.
- 5:30–7:30 — Implications, limitations, trade-offs, or real-world applications.
- Final 20–40 seconds — Clear takeaway and satisfying closing image.

Adjust to the topic and target runtime. Do not force a formula if the story needs a different structure. Build curiosity loops, but resolve them honestly.

##### Phase 3 — Scriptwriting

Write conversational narration that sounds natural when spoken aloud.
- Start with a concrete hook, not channel housekeeping.
- Prefer short, clear sentences and explain technical terms immediately.
- Use analogies only when their limits are clear.
- Avoid unsupported superlatives and sensational claims.
- Put source IDs beside factual claims in the script draft.
- Include pronunciation notes for technical names and units.
- Include intentional pauses and emphasis, but do not over-direct the narrator.

Deliver a timed script with columns: timecode, narration, on-screen text, visual intent, source IDs, and audio notes. Target approximately 125–150 spoken words per minute unless the chosen voice requires a different pace. Estimate runtime from the actual approved narration, not from a guessed word count.

##### Phase 4 — Visual direction and style system

If `vectoranimation.md` or reference videos are supplied:
1. Identify recurring visual principles: composition, palette, typography, shape language, line style, depth, transitions, camera movement, pacing, and information density.
2. Convert those principles into reusable rules, not scene-by-scene imitation.
3. Preserve the requested style while making original compositions and assets.
4. Build a one-page style sheet before producing scenes.

If no reference is supplied, use this default:
- Clean editorial documentary design.
- Restrained palette with one accent color and neutral backgrounds.
- Strong typographic hierarchy; no more than two type families.
- Thin, consistent diagram strokes and simple geometric forms.
- Cinematic footage with deliberate framing and restrained grading.
- Motion graphics that enter, explain, and exit with purpose.
- High contrast and legibility on mobile screens.

##### Phase 5 — EngineX and asset-library audit

Before custom work, inspect the available EngineX library:
- Read its README, manifests, skill files, component catalog, examples, and usage conventions.
- Inventory reusable 2D animations, 3D scenes, camera rigs, transitions, particles, text systems, diagram primitives, and render utilities.
- Record exact asset/component names, inputs, outputs, dependencies, license, and tested example.
- Map each planned scene to an existing asset where possible.
- Identify gaps only after the inventory.

Never fabricate a component or assume a feature exists. If the library cannot be inspected, produce a neutral integration plan with placeholders such as `[ENGINE_X_COMPONENT_FROM_CATALOG]`, and clearly list what needs verification.

Prefer this order:
1. Existing EngineX asset/preset.
2. Existing asset with parameter changes.
3. Compose existing primitives.
4. Create a new reusable component.
5. Use a one-off custom animation only when justified.

##### Phase 6 — Scene and shot design

Break the video into scenes of roughly 5–20 seconds, varying duration to fit the idea. For every scene specify:
- Scene ID and time range.
- **Muted takeaway:** what a viewer understands from the visuals alone, with the sound off. It must match the narration's point.
- Narration excerpt.
- Viewer takeaway.
- Visual category: cinematic footage / 2D motion graphic / infographic / diagram / mixed.
- Composition and focal point.
- Motion: what moves, direction, speed, easing, and why.
- Camera: static, pan, tilt, push-in, pull-out, tracking, parallax, or other justified move.
- On-screen text and exact spelling.
- Data/labels and source IDs.
- Asset references, including exact EngineX component names when verified.
- Sound design and transition into the next scene.
- Production method: existing asset, edit, generated asset, or custom build.
- Review risks and verification notes.

Do not prescribe a visual that contradicts the science. For example, distinguish conceptual illustration from a literal scientific visualization.

##### Phase 7 — Asset generation and footage

For each asset request, provide a production-ready brief:
- Subject and action.
- Environment and composition.
- Camera/lens/movement when relevant.
- Lighting, palette, texture, and depth.
- Aspect ratio and resolution.
- Duration and frame rate for video.
- Negative constraints (unwanted text, logos, extra objects, distortions).
- Continuity requirements across shots.
- Intended edit point and narration alignment.

Use AI generation for illustrative or atmospheric assets, not as a substitute for factual evidence. For real scientific instruments, historical events, or named products, use verified reference imagery or clearly label recreations. Keep a provenance/rights log.

##### Phase 8 — Voice and sound

- Approve narration text before final voice generation.
- Use a consistent narrator identity and delivery style.
- Generate in sections aligned to scenes; retain clean handles for editing.
- Check pronunciation, pacing, breaths, clipping, and unnatural emphasis.
- Build a sound map: ambience, transitions, impacts, mechanical textures, and music.
- Keep music under narration and duck it when needed.
- Use licensed, commissioned, or otherwise permitted music and effects.
- Never use sound effects to imply a real event that did not occur.

##### Phase 9 — Edit, composite, and finish (all on EngineX)

No local editor and no local rendering. The edit is assembled on EngineX, following `youtube-motion-graphics` (workflow steps 6–8 and `references/enginex-map.md`):
1. **Voiceover:** `emotive-speech/speak`, one take per chapter. Its `lines` timings (plus `transcribe/words` where a visual must hit a word) set each chapter's `TL`.
2. **Storyboard:** one page per chapter, copied from `assets/page-template.html`. `motion-graphic/snapshot` stills at each beat. Get approval.
3. **Rough cut:** `motion-graphic/render` at `quality: "draft"` per chapter, with the narration as `audio`. Review story and pacing.
4. **Final graphics:** refine the pages, then render at `quality: "high"` (and `resolution: "landscape-4k"` if genuine 4K is wanted).
5. **Sound:** sound-library effects as `<audio data-start>` cues inside each page. A music bed under the finished cut with `video/duck` (read `describe_operation` first), or a low fixed-volume bed in the page.
6. **Assembly:** `video/concat` of the chapters in order. `find_transition` plus `video/transition` only where an on-style wipe is wanted between chapters.
7. **Captions:** selective key-phrase captions drawn in the page (pills or kinetic text). Full subtitles: `transcribe/subtitle` on the final audio when the user wants an SRT.
8. **Final QC:** `motion-graphic/check` on each page, then `video/probe` on the master (duration, H.264, AAC 48 kHz, no gaps).

Keep chapter pages as the source of truth. Re-render a chapter rather than patching the master.

##### Phase 10 — Quality assurance and publishing

Review:
- **Mute test:** watch the draft with the sound off. Every scene's point must come through from the visuals alone.
- Factual accuracy and source traceability.
- Correct labels, units, chart scales, and spelling.
- Scientific plausibility and visual consistency.
- No AI artifacts, flicker, unintended morphing, or continuity errors.
- Readable text on mobile.
- Narration intelligibility and balanced audio.
- No clipping, black frames, missing media, or accidental gaps.
- Rights and attribution completed.
- Thumbnail/title match the actual video and do not overpromise.

Default YouTube export for SDR:
- 16:9 landscape.
- 1920×1080 minimum; 3840×2160 if the source and workflow support genuine 4K.
- Export at the same frame rate as the project/source (commonly 24, 25, or 30 fps).
- MP4 container, H.264 video, AAC-LC audio, progressive scan.
- 48 kHz audio.
- For 1080p SDR at standard frame rates, use about 8 Mbps as YouTube's recommended reference bitrate; for 4K SDR at standard frame rates, 35–45 Mbps. Adjust for content complexity and delivery needs.
- SDR color managed to Rec.709 / BT.709.

Always check current YouTube guidance before final delivery because platform recommendations can change.

#### Animation and motion standards

##### Timing and easing
- Use deliberate ease-in/ease-out for most explanatory movement.
- Use linear motion only for constant-speed movement such as a scanning line or conveyor.
- Avoid defaulting every element to the same duration.
- Overshoot (`back`) for objects and labels popping in. Soft or no overshoot (`eo`/`eio`) for serious beats: people, history, quotes, the ending.
- Stagger related elements to reveal hierarchy, not to create noise.
- Ensure the viewer has enough time to read every label and interpret every diagram.

##### Motion hierarchy
1. Primary subject or key mechanism.
2. Supporting labels and callouts.
3. Secondary context.
4. Decorative detail.

Decorative movement must never compete with the key explanation.

##### Typography and diagrams
- Use consistent type scale, weights, alignment, and safe margins.
- Keep on-screen copy concise; narration carries detail.
- Use consistent units, significant figures, legends, and axis scales.
- Label illustrative diagrams as conceptual when they are not to scale or not literal.
- Never distort charts to exaggerate a result.
- Use arrows, highlights, and color coding consistently.

##### Cinematic footage (inserts only; see House decisions)
- Real footage or photos appear only as framed inserts inside the vector scene (`depth-motion/animate` can give a photo a camera move).
- Use motivated camera movement and purposeful shot changes.
- Avoid gratuitous speed ramps, random zooms, and generic glitch transitions.
- Match lighting and color temperature across adjacent shots.
- Use establishing, detail, process, and human-scale shots to vary visual rhythm.

##### Continuity
- Maintain consistent object proportions, labels, colors, orientation, and screen direction.
- Reuse the same visual representation for the same technical object throughout the video.
- Match motion direction and eyelines across cuts where relevant.
- Do not silently change diagram conventions between scenes.

#### AI-assisted production policy

AI can assist with research discovery, outlines, script drafts, storyboard descriptions, image/video generation, voice drafts, subtitle drafts, and repetitive production tasks. Human review is required for:
- Every factual claim.
- Every technical diagram and data visualization.
- Every final voiceover.
- Every generated visual used to explain a real mechanism.
- Every final export and rights decision.

Maintain a production log of model/tool, prompt, output filename, edits, source references, and reviewer status. Do not publish unverified AI-generated facts or visuals.

#### Required deliverables

Create a project folder containing:

1. `00_brief.md` — premise, audience, promise, runtime, constraints.
2. `01_research.md` — source dossier and fact ledger.
3. `02_script.md` — timed narration with source IDs and pronunciation notes.
4. `03_style_guide.md` — visual system extracted from reference or default.
5. `04_enginex_inventory.md` — verified reusable assets and integration notes.
6. `05_storyboard.md` — scene-by-scene shot plan.
7. `06_asset_manifest.csv` — asset ID, filename, type, source/license, scene, status.
8. `07_voice_sound_plan.md` — voice, music, SFX, mix notes.
9. `08_edit_plan.md` — timeline structure, transitions, compositing, captions.
10. `09_qc_checklist.md` — fact, visual, audio, technical, and rights checks.
11. `10_publish_package.md` — title options, description, chapters, thumbnail brief, credits.
12. `final/` — final master, thumbnail, captions, and project archive as requested.

#### Completion criteria

A production package is complete only when:
- The script matches the target runtime.
- Every factual claim is traceable to a source.
- Every scene has a clear purpose and visual plan.
- EngineX reuse decisions are grounded in the actual library inventory.
- Assets have provenance and status.
- Audio, visuals, captions, and export pass QC.
- Publishing metadata accurately represents the finished video.

#### Default response format when invoked

Start with a short production summary, then provide:
1. Research and story angle.
2. Timed script.
3. Style system.
4. EngineX asset mapping.
5. Scene-by-scene production table.
6. Voice and sound plan.
7. Edit and export plan.
8. Deliverables and QC checklist.
9. Open questions or unverified dependencies.

Do not skip stages silently. If information is unavailable, mark it as a dependency rather than inventing it.

## Part 3: Motion-graphics workflow (`youtube-motion-graphics`)

### `youtube-motion-graphics/SKILL.md`

### YouTube Motion Graphics (Flat-Vector Science on EngineX)

One visual identity, many topics. The **graphics** come from the reference style (`references/style-guide.md`, code in `references/flat-space.js`). **Everything that renders, speaks or makes sound runs on EngineX**: nothing is rendered on the local machine.

Files:
- `assets/page-template.html`: a working EngineX page. It holds the H library, the style kit (exact functions from the reference), the finishing pass and the `hf-seek` glue, plus a demo scene. **Copy it per video and rewrite only the SCENES section and the `<audio>` cues.** Tested: renders on `motion-graphic/snapshot` and `motion-graphic/render`.
- `references/character-recipe.md`: the one house presenter (from `character-reference.png`) as a **modular rig**. It has a 3D skeleton with named joints, separate parts (head, neck, torso, upper arm, forearm, hand, leg, shoe) that all connect at those joints, 18 finger-based hand shapes (gestures, counting) with palm/back roll, 37 poses (including gestures and a full jump), 11 expressions, any view angle, `mixPose`/`poseAt` for animation, exact hand reach, and props (laptop, monitor, desk, chair, tablet, phone, pen). Already inside the template. `examples/character-sheet.html` shows it all (tested on EngineX).
- `references/scene-grammar.md`: **how the animation must look** (user's target, from a frame study of a Kurzgesagt Short):
  - every shot is a full place, not floating icons;
  - a new bold palette every 2–4 s;
  - subjects fill the frame;
  - characters act it out;
  - one recurring infographic tag;
  - zooms, whips, cuts and split screens.

  Read it before planning any chapter; it overrides the old "everything on the dark space stage" default.
- `references/style-guide.md`: the visual rules (palette, light, typography, motion, transitions, explaining devices). Read it before planning scenes.
- `references/enginex-map.md`: which EngineX operation does what, the verified facts, and what EngineX cannot do yet. Read it before any EngineX call.
- `references/flat-space.js`: the full reference source. Read it for how a beat is built: `exA`/`exB`/`exC` are the scenes, `explainer()` holds the transitions. Ignore its `explainerSound`, because sound comes from EngineX.
- `examples/sample-plan.md`: a short script turned into a full scene plan. Use it as the output format.

Use the `engine-x` skill's rules for every EngineX call:
- Use `find_operation` and `describe_operation` before you run anything.
- Run with `waitMs`, and use `get_job` if the job is still running.
- Hand back links with `sign_output`, never raw keys or JSON.
- Upload files with `create_upload_url` plus `curl -T`.

#### Workflow

##### 1. Script analysis
- Read the script, or ask for one. If the user gave only a topic, write a short spoken script, mark it as a draft, and get it approved.
- List:
  - the one-sentence takeaway;
  - the key number or reveal (the emphasis moment);
  - every fact, number or claim that will be shown on screen. **Verify each one.** Wrong science in a pretty frame is the worst failure here. Put anything you had to assume in the plan's "assumed facts" list.

##### 2. Scene breakdown
Split into **chapters** (one per idea, about 20–90 s each). Split each chapter into **beats** of 1–2 s where something visibly changes. The hook clears within ~2 s. The takeaway holds ~1 s at the end of the video.

For each beat boundary, decide one of two things:
- **Continuous** when the idea builds on the last one. Elements stay and move, grow or morph: a label becomes the heading, a counter grows into a chart, the camera travels to the next part of the same scene.
- **Scene change** when the story moves on (new topic, a jump in place or time, before/after, a reveal). Use the medium's own transitions: scale pull-back, foreground-planet sweep, dive-in bloom, camera tilt (`style-guide.md` § Transitions).

Mix the two. Don't cut on every beat, and don't force one unbroken shot.

##### 3. Visual planning
**The core rule: the visuals must tell the story on their own.** A viewer watching with the sound off (common on phones) should still understand what each beat is saying. The narration adds depth and emotion; it must never be the only carrier of the meaning.

For every beat, ask "what does a muted viewer understand from this frame?" and make the answer match the narration's point:
- **Show the claim, not just the topic.** "Touch tires your arm" is an arm lifting again and again while a fatigue meter fills, not a laptop sitting still.
- **Show change as change:** before → after, a morph, a counter, a bar that fills, a red cross that breaks. Contrasts get a split screen or a side-by-side.
- **Show cause and flow with arrows** that draw on in the direction of the cause.
- **Show feelings and verdicts:** character expressions, ✓/✗ badges, red or green state colours.
- **Anchor time and identity with minimal English text:** a year, a product or person name tag, a key number, a one-word stamp. Use just enough text that the picture can't be misread.
- **No subtitles and no narration on screen** (user rule). Never put the spoken words, or a quote the voice is saying, on screen as text or captions; it looks odd. The voice carries the words; the picture carries the meaning.
- **Every abstract word needs a concrete picture:** "precision" is a thick wobbly finger line next to a fine pencil line.

Then decide per beat the most effective device: an object with a landing label, a dotted cause arrow, a counter, a loop diagram, a ring or bar that fills, wrong/right badges, a character reaction, or a scale comparison.
- Draw subjects accurately for the topic, inside the style: Earth has continents, a cell has a membrane and nucleus, a star is self-lit.
- People: the house presenter from `character-recipe.md`. Real public figures appear only as a featureless silhouette with a name pill.
- Don't reuse the reference's robot, cat or dog unless they genuinely fit.
- Pick the emphasis move for the key moment: number pop, flare, burst, flash.

##### 4. Asset selection
See `enginex-map.md` for each item.
- **2D:** draw it yourself with the style kit in the page (the default for nearly everything).
- **3D (optional):** three.js inside the same page with flat or toon materials in the palette. Blender `text-3d` or `turntable` and Unreal `scene` only when a beat truly needs real 3D and the user accepts a lit-studio look. Composite those renders into the page as `<video data-start>`.
- **Voice:** `emotive-speech/speak`, with a house voice recorded from a real person, with directions in [brackets] where the feeling changes.
- **Sound:** `find_sound` for each cue type and one ambience or music bed. Listen to candidates (the `listen` link) before using them.
- **Library blocks and transitions** (`motion-graphic/catalog`, `find_transition`): only when one fits the look. Film burns, glitches and light leaks do not fit.

##### 5. Animation planning
- Write one `TL` object per chapter (seconds). Picture and sound both read it, so they can't drift.
- Use the reference's easing vocabulary:
  - `back` overshoot for pop-ins of objects and labels; soft (`eo`/`eio`, no overshoot) for serious beats, people and the ending;
  - `eo` for arrivals;
  - `eio` for camera moves and draw-ons;
  - stagger 0.1–0.16 s;
  - idle bob and blink so nothing is ever dead still.

##### 6. Audio synchronization
1. Render each chapter's narration with `emotive-speech/speak`. Its `lines` output gives each line's start and end. For word-level sync, run `transcribe/words` on the audio.
2. Set the TL times from those timings. A visual event lands on its stressed word, within ±2 frames. Camera moves finish as the phrase that needs them starts.
3. Put effects in the page as `<audio src="assets/<library file name>" data-start="<TL time>" data-volume="…">` and pass their `sound:<id>` in `media`.
4. Pass the narration as the render's `audio`.

Levels under narration:
- effects 0.3–0.6;
- bed ≤ 0.2;
- no more than ~3 sounds at once;
- silence before the big hit.

##### 7. Scene composition (build and render)
1. Copy `assets/page-template.html` to the project folder as `<video>/<chapter>/index.html`.
2. Write the chapter's `TL` and `explainer()`, and set `DURATION` and `data-duration` to the chapter length.
3. Zip `index.html` and upload it with `create_upload_url` plus `curl -T`.
4. **Storyboard first:** run `motion-graphic/snapshot` with `at` = one key time per beat. Show the user the stills next to the plan, then **wait for approval**.
5. Preview: `motion-graphic/render` with `quality: "draft"`.
6. Final: `quality: "high"`, plus `resolution: "landscape-4k"` if wanted (the canvas follows devicePixelRatio).
7. Join the chapters with `video/concat`. Add a music bed under the finished cut with `video/duck` (check `describe_operation` for its parameters first).

##### 8. Quality review
Before you hand anything over:
- **Mute test:** go through the storyboard stills (and later the draft render) with the sound off. Write down what each beat says on its own. Any beat whose meaning only comes from the narration gets redesigned.
- `motion-graphic/check` (errors, overflowing text, contrast).
- Look at snapshot stills at every beat's key time.
- `video/probe` the result: duration, and that it has an audio stream.
- Go through the checklist below.

#### Output for every video
1. **Scene plan**: the table in `examples/sample-plan.md`. Columns: chapter or beat, time range, narration segment, on-screen text, visual and device, continuous or scene change (which transition and why), camera, sound cues, EngineX assets.
2. **Assumed facts** list.
3. **Storyboard stills** (snapshot links), then wait for an OK.
4. Each chapter's `index.html` (from the template) and the EngineX calls made.
5. Final video link(s), plus what was skipped or approximated.

#### Consistency checklist (every video, every chapter)
- [ ] **Passes the mute test:** with the sound off, every beat's point is clear from the visuals plus minimal English text.
- [ ] Every frame is built from the style kit: sky, balls with two crescent shadows and a rim, glows, pills, long-shadow text, dotted arrows. Nothing is outlined or flat grey.
- [ ] `finish()` runs on every frame (already in the template glue: don't remove it).
- [ ] Light comes from the upper left, everywhere.
- [ ] Phone legibility at 1280×720 logical:
  - headlines ≥ 44 px;
  - any label the story depends on ≥ 28 px, the corner header included;
  - key numbers ≥ 64 px;
  - each beat fills most of the frame.
- [ ] The topic header pill stays top-left after the hook.
- [ ] Every frame is a pure function of t. Use `H.rng` or `H.makeNoise` for randomness. Never use `Math.random`, `Date`, timers or `requestAnimationFrame`.
- [ ] Every fact on screen is verified or listed as assumed. Sizes that aren't to scale are labelled "not to scale".
- [ ] Each sound starts on the frame its event appears. Narration stays clearly on top.
- [ ] No device is repeated just for consistency: each visual earns its place.

### `examples/sample-plan.md`

### Sample: script → scene plan

**Script (draft, 30 s):**
> Your body meets millions of germs every day. Most never get a chance. That's because of white blood cells. When a virus gets in, they spot its spiky proteins, called antigens. Then they build antibodies, shaped to lock onto exactly those spikes. Locked-on viruses can't enter your cells. And memory cells keep the recipe. So next time, your defence starts in hours, not days. A vaccine is a safe preview: it shows your immune system the spikes, without the disease.

**Takeaway:** A vaccine is a safe preview that trains your defences.
**Key moment:** "hours, not days" (the second response is much faster).

#### Chapter 1: "How vaccines train your body" (0–30 s, one page)

| Beat | Time | Narration | On screen | Visual and device | Flow from previous | Camera | Sound cues |
| :- | :- | :- | :- | :- | :- | :- | :- |
| 1 Hook | 0.0–2.2 | "Your body meets millions of germs every day." | Title "How do vaccines work?" ("vaccines" in yellow) → header pill | Word-by-word pop, then shrink to the corner | Open: pull-back through the particle field | z 2.8 → 1 | pop per word; soft whoosh on the pull-back |
| 2 Germs | 2.2–4.5 | "Most never get a chance." | Counter "1,000,000+ germs" (64+ px) | Many tiny spiky balls drift in; counter eases up | Continuous: the field fills | slow drift | soft click ticks ≤ 12/s; marimba accent on landing |
| 3 Defender | 4.5–6.5 | "…white blood cells." | Pill "white blood cell" | A big round cell (`ball`, pale lilac triad, eye pair) pops in with `back` | Continuous: germs part around it | punch-in ×1.3 | echoing pop; marimba accent on the label |
| 4 Antigens | 6.5–9.5 | "…spiky proteins, called antigens." | Pill "antigen" with pointer to one spike | One virus enlarged; its spikes glow yellow in sequence | Continuous | push toward the virus | soft click per spike |
| 5 Antibodies | 9.5–13 | "…shaped to lock onto exactly those spikes." | Pill "antibody" | Y-shaped antibodies (rounded `rr` arms) fly along dotted cyan arrows and click onto the spikes | Continuous: arrows draw from the cell to the virus | hold | whoosh per arrow; hollow pop as each locks on |
| 6 Blocked | 13–15.5 | "Locked-on viruses can't enter your cells." | ✗ badge on the virus; pill "blocked" in red | Virus bounces off a body-cell membrane; red edge flash | Continuous | small shake | error or "nope" sound; thud on the bounce |
| 7 Memory | 15.5–18 | "And memory cells keep the recipe." | Pill "memory cell" in cyan | Dive-in bloom into the white blood cell; a small memory cell holds a glowing antibody icon | **Scene change: dive-in.** The story moves inside, to a new mechanism | ×16 dive, whiteout, settle | riser into the bloom; chime soft as the memory cell appears |
| 8 Key moment | 18–22.5 | "…in hours, not days." | Two bars: "1st time: days" (muted) vs "next time: hours" (yellow) + "hours" pops at 96 px | Bars grow; the second is fast; flare and burst on the word "hours" | Continuous inside the memory scene | punch-in on the number | silence for 0.3 s, then an impact plus chime on "hours" |
| 9 Vaccine | 22.5–27.5 | "A vaccine is a safe preview…" | Pill "vaccine = safe preview" | A syringe drops a harmless spike-only shell (no virus core); antibodies form again calmly | **Scene change: planet sweep.** From mechanism to the practical answer | sweep 0.9 s | whoosh with the sweep; marimba accent on the label |
| 10 Takeaway | 27.5–30 | "…without the disease." | "Vaccines train your defences" / "before the real thing" | Camera tilt; cells and the memory cell bob happily; sparks | Camera tilt to the takeaway | tilt up | chime soft resolving; held 1 s |

#### EngineX assets
- Narration: `emotive-speech/speak`, voice `owen` (tech explainer), lines split at each beat with `[curious]` on the hook and `[warm]` on the takeaway. `lines` timings → TL.
- Sound effects: `find_sound` "echoing pop", "hollow pop", "marimba accent", "soft click", "whoosh", "riser", "impact", "chime soft", "error". All as `media`, cued with `<audio data-start>`.
- Bed: `find_sound` kind ambience "space soundscape" (or a calm, curious music track at 0.15).
- Render: one page (template copy) → snapshot at 1.0, 3.5, 5.5, 8, 11, 14, 17, 20.5, 25, 29 for the storyboard → draft render → high render.

#### Assumed facts (to check before building)
- "Millions of germs every day" is a common simplification; the exact number varies widely. It is shown as "1,000,000+".
- "Hours, not days" is a simplification. The primary response takes days to a week or more; the memory response is much faster (often within a day or so). The plan says "faster" if the user prefers caution.
- Vaccine as a "spike-only shell": true for protein-subunit and mRNA-encoded spike vaccines, not for every vaccine type. The on-screen wording stays generic.

## Part 4: Channel motion style (`channel-motion-style`)

Shared references (style guide, scene grammar, character recipe, EngineX map) appear once here; the copies under `youtube-motion-graphics/references/` are identical (`style-guide.md` = `house-style-guide.md`, `scene-grammar.md` = `house-scene-grammar.md`).

### `channel-motion-style/SKILL.md`

### Channel motion style

The rules, in priority order:
1. The visuals tell the story with the sound off.
2. Every frame sits on measured geometry.
3. Compositions **transform into each other** instead of cutting.
4. One house look and one presenter.
5. Everything renders on EngineX and is **inspected as frames** before it counts as done.

#### Read, by need
- **Before planning:** `references/WORKFLOW.md` (the 8 steps), then `references/COMPOSITION-SYSTEM.md` (layouts A–G, the §3 selector, safe areas, label spots).
- **Before animating:** `references/ANIMATION-GRAMMAR.md` (move specs, durations, eases, transitions, camera, continuity).
- **Before drawing:** `references/STYLE-BIBLE.md`. For detail: `references/house-style-guide.md`, `references/character-recipe.md` (the presenter rig), `references/house-scene-grammar.md` (the user's rules 10–17).
- **Before any EngineX call:** `references/ENGINEX-GUIDE.md` (build, smoke, audit, snapshot, render) and `references/enginex-map.md` (voice, sound, 3D, concat). Use the `engine-x` skill rules: `describe_operation` first, `sign_output` for links.
- **Storyboard format:** `assets/storyboard-template.md`.
- **Worked, rendered examples:** `validation/` (V1 = A, V2 = C, V3 = G, V4 = A→B→C in one shot) and `validation/VALIDATION.md`.

#### Non-negotiables
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

#### Done means
All of these hold:
- `tests/comp.test.js` passes.
- `tests/smoke.js` passes.
- `tests/audit.js` passes.
- Debug snapshots at the landing **and mid-transition** times were looked at.
- The final render was looked at and passes the mute test.
- Deviations were written down, and fixed or listed.

Report what was verified and what was not.

### `references/WORKFLOW.md`

### Storytelling workflow: from narration to rendered video

Output folders follow the project rule: `<project>/script, research, plan, storyboard, pages, audio, renders`. Create a folder only when it has something in it.

#### 1. Analyse the narration
- Read it all before planning anything. If there is only a topic, write a draft script and get it approved.
- Write down:
  - the one-sentence takeaway;
  - the key reveal or number;
  - every on-screen fact. Verify each one, or list it as assumed.

#### 2. Find the beats
- **A beat** is one idea the viewer must get. Usually it is 1–3 sentences, not one sentence.
- Mark **informational turns** (new idea, new scale, new place, new time) and **emotional turns** (worry, curiosity, relief, wonder).
- Group beats into **sequences**: runs that share a place or a subject. A sequence is usually one continuous shot.

#### 3. Plan the visual progression
- **Palette arc:** one bold palette per idea, changing at informational turns (`STYLE-BIBLE.md` §3).
- **Shot-size arc:** alternate close, medium and wide, and never stay at one size for long.
- **Composition per beat:** use the selector in `COMPOSITION-SYSTEM.md` §3. A continuous shot may hold several compositions.
- **Durations follow content, not a clock:** at least the narration time of the idea, plus about 0.5 s per element the viewer must read, plus at least 1 s to hold after landing. A complex diagram earns more; an emotional close-up can be short. The study's 11.4 s mean shot is about **shots**, not compositions.
- **Cuts:** only at a jump in place, time or topic (`ANIMATION-GRAMMAR.md` §4). Never cut per sentence.

#### 4. Define reusable assets
- **Presenter poses and expressions** per beat (`character-recipe.md`).
- **Object functions** that take a size and a slot: draw once, reuse in every composition (e.g. `rocky(x, name, cx, cy, r)` is used in V2 and V4).
- **Recurring tag:** `barTag` top-left for the chapter or key variable.

#### 5. Storyboard
- Fill in `assets/storyboard-template.md`: a sequence map plus one card per composition change.
- Render storyboard stills with `motion-graphic/snapshot` at each card's landing time, from a `--debug-grid` build. Check them against the slots, then show the user the **no-grid** stills.
- **Wait for approval.**

#### 6. Animate
- Write each shot as `TL` times plus move specs (`ANIMATION-GRAMMAR.md` §2).
- Use one scene file per chapter (`DURATION`, `explainer(x, W, H_, t)`, a `//PLACEMENTS` block per landing composition).

#### 7. Implement and render
Follow `ENGINEX-GUIDE.md`: build, smoke test, audit, snapshot, draft render, inspect, then the final render.

#### 8. Inspect and refine (a loop, not a formality)
- Look at **actual frames**, including mid-transition frames, not only the landings. Most defects live there: V4's grey bloom and colliding planets were only visible at 3.8 s and 8.0 s.
- Write down each deviation, fix the cause, and re-render. Record anything that changes a rule in that reference file.
- Do a mute test on the draft.
- Narration sync: visual hits land on their stressed word within ±2 frames (`transcribe/words`).

### `references/COMPOSITION-SYSTEM.md`

### Composition system

Source: `kurzgesagt_grid_study/STUDY.md` (149 gridded frames of "How I Survived Late-Stage Cancer", 1080p60, every 6 s). The study's numbers are the **measured specification**. This file formalizes them and does not re-derive them. The code version is `assets/comp.js` (`COMP.slots.A()` … `COMP.slots.G()`); `tests/comp.test.js` checks it against the study's numbers.

**Units:** every position is normalized: x as a fraction of W, y as a fraction of H. `COMP.px(nx, ny, W, H)` converts. The page's logical canvas is 1280×720, so 0.5W = 640. The study's pixel numbers are for 1920×1080. The same fractions work at any size.

**This is geometry, not art.** It tells you *where* things go. *What* they look like comes from `STYLE-BIBLE.md`. The guide lines exist only in `--debug-grid` builds and never appear in final artwork (`build.py` asserts this).

#### 0. Evidence levels
Each rule below is tagged with one of these:
- **[M] measured:** a number read off the gridded frames (STUDY §1–3).
- **[P] repeated pattern:** seen in several contact-sheet frames, not measured precisely.
- **[I] inferred principle:** a design reason that explains [M]/[P]. Used for decisions, not checked.
- **[U] unverified assumption:** our own default with no evidence. Can be changed freely.

Spot-checked again on 2026-11-04 against the full frames t=0, 474 and 684 s:
- **A** holds (the face spans 640–1280 px, eyes at about 0.48H).
- **C** holds (centres 0.17 / 0.38 / 0.59 / 0.82; labels 0.85–0.91H).
- **G** holds (heads at about 0.46H).

#### 1. Constants

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

#### 2. The seven presets
They are presets, not templates. Pick one only when it serves the beat (§3). A beat can also use a custom layout (§4).

##### A. Centred hero: the middle third (most common shot) — `COMP.slots.A({fullBody})`
- [M] One subject, symmetrical on x = 0.5. Its main body spans **x 1/3–2/3**.
- [M] **Close-up:**
  - eye line at y = 0.5;
  - brows on the golden line 0.382;
  - mouth or chin on 2/3.
- [M] **Full body:** head top at 0.07, feet at 0.93 (`COMP.fitFullBody`).
- [I] Use it for the person the story is about, for direct address, and for a single object as "the thing".
- **House rig fit:** `COMP.fitPerson(rig, opts, 0.5, 0.5, 1/3)` puts the presenter's eyes on (0.5, 0.5) with the head 1/3 W wide. Validated in V1 (eyes at 0.50H, face 640–1280 px).
- **Exception (V1):** the presenter's tall hair reaches y ≈ 0.02 and crosses the 5% line. Treat hair above the head as `bleed`.

##### B. Four-point star on the thirds intersections — `COMP.slots.B()`
- [M] Four items exactly on (1/3, 1/3), (2/3, 1/3), (1/3, 2/3), (2/3, 2/3).
- [M] The centre item sits at the optical centre (0.5, 0.47), not the true centre.
- [M] One label pill centred at y ≈ 0.87.
- [I] Use it for a structure with a hub (a molecule, an ecosystem, four causes around one effect).

##### C. N items in a row — `COMP.slots.C({n, m})`
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

##### D. Subject + object on a third/golden split — `COMP.slots.D({flip})`
- [M] Subject at x ≈ 0.43; object at x ≈ 0.618 (golden line). They are linked by a curved connector (tube, arrow, gaze).
- [M] If one element must glow, it sits on the golden line, just below centre (chest port, t = 102 s).
- [M] A label goes on the **outside** of its object, never between the two subjects.
- [I] Use it for cause and effect, tool and user, or "this acts on that". Use `flip: true` when the story flows right to left.

##### E. Big number — `COMP.slots.E()`
- [M] The number is centred on (0.5, 0.5), spans x 0.29–0.70, and is about H/4 tall.
- [M] An optional dot matrix fills x 0.08–0.92 and y 0.25–0.90 at a pitch of W/42.
- [M] A title bar flush left at y 0.06–0.13, width 0.65W. A source citation bottom-right at y ≈ 0.96 inside the 5% margin.
- [M] A variant puts a solid pill at dead centre with the subjects arranged symmetrically around it (t = 228 s).
- [I] Use it only for the **one** key number of a section. Two big numbers in a row dilute both.

##### F. One-point room — `COMP.slots.F({k})`
- [M] The vanishing point is at (0.5, 0.5). The back-wall corners lie **on the frame diagonals**.
- **Build it:** draw the back wall as the frame scaled by k ≈ 0.55 about the centre, then join its corners to the frame corners.
- [M] The light cone and the key object are symmetrical on x = 0.5.
- [I] Use it for "a place where something happens to one thing" (a lab, a chamber, a room the camera will push into).

##### G. Wide environment — `COMP.slots.G({n})`
- [M] The tabletop and horizon line sit at **y = 2/3**. **Every head is on one eye line, y ≈ 0.45**, whatever its distance.
- [M] Three depth layers:
  - far: 60–70% darker;
  - middle: the characters;
  - near: a dark silhouette over one corner (measured: bottom-right).
- [M] The top 25% is a framing element (an awning, a ceiling, foliage).
- [U] Characters spread at `rowCentres(n, 0.10)` as a default. The café frame groups them unevenly, which is also fine.
- **Seated presenter:** fit his head at (x, 0.45) with head width ≈ 0.068W. The desk or table top then lands on about 0.665H automatically (V3).

#### 3. Selector: which layout for this beat
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

#### 4. Custom compositions
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

#### 5. Text and label positions (fixed) [M]

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

#### 6. Timing evidence [M]
- **Story section:** 61 shots in 11:36, a **mean of 11.4 s**; the longest single shot is 84 s.
- **Sponsor section:** a mean of 4.1 s.
- One shot holds several compositions, joined by push-ins, morphs and background wipes.

Implication [I]: plan compositions per *idea*, not per sentence, and join them with transforms. The study's "about 5–6 s per composition" comes only from the 6 s sampling rate, so it is **not** a rule. Set each composition's duration from the narration, the information density and the visual complexity (`WORKFLOW.md` §3).

### `references/ANIMATION-GRAMMAR.md`

### Animation grammar and transition system

**Evidence:** the study samples one frame every 6 s, so it proves *which* compositions follow each other inside one shot (STUDY §3: an 11.4 s mean shot, an 84 s longest shot), but not frame timing.
- Sequences read from the contact sheet are marked **[P]**.
- Durations and easing come from the house kit's own code (`vectoranimation.md` / the template's `back`, `eo`, `eio`), marked **[H]**.
- Our defaults are marked **[U]**.

**Code:** `COMP.arc`, `COMP.stagger`, `COMP.cam` / `camMix` / `withCam`, `COMP.parallax`, `COMP.wipe.*` in `assets/comp.js`, plus the template's `back(u, s)`, `eo`, `eio`, `seg(t, a, b)`, `mixPose`, `poseAt`.

#### 1. The core rule: transform, don't cut
A new composition is reached by **moving what is already on screen** into its new slots. Cut only when the story jumps in place, time or topic (§4).

Sequences that prove it in the reference [P]:
- A molecule (B) is re-labelled, then becomes a lab bench.
- A row of patient faces (C) collapses into the "81%" matrix (E).
- An IV bag (F) drips into a body (D), then the camera pushes into the chest.
- Four organs build up in place over three frames (C).

#### 2. Every move is written as a spec
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

#### 3. Durations [H, scaled to the story]

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

#### 4. Transition catalogue
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

#### 5. Camera behaviour
- The camera is a world point plus a zoom: `COMP.cam(cx, cy, z)`. One `withCam` wraps the world; UI (tags, labels in fixed spots) is drawn **outside** it so it stays put.
- Move the camera **only** for a reason in §4. Settle with `eio`, then hold.
- Small "breaths" (z ± 0.03–0.05 during a transform) add life without a reframe (V4).
- After any camera move, the landing frame must satisfy the target layout's slots. Check it with a `--debug-grid` snapshot.

#### 6. Character continuity
- There is one presenter (the `person` rig). His design never changes; only the pose and expression do. Carry him between compositions by re-fitting his head every frame: `COMP.fitPerson(rig, o, x, y, headW)` with an arc for the position and a log-lerp for `headW` (V4).
- The expression changes at the beat: neutral → thinking → surprised → happy. Switch mid-move, not after it.
- He looks at what matters: `headTurn` toward the new focal point while the transform plays.

#### 7. Proven sequences (rendered)
- **V4 (12 s, one shot):** A (close-up, thinking) → [2.6–5.0 s] → B (Sun at 0.47 + four planets on the thirds) → [6.8–9.2 s] → C (row of four, labels at 0.88).
  - Carried over: the presenter (to the corner, then exits left), the idea-glow (becomes the Sun, then collapses), the planets.
  - Defects found and fixed:
    - a full bloom washed the frame grey (now peak 0.4);
    - two planet paths collided (now reverse stagger);
    - the B label lingered (now gone before the move).

### `references/STYLE-BIBLE.md`

### Visual style bible

Two separate sources, kept separate on purpose:

| | Source | Gives us | Do not take |
|---|---|---|---|
| **House art direction** | `vectoranimation.md` (via `house-style-guide.md`), `character-reference.png` + `character-recipe.md`, the user's rules (memory, `house-scene-grammar.md` rules 10–17) | **what things look like**: shapes, shading, colour, character, labels | — |
| **Kurzgesagt reference** | 149 frames + contact sheet | **geometry** (`COMPOSITION-SYSTEM.md`) and a few observed illustration habits (§3) | its characters, scenes, logos, palettes as a set, layouts copied 1:1 |

Where the two disagree, the house wins. Example: Kurzgesagt draws flat faceted faces; we use the house presenter.

#### 1. House look (summary; full detail in `house-style-guide.md`)
- **Shape language:** flat vector, **no outlines**. Rounded, chunky masses. Every solid is a multi-stop gradient.
- **Light:** one light, from the **upper left** (`la = -2.25`), everywhere. Each form gets two stepped flat shadow crescents at the lower right plus a thin rim crescent at the upper left (`ball()`, `flatShade()`).
- **Glow:** soft radial `glow()` halos behind important objects. Self-lit objects get a weak shadow and a big glow. No blur filters.
- **Finish:** `finish()` runs on every frame (fbm mottling plus 24 fps grain). Never remove it.
- **Colour:**
  - accents yellow `#ffd23f`, cyan `#56e8ff`, green `#38e08e`, red `#ff3b5c`, pink `#ff5d8f`, violet `#8b5cff`;
  - each new subject gets a light / mid / dark triad, its dark pushed toward blue or violet;
  - backgrounds are bold flat palettes per idea (cream, violet, cyan, hot pink), with dark navy or violet for history, mystery and space.
- **Hierarchy:** exactly one high-contrast or glowing element per frame (also a composition rule). Everything else is dimmer, smaller or darker.
- **Depth:** three layers where there is a place (§G): the far layer 60–70% darker, the middle layer full colour, a near silhouette. Drop shadows `rgba(10,8,46,.4)`, offset down.

#### 2. The presenter (from `character-reference.png`; rig in `character-recipe.md`)
- **Design:**
  - one young man, about 6 heads tall, with a slightly oversized rounded head;
  - dark wavy hair with a fringe;
  - a navy hoodie open over a white tee, slate jeans, white sneakers;
  - warm peach skin.
- **Palette:** hoodie `#5062c8 / #2b3678 / #161b4c`; skin `#ffdcc2 / #f6b28b / #d27a5a`; hair `#3b4585 / #181c46 / #0a0c24`.
- **Face:** simple expressive eyes and mouth. Eleven expressions (neutral, happy, excited, surprised, thinking, sad, angry, confused, winking, laughing, tired).
- **Silhouette test:** he must read at 200 px tall. Below that, use a wide-shot role, not a face beat.
- **One human.** Bystanders in wide shots are simpler, flat-faced figures (V3) in darker background colours, so they never compete with him.
- **Real public figures:** a featureless silhouette plus a name tag.
- **Hands:** no gripping hands holding devices (devices float). Only the shaped pointing hand (`assets/pointing-hand.js`) for touches. No "meat-ball" hands.

#### 3. Kurzgesagt illustration habits we *adopt* (observed in the frames) [P]
- **Labels:** small flat rectangles with a tiny pointer triangle aimed at the item (t = 474 s). Our version is `labelTag(..., {ptr})`: house colours and white Nunito 900 caps.
- **Neon rim glow** on the hero items against a deep violet field (the organ row at t = 474 s). This matches the house `glow()`; use it for the one focal item.
- **Bold flat background per idea:** pale cream for people and story; deep violet or indigo for the body and science; hot red for danger. The palette change marks the idea change.
- **Dark foreground silhouettes** framing wide shots (t = 684 s).
- **Data screens** (E): one huge number plus a dot field, a flush-left title bar, a small source pill.

#### 4. Things that make it look generic or AI-made (avoid)
- Floating icons in empty space: every beat is a **place** or a **built diagram** (house rule 1).
- Everything centred, every beat: use the selector's anti-repetition rules.
- Grey bystander pills, stock-looking clip art, inconsistent light direction, outlines on some shapes and not others.
- More than one glowing or high-contrast element.
- Text that repeats the narration, big headlines, subtitles.
- Inaccurate subjects: Earth has continents and ice caps, planets are labelled "not to scale" when the sizes are equal, a cell has a membrane and a nucleus.

#### 5. Selective 3D
Use three.js inside the same page (`libraries: ["three"]`) with toon or flat palette materials and an upper-left key light, with the 2D sky behind and `finish()` over it. Use Blender or Unreal (studio look) only for a deliberate stinger or product beat. See `house-style-guide.md` §11.

### `references/house-style-guide.md`

### Flat-Vector Science: style guide (graphics only)

Distilled from `vectoranimation.md` / `flat-space.js`. Function names refer to the style kit in `assets/page-template.html`. All sizes are logical 1280×720 units.

#### Contents
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

#### 1. Look and palette
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

#### 2. Light, shading and depth
- One light, from the upper left (`la = -2.25`), everywhere.
- `ball()` is the core primitive: a linear gradient, two **stepped flat shadow crescents** at the lower right (`sha` ≈ 0.4–0.55), and a white **rim crescent** at the upper left. Build round things from it. Build other shapes the same way: base gradient, then a flat darker crescent or offset shape, then a thin light rim.
- Self-luminous things (stars, fire, screens) use `sha` ≈ 0.15, a stronger rim, and a big `glow()`.
- Depth comes from soft radial `glow()` halos behind important objects, star parallax (`sky()` with cam `x`, `y`, `z`), scale, and drop shadows `rgba(10,8,46,0.4)` offset slightly down. Never use blur.
- Planets: `planet()` with bands, back and front ring halves, and a limb atmosphere on the lit side.

#### 3. Backgrounds and finishing
- `sky()` (a diagonal navy→violet gradient, nebula glows, parallax stars and sparkles) is **one environment, not the default stage**. Use it for space, history, mystery and transitions. Per `scene-grammar.md`, most beats get their own full illustrated place with a bold flat palette (rooms, streets, sky, ocean, cross-sections).
- `finish()` runs on every frame: an overlay of static fbm mottling (α 0.12) plus a 256 px grain tile jittered per frame at 24 fps (α 0.09). It removes gradient banding and is what makes the look read as printed. Never remove it or weaken it. The template glue already calls it.

#### 4. Typography and labels
- Fonts:
  - **Nunito 900** for headlines, words in the title and numbers;
  - **Nunito 800** for secondary captions;
  - Fredoka is loaded as a fallback.
- `text()` is flat text with a long shadow (`rgba(10,8,46,0.55)`, offset 3%/7% of the font size). Use it for all text on the sky.
- `pill()` is a rounded label: drop shadow, gloss strip, ink text, optional pointer (`ptr`) pointing at the object. Backgrounds: white by default, `C.yellow` for the hero, `C.cyan`, `C.green` or `C.red` for state.
- **Hook title:** words pop in one at a time (`back`, stagger 0.12–0.13 s, rising 40 px). The key word is yellow. After about 1.6 s the title shrinks and glides into the **corner header pill** (top-left, 28 px), which stays for the rest of the chapter.
- Takeaway: two lines, white then yellow, popping in 0.25 s apart, optionally with the rounded `drawArrowGlyph` in front of the second line and twinkling sparks.
- Minimum sizes: headline 44, any label the story depends on 28, key number 64. Typical: title 84–88, takeaway 64–76, number 96–150.

#### 5. Numbers and data
- **Counters** ease up with `v = target * seg^2.3`, use thousands separators, and have a unit word beside them (800 weight, `#bfe9ff`). On landing, the number turns yellow and pops (`1 + 0.22·sin`). Add `burst()`, and `flare()` for the biggest one.
- **Progress, percent and accuracy** become physical: a planet's ring fills, or rounded bars grow (gradient `#ffe680`→`#ff8d3f`, radius = width/2, drop shadow).
- Show "from X" in a muted colour first, so the change reads.

#### 6. Motion and timing
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

#### 7. Camera and transitions
The reference changes scene in four ways. Use these, not generic cuts or wipes.
1. **Scale pull-back** (`exA` zoom): the world scale goes `s = exp(lerp(0, log(0.06), eio))` while the stars zoom with `z`. Objects shrink until many of them become a pattern (a galaxy of dots, a crowd, a texture). Use it to show quantity or context.
2. **Foreground-planet sweep** (`explainer()`): a huge `planet()` (r ≈ 880) crosses from `W+980` to `-980` over ~0.9 s with eio. The scene underneath swaps when its centre passes x = 640. Use it for a new topic or place.
3. **Dive-in bloom** (`exB` → `exC`): the camera scales ×16 into a glowing object (`H.ease.in`), a radial whiteout (`#fff6d0` → `#8ff0ff` → `#6a4cff`) covers the swap, then the new scene settles from `1 + 1.3·(1 - eo)` zoom. Use it for "inside", detail and mechanism.
4. **Camera tilt** (`exC` takeaway): the sky's `y` slides, the old elements slide up and fade, and a horizon planet rises. Use it for the conclusion.

Inside a scene:
- small punch-ins (zoom ×1.3 toward the detail, then back);
- a parallax travel (`sky` cam `x`);
- a hook pull-back at the start (`z = 1 + 1.8·(1 - eo(seg(t, 0, 1.4)))`).

#### 8. Explaining devices
- **Cause and flow:** `arrow(P, prog, col, lw, {dots:true})`, a chunky dotted rounded cubic in cyan (red for an error signal), drawn on with eio, with the head appearing as it draws. Small glowing dots can travel along it to show flow.
- **Labels land on what they label:** a pill pops beside or above the object right after the object arrives (≈ +0.3 s), with its pointer toward the object.
- **Cycles:** a dotted elliptical loop with three or four pill stations. The active station is bigger, coloured and glowing.
- **Wrong and right:** speech `bubble()`; `badge()` ✗/✓ popping with snappy overshoot. Wrong also gets a red radial edge flash, a 0.4 s shake and a worried face. Right gets a burst and a happy face.
- **Emphasis on the key moment:** a number or object pop, plus `flare()` rays, `burst()` sparks, a white flash on a bar, and a short hold before it.
- **Legend pills** for encodings ("1 dot = 1 example").
- **People:** the house presenter, `person()` (see `character-recipe.md`). Real public figures appear only as a featureless silhouette.
- **Mascot characters (optional):** big-eyed round `ball()` bodies built with `eye()` (white, dark pupil, two catchlights, a blink, a happy arc). Use them only when a non-human character helps the story.

#### 9. Composition
- The hero object takes about ⅓ of the frame width, off-centre. Labels sit close to it. Key numbers go lower-left or in a right-hand column.
- Keep 64 px side margins. The header pill sits at top-left (≈ 190, 44); a corner note sits at top-right.
- Fill the frame. Keep one focal point per beat, and dim or shrink the rest.

#### 10. Adapting to any topic
- **Technology or AI:** devices and chips as rounded `ball`/`rr` forms with gradient faces, data as glowing dots along dotted arrows, networks as node glows plus curved edges (see `network()`).
- **Science:** draw true structure (orbits, cells, molecules) with balls and bands. State the scale.
- **Engineering or product:** an exploded view as rounded parts sliding apart with eio, each with a landing pill.
- **Documentary or history:** keep the stage. People become simple big-eyed round characters, places become planets or glowing map dots, and time jumps use the planet sweep.

#### 11. 3D inside the look
Prefer three.js inside the page (EngineX loads it with `libraries: ["three"]`, drawn on `hf-seek`). Use:
- `MeshToonMaterial` or flat-coloured materials from the palette;
- one key light from the upper left, plus a rim light;
- no realistic textures;
- the sky drawn on a 2D canvas behind it, with `finish()` over the top.

Blender and Unreal renders look like lit studio shots: use them only for a deliberate stinger or a product beat, and composite them small into the page with a glow and a label.

### `references/house-scene-grammar.md`

### Scene grammar: how the animation should look (user's target)
Source: frame study of the Kurzgesagt Short "What If Gravity Was 10% Stronger?" (one frame every 2 s, 2026-11-03). The user's words: "i need it like this." This is design grammar to follow, **not** artwork to copy. Never reuse their characters, scenes or logos.

#### The rules
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

#### Reviewer pass (2026-11-03, applied in CH1 v8). Where it conflicts with rule 2, this wins.
13. **Hook = a story, not a presentation.** Open on a close-up of the problem (someone struggling), with the unexpected issue visible in the first 2 s. Reveal the history or context only once the viewer is curious (pull back to it).
14. **One connected journey.** Prefer match cuts and camera moves over hard cuts: go *through* a screen into the next scene, let the camera follow an object that travels between scenes, and reuse the same object to link two eras (for example the crossed-out 2010 laptop becomes the 2026 laptop as the camera comes back out).
15. **Characters act every beat:** head turns and eye direction toward what matters, natural gestures, body sway while seated, and a small anticipation (lean back, wind-up) before every important action.
16. **Controlled palette:** dark backgrounds for history, neutral backgrounds for the present, and bright colour only on the key objects and highlights. Every ✓/✗ is the same size in the same relative spot (top-right of its object), and the year tag never moves corners.
17. **Build to one final composition:** not separate panels. Put both sides in one continuous world and move the camera between them, ending wide.

#### Planning checklist per chapter
- [ ] Each 2–4 s beat names its **environment** and **palette**, and the palette changes when the idea changes.
- [ ] The main subject takes up ≥ 50% of the frame in close-ups.
- [ ] At least one character or hand **acts** in every chapter.
- [ ] The recurring tag is present and updates in place.
- [ ] Transitions are chosen from rule 8, not random.

#### Code gotcha
- `H.mix(a, b, u)` returns an RGB **array**, not a colour string. Always wrap it: `H.rgba(H.mix(a, b, u), 1)`. Passing the raw array to `fillStyle` is silently ignored, and to `addColorStop` it throws and blanks the frame.

#### Hands
- Pointing hands use `assets/pointing-hand.js` (a fist with folded-finger creases, a jointed index finger with a nail, the thumb tucked across, a cuff and a sleeve). Never build a hand from separate balls; the user called that "meat balls".

### `references/character-recipe.md`

### Human character recipe (the house presenter, modular rig)

- **Design source:** `character-reference.png`.
- **Code:** the CHARACTER KIT section of `assets/page-template.html`.
- **Test page:** `examples/character-sheet.html` shows every view, expression, isolated part, blend, desk pose, hand shape, hand roll, gesture and the jump (6 sheets at t = 0.5 / 1.5 / 2.5 / 3.5 / 4.5 / 5.5). Snapshot it on EngineX after any change to the kit.

#### Look
- **Character:**
  - one consistent young man, about 6 heads tall, with a rounded, slightly oversized head;
  - dark wavy hair with a fringe;
  - a deep navy hoodie zipped open over a white tee;
  - slate jeans, white sneakers, warm peach skin.
- **Style:** simple expressive eyes and mouth; clean silhouettes with soft gradient bodies, restrained stepped shadows and a thin rim highlight (`flatShade`, `limbStroke`). Light stays at the upper left in every view.
- **Palette (`HUM`), light / mid / dark:**

  | Part | Light | Mid | Dark |
  | :- | :- | :- | :- |
  | Hoodie | `#5062c8` | `#2b3678` | `#161b4c` |
  | Skin | `#ffdcc2` | `#f6b28b` | `#d27a5a` |
  | Hair | `#3b4585` | `#181c46` | `#0a0c24` |
  | Jeans | `#626b9e` | `#3a4174` | `#222850` |

#### How it is built
1. **`rig(opts)` → `R`:** a small 3D skeleton (body units: % of height, feet at 0, y up negative).
   - `x` is **his** left; `z` is his forward.
   - Arms and legs are solved with two-bone IK toward their targets, so a hand goes exactly where you put it.
   - The skeleton is projected by the view angle into `R.S[joint] = [screenX, screenY, depth]`.
2. **`PART.*(x, R, side)`:** separate drawing functions that all meet at the same named joints. Draw any of them alone (close-ups, exploded views, an arm reaching into frame) or swap one without touching the rest.
3. **`drawRig(x, R, opts)`:** draws all parts in depth order (behind arm → legs → hood → neck → torso → head → front arms → held tablet → hands).
4. **`person(x, cx, cy, height, opts)`:** runs `rig` + `drawRig` in world units and returns `R`.

#### Joints (connection points)
`pelvis`, `neck`, `head`, `shoulderR/L`, `elbowR/L`, `wristR/L`, `hipR/L`, `kneeR/L`, `ankleR/L`. R/L are **his** right/left.

`worldJoint(R, cx, cy, height, 'wristL')` gives a joint in screen coordinates: use it to attach glows, arrows, labels or a fatigue meter to a body part.

| Part | Connects | Notes |
| :- | :- | :- |
| `PART.head(x, R, o)` | `head` (pivot 8u below, at the neck) | Head yaw = body yaw + `headTurn`; `headUp`, `tilt`, `look`, `blink`, expression |
| `PART.neck(x, R)` | `neck` → `head` | |
| `PART.hood(x, R)` | collar behind the neck | Hidden in back views |
| `PART.torso(x, R)` | `pelvis` → `neck` | Follows lean and side bend; tee and zip in front views, hood on back views |
| `PART.upperArm(x, R, k)` | `shoulder` → `elbow` | |
| `PART.forearm(x, R, k)` | `elbow` → `wrist` | Includes the cuff |
| `PART.arm(x, R, k)` | `shoulder` → `elbow` → `wrist` | One seamless stroke: use this in full figures |
| `PART.hand(x, R, k, shape)` | `wrist`, aligned with the forearm | Returns `{ grip, dir }`: the point where props attach |
| `PART.thigh / shin / leg / shoe(x, R, k)` | `hip` → `knee` → `ankle` | |
| `PART.bones(x, R, which, { highlight })` | joints overlay | `which`: `'R'`, `'L'`, `'arms'`, `'all'`. For anatomy beats (shoulder strain, the reach of an arm) |
| `PART.joint(x, p, r, col)` | one glowing joint marker | |

Draw a part alone inside a transform: `x.translate(...); x.scale(s, s); PART.arm(x, R, 'R'); PART.hand(x, R, 'R', 'point')`. See the parts row in the test page.

#### Views
`view`:
- `'front'`, `'3/4'`, `'side'`, `'3/4back'`, `'back'`;
- add `-left` for the mirrored version (`'3/4-left'`);
- or any `yaw` in degrees (0 = facing camera, 90 = facing right, 180 = back).

Turning is continuous: animate `yaw` for a turn. `headTurn` (degrees) turns the head relative to the body, which gives over-the-shoulder looks. `turn` (-1..1) and `back: true` still work.

#### Hands (`HANDSHAPES`; `HANDS` lists the names)
Every hand is built from finger data, so a gesture is just numbers:
- **`curl`:** `[thumb, index, middle, ring, pinky]`, from 0 (straight) to 1 (folded; shows as a knuckle).
- **`spread`:** the angle between fingers, in radians.
- **`roll`:** how far the hand is turned.
- **Specials:** `ok`, `pinch`, `typing`, `thumb: 'up' | 'down'`, `grip: [x, y]`.

| Group | Shapes |
| :- | :- |
| Basic | `fist`, `point`, `open`, `palm`, `none` (hidden: pocket, behind head) |
| Holding and working | `grip` (phone, tablet, mug), `pinch` (pen, stylus), `type` (fingers curled onto keys) |
| Gestures | `ok`, `peace`, `thumbsUp`, `thumbsDown`, `rock`, `callMe` |
| Counting | `one`, `two`, `three`, `four`, `five` |
| Custom | any object, e.g. `handL: { curl: [1, 0, 0.5, 1, 0.3], spread: 0.25, roll: 1 }` |

**Hand roll:** `rollR` / `rollL` (0 = back of hand to camera, 0.5 = side-on, 1 = palm to camera). Each shape has a sensible default.
- **Side-on:** the hand narrows.
- **Past 0.5:** the thumb swaps sides.
- **Palm side:** a lighter pad and a crease.
- **Back side:** knuckles where fingers fold.

Animate `roll` to turn a hand over (show the palm, a wave, presenting something). Animate `curl` values to count, beckon or wiggle fingers.

Held props: `holdR` / `holdL` = `'phone' | 'pen' | 'mug' | 'tablet'`, or `holdBoth: 'tablet'`. `PART.hand` returns `{ grip, dir, roll }`; props attach at `grip` (the fingertip for pointing shapes).

#### Poses (`POSES`)
A pose is data: wrist targets `R`/`L` as `[x, y, z]` (standing coordinates; sitting lowers them with the hips), plus any of:
- hand shapes `handR`/`handL` and held props `holdR`/`holdL`/`holdBoth`;
- elbow pole vectors `elbowR`/`elbowL`;
- hand roll `rollR`/`rollL` (0..1);
- body: `sit` (0..1), `crouch` (0..1: hips drop, feet stay planted), `rise` (body units the whole figure lifts off the ground), `lean` (rad, + forward), `bend` (rad, sideways);
- feet: `footR`/`footL` foot targets `[x, y, z]` in standing coordinates (they move with `rise`, so tucked feet stay tucked in the air);
- head: `headUp` (-1..1), `headTurn` (deg), `tilt` (rad);
- face: `expr`, `look`.

| Group | Poses |
| :- | :- |
| Standing | `standing`, `handsInPocket`, `armsCrossed`, `pointing`, `pointingForward`, `presenting`, `showing`, `explaining`, `gesturing`, `thinking`, `examining`, `onCall`, `holdingTablet`, `writing`, `relaxed`, `shrugging` |
| Designer | `drawingOnTablet` (works standing or with `sit: 1`), `sketching`, `workingAtMonitor`, `examining` |
| Typing | `typing`, viewable as `'side'`, `'front'` (laptop `'back'` view in front of him) or over the shoulder (`yaw` ~165 with the screen beyond him) |
| Gestures | `peaceSign`, `okSign`, `thumbsUp`, `thumbsDown`, `rockOn`, `waving` (animate `L[0]` ± 4 with `sin(t * 8)`), `counting` (set `handL` to `'one'` … `'five'`) |
| Jumping | `jumpCrouch`, `jumpTakeoff`, `jumpAir` (legs tucked), `jumpLand`; the whole jump as `jumpPose(u)`, u 0..1 |
| Motion | `reacting`, `reaching`, `leaningIn`, `celebrating`, `seated`, `touchingScreen`; walking via `walk` (phase); standing up via `sit` 1 → 0 with `lean` peaking mid-way; turning via `yaw` |

**Expressions (`EXPR`):** neutral, happy, excited, surprised, thinking, sad, angry, confused, winking, laughing, tired.

#### Animating (nothing is redrawn by hand)
- **Blend two poses:** `person(x, cx, cy, h, { pose: mixPose('standing', 'pointing', eio(u)) })`. Numbers and joint targets interpolate; hand shapes, props and expressions switch at the midpoint.
- **Keyframes:** `pose: poseAt([[2.0, 'typing'], [2.6, 'touchingScreen'], [3.4, 'typing']], t)`.
- **Hand to an exact point** (a screen, a button, a label): `reachL: [worldX, worldY]`. Add `reachTip: true` to put the fingertip, not the wrist, on the point.
- **Life:** pass `t` for breathing and automatic blinks; small `tilt` or `headTurn` changes keep him alive.
- **Walk:** `{ view: 'side', walk: t * 7 }` while moving `cx`. Running is `stride: 1.5` with a faster phase.
- **Standing up:** keyframe `{ sit: 1 }` → `{ sit: 0.4, lean: 0.35 }` → `{ sit: 0, lean: 0 }`.
- **Jump:** `pose: jumpPose(seg(t, t0, t0 + 1.1))` (about 1.1 s). Keep `cy` on the ground line: the rig lifts itself, and the ground shadow stays down, shrinking and fading. For a bigger or smaller hop, build your own keys with `rise` and `crouch`.
- **Turn a hand over:** `rollL: eio(seg(t, a, b))`. **Count:** switch `handL` between `'one'` … `'five'` on beats, or interpolate `curl` arrays with `mixPose`.

#### Props
Props use the same shading.
- `laptop(x, cx, cy, width, { view: 'side' | 'back' | 'screen', content(g, w, h) })`.
- `monitor(x, cx, cy, width, { view: 'screen' | 'back' | 'side', content })`.
- `desk(x, cx, cy, width, { panel })`.
- `chair(x, cx, cy, height, { view: 'side' | 'front' | 'back' })`.

**Seated layout:** chair, desk and person share `cx` and `cy`. The desk top is at `cy - 0.36 * height`. Draw a `'front'` chair before him and a `'back'` chair after him.

The `content` callback draws on the screen (a UI, a 3D object being moved, two apps side by side). The laptop's back badge is a generic dot, not a brand logo.

#### Rules
- He is the **one** human for every video. Change the pose and expression, never the design.
- Serious beats get no overshoot on him: blend poses with `eio`.
- Real public figures are never drawn with his face. Use a featureless silhouette with a name pill.
- Keep him at least 200 px tall at 1280×720 when the face matters.

#### Known limits
- Fingers bend in the hand's own plane: a curled finger is drawn as a shortened finger plus a knuckle, not a fully 3D bent finger. Gestures read clearly from the front and side, but less so straight down the forearm.
- `mixPose` switches hand shapes at the halfway point; to animate fingers smoothly, pass `curl` arrays as objects and blend those.
- No knee-up poses such as cross-legged sitting or kneeling.
- The profile head is the simplest view.

### `references/ENGINEX-GUIDE.md`

### EngineX implementation guide

Verified on 2026-11-04 by building and rendering the four validation scenes. For the operation catalogue (voice, sound, 3D, concat, duck), see `enginex-map.md`. Always `describe_operation` before a run, because parameters change.

#### Files (all in `assets/`)

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

#### Per shot

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

#### Shot record (fill one per shot in the storyboard card)
Scene ID · Shot ID · Narration segment · Layout(s) · Assets · Start and end states · Duration · Camera · Transition · Page file and TL keys · Snapshot job · Render job.

#### What EngineX cannot do (honest list)
- Snapshot and render outputs must be downloaded and looked at. Nothing checks *composition* automatically: `audit.js` checks declared placements, not pixels.
- `check` verifies runtime errors, text overflow and contrast. It does not judge art.
- There is no in-page WebAudio capture; sound comes from library files (see `enginex-map.md`).

### `references/enginex-map.md`

### EngineX map: what to use for what

Checked against the live EngineX catalog on 2026-11-03. The tools are the truth: call `describe_operation` before each run, because parameters change.

#### Verified by running it
| Fact | How it was checked |
| :- | :- |
| The template page renders on `motion-graphic/snapshot` at 1920×1080 on the GPU in ~5 s for 6 stills. Fonts, grain and all style functions work. | snapshot job a2360e2a… |
| `motion-graphic/render` takes the page as `project` (a zip with `index.html` at the top, uploaded via `create_upload_url` plus `curl -T`). Capture is frame-exact. A 3 s draft took ~7 s. | render job 609ae652… |
| Library sounds passed in `media` as `sound:<id>` land at `assets/<file name>`, the name shown in the sound's `listen` URL (for example `marimba-accent.mp3`, `echoing-pop.wav`; the render result lists them under `assets`). `<audio data-start data-volume>` elements in the page are mixed into the MP4's audio. | render job 609ae652… plus `video/probe` (stereo AAC stream) |

#### Technique → operation
| Need | EngineX | Notes |
| :- | :- | :- |
| The animated scenes (2D flat-vector) | `motion-graphic/render` (`project` zip) | The canvas is drawn in an `hf-seek` listener, which the template already does. `format` mp4, or webm/mov with alpha. `quality` draft, standard or high. `resolution: landscape-4k`. |
| Storyboard stills | `motion-graphic/snapshot` with `at: [times]` | Use the real renderer, so the storyboard matches the final. |
| QA | `motion-graphic/check` (errors, overflow, contrast), `video/probe` | |
| Narration | `emotive-speech/speak` | Use a house voice recorded from a real person (owen = tech explainer, raghav = documentary, arnav = friendly explainer…). Put each change of feeling on its own line with a [direction]. Leave temperature unset. Its output `lines` gives each line's start and end. |
| Word-level timings | `transcribe/words` on the narration | Use it when a visual must land on a word. |
| Narration under the picture | the render's `audio` parameter (with `audioVolume`) | Or `fitToAudio: true` to match the chapter length to the voice. |
| Sound effects | `find_sound` (kind `sfx`) → `use` in `media` → `<audio>` in the page | Listen first. |
| Ambience or music bed | `find_sound` (kind `ambience` or `music`, part `track`) | Put it in the page at low `data-volume`, or under the finished cut with `video/duck`. |
| Joining chapters | `video/concat` | |
| A library transition between rendered clips | `find_transition` → `video/transition` | Only matte wipes that fit the look (circles, liquid). The in-canvas transitions come first. |
| 3D inside the look | three.js in the same page (`libraries: ["three"]`) | Toon or flat materials, drawn on `hf-seek`. |
| 3D title stinger | `blender/text-3d` | Materials: chrome, gold, glass, matte, plastic, neon, or brand with a colour. Use `transparent` to lay it over the page. |
| Product or object hero shot | `blender/turntable` (moves: spin, orbit, hero-arc, dolly-in…) or `unreal/scene` | A lit-studio look, not flat. |
| Moving a real photo (documentary inserts) | `depth-motion/animate` (push-in, dolly-zoom, orbit…) | A photo look: frame it as an inset card. |
| Ready-made scenes | `motion-graphic/catalog` (210 blocks, templates) | Rarely on-style. Check before use. |

#### Sound cue starting points (library vocabulary)
Matches seen in the library: "marimba accent" (label lands, plucks), "echoing pop" / "hollow pop" (pop-ins), "soft click" (small UI ticks, counter), "chime soft" (right answer, takeaway).

Still to search per video: whoosh or swoosh (sweeps, pull-backs), riser plus hit or impact (the key number), error or cartoon "nope" (wrong), and a bed.

**Search with what is heard, not adjectives.** "space ambience soft" returned construction sites; the library describes its beds as "space soundscapes".

#### Not possible or not verified (be honest about these)
- **The reference's synthesized sound kit** (`sound.js`, `explainerSound`) is not used. EngineX renders don't capture WebAudio, so sound comes from the library, and exact marimba or boop matches depend on what the library has.
- **Toon or flat shading in Blender or Unreal** has no preset. Possible only through `blender/script` (custom Python), which is unverified. three.js in the page is the on-style route to 3D.
- **The exact asset filename for every sound** was verified for two library files only. Always read the render result's `assets` list on the first render.
- **Automatic ducking of music under narration**: `video/duck` exists, but its parameters were not exercised. Read `describe_operation` first. Otherwise set a fixed low `data-volume` on the bed.
- **Long single pages:** the render's `duration` maximum is 3600 s, but renders get slow. Render one page per chapter and concat.
- **Pacing to music beats:** `motion-graphic/beats` exists but is unverified.

### `assets/storyboard-template.md`

### Storyboard: <video title>

**Takeaway (one sentence):**
**Key reveal / number:**
**Presenter's arc:** (e.g. confused → curious → delighted)
**Palette progression:** (e.g. cream (story) → violet (science) → cream (back to life))
**Assumed facts:** (anything on screen you couldn't verify)

#### Sequence map
One line per *shot* (a shot = one continuous camera, possibly several compositions):

| Scene | Shot | Time | Compositions in this shot | Joined by | Ends with a cut because… |
|---|---|---|---|---|---|
| S1 | S1.1 | 0:00–0:14 | A → D → C | relocation, push-in | new place (hospital) |

#### Shot cards (one per composition change)

##### S1.1 / c1: <name>
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

#### Review gates
- [ ] Mute test passes on every card.
- [ ] No layout more than twice in a row; at least 4 layouts or customs per 60 s.
- [ ] Every composition change names its carried element (or names the story reason for a cut).
- [ ] `node tests/audit.js` passes; `--debug-grid` snapshots checked; final build has no grid.

### `validation/VALIDATION.md`

### Validation record (2026-11-04)

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

#### Deviations found by looking at rendered frames, and what changed
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

#### Not validated yet
- Layouts **D, E, F** have code slots and unit tests, but no rendered scene.
- The camera push-in and the `iris`, `diag` and `slide` wipes are untested in a render. V4 exercised `withCam`, `arc`, `stagger`, `fitPerson` and `bloom`.
- Narration-synced timing and sound: not part of this test set.

## Part 5: Code, templates and tests (write these to disk verbatim before building)

### `assets/comp.js`

```js
// comp.js: the composition engine (see references/COMPOSITION-SYSTEM.md). Pure functions, no DOM needed for the maths,
// so tests/comp.test.js runs it in Node. All positions are NORMALIZED (0..1 of width W / height H); px() converts.
// Source of every number: kurzgesagt_grid_study/STUDY.md (measured). Items marked "inferred" are design choices.
const COMP = (() => {
  const TAU = Math.PI * 2;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, u) => a + (b - a) * u;
  const eio = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
  const eo = (u) => 1 - Math.pow(1 - clamp(u), 3);
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const LW = 1280, LH = 720;
  const px = (nx, ny, W = LW, H = LH) => [nx * W, ny * H];

  // ---- measured constants (normalized) ----
  const SAFE = { action: 0.05, title: 0.10 };                       // Orange lines of the study. Content must stay inside action; labels inside title.
  const G = { lo: 0.382, hi: 0.618 };                               // golden lines
  const T = { lo: 1 / 3, hi: 2 / 3 };                               // thirds
  const OPTICAL_Y = 0.47;                                           // optical centre (measured 0.47H for the thirds-star centre atom)

  // ---- row of N (Rule C): centre_i = m + (1 - 2m) * (i + 0.5) / N ----
  const rowCentres = (n, m = SAFE.action) => Array.from({ length: n }, (_, i) => m + (1 - 2 * m) * (i + 0.5) / n);

  // ---- layout presets: each returns named slots {x,y,...} in normalized coords ----
  const slots = {
    // A: centred hero. hero spans the middle third. close-up: eyeY = .5. full body: top .07, bottom .93.
    A(o = {}) {
      const full = !!o.fullBody;
      return { layout: 'A', hero: { x: 0.5, y: 0.5, x0: T.lo, x1: T.hi, eyeY: 0.5, browY: G.lo, mouthY: T.hi, top: full ? 0.07 : null, bottom: full ? 0.93 : null },
        label: { x: 0.5, y: 0.87 }, tag: { x0: 0, y: 0.10 }, source: { x1: 0.95, y: 0.96 } };
    },
    // B: four-point star on the thirds intersections + optically-centred middle.
    B() {
      return { layout: 'B', p0: { x: T.lo, y: T.lo }, p1: { x: T.hi, y: T.lo }, p2: { x: T.lo, y: T.hi }, p3: { x: T.hi, y: T.hi },
        centre: { x: 0.5, y: OPTICAL_Y }, pill: { x: 0.5, y: 0.87 } };
    },
    // C: N items in a row. Same height (~1/3 H) on y .58; one shared label row at .88 (pointer triangle up).
    C(o = {}) {
      const n = o.n || 4, m = o.m == null ? SAFE.action : o.m, xs = rowCentres(n, m), r = { layout: 'C', n };
      xs.forEach((x, i) => { r['item' + i] = { x, y: 0.58, h: 1 / 3 }; r['label' + i] = { x, y: 0.88 }; });
      r.pitch = (1 - 2 * m) / n;                                    // max item width = pitch (minus a gutter)
      return r;
    },
    // D: subject + object on a third/golden split. Subject .43W, object .618W; label on the OUTSIDE of its object.
    D(o = {}) {
      const flip = !!o.flip, f = (x) => (flip ? 1 - x : x);
      return { layout: 'D', subject: { x: f(0.43), y: 0.5 }, object: { x: f(G.hi), y: 0.5 }, link: 'curve',
        subjectLabel: { x: f(0.20), y: 0.5 }, objectLabel: { x: f(0.86), y: 0.5 } };
    },
    // E: big number: centre (.5,.5), spans x .29-.70, height H/4; dot matrix x .08-.92, y .25-.90 at pitch W/42.
    E() {
      return { layout: 'E', number: { x: 0.5, y: 0.5, x0: 0.29, x1: 0.70, h: 0.25 }, matrix: { x0: 0.08, x1: 0.92, y0: 0.25, y1: 0.90, pitch: 1 / 42 },
        tag: { x0: 0, y: 0.095, w: 0.65 }, source: { x1: 0.95, y: 0.96 } };
    },
    // F: one-point room. vanishing point at centre; back wall = rect scaled by k about centre; corners lie on the diagonals.
    F(o = {}) {
      const k = o.k == null ? 0.55 : o.k, hw = 0.5 * k, hh = 0.5 * k;
      return { layout: 'F', vp: { x: 0.5, y: 0.5 }, k, wall: { x0: 0.5 - hw, x1: 0.5 + hw, y0: 0.5 - hh, y1: 0.5 + hh },
        corners: [[0, 0], [1, 0], [1, 1], [0, 1]], wallCorners: [[0.5 - hw, 0.5 - hh], [0.5 + hw, 0.5 - hh], [0.5 + hw, 0.5 + hh], [0.5 - hw, 0.5 + hh]] };
    },
    // G: wide environment. horizon (table top / ground) at 2/3, shared eye line .45, top 25% framing element, 3 depth layers.
    G(o = {}) {
      const n = o.n || 3, xs = rowCentres(n, 0.10), r = { layout: 'G', horizon: T.hi, eyeY: 0.45, frameTop: 0.25, layers: ['background', 'midground', 'foreground'],
        bgDarken: [0.6, 0.7], foregroundCorner: 'bottom-right' };
      xs.forEach((x, i) => { r['char' + i] = { x, y: 0.45 }; });  // inferred: even spacing is a default, café frame shows uneven groups
      return r;
    },
  };

  // ---- placement helpers ----
  // Put the house presenter's head on a slot: eye at (ex,ey) normalized, head width as a fraction of W. rig/person come from the page.
  // Head ellipse is 17.4 units wide (humanHead rx 8.7). Returns the args for person(x, cx, cy, Hh, opts).
  function fitPerson(rigFn, opts, ex, ey, headW, W = LW, H = LH) {
    const u = (headW * W) / 17.4, R = rigFn({ ...opts }), hs = R.S.head;
    return { cx: ex * W - hs[0] * u, cy: ey * H - (hs[1] + 0.8) * u, Hh: 100 * u, R };
  }
  // Body at full height between top/bottom (normalized), feet on `bottom`.
  const fitFullBody = (cx = 0.5, top = 0.07, bottom = 0.93, W = LW, H = LH) => ({ cx: cx * W, cy: bottom * H, Hh: (bottom - top) * H / 0.93 });

  // ---- composition-to-composition motion ----
  const mix = (a, b, u) => ({ x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u) });
  // curved path between two slots (bow = fraction of distance; + curves clockwise). Never travel in a dead-straight line.
  function arc(a, b, u, bow = 0.18) {
    const dx = b.x - a.x, dy = b.y - a.y, nx = -dy * bow, ny = dx * bow, v = 1 - u;
    return { x: v * v * a.x + 2 * v * u * ((a.x + b.x) / 2 + nx) + u * u * b.x, y: v * v * a.y + 2 * v * u * ((a.y + b.y) / 2 + ny) + u * u * b.y };
  }
  // staggered transform: u in 0..1 overall, each id i of n starts i*stagger later. Returns the per-id eased progress.
  const stagger = (u, i, n, spread = 0.35) => eio(clamp((u - (i / Math.max(1, n - 1)) * spread) / (1 - spread)));
  // camera: z zoom about the world point (cx,cy) landing at frame centre; z interpolates in log space (even-feeling zoom).
  const cam = (cx = LW / 2, cy = LH / 2, z = 1) => ({ cx, cy, z });
  const camMix = (a, b, u) => ({ cx: lerp(a.cx, b.cx, u), cy: lerp(a.cy, b.cy, u), z: Math.exp(lerp(Math.log(a.z), Math.log(b.z), u)) });
  function withCam(x, c, fn, W = LW, H = LH) { x.save(); x.translate(W / 2, H / 2); x.scale(c.z, c.z); x.translate(-c.cx, -c.cy); fn(); x.restore(); }
  // layered parallax: layer depth d (0 far .. 1 near): far layers follow the camera less.
  const parallax = (c, d, W = LW, H = LH) => ({ cx: lerp(W / 2, c.cx, 0.3 + 0.7 * d), cy: lerp(H / 2, c.cy, 0.3 + 0.7 * d), z: Math.pow(c.z, 0.4 + 0.6 * d) });

  // ---- transitions (draw old, then new, through a mask). u 0..1 ----
  const wipe = {
    iris(x, u, cx, cy, drawNew, W = LW, H = LH) {                    // circle grows from (cx,cy); new scene inside it
      if (u <= 0) return; const r = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) * eio(u);
      x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip(); drawNew(); x.restore();
    },
    slide(x, u, dir, drawOld, drawNew, W = LW, H = LH) {              // dir 'l'|'r'|'u'|'d': new pushes old out. camera-style, with speed streak handled by caller
      const e = eio(u), sx = dir === 'l' ? -1 : dir === 'r' ? 1 : 0, sy = dir === 'u' ? -1 : dir === 'd' ? 1 : 0;
      x.save(); x.translate(-sx * W * e, -sy * H * e); drawOld(); x.restore();
      x.save(); x.translate(sx * W * (1 - e), sy * H * (1 - e)); drawNew(); x.restore();
    },
    diag(x, u, drawNew, W = LW, H = LH, slope = 0.35) {               // geometric diagonal edge sweeps left -> right
      if (u <= 0) return; const e = eio(u), X = lerp(-H * slope, W + H * slope, e);
      x.save(); x.beginPath(); x.moveTo(0, 0); x.lineTo(X + H * slope, 0); x.lineTo(X - H * slope, H); x.lineTo(0, H); x.closePath(); x.clip(); drawNew(); x.restore();
    },
    bloom(x, u, cx, cy, col = '#fff6d0', W = LW, H = LH, peak = 1) {  // radial whiteout that peaks at u=.5, hides a swap. peak<1 = a glow pass, not a whiteout
      const a = Math.sin(clamp(u) * Math.PI) * peak; if (a <= 0.001) return;
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(W, H) * (0.3 + 0.7 * a));
      g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,246,208,0)'); x.save(); x.globalAlpha = Math.min(1, a * 1.4); x.fillStyle = g; x.fillRect(0, 0, W, H); x.restore();
    },
  };

  // ---- audit: checks placements against safe areas. items: {id, x0,y0,x1,y1 (normalized), role: 'content'|'label'|'bleed'|'tag'|'source'|'bg'} ----
  // 'bleed' and 'tag' (chapter / title bars that start at x=0) and 'bg' are exempt from the safe areas on purpose (STUDY section 2).
  function audit(items) {
    const out = [], A = SAFE.action, Tt = SAFE.title;
    for (const it of items) {
      if (it.role === 'bleed' || it.role === 'bg' || it.role === 'tag') continue;
      // Labels: CENTRE inside the 10% frame, box inside the 5% frame. (STUDY says labels never cross 10%, but its own label row
      // at 0.87-0.88H measures 0.85-0.91H in frame t=474s, so the box edge does cross it; this is the rule the frames support.)
      if (it.role === 'label') {
        const cx = (it.x0 + it.x1) / 2, cy = (it.y0 + it.y1) / 2;
        if (cx < Tt || cx > 1 - Tt || cy < Tt || cy > 1 - Tt) out.push(`${it.id}: label centre outside 10% frame`);
        if (it.x0 < A || it.y0 < A || it.x1 > 1 - A || it.y1 > 1 - A) out.push(`${it.id}: label box outside 5% frame`);
        continue;
      }
      const m = A;
      if (it.role === 'source') { if (it.x1 > 1 - A + 1e-6 || it.y1 > 1 - A + 1e-6) out.push(`${it.id}: source citation outside 5% margin`); continue; }
      if (it.x0 < m - 1e-6 || it.y0 < m - 1e-6 || it.x1 > 1 - m + 1e-6 || it.y1 > 1 - m + 1e-6) out.push(`${it.id}: ${it.role} outside ${m * 100}% safe frame (${[it.x0, it.y0, it.x1, it.y1].map(v => v.toFixed(3)).join(', ')})`);
    }
    return out;
  }
  // deviation of measured centres from a slot, normalized units (use for validation reports)
  const dev = (measured, slot) => Math.hypot(measured.x - slot.x, measured.y - slot.y);

  // ---- debug overlay: ONLY in debug builds (build.py --debug-grid). Final art never contains this. ----
  function debugGrid(x, W = LW, H = LH) {
    const L = (c, w, pts) => { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); for (const [a, b, c2, d] of pts) { x.moveTo(a * W, b * H); x.lineTo(c2 * W, d * H); } x.stroke(); };
    x.save(); x.globalAlpha = 0.85;
    L('#ff00ff', 1.5, [[T.lo, 0, T.lo, 1], [T.hi, 0, T.hi, 1], [0, T.lo, 1, T.lo], [0, T.hi, 1, T.hi]]);
    L('#33ff88', 1, [[G.lo, 0, G.lo, 1], [G.hi, 0, G.hi, 1], [0, G.lo, 1, G.lo], [0, G.hi, 1, G.hi]]);
    L('#ffe600', 1, [[0.5, 0, 0.5, 1], [0, 0.5, 1, 0.5], [0, 0, 1, 1], [1, 0, 0, 1]]);
    L('#ff9900', 1, [[0.05, 0, 0.05, 1], [0.95, 0, 0.95, 1], [0, 0.05, 1, 0.05], [0, 0.95, 1, 0.95], [0.1, 0, 0.1, 1], [0.9, 0, 0.9, 1], [0, 0.1, 1, 0.1], [0, 0.9, 1, 0.9]]);
    x.restore();
  }

  return { LW, LH, SAFE, G, T, OPTICAL_Y, px, clamp, lerp, eio, eo, seg, rowCentres, slots, fitPerson, fitFullBody, mix, arc, stagger, cam, camMix, withCam, parallax, wipe, audit, dev, debugGrid };
})();
if (typeof module !== 'undefined') module.exports = COMP;
```

### `assets/scene-kit.js`

```js
// scene-kit.js: small shared drawing helpers on top of the page's style kit (ball, glow, rr, F, C, H, person ...).
// Included by build.py after comp.js. Only generic pieces live here; scene-specific art belongs in the scene file.
const TAGC = { pink: ['#ff4f8b', '#ff9bbd'], orange: ['#ff8a1f', '#ffc07a'], cyan: ['#1fb6ff', '#8adcff'], violet: ['#8b5cff', '#bda4ff'] };

// Small label tag (house rule: small coloured box, thin lighter border, white Nunito 900 caps; never a headline).
// o: px (24-32), rot, s (pop scale), a, ptr: 'up'|'down'|'left'|'right'|null (small triangle pointing to the thing it labels), bleed: 'left' (box starts at x=0).
function labelTag(x, cx, cy, label, col, o = {}) {
  const a = o.a == null ? 1 : o.a, s = o.s == null ? 1 : o.s; if (a <= 0.01 || s <= 0.01) return;
  const px = o.px || 28, lines = String(label).split('\n'), lh = px * 1.08;
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(o.rot || 0); x.scale(s, s); x.font = F(900, px);
  const w = Math.max(...lines.map((l) => x.measureText(l).width)) + px * 1.0, h = lh * lines.length + px * 0.62;
  const fill = () => { x.fillStyle = col[0]; rr(x, -w / 2, -h / 2, w, h, px * 0.18); x.fill(); x.strokeStyle = col[1]; x.lineWidth = Math.max(2.5, px * 0.11); rr(x, -w / 2, -h / 2, w, h, px * 0.18); x.stroke(); };
  fill();
  if (o.ptr) { const d = o.ptr === 'up' ? -1 : 1, t = px * 0.34; x.fillStyle = col[0]; x.beginPath();
    if (o.ptr === 'left') { x.moveTo(-w / 2 - t, 0); x.lineTo(-w / 2 + 2, -t); x.lineTo(-w / 2 + 2, t); }
    else if (o.ptr === 'right') { x.moveTo(w / 2 + t, 0); x.lineTo(w / 2 - 2, -t); x.lineTo(w / 2 - 2, t); } else { x.moveTo(0, d * (h / 2 + t)); x.lineTo(-t, d * (h / 2 - 2)); x.lineTo(t, d * (h / 2 - 2)); }
    x.closePath(); x.fill(); }
  x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.textBaseline = 'middle';
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * lh + px * 0.04));
  x.restore();
}
// Chapter / chart title bar: starts at x=0 ON PURPOSE (edge bleed), text inset 0.04W. y,h normalized.
function barTag(x, label, col, o = {}) {
  const W = COMP.LW, H_ = COMP.LH, a = o.a == null ? 1 : o.a, w = (o.w || 0.3) * W, y = (o.y == null ? 0.06 : o.y) * H_, h = (o.h || 0.07) * H_, px = o.px || 28;
  x.save(); x.globalAlpha *= a; x.translate(-w * (1 - COMP.eo(o.s == null ? 1 : o.s)), 0);
  x.fillStyle = col[0]; x.fillRect(0, y, w, h); x.fillStyle = col[1]; x.fillRect(0, y + h - 3, w, 3);
  x.fillStyle = '#fff'; x.font = F(900, px); x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(label, 0.04 * W, y + h / 2 + 1); x.restore();
}
function bgFlat(x, W, H_, c0, c1, ang = 0.35) { const g = x.createLinearGradient(0, 0, W * Math.cos(ang), H_); g.addColorStop(0, c0); g.addColorStop(1, c1); x.fillStyle = g; x.fillRect(0, 0, W, H_); }
function softBlobs(x, W, H_, col, seed, t, n = 5) { const r = H.rng(seed); for (let i = 0; i < n; i++) { const cx = r.range(0, W), cy = r.range(0, H_), rad = r.range(140, 320); x.fillStyle = H.rgba(col, r.range(0.06, 0.12)); x.beginPath(); x.arc(cx + Math.sin(t * 0.3 + i) * 12, cy, rad, 0, TAU); x.fill(); } }

// Rocky-planet icons for the scientific tests (ball() triads + craters; Earth uses the template's earth()). Not to scale: say so on screen.
const ROCKY = {
  Mercury: ['#efe8de', '#a89f94', '#4d4660'], Venus: ['#fff0c2', '#e8b868', '#8a4a6a'], Mars: ['#ffc7a8', '#d8643a', '#6a2a5a'],
};
function rocky(x, name, cx, cy, r, glowA = 0.25) {
  if (r < 1) return; glow(x, cx, cy, r * 1.7, name === 'Earth' ? '#4fc9ff' : '#b89cff', glowA);
  if (name === 'Earth') { earth(x, cx, cy, r); return; }
  ball(x, cx, cy, r, ROCKY[name], { sha: 0.5, inner: () => {
    x.fillStyle = H.rgba(ROCKY[name][2], 0.28); const q = H.rng(name);
    for (let i = 0; i < 6; i++) { const a = q() * TAU, d = Math.sqrt(q()) * r * 0.72, rr_ = r * q.range(0.07, 0.16); x.beginPath(); x.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, rr_, 0, TAU); x.fill(); }
    if (name === 'Mars') { x.fillStyle = 'rgba(255,255,255,0.8)'; x.beginPath(); x.ellipse(cx, cy - r * 0.95, r * 0.34, r * 0.1, 0, 0, TAU); x.fill(); }
  } });
}

// ---- from the template's demo section (needed by rocky/earth): the Sun palette and the Earth drawing
const SUN = ['#fff3b0', '#ffb43a', '#d2502a'];
function earth(x, cx, cy, r, a = 1) {
  if (r <= 0.5) return;
  x.save(); x.globalAlpha *= a;
  glow(x, cx, cy, r * 1.8, '#4fc9ff', 0.35);
  ball(x, cx, cy, r, ['#9ff3ff', '#3a9be0', '#1d2f86'], { sha: 0.5, inner: () => {
    x.fillStyle = '#38e08e';
    for (const [u, v, w, h, rot] of [[-0.35, -0.2, 0.42, 0.3, 0.5], [0.3, 0.15, 0.3, 0.48, -0.3], [-0.1, 0.45, 0.25, 0.16, 0]]) {
      x.beginPath(); x.ellipse(cx + u * r, cy + v * r, w * r, h * r, rot, 0, TAU); x.fill();
    }
    x.fillStyle = '#ffffff';
    x.beginPath(); x.ellipse(cx, cy - r * 0.97, r * 0.5, r * 0.14, 0, 0, TAU); x.fill();
    x.beginPath(); x.ellipse(cx, cy + r * 0.97, r * 0.45, r * 0.12, 0, 0, TAU); x.fill();
  } });
  x.restore();
}
```

### `assets/pointing-hand.js`

```js
function pointingHand(x, tip, s, a) {
  // flat-vector pointing hand (back of the hand to camera): fist with folded fingers, extended index, tucked thumb, cuff + sleeve.
  // Local frame: fingertip at the origin, the hand extends along +y; rotated so the arm comes from the lower right (ang 1.0).
  if (a <= 0) return;
  const ang = 1.0, u = s * 0.01, SK = HUM.skin;
  x.save(); x.globalAlpha *= a; x.translate(tip[0], tip[1]); x.rotate(ang - Math.PI / 2);
  limbStroke(x, [[4.2 * u, 33 * u], [8 * u, 100 * u]], 15 * u, HUM.hood);                                   // sleeve
  flatShade(x, () => rr(x, -3.6 * u, 27.5 * u, 16 * u, 6.5 * u, 3 * u), ['#3b4a9a', '#1f2a6e', '#121a4a'], 0.6 * u); // cuff
  flatShade(x, () => rr(x, -3.2 * u, 12.6 * u, 15 * u, 16.6 * u, 5.6 * u), SK, 0.9 * u);                     // fist
  x.strokeStyle = H.rgba(H.mix(SK[1], SK[2], 0.6), 0.75); x.lineWidth = 0.75 * u; x.lineCap = 'round';
  for (const kx of [4.4, 8.2]) { x.beginPath(); x.moveTo(kx * u, 13.4 * u); x.lineTo(kx * u, 18.6 * u); x.stroke(); } // folded-finger gaps
  x.beginPath(); x.moveTo(1.6 * u, 19.6 * u); x.quadraticCurveTo(6.4 * u, 21.4 * u, 11.2 * u, 19.4 * u); x.stroke();  // knuckle line
  x.fillStyle = H.rgba(SK[0], 0.55); for (const kx of [2.6, 6.3, 9.9]) { x.beginPath(); x.ellipse(kx * u, 15 * u, 1.3 * u, 0.8 * u, 0, 0, TAU); x.fill(); } // knuckle shine
  flatShade(x, () => rr(x, -2.5 * u, -0.4 * u, 5 * u, 17.4 * u, 2.5 * u), SK, 0.6 * u);                      // index finger
  x.beginPath(); x.moveTo(-1.6 * u, 6.2 * u); x.quadraticCurveTo(0, 6.9 * u, 1.6 * u, 6.2 * u); x.moveTo(-1.6 * u, 10.8 * u); x.quadraticCurveTo(0, 11.5 * u, 1.6 * u, 10.8 * u); x.stroke(); // joints
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.ellipse(0, 1.9 * u, 1.45 * u, 1.9 * u, 0, 0, TAU); x.fill();   // nail
  x.save(); x.translate(-1.4 * u, 22.4 * u); x.rotate(-0.75); flatShade(x, () => rr(x, -2.4 * u, -2.2 * u, 9 * u, 4.4 * u, 2.2 * u), SK, 0.5 * u); x.restore(); // thumb tucked across
  x.restore();
}
```

### `assets/build.py`

```python
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
```

### `tests/comp.test.js`

```js
// Run: node tests/comp.test.js   (checks comp.js against the measured numbers in STUDY.md)
const assert = require('assert'), C = require('../assets/comp.js');
const near = (a, b, e = 1e-9) => assert(Math.abs(a - b) < e, `${a} != ${b}`);
// Rule C: N=4 -> 0.1625, 0.3875, 0.6125, 0.8375
C.rowCentres(4).forEach((v, i) => near(v, [0.1625, 0.3875, 0.6125, 0.8375][i]));
near(C.rowCentres(1)[0], 0.5); near(C.rowCentres(3, 0.1)[1], 0.5);
// Rule B: thirds intersections in px at 1920x1080 -> (640,360),(1280,360),(640,720),(1280,720)
const B = C.slots.B(); assert.deepStrictEqual(C.px(B.p0.x, B.p0.y, 1920, 1080).map(Math.round), [640, 360]);
assert.deepStrictEqual(C.px(B.p3.x, B.p3.y, 1920, 1080).map(Math.round), [1280, 720]); near(B.centre.y, 0.47);
// Rule F: wall corners lie on the frame diagonals (so the vanishing point is the centre)
const F = C.slots.F(); F.wallCorners.forEach(([x, y], i) => { const [cx, cy] = F.corners[i]; near((x - 0.5) * (cy - 0.5), (y - 0.5) * (cx - 0.5)); });
// Rule A: middle third; Rule D: golden/third split; Rule G horizon
const A = C.slots.A(); near(A.hero.x1 - A.hero.x0, 1 / 3); near(C.slots.D().object.x, 0.618); near(C.slots.G().horizon, 2 / 3);
// Safe areas: bleed/tag exempt, content/label not
const bad = C.audit([{ id: 'bar', role: 'tag', x0: 0, y0: 0.06, x1: 0.65, y1: 0.13 }, { id: 'box', role: 'content', x0: 0.02, y0: 0.4, x1: 0.3, y1: 0.6 },
  { id: 'lbl', role: 'label', x0: 0.03, y0: 0.8, x1: 0.2, y1: 0.9 }, { id: 'rowlabel', role: 'label', x0: 0.09, y0: 0.84, x1: 0.23, y1: 0.92 }, { id: 'ok', role: 'content', x0: 0.1, y0: 0.1, x1: 0.9, y1: 0.9 }]);
assert.strictEqual(bad.length, 2, bad.join('\n'));
// arc endpoints and camMix
const a = { x: 0.2, y: 0.5 }, b = { x: 0.8, y: 0.3 }; near(C.arc(a, b, 0).x, 0.2); near(C.arc(a, b, 1).y, 0.3);
near(C.camMix(C.cam(0, 0, 1), C.cam(0, 0, 4), 0.5).z, 2);
console.log('comp.test.js: all assertions passed');
```

### `tests/smoke.js`

```js
// Run: node tests/smoke.js build/index.html [t1 t2 ...]   Executes the page's script against a mock canvas and draws frames,
// so ReferenceErrors / typos show up in seconds instead of after an EngineX round trip. (It cannot judge how it looks.)
const fs = require('fs'), vm = require('vm');
const html = fs.readFileSync(process.argv[2], 'utf8'), ts = process.argv.slice(3).map(Number);
const mk = () => { const f = function () {}; const p = new Proxy(f, { get: (t, k) => k === Symbol.toPrimitive ? () => 0 : k === 'width' || k === 'height' ? 256 : k === 'data' ? new Uint8ClampedArray(256 * 256 * 4) : k === 'measureText' ? () => ({ width: 40 }) : p, apply: () => p, set: () => true }); return p; };
const ctx = mk(), el = { getContext: () => ctx, style: {}, width: 1920, height: 1080 };
const listeners = {};
const win = { devicePixelRatio: 1, addEventListener: (k, f) => (listeners[k] = f), __hf: {} };
const doc = { getElementById: () => el, createElement: () => el, fonts: { load: () => Promise.resolve(), ready: Promise.resolve() } };
const sandbox = { DOMMatrix: function () { return mk(); }, window: win, document: doc, Math, console, Promise, Uint8ClampedArray, Float32Array, Float64Array, Array, Object, Number, String, JSON, Set, Map, Symbol, Infinity, isFinite, parseInt, parseFloat, Date };
Object.assign(sandbox, win); sandbox.window = sandbox; sandbox.globalThis = sandbox; sandbox.__hf = win.__hf; vm.createContext(sandbox);
const code = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n;\n');
vm.runInContext(code + '\n;globalThis.__frame = frame; globalThis.__D = DURATION;', sandbox);
const D = sandbox.__D, times = ts.length ? ts : [0, D * 0.25, D * 0.5, D * 0.75, D - 0.01];
for (const t of times) sandbox.__frame(t);
console.log('smoke ok: drew', times.length, 'frames, DURATION', D);
```

### `tests/audit.js`

```js
// Run: node tests/audit.js scene.js [...]   Checks each scene's //PLACEMENTS block against the safe-area rules (COMP.audit).
const fs = require('fs'), COMP = require('../assets/comp.js'), TAGC = {};
let bad = 0;
for (const f of process.argv.slice(2)) {
  const m = fs.readFileSync(f, 'utf8').match(/\/\/PLACEMENTS-START([\s\S]*?)\/\/PLACEMENTS-END/);
  if (!m) { console.log(f, ': no PLACEMENTS block (skipped)'); continue; }
  const P = new Function('COMP', m[1] + '; return PLACEMENTS;')(COMP), v = COMP.audit(P);
  console.log(f, v.length ? 'FAIL\n  ' + v.join('\n  ') : `ok (${P.length} placements)`); bad += v.length;
}
process.exit(bad ? 1 : 0);
```

### `validation/v1_centred.js`

```js
// V1: Layout A, centred close-up. Eyes on H/2, head fills the middle third, chapter tag bleeds off the left edge.
const DURATION = 4;
//PLACEMENTS-START
const PLACEMENTS = [
  { id: 'head', role: 'content', x0: 1 / 3, y0: 0.17, x1: 2 / 3, y1: 0.83 },
  { id: 'shoulders', role: 'bleed', x0: 0.1, y0: 0.8, x1: 0.9, y1: 1 },
  { id: 'chapter bar', role: 'tag', x0: 0, y0: 0.06, x1: 0.3, y1: 0.13 },
  { id: 'host label', role: 'label', x0: 0.72, y0: 0.52, x1: 0.88, y1: 0.6 },
];
//PLACEMENTS-END
function explainer(x, W, H_, t) {
  const A = COMP.slots.A(), s0 = COMP.seg(t, 0, 0.5);
  bgFlat(x, W, H_, '#fdf8c8', '#ffe9a0'); softBlobs(x, W, H_, '#ffb86b', 11, t, 4);
  const expr = t < 1.3 ? 'neutral' : t < 2.7 ? 'surprised' : 'happy';
  const f = COMP.fitPerson(rig, { view: 'front', pose: 'standing', expr }, A.hero.x, A.hero.eyeY, A.hero.x1 - A.hero.x0, W, H_);
  const push = 1 + 0.06 * (1 - COMP.eo(COMP.seg(t, 0, 1.2)));            // tiny settle: nothing is ever dead still
  x.save(); x.translate(W / 2, H_ / 2); x.scale(push, push); x.translate(-W / 2, -H_ / 2);
  person(x, f.cx, f.cy, f.Hh, { view: 'front', pose: 'standing', expr, t, noShadow: true, noGlow: true });
  x.restore();
  barTag(x, '2026', TAGC.orange, { w: 0.3, s: COMP.seg(t, 0.2, 0.7) });
  labelTag(x, 0.80 * W, 0.56 * H_, 'THE HOST', TAGC.violet, { ptr: 'left', s: back(COMP.seg(t, 0.8, 1.15), 2) });
}
```

### `validation/v2_scientific.js`

```js
// V2: Layout C, four rocky planets in an evenly spaced row + shared label row + one glowing hero (Earth).
const DURATION = 4;
//PLACEMENTS-START
const PLACEMENTS = [
  ...[0.1625, 0.3875, 0.6125, 0.8375].map((cx, i) => ({ id: 'planet' + i, role: 'content', x0: cx - 0.0625, y0: 0.58 - 1 / 6, x1: cx + 0.0625, y1: 0.58 + 1 / 6 })),
  ...[0.1625, 0.3875, 0.6125, 0.8375].map((cx, i) => ({ id: 'label' + i, role: 'label', x0: cx - 0.07, y0: 0.88 - 0.04, x1: cx + 0.07, y1: 0.88 + 0.04 })),
  { id: 'scale note', role: 'tag', x0: 0, y0: 0.06, x1: 0.34, y1: 0.13 },
];
//PLACEMENTS-END
const NAMES = ['Mercury', 'Venus', 'Earth', 'Mars'], TAGCOL = [TAGC.pink, TAGC.orange, TAGC.cyan, TAGC.violet];
function explainer(x, W, H_, t) {
  const C4 = COMP.slots.C({ n: 4 }), R = (1 / 6) * H_ * 0.5 * 2 / 2;      // item height = 1/3 H -> radius = 1/6 H
  bgFlat(x, W, H_, '#3b13a8', '#2a0c7c', 0.5); softBlobs(x, W, H_, '#8b5cff', 5, t, 6);
  NAMES.forEach((n, i) => {
    const it = C4['item' + i], lb = C4['label' + i], u = COMP.seg(t, 0.15 + i * 0.14, 0.15 + i * 0.14 + 0.45), p = back(u, 1.8);
    const bob = Math.sin(t * 1.8 + i * 1.3) * 5;
    rocky(x, n, it.x * W, it.y * H_ + bob, (1 / 6) * H_ * p, n === 'Earth' ? 0.5 : 0.12);
    labelTag(x, lb.x * W, lb.y * H_, n.toUpperCase(), TAGCOL[i], { ptr: 'up', s: back(COMP.seg(t, 0.55 + i * 0.14, 0.9 + i * 0.14), 2), px: 28 });
  });
  barTag(x, 'NOT TO SCALE', TAGC.pink, { w: 0.34, s: COMP.seg(t, 0.1, 0.6), px: 26 });
}
```

### `validation/v3_wide.js`

```js
// V3: Layout G, wide environment. Floor/wall line AND every tabletop on 2/3 H, shared eye line .45 H for every head,
// 3 depth layers (dark far wall, midground people, near silhouette), top 25% framing element (awning).
const DURATION = 4;
//PLACEMENTS-START
const PLACEMENTS = [
  { id: 'awning', role: 'bleed', x0: 0, y0: 0, x1: 1, y1: 0.25 },
  { id: 'bystander L', role: 'content', x0: 0.13, y0: 0.38, x1: 0.30, y1: 0.7 },
  { id: 'presenter', role: 'content', x0: 0.40, y0: 0.38, x1: 0.60, y1: 0.9 },
  { id: 'bystander R', role: 'content', x0: 0.70, y0: 0.38, x1: 0.87, y1: 0.7 },
  { id: 'foreground', role: 'bleed', x0: 0.72, y0: 0.7, x1: 1, y1: 1 },
  { id: 'sign', role: 'label', x0: 0.08, y0: 0.29, x1: 0.2, y1: 0.35 },
];
//PLACEMENTS-END
const BYS = [{ skin: '#c98c6a', hair: '#1c1030', top: '#3e2a8c', kind: 'bun' }, { skin: '#e2a982', hair: '#2a1a14', top: '#6a2a6e', kind: 'short' }];
function bystander(x, cx, eyeY, hz, s, sp, t, k) {                    // flat-faced background person, seated behind a small table; head centre on the shared eye line
  const bob = Math.sin(t * 1.3 + k * 2) * 1.5 * s, ey = eyeY + bob;
  x.fillStyle = sp.top; rr(x, cx - 58 * s, ey + 36 * s, 116 * s, hz - ey - 36 * s + 4, 36 * s); x.fill();                           // torso
  x.fillStyle = sp.skin; x.beginPath(); x.arc(cx, ey, 36 * s, 0, TAU); x.fill();                                    // head
  x.fillStyle = sp.hair; x.beginPath();
  if (sp.kind === 'bun') { x.arc(cx, ey - 8 * s, 38 * s, Math.PI, TAU); x.fill(); x.beginPath(); x.arc(cx, ey - 46 * s, 14 * s, 0, TAU); x.fill(); }
  else { x.arc(cx, ey - 6 * s, 39 * s, Math.PI * 1.02, TAU * 0.995); x.lineTo(cx + 34 * s, ey - 14 * s); x.lineTo(cx - 34 * s, ey - 14 * s); x.fill(); }
  x.fillStyle = '#1a0f33'; for (const dx of [-12, 12]) { x.beginPath(); x.arc(cx + dx * s, ey + 2 * s, 3.6 * s, 0, TAU); x.fill(); }
  x.strokeStyle = '#1a0f33'; x.lineWidth = 3 * s; x.lineCap = 'round'; x.beginPath(); x.arc(cx, ey + 12 * s, 9 * s, 0.15 * Math.PI, 0.85 * Math.PI); x.stroke();
  cafeTable(x, cx, hz, 150 * s, 0.9);
}
function cafeTable(x, cx, hz, w, dark, part) {                       // part 'leg' (draw behind the sitter) | 'top' (in front) | undefined = both
  if (part !== 'top') { x.fillStyle = `rgba(30,12,70,${0.55 * dark})`; x.beginPath(); x.ellipse(cx, hz + 200 * w / 300, w * 0.5, w * 0.04, 0, 0, TAU); x.fill();
    x.fillStyle = dark > 0.8 ? '#7a5ac0' : '#c9b3ff'; x.fillRect(cx - w * 0.025, hz, w * 0.05, 190 * w / 300); }
  if (part === 'leg') return;
  const g = x.createLinearGradient(0, hz - w * 0.06, 0, hz + w * 0.06); g.addColorStop(0, dark > 0.8 ? '#a88be8' : '#f1e8ff'); g.addColorStop(1, dark > 0.8 ? '#6c4cb4' : '#b9a0ee');
  x.fillStyle = g; x.beginPath(); x.ellipse(cx, hz, w * 0.5, w * 0.075, 0, 0, TAU); x.fill();
}
function explainer(x, W, H_, t) {
  const G = COMP.slots.G({ n: 3 }), hz = G.horizon * H_, eye = G.eyeY * H_;
  // layer 1, far: the wall, 60-70% darker than the middle ground, with lit windows and a sign
  bgFlat(x, W, H_, '#3a1a78', '#2c1262', 0.2);
  x.fillStyle = '#4b2a96'; x.fillRect(0, 0.25 * H_, W, hz - 0.25 * H_);
  [[0.07, 0.32], [0.40, 0.32], [0.73, 0.32]].forEach(([wx, wy], i) => { x.fillStyle = H.rgba('#ffb86b', 0.20 + 0.05 * Math.sin(t + i)); rr(x, wx * W, wy * H_, 0.2 * W, 0.19 * H_, 10); x.fill(); });
  x.fillStyle = '#e9d6ff'; x.fillRect(0, hz - 3, W, H_ - hz + 3); x.fillStyle = 'rgba(80,30,150,0.22)'; x.fillRect(0, hz - 3, W, 7);
  // layer 2, middle: two background people and the presenter, all heads on y = .45H
  bystander(x, G.char0.x * W - 20, eye, hz, 1.0, BYS[0], t, 1);
  bystander(x, G.char2.x * W + 20, eye, hz, 1.0, BYS[1], t, 2);
  const c = COMP.fitPerson(rig, { view: '3/4', pose: 'explaining', sit: 1 }, G.char1.x, G.eyeY, 0.068, W, H_);
  cafeTable(x, c.cx, hz, 330, 0.0, 'leg');                                                                   // pedestal is behind his legs
  chair(x, c.cx, c.cy, c.Hh, { view: 'front' });
  const pose = poseAt([[0, 'seated'], [1.2, 'seated'], [2.0, 'explaining'], [3.4, 'explaining']], t);
  person(x, c.cx, c.cy, c.Hh, { view: '3/4', pose, expr: t < 1.4 ? 'neutral' : 'happy', sit: 1, t, noGlow: true, noShadow: true });
  cafeTable(x, c.cx, hz, 330, 0.0, 'top');
  x.fillStyle = '#ff6a4a'; rr(x, c.cx + 90, hz - 30, 36, 26, 6); x.fill();                                           // a cup on the table
  // layer 3, near: top-25% awning with scalloped edge
  x.fillStyle = '#ff4f3b'; x.fillRect(0, 0, W, 0.19 * H_);
  for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? '#ff7a63' : '#ff4f3b'; x.beginPath(); x.arc(i * W / 16 + W / 32, 0.19 * H_, W / 32, 0, Math.PI); x.fill(); }
  x.fillStyle = '#ff9a86'; rr(x, 0, 0.115 * H_, W, 0.03 * H_, 14); x.fill();
  // near silhouette covering the bottom-right corner
  x.fillStyle = '#150a3a'; x.beginPath(); x.ellipse(0.9 * W, 0.97 * H_, 0.19 * W, 0.2 * H_, -0.2, 0, TAU); x.ellipse(0.8 * W, 0.99 * H_, 0.1 * W, 0.12 * H_, 0.2, 0, TAU); x.fill();
  labelTag(x, 0.14 * W, 0.32 * H_, 'CAFE', TAGC.cyan, { px: 26, s: back(COMP.seg(t, 0.3, 0.7), 2) });
}
```

### `validation/v4_continuous.js`

```js
// V4: ONE continuous shot, no cuts: A (centred close-up) -> B (thirds star) -> C (row of four).
// Carried over: the presenter (head slides + shrinks to the corner), the glow behind his head (becomes the Sun on the optical centre),
// the planets (arc to the thirds intersections, then glide to the row slots). Background colour is interpolated, never cut.
const DURATION = 12;
const TLV = { A: [0, 2.6], AB: [2.6, 5.0], B: [5.0, 6.8], BC: [6.8, 9.2], C: [9.2, 12] };
const PN = ['Mercury', 'Earth', 'Venus', 'Mars'];                       // order = thirds points p0..p3 (TL, TR, BL, BR)
const PC = { Mercury: TAGC.pink, Venus: TAGC.orange, Earth: TAGC.cyan, Mars: TAGC.violet };
const ROW = ['Mercury', 'Venus', 'Earth', 'Mars'];                      // order in the C row (solar-system order)
function explainer(x, W, H_, t) {
  const A = COMP.slots.A(), B = COMP.slots.B(), Cc = COMP.slots.C({ n: 4 });
  const uAB = COMP.eio(COMP.seg(t, ...TLV.AB)), uBC = COMP.eio(COMP.seg(t, ...TLV.BC));
  // background: cream -> violet over A->B (interpolated, no cut)
  x.fillStyle = H.rgba(H.mix('#fdf8c8', '#3b13a8', uAB), 1); x.fillRect(0, 0, W, H_);
  const g = x.createLinearGradient(0, 0, W * 0.8, H_); g.addColorStop(0, H.rgba(H.mix('#ffe9a0', '#2a0c7c', uAB), 0)); g.addColorStop(1, H.rgba(H.mix('#ffe9a0', '#2a0c7c', uAB), 0.9)); x.fillStyle = g; x.fillRect(0, 0, W, H_);
  softBlobs(x, W, H_, H.rgba(H.mix('#ffb86b', '#8b5cff', uAB), 1), 7, t, 5);
  const camZ = 1 + 0.05 * Math.sin(Math.PI * COMP.seg(t, ...TLV.BC));    // tiny camera breath on B->C (COMP.withCam)
  COMP.withCam(x, COMP.cam(W / 2, H_ / 2, camZ), () => {
    // ---- the Sun: starts as an idea-glow hidden behind the head (A), lands on the optical centre (B), collapses (C)
    const sunIn = back(COMP.seg(t, 3.0, 4.2), 1.6), sunOut = 1 - COMP.eio(COMP.seg(t, 7.0, 8.2));
    const sr = 0.115 * H_ * sunIn * sunOut, sc = COMP.px(B.centre.x, B.centre.y, W, H_);
    glow(x, sc[0], sc[1], 0.5 * H_ * (0.4 + 0.6 * COMP.eio(COMP.seg(t, 0.3, 3.2))) * (1 - 0.8 * COMP.seg(t, 6.8, 8.2)), '#ffb43a', 0.4 * (0.5 + 0.5 * Math.sin(t * 2.2 + 1) * 0.2 + 0.5));
    if (sr > 1) ball(x, sc[0], sc[1] + Math.sin(t * 1.6) * 3, sr, SUN, { sha: 0.15, rim: '#fff6d0', rima: 0.6 });
    // ---- planets: arc in from off-screen corners to the thirds points, then glide to the row
    const spawn = [{ x: -0.12, y: -0.2 }, { x: 1.12, y: -0.2 }, { x: -0.12, y: 1.25 }, { x: 1.12, y: 1.25 }];
    PN.forEach((n, i) => {
      const bp = B['p' + i], ri = ROW.indexOf(n), rp = Cc['item' + ri];
      const a = COMP.stagger(COMP.seg(t, ...TLV.AB), i, 4, 0.4), b = COMP.stagger(COMP.seg(t, ...TLV.BC), 3 - ROW.indexOf(n), 4, 0.45)   // rightmost leaves first: paths never collide;
      const pos = t < TLV.BC[0] ? COMP.arc(spawn[i], bp, a, i % 2 ? -0.2 : 0.2) : COMP.arc(bp, rp, b, i % 2 ? 0.12 : -0.12);
      const rB = 0.105 * H_, rC = (1 / 6) * H_, r = t < TLV.BC[0] ? rB * (0.4 + 0.6 * a) : COMP.lerp(rB, rC, b);
      if (t < TLV.AB[0] + 0.05) return;
      const bob = Math.sin(t * 1.7 + i * 1.3) * 4 * (t > TLV.AB[1] ? 1 : 0);
      rocky(x, n, pos.x * W, pos.y * H_ + bob, r, n === 'Earth' ? 0.5 : 0.12);
      labelTag(x, Cc['label' + ri].x * W, Cc['label' + ri].y * H_, n.toUpperCase(), PC[n], { ptr: 'up', s: back(COMP.seg(t, 9.5 + ri * 0.14, 9.85 + ri * 0.14), 2) });
    });
  }, W, H_);
  // ---- bloom hides the palette swap peak, then the B label (pill at .87H) and the C bar
  COMP.wipe.bloom(x, COMP.seg(t, 3.0, 4.4), W / 2, 0.47 * H_, '#fff6d0', W, H_, 0.4);
  labelTag(x, B.pill.x * W, B.pill.y * H_, 'INNER SOLAR SYSTEM', TAGC.orange, { px: 26, s: back(COMP.seg(t, 5.3, 5.7), 2) * (1 - COMP.seg(t, 6.8, 7.1)) });
  barTag(x, 'INNER PLANETS', TAGC.pink, { w: 0.34, s: COMP.seg(t, 8.6, 9.2), px: 26 });
  // ---- the presenter, drawn last: head fitted every frame; position = arc between slots, size = log-lerp of head width
  const hA = { x: A.hero.x, y: A.hero.eyeY, w: 1 / 3 }, hB = { x: 0.09, y: 0.80, w: 0.075 };
  const exit = COMP.eio(COMP.seg(t, 7.0, 8.6)), pp = COMP.arc(hA, hB, uAB, 0.25), hw = Math.exp(COMP.lerp(Math.log(hA.w), Math.log(hB.w), uAB));
  const ex = pp.x - 0.35 * exit, expr = t < 1.2 ? 'neutral' : t < 2.6 ? 'thinking' : t < 6.8 ? 'surprised' : 'happy';
  if (ex > -0.2) {
    const o = { view: uAB > 0.5 ? '3/4' : 'front', pose: 'standing', expr };
    const f = COMP.fitPerson(rig, o, ex, pp.y, hw, W, H_);
    person(x, f.cx, f.cy, f.Hh, { ...o, t, noShadow: true, noGlow: true, headTurn: -20 * uAB });
  }
}
```

### `assets/page-template.html`

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<!-- Flat-Vector Science page for EngineX motion-graphic/render. Copy this file per video and edit ONLY the
     "SCENES" section (TL, explainer) and the <audio> cues. Everything above SCENES is the style: do not change it. -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Nunito:wght@400;700;800;900&display=block">
<style>
  body { margin: 0; background: #090b2c; }
  #root { position: relative; width: 1920px; height: 1080px; overflow: hidden; background: #090b2c; }
  #c { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; }
</style>
</head>
<body>
<!-- data-duration MUST equal DURATION below. -->
<div id="root" data-composition-id="main" data-start="0" data-duration="8" data-width="1920" data-height="1080">
  <canvas id="c" data-layout-allow-overflow></canvas>
  <!-- SOUND CUES: one element per cue. src = assets/<name the file was given in `media`>; data-start = the TL time of
       the event it marks, to the frame; data-volume keeps effects in front and beds underneath. Voice-over goes in the
       render's `audio` parameter, not here. -->
  <!-- <audio src="assets/pop.wav" data-start="0.15" data-duration="1" data-volume="0.8"></audio> -->
</div>
<script>
// Shared helpers + style registry for the style-frame explorations.
// Every style is a pure function of time: draw(ctx, W, H, t). Same t => same pixels.
(function () {
  const STYLES = (window.STYLES = window.STYLES || []);
  window.registerStyle = (s) => STYLES.push(s);

  const H = (window.H = {});

  // ---------- seeded randomness ----------
  // H.rng(seed) -> r() in [0,1). Extras: r.range(a,b), r.int(a,b), r.pick(arr), r.gauss(), r.chance(p)
  H.rng = function (seed = 1) {
    let a = typeof seed === 'string' ? hashStr(seed) : (seed >>> 0) || 1;
    const r = function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    r.range = (lo, hi) => lo + r() * (hi - lo);
    r.int = (lo, hi) => Math.floor(lo + r() * (hi - lo + 1));
    r.pick = (arr) => arr[Math.floor(r() * arr.length)];
    r.chance = (p) => r() < p;
    r.gauss = () => { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    return r;
  };
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  // ---------- gradient noise ----------
  // H.makeNoise(seed) -> { n2(x,y), n3(x,y,z), fbm2(x,y,oct), fbm3(x,y,z,oct) }  (outputs roughly -1..1)
  H.makeNoise = function (seed = 1) {
    const r = H.rng(seed), p = new Uint8Array(512), perm = [...Array(256).keys()];
    for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
    for (let i = 0; i < 512; i++) p[i] = perm[i & 255];
    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a, b, t) => a + (b - a) * t;
    const g3 = (h, x, y, z) => { h &= 15; const u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z; return ((h & 1) ? -u : u) + ((h & 2) ? -v : v); };
    function n3(x, y, z) {
      const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
      x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
      const u = fade(x), v = fade(y), w = fade(z);
      const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
      return lerp(lerp(lerp(g3(p[AA], x, y, z), g3(p[BA], x - 1, y, z), u), lerp(g3(p[AB], x, y - 1, z), g3(p[BB], x - 1, y - 1, z), u), v),
        lerp(lerp(g3(p[AA + 1], x, y, z - 1), g3(p[BA + 1], x - 1, y, z - 1), u), lerp(g3(p[AB + 1], x, y - 1, z - 1), g3(p[BB + 1], x - 1, y - 1, z - 1), u), v), w);
    }
    const n2 = (x, y) => n3(x, y, 0.5);
    const fbm3 = (x, y, z, oct = 4) => { let s = 0, a = 0.5, f = 1, norm = 0; for (let i = 0; i < oct; i++) { s += a * n3(x * f, y * f, z * f); norm += a; a *= 0.5; f *= 2; } return s / norm; };
    const fbm2 = (x, y, oct = 4) => fbm3(x, y, 0.5, oct);
    return { n2, n3, fbm2, fbm3 };
  };

  // ---------- math ----------
  H.lerp = (a, b, t) => a + (b - a) * t;
  H.clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
  H.map = (v, a, b, c, d) => c + ((v - a) / (b - a)) * (d - c);
  H.smooth = (e0, e1, x) => { const t = H.clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };
  H.ease = {
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    out: (t) => 1 - Math.pow(1 - t, 3),
    in: (t) => t * t * t,
    back: (t) => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  };

  // ---------- color ----------
  H.hex = (h) => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map((c) => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  H.rgba = (hexOrArr, a = 1) => { const [r, g, b] = Array.isArray(hexOrArr) ? hexOrArr : H.hex(hexOrArr); return `rgba(${r | 0},${g | 0},${b | 0},${a})`; };
  H.mix = (c1, c2, t) => { const a = Array.isArray(c1) ? c1 : H.hex(c1), b = Array.isArray(c2) ? c2 : H.hex(c2); return [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t); };

  // ---------- canvas utilities ----------
  // Offscreen canvas of the same logical size (use for layers, masks, compositing).
  H.layer = (W, H_, ) => { const c = document.createElement('canvas'); c.width = W; c.height = H_; return c; };
  // Monochrome grain / film noise over the whole canvas. amount ~ 0.03-0.15
  H.grain = function (ctx, W, Hh, amount = 0.08, seed = 7, mono = true) {
    const img = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height), d = img.data, r = H.rng(seed), k = amount * 255;
    for (let i = 0; i < d.length; i += 4) {
      const n = (r() - 0.5) * k;
      if (mono) { d[i] += n; d[i + 1] += n; d[i + 2] += n; }
      else { d[i] += (r() - 0.5) * k; d[i + 1] += (r() - 0.5) * k; d[i + 2] += (r() - 0.5) * k; }
    }
    ctx.putImageData(img, 0, 0);
  };
  // Paper-ish texture tile: fills with base color + fibrous noise (cheap; drawn into ctx).
  H.paper = function (ctx, W, Hh, base = '#f3ecdc', seed = 3, strength = 0.06) {
    ctx.save(); ctx.fillStyle = base; ctx.fillRect(0, 0, W, Hh);
    const nz = H.makeNoise(seed), cell = 4, [br, bg, bb] = H.hex(base);
    for (let y = 0; y < Hh; y += cell) for (let x = 0; x < W; x += cell) {
      const v = nz.fbm2(x * 0.01, y * 0.01, 3) * 0.6 + nz.n2(x * 0.15, y * 0.04) * 0.4;
      const s = 1 + v * strength * 2;
      ctx.fillStyle = `rgb(${br * s | 0},${bg * s | 0},${bb * s | 0})`; ctx.fillRect(x, y, cell, cell);
    }
    ctx.restore();
  };
  // Vignette
  H.vignette = function (ctx, W, Hh, strength = 0.5, color = '0,0,0') {
    const g = ctx.createRadialGradient(W / 2, Hh / 2, Math.min(W, Hh) * 0.3, W / 2, Hh / 2, Math.hypot(W, Hh) * 0.6);
    g.addColorStop(0, `rgba(${color},0)`); g.addColorStop(1, `rgba(${color},${strength})`);
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(0, 0, W, Hh); ctx.restore();
  };

  // ---------- rendering entry ----------
  // Renders style into canvas at logical 1280x720 (canvas can be any pixel size; it is scaled).
  H.W = 1280; H.H = 720;
  H.loadFonts = async function (style) {
    const specs = style.fonts || [];
    try { const sample = 'AaZz09' + (window.FONT_SAMPLE || '');
      await Promise.all(specs.map((f) => document.fonts.load(f, sample))); await document.fonts.ready; } catch (e) { /* render anyway */ }
  };
  H.render = function (style, canvas, t) {
    const ctx = canvas.getContext('2d', { willReadFrequently: !!style.readsPixels });
    const sx = canvas.width / H.W, sy = canvas.height / H.H;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save(); ctx.scale(sx, sy);
    style.draw(ctx, H.W, H.H, t == null ? style.frameT || 0 : t);
    ctx.restore();
  };
})();
</script>
<script>
// ---- style kit: extracted verbatim from references/flat-space.js (lines 3-21, 36-253, 405-467, 739-743) ----
  // ---------- Flat-vector science explainer: deep space gradients, chunky shaded balls, crescent shadows, glows ----------
  const TAU = Math.PI * 2;
  const cl = H.clamp, lerp = H.lerp;
  const seg = (t, a, b) => cl((t - a) / (b - a));
  const eo = H.ease.out, eio = H.ease.inOut;
  // gentle overshoot
  const back = (u, s = 1.5) => { if (u <= 0) return 0; if (u >= 1) return 1; return 1 + (s + 1) * Math.pow(u - 1, 3) + s * Math.pow(u - 1, 2); };
  const FONT = '"Nunito", "Fredoka", sans-serif';
  const F = (w, px) => `${w} ${px}px ${FONT}`;

  const C = {
    sky0: '#090b2c', sky1: '#18134f', sky2: '#3a1a6c',
    ink: '#141846', visor: '#10164a',
    teal: ['#a4fbef', '#3ccbdc', '#1d64b0'],
    orange: ['#ffcc7a', '#ff8d3f', '#d24a2a'],
    tan: ['#ffe9be', '#ecb676', '#b4723c'],
    yellow: '#ffd23f', pink: '#ff5d8f', red: '#ff3b5c', green: '#38e08e', cyan: '#56e8ff', violet: '#8b5cff',
  };

  // ---------- small helpers ----------
  function rr(x, X, Y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r);
    x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath();
  }
  function glow(x, cx, cy, r, col, a) {
    if (a <= 0 || r <= 0) return;
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, H.rgba(col, a)); g.addColorStop(0.35, H.rgba(col, a * 0.4)); g.addColorStop(1, H.rgba(col, 0));
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill();
  }
  function spark(x, cx, cy, r, col, a) {
    if (a <= 0 || r <= 0) return;
    x.save(); x.globalAlpha *= a; x.fillStyle = col; x.beginPath();
    x.moveTo(cx, cy - r); x.quadraticCurveTo(cx, cy, cx + r, cy); x.quadraticCurveTo(cx, cy, cx, cy + r);
    x.quadraticCurveTo(cx, cy, cx - r, cy); x.quadraticCurveTo(cx, cy, cx, cy - r); x.fill(); x.restore();
  }
  // region of circle (cx,cy,r) NOT covered by the same circle shifted by (dx,dy)
  function crescent(x, cx, cy, r, dx, dy, fill) {
    x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip();
    x.beginPath(); x.rect(cx - r - 2, cy - r - 2, 2 * r + 4, 2 * r + 4); x.arc(cx + dx, cy + dy, r * 1.02, 0, TAU);
    x.fillStyle = fill; x.fill('evenodd'); x.restore();
  }
  // the core flat-vector ball: multi-stop gradient, two stepped flat shadow crescents, rim highlight
  function ball(x, cx, cy, r, col, o = {}) {
    if (r <= 0.3) return;
    const la = o.la == null ? -2.25 : o.la, lx = Math.cos(la), ly = Math.sin(la);
    const g = x.createLinearGradient(cx + lx * r, cy + ly * r, cx - lx * r, cy - ly * r);
    g.addColorStop(0, col[0]); g.addColorStop(0.45, col[1]); g.addColorStop(1, H.rgba(H.mix(col[1], col[2], 0.6)));
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill();
    if (o.inner) { x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip(); o.inner(); x.restore(); }
    const sh = o.sh == null ? 0.3 : o.sh;
    crescent(x, cx, cy, r, lx * r * sh, ly * r * sh, H.rgba(col[2], o.sha == null ? 0.5 : o.sha));
    crescent(x, cx, cy, r, lx * r * sh * 2.2, ly * r * sh * 2.2, H.rgba(col[2], (o.sha == null ? 0.5 : o.sha) * 0.45));
    crescent(x, cx, cy, r, -lx * r * 0.075, -ly * r * 0.075, H.rgba(o.rim || '#ffffff', o.rima == null ? 0.42 : o.rima));
  }
  const bez = (P, u) => { const v = 1 - u; return [v * v * v * P[0][0] + 3 * v * v * u * P[1][0] + 3 * v * u * u * P[2][0] + u * u * u * P[3][0], v * v * v * P[0][1] + 3 * v * v * u * P[1][1] + 3 * v * u * u * P[2][1] + u * u * u * P[3][1]]; };
  // rounded dotted / solid arrow along a cubic, drawn on to `prog`
  function arrow(x, P, prog, col, lw, o = {}) {
    if (prog <= 0) return;
    const n = 48, a = o.a == null ? 1 : o.a;
    x.save(); x.globalAlpha *= a; x.strokeStyle = col; x.fillStyle = col; x.lineWidth = lw; x.lineCap = 'round'; x.lineJoin = 'round';
    if (o.dots) x.setLineDash([0.01, lw * 1.9]);
    x.beginPath(); const p0 = bez(P, o.from || 0); x.moveTo(p0[0], p0[1]);
    for (let i = 1; i <= n; i++) { const u = (o.from || 0) + ((prog - (o.from || 0)) * i) / n; const p = bez(P, u); x.lineTo(p[0], p[1]); }
    x.stroke(); x.setLineDash([]);
    if (o.head !== false && prog > 0.08) {
      const e = bez(P, prog), e0 = bez(P, prog - 0.02), ang = Math.atan2(e[1] - e0[1], e[0] - e0[0]), hs = lw * 1.5 * cl(prog * 5);
      x.translate(e[0], e[1]); x.rotate(ang); x.beginPath(); x.moveTo(hs * 1.1, 0); x.lineTo(-hs * 0.8, hs); x.lineTo(-hs * 0.8, -hs); x.closePath();
      x.lineWidth = lw * 0.7; x.fill(); x.stroke();
    }
    x.restore();
  }
  // flat text with a darker offset "long shadow"
  function text(x, s, cx, cy, px, col, o = {}) {
    x.save(); x.font = F(o.w || 900, px); x.textAlign = o.align || 'center'; x.textBaseline = 'middle';
    x.globalAlpha *= o.a == null ? 1 : o.a;
    x.fillStyle = o.shadow || 'rgba(10,8,46,0.55)'; x.fillText(s, cx + px * 0.03, cy + px * 0.07);
    x.fillStyle = col; x.fillText(s, cx, cy); x.restore();
  }
  // rounded label pill, optional pointer below
  function pill(x, cx, cy, s, px, o = {}) {
    const sc = o.s == null ? 1 : o.s, a = o.a == null ? 1 : o.a;
    if (sc <= 0.01 || a <= 0.01) return;
    x.save(); x.font = F(o.w || 900, px);
    const tw = x.measureText(s).width, w = tw + px * 1.15, h = px * 1.6;
    x.translate(cx, cy); x.scale(sc, sc); x.globalAlpha *= a;
    x.fillStyle = 'rgba(10,8,46,0.4)'; rr(x, -w / 2, -h / 2 + px * 0.2, w, h, h / 2); x.fill();
    x.fillStyle = o.bg || '#ffffff';
    if (o.ptr) { x.beginPath(); x.moveTo(-px * 0.35, h / 2 - 2); x.lineTo(0, h / 2 + px * 0.45); x.lineTo(px * 0.35, h / 2 - 2); x.fill(); }
    rr(x, -w / 2, -h / 2, w, h, h / 2); x.fill();
    x.fillStyle = 'rgba(255,255,255,0.35)'; rr(x, -w / 2 + h * 0.25, -h / 2 + h * 0.12, w - h * 0.5, h * 0.16, h * 0.08); x.fill();
    x.fillStyle = o.fg || C.ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, px * 0.06);
    x.restore();
    return w;
  }

  // ---------- sky: gradient, nebula glows, parallax stars and sparkles ----------
  let STARS = null;
  function stars() {
    if (STARS) return STARS;
    const r = H.rng(77), a = [], sp = [];
    for (let i = 0; i < 620; i++) a.push({ x: r.range(0, 1680), y: r.range(0, 1120), d: r.pick([0.15, 0.3, 0.3, 0.55, 1]), s: r.range(0.6, 2.0), ph: r.range(0, TAU), sp: r.range(0.8, 2.6), c: r.pick(['#ffffff', '#cfe4ff', '#ffe9c7', '#dccbff']) });
    for (let i = 0; i < 16; i++) sp.push({ x: r.range(0, 1680), y: r.range(0, 1120), d: r.range(0.3, 0.9), s: r.range(6, 13), ph: r.range(0, TAU) });
    STARS = { a, sp }; return STARS;
  }
  function sky(x, W, H_, t, cam = {}) {
    const px = cam.x || 0, py = cam.y || 0, lz = Math.log(cam.z || 1);
    const g = x.createLinearGradient(0, 0, W * 0.3, H_);
    g.addColorStop(0, C.sky0); g.addColorStop(0.5, C.sky1); g.addColorStop(1, C.sky2);
    x.fillStyle = g; x.fillRect(0, 0, W, H_);
    glow(x, W * 0.86, H_ * 0.12, 700, '#7b34c6', 0.34);
    glow(x, W * 0.05, H_ * 1.0, 620, '#2448b4', 0.4);
    glow(x, W * 0.45, H_ * 0.6, 520, '#4a2a9c', 0.16);
    const S = stars();
    const place = (s) => {
      const k = Math.exp(lz * s.d * 0.6);
      let sx = (((s.x - px * s.d) % 1680) + 1680) % 1680 - 200, sy = (((s.y - py * s.d) % 1120) + 1120) % 1120 - 200;
      return [(sx - 640) * k + 640, (sy - 360) * k + 360];
    };
    for (const s of S.a) {
      const [sx, sy] = place(s);
      if (sx < -4 || sx > W + 4 || sy < -4 || sy > H_ + 4) continue;
      x.globalAlpha = (0.55 + 0.45 * Math.sin(t * s.sp + s.ph)) * (0.45 + s.d * 0.55);
      x.fillStyle = s.c; x.beginPath(); x.arc(sx, sy, s.s * (0.7 + 0.35 * s.d), 0, TAU); x.fill();
    }
    x.globalAlpha = 1;
    for (const s of S.sp) {
      const [sx, sy] = place(s); const tw = 0.6 + 0.4 * Math.sin(t * 1.7 + s.ph);
      glow(x, sx, sy, s.s * 2.2, '#bfa8ff', 0.25 * tw);
      spark(x, sx, sy, s.s * tw, '#ffffff', 0.9);
    }
  }

  // ---------- planets ----------
  function ring(x, cx, cy, R, half, a = 1) {
    if (a <= 0) return;
    x.save(); x.translate(cx, cy); x.rotate(R.tilt); x.globalAlpha *= a;
    // clip to the back or front half, wide enough for the outermost band so the ring ends are never cut off
    const m = Math.max(...R.bands.map((b) => b[1])) * 1.05;
    x.beginPath(); if (half === 'back') x.rect(-R.rx * m, -R.ry * m, R.rx * m * 2, R.ry * m); else x.rect(-R.rx * m, 0, R.rx * m * 2, R.ry * m); x.clip();
    for (const [f0, f1, col, al] of R.bands) {
      x.beginPath(); x.ellipse(0, 0, R.rx * f1, R.ry * f1, 0, 0, TAU); x.ellipse(0, 0, R.rx * f0, R.ry * f0, 0, 0, TAU);
      x.fillStyle = H.rgba(col, (al == null ? 1 : al) * (half === 'back' ? 0.75 : 1)); x.fill('evenodd');
    }
    x.restore();
  }
  function bands(x, r, B, tilt) {
    x.save(); x.rotate(tilt || 0);
    for (const [v0, v1, col, a] of B) {
      x.beginPath();
      for (let i = 0; i <= 20; i++) { const u = (i / 20) * 2 - 1; x.lineTo(u * r * 1.1, (v0 + 0.13 * (1 - u * u)) * r); }
      for (let i = 20; i >= 0; i--) { const u = (i / 20) * 2 - 1; x.lineTo(u * r * 1.1, (v1 + 0.13 * (1 - u * u)) * r); }
      x.fillStyle = H.rgba(col, a == null ? 1 : a); x.fill();
    }
    x.restore();
  }
  const PL = {
    magenta: { c: ['#ffa0c4', '#de4b93', '#4e1670'], glow: '#ff5fa8', tilt: -0.18, atmo: [255, 214, 234],
      bands: [[-0.62, -0.48, '#ffc1d8', 0.55], [-0.2, -0.02, '#b5307e', 0.6], [0.06, 0.14, '#ffd0e2', 0.4], [0.36, 0.58, '#9a2775', 0.55]],
      ring: { rx: 1.75, ry: 0.5, tilt: -0.2, bands: [[1.18, 1.32, '#ffd27a', 0.95], [1.34, 1.5, '#ff9f5a', 0.9], [1.53, 1.6, '#ffe7b0', 0.8]] } },
    coral: { c: ['#ffd29a', '#ff7a4a', '#7a1f4f'], glow: '#ff8a50', tilt: 0.1, atmo: [255, 226, 190],
      bands: [[-0.7, -0.5, '#ffe2b8', 0.5], [-0.32, -0.12, '#e8553a', 0.6], [0.05, 0.22, '#ffb27a', 0.5], [0.4, 0.62, '#c43c46', 0.55]] },
    teal: { c: ['#9ff3ff', '#3a9be0', '#1d2f86'], glow: '#4fc9ff', tilt: -0.12, atmo: [190, 245, 255],
      bands: [[-0.5, -0.36, '#c6f8ff', 0.5], [-0.05, 0.1, '#2f74c9', 0.55], [0.32, 0.5, '#7fdcff', 0.4]] },
    moon: { c: ['#e8e6ff', '#a7a2d8', '#4a3f8c'], craters: true },
  };
  function planet(x, cx, cy, r, pal, o = {}) {
    if (r <= 0.5) return;
    const ra = o.ringA == null ? 1 : o.ringA;
    if (pal.glow) glow(x, cx, cy, r * 1.7, pal.glow, o.glowA == null ? 0.32 : o.glowA);
    const R = pal.ring && { rx: pal.ring.rx * r, ry: pal.ring.ry * r, tilt: pal.ring.tilt, bands: pal.ring.bands };
    if (R) ring(x, cx, cy, R, 'back', ra);
    if (o.behind) o.behind(R);
    ball(x, cx, cy, r, pal.c, {
      sh: 0.34, sha: 0.55, rima: 0.35,
      inner: () => {
        x.save(); x.translate(cx, cy);
        if (pal.bands) bands(x, r, pal.bands, pal.tilt);
        if (pal.craters) { const q = H.rng(5); for (let i = 0; i < 5; i++) { const a = q.range(0, TAU), d = q.range(0.1, 0.65) * r, cr = q.range(0.1, 0.2) * r, qx = Math.cos(a) * d, qy = Math.sin(a) * d; x.fillStyle = 'rgba(80,66,150,0.38)'; x.beginPath(); x.arc(qx, qy, cr, 0, TAU); x.fill(); crescent(x, qx, qy, cr, -cr * 0.3, -cr * 0.3, 'rgba(255,255,255,0.3)'); } }
        x.restore();
      },
    });
    const atA = o.atmo == null ? 0.7 : o.atmo;
    if (pal.atmo && atA > 0) { // thin bright atmosphere on the limb, strongest on the lit (upper-left) side
      x.save(); x.lineCap = 'round'; const ga0 = x.globalAlpha;
      const la = -2.25, ag = x.createLinearGradient(cx + Math.cos(la) * r, cy + Math.sin(la) * r, cx - Math.cos(la) * r, cy - Math.sin(la) * r);
      ag.addColorStop(0, H.rgba(pal.atmo, 1)); ag.addColorStop(0.55, H.rgba(pal.atmo, 0.5)); ag.addColorStop(1, H.rgba(pal.atmo, 0.08));
      x.strokeStyle = ag;
      for (const [lw, a] of [[r * 0.05, 0.08], [r * 0.028, 0.16], [r * 0.014, 0.3], [Math.max(2, r * 0.006), 0.6]]) { x.globalAlpha = ga0 * a * atA; x.lineWidth = lw; x.beginPath(); x.arc(cx, cy, r + lw * 0.15, 0, TAU); x.stroke(); }
      x.restore();
    }
    if (R) ring(x, cx, cy, R, 'front', ra);
    if (o.front) o.front(R);
  }

  // ---------- print finish: fine animated grain + soft static mottling (overlay), kills gradient banding ----------
  let GRAIN = null;
  function grainTex() {
    if (GRAIN) return GRAIN;
    const S = 256, tile = H.layer(S, S), tc = tile.getContext('2d'), img = tc.createImageData(S, S), d = img.data, r = H.rng(4242);
    for (let i = 0; i < d.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 92; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    tc.putImageData(img, 0, 0);
    const MW = 320, MH = 180, mot = H.layer(MW, MH), mc = mot.getContext('2d'), mi = mc.createImageData(MW, MH), md = mi.data, nz = H.makeNoise(88);
    for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) { const v = 128 + nz.fbm2(x * 0.035, y * 0.035, 4) * 70 + nz.n2(x * 0.22, y * 0.22) * 14, k = (y * MW + x) * 4; md[k] = md[k + 1] = md[k + 2] = v; md[k + 3] = 255; }
    mc.putImageData(mi, 0, 0);
    GRAIN = { tile, mot };
    return GRAIN;
  }
  function finish(x, W, H_, t) {
    const G = grainTex(), f = Math.floor(t * 24);
    x.save(); x.globalCompositeOperation = 'overlay';
    x.globalAlpha = 0.12; x.imageSmoothingEnabled = true; x.drawImage(G.mot, 0, 0, W, H_);
    const pat = x.createPattern(G.tile, 'repeat'); pat.setTransform(new DOMMatrix().translateSelf((f * 73) % 256, (f * 151) % 256));
    x.globalAlpha = 0.09; x.fillStyle = pat; x.fillRect(0, 0, W, H_);
    x.restore();
  }

  // ---------- eyes (big white, dark pupils) ----------
  function eye(x, ex, ey, er, o) {
    const look = o.look || [0, 0];
    if ((o.happy || 0) > 0.5) {
      x.save(); x.strokeStyle = '#ffffff'; x.lineWidth = er * 0.42; x.lineCap = 'round';
      x.beginPath(); x.arc(ex, ey + er * 0.35, er * 0.62, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); x.restore(); return;
    }
    const bl = 1 - 0.92 * (o.blink || 0);
    x.save(); x.translate(ex, ey); x.scale(1, bl);
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(0, 0, er, 0, TAU); x.fill();
    const pr = er * (o.worry ? 0.5 : 0.56);
    const px = look[0] * er * 0.36, py = look[1] * er * 0.36;
    x.fillStyle = '#141638'; x.beginPath(); x.arc(px, py, pr, 0, TAU); x.fill();
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(px - pr * 0.35, py - pr * 0.4, pr * 0.32, 0, TAU); x.fill();
    x.beginPath(); x.arc(px + pr * 0.35, py + pr * 0.35, pr * 0.13, 0, TAU); x.fill();
    x.restore();
  }
  const blinkAt = (t, ph) => { const u = (t + ph) % 3.3; return u < 0.14 ? Math.sin((u / 0.14) * Math.PI) : 0; };

  // speech bubble with a tail
  function bubble(x, cx, cy, w, h, tx, ty, s, col) {
    if (s <= 0.01) return;
    x.save(); x.translate(cx, cy); x.scale(s, s);
    x.fillStyle = 'rgba(10,8,46,0.4)'; rr(x, -w / 2, -h / 2 + 8, w, h, h / 2); x.fill();
    x.fillStyle = col || '#ffffff';
    x.beginPath(); x.moveTo(-w * 0.18, h * 0.3); x.lineTo((tx - cx) / s, (ty - cy) / s); x.lineTo(-w * 0.02, h * 0.42); x.fill();
    rr(x, -w / 2, -h / 2, w, h, h / 2); x.fill();
    x.restore();
  }
  function badge(x, cx, cy, r, ok, s) {
    if (s <= 0.01) return;
    x.save(); x.translate(cx, cy); x.scale(s, s);
    glow(x, 0, 0, r * 2.4, ok ? C.green : C.red, 0.45);
    ball(x, 0, 0, r, ok ? ['#9fffc8', C.green, '#178a5a'] : ['#ff9aa8', C.red, '#9c1638'], { sha: 0.4 });
    x.strokeStyle = '#ffffff'; x.lineWidth = r * 0.26; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath();
    if (ok) { x.moveTo(-r * 0.42, 0); x.lineTo(-r * 0.1, r * 0.32); x.lineTo(r * 0.45, -r * 0.3); }
    else { x.moveTo(-r * 0.34, -r * 0.34); x.lineTo(r * 0.34, r * 0.34); x.moveTo(r * 0.34, -r * 0.34); x.lineTo(-r * 0.34, r * 0.34); }
    x.stroke(); x.restore();
  }
  function flare(x, cx, cy, k, t, seed) {
    if (k <= 0) return;
    glow(x, cx, cy, 420 * (0.6 + 0.4 * k), '#ffcf5a', 0.55 * k);
    glow(x, cx, cy, 160, '#fff6d0', 0.6 * k);
    x.save(); x.translate(cx, cy); x.rotate(t * 0.25); x.globalAlpha *= 0.32 * k; x.fillStyle = '#ffe28a';
    for (let i = 0; i < 12; i++) { x.rotate(TAU / 12); x.beginPath(); x.moveTo(0, -12); x.lineTo(330 + 60 * (i % 2), 0); x.lineTo(0, 12); x.fill(); }
    x.restore();
  }
  function burst(x, cx, cy, age, seed, spread) {
    if (age < 0 || age > 1.4) return;
    const r = H.rng(seed);
    for (let i = 0; i < 18; i++) {
      const a = r.range(0, TAU), d = (spread || 300) * r.range(0.45, 1) * eo(cl(age / 0.9)), sz = r.range(7, 16) * (1 - cl(age / 1.4));
      spark(x, cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.8, sz, r.pick(['#ffffff', '#ffe28a', '#9ff7ff', '#ffb0d0']), 1);
    }
  }

  // ---------- galaxy of examples (precomputed) ----------
  let GAL = null;
  function galaxyPts() {
    if (GAL) return GAL;
    const r = H.rng(901); GAL = [];
    for (let i = 0; i < 2600; i++) {
      const arm = i % 3, u = Math.pow(r(), 0.85), rr2 = 260 + 5300 * u;
      const ang = arm * (TAU / 3) + rr2 * 0.00075 + r.gauss() * (0.16 + 0.25 * (1 - u));
      GAL.push({ rr: rr2 * (1 + r.gauss() * 0.04), a: ang, s: r.range(1.2, 3.2), c: r.pick(['#ff9a4a', '#ffcc7a', '#ecb676', '#ffffff', '#9ff7ff', '#ff8fb8']) });
    }
    return GAL;
  }
  function galaxy(x, cx, cy, s, rot, a) {
    if (a <= 0.01) return;
    glow(x, cx, cy, 5600 * s * 0.55, '#8a5cff', 0.35 * a);
    glow(x, cx, cy, 5600 * s * 0.22, '#ffcf7a', 0.4 * a);
    x.save(); x.globalAlpha = a;
    for (const p of galaxyPts()) {
      const ang = p.a + rot, d = p.rr * s;
      if (d < 14) continue;
      const px = cx + Math.cos(ang) * d, py = cy + Math.sin(ang) * d * 0.52;
      if (px < -5 || px > 1285 || py < -5 || py > 725) continue;
      x.fillStyle = p.c; x.beginPath(); x.arc(px, py, p.s, 0, TAU); x.fill();
    }
    x.restore();
  }
  function drawArrowGlyph(x, cx, cy) {
    x.beginPath(); rr(x, cx - 42, cy - 9, 56, 18, 9); x.fill();
    x.beginPath(); x.moveTo(cx + 4, cy - 26); x.lineTo(cx + 40, cy); x.lineTo(cx + 4, cy + 26); x.closePath();
    x.lineJoin = 'round'; x.lineWidth = 10; x.strokeStyle = x.fillStyle; x.fill(); x.stroke();
  }

// ---------- CHARACTER KIT v2: the house presenter as a modular rig (see references/character-recipe.md) ----------
// rig(opts) -> skeleton (3D joints J, projected joints S); drawRig(x, R, opts) draws it from separate PART functions that all
// meet at the same named joints; person(x, cx, cy, height, opts) = both, in world units. Body units: % of height, feet at 0,
// y up negative, x = the character's left (screen-right when he faces camera), z = his forward.
const HUM = {
  skin: ['#ffdcc2', '#f6b28b', '#d27a5a'],
  hair: ['#3b4585', '#181c46', '#0a0c24'],
  hood: ['#5062c8', '#2b3678', '#161b4c'],
  jeans: ['#626b9e', '#3a4174', '#222850'],
  tee: '#f5f5fc', shoe: ['#ffffff', '#e8eaf5', '#a9aec4'], mouth: '#7a2b3b', tongue: '#f08a96', blush: '#ff8fa3', ink: '#151838',
};
const D2R = Math.PI / 180;
const BODY = { pelvis: -46, hipX: 5, shoulderX: 12, shoulderY: -28, neckY: -31, headY: -43, upperArm: 16, forearm: 14.5, thigh: 23, shin: 21, ankle: 2.6, sitDrop: 22 };
const VIEWS = { front: 0, '3/4': 45, side: 90, '3/4back': 135, back: 180 }; // add '-left' for the mirrored views
// Hand shapes are finger data: curl [thumb, index, middle, ring, pinky] (0 straight .. 1 folded), spread (rad between fingers),
// roll (0 back of hand to camera .. 0.5 side-on .. 1 palm to camera; override per pose with rollR / rollL), plus a few specials.
// A pose can also pass its own object, e.g. handL: { curl: [1, 0, 0, 0.5, 1], spread: 0.2, roll: 1 }.
const HANDSHAPES = {
  fist:       { curl: [1, 1, 1, 1, 1], roll: 0 },
  grip:       { curl: [0.9, 0.85, 0.85, 0.85, 0.85], roll: 0, grip: [2.9, 0.3] },
  point:      { curl: [1, 0, 1, 1, 1], roll: 0 },
  open:       { curl: [0.25, 0.1, 0.1, 0.15, 0.2], spread: 0.12, roll: 0.25 },
  palm:       { curl: [0, 0, 0, 0, 0], spread: 0.3, roll: 1 },
  type:       { curl: [0.5, 0.55, 0.55, 0.55, 0.55], roll: 0, typing: true },
  pinch:      { curl: [0.4, 0.4, 1, 1, 1], roll: 0, pinch: true },
  peace:      { curl: [1, 0, 0, 1, 1], spread: 0.34, roll: 1 },
  ok:         { curl: [0, 0, 0, 0, 0], spread: 0.2, roll: 1, ok: true },
  thumbsUp:   { curl: [0, 1, 1, 1, 1], roll: 0.5, thumb: 'up' },
  thumbsDown: { curl: [0, 1, 1, 1, 1], roll: 0.5, thumb: 'down' },
  rock:       { curl: [1, 0, 1, 1, 0], spread: 0.28, roll: 1 },
  callMe:     { curl: [0, 1, 1, 1, 0], spread: 0.3, roll: 0.3 },
  one:        { curl: [1, 0, 1, 1, 1], roll: 1 },
  two:        { curl: [1, 0, 0, 1, 1], spread: 0.3, roll: 1 },
  three:      { curl: [1, 0, 0, 0, 1], spread: 0.22, roll: 1 },
  four:       { curl: [1, 0, 0, 0, 0], spread: 0.22, roll: 1 },
  five:       { curl: [0, 0, 0, 0, 0], spread: 0.3, roll: 1 },
  none:       null,
};
const HANDS = Object.keys(HANDSHAPES);
const DEFAULT_POSE = { R: [-14, -44, 0], L: [14, -44, 0], handR: 'fist', handL: 'fist', elbowR: [-0.8, 0.6, -0.5], elbowL: [0.8, 0.6, -0.5],
  footR: [-5.5, -2.6, 0], footL: [5.5, -2.6, 0], sit: 0, crouch: 0, rise: 0, lean: 0, bend: 0, headUp: 0, headTurn: 0, tilt: 0, expr: 'neutral' };
// Hand targets are WRIST positions [x, y, z] in body units as if standing (sitting lowers them with the hips). R/L = his right/left.
const POSES = {
  standing:        { swing: true },
  handsInPocket:   { R: [-9, -47, 2], L: [9, -47, 2], handR: 'none', handL: 'none' },
  armsCrossed:     { R: [7, -59, 9], L: [-7, -61, 9], elbowR: [-1, 0.4, 0.6], elbowL: [1, 0.4, 0.6] },
  pointing:        { L: [40, -77, 6], handL: 'point', expr: 'excited' },
  pointingForward: { L: [10, -76, 30], handL: 'point' },
  presenting:      { L: [31, -58, 8], handL: 'palm', expr: 'happy' },
  showing:         { R: [-8, -64, 14], L: [8, -64, 14], handR: 'palm', handL: 'palm' },
  explaining:      { R: [-22, -62, 8], L: [22, -62, 8], handR: 'palm', handL: 'palm' },
  gesturing:       { R: [-27, -76, 6], L: [27, -76, 6], handR: 'open', handL: 'open', expr: 'happy' },
  thinking:        { R: [-2, -80, 6], L: [-6, -57, 8], elbowR: [-0.3, 1, 0.2], elbowL: [1, 0.5, 0], expr: 'thinking' },
  examining:       { R: [-2, -80, 7], L: [-6, -57, 9], elbowR: [-0.3, 1, 0.2], elbowL: [1, 0.5, 0], lean: 0.12, headUp: -0.25, expr: 'thinking' },
  onCall:          { R: [-7, -88, 4], handR: 'grip', holdR: 'phone', expr: 'happy' },
  holdingTablet:   { R: [-7, -58, 10], L: [7, -58, 10], handR: 'grip', handL: 'grip', holdBoth: 'tablet', headUp: -0.3 },
  drawingOnTablet: { L: [7, -60, 10], R: [-1, -63, 12], handL: 'grip', handR: 'pinch', holdL: 'tablet', holdR: 'pen', headUp: -0.4 },
  writing:         { L: [20, -60, 10], handL: 'pinch', holdL: 'pen' },
  celebrating:     { R: [-20, -113, 2], L: [20, -113, 2], expr: 'laughing' },
  relaxed:         { R: [-6, -96, -4], L: [6, -96, -4], handR: 'none', handL: 'none', expr: 'happy' },
  reacting:        { R: [-10, -66, 12], L: [10, -66, 12], handR: 'palm', handL: 'palm', lean: -0.12, expr: 'surprised' },
  reaching:        { L: [12, -92, 26], handL: 'open', lean: 0.08, headUp: 0.3 },
  leaningIn:       { R: [-6, -56, 16], L: [6, -56, 16], handR: 'type', handL: 'type', lean: 0.24, expr: 'thinking' },
  shrugging:       { R: [-20, -70, 6], L: [20, -70, 6], handR: 'palm', handL: 'palm', tilt: 0.12, expr: 'confused' },
  // seated (sit: 1); put chair() and desk() at the same cx, cy, height. Desk top is at -0.36 * height
  seated:          { R: [-6, -48, 14], L: [6, -48, 14], sit: 1 },
  typing:          { R: [-5, -60, 20], L: [5, -60, 20], handR: 'type', handL: 'type', sit: 1, elbowR: [-0.6, 0.6, -0.6], elbowL: [0.6, 0.6, -0.6] },
  workingAtMonitor:{ R: [-5, -60, 20], L: [5, -60, 20], handR: 'type', handL: 'type', sit: 1, elbowR: [-0.6, 0.6, -0.6], elbowL: [0.6, 0.6, -0.6], headUp: 0.15 },
  sketching:       { R: [-3, -60, 20], L: [9, -60, 18], handR: 'pinch', handL: 'type', holdR: 'pen', sit: 1, lean: 0.18, headUp: -0.45 },
  touchingScreen:  { R: [-5, -60, 20], L: [6, -78, 24], handR: 'type', handL: 'point', sit: 1, elbowR: [-0.6, 0.6, -0.6] },
  // hand gestures (his left hand, raised beside the face, forearm up)
  peaceSign:       { L: [17, -84, 8], handL: 'peace', elbowL: [0.6, 1, 0], expr: 'happy' },
  okSign:          { L: [16, -80, 9], handL: 'ok', elbowL: [0.6, 1, 0], expr: 'happy' },
  thumbsUp:        { L: [13, -64, 14], handL: 'thumbsUp', elbowL: [0.7, 1, -0.3], expr: 'happy' },
  thumbsDown:      { L: [13, -60, 14], handL: 'thumbsDown', elbowL: [0.7, 1, -0.3], expr: 'sad' },
  rockOn:          { L: [18, -96, 4], handL: 'rock', elbowL: [1, 0.6, 0], expr: 'excited' },
  waving:          { L: [22, -92, 4], handL: 'palm', elbowL: [1, 0.8, 0], expr: 'happy' },   // animate L[0] ± 4 with sin(t * 8)
  counting:        { L: [16, -82, 9], handL: 'three', elbowL: [0.6, 1, 0] },                // handL: 'one' .. 'five'
  // jumping: crouch (hips drop, feet planted), rise (whole body up), footR/footL (foot targets, standing coords, move with rise)
  jumpCrouch:      { crouch: 1, lean: 0.4, R: [-12, -40, -14], L: [12, -40, -14], expr: 'excited' },
  jumpTakeoff:     { rise: 8, lean: -0.05, R: [-16, -108, 6], L: [16, -108, 6], handR: 'open', handL: 'open', footR: [-5, -2.6, -2], footL: [5, -2.6, -2], expr: 'excited' },
  jumpAir:         { rise: 24, R: [-20, -112, 4], L: [20, -112, 4], handR: 'open', handL: 'open', footR: [-6, -20, 6], footL: [6, -18, 4], expr: 'laughing' },
  jumpLand:        { crouch: 0.8, lean: 0.25, R: [-14, -56, 14], L: [14, -56, 14], handR: 'open', handL: 'open', expr: 'happy' },
};
// a whole jump, u 0..1 (pass the result as pose; the figure stays on its ground line, the rig lifts itself)
const jumpPose = (u) => poseAt([[0, 'standing'], [0.18, 'jumpCrouch'], [0.32, 'jumpTakeoff'], [0.5, 'jumpAir'], [0.68, 'jumpTakeoff'], [0.84, 'jumpLand'], [1, 'standing']], u);
// brow: [[raise, innerDown] screen-left brow, same right]; eye: open | happy | wide | wink | tired
const EXPR = {
  neutral:   { eye: 'open', mouth: 'smile', brow: [[0, 0], [0, 0]] },
  happy:     { eye: 'happy', mouth: 'grin', brow: [[-0.4, -0.2], [-0.4, -0.2]], blush: 1 },
  excited:   { eye: 'wide', mouth: 'open', brow: [[-1, 0], [-1, 0]], blush: 1 },
  surprised: { eye: 'wide', mouth: 'o', brow: [[-1.4, 0], [-1.4, 0]] },
  thinking:  { eye: 'open', mouth: 'side', brow: [[-1, 0.3], [0.2, 0.4]], look: [0.6, -0.7] },
  sad:       { eye: 'open', mouth: 'frown', brow: [[-0.3, -1], [-0.3, -1]], look: [0, 0.5] },
  angry:     { eye: 'open', mouth: 'flat', brow: [[0.4, 1.2], [0.4, 1.2]] },
  confused:  { eye: 'open', mouth: 'squiggle', brow: [[-1.1, -0.3], [0.5, 0.6]], look: [-0.4, -0.4] },
  winking:   { eye: 'wink', mouth: 'grin', brow: [[-0.4, 0], [0.3, 0.4]] },
  laughing:  { eye: 'happy', mouth: 'open', brow: [[-0.6, -0.4], [-0.6, -0.4]], blush: 1 },
  tired:     { eye: 'tired', mouth: 'flat', brow: [[0.3, -0.6], [0.3, -0.6]], look: [0, 0.4] },
};

// ---- shading (light stays upper-left on screen; flipped inside mirrored local frames)
let HLX = Math.cos(-2.25), HLY = Math.sin(-2.25), HLA = -2.25;
const setLight = (mir) => { HLX = (mir ? -1 : 1) * Math.cos(-2.25); HLY = Math.sin(-2.25); HLA = mir ? Math.PI + 2.25 : -2.25; };
// dark base, two stepped crescent bands (lower-right), soft gradient body when g = [cx, cy, r] is given, thin rim (upper-left)
function flatShade(x, path, col, k, rim = true, g = null) {
  x.save(); x.beginPath(); path(); x.clip();
  x.fillStyle = col[2]; x.fillRect(-1e4, -1e4, 2e4, 2e4);
  x.save(); x.translate(HLX * k, HLY * k); x.beginPath(); path(); x.fillStyle = H.rgba(H.mix(col[1], col[2], 0.5)); x.fill(); x.restore();
  x.save(); x.translate(HLX * k * 2.2, HLY * k * 2.2); x.beginPath(); path();
  if (g) { const gr = x.createLinearGradient(g[0] + HLX * g[2], g[1] + HLY * g[2], g[0] - HLX * g[2], g[1] - HLY * g[2]); gr.addColorStop(0, H.rgba(H.mix(col[0], col[1], 0.45))); gr.addColorStop(1, col[1]); x.fillStyle = gr; }
  else x.fillStyle = col[1];
  x.fill(); x.restore();
  if (rim) { x.save(); x.translate(-HLX * k * 0.4, -HLY * k * 0.4); x.beginPath(); path(); x.strokeStyle = H.rgba(col[0], 0.55); x.lineWidth = k * 0.7; x.stroke(); x.restore(); }
  x.restore();
}
function limbStroke(x, pts, w, col) {
  const line = (dx, dy) => { x.beginPath(); x.moveTo(pts[0][0] + dx, pts[0][1] + dy); for (let i = 1; i < pts.length; i++) x.lineTo(pts[i][0] + dx, pts[i][1] + dy); x.stroke(); };
  x.save(); x.lineCap = 'round'; x.lineJoin = 'round';
  x.strokeStyle = col[2]; x.lineWidth = w; line(0, 0);
  x.strokeStyle = col[1]; x.lineWidth = w * 0.74; line(HLX * w * 0.12, HLY * w * 0.12);
  x.strokeStyle = H.rgba(col[0], 0.5); x.lineWidth = w * 0.2; line(HLX * w * 0.28, HLY * w * 0.28);
  x.restore();
}

// ---- skeleton
// 3D two-bone IK: the middle joint bends toward `pole`; returns [joint, end]
function ik3(s, t, l1, l2, pole) {
  let d = [t[0] - s[0], t[1] - s[1], t[2] - s[2]]; const dist = Math.hypot(d[0], d[1], d[2]) || 1e-3; d = d.map((v) => v / dist);
  const dc = Math.min(Math.max(dist, Math.abs(l1 - l2) + 1e-3), l1 + l2 - 1e-3);
  const a = (l1 * l1 + dc * dc - l2 * l2) / (2 * dc), h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const pd = pole[0] * d[0] + pole[1] * d[1] + pole[2] * d[2]; let pp = [pole[0] - pd * d[0], pole[1] - pd * d[1], pole[2] - pd * d[2]];
  const pl = Math.hypot(pp[0], pp[1], pp[2]) || 1; pp = pp.map((v) => v / pl);
  const e = [s[0] + d[0] * a + pp[0] * h, s[1] + d[1] * a + pp[1] * h, s[2] + d[2] * a + pp[2] * h];
  const f = [t[0] - e[0], t[1] - e[1], t[2] - e[2]], fl = Math.hypot(f[0], f[1], f[2]) || 1;
  return [e, [e[0] + (f[0] / fl) * l2, e[1] + (f[1] / fl) * l2, e[2] + (f[2] / fl) * l2]];
}
function viewYaw(o) {
  if (o.yaw != null) return o.yaw;
  if (o.view) { const left = /-left$/.test(o.view), v = VIEWS[o.view.replace(/-left$/, '')] || 0; return left ? -v : v; }
  if (o.back) return 180;
  return (o.turn || 0) * 90;
}
// pose = a POSES name or object, merged over DEFAULT_POSE; opts can override any pose key
function resolvePose(o) {
  const base = typeof o.pose === 'string' ? (POSES[o.pose] || {}) : (o.pose || {});
  const P = { ...DEFAULT_POSE, ...base };
  for (const k of ['R', 'L', 'handR', 'handL', 'rollR', 'rollL', 'holdR', 'holdL', 'holdBoth', 'elbowR', 'elbowL', 'footR', 'footL', 'crouch', 'rise', 'lean', 'bend', 'headUp', 'headTurn', 'tilt', 'expr', 'look']) if (o[k] != null) P[k] = o[k];
  if (o.sit != null) P.sit = o.sit === true ? 1 : o.sit === false ? 0 : o.sit;
  return P;
}
// blend two poses (names or objects), u 0..1. Numbers and arrays interpolate; hand shapes, props and expressions switch at 0.5.
function mixPose(a, b, u) {
  const A = resolvePose({ pose: a }), B = resolvePose({ pose: b }), out = {};
  for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) {
    const va = A[k], vb = B[k];
    if (Array.isArray(va) && Array.isArray(vb)) out[k] = va.map((v, i) => lerp(v, vb[i] == null ? v : vb[i], u));
    else if (typeof va === 'number' || typeof vb === 'number') out[k] = lerp(+va || 0, +vb || 0, u);
    else out[k] = u < 0.5 ? (va === undefined ? vb : va) : (vb === undefined ? va : vb);
  }
  return out;
}
// keyframed pose: keys = [[time, pose], ...] in order; eased between keys
function poseAt(keys, t) {
  if (t <= keys[0][0]) return mixPose(keys[0][1], keys[0][1], 0);
  for (let i = 0; i < keys.length - 1; i++) { const [t0, p0] = keys[i], [t1, p1] = keys[i + 1]; if (t <= t1) return mixPose(p0, p1, eio(seg(t, t0, t1))); }
  const last = keys[keys.length - 1][1]; return mixPose(last, last, 0);
}
// opts: pose, view | yaw | turn | back, walk (phase rad), stride, reachL/reachR ([world x, y]; with reachTip the fingertip lands there),
// plus any pose key. _world = { cx, cy, u } is set by person() so world reach targets can be converted.
function rig(o = {}) {
  const P = resolvePose(o), yaw = viewYaw(o), th = yaw * D2R, cs = Math.cos(th), sn = Math.sin(th);
  const sit = P.sit || 0, rise = P.rise || 0, off = BODY.sitDrop * sit + 14 * (P.crouch || 0) - rise, br = Math.sin((o.t || 0) * 2.2) * 0.35;
  const pel = [0, BODY.pelvis + off, 0], cL = Math.cos(P.lean), sL = Math.sin(P.lean), cB = Math.cos(P.bend), sB = Math.sin(P.bend);
  const up = (p) => { let [x0, y0, z0] = p; const y1 = y0 * cL + z0 * sL, z1 = -y0 * sL + z0 * cL; return [pel[0] + x0 * cB - y1 * sB, pel[1] + x0 * sB + y1 * cB, pel[2] + z1]; };
  const J = { pelvis: pel, neck: up([0, BODY.neckY + br * 0.3, 0]), head: up([0, BODY.headY + br * 0.4, 0]),
    shoulderR: up([-BODY.shoulderX, BODY.shoulderY + br * 0.3, 0]), shoulderL: up([BODY.shoulderX, BODY.shoulderY + br * 0.3, 0]),
    hipR: [-BODY.hipX, pel[1], 0], hipL: [BODY.hipX, pel[1], 0] };
  // legs
  let fR, fL;
  if (o.walk != null) { const A = 11 * (o.stride || 1), p = o.walk; fR = [-5.5, -BODY.ankle - Math.max(0, Math.cos(p)) * 4.5, Math.sin(p) * A]; fL = [5.5, -BODY.ankle - Math.max(0, -Math.cos(p)) * 4.5, -Math.sin(p) * A]; }
  else { fR = [P.footR[0] - 0.5 * sit, P.footR[1] - rise, P.footR[2] + 18 * sit]; fL = [P.footL[0] + 0.5 * sit, P.footL[1] - rise, P.footL[2] + 18 * sit]; }
  [J.kneeR, J.ankleR] = ik3(J.hipR, fR, BODY.thigh, BODY.shin, [0, -0.2, 1]);
  [J.kneeL, J.ankleL] = ik3(J.hipL, fL, BODY.thigh, BODY.shin, [0, -0.2, 1]);
  // arms
  const W = o._world;
  const target = (k) => {
    const s = J['shoulder' + k], reach = o['reach' + k];
    let tg;
    if (reach && W) {
      const bx = (reach[0] - W.cx) / W.u, by = (reach[1] - W.cy) / W.u; let xs = s[0] * 0.5, z;
      if (Math.abs(sn) > 0.25) z = (bx - xs * cs) / sn; else { z = 10; xs = (bx - z * sn) / cs; }
      tg = [xs, by, z];
      if (o.reachTip) { // the fingertip (not the wrist) lands on the point: pull the wrist back by the hand's length
        const tip = { point: 6.6, one: 6.6, open: 6.4, palm: 6.8, five: 6.8, peace: 6.8, type: 5, pinch: 5.1 }[P['hand' + k]] || 3.8;
        const d = [tg[0] - s[0], tg[1] - s[1], tg[2] - s[2]], l = Math.hypot(d[0], d[1], d[2]) || 1; tg = tg.map((v, i) => v - (d[i] / l) * tip); }
    } else if (o.walk != null && P.swing) tg = [s[0] * 1.15, s[1] + 28, Math.sin(o.walk + (k === 'R' ? Math.PI : 0)) * 10];
    else { const h = P[k]; tg = [h[0], h[1] + off, h[2] || 0]; }
    return tg;
  };
  [J.elbowR, J.wristR] = ik3(J.shoulderR, target('R'), BODY.upperArm, BODY.forearm, P.elbowR);
  [J.elbowL, J.wristL] = ik3(J.shoulderL, target('L'), BODY.upperArm, BODY.forearm, P.elbowL);
  // orthographic projection by yaw: [screen x, screen y, depth toward camera]
  const S = {};
  for (const k in J) { const p = J[k]; S[k] = [p[0] * cs + p[2] * sn, p[1], -p[0] * sn + p[2] * cs]; }
  const spine = Math.atan2(S.neck[0] - S.pelvis[0], -(S.neck[1] - S.pelvis[1]));
  return { J, S, P, yaw, cs, sn, spine, headYaw: yaw + (P.headTurn || 0), t: o.t || 0 };
}
// a joint of a rig drawn by person(x, cx, cy, height, ...) in world coordinates
const worldJoint = (R, cx, cy, Hh, name) => [cx + R.S[name][0] * Hh / 100, cy + R.S[name][1] * Hh / 100];

// ---- hands: local frame at the wrist, x along the forearm, thumb on -y
function handFrame(R, k) {
  const w = R.S['wrist' + k], e = R.S['elbow' + k], dx = w[0] - e[0], dy = w[1] - e[1];
  const dir = Math.atan2(dy, dx), sc = cl(Math.hypot(dx, dy) / BODY.forearm, 0.5, 1);
  const flip = (k === 'R' ? 1 : -1) * (R.cs >= -0.2 ? 1 : -1), c = Math.cos(dir), s = Math.sin(dir);
  return { w, dir, flip, at: (px, py) => [w[0] + px * sc * c - py * flip * s, w[1] + px * sc * s + py * flip * c] };
}
// a hand from finger data (HANDSHAPES name or object). Roll narrows the hand toward side-on and swaps the thumb side past it;
// the palm side shows a lighter pad and a crease, the back shows knuckles where fingers fold.
function drawHand(x, R, k, shape) {
  const spec = shape && typeof shape === 'object' ? shape : HANDSHAPES[shape || 'fist'];
  if (!spec) return null;
  const F = handFrame(R, k), rp = R.P['roll' + k], roll = rp != null ? rp : (spec.roll || 0), cr = Math.cos(roll * Math.PI);
  const ys = Math.max(0.4, Math.abs(cr)), ts = cr >= 0 ? 1 : -1;
  const A = (px, py) => F.at(px, py * ys * ts), sk = HUM.skin, cu = spec.curl || [1, 1, 1, 1, 1], sp = spec.spread == null ? 0.1 : spec.spread;
  const line = (pts, w) => limbStroke(x, pts, w, sk);
  const knob = (p, r) => ball(x, p[0], p[1], r, sk, { sha: 0.35, la: HLA, rima: 0.25 });
  const pc = A(2.3, 0);
  flatShade(x, () => x.ellipse(pc[0], pc[1], 2.35, 2.1 * ys + 0.15, F.dir, 0, TAU), sk, 0.35);
  if (roll > 0.5) { // palm side
    const pp = A(2.6, 0.2); x.fillStyle = H.rgba(sk[0], 0.55); x.beginPath(); x.ellipse(pp[0], pp[1], 1.35, 1.05 * ys + 0.1, F.dir, 0, TAU); x.fill();
    const a = A(1.6, -0.9), m = A(2.5, 0.1), b = A(3.3, 1.0); x.strokeStyle = H.rgba(sk[2], 0.45); x.lineWidth = 0.22; x.beginPath(); x.moveTo(a[0], a[1]); x.quadraticCurveTo(m[0], m[1], b[0], b[1]); x.stroke();
  }
  const FB = [-1.3, -0.45, 0.45, 1.3], FL = [3.0, 3.4, 3.1, 2.5], FW = [1.05, 1.1, 1.02, 0.9];
  let grip = spec.grip ? A(spec.grip[0], spec.grip[1]) : A(2.8, 0.3), indexTip = null;
  for (let i = 0; i < 4; i++) {
    const c = cu[i + 1], yb = FB[i] * 0.95;
    if ((spec.ok || spec.pinch) && i === 0) continue; // the index finger is drawn with the thumb below
    if (c >= 0.75) { knob(A(3.9, yb), 0.74); continue; }
    const a = (i - 1.5) * sp, l = FL[i] * (1 - 0.85 * c);
    let tip = A(3.6 + Math.cos(a) * l, yb + Math.sin(a) * l);
    if (spec.typing) { const t0 = A(4.5, yb * 0.95); tip = [t0[0], t0[1] + 1.7]; }
    line([A(3.6, yb), tip], FW[i]);
    if (i === 0) indexTip = tip;
  }
  const tb = A(1.3, -1.5), tc = cu[0];
  if (spec.ok) { const rc = A(4.5, -1.55), r = 1.2, pts = []; for (let j = 0; j <= 18; j++) { const a = (j / 18) * TAU; pts.push([rc[0] + Math.cos(a) * r, rc[1] + Math.sin(a) * r]); } line([tb, A(3.5, -2.2)], 1.15); line(pts, 0.95); }
  else if (spec.pinch) { const m = A(5.1, -0.9); line([A(3.6, -1.24), m], 1.05); line([tb, m], 1.1); grip = m; }
  else if (spec.thumb) { const s = spec.thumb === 'up' ? -1 : 1, e = [tb[0], tb[1] + s * 3.8]; line([tb, e], 1.3); grip = e; }
  else if (tc >= 0.75) line([tb, A(3.1, -0.25)], 1.1);
  else { const l = 3.2 * (1 - 0.5 * tc); line([tb, A(1.3 + l * 0.75, -1.5 - l * 0.7 * (1 - tc))], 1.15); }
  if (spec.typing) { const g0 = A(4.5, 0); grip = [g0[0], g0[1] + 1.7]; }
  else if (!spec.grip && !spec.pinch && !spec.thumb && indexTip && cu[2] >= 0.75) grip = indexTip; // pointing: the fingertip
  return { grip, dir: F.dir, flip: F.flip, roll };
}
function heldProp(x, kind, p, dir, o = {}) {
  x.save();
  if (kind === 'phone') { x.translate(p[0], p[1]); x.rotate(dir + Math.PI / 2); x.fillStyle = '#1b1f3f'; rr(x, -1.8, -3.8, 3.6, 7.2, 0.9); x.fill(); x.fillStyle = H.rgba(C.cyan, 0.75); rr(x, -1.3, -3.2, 2.6, 5.8, 0.5); x.fill(); }
  else if (kind === 'tablet') {
    x.translate(p[0], p[1]); x.fillStyle = '#1d2350'; rr(x, -7.5, -5.5, 15, 11, 1.3); x.fill();
    const g = x.createLinearGradient(-6, -5, 6, 5); g.addColorStop(0, '#7f9cff'); g.addColorStop(1, '#3a55d9'); x.fillStyle = g; rr(x, -6.6, -4.6, 13.2, 9.2, 0.8); x.fill();
    if (o.sketch != null) { x.strokeStyle = '#ffffff'; x.lineWidth = 0.5; x.lineCap = 'round'; x.beginPath(); const n = Math.floor(cl(o.sketch) * 24); for (let i = 0; i <= n; i++) { const u = i / 24, px = -5 + u * 10, py = Math.sin(u * 7) * 2; i ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
  }
  else if (kind === 'pen') { const a = dir + 0.6, ca = Math.cos(a), sa = Math.sin(a); x.lineCap = 'round'; x.strokeStyle = '#f2f4ff'; x.lineWidth = 0.95; x.beginPath(); x.moveTo(p[0] - ca * 5.5, p[1] - sa * 5.5); x.lineTo(p[0] + ca * 1.2, p[1] + sa * 1.2); x.stroke(); x.fillStyle = HUM.ink; x.beginPath(); x.arc(p[0] + ca * 1.3, p[1] + sa * 1.3, 0.45, 0, TAU); x.fill(); }
  else if (kind === 'mug') { x.fillStyle = '#e8eaf5'; rr(x, p[0] - 2, p[1] - 3, 4, 4.6, 0.8); x.fill(); x.strokeStyle = '#e8eaf5'; x.lineWidth = 0.7; x.beginPath(); x.arc(p[0] + 2.1, p[1] - 0.8, 1.1, -1.3, 1.3); x.stroke(); }
  x.restore();
}

// ---- head (local frame, facing right when mirrored; t = |sin(head yaw)|)
function humanHead(x, hc, t, rear, exName, o) {
  const E = EXPR[exName] || EXPR.neutral, prof = t > 0.78, fy = -(o.headUp || 0) * 1.8;
  const headPath = () => x.ellipse(hc[0], hc[1], 8.7 * (1 - 0.08 * t), 9.5, 0, 0, TAU);
  const E2 = (cx, cy, rx, ry, rot) => { x.moveTo(cx + rx * Math.cos(rot), cy + rx * Math.sin(rot)); x.ellipse(cx, cy, rx, ry, rot, 0, TAU); };
  const fx = hc[0] + t * 4.2;
  if (!rear && t < 0.6) for (const sd of [-1, 1]) ball(x, hc[0] + sd * 8.3 * (1 - 0.4 * t) - t * 1.5, hc[1] + 1 + fy * 0.3, 1.8, HUM.skin, { sha: 0.4, la: HLA, rima: 0.2 });
  flatShade(x, headPath, HUM.skin, 1.1, true, [hc[0], hc[1], 9]);
  if (!rear && prof) ball(x, hc[0] + 7.7, hc[1] + 2 + fy, 1.3, HUM.skin, { sha: 0.3, la: HLA, rima: 0.2 });
  if (!rear && t >= 0.6) ball(x, hc[0] - 2.6, hc[1] + 1, 1.9, HUM.skin, { sha: 0.45, la: HLA, rima: 0.2 });
  const hx = hc[0] - t * 1.3, hy = hc[1];
  const hairPath = () => {
    if (rear) E2(hc[0] - t * 1.6, hy - 0.6, 9.1, 9.8, 0); else E2(hx, hy - 6, 9.3, 4.7, 0);
    E2(hx - 5, hy - 9, 3.5, 2.8, -0.4); E2(hx - 1.2, hy - 10.4, 3.7, 2.9, 0.1); E2(hx + 3, hy - 9.8, 3.5, 2.7, 0.4); E2(hx + 6.6, hy - 7.6, 2.7, 2.4, 0.7);
    if (!rear) {
      for (const k of [-5.6, -2.8, 0, 2.8, 5.4]) E2(fx + k * (1 - 0.4 * t), hy - 4.4 + Math.abs(k) * 0.12 + fy * 0.5, 1.95, 3.4, -0.45 - t * 0.25);
      if (t < 0.5) { E2(hc[0] - 7.7 * (1 - 0.4 * t) - t, hy - 2.5, 1.8, 3.2, 0.15); E2(hc[0] + 7.7 * (1 - 0.4 * t) - t, hy - 2.5, 1.8, 3.2, -0.15); }
      else E2(hc[0] - 4.9, hy - 3, 4.3, 5.5, 0.3);
    }
  };
  flatShade(x, hairPath, HUM.hair, 0.9, false);
  x.save(); x.beginPath(); hairPath(); x.clip(); x.fillStyle = H.rgba(HUM.hair[0], 0.45);
  x.beginPath(); x.ellipse(hx - 3.2, hy - 9.8, 3.6, 1.3, -0.35, 0, TAU); x.fill(); x.beginPath(); x.ellipse(hx + 1.4, hy - 11, 2.2, 0.9, 0.1, 0, TAU); x.fill(); x.restore();
  if (rear) { if (t > 0.3) ball(x, hc[0] + 7.9, hc[1] + 1.5, 1.8, HUM.skin, { sha: 0.45, la: HLA, rima: 0.2 }); return; }
  const look = o.look || E.look || [0, 0], ey = hc[1] + 0.9 + fy;
  const eyes = prof ? [[fx - 0.4, 1]] : [[fx - 3.2 * (1 - 0.3 * t), -1], [fx + 3.2 * (1 - 0.3 * t), 1]];
  for (const [exx, sd] of eyes) {
    const kind = E.eye === 'wink' ? (sd > 0 ? 'happy' : 'open') : E.eye, sc = !prof && sd < 0 ? 1 - 0.35 * t : 1;
    x.save(); x.translate(exx + look[0] * 0.55, ey + look[1] * 0.45); x.scale(sc, 1);
    if (kind === 'happy') { x.strokeStyle = HUM.ink; x.lineWidth = 0.75; x.lineCap = 'round'; x.beginPath(); x.arc(0, 0.7, 1.3, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); }
    else {
      const big = kind === 'wide' ? 1.25 : 1; x.scale(1, 1 - 0.9 * (o.blink || 0));
      x.fillStyle = HUM.ink; x.beginPath(); x.ellipse(0, 0, 1.08 * big, 1.5 * big, 0, 0, TAU); x.fill();
      x.fillStyle = '#ffffff'; x.beginPath(); x.arc(-0.35 * big, -0.5 * big, 0.4 * big, 0, TAU); x.fill();
      if (kind === 'tired') { x.fillStyle = HUM.skin[1]; x.fillRect(-1.6, -2.2, 3.2, 2.1); x.strokeStyle = HUM.ink; x.lineWidth = 0.45; x.beginPath(); x.moveTo(-1.3, -0.1); x.lineTo(1.3, -0.1); x.stroke(); }
    }
    x.restore();
    const bw = E.brow[sd < 0 ? 0 : 1], by0 = ey - 3.0 + bw[0], inner = prof ? 1 : -sd;
    x.save(); x.strokeStyle = HUM.hair[2]; x.lineWidth = 0.85; x.lineCap = 'round'; x.beginPath();
    x.moveTo(exx + inner * 1.5 * sc, by0 + bw[1] * 0.6); x.lineTo(exx - inner * 1.6 * sc, by0 - bw[1] * 0.6); x.stroke(); x.restore();
  }
  if (!prof) { x.save(); x.strokeStyle = HUM.skin[2]; x.lineWidth = 0.55; x.lineCap = 'round'; x.beginPath(); x.arc(fx + t * 1.6, ey + 2.1, 0.7, 0.1 * Math.PI, 0.9 * Math.PI); x.stroke(); x.restore(); }
  const mx = prof ? fx + 0.8 : fx + t * 0.6, my = hc[1] + 5.3 + fy;
  x.save(); x.lineCap = 'round'; x.strokeStyle = HUM.ink; x.lineWidth = 0.55; x.fillStyle = HUM.mouth;
  if (E.mouth === 'smile') { x.beginPath(); x.arc(mx, my - 1.2, 1.7, 0.25 * Math.PI, 0.75 * Math.PI); x.stroke(); }
  else if (E.mouth === 'grin' || E.mouth === 'open') {
    const d = E.mouth === 'open' ? 3.6 : 2.4, w2 = 2.3 * (prof ? 0.6 : 1);
    x.beginPath(); x.moveTo(mx - w2, my - 0.6); x.quadraticCurveTo(mx, my - 1.0, mx + w2, my - 0.6);
    x.quadraticCurveTo(mx + w2 * 0.6, my - 0.6 + d, mx, my - 0.6 + d); x.quadraticCurveTo(mx - w2 * 0.6, my - 0.6 + d, mx - w2, my - 0.6); x.fill();
    x.save(); x.clip(); x.fillStyle = '#ffffff'; x.fillRect(mx - w2, my - 1.2, w2 * 2, 0.95); x.fillStyle = HUM.tongue; x.beginPath(); x.ellipse(mx, my - 0.6 + d, w2 * 0.55, d * 0.4, 0, 0, TAU); x.fill(); x.restore();
  }
  else if (E.mouth === 'o') { x.beginPath(); x.ellipse(mx, my, 0.9, 1.25, 0, 0, TAU); x.fill(); }
  else if (E.mouth === 'frown') { x.beginPath(); x.arc(mx, my + 1.3, 1.6, 1.2 * Math.PI, 1.8 * Math.PI); x.stroke(); }
  else if (E.mouth === 'flat') { x.beginPath(); x.moveTo(mx - 1.3, my); x.lineTo(mx + 1.3, my); x.stroke(); }
  else if (E.mouth === 'side') { x.beginPath(); x.moveTo(mx - 0.6, my + 0.2); x.quadraticCurveTo(mx + 0.6, my + 0.3, mx + 1.7, my - 0.4); x.stroke(); }
  else if (E.mouth === 'squiggle') { x.beginPath(); x.moveTo(mx - 1.6, my); x.quadraticCurveTo(mx - 0.8, my - 0.8, mx, my); x.quadraticCurveTo(mx + 0.8, my + 0.8, mx + 1.6, my); x.stroke(); }
  if (E.blush) { x.fillStyle = H.rgba(HUM.blush, 0.35); for (const [bx] of eyes) { x.beginPath(); x.ellipse(bx + (prof ? 0.5 : 0), ey + 2.7, 1.3, 0.7, 0, 0, TAU); x.fill(); } }
  x.restore();
}

// ---- PARTS: each draws one piece of a rig R between its named joints (in body units; person() sets up the scale)
const PART = {
  thigh(x, R, k) { limbStroke(x, [R.S['hip' + k], R.S['knee' + k]], 7.6, HUM.jeans); },
  shin(x, R, k) { limbStroke(x, [R.S['knee' + k], R.S['ankle' + k]], 7.2, HUM.jeans); },
  leg(x, R, k) { limbStroke(x, [R.S['hip' + k], R.S['knee' + k], R.S['ankle' + k]], 7.4, HUM.jeans); PART.shoe(x, R, k); },
  shoe(x, R, k) {
    const a = R.S['ankle' + k], dirS = R.sn >= 0 ? 1 : -1, len = 6.6 + 3.6 * Math.abs(R.sn);
    x.save(); x.translate(a[0], a[1] + BODY.ankle); x.scale(dirS, 1); setLight(dirS < 0);
    flatShade(x, () => rr(x, -3.3, -4.2, len, 4.2, 2), HUM.shoe, 0.55); x.fillStyle = HUM.shoe[2]; x.fillRect(-2.7, -1.1, len - 1.2, 1.1);
    x.restore(); setLight(false);
  },
  upperArm(x, R, k) { limbStroke(x, [R.S['shoulder' + k], R.S['elbow' + k]], 5.8, HUM.hood); },
  forearm(x, R, k) { limbStroke(x, [R.S['elbow' + k], R.S['wrist' + k]], 5.4, HUM.hood); PART.cuff(x, R, k); },
  arm(x, R, k) { limbStroke(x, [R.S['shoulder' + k], R.S['elbow' + k], R.S['wrist' + k]], 5.6, HUM.hood); PART.cuff(x, R, k); },
  cuff(x, R, k) { const w = R.S['wrist' + k], e = R.S['elbow' + k], d = Math.atan2(w[1] - e[1], w[0] - e[0]); x.fillStyle = HUM.hood[2]; x.beginPath(); x.arc(w[0] - Math.cos(d) * 1.1, w[1] - Math.sin(d) * 1.1, 2.7, 0, TAU); x.fill(); },
  hand(x, R, k, shape) { return drawHand(x, R, k, shape || R.P['hand' + k]); },
  neck(x, R) { const n = R.S.neck, h = R.S.head; limbStroke(x, [n, [lerp(n[0], h[0], 0.5), lerp(n[1], h[1], 0.5)]], 4.6, HUM.skin); },
  // the torso and hood live in a local frame: pelvis origin, spine up, mirrored when he faces left
  _torsoFrame(x, R, fn) {
    const P = R.S.pelvis, N = R.S.neck, len = Math.hypot(N[0] - P[0], N[1] - P[1]) / -BODY.neckY, mir = R.sn < 0;
    x.save(); x.translate(P[0], P[1]); x.rotate(R.spine); x.scale(mir ? -1 : 1, len); setLight(mir);
    fn(Math.abs(R.sn), 0.55 + 0.45 * Math.abs(R.cs)); x.restore(); setLight(false);
  },
  hood(x, R) { if (R.cs < -0.2) return; PART._torsoFrame(x, R, (t, w) => flatShade(x, () => x.ellipse(t * 1.5, BODY.neckY + 0.8, 8.6 * (0.6 + 0.4 * w), 3.8, 0, 0, TAU), HUM.hood, 0.6)); },
  torso(x, R) {
    PART._torsoFrame(x, R, (t, w) => {
      const tY = BODY.neckY, tx = t;
      const body = () => { const L = -13 * w + tx, Rr = 13 * w + tx; x.moveTo(L, -24); x.quadraticCurveTo(L, tY + 0.3, L + 5, tY); x.lineTo(Rr - 5, tY); x.quadraticCurveTo(Rr, tY + 0.3, Rr, -24); x.lineTo(Rr - 0.5 * w, 0.5); x.quadraticCurveTo(Rr - 0.5 * w, 3, Rr - 3, 3); x.lineTo(L + 3, 3); x.quadraticCurveTo(L + 0.5 * w, 3, L + 0.5 * w, 0.5); x.closePath(); };
      flatShade(x, body, HUM.hood, 1.6, true, [tx, -14, 16]);
      x.save(); x.beginPath(); body(); x.clip(); x.fillStyle = H.rgba(HUM.hood[2], 0.55); x.fillRect(-20, -0.2, 40, 3.4);
      if (R.cs > 0.2 && t < 0.8) {
        const zx = tx * 1.5 + t * 3.5, zw = 3.4 * (1 - 0.6 * t);
        x.fillStyle = HUM.tee; x.beginPath(); x.moveTo(zx - zw, tY - 0.5); x.quadraticCurveTo(zx, tY + 2.4, zx + zw, tY - 0.5); x.lineTo(zx + zw * 0.9, 3); x.lineTo(zx - zw * 0.9, 3); x.closePath(); x.fill();
        x.fillStyle = HUM.skin[1]; x.beginPath(); x.moveTo(zx - zw * 0.75, tY - 0.6); x.quadraticCurveTo(zx, tY + 1.8, zx + zw * 0.75, tY - 0.6); x.closePath(); x.fill();
        x.strokeStyle = H.rgba(HUM.hood[2], 0.8); x.lineWidth = 0.6; x.beginPath(); x.moveTo(zx - zw, tY); x.lineTo(zx - zw * 0.9, 3); x.moveTo(zx + zw, tY); x.lineTo(zx + zw * 0.9, 3); x.stroke();
        x.strokeStyle = HUM.shoe[1]; x.lineWidth = 0.55; x.lineCap = 'round'; x.beginPath(); x.moveTo(zx - zw - 0.8, tY + 1); x.lineTo(zx - zw - 1.0, tY + 7.5); x.moveTo(zx + zw + 0.8, tY + 1); x.lineTo(zx + zw + 1.0, tY + 7.5); x.stroke();
      }
      x.restore();
      if (R.cs < -0.2) { const hx = tx - t * 2; flatShade(x, () => { x.moveTo(-8 * w + hx, tY + 0.5); x.quadraticCurveTo(hx, tY + 18, 8 * w + hx, tY + 0.5); x.quadraticCurveTo(hx, tY - 3, -8 * w + hx, tY + 0.5); }, HUM.hood, 0.7); }
    });
  },
  head(x, R, o = {}) {
    const hp = R.S.head, hy = R.headYaw * D2R, t = Math.abs(Math.sin(hy)), rear = Math.cos(hy) < 0, mir = Math.sin(hy) < 0;
    const blink = o.blink != null ? o.blink : (o.t != null ? blinkAt(o.t, 0.7) : 0);
    x.save(); x.translate(hp[0], hp[1] + 8); x.rotate(R.spine + (R.P.tilt || 0)); x.translate(0, -8); if (mir) x.scale(-1, 1); setLight(mir);
    humanHead(x, [0, 0], t, rear, R.P.expr || 'neutral', { headUp: R.P.headUp, look: o.look || R.P.look, blink });
    x.restore(); setLight(false);
  },
  joint(x, p, r = 1.6, col = C.cyan) { glow(x, p[0], p[1], r * 3, col, 0.5); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(p[0], p[1], r * 0.55, 0, TAU); x.fill(); x.strokeStyle = col; x.lineWidth = r * 0.35; x.beginPath(); x.arc(p[0], p[1], r, 0, TAU); x.stroke(); },
  // skeleton overlay for anatomy beats: which = 'R' | 'L' | 'arms' | 'all'; highlight = a joint name to pulse
  bones(x, R, which = 'arms', o = {}) {
    const S = R.S, chains = [];
    for (const k of ['R', 'L']) if (which === 'all' || which === 'arms' || which === k) chains.push(['shoulder' + k, 'elbow' + k, 'wrist' + k]);
    if (which === 'all') { chains.push(['neck', 'pelvis'], ['shoulderR', 'shoulderL'], ['hipR', 'hipL']); for (const k of ['R', 'L']) chains.push(['hip' + k, 'knee' + k, 'ankle' + k]); }
    x.save(); x.lineCap = 'round'; x.strokeStyle = H.rgba(o.col || '#9ff7ff', 0.9); x.lineWidth = o.lw || 1.2;
    for (const c of chains) { x.beginPath(); c.forEach((n, i) => (i ? x.lineTo(S[n][0], S[n][1]) : x.moveTo(S[n][0], S[n][1]))); x.stroke(); }
    for (const c of chains) for (const n of c) PART.joint(x, S[n], n === o.highlight ? 2.6 * (1 + 0.15 * Math.sin((R.t || 0) * 8)) : 1.4, n === o.highlight ? (o.hcol || C.yellow) : (o.col || C.cyan));
    x.restore();
  },
};

// draw a whole rig in depth order from the parts
function drawRig(x, R, o = {}) {
  const S = R.S, P = R.P, depth = (k, a, b, c) => (S[a + k][2] + S[b + k][2] + S[c + k][2]) / 3;
  const legs = ['R', 'L'].map((k) => ({ k, d: depth(k, 'hip', 'knee', 'ankle') })).sort((a, b) => a.d - b.d);
  const arms = ['R', 'L'].map((k) => ({ k, d: depth(k, 'shoulder', 'elbow', 'wrist') })).sort((a, b) => a.d - b.d);
  const behind = arms.filter((a) => a.d < -3), front = arms.filter((a) => a.d >= -3);
  const hold = (k) => P['hold' + k];
  const handPass = (k) => { const pre = drawHandProps(x, R, k, 'before'); const h = PART.hand(x, R, k); if (h && hold(k) === 'pen') heldProp(x, 'pen', h.grip, h.dir); return h || pre; };
  for (const a of behind) { PART.arm(x, R, a.k); handPass(a.k); }
  for (const l of legs) PART.leg(x, R, l.k);
  PART.hood(x, R); PART.neck(x, R); PART.torso(x, R); PART.head(x, R, o);
  for (const a of front) PART.arm(x, R, a.k);
  // tablets sit between the sleeves and the hands
  if (P.holdBoth === 'tablet') heldProp(x, 'tablet', [(S.wristR[0] + S.wristL[0]) / 2, (S.wristR[1] + S.wristL[1]) / 2 - 2], 0, { sketch: o.sketch });
  for (const k of ['R', 'L']) if (hold(k) === 'tablet') { const w = S['wrist' + k], sd = w[0] > S.pelvis[0] ? -1 : 1; heldProp(x, 'tablet', [w[0] + sd * 6.5, w[1] - 1.5], 0, { sketch: o.sketch }); }
  for (const a of front) handPass(a.k);
}
function drawHandProps(x, R, k, when) {
  if (when === 'before' && R.P['hold' + k] === 'phone') { const F = handFrame(R, k), g = F.at(2.8, 0.3); heldProp(x, 'phone', g, F.dir); }
  if (when === 'before' && R.P['hold' + k] === 'mug') { const F = handFrame(R, k), g = F.at(3.4, 0); heldProp(x, 'mug', g, F.dir); }
  return null;
}
// the whole presenter in world units. opts: everything rig() takes, plus t (breathing + auto blink), blink, look, a, noShadow, noGlow, sketch
function person(x, cx, cy, Hh, o = {}) {
  if (Hh < 4) return null;
  const u = Hh / 100, R = rig({ ...o, _world: { cx, cy, u } });
  x.save(); x.translate(cx, cy); x.scale(u, u); x.globalAlpha *= o.a == null ? 1 : o.a;
  setLight(false);
  if (!o.noGlow) glow(x, R.S.pelvis[0], -55 + BODY.sitDrop * (R.P.sit || 0) * 0.5, 62, '#8aa2ff', 0.16);
  if (!(R.P.sit > 0.5) && !o.noShadow) { // stays on the ground; shrinks and fades as he rises
    const mx = (R.S.ankleR[0] + R.S.ankleL[0]) / 2, k = 1 / (1 + (R.P.rise || 0) / 18);
    x.fillStyle = `rgba(8,6,40,${0.35 * k})`; x.beginPath(); x.ellipse(mx, 0.4, 14 * (0.75 + 0.25 * Math.abs(R.cs)) * (0.6 + 0.4 * k), 2.2 * (0.6 + 0.4 * k), 0, 0, TAU); x.fill();
  }
  drawRig(x, R, o);
  if (o.bones) PART.bones(x, R, o.bones, { highlight: o.boneHighlight });
  x.restore();
  return R;
}

// ---- props in the same shading
// laptop: s = base width (px). view 'side' (hinge right, screen faces left), 'back' (lid to camera, user behind it),
// 'screen' (screen to camera, user in front of it: over-the-shoulder). content(x, w, h) draws on the screen (0,0 = top-left).
function laptop(x, cx, cy, s, o = {}) {
  const SIL = o.col || ['#f2f4ff', '#b8bfe0', '#636a96'], v = o.view || 'side';   // o.col: [light, mid, dark] for contrast on light backgrounds
  setLight(!!o.flip); x.save(); x.translate(cx, cy); if (o.flip) x.scale(-1, 1);
  if (v === 'side') {
    flatShade(x, () => rr(x, -s / 2, -s * 0.05, s, s * 0.05, s * 0.02), SIL, s * 0.012);
    x.save(); x.translate(s / 2 - s * 0.03, -s * 0.045); x.rotate(-(o.open == null ? 1.42 : o.open));
    flatShade(x, () => rr(x, 0, -s * 0.022, s * 0.9, s * 0.044, s * 0.02), SIL, s * 0.01);
    if (o.screen !== false) { x.fillStyle = H.rgba(C.cyan, 0.9); x.fillRect(s * 0.05, -s * 0.03, s * 0.8, s * 0.012); glow(x, s * 0.45, -s * 0.06, s * 0.35, '#56e8ff', 0.25 * (o.glowA == null ? 1 : o.glowA)); }
    x.restore();
  } else if (v === 'back') {
    flatShade(x, () => rr(x, -s * 0.55, -s * 0.035, s * 1.1, s * 0.035, s * 0.015), SIL, s * 0.01);
    flatShade(x, () => rr(x, -s / 2, -s * 0.68, s, s * 0.64, s * 0.035), SIL, s * 0.016);
    glow(x, 0, -s * 0.36, s * 0.12, '#ffffff', 0.5); x.fillStyle = 'rgba(255,255,255,0.85)'; x.beginPath(); x.arc(0, -s * 0.36, s * 0.035, 0, TAU); x.fill(); // generic badge, not a brand logo
  } else {
    flatShade(x, () => { x.moveTo(-s * 0.5, 0); x.lineTo(s * 0.5, 0); x.lineTo(s * 0.44, -s * 0.12); x.lineTo(-s * 0.44, -s * 0.12); x.closePath(); }, SIL, s * 0.01);
    x.fillStyle = '#2a3060'; x.beginPath(); x.moveTo(-s * 0.4, -s * 0.02); x.lineTo(s * 0.4, -s * 0.02); x.lineTo(s * 0.36, -s * 0.1); x.lineTo(-s * 0.36, -s * 0.1); x.closePath(); x.fill();
    flatShade(x, () => rr(x, -s * 0.47, -s * 0.74, s * 0.94, s * 0.62, s * 0.03), SIL, s * 0.012);
    screenFace(x, -s * 0.43, -s * 0.71, s * 0.86, s * 0.54, o);
  }
  x.restore(); setLight(false);
}
function screenFace(x, X, Y, w, h, o) {
  const g = x.createLinearGradient(X, Y, X + w, Y + h); g.addColorStop(0, '#1d2a7a'); g.addColorStop(1, '#0d1146');
  x.fillStyle = g; rr(x, X, Y, w, h, Math.min(w, h) * 0.04); x.fill();
  x.save(); rr(x, X, Y, w, h, Math.min(w, h) * 0.04); x.clip(); x.translate(X, Y);
  if (o.content) o.content(x, w, h);
  else { x.fillStyle = H.rgba(C.cyan, 0.5); for (let i = 0; i < 4; i++) rr(x, w * 0.08, h * (0.16 + i * 0.18), w * (0.5 - i * 0.08), h * 0.08, h * 0.04), x.fill(); x.fillStyle = H.rgba(C.yellow, 0.7); rr(x, w * 0.66, h * 0.16, w * 0.24, h * 0.6, h * 0.05); x.fill(); }
  x.restore(); glow(x, X + w / 2, Y + h / 2, Math.max(w, h) * 0.7, '#56e8ff', 0.12);
}
// monitor on a stand: s = width; view 'screen' | 'back' | 'side'; content(x, w, h) as for laptop. (cx, cy) = foot of the stand
function monitor(x, cx, cy, s, o = {}) {
  const SIL = ['#e8ebff', '#9aa3d4', '#4d5585'], v = o.view || 'screen', h = s * 0.6;
  x.save(); x.translate(cx, cy);
  flatShade(x, () => rr(x, -s * 0.18, -s * 0.03, s * 0.36, s * 0.03, s * 0.015), SIL, s * 0.008);
  flatShade(x, () => rr(x, -s * 0.03, -s * 0.24, s * 0.06, s * 0.22, s * 0.02), SIL, s * 0.008);
  if (v === 'side') flatShade(x, () => rr(x, -s * 0.025, -s * 0.24 - h, s * 0.05, h, s * 0.02), SIL, s * 0.008);
  else { flatShade(x, () => rr(x, -s / 2, -s * 0.22 - h, s, h, s * 0.025), SIL, s * 0.012); if (v === 'screen') screenFace(x, -s * 0.47, -s * 0.22 - h + s * 0.03, s * 0.94, h - s * 0.06, o); }
  x.restore();
}
// desk: top surface at cy; panel hides legs behind it (front views)
function desk(x, cx, cy, w, o = {}) {
  const B = ['#9aa8ff', '#4a5bc8', '#26307a'];
  flatShade(x, () => rr(x, cx - w / 2, cy, w, w * 0.035, w * 0.012), B, w * 0.006);
  if (o.panel !== false) flatShade(x, () => rr(x, cx - w * 0.47, cy + w * 0.03, w * 0.94, o.panelH || w * 0.32, w * 0.012), ['#5a6ad0', '#2f3b8a', '#1a2160'], w * 0.008);
}
// chair in person units: same (cx, cy, height) as the seated person. view 'side' (facing right; flip for left) | 'front' (draw before him) | 'back' (draw after him)
function chair(x, cx, cy, Hh, o = {}) {
  const u = Hh / 100, B = ['#7d93ff', '#3a55d9', '#1f2c86'], v = o.view || 'side';
  setLight(!!o.flip); x.save(); x.translate(cx, cy); x.scale(o.flip ? -u : u, u);
  x.strokeStyle = '#1b2266'; x.lineWidth = 1.6; x.lineCap = 'round';
  if (v === 'side') {
    x.beginPath(); x.moveTo(-7, -19); x.lineTo(-9, 0); x.moveTo(9, -19); x.lineTo(11, 0); x.stroke();
    flatShade(x, () => rr(x, -10, -21.5, 22, 3.2, 1.5), B, 0.6); flatShade(x, () => rr(x, -12.5, -47, 3.4, 27, 1.7), B, 0.6);
  } else if (v === 'front') {
    flatShade(x, () => rr(x, -13, -50, 26, 26, 4), B, 0.8);
    x.beginPath(); x.moveTo(-9, -19); x.lineTo(-10, 0); x.moveTo(9, -19); x.lineTo(10, 0); x.stroke();
    flatShade(x, () => rr(x, -12, -23, 24, 4, 1.8), B, 0.6);
  } else flatShade(x, () => rr(x, -12, -46, 24, 21, 4), B, 0.8);
  x.restore(); setLight(false);
}

// ======================================================================================================
// SCENES: the only part you rewrite per video. Logical canvas is 1280x720 (the reference's units); the glue below
// scales it to the 1920x1080 page (and to 4K when rendered with resolution: landscape-4k).
// Demo topic: "How big is the Sun?" (about 1.3 million Earths would fit inside it, by volume).
// ======================================================================================================
const DURATION = 8; // seconds; keep equal to the root's data-duration
const TL = {
  title: 0.15, titleShrink: [1.6, 2.2],
  sunIn: [1.7, 2.6], sunLabel: 2.55, earthIn: [2.4, 2.9], earthLabel: 2.85, arrow: [3.0, 3.6],
  count: [3.4, 4.9], hit: 4.9,
  sweep: [5.3, 6.1], line1: 6.25, line2: 6.5, D: DURATION,
};
const SUN = ['#fff3b0', '#ffb43a', '#d2502a'];
// Draw subjects accurately: Earth gets oceans, continents and ice caps (not gas-giant bands); a star is self-lit,
// so the Sun keeps only a faint shadow crescent and a strong glow.
function earth(x, cx, cy, r, a = 1) {
  if (r <= 0.5) return;
  x.save(); x.globalAlpha *= a;
  glow(x, cx, cy, r * 1.8, '#4fc9ff', 0.35);
  ball(x, cx, cy, r, ['#9ff3ff', '#3a9be0', '#1d2f86'], { sha: 0.5, inner: () => {
    x.fillStyle = '#38e08e';
    for (const [u, v, w, h, rot] of [[-0.35, -0.2, 0.42, 0.3, 0.5], [0.3, 0.15, 0.3, 0.48, -0.3], [-0.1, 0.45, 0.25, 0.16, 0]]) {
      x.beginPath(); x.ellipse(cx + u * r, cy + v * r, w * r, h * r, rot, 0, TAU); x.fill();
    }
    x.fillStyle = '#ffffff';
    x.beginPath(); x.ellipse(cx, cy - r * 0.97, r * 0.5, r * 0.14, 0, 0, TAU); x.fill();
    x.beginPath(); x.ellipse(cx, cy + r * 0.97, r * 0.45, r * 0.12, 0, 0, TAU); x.fill();
  } });
  x.restore();
}

function header(x, a) { pill(x, 190, 44, 'How big is the Sun?', 28, { a, bg: 'rgba(255,255,255,0.95)' }); }

function sceneA(x, W, H_, t) {
  const pull = 1 + 1.8 * (1 - eo(seg(t, 0, 1.4)));               // hook: camera pulls back through the stars
  sky(x, W, H_, t, { z: pull, x: t * 14 });
  // the Sun drifts in from the right with overshoot, glowing
  const si = back(seg(t, TL.sunIn[0], TL.sunIn[1]), 1.2);
  const sx = lerp(1500, 830, eo(seg(t, TL.sunIn[0], TL.sunIn[1]))) - t * 4, sy = 400 + Math.sin(t * 1.2) * 6, sr = 250 * si;
  glow(x, sx, sy, sr * 1.9, '#ffb43a', 0.45 * si);
  ball(x, sx, sy, sr, SUN, { sha: 0.15, rim: '#fff6d0', rima: 0.6 });
  pill(x, sx, sy + sr + 40, 'the Sun', 34, { s: back(seg(t, TL.sunLabel, TL.sunLabel + 0.3)), bg: C.yellow });
  // Earth pops in, tiny, at the left
  const ei = back(seg(t, TL.earthIn[0], TL.earthIn[1]), 2);
  const ex = 250, ey = 390 + Math.sin(t * 2) * 5;
  earth(x, ex, ey, 26 * ei);
  pill(x, ex, ey - 78, 'Earth', 30, { s: back(seg(t, TL.earthLabel, TL.earthLabel + 0.3)), bg: '#ffffff', ptr: true });
  text(x, 'sizes not to scale', 1250, 44, 28, '#bfe9ff', { align: 'right', w: 800, a: seg(t, TL.earthLabel, TL.earthLabel + 0.3) });
  // dotted arrow draws on from Earth into the Sun
  arrow(x, [[ex + 40, ey + 10], [ex + 200, ey + 120], [sx - sr - 160, sy + 90], [sx - sr - 20, sy + 20]], eio(seg(t, TL.arrow[0], TL.arrow[1])), C.cyan, 9, { dots: true, a: 0.9 });
  // counter: speeds up, then lands with a pop (the key number)
  if (t > TL.count[0] - 0.3) {
    const ca = seg(t, TL.count[0] - 0.3, TL.count[0]);
    const v = Math.round(1.3e6 * Math.pow(seg(t, TL.count[0], TL.count[1]), 2.3));
    const land = seg(t, TL.hit, TL.hit + 0.35), pop = 1 + 0.22 * Math.sin(land * Math.PI) * (land > 0 ? 1 : 0);
    x.save(); x.translate(64, 640); x.scale(pop, pop); x.globalAlpha = ca;
    x.font = F(900, 96); const s = v.toLocaleString('en-US'), nw = x.measureText(s).width;
    text(x, s, 0, 0, 96, land > 0 ? C.yellow : '#ffffff', { align: 'left' });
    text(x, 'Earths', nw + 20, 10, 44, '#bfe9ff', { align: 'left', w: 800 });
    x.restore();
    if (land > 0) { flare(x, 300, 640, Math.max(0, 1 - Math.abs(t - TL.hit - 0.15) / 0.75), t); burst(x, 300, 630, land * 1.2, 77, 240); }
  }
  // hook title, word by word, then it shrinks into the corner header
  const tp = eio(seg(t, TL.titleShrink[0], TL.titleShrink[1]));
  if (tp < 1) {
    const words = ['How', 'big', 'is', 'the', 'Sun?'], px = 88; x.font = F(900, px);
    const sp = x.measureText(' ').width, ws = words.map((w) => x.measureText(w).width), tot = ws.reduce((a, b) => a + b, 0) + sp * (words.length - 1);
    const cx = lerp(640, 190, tp), cy = lerp(300, 44, tp), sc = lerp(1, 28 / px, tp);
    x.save(); x.translate(cx, cy); x.scale(sc, sc);
    let wx = -tot / 2;
    words.forEach((w, i) => {
      const u = back(seg(t, TL.title + i * 0.12, TL.title + i * 0.12 + 0.4), 1.2);
      x.save(); x.translate(wx + ws[i] / 2, (1 - u) * 40); x.scale(u, u); text(x, w, 0, 0, px, i === 4 ? C.yellow : '#ffffff'); x.restore();
      wx += ws[i] + sp;
    });
    x.restore();
  }
  if (tp > 0.75) header(x, seg(tp, 0.75, 1));
}

function sceneB(x, W, H_, t) {                                    // takeaway, after the planet-sweep wipe
  const em = 1 + 1.3 * (1 - eo(seg(t, TL.sweep[1], TL.sweep[1] + 0.7)));
  sky(x, W, H_, t, { x: 700 + t * 18, y: 80, z: em });
  const sr = 330 * em;
  glow(x, 640, 960, sr * 1.6, '#ffb43a', 0.4);
  ball(x, 640, 960, sr, SUN, { sha: 0.15, rim: '#fff6d0', rima: 0.6 });
  earth(x, 1040, 470 + Math.sin(t * 2) * 6, 22);
  const l1 = back(seg(t, TL.line1, TL.line1 + 0.4)), l2 = back(seg(t, TL.line2, TL.line2 + 0.4));
  x.save(); x.translate(640, 150); x.scale(l1, l1); text(x, '1.3 million Earths', 0, 0, 76, '#ffffff'); x.restore();
  x.save(); x.translate(640, 245); x.scale(l2, l2); text(x, 'fit inside the Sun', 0, 0, 64, C.yellow); x.restore();
  if (t > TL.line2) for (let i = 0; i < 7; i++) { const q = H.rng(400 + i); spark(x, q.range(120, 1160), q.range(60, 340), q.range(8, 15) * (0.5 + 0.5 * Math.sin(t * 3 + i)), '#ffffff', seg(t, TL.line2, TL.line2 + 0.4)); }
  header(x, 1);
}

function explainer(x, W, H_, t) {
  const sw = eio(seg(t, TL.sweep[0], TL.sweep[1])), spx = lerp(W + 980, -980, sw);
  if (t < TL.sweep[0] || spx > 640) sceneA(x, W, H_, t); else sceneB(x, W, H_, t);
  if (sw > 0 && sw < 1) planet(x, spx, 380 + (sw - 0.5) * 120, 880, PL.coral, { glowA: 0.4 }); // foreground planet wipe
}

// ======================================================================================================
// GLUE (do not edit): EngineX seeks the page to each frame and fires hf-seek; every frame is a pure function of t.
// ======================================================================================================
const LW = 1280, LH = 720;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const DPR = window.devicePixelRatio || 1;
cv.width = Math.round(1920 * DPR); cv.height = Math.round(1080 * DPR);
function frame(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.setTransform(cv.width / LW, 0, 0, cv.height / LH, 0, 0);
  explainer(ctx, LW, LH, t);
  finish(ctx, LW, LH, t);
}
const FONT_SPECS = ['900 96px "Nunito"', '800 44px "Nunito"', '700 28px "Nunito"'];
window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
window.__hf.buildReady.fonts = Promise.all(FONT_SPECS.map((f) => document.fonts.load(f, 'AaZz09,%?'))).then(() => frame(0));
window.addEventListener('hf-seek', (e) => frame(e.detail.time));
window.seek = frame; window.DURATION = DURATION;
frame(0);
</script>
</body>
</html>
```

### `references/flat-space.js (style reference source)`

```js
// REFERENCE STYLE SOURCE: styles/flat-space.js (W/H_ are always 1280x720). Extracted verbatim from vectoranimation.md lines 457-1393.
{
  // ---------- Flat-vector science explainer: deep space gradients, chunky shaded balls, crescent shadows, glows ----------
  const TAU = Math.PI * 2;
  const cl = H.clamp, lerp = H.lerp;
  const seg = (t, a, b) => cl((t - a) / (b - a));
  const eo = H.ease.out, eio = H.ease.inOut;
  // gentle overshoot
  const back = (u, s = 1.5) => { if (u <= 0) return 0; if (u >= 1) return 1; return 1 + (s + 1) * Math.pow(u - 1, 3) + s * Math.pow(u - 1, 2); };
  const FONT = '"Nunito", "Fredoka", sans-serif';
  const F = (w, px) => `${w} ${px}px ${FONT}`;

  const C = {
    sky0: '#090b2c', sky1: '#18134f', sky2: '#3a1a6c',
    ink: '#141846', visor: '#10164a',
    teal: ['#a4fbef', '#3ccbdc', '#1d64b0'],
    orange: ['#ffcc7a', '#ff8d3f', '#d24a2a'],
    tan: ['#ffe9be', '#ecb676', '#b4723c'],
    yellow: '#ffd23f', pink: '#ff5d8f', red: '#ff3b5c', green: '#38e08e', cyan: '#56e8ff', violet: '#8b5cff',
  };

  // ---------- timeline of the explainer (shared with explainerSound) ----------
  const TL = {
    title: 0.15, titleShrink: [1.8, 2.4], robotIn: [0.5, 1.4], robotMove: [1.9, 2.8],
    arrow: [2.55, 3.1], count: [2.8, 5.6], travel: 1.5,
    zoom: [4.55, 5.8], sweep: [5.95, 6.85],
    catIn: [6.35, 6.95], guess: 6.95, bubble: 7.15, check: 7.6, wrong: 7.75,
    err: [8.05, 8.6], adjust: 8.6, zoomIn: [8.65, 9.1], rewire: [8.75, 9.35], zoomBack: [9.45, 9.85],
    guess2: 9.6, right: 9.75, toC: [10.3, 10.8], acc: [11.0, 12.55], hit: 12.55,
    take: [13.0, 13.75], line1: 13.3, line2: 13.55, D: 15,
  };
  // creature spawn times on the data stream
  const SPAWN = (() => { const a = []; let s = 2.75, i = 0; while (s < 5.3) { a.push(s); s += Math.max(0.18, 0.38 - i * 0.03); i++; } return a; })();
  const KIND = (i) => ['cat', 'dog', 'cat', 'cat', 'dog', 'dog', 'cat', 'dog'][i % 8];

  // ---------- small helpers ----------
  function rr(x, X, Y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r);
    x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath();
  }
  function glow(x, cx, cy, r, col, a) {
    if (a <= 0 || r <= 0) return;
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, H.rgba(col, a)); g.addColorStop(0.35, H.rgba(col, a * 0.4)); g.addColorStop(1, H.rgba(col, 0));
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill();
  }
  function spark(x, cx, cy, r, col, a) {
    if (a <= 0 || r <= 0) return;
    x.save(); x.globalAlpha *= a; x.fillStyle = col; x.beginPath();
    x.moveTo(cx, cy - r); x.quadraticCurveTo(cx, cy, cx + r, cy); x.quadraticCurveTo(cx, cy, cx, cy + r);
    x.quadraticCurveTo(cx, cy, cx - r, cy); x.quadraticCurveTo(cx, cy, cx, cy - r); x.fill(); x.restore();
  }
  // region of circle (cx,cy,r) NOT covered by the same circle shifted by (dx,dy)
  function crescent(x, cx, cy, r, dx, dy, fill) {
    x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip();
    x.beginPath(); x.rect(cx - r - 2, cy - r - 2, 2 * r + 4, 2 * r + 4); x.arc(cx + dx, cy + dy, r * 1.02, 0, TAU);
    x.fillStyle = fill; x.fill('evenodd'); x.restore();
  }
  // the core flat-vector ball: multi-stop gradient, two stepped flat shadow crescents, rim highlight
  function ball(x, cx, cy, r, col, o = {}) {
    if (r <= 0.3) return;
    const la = o.la == null ? -2.25 : o.la, lx = Math.cos(la), ly = Math.sin(la);
    const g = x.createLinearGradient(cx + lx * r, cy + ly * r, cx - lx * r, cy - ly * r);
    g.addColorStop(0, col[0]); g.addColorStop(0.45, col[1]); g.addColorStop(1, H.rgba(H.mix(col[1], col[2], 0.6)));
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill();
    if (o.inner) { x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip(); o.inner(); x.restore(); }
    const sh = o.sh == null ? 0.3 : o.sh;
    crescent(x, cx, cy, r, lx * r * sh, ly * r * sh, H.rgba(col[2], o.sha == null ? 0.5 : o.sha));
    crescent(x, cx, cy, r, lx * r * sh * 2.2, ly * r * sh * 2.2, H.rgba(col[2], (o.sha == null ? 0.5 : o.sha) * 0.45));
    crescent(x, cx, cy, r, -lx * r * 0.075, -ly * r * 0.075, H.rgba(o.rim || '#ffffff', o.rima == null ? 0.42 : o.rima));
  }
  const bez = (P, u) => { const v = 1 - u; return [v * v * v * P[0][0] + 3 * v * v * u * P[1][0] + 3 * v * u * u * P[2][0] + u * u * u * P[3][0], v * v * v * P[0][1] + 3 * v * v * u * P[1][1] + 3 * v * u * u * P[2][1] + u * u * u * P[3][1]]; };
  // rounded dotted / solid arrow along a cubic, drawn on to `prog`
  function arrow(x, P, prog, col, lw, o = {}) {
    if (prog <= 0) return;
    const n = 48, a = o.a == null ? 1 : o.a;
    x.save(); x.globalAlpha *= a; x.strokeStyle = col; x.fillStyle = col; x.lineWidth = lw; x.lineCap = 'round'; x.lineJoin = 'round';
    if (o.dots) x.setLineDash([0.01, lw * 1.9]);
    x.beginPath(); const p0 = bez(P, o.from || 0); x.moveTo(p0[0], p0[1]);
    for (let i = 1; i <= n; i++) { const u = (o.from || 0) + ((prog - (o.from || 0)) * i) / n; const p = bez(P, u); x.lineTo(p[0], p[1]); }
    x.stroke(); x.setLineDash([]);
    if (o.head !== false && prog > 0.08) {
      const e = bez(P, prog), e0 = bez(P, prog - 0.02), ang = Math.atan2(e[1] - e0[1], e[0] - e0[0]), hs = lw * 1.5 * cl(prog * 5);
      x.translate(e[0], e[1]); x.rotate(ang); x.beginPath(); x.moveTo(hs * 1.1, 0); x.lineTo(-hs * 0.8, hs); x.lineTo(-hs * 0.8, -hs); x.closePath();
      x.lineWidth = lw * 0.7; x.fill(); x.stroke();
    }
    x.restore();
  }
  // flat text with a darker offset "long shadow"
  function text(x, s, cx, cy, px, col, o = {}) {
    x.save(); x.font = F(o.w || 900, px); x.textAlign = o.align || 'center'; x.textBaseline = 'middle';
    x.globalAlpha *= o.a == null ? 1 : o.a;
    x.fillStyle = o.shadow || 'rgba(10,8,46,0.55)'; x.fillText(s, cx + px * 0.03, cy + px * 0.07);
    x.fillStyle = col; x.fillText(s, cx, cy); x.restore();
  }
  // rounded label pill, optional pointer below
  function pill(x, cx, cy, s, px, o = {}) {
    const sc = o.s == null ? 1 : o.s, a = o.a == null ? 1 : o.a;
    if (sc <= 0.01 || a <= 0.01) return;
    x.save(); x.font = F(o.w || 900, px);
    const tw = x.measureText(s).width, w = tw + px * 1.15, h = px * 1.6;
    x.translate(cx, cy); x.scale(sc, sc); x.globalAlpha *= a;
    x.fillStyle = 'rgba(10,8,46,0.4)'; rr(x, -w / 2, -h / 2 + px * 0.2, w, h, h / 2); x.fill();
    x.fillStyle = o.bg || '#ffffff';
    if (o.ptr) { x.beginPath(); x.moveTo(-px * 0.35, h / 2 - 2); x.lineTo(0, h / 2 + px * 0.45); x.lineTo(px * 0.35, h / 2 - 2); x.fill(); }
    rr(x, -w / 2, -h / 2, w, h, h / 2); x.fill();
    x.fillStyle = 'rgba(255,255,255,0.35)'; rr(x, -w / 2 + h * 0.25, -h / 2 + h * 0.12, w - h * 0.5, h * 0.16, h * 0.08); x.fill();
    x.fillStyle = o.fg || C.ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, px * 0.06);
    x.restore();
    return w;
  }

  // ---------- sky: gradient, nebula glows, parallax stars and sparkles ----------
  let STARS = null;
  function stars() {
    if (STARS) return STARS;
    const r = H.rng(77), a = [], sp = [];
    for (let i = 0; i < 620; i++) a.push({ x: r.range(0, 1680), y: r.range(0, 1120), d: r.pick([0.15, 0.3, 0.3, 0.55, 1]), s: r.range(0.6, 2.0), ph: r.range(0, TAU), sp: r.range(0.8, 2.6), c: r.pick(['#ffffff', '#cfe4ff', '#ffe9c7', '#dccbff']) });
    for (let i = 0; i < 16; i++) sp.push({ x: r.range(0, 1680), y: r.range(0, 1120), d: r.range(0.3, 0.9), s: r.range(6, 13), ph: r.range(0, TAU) });
    STARS = { a, sp }; return STARS;
  }
  function sky(x, W, H_, t, cam = {}) {
    const px = cam.x || 0, py = cam.y || 0, lz = Math.log(cam.z || 1);
    const g = x.createLinearGradient(0, 0, W * 0.3, H_);
    g.addColorStop(0, C.sky0); g.addColorStop(0.5, C.sky1); g.addColorStop(1, C.sky2);
    x.fillStyle = g; x.fillRect(0, 0, W, H_);
    glow(x, W * 0.86, H_ * 0.12, 700, '#7b34c6', 0.34);
    glow(x, W * 0.05, H_ * 1.0, 620, '#2448b4', 0.4);
    glow(x, W * 0.45, H_ * 0.6, 520, '#4a2a9c', 0.16);
    const S = stars();
    const place = (s) => {
      const k = Math.exp(lz * s.d * 0.6);
      let sx = (((s.x - px * s.d) % 1680) + 1680) % 1680 - 200, sy = (((s.y - py * s.d) % 1120) + 1120) % 1120 - 200;
      return [(sx - 640) * k + 640, (sy - 360) * k + 360];
    };
    for (const s of S.a) {
      const [sx, sy] = place(s);
      if (sx < -4 || sx > W + 4 || sy < -4 || sy > H_ + 4) continue;
      x.globalAlpha = (0.55 + 0.45 * Math.sin(t * s.sp + s.ph)) * (0.45 + s.d * 0.55);
      x.fillStyle = s.c; x.beginPath(); x.arc(sx, sy, s.s * (0.7 + 0.35 * s.d), 0, TAU); x.fill();
    }
    x.globalAlpha = 1;
    for (const s of S.sp) {
      const [sx, sy] = place(s); const tw = 0.6 + 0.4 * Math.sin(t * 1.7 + s.ph);
      glow(x, sx, sy, s.s * 2.2, '#bfa8ff', 0.25 * tw);
      spark(x, sx, sy, s.s * tw, '#ffffff', 0.9);
    }
  }

  // ---------- planets ----------
  function ring(x, cx, cy, R, half, a = 1) {
    if (a <= 0) return;
    x.save(); x.translate(cx, cy); x.rotate(R.tilt); x.globalAlpha *= a;
    // clip to the back or front half, wide enough for the outermost band so the ring ends are never cut off
    const m = Math.max(...R.bands.map((b) => b[1])) * 1.05;
    x.beginPath(); if (half === 'back') x.rect(-R.rx * m, -R.ry * m, R.rx * m * 2, R.ry * m); else x.rect(-R.rx * m, 0, R.rx * m * 2, R.ry * m); x.clip();
    for (const [f0, f1, col, al] of R.bands) {
      x.beginPath(); x.ellipse(0, 0, R.rx * f1, R.ry * f1, 0, 0, TAU); x.ellipse(0, 0, R.rx * f0, R.ry * f0, 0, 0, TAU);
      x.fillStyle = H.rgba(col, (al == null ? 1 : al) * (half === 'back' ? 0.75 : 1)); x.fill('evenodd');
    }
    x.restore();
  }
  function bands(x, r, B, tilt) {
    x.save(); x.rotate(tilt || 0);
    for (const [v0, v1, col, a] of B) {
      x.beginPath();
      for (let i = 0; i <= 20; i++) { const u = (i / 20) * 2 - 1; x.lineTo(u * r * 1.1, (v0 + 0.13 * (1 - u * u)) * r); }
      for (let i = 20; i >= 0; i--) { const u = (i / 20) * 2 - 1; x.lineTo(u * r * 1.1, (v1 + 0.13 * (1 - u * u)) * r); }
      x.fillStyle = H.rgba(col, a == null ? 1 : a); x.fill();
    }
    x.restore();
  }
  const PL = {
    magenta: { c: ['#ffa0c4', '#de4b93', '#4e1670'], glow: '#ff5fa8', tilt: -0.18, atmo: [255, 214, 234],
      bands: [[-0.62, -0.48, '#ffc1d8', 0.55], [-0.2, -0.02, '#b5307e', 0.6], [0.06, 0.14, '#ffd0e2', 0.4], [0.36, 0.58, '#9a2775', 0.55]],
      ring: { rx: 1.75, ry: 0.5, tilt: -0.2, bands: [[1.18, 1.32, '#ffd27a', 0.95], [1.34, 1.5, '#ff9f5a', 0.9], [1.53, 1.6, '#ffe7b0', 0.8]] } },
    coral: { c: ['#ffd29a', '#ff7a4a', '#7a1f4f'], glow: '#ff8a50', tilt: 0.1, atmo: [255, 226, 190],
      bands: [[-0.7, -0.5, '#ffe2b8', 0.5], [-0.32, -0.12, '#e8553a', 0.6], [0.05, 0.22, '#ffb27a', 0.5], [0.4, 0.62, '#c43c46', 0.55]] },
    teal: { c: ['#9ff3ff', '#3a9be0', '#1d2f86'], glow: '#4fc9ff', tilt: -0.12, atmo: [190, 245, 255],
      bands: [[-0.5, -0.36, '#c6f8ff', 0.5], [-0.05, 0.1, '#2f74c9', 0.55], [0.32, 0.5, '#7fdcff', 0.4]] },
    moon: { c: ['#e8e6ff', '#a7a2d8', '#4a3f8c'], craters: true },
  };
  function planet(x, cx, cy, r, pal, o = {}) {
    if (r <= 0.5) return;
    const ra = o.ringA == null ? 1 : o.ringA;
    if (pal.glow) glow(x, cx, cy, r * 1.7, pal.glow, o.glowA == null ? 0.32 : o.glowA);
    const R = pal.ring && { rx: pal.ring.rx * r, ry: pal.ring.ry * r, tilt: pal.ring.tilt, bands: pal.ring.bands };
    if (R) ring(x, cx, cy, R, 'back', ra);
    if (o.behind) o.behind(R);
    ball(x, cx, cy, r, pal.c, {
      sh: 0.34, sha: 0.55, rima: 0.35,
      inner: () => {
        x.save(); x.translate(cx, cy);
        if (pal.bands) bands(x, r, pal.bands, pal.tilt);
        if (pal.craters) { const q = H.rng(5); for (let i = 0; i < 5; i++) { const a = q.range(0, TAU), d = q.range(0.1, 0.65) * r, cr = q.range(0.1, 0.2) * r, qx = Math.cos(a) * d, qy = Math.sin(a) * d; x.fillStyle = 'rgba(80,66,150,0.38)'; x.beginPath(); x.arc(qx, qy, cr, 0, TAU); x.fill(); crescent(x, qx, qy, cr, -cr * 0.3, -cr * 0.3, 'rgba(255,255,255,0.3)'); } }
        x.restore();
      },
    });
    const atA = o.atmo == null ? 0.7 : o.atmo;
    if (pal.atmo && atA > 0) { // thin bright atmosphere on the limb, strongest on the lit (upper-left) side
      x.save(); x.lineCap = 'round'; const ga0 = x.globalAlpha;
      const la = -2.25, ag = x.createLinearGradient(cx + Math.cos(la) * r, cy + Math.sin(la) * r, cx - Math.cos(la) * r, cy - Math.sin(la) * r);
      ag.addColorStop(0, H.rgba(pal.atmo, 1)); ag.addColorStop(0.55, H.rgba(pal.atmo, 0.5)); ag.addColorStop(1, H.rgba(pal.atmo, 0.08));
      x.strokeStyle = ag;
      for (const [lw, a] of [[r * 0.05, 0.08], [r * 0.028, 0.16], [r * 0.014, 0.3], [Math.max(2, r * 0.006), 0.6]]) { x.globalAlpha = ga0 * a * atA; x.lineWidth = lw; x.beginPath(); x.arc(cx, cy, r + lw * 0.15, 0, TAU); x.stroke(); }
      x.restore();
    }
    if (R) ring(x, cx, cy, R, 'front', ra);
    if (o.front) o.front(R);
  }

  // ---------- print finish: fine animated grain + soft static mottling (overlay), kills gradient banding ----------
  let GRAIN = null;
  function grainTex() {
    if (GRAIN) return GRAIN;
    const S = 256, tile = H.layer(S, S), tc = tile.getContext('2d'), img = tc.createImageData(S, S), d = img.data, r = H.rng(4242);
    for (let i = 0; i < d.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 92; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    tc.putImageData(img, 0, 0);
    const MW = 320, MH = 180, mot = H.layer(MW, MH), mc = mot.getContext('2d'), mi = mc.createImageData(MW, MH), md = mi.data, nz = H.makeNoise(88);
    for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) { const v = 128 + nz.fbm2(x * 0.035, y * 0.035, 4) * 70 + nz.n2(x * 0.22, y * 0.22) * 14, k = (y * MW + x) * 4; md[k] = md[k + 1] = md[k + 2] = v; md[k + 3] = 255; }
    mc.putImageData(mi, 0, 0);
    GRAIN = { tile, mot };
    return GRAIN;
  }
  function finish(x, W, H_, t) {
    const G = grainTex(), f = Math.floor(t * 24);
    x.save(); x.globalCompositeOperation = 'overlay';
    x.globalAlpha = 0.12; x.imageSmoothingEnabled = true; x.drawImage(G.mot, 0, 0, W, H_);
    const pat = x.createPattern(G.tile, 'repeat'); pat.setTransform(new DOMMatrix().translateSelf((f * 73) % 256, (f * 151) % 256));
    x.globalAlpha = 0.09; x.fillStyle = pat; x.fillRect(0, 0, W, H_);
    x.restore();
  }

  // ---------- eyes (big white, dark pupils) ----------
  function eye(x, ex, ey, er, o) {
    const look = o.look || [0, 0];
    if ((o.happy || 0) > 0.5) {
      x.save(); x.strokeStyle = '#ffffff'; x.lineWidth = er * 0.42; x.lineCap = 'round';
      x.beginPath(); x.arc(ex, ey + er * 0.35, er * 0.62, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); x.restore(); return;
    }
    const bl = 1 - 0.92 * (o.blink || 0);
    x.save(); x.translate(ex, ey); x.scale(1, bl);
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(0, 0, er, 0, TAU); x.fill();
    const pr = er * (o.worry ? 0.5 : 0.56);
    const px = look[0] * er * 0.36, py = look[1] * er * 0.36;
    x.fillStyle = '#141638'; x.beginPath(); x.arc(px, py, pr, 0, TAU); x.fill();
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(px - pr * 0.35, py - pr * 0.4, pr * 0.32, 0, TAU); x.fill();
    x.beginPath(); x.arc(px + pr * 0.35, py + pr * 0.35, pr * 0.13, 0, TAU); x.fill();
    x.restore();
  }
  const blinkAt = (t, ph) => { const u = (t + ph) % 3.3; return u < 0.14 ? Math.sin((u / 0.14) * Math.PI) : 0; };

  // ---------- the AI: a chunky round robot with a glass brain dome ----------
  const NET = (() => {
    const r = H.rng(31), L = [[-0.6, [-0.42, 0.02, 0.44]], [0, [-0.58, -0.2, 0.2, 0.58]], [0.6, [-0.4, 0.04, 0.44]]];
    const nodes = []; L.forEach(([lx, ys], li) => ys.forEach((y) => nodes.push({ x: lx, y: y - 0.05, l: li })));
    const byL = (l) => nodes.map((n, i) => [n, i]).filter(([n]) => n.l === l).map(([, i]) => i);
    const edges = [];
    const l0 = byL(0), l1 = byL(1), l2 = byL(2);
    l0.forEach((a, k) => { const tA = [l1[k], l1[k + 1]], tB = [l1[(k + 2) % 4], l1[k + 1]]; tA.forEach((b, j) => edges.push({ a, b, b2: tB[j], w: r.range(0.2, 0.5), w2: r.range(0.6, 1) })); });
    l1.forEach((a, k) => { const tA = [l2[k % 3], l2[(k + 1) % 3]], tB = [l2[(k + 2) % 3], l2[(k + 1) % 3]]; tA.forEach((b, j) => edges.push({ a, b, b2: tB[j], w: r.range(0.2, 0.5), w2: r.range(0.6, 1) })); });
    return { nodes, edges };
  })();
  function network(x, cx, cy, dr, o) {
    const rw = o.rewire || 0, br = o.bright == null ? 0.5 : o.bright, err = o.err || 0, t = o.t || 0, s = dr * 0.82;
    const P = (i) => [cx + NET.nodes[i].x * s, cy + NET.nodes[i].y * s];
    x.save(); x.lineCap = 'round';
    NET.edges.forEach((e, k) => {
      const a = P(e.a), b0 = P(e.b), b1 = P(e.b2), m = eio(cl(rw * 1.25 - (k % 6) * 0.05));
      const b = [lerp(b0[0], b1[0], m), lerp(b0[1], b1[1], m)], w = lerp(e.w, e.w2, m);
      const col = H.mix(H.mix('#7a5cff', '#ffd23f', w * (0.4 + br * 0.6)), '#ff3b5c', err);
      x.strokeStyle = H.rgba(col, 0.55 + 0.45 * w); x.lineWidth = dr * (0.025 + 0.05 * w);
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - dr * 0.08;
      x.beginPath(); x.moveTo(a[0], a[1]); x.quadraticCurveTo(mx, my, b[0], b[1]); x.stroke();
      // a little signal dot running along
      const u = (t * 0.9 + k * 0.137) % 1, v = 1 - u;
      const qx = v * v * a[0] + 2 * v * u * mx + u * u * b[0], qy = v * v * a[1] + 2 * v * u * my + u * u * b[1];
      x.fillStyle = H.rgba(err > 0.3 ? '#ffb0bf' : '#fff6c8', 0.8 * (0.4 + br * 0.6)); x.beginPath(); x.arc(qx, qy, dr * 0.035, 0, TAU); x.fill();
    });
    NET.nodes.forEach((n, i) => {
      const [nx, ny] = P(i), pulse = 0.5 + 0.5 * Math.sin(t * 3 + i * 1.3);
      const col = H.mix(H.mix('#9b7bff', '#ffe066', br), '#ff4a66', err);
      glow(x, nx, ny, dr * (0.2 + 0.22 * br), col, 0.35 + 0.4 * br);
      x.fillStyle = H.rgba(col); x.beginPath(); x.arc(nx, ny, dr * (0.085 + 0.03 * br), 0, TAU); x.fill();
      x.fillStyle = 'rgba(255,255,255,0.75)'; x.beginPath(); x.arc(nx - dr * 0.025, ny - dr * 0.025, dr * 0.035, 0, TAU); x.fill();
    });
    x.restore();
  }
  function robot(x, cx, cy, R, o = {}) {
    if (R < 1) return;
    const t = o.t || 0, red = o.red || 0, happy = o.happy || 0, worry = o.worry || 0;
    if (red > 0) glow(x, cx, cy - R * 0.4, R * 2.2, '#ff3b5c', 0.5 * red);
    // thruster flame
    const fl = 1 + 0.14 * Math.sin(t * 29) + 0.08 * Math.sin(t * 13.7);
    glow(x, cx, cy + R * 1.25, R * 0.95, '#ff9a3d', 0.4);
    x.fillStyle = '#ff8a3d'; x.beginPath(); x.moveTo(cx - R * 0.25, cy + R * 0.9);
    x.quadraticCurveTo(cx - R * 0.2, cy + R * (1.25 + 0.2 * fl), cx, cy + R * (1.35 + 0.42 * fl)); x.quadraticCurveTo(cx + R * 0.2, cy + R * (1.25 + 0.2 * fl), cx + R * 0.25, cy + R * 0.9); x.fill();
    x.fillStyle = '#ffd94a'; x.beginPath(); x.moveTo(cx - R * 0.13, cy + R * 0.92);
    x.quadraticCurveTo(cx - R * 0.1, cy + R * (1.15 + 0.1 * fl), cx, cy + R * (1.2 + 0.22 * fl)); x.quadraticCurveTo(cx + R * 0.1, cy + R * (1.15 + 0.1 * fl), cx + R * 0.13, cy + R * 0.92); x.fill();
    x.fillStyle = '#16307a'; rr(x, cx - R * 0.32, cy + R * 0.78, R * 0.64, R * 0.22, R * 0.08); x.fill();
    // arms
    for (const sd of [-1, 1]) {
      const up = (o.armUp || 0) * (sd > 0 ? 1 : 0.6), ang = sd * (0.55 + 0.12 * Math.sin(t * 2.2 + sd)) - sd * up * 1.6;
      const sx = cx + sd * R * 0.86, sy = cy + R * 0.12, ex = sx + Math.sin(ang) * R * 0.55, ey = sy + Math.cos(ang) * R * 0.55;
      x.strokeStyle = '#1d5aa6'; x.lineWidth = R * 0.24; x.lineCap = 'round'; x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex, ey); x.stroke();
      ball(x, ex, ey, R * 0.17, C.teal, { sha: 0.4 });
    }
    // brain dome (glass) with the glowing network inside
    const dr = R * 0.76, dx = cx, dy = cy - R * 1.02;
    glow(x, dx, dy, dr * 2.0, red > 0.2 ? '#ff3b5c' : '#58e6ff', 0.22 + 0.25 * (o.brainGlow || 0) + 0.2 * red);
    x.save(); x.beginPath(); x.arc(dx, dy, dr, 0, TAU); x.clip();
    const dg = x.createRadialGradient(dx - dr * 0.3, dy - dr * 0.3, 0, dx, dy, dr * 1.1);
    dg.addColorStop(0, '#2a3a9c'); dg.addColorStop(0.6, '#18206a'); dg.addColorStop(1, '#0d1146');
    x.fillStyle = dg; x.fillRect(dx - dr, dy - dr, dr * 2, dr * 2);
    if (red > 0) { x.fillStyle = H.rgba('#ff3b5c', 0.3 * red); x.fillRect(dx - dr, dy - dr, dr * 2, dr * 2); }
    network(x, dx, dy - dr * 0.12, dr * 0.92, o);
    x.restore();
    crescent(x, dx, dy, dr, dr * 0.1, dr * 0.12, 'rgba(190,250,255,0.55)');
    crescent(x, dx, dy, dr, -dr * 0.22, -dr * 0.2, 'rgba(8,10,50,0.28)');
    x.save(); x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = dr * 0.09; x.lineCap = 'round';
    x.beginPath(); x.arc(dx, dy, dr * 0.74, Math.PI * 1.08, Math.PI * 1.36); x.stroke();
    x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.arc(dx + dr * 0.74 * Math.cos(Math.PI * 1.5), dy - dr * 0.74, dr * 0.05, 0, TAU); x.fill(); x.restore();
    // collar
    x.fillStyle = '#1b4c9c'; rr(x, cx - R * 0.6, cy - R * 0.84, R * 1.2, R * 0.26, R * 0.13); x.fill();
    x.fillStyle = 'rgba(160,240,255,0.5)'; rr(x, cx - R * 0.5, cy - R * 0.81, R * 0.7, R * 0.06, R * 0.03); x.fill();
    // body
    ball(x, cx, cy, R, C.teal, { sha: 0.5 });
    // visor face
    const vw = R * 1.36, vh = R * 0.78, vx = cx - vw / 2 + R * 0.02, vy = cy - R * 0.42;
    x.fillStyle = '#0c1145'; rr(x, vx, vy + R * 0.05, vw, vh, R * 0.34); x.fill();
    const vg = x.createLinearGradient(vx, vy, vx + vw, vy + vh); vg.addColorStop(0, '#26338e'); vg.addColorStop(0.5, '#151c5c'); vg.addColorStop(1, '#0d1246');
    x.fillStyle = vg; rr(x, vx, vy, vw, vh, R * 0.34); x.fill();
    x.fillStyle = 'rgba(160,240,255,0.22)'; rr(x, vx + R * 0.16, vy + R * 0.07, vw * 0.45, R * 0.07, R * 0.035); x.fill();
    const ey = vy + vh * 0.48, er = R * 0.19, look = o.look || [0, 0];
    for (const sd of [-1, 1]) eye(x, cx + sd * R * 0.3, ey, er, { look, blink: o.blink, happy, worry: worry > 0.5 });
    // brows when worried
    if (worry > 0.02) {
      x.save(); x.globalAlpha *= cl(worry * 2); x.strokeStyle = '#9ff7ff'; x.lineWidth = R * 0.065; x.lineCap = 'round';
      for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(cx + sd * R * 0.46, ey - er * 1.05); x.lineTo(cx + sd * R * 0.16, ey - er * 1.5); x.stroke(); }
      x.restore();
    }
    // mouth
    x.save(); x.strokeStyle = '#9ff7ff'; x.lineWidth = R * 0.06; x.lineCap = 'round'; x.beginPath();
    const my = vy + vh * 0.86;
    if (worry > 0.5) { x.moveTo(cx - R * 0.12, my); x.quadraticCurveTo(cx - R * 0.06, my - R * 0.06, cx, my); x.quadraticCurveTo(cx + R * 0.06, my + R * 0.06, cx + R * 0.12, my); }
    else if (happy > 0.5) { x.arc(cx, my - R * 0.06, R * 0.12, 0.15 * Math.PI, 0.85 * Math.PI); }
    else { x.arc(cx, my - R * 0.1, R * 0.1, 0.3 * Math.PI, 0.7 * Math.PI); }
    x.stroke(); x.restore();
    // belly lights
    ['#ffd23f', '#ff5d8f', '#56e8ff'].forEach((c, i) => { const bx = cx + (i - 1) * R * 0.2, by = cy + R * 0.58; glow(x, bx, by, R * 0.12, c, 0.5); x.fillStyle = c; x.beginPath(); x.arc(bx, by, R * 0.055, 0, TAU); x.fill(); });
    // sweat drop
    if (worry > 0.3) {
      const sx = cx + R * 0.82, sy = cy - R * 0.38 + (t * 40 % (R * 0.3));
      x.save(); x.globalAlpha *= cl((worry - 0.3) * 3); x.fillStyle = '#7fe6ff';
      x.beginPath(); x.moveTo(sx, sy - R * 0.16); x.quadraticCurveTo(sx + R * 0.09, sy, sx, sy + R * 0.06); x.quadraticCurveTo(sx - R * 0.09, sy, sx, sy - R * 0.16); x.fill(); x.restore();
    }
  }

  // ---------- creatures: little cat and dog (training data) ----------
  function cat(x, cx, cy, r, o = {}) {
    if (r < 1) return;
    const t = o.t || 0;
    x.save(); x.translate(cx, cy); x.rotate(o.rot || 0);
    x.strokeStyle = C.orange[2]; x.lineWidth = r * 0.24; x.lineCap = 'round';
    x.beginPath(); x.moveTo(r * 0.6, r * 0.55); x.quadraticCurveTo(r * 1.4, r * 0.55 + Math.sin(t * 3) * r * 0.12, r * 1.18, -r * 0.2); x.stroke();
    for (const sd of [-1, 1]) {
      x.fillStyle = sd < 0 ? C.orange[1] : '#e8693a'; x.strokeStyle = x.fillStyle; x.lineWidth = r * 0.16; x.lineJoin = 'round';
      x.beginPath(); x.moveTo(sd * r * 0.82, -r * 0.3); x.lineTo(sd * r * 0.66, -r * 1.08); x.lineTo(sd * r * 0.14, -r * 0.8); x.closePath(); x.fill(); x.stroke();
      x.fillStyle = '#ff9fb4'; x.beginPath(); x.moveTo(sd * r * 0.66, -r * 0.48); x.lineTo(sd * r * 0.62, -r * 0.9); x.lineTo(sd * r * 0.32, -r * 0.74); x.closePath(); x.fill();
    }
    ball(x, 0, 0, r, C.orange, { sha: 0.45, inner: () => {
      x.fillStyle = 'rgba(200,70,40,0.55)';
      for (const k of [-1, 0, 1]) { rr(x, k * r * 0.17 - r * 0.045, -r * 0.92, r * 0.09, r * 0.3, r * 0.045); x.fill(); }
      x.fillStyle = 'rgba(255,240,220,0.9)'; x.beginPath(); x.ellipse(0, r * 0.42, r * 0.42, r * 0.3, 0, 0, TAU); x.fill();
    } });
    for (const sd of [-1, 1]) eye(x, sd * r * 0.36, -r * 0.08, r * 0.25, { look: o.look, blink: o.blink, happy: o.happy });
    x.fillStyle = '#ff6f8e'; x.beginPath(); x.moveTo(-r * 0.09, r * 0.22); x.lineTo(r * 0.09, r * 0.22); x.lineTo(0, r * 0.33); x.closePath(); x.fill();
    x.strokeStyle = '#7a2e2e'; x.lineWidth = r * 0.05; x.lineCap = 'round'; x.beginPath();
    x.arc(-r * 0.08, r * 0.36, r * 0.08, 0.1 * Math.PI, 0.9 * Math.PI); x.moveTo(r * 0.16, r * 0.36 + r * 0.025); x.arc(r * 0.08, r * 0.36, r * 0.08, 0.1 * Math.PI, 0.9 * Math.PI); x.stroke();
    x.restore();
  }
  function dog(x, cx, cy, r, o = {}) {
    if (r < 1) return;
    const t = o.t || 0;
    x.save(); x.translate(cx, cy); x.rotate(o.rot || 0);
    ball(x, 0, 0, r, C.tan, { sha: 0.45, inner: () => {
      x.fillStyle = 'rgba(150,85,40,0.55)'; x.beginPath(); x.arc(r * 0.38, -r * 0.2, r * 0.36, 0, TAU); x.fill();
      x.fillStyle = '#fff3dc'; x.beginPath(); x.ellipse(0, r * 0.36, r * 0.4, r * 0.3, 0, 0, TAU); x.fill();
    } });
    for (const sd of [-1, 1]) {
      x.save(); x.translate(sd * r * 0.86, -r * 0.18); x.rotate(sd * (0.35 + 0.08 * Math.sin(t * 4 + sd)));
      x.fillStyle = '#8b4f2c'; x.beginPath(); x.ellipse(0, r * 0.18, r * 0.27, r * 0.55, 0, 0, TAU); x.fill();
      x.fillStyle = 'rgba(255,200,150,0.25)'; x.beginPath(); x.ellipse(-sd * r * 0.06, r * 0.05, r * 0.1, r * 0.3, 0, 0, TAU); x.fill();
      x.restore();
    }
    for (const sd of [-1, 1]) eye(x, sd * r * 0.34, -r * 0.12, r * 0.23, { look: o.look, blink: o.blink, happy: o.happy });
    x.fillStyle = '#2a1a2a'; x.beginPath(); x.ellipse(0, r * 0.22, r * 0.13, r * 0.09, 0, 0, TAU); x.fill();
    x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.arc(-r * 0.04, r * 0.19, r * 0.03, 0, TAU); x.fill();
    x.fillStyle = '#ff6f8e'; rr(x, -r * 0.08, r * 0.38, r * 0.16, r * 0.17, r * 0.08); x.fill();
    x.restore();
  }
  const creature = (x, kind, cx, cy, r, o) => (kind === 'cat' ? cat : dog)(x, cx, cy, r, o);

  // speech bubble with a tail
  function bubble(x, cx, cy, w, h, tx, ty, s, col) {
    if (s <= 0.01) return;
    x.save(); x.translate(cx, cy); x.scale(s, s);
    x.fillStyle = 'rgba(10,8,46,0.4)'; rr(x, -w / 2, -h / 2 + 8, w, h, h / 2); x.fill();
    x.fillStyle = col || '#ffffff';
    x.beginPath(); x.moveTo(-w * 0.18, h * 0.3); x.lineTo((tx - cx) / s, (ty - cy) / s); x.lineTo(-w * 0.02, h * 0.42); x.fill();
    rr(x, -w / 2, -h / 2, w, h, h / 2); x.fill();
    x.restore();
  }
  function badge(x, cx, cy, r, ok, s) {
    if (s <= 0.01) return;
    x.save(); x.translate(cx, cy); x.scale(s, s);
    glow(x, 0, 0, r * 2.4, ok ? C.green : C.red, 0.45);
    ball(x, 0, 0, r, ok ? ['#9fffc8', C.green, '#178a5a'] : ['#ff9aa8', C.red, '#9c1638'], { sha: 0.4 });
    x.strokeStyle = '#ffffff'; x.lineWidth = r * 0.26; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath();
    if (ok) { x.moveTo(-r * 0.42, 0); x.lineTo(-r * 0.1, r * 0.32); x.lineTo(r * 0.45, -r * 0.3); }
    else { x.moveTo(-r * 0.34, -r * 0.34); x.lineTo(r * 0.34, r * 0.34); x.moveTo(r * 0.34, -r * 0.34); x.lineTo(-r * 0.34, r * 0.34); }
    x.stroke(); x.restore();
  }
  function flare(x, cx, cy, k, t, seed) {
    if (k <= 0) return;
    glow(x, cx, cy, 420 * (0.6 + 0.4 * k), '#ffcf5a', 0.55 * k);
    glow(x, cx, cy, 160, '#fff6d0', 0.6 * k);
    x.save(); x.translate(cx, cy); x.rotate(t * 0.25); x.globalAlpha *= 0.32 * k; x.fillStyle = '#ffe28a';
    for (let i = 0; i < 12; i++) { x.rotate(TAU / 12); x.beginPath(); x.moveTo(0, -12); x.lineTo(330 + 60 * (i % 2), 0); x.lineTo(0, 12); x.fill(); }
    x.restore();
  }
  function burst(x, cx, cy, age, seed, spread) {
    if (age < 0 || age > 1.4) return;
    const r = H.rng(seed);
    for (let i = 0; i < 18; i++) {
      const a = r.range(0, TAU), d = (spread || 300) * r.range(0.45, 1) * eo(cl(age / 0.9)), sz = r.range(7, 16) * (1 - cl(age / 1.4));
      spark(x, cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.8, sz, r.pick(['#ffffff', '#ffe28a', '#9ff7ff', '#ffb0d0']), 1);
    }
  }

  // ---------- galaxy of examples (precomputed) ----------
  let GAL = null;
  function galaxyPts() {
    if (GAL) return GAL;
    const r = H.rng(901); GAL = [];
    for (let i = 0; i < 2600; i++) {
      const arm = i % 3, u = Math.pow(r(), 0.85), rr2 = 260 + 5300 * u;
      const ang = arm * (TAU / 3) + rr2 * 0.00075 + r.gauss() * (0.16 + 0.25 * (1 - u));
      GAL.push({ rr: rr2 * (1 + r.gauss() * 0.04), a: ang, s: r.range(1.2, 3.2), c: r.pick(['#ff9a4a', '#ffcc7a', '#ecb676', '#ffffff', '#9ff7ff', '#ff8fb8']) });
    }
    return GAL;
  }
  function galaxy(x, cx, cy, s, rot, a) {
    if (a <= 0.01) return;
    glow(x, cx, cy, 5600 * s * 0.55, '#8a5cff', 0.35 * a);
    glow(x, cx, cy, 5600 * s * 0.22, '#ffcf7a', 0.4 * a);
    x.save(); x.globalAlpha = a;
    for (const p of galaxyPts()) {
      const ang = p.a + rot, d = p.rr * s;
      if (d < 14) continue;
      const px = cx + Math.cos(ang) * d, py = cy + Math.sin(ang) * d * 0.52;
      if (px < -5 || px > 1285 || py < -5 || py > 725) continue;
      x.fillStyle = p.c; x.beginPath(); x.arc(px, py, p.s, 0, TAU); x.fill();
    }
    x.restore();
  }

  // ---------- header pill ----------
  function header(x, a) { pill(x, 186, 44, 'How does AI learn?', 28, { a, bg: 'rgba(255,255,255,0.95)' }); }

  // ================= EXPLAINER SCENES =================
  const ROBOT_A0 = [640, 470], ROBOT_A1 = [930, 400];
  const DOME_A1 = [ROBOT_A1[0], ROBOT_A1[1] - 1.02 * 100];
  const STREAM = [[-140, 230], [330, 720], [560, 60], [DOME_A1[0] - 40, DOME_A1[1] - 10]];

  function exA(x, W, H_, t) {
    const zo = eio(seg(t, TL.zoom[0], TL.zoom[1]));
    const s = Math.exp(lerp(0, Math.log(0.062), zo));
    const mv = eio(seg(t, TL.robotMove[0], TL.robotMove[1]));
    const RW = [lerp(ROBOT_A0[0], ROBOT_A1[0], mv), lerp(ROBOT_A0[1], ROBOT_A1[1], mv)];
    const Cs = [lerp(RW[0], 680, zo), lerp(RW[1], 330, zo)];
    const toS = (wx, wy) => [Cs[0] + (wx - RW[0]) * s, Cs[1] + (wy - RW[1]) * s];
    const pull = 1 + 1.8 * (1 - eo(seg(t, 0, 1.4)));
    sky(x, W, H_, t, { z: pull * Math.pow(s, 0.35), x: t * 14 + mv * 60, y: 0 });

    // background planet (mid distance, drifts)
    const bp = toS(1170 - t * 6, 690); planet(x, bp[0], bp[1], 165 * s * (0.9 + 0.1 * eo(seg(t, 0, 1.4))), PL.magenta, { glowA: 0.28 });
    const mp = toS(1110 - t * 4, 140); planet(x, mp[0], mp[1], 34 * s, PL.moon);

    // galaxy of examples
    const ga = cl((0.75 - s) / 0.5);
    galaxy(x, Cs[0], Cs[1], s, -0.5 + t * 0.22, ga);

    // stream arrow
    const ap = eio(seg(t, TL.arrow[0], TL.arrow[1]));
    const SP = STREAM.map(([a, b]) => toS(a, b));
    arrow(x, SP, ap, '#7ff0ff', Math.max(1.5, 9 * s), { dots: true, a: 0.75 * (1 - ga) });

    // creatures flowing in along the stream
    let absorb = 0;
    SPAWN.forEach((ts, i) => {
      const u = (t - ts) / TL.travel;
      if (u > 0.98 && u < 1.25) absorb = Math.max(absorb, 1 - (u - 0.98) / 0.27);
      if (u <= 0 || u >= 1) return;
      const uu = 0.2 * eio(u) + 0.8 * u, p = bez(SP, uu), kind = KIND(i);
      const bob = Math.sin(t * 3 + i) * 8 * s;
      const r = 50 * s * back(cl(u / 0.12)) * (1 - 0.85 * H.smooth(0.82, 1, u));
      creature(x, kind, p[0], p[1] + bob, r, { t: t + i, rot: Math.sin(t * 2 + i) * 0.12, look: [0.6, -0.2], blink: blinkAt(t, i * 0.7) });
      if (s > 0.45) pill(x, p[0], p[1] + bob - r - 34 * s, kind, 26, { s: back(cl((u - 0.05) / 0.12)) * s, a: 1 - H.smooth(0.72, 0.86, u), ptr: true });
    });

    // the robot (the model)
    const rin = back(seg(t, TL.robotIn[0], TL.robotIn[1]), 1.2);
    const R = 100 * (0.88 + 0.12 * mv) * s * rin;
    const rp = toS(RW[0], RW[1] + Math.sin(t * 1.8) * 9);
    const lookA = t < 2.6 ? [0, -0.2] : [-0.7, -0.4];
    robot(x, rp[0], rp[1], R, { t, look: lookA, blink: blinkAt(t, 0.3), bright: 0.35 + 0.4 * absorb + 0.3 * seg(t, 2.8, 5.6), brainGlow: absorb, rewire: 0 });
    if (absorb > 0 && s > 0.3) burst(x, rp[0] - 10 * s, rp[1] - 120 * s, 1 - absorb, Math.floor(t * 4), 70 * s);
    if (ga > 0.3) { glow(x, rp[0], rp[1], 120, '#fff2c0', 0.5 * ga); spark(x, rp[0], rp[1], 26 * ga, '#ffffff', ga); }
    // "?" thought in the hook
    const qa = seg(t, 1.25, 1.45) * (1 - seg(t, 2.2, 2.4));
    if (qa > 0) { const qs = back(seg(t, 1.25, 1.55)); x.save(); x.globalAlpha = qa; ball(x, rp[0] + R * 1.05, rp[1] - R * 1.75, 34 * qs, ['#ffffff', '#e8e4ff', '#9a8fe0'], { sha: 0.3 }); text(x, '?', rp[0] + R * 1.05, rp[1] - R * 1.75, 46 * qs, C.violet, { shadow: 'rgba(0,0,0,0)' }); x.restore(); }
    // "AI model" label lands under the robot
    const la = back(seg(t, 2.95, 3.3));
    pill(x, rp[0], rp[1] + Math.max(R * 1.95, 42), 'AI model', 28, { s: la, bg: C.yellow });
    // "1 dot = 1 example" label in the galaxy
    pill(x, 1010, 560, '1 dot = 1 example', 26, { s: back(seg(t, 5.15, 5.45)), bg: '#ffffff' });

    // counter
    if (t > TL.count[0] - 0.3) {
      const ca = seg(t, TL.count[0] - 0.3, TL.count[0]);
      const v = Math.round(1e6 * Math.pow(seg(t, TL.count[0], TL.count[1]), 2.3));
      const land = seg(t, TL.count[1], TL.count[1] + 0.35), pop = 1 + 0.2 * Math.sin(land * Math.PI) * (land > 0 ? 1 : 0);
      x.save(); x.translate(64, 650); x.scale(pop, pop); x.globalAlpha = ca;
      x.font = F(900, 78); const nw = x.measureText(v.toLocaleString('en-US')).width;
      text(x, v.toLocaleString('en-US'), 0, 0, 78, land > 0 ? C.yellow : '#ffffff', { align: 'left' });
      text(x, 'examples', nw + 18, 8, 38, '#bfe9ff', { align: 'left', w: 800 });
      x.restore();
      if (land > 0) burst(x, 220, 640, land * 1.2, 77, 200);
    }

    // title (hook) and its shrink into the header
    const tp = eio(seg(t, TL.titleShrink[0], TL.titleShrink[1]));
    if (tp < 1) {
      const words = ['How', 'does', 'AI', 'learn?'], px = 84; x.font = F(900, px);
      const sp = x.measureText(' ').width, ws = words.map((w) => x.measureText(w).width), tot = ws.reduce((a, b) => a + b, 0) + sp * 3;
      const hx = 186, hy = 44, hs = 28 / px;
      const cx = lerp(640, hx, tp), cy = lerp(215, hy, tp), sc = lerp(1, hs, tp);
      x.save(); x.translate(cx, cy); x.scale(sc, sc);
      let wx = -tot / 2;
      words.forEach((w, i) => {
        const u = back(seg(t, TL.title + i * 0.13, TL.title + i * 0.13 + 0.4), 1.2);
        x.save(); x.translate(wx + ws[i] / 2, (1 - u) * 40); x.scale(u, u);
        text(x, w, 0, 0, px, i === 2 ? C.yellow : '#ffffff');
        x.restore(); wx += ws[i] + sp;
      });
      x.restore();
    }
    if (tp > 0.75) header(x, seg(tp, 0.75, 1));
  }

  // ---- scene B: guess -> check -> adjust ----
  const RB = [320, 470], RBR = 110, DOMEB = [RB[0], RB[1] - 1.02 * RBR];
  const CATB = [985, 450], LOOP = [652, 520], LR = 118;
  const LP = { guess: -Math.PI / 2, check: Math.PI / 6, adjust: (5 * Math.PI) / 6 };
  function loopArc(x, a0, a1, prog, col, lw, alpha) {
    if (prog <= 0) return;
    const e = a0 + (a1 - a0) * prog;
    x.save(); x.globalAlpha *= alpha; x.strokeStyle = col; x.fillStyle = col; x.lineWidth = lw; x.lineCap = 'round';
    x.setLineDash([0.01, lw * 1.9]); x.beginPath(); x.ellipse(LOOP[0], LOOP[1], LR * 1.25, LR, 0, a0, e); x.stroke(); x.setLineDash([]);
    const hx = LOOP[0] + Math.cos(e) * LR * 1.25, hy = LOOP[1] + Math.sin(e) * LR, ang = Math.atan2(Math.cos(e) * LR, -Math.sin(e) * LR * 1.25);
    x.translate(hx, hy); x.rotate(ang); const hs = lw * 1.5; x.beginPath(); x.moveTo(hs * 1.1, 0); x.lineTo(-hs * 0.8, hs); x.lineTo(-hs * 0.8, -hs); x.closePath(); x.fill();
    x.restore();
  }
  function exB(x, W, H_, t) {
    const zA = eio(seg(t, TL.zoomIn[0], TL.zoomIn[1])) - eio(seg(t, TL.zoomBack[0], TL.zoomBack[1]));
    const zC = Math.exp(Math.log(16) * H.ease.in(seg(t, TL.toC[0], TL.toC[1])));
    const z = (1 + 0.32 * zA) * zC;
    sky(x, W, H_, t, { x: 300 + t * 22, y: 40, z: z });
    x.save(); x.translate(DOMEB[0], DOMEB[1]); x.scale(z, z); x.translate(-DOMEB[0], -DOMEB[1]);
    // background planet behind the cat
    planet(x, 1180 - (t - 6) * 10, 830, 250, PL.magenta, { glowA: 0.3 });
    planet(x, 150 - (t - 6) * 5, 120, 30, PL.moon);

    const wrong = seg(t, TL.wrong, TL.wrong + 0.1) * (1 - seg(t, TL.right - 0.2, TL.right));
    const worry = cl(seg(t, TL.wrong, TL.wrong + 0.15) - seg(t, TL.guess2, TL.guess2 + 0.15));
    const happy = t > TL.right + 0.05 ? 1 : 0;
    const redPulse = Math.max(0, 1 - Math.abs(t - (TL.wrong + 0.15)) / 0.35) + 0.6 * seg(t, TL.err[0] + 0.3, TL.err[1]) * (1 - seg(t, TL.rewire[0], TL.rewire[0] + 0.4));
    const rw = eio(seg(t, TL.rewire[0], TL.rewire[1]));
    const bright = 0.35 + 0.65 * rw;

    // loop diagram: Guess -> Check -> Adjust
    const la = seg(t, 6.6, 6.9);
    const act = t < TL.check ? 'guess' : t < TL.adjust ? 'check' : t < TL.guess2 ? 'adjust' : 'guess';
    loopArc(x, LP.guess + 0.42, LP.check - 0.42, eio(seg(t, 6.7, 7.0)), '#9ff7ff', 7, la * 0.8);
    loopArc(x, LP.check + 0.42, LP.adjust - 0.42, eio(seg(t, 6.8, 7.1)), t > TL.err[0] && t < TL.right ? C.red : '#9ff7ff', 7, la * 0.8);
    loopArc(x, LP.adjust + 0.42, LP.guess + TAU - 0.42, eio(seg(t, 6.9, 7.2)), '#9ff7ff', 7, la * 0.8);
    // error pulse travelling check -> adjust -> into the brain
    const ep = seg(t, TL.err[0], TL.err[0] + 0.3);
    if (ep > 0 && ep < 1) { const a = lerp(LP.check, LP.adjust, eio(ep)); const ex = LOOP[0] + Math.cos(a) * LR * 1.25, ey = LOOP[1] + Math.sin(a) * LR; glow(x, ex, ey, 46, C.red, 0.8); x.fillStyle = '#ffd0d8'; x.beginPath(); x.arc(ex, ey, 9, 0, TAU); x.fill(); }
    const EP = [[LOOP[0] + Math.cos(LP.adjust) * LR * 1.25 - 40, LOOP[1] + Math.sin(LP.adjust) * LR - 10], [470, 520], [470, 400], [DOMEB[0] + 0.74 * RBR + 8, DOMEB[1] + 6]];
    const ea = eio(seg(t, TL.err[0] + 0.25, TL.err[1])), eaA = 1 - seg(t, TL.right, TL.right + 0.3);
    arrow(x, EP, ea, C.red, 8, { dots: true, a: eaA });
    if (ea > 0 && ea < 1) { const p = bez(EP, ea); glow(x, p[0], p[1], 40, C.red, 0.8); }
    for (const [k, lab] of [['guess', 'Guess'], ['check', 'Check'], ['adjust', 'Adjust']]) {
      const a = LP[k], px = LOOP[0] + Math.cos(a) * LR * 1.25, py = LOOP[1] + Math.sin(a) * LR;
      const on = act === k && t > TL.guess - 0.05;
      const bg = !on ? 'rgba(235,240,255,0.9)' : k === 'guess' ? (t > TL.guess2 ? C.green : C.yellow) : k === 'check' ? C.red : C.cyan;
      const sIn = back(seg(t, 6.55 + (k === 'check' ? 0.1 : k === 'adjust' ? 0.2 : 0), 6.9 + (k === 'check' ? 0.1 : k === 'adjust' ? 0.2 : 0)));
      const switchT = k === 'guess' ? (t > TL.guess2 ? TL.guess2 : TL.guess) : k === 'check' ? TL.check : TL.adjust;
      const bump = 1 + 0.18 * Math.sin(seg(t, switchT, switchT + 0.3) * Math.PI);
      if (on) glow(x, px, py, 90, bg, 0.35);
      pill(x, px, py, lab, 30, { s: sIn * (on ? bump * 1.08 : 0.92), bg, fg: on && k === 'check' ? '#ffffff' : C.ink });
    }

    // the cat (new example) floats in from the right
    const ci = eo(seg(t, TL.catIn[0], TL.catIn[1]));
    const cxp = lerp(1450, CATB[0], back(seg(t, TL.catIn[0], TL.catIn[1]), 1.1)), cyp = CATB[1] + Math.sin(t * 2.1) * 10;
    cat(x, cxp, cyp, 92, { t, rot: Math.sin(t * 1.6) * 0.08 + (1 - ci) * 0.4, look: [-0.8, -0.1], blink: blinkAt(t, 1.1), happy: t > TL.right + 0.1 ? 1 : 0 });
    // its tag: "?" until checked, then "cat" drops on
    const tagDrop = back(seg(t, TL.check, TL.check + 0.3), 2);
    if (t < TL.check + 0.05) pill(x, cxp, cyp - 155, '?', 30, { s: back(seg(t, 6.8, 7.1)) * (1 - seg(t, TL.check - 0.05, TL.check + 0.05)), bg: '#d9dcff', ptr: true });
    pill(x, cxp, cyp - 155 - (1 - tagDrop) * 60, 'cat', 34, { s: tagDrop, a: seg(t, TL.check, TL.check + 0.08), bg: C.green, ptr: true });
    if (t > TL.check) burst(x, cxp, cyp - 160, (t - TL.check) * 1.4, 12, 120);

    // the robot (model)
    const shake = wrong > 0 ? Math.sin(t * 60) * 6 * Math.max(0, 1 - (t - TL.wrong) / 0.4) : 0;
    const by = RB[1] + Math.sin(t * 1.8) * 8;
    const look = t < 6.9 ? [0.4, -0.2] : t < TL.wrong ? [1, -0.1] : t < TL.adjust ? [0.9, 0.3] : t < TL.guess2 ? [-0.2, -1] : [1, -0.2];
    robot(x, RB[0] + shake, by, RBR, { t, look, blink: blinkAt(t, 0.9), worry, happy, red: cl(redPulse) * 0.8, err: cl(redPulse) * (1 - rw), rewire: rw, bright, brainGlow: 0.5 * rw + 0.6 * Math.max(0, 1 - Math.abs(t - TL.rewire[1]) / 0.4), armUp: happy ? 1 : 0 });
    // "weights" label on the dome during the adjust
    const wl = back(seg(t, TL.adjust, TL.adjust + 0.3)) * (1 - seg(t, TL.toC[0] - 0.2, TL.toC[0]));
    pill(x, DOMEB[0] - 150, DOMEB[1] - 60, 'weights', 26, { s: wl, bg: C.cyan });
    if (wl > 0) arrow(x, [[DOMEB[0] - 150, DOMEB[1] - 36], [DOMEB[0] - 140, DOMEB[1] + 10], [DOMEB[0] - 100, DOMEB[1] + 10], [DOMEB[0] - 70, DOMEB[1] + 4]], eio(seg(t, TL.adjust + 0.1, TL.adjust + 0.4)), C.cyan, 5, { a: wl });
    if (t > TL.rewire[1] - 0.1) burst(x, DOMEB[0], DOMEB[1], (t - TL.rewire[1] + 0.1) * 1.3, 33, 120);

    // speech bubble: "dog?" then "cat"
    const b1 = back(seg(t, TL.bubble, TL.bubble + 0.3)), b2 = seg(t, TL.guess2 - 0.12, TL.guess2) , b2s = back(seg(t, TL.guess2, TL.guess2 + 0.3));
    const BX = 568 + (wrong > 0 ? Math.sin(t * 70) * 5 * Math.max(0, 1 - (t - TL.wrong) / 0.35) : 0), BY = 205;
    if (t < TL.guess2) {
      bubble(x, BX, BY, 230, 112, 420, 350, b1 * (1 - b2), wrong > 0.5 ? '#ffd9df' : '#ffffff');
      x.save(); x.translate(BX, BY); x.scale(b1 * (1 - b2), b1 * (1 - b2)); text(x, 'dog?', 0, 0, 58, wrong > 0.5 ? C.red : C.ink, { shadow: 'rgba(0,0,0,0)' }); x.restore();
      badge(x, BX + 118, BY - 52, 34, false, back(seg(t, TL.wrong, TL.wrong + 0.3), 2.2) * (1 - b2));
    } else {
      bubble(x, BX, BY, 230, 112, 420, 350, b2s, '#e3ffef');
      x.save(); x.translate(BX, BY); x.scale(b2s, b2s); text(x, 'cat', 0, 0, 58, '#12925a', { shadow: 'rgba(0,0,0,0)' }); x.restore();
      badge(x, BX + 118, BY - 52, 34, true, back(seg(t, TL.right, TL.right + 0.3), 2.2));
      burst(x, BX + 118, BY - 52, (t - TL.right) * 1.2, 21, 160);
    }
    x.restore();
    // red flash on the wrong guess
    const fl = Math.max(0, 1 - Math.abs(t - (TL.wrong + 0.1)) / 0.3);
    if (fl > 0) { const g = x.createRadialGradient(640, 360, 200, 640, 360, 760); g.addColorStop(0, 'rgba(255,59,92,0)'); g.addColorStop(1, H.rgba(C.red, 0.55 * fl)); x.fillStyle = g; x.fillRect(0, 0, W, H_); }
  }

  // ---- scene C: accuracy ring + takeaway ----
  const PC = [430, 395], PCR = 182;
  const accAt = (t) => lerp(61, 97, eio(seg(t, TL.acc[0], TL.acc[1])));
  function exC(x, W, H_, t) {
    const em = 1 + 1.3 * (1 - eo(seg(t, TL.toC[1], TL.toC[1] + 0.7)));
    const tk = eio(seg(t, TL.take[0], TL.take[1]));
    sky(x, W, H_, t, { x: 700 + t * 18, y: 80 - tk * 260, z: em });
    x.save(); x.translate(PC[0], PC[1]); x.scale(em, em); x.translate(-PC[0], -PC[1]);
    const acc = accAt(t), hitK = Math.max(0, 1 - Math.abs(t - TL.hit - 0.15) / 0.75) * (t > TL.hit ? 1 : 0);
    const pcx = lerp(PC[0], 640, tk), pcy = lerp(PC[1], 1160, tk), pr = lerp(PCR, 780, tk);
    const ringA = 1 - seg(t, TL.take[0], TL.take[0] + 0.35);
    const frac = acc / 100, a0 = Math.PI * 0.5;
    const head = a0 + frac * TAU;
    const R = { rx: 1.78 * pr, ry: 0.4 * pr, tilt: -0.16 };
    const ringBar = (half) => {
      x.save(); x.translate(pcx, pcy); x.rotate(R.tilt); x.globalAlpha *= ringA;
      x.beginPath(); if (half === 'back') x.rect(-R.rx * 1.3, -R.ry * 1.6, R.rx * 2.6, R.ry * 1.6); else x.rect(-R.rx * 1.3, 0, R.rx * 2.6, R.ry * 1.6); x.clip();
      // track
      x.beginPath(); x.ellipse(0, 0, R.rx, R.ry, 0, 0, TAU); x.ellipse(0, 0, R.rx * 0.8, R.ry * 0.8, 0, 0, TAU); x.fillStyle = half === 'back' ? 'rgba(120,110,210,0.32)' : 'rgba(150,140,240,0.4)'; x.fill('evenodd');
      // fill
      const g = x.createLinearGradient(-R.rx, 0, R.rx, 0); g.addColorStop(0, '#ff8d3f'); g.addColorStop(0.5, '#ffd23f'); g.addColorStop(1, '#fff1a8');
      x.beginPath(); x.ellipse(0, 0, R.rx * 0.98, R.ry * 0.98, 0, a0, head); x.ellipse(0, 0, R.rx * 0.82, R.ry * 0.82, 0, head, a0, true); x.closePath();
      x.fillStyle = g; x.globalAlpha *= half === 'back' ? 0.8 : 1; x.fill();
      if (hitK > 0) { x.globalAlpha = 0.55 * hitK * ringA; x.fillStyle = '#ffffff'; x.fill(); }
      x.restore();
    };
    // the head of the bar (a tiny robot riding the ring)
    const hx0 = Math.cos(head) * R.rx * 0.9, hy0 = Math.sin(head) * R.ry * 0.9;
    const hx = pcx + hx0 * Math.cos(R.tilt) - hy0 * Math.sin(R.tilt), hy = pcy + hx0 * Math.sin(R.tilt) + hy0 * Math.cos(R.tilt);
    const rider = () => { if (ringA > 0.05) { glow(x, hx, hy, 60, '#ffe066', 0.6 * ringA); x.save(); x.globalAlpha *= ringA; robot(x, hx, hy - 26, 22, { t, look: [0.5, 0], happy: t > TL.hit ? 1 : 0, bright: 1 }); x.restore(); } };
    const headBack = Math.sin(head) < 0;
    glow(x, pcx, pcy, pr * 1.8, '#4fc9ff', 0.3);
    ringBar('back'); if (headBack) rider();
    // takeaway horizon: at this scale only the polar cap is in view, so add cap latitude bands as the camera tilts up
    const pal = tk > 0 ? { ...PL.teal, bands: [...PL.teal.bands, [-0.99, -0.93, '#c6f8ff', 0.38 * tk], [-0.86, -0.79, '#2f74c9', 0.42 * tk], [-0.72, -0.68, '#7fdcff', 0.32 * tk], [-0.62, -0.54, '#2f74c9', 0.3 * tk]] } : PL.teal;
    planet(x, pcx, pcy, pr, pal, { glowA: 0, atmo: 1 });
    ringBar('front'); if (!headBack) rider();
    x.restore();

    // accuracy number + training-round bars (slide up and out for the takeaway)
    const out = seg(t, TL.take[0], TL.take[0] + 0.35), oy = -260 * eio(out);
    x.save(); x.globalAlpha = 1 - out; x.translate(0, oy);
    const inA = seg(t, TL.toC[1], TL.toC[1] + 0.3);
    flare(x, 985, 380, hitK, t);
    text(x, 'Accuracy', 985, 238, 48, '#bfe9ff', { a: inA, w: 900 });
    const pop = t > TL.hit ? 1 + 0.22 * Math.sin(seg(t, TL.hit, TL.hit + 0.35) * Math.PI) : 1;
    x.save(); x.translate(985, 372); x.scale(pop, pop); text(x, Math.round(acc) + '%', 0, 0, 150, t > TL.hit ? C.yellow : '#ffffff', { a: inA }); x.restore();
    // bars
    const nb = 10, bx0 = 850, bw = 22, gap = 7, base = 600, pr2 = seg(t, TL.acc[0], TL.acc[1]);
    for (let i = 0; i < nb; i++) {
      const u = cl(pr2 * nb - i); if (u <= 0) continue;
      const v = 61 + 36 * (1 - Math.exp(-i * 0.42)) / (1 - Math.exp(-9 * 0.42));
      const h = (v - 48) * 2.3 * back(u);
      const g = x.createLinearGradient(0, base - h, 0, base); g.addColorStop(0, '#ffe680'); g.addColorStop(1, '#ff8d3f');
      x.fillStyle = 'rgba(10,8,46,0.4)'; rr(x, bx0 + i * (bw + gap) + 3, base - h + 5, bw, h, bw / 2); x.fill();
      x.fillStyle = g; rr(x, bx0 + i * (bw + gap), base - h, bw, h, bw / 2); x.fill();
    }
    text(x, 'training rounds', 985, 632, 26, '#bfe9ff', { a: seg(t, TL.acc[0], TL.acc[0] + 0.3), w: 800 });
    text(x, 'from 61%', 985, 470, 28, '#ffb0c8', { a: seg(t, TL.toC[1], TL.toC[1] + 0.3) * (1 - seg(t, TL.hit - 0.4, TL.hit)), w: 800 });
    burst(x, 985, 372, (t - TL.hit) * 1.0, 97, 340);
    x.restore();

    // takeaway: horizon planet, characters, line
    if (t > TL.take[0] + 0.2) {
      const tb = t - TL.take[0];
      const rs = back(seg(t, 13.35, 13.75)), cs = back(seg(t, 13.5, 13.9)), ds = back(seg(t, 13.6, 14.0));
      robot(x, 640, 380 + Math.sin(t * 2) * 6 + (1 - rs) * 90, 74 * rs, { t, happy: 1, bright: 1, rewire: 1, armUp: 1 });
      cat(x, 395, 382 + Math.sin(t * 2.4) * 6 + (1 - cs) * 80, 50 * cs, { t, happy: 1, rot: -0.1 });
      dog(x, 885, 382 + Math.sin(t * 2.2 + 1) * 6 + (1 - ds) * 80, 50 * ds, { t, happy: 1, rot: 0.1 });
      const l1 = back(seg(t, TL.line1, TL.line1 + 0.4)), l2 = back(seg(t, TL.line2, TL.line2 + 0.4));
      x.save(); x.translate(640, 92); x.scale(l1, l1); text(x, 'More examples', 0, 0, 68, '#ffffff'); x.restore();
      x.save(); x.translate(640, 176); x.scale(l2, l2);
      x.font = F(900, 68); const w2 = x.measureText('better guesses').width;
      text(x, 'better guesses', 34, 0, 68, C.yellow);
      // rounded flat arrow before the line
      const ax = -w2 / 2 + 34 - 70;
      x.fillStyle = 'rgba(10,8,46,0.55)'; x.save(); x.translate(2, 5); drawArrowGlyph(x, ax, 0); x.restore();
      x.fillStyle = C.cyan; drawArrowGlyph(x, ax, 0);
      x.restore();
      if (tb > 0.5) for (let i = 0; i < 7; i++) { const q = H.rng(400 + i); spark(x, q.range(120, 1160), q.range(60, 300), q.range(8, 15) * (0.5 + 0.5 * Math.sin(t * 3 + i)), '#ffffff', seg(t, TL.line2, TL.line2 + 0.4)); }
    }
  }
  function drawArrowGlyph(x, cx, cy) {
    x.beginPath(); rr(x, cx - 42, cy - 9, 56, 18, 9); x.fill();
    x.beginPath(); x.moveTo(cx + 4, cy - 26); x.lineTo(cx + 40, cy); x.lineTo(cx + 4, cy + 26); x.closePath();
    x.lineJoin = 'round'; x.lineWidth = 10; x.strokeStyle = x.fillStyle; x.fill(); x.stroke();
  }

  // ================= STILL / CLIP =================
  function scene(x, W, H_, t, build) {
    const B = (a, b) => (build ? seg(t, a, b) : 1);
    const zin = build ? 1 + 1.6 * (1 - eo(seg(t, 0, 1.3))) : 1;
    sky(x, W, H_, t, { z: zin, x: t * 12 });
    // big ringed planet, lower right
    const pIn = eo(B(0.0, 1.3));
    const pcx = lerp(1500, 1070, pIn) - t * 4, pcy = lerp(820, 575, pIn);
    planet(x, pcx, pcy, 215 * (0.7 + 0.3 * pIn), PL.magenta, { glowA: 0.32 });
    planet(x, 1180 - t * 3, 120, 30 * back(B(0.6, 1.1)), PL.moon);
    planet(x, 70 + t * 2, 330, 36 * back(B(0.25, 0.8)), PL.coral, { glowA: 0.25 });

    // stream of creatures into the dome
    const RX = 640, RY = 420 + Math.sin(t * 1.8) * 8, R = 106 * back(B(0.35, 1.25), 1.2);
    const P = [[120, 760], [150, 420], [380, 250], [RX - 60, RY - 1.02 * 106 - 20]];
    arrow(x, P, eio(B(1.4, 2.1)), '#7ff0ff', 9, { dots: true, a: 0.8 });
    // data dots flowing along
    if (!build || t > 2.1) for (let i = 0; i < 6; i++) { const u = ((t * 0.32 + i / 6) % 1); const p = bez(P, u); glow(x, p[0], p[1], 18, '#9ff7ff', 0.6); x.fillStyle = '#e8fdff'; x.beginPath(); x.arc(p[0], p[1], 4, 0, TAU); x.fill(); }
    const crit = [['dog', 0.18, 46, 1.5], ['cat', 0.43, 42, 1.7], ['cat', 0.68, 34, 1.9]];
    crit.forEach(([k, u, r, at], i) => {
      const p = bez(P, u), s = back(B(at, at + 0.4)), bob = Math.sin(t * 2.4 + i * 2) * 7;
      creature(x, k, p[0] + 20, p[1] + bob, r * s, { t: t + i, rot: Math.sin(t * 1.5 + i) * 0.12, look: [0.7, -0.3], blink: blinkAt(t, i * 1.3) });
      pill(x, p[0] + 20, p[1] + bob - r - 34, k, 26, { s: back(B(at + 0.2, at + 0.5)) * (r / 46 + 0.15), ptr: true });
    });

    // the robot with its glowing brain
    const nb = build ? cl((t - 1.0) / 0.7) : 1;
    robot(x, RX, RY, R, { t, look: [-0.5, -0.5], blink: blinkAt(t, 0.4), bright: 0.3 + 0.7 * nb, brainGlow: 0.6 * nb, rewire: 0.6, armUp: 0.5 });
    pill(x, RX, RY + R * 1.95, 'AI model', 28, { s: back(B(1.8, 2.2)), bg: C.yellow });

    // guess bubble
    const bs = back(B(2.55, 2.85));
    bubble(x, 878, 228, 200, 100, 735, 330, bs, '#ffffff');
    x.save(); x.translate(878, 228); x.scale(bs, bs); text(x, 'cat!', 0, 0, 54, C.ink, { shadow: 'rgba(0,0,0,0)' }); x.restore();
    badge(x, 975, 182, 28, true, back(B(2.95, 3.25), 2.2));

    // title, top-left
    const words = [['How', '#ffffff'], ['Machines', '#ffffff'], ['Learn', C.yellow]];
    x.font = F(900, 74);
    let wx = 64;
    words.forEach(([w, c], i) => {
      const u = back(B(2.1 + i * 0.16, 2.55 + i * 0.16), 1.4), ww = x.measureText(w).width;
      const line = i < 2 ? 0 : 1, lx = i === 2 ? 64 : wx;
      x.save(); x.translate(lx + ww / 2, 112 + line * 80 + (1 - u) * 40); x.scale(u, u); text(x, w, 0, 0, 74, c); x.restore();
      if (i < 2) wx += ww + 20;
    });
    pill(x, 128, 48, 'EPISODE 7', 22, { s: back(B(2.0, 2.3)), bg: C.pink, fg: '#ffffff' });
    if (build && t > 2.95) burst(x, 975, 182, (t - 2.95) * 1.2, 5, 120);
  }

  registerStyle({
    id: 'flat-space',
    name: 'Flat-Vector Science',
    category: 'Popular Explainer Looks',
    description: 'Flat-vector science-explainer illustration: deep navy-to-violet space gradients, chunky outline-free shapes with rich multi-stop gradients, flat crescent shadows and rim highlights, soft radial glows, sparkly star fields, banded ringed planets and cute big-eyed round characters.',
    motion: 'Smooth eased motion with gentle overshoot: the camera pulls back through scales, planets drift with parallax, characters bob and pop in, glows pulse.',
    fonts: ['900 64px "Nunito"', '800 32px "Nunito"', '700 28px "Nunito"'],
    duration: 5,
    frameT: 4.6,
    readsPixels: false,
    draw(ctx, W, H_, t) { scene(ctx, W, H_, t, true); finish(ctx, W, H_, t); },

    explainerDuration: TL.D,
    explainerNote: 'Big smooth camera moves through scale: the model pulls back until a million examples become a spiral galaxy, a foreground planet sweeps across as the wipe, and the camera dives into the glowing brain dome to emerge at a planet whose ring is the accuracy bar; arrows are chunky dotted rounded curves, numbers are big rounded Nunito.',
    explainer(ctx, W, H_, t) {
      const x = ctx;
      const sw = eio(seg(t, TL.sweep[0], TL.sweep[1])), spx = lerp(W + 980, -980, sw);
      if (t < TL.sweep[0] || spx > 640) exA(x, W, H_, t);
      else if (t < TL.toC[1]) exB(x, W, H_, t);
      else exC(x, W, H_, t);
      // the foreground planet sweep (wipe)
      if (sw > 0 && sw < 1) planet(x, spx, 380 + (sw - 0.5) * 120, 880, PL.coral, { glowA: 0.4 });
      // dive into the brain: glow whiteout
      const wo = seg(t, TL.toC[0] + 0.2, TL.toC[1]) * (1 - seg(t, TL.toC[1], TL.toC[1] + 0.4));
      if (wo > 0) {
        const g = x.createRadialGradient(640, 360, 0, 640, 360, 800);
        g.addColorStop(0, H.rgba('#fff6d0', wo)); g.addColorStop(0.5, H.rgba('#8ff0ff', wo * 0.95)); g.addColorStop(1, H.rgba('#6a4cff', wo * 0.9));
        x.fillStyle = g; x.fillRect(0, 0, W, H_);
      }
      if (t > TL.titleShrink[1]) header(x, 1);
      finish(x, W, H_, t);
    },

    explainerSound(k) {
      // Soft cinematic-science palette: marimba-ish plucks (low-mid, minor), airy whooshes for scale moves,
      // a warm wonder-pad underneath, cute boops for the creatures. All times come from TL / SPAWN above.
      const D = TL.D, hz = k.hz;
      const pan = (px) => cl((px / 1280) * 2 - 1, -1, 1) * 0.6;
      // first time an eased progress over [t0,t1] reaches u
      const when = (t0, t1, ease, u) => { for (let i = 0; i <= 400; i++) { const tt = t0 + ((t1 - t0) * i) / 400; if (ease(i / 400) >= u - 1e-6) return tt; } return t1; };
      const backPeak = (t0, t1) => when(t0, t1, (u) => back(u), 1); // when an overshoot pop first reaches full size
      // marimba-like pluck: sine body, short 4th-partial knock, soft octave
      const pluck = (t, n, g = 1, p = 0, minor = false) => {
        const f = hz(n);
        k.tone(t, { f, dur: 0.9, gain: 0.2 * g, a: 0.003, pan: p, verb: 0.25, minor });
        k.tone(t, { f: f * 4, dur: 0.09, gain: 0.04 * g, a: 0.001, pan: p, minor });
        k.tone(t, { f: f * 2, type: 'triangle', dur: 0.32, gain: 0.045 * g, a: 0.003, pan: p, minor });
      };
      // cute soft boop: a rounded sine that bends up
      const boop = (t, f0, g = 1, p = 0, minor = true) => {
        k.tone(t, { f: [[0, f0], [0.07, f0 * 1.45], [0.16, f0 * 1.3]], dur: 0.2, gain: 0.17 * g, a: 0.008, pan: p, verb: 0.15, minor });
        k.tone(t, { f: [[0, f0 * 0.5], [0.08, f0 * 0.72]], type: 'triangle', dur: 0.14, gain: 0.06 * g, a: 0.006, pan: p, minor });
      };
      // airy whoosh: pink noise through a soft band that opens to `top` then closes
      const air = (t, dur, top, g = 1, p = 0, peak = 0.55, minor = false) =>
        k.noise(t, { dur, color: 'pink', filter: 'bandpass', f: [[0, 260], [dur * peak, top], [dur, 340]], q: 0.55, gain: 0.26 * g, a: dur * peak, pan: p, verb: 0.3, minor });
      const chord = (t, notes, g = 1, dur = 2.2) => notes.forEach((n, i) => {
        k.tone(t + i * 0.012, { f: n, type: 'triangle', dur, gain: 0.07 * g, a: 0.02, verb: 0.35, filter: 'lowpass', f2: 1800, pan: (i / (notes.length - 1) - 0.5) * 0.6 });
        k.tone(t + i * 0.012, { f: hz(n) * 1.003, dur, gain: 0.06 * g, a: 0.03, verb: 0.35 });
      });
      const shimmer = (t, notes, g = 1, p = 0) => k.withMinor(() => notes.forEach((n, i) => k.tone(t + i * 0.055, { f: n, dur: 0.7, gain: 0.07 * g, a: 0.004, verb: 0.4, pan: p + (i % 2 ? 0.25 : -0.25) })));

      // warm wonder-pad: Am7 -> Fmaj7 -> Dm7 -> Cmaj7 (resolves under the 97% and the takeaway)
      k.music('pad', 0, D, { bpm: 64, gain: 0.45, chords: [['A3', 'C4', 'E4', 'G4'], ['F3', 'A3', 'C4', 'E4'], ['D3', 'F3', 'A3', 'C4'], ['C3', 'E3', 'G3', 'B3']] });

      // ---- 1 HOOK: the camera pulls back through the stars, the title pops word by word
      air(0, 1.4, 1500, 0.8, 0, 0.35);
      ['A3', 'C4', 'E4', 'A4'].forEach((n, i) => pluck(TL.title + i * 0.13 + 0.06, n, 0.9, (i - 1.5) * 0.2, i < 3));
      air(TL.robotIn[0], 0.9, 1100, 0.45, 0, 0.8, true); // robot flies in from far away
      boop(backPeak(TL.robotIn[0], TL.robotIn[1]), 330, 1.1, 0, false); // ...and arrives
      boop(1.3, 470, 0.8, 0.15); // "?" thought
      k.noise(TL.titleShrink[0], { dur: 0.6, color: 'pink', filter: 'bandpass', f: [[0, 700], [0.6, 300]], q: 0.7, gain: 0.08, a: 0.2, pan: -0.3, minor: true }); // title glides to the corner

      // ---- 2 DATA: dotted stream draws, creatures boop in, the counter ticks
      const nearBoop = (tt) => SPAWN.some((ts) => Math.abs(ts + 0.05 - tt) < 0.045);
      for (let i = 1; i <= 5; i++) if (!nearBoop(when(TL.arrow[0], TL.arrow[1], eio, i / 5))) k.play('tock', when(TL.arrow[0], TL.arrow[1], eio, i / 5), { f: 520 + i * 40, gain: 0.35, pan: pan(-100 + i * 200), minor: true });
      pluck(backPeak(2.95, 3.3), 'E4', 0.9, pan(930)); // "AI model" label lands
      SPAWN.forEach((ts, i) => boop(ts + 0.05, KIND(i) === 'cat' ? 520 : 400, i < 4 ? 0.9 : 0.6, -0.55, true));
      // counter: v = 1e6 * seg^2.3 speeds up; ticks throttled under 12/s
      for (let tt = TL.count[0] + 0.12; tt < TL.count[1] - 0.04;) { const u = seg(tt, TL.count[0], TL.count[1]); if (!nearBoop(tt) && Math.abs(tt - 3.12) > 0.06) k.play('tock', tt, { f: 760 + 160 * u, gain: 0.5 + 0.15 * u, pan: -0.5, minor: true }); tt += 0.22 - 0.135 * u; }
      // zoom out to the galaxy: one long airy breath
      air(TL.zoom[0], TL.zoom[1] - TL.zoom[0] + 0.3, 1900, 1.0, 0, 0.5);
      pluck(backPeak(5.15, 5.45), 'C4', 0.8, pan(1010), true); // "1 dot = 1 example"
      // 1,000,000 lands
      pluck(TL.count[1], 'A3', 1.2, -0.4); pluck(TL.count[1] + 0.07, 'E4', 1.0, -0.3); pluck(TL.count[1] + 0.14, 'A4', 0.8, -0.2);

      // ---- transition: a giant planet sweeps past the camera
      air(TL.sweep[0], TL.sweep[1] - TL.sweep[0], 1300, 1.3, 0, 0.5);
      k.noise(TL.sweep[0] + 0.1, { dur: 0.75, color: 'brown', filter: 'lowpass', f: 260, gain: 0.32, a: 0.35, verb: 0.2 });
      k.tone(TL.sweep[0] + 0.1, { f: [[0, 70], [0.4, 58], [0.75, 46]], dur: 0.75, gain: 0.16, a: 0.3 });

      // ---- 3 GUESS -> CHECK -> ADJUST
      boop(backPeak(TL.catIn[0], TL.catIn[1]) || 6.8, 560, 0.9, pan(985)); // the cat arrives
      ['A3', 'C4', 'E4'].forEach((n, i) => pluck(6.62 + i * 0.1, n, 0.55, pan([652, 790, 515][i]), true)); // loop pills
      pluck(TL.guess, 'G4', 0.8, pan(652)); // Guess lights
      boop(backPeak(TL.bubble, TL.bubble + 0.3), 420, 1.1, pan(568), false); // "dog?"
      pluck(backPeak(TL.check, TL.check + 0.3), 'C4', 0.9, pan(985)); // "cat" tag drops on: Check
      shimmer(TL.check + 0.05, ['C5', 'E5', 'G5'], 0.6, pan(985));
      // the wrong guess: low two-note "nope" + soft thump
      k.tone(TL.wrong, { f: 'E3', type: 'triangle', dur: 0.26, gain: 0.24, hold: 0.1, filter: 'lowpass', f2: 900, pan: pan(680) });
      k.tone(TL.wrong, { f: 'E2', dur: 0.26, gain: 0.18, hold: 0.1 });
      k.tone(TL.wrong + 0.2, { f: 'C3', type: 'triangle', dur: 0.5, gain: 0.24, hold: 0.18, filter: 'lowpass', f2: 800, pan: pan(680) });
      k.tone(TL.wrong + 0.2, { f: 'C2', dur: 0.5, gain: 0.2, hold: 0.18 });
      k.play('thud', TL.wrong, { f: 95, gain: 0.3, pan: pan(680) });
      // error signal travels back to the brain (right -> left), low and soft
      k.noise(TL.err[0], { dur: TL.err[1] - TL.err[0], color: 'pink', filter: 'bandpass', f: [[0, 900], [TL.err[1] - TL.err[0], 260]], q: 1.2, gain: 0.2, a: 0.15, pan: -0.1, verb: 0.2 });
      k.tone(TL.err[0], { f: [[0, 220], [0.55, 110]], type: 'triangle', dur: 0.55, gain: 0.07, a: 0.1, filter: 'lowpass', f2: 700 });
      pluck(backPeak(TL.adjust, TL.adjust + 0.3), 'D4', 0.9, pan(170)); // Adjust + "weights"
      air(TL.zoomIn[0], 0.5, 1200, 0.5, pan(320), 0.6, true);
      // rewiring: nodes brighten one after another
      ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'].forEach((n, i) => pluck(TL.rewire[0] + i * 0.1, n, 0.55, pan(320) + (i % 2 ? 0.1 : -0.1), true));
      shimmer(TL.rewire[1] - 0.05, ['E5', 'A5'], 0.5, pan(320));
      air(TL.zoomBack[0], 0.4, 1000, 0.4, 0, 0.5, true);
      boop(backPeak(TL.guess2, TL.guess2 + 0.3), 520, 1.0, pan(568), false); // "cat"
      // correct: warm rising pair + a little shimmer
      pluck(TL.right, 'C4', 1.1, pan(680)); pluck(TL.right + 0.09, 'G4', 1.0, pan(690)); pluck(TL.right + 0.18, 'C5', 0.7, pan(700));

      // ---- transition: dive into the glowing brain
      air(TL.toC[0], TL.toC[1] - TL.toC[0] + 0.1, 2200, 1.2, pan(320), 0.9);
      k.tone(TL.toC[0], { f: [[0, 110], [0.5, 330]], type: 'triangle', dur: 0.55, gain: 0.07, a: 0.45 });
      chord(TL.toC[1], ['C3', 'G3', 'E4'], 0.6, 1.4); // bloom as we emerge

      // ---- 4 ACCURACY: ring fills, number counts 61 -> 97
      for (let tt = TL.acc[0], last = 61, lastT = -1; tt < TL.acc[1]; tt += 1 / 120) {
        const v = Math.round(accAt(tt));
        if (v !== last && tt - lastT >= 1 / 11) { k.play('tock', tt, { f: 560 + (v - 61) * 9, gain: 0.5, pan: pan(985), minor: true }); last = v; lastT = tt; }
      }
      // swell into the big moment
      k.noise(TL.hit - 0.8, { dur: 0.85, color: 'pink', filter: 'bandpass', f: [[0, 250], [0.8, 1800]], q: 0.8, gain: 0.24, a: 0.78, verb: 0.3 });
      k.tone(TL.hit - 0.8, { f: [[0, 110], [0.8, 220]], type: 'triangle', dur: 0.82, gain: 0.08, a: 0.75 });
      // 97%: warm low boom + big chord + shimmer
      k.play('impact', TL.hit, { gain: 0.75 });
      chord(TL.hit, ['A2', 'E3', 'A3', 'C4', 'E4', 'B4'], 1.6, 2.4);
      shimmer(TL.hit + 0.08, ['E5', 'A5', 'C6', 'E5', 'B5'], 0.8, 0.3);

      // ---- 5 TAKEAWAY: camera tilts up to the horizon, everyone pops up, the line resolves
      air(TL.take[0], TL.take[1] - TL.take[0], 1000, 0.6, 0, 0.5, true);
      pluck(backPeak(TL.line1, TL.line1 + 0.4), 'E4', 0.8, 0);
      boop(backPeak(13.35, 13.75), 400, 0.9, 0); boop(backPeak(13.5, 13.9), 540, 0.8, pan(395)); boop(backPeak(13.6, 14.0), 440, 0.8, pan(885));
      chord(backPeak(TL.line2, TL.line2 + 0.4), ['C3', 'G3', 'C4', 'E4', 'G4', 'D5'], 1.1, 1.5);
      pluck(backPeak(TL.line2, TL.line2 + 0.4), 'C4', 1.0, 0);
    },
  });
}
```

### `examples/character-sheet.html (presenter test page)`

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<!-- Flat-Vector Science page for EngineX motion-graphic/render. Copy this file per video and edit ONLY the
     "SCENES" section (TL, explainer) and the <audio> cues. Everything above SCENES is the style: do not change it. -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Nunito:wght@400;700;800;900&display=block">
<style>
  body { margin: 0; background: #090b2c; }
  #root { position: relative; width: 1920px; height: 1080px; overflow: hidden; background: #090b2c; }
  #c { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; }
</style>
</head>
<body>
<!-- data-duration MUST equal DURATION below. -->
<div id="root" data-composition-id="main" data-start="0" data-duration="6" data-width="1920" data-height="1080">
  <canvas id="c" data-layout-allow-overflow></canvas>
  <!-- SOUND CUES: one element per cue. src = assets/<name the file was given in `media`>; data-start = the TL time of
       the event it marks, to the frame; data-volume keeps effects in front and beds underneath. Voice-over goes in the
       render's `audio` parameter, not here. -->
  <!-- <audio src="assets/pop.wav" data-start="0.15" data-duration="1" data-volume="0.8"></audio> -->
</div>
<script>
// Shared helpers + style registry for the style-frame explorations.
// Every style is a pure function of time: draw(ctx, W, H, t). Same t => same pixels.
(function () {
  const STYLES = (window.STYLES = window.STYLES || []);
  window.registerStyle = (s) => STYLES.push(s);

  const H = (window.H = {});

  // ---------- seeded randomness ----------
  // H.rng(seed) -> r() in [0,1). Extras: r.range(a,b), r.int(a,b), r.pick(arr), r.gauss(), r.chance(p)
  H.rng = function (seed = 1) {
    let a = typeof seed === 'string' ? hashStr(seed) : (seed >>> 0) || 1;
    const r = function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    r.range = (lo, hi) => lo + r() * (hi - lo);
    r.int = (lo, hi) => Math.floor(lo + r() * (hi - lo + 1));
    r.pick = (arr) => arr[Math.floor(r() * arr.length)];
    r.chance = (p) => r() < p;
    r.gauss = () => { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    return r;
  };
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  // ---------- gradient noise ----------
  // H.makeNoise(seed) -> { n2(x,y), n3(x,y,z), fbm2(x,y,oct), fbm3(x,y,z,oct) }  (outputs roughly -1..1)
  H.makeNoise = function (seed = 1) {
    const r = H.rng(seed), p = new Uint8Array(512), perm = [...Array(256).keys()];
    for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
    for (let i = 0; i < 512; i++) p[i] = perm[i & 255];
    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a, b, t) => a + (b - a) * t;
    const g3 = (h, x, y, z) => { h &= 15; const u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z; return ((h & 1) ? -u : u) + ((h & 2) ? -v : v); };
    function n3(x, y, z) {
      const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
      x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
      const u = fade(x), v = fade(y), w = fade(z);
      const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
      return lerp(lerp(lerp(g3(p[AA], x, y, z), g3(p[BA], x - 1, y, z), u), lerp(g3(p[AB], x, y - 1, z), g3(p[BB], x - 1, y - 1, z), u), v),
        lerp(lerp(g3(p[AA + 1], x, y, z - 1), g3(p[BA + 1], x - 1, y, z - 1), u), lerp(g3(p[AB + 1], x, y - 1, z - 1), g3(p[BB + 1], x - 1, y - 1, z - 1), u), v), w);
    }
    const n2 = (x, y) => n3(x, y, 0.5);
    const fbm3 = (x, y, z, oct = 4) => { let s = 0, a = 0.5, f = 1, norm = 0; for (let i = 0; i < oct; i++) { s += a * n3(x * f, y * f, z * f); norm += a; a *= 0.5; f *= 2; } return s / norm; };
    const fbm2 = (x, y, oct = 4) => fbm3(x, y, 0.5, oct);
    return { n2, n3, fbm2, fbm3 };
  };

  // ---------- math ----------
  H.lerp = (a, b, t) => a + (b - a) * t;
  H.clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
  H.map = (v, a, b, c, d) => c + ((v - a) / (b - a)) * (d - c);
  H.smooth = (e0, e1, x) => { const t = H.clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };
  H.ease = {
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    out: (t) => 1 - Math.pow(1 - t, 3),
    in: (t) => t * t * t,
    back: (t) => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  };

  // ---------- color ----------
  H.hex = (h) => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map((c) => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  H.rgba = (hexOrArr, a = 1) => { const [r, g, b] = Array.isArray(hexOrArr) ? hexOrArr : H.hex(hexOrArr); return `rgba(${r | 0},${g | 0},${b | 0},${a})`; };
  H.mix = (c1, c2, t) => { const a = Array.isArray(c1) ? c1 : H.hex(c1), b = Array.isArray(c2) ? c2 : H.hex(c2); return [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t); };

  // ---------- canvas utilities ----------
  // Offscreen canvas of the same logical size (use for layers, masks, compositing).
  H.layer = (W, H_, ) => { const c = document.createElement('canvas'); c.width = W; c.height = H_; return c; };
  // Monochrome grain / film noise over the whole canvas. amount ~ 0.03-0.15
  H.grain = function (ctx, W, Hh, amount = 0.08, seed = 7, mono = true) {
    const img = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height), d = img.data, r = H.rng(seed), k = amount * 255;
    for (let i = 0; i < d.length; i += 4) {
      const n = (r() - 0.5) * k;
      if (mono) { d[i] += n; d[i + 1] += n; d[i + 2] += n; }
      else { d[i] += (r() - 0.5) * k; d[i + 1] += (r() - 0.5) * k; d[i + 2] += (r() - 0.5) * k; }
    }
    ctx.putImageData(img, 0, 0);
  };
  // Paper-ish texture tile: fills with base color + fibrous noise (cheap; drawn into ctx).
  H.paper = function (ctx, W, Hh, base = '#f3ecdc', seed = 3, strength = 0.06) {
    ctx.save(); ctx.fillStyle = base; ctx.fillRect(0, 0, W, Hh);
    const nz = H.makeNoise(seed), cell = 4, [br, bg, bb] = H.hex(base);
    for (let y = 0; y < Hh; y += cell) for (let x = 0; x < W; x += cell) {
      const v = nz.fbm2(x * 0.01, y * 0.01, 3) * 0.6 + nz.n2(x * 0.15, y * 0.04) * 0.4;
      const s = 1 + v * strength * 2;
      ctx.fillStyle = `rgb(${br * s | 0},${bg * s | 0},${bb * s | 0})`; ctx.fillRect(x, y, cell, cell);
    }
    ctx.restore();
  };
  // Vignette
  H.vignette = function (ctx, W, Hh, strength = 0.5, color = '0,0,0') {
    const g = ctx.createRadialGradient(W / 2, Hh / 2, Math.min(W, Hh) * 0.3, W / 2, Hh / 2, Math.hypot(W, Hh) * 0.6);
    g.addColorStop(0, `rgba(${color},0)`); g.addColorStop(1, `rgba(${color},${strength})`);
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(0, 0, W, Hh); ctx.restore();
  };

  // ---------- rendering entry ----------
  // Renders style into canvas at logical 1280x720 (canvas can be any pixel size; it is scaled).
  H.W = 1280; H.H = 720;
  H.loadFonts = async function (style) {
    const specs = style.fonts || [];
    try { const sample = 'AaZz09' + (window.FONT_SAMPLE || '');
      await Promise.all(specs.map((f) => document.fonts.load(f, sample))); await document.fonts.ready; } catch (e) { /* render anyway */ }
  };
  H.render = function (style, canvas, t) {
    const ctx = canvas.getContext('2d', { willReadFrequently: !!style.readsPixels });
    const sx = canvas.width / H.W, sy = canvas.height / H.H;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save(); ctx.scale(sx, sy);
    style.draw(ctx, H.W, H.H, t == null ? style.frameT || 0 : t);
    ctx.restore();
  };
})();
</script>
<script>
// ---- style kit: extracted verbatim from references/flat-space.js (lines 3-21, 36-253, 405-467, 739-743) ----
  // ---------- Flat-vector science explainer: deep space gradients, chunky shaded balls, crescent shadows, glows ----------
  const TAU = Math.PI * 2;
  const cl = H.clamp, lerp = H.lerp;
  const seg = (t, a, b) => cl((t - a) / (b - a));
  const eo = H.ease.out, eio = H.ease.inOut;
  // gentle overshoot
  const back = (u, s = 1.5) => { if (u <= 0) return 0; if (u >= 1) return 1; return 1 + (s + 1) * Math.pow(u - 1, 3) + s * Math.pow(u - 1, 2); };
  const FONT = '"Nunito", "Fredoka", sans-serif';
  const F = (w, px) => `${w} ${px}px ${FONT}`;

  const C = {
    sky0: '#090b2c', sky1: '#18134f', sky2: '#3a1a6c',
    ink: '#141846', visor: '#10164a',
    teal: ['#a4fbef', '#3ccbdc', '#1d64b0'],
    orange: ['#ffcc7a', '#ff8d3f', '#d24a2a'],
    tan: ['#ffe9be', '#ecb676', '#b4723c'],
    yellow: '#ffd23f', pink: '#ff5d8f', red: '#ff3b5c', green: '#38e08e', cyan: '#56e8ff', violet: '#8b5cff',
  };

  // ---------- small helpers ----------
  function rr(x, X, Y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r);
    x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath();
  }
  function glow(x, cx, cy, r, col, a) {
    if (a <= 0 || r <= 0) return;
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, H.rgba(col, a)); g.addColorStop(0.35, H.rgba(col, a * 0.4)); g.addColorStop(1, H.rgba(col, 0));
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill();
  }
  function spark(x, cx, cy, r, col, a) {
    if (a <= 0 || r <= 0) return;
    x.save(); x.globalAlpha *= a; x.fillStyle = col; x.beginPath();
    x.moveTo(cx, cy - r); x.quadraticCurveTo(cx, cy, cx + r, cy); x.quadraticCurveTo(cx, cy, cx, cy + r);
    x.quadraticCurveTo(cx, cy, cx - r, cy); x.quadraticCurveTo(cx, cy, cx, cy - r); x.fill(); x.restore();
  }
  // region of circle (cx,cy,r) NOT covered by the same circle shifted by (dx,dy)
  function crescent(x, cx, cy, r, dx, dy, fill) {
    x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip();
    x.beginPath(); x.rect(cx - r - 2, cy - r - 2, 2 * r + 4, 2 * r + 4); x.arc(cx + dx, cy + dy, r * 1.02, 0, TAU);
    x.fillStyle = fill; x.fill('evenodd'); x.restore();
  }
  // the core flat-vector ball: multi-stop gradient, two stepped flat shadow crescents, rim highlight
  function ball(x, cx, cy, r, col, o = {}) {
    if (r <= 0.3) return;
    const la = o.la == null ? -2.25 : o.la, lx = Math.cos(la), ly = Math.sin(la);
    const g = x.createLinearGradient(cx + lx * r, cy + ly * r, cx - lx * r, cy - ly * r);
    g.addColorStop(0, col[0]); g.addColorStop(0.45, col[1]); g.addColorStop(1, H.rgba(H.mix(col[1], col[2], 0.6)));
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill();
    if (o.inner) { x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip(); o.inner(); x.restore(); }
    const sh = o.sh == null ? 0.3 : o.sh;
    crescent(x, cx, cy, r, lx * r * sh, ly * r * sh, H.rgba(col[2], o.sha == null ? 0.5 : o.sha));
    crescent(x, cx, cy, r, lx * r * sh * 2.2, ly * r * sh * 2.2, H.rgba(col[2], (o.sha == null ? 0.5 : o.sha) * 0.45));
    crescent(x, cx, cy, r, -lx * r * 0.075, -ly * r * 0.075, H.rgba(o.rim || '#ffffff', o.rima == null ? 0.42 : o.rima));
  }
  const bez = (P, u) => { const v = 1 - u; return [v * v * v * P[0][0] + 3 * v * v * u * P[1][0] + 3 * v * u * u * P[2][0] + u * u * u * P[3][0], v * v * v * P[0][1] + 3 * v * v * u * P[1][1] + 3 * v * u * u * P[2][1] + u * u * u * P[3][1]]; };
  // rounded dotted / solid arrow along a cubic, drawn on to `prog`
  function arrow(x, P, prog, col, lw, o = {}) {
    if (prog <= 0) return;
    const n = 48, a = o.a == null ? 1 : o.a;
    x.save(); x.globalAlpha *= a; x.strokeStyle = col; x.fillStyle = col; x.lineWidth = lw; x.lineCap = 'round'; x.lineJoin = 'round';
    if (o.dots) x.setLineDash([0.01, lw * 1.9]);
    x.beginPath(); const p0 = bez(P, o.from || 0); x.moveTo(p0[0], p0[1]);
    for (let i = 1; i <= n; i++) { const u = (o.from || 0) + ((prog - (o.from || 0)) * i) / n; const p = bez(P, u); x.lineTo(p[0], p[1]); }
    x.stroke(); x.setLineDash([]);
    if (o.head !== false && prog > 0.08) {
      const e = bez(P, prog), e0 = bez(P, prog - 0.02), ang = Math.atan2(e[1] - e0[1], e[0] - e0[0]), hs = lw * 1.5 * cl(prog * 5);
      x.translate(e[0], e[1]); x.rotate(ang); x.beginPath(); x.moveTo(hs * 1.1, 0); x.lineTo(-hs * 0.8, hs); x.lineTo(-hs * 0.8, -hs); x.closePath();
      x.lineWidth = lw * 0.7; x.fill(); x.stroke();
    }
    x.restore();
  }
  // flat text with a darker offset "long shadow"
  function text(x, s, cx, cy, px, col, o = {}) {
    x.save(); x.font = F(o.w || 900, px); x.textAlign = o.align || 'center'; x.textBaseline = 'middle';
    x.globalAlpha *= o.a == null ? 1 : o.a;
    x.fillStyle = o.shadow || 'rgba(10,8,46,0.55)'; x.fillText(s, cx + px * 0.03, cy + px * 0.07);
    x.fillStyle = col; x.fillText(s, cx, cy); x.restore();
  }
  // rounded label pill, optional pointer below
  function pill(x, cx, cy, s, px, o = {}) {
    const sc = o.s == null ? 1 : o.s, a = o.a == null ? 1 : o.a;
    if (sc <= 0.01 || a <= 0.01) return;
    x.save(); x.font = F(o.w || 900, px);
    const tw = x.measureText(s).width, w = tw + px * 1.15, h = px * 1.6;
    x.translate(cx, cy); x.scale(sc, sc); x.globalAlpha *= a;
    x.fillStyle = 'rgba(10,8,46,0.4)'; rr(x, -w / 2, -h / 2 + px * 0.2, w, h, h / 2); x.fill();
    x.fillStyle = o.bg || '#ffffff';
    if (o.ptr) { x.beginPath(); x.moveTo(-px * 0.35, h / 2 - 2); x.lineTo(0, h / 2 + px * 0.45); x.lineTo(px * 0.35, h / 2 - 2); x.fill(); }
    rr(x, -w / 2, -h / 2, w, h, h / 2); x.fill();
    x.fillStyle = 'rgba(255,255,255,0.35)'; rr(x, -w / 2 + h * 0.25, -h / 2 + h * 0.12, w - h * 0.5, h * 0.16, h * 0.08); x.fill();
    x.fillStyle = o.fg || C.ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, px * 0.06);
    x.restore();
    return w;
  }

  // ---------- sky: gradient, nebula glows, parallax stars and sparkles ----------
  let STARS = null;
  function stars() {
    if (STARS) return STARS;
    const r = H.rng(77), a = [], sp = [];
    for (let i = 0; i < 620; i++) a.push({ x: r.range(0, 1680), y: r.range(0, 1120), d: r.pick([0.15, 0.3, 0.3, 0.55, 1]), s: r.range(0.6, 2.0), ph: r.range(0, TAU), sp: r.range(0.8, 2.6), c: r.pick(['#ffffff', '#cfe4ff', '#ffe9c7', '#dccbff']) });
    for (let i = 0; i < 16; i++) sp.push({ x: r.range(0, 1680), y: r.range(0, 1120), d: r.range(0.3, 0.9), s: r.range(6, 13), ph: r.range(0, TAU) });
    STARS = { a, sp }; return STARS;
  }
  function sky(x, W, H_, t, cam = {}) {
    const px = cam.x || 0, py = cam.y || 0, lz = Math.log(cam.z || 1);
    const g = x.createLinearGradient(0, 0, W * 0.3, H_);
    g.addColorStop(0, C.sky0); g.addColorStop(0.5, C.sky1); g.addColorStop(1, C.sky2);
    x.fillStyle = g; x.fillRect(0, 0, W, H_);
    glow(x, W * 0.86, H_ * 0.12, 700, '#7b34c6', 0.34);
    glow(x, W * 0.05, H_ * 1.0, 620, '#2448b4', 0.4);
    glow(x, W * 0.45, H_ * 0.6, 520, '#4a2a9c', 0.16);
    const S = stars();
    const place = (s) => {
      const k = Math.exp(lz * s.d * 0.6);
      let sx = (((s.x - px * s.d) % 1680) + 1680) % 1680 - 200, sy = (((s.y - py * s.d) % 1120) + 1120) % 1120 - 200;
      return [(sx - 640) * k + 640, (sy - 360) * k + 360];
    };
    for (const s of S.a) {
      const [sx, sy] = place(s);
      if (sx < -4 || sx > W + 4 || sy < -4 || sy > H_ + 4) continue;
      x.globalAlpha = (0.55 + 0.45 * Math.sin(t * s.sp + s.ph)) * (0.45 + s.d * 0.55);
      x.fillStyle = s.c; x.beginPath(); x.arc(sx, sy, s.s * (0.7 + 0.35 * s.d), 0, TAU); x.fill();
    }
    x.globalAlpha = 1;
    for (const s of S.sp) {
      const [sx, sy] = place(s); const tw = 0.6 + 0.4 * Math.sin(t * 1.7 + s.ph);
      glow(x, sx, sy, s.s * 2.2, '#bfa8ff', 0.25 * tw);
      spark(x, sx, sy, s.s * tw, '#ffffff', 0.9);
    }
  }

  // ---------- planets ----------
  function ring(x, cx, cy, R, half, a = 1) {
    if (a <= 0) return;
    x.save(); x.translate(cx, cy); x.rotate(R.tilt); x.globalAlpha *= a;
    // clip to the back or front half, wide enough for the outermost band so the ring ends are never cut off
    const m = Math.max(...R.bands.map((b) => b[1])) * 1.05;
    x.beginPath(); if (half === 'back') x.rect(-R.rx * m, -R.ry * m, R.rx * m * 2, R.ry * m); else x.rect(-R.rx * m, 0, R.rx * m * 2, R.ry * m); x.clip();
    for (const [f0, f1, col, al] of R.bands) {
      x.beginPath(); x.ellipse(0, 0, R.rx * f1, R.ry * f1, 0, 0, TAU); x.ellipse(0, 0, R.rx * f0, R.ry * f0, 0, 0, TAU);
      x.fillStyle = H.rgba(col, (al == null ? 1 : al) * (half === 'back' ? 0.75 : 1)); x.fill('evenodd');
    }
    x.restore();
  }
  function bands(x, r, B, tilt) {
    x.save(); x.rotate(tilt || 0);
    for (const [v0, v1, col, a] of B) {
      x.beginPath();
      for (let i = 0; i <= 20; i++) { const u = (i / 20) * 2 - 1; x.lineTo(u * r * 1.1, (v0 + 0.13 * (1 - u * u)) * r); }
      for (let i = 20; i >= 0; i--) { const u = (i / 20) * 2 - 1; x.lineTo(u * r * 1.1, (v1 + 0.13 * (1 - u * u)) * r); }
      x.fillStyle = H.rgba(col, a == null ? 1 : a); x.fill();
    }
    x.restore();
  }
  const PL = {
    magenta: { c: ['#ffa0c4', '#de4b93', '#4e1670'], glow: '#ff5fa8', tilt: -0.18, atmo: [255, 214, 234],
      bands: [[-0.62, -0.48, '#ffc1d8', 0.55], [-0.2, -0.02, '#b5307e', 0.6], [0.06, 0.14, '#ffd0e2', 0.4], [0.36, 0.58, '#9a2775', 0.55]],
      ring: { rx: 1.75, ry: 0.5, tilt: -0.2, bands: [[1.18, 1.32, '#ffd27a', 0.95], [1.34, 1.5, '#ff9f5a', 0.9], [1.53, 1.6, '#ffe7b0', 0.8]] } },
    coral: { c: ['#ffd29a', '#ff7a4a', '#7a1f4f'], glow: '#ff8a50', tilt: 0.1, atmo: [255, 226, 190],
      bands: [[-0.7, -0.5, '#ffe2b8', 0.5], [-0.32, -0.12, '#e8553a', 0.6], [0.05, 0.22, '#ffb27a', 0.5], [0.4, 0.62, '#c43c46', 0.55]] },
    teal: { c: ['#9ff3ff', '#3a9be0', '#1d2f86'], glow: '#4fc9ff', tilt: -0.12, atmo: [190, 245, 255],
      bands: [[-0.5, -0.36, '#c6f8ff', 0.5], [-0.05, 0.1, '#2f74c9', 0.55], [0.32, 0.5, '#7fdcff', 0.4]] },
    moon: { c: ['#e8e6ff', '#a7a2d8', '#4a3f8c'], craters: true },
  };
  function planet(x, cx, cy, r, pal, o = {}) {
    if (r <= 0.5) return;
    const ra = o.ringA == null ? 1 : o.ringA;
    if (pal.glow) glow(x, cx, cy, r * 1.7, pal.glow, o.glowA == null ? 0.32 : o.glowA);
    const R = pal.ring && { rx: pal.ring.rx * r, ry: pal.ring.ry * r, tilt: pal.ring.tilt, bands: pal.ring.bands };
    if (R) ring(x, cx, cy, R, 'back', ra);
    if (o.behind) o.behind(R);
    ball(x, cx, cy, r, pal.c, {
      sh: 0.34, sha: 0.55, rima: 0.35,
      inner: () => {
        x.save(); x.translate(cx, cy);
        if (pal.bands) bands(x, r, pal.bands, pal.tilt);
        if (pal.craters) { const q = H.rng(5); for (let i = 0; i < 5; i++) { const a = q.range(0, TAU), d = q.range(0.1, 0.65) * r, cr = q.range(0.1, 0.2) * r, qx = Math.cos(a) * d, qy = Math.sin(a) * d; x.fillStyle = 'rgba(80,66,150,0.38)'; x.beginPath(); x.arc(qx, qy, cr, 0, TAU); x.fill(); crescent(x, qx, qy, cr, -cr * 0.3, -cr * 0.3, 'rgba(255,255,255,0.3)'); } }
        x.restore();
      },
    });
    const atA = o.atmo == null ? 0.7 : o.atmo;
    if (pal.atmo && atA > 0) { // thin bright atmosphere on the limb, strongest on the lit (upper-left) side
      x.save(); x.lineCap = 'round'; const ga0 = x.globalAlpha;
      const la = -2.25, ag = x.createLinearGradient(cx + Math.cos(la) * r, cy + Math.sin(la) * r, cx - Math.cos(la) * r, cy - Math.sin(la) * r);
      ag.addColorStop(0, H.rgba(pal.atmo, 1)); ag.addColorStop(0.55, H.rgba(pal.atmo, 0.5)); ag.addColorStop(1, H.rgba(pal.atmo, 0.08));
      x.strokeStyle = ag;
      for (const [lw, a] of [[r * 0.05, 0.08], [r * 0.028, 0.16], [r * 0.014, 0.3], [Math.max(2, r * 0.006), 0.6]]) { x.globalAlpha = ga0 * a * atA; x.lineWidth = lw; x.beginPath(); x.arc(cx, cy, r + lw * 0.15, 0, TAU); x.stroke(); }
      x.restore();
    }
    if (R) ring(x, cx, cy, R, 'front', ra);
    if (o.front) o.front(R);
  }

  // ---------- print finish: fine animated grain + soft static mottling (overlay), kills gradient banding ----------
  let GRAIN = null;
  function grainTex() {
    if (GRAIN) return GRAIN;
    const S = 256, tile = H.layer(S, S), tc = tile.getContext('2d'), img = tc.createImageData(S, S), d = img.data, r = H.rng(4242);
    for (let i = 0; i < d.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 92; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    tc.putImageData(img, 0, 0);
    const MW = 320, MH = 180, mot = H.layer(MW, MH), mc = mot.getContext('2d'), mi = mc.createImageData(MW, MH), md = mi.data, nz = H.makeNoise(88);
    for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) { const v = 128 + nz.fbm2(x * 0.035, y * 0.035, 4) * 70 + nz.n2(x * 0.22, y * 0.22) * 14, k = (y * MW + x) * 4; md[k] = md[k + 1] = md[k + 2] = v; md[k + 3] = 255; }
    mc.putImageData(mi, 0, 0);
    GRAIN = { tile, mot };
    return GRAIN;
  }
  function finish(x, W, H_, t) {
    const G = grainTex(), f = Math.floor(t * 24);
    x.save(); x.globalCompositeOperation = 'overlay';
    x.globalAlpha = 0.12; x.imageSmoothingEnabled = true; x.drawImage(G.mot, 0, 0, W, H_);
    const pat = x.createPattern(G.tile, 'repeat'); pat.setTransform(new DOMMatrix().translateSelf((f * 73) % 256, (f * 151) % 256));
    x.globalAlpha = 0.09; x.fillStyle = pat; x.fillRect(0, 0, W, H_);
    x.restore();
  }

  // ---------- eyes (big white, dark pupils) ----------
  function eye(x, ex, ey, er, o) {
    const look = o.look || [0, 0];
    if ((o.happy || 0) > 0.5) {
      x.save(); x.strokeStyle = '#ffffff'; x.lineWidth = er * 0.42; x.lineCap = 'round';
      x.beginPath(); x.arc(ex, ey + er * 0.35, er * 0.62, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); x.restore(); return;
    }
    const bl = 1 - 0.92 * (o.blink || 0);
    x.save(); x.translate(ex, ey); x.scale(1, bl);
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(0, 0, er, 0, TAU); x.fill();
    const pr = er * (o.worry ? 0.5 : 0.56);
    const px = look[0] * er * 0.36, py = look[1] * er * 0.36;
    x.fillStyle = '#141638'; x.beginPath(); x.arc(px, py, pr, 0, TAU); x.fill();
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(px - pr * 0.35, py - pr * 0.4, pr * 0.32, 0, TAU); x.fill();
    x.beginPath(); x.arc(px + pr * 0.35, py + pr * 0.35, pr * 0.13, 0, TAU); x.fill();
    x.restore();
  }
  const blinkAt = (t, ph) => { const u = (t + ph) % 3.3; return u < 0.14 ? Math.sin((u / 0.14) * Math.PI) : 0; };

  // speech bubble with a tail
  function bubble(x, cx, cy, w, h, tx, ty, s, col) {
    if (s <= 0.01) return;
    x.save(); x.translate(cx, cy); x.scale(s, s);
    x.fillStyle = 'rgba(10,8,46,0.4)'; rr(x, -w / 2, -h / 2 + 8, w, h, h / 2); x.fill();
    x.fillStyle = col || '#ffffff';
    x.beginPath(); x.moveTo(-w * 0.18, h * 0.3); x.lineTo((tx - cx) / s, (ty - cy) / s); x.lineTo(-w * 0.02, h * 0.42); x.fill();
    rr(x, -w / 2, -h / 2, w, h, h / 2); x.fill();
    x.restore();
  }
  function badge(x, cx, cy, r, ok, s) {
    if (s <= 0.01) return;
    x.save(); x.translate(cx, cy); x.scale(s, s);
    glow(x, 0, 0, r * 2.4, ok ? C.green : C.red, 0.45);
    ball(x, 0, 0, r, ok ? ['#9fffc8', C.green, '#178a5a'] : ['#ff9aa8', C.red, '#9c1638'], { sha: 0.4 });
    x.strokeStyle = '#ffffff'; x.lineWidth = r * 0.26; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath();
    if (ok) { x.moveTo(-r * 0.42, 0); x.lineTo(-r * 0.1, r * 0.32); x.lineTo(r * 0.45, -r * 0.3); }
    else { x.moveTo(-r * 0.34, -r * 0.34); x.lineTo(r * 0.34, r * 0.34); x.moveTo(r * 0.34, -r * 0.34); x.lineTo(-r * 0.34, r * 0.34); }
    x.stroke(); x.restore();
  }
  function flare(x, cx, cy, k, t, seed) {
    if (k <= 0) return;
    glow(x, cx, cy, 420 * (0.6 + 0.4 * k), '#ffcf5a', 0.55 * k);
    glow(x, cx, cy, 160, '#fff6d0', 0.6 * k);
    x.save(); x.translate(cx, cy); x.rotate(t * 0.25); x.globalAlpha *= 0.32 * k; x.fillStyle = '#ffe28a';
    for (let i = 0; i < 12; i++) { x.rotate(TAU / 12); x.beginPath(); x.moveTo(0, -12); x.lineTo(330 + 60 * (i % 2), 0); x.lineTo(0, 12); x.fill(); }
    x.restore();
  }
  function burst(x, cx, cy, age, seed, spread) {
    if (age < 0 || age > 1.4) return;
    const r = H.rng(seed);
    for (let i = 0; i < 18; i++) {
      const a = r.range(0, TAU), d = (spread || 300) * r.range(0.45, 1) * eo(cl(age / 0.9)), sz = r.range(7, 16) * (1 - cl(age / 1.4));
      spark(x, cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.8, sz, r.pick(['#ffffff', '#ffe28a', '#9ff7ff', '#ffb0d0']), 1);
    }
  }

  // ---------- galaxy of examples (precomputed) ----------
  let GAL = null;
  function galaxyPts() {
    if (GAL) return GAL;
    const r = H.rng(901); GAL = [];
    for (let i = 0; i < 2600; i++) {
      const arm = i % 3, u = Math.pow(r(), 0.85), rr2 = 260 + 5300 * u;
      const ang = arm * (TAU / 3) + rr2 * 0.00075 + r.gauss() * (0.16 + 0.25 * (1 - u));
      GAL.push({ rr: rr2 * (1 + r.gauss() * 0.04), a: ang, s: r.range(1.2, 3.2), c: r.pick(['#ff9a4a', '#ffcc7a', '#ecb676', '#ffffff', '#9ff7ff', '#ff8fb8']) });
    }
    return GAL;
  }
  function galaxy(x, cx, cy, s, rot, a) {
    if (a <= 0.01) return;
    glow(x, cx, cy, 5600 * s * 0.55, '#8a5cff', 0.35 * a);
    glow(x, cx, cy, 5600 * s * 0.22, '#ffcf7a', 0.4 * a);
    x.save(); x.globalAlpha = a;
    for (const p of galaxyPts()) {
      const ang = p.a + rot, d = p.rr * s;
      if (d < 14) continue;
      const px = cx + Math.cos(ang) * d, py = cy + Math.sin(ang) * d * 0.52;
      if (px < -5 || px > 1285 || py < -5 || py > 725) continue;
      x.fillStyle = p.c; x.beginPath(); x.arc(px, py, p.s, 0, TAU); x.fill();
    }
    x.restore();
  }
  function drawArrowGlyph(x, cx, cy) {
    x.beginPath(); rr(x, cx - 42, cy - 9, 56, 18, 9); x.fill();
    x.beginPath(); x.moveTo(cx + 4, cy - 26); x.lineTo(cx + 40, cy); x.lineTo(cx + 4, cy + 26); x.closePath();
    x.lineJoin = 'round'; x.lineWidth = 10; x.strokeStyle = x.fillStyle; x.fill(); x.stroke();
  }

// ---------- CHARACTER KIT v2: the house presenter as a modular rig (see references/character-recipe.md) ----------
// rig(opts) -> skeleton (3D joints J, projected joints S); drawRig(x, R, opts) draws it from separate PART functions that all
// meet at the same named joints; person(x, cx, cy, height, opts) = both, in world units. Body units: % of height, feet at 0,
// y up negative, x = the character's left (screen-right when he faces camera), z = his forward.
const HUM = {
  skin: ['#ffdcc2', '#f6b28b', '#d27a5a'],
  hair: ['#3b4585', '#181c46', '#0a0c24'],
  hood: ['#5062c8', '#2b3678', '#161b4c'],
  jeans: ['#626b9e', '#3a4174', '#222850'],
  tee: '#f5f5fc', shoe: ['#ffffff', '#e8eaf5', '#a9aec4'], mouth: '#7a2b3b', tongue: '#f08a96', blush: '#ff8fa3', ink: '#151838',
};
const D2R = Math.PI / 180;
const BODY = { pelvis: -46, hipX: 5, shoulderX: 12, shoulderY: -28, neckY: -31, headY: -43, upperArm: 16, forearm: 14.5, thigh: 23, shin: 21, ankle: 2.6, sitDrop: 22 };
const VIEWS = { front: 0, '3/4': 45, side: 90, '3/4back': 135, back: 180 }; // add '-left' for the mirrored views
// Hand shapes are finger data: curl [thumb, index, middle, ring, pinky] (0 straight .. 1 folded), spread (rad between fingers),
// roll (0 back of hand to camera .. 0.5 side-on .. 1 palm to camera; override per pose with rollR / rollL), plus a few specials.
// A pose can also pass its own object, e.g. handL: { curl: [1, 0, 0, 0.5, 1], spread: 0.2, roll: 1 }.
const HANDSHAPES = {
  fist:       { curl: [1, 1, 1, 1, 1], roll: 0 },
  grip:       { curl: [0.9, 0.85, 0.85, 0.85, 0.85], roll: 0, grip: [2.9, 0.3] },
  point:      { curl: [1, 0, 1, 1, 1], roll: 0 },
  open:       { curl: [0.25, 0.1, 0.1, 0.15, 0.2], spread: 0.12, roll: 0.25 },
  palm:       { curl: [0, 0, 0, 0, 0], spread: 0.3, roll: 1 },
  type:       { curl: [0.5, 0.55, 0.55, 0.55, 0.55], roll: 0, typing: true },
  pinch:      { curl: [0.4, 0.4, 1, 1, 1], roll: 0, pinch: true },
  peace:      { curl: [1, 0, 0, 1, 1], spread: 0.34, roll: 1 },
  ok:         { curl: [0, 0, 0, 0, 0], spread: 0.2, roll: 1, ok: true },
  thumbsUp:   { curl: [0, 1, 1, 1, 1], roll: 0.5, thumb: 'up' },
  thumbsDown: { curl: [0, 1, 1, 1, 1], roll: 0.5, thumb: 'down' },
  rock:       { curl: [1, 0, 1, 1, 0], spread: 0.28, roll: 1 },
  callMe:     { curl: [0, 1, 1, 1, 0], spread: 0.3, roll: 0.3 },
  one:        { curl: [1, 0, 1, 1, 1], roll: 1 },
  two:        { curl: [1, 0, 0, 1, 1], spread: 0.3, roll: 1 },
  three:      { curl: [1, 0, 0, 0, 1], spread: 0.22, roll: 1 },
  four:       { curl: [1, 0, 0, 0, 0], spread: 0.22, roll: 1 },
  five:       { curl: [0, 0, 0, 0, 0], spread: 0.3, roll: 1 },
  none:       null,
};
const HANDS = Object.keys(HANDSHAPES);
const DEFAULT_POSE = { R: [-14, -44, 0], L: [14, -44, 0], handR: 'fist', handL: 'fist', elbowR: [-0.8, 0.6, -0.5], elbowL: [0.8, 0.6, -0.5],
  footR: [-5.5, -2.6, 0], footL: [5.5, -2.6, 0], sit: 0, crouch: 0, rise: 0, lean: 0, bend: 0, headUp: 0, headTurn: 0, tilt: 0, expr: 'neutral' };
// Hand targets are WRIST positions [x, y, z] in body units as if standing (sitting lowers them with the hips). R/L = his right/left.
const POSES = {
  standing:        { swing: true },
  handsInPocket:   { R: [-9, -47, 2], L: [9, -47, 2], handR: 'none', handL: 'none' },
  armsCrossed:     { R: [7, -59, 9], L: [-7, -61, 9], elbowR: [-1, 0.4, 0.6], elbowL: [1, 0.4, 0.6] },
  pointing:        { L: [40, -77, 6], handL: 'point', expr: 'excited' },
  pointingForward: { L: [10, -76, 30], handL: 'point' },
  presenting:      { L: [31, -58, 8], handL: 'palm', expr: 'happy' },
  showing:         { R: [-8, -64, 14], L: [8, -64, 14], handR: 'palm', handL: 'palm' },
  explaining:      { R: [-22, -62, 8], L: [22, -62, 8], handR: 'palm', handL: 'palm' },
  gesturing:       { R: [-27, -76, 6], L: [27, -76, 6], handR: 'open', handL: 'open', expr: 'happy' },
  thinking:        { R: [-2, -80, 6], L: [-6, -57, 8], elbowR: [-0.3, 1, 0.2], elbowL: [1, 0.5, 0], expr: 'thinking' },
  examining:       { R: [-2, -80, 7], L: [-6, -57, 9], elbowR: [-0.3, 1, 0.2], elbowL: [1, 0.5, 0], lean: 0.12, headUp: -0.25, expr: 'thinking' },
  onCall:          { R: [-7, -88, 4], handR: 'grip', holdR: 'phone', expr: 'happy' },
  holdingTablet:   { R: [-7, -58, 10], L: [7, -58, 10], handR: 'grip', handL: 'grip', holdBoth: 'tablet', headUp: -0.3 },
  drawingOnTablet: { L: [7, -60, 10], R: [-1, -63, 12], handL: 'grip', handR: 'pinch', holdL: 'tablet', holdR: 'pen', headUp: -0.4 },
  writing:         { L: [20, -60, 10], handL: 'pinch', holdL: 'pen' },
  celebrating:     { R: [-20, -113, 2], L: [20, -113, 2], expr: 'laughing' },
  relaxed:         { R: [-6, -96, -4], L: [6, -96, -4], handR: 'none', handL: 'none', expr: 'happy' },
  reacting:        { R: [-10, -66, 12], L: [10, -66, 12], handR: 'palm', handL: 'palm', lean: -0.12, expr: 'surprised' },
  reaching:        { L: [12, -92, 26], handL: 'open', lean: 0.08, headUp: 0.3 },
  leaningIn:       { R: [-6, -56, 16], L: [6, -56, 16], handR: 'type', handL: 'type', lean: 0.24, expr: 'thinking' },
  shrugging:       { R: [-20, -70, 6], L: [20, -70, 6], handR: 'palm', handL: 'palm', tilt: 0.12, expr: 'confused' },
  // seated (sit: 1); put chair() and desk() at the same cx, cy, height. Desk top is at -0.36 * height
  seated:          { R: [-6, -48, 14], L: [6, -48, 14], sit: 1 },
  typing:          { R: [-5, -60, 20], L: [5, -60, 20], handR: 'type', handL: 'type', sit: 1, elbowR: [-0.6, 0.6, -0.6], elbowL: [0.6, 0.6, -0.6] },
  workingAtMonitor:{ R: [-5, -60, 20], L: [5, -60, 20], handR: 'type', handL: 'type', sit: 1, elbowR: [-0.6, 0.6, -0.6], elbowL: [0.6, 0.6, -0.6], headUp: 0.15 },
  sketching:       { R: [-3, -60, 20], L: [9, -60, 18], handR: 'pinch', handL: 'type', holdR: 'pen', sit: 1, lean: 0.18, headUp: -0.45 },
  touchingScreen:  { R: [-5, -60, 20], L: [6, -78, 24], handR: 'type', handL: 'point', sit: 1, elbowR: [-0.6, 0.6, -0.6] },
  // hand gestures (his left hand, raised beside the face, forearm up)
  peaceSign:       { L: [17, -84, 8], handL: 'peace', elbowL: [0.6, 1, 0], expr: 'happy' },
  okSign:          { L: [16, -80, 9], handL: 'ok', elbowL: [0.6, 1, 0], expr: 'happy' },
  thumbsUp:        { L: [13, -64, 14], handL: 'thumbsUp', elbowL: [0.7, 1, -0.3], expr: 'happy' },
  thumbsDown:      { L: [13, -60, 14], handL: 'thumbsDown', elbowL: [0.7, 1, -0.3], expr: 'sad' },
  rockOn:          { L: [18, -96, 4], handL: 'rock', elbowL: [1, 0.6, 0], expr: 'excited' },
  waving:          { L: [22, -92, 4], handL: 'palm', elbowL: [1, 0.8, 0], expr: 'happy' },   // animate L[0] ± 4 with sin(t * 8)
  counting:        { L: [16, -82, 9], handL: 'three', elbowL: [0.6, 1, 0] },                // handL: 'one' .. 'five'
  // jumping: crouch (hips drop, feet planted), rise (whole body up), footR/footL (foot targets, standing coords, move with rise)
  jumpCrouch:      { crouch: 1, lean: 0.4, R: [-12, -40, -14], L: [12, -40, -14], expr: 'excited' },
  jumpTakeoff:     { rise: 8, lean: -0.05, R: [-16, -108, 6], L: [16, -108, 6], handR: 'open', handL: 'open', footR: [-5, -2.6, -2], footL: [5, -2.6, -2], expr: 'excited' },
  jumpAir:         { rise: 24, R: [-20, -112, 4], L: [20, -112, 4], handR: 'open', handL: 'open', footR: [-6, -20, 6], footL: [6, -18, 4], expr: 'laughing' },
  jumpLand:        { crouch: 0.8, lean: 0.25, R: [-14, -56, 14], L: [14, -56, 14], handR: 'open', handL: 'open', expr: 'happy' },
};
// a whole jump, u 0..1 (pass the result as pose; the figure stays on its ground line, the rig lifts itself)
const jumpPose = (u) => poseAt([[0, 'standing'], [0.18, 'jumpCrouch'], [0.32, 'jumpTakeoff'], [0.5, 'jumpAir'], [0.68, 'jumpTakeoff'], [0.84, 'jumpLand'], [1, 'standing']], u);
// brow: [[raise, innerDown] screen-left brow, same right]; eye: open | happy | wide | wink | tired
const EXPR = {
  neutral:   { eye: 'open', mouth: 'smile', brow: [[0, 0], [0, 0]] },
  happy:     { eye: 'happy', mouth: 'grin', brow: [[-0.4, -0.2], [-0.4, -0.2]], blush: 1 },
  excited:   { eye: 'wide', mouth: 'open', brow: [[-1, 0], [-1, 0]], blush: 1 },
  surprised: { eye: 'wide', mouth: 'o', brow: [[-1.4, 0], [-1.4, 0]] },
  thinking:  { eye: 'open', mouth: 'side', brow: [[-1, 0.3], [0.2, 0.4]], look: [0.6, -0.7] },
  sad:       { eye: 'open', mouth: 'frown', brow: [[-0.3, -1], [-0.3, -1]], look: [0, 0.5] },
  angry:     { eye: 'open', mouth: 'flat', brow: [[0.4, 1.2], [0.4, 1.2]] },
  confused:  { eye: 'open', mouth: 'squiggle', brow: [[-1.1, -0.3], [0.5, 0.6]], look: [-0.4, -0.4] },
  winking:   { eye: 'wink', mouth: 'grin', brow: [[-0.4, 0], [0.3, 0.4]] },
  laughing:  { eye: 'happy', mouth: 'open', brow: [[-0.6, -0.4], [-0.6, -0.4]], blush: 1 },
  tired:     { eye: 'tired', mouth: 'flat', brow: [[0.3, -0.6], [0.3, -0.6]], look: [0, 0.4] },
};

// ---- shading (light stays upper-left on screen; flipped inside mirrored local frames)
let HLX = Math.cos(-2.25), HLY = Math.sin(-2.25), HLA = -2.25;
const setLight = (mir) => { HLX = (mir ? -1 : 1) * Math.cos(-2.25); HLY = Math.sin(-2.25); HLA = mir ? Math.PI + 2.25 : -2.25; };
// dark base, two stepped crescent bands (lower-right), soft gradient body when g = [cx, cy, r] is given, thin rim (upper-left)
function flatShade(x, path, col, k, rim = true, g = null) {
  x.save(); x.beginPath(); path(); x.clip();
  x.fillStyle = col[2]; x.fillRect(-1e4, -1e4, 2e4, 2e4);
  x.save(); x.translate(HLX * k, HLY * k); x.beginPath(); path(); x.fillStyle = H.rgba(H.mix(col[1], col[2], 0.5)); x.fill(); x.restore();
  x.save(); x.translate(HLX * k * 2.2, HLY * k * 2.2); x.beginPath(); path();
  if (g) { const gr = x.createLinearGradient(g[0] + HLX * g[2], g[1] + HLY * g[2], g[0] - HLX * g[2], g[1] - HLY * g[2]); gr.addColorStop(0, H.rgba(H.mix(col[0], col[1], 0.45))); gr.addColorStop(1, col[1]); x.fillStyle = gr; }
  else x.fillStyle = col[1];
  x.fill(); x.restore();
  if (rim) { x.save(); x.translate(-HLX * k * 0.4, -HLY * k * 0.4); x.beginPath(); path(); x.strokeStyle = H.rgba(col[0], 0.55); x.lineWidth = k * 0.7; x.stroke(); x.restore(); }
  x.restore();
}
function limbStroke(x, pts, w, col) {
  const line = (dx, dy) => { x.beginPath(); x.moveTo(pts[0][0] + dx, pts[0][1] + dy); for (let i = 1; i < pts.length; i++) x.lineTo(pts[i][0] + dx, pts[i][1] + dy); x.stroke(); };
  x.save(); x.lineCap = 'round'; x.lineJoin = 'round';
  x.strokeStyle = col[2]; x.lineWidth = w; line(0, 0);
  x.strokeStyle = col[1]; x.lineWidth = w * 0.74; line(HLX * w * 0.12, HLY * w * 0.12);
  x.strokeStyle = H.rgba(col[0], 0.5); x.lineWidth = w * 0.2; line(HLX * w * 0.28, HLY * w * 0.28);
  x.restore();
}

// ---- skeleton
// 3D two-bone IK: the middle joint bends toward `pole`; returns [joint, end]
function ik3(s, t, l1, l2, pole) {
  let d = [t[0] - s[0], t[1] - s[1], t[2] - s[2]]; const dist = Math.hypot(d[0], d[1], d[2]) || 1e-3; d = d.map((v) => v / dist);
  const dc = Math.min(Math.max(dist, Math.abs(l1 - l2) + 1e-3), l1 + l2 - 1e-3);
  const a = (l1 * l1 + dc * dc - l2 * l2) / (2 * dc), h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const pd = pole[0] * d[0] + pole[1] * d[1] + pole[2] * d[2]; let pp = [pole[0] - pd * d[0], pole[1] - pd * d[1], pole[2] - pd * d[2]];
  const pl = Math.hypot(pp[0], pp[1], pp[2]) || 1; pp = pp.map((v) => v / pl);
  const e = [s[0] + d[0] * a + pp[0] * h, s[1] + d[1] * a + pp[1] * h, s[2] + d[2] * a + pp[2] * h];
  const f = [t[0] - e[0], t[1] - e[1], t[2] - e[2]], fl = Math.hypot(f[0], f[1], f[2]) || 1;
  return [e, [e[0] + (f[0] / fl) * l2, e[1] + (f[1] / fl) * l2, e[2] + (f[2] / fl) * l2]];
}
function viewYaw(o) {
  if (o.yaw != null) return o.yaw;
  if (o.view) { const left = /-left$/.test(o.view), v = VIEWS[o.view.replace(/-left$/, '')] || 0; return left ? -v : v; }
  if (o.back) return 180;
  return (o.turn || 0) * 90;
}
// pose = a POSES name or object, merged over DEFAULT_POSE; opts can override any pose key
function resolvePose(o) {
  const base = typeof o.pose === 'string' ? (POSES[o.pose] || {}) : (o.pose || {});
  const P = { ...DEFAULT_POSE, ...base };
  for (const k of ['R', 'L', 'handR', 'handL', 'rollR', 'rollL', 'holdR', 'holdL', 'holdBoth', 'elbowR', 'elbowL', 'footR', 'footL', 'crouch', 'rise', 'lean', 'bend', 'headUp', 'headTurn', 'tilt', 'expr', 'look']) if (o[k] != null) P[k] = o[k];
  if (o.sit != null) P.sit = o.sit === true ? 1 : o.sit === false ? 0 : o.sit;
  return P;
}
// blend two poses (names or objects), u 0..1. Numbers and arrays interpolate; hand shapes, props and expressions switch at 0.5.
function mixPose(a, b, u) {
  const A = resolvePose({ pose: a }), B = resolvePose({ pose: b }), out = {};
  for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) {
    const va = A[k], vb = B[k];
    if (Array.isArray(va) && Array.isArray(vb)) out[k] = va.map((v, i) => lerp(v, vb[i] == null ? v : vb[i], u));
    else if (typeof va === 'number' || typeof vb === 'number') out[k] = lerp(+va || 0, +vb || 0, u);
    else out[k] = u < 0.5 ? (va === undefined ? vb : va) : (vb === undefined ? va : vb);
  }
  return out;
}
// keyframed pose: keys = [[time, pose], ...] in order; eased between keys
function poseAt(keys, t) {
  if (t <= keys[0][0]) return mixPose(keys[0][1], keys[0][1], 0);
  for (let i = 0; i < keys.length - 1; i++) { const [t0, p0] = keys[i], [t1, p1] = keys[i + 1]; if (t <= t1) return mixPose(p0, p1, eio(seg(t, t0, t1))); }
  const last = keys[keys.length - 1][1]; return mixPose(last, last, 0);
}
// opts: pose, view | yaw | turn | back, walk (phase rad), stride, reachL/reachR ([world x, y]; with reachTip the fingertip lands there),
// plus any pose key. _world = { cx, cy, u } is set by person() so world reach targets can be converted.
function rig(o = {}) {
  const P = resolvePose(o), yaw = viewYaw(o), th = yaw * D2R, cs = Math.cos(th), sn = Math.sin(th);
  const sit = P.sit || 0, rise = P.rise || 0, off = BODY.sitDrop * sit + 14 * (P.crouch || 0) - rise, br = Math.sin((o.t || 0) * 2.2) * 0.35;
  const pel = [0, BODY.pelvis + off, 0], cL = Math.cos(P.lean), sL = Math.sin(P.lean), cB = Math.cos(P.bend), sB = Math.sin(P.bend);
  const up = (p) => { let [x0, y0, z0] = p; const y1 = y0 * cL + z0 * sL, z1 = -y0 * sL + z0 * cL; return [pel[0] + x0 * cB - y1 * sB, pel[1] + x0 * sB + y1 * cB, pel[2] + z1]; };
  const J = { pelvis: pel, neck: up([0, BODY.neckY + br * 0.3, 0]), head: up([0, BODY.headY + br * 0.4, 0]),
    shoulderR: up([-BODY.shoulderX, BODY.shoulderY + br * 0.3, 0]), shoulderL: up([BODY.shoulderX, BODY.shoulderY + br * 0.3, 0]),
    hipR: [-BODY.hipX, pel[1], 0], hipL: [BODY.hipX, pel[1], 0] };
  // legs
  let fR, fL;
  if (o.walk != null) { const A = 11 * (o.stride || 1), p = o.walk; fR = [-5.5, -BODY.ankle - Math.max(0, Math.cos(p)) * 4.5, Math.sin(p) * A]; fL = [5.5, -BODY.ankle - Math.max(0, -Math.cos(p)) * 4.5, -Math.sin(p) * A]; }
  else { fR = [P.footR[0] - 0.5 * sit, P.footR[1] - rise, P.footR[2] + 18 * sit]; fL = [P.footL[0] + 0.5 * sit, P.footL[1] - rise, P.footL[2] + 18 * sit]; }
  [J.kneeR, J.ankleR] = ik3(J.hipR, fR, BODY.thigh, BODY.shin, [0, -0.2, 1]);
  [J.kneeL, J.ankleL] = ik3(J.hipL, fL, BODY.thigh, BODY.shin, [0, -0.2, 1]);
  // arms
  const W = o._world;
  const target = (k) => {
    const s = J['shoulder' + k], reach = o['reach' + k];
    let tg;
    if (reach && W) {
      const bx = (reach[0] - W.cx) / W.u, by = (reach[1] - W.cy) / W.u; let xs = s[0] * 0.5, z;
      if (Math.abs(sn) > 0.25) z = (bx - xs * cs) / sn; else { z = 10; xs = (bx - z * sn) / cs; }
      tg = [xs, by, z];
      if (o.reachTip) { // the fingertip (not the wrist) lands on the point: pull the wrist back by the hand's length
        const tip = { point: 6.6, one: 6.6, open: 6.4, palm: 6.8, five: 6.8, peace: 6.8, type: 5, pinch: 5.1 }[P['hand' + k]] || 3.8;
        const d = [tg[0] - s[0], tg[1] - s[1], tg[2] - s[2]], l = Math.hypot(d[0], d[1], d[2]) || 1; tg = tg.map((v, i) => v - (d[i] / l) * tip); }
    } else if (o.walk != null && P.swing) tg = [s[0] * 1.15, s[1] + 28, Math.sin(o.walk + (k === 'R' ? Math.PI : 0)) * 10];
    else { const h = P[k]; tg = [h[0], h[1] + off, h[2] || 0]; }
    return tg;
  };
  [J.elbowR, J.wristR] = ik3(J.shoulderR, target('R'), BODY.upperArm, BODY.forearm, P.elbowR);
  [J.elbowL, J.wristL] = ik3(J.shoulderL, target('L'), BODY.upperArm, BODY.forearm, P.elbowL);
  // orthographic projection by yaw: [screen x, screen y, depth toward camera]
  const S = {};
  for (const k in J) { const p = J[k]; S[k] = [p[0] * cs + p[2] * sn, p[1], -p[0] * sn + p[2] * cs]; }
  const spine = Math.atan2(S.neck[0] - S.pelvis[0], -(S.neck[1] - S.pelvis[1]));
  return { J, S, P, yaw, cs, sn, spine, headYaw: yaw + (P.headTurn || 0), t: o.t || 0 };
}
// a joint of a rig drawn by person(x, cx, cy, height, ...) in world coordinates
const worldJoint = (R, cx, cy, Hh, name) => [cx + R.S[name][0] * Hh / 100, cy + R.S[name][1] * Hh / 100];

// ---- hands: local frame at the wrist, x along the forearm, thumb on -y
function handFrame(R, k) {
  const w = R.S['wrist' + k], e = R.S['elbow' + k], dx = w[0] - e[0], dy = w[1] - e[1];
  const dir = Math.atan2(dy, dx), sc = cl(Math.hypot(dx, dy) / BODY.forearm, 0.5, 1);
  const flip = (k === 'R' ? 1 : -1) * (R.cs >= -0.2 ? 1 : -1), c = Math.cos(dir), s = Math.sin(dir);
  return { w, dir, flip, at: (px, py) => [w[0] + px * sc * c - py * flip * s, w[1] + px * sc * s + py * flip * c] };
}
// a hand from finger data (HANDSHAPES name or object). Roll narrows the hand toward side-on and swaps the thumb side past it;
// the palm side shows a lighter pad and a crease, the back shows knuckles where fingers fold.
function drawHand(x, R, k, shape) {
  const spec = shape && typeof shape === 'object' ? shape : HANDSHAPES[shape || 'fist'];
  if (!spec) return null;
  const F = handFrame(R, k), rp = R.P['roll' + k], roll = rp != null ? rp : (spec.roll || 0), cr = Math.cos(roll * Math.PI);
  const ys = Math.max(0.4, Math.abs(cr)), ts = cr >= 0 ? 1 : -1;
  const A = (px, py) => F.at(px, py * ys * ts), sk = HUM.skin, cu = spec.curl || [1, 1, 1, 1, 1], sp = spec.spread == null ? 0.1 : spec.spread;
  const line = (pts, w) => limbStroke(x, pts, w, sk);
  const knob = (p, r) => ball(x, p[0], p[1], r, sk, { sha: 0.35, la: HLA, rima: 0.25 });
  const pc = A(2.3, 0);
  flatShade(x, () => x.ellipse(pc[0], pc[1], 2.35, 2.1 * ys + 0.15, F.dir, 0, TAU), sk, 0.35);
  if (roll > 0.5) { // palm side
    const pp = A(2.6, 0.2); x.fillStyle = H.rgba(sk[0], 0.55); x.beginPath(); x.ellipse(pp[0], pp[1], 1.35, 1.05 * ys + 0.1, F.dir, 0, TAU); x.fill();
    const a = A(1.6, -0.9), m = A(2.5, 0.1), b = A(3.3, 1.0); x.strokeStyle = H.rgba(sk[2], 0.45); x.lineWidth = 0.22; x.beginPath(); x.moveTo(a[0], a[1]); x.quadraticCurveTo(m[0], m[1], b[0], b[1]); x.stroke();
  }
  const FB = [-1.3, -0.45, 0.45, 1.3], FL = [3.0, 3.4, 3.1, 2.5], FW = [1.05, 1.1, 1.02, 0.9];
  let grip = spec.grip ? A(spec.grip[0], spec.grip[1]) : A(2.8, 0.3), indexTip = null;
  for (let i = 0; i < 4; i++) {
    const c = cu[i + 1], yb = FB[i] * 0.95;
    if ((spec.ok || spec.pinch) && i === 0) continue; // the index finger is drawn with the thumb below
    if (c >= 0.75) { knob(A(3.9, yb), 0.74); continue; }
    const a = (i - 1.5) * sp, l = FL[i] * (1 - 0.85 * c);
    let tip = A(3.6 + Math.cos(a) * l, yb + Math.sin(a) * l);
    if (spec.typing) { const t0 = A(4.5, yb * 0.95); tip = [t0[0], t0[1] + 1.7]; }
    line([A(3.6, yb), tip], FW[i]);
    if (i === 0) indexTip = tip;
  }
  const tb = A(1.3, -1.5), tc = cu[0];
  if (spec.ok) { const rc = A(4.5, -1.55), r = 1.2, pts = []; for (let j = 0; j <= 18; j++) { const a = (j / 18) * TAU; pts.push([rc[0] + Math.cos(a) * r, rc[1] + Math.sin(a) * r]); } line([tb, A(3.5, -2.2)], 1.15); line(pts, 0.95); }
  else if (spec.pinch) { const m = A(5.1, -0.9); line([A(3.6, -1.24), m], 1.05); line([tb, m], 1.1); grip = m; }
  else if (spec.thumb) { const s = spec.thumb === 'up' ? -1 : 1, e = [tb[0], tb[1] + s * 3.8]; line([tb, e], 1.3); grip = e; }
  else if (tc >= 0.75) line([tb, A(3.1, -0.25)], 1.1);
  else { const l = 3.2 * (1 - 0.5 * tc); line([tb, A(1.3 + l * 0.75, -1.5 - l * 0.7 * (1 - tc))], 1.15); }
  if (spec.typing) { const g0 = A(4.5, 0); grip = [g0[0], g0[1] + 1.7]; }
  else if (!spec.grip && !spec.pinch && !spec.thumb && indexTip && cu[2] >= 0.75) grip = indexTip; // pointing: the fingertip
  return { grip, dir: F.dir, flip: F.flip, roll };
}
function heldProp(x, kind, p, dir, o = {}) {
  x.save();
  if (kind === 'phone') { x.translate(p[0], p[1]); x.rotate(dir + Math.PI / 2); x.fillStyle = '#1b1f3f'; rr(x, -1.8, -3.8, 3.6, 7.2, 0.9); x.fill(); x.fillStyle = H.rgba(C.cyan, 0.75); rr(x, -1.3, -3.2, 2.6, 5.8, 0.5); x.fill(); }
  else if (kind === 'tablet') {
    x.translate(p[0], p[1]); x.fillStyle = '#1d2350'; rr(x, -7.5, -5.5, 15, 11, 1.3); x.fill();
    const g = x.createLinearGradient(-6, -5, 6, 5); g.addColorStop(0, '#7f9cff'); g.addColorStop(1, '#3a55d9'); x.fillStyle = g; rr(x, -6.6, -4.6, 13.2, 9.2, 0.8); x.fill();
    if (o.sketch != null) { x.strokeStyle = '#ffffff'; x.lineWidth = 0.5; x.lineCap = 'round'; x.beginPath(); const n = Math.floor(cl(o.sketch) * 24); for (let i = 0; i <= n; i++) { const u = i / 24, px = -5 + u * 10, py = Math.sin(u * 7) * 2; i ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
  }
  else if (kind === 'pen') { const a = dir + 0.6, ca = Math.cos(a), sa = Math.sin(a); x.lineCap = 'round'; x.strokeStyle = '#f2f4ff'; x.lineWidth = 0.95; x.beginPath(); x.moveTo(p[0] - ca * 5.5, p[1] - sa * 5.5); x.lineTo(p[0] + ca * 1.2, p[1] + sa * 1.2); x.stroke(); x.fillStyle = HUM.ink; x.beginPath(); x.arc(p[0] + ca * 1.3, p[1] + sa * 1.3, 0.45, 0, TAU); x.fill(); }
  else if (kind === 'mug') { x.fillStyle = '#e8eaf5'; rr(x, p[0] - 2, p[1] - 3, 4, 4.6, 0.8); x.fill(); x.strokeStyle = '#e8eaf5'; x.lineWidth = 0.7; x.beginPath(); x.arc(p[0] + 2.1, p[1] - 0.8, 1.1, -1.3, 1.3); x.stroke(); }
  x.restore();
}

// ---- head (local frame, facing right when mirrored; t = |sin(head yaw)|)
function humanHead(x, hc, t, rear, exName, o) {
  const E = EXPR[exName] || EXPR.neutral, prof = t > 0.78, fy = -(o.headUp || 0) * 1.8;
  const headPath = () => x.ellipse(hc[0], hc[1], 8.7 * (1 - 0.08 * t), 9.5, 0, 0, TAU);
  const E2 = (cx, cy, rx, ry, rot) => { x.moveTo(cx + rx * Math.cos(rot), cy + rx * Math.sin(rot)); x.ellipse(cx, cy, rx, ry, rot, 0, TAU); };
  const fx = hc[0] + t * 4.2;
  if (!rear && t < 0.6) for (const sd of [-1, 1]) ball(x, hc[0] + sd * 8.3 * (1 - 0.4 * t) - t * 1.5, hc[1] + 1 + fy * 0.3, 1.8, HUM.skin, { sha: 0.4, la: HLA, rima: 0.2 });
  flatShade(x, headPath, HUM.skin, 1.1, true, [hc[0], hc[1], 9]);
  if (!rear && prof) ball(x, hc[0] + 7.7, hc[1] + 2 + fy, 1.3, HUM.skin, { sha: 0.3, la: HLA, rima: 0.2 });
  if (!rear && t >= 0.6) ball(x, hc[0] - 2.6, hc[1] + 1, 1.9, HUM.skin, { sha: 0.45, la: HLA, rima: 0.2 });
  const hx = hc[0] - t * 1.3, hy = hc[1];
  const hairPath = () => {
    if (rear) E2(hc[0] - t * 1.6, hy - 0.6, 9.1, 9.8, 0); else E2(hx, hy - 6, 9.3, 4.7, 0);
    E2(hx - 5, hy - 9, 3.5, 2.8, -0.4); E2(hx - 1.2, hy - 10.4, 3.7, 2.9, 0.1); E2(hx + 3, hy - 9.8, 3.5, 2.7, 0.4); E2(hx + 6.6, hy - 7.6, 2.7, 2.4, 0.7);
    if (!rear) {
      for (const k of [-5.6, -2.8, 0, 2.8, 5.4]) E2(fx + k * (1 - 0.4 * t), hy - 4.4 + Math.abs(k) * 0.12 + fy * 0.5, 1.95, 3.4, -0.45 - t * 0.25);
      if (t < 0.5) { E2(hc[0] - 7.7 * (1 - 0.4 * t) - t, hy - 2.5, 1.8, 3.2, 0.15); E2(hc[0] + 7.7 * (1 - 0.4 * t) - t, hy - 2.5, 1.8, 3.2, -0.15); }
      else E2(hc[0] - 4.9, hy - 3, 4.3, 5.5, 0.3);
    }
  };
  flatShade(x, hairPath, HUM.hair, 0.9, false);
  x.save(); x.beginPath(); hairPath(); x.clip(); x.fillStyle = H.rgba(HUM.hair[0], 0.45);
  x.beginPath(); x.ellipse(hx - 3.2, hy - 9.8, 3.6, 1.3, -0.35, 0, TAU); x.fill(); x.beginPath(); x.ellipse(hx + 1.4, hy - 11, 2.2, 0.9, 0.1, 0, TAU); x.fill(); x.restore();
  if (rear) { if (t > 0.3) ball(x, hc[0] + 7.9, hc[1] + 1.5, 1.8, HUM.skin, { sha: 0.45, la: HLA, rima: 0.2 }); return; }
  const look = o.look || E.look || [0, 0], ey = hc[1] + 0.9 + fy;
  const eyes = prof ? [[fx - 0.4, 1]] : [[fx - 3.2 * (1 - 0.3 * t), -1], [fx + 3.2 * (1 - 0.3 * t), 1]];
  for (const [exx, sd] of eyes) {
    const kind = E.eye === 'wink' ? (sd > 0 ? 'happy' : 'open') : E.eye, sc = !prof && sd < 0 ? 1 - 0.35 * t : 1;
    x.save(); x.translate(exx + look[0] * 0.55, ey + look[1] * 0.45); x.scale(sc, 1);
    if (kind === 'happy') { x.strokeStyle = HUM.ink; x.lineWidth = 0.75; x.lineCap = 'round'; x.beginPath(); x.arc(0, 0.7, 1.3, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); }
    else {
      const big = kind === 'wide' ? 1.25 : 1; x.scale(1, 1 - 0.9 * (o.blink || 0));
      x.fillStyle = HUM.ink; x.beginPath(); x.ellipse(0, 0, 1.08 * big, 1.5 * big, 0, 0, TAU); x.fill();
      x.fillStyle = '#ffffff'; x.beginPath(); x.arc(-0.35 * big, -0.5 * big, 0.4 * big, 0, TAU); x.fill();
      if (kind === 'tired') { x.fillStyle = HUM.skin[1]; x.fillRect(-1.6, -2.2, 3.2, 2.1); x.strokeStyle = HUM.ink; x.lineWidth = 0.45; x.beginPath(); x.moveTo(-1.3, -0.1); x.lineTo(1.3, -0.1); x.stroke(); }
    }
    x.restore();
    const bw = E.brow[sd < 0 ? 0 : 1], by0 = ey - 3.0 + bw[0], inner = prof ? 1 : -sd;
    x.save(); x.strokeStyle = HUM.hair[2]; x.lineWidth = 0.85; x.lineCap = 'round'; x.beginPath();
    x.moveTo(exx + inner * 1.5 * sc, by0 + bw[1] * 0.6); x.lineTo(exx - inner * 1.6 * sc, by0 - bw[1] * 0.6); x.stroke(); x.restore();
  }
  if (!prof) { x.save(); x.strokeStyle = HUM.skin[2]; x.lineWidth = 0.55; x.lineCap = 'round'; x.beginPath(); x.arc(fx + t * 1.6, ey + 2.1, 0.7, 0.1 * Math.PI, 0.9 * Math.PI); x.stroke(); x.restore(); }
  const mx = prof ? fx + 0.8 : fx + t * 0.6, my = hc[1] + 5.3 + fy;
  x.save(); x.lineCap = 'round'; x.strokeStyle = HUM.ink; x.lineWidth = 0.55; x.fillStyle = HUM.mouth;
  if (E.mouth === 'smile') { x.beginPath(); x.arc(mx, my - 1.2, 1.7, 0.25 * Math.PI, 0.75 * Math.PI); x.stroke(); }
  else if (E.mouth === 'grin' || E.mouth === 'open') {
    const d = E.mouth === 'open' ? 3.6 : 2.4, w2 = 2.3 * (prof ? 0.6 : 1);
    x.beginPath(); x.moveTo(mx - w2, my - 0.6); x.quadraticCurveTo(mx, my - 1.0, mx + w2, my - 0.6);
    x.quadraticCurveTo(mx + w2 * 0.6, my - 0.6 + d, mx, my - 0.6 + d); x.quadraticCurveTo(mx - w2 * 0.6, my - 0.6 + d, mx - w2, my - 0.6); x.fill();
    x.save(); x.clip(); x.fillStyle = '#ffffff'; x.fillRect(mx - w2, my - 1.2, w2 * 2, 0.95); x.fillStyle = HUM.tongue; x.beginPath(); x.ellipse(mx, my - 0.6 + d, w2 * 0.55, d * 0.4, 0, 0, TAU); x.fill(); x.restore();
  }
  else if (E.mouth === 'o') { x.beginPath(); x.ellipse(mx, my, 0.9, 1.25, 0, 0, TAU); x.fill(); }
  else if (E.mouth === 'frown') { x.beginPath(); x.arc(mx, my + 1.3, 1.6, 1.2 * Math.PI, 1.8 * Math.PI); x.stroke(); }
  else if (E.mouth === 'flat') { x.beginPath(); x.moveTo(mx - 1.3, my); x.lineTo(mx + 1.3, my); x.stroke(); }
  else if (E.mouth === 'side') { x.beginPath(); x.moveTo(mx - 0.6, my + 0.2); x.quadraticCurveTo(mx + 0.6, my + 0.3, mx + 1.7, my - 0.4); x.stroke(); }
  else if (E.mouth === 'squiggle') { x.beginPath(); x.moveTo(mx - 1.6, my); x.quadraticCurveTo(mx - 0.8, my - 0.8, mx, my); x.quadraticCurveTo(mx + 0.8, my + 0.8, mx + 1.6, my); x.stroke(); }
  if (E.blush) { x.fillStyle = H.rgba(HUM.blush, 0.35); for (const [bx] of eyes) { x.beginPath(); x.ellipse(bx + (prof ? 0.5 : 0), ey + 2.7, 1.3, 0.7, 0, 0, TAU); x.fill(); } }
  x.restore();
}

// ---- PARTS: each draws one piece of a rig R between its named joints (in body units; person() sets up the scale)
const PART = {
  thigh(x, R, k) { limbStroke(x, [R.S['hip' + k], R.S['knee' + k]], 7.6, HUM.jeans); },
  shin(x, R, k) { limbStroke(x, [R.S['knee' + k], R.S['ankle' + k]], 7.2, HUM.jeans); },
  leg(x, R, k) { limbStroke(x, [R.S['hip' + k], R.S['knee' + k], R.S['ankle' + k]], 7.4, HUM.jeans); PART.shoe(x, R, k); },
  shoe(x, R, k) {
    const a = R.S['ankle' + k], dirS = R.sn >= 0 ? 1 : -1, len = 6.6 + 3.6 * Math.abs(R.sn);
    x.save(); x.translate(a[0], a[1] + BODY.ankle); x.scale(dirS, 1); setLight(dirS < 0);
    flatShade(x, () => rr(x, -3.3, -4.2, len, 4.2, 2), HUM.shoe, 0.55); x.fillStyle = HUM.shoe[2]; x.fillRect(-2.7, -1.1, len - 1.2, 1.1);
    x.restore(); setLight(false);
  },
  upperArm(x, R, k) { limbStroke(x, [R.S['shoulder' + k], R.S['elbow' + k]], 5.8, HUM.hood); },
  forearm(x, R, k) { limbStroke(x, [R.S['elbow' + k], R.S['wrist' + k]], 5.4, HUM.hood); PART.cuff(x, R, k); },
  arm(x, R, k) { limbStroke(x, [R.S['shoulder' + k], R.S['elbow' + k], R.S['wrist' + k]], 5.6, HUM.hood); PART.cuff(x, R, k); },
  cuff(x, R, k) { const w = R.S['wrist' + k], e = R.S['elbow' + k], d = Math.atan2(w[1] - e[1], w[0] - e[0]); x.fillStyle = HUM.hood[2]; x.beginPath(); x.arc(w[0] - Math.cos(d) * 1.1, w[1] - Math.sin(d) * 1.1, 2.7, 0, TAU); x.fill(); },
  hand(x, R, k, shape) { return drawHand(x, R, k, shape || R.P['hand' + k]); },
  neck(x, R) { const n = R.S.neck, h = R.S.head; limbStroke(x, [n, [lerp(n[0], h[0], 0.5), lerp(n[1], h[1], 0.5)]], 4.6, HUM.skin); },
  // the torso and hood live in a local frame: pelvis origin, spine up, mirrored when he faces left
  _torsoFrame(x, R, fn) {
    const P = R.S.pelvis, N = R.S.neck, len = Math.hypot(N[0] - P[0], N[1] - P[1]) / -BODY.neckY, mir = R.sn < 0;
    x.save(); x.translate(P[0], P[1]); x.rotate(R.spine); x.scale(mir ? -1 : 1, len); setLight(mir);
    fn(Math.abs(R.sn), 0.55 + 0.45 * Math.abs(R.cs)); x.restore(); setLight(false);
  },
  hood(x, R) { if (R.cs < -0.2) return; PART._torsoFrame(x, R, (t, w) => flatShade(x, () => x.ellipse(t * 1.5, BODY.neckY + 0.8, 8.6 * (0.6 + 0.4 * w), 3.8, 0, 0, TAU), HUM.hood, 0.6)); },
  torso(x, R) {
    PART._torsoFrame(x, R, (t, w) => {
      const tY = BODY.neckY, tx = t;
      const body = () => { const L = -13 * w + tx, Rr = 13 * w + tx; x.moveTo(L, -24); x.quadraticCurveTo(L, tY + 0.3, L + 5, tY); x.lineTo(Rr - 5, tY); x.quadraticCurveTo(Rr, tY + 0.3, Rr, -24); x.lineTo(Rr - 0.5 * w, 0.5); x.quadraticCurveTo(Rr - 0.5 * w, 3, Rr - 3, 3); x.lineTo(L + 3, 3); x.quadraticCurveTo(L + 0.5 * w, 3, L + 0.5 * w, 0.5); x.closePath(); };
      flatShade(x, body, HUM.hood, 1.6, true, [tx, -14, 16]);
      x.save(); x.beginPath(); body(); x.clip(); x.fillStyle = H.rgba(HUM.hood[2], 0.55); x.fillRect(-20, -0.2, 40, 3.4);
      if (R.cs > 0.2 && t < 0.8) {
        const zx = tx * 1.5 + t * 3.5, zw = 3.4 * (1 - 0.6 * t);
        x.fillStyle = HUM.tee; x.beginPath(); x.moveTo(zx - zw, tY - 0.5); x.quadraticCurveTo(zx, tY + 2.4, zx + zw, tY - 0.5); x.lineTo(zx + zw * 0.9, 3); x.lineTo(zx - zw * 0.9, 3); x.closePath(); x.fill();
        x.fillStyle = HUM.skin[1]; x.beginPath(); x.moveTo(zx - zw * 0.75, tY - 0.6); x.quadraticCurveTo(zx, tY + 1.8, zx + zw * 0.75, tY - 0.6); x.closePath(); x.fill();
        x.strokeStyle = H.rgba(HUM.hood[2], 0.8); x.lineWidth = 0.6; x.beginPath(); x.moveTo(zx - zw, tY); x.lineTo(zx - zw * 0.9, 3); x.moveTo(zx + zw, tY); x.lineTo(zx + zw * 0.9, 3); x.stroke();
        x.strokeStyle = HUM.shoe[1]; x.lineWidth = 0.55; x.lineCap = 'round'; x.beginPath(); x.moveTo(zx - zw - 0.8, tY + 1); x.lineTo(zx - zw - 1.0, tY + 7.5); x.moveTo(zx + zw + 0.8, tY + 1); x.lineTo(zx + zw + 1.0, tY + 7.5); x.stroke();
      }
      x.restore();
      if (R.cs < -0.2) { const hx = tx - t * 2; flatShade(x, () => { x.moveTo(-8 * w + hx, tY + 0.5); x.quadraticCurveTo(hx, tY + 18, 8 * w + hx, tY + 0.5); x.quadraticCurveTo(hx, tY - 3, -8 * w + hx, tY + 0.5); }, HUM.hood, 0.7); }
    });
  },
  head(x, R, o = {}) {
    const hp = R.S.head, hy = R.headYaw * D2R, t = Math.abs(Math.sin(hy)), rear = Math.cos(hy) < 0, mir = Math.sin(hy) < 0;
    const blink = o.blink != null ? o.blink : (o.t != null ? blinkAt(o.t, 0.7) : 0);
    x.save(); x.translate(hp[0], hp[1] + 8); x.rotate(R.spine + (R.P.tilt || 0)); x.translate(0, -8); if (mir) x.scale(-1, 1); setLight(mir);
    humanHead(x, [0, 0], t, rear, R.P.expr || 'neutral', { headUp: R.P.headUp, look: o.look || R.P.look, blink });
    x.restore(); setLight(false);
  },
  joint(x, p, r = 1.6, col = C.cyan) { glow(x, p[0], p[1], r * 3, col, 0.5); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(p[0], p[1], r * 0.55, 0, TAU); x.fill(); x.strokeStyle = col; x.lineWidth = r * 0.35; x.beginPath(); x.arc(p[0], p[1], r, 0, TAU); x.stroke(); },
  // skeleton overlay for anatomy beats: which = 'R' | 'L' | 'arms' | 'all'; highlight = a joint name to pulse
  bones(x, R, which = 'arms', o = {}) {
    const S = R.S, chains = [];
    for (const k of ['R', 'L']) if (which === 'all' || which === 'arms' || which === k) chains.push(['shoulder' + k, 'elbow' + k, 'wrist' + k]);
    if (which === 'all') { chains.push(['neck', 'pelvis'], ['shoulderR', 'shoulderL'], ['hipR', 'hipL']); for (const k of ['R', 'L']) chains.push(['hip' + k, 'knee' + k, 'ankle' + k]); }
    x.save(); x.lineCap = 'round'; x.strokeStyle = H.rgba(o.col || '#9ff7ff', 0.9); x.lineWidth = o.lw || 1.2;
    for (const c of chains) { x.beginPath(); c.forEach((n, i) => (i ? x.lineTo(S[n][0], S[n][1]) : x.moveTo(S[n][0], S[n][1]))); x.stroke(); }
    for (const c of chains) for (const n of c) PART.joint(x, S[n], n === o.highlight ? 2.6 * (1 + 0.15 * Math.sin((R.t || 0) * 8)) : 1.4, n === o.highlight ? (o.hcol || C.yellow) : (o.col || C.cyan));
    x.restore();
  },
};

// draw a whole rig in depth order from the parts
function drawRig(x, R, o = {}) {
  const S = R.S, P = R.P, depth = (k, a, b, c) => (S[a + k][2] + S[b + k][2] + S[c + k][2]) / 3;
  const legs = ['R', 'L'].map((k) => ({ k, d: depth(k, 'hip', 'knee', 'ankle') })).sort((a, b) => a.d - b.d);
  const arms = ['R', 'L'].map((k) => ({ k, d: depth(k, 'shoulder', 'elbow', 'wrist') })).sort((a, b) => a.d - b.d);
  const behind = arms.filter((a) => a.d < -3), front = arms.filter((a) => a.d >= -3);
  const hold = (k) => P['hold' + k];
  const handPass = (k) => { const pre = drawHandProps(x, R, k, 'before'); const h = PART.hand(x, R, k); if (h && hold(k) === 'pen') heldProp(x, 'pen', h.grip, h.dir); return h || pre; };
  for (const a of behind) { PART.arm(x, R, a.k); handPass(a.k); }
  for (const l of legs) PART.leg(x, R, l.k);
  PART.hood(x, R); PART.neck(x, R); PART.torso(x, R); PART.head(x, R, o);
  for (const a of front) PART.arm(x, R, a.k);
  // tablets sit between the sleeves and the hands
  if (P.holdBoth === 'tablet') heldProp(x, 'tablet', [(S.wristR[0] + S.wristL[0]) / 2, (S.wristR[1] + S.wristL[1]) / 2 - 2], 0, { sketch: o.sketch });
  for (const k of ['R', 'L']) if (hold(k) === 'tablet') { const w = S['wrist' + k], sd = w[0] > S.pelvis[0] ? -1 : 1; heldProp(x, 'tablet', [w[0] + sd * 6.5, w[1] - 1.5], 0, { sketch: o.sketch }); }
  for (const a of front) handPass(a.k);
}
function drawHandProps(x, R, k, when) {
  if (when === 'before' && R.P['hold' + k] === 'phone') { const F = handFrame(R, k), g = F.at(2.8, 0.3); heldProp(x, 'phone', g, F.dir); }
  if (when === 'before' && R.P['hold' + k] === 'mug') { const F = handFrame(R, k), g = F.at(3.4, 0); heldProp(x, 'mug', g, F.dir); }
  return null;
}
// the whole presenter in world units. opts: everything rig() takes, plus t (breathing + auto blink), blink, look, a, noShadow, noGlow, sketch
function person(x, cx, cy, Hh, o = {}) {
  if (Hh < 4) return null;
  const u = Hh / 100, R = rig({ ...o, _world: { cx, cy, u } });
  x.save(); x.translate(cx, cy); x.scale(u, u); x.globalAlpha *= o.a == null ? 1 : o.a;
  setLight(false);
  if (!o.noGlow) glow(x, R.S.pelvis[0], -55 + BODY.sitDrop * (R.P.sit || 0) * 0.5, 62, '#8aa2ff', 0.16);
  if (!(R.P.sit > 0.5) && !o.noShadow) { // stays on the ground; shrinks and fades as he rises
    const mx = (R.S.ankleR[0] + R.S.ankleL[0]) / 2, k = 1 / (1 + (R.P.rise || 0) / 18);
    x.fillStyle = `rgba(8,6,40,${0.35 * k})`; x.beginPath(); x.ellipse(mx, 0.4, 14 * (0.75 + 0.25 * Math.abs(R.cs)) * (0.6 + 0.4 * k), 2.2 * (0.6 + 0.4 * k), 0, 0, TAU); x.fill();
  }
  drawRig(x, R, o);
  if (o.bones) PART.bones(x, R, o.bones, { highlight: o.boneHighlight });
  x.restore();
  return R;
}

// ---- props in the same shading
// laptop: s = base width (px). view 'side' (hinge right, screen faces left), 'back' (lid to camera, user behind it),
// 'screen' (screen to camera, user in front of it: over-the-shoulder). content(x, w, h) draws on the screen (0,0 = top-left).
function laptop(x, cx, cy, s, o = {}) {
  const SIL = ['#f2f4ff', '#b8bfe0', '#636a96'], v = o.view || 'side';
  setLight(!!o.flip); x.save(); x.translate(cx, cy); if (o.flip) x.scale(-1, 1);
  if (v === 'side') {
    flatShade(x, () => rr(x, -s / 2, -s * 0.05, s, s * 0.05, s * 0.02), SIL, s * 0.012);
    x.save(); x.translate(s / 2 - s * 0.03, -s * 0.045); x.rotate(-(o.open == null ? 1.42 : o.open));
    flatShade(x, () => rr(x, 0, -s * 0.022, s * 0.9, s * 0.044, s * 0.02), SIL, s * 0.01);
    if (o.screen !== false) { x.fillStyle = H.rgba(C.cyan, 0.9); x.fillRect(s * 0.05, -s * 0.03, s * 0.8, s * 0.012); glow(x, s * 0.45, -s * 0.06, s * 0.35, '#56e8ff', 0.25 * (o.glowA == null ? 1 : o.glowA)); }
    x.restore();
  } else if (v === 'back') {
    flatShade(x, () => rr(x, -s * 0.55, -s * 0.035, s * 1.1, s * 0.035, s * 0.015), SIL, s * 0.01);
    flatShade(x, () => rr(x, -s / 2, -s * 0.68, s, s * 0.64, s * 0.035), SIL, s * 0.016);
    glow(x, 0, -s * 0.36, s * 0.12, '#ffffff', 0.5); x.fillStyle = 'rgba(255,255,255,0.85)'; x.beginPath(); x.arc(0, -s * 0.36, s * 0.035, 0, TAU); x.fill(); // generic badge, not a brand logo
  } else {
    flatShade(x, () => { x.moveTo(-s * 0.5, 0); x.lineTo(s * 0.5, 0); x.lineTo(s * 0.44, -s * 0.12); x.lineTo(-s * 0.44, -s * 0.12); x.closePath(); }, SIL, s * 0.01);
    x.fillStyle = '#2a3060'; x.beginPath(); x.moveTo(-s * 0.4, -s * 0.02); x.lineTo(s * 0.4, -s * 0.02); x.lineTo(s * 0.36, -s * 0.1); x.lineTo(-s * 0.36, -s * 0.1); x.closePath(); x.fill();
    flatShade(x, () => rr(x, -s * 0.47, -s * 0.74, s * 0.94, s * 0.62, s * 0.03), SIL, s * 0.012);
    screenFace(x, -s * 0.43, -s * 0.71, s * 0.86, s * 0.54, o);
  }
  x.restore(); setLight(false);
}
function screenFace(x, X, Y, w, h, o) {
  const g = x.createLinearGradient(X, Y, X + w, Y + h); g.addColorStop(0, '#1d2a7a'); g.addColorStop(1, '#0d1146');
  x.fillStyle = g; rr(x, X, Y, w, h, Math.min(w, h) * 0.04); x.fill();
  x.save(); rr(x, X, Y, w, h, Math.min(w, h) * 0.04); x.clip(); x.translate(X, Y);
  if (o.content) o.content(x, w, h);
  else { x.fillStyle = H.rgba(C.cyan, 0.5); for (let i = 0; i < 4; i++) rr(x, w * 0.08, h * (0.16 + i * 0.18), w * (0.5 - i * 0.08), h * 0.08, h * 0.04), x.fill(); x.fillStyle = H.rgba(C.yellow, 0.7); rr(x, w * 0.66, h * 0.16, w * 0.24, h * 0.6, h * 0.05); x.fill(); }
  x.restore(); glow(x, X + w / 2, Y + h / 2, Math.max(w, h) * 0.7, '#56e8ff', 0.12);
}
// monitor on a stand: s = width; view 'screen' | 'back' | 'side'; content(x, w, h) as for laptop. (cx, cy) = foot of the stand
function monitor(x, cx, cy, s, o = {}) {
  const SIL = ['#e8ebff', '#9aa3d4', '#4d5585'], v = o.view || 'screen', h = s * 0.6;
  x.save(); x.translate(cx, cy);
  flatShade(x, () => rr(x, -s * 0.18, -s * 0.03, s * 0.36, s * 0.03, s * 0.015), SIL, s * 0.008);
  flatShade(x, () => rr(x, -s * 0.03, -s * 0.24, s * 0.06, s * 0.22, s * 0.02), SIL, s * 0.008);
  if (v === 'side') flatShade(x, () => rr(x, -s * 0.025, -s * 0.24 - h, s * 0.05, h, s * 0.02), SIL, s * 0.008);
  else { flatShade(x, () => rr(x, -s / 2, -s * 0.22 - h, s, h, s * 0.025), SIL, s * 0.012); if (v === 'screen') screenFace(x, -s * 0.47, -s * 0.22 - h + s * 0.03, s * 0.94, h - s * 0.06, o); }
  x.restore();
}
// desk: top surface at cy; panel hides legs behind it (front views)
function desk(x, cx, cy, w, o = {}) {
  const B = ['#9aa8ff', '#4a5bc8', '#26307a'];
  flatShade(x, () => rr(x, cx - w / 2, cy, w, w * 0.035, w * 0.012), B, w * 0.006);
  if (o.panel !== false) flatShade(x, () => rr(x, cx - w * 0.47, cy + w * 0.03, w * 0.94, o.panelH || w * 0.32, w * 0.012), ['#5a6ad0', '#2f3b8a', '#1a2160'], w * 0.008);
}
// chair in person units: same (cx, cy, height) as the seated person. view 'side' (facing right; flip for left) | 'front' (draw before him) | 'back' (draw after him)
function chair(x, cx, cy, Hh, o = {}) {
  const u = Hh / 100, B = ['#7d93ff', '#3a55d9', '#1f2c86'], v = o.view || 'side';
  setLight(!!o.flip); x.save(); x.translate(cx, cy); x.scale(o.flip ? -u : u, u);
  x.strokeStyle = '#1b2266'; x.lineWidth = 1.6; x.lineCap = 'round';
  if (v === 'side') {
    x.beginPath(); x.moveTo(-7, -19); x.lineTo(-9, 0); x.moveTo(9, -19); x.lineTo(11, 0); x.stroke();
    flatShade(x, () => rr(x, -10, -21.5, 22, 3.2, 1.5), B, 0.6); flatShade(x, () => rr(x, -12.5, -47, 3.4, 27, 1.7), B, 0.6);
  } else if (v === 'front') {
    flatShade(x, () => rr(x, -13, -50, 26, 26, 4), B, 0.8);
    x.beginPath(); x.moveTo(-9, -19); x.lineTo(-10, 0); x.moveTo(9, -19); x.lineTo(10, 0); x.stroke();
    flatShade(x, () => rr(x, -12, -23, 24, 4, 1.8), B, 0.6);
  } else flatShade(x, () => rr(x, -12, -46, 24, 21, 4), B, 0.8);
  x.restore(); setLight(false);
}

const DURATION = 6;
const lab = (x, s, cx, cy) => pill(x, cx, cy, s, 22);
function sheetA(x, W, H_, t) {            // views, head angles, motion poses
  sky(x, W, H_, 0.6);
  const A = [['front', { view: 'front' }], ['3/4', { view: '3/4', expr: 'happy' }], ['side', { view: 'side' }], ['3/4 back', { view: '3/4back' }], ['back', { view: 'back' }],
    ['3/4 left', { view: '3/4-left', pose: 'presenting' }], ['up', { headUp: 1, look: [0, -1] }], ['down + tilt', { headUp: -1, look: [0, 1], tilt: 0.2 }]];
  A.forEach(([l, o], i) => { const px = 80 + i * 160; person(x, px, 320, 250, { t: 0.6, ...o }); lab(x, l, px, 345); });
  const B = [['pointing', { view: '3/4', pose: 'pointing' }], ['reacting', { pose: 'reacting' }], ['reaching', { view: '3/4', pose: 'reaching' }], ['leaning in', { view: '3/4', pose: 'leaningIn' }],
    ['shrugging', { pose: 'shrugging' }], ['celebrating', { pose: 'celebrating' }], ['walking', { view: 'side', walk: 0.9, expr: 'happy', pose: 'standing' }],
    ['standing up', { view: 'side', pose: { sit: 0.35, lean: 0.22, L: [8, -56, 12], R: [-8, -56, 12] } }]];
  B.forEach(([l, o], i) => { const px = 80 + i * 160; person(x, px, 660, 250, { t: 0.6, ...o }); lab(x, l, px, 685); });
}
function sheetB(x, W, H_, t) {            // heads: expressions and angles
  sky(x, W, H_, 0.6);
  const cells = ['neutral', 'happy', 'excited', 'surprised', 'thinking', 'sad', 'angry', 'confused', 'winking', 'laughing', 'tired',
    ['3/4 back', { view: '3/4back' }], ['profile', { view: 'side' }], ['up-right', { view: '3/4', headUp: 1, look: [0.6, -1], tilt: -0.12 }]];
  cells.forEach((c, i) => {
    const [l, o] = typeof c === 'string' ? [c, { expr: c }] : c;
    const col = i % 7, row = Math.floor(i / 7), cx = 95 + col * 182, cy = 200 + row * 330, Hh = 820, u = Hh / 100;
    x.save(); rr(x, cx - 84, cy - 150, 168, 270, 26); x.fillStyle = 'rgba(255,255,255,0.06)'; x.fill(); x.clip();
    person(x, cx, cy + 89 * u, Hh, { noGlow: true, noShadow: true, ...o });
    x.restore(); lab(x, l, cx, cy + 145);
  });
}
function sheetC(x, W, H_, t) {            // hands, exploded parts, pose blending
  sky(x, W, H_, 0.6);
  ['fist', 'point', 'open', 'palm', 'grip', 'type', 'pinch', 'none'].forEach((h, i) => {
    const cx = 80 + i * 160, cy = 100, s = 8, R = rig({ pose: { R: [-8, -76, 0], elbowR: [-0.2, 0.5, 0.8] } }), w = R.S.wristR;
    x.save(); rr(x, cx - 70, cy - 70, 140, 140, 22); x.fillStyle = 'rgba(255,255,255,0.06)'; x.fill(); x.clip();
    x.translate(cx - w[0] * s - 4, cy - w[1] * s + 18); x.scale(s, s); PART.forearm(x, R, 'R'); PART.hand(x, R, 'R', h); x.restore(); lab(x, h, cx, cy + 92);
  });
  // isolated, reusable parts: each drawn alone from the same joints, so any of them can be animated or swapped on its own
  const one = (cx, cy, s, anchor, view, fn) => { const R = rig({ pose: 'explaining', view }); x.save(); x.translate(cx, cy); x.scale(s, s); x.translate(-R.S[anchor][0], -R.S[anchor][1]); fn(R); x.restore(); };
  one(95, 345, 3.0, 'pelvis', 'front', (R) => { PART.hood(x, R); PART.torso(x, R); }); lab(x, 'torso', 95, 470);
  one(240, 330, 3.4, 'shoulderR', '3/4', (R) => { PART.arm(x, R, 'R'); PART.hand(x, R, 'R'); }); lab(x, 'arm + hand', 250, 470);
  one(470, 320, 3.0, 'shoulderR', '3/4', (R) => { PART.upperArm(x, R, 'R'); x.translate(-14, 18); PART.forearm(x, R, 'R'); x.translate(-14, 18); PART.hand(x, R, 'R'); }); lab(x, 'exploded arm', 450, 470);
  one(640, 310, 2.4, 'hipR', 'front', (R) => PART.leg(x, R, 'R')); lab(x, 'leg + shoe', 640, 470);
  one(790, 330, 4.2, 'neck', '3/4', (R) => { PART.neck(x, R); PART.head(x, R, {}); }); lab(x, 'head + neck', 790, 470);
  person(x, 930, 440, 130, { pose: 'explaining', view: 'front', bones: 'all', boneHighlight: 'elbowL', noGlow: true, noShadow: true }); lab(x, 'joints', 930, 458);
  person(x, 1110, 440, 130, { pose: 'typing', view: 'side', bones: 'arms', boneHighlight: 'wristR', noGlow: true, noShadow: true }); lab(x, 'arm rig, seated', 1110, 458);
  // blending: standing -> pointing, one function call per frame
  [0, 0.25, 0.5, 0.75, 1].forEach((u, i) => { const px = 110 + i * 150; person(x, px, 690, 200, { view: '3/4', pose: mixPose('standing', 'pointing', eio(u)), expr: 'excited', t: 0.6 }); lab(x, 'blend ' + u, px, 706); });
  person(x, 1130, 690, 200, { view: '3/4', pose: poseAt([[0, 'standing'], [1, 'showing'], [2, 'explaining']], 1.5), t: 0.6 }); lab(x, 'poseAt keyframes', 1130, 706);
}
function sheetD(x, W, H_, t) {            // typing + designer poses
  sky(x, W, H_, 0.6); const Hh = 230, fy = 640, dy = fy - 0.36 * Hh;
  const cells = [140, 330, 520, 720, 910, 1100, 1240];
  // 1. typing, side view
  chair(x, cells[0], fy, Hh); desk(x, cells[0] + 60, dy, 200, { panel: false }); laptop(x, cells[0] + 62, dy, 90);
  person(x, cells[0], fy, Hh, { view: 'side', pose: 'typing', t: 0.6 }); lab(x, 'typing: side', cells[0] + 30, 676);
  // 2. typing, front view (laptop lid to camera)
  chair(x, cells[1], fy, Hh, { view: 'front' }); person(x, cells[1], fy, Hh, { view: 'front', pose: 'typing', expr: 'thinking', t: 0.6 });
  laptop(x, cells[1], dy + 4, 84, { view: 'back' }); lab(x, 'typing: front', cells[1], 676);
  // 3. over the shoulder: we see his back, the screen faces us beyond him
  monitor(x, cells[2], dy - 6, 190, { view: 'screen', content: (g, w, h) => { g.fillStyle = H.rgba(C.cyan, 0.55); for (let i = 0; i < 5; i++) { rr(g, w * 0.08, h * (0.12 + i * 0.15), w * (0.62 - i * 0.07), h * 0.07, h * 0.035); g.fill(); } g.fillStyle = H.rgba(C.yellow, 0.8); rr(g, w * 0.72, h * 0.12, w * 0.2, h * 0.5, h * 0.05); g.fill(); } });
  desk(x, cells[2], dy, 230, { panel: false });
  person(x, cells[2], fy, Hh, { yaw: 168, pose: 'typing', t: 0.6 }); lab(x, 'over the shoulder', cells[2], 676);
  // 4. drawing on a tablet (seated, 3/4)
  person(x, cells[3], fy, Hh, { view: '3/4', pose: 'drawingOnTablet', sit: 1, expr: 'happy', t: 0.6, sketch: 0.8 }); lab(x, 'drawing on tablet', cells[3], 676);
  // 5. sketching
  chair(x, cells[4], fy, Hh); desk(x, cells[4] + 55, dy, 190, { panel: false });
  person(x, cells[4], fy, Hh, { view: 'side', pose: 'sketching', t: 0.6 }); lab(x, 'sketching', cells[4] + 20, 676);
  // 6. touching the screen: right hand lands on the screen glass (fingertip at the exact point)
  chair(x, cells[5], fy, Hh); desk(x, cells[5] + 50, dy, 190, { panel: false }); laptop(x, cells[5] + 40, dy, 90);
  person(x, cells[5], fy, Hh, { view: 'side', pose: 'typing', lean: 0.1, expr: 'tired', handL: 'point', reachL: [cells[5] + 82, dy - 50], reachTip: true, t: 0.6 }); lab(x, 'touching the screen', cells[5] + 30, 676);
}
function handCell(x, cx, cy, shape, roll, label) {           // forearm up, hand above the wrist
  const R = rig({ pose: { R: [-14, -86, 6], elbowR: [-0.6, 1, 0] } }); if (roll != null) R.P.rollR = roll;
  const w = R.S.wristR, s = 7.5;
  x.save(); rr(x, cx - 65, cy - 88, 130, 150, 22); x.fillStyle = 'rgba(255,255,255,0.06)'; x.fill(); x.clip();
  x.translate(cx - w[0] * s, cy + 30 - w[1] * s); x.scale(s, s); PART.forearm(x, R, 'R'); PART.hand(x, R, 'R', shape); x.restore();
  lab(x, label, cx, cy + 82);
}
function sheetE(x, W, H_, t) {            // hand library + roll
  sky(x, W, H_, 0.6);
  HANDS.filter((h) => h !== 'none').forEach((h, i) => handCell(x, 75 + (i % 9) * 141, 105 + Math.floor(i / 9) * 205, h, null, h));
  [0, 0.25, 0.5, 0.75, 1].forEach((r, i) => handCell(x, 75 + i * 141, 520, 'five', r, 'roll ' + r));
  handCell(x, 75 + 5 * 141 + 30, 520, 'point', 0, 'point, back'); handCell(x, 75 + 6 * 141 + 30, 520, 'point', 1, 'point, palm');
  handCell(x, 75 + 7 * 141 + 30, 520, { curl: [1, 0, 0.5, 1, 0.3], spread: 0.25, roll: 1 }, null, 'custom curl');
  text(x, 'roll: 0 = back of hand  ·  0.5 = side-on  ·  1 = palm', 640, 670, 28, '#bfe9ff', { w: 800 });
}
function sheetF(x, W, H_, t) {            // gestures on the figure + a jump
  sky(x, W, H_, 0.6);
  const G = [['peace', { pose: 'peaceSign' }], ['OK', { pose: 'okSign', view: '3/4' }], ['thumbs up', { pose: 'thumbsUp' }], ['thumbs down', { pose: 'thumbsDown', view: '3/4' }],
    ['rock on', { pose: 'rockOn' }], ['waving', { pose: 'waving' }], ['counting 3', { pose: 'counting' }], ['call me', { pose: { L: [10, -88, 6], handL: 'callMe', elbowL: [0.6, 1, 0], expr: 'winking' } }]];
  G.forEach(([l, o], i) => { const px = 80 + i * 160; person(x, px, 320, 250, { t: 0.6, ...o }); lab(x, l, px, 345); });
  x.fillStyle = 'rgba(160,180,255,0.25)'; x.fillRect(40, 640, 1200, 3);
  const U = [0, 0.18, 0.32, 0.5, 0.68, 0.84, 1], N = ['stand', 'crouch', 'takeoff', 'air (tuck)', 'falling', 'land', 'stand'];
  U.forEach((u, i) => { const px = 110 + i * 175; person(x, px, 640, 210, { view: '3/4', pose: jumpPose(u), t: 0.6 }); lab(x, N[i], px, 680); });
}
function explainer(x, W, H_, t) { [sheetA, sheetB, sheetC, sheetD, sheetE, sheetF][Math.min(5, Math.floor(t))](x, W, H_, t); }

// ======================================================================================================
// GLUE (do not edit): EngineX seeks the page to each frame and fires hf-seek; every frame is a pure function of t.
// ======================================================================================================
const LW = 1280, LH = 720;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const DPR = window.devicePixelRatio || 1;
cv.width = Math.round(1920 * DPR); cv.height = Math.round(1080 * DPR);
function frame(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.setTransform(cv.width / LW, 0, 0, cv.height / LH, 0, 0);
  explainer(ctx, LW, LH, t);
  finish(ctx, LW, LH, t);
}
const FONT_SPECS = ['900 96px "Nunito"', '800 44px "Nunito"', '700 28px "Nunito"'];
window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
window.__hf.buildReady.fonts = Promise.all(FONT_SPECS.map((f) => document.fonts.load(f, 'AaZz09,%?'))).then(() => frame(0));
window.addEventListener('hf-seek', (e) => frame(e.detail.time));
window.seek = frame; window.DURATION = DURATION;
frame(0);
</script>
</body>
</html>
```
