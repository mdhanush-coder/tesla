// V2: Layout C, four rocky planets in an evenly spaced row + shared label row + one glowing hero (Earth).
const DURATION = 4;
//PLACEMENTS-START
const PLACEMENTS = [
  ...[0.1625, 0.3875, 0.6125, 0.8375].map((cx, i) => ({ id: 'planet' + i, role: 'content', x0: cx - 0.0625, y0: 0.58 - 1 / 6, x1: cx + 0.0625, y1: 0.58 + 1 / 6 })),
  ...[0.1625, 0.3875, 0.6125, 0.8375].map((cx, i) => ({ id: 'label' + i, role: 'label', x0: cx - 0.07, y0: 0.88 - 0.04, x1: cx + 0.07, y1: 0.88 + 0.04 })),
  { id: 'scale note', role: 'tag', x0: 0, y0: 0.06, x1: 0.34, y1: 0.13 },
];
//PLACEMENTS-END
const NAMES = ['Mercury', 'Venus', 'Earth', 'Mars'], TAGCOL = [TAGC.pink, TAGC.orange, TAGC.cyan, TAGC.violet];
function explainer(x, W, H_, t) {
  const C4 = COMP.slots.C({ n: 4 }), R = (1 / 6) * H_ * 0.5 * 2 / 2;      // item height = 1/3 H -> radius = 1/6 H
  bgFlat(x, W, H_, '#3b13a8', '#2a0c7c', 0.5); softBlobs(x, W, H_, '#8b5cff', 5, t, 6);
  NAMES.forEach((n, i) => {
    const it = C4['item' + i], lb = C4['label' + i], u = COMP.seg(t, 0.15 + i * 0.14, 0.15 + i * 0.14 + 0.45), p = back(u, 1.8);
    const bob = Math.sin(t * 1.8 + i * 1.3) * 5;
    rocky(x, n, it.x * W, it.y * H_ + bob, (1 / 6) * H_ * p, n === 'Earth' ? 0.5 : 0.12);
    labelTag(x, lb.x * W, lb.y * H_, n.toUpperCase(), TAGCOL[i], { ptr: 'up', s: back(COMP.seg(t, 0.55 + i * 0.14, 0.9 + i * 0.14), 2), px: 28 });
  });
  barTag(x, 'NOT TO SCALE', TAGC.pink, { w: 0.34, s: COMP.seg(t, 0.1, 0.6), px: 26 });
}
