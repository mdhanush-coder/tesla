// "Tesla Roadster: could a car use rocket technology to fly?"  One page, 5:29. Narration: emotive-speech owen (job d91ac729, 327.28 s).
// Times: each line's start/end from the speech job's `lines`; a word's time = linear interpolation by character position inside its line (W()).
// Chapters: C1 hook (ramp stunt, night) | C2 reveal (site, design, suction, trims, claims) | C3 2018 idea + how cold gas works + Falcon 9 |
//           C4 what thrusters do on a car | C5 can it hover? the maths | C6 why not on our roads | C7 verdict.
const DURATION = 329;
//PLACEMENTS-START
const PLACEMENTS = [
  { id: 'chapter bar', role: 'tag', x0: 0, y0: 0.06, x1: 0.34, y1: 0.13 },
  { id: 'background places', role: 'bg', x0: 0, y0: 0, x1: 1, y1: 1 },
  { id: 'C1 loop ramp', role: 'content', x0: 0.36, y0: 0.08, x1: 0.73, y1: 0.75 },
  { id: 'C1 crowd', role: 'bleed', x0: 0, y0: 0.82, x1: 1, y1: 1 },
  { id: 'C2 car (A)', role: 'content', x0: 0.19, y0: 0.4, x1: 0.81, y1: 0.8 },
  ...[0.1625, 0.5, 0.8375].map((c, i) => ({ id: 'C2 trim' + i, role: 'content', x0: c - 0.11, y0: 0.42, x1: c + 0.11, y1: 0.66 })),
  ...[0.1625, 0.5, 0.8375].map((c, i) => ({ id: 'C2 trim label' + i, role: 'label', x0: c - 0.1, y0: 0.76, x1: c + 0.1, y1: 0.82 })),
  { id: 'C3 top car (A)', role: 'content', x0: 0.2, y0: 0.27, x1: 0.8, y1: 0.73 },
  { id: 'C3 tank-valve-nozzle row', role: 'content', x0: 0.1, y0: 0.32, x1: 0.88, y1: 0.7 },
  { id: 'C5 number (E)', role: 'content', x0: 0.4, y0: 0.38, x1: 0.88, y1: 0.62 },
  { id: 'C5 bars', role: 'content', x0: 0.25, y0: 0.18, x1: 0.75, y1: 0.8 },
];
//PLACEMENTS-END

// ---------------- narration timing ----------------
const LINES = [
  [0, 6.13, 'A silver sports car races up a curved ramp. Higher. Steeper. Until it is driving upside down.'],
  [6.53, 12.22, 'Then it lets go of the ramp. It flips in mid-air. And it lands on its wheels.'],
  [12.62, 22.93, 'This happened in front of a live audience in Texas, on the fifteenth of October, two thousand and twenty-six. Elon Musk even said the crowd was there to prove it was not AI.'],
  [23.33, 28.42, 'The car is Tesla\'s new Roadster. And people are calling it a flying car.'],
  [28.82, 36.064, 'So here is the big question. Could a car really use rocket technology to fly? And if it could, how would it work?'],
  [36.964, 43.652, 'The reveal took place at SpaceX\'s rocket test site in McGregor, Texas. SpaceX helped develop the car.'],
  [44.052, 51.296, 'On the outside, it is a sharp, low wedge. Two seats, doors that swing upwards, and a big rear wing.'],
  [51.696, 66, 'Underneath, a fan system sucks air out from below the car. That pulls it down onto the surface, so hard that Tesla says it can corner at more than two g. The same suction is how it clung to the ramp while it was upside down.'],
  [66.4, 84.186, 'Tesla announced three versions. Performance, with zero to sixty in under one point six seconds. Thrust, with rear thrusters, in under zero point nine seconds. And Rocket, a one-seat version, in under zero point five nine seconds, which Tesla calls air ready.'],
  [84.586, 100.654, 'Remember, those are Tesla\'s own claims. None of them have been tested independently yet. Tesla also says the car will reach more than two hundred and thirty miles per hour, travel about three hundred miles on a charge, and go into production in two thousand and twenty-eight.'],
  [101.304, 117.883, 'The idea is not new. Back in two thousand and eighteen, Musk tweeted about a SpaceX option package. Around ten small rocket thrusters, fed by ultra high pressure air, stored in a SpaceX tank called a COPV, right where the back seats would be.'],
  [118.283, 122.974, 'So what exactly is a cold gas thruster? It is the simplest rocket there is.'],
  [123.374, 135.774, 'You start with a strong tank, filled with gas squeezed to hundreds of times normal air pressure. A valve opens. The gas rushes out through a narrow nozzle, faster and faster.'],
  [136.174, 147.877, 'And here is the key. Pushing gas backwards pushes the car forwards. That is Newton\'s third law. Every action has an equal and opposite reaction.'],
  [148.277, 153.71, 'There is no fire, and no fuel burning. That is why it is called cold gas.'],
  [154.11, 168.47, 'SpaceX already relies on this. When a Falcon nine booster falls back towards Earth, cold gas thrusters nudge it around, so it can flip and steer before landing. Astronauts have even flown with backpacks full of them.'],
  [169.12, 172.85, 'On a car, thrusters can help in ways that tyres cannot.'],
  [173.25, 188.993, 'A tyre can only push as hard as its grip on the road allows. Push harder, and it just spins. A thruster pushes against the air instead, so it adds force on top of the tyres. That means a harder launch.'],
  [189.393, 203, 'Point thrusters forwards, and they help the car brake. Point them sideways, and they help it turn. Fire them in short bursts, and they can twist the car in mid-air, which is exactly how the Roadster flipped itself back onto its wheels.'],
  [203.65, 210.523, 'But flying is a very different problem. To hover, the thrusters must push up as hard as gravity pulls down.'],
  [210.923, 223.363, 'Tesla has not published the car\'s weight, so let\'s assume about two tonnes, similar to many electric performance cars. To hold that up, you need about twenty thousand newtons of thrust, all the time.'],
  [223.763, 237.928, 'And cold gas is weak. A thruster\'s efficiency is measured by its specific impulse. Compressed nitrogen scores about seventy-three seconds, and air is mostly nitrogen. A rocket engine burning fuel scores around three hundred.'],
  [238.328, 244.548, 'Put those numbers together, and hovering would use up about twenty-seven kilograms of compressed air, every single second.'],
  [244.948, 249.081, 'That is like throwing a heavy suitcase full of air out of the car, every second!'],
  [249.481, 259.001, 'Even a large high pressure tank would be empty in seconds. So a cold gas car can hop, twist and boost. But it cannot cruise through the sky.'],
  [259.651, 264.388, 'And there are more reasons we will not see flying cars on our roads any time soon.'],
  [264.788, 276.769, 'Tanks at extreme pressure must be built and checked very carefully. A pressure tank failure was part of what caused a Falcon nine rocket to explode on its launch pad in two thousand and sixteen.'],
  [277.169, 289.801, 'Air blasting out of a car could throw grit and debris at people nearby. Traffic rules have no lane for a car that leaves the ground. And Tesla itself says the Rocket version is not approved for public roads.'],
  [290.201, 300.139, 'Refilling takes time too. Musk has said an onboard pump would refill the tank while driving, but a pump is slow compared with a blast that lasts seconds.'],
  [300.789, 312.629, 'So, is it a flying car? Not really. It is a very fast electric car with a rocket-style trick. Short, controlled bursts of air, that let it jump, spin and land.'],
  [313.029, 318.323, 'Batteries for the speed. Suction for the grip. And a puff of cold gas for the impossible moments.'],
  [318.723, 327.283, 'The true flying car of the future may still be a long way off. But this one shows how rocket technology can make a car move in ways we have never seen before.'],
];
function W(i, word) {
  const [a, b, s] = LINES[i], k = s.toLowerCase().indexOf(word.toLowerCase());
  if (k < 0) throw new Error('W(): "' + word + '" not in line ' + i);
  return a + ((b - a) * k) / s.length;
}

// ---------------- helpers ----------------
const S = (t, a, b) => COMP.seg(t, a, b);
const popAt = (t, a, d = 0.35, s = 1.8) => back(S(t, a, a + d), s);
const win = (t, a, b, f = 0.3) => S(t, a, a + f) * (1 - S(t, b - f, b));        // 0 -> 1 -> 0 visibility window
const TG = { ...TAGC, green: ['#18b765', '#86f0b6'], red: ['#e8284a', '#ff9aa8'], navy: ['#2b3a8c', '#7d8cff'] };
const tagAt = (x, t, t0, t1, cx, cy, label, col, o = {}) => labelTag(x, cx, cy, label, col, { px: 28, ...o, s: popAt(t, t0, 0.35, 2) * (t1 ? 1 - S(t, t1, t1 + 0.3) : 1) });
const stamp = (x, t, t0, t1, cx, cy, label, col, rot = -0.08, px = 34) => tagAt(x, t, t0, t1, cx, cy, label, col, { px, rot });
function scaleAt(x, c, s, fn) { if (s <= 0.01) return; x.save(); x.translate(c[0], c[1]); x.scale(s, s); x.translate(-c[0], -c[1]); fn(); x.restore(); }
function polyAt(P, u) {
  let L = 0; const d = []; for (let i = 1; i < P.length; i++) { d.push(Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1])); L += d[i - 1]; }
  let r = cl(u) * L; for (let i = 0; i < d.length; i++) { if (r <= d[i] || i === d.length - 1) { const k = d[i] ? r / d[i] : 0; return [lerp(P[i][0], P[i + 1][0], k), lerp(P[i][1], P[i + 1][1], k)]; } r -= d[i]; }
  return P[P.length - 1];
}
function flowDots(x, P, t, speed, col, n, r, a = 1) {
  if (a <= 0.01) return; x.save(); x.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const u = (((t * speed + i / n) % 1) + 1) % 1, p = polyAt(P, u); glow(x, p[0], p[1], r * 3, col, 0.8); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(p[0], p[1], r * 0.7, 0, TAU); x.fill(); }
  x.restore();
}
function presenter(x, cx, cy, h, t, pose, expr, o = {}) { return person(x, cx, cy, h, { view: '3/4', pose, expr, t, noGlow: true, ...o }); }
function qmark(x, X, Y, s) { if (s <= 0.01) return; ball(x, X, Y, 30 * s, ['#ffffff', '#ece8ff', '#9a8fe0'], { sha: 0.3 }); text(x, '?', X, Y, 40 * s, C.violet, { shadow: 'rgba(0,0,0,0)' }); }
// cold gas puff: a cone of soft white-cyan blobs leaving a nozzle at angle `ang` (units = whatever the current transform is)
function puff(x, X, Y, ang, k, t, size = 1, seed = 1) {
  if (k <= 0.02) return; const ca = Math.cos(ang), sa = Math.sin(ang), r = H.rng(seed);
  glow(x, X, Y, 0.06 * size, '#bff8ff', 0.7 * k);
  for (let i = 0; i < 11; i++) {
    const u = ((t * 2.6 + r()) % 1), d = (0.02 + u * 0.22) * size * (0.6 + 0.4 * k), sp = (r() - 0.5) * 0.5 * u * size * 0.25;
    const px = X + ca * d - sa * sp, py = Y + sa * d + ca * sp, rad = (0.012 + u * 0.05) * size * k;
    x.fillStyle = `rgba(${u < 0.3 ? '230,252,255' : '255,255,255'},${0.75 * (1 - u) * k})`; x.beginPath(); x.arc(px, py, rad, 0, TAU); x.fill();
  }
}

