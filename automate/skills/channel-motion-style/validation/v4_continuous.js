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
