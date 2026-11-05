// "Tesla Roadster: the technology behind an electric supercar". One page, narration = emotive-speech owen (job 28cf5337, 129.35 s).
// Every time below is a word start from transcribe/words (job 9852bbab). Storyboard: ../storyboard/storyboard.md
// Shots: S1 sunset road (A -> D) | push-in + bloom | S2 pack (E -> D -> A -> custom grid) | diag | S3 circuit (C, n=3) | push-in + bloom |
//        S4 motor cutaway (A) | diag | torque chart (custom) | iris | speedo (D) | slide | S5 regen road (A, x-ray) | cut | S6 finale (G + loop).
const DURATION = 130.5;
//PLACEMENTS-START
const PLACEMENTS = [
  { id: 'S1 car (A)', role: 'content', x0: 0.25, y0: 0.47, x1: 0.75, y1: 0.86 },
  { id: 'S1 icons row', role: 'content', x0: 0.24, y0: 0.15, x1: 0.76, y1: 0.33 },
  { id: 'S1 icon tags', role: 'label', x0: 0.24, y0: 0.35, x1: 0.76, y1: 0.41 },
  { id: 'road + hills', role: 'bg', x0: 0, y0: 0, x1: 1, y1: 1 },
  { id: 'chapter bar', role: 'tag', x0: 0, y0: 0.06, x1: 0.34, y1: 0.13 },
  { id: 'S2 number (E)', role: 'content', x0: 0.29, y0: 0.4, x1: 0.71, y1: 0.6 },
  { id: 'S2 matrix (E)', role: 'content', x0: 0.08, y0: 0.25, x1: 0.92, y1: 0.9 },
  { id: 'S2 grid', role: 'content', x0: 0.07, y0: 0.29, x1: 0.81, y1: 0.86 },
  { id: 'S2 below-35 tag', role: 'label', x0: 0.83, y0: 0.17, x1: 0.94, y1: 0.23 },
  ...[0.17, 0.5, 0.83].map((c, i) => ({ id: 'S3 item' + i, role: 'content', x0: c - 0.11, y0: 0.44, x1: c + 0.11, y1: 0.68 })),
  { id: 'S3 inverter tag', role: 'label', x0: 0.42, y0: 0.75, x1: 0.58, y1: 0.81 },
  { id: 'S4 stator (A)', role: 'content', x0: 0.3, y0: 0.15, x1: 0.7, y1: 0.85 },
  { id: 'S4 field tag', role: 'label', x0: 0.79, y0: 0.18, x1: 0.91, y1: 0.3 },
  { id: 'chart', role: 'content', x0: 0.12, y0: 0.17, x1: 0.9, y1: 0.82 },
  { id: 'speedo (D subject)', role: 'content', x0: 0.2, y0: 0.26, x1: 0.53, y1: 0.84 },
  { id: 'speedo number (D object)', role: 'content', x0: 0.54, y0: 0.42, x1: 0.8, y1: 0.62 },
  { id: 'S6 odometer tag', role: 'label', x0: 0.78, y0: 0.1, x1: 0.92, y1: 0.17 },
];
//PLACEMENTS-END

// ---------------- helpers ----------------
const S = (t, a, b) => COMP.seg(t, a, b);
const popAt = (t, a, d = 0.35, s = 1.8) => back(S(t, a, a + d), s);
const ramp = (d) => (d <= 0 ? 0 : d < 0.8 ? (d * d) / 1.6 : d - 0.4);          // smooth start of a constant spin
const TG = { ...TAGC, green: ['#18b765', '#86f0b6'], red: ['#ff3b5c', '#ff9aa8'] };
const tagAt = (x, t, t0, t1, cx, cy, label, col, o = {}) => labelTag(x, cx, cy, label, col, { px: 28, ...o, s: popAt(t, t0, 0.35, 2) * (t1 ? 1 - S(t, t1, t1 + 0.3) : 1) });
function polyAt(P, u) {                                                          // point at fraction u of a polyline's length
  let L = 0; const d = []; for (let i = 1; i < P.length; i++) { d.push(Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1])); L += d[i - 1]; }
  let r = cl(u) * L; for (let i = 0; i < d.length; i++) { if (r <= d[i] || i === d.length - 1) { const k = d[i] ? r / d[i] : 0; return [lerp(P[i][0], P[i + 1][0], k), lerp(P[i][1], P[i + 1][1], k)]; } r -= d[i]; }
  return P[P.length - 1];
}
function flowDots(x, P, t, speed, col, n, r, a = 1) {                           // glowing energy dots travelling along a polyline (speed < 0 = backwards)
  if (a <= 0.01) return;
  x.save(); x.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const u = (((t * speed + i / n) % 1) + 1) % 1, p = polyAt(P, u); glow(x, p[0], p[1], r * 3, col, 0.8); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(p[0], p[1], r * 0.7, 0, TAU); x.fill(); }
  x.restore();
}
function arcPts(c, R, a0, a1) {                                                  // cubic Bezier for a circular arc (<= 120 deg)
  const k = (4 / 3) * Math.tan((a1 - a0) / 4) * R, p0 = [c[0] + R * Math.cos(a0), c[1] + R * Math.sin(a0)], p3 = [c[0] + R * Math.cos(a1), c[1] + R * Math.sin(a1)];
  return [p0, [p0[0] - k * Math.sin(a0), p0[1] + k * Math.cos(a0)], [p3[0] + k * Math.sin(a1), p3[1] - k * Math.cos(a1)], p3];
}

// ---------------- places ----------------
const PAL = {
  sunset: { s0: '#ff8a5c', s1: '#ffd59a', sun: '#fff1b8', hill: '#c0567e', hill2: '#9a4378', edge: '#5b3f86', road: '#3b2a63', dash: '#ffd98a' },
  dusk: { s0: '#141c5a', s1: '#4c5cc4', sun: '#a9bcff', hill: '#26307a', hill2: '#1b2363', edge: '#2a3270', road: '#11163a', dash: '#8fa2ff' },
  pink: { s0: '#ff5d8f', s1: '#ffc7a6', sun: '#fff3c4', hill: '#c2457a', hill2: '#a33a72', edge: '#5c2f7a', road: '#3a1f55', dash: '#ffe0a0' },
};
function hills(x, W, H_, base, col, off, amp, f, ph) {
  x.fillStyle = col; x.beginPath(); x.moveTo(-W, H_);
  for (let X = -W; X <= 2 * W + 20; X += 20) { const q = X + off; x.lineTo(X, base - amp * (0.55 + 0.45 * Math.sin(q * f + ph)) * (0.7 + 0.3 * Math.sin(q * f * 2.3 + ph * 2))); }
  x.lineTo(2 * W, H_); x.closePath(); x.fill();
}
function road(x, W, H_, t, P, scroll) {
  const g = x.createLinearGradient(0, 0, 0, H_ * 0.7); g.addColorStop(0, P.s0); g.addColorStop(1, P.s1); x.fillStyle = g; x.fillRect(-W, -H_, W * 3, H_ * 3);
  glow(x, W * 0.74, H_ * 0.5, 300, P.sun, 0.55); x.fillStyle = P.sun; x.beginPath(); x.arc(W * 0.74, H_ * 0.53, 64, 0, TAU); x.fill();
  hills(x, W, H_, H_ * 0.6, P.hill2, scroll * 0.12, 110, 0.004, 1);
  hills(x, W, H_, H_ * 0.69, P.hill, scroll * 0.3, 60, 0.008, 2);
  x.fillStyle = P.edge; x.fillRect(-W, H_ * 0.7, W * 3, H_);
  x.fillStyle = P.road; x.fillRect(-W, H_ * 0.73, W * 3, H_);
  x.fillStyle = P.dash; const off = ((scroll % 240) + 240) % 240;
  for (let X = -off - 240; X < W + 240; X += 240) { rr(x, X, H_ * 0.9, 120, 10, 5); x.fill(); }
}

