# Human character recipe (the house presenter, modular rig)

- **Design source:** `character-reference.png`.
- **Code:** the CHARACTER KIT section of `assets/page-template.html`.
- **Test page:** `examples/character-sheet.html` shows every view, expression, isolated part, blend, desk pose, hand shape, hand roll, gesture and the jump (6 sheets at t = 0.5 / 1.5 / 2.5 / 3.5 / 4.5 / 5.5). Snapshot it on EngineX after any change to the kit.

## Look
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

## How it is built
1. **`rig(opts)` → `R`:** a small 3D skeleton (body units: % of height, feet at 0, y up negative).
   - `x` is **his** left; `z` is his forward.
   - Arms and legs are solved with two-bone IK toward their targets, so a hand goes exactly where you put it.
   - The skeleton is projected by the view angle into `R.S[joint] = [screenX, screenY, depth]`.
2. **`PART.*(x, R, side)`:** separate drawing functions that all meet at the same named joints. Draw any of them alone (close-ups, exploded views, an arm reaching into frame) or swap one without touching the rest.
3. **`drawRig(x, R, opts)`:** draws all parts in depth order (behind arm → legs → hood → neck → torso → head → front arms → held tablet → hands).
4. **`person(x, cx, cy, height, opts)`:** runs `rig` + `drawRig` in world units and returns `R`.

## Joints (connection points)
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

## Views
`view`:
- `'front'`, `'3/4'`, `'side'`, `'3/4back'`, `'back'`;
- add `-left` for the mirrored version (`'3/4-left'`);
- or any `yaw` in degrees (0 = facing camera, 90 = facing right, 180 = back).

Turning is continuous: animate `yaw` for a turn. `headTurn` (degrees) turns the head relative to the body, which gives over-the-shoulder looks. `turn` (-1..1) and `back: true` still work.

## Hands (`HANDSHAPES`; `HANDS` lists the names)
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

## Poses (`POSES`)
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

## Animating (nothing is redrawn by hand)
- **Blend two poses:** `person(x, cx, cy, h, { pose: mixPose('standing', 'pointing', eio(u)) })`. Numbers and joint targets interpolate; hand shapes, props and expressions switch at the midpoint.
- **Keyframes:** `pose: poseAt([[2.0, 'typing'], [2.6, 'touchingScreen'], [3.4, 'typing']], t)`.
- **Hand to an exact point** (a screen, a button, a label): `reachL: [worldX, worldY]`. Add `reachTip: true` to put the fingertip, not the wrist, on the point.
- **Life:** pass `t` for breathing and automatic blinks; small `tilt` or `headTurn` changes keep him alive.
- **Walk:** `{ view: 'side', walk: t * 7 }` while moving `cx`. Running is `stride: 1.5` with a faster phase.
- **Standing up:** keyframe `{ sit: 1 }` → `{ sit: 0.4, lean: 0.35 }` → `{ sit: 0, lean: 0 }`.
- **Jump:** `pose: jumpPose(seg(t, t0, t0 + 1.1))` (about 1.1 s). Keep `cy` on the ground line: the rig lifts itself, and the ground shadow stays down, shrinking and fading. For a bigger or smaller hop, build your own keys with `rise` and `crouch`.
- **Turn a hand over:** `rollL: eio(seg(t, a, b))`. **Count:** switch `handL` between `'one'` … `'five'` on beats, or interpolate `curl` arrays with `mixPose`.

## Props
Props use the same shading.
- `laptop(x, cx, cy, width, { view: 'side' | 'back' | 'screen', content(g, w, h) })`.
- `monitor(x, cx, cy, width, { view: 'screen' | 'back' | 'side', content })`.
- `desk(x, cx, cy, width, { panel })`.
- `chair(x, cx, cy, height, { view: 'side' | 'front' | 'back' })`.

**Seated layout:** chair, desk and person share `cx` and `cy`. The desk top is at `cy - 0.36 * height`. Draw a `'front'` chair before him and a `'back'` chair after him.

The `content` callback draws on the screen (a UI, a 3D object being moved, two apps side by side). The laptop's back badge is a generic dot, not a brand logo.

## Rules
- He is the **one** human for every video. Change the pose and expression, never the design.
- Serious beats get no overshoot on him: blend poses with `eio`.
- Real public figures are never drawn with his face. Use a featureless silhouette with a name pill.
- Keep him at least 200 px tall at 1280×720 when the face matters.

## Known limits
- Fingers bend in the hand's own plane: a curled finger is drawn as a shortened finger plus a knuckle, not a fully 3D bent finger. Gestures read clearly from the front and side, but less so straight down the forearm.
- `mixPose` switches hand shapes at the halfway point; to animate fingers smoothly, pass `curl` arrays as objects and blend those.
- No knee-up poses such as cross-legged sitting or kneeling.
- The profile head is the simplest view.
