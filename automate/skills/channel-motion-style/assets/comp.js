// comp.js: the composition engine (see references/COMPOSITION-SYSTEM.md). Pure functions, no DOM needed for the maths,
// so tests/comp.test.js runs it in Node. All positions are NORMALIZED (0..1 of width W / height H); px() converts.
// Source of every number: kurzgesagt_grid_study/STUDY.md (measured). Items marked "inferred" are design choices.
const COMP = (() => {
  const TAU = Math.PI * 2;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, u) => a + (b - a) * u;
  const eio = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
  const eo = (u) => 1 - Math.pow(1 - clamp(u), 3);
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const LW = 1280, LH = 720;
  const px = (nx, ny, W = LW, H = LH) => [nx * W, ny * H];

  // ---- measured constants (normalized) ----
  const SAFE = { action: 0.05, title: 0.10 };                       // Orange lines of the study. Content must stay inside action; labels inside title.
  const G = { lo: 0.382, hi: 0.618 };                               // golden lines
  const T = { lo: 1 / 3, hi: 2 / 3 };                               // thirds
  const OPTICAL_Y = 0.47;                                           // optical centre (measured 0.47H for the thirds-star centre atom)

  // ---- row of N (Rule C): centre_i = m + (1 - 2m) * (i + 0.5) / N ----
  const rowCentres = (n, m = SAFE.action) => Array.from({ length: n }, (_, i) => m + (1 - 2 * m) * (i + 0.5) / n);

  // ---- layout presets: each returns named slots {x,y,...} in normalized coords ----
  const slots = {
    // A: centred hero. hero spans the middle third. close-up: eyeY = .5. full body: top .07, bottom .93.
    A(o = {}) {
      const full = !!o.fullBody;
      return { layout: 'A', hero: { x: 0.5, y: 0.5, x0: T.lo, x1: T.hi, eyeY: 0.5, browY: G.lo, mouthY: T.hi, top: full ? 0.07 : null, bottom: full ? 0.93 : null },
        label: { x: 0.5, y: 0.87 }, tag: { x0: 0, y: 0.10 }, source: { x1: 0.95, y: 0.96 } };
    },
    // B: four-point star on the thirds intersections + optically-centred middle.
    B() {
      return { layout: 'B', p0: { x: T.lo, y: T.lo }, p1: { x: T.hi, y: T.lo }, p2: { x: T.lo, y: T.hi }, p3: { x: T.hi, y: T.hi },
        centre: { x: 0.5, y: OPTICAL_Y }, pill: { x: 0.5, y: 0.87 } };
    },
    // C: N items in a row. Same height (~1/3 H) on y .58; one shared label row at .88 (pointer triangle up).
    C(o = {}) {
      const n = o.n || 4, m = o.m == null ? SAFE.action : o.m, xs = rowCentres(n, m), r = { layout: 'C', n };
      xs.forEach((x, i) => { r['item' + i] = { x, y: 0.58, h: 1 / 3 }; r['label' + i] = { x, y: 0.88 }; });
      r.pitch = (1 - 2 * m) / n;                                    // max item width = pitch (minus a gutter)
      return r;
    },
    // D: subject + object on a third/golden split. Subject .43W, object .618W; label on the OUTSIDE of its object.
    D(o = {}) {
      const flip = !!o.flip, f = (x) => (flip ? 1 - x : x);
      return { layout: 'D', subject: { x: f(0.43), y: 0.5 }, object: { x: f(G.hi), y: 0.5 }, link: 'curve',
        subjectLabel: { x: f(0.20), y: 0.5 }, objectLabel: { x: f(0.86), y: 0.5 } };
    },
    // E: big number: centre (.5,.5), spans x .29-.70, height H/4; dot matrix x .08-.92, y .25-.90 at pitch W/42.
    E() {
      return { layout: 'E', number: { x: 0.5, y: 0.5, x0: 0.29, x1: 0.70, h: 0.25 }, matrix: { x0: 0.08, x1: 0.92, y0: 0.25, y1: 0.90, pitch: 1 / 42 },
        tag: { x0: 0, y: 0.095, w: 0.65 }, source: { x1: 0.95, y: 0.96 } };
    },
    // F: one-point room. vanishing point at centre; back wall = rect scaled by k about centre; corners lie on the diagonals.
    F(o = {}) {
      const k = o.k == null ? 0.55 : o.k, hw = 0.5 * k, hh = 0.5 * k;
      return { layout: 'F', vp: { x: 0.5, y: 0.5 }, k, wall: { x0: 0.5 - hw, x1: 0.5 + hw, y0: 0.5 - hh, y1: 0.5 + hh },
        corners: [[0, 0], [1, 0], [1, 1], [0, 1]], wallCorners: [[0.5 - hw, 0.5 - hh], [0.5 + hw, 0.5 - hh], [0.5 + hw, 0.5 + hh], [0.5 - hw, 0.5 + hh]] };
    },
    // G: wide environment. horizon (table top / ground) at 2/3, shared eye line .45, top 25% framing element, 3 depth layers.
    G(o = {}) {
      const n = o.n || 3, xs = rowCentres(n, 0.10), r = { layout: 'G', horizon: T.hi, eyeY: 0.45, frameTop: 0.25, layers: ['background', 'midground', 'foreground'],
        bgDarken: [0.6, 0.7], foregroundCorner: 'bottom-right' };
      xs.forEach((x, i) => { r['char' + i] = { x, y: 0.45 }; });  // inferred: even spacing is a default, café frame shows uneven groups
      return r;
    },
  };

  // ---- placement helpers ----
  // Put the house presenter's head on a slot: eye at (ex,ey) normalized, head width as a fraction of W. rig/person come from the page.
  // Head ellipse is 17.4 units wide (humanHead rx 8.7). Returns the args for person(x, cx, cy, Hh, opts).
  function fitPerson(rigFn, opts, ex, ey, headW, W = LW, H = LH) {
    const u = (headW * W) / 17.4, R = rigFn({ ...opts }), hs = R.S.head;
    return { cx: ex * W - hs[0] * u, cy: ey * H - (hs[1] + 0.8) * u, Hh: 100 * u, R };
  }
  // Body at full height between top/bottom (normalized), feet on `bottom`.
  const fitFullBody = (cx = 0.5, top = 0.07, bottom = 0.93, W = LW, H = LH) => ({ cx: cx * W, cy: bottom * H, Hh: (bottom - top) * H / 0.93 });

  // ---- composition-to-composition motion ----
  const mix = (a, b, u) => ({ x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u) });
  // curved path between two slots (bow = fraction of distance; + curves clockwise). Never travel in a dead-straight line.
  function arc(a, b, u, bow = 0.18) {
    const dx = b.x - a.x, dy = b.y - a.y, nx = -dy * bow, ny = dx * bow, v = 1 - u;
    return { x: v * v * a.x + 2 * v * u * ((a.x + b.x) / 2 + nx) + u * u * b.x, y: v * v * a.y + 2 * v * u * ((a.y + b.y) / 2 + ny) + u * u * b.y };
  }
  // staggered transform: u in 0..1 overall, each id i of n starts i*stagger later. Returns the per-id eased progress.
  const stagger = (u, i, n, spread = 0.35) => eio(clamp((u - (i / Math.max(1, n - 1)) * spread) / (1 - spread)));
  // camera: z zoom about the world point (cx,cy) landing at frame centre; z interpolates in log space (even-feeling zoom).
  const cam = (cx = LW / 2, cy = LH / 2, z = 1) => ({ cx, cy, z });
  const camMix = (a, b, u) => ({ cx: lerp(a.cx, b.cx, u), cy: lerp(a.cy, b.cy, u), z: Math.exp(lerp(Math.log(a.z), Math.log(b.z), u)) });
  function withCam(x, c, fn, W = LW, H = LH) { x.save(); x.translate(W / 2, H / 2); x.scale(c.z, c.z); x.translate(-c.cx, -c.cy); fn(); x.restore(); }
  // layered parallax: layer depth d (0 far .. 1 near): far layers follow the camera less.
  const parallax = (c, d, W = LW, H = LH) => ({ cx: lerp(W / 2, c.cx, 0.3 + 0.7 * d), cy: lerp(H / 2, c.cy, 0.3 + 0.7 * d), z: Math.pow(c.z, 0.4 + 0.6 * d) });

  // ---- transitions (draw old, then new, through a mask). u 0..1 ----
  const wipe = {
    iris(x, u, cx, cy, drawNew, W = LW, H = LH) {                    // circle grows from (cx,cy); new scene inside it
      if (u <= 0) return; const r = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) * eio(u);
      x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip(); drawNew(); x.restore();
    },
    slide(x, u, dir, drawOld, drawNew, W = LW, H = LH) {              // dir 'l'|'r'|'u'|'d': new pushes old out. camera-style, with speed streak handled by caller
      const e = eio(u), sx = dir === 'l' ? -1 : dir === 'r' ? 1 : 0, sy = dir === 'u' ? -1 : dir === 'd' ? 1 : 0;
      x.save(); x.translate(-sx * W * e, -sy * H * e); drawOld(); x.restore();
      x.save(); x.translate(sx * W * (1 - e), sy * H * (1 - e)); drawNew(); x.restore();
    },
    diag(x, u, drawNew, W = LW, H = LH, slope = 0.35) {               // geometric diagonal edge sweeps left -> right
      if (u <= 0) return; const e = eio(u), X = lerp(-H * slope, W + H * slope, e);
      x.save(); x.beginPath(); x.moveTo(0, 0); x.lineTo(X + H * slope, 0); x.lineTo(X - H * slope, H); x.lineTo(0, H); x.closePath(); x.clip(); drawNew(); x.restore();
    },
    bloom(x, u, cx, cy, col = '#fff6d0', W = LW, H = LH, peak = 1) {  // radial whiteout that peaks at u=.5, hides a swap. peak<1 = a glow pass, not a whiteout
      const a = Math.sin(clamp(u) * Math.PI) * peak; if (a <= 0.001) return;
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(W, H) * (0.3 + 0.7 * a));
      g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,246,208,0)'); x.save(); x.globalAlpha = Math.min(1, a * 1.4); x.fillStyle = g; x.fillRect(0, 0, W, H); x.restore();
    },
  };

  // ---- audit: checks placements against safe areas. items: {id, x0,y0,x1,y1 (normalized), role: 'content'|'label'|'bleed'|'tag'|'source'|'bg'} ----
  // 'bleed' and 'tag' (chapter / title bars that start at x=0) and 'bg' are exempt from the safe areas on purpose (STUDY section 2).
  function audit(items) {
    const out = [], A = SAFE.action, Tt = SAFE.title;
    for (const it of items) {
      if (it.role === 'bleed' || it.role === 'bg' || it.role === 'tag') continue;
      // Labels: CENTRE inside the 10% frame, box inside the 5% frame. (STUDY says labels never cross 10%, but its own label row
      // at 0.87-0.88H measures 0.85-0.91H in frame t=474s, so the box edge does cross it; this is the rule the frames support.)
      if (it.role === 'label') {
        const cx = (it.x0 + it.x1) / 2, cy = (it.y0 + it.y1) / 2;
        if (cx < Tt || cx > 1 - Tt || cy < Tt || cy > 1 - Tt) out.push(`${it.id}: label centre outside 10% frame`);
        if (it.x0 < A || it.y0 < A || it.x1 > 1 - A || it.y1 > 1 - A) out.push(`${it.id}: label box outside 5% frame`);
        continue;
      }
      const m = A;
      if (it.role === 'source') { if (it.x1 > 1 - A + 1e-6 || it.y1 > 1 - A + 1e-6) out.push(`${it.id}: source citation outside 5% margin`); continue; }
      if (it.x0 < m - 1e-6 || it.y0 < m - 1e-6 || it.x1 > 1 - m + 1e-6 || it.y1 > 1 - m + 1e-6) out.push(`${it.id}: ${it.role} outside ${m * 100}% safe frame (${[it.x0, it.y0, it.x1, it.y1].map(v => v.toFixed(3)).join(', ')})`);
    }
    return out;
  }
  // deviation of measured centres from a slot, normalized units (use for validation reports)
  const dev = (measured, slot) => Math.hypot(measured.x - slot.x, measured.y - slot.y);

  // ---- debug overlay: ONLY in debug builds (build.py --debug-grid). Final art never contains this. ----
  function debugGrid(x, W = LW, H = LH) {
    const L = (c, w, pts) => { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); for (const [a, b, c2, d] of pts) { x.moveTo(a * W, b * H); x.lineTo(c2 * W, d * H); } x.stroke(); };
    x.save(); x.globalAlpha = 0.85;
    L('#ff00ff', 1.5, [[T.lo, 0, T.lo, 1], [T.hi, 0, T.hi, 1], [0, T.lo, 1, T.lo], [0, T.hi, 1, T.hi]]);
    L('#33ff88', 1, [[G.lo, 0, G.lo, 1], [G.hi, 0, G.hi, 1], [0, G.lo, 1, G.lo], [0, G.hi, 1, G.hi]]);
    L('#ffe600', 1, [[0.5, 0, 0.5, 1], [0, 0.5, 1, 0.5], [0, 0, 1, 1], [1, 0, 0, 1]]);
    L('#ff9900', 1, [[0.05, 0, 0.05, 1], [0.95, 0, 0.95, 1], [0, 0.05, 1, 0.05], [0, 0.95, 1, 0.95], [0.1, 0, 0.1, 1], [0.9, 0, 0.9, 1], [0, 0.1, 1, 0.1], [0, 0.9, 1, 0.9]]);
    x.restore();
  }

  return { LW, LH, SAFE, G, T, OPTICAL_Y, px, clamp, lerp, eio, eo, seg, rowCentres, slots, fitPerson, fitFullBody, mix, arc, stagger, cam, camMix, withCam, parallax, wipe, audit, dev, debugGrid };
})();
if (typeof module !== 'undefined') module.exports = COMP;
