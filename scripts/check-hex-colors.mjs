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
import { parseGuardArgs, readAllowlist } from './guard-cli.mjs';

const USAGE = `Usage: ui-check-hex-colors [--root <dir>]... [--allowlist <file>]

Fails when a .ts/.tsx/.js/.jsx file under the roots uses an arbitrary-value hex
colour utility (bg-[#2563eb], border-l-[#fff], ...) that the theme cannot
re-tone. Allowlist lines are "<path> [maxCount]  # why"; with a count the entry
is a ratchet, without one any count passes.

With no --root, scans this repo's src/components, src/theme, src/renderers and
demo/src with zero tolerance.`;

const args = parseGuardArgs({ name: 'check-hex-colors', scriptUrl: import.meta.url, usage: USAGE });

const ROOTS = args.custom ? args.roots : ['src/components', 'src/theme', 'src/renderers', 'demo/src'];
// Consumers also write plain JS/JSX; the repo's own roots are TypeScript only.
const EXT_RE = args.custom ? /\.[jt]sx?$/ : /\.tsx?$/;
// The optional middle segment matters: `border-l-[#22c55e]` and
// `ring-offset-[#fff]` are colour utilities too, and an earlier version of
// this regex required the hex to follow the prefix DIRECTLY. That let 19
// directional-border hexes through while this guard reported "zero
// remaining" (v2.64.0). `placeholder-` was missing outright.
const HEX_RE =
  /\b(?:bg|text|border|ring|from|to|via|fill|stroke|accent|shadow|outline|decoration|divide|caret|placeholder)(?:-(?:t|r|b|l|x|y|s|e|offset))?-\[#[0-9a-fA-F]{3,8}\]/g;

// BURN-DOWN COMPLETE (2026-08-21, same day it was created): every hex was
// either mapped to an existing token/tone role, or the missing family was
// added first (--color-code-* for the terminal/debugger surfaces,
// --color-video-* for the video stage). Zero tolerance from here.
const BASELINE = args.allowlistPath
  ? Object.fromEntries([...readAllowlist(args.allowlistPath)].map(([f, n]) => [f, n ?? Infinity]))
  : {};
const BASELINE_FILE = args.allowlistPath ?? 'scripts/check-hex-colors.mjs';

const counts = new Map();

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '__tests__' && entry.name !== 'node_modules') walk(path);
      continue;
    }
    if (!EXT_RE.test(entry.name)) continue;
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
  if (n < allowed && allowed !== Infinity) {
    errors.push(
      `${file}: down to ${n} (baseline says ${allowed}) — nice. ` +
        `Lower it in ${BASELINE_FILE}${n === 0 ? ', or delete the entry.' : '.'}`,
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
