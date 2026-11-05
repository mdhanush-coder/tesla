# Storyboard: Tesla Roadster, could a car use rocket technology to fly? (5:29)

**Takeaway:** the Roadster's cold-gas thrusters let it jump, twist and boost for seconds, but they are far too weak to make it fly.
**Key number:** about 27 kg of compressed air per second to hover a car assumed at 2 tonnes (cold gas specific impulse 73 s vs about 300 s for a rocket engine).
**Presenter's arc:** thinking -> confused (fly?) -> reacting (debris) -> happy (verdict, waves).
**Palette:** night test site (story) -> grey studio (design) -> violet (trims) -> blueprint blue (how it works) -> space -> daylight road -> violet lab (maths) -> night city (roads) -> night test site (callback ending).
**Assumed / conceptual:** car mass 2 t (tagged ASSUMED); trims and speeds are Tesla claims (tagged TESLA CLAIMS / NOT YET TESTED); car drawn as a flat-vector stylisation of Tesla's published images.

| Chapter | Time | Layouts | Entry |
|---|---|---|---|
| C1 the stunt | 0:00-0:36.6 | loop ramp (custom) -> wide with crowd silhouettes (G) -> push-in on car + presenter | open |
| C2 the reveal | 0:36.6-1:41 | test site (A) -> studio car (A: doors, wing, fan, flips upside down) -> trims (C n=3) -> claims icons (C n=3) | diag wipe |
| C3 cold gas | 1:41-2:48.8 | top view with ~10 thrusters + COPV (A) -> tank / valve / nozzle row (C) -> Newton (D) -> space: booster + astronaut (D) | slide |
| C4 on a car | 2:48.8-3:23.4 | tyre close-up + grip meter -> pull back, launch -> top view brake/turn -> mid-air twist | iris |
| C5 can it hover | 3:23.4-4:19.4 | force diagram -> 20,000 N (E) -> specific impulse bars (C n=2) -> 27 kg / suitcases (E) -> tank empties; hop, twist, boost, no cruise | diag |
| C6 on our roads | 4:19.4-5:00.5 | city street with presenter -> pressure tank + 2016 pad (D) -> debris, no-lane sign, not road approved -> pump vs blast | slide |
| C7 verdict | 5:00.5-5:29 | back at the night test site; jump-spin-land; SPEED / GRIP / PUFF row; car launches into the stars | iris |

Timing: line starts/ends from emotive-speech `lines`; word hits interpolated by character position (W()). Sound cues generated from the same function (`pages/make_cues.py`).

## Review log
- Draft v1 (job 3fefc176) + contact sheet (every 4 s): fixed sky edge on the pull-back, doors opening downward (sign), TANK tag under chapter bar, FLYING CAR? colliding with name tag, unreadable refill panel, edge strip on the push-in.
- The black tile at 5:28 on the sprite was the sampler past the end; snapshot at 328.5 s confirmed a full frame.
