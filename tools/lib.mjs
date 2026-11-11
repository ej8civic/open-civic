// Shared helpers for Open Civic tooling.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));

export const readYaml = (p) => YAML.parse(readFileSync(p, 'utf8'));
export const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
export const rel = (p) => relative(ROOT, p).split(sep).join('/');

/** Recursively list files under dir whose name matches re. */
export function walk(dir, re, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, re, out);
    else if (re.test(name)) out.push(p);
  }
  return out;
}

/** Split a markdown file into { data, body } using its YAML frontmatter. */
export function frontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return { data: null, body: text };
  return { data: YAML.parse(m[1]), body: text.slice(m[0].length) };
}
