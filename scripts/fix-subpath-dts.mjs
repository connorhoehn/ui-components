// Repair the .d.ts of every NESTED subpath export.
//
// NOTE (v2.396.1): vite-plugin-dts v5 (`bundleTypes`) writes nested entries
// to their exports-map path directly, so this normally repairs 0 files. It
// stays as the guard: it still FAILS the build if a stub ever ships.
//
// vite-plugin-dts v4 with `rollupTypes: true` named its rolled-up declaration
// after the last segment of the entry key, so a nested entry like
// `social/rich-composer` writes its real types to `dist/rich-composer.d.ts`
// while `dist/social/rich-composer.d.ts` — the path the exports map actually
// points at — gets a passthrough stub:
//
//     export * from '../src/components/social/rich-composer'
//
// `files` is `["dist"]`, so src is never published and that stub resolves to
// nothing. The subpath keeps working at RUNTIME (the .js is fine) and is
// completely untyped for consumers: every import off it reads as
// "has no exported member". Nothing in this repo notices, because the repo
// has src.
//
// This was patched once by hand for `integrations/realtime-modules` and then
// went unnoticed for `social/rich-composer`, which shipped untyped and put 14
// errors in the example app's typecheck. So the repair is derived from the
// exports map rather than hardcoded: add a third nested subpath and it is
// covered on the next build.
//
// It also FAILS the build when it cannot repair one. A missing type file is
// how this got shipped in the first place; silence is the bug.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

/** A stub is any declaration that re-exports out of dist — i.e. into src. */
const isStub = (text) => /from\s+['"]\.\.\/src\//.test(text);

const repaired = [];
const failures = [];

for (const [subpath, entry] of Object.entries(pkg.exports ?? {})) {
  const types = entry && typeof entry === 'object' ? entry.types : null;
  if (typeof types !== 'string') continue;

  // Only nested declarations are at risk; `./dist/social.d.ts` is written
  // where the exports map already points.
  const rel = types.replace(/^\.\//, '');
  const segments = rel.split('/');
  if (segments.length < 3) continue; // dist/<name>.d.ts — flat, fine.

  const target = path.join(root, rel);
  const flattened = path.join(root, 'dist', path.basename(rel));

  const missing = !fs.existsSync(target);
  if (!missing && !isStub(fs.readFileSync(target, 'utf8'))) continue;

  if (!fs.existsSync(flattened)) {
    failures.push(
      `${subpath}: ${rel} is ${missing ? 'missing' : 'a src passthrough'} and ` +
        `there is no rolled-up ${path.relative(root, flattened)} to repair it from`,
    );
    continue;
  }

  fs.copyFileSync(flattened, target);
  repaired.push(`${subpath} ← dist/${path.basename(rel)}`);
}

for (const line of repaired) console.log(`fix-subpath-dts: repaired ${line}`);

if (failures.length > 0) {
  console.error('fix-subpath-dts FAILED — these subpaths would ship untyped:');
  for (const line of failures) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(`fix-subpath-dts passed: ${repaired.length} nested subpath(s) repaired.`);
