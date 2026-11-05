# Visual style bible

Two separate sources, kept separate on purpose:

| | Source | Gives us | Do not take |
|---|---|---|---|
| **House art direction** | `vectoranimation.md` (via `house-style-guide.md`), `character-reference.png` + `character-recipe.md`, the user's rules (memory, `house-scene-grammar.md` rules 10–17) | **what things look like**: shapes, shading, colour, character, labels | — |
| **Kurzgesagt reference** | 149 frames + contact sheet | **geometry** (`COMPOSITION-SYSTEM.md`) and a few observed illustration habits (§3) | its characters, scenes, logos, palettes as a set, layouts copied 1:1 |

Where the two disagree, the house wins. Example: Kurzgesagt draws flat faceted faces; we use the house presenter.

## 1. House look (summary; full detail in `house-style-guide.md`)
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

## 2. The presenter (from `character-reference.png`; rig in `character-recipe.md`)
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

## 3. Kurzgesagt illustration habits we *adopt* (observed in the frames) [P]
- **Labels:** small flat rectangles with a tiny pointer triangle aimed at the item (t = 474 s). Our version is `labelTag(..., {ptr})`: house colours and white Nunito 900 caps.
- **Neon rim glow** on the hero items against a deep violet field (the organ row at t = 474 s). This matches the house `glow()`; use it for the one focal item.
- **Bold flat background per idea:** pale cream for people and story; deep violet or indigo for the body and science; hot red for danger. The palette change marks the idea change.
- **Dark foreground silhouettes** framing wide shots (t = 684 s).
- **Data screens** (E): one huge number plus a dot field, a flush-left title bar, a small source pill.

## 4. Things that make it look generic or AI-made (avoid)
- Floating icons in empty space: every beat is a **place** or a **built diagram** (house rule 1).
- Everything centred, every beat: use the selector's anti-repetition rules.
- Grey bystander pills, stock-looking clip art, inconsistent light direction, outlines on some shapes and not others.
- More than one glowing or high-contrast element.
- Text that repeats the narration, big headlines, subtitles.
- Inaccurate subjects: Earth has continents and ice caps, planets are labelled "not to scale" when the sizes are equal, a cell has a membrane and a nucleus.

## 5. Selective 3D
Use three.js inside the same page (`libraries: ["three"]`) with toon or flat palette materials and an upper-left key light, with the 2D sky behind and `finish()` over it. Use Blender or Unreal (studio look) only for a deliberate stinger or product beat. See `house-style-guide.md` §11.
