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
  //
  // TWO forms are matched, because for a long time only the first was:
  //   style={{ ... }}          the literal, inline
  //   style={someStyle}        the SAME thing hoisted to a module const
  //
  // Hoisting evaded this check completely. The whole `document-workspace`
  // demo and `ThemingPage` were built that way and passed a green guard while
  // CLAUDE.md recorded demo inline-style eradication as complete. A rule you
  // can sidestep by naming a variable isn't a rule.
  rawGrep = execSync(
    'grep -rlE --include="*.tsx" --include="*.ts" "style=\\{(\\{|[A-Za-z_$])" src/components demo/src 2>/dev/null',
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

/**
 * True when the file applies a STATIC style object — either written inline, or
 * hoisted to a module-level const and referenced by name.
 *
 * A const is treated as static unless its body shows a sign of being computed
 * per render (interpolation, a ternary, an arrow, a spread of something else).
 * `var(--color-*)` does NOT make it dynamic: that is the documented way to
 * name a design token from JS, and a static box of tokens is still a static
 * box that belongs in Tailwind classes.
 */
function hasInlineStyle(code) {
  if (code.includes('style={{')) return true;
  const names = new Set([...code.matchAll(/style=\{([A-Za-z_$][\w$]*)\}/g)].map((m) => m[1]));
  for (const name of names) {
    const decl = new RegExp(`^const ${name}(?:\\s*:[^=]+)?\\s*=\\s*\\{([\\s\\S]*?)^\\};`, 'm').exec(code);
    if (!decl) continue; // computed in-component; the runtime-derived case
    if (/\$\{|=>|\?|\.\.\./.test(decl[1])) continue;
    return true;
  }
  return false;
}

const current = new Set(
  rawGrep
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    // Tests aren't UI: a seam test may set a style deliberately to assert that
    // the className/style contract holds.
    .filter((f) => !f.includes('__tests__') && !f.endsWith('.test.tsx'))
    // Keep only files whose REAL code (not code samples in strings) uses it.
    .filter((f) => hasInlineStyle(stripStrings(readFileSync(f, 'utf8'))))
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
