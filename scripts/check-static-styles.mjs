#!/usr/bin/env node
// Drift check: fails CI if a NEW file appears in src/components/ OR demo/src/
// that uses `style={{...}}` and isn't on the grandfathered allowlist. Locks in
// the "convert vs keep" heuristic from TAILWIND_MIGRATION.md.
//
// Occurrences inside strings and template literals do NOT count. Several docs
// pages carry JSX code samples in code={`...`} props; a naive grep flags the
// sample text and forces allowlisting files whose real JSX is clean.
//
// When a file is intentionally added with dynamic inline styles (cursor
// positions, theme-mode colors, prop-driven sizing, etc.) — add its path
// to scripts/check-static-styles.allowlist.txt. Never use the allowlist
// to silence a regression where the styles could have been Tailwind classes.

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const allowlistPath = resolve(scriptDir, 'check-static-styles.allowlist.txt');

const allowed = new Set(
  readFileSync(allowlistPath, 'utf8')
    .split('\n')
    // Strip trailing `# why this is dynamic` notes so each entry can carry
    // its own justification inline. Whole-line comments are dropped too.
    .map((line) => line.replace(/#.*$/, '').trim())
    .filter(Boolean)
);

let rawGrep = '';
try {
  // --include: only real source files. A bare `grep -rl` also matches docs
  // (e.g. a JSX sample inside pipelines/judge/README.md), which is a false
  // positive the allowlist should never have to carry.
  rawGrep = execSync(
    'grep -rl --include="*.tsx" --include="*.ts" "style={{" src/components demo/src 2>/dev/null',
    { encoding: 'utf8' },
  );
} catch (err) {
  if (err.status !== 1) throw err;
}

/** Blank out string/template-literal/comment content, preserving line count. */
function stripStrings(src) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '`' || c === '"' || c === "'") {
      const q = c;
      out += q;
      i++;
      while (i < src.length) {
        if (src[i] === '\\') { i += 2; continue; }
        if (src[i] === q) { out += q; i++; break; }
        out += src[i] === '\n' ? '\n' : ' ';
        i++;
      }
    } else if (c === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i++;
    } else if (c === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) {
        out += src[i] === '\n' ? '\n' : '';
        i++;
      }
      i += 2;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

const current = new Set(
  rawGrep
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    // Keep only files whose REAL code (not code samples in strings) uses it.
    .filter((f) => stripStrings(readFileSync(f, 'utf8')).includes('style={{'))
);

const additions = [...current].filter((f) => !allowed.has(f)).sort();
const removals = [...allowed].filter((f) => !current.has(f)).sort();

if (additions.length > 0) {
  process.stderr.write(
    '\nX check-static-styles: new file(s) with inline `style={{}}` detected:\n\n'
  );
  for (const f of additions) process.stderr.write('  ' + f + '\n');
  process.stderr.write(
    '\nIf the style values are dynamic (computed from props / state / runtime data) and cannot be expressed as Tailwind classes,\n' +
      'add the path(s) to scripts/check-static-styles.allowlist.txt.\n\n' +
      'If the values are static literals, convert them to Tailwind classes via cn() instead.\n' +
      'See TAILWIND_MIGRATION.md ("convert vs keep" heuristic).\n'
  );
  process.exit(1);
}

if (removals.length > 0) {
  process.stdout.write(
    '\nok check-static-styles: pass.\n\nNote: ' +
      removals.length +
      ' allowlisted file(s) no longer use `style={{}}` and may be removed from the allowlist:\n'
  );
  for (const f of removals) process.stdout.write('  - ' + f + '\n');
} else {
  process.stdout.write('ok check-static-styles: pass (' + current.size + ' allowlisted file(s)).\n');
}
