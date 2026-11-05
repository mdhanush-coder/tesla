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
