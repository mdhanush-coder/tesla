// Run: node tests/smoke.js build/index.html [t1 t2 ...]   Executes the page's script against a mock canvas and draws frames,
// so ReferenceErrors / typos show up in seconds instead of after an EngineX round trip. (It cannot judge how it looks.)
const fs = require('fs'), vm = require('vm');
const html = fs.readFileSync(process.argv[2], 'utf8'), ts = process.argv.slice(3).map(Number);
const mk = () => { const f = function () {}; const p = new Proxy(f, { get: (t, k) => k === Symbol.toPrimitive ? () => 0 : k === 'width' || k === 'height' ? 256 : k === 'data' ? new Uint8ClampedArray(256 * 256 * 4) : k === 'measureText' ? () => ({ width: 40 }) : p, apply: () => p, set: () => true }); return p; };
const ctx = mk(), el = { getContext: () => ctx, style: {}, width: 1920, height: 1080 };
const listeners = {};
const win = { devicePixelRatio: 1, addEventListener: (k, f) => (listeners[k] = f), __hf: {} };
const doc = { getElementById: () => el, createElement: () => el, fonts: { load: () => Promise.resolve(), ready: Promise.resolve() } };
const sandbox = { DOMMatrix: function () { return mk(); }, window: win, document: doc, Math, console, Promise, Uint8ClampedArray, Float32Array, Float64Array, Array, Object, Number, String, JSON, Set, Map, Symbol, Infinity, isFinite, parseInt, parseFloat, Date };
Object.assign(sandbox, win); sandbox.window = sandbox; sandbox.globalThis = sandbox; sandbox.__hf = win.__hf; vm.createContext(sandbox);
const code = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n;\n');
vm.runInContext(code + '\n;globalThis.__frame = frame; globalThis.__D = DURATION;', sandbox);
const D = sandbox.__D, times = ts.length ? ts : [0, D * 0.25, D * 0.5, D * 0.75, D - 0.01];
for (const t of times) sandbox.__frame(t);
console.log('smoke ok: drew', times.length, 'frames, DURATION', D);
