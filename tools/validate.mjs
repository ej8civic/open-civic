// Validates the source registry, data files and doc frontmatter.
// Fails (exit 1) on schema errors or on citations of unapproved / lead-only sources.
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { ROOT, readYaml, readJson, walk, rel, frontmatter } from './lib.mjs';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const schema = (n) => ajv.compile(readJson(join(ROOT, 'schemas', `${n}.schema.json`)));
const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);
const report = (file, v) => v.errors?.forEach((e) => fail(file, `${e.instancePath || '/'} ${e.message}`));

// 1. Registry
const regPath = join(ROOT, 'sources', 'registry.yaml');
const registry = readYaml(regPath);
const vReg = schema('registry');
if (!vReg(registry)) report(rel(regPath), vReg);
const sources = new Map(registry.sources.map((s) => [s.id, s]));
if (sources.size !== registry.sources.length) fail(rel(regPath), 'duplicate source id');

function checkCitation(file, id) {
  const s = sources.get(id);
  if (!s) return fail(file, `cites unknown source "${id}"`);
  if (s.status !== 'approved') fail(file, `cites source "${id}" with status ${s.status}`);
  if (s.policy === 'lead-only') fail(file, `cites lead-only (forum) source "${id}" as proof`);
}

// 2. Data files: every file must cite a source; pinouts get a full schema check.
const vPin = schema('pinout');
for (const f of walk(join(ROOT, 'data'), /\.ya?ml$/)) {
  const d = readYaml(f);
  if (!d?.source?.id) fail(rel(f), 'missing source.id');
  else checkCitation(rel(f), d.source.id);
  if (d?.cross_check?.id) checkCitation(rel(f), d.cross_check.id);
  if (f.includes(`pinouts`) && !vPin(d)) report(rel(f), vPin);
}

// 3. Docs frontmatter (skip templates, examples and folder README indexes)
const vFm = schema('frontmatter');
for (const f of walk(join(ROOT, 'docs'), /\.md$/)) {
  const r = rel(f);
  if (r.startsWith('docs/_templates/') || r.startsWith('docs/examples/') || r.endsWith('/README.md')) continue;
  const { data } = frontmatter(readFileSync(f, 'utf8'));
  if (!data) { fail(r, 'missing frontmatter'); continue; }
  if (!vFm(data)) report(r, vFm);
  for (const s of data.sources ?? []) checkCitation(r, s.id);
}

if (errors.length) {
  console.error(`✖ ${errors.length} problem(s):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log(`✔ registry (${sources.size} sources), data and docs are valid`);