// ---------------- places ----------------
function desert(x, W, H_, t, camx = 0) {                                          // night test site: stars + dark desert + distant mesa
  x.fillStyle = C.sky0; x.fillRect(-W, -H_, W * 3, H_ * 3); sky(x, W, H_, t, { x: camx * 0.2 });
  x.fillStyle = '#2a1d55'; x.beginPath(); x.moveTo(-W, H_ * 0.66);
  for (let X = -W; X <= 2 * W; X += 30) x.lineTo(X, H_ * (0.66 - 0.05 * Math.max(0, Math.sin((X + camx * 0.3) * 0.004)) - 0.02 * Math.sin((X + camx * 0.3) * 0.013)));
  x.lineTo(2 * W, H_); x.lineTo(-W, H_); x.closePath(); x.fill();
  const g = x.createLinearGradient(0, H_ * 0.72, 0, H_); g.addColorStop(0, '#3a2a6c'); g.addColorStop(1, '#1d1340'); x.fillStyle = g; x.fillRect(-W, H_ * 0.735, W * 3, H_);
}
function testTower(x, X, gy, h, a = 1) {                                         // generic launch / test stand lattice (no logos)
  x.save(); x.globalAlpha *= a; x.strokeStyle = '#4b3a8c'; x.lineWidth = 6;
  x.beginPath(); x.moveTo(X - 30, gy); x.lineTo(X - 18, gy - h); x.moveTo(X + 30, gy); x.lineTo(X + 18, gy - h); x.stroke();
  x.lineWidth = 3; for (let i = 0; i < 9; i++) { const y0 = gy - (i * h) / 9, y1 = gy - ((i + 1) * h) / 9, w0 = 30 - (12 * i) / 9, w1 = 30 - (12 * (i + 1)) / 9; x.beginPath(); x.moveTo(X - w0, y0); x.lineTo(X + w1, y1); x.moveTo(X + w0, y0); x.lineTo(X - w1, y1); x.stroke(); }
  glow(x, X, gy - h - 6, 26, '#ff3b5c', 0.8); x.fillStyle = '#ff3b5c'; x.beginPath(); x.arc(X, gy - h - 6, 5, 0, TAU); x.fill();
  x.restore();
}
function crowd(x, W, H_, t, a = 1, phones = 0) {                                  // near-layer silhouettes framing the bottom of a wide shot
  if (a <= 0.01) return; x.save(); x.globalAlpha *= a; const r = H.rng(44);
  for (let i = 0; i < 26; i++) {
    const X = (i / 25) * W * 1.04 - 20 + r.range(-14, 14), Y = H_ * (0.93 + r.range(0, 0.05)) + Math.sin(t * 1.3 + i) * 2, s = r.range(0.85, 1.2);
    x.fillStyle = '#0f0a26'; x.beginPath(); x.ellipse(X, Y + 40 * s, 46 * s, 50 * s, 0, 0, TAU); x.fill(); x.beginPath(); x.arc(X, Y - 18 * s, 21 * s, 0, TAU); x.fill();
    if (phones > 0 && i % 3 === 1) { const p = phones * (0.7 + 0.3 * Math.sin(t * 3 + i)); glow(x, X + 14, Y - 50, 30, '#bfe9ff', 0.5 * p); x.fillStyle = H.rgba('#e8f6ff', p); rr(x, X + 6, Y - 66, 16, 26, 3); x.fill(); x.strokeStyle = '#0f0a26'; x.lineWidth = 6; x.beginPath(); x.moveTo(X + 10, Y - 40); x.lineTo(X + 4, Y - 10); x.stroke(); }
  }
  x.restore();
}
function studio(x, W, H_, c0 = '#3a3d5c', c1 = '#12131f') {
  const g = x.createRadialGradient(W * 0.42, H_ * 0.35, 40, W * 0.5, H_ * 0.5, W * 0.8); g.addColorStop(0, c0); g.addColorStop(1, c1); x.fillStyle = g; x.fillRect(-W, -H_, W * 3, H_ * 3);
  x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-W, H_ * 0.78, W * 3, H_);
}
function dayRoad(x, W, H_, t, scroll) {
  const g = x.createLinearGradient(0, 0, 0, H_ * 0.7); g.addColorStop(0, '#2fb6ff'); g.addColorStop(1, '#b8ecff'); x.fillStyle = g; x.fillRect(-W, -H_, W * 3, H_ * 3);
  glow(x, W * 0.2, H_ * 0.18, 220, '#fff6d0', 0.6);
  x.fillStyle = '#7fcf8a'; x.fillRect(-W, H_ * 0.66, W * 3, H_); x.fillStyle = '#4a4a6a'; x.fillRect(-W, H_ * 0.72, W * 3, H_);
  x.fillStyle = '#ffffff'; const off = ((scroll % 240) + 240) % 240; for (let X = -off - 240; X < W + 240; X += 240) { rr(x, X, H_ * 0.9, 120, 10, 5); x.fill(); }
}
function cityNight(x, W, H_, t) {
  const g = x.createLinearGradient(0, 0, 0, H_ * 0.7); g.addColorStop(0, '#141c5a'); g.addColorStop(1, '#5a4cc4'); x.fillStyle = g; x.fillRect(-W, -H_, W * 3, H_ * 3);
  const r = H.rng(9); for (let i = 0; i < 16; i++) { const bw = r.range(70, 130), bh = r.range(150, 330), X = i * 86 - 40; x.fillStyle = i % 2 ? '#22265e' : '#1b1f50'; x.fillRect(X, H_ * 0.7 - bh, bw, bh);
    x.fillStyle = 'rgba(255,214,120,0.6)'; for (let wy = H_ * 0.7 - bh + 16; wy < H_ * 0.7 - 20; wy += 30) for (let wx = X + 10; wx < X + bw - 14; wx += 24) if (r() > 0.55) x.fillRect(wx, wy, 10, 14); }
  x.fillStyle = '#3a3360'; x.fillRect(-W, H_ * 0.7, W * 3, H_ * 0.05); x.fillStyle = '#16133a'; x.fillRect(-W, H_ * 0.75, W * 3, H_);
  x.fillStyle = '#8f86d8'; for (let X = 0; X < W; X += 240) { rr(x, X + 40, H_ * 0.9, 120, 9, 4); x.fill(); }
}

// ---------------- the new Roadster (side view, faces right; local units: length 1, ground y 0) ----------------
const SIL = ['#ffffff', '#c3c7d6', '#5d6280'];
function carBody(x) {
  x.moveTo(-0.485, -0.045); x.lineTo(-0.5, -0.12); x.lineTo(-0.49, -0.175); x.lineTo(-0.3, -0.198); x.lineTo(-0.2, -0.212);
  x.lineTo(-0.06, -0.262); x.lineTo(0.02, -0.258); x.lineTo(0.2, -0.19); x.lineTo(0.47, -0.125); x.lineTo(0.508, -0.09); x.lineTo(0.495, -0.05); x.lineTo(0.46, -0.04); x.lineTo(-0.46, -0.04); x.closePath();
}
const NOZ = { rear: [-0.505, -0.065, Math.PI], sillR: [-0.33, -0.028, Math.PI / 2], sillF: [0.27, -0.028, Math.PI / 2], nose: [0.505, -0.075, 0] };
function wheel2(x, X, Y, r, ang) {
  x.fillStyle = '#14141e'; x.beginPath(); x.arc(X, Y, r, 0, TAU); x.fill();
  const g = x.createLinearGradient(X - r, Y - r, X + r, Y + r); g.addColorStop(0, '#4a4c62'); g.addColorStop(1, '#1d1e2a'); x.fillStyle = g; x.beginPath(); x.arc(X, Y, r * 0.72, 0, TAU); x.fill();
  x.strokeStyle = '#9aa0c0'; x.lineWidth = r * 0.12; x.lineCap = 'round';
  for (let k = 0; k < 5; k++) { const a = ang + (k * TAU) / 5; x.beginPath(); x.moveTo(X + Math.cos(a) * r * 0.16, Y + Math.sin(a) * r * 0.16); x.lineTo(X + Math.cos(a) * r * 0.66, Y + Math.sin(a) * r * 0.66); x.stroke(); }
  x.fillStyle = '#c9cde8'; x.beginPath(); x.arc(X, Y, r * 0.12, 0, TAU); x.fill();
}
// o: spin, speed, doors 0..1, wing 0..1, puffs {rear, sillR, sillF, nose} strengths, t, glowNoz, fan (show underbody fan + suction arrows), ghost
function roadster(x, o = {}) {
  const t = o.t || 0, sp = o.speed || 0, P = o.puffs || {};
  x.fillStyle = 'rgba(10,6,30,0.35)'; if (!o.noShadow) { x.beginPath(); x.ellipse(0, 0.004, 0.5, 0.025, 0, 0, TAU); x.fill(); }
  if (sp > 0.02) { x.save(); x.lineCap = 'round'; const r = H.rng(7); for (let i = 0; i < 6; i++) { const y = -0.05 - i * 0.035, L = 0.12 + r() * 0.25, x0 = -0.56 - r() * 0.08 - ((t * 3 + r()) % 1) * 0.12; x.strokeStyle = `rgba(255,255,255,${0.6 * sp})`; x.lineWidth = 0.008; x.beginPath(); x.moveTo(x0, y); x.lineTo(x0 - L * sp, y); x.stroke(); } x.restore(); }
  for (const k in NOZ) if (P[k]) puff(x, NOZ[k][0], NOZ[k][1], NOZ[k][2], P[k], t, 1, k.length);
  // wing (behind the body when tucked, lifts on stalks)
  const wl = o.wing || 0, wy = -0.205 - 0.085 * wl;
  x.strokeStyle = '#2a2b3a'; x.lineWidth = 0.012; x.beginPath(); x.moveTo(-0.43, -0.19); x.lineTo(-0.44, wy); x.moveTo(-0.37, -0.195); x.lineTo(-0.38, wy); x.stroke();
  flatShade(x, () => { x.moveTo(-0.53, wy + 0.01); x.lineTo(-0.34, wy - 0.012); x.lineTo(-0.34, wy + 0.004); x.lineTo(-0.53, wy + 0.024); x.closePath(); }, SIL, 0.004);
  x.fillStyle = '#ff2a3c'; x.fillRect(-0.535, wy + 0.008, 0.012, 0.018); if (wl > 0.3) glow(x, -0.53, wy + 0.015, 0.05, '#ff3b5c', 0.5 * wl);
  // body
  flatShade(x, () => carBody(x), SIL, 0.01, true, [0, -0.15, 0.5]);
  x.fillStyle = '#1b1c28'; x.beginPath(); x.moveTo(-0.485, -0.045); x.lineTo(-0.49, -0.085); x.lineTo(0.5, -0.07); x.lineTo(0.495, -0.05); x.lineTo(0.46, -0.04); x.lineTo(-0.46, -0.04); x.closePath(); x.fill();   // dark sill band
  x.strokeStyle = 'rgba(90,95,130,0.55)'; x.lineWidth = 0.003; x.beginPath(); x.moveTo(-0.47, -0.135); x.lineTo(0.46, -0.118); x.stroke();      // character line
  // glass (dark, with a warm cabin when the doors open)
  x.fillStyle = '#20223a'; x.beginPath(); x.moveTo(-0.19, -0.206); x.lineTo(-0.055, -0.252); x.lineTo(0.015, -0.249); x.lineTo(0.17, -0.192); x.lineTo(-0.05, -0.19); x.closePath(); x.fill();
  x.strokeStyle = 'rgba(200,220,255,0.55)'; x.lineWidth = 0.003; x.beginPath(); x.moveTo(-0.15, -0.212); x.lineTo(-0.05, -0.246); x.stroke();
  const dr = o.doors || 0;
  if (dr > 0.01) {
    x.fillStyle = H.rgba('#ff9a4a', 0.85 * Math.min(1, dr * 2)); x.beginPath(); x.moveTo(-0.15, -0.19); x.lineTo(0.13, -0.19); x.lineTo(0.12, -0.075); x.lineTo(-0.12, -0.075); x.closePath(); x.fill(); glow(x, 0, -0.14, 0.15, '#ff9a4a', 0.5 * dr);
    x.save(); x.translate(0.13, -0.2); x.rotate(1.15 * dr); x.translate(-0.13, 0.2);
    flatShade(x, () => { x.moveTo(-0.15, -0.19); x.lineTo(0.13, -0.195); x.lineTo(0.12, -0.075); x.lineTo(-0.12, -0.075); x.closePath(); }, SIL, 0.006);
    x.fillStyle = '#20223a'; x.beginPath(); x.moveTo(-0.13, -0.188); x.lineTo(0.11, -0.192); x.lineTo(0.1, -0.15); x.lineTo(-0.12, -0.15); x.closePath(); x.fill();
    x.restore();
  } else { x.strokeStyle = 'rgba(80,85,120,0.5)'; x.lineWidth = 0.003; x.beginPath(); x.moveTo(0.12, -0.19); x.lineTo(0.11, -0.06); x.moveTo(-0.13, -0.195); x.lineTo(-0.12, -0.06); x.stroke(); }
  // light bars
  x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(0.44, -0.13); x.lineTo(0.505, -0.1); x.lineTo(0.5, -0.094); x.lineTo(0.44, -0.122); x.closePath(); x.fill(); glow(x, 0.49, -0.105, 0.05, '#e8f6ff', 0.45);
  x.fillStyle = '#ff2a3c'; x.fillRect(-0.503, -0.172, 0.01, 0.05); glow(x, -0.5, -0.15, 0.06, '#ff3b5c', 0.5);
  // nozzles
  x.fillStyle = '#4a4c5e'; for (const k of ['sillR', 'sillF']) { rr(x, NOZ[k][0] - 0.012, -0.045, 0.024, 0.022, 0.006); x.fill(); }
  x.beginPath(); x.arc(-0.5, -0.065, 0.012, 0, TAU); x.fill();
  if (o.glowNoz) for (const k in NOZ) glow(x, NOZ[k][0], NOZ[k][1], 0.05, '#56e8ff', 0.8 * o.glowNoz);
  // wheels
  for (const wx of [-0.31, 0.3]) wheel2(x, wx, -0.07, 0.07, o.spin || 0);
  if (o.fan) {                                                                    // underbody fan + suction (air pulled out from beneath)
    x.save(); x.globalAlpha *= o.fan; x.fillStyle = '#0c0d18'; rr(x, -0.2, -0.05, 0.36, 0.022, 0.008); x.fill();
    for (let k = 0; k < 3; k++) { const fx = -0.13 + k * 0.11; x.strokeStyle = '#56e8ff'; x.lineWidth = 0.004; x.beginPath(); for (let b = 0; b < 3; b++) { const a = t * 18 + (b * TAU) / 3; x.moveTo(fx, -0.039); x.lineTo(fx + Math.cos(a) * 0.03, -0.039 + Math.sin(a) * 0.006); } x.stroke(); }
    flowDots(x, [[0.2, -0.015], [0, -0.025], [-0.2, -0.03], [-0.42, -0.06], [-0.56, -0.09]], t, 0.6, '#56e8ff', 9, 0.008);
    x.restore();
  }
}
// draw the car at (cx, gy) with length w; rot about a pivot height py (fraction of length above ground); sx/sy for mirror and roll
function car(x, cx, gy, w, o = {}) { x.save(); x.translate(cx, gy); x.scale(w, w); x.translate(0, -(o.py || 0)); x.rotate(o.rot || 0); x.scale(o.sx || 1, o.sy || 1); x.translate(0, o.py || 0); roadster(x, o); x.restore(); }

