# EngineX map: what to use for what

Checked against the live EngineX catalog on 2026-11-03. The tools are the truth: call `describe_operation` before each run, because parameters change.

## Verified by running it
| Fact | How it was checked |
| :- | :- |
| The template page renders on `motion-graphic/snapshot` at 1920×1080 on the GPU in ~5 s for 6 stills. Fonts, grain and all style functions work. | snapshot job a2360e2a… |
| `motion-graphic/render` takes the page as `project` (a zip with `index.html` at the top, uploaded via `create_upload_url` plus `curl -T`). Capture is frame-exact. A 3 s draft took ~7 s. | render job 609ae652… |
| Library sounds passed in `media` as `sound:<id>` land at `assets/<file name>`, the name shown in the sound's `listen` URL (for example `marimba-accent.mp3`, `echoing-pop.wav`; the render result lists them under `assets`). `<audio data-start data-volume>` elements in the page are mixed into the MP4's audio. | render job 609ae652… plus `video/probe` (stereo AAC stream) |

## Technique → operation
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

## Sound cue starting points (library vocabulary)
Matches seen in the library: "marimba accent" (label lands, plucks), "echoing pop" / "hollow pop" (pop-ins), "soft click" (small UI ticks, counter), "chime soft" (right answer, takeaway).

Still to search per video: whoosh or swoosh (sweeps, pull-backs), riser plus hit or impact (the key number), error or cartoon "nope" (wrong), and a bed.

**Search with what is heard, not adjectives.** "space ambience soft" returned construction sites; the library describes its beds as "space soundscapes".

## Not possible or not verified (be honest about these)
- **The reference's synthesized sound kit** (`sound.js`, `explainerSound`) is not used. EngineX renders don't capture WebAudio, so sound comes from the library, and exact marimba or boop matches depend on what the library has.
- **Toon or flat shading in Blender or Unreal** has no preset. Possible only through `blender/script` (custom Python), which is unverified. three.js in the page is the on-style route to 3D.
- **The exact asset filename for every sound** was verified for two library files only. Always read the render result's `assets` list on the first render.
- **Automatic ducking of music under narration**: `video/duck` exists, but its parameters were not exercised. Read `describe_operation` first. Otherwise set a fixed low `data-volume` on the bed.
- **Long single pages:** the render's `duration` maximum is 3600 s, but renders get slow. Render one page per chapter and concat.
- **Pacing to music beats:** `motion-graphic/beats` exists but is unverified.
