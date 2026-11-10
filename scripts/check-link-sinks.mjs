#!/usr/bin/env node
//
// Guards the navigable-URL sinks in src/. A JSX `href` on <a>/<area>, and a
// `src`/`data` on <iframe>/<embed>/<object>/<frame>/<script>, can run script
// in the page origin when the value is `javascript:` or `data:text/html`. Any
// such value that is not written in the source must pass through `safeHref()`
// (src/lib/safeHref.ts), which allows only http(s), mailto and in-app paths.
//
// Allowed values:
//   - a string literal (the author wrote it)
//   - a `safeHref(...)` call, optionally `?? <allowed>` / `|| <allowed>`
//   - `undefined` / `null`
//   - a template literal whose text starts with "/" or "#" (an in-app path or
//     fragment cannot carry a scheme)
//   - a conditional or `&&` whose result branches are all allowed
//
// <img>/<video>/<audio>/<source> `src` is not a script sink in current
// browsers, so it is out of scope here. The same predicate backs the
// `ui-components/safe-url-attributes` ESLint rule (eslint-plugin/index.mjs),
// which consumers run; this script is how the library enforces it on itself
// because the repo's `lint` is typecheck-only.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import ts from '@typescript/typescript6';

const ROOT = process.argv[2] ?? 'src';
const SINKS = { a: ['href'], area: ['href'], iframe: ['src'], frame: ['src'], embed: ['src'], object: ['data'], script: ['src'] };

// Names whose call result is already scheme-checked.
const SAFE_CALLS = new Set(['safeHref', 'safeDownloadHref', 'linkHref']);

function allowed(n, safeVars = new Set()) {
  if (!n) return true;
  while (ts.isParenthesizedExpression(n) || ts.isAsExpression(n) || ts.isNonNullExpression(n)) n = n.expression;
  if (ts.isStringLiteralLike(n)) return true;
  if (ts.isIdentifier(n)) return n.text === 'undefined' || safeVars.has(n.text);
  if (n.kind === ts.SyntaxKind.NullKeyword) return true;
  if (ts.isCallExpression(n)) return ts.isIdentifier(n.expression) && SAFE_CALLS.has(n.expression.text);
  if (ts.isTemplateExpression(n)) return /^[/#]/.test(n.head.text) && !/^\/[/\\]/.test(n.head.text);
  if (ts.isConditionalExpression(n)) return allowed(n.whenTrue, safeVars) && allowed(n.whenFalse, safeVars);
  if (ts.isBinaryExpression(n)) {
    const op = n.operatorToken.kind;
    if (op === ts.SyntaxKind.QuestionQuestionToken || op === ts.SyntaxKind.BarBarToken) return allowed(n.left, safeVars) && allowed(n.right, safeVars);
    if (op === ts.SyntaxKind.AmpersandAmpersandToken) return allowed(n.right, safeVars);
  }
  return false;
}

function* files(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') yield* files(p); }
    else if (/\.tsx$/.test(e.name) && !/\.(test|stories)\.tsx$/.test(e.name)) yield p;
  }
}

const bad = [];
for (const file of files(ROOT)) {
  const text = readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  // `const href = safeHref(...)` earlier in the file makes `href` safe.
  const safeVars = new Set();
  const collect = (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && allowed(node.initializer)
      && ts.isCallExpression(node.initializer.expression ? node.initializer : node.initializer)) safeVars.add(node.name.text);
    ts.forEachChild(node, collect);
  };
  collect(sf);
  const visit = (node) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(sf);
      const names = SINKS[tag];
      if (names) {
        for (const a of node.attributes.properties) {
          if (!ts.isJsxAttribute(a) || !names.includes(a.name.getText(sf))) continue;
          const init = a.initializer;
          const ok = !init || ts.isStringLiteral(init) || (ts.isJsxExpression(init) && allowed(init.expression, safeVars));
          if (!ok) {
            const line = sf.getLineAndCharacterOfPosition(a.getStart(sf)).line;
            const prev = text.split('\n')[line - 1] ?? '';
            if (!/safe-url:\s*\S/.test(prev)) bad.push(`${file}:${line + 1}  <${tag} ${a.getText(sf).slice(0, 70)}>`);
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

if (bad.length) {
  console.error(`check-link-sinks: ${bad.length} navigable URL(s) not routed through safeHref():\n  ${bad.join('\n  ')}`);
  process.exit(1);
}
console.log('check-link-sinks: ok');