// ---------------- the Roadster from above (faces right) ----------------
const TOP_TH = [[0.5, 0, 0], [0.43, -0.2, -1.2], [0.43, 0.2, 1.2], [0.12, -0.22, -Math.PI / 2], [0.12, 0.22, Math.PI / 2], [-0.22, -0.22, -Math.PI / 2], [-0.22, 0.22, Math.PI / 2], [-0.45, -0.19, -2.2], [-0.45, 0.19, 2.2], [-0.5, 0, Math.PI]];
function topCar(x, cx, cy, L, ang, o = {}) {
  const t = o.t || 0; x.save(); x.translate(cx, cy); x.rotate(ang); x.scale(L, L);
  x.fillStyle = 'rgba(10,6,30,0.3)'; rr(x, -0.49, -0.2, 1.0, 0.44, 0.08); x.fill();
  for (const [wx, wy] of [[0.3, -0.215], [0.3, 0.215], [-0.31, -0.215], [-0.31, 0.215]]) { x.fillStyle = '#14141e'; rr(x, wx - 0.07, wy - 0.025, 0.14, 0.05, 0.02); x.fill(); }
  flatShade(x, () => { x.moveTo(-0.5, -0.19); x.lineTo(0.38, -0.2); x.lineTo(0.51, -0.08); x.lineTo(0.51, 0.08); x.lineTo(0.38, 0.2); x.lineTo(-0.5, 0.19); x.closePath(); }, SIL, 0.008);
  x.fillStyle = '#20223a'; x.beginPath(); x.moveTo(-0.18, -0.15); x.lineTo(0.16, -0.14); x.lineTo(0.2, 0); x.lineTo(0.16, 0.14); x.lineTo(-0.18, 0.15); x.closePath(); x.fill();
  if (o.seats != null && o.seats > 0.01) { x.fillStyle = H.rgba('#ff9a4a', o.seats); for (const sy of [-0.07, 0.07]) { rr(x, -0.12, sy - 0.05, 0.12, 0.1, 0.02); x.fill(); } }
  if (o.rearSeats != null && o.rearSeats > 0.01) { x.fillStyle = H.rgba('#c27a4a', o.rearSeats); for (const sy of [-0.07, 0.07]) { rr(x, -0.33, sy - 0.045, 0.1, 0.09, 0.02); x.fill(); } }
  if (o.tank > 0.01) { const s = o.tank; x.save(); x.translate(-0.27, 0); x.scale(s, s); glow(x, 0, 0, 0.22, '#56e8ff', 0.6); flatShade(x, () => rr(x, -0.13, -0.1, 0.26, 0.2, 0.1), ['#e6f6ff', '#7fb8e6', '#2a4f8a'], 0.006);
    x.strokeStyle = 'rgba(20,40,90,0.5)'; x.lineWidth = 0.006; for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(k * 0.045, -0.095); x.lineTo(k * 0.045, 0.095); x.stroke(); } x.restore(); }
  x.fillStyle = '#2a2b3a'; rr(x, -0.53, -0.21, 0.05, 0.42, 0.015); x.fill(); x.fillStyle = '#ff2a3c'; x.fillRect(-0.535, -0.2, 0.012, 0.4);
  TOP_TH.forEach(([px, py, a], i) => {
    const s = o.thr ? cl(o.thr * 10 - i) : 0; if (s <= 0) return;
    glow(x, px, py, 0.05, '#56e8ff', 0.6 * s); x.fillStyle = '#56e8ff'; x.beginPath(); x.arc(px, py, 0.017 * back(s, 2), 0, TAU); x.fill();
    const k = o.puffs ? o.puffs[i] || 0 : 0; if (k > 0) puff(x, px, py, a, k, t, 1, i + 3);
  });
  x.restore();
}

// ---------------- props ----------------
function tank(x, cx, cy, w, h, fill, o = {}) {                                   // upright pressure tank with a gauge
  glow(x, cx, cy, w * 1.2, '#56e8ff', 0.25 + 0.3 * (o.glow || 0));
  x.fillStyle = 'rgba(10,6,30,0.35)'; rr(x, cx - w / 2 + 8, cy - h / 2 + 12, w, h, w / 2); x.fill();
  flatShade(x, () => rr(x, cx - w / 2, cy - h / 2, w, h, w / 2), ['#eef7ff', '#8fb8e0', '#2f4f8a'], 5, true, [cx, cy, h / 2]);
  x.strokeStyle = 'rgba(20,40,90,0.35)'; x.lineWidth = 4; for (let k = 1; k < 6; k++) { const y = cy - h / 2 + (h * k) / 6; x.beginPath(); x.moveTo(cx - w / 2 + 6, y); x.lineTo(cx + w / 2 - 6, y); x.stroke(); }
  if (o.crack) { x.strokeStyle = H.rgba('#ff3b5c', o.crack); x.lineWidth = 5; x.lineJoin = 'round'; x.beginPath(); x.moveTo(cx + w * 0.1, cy - h * 0.2); x.lineTo(cx - w * 0.05, cy - h * 0.08); x.lineTo(cx + w * 0.12, cy + h * 0.02); x.lineTo(cx - w * 0.02, cy + h * 0.14); x.stroke(); }
  if (fill != null) gauge(x, cx, cy - h / 2 + 70, 46, fill);
}
function gauge(x, cx, cy, r, v) {
  ball(x, cx, cy, r, ['#ffffff', '#dcdff0', '#7f84a8'], { sha: 0.3 }); x.fillStyle = '#1d1650'; x.beginPath(); x.arc(cx, cy, r * 0.82, 0, TAU); x.fill();
  x.lineCap = 'round'; x.lineWidth = r * 0.14; x.strokeStyle = 'rgba(255,255,255,0.18)'; x.beginPath(); x.arc(cx, cy, r * 0.6, Math.PI * 0.75, Math.PI * 2.25); x.stroke();
  x.strokeStyle = H.rgba(H.mix('#ff3b5c', '#38e08e', v), 1); x.beginPath(); x.arc(cx, cy, r * 0.6, Math.PI * 0.75, Math.PI * (0.75 + 1.5 * cl(v))); x.stroke();
  const a = Math.PI * (0.75 + 1.5 * cl(v)); x.strokeStyle = '#ffffff'; x.lineWidth = r * 0.08; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r * 0.62, cy + Math.sin(a) * r * 0.62); x.stroke();
}
function nozzleBell(x, X, Y, s) {                                                 // converging-diverging nozzle, exit to the right
  flatShade(x, () => { x.moveTo(X - s * 0.6, Y - s * 0.28); x.lineTo(X - s * 0.1, Y - s * 0.12); x.lineTo(X + s * 0.6, Y - s * 0.45); x.lineTo(X + s * 0.6, Y + s * 0.45); x.lineTo(X - s * 0.1, Y + s * 0.12); x.lineTo(X - s * 0.6, Y + s * 0.28); x.closePath(); }, ['#f2f0ff', '#a6a0d6', '#4a4380'], 3);
  x.fillStyle = '#1d1650'; x.beginPath(); x.ellipse(X + s * 0.6, Y, s * 0.08, s * 0.42, 0, 0, TAU); x.fill();
}
function rocketBooster(x, cx, cy, h, ang, o = {}) {                               // generic white booster with grid fins and legs (no logo)
  const t = o.t || 0, w = h * 0.12; x.save(); x.translate(cx, cy); x.rotate(ang);
  if (o.burst) { glow(x, 0, 0, h * 0.9, '#ff8a3c', 0.8 * o.burst); glow(x, 0, 0, h * 0.4, '#fff1b8', 0.8 * o.burst); }
  flatShade(x, () => rr(x, -w / 2, -h / 2, w, h, w * 0.2), ['#ffffff', '#cfd2e6', '#6a6f92'], 3, true, [0, 0, h / 2]);
  x.fillStyle = '#1b1c28'; x.fillRect(-w / 2, -h / 2, w, h * 0.12);
  x.fillStyle = '#5d6280'; for (const sx of [-1, 1]) { x.fillRect(sx * w / 2 - (sx < 0 ? w * 0.35 : 0), -h / 2 + h * 0.02, w * 0.35, h * 0.06); }
  x.strokeStyle = '#2a2b3a'; x.lineWidth = w * 0.12; for (const sx of [-1, 1]) { x.beginPath(); x.moveTo(sx * w * 0.45, h * 0.38); x.lineTo(sx * w * 1.0, h * 0.5); x.stroke(); }
  if (o.puff) { puff(x, -w / 2, -h * 0.42, Math.PI, o.puff, t, h * 0.9, 2); puff(x, w / 2, -h * 0.38, 0, o.puff * 0.7, t, h * 0.7, 5); }
  x.restore();
}
function astronaut(x, cx, cy, s, t, pf) {
  x.save(); x.translate(cx, cy); x.rotate(Math.sin(t * 0.8) * 0.15); x.scale(s, s);
  flatShade(x, () => rr(x, -38, -30, 30, 90, 10), ['#e8ebff', '#9aa0cf', '#4a4f88'], 3);                                        // backpack
  ball(x, 10, 10, 44, ['#ffffff', '#d9dcf0', '#7f84a8'], { sha: 0.35 });
  ball(x, 14, -48, 30, ['#ffffff', '#dcdff0', '#7f84a8'], { sha: 0.3 }); x.fillStyle = '#2a2d6e'; x.beginPath(); x.ellipse(22, -48, 18, 14, 0, 0, TAU); x.fill();
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.ellipse(16, -54, 6, 4, -0.4, 0, TAU); x.fill();
  limbStroke(x, [[34, 0], [62, 24]], 18, ['#ffffff', '#d9dcf0', '#7f84a8']); limbStroke(x, [[-4, 46], [-10, 84]], 20, ['#ffffff', '#d9dcf0', '#7f84a8']); limbStroke(x, [[22, 48], [30, 86]], 20, ['#ffffff', '#d9dcf0', '#7f84a8']);
  puff(x, -40, -22, Math.PI * 1.1, pf, t, 120, 6); puff(x, -40, 50, Math.PI * 0.9, pf * 0.8, t, 100, 7);
  x.restore();
}
function bar(x, cx, base, w, h, col, a = 1) { x.save(); x.globalAlpha *= a; x.fillStyle = 'rgba(10,8,46,0.35)'; rr(x, cx - w / 2 + 6, base - h + 8, w, h, 16); x.fill(); const g = x.createLinearGradient(0, base - h, 0, base); g.addColorStop(0, col[0]); g.addColorStop(1, col[1]); x.fillStyle = g; rr(x, cx - w / 2, base - h, w, h, 16); x.fill(); x.restore(); }
function suitcase(x, X, Y, s, rot) { x.save(); x.translate(X, Y); x.rotate(rot); x.scale(s, s); x.strokeStyle = '#3a2410'; x.lineWidth = 6; x.beginPath(); x.moveTo(-12, -30); x.lineTo(-12, -42); x.lineTo(12, -42); x.lineTo(12, -30); x.stroke();
  flatShade(x, () => rr(x, -38, -30, 76, 58, 10), ['#ffcf8a', '#c27a3a', '#6a3a1a'], 2); x.fillStyle = 'rgba(60,30,10,0.5)'; x.fillRect(-20, -30, 6, 58); x.fillRect(14, -30, 6, 58); x.restore(); }
