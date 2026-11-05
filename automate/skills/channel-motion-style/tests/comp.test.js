// Run: node tests/comp.test.js   (checks comp.js against the measured numbers in STUDY.md)
const assert = require('assert'), C = require('../assets/comp.js');
const near = (a, b, e = 1e-9) => assert(Math.abs(a - b) < e, `${a} != ${b}`);
// Rule C: N=4 -> 0.1625, 0.3875, 0.6125, 0.8375
C.rowCentres(4).forEach((v, i) => near(v, [0.1625, 0.3875, 0.6125, 0.8375][i]));
near(C.rowCentres(1)[0], 0.5); near(C.rowCentres(3, 0.1)[1], 0.5);
// Rule B: thirds intersections in px at 1920x1080 -> (640,360),(1280,360),(640,720),(1280,720)
const B = C.slots.B(); assert.deepStrictEqual(C.px(B.p0.x, B.p0.y, 1920, 1080).map(Math.round), [640, 360]);
assert.deepStrictEqual(C.px(B.p3.x, B.p3.y, 1920, 1080).map(Math.round), [1280, 720]); near(B.centre.y, 0.47);
// Rule F: wall corners lie on the frame diagonals (so the vanishing point is the centre)
const F = C.slots.F(); F.wallCorners.forEach(([x, y], i) => { const [cx, cy] = F.corners[i]; near((x - 0.5) * (cy - 0.5), (y - 0.5) * (cx - 0.5)); });
// Rule A: middle third; Rule D: golden/third split; Rule G horizon
const A = C.slots.A(); near(A.hero.x1 - A.hero.x0, 1 / 3); near(C.slots.D().object.x, 0.618); near(C.slots.G().horizon, 2 / 3);
// Safe areas: bleed/tag exempt, content/label not
const bad = C.audit([{ id: 'bar', role: 'tag', x0: 0, y0: 0.06, x1: 0.65, y1: 0.13 }, { id: 'box', role: 'content', x0: 0.02, y0: 0.4, x1: 0.3, y1: 0.6 },
  { id: 'lbl', role: 'label', x0: 0.03, y0: 0.8, x1: 0.2, y1: 0.9 }, { id: 'rowlabel', role: 'label', x0: 0.09, y0: 0.84, x1: 0.23, y1: 0.92 }, { id: 'ok', role: 'content', x0: 0.1, y0: 0.1, x1: 0.9, y1: 0.9 }]);
assert.strictEqual(bad.length, 2, bad.join('\n'));
// arc endpoints and camMix
const a = { x: 0.2, y: 0.5 }, b = { x: 0.8, y: 0.3 }; near(C.arc(a, b, 0).x, 0.2); near(C.arc(a, b, 1).y, 0.3);
near(C.camMix(C.cam(0, 0, 1), C.cam(0, 0, 4), 0.5).z, 2);
console.log('comp.test.js: all assertions passed');