// ---------------- the car (side view, faces right; local units: length 1, ground y 0) ----------------
const CARC = ['#ff9a9a', '#e8283c', '#6e0d3a'];
const LOC = { bat: [-0.17, -0.115], pem: [-0.43, -0.137], mot: [-0.31, -0.075] };   // battery behind the seats, power electronics at the rear, motor at the rear axle
const carPt = (car, p) => [car.cx + p[0] * car.w, car.gy + p[1] * car.w];
function carBody(x) {
  x.moveTo(-0.48, -0.045); x.lineTo(-0.505, -0.13); x.quadraticCurveTo(-0.505, -0.2, -0.43, -0.205); x.lineTo(-0.16, -0.21);
  x.lineTo(0.14, -0.19); x.quadraticCurveTo(0.38, -0.18, 0.47, -0.135); x.quadraticCurveTo(0.525, -0.11, 0.51, -0.06); x.lineTo(0.48, -0.04); x.lineTo(-0.46, -0.04); x.closePath();
}
function wheel(x, X, Y, r, ang) {
  x.fillStyle = '#211a3d'; x.beginPath(); x.arc(X, Y, r, 0, TAU); x.fill();
  x.fillStyle = '#3a3260'; x.beginPath(); x.arc(X, Y, r * 0.9, 0, TAU); x.fill();
  const g = x.createLinearGradient(X - r, Y - r, X + r, Y + r); g.addColorStop(0, '#f4f2ff'); g.addColorStop(1, '#8d87bd'); x.fillStyle = g; x.beginPath(); x.arc(X, Y, r * 0.62, 0, TAU); x.fill();
  x.strokeStyle = '#4a4380'; x.lineWidth = r * 0.14; x.lineCap = 'round';
  for (let k = 0; k < 5; k++) { const a = ang + (k * TAU) / 5; x.beginPath(); x.moveTo(X + Math.cos(a) * r * 0.15, Y + Math.sin(a) * r * 0.15); x.lineTo(X + Math.cos(a) * r * 0.55, Y + Math.sin(a) * r * 0.55); x.stroke(); }
  x.fillStyle = '#d9d4ff'; x.beginPath(); x.arc(X, Y, r * 0.14, 0, TAU); x.fill();
}
function compBox(x, X, Y, w, h, col, gA, gc) { glow(x, X + w / 2, Y + h / 2, Math.max(w, h) * 1.3, gc, 0.2 + 0.6 * gA); flatShade(x, () => rr(x, X, Y, w, h, 0.012), col, 0.004); }
function roadster(x, cx, gy, w, o = {}) {
  const xr = o.xray || 0, t = o.t || 0, sp = o.speed || 0;
  x.save(); x.translate(cx, gy); x.scale(w, w);
  x.fillStyle = 'rgba(20,8,50,0.32)'; x.beginPath(); x.ellipse(0, 0.004, 0.52, 0.028, 0, 0, TAU); x.fill();
  if (sp > 0.02) {                                                               // speed lines
    x.save(); x.lineCap = 'round'; const r = H.rng(7);
    for (let i = 0; i < 6; i++) { const y = -0.05 - i * 0.035, L = 0.12 + r() * 0.25, x0 = -0.55 - r() * 0.08 - ((t * 3 + r()) % 1) * 0.12; x.strokeStyle = `rgba(255,255,255,${0.6 * sp})`; x.lineWidth = 0.008; x.beginPath(); x.moveTo(x0, y); x.lineTo(x0 - L * sp, y); x.stroke(); }
    x.restore();
  }
  x.save(); x.globalAlpha *= 1 - 0.74 * xr;
  flatShade(x, () => carBody(x), CARC, 0.012, true, [0, -0.12, 0.5]);
  x.fillStyle = '#26306e'; x.beginPath(); x.moveTo(0.15, -0.19); x.lineTo(0.05, -0.262); x.lineTo(0.012, -0.258); x.lineTo(0.1, -0.19); x.closePath(); x.fill();   // windscreen
  x.strokeStyle = 'rgba(180,220,255,0.6)'; x.lineWidth = 0.004; x.beginPath(); x.moveTo(0.125, -0.198); x.lineTo(0.055, -0.25); x.stroke();
  x.fillStyle = '#3a0f2e'; rr(x, -0.115, -0.252, 0.045, 0.05, 0.015); x.fill();                                                                   // headrest
  x.fillStyle = 'rgba(60,5,30,0.55)'; x.beginPath(); x.ellipse(-0.13, -0.105, 0.075, 0.022, -0.05, 0, TAU); x.fill();                             // side scoop
  x.strokeStyle = 'rgba(80,5,35,0.5)'; x.lineWidth = 0.003; x.beginPath(); x.moveTo(-0.02, -0.19); x.quadraticCurveTo(0.0, -0.1, -0.03, -0.05); x.stroke();
  x.fillStyle = '#fff6d0'; x.beginPath(); x.ellipse(0.475, -0.12, 0.022, 0.012, -0.3, 0, TAU); x.fill();
  x.fillStyle = '#ff3b5c'; rr(x, -0.507, -0.16, 0.018, 0.035, 0.006); x.fill();
  x.restore();
  if (xr > 0.01) { x.save(); x.strokeStyle = `rgba(200,240,255,${0.8 * xr})`; x.lineWidth = 0.004; x.beginPath(); carBody(x); x.stroke(); x.restore(); }
  if (o.lights) glow(x, 0.5, -0.12, 0.09, '#fff2b0', 0.5 * o.lights);
  if (o.brake) glow(x, -0.5, -0.145, 0.1, '#ff3b5c', 0.85 * o.brake);
  for (const wx of [-0.31, 0.31]) { x.fillStyle = '#1a0f2e'; x.beginPath(); x.arc(wx, -0.075, 0.088, 0, TAU); x.fill(); wheel(x, wx, -0.075, 0.075, o.spin || 0); }
  if (o.wheelGlow) { x.strokeStyle = `rgba(56,224,142,${o.wheelGlow})`; x.lineWidth = 0.012; x.beginPath(); x.arc(-0.31, -0.075, 0.095, 0, TAU); x.stroke(); glow(x, -0.31, -0.075, 0.16, '#38e08e', 0.4 * o.wheelGlow); }
  if (xr > 0.01) {
    x.save(); x.globalAlpha *= xr;
    compBox(x, -0.27, -0.165, 0.2, 0.1, ['#9ff7ff', '#1fb6ff', '#123a8a'], o.glowBat || 0, '#56e8ff');
    x.fillStyle = 'rgba(255,255,255,0.55)'; for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) { x.beginPath(); x.arc(-0.255 + i * 0.0245, -0.145 + j * 0.03, 0.008, 0, TAU); x.fill(); }
    compBox(x, -0.475, -0.175, 0.085, 0.075, ['#ffc0d8', '#ff4f8b', '#7a1046'], o.glowPem || 0, '#ff5d8f');
    glow(x, LOC.mot[0], LOC.mot[1], 0.13, '#8b5cff', 0.3 + 0.6 * (o.glowMot || 0)); ball(x, LOC.mot[0], LOC.mot[1], 0.05, ['#d9c8ff', '#8b5cff', '#3a1f8c'], { sha: 0.45 });
    x.strokeStyle = 'rgba(255,210,63,0.75)'; x.lineWidth = 0.006; x.lineJoin = 'round'; x.beginPath(); x.moveTo(...LOC.bat); x.lineTo(...LOC.pem); x.lineTo(...LOC.mot); x.stroke();
    if (o.flow) flowDots(x, [LOC.bat, LOC.pem, LOC.mot], t, 0.55 * o.flow, o.flowCol || C.yellow, 7, 0.012);
    x.restore();
  }
  x.restore();
}