function sign(x, cx, cy, s, a) { if (a <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(a, a); x.fillStyle = '#8a8ea8'; x.fillRect(-5, 0, 10, s * 1.3); flatShade(x, () => rr(x, -s / 2, -s / 2, s, s, 14), ['#7fb4ff', '#1f6ae0', '#0d2f80'], 3);
  x.save(); x.scale(s / 400, s / 400); x.translate(0, 30); roadsterIcon(x); x.restore(); x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(0, -s * 0.38); x.lineTo(-s * 0.12, -s * 0.2); x.lineTo(s * 0.12, -s * 0.2); x.closePath(); x.fill(); x.fillRect(-s * 0.03, -s * 0.22, s * 0.06, s * 0.14); x.restore(); }
function roadsterIcon(x) { x.save(); x.scale(300, 300); x.fillStyle = '#ffffff'; x.beginPath(); carBody(x); x.fill(); x.fillStyle = '#1f6ae0'; for (const wx of [-0.31, 0.3]) { x.beginPath(); x.arc(wx, -0.07, 0.07, 0, TAU); x.fill(); } x.restore(); }
function fanIcon(x, cx, cy, r, t) { ball(x, cx, cy, r, ['#bff8ff', '#1fb6ff', '#123a8a'], { sha: 0.4 }); x.fillStyle = '#ffffff'; for (let b = 0; b < 4; b++) { const a = t * 6 + (b * TAU) / 4; x.beginPath(); x.ellipse(cx + Math.cos(a) * r * 0.38, cy + Math.sin(a) * r * 0.38, r * 0.34, r * 0.14, a, 0, TAU); x.fill(); } x.fillStyle = '#123a8a'; x.beginPath(); x.arc(cx, cy, r * 0.14, 0, TAU); x.fill(); }
function batteryIcon(x, cx, cy, w, h, fill) {
  glow(x, cx, cy, w * 0.8, '#38e08e', 0.3); x.fillStyle = '#f4f2ff'; rr(x, cx - w / 2, cy - h / 2, w, h, h * 0.18); x.fill(); rr(x, cx + w / 2 - 4, cy - h * 0.18, w * 0.06, h * 0.36, h * 0.06); x.fill();
  x.fillStyle = '#1d1650'; rr(x, cx - w / 2 + h * 0.08, cy - h / 2 + h * 0.08, w - h * 0.16, h * 0.84, h * 0.12); x.fill();
  const g = x.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0); g.addColorStop(0, '#38e08e'); g.addColorStop(1, '#c8ff6a'); x.fillStyle = g; rr(x, cx - w / 2 + h * 0.13, cy - h / 2 + h * 0.13, (w - h * 0.26) * fill, h * 0.74, h * 0.08); x.fill();
}
function puffIcon(x, cx, cy, r, t) { glow(x, cx, cy, r * 1.8, '#56e8ff', 0.4); x.fillStyle = '#4a4c5e'; rr(x, cx - r * 1.1, cy - r * 0.2, r * 0.5, r * 0.4, 6); x.fill(); x.save(); x.translate(cx - r * 0.6, cy); x.scale(r * 4, r * 4); puff(x, 0, 0, 0, 1, t, 1, 9); x.restore(); }

// ================= C1: the stunt (0 - 36.6) =================
const LOOP = { cx: 700, cy: 300, R: 230 }, GND = 530, CW = 200;
const T1 = { detach: W(1, 'lets go'), flip: W(1, 'flips'), land: W(1, 'lands') + 0.15, texas: W(2, 'Texas'), date: W(2, 'fifteenth'), ai: W(2, 'not AI'), crowdS: W(2, 'crowd'),
  roadster: W(3, 'Roadster'), flying: W(3, 'flying car'), q: W(4, 'big question'), rocket: W(4, 'rocket'), fly: W(4, 'to fly'), how: W(4, 'how would') };
function carOnLoop(t) {                                                            // returns { cx, gy, o } for the stunt
  const Lg = 950, La = Math.PI * LOOP.R, s = (Lg + La) * (1 - Math.pow(1 - S(t, 0, 5.4), 1.7)), spin = s / (0.07 * CW);
  if (t < T1.detach) {
    if (s < Lg) return { cx: -250 + s, gy: GND, o: { spin, speed: 0.6 } };
    const th = (s - Lg) / LOOP.R, jig = t > 5.4 ? Math.sin(t * 9) * 0.004 : 0;
    return { cx: LOOP.cx + LOOP.R * Math.sin(th), gy: LOOP.cy + LOOP.R * Math.cos(th), o: { spin, rot: -th + jig, fan: 1 } };
  }
  if (t < T1.land) {
    const u = S(t, T1.detach, T1.land), roll = eio(S(t, T1.flip, T1.flip + 1.1)), k = Math.sin(Math.PI * roll);
    return { cx: lerp(LOOP.cx, 380, u), gy: LOOP.cy - LOOP.R + 460 * u * u, o: { rot: Math.PI, sy: Math.cos(Math.PI * roll), noShadow: true, spin: 40, puffs: { sillF: k, sillR: k * 0.8, rear: 0.4 * k } } };
  }
  const u = eo(S(t, T1.land, T1.land + 0.9)), sq = 1 - 0.08 * Math.sin(Math.PI * S(t, T1.land, T1.land + 0.35));
  return { cx: lerp(380, 300, u), gy: GND, o: { sx: -1, sy: sq, spin: -(lerp(380, 300, u)) / (0.07 * CW), puffs: { sillF: 0.5 * (1 - u), sillR: 0.5 * (1 - u) } } };
}
function c1(x, W, H_, t) {
  // camera: locked on the stunt, pull back to show the crowd, then push in on the parked car
  const pb = eio(S(t, 12.7, 14.2)), pi = eio(S(t, 23.4, 24.8));
  const cam = COMP.camMix(COMP.camMix(COMP.cam(640, 330, 1.0), COMP.cam(640, 360, 1.0), pb), COMP.cam(430, 450, 1.55), pi);
  COMP.withCam(x, cam, () => {
    desert(x, W, H_, t);
    testTower(x, 1120, GND - 10, 260, 1);
    // loop ramp: steel arc on legs
    x.strokeStyle = '#4b3f8c'; x.lineWidth = 8; for (const a of [0.4, 1.2, 2.0, 2.6]) { const px = LOOP.cx + (LOOP.R + 12) * Math.sin(a), py = LOOP.cy + (LOOP.R + 12) * Math.cos(a); x.beginPath(); x.moveTo(px, py); x.lineTo(px + (a > 1.5 ? 30 : 10), GND); x.stroke(); }
    x.strokeStyle = '#b9bdd6'; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.arc(LOOP.cx, LOOP.cy, LOOP.R + 8, Math.PI * 0.5 - 0.02, Math.PI * 0.5 - Math.PI - 0.25, true); x.stroke();
    x.strokeStyle = '#7f84b0'; x.lineWidth = 5; x.beginPath(); x.arc(LOOP.cx, LOOP.cy, LOOP.R + 14, Math.PI * 0.5, Math.PI * 0.5 - Math.PI - 0.25, true); x.stroke();
    const c = carOnLoop(t); car(x, c.cx, c.gy, CW, { t, py: c.o.rot === Math.PI ? 0.12 : 0, ...c.o, glowNoz: t > T1.flip && t < T1.land ? 1 : 0 });
    if (t > T1.land && t < T1.land + 1.2) { const k = 1 - S(t, T1.land, T1.land + 1.2); for (let i = 0; i < 8; i++) ball(x, 300 + (i - 3.5) * 30 * (1 + 2 * (1 - k)), GND - 6 - i % 3 * 6, 14 * k, ['#c9b8ff', '#7a6ab8', '#3a2a6c'], { sha: 0.3 }); }
    // the presenter: walks in for the question
    if (t > 28.6) {
      const px = lerp(720, 520, eo(S(t, 28.6, 29.6)));
      const R = presenter(x, px, GND + 4, 170, t, poseAt([[28.6, 'thinking'], [33.5, 'thinking'], [34.2, 'shrugging']], t), t < 34 ? 'thinking' : 'confused', { view: '3/4-left' });
      if (R) { const hp = worldJoint(R, px, GND + 4, 170, 'head'); qmark(x, hp[0] - 40, hp[1] - 50, popAt(t, T1.q, 0.4) * 0.7); }
      // a rocket icon and a dotted path up into the sky: "fly?"
      const rs = popAt(t, T1.rocket, 0.4); if (rs > 0.01) scaleAt(x, [300, 330], rs, () => rocketBooster(x, 300, 330, 70, 0.5, { t, puff: 0.6 }));
      arrow(x, [[300, 470], [320, 420], [360, 360], [420, 300]], eio(S(t, T1.fly, T1.fly + 0.6)), 'rgba(255,255,255,0.8)', 5, { dots: true });
    }
  });
  crowd(x, W, H_, t, eio(S(t, 12.8, 14.0)) * (1 - S(t, 23.3, 24.0)), S(t, T1.ai - 0.2, T1.ai + 0.3));
  tagAt(x, t, T1.texas, 23.0, 0.22 * W, 0.3 * H_, 'TEXAS', TAGC.orange, { ptr: 'down' });
  stamp(x, t, T1.ai, 23.0, 0.74 * W, 0.66 * H_, 'NOT AI', TAGC.pink, -0.1, 36);
  tagAt(x, t, T1.roadster, 35.8, 0.36 * W, 0.3 * H_, 'TESLA ROADSTER', TAGC.violet, { ptr: 'down' });
  stamp(x, t, T1.flying, 35.8, 0.56 * W, 0.17 * H_, 'FLYING CAR?', TAGC.orange, 0.05, 34);
}

