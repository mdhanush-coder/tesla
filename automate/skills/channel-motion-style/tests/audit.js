// Run: node tests/audit.js scene.js [...]   Checks each scene's //PLACEMENTS block against the safe-area rules (COMP.audit).
const fs = require('fs'), COMP = require('../assets/comp.js'), TAGC = {};
let bad = 0;
for (const f of process.argv.slice(2)) {
  const m = fs.readFileSync(f, 'utf8').match(/\/\/PLACEMENTS-START([\s\S]*?)\/\/PLACEMENTS-END/);
  if (!m) { console.log(f, ': no PLACEMENTS block (skipped)'); continue; }
  const P = new Function('COMP', m[1] + '; return PLACEMENTS;')(COMP), v = COMP.audit(P);
  console.log(f, v.length ? 'FAIL\n  ' + v.join('\n  ') : `ok (${P.length} placements)`); bad += v.length;
}
process.exit(bad ? 1 : 0);