// ---------------- props ----------------
function bolt(x, cx, cy, s, a) {
  if (a <= 0.01) return; x.save(); x.globalAlpha *= a; glow(x, cx, cy, s * 2.4, '#ffd23f', 0.6);
  x.translate(cx, cy); x.scale(s, s); x.fillStyle = '#ffd23f'; x.beginPath();
  [[0.15, -1], [-0.5, 0.12], [-0.05, 0.12], [-0.25, 1], [0.5, -0.22], [0.06, -0.22], [0.35, -1]].forEach(([a1, b], i) => (i ? x.lineTo(a1, b) : x.moveTo(a1, b)));
  x.closePath(); x.fill(); x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.moveTo(0.15, -0.9); x.lineTo(-0.3, 0.05); x.lineTo(-0.18, 0.05); x.closePath(); x.fill(); x.restore();
}
function engineIcon(x, cx, cy, s) {
  x.fillStyle = 'rgba(40,10,40,0.3)'; rr(x, cx - s * 0.48, cy - s * 0.18, s, s * 0.62, s * 0.08); x.fill();
  flatShade(x, () => rr(x, cx - s * 0.5, cy - s * 0.22, s, s * 0.6, s * 0.08), ['#d9dcff', '#8f95c8', '#3e4280'], s * 0.02);
  for (let i = 0; i < 3; i++) flatShade(x, () => rr(x, cx - s * 0.36 + i * s * 0.26, cy - s * 0.46, s * 0.2, s * 0.28, s * 0.04), ['#ffd0a0', '#e0884a', '#7a3a3a'], s * 0.015);
  x.fillStyle = '#3e4280'; for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(cx - s * 0.3 + i * s * 0.2, cy + s * 0.12, s * 0.05, 0, TAU); x.fill(); }
}
function exhaustIcon(x, cx, cy, s, t) {
  limbStroke(x, [[cx - s * 0.5, cy + s * 0.2], [cx + s * 0.05, cy + s * 0.2], [cx + s * 0.3, cy]], s * 0.2, ['#e8ebff', '#9aa0cf', '#4a4f88']);
  for (let i = 0; i < 3; i++) { const u = ((t * 0.6 + i / 3) % 1); ball(x, cx + s * (0.38 + u * 0.15), cy - s * (0.05 + u * 0.4), s * (0.08 + u * 0.1), ['#ffffff', '#c9c5dd', '#7d7898'], { sha: 0.35 }); }
}
function fuelIcon(x, cx, cy, s) {
  flatShade(x, () => rr(x, cx - s * 0.32, cy - s * 0.45, s * 0.5, s * 0.9, s * 0.07), ['#ffb0c4', '#ff4f6b', '#7a1035'], s * 0.02);
  x.fillStyle = '#2a1650'; rr(x, cx - s * 0.24, cy - s * 0.36, s * 0.34, s * 0.2, s * 0.04); x.fill();
  x.strokeStyle = '#2a1650'; x.lineWidth = s * 0.06; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx + s * 0.18, cy - s * 0.2); x.quadraticCurveTo(cx + s * 0.45, cy - s * 0.15, cx + s * 0.38, cy + s * 0.2); x.stroke();
  x.fillStyle = '#2a1650'; rr(x, cx + s * 0.3, cy + s * 0.15, s * 0.16, s * 0.1, s * 0.03); x.fill();
}
function cellSide(x, cx, cy, h, a) {                                             // one cylindrical lithium-ion cell, standing up
  if (a <= 0.01) return; const w = h * 0.36; x.save(); x.globalAlpha *= a;
  glow(x, cx, cy, h * 0.9, '#56e8ff', 0.3);
  x.fillStyle = 'rgba(10,8,46,0.35)'; rr(x, cx - w / 2 + 10, cy - h / 2 + 14, w, h, w * 0.18); x.fill();
  const g = x.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0); g.addColorStop(0, '#8ff7df'); g.addColorStop(0.45, '#22b59a'); g.addColorStop(1, '#0e4a6e');
  x.fillStyle = g; rr(x, cx - w / 2, cy - h / 2, w, h, w * 0.18); x.fill();
  x.fillStyle = '#e8ebff'; rr(x, cx - w / 2, cy - h / 2, w, h * 0.09, w * 0.18); x.fill();
  x.fillStyle = '#c9cde8'; rr(x, cx - w * 0.16, cy - h / 2 - h * 0.04, w * 0.32, h * 0.06, w * 0.05); x.fill();
  x.fillStyle = '#ffffff'; x.font = F(900, h * 0.16); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+', cx, cy - h * 0.22);
  x.fillStyle = 'rgba(255,255,255,0.35)'; rr(x, cx - w / 2 + w * 0.1, cy - h / 2 + h * 0.14, w * 0.1, h * 0.7, w * 0.05); x.fill();
  x.restore();
}
function batteryIcon(x, cx, cy, w, h, fill, o = {}) {
  glow(x, cx, cy, w * 0.75, o.glow || '#38e08e', o.ga == null ? 0.35 : o.ga);
  x.fillStyle = 'rgba(10,8,46,0.35)'; rr(x, cx - w / 2 + 8, cy - h / 2 + 12, w, h, h * 0.18); x.fill();
  x.fillStyle = '#f4f2ff'; rr(x, cx - w / 2, cy - h / 2, w, h, h * 0.18); x.fill(); rr(x, cx + w / 2 - 4, cy - h * 0.18, w * 0.06, h * 0.36, h * 0.06); x.fill();
  x.fillStyle = '#1d1650'; rr(x, cx - w / 2 + h * 0.08, cy - h / 2 + h * 0.08, w - h * 0.16, h * 0.84, h * 0.12); x.fill();
  if (fill > 0.002) { const g = x.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0); g.addColorStop(0, '#38e08e'); g.addColorStop(1, '#c8ff6a'); x.fillStyle = g; rr(x, cx - w / 2 + h * 0.13, cy - h / 2 + h * 0.13, (w - h * 0.26) * fill, h * 0.74, h * 0.08); x.fill(); }
}
function motorIcon(x, cx, cy, r, ang, gA) {
  glow(x, cx, cy, r * 2.2, '#8b5cff', 0.25 + 0.6 * gA);
  ball(x, cx, cy, r, ['#d9c8ff', '#8b5cff', '#3a1f8c'], { sha: 0.45 });
  x.fillStyle = '#ffb36b'; for (let k = 0; k < 10; k++) { const a = (k * TAU) / 10; x.save(); x.translate(cx + Math.cos(a) * r * 0.74, cy + Math.sin(a) * r * 0.74); x.rotate(a); rr(x, -r * 0.1, -r * 0.08, r * 0.2, r * 0.16, r * 0.04); x.fill(); x.restore(); }
  ball(x, cx, cy, r * 0.48, ['#f2f0ff', '#a6a0d6', '#4a4380'], { sha: 0.4 });
  x.strokeStyle = '#4a4380'; x.lineWidth = r * 0.09; x.lineCap = 'round';
  for (let k = 0; k < 3; k++) { const a = ang + (k * TAU) / 3; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r * 0.4, cy + Math.sin(a) * r * 0.4); x.stroke(); }
}
function inverterBox(x, cx, cy, w, h, t, sw, gA) {
  glow(x, cx, cy, w * 1.1, '#ff5d8f', 0.2 + 0.5 * gA);
  x.fillStyle = 'rgba(10,8,46,0.4)'; rr(x, cx - w / 2 + 8, cy - h / 2 + 12, w, h, 22); x.fill();
  flatShade(x, () => rr(x, cx - w / 2, cy - h / 2, w, h, 22), ['#ffa0c4', '#de4b93', '#4e1670'], 4);
  for (let k = 0; k < 6; k++) {
    const i = k % 3, j = Math.floor(k / 3), X = cx - w * 0.3 + i * w * 0.3, Y = cy - h * 0.18 + j * h * 0.36, on = sw > 0 && (Math.floor(t * 9 + k * 1.7) % 2 === 0);
    if (on) glow(x, X, Y, 34, '#ffd23f', 0.8 * sw);
    x.fillStyle = on ? '#ffe680' : '#3a1450'; rr(x, X - 18, Y - 14, 36, 28, 7); x.fill();
  }
}
function scopePanel(x, cx, cy, w, h, f, prog, col, a) {
  if (a <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(a, a);
  x.fillStyle = 'rgba(10,8,46,0.4)'; rr(x, -w / 2 + 6, -h / 2 + 10, w, h, 16); x.fill();
  x.fillStyle = '#0a0f33'; rr(x, -w / 2, -h / 2, w, h, 16); x.fill(); x.strokeStyle = '#3a4fb0'; x.lineWidth = 3; rr(x, -w / 2, -h / 2, w, h, 16); x.stroke();
  x.strokeStyle = 'rgba(120,150,255,0.18)'; x.lineWidth = 1.5; for (let i = 1; i < 6; i++) { x.beginPath(); x.moveTo(-w / 2 + (w * i) / 6, -h / 2 + 6); x.lineTo(-w / 2 + (w * i) / 6, h / 2 - 6); x.stroke(); }
  x.beginPath(); x.moveTo(-w / 2 + 6, 0); x.lineTo(w / 2 - 6, 0); x.stroke();
  if (prog > 0) { x.strokeStyle = col; x.lineWidth = 5; x.lineJoin = 'round'; x.lineCap = 'round'; x.beginPath(); const n = 160;
    for (let i = 0; i <= n * prog; i++) { const u = i / n, px = -w / 2 + 12 + u * (w - 24), py = -f(u) * (h / 2 - 14); i ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
  x.restore();
}
function pedal(x, cx, cy, s, press, a) {
  if (a <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(a, a);
  glow(x, 0, -s * 0.3, s * 1.1, '#ffd23f', 0.35 * press);
  x.fillStyle = '#2a1a5c'; rr(x, -s * 0.55, s * 0.05, s * 1.1, s * 0.18, s * 0.06); x.fill();
  x.rotate(-0.55 + 0.4 * press);
  flatShade(x, () => rr(x, -s * 0.22, -s * 0.95, s * 0.44, s * 0.95, s * 0.1), ['#e8ebff', '#8f95c8', '#3e4280'], s * 0.03);
  x.fillStyle = 'rgba(30,25,80,0.5)'; for (let i = 0; i < 4; i++) { rr(x, -s * 0.15, -s * 0.85 + i * s * 0.2, s * 0.3, s * 0.06, s * 0.03); x.fill(); }
  x.restore();
}
function thermometer(x, cx, top, bot, level, a) {                              // level 0..1 of the tube
  if (a <= 0.01) return; x.save(); x.globalAlpha *= a;
  const w = 34, col = H.rgba(H.mix('#4fd0ff', '#ff5a3c', cl((level - 0.4) / 0.5)), 1);
  x.fillStyle = '#f4f2ff'; rr(x, cx - w / 2 - 8, top - 8, w + 16, bot - top + 16, w); x.fill(); x.beginPath(); x.arc(cx, bot + 30, 44, 0, TAU); x.fill();
  x.fillStyle = col; rr(x, cx - w / 2 + 4, top + (bot - top) * (1 - level), w - 8, (bot - top) * level + 20, 12); x.fill(); x.beginPath(); x.arc(cx, bot + 30, 34, 0, TAU); x.fill();
  const my = top + (bot - top) * 0.45; x.fillStyle = '#1d1650'; rr(x, cx - w / 2 - 22, my - 3, w + 44, 6, 3); x.fill();
  x.restore();
}

// ---------------- the presenter ----------------
function presenter(x, cx, cy, h, t, pose, expr, o = {}) { return person(x, cx, cy, h, { view: '3/4', pose, expr, t, noGlow: true, ...o }); }

// ================= S1: hook on a sunset road (0 - 18.3) =================
const CAR2 = { cx: 0.62 * 1280, gy: 0.86 * 720, w: 0.5 * 1280 };
function s1(x, W, H_, t) {
  const scroll = 30 * t + 2600 * Math.pow(S(t, 5.1, 6.9), 2);
  const bat = carPt(CAR2, LOC.bat), cu = eio(S(t, 16.3, 18.3));
  COMP.withCam(x, COMP.camMix(COMP.cam(W / 2, H_ / 2, 1), COMP.cam(bat[0], bat[1], 3.4), cu), () => {
    road(x, W, H_, t, PAL.sunset, scroll);
    let car;
    if (t < 6.9) {
      const go = Math.pow(S(t, 5.1, 6.7), 2.2), squat = -16 * Math.sin(Math.PI * S(t, 4.8, 5.2));
      car = { cx: lerp(-450, 640, eo(S(t, 0, 1.3))) + squat + 1800 * go, gy: 0.84 * H_, w: 0.5 * W, speed: Math.max(1 - S(t, 0.9, 1.4), S(t, 5.1, 5.6)) };
    } else car = { ...CAR2, cx: lerp(-450, CAR2.cx, eo(S(t, 6.9, 7.8))), speed: 1 - S(t, 7.3, 7.9) };
    roadster(x, car.cx, car.gy, car.w, { t, spin: (car.cx + scroll) / (0.075 * car.w), speed: car.speed, lights: 1, xray: eio(S(t, 15.6, 16.5)), glowBat: S(t, 17.4, 17.9) });
    // the presenter walks into the wide shot (D: him on the left, the car on the golden line)
    if (t > 7.1) {
      const px = lerp(-160, 0.19 * W, eo(S(t, 7.1, 8.0)));
      const pose = poseAt([[7.1, 'reacting'], [8.7, 'reacting'], [9.4, 'presenting'], [13.7, 'presenting'], [14.3, 'thinking']], t);
      const R = presenter(x, px, 0.93 * H_, 330, t, pose, t < 8.7 ? 'surprised' : t < 14.1 ? 'happy' : 'thinking');
      const qs = popAt(t, 14.2, 0.4) * (1 - S(t, 15.8, 16.1));
      if (qs > 0.01 && R) { const hp = worldJoint(R, px, 0.93 * H_, 330, 'head'); ball(x, hp[0] + 58, hp[1] - 70, 30 * qs, ['#ffffff', '#ece8ff', '#9a8fe0'], { sha: 0.3 }); text(x, '?', hp[0] + 58, hp[1] - 70, 40 * qs, C.violet, { shadow: 'rgba(0,0,0,0)' }); }
    }
  });
  // 1.5-5: no engine, no exhaust, no fuel tank (three crossed-out icons above the car)
  const out = 1 - eio(S(t, 4.7, 5.1));
  [[1.53, 'ENGINE', engineIcon], [2.7, 'EXHAUST', exhaustIcon], [3.66, 'FUEL', fuelIcon]].forEach(([t0, lab, fn], i) => {
    const s = popAt(t, t0, 0.4, 1.6) * out; if (s <= 0.01) return;
    const cx = (0.3 + i * 0.2) * W, cy = 0.235 * H_;
    x.save(); x.translate(cx, cy); x.scale(s, s); x.translate(-cx, -cy); fn(x, cx, cy, 120, t); x.restore();
    badge(x, cx + 58, cy - 48, 24, false, back(S(t, t0 + 0.25, t0 + 0.55), 2.2) * out);
    labelTag(x, cx, 0.375 * H_, lab, TAGC.pink, { px: 28, s: popAt(t, t0 + 0.15, 0.35, 2) * out });
  });
  // 8.3 name tag, 12.3 the bolt: electricity (the one glowing element of the shot)
  tagAt(x, t, 8.35, 15.3, CAR2.cx + 60, 0.4 * H_, 'TESLA ROADSTER', TAGC.violet, { ptr: 'down' });
  bolt(x, CAR2.cx - 190, 0.42 * H_ - 40 * eo(S(t, 12.3, 12.8)), 70, popAt(t, 12.3, 0.4) * (1 - S(t, 13.8, 14.2)));
}

// ================= S2: the battery pack (18.3 - 48.4) =================
const GRID = { cols: 14, rows: 6, p: 66, r: 25, cx: 0.44 * 1280, cy: 0.575 * 720 };
const gpos = (i, j) => [GRID.cx + (i - (GRID.cols - 1) / 2) * GRID.p, GRID.cy + (j - (GRID.rows - 1) / 2) * GRID.p];
const GL = GRID.cx - (GRID.cols / 2) * GRID.p - 20, GR = GRID.cx + (GRID.cols / 2) * GRID.p + 20;
const runY = (k) => GRID.cy + (2 * k + 1 - GRID.rows / 2) * GRID.p;                // tube runs between rows 0|1, 2|3, 4|5
const TUBE = [[GL - 40, runY(0)], [GR, runY(0)], [GR, runY(1)], [GL, runY(1)], [GL, runY(2)], [GR + 40, runY(2)]];
const BAD = [9, 2];
function s2(x, W, H_, t) {
  bgFlat(x, W, H_, '#3b1aa8', '#1b0b5c', 0.5); softBlobs(x, W, H_, '#8b5cff', 3, t, 6);
  // A (18.3-23.6): E layout, the cell count over a dot matrix
  const aOut = 1 - eio(S(t, 23.0, 23.6));
  if (aOut > 0.01) {
    const em = 1 + 0.5 * (1 - eo(S(t, 18.3, 19.1))), pitch = W / 42, cols = 35, rows = 15, N = cols * rows, fillU = S(t, 18.6, 21.42);
    x.save(); x.translate(W / 2, H_ / 2); x.scale(em, em); x.translate(-W / 2, -H_ / 2); x.globalAlpha *= aOut;
    for (let k = 0; k < N; k++) {
      const s = cl((fillU * N - k) / 10); if (s <= 0) break;
      const i = k % cols, j = Math.floor(k / cols), X = 0.08 * W + (i + 0.5) * pitch, Y = 0.25 * H_ + (j + 0.5) * (0.65 * H_ / rows);
      x.fillStyle = '#22b59a'; x.beginPath(); x.arc(X, Y, 10 * back(s, 2), 0, TAU); x.fill();
      x.fillStyle = 'rgba(200,255,240,0.7)'; x.beginPath(); x.arc(X - 3, Y - 3, 3.2 * s, 0, TAU); x.fill();
    }
    glow(x, W / 2, H_ / 2, 360, '#140850', 0.95);
    const v = Math.round(6831 * Math.pow(S(t, 19.04, 21.42), 1.5)), land = S(t, 21.42, 21.8), pop = 1 + 0.22 * Math.sin(Math.PI * land);
    if (t > 18.9) { x.save(); x.translate(W / 2, H_ * 0.48); x.scale(pop, pop); text(x, v.toLocaleString('en-US'), 0, 0, 140, land > 0 ? C.yellow : '#ffffff'); x.restore(); }
    if (land > 0) burst(x, W / 2, H_ * 0.48, land * 1.2, 31, 300);
    x.restore();
    labelTag(x, W / 2, 0.66 * H_, 'LITHIUM-ION CELLS', TAGC.cyan, { px: 30, s: popAt(t, 21.55, 0.35, 2) * aOut });
  }
  // B (23.4-26.9): D layout, one cell -> the laptops it came from
  const bS = popAt(t, 23.45, 0.45, 1.5) * (1 - eio(S(t, 26.4, 26.9)));
  if (bS > 0.01) {
    const c = [0.33 * W, 0.55 * H_];
    x.save(); x.translate(c[0], c[1]); x.scale(bS, bS); x.translate(-c[0], -c[1]); cellSide(x, c[0], c[1] + Math.sin(t * 1.8) * 5, 300, 1); x.restore();
    labelTag(x, c[0], 0.86 * H_, '18650 CELL', TAGC.cyan, { px: 28, ptr: 'up', s: popAt(t, 24.2, 0.35, 2) * (1 - S(t, 26.4, 26.7)) });
    const ls = popAt(t, 25.25, 0.4, 1.5) * (1 - eio(S(t, 26.4, 26.9)));
    if (ls > 0.01) { const lc = [0.69 * W, 0.74 * H_]; x.save(); x.translate(lc[0], lc[1]); x.scale(ls, ls); x.translate(-lc[0], -lc[1]); laptop(x, lc[0], lc[1], 330, { view: 'screen' }); x.restore(); }
    arrow(x, [[c[0] + 80, c[1] - 40], [c[0] + 200, c[1] - 150], [0.6 * W, 0.3 * H_], [0.66 * W, 0.4 * H_]], eio(S(t, 25.3, 25.9)), C.cyan, 9, { dots: true, a: 1 - S(t, 26.4, 26.7) });
  }
  // C (26.8-31.3): A layout, the pack as one battery that fills to 53 kWh (focal glow)
  const cS = popAt(t, 26.8, 0.45, 1.4) * (1 - eio(S(t, 30.9, 31.4)));
  if (cS > 0.01) {
    x.save(); x.translate(W / 2, H_ / 2); x.scale(cS, cS); x.translate(-W / 2, -H_ / 2);
    batteryIcon(x, W / 2, H_ / 2 + Math.sin(t * 1.6) * 4, 560, 270, eio(S(t, 27.3, 29.8)), { ga: 0.3 + 0.3 * S(t, 28.3, 29) });
    const ks = popAt(t, 28.35, 0.4, 1.8); if (ks > 0.01) { x.save(); x.translate(W / 2 - 14, H_ / 2); x.scale(ks, ks); text(x, '53 kWh', 0, 0, 104, '#ffffff'); x.restore(); }
    x.restore();
  }
  // D (31.0-48.4): the pack from above. Cells heat up, the cooling loop runs between them, the BMS checks every cell
  if (t > 30.9) {
    const tp = eio(S(t, 33.9, 35.8)), runLen = GR - GL, d0 = 40;
    for (let j = 0; j < GRID.rows; j++) for (let i = 0; i < GRID.cols; i++) {
      const [X, Y] = gpos(i, j), s = popAt(t, 31.0 + (i + j) * 0.035, 0.35, 1.6); if (s <= 0.01) continue;
      const k = Math.floor(j / 2), along = k % 2 === 0 ? X - GL : GR - X, dist = d0 + k * (runLen + 2 * GRID.p) + along;
      const cool = cl((tp * (3 * runLen + 4 * GRID.p + 80) - dist + 110) / 120), warm = 0.75 + 0.25 * Math.sin(t * 5 + i * 0.7 + j);
      let col = H.mix(H.mix('#ffb35a', '#ff6a3c', warm * 0.5), '#4fd0ff', cool);
      const isBad = i === BAD[0] && j === BAD[1], bad = isBad ? S(t, 44.24, 44.5) * (1 - S(t, 46.1, 46.8)) : 0;
      if (isBad) { col = H.mix(col, '#ff3b5c', bad); col = H.mix(col, '#38e08e', S(t, 46.1, 46.8)); if (bad > 0.05) glow(x, X, Y, 70, '#ff3b5c', 0.7 * bad * (0.7 + 0.3 * Math.sin(t * 12))); }
      ball(x, X, Y, GRID.r * s, [H.rgba(H.mix(col, [255, 255, 255], 0.45)), H.rgba(col), '#1b1060'], { sha: 0.45 });
    }
    // cooling tube with flowing coolant
    if (tp > 0) {
      const n = 120, pts = []; for (let i = 0; i <= n * tp; i++) pts.push(polyAt(TUBE, i / n));
      x.save(); x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = 'rgba(10,8,46,0.4)'; x.lineWidth = 16; x.beginPath(); pts.forEach((p, i) => (i ? x.lineTo(p[0] + 3, p[1] + 5) : x.moveTo(p[0] + 3, p[1] + 5))); x.stroke();
      x.strokeStyle = '#56e8ff'; x.lineWidth = 12; x.beginPath(); pts.forEach((p, i) => (i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]))); x.stroke(); x.restore();
      if (tp > 0.98) flowDots(x, TUBE, t, 0.12, '#bff8ff', 14, 5);
    }
    tagAt(x, t, 34.3, 39.9, GL + 90, GRID.cy - 3 * GRID.p - 46, 'COOLANT', TAGC.cyan, { ptr: 'down', rot: -0.04 });
    // thermometer: from hot to below 35 C
    const th = popAt(t, 37.1, 0.4) * (1 - S(t, 39.9, 40.3));
    thermometer(x, 1160, 0.32 * H_, 0.74 * H_, lerp(0.88, 0.36, eio(S(t, 37.5, 38.8))), th);
    tagAt(x, t, 38.07, 39.9, 1130, 0.2 * H_, '< 35°C', TAGC.cyan, { ptr: 'down' });
    // BMS chip, its wires, the scan and the one cell it fixes
    const cs = popAt(t, 40.5, 0.4) * (1 - eio(S(t, 47.4, 47.9))), chip = [GRID.cx, 0.17 * H_];
    if (cs > 0.01) {
      const top = GRID.cy - (GRID.rows / 2) * GRID.p;
      for (let k = 0; k < 5; k++) arrow(x, [[chip[0], chip[1] + 30], [chip[0], top - 30], [GL + 60 + k * (GR - GL - 120) / 4, top - 40], [GL + 60 + k * (GR - GL - 120) / 4, top - 6]], eio(S(t, 41.4 + k * 0.08, 42.1 + k * 0.08)) * cs, 'rgba(189,164,255,0.8)', 5, { dots: true, head: false });
      x.save(); x.translate(chip[0], chip[1]); x.scale(cs, cs);
      glow(x, 0, 0, 120, '#8b5cff', 0.45); x.fillStyle = '#c9b3ff'; for (let k = 0; k < 6; k++) { rr(x, -70 + k * 26, -48, 10, 14, 3); x.fill(); rr(x, -70 + k * 26, 34, 10, 14, 3); x.fill(); }
      flatShade(x, () => rr(x, -85, -36, 170, 72, 14), ['#bda4ff', '#5b3cc4', '#241064'], 3);
      x.restore();
      labelTag(x, chip[0] + 170, chip[1], 'BMS', TAGC.violet, { px: 30, ptr: 'left', s: popAt(t, 41.0, 0.35, 2) * cs });
      const scan = S(t, 42.4, 44.6); if (scan > 0 && scan < 1) { const sx = lerp(GL, GR, scan); x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(sx - 30, top - 10, 60, GRID.rows * GRID.p + 20); glow(x, sx, GRID.cy, 120, '#ffffff', 0.15); }
      const bp = gpos(BAD[0], BAD[1]);
      arrow(x, [[chip[0] + 40, chip[1] + 40], [chip[0] + 160, chip[1] + 60], [bp[0] - 20, bp[1] - 120], [bp[0], bp[1] - 34]], eio(S(t, 45.5, 46.1)) * (1 - S(t, 47.2, 47.5)), C.cyan, 7, { dots: true });
      badge(x, bp[0] + 30, bp[1] - 30, 20, true, back(S(t, 46.86, 47.16), 2.2) * (1 - S(t, 47.4, 47.7)));
    }
  }
}

// ================= S3: DC -> inverter -> AC (47.6 - 73.0) =================
const BATP = [0.17 * 1280, 0.56 * 720], INVP = [0.5 * 1280, 0.56 * 720], MOTP = [0.83 * 1280, 0.56 * 720];
const ampAt = (t) => 0.42 + 0.5 * eio(S(t, 66.2, 67.3));
function s3(x, W, H_, t) {
  const cu = eio(S(t, 72.3, 73.3));
  COMP.withCam(x, COMP.camMix(COMP.cam(W / 2, H_ / 2, 1), COMP.cam(MOTP[0], MOTP[1], 3.6), cu), () => {
    bgFlat(x, W, H_, '#0d1b4a', '#1c2f86', 0.4); softBlobs(x, W, H_, '#3a6cff', 9, t, 5);
    const amp = ampAt(t), inv = popAt(t, 55.26, 0.45, 1.6);
    // the link: one broken dotted line until the inverter exists, then two live ones
    const linkA = 1 - S(t, 55.1, 55.4);
    if (linkA > 0.01) arrow(x, [[BATP[0] + 110, BATP[1]], [0.4 * W, BATP[1] - 30], [0.6 * W, MOTP[1] - 30], [MOTP[0] - 100, MOTP[1]]], eio(S(t, 48.6, 49.3)), 'rgba(255,255,255,0.75)', 8, { dots: true, a: linkA });
    if (inv > 0.01) {
      arrow(x, [[BATP[0] + 110, BATP[1]], [0.27 * W, BATP[1]], [0.35 * W, INVP[1]], [INVP[0] - 120, INVP[1]]], eio(S(t, 55.5, 56.0)), C.yellow, 8, { dots: true });
      arrow(x, [[INVP[0] + 120, INVP[1]], [0.65 * W, INVP[1]], [0.71 * W, MOTP[1]], [MOTP[0] - 100, MOTP[1]]], eio(S(t, 63.3, 63.8)), C.cyan, 8, { dots: true });
      flowDots(x, [[BATP[0] + 110, BATP[1]], [INVP[0] - 120, INVP[1]]], t, 0.5, '#ffd23f', 5, 7, S(t, 56.0, 56.4));
      flowDots(x, [[INVP[0] + 120, INVP[1]], [MOTP[0] - 100, MOTP[1]]], t, 0.3 + 0.6 * amp, '#56e8ff', 5, 5 + 5 * amp, S(t, 63.8, 64.2));
    }
    const bs = popAt(t, 47.9, 0.4); if (bs > 0.01) { x.save(); x.translate(...BATP); x.scale(bs, bs); x.translate(-BATP[0], -BATP[1]); batteryIcon(x, BATP[0], BATP[1], 200, 110, 0.85, { ga: 0.2 }); x.restore(); }
    const ms = popAt(t, 48.25, 0.4); if (ms > 0.01) { x.save(); x.translate(...MOTP); x.scale(ms, ms); x.translate(-MOTP[0], -MOTP[1]);
      motorIcon(x, MOTP[0], MOTP[1], 82, 2.4 * ramp(t - 63.6) + 5 * ramp(t - 66.3), 0.2 + 0.8 * S(t, 68.2, 69)); x.restore(); }
    if (inv > 0.01) { x.save(); x.translate(...INVP); x.scale(inv, inv); x.translate(-INVP[0], -INVP[1]); inverterBox(x, INVP[0], INVP[1], 220, 150, t, S(t, 58.2, 58.4) * (t < 72 ? 1 : 0), S(t, 58.2, 59)); x.restore(); }
    badge(x, INVP[0], INVP[1], 34, false, back(S(t, 53.4, 53.7), 2.2) * (1 - S(t, 54.9, 55.2)));
    // scopes: DC flat line, AC wave, and the inverter's chopped pulses that smooth into the wave
    const sy = 0.24 * H_, ph = t * 0.35, m = eio(S(t, 61.9, 63.9));
    scopePanel(x, BATP[0], sy, 220, 120, () => 0.55, S(t, 50.8, 51.3), C.yellow, popAt(t, 50.62, 0.35));
    scopePanel(x, MOTP[0], sy, 220, 120, (u) => (t < 63.8 ? 0.8 : amp) * Math.sin(TAU * (2 * u - ph)), S(t, 52.95, 53.6), C.cyan, popAt(t, 52.8, 0.35));
    const pwm = (u) => { const q = (u * 16 - ph * 8) % 1, duty = 0.5 + 0.45 * Math.sin(TAU * (2 * u - ph)); return (((q + 1) % 1) < duty ? 0.8 : -0.8); };
    scopePanel(x, INVP[0], sy, 220, 120, (u) => lerp(pwm(u), 0.8 * amp * Math.sin(TAU * (2 * u - ph)), m), S(t, 59.1, 59.8), m > 0.5 ? C.cyan : '#ffe680', popAt(t, 58.9, 0.35));
    labelTag(x, BATP[0], sy + 96, 'DC', TAGC.orange, { px: 30, ptr: 'up', s: popAt(t, 50.9, 0.35, 2) });
    labelTag(x, MOTP[0], sy + 96, 'AC', TAGC.cyan, { px: 30, ptr: 'up', s: popAt(t, 53.0, 0.35, 2) });
    labelTag(x, INVP[0], 0.78 * H_, 'INVERTER', TAGC.pink, { px: 30, ptr: 'up', s: popAt(t, 57.05, 0.35, 2) });
    pedal(x, 0.1 * W, 0.86 * H_, 90, eio(S(t, 64.9, 65.6)), popAt(t, 64.4, 0.4));
  });
}

// ================= S4: inside the motor (73.0 - 78.9) =================
function s4(x, W, H_, t) {
  bgFlat(x, W, H_, '#22105e', '#0e0838', 0.5); softBlobs(x, W, H_, '#6a3cff', 4, t, 5);
  const em = 1 + 0.45 * (1 - eo(S(t, 73.0, 73.8))), c = [W / 2, H_ / 2], on = S(t, 74.6, 75.2), phi = 2.8 * ramp(t - 74.8) - 0.4, rot = 2.5 * ramp(t - 76.5);
  x.save(); x.translate(...c); x.scale(em, em); x.translate(-c[0], -c[1]);
  glow(x, c[0], c[1], 380, '#8b5cff', 0.3);
  // stator ring (evenodd hole) with 12 copper coils; the coils facing the field angle light up
  const g = x.createLinearGradient(c[0] - 250, c[1] - 250, c[0] + 250, c[1] + 250); g.addColorStop(0, '#c9cdf2'); g.addColorStop(0.5, '#7076b8'); g.addColorStop(1, '#2a2e66');
  x.fillStyle = 'rgba(10,8,46,0.4)'; x.beginPath(); x.arc(c[0] + 8, c[1] + 14, 252, 0, TAU); x.fill();
  x.fillStyle = g; x.beginPath(); x.arc(c[0], c[1], 250, 0, TAU); x.arc(c[0], c[1], 192, 0, TAU, true); x.fill();
  for (let k = 0; k < 12; k++) {
    const a = (k * TAU) / 12, b = on * Math.pow(Math.max(0, Math.cos(a - phi)), 3), X = c[0] + Math.cos(a) * 168, Y = c[1] + Math.sin(a) * 168;
    if (b > 0.05) glow(x, X, Y, 90, '#ffd23f', 0.75 * b);
    x.save(); x.translate(X, Y); x.rotate(a);
    x.fillStyle = '#7076b8'; rr(x, -26, -14, 52, 28, 6); x.fill();
    x.fillStyle = H.rgba(H.mix('#ff9a4a', '#fff1a0', b), 1); rr(x, -20, -24, 34, 48, 10); x.fill();
    x.strokeStyle = 'rgba(120,50,20,0.35)'; x.lineWidth = 2; for (let q = -16; q <= 16; q += 8) { x.beginPath(); x.moveTo(-20, q); x.lineTo(14, q); x.stroke(); }
    x.restore();
  }
  // rotor: drawn turning (lags the field)
  ball(x, c[0], c[1], 132, ['#e4e2ff', '#8f8ad0', '#38327a'], { sha: 0.45 });
  x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = 9; x.lineCap = 'round';
  for (let k = 0; k < 14; k++) { const a = rot + (k * TAU) / 14; x.beginPath(); x.moveTo(c[0] + Math.cos(a) * 70, c[1] + Math.sin(a) * 70); x.lineTo(c[0] + Math.cos(a) * 118, c[1] + Math.sin(a) * 118); x.stroke(); }
  ball(x, c[0], c[1], 30, ['#ffffff', '#c9c5ee', '#5a5498'], { sha: 0.4 });
  // the field's direction: a curved arrow riding ahead of the lit coils
  if (on > 0.01) arrow(x, arcPts(c, 290, phi - 0.75, phi + 0.05), on, C.cyan, 12, { a: on });
  x.restore();
  labelTag(x, 0.85 * W, 0.24 * H_, 'MAGNETIC\nFIELD', TAGC.cyan, { px: 28, s: popAt(t, 75.3, 0.35, 2) });
  labelTag(x, 0.15 * W, 0.7 * H_, 'ROTOR', TAGC.orange, { px: 30, ptr: 'right', s: popAt(t, 76.8, 0.35, 2) });
}

// ================= S4b: torque chart (78.0 - 88.3) =================
const fPet = (r) => 0.15 + 0.8 * Math.sin(Math.PI * Math.min(1, r * 0.85));
const fEl = (r) => (r < 0.45 ? 1 : 0.45 / r);
function chart(x, W, H_, t) {
  bgFlat(x, W, H_, '#fff4d8', '#ffe2b0', 0.3); softBlobs(x, W, H_, '#ffb86b', 12, t, 4);
  const O = [0.14 * W, 0.8 * H_], XW = 0.75 * W, YH = 0.58 * H_, P = (r, f) => [O[0] + r * XW, O[1] - f * YH];
  x.strokeStyle = '#3b2a63'; x.lineWidth = 7; x.lineCap = 'round';
  const ax = eio(S(t, 78.3, 78.9)); x.beginPath(); x.moveTo(O[0], O[1]); x.lineTo(O[0] + (XW + 30) * ax, O[1]); x.moveTo(O[0], O[1]); x.lineTo(O[0], O[1] - (YH + 40) * ax); x.stroke();
  const curve = (f, prog, col, lw) => { if (prog <= 0) return; x.save(); x.strokeStyle = 'rgba(60,30,90,0.25)'; x.lineWidth = lw; x.lineJoin = 'round'; x.beginPath();
    for (let i = 0; i <= 100 * prog; i++) { const p = P(i / 100, f(i / 100)); i ? x.lineTo(p[0] + 3, p[1] + 6) : x.moveTo(p[0] + 3, p[1] + 6); } x.stroke();
    x.strokeStyle = col; x.beginPath(); for (let i = 0; i <= 100 * prog; i++) { const p = P(i / 100, f(i / 100)); i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]); } x.stroke(); x.restore(); };
  curve(fPet, eio(S(t, 78.5, 80.6)), '#ff8a1f', 11);
  curve(fEl, eio(S(t, 83.0, 84.4)), '#1fb6ff', 13);
  // the petrol engine has to rev up: a dot climbs its curve
  const rv = eio(S(t, 79.65, 81.6)) * 0.59; if (t > 79.6 && t < 83.0) { const p = P(rv, fPet(rv)); glow(x, p[0], p[1], 60, '#ff8a1f', 0.6); ball(x, p[0], p[1], 14, ['#ffe0b0', '#ff8a1f', '#a33a1a'], { sha: 0.4 }); }
  // the electric motor is strong from the start (focal glow on the left end of its line)
  const st = S(t, 84.25, 84.8); if (st > 0) { const p = P(0.06, 1); glow(x, p[0], p[1], 110, '#1fb6ff', 0.7 * st * (0.75 + 0.25 * Math.sin(t * 6))); }
  const pk = P(0.59, fPet(0.59)), el = P(0.3, 1);
  labelTag(x, pk[0], pk[1] + 60, 'PETROL', TAGC.orange, { px: 30, ptr: 'up', s: popAt(t, 79.0, 0.35, 2) });
  labelTag(x, el[0], el[1] + 52, 'ELECTRIC', TAGC.cyan, { px: 30, ptr: 'up', s: popAt(t, 83.4, 0.35, 2) });
  labelTag(x, O[0] + XW - 30, O[1] + 46, 'RPM', TAGC.violet, { px: 28, s: popAt(t, 78.9, 0.35, 2) });
  labelTag(x, O[0] + 100, O[1] - YH - 66, 'TORQUE', TAGC.violet, { px: 28, s: popAt(t, 79.0, 0.35, 2) });
  labelTag(x, 0.85 * W, 0.2 * H_, 'CONCEPT', TAGC.pink, { px: 24, rot: 0.05, s: popAt(t, 79.4, 0.35, 2) });
}