// ================= C2: what Tesla showed (36.6 - 101.0) =================
const T2 = { mcg: W(5, 'McGregor'), dev: W(5, 'SpaceX helped'), wedge: W(6, 'wedge'), seats: W(6, 'Two seats'), doors: W(6, 'doors'), wing: W(6, 'rear wing'),
  fan: W(7, 'fan system'), pulls: W(7, 'pulls it down'), twog: W(7, 'two g'), clung: W(7, 'same suction'),
  perf: W(8, 'Performance'), p16: W(8, 'one point six'), thrust: W(8, 'Thrust,'), p09: W(8, 'zero point nine'), rocket: W(8, 'And Rocket'), p059: W(8, 'zero point five nine'), air: W(8, 'air ready'),
  claims: W(9, 'own claims'), indep: W(9, 'independently'), mph: W(9, 'two hundred'), miles: W(9, 'three hundred'), prod: W(9, 'production') };
function c2(x, W, H_, t) {
  if (t < 44.0) {                                                                  // the test site at night, stage lights on the car
    desert(x, W, H_, t, 200);
    testTower(x, 260, GND - 10, 300, 1); testTower(x, 1050, GND - 10, 220, 0.8);
    for (const [lx, a] of [[300, 0.4], [980, -0.4]]) { x.save(); x.globalAlpha = 0.18; x.fillStyle = '#e8f6ff'; x.beginPath(); x.moveTo(lx, 120); x.lineTo(640 - 160 + a * 100, GND); x.lineTo(640 + 160 + a * 100, GND); x.closePath(); x.fill(); x.restore(); }
    car(x, 640, GND + 10, 560, { t, glowNoz: 0 });
    tagAt(x, t, T2.mcg, 43.6, 0.24 * W, 0.24 * H_, 'MCGREGOR, TX', TAGC.orange, { ptr: 'down' });
    tagAt(x, t, T2.dev, 43.6, 0.68 * W, 0.24 * H_, 'SPACEX + TESLA', TAGC.violet);
    return;
  }
  if (t < 66.3) {                                                                  // studio: design, then the suction cutaway (and upside down)
    studio(x, W, H_);
    const up = eio(S(t, T2.clung, T2.clung + 1.4));
    x.save(); x.translate(W / 2, H_ * 0.52); x.rotate(Math.PI * up); x.translate(-W / 2, -H_ * 0.52);
    if (up > 0.02) { x.fillStyle = '#6a6e92'; x.fillRect(-200, H_ * 0.775, W + 400, 30); }
    const sweep = S(t, T2.wedge, T2.wedge + 0.9);
    car(x, 640, H_ * 0.775, 800, { t, doors: eio(S(t, T2.doors, T2.doors + 1.0)) * (1 - eio(S(t, 50.6, 51.4))), wing: eio(S(t, T2.wing, T2.wing + 0.8)), fan: S(t, T2.fan, T2.fan + 0.5) });
    if (sweep > 0 && sweep < 1) { x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * sweep); const gx = lerp(220, 1060, sweep); const g = x.createLinearGradient(gx - 60, 0, gx + 60, 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, '#ffffff'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(gx - 60, 330, 120, 260); x.restore(); }
    // atmospheric push: arrows press the car onto the surface once the fan runs
    const pa = S(t, T2.pulls, T2.pulls + 0.6) * (1 - S(t, 65.6, 66.0));
    for (let k = 0; k < 4; k++) { const X = 380 + k * 170; arrow(x, [[X, 200], [X, 230], [X, 260], [X, 300]], eio(S(t, T2.pulls + k * 0.1, T2.pulls + 0.6 + k * 0.1)), C.cyan, 9, { a: pa }); }
    x.restore();
    tagAt(x, t, 45.3, 51.4, 0.5 * W, 0.17 * H_, '2 SEATS', TAGC.cyan);
    tagAt(x, t, T2.wing + 0.4, 51.4, 0.16 * W, 0.42 * H_, 'WING', TAGC.pink, { ptr: 'right' });
    tagAt(x, t, T2.fan + 0.3, T2.clung - 0.2, 0.5 * W, 0.9 * H_, 'FAN SUCTION', TAGC.cyan, { ptr: 'up' });
    stamp(x, t, T2.twog, T2.clung - 0.2, 0.84 * W, 0.22 * H_, '> 2 G', TAGC.orange, 0.06, 40);
    tagAt(x, t, T2.clung + 1.4, 66.0, 0.5 * W, 0.86 * H_, 'UPSIDE DOWN', TAGC.violet);
    return;
  }
  // three versions in a row (C, n=3), Rocket lifts off; then the claim tags
  bgFlat(x, W, H_, '#24145e', '#0e0838', 0.4); softBlobs(x, W, H_, '#6a3cff', 7, t, 5);
  const C3 = COMP.slots.C({ n: 3 }), out = eio(S(t, 92.0, 92.7));
  const rows = [[T2.perf, 'PERFORMANCE', '< 1.6 S', T2.p16, {}], [T2.thrust, 'THRUST', '< 0.9 S', T2.p09, { rear: 0.8 }], [T2.rocket, 'ROCKET', '< 0.59 S', T2.p059, { sillF: 1, sillR: 1, rear: 0.5 }]];
  rows.forEach(([t0, name, time, tt, pf], i) => {
    const it = C3['item' + i], s = popAt(t, t0, 0.45, 1.5) * (1 - out); if (s <= 0.01) return;
    const lift = i === 2 ? 40 * eio(S(t, T2.air, T2.air + 1.0)) * (1 - out) : 0, active = i === 2 ? S(t, T2.air, T2.air + 0.4) : 0;
    if (active) glow(x, it.x * W, it.y * H_ - 20 - lift, 220, '#56e8ff', 0.45 * active);
    scaleAt(x, [it.x * W, it.y * H_ + 50], s, () => car(x, it.x * W, it.y * H_ + 50 - lift, 280, { t, wing: 1, puffs: t > tt ? pf : {} }));
    labelTag(x, it.x * W, 0.79 * H_, name, [TAGC.cyan, TAGC.orange, TAGC.pink][i], { px: 28, ptr: 'up', s: popAt(t, t0 + 0.2, 0.35, 2) * (1 - out) });
    labelTag(x, it.x * W, 0.3 * H_, time, TAGC.violet, { px: 30, s: popAt(t, tt, 0.35, 2) * (1 - out) });
  });
  stamp(x, t, T2.claims, 92.0, 0.5 * W, 0.16 * H_, 'TESLA CLAIMS', TG.red, -0.05, 36);
  stamp(x, t, T2.indep + 0.3, 92.0, 0.5 * W, 0.92 * H_, 'NOT YET TESTED', TG.red, 0.04, 30);
  // the claims as icons: speed, range, year
  const ic = COMP.slots.C({ n: 3 });
  const s1 = popAt(t, T2.mph, 0.4), s2 = popAt(t, T2.miles, 0.4), s3 = popAt(t, T2.prod, 0.4), endA = 1 - S(t, 100.4, 100.9);
  scaleAt(x, [ic.item0.x * W, ic.item0.y * H_], s1 * endA, () => { gauge(x, ic.item0.x * W, ic.item0.y * H_, 110, 0.95); });
  scaleAt(x, [ic.item1.x * W, ic.item1.y * H_], s2 * endA, () => batteryIcon(x, ic.item1.x * W, ic.item1.y * H_, 230, 120, 0.9));
  scaleAt(x, [ic.item2.x * W, ic.item2.y * H_], s3 * endA, () => { const cx = ic.item2.x * W, cy = ic.item2.y * H_; flatShade(x, () => rr(x, cx - 100, cy - 90, 200, 180, 22), ['#ffffff', '#dcdff0', '#7f84a8'], 3); x.fillStyle = '#ff3b5c'; rr(x, cx - 100, cy - 90, 200, 50, 22); x.fill(); x.fillRect(cx - 100, cy - 60, 200, 20); text(x, '2028', cx, cy + 30, 64, '#1d1650', { shadow: 'rgba(0,0,0,0)' }); });
  labelTag(x, ic.item0.x * W, 0.84 * H_, '230+ MPH', TAGC.orange, { px: 30, ptr: 'up', s: popAt(t, T2.mph + 0.3, 0.35, 2) * endA });
  labelTag(x, ic.item1.x * W, 0.84 * H_, '~300 MILES', TAGC.cyan, { px: 30, ptr: 'up', s: popAt(t, T2.miles + 0.3, 0.35, 2) * endA });
  labelTag(x, ic.item2.x * W, 0.84 * H_, 'PRODUCTION', TAGC.pink, { px: 30, ptr: 'up', s: popAt(t, T2.prod + 0.3, 0.35, 2) * endA });
}

// ================= C3: the 2018 idea, how cold gas works, where SpaceX uses it (101.0 - 168.8) =================
const T3 = { tweet: W(10, 'tweeted'), ten: W(10, 'ten small'), air: W(10, 'ultra high'), copv: W(10, 'COPV'), seats: W(10, 'back seats'),
  what: W(11, 'cold gas'), tank: W(12, 'strong tank'), hund: W(12, 'hundreds'), valve: W(12, 'valve opens'), rush: W(12, 'rushes'), nozzle: W(12, 'narrow nozzle'), faster: W(12, 'faster'),
  key: W(13, 'Pushing gas'), fwd: W(13, 'car forwards'), newton: W(13, 'Newton'), equal: W(13, 'equal'),
  fire: W(14, 'no fire'), cold: W(14, 'called cold'), falcon: W(15, 'Falcon'), nudge: W(15, 'nudge'), flip: W(15, 'flip and'), astro: W(15, 'Astronauts') };
