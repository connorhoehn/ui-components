#!/usr/bin/env node
//
// Guards against ARBITRARY-VALUE hex colour utilities: `bg-[#2563eb]`,
// `text-[#dc2626]`, `border-[#e2e8f0]`, ...
//
// The tones test (src/components/shared/__tests__/tones.test.ts) bans named
// palette classes (`bg-blue-500`) with zero tolerance, but arbitrary values
// slip straight past it — which is how ui/Button shipped a hardcoded
// blue-600 "primary" that ignored --color-primary for months (fixed
// v2.61.0). A hex in a class is a colour the theming system cannot re-tone.
//
// The 2026-08-21 burn-down converted all ~950 occurrences: exact token
// matches mechanically (pixel-identical), the rest by nearest tone/role per
// the CLAUDE.md table, with two new token families added where the scale
// could not express the colour (--color-code-*, --color-video-*).
//
// Do NOT add entries to BASELINE. If the scale can't express your colour,
// add a tone (four CSS variables + a tones.ts entry) — see src/styles.css.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['src/components', 'src/theme', 'src/renderers', 'demo/src'];
const HEX_RE =
  /\b(?:bg|text|border|ring|from|to|via|fill|stroke|accent|shadow|outline|decoration|divide|caret)-\[#[0-9a-fA-F]{3,8}\]/g;

// BURN-DOWN COMPLETE (2026-08-21, same day it was created): every hex was
// either mapped to an existing token/tone role, or the missing family was
// added first (--color-code-* for the terminal/debugger surfaces,
// --color-video-* for the video stage). Zero tolerance from here.
const BASELINE = {};

const counts = new Map();

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '__tests__' && entry.name !== 'node_modules') walk(path);
      continue;
    }
    if (!entry.name.endsWith('.tsx') && !entry.name.endsWith('.ts')) continue;
    const n = [...readFileSync(path, 'utf8').matchAll(HEX_RE)].length;
    if (n > 0) counts.set(path, n);
  }
}

for (const root of ROOTS) walk(root);

const errors = [];
for (const [file, n] of [...counts].sort()) {
  const allowed = BASELINE[file];
  if (allowed === undefined) {
    errors.push(`${file}: ${n} hex colour utilit${n === 1 ? 'y' : 'ies'}. Use the tone/token classes instead.`);
  } else if (n > allowed) {
    errors.push(`${file}: ${n} hex colour utilities, baseline allows ${allowed}. Do not add more.`);
  }
}
for (const [file, allowed] of Object.entries(BASELINE)) {
  const n = counts.get(file) ?? 0;
  if (n < allowed) {
    errors.push(
      `${file}: down to ${n} (baseline says ${allowed}) — nice. ` +
        `Lower it in scripts/check-hex-colors.mjs${n === 0 ? ', or delete the entry.' : '.'}`,
    );
  }
}

const total = [...counts.values()].reduce((a, b) => a + b, 0);
if (errors.length > 0) {
  console.error('check-hex-colors: FAIL\n');
  for (const e of errors) console.error('  ' + e);
  console.error(`\n${counts.size} file(s), ${total} hex colour utilit${total === 1 ? 'y' : 'ies'} remaining.`);
  process.exit(1);
}
console.log(
  `ok check-hex-colors: pass (${counts.size} file(s), ${total} baselined hex colour utilities remaining to burn down).`,
);
