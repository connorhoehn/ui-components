// Make the ambient blocks of every rolled-up dist/**/*.d.ts deterministic and
// prove none were lost.
//
// unplugin-dts (vite-plugin-dts v5) harvests every top-level `declare module`
// / `declare global` block from the per-file declarations in a parallel pool
// and appends them to each bundled entry in COMPLETION order. Two builds of
// the same source therefore emitted the same blocks in different orders (a
// ~700-line diff per entry), and a block that is not harvested is dropped
// without a word -- e.g. a `declare module '@tiptap/core' { interface
// Commands }` augmentation, which silently removes `editor.commands.*` types
// from consumers.
//
// This script (1) sorts the trailing ambient blocks of each entry into a
// canonical order, and (2) fails the build if an entry lacks any block that
// src declares (`@tiptap/core` augmentations and `declare global`).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AMBIENT_START = /^declare (?:module '@tiptap\/core'|global) \{$/;

/** Stable identity of a block: `global`, or the first Commands key. */
function blockKey(text) {
  if (text.startsWith('declare global')) return 'global';
  const m = /\n\s+(\w+): \{/.exec(text);
  return m ? `tiptap:${m[1]}` : `tiptap:?${text.length}`;
}

/** Top-level blocks of `lines` that start with an ambient declaration. */
function extractBlocks(lines) {
  const blocks = [];
  const rest = [];
  for (let i = 0; i < lines.length; i++) {
    if (AMBIENT_START.test(lines[i])) {
      let j = i;
      while (j < lines.length && lines[j] !== '}') j++;
      blocks.push(lines.slice(i, j + 1).join('\n'));
      i = j;
    } else {
      rest.push(lines[i]);
    }
  }
  return { blocks, rest };
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// What src promises.
const expected = new Set();
for (const file of walk(path.join(root, 'src'))) {
  if (!/\.tsx?$/.test(file) || /\.test\.|__tests__|\.d\.ts$/.test(file)) continue;
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const { blocks } = extractBlocks(lines);
  for (const b of blocks) expected.add(blockKey(b));
}
if (expected.size === 0) {
  console.error('normalize-dts-ambient FAILED — found no ambient blocks in src; the scan is broken');
  process.exit(1);
}

const entries = walk(path.join(root, 'dist')).filter(
  (f) => f.endsWith('.d.ts') && path.relative(path.join(root, 'dist'), f).split(path.sep).length <= 2,
);
const failures = [];
for (const file of entries) {
  const { blocks, rest } = extractBlocks(fs.readFileSync(file, 'utf8').split('\n'));
  const have = new Set(blocks.map(blockKey));
  const missing = [...expected].filter((k) => !have.has(k));
  const dupes = blocks.length - have.size;
  if (missing.length) failures.push(`${path.relative(root, file)} is missing ${missing.join(', ')}`);
  const unique = new Map(blocks.map((b) => [blockKey(b), b]));
  const sorted = [...unique.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([, b]) => b);
  while (rest.length && rest[rest.length - 1].trim() === '') rest.pop();
  fs.writeFileSync(file, rest.join('\n') + '\n\n\n' + sorted.join('\n\n\n') + '\n');
  if (dupes) console.log(`normalize-dts-ambient: ${path.relative(root, file)} had ${dupes} duplicate block(s)`);
}

if (failures.length) {
  console.error('normalize-dts-ambient FAILED — ambient declarations lost from the rollup:');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`normalize-dts-ambient passed: ${entries.length} entries, ${expected.size} ambient blocks each, sorted.`);
