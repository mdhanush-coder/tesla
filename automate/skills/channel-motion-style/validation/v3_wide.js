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