// ================= S4c: 0-60 in 3.9 s (87.5 - 93.3) =================
function speedo(x, W, H_, t) {
  bgFlat(x, W, H_, '#ff8a3c', '#d9402e', 0.4); softBlobs(x, W, H_, '#ffd23f', 21, t, 5);
  const c = [0.36 * W, 0.56 * H_], R = 205, u = S(t, 88.38, 91.3), v = 60 * (1 - Math.pow(1 - u, 1.5)), ang = (s) => Math.PI * (0.75 + (1.5 * s) / 80);
  x.fillStyle = 'rgba(10,8,46,0.35)'; x.beginPath(); x.arc(c[0] + 8, c[1] + 14, R + 18, 0, TAU); x.fill();
  ball(x, c[0], c[1], R + 18, ['#5b4ab8', '#2a1a6e', '#120a3a'], { sha: 0.35 });
  x.lineCap = 'round'; x.strokeStyle = 'rgba(255,255,255,0.18)'; x.lineWidth = 22; x.beginPath(); x.arc(c[0], c[1], R - 30, ang(0), ang(80)); x.stroke();
  if (v > 0.2) { x.strokeStyle = '#ffd23f'; x.beginPath(); x.arc(c[0], c[1], R - 30, ang(0), ang(v)); x.stroke(); }
  x.fillStyle = '#ffffff'; x.font = F(900, 26); x.textAlign = 'center'; x.textBaseline = 'middle';
  for (let s = 0; s <= 80; s += 20) { const a = ang(s); x.fillText(String(s), c[0] + Math.cos(a) * (R - 78), c[1] + Math.sin(a) * (R - 78)); }
  const a = ang(v); x.strokeStyle = '#ff3b5c'; x.lineWidth = 10; x.beginPath(); x.moveTo(c[0] - Math.cos(a) * 20, c[1] - Math.sin(a) * 20); x.lineTo(c[0] + Math.cos(a) * (R - 46), c[1] + Math.sin(a) * (R - 46)); x.stroke();
  ball(x, c[0], c[1], 22, ['#ffffff', '#d9d4ff', '#5a5498'], { sha: 0.4 });
  labelTag(x, c[0], c[1] + 112, 'MPH', TAGC.violet, { px: 28, s: popAt(t, 88.0, 0.35, 2) });
  const land = S(t, 91.26, 91.6), pop = 1 + 0.22 * Math.sin(Math.PI * land), n = [0.67 * W, 0.53 * H_];
  flare(x, n[0], n[1], Math.max(0, 1 - Math.abs(t - 91.45) / 0.9) * (t > 91.26 ? 1 : 0), t);
  x.save(); x.translate(...n); x.scale(pop, pop); text(x, (3.9 * u).toFixed(1) + ' s', 0, 0, 120, land > 0 ? C.yellow : '#ffffff'); x.restore();
  if (land > 0) burst(x, n[0], n[1], land * 1.2, 44, 260);
  labelTag(x, n[0], 0.33 * H_, '0–60 MPH', TAGC.pink, { px: 30, ptr: 'down', s: popAt(t, 88.4, 0.35, 2) });
}

