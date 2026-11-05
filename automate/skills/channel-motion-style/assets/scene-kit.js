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