function blueprint(x, W, H_, t) { bgFlat(x, W, H_, '#103a8c', '#0a1f5a', 0.4); x.strokeStyle = 'rgba(160,200,255,0.12)'; x.lineWidth = 1.5; for (let X = 0; X < W; X += 40) { x.beginPath(); x.moveTo(X, 0); x.lineTo(X, H_); x.stroke(); } for (let Y = 0; Y < H_; Y += 40) { x.beginPath(); x.moveTo(0, Y); x.lineTo(W, Y); x.stroke(); } }
function c3(x, W, H_, t) {
  if (t < 118.2) {                                                                 // top view: ~10 thrusters, the COPV where the back seats were
    blueprint(x, W, H_, t);
    const th = S(t, T3.ten, T3.ten + 1.4), tk = popAt(t, T3.copv, 0.45, 1.6), pf = [];
    for (let i = 0; i < 10; i++) pf.push(t > T3.ten + i * 0.14 && t < T3.ten + i * 0.14 + 0.7 ? 0.8 : 0);
    const zoomOut = 1 - 0.12 * eio(S(t, 101.0, 102.5));
    scaleAt(x, [W / 2, H_ / 2], zoomOut + 0.12, () => topCar(x, W / 2, H_ / 2, 760, 0, { t, thr: th, puffs: pf, tank: tk, seats: 1, rearSeats: 1 - S(t, T3.copv - 0.2, T3.copv + 0.2) }));
    tagAt(x, t, T3.ten + 0.4, 118.0, 0.5 * W, 0.18 * H_, '~10 THRUSTERS', TAGC.cyan);
    tagAt(x, t, T3.copv + 0.2, 118.0, 0.24 * W, 0.84 * H_, 'COPV TANK', TAGC.orange, { ptr: 'up' });
    tagAt(x, t, T3.air + 0.2, 118.0, 0.76 * W, 0.84 * H_, 'HIGH-PRESSURE AIR', TAGC.violet);
    return;
  }
  if (t < 154.0) {                                                                 // the thruster itself, then Newton's third law, then "no fire"
    blueprint(x, W, H_, t);
    const nb = S(t, T3.key - 0.4, T3.key + 0.6);                                     // diagram shrinks into a car's tail
    const diagS = 1 - eio(nb), diagC = [lerp(W * 0.5, 480, eio(nb)), lerp(H_ * 0.5, 434, eio(nb))];
    const open = eio(S(t, T3.valve, T3.valve + 0.6)), flow = S(t, T3.rush, T3.rush + 0.4), pres = lerp(0.95, 0.88, S(t, T3.rush, 147));
    scaleAt(x, diagC, diagS, () => {
      x.save(); x.translate(diagC[0] - W * 0.5, diagC[1] - H_ * 0.5);
      tank(x, W * 0.22, H_ * 0.5, 170, 300, popAt(t, T3.hund, 0.4) > 0.01 ? pres : null, { glow: popAt(t, T3.tank, 0.4) });
      x.fillStyle = '#8f95c8'; rr(x, W * 0.22 + 85, H_ * 0.5 - 18, 210, 36, 10); x.fill();                 // pipe
      ball(x, W * 0.47, H_ * 0.5, 44, ['#ffd0a0', '#ff8a3c', '#a33a1a'], { sha: 0.4 });                    // valve body
      x.save(); x.translate(W * 0.47, H_ * 0.5 - 50); x.rotate(-Math.PI / 2 * open); x.fillStyle = '#ff3b5c'; rr(x, -60, -10, 120, 20, 10); x.fill(); x.restore();
      x.fillStyle = '#8f95c8'; rr(x, W * 0.47 + 40, H_ * 0.5 - 14, 90, 28, 10); x.fill();
      nozzleBell(x, W * 0.66, H_ * 0.5, 150);
      if (flow > 0) {                                                                // gas: dots speed up through the nozzle
        for (let i = 0; i < 26; i++) { const u = ((t * 0.9 + i / 26) % 1), X = lerp(W * 0.22 + 60, W * 0.95, Math.pow(u, 2.2)), sp = 1 + 6 * Math.pow(u, 2);
          x.fillStyle = `rgba(200,250,255,${0.85 * flow})`; x.beginPath(); x.ellipse(X, H_ * 0.5 + Math.sin(i * 2.1) * 8 * (X > W * 0.7 ? 1 + (X - W * 0.7) / 60 : 0.3), 6 * sp * 0.5, 5, 0, 0, TAU); x.fill(); }
        puff(x, W * 0.71, H_ * 0.5, 0, flow, t, 520, 4);
      }
      x.restore();
    });
    const lab = 1 - S(t, T3.key - 0.4, T3.key - 0.1);
    labelTag(x, W * 0.22, 0.2 * H_, 'TANK', TAGC.cyan, { px: 28, s: popAt(t, T3.tank, 0.35, 2) * lab });
    labelTag(x, W * 0.22, 0.88 * H_, '~300× AIR PRESSURE', TAGC.orange, { px: 26, s: popAt(t, T3.hund + 0.2, 0.35, 2) * lab });
    labelTag(x, W * 0.47, 0.3 * H_, 'VALVE', TAGC.pink, { px: 28, ptr: 'down', s: popAt(t, T3.valve, 0.35, 2) * lab });
    labelTag(x, W * 0.66, 0.24 * H_, 'NOZZLE', TAGC.violet, { px: 28, ptr: 'down', s: popAt(t, T3.nozzle, 0.35, 2) * lab });
    // Newton: the thruster now sits in a car; gas goes left, the car goes right
    const nc = S(t, T3.key, T3.key + 0.6);
    if (nc > 0.01) {
      const move = 60 * eio(S(t, T3.fwd, T3.fwd + 1.6)), cx = 760 + move;
      scaleAt(x, [cx, 470], back(nc, 1.3), () => car(x, cx, 470, 560, { t, puffs: { rear: 1 }, glowNoz: 1 }));
      arrow(x, [[cx - 300, 250], [cx - 380, 250], [cx - 460, 250], [cx - 540, 250]], eio(S(t, T3.key + 0.3, T3.key + 0.9)), C.cyan, 14);
      arrow(x, [[cx - 200, 250], [cx - 120, 250], [cx - 40, 250], [cx + 40, 250]], eio(S(t, T3.fwd, T3.fwd + 0.6)), '#ff8a1f', 14);
      tagAt(x, t, T3.key + 0.5, 153.6, cx - 420, 196, 'GAS', TAGC.cyan); tagAt(x, t, T3.fwd + 0.3, 153.6, cx - 80, 196, 'CAR', TAGC.orange);
      stamp(x, t, T3.newton, 153.6, 0.5 * W, 0.84 * H_, "NEWTON'S 3RD LAW", TAGC.violet, -0.03, 32);
      // no fire: a flame crossed out, a cold snowflake-blue tag
      const nf = popAt(t, T3.fire, 0.4) * (1 - S(t, 153.4, 153.9));
      if (nf > 0.01) { scaleAt(x, [1080, 160], nf, () => { glow(x, 1080, 160, 70, '#ff8a3c', 0.6); x.fillStyle = '#ff8a3c'; x.beginPath(); x.moveTo(1080, 100); x.quadraticCurveTo(1125, 160, 1100, 200); x.lineTo(1060, 200); x.quadraticCurveTo(1035, 160, 1080, 100); x.fill(); x.fillStyle = '#ffe680'; x.beginPath(); x.ellipse(1080, 178, 14, 22, 0, 0, TAU); x.fill(); });
        badge(x, 1118, 120, 22, false, back(S(t, T3.fire + 0.3, T3.fire + 0.6), 2.2) * (1 - S(t, 153.4, 153.9))); }
      stamp(x, t, T3.cold, 153.6, 1080, 260, 'COLD GAS', TAGC.cyan, 0.06, 32);
    }
    return;
  }
  // space: a booster flips with cold gas puffs; an astronaut floats by with a thruster backpack
  sky(x, W, H_, t, { x: t * 8 });
  planet(x, 640, 1500, 900, PL.teal, { glowA: 0.4 });
  const fl = eio(S(t, T3.nudge, T3.flip + 1.6)), bp = popAt(t, 154.4, 0.5, 1.3);
  scaleAt(x, [520, 330], bp, () => rocketBooster(x, 520, 330, 380, lerp(1.25, 0.05, fl), { t, puff: S(t, T3.nudge - 0.2, T3.nudge + 0.2) * (1 - S(t, T3.flip + 1.4, T3.flip + 1.8)) }));
  tagAt(x, t, T3.falcon, 168.4, 0.24 * W, 0.24 * H_, 'FALCON 9 BOOSTER', TAGC.orange, { ptr: 'right' });
  if (t > T3.astro - 0.4) { const ax = lerp(1400, 1000, eo(S(t, T3.astro - 0.4, T3.astro + 1.4))); astronaut(x, ax, 300, 1.1, t, 0.8); tagAt(x, t, T3.astro + 0.6, 168.4, 1000, 120, 'ASTRONAUT', TAGC.cyan, { ptr: 'down' }); }
}

// ================= C4: what thrusters do on a car (168.8 - 203.4) =================
const T4 = { tyres: W(16, 'tyres'), grip: W(17, 'grip'), spins: W(17, 'spins'), thr: W(17, 'A thruster'), adds: W(17, 'adds force'), launch: W(17, 'harder launch'),
  fwd: W(18, 'forwards'), brake: W(18, 'brake'), side: W(18, 'sideways'), turn: W(18, 'turn'), burst: W(18, 'short bursts'), twist: W(18, 'twist'), flipped: W(18, 'flipped') };
function c4(x, W, H_, t) {
  if (t < 189.2) {
    const launch = Math.pow(S(t, T4.launch, T4.launch + 1.2), 2), scroll = 40 * t + 3000 * launch;
    const z = lerp(2.4, 1, eio(S(t, T4.thr - 0.3, T4.thr + 0.9)));                   // start close on the rear tyre, pull back to the whole car
    COMP.withCam(x, COMP.cam(lerp(470, 640, eio(S(t, T4.thr - 0.3, T4.thr + 0.9))), lerp(560, 400, eio(S(t, T4.thr - 0.3, T4.thr + 0.9))), z), () => {
      dayRoad(x, W, H_, t, scroll);
      const spin = S(t, T4.spins, T4.thr) > 0 && t < T4.thr ? t * 40 : scroll / 30;
      car(x, 640 + 900 * launch, H_ * 0.83, 560, { t, spin, puffs: t > T4.adds ? { rear: 1 } : {}, speed: launch > 0 ? 1 : 0 });
      const tyre = [640 - 0.31 * 560 + 900 * launch, H_ * 0.83];
      if (t > T4.spins && t < T4.thr) for (let i = 0; i < 6; i++) { const u = ((t * 2 + i / 6) % 1); ball(x, tyre[0] - 40 - u * 120, tyre[1] - 10 - u * 40, 10 + u * 26, ['#ffffff', '#e2e2ee', '#9a9ab8'], { sha: 0.2 }); }
      // force arrows at the contact patch: grip arrow (capped) + thruster arrow on top
      const a1 = eio(S(t, T4.grip - 0.3, T4.grip + 0.4)) * (1 - S(t, T4.launch, T4.launch + 0.3));
      arrow(x, [[tyre[0], tyre[1] + 14], [tyre[0] + 50, tyre[1] + 14], [tyre[0] + 100, tyre[1] + 14], [tyre[0] + 150, tyre[1] + 14]], a1, '#ff8a1f', 12);
      const a2 = eio(S(t, T4.adds, T4.adds + 0.6)) * (1 - S(t, T4.launch, T4.launch + 0.3));
      arrow(x, [[tyre[0] + 150, tyre[1] + 14], [tyre[0] + 220, tyre[1] + 14], [tyre[0] + 290, tyre[1] + 14], [tyre[0] + 360, tyre[1] + 14]], a2, C.cyan, 12);
    });
    // grip meter (UI): fills to its limit, then the thruster adds a cyan block above it
    const gm = popAt(t, T4.grip - 0.4, 0.4) * (1 - S(t, T4.launch, T4.launch + 0.3)), gx = 0.9 * W;
    if (gm > 0.01) scaleAt(x, [gx, 0.5 * H_], gm, () => {
      x.fillStyle = '#1d1650'; rr(x, gx - 34, 0.2 * H_, 68, 0.6 * H_, 20); x.fill();
      const f = eio(S(t, T4.grip, T4.grip + 1.2)), base = 0.8 * H_ - 8, hmax = 0.36 * H_;
      bar(x, gx, base, 52, hmax * f, ['#ffc07a', '#ff8a1f']);
      x.fillStyle = '#ff3b5c'; x.fillRect(gx - 42, base - hmax - 3, 84, 6);
      const e = eio(S(t, T4.adds, T4.adds + 0.6)); if (e > 0) bar(x, gx, base - hmax - 6, 52, 0.17 * H_ * e, ['#bff8ff', '#1fb6ff']);
    });
    tagAt(x, t, T4.grip + 0.4, T4.launch, 0.9 * W, 0.13 * H_, 'GRIP', TAGC.orange);
    stamp(x, t, T4.spins, T4.thr, 0.33 * W, 0.3 * H_, 'SPIN!', TG.red, -0.1, 36);
    tagAt(x, t, T4.adds + 0.3, T4.launch, 0.62 * W, 0.6 * H_, '+ THRUST', TAGC.cyan);
    return;
  }
  // top view on the track: brake, turn; then side view: twist in mid-air
  if (t < T4.burst - 0.2) {
    dayRoad(x, W, H_, t, 0); x.fillStyle = '#4a4a6a'; x.fillRect(0, 0, W, H_);
    x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 6; x.setLineDash([60, 50]); x.beginPath(); x.moveTo(0, H_ * 0.5); x.lineTo(W, H_ * 0.5); x.stroke(); x.setLineDash([]);
    const ub = S(t, T4.fwd, T4.brake + 1.0), ut = eio(S(t, T4.side, T4.turn + 1.4));
    const cx = lerp(300, 620, eo(ub)) + 260 * ut, cy = H_ * 0.5 - 170 * ut * ut, ang = -0.9 * ut;
    const pf = []; if (t > T4.fwd && t < T4.side - 0.2) pf[0] = 1; if (t > T4.side && t < T4.turn + 1.2) { pf[4] = 1; pf[8] = 0.8; }
    topCar(x, cx, cy, 420, ang, { t, thr: 1, puffs: pf });
    tagAt(x, t, T4.brake, T4.side - 0.2, cx + 230, cy - 120, 'BRAKE', TAGC.orange, { ptr: 'down' });
    tagAt(x, t, T4.turn, T4.burst - 0.4, 0.75 * W, 0.16 * H_, 'TURN', TAGC.cyan);
    return;
  }
  sky(x, W, H_, t); x.fillStyle = '#2a1d55'; x.fillRect(0, GND + 60, W, H_);
  const u = S(t, T4.twist - 0.4, 202.6), rot = TAU * eio(S(t, T4.twist, T4.twist + 1.6)) * 0.5, y = GND + 60 - 300 * Math.sin(Math.PI * u);
  const k = S(t, T4.twist, T4.twist + 0.2) * (1 - S(t, T4.twist + 1.5, T4.twist + 1.8));
  car(x, 640, y, 420, { t, py: 0.12, rot: u < 1 ? rot * (1 - S(t, T4.flipped, T4.flipped + 0.8)) + 0 : 0, puffs: { sillF: k, rear: k, nose: k * 0.6 }, glowNoz: k, noShadow: true });
  stamp(x, t, T4.twist, 202.8, 0.5 * W, 0.16 * H_, 'TWIST', TAGC.pink, 0.05, 36);
}

