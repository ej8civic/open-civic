// Renders tables from data/ into docs between marker comments, so docs never
// drift from the data. Usage in markdown:
//
//   <!-- gen:pinout data=pinouts/obd2a-ecm-96-98.yaml connector=A -->
//   ...generated, do not edit...
//   <!-- /gen -->
//
// `--check` exits 1 if any doc is out of date (used by CI).
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, readYaml, walk, rel } from './lib.mjs';

const check = process.argv.includes('--check');
const BLOCK = /<!-- gen:(\w+)([^>]*)-->[\s\S]*?<!-- \/gen -->/g;
const esc = (s = '') => String(s).replace(/\|/g, '\\|');

const renderers = {
  pinout({ data, connector }) {
    const d = readYaml(join(ROOT, 'data', data));
    const c = d.connectors.find((x) => x.id === connector);
    if (!c) throw new Error(`connector ${connector} not in ${data}`);
    const rows = c.terminals.map((t) => {
      const only = (t.applies ?? []).map((k) => d.footnotes?.[k] ?? k).join('; ');
      return `| ${connector}${t.pin} | \`${t.abbr}\` | ${esc(t.name)} | ${t.wire} | ${esc(t.signal ?? '')} | ${esc(only)} |`;
    });
    return ['| Pin | Abbr | Function | Wire | Expected signal | Only on |', '|---|---|---|---|---|---|', ...rows].join('\n');
  },
};

const parseArgs = (s) => Object.fromEntries([...s.matchAll(/(\w+)=(\S+)/g)].map((m) => [m[1], m[2]]));

let stale = 0;
for (const f of walk(join(ROOT, 'docs'), /\.md$/)) {
  const before = readFileSync(f, 'utf8');
  const after = before.replace(BLOCK, (_, kind, args) => {
    const r = renderers[kind];
    if (!r) throw new Error(`${rel(f)}: unknown generator "${kind}"`);
    return `<!-- gen:${kind}${args}-->\n${r(parseArgs(args))}\n<!-- /gen -->`;
  });
  if (after !== before) {
    stale++;
    if (check) console.error(`✖ out of date: ${rel(f)} (run npm run gen)`);
    else { writeFileSync(f, after); console.log(`↻ ${rel(f)}`); }
  }
}
if (check && stale) process.exit(1);
if (!stale) console.log('✔ generated tables are up to date');
