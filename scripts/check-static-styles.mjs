#!/usr/bin/env node
// Drift check: fails CI if a NEW file appears in src/components/ OR demo/src/
// that uses `style={{...}}` and isn't on the grandfathered allowlist. Locks in
// the "convert vs keep" heuristic from TAILWIND_MIGRATION.md.
//
// Occurrences inside strings and template literals do NOT count. Several docs
// pages carry JSX code samples in code={`...`} props; a naive grep flags the
// sample text and forces allowlisting files whose real JSX is clean.
//
// The HOISTED form counts too. Until 2026-08-24 this only ever grepped for the
// literal string `style={{`, so moving the identical object to a module-level
// const and writing `style={rowStyle}` — or bundling several into
// `const styles = {...}` and writing `style={styles.row}` — evaded it entirely.
// Eleven demo files were doing exactly that while the guard reported green and
// CLAUDE.md recorded demo eradication as complete. `hasViolation` now resolves
// those references. Note the limits documented on `objectLiteralNames`: an
// object literal built INSIDE a component is not chased, so this is a floor,
// not a proof of absence.
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
  // Two forms are collected. `style={{` is the literal inline object. `style={`
  // alone also catches the HOISTED form — `const rowStyle = {...}` at module
  // scope, referenced as `style={rowStyle}` — which is the same hand-rolled
  // styling wearing a disguise. The grep is deliberately loose; `hasViolation`
  // below decides which of those references actually count.
  rawGrep = execSync(
    'grep -rl --include="*.tsx" --include="*.ts" "style={" src/components demo/src 2>/dev/null',
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
 * Names bound to a MODULE-LEVEL object literal — `const rowStyle = {`,
 * `const rowStyle: CSSProperties = {`, `const styles = { wrapper: {...} }`.
 * These are what a `style={name}` / `style={styles.name}` reference points at
 * when the styling is static: a literal written once at load time.
 *
 * Two deliberate limits keep this from crying wolf:
 *  - Module level only (the declaration starts at column 0). An object built
 *    inside a component is usually closing over props/state — a dnd-kit
 *    `transform`, a computed position — and is genuinely runtime-derived.
 *  - Object literals only. `useMemo(...)`, a function call, or a prop is not
 *    matched, for the same reason.
 */
function objectLiteralNames(stripped) {
  const names = new Set();
  const re = /^(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=\n]+)?=\s*\{/gm;
  let m;
  while ((m = re.exec(stripped)) !== null) names.add(m[1]);
  return names;
}

/**
 * True when the file hand-rolls inline styling — either the literal
 * `style={{...}}` form, or a `style={x}` whose `x` is an object literal
 * declared in the same file (the hoisted dodge).
 */
function hasViolation(src) {
  const stripped = stripStrings(src);
  if (stripped.includes('style={{')) return true;

  const locals = objectLiteralNames(stripped);
  if (locals.size === 0) return false;

  // Every `style={ ... }` reference, capturing the expression up to the first
  // newline — enough for `style={x}` and `style={a ? b : c}`, and anything
  // longer is an inline object already caught above.
  const re = /\bstyle=\{([^{}\n]*)\}/g;
  let m;
  while ((m = re.exec(stripped)) !== null) {
    const idents = m[1].match(/[A-Za-z_$][\w$]*/g) ?? [];
    if (idents.some((id) => locals.has(id))) return true;
  }
  return false;
}

const current = new Set(
  rawGrep
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    // Test files are not rendered UI. `video/__tests__/classNameSeam.test.tsx`
    // exists precisely to assert that components forward a `style` prop, so it
    // passes a module-level literal into a dozen components on purpose.
    .filter((f) => !f.includes('__tests__') && !/\.test\.tsx?$/.test(f))
    // Keep only files whose REAL code (not code samples in strings) uses it.
    .filter((f) => hasViolation(readFileSync(f, 'utf8')))
);

const additions = [...current].filter((f) => !allowed.has(f)).sort();
const removals = [...allowed].filter((f) => !current.has(f)).sort();

if (additions.length > 0) {
  process.stderr.write(
    '\nX check-static-styles: new file(s) with hand-rolled inline styles detected\n' +
      '(either `style={{...}}` or a `style={x}` pointing at a module-level object literal):\n\n'
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
      ' allowlisted file(s) no longer hand-roll inline styles and may be removed from the allowlist:\n'
  );
  for (const f of removals) process.stdout.write('  - ' + f + '\n');
} else {
  process.stdout.write('ok check-static-styles: pass (' + current.size + ' allowlisted file(s)).\n');
}