// ================= C5: could it hover? the maths (203.4 - 259.4) =================
const T5 = { hover: W(19, 'hover'), gravity: W(19, 'gravity'), weight: W(20, 'weight'), tonnes: W(20, 'two tonnes'), similar: W(20, 'similar'), newtons: W(20, 'twenty thousand'),
  weak: W(21, 'weak'), isp: W(21, 'specific impulse'), n73: W(21, 'seventy-three'), mostly: W(21, 'mostly nitrogen'), rocket: W(21, 'A rocket'), r300: W(21, 'three hundred'),
  kg: W(22, 'twenty-seven'), sec: W(22, 'every single'), case: W(23, 'suitcase'), empty: W(24, 'empty'), hop: W(24, 'hop'), twist: W(24, 'twist'), boost: W(24, 'boost'), cruise: W(24, 'cannot cruise') };
function c5(x, W, H_, t) {
  bgFlat(x, W, H_, '#2a1470', '#140840', 0.5); softBlobs(x, W, H_, '#8b5cff', 5, t, 5);
  if (t < 223.6) {                                                                 // forces on a hovering car
    const cx = lerp(0.5 * W, 0.32 * W, eio(S(t, T5.newtons - 0.6, T5.newtons))), hov = 12 * Math.sin(t * 2);
    car(x, cx, 0.62 * H_ + hov, 520, { t, puffs: { sillF: 1, sillR: 1 }, glowNoz: 1, noShadow: true });
    const dn = eio(S(t, T5.gravity, T5.gravity + 0.6)), upA = eio(S(t, T5.hover, T5.hover + 0.7));
    arrow(x, [[cx, 0.5 * H_], [cx, 0.62 * H_], [cx, 0.74 * H_], [cx, 0.9 * H_]], dn, '#ff3b5c', 16);
    for (const dx of [-0.31, 0.27]) arrow(x, [[cx + dx * 520, 0.84 * H_], [cx + dx * 520, 0.7 * H_], [cx + dx * 520, 0.55 * H_], [cx + dx * 520, 0.42 * H_]], upA, C.cyan, 14);
    tagAt(x, t, T5.gravity + 0.2, 223.4, cx + 90, 0.88 * H_, 'GRAVITY', TG.red, { ptr: 'left' });
    tagAt(x, t, T5.hover + 0.3, 223.4, cx - 0.31 * 520, 0.34 * H_, 'THRUST', TAGC.cyan, { ptr: 'down' });
    tagAt(x, t, T5.tonnes, 223.4, cx, 0.22 * H_, '~2 TONNES', TAGC.orange);
    stamp(x, t, T5.tonnes + 0.6, 223.4, cx + 150, 0.15 * H_, 'ASSUMED', TG.red, 0.1, 26);
    const ns = popAt(t, T5.newtons, 0.4); if (ns > 0.01) { x.save(); x.translate(0.7 * W, 0.5 * H_); x.scale(ns, ns); text(x, Math.round(20000 * eio(S(t, T5.newtons, T5.newtons + 1.2))).toLocaleString('en-US') + ' N', 0, 0, 104, C.yellow); x.restore(); glow(x, 0.7 * W, 0.5 * H_, 200, '#ffd23f', 0.2 * ns); }
    tagAt(x, t, T5.newtons + 0.8, 223.4, 0.7 * W, 0.66 * H_, 'NON-STOP', TAGC.pink);
    return;
  }
  if (t < 238.2) {                                                                 // specific impulse: cold gas vs a burning rocket (bars to scale)
    const base = 0.8 * H_, k = 1.43 / 2.1, c1x = 0.36 * W, c2x = 0.64 * W;
    const g1 = eio(S(t, T5.n73, T5.n73 + 0.8)), g2 = eio(S(t, T5.r300, T5.r300 + 1.0));
    x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(0.2 * W, base, 0.6 * W, 4);
    bar(x, c1x, base, 150, Math.max(4, 73 * k * 2.1 * g1), ['#bff8ff', '#1fb6ff'], popAt(t, T5.isp, 0.4));
    bar(x, c2x, base, 150, Math.max(4, 300 * k * 2.1 * g2), ['#ffe680', '#ff8a1f'], popAt(t, T5.rocket, 0.4));
    if (g1 > 0.05) text(x, Math.round(73 * g1) + ' s', c1x, base - 73 * k * 2.1 * g1 - 44, 56, '#ffffff');
    if (g2 > 0.05) text(x, '~' + Math.round(300 * g2) + ' s', c2x, base - 300 * k * 2.1 * g2 - 44, 56, C.yellow);
    if (t > T5.rocket) glow(x, c2x, base - 300 * k * 2.1 * g2, 160, '#ff8a1f', 0.25 * g2);
    labelTag(x, c1x, 0.88 * H_, 'COLD GAS', TAGC.cyan, { px: 28, ptr: 'up', s: popAt(t, T5.isp + 0.2, 0.35, 2) });
    labelTag(x, c2x, 0.88 * H_, 'ROCKET ENGINE', TAGC.orange, { px: 28, ptr: 'up', s: popAt(t, T5.rocket + 0.2, 0.35, 2) });
    tagAt(x, t, T5.isp, 0, 0.16 * W, 0.24 * H_, 'EFFICIENCY', TAGC.violet);
    tagAt(x, t, T5.mostly, 0, 0.16 * W, 0.34 * H_, 'AIR ≈ NITROGEN', TAGC.cyan);
    stamp(x, t, T5.weak, 0, 0.36 * W, 0.2 * H_, 'WEAK', TG.red, -0.08, 34);
    return;
  }
  if (t < 249.4) {                                                                 // 27 kg of air every second = a suitcase per second
    const cx = 0.27 * W, cy = 0.56 * H_ + 10 * Math.sin(t * 2);
    car(x, cx, cy, 380, { t, puffs: { sillF: 1, sillR: 1 }, glowNoz: 1, noShadow: true });
    const n = Math.round(27 * eio(S(t, T5.kg, T5.kg + 1.2))), land = S(t, T5.kg + 1.2, T5.kg + 1.5), pp = 1 + 0.2 * Math.sin(Math.PI * land);
    glow(x, 0.66 * W, 0.4 * H_, 300, '#140850', 0.8);
    if (t > T5.kg - 0.1) { x.save(); x.translate(0.66 * W, 0.4 * H_); x.scale(pp, pp); text(x, n + ' kg', 0, 0, 130, land > 0 ? C.yellow : '#ffffff'); x.restore(); }
    labelTag(x, 0.66 * W, 0.56 * H_, 'EVERY SECOND', TAGC.pink, { px: 30, s: popAt(t, T5.sec, 0.35, 2) });
    for (let i = 0; i < 6; i++) { const t0 = T5.case + i * 0.7, u = S(t, t0, t0 + 1.2); if (u <= 0 || u >= 1) continue; suitcase(x, cx - 60 - 200 * u + i * 6, cy + 30 + 380 * u * u, 1.1, u * 3 + i); }
    tagAt(x, t, T5.case + 0.3, 0, cx, 0.2 * H_, '1 SUITCASE / S', TAGC.orange);
    return;
  }
  // the tank empties in seconds; the car can hop, twist, boost, but not cruise
  const drain = 1 - eio(S(t, T5.empty - 0.6, T5.empty + 1.6)), tx = 0.13 * W;
  tank(x, tx, 0.52 * H_, 110, 260, drain, {});
  labelTag(x, tx, 0.88 * H_, drain < 0.05 ? 'EMPTY' : 'TANK', drain < 0.05 ? TG.red : TAGC.cyan, { px: 28, s: popAt(t, 249.6, 0.35, 2) });
  x.fillStyle = '#2a1d55'; x.fillRect(0.25 * W, 0.82 * H_, 0.75 * W, 0.2 * H_);
  const hp = S(t, T5.hop, T5.hop + 0.9), tw = S(t, T5.twist, T5.twist + 0.9), bs = S(t, T5.boost, T5.boost + 1.0);
  const X = 0.42 * W + 420 * eio(bs), Y = 0.82 * H_ - 160 * Math.sin(Math.PI * hp), rot = TAU * 0.5 * eio(tw) * (tw < 1 ? 1 : 0);
  car(x, X, Y, 330, { t, py: 0.12, rot: tw > 0 && tw < 1 ? rot : 0, speed: bs > 0 && bs < 1 ? 1 : 0, puffs: { sillF: Math.sin(Math.PI * hp), sillR: Math.sin(Math.PI * hp) + Math.sin(Math.PI * tw), rear: Math.sin(Math.PI * bs) } });
  stamp(x, t, T5.hop, 0, 0.42 * W, 0.24 * H_, 'HOP', TAGC.cyan, -0.08, 30); stamp(x, t, T5.twist, 0, 0.6 * W, 0.2 * H_, 'TWIST', TAGC.pink, 0.06, 30); stamp(x, t, T5.boost, 0, 0.78 * W, 0.24 * H_, 'BOOST', TAGC.orange, -0.04, 30);
  // "cruise through the sky": a dotted flight path that gets crossed out
  arrow(x, [[0.7 * W, 0.7 * H_], [0.78 * W, 0.5 * H_], [0.85 * W, 0.42 * H_], [0.93 * W, 0.36 * H_]], eio(S(t, T5.cruise - 0.4, T5.cruise + 0.3)), 'rgba(255,255,255,0.8)', 7, { dots: true });
  badge(x, 0.85 * W, 0.42 * H_, 30, false, back(S(t, T5.cruise + 0.4, T5.cruise + 0.7), 2.2));
}