// ================= S5: regenerative braking (92.5 - 108.6) =================
const CAR5 = { cx: 0.5 * 1280, gy: 0.82 * 720, w: 0.62 * 1280 };
function regenScroll(t) { let s = 0; for (let tt = 92.5; tt < t; tt += 0.04) s += (620 - 470 * eio(S(tt, 93.7, 96.5))) * 0.04; return s; }
function s5(x, W, H_, t) {
  const sc = regenScroll(t), rev = S(t, 95.88, 96.3);
  road(x, W, H_, t, PAL.dusk, sc);
  roadster(x, CAR5.cx, CAR5.gy, CAR5.w, { t, spin: sc / (0.075 * CAR5.w), speed: 0.6 * (1 - S(t, 93.7, 95.5)), lights: 1, xray: 1, brake: S(t, 93.7, 94.0),
    flow: rev > 0.5 ? -1 : 1, flowCol: rev > 0.5 ? C.green : C.yellow, wheelGlow: S(t, 96.94, 97.3) * (1 - S(t, 99.0, 99.4)),
    glowMot: S(t, 99.24, 99.6) * (1 - S(t, 101.2, 101.5)), glowPem: S(t, 101.35, 101.7) * (1 - S(t, 102.7, 103.0)), glowBat: S(t, 102.8, 103.2) });
  const mp = carPt(CAR5, LOC.mot), bp = carPt(CAR5, LOC.bat);
  tagAt(x, t, 100.15, 106.0, mp[0], CAR5.gy - 0.3 * CAR5.w, 'GENERATOR', TG.green, { ptr: 'down' });
  // the battery gauge above the pack climbs as energy comes back
  const gS = popAt(t, 102.6, 0.4) * (1 - S(t, 107.9, 108.3));
  if (gS > 0.01) { const g = [bp[0] + 40, CAR5.gy - 0.36 * CAR5.w]; x.save(); x.translate(...g); x.scale(gS, gS); x.translate(-g[0], -g[1]); batteryIcon(x, g[0], g[1], 150, 72, lerp(0.55, 0.85, eio(S(t, 102.9, 104.2))), { ga: 0.45 }); x.restore(); }
  // inset: the energy is not burned off as heat in the brakes
  const hS = popAt(t, 104.2, 0.4) * (1 - S(t, 107.4, 107.8)), hc = [0.85 * W, 0.27 * H_];
  if (hS > 0.01) {
    x.save(); x.translate(...hc); x.scale(hS, hS);
    x.fillStyle = 'rgba(10,8,46,0.4)'; x.beginPath(); x.arc(6, 10, 92, 0, TAU); x.fill(); x.fillStyle = '#2a1650'; x.beginPath(); x.arc(0, 0, 92, 0, TAU); x.fill();
    glow(x, 0, 0, 110, '#ff5a3c', 0.6); x.fillStyle = '#ff7a4a'; x.beginPath(); x.arc(0, 0, 58, 0, TAU); x.arc(0, 0, 20, 0, TAU, true); x.fill('evenodd');
    x.fillStyle = '#3a1f55'; for (let k = 0; k < 6; k++) { const a = (k * TAU) / 6; x.beginPath(); x.arc(Math.cos(a) * 40, Math.sin(a) * 40, 6, 0, TAU); x.fill(); }
    x.strokeStyle = 'rgba(255,190,120,0.8)'; x.lineWidth = 5; x.lineCap = 'round';
    for (let k = -1; k <= 1; k++) { x.beginPath(); for (let i = 0; i <= 12; i++) { const yy = -64 - i * 3, xx = k * 22 + Math.sin(i * 0.9 + t * 6) * 5; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
    x.restore();
    badge(x, hc[0] + 64, hc[1] - 62, 24, false, back(S(t, 105.8, 106.1), 2.2) * (1 - S(t, 107.4, 107.8)));
  }
  labelTag(x, 0.5 * W, 0.2 * H_, 'REGENERATIVE BRAKING', TG.green, { px: 32, rot: -0.03, s: popAt(t, 107.07, 0.4, 2) * (1 - S(t, 108.3, 108.6)) });
}

// ================= S6: what it proved (108.6 - 130.5) =================
const CAR6 = { cx: 0.6 * 1280, gy: 0.9 * 720, w: 0.4 * 1280 };
function s6(x, W, H_, t) {
  const sc = 380 * (t - 108.6), drive = Math.pow(S(t, 128.9, 130.5), 2), car = { ...CAR6, cx: CAR6.cx + 1000 * drive };
  road(x, W, H_, t, PAL.pink, sc);
  roadster(x, car.cx, car.gy, car.w, { t, spin: (sc + car.cx) / (0.075 * car.w), speed: 0.35 + 0.6 * S(t, 128.9, 129.4), lights: 1, glowBat: 0 });
  // range and sales tags (top-right, they count up in place)
  const o1 = 1 - S(t, 121.9, 122.3);
  labelTag(x, 0.85 * W, 0.135 * H_, Math.round(244 * eio(S(t, 111.77, 113.4))) + ' MI', TAGC.orange, { px: 34, s: popAt(t, 109.2, 0.35, 2) * o1 });
  labelTag(x, 0.85 * W, 0.255 * H_, Math.round(2450 * eio(S(t, 114.5, 116.2))).toLocaleString('en-US') + ' SOLD', TAGC.violet, { px: 30, s: popAt(t, 114.1, 0.35, 2) * o1 });
  // fast, practical, thrilling
  [[120.04, 'FAST', TAGC.pink, 0.42, 0.44, -0.06], [120.5, 'PRACTICAL', TAGC.cyan, 0.6, 0.36, 0.04], [121.5, 'THRILLING', TAGC.orange, 0.78, 0.46, -0.04]].forEach(([t0, lab, col, X, Y, rot]) =>
    labelTag(x, X * W, Y * H_, lab, col, { px: 32, rot, s: popAt(t, t0, 0.35, 2.2) * (1 - S(t, 122.0, 122.3)) }));
  // presenter
  if (t > 117.5) {
    const px = lerp(-160, 0.13 * W, eo(S(t, 117.5, 118.4)));
    const pose = t > 127.2 ? { ...POSES.waving, L: [22 + 4 * Math.sin(t * 8), -92, 4] } : poseAt([[117.5, 'presenting'], [121.2, 'presenting'], [121.7, 'thumbsUp']], t);
    presenter(x, px, 0.95 * H_, 300, t, pose, 'happy');
  }
  // the loop: battery -> inverter -> motor -> back again; then it folds into the car
  if (t > 122.2) {
    const k = eio(S(t, 127.3, 128.6)), bp = carPt(car, LOC.bat), c0 = [0.62 * W, 0.34 * H_], c = [lerp(c0[0], bp[0], k), lerp(c0[1], bp[1], k)], sc2 = lerp(1, 0.05, k);
    if (sc2 > 0.06) {
      x.save(); x.translate(...c); x.scale(sc2, sc2); x.translate(-c[0], -c[1]); x.globalAlpha *= 1 - S(t, 128.3, 128.6);
      const R = 130, A = { bat: Math.PI * 5 / 6, inv: -Math.PI / 2, mot: Math.PI / 6 }, d = 0.42, pulse = 1 + 0.08 * Math.sin(Math.PI * S(t, 126.79, 127.3));
      glow(x, c[0], c[1], 260 * pulse, '#ffffff', 0.25 * S(t, 125.6, 126.0));
      arrow(x, arcPts(c, R, A.bat + d, A.inv + TAU - d), eio(S(t, 122.9, 123.4)), '#ffffff', 10, { dots: true });
      arrow(x, arcPts(c, R, A.inv + d, A.mot + TAU - d), eio(S(t, 123.6, 124.3)), '#ffffff', 10, { dots: true });
      arrow(x, arcPts(c, R, A.mot + d, A.bat - d), eio(S(t, 125.27, 125.9)), '#38e08e', 12, { dots: true });
      const node = (a) => [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)];
      const nb = node(A.bat), ni = node(A.inv), nm = node(A.mot);
      let s = popAt(t, 122.58, 0.35, 1.8); if (s > 0.01) { x.save(); x.translate(...nb); x.scale(s * pulse, s * pulse); batteryIcon(x, 0, 0, 96, 50, 0.8, { ga: 0.3 }); x.restore(); }
      s = popAt(t, 123.24, 0.35, 1.8); if (s > 0.01) { x.save(); x.translate(...ni); x.scale(s * pulse * 0.45, s * pulse * 0.45); inverterBox(x, 0, 0, 220, 150, t, 1, 0.3); x.restore(); }
      s = popAt(t, 124.23, 0.35, 1.8); if (s > 0.01) { x.save(); x.translate(...nm); x.scale(s * pulse, s * pulse); motorIcon(x, 0, 0, 44, t * 4, 0.3); x.restore(); }
      x.restore();
    }
  }
}

// ================= director: scenes + transitions =================
const CHAPTERS = [[10.0, '2008', TAGC.orange], [18.3, 'BATTERY', TAGC.cyan], [47.8, 'INVERTER', TAGC.pink], [73.0, 'MOTOR', TAGC.violet], [92.6, 'REGEN', TG.green], [108.6, 'TESLA ROADSTER', TAGC.orange]];
function chapterTag(x, t) {
  let i = -1; CHAPTERS.forEach((c, k) => { if (t >= c[0]) i = k; }); if (i < 0) return;
  const [t0, lab, col] = CHAPTERS[i], next = CHAPTERS[i + 1] ? CHAPTERS[i + 1][0] : 1e9;
  barTag(x, lab, col, { w: 0.1 + lab.length * 0.017, s: S(t, t0, t0 + 0.5), a: 1 - S(t, next - 0.3, next), px: 28 });
}
function explainer(x, W, H_, t) {
  if (t < 18.3) s1(x, W, H_, t);
  else if (t < 47.6) s2(x, W, H_, t);
  else if (t < 48.4) { s2(x, W, H_, t); COMP.wipe.diag(x, S(t, 47.6, 48.4), () => s3(x, W, H_, t), W, H_); }
  else if (t < 73.0) s3(x, W, H_, t);
  else if (t < 78.0) s4(x, W, H_, t);
  else if (t < 78.9) { s4(x, W, H_, t); COMP.wipe.diag(x, S(t, 78.0, 78.9), () => chart(x, W, H_, t), W, H_); }
  else if (t < 87.5) chart(x, W, H_, t);
  else if (t < 88.3) { chart(x, W, H_, t); COMP.wipe.iris(x, S(t, 87.5, 88.3), 0.14 * W, 0.8 * H_, () => speedo(x, W, H_, t), W, H_); }
  else if (t < 92.5) speedo(x, W, H_, t);
  else if (t < 93.3) COMP.wipe.slide(x, S(t, 92.5, 93.3), 'r', () => speedo(x, W, H_, t), () => s5(x, W, H_, t), W, H_);
  else if (t < 108.6) s5(x, W, H_, t);
  else s6(x, W, H_, t);
  // dive-in blooms hide the two scene swaps (into the battery, into the motor)
  COMP.wipe.bloom(x, S(t, 17.8, 18.8), W / 2, H_ / 2, '#e8fbff', W, H_, 1);
  COMP.wipe.bloom(x, S(t, 72.5, 73.5), W / 2, H_ / 2, '#f0e6ff', W, H_, 1);
  chapterTag(x, t);
}