// ================= C6: why not on our roads (259.4 - 300.5) =================
const T6 = { reasons: W(25, 'more reasons'), tanks: W(26, 'Tanks'), checked: W(26, 'checked'), failure: W(26, 'failure'), explode: W(26, 'explode'), y2016: W(26, 'sixteen'),
  air: W(27, 'Air blasting'), grit: W(27, 'grit'), lane: W(27, 'no lane'), approved: W(27, 'not approved'), refill: W(28, 'Refilling'), pump: W(28, 'onboard pump'), slow: W(28, 'slow'), blast: W(28, 'blast') };
function c6(x, W, H_, t) {
  if (t > T6.tanks - 0.2 && t < T6.air - 0.3) {                                    // pressure tanks: checked, and the 2016 pad explosion
    bgFlat(x, W, H_, '#2a2a4a', '#12121f', 0.3);
    const tc = 0.3 * W; tank(x, tc, 0.52 * H_, 170, 360, 0.95, { crack: 0 });
    [0, 1, 2].forEach((k) => badge(x, tc + 130, 0.32 * H_ + k * 90, 22, true, back(S(t, T6.checked + k * 0.25, T6.checked + 0.3 + k * 0.25), 2.2)));
    labelTag(x, tc, 0.9 * H_, 'EXTREME PRESSURE', TAGC.orange, { px: 28, s: popAt(t, T6.tanks + 0.2, 0.35, 2) });
    const rs = popAt(t, T6.failure, 0.45, 1.4);
    if (rs > 0.01) scaleAt(x, [0.7 * W, 0.6 * H_], rs, () => {
      testTower(x, 0.7 * W - 70, 0.82 * H_, 300, 1);
      rocketBooster(x, 0.7 * W, 0.6 * H_, 300, 0, { t, burst: S(t, T6.explode, T6.explode + 0.4) * (1 - 0.5 * S(t, T6.explode + 1, T6.explode + 3)) });
      if (t > T6.explode) burst(x, 0.7 * W, 0.5 * H_, (t - T6.explode) * 0.9, 16, 260);
    });
    tagAt(x, t, T6.y2016, 0, 0.7 * W, 0.16 * H_, '2016', TAGC.pink);
    tagAt(x, t, T6.explode + 0.4, 0, 0.88 * W, 0.4 * H_, 'FALCON 9', TAGC.violet);
    return;
  }
  cityNight(x, W, H_, t);
  const blast = t > T6.air && t < T6.lane ? S(t, T6.air, T6.air + 0.3) : 0;
  car(x, 0.62 * W, 0.86 * H_, 420, { t, puffs: blast ? { sillF: blast, sillR: blast, rear: blast } : {}, glowNoz: blast });
  if (t > T6.grit && t < T6.lane) for (let i = 0; i < 18; i++) { const r = H.rng(70 + i), u = ((t - T6.grit) * 1.4 + r()) % 1; ball(x, 0.5 * W - 420 * u * r.range(0.6, 1), 0.86 * H_ - 10 - 160 * u * r.range(0.2, 1) + 200 * u * u, 6 + r() * 8, ['#d9c8a8', '#9a8460', '#4a3a20'], { sha: 0.3 }); }
  // the presenter on the pavement reacts
  const pose = t < T6.grit ? 'thinking' : t < T6.lane ? 'reacting' : t < T6.refill ? 'explaining' : 'thinking';
  presenter(x, 0.14 * W, 0.92 * H_, 300, t, pose, t < T6.grit ? 'thinking' : t < T6.lane ? 'surprised' : t < T6.refill ? 'neutral' : 'thinking', { view: '3/4' });
  stamp(x, t, T6.grit + 0.2, T6.lane - 0.2, 0.3 * W, 0.42 * H_, 'DEBRIS', TG.red, -0.08, 32);
  sign(x, 0.86 * W, 0.4 * H_, 150, popAt(t, T6.lane, 0.4) * (1 - S(t, T6.refill - 0.3, T6.refill)));
  badge(x, 0.86 * W + 70, 0.4 * H_ - 70, 26, false, back(S(t, T6.lane + 0.4, T6.lane + 0.7), 2.2) * (1 - S(t, T6.refill - 0.3, T6.refill)));
  labelTag(x, 0.5 * W, 0.2 * H_, 'ROCKET VERSION:\nNOT ROAD APPROVED', TG.red, { px: 30, rot: -0.04, s: popAt(t, T6.approved, 0.4, 2) * (1 - S(t, T6.refill - 0.3, T6.refill)) });
  // refilling: a slow pump trickle vs a blast that drains in seconds
  const rf = popAt(t, T6.refill, 0.4) * (1 - S(t, 300.2, 300.6));
  if (rf > 0.01) scaleAt(x, [0.5 * W, 0.3 * H_], rf, () => {
    x.fillStyle = '#2a2f86'; rr(x, 0.3 * W, 0.1 * H_, 0.4 * W, 0.36 * H_, 24); x.fill(); x.strokeStyle = '#8f86d8'; x.lineWidth = 4; rr(x, 0.3 * W, 0.1 * H_, 0.4 * W, 0.36 * H_, 24); x.stroke(); tank(x, 0.36 * W + 35, 0.28 * H_, 80, 0.26 * H_, null, {});
    const lvl = t < T6.blast ? 0.2 + 0.25 * S(t, T6.pump, T6.blast) : (0.45 - 0.42 * eio(S(t, T6.blast, T6.blast + 0.8)));
    bar(x, 0.36 * W + 35, 0.41 * H_ - 6, 56, (0.26 * H_ - 12) * lvl, ['#bff8ff', '#1fb6ff']);
    labelTag(x, 0.55 * W, 0.2 * H_, 'PUMP: SLOW', TAGC.orange, { px: 26, s: popAt(t, T6.slow, 0.35, 2) });
    labelTag(x, 0.55 * W, 0.35 * H_, 'BLAST: SECONDS', TAGC.cyan, { px: 26, s: popAt(t, T6.blast, 0.35, 2) });
  });
}

// ================= C7: the verdict (300.5 - 329) =================
const T7 = { notReally: W(29, 'Not really'), fast: W(29, 'very fast'), trick: W(29, 'trick'), jump: W(29, 'jump'), spin: W(29, 'spin'), land: W(29, 'and land'),
  batt: W(30, 'Batteries'), suc: W(30, 'Suction'), puff: W(30, 'cold gas'), future: W(31, 'future'), shows: W(31, 'this one shows'), never: W(31, 'never seen') };
function c7(x, W, H_, t) {
  const pull = eio(S(t, 300.5, 301.6)), cam = COMP.cam(lerp(560, 640, pull), lerp(420, 360, pull), lerp(1.3, 1, pull));
  COMP.withCam(x, cam, () => {
    desert(x, W, H_, t);
    // the car: hops, spins, lands on the words; later climbs the loop again and launches into the stars
    const j = S(t, T7.jump, T7.land + 0.5), hop = 140 * Math.sin(Math.PI * j), r = TAU * eio(S(t, T7.spin, T7.land));
    const k = Math.sin(Math.PI * j);
    let cx = 760, gy = GND - hop, o = { t, py: 0.12, rot: j > 0 && j < 1 ? r : 0, puffs: { sillF: k, sillR: k }, glowNoz: k };
    const go = S(t, 322.0, 327.6);
    if (go > 0) { const u = eio(go); cx = 760 + 700 * u; gy = GND - 520 * u * u; o = { t, rot: -0.6 * u, speed: 1, puffs: { rear: 1, sillF: u, sillR: u }, glowNoz: 1, noShadow: true }; }
    car(x, cx, gy, 300, o);
    const pose = t < T7.notReally ? 'thinking' : t < T7.batt ? 'explaining' : t < 321.5 ? 'presenting' : { ...POSES.waving, L: [22 + 4 * Math.sin(t * 8), -92, 4] };
    presenter(x, 400, GND + 4, 220, t, pose, t < T7.notReally ? 'thinking' : 'happy');
  });
  stamp(x, t, T7.notReally, T7.batt - 0.3, 0.5 * W, 0.2 * H_, 'NOT REALLY', TG.red, -0.06, 36);
  tagAt(x, t, T7.fast, T7.batt - 0.3, 0.78 * W, 0.3 * H_, 'FAST EV', TAGC.cyan);
  tagAt(x, t, T7.trick, T7.batt - 0.3, 0.78 * W, 0.4 * H_, '+ AIR TRICK', TAGC.orange);
  // battery = speed, fan = grip, puff = the impossible moments (one row, C n=3), then they fade as the car leaves
  const C3 = COMP.slots.C({ n: 3, m: 0.15 }), out = 1 - S(t, 321.2, 321.8), y = 0.24 * H_;
  [[T7.batt, 'SPEED', TAGC.cyan, (cx) => batteryIcon(x, cx, y, 150, 76, 0.9)], [T7.suc, 'GRIP', TAGC.violet, (cx) => fanIcon(x, cx, y, 54, t)], [T7.puff, 'PUFF', TAGC.orange, (cx) => puffIcon(x, cx, y, 40, t)]].forEach(([t0, lab, col, fn], i) => {
    const cx = C3['item' + i].x * W, s = popAt(t, t0, 0.4, 1.8) * out; if (s <= 0.01) return;
    scaleAt(x, [cx, y], s, () => fn(cx)); labelTag(x, cx, y + 76, lab, col, { px: 28, ptr: 'up', s });
  });
}

// ================= director =================
const CH = [[W(2, 'fifteenth'), 'OCT 15, 2026', TAGC.orange], [36.9, 'THE REVEAL', TAGC.violet], [101.3, '2018 IDEA', TAGC.orange], [118.3, 'COLD GAS', TAGC.cyan],
  [169.1, 'ON A CAR', TAGC.pink], [203.7, 'CAN IT HOVER?', TAGC.violet], [259.6, 'ON OUR ROADS?', TG.red], [300.8, 'VERDICT', TAGC.orange]];
function chapterTag(x, t) {
  let i = -1; CH.forEach((c, k) => { if (t >= c[0]) i = k; }); if (i < 0) return;
  const [t0, lab, col] = CH[i], next = CH[i + 1] ? CH[i + 1][0] : 1e9;
  barTag(x, lab, col, { w: 0.1 + lab.length * 0.017, s: S(t, t0, t0 + 0.5), a: 1 - S(t, next - 0.3, next), px: 28 });
}
const CUTS = [[0, c1], [36.6, c2], [101.0, c3], [168.8, c4], [203.4, c5], [259.4, c6], [300.5, c7]];
function explainer(x, W, H_, t) {
  let i = 0; CUTS.forEach((c, k) => { if (t >= c[0]) i = k; });
  const [t0, fn] = CUTS[i], prev = i > 0 ? CUTS[i - 1][1] : null, u = S(t, t0, t0 + 0.8);
  if (prev && u < 1) {                                                            // every chapter enters with an on-style wipe from the previous one
    const kind = i % 3;
    if (kind === 0) { prev(x, W, H_, t); COMP.wipe.iris(x, u, W / 2, H_ / 2, () => fn(x, W, H_, t), W, H_); }
    else if (kind === 1) { prev(x, W, H_, t); COMP.wipe.diag(x, u, () => fn(x, W, H_, t), W, H_); }
    else COMP.wipe.slide(x, u, 'r', () => prev(x, W, H_, t), () => fn(x, W, H_, t), W, H_);
  } else fn(x, W, H_, t);
  chapterTag(x, t);
}
