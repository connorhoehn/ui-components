// scripts/tsc.mjs
//
// Runs the `tsc` from the `typescript` package (TypeScript 7), whatever the
// `node_modules/.bin/tsc` symlink happens to point at.
//
// Why this exists: TypeScript 7 ships no JavaScript Compiler API, so
// vite-plugin-dts v5 needs `@typescript/typescript6` alongside it. That
// package depends on `@typescript/old` (npm:typescript@6), which also declares
// `bin.tsc` and can overwrite the root `.bin/tsc` symlink depending on install
// order. A bare `tsc` in a script would then silently typecheck with 6.x.
//
// Resolved through Node rather than a literal `./node_modules/...` path so it
// also works in a worktree under `<repo>/.claude/worktrees/` (see
// scripts/vite-build.mjs for the same shape).

import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

let tscBin;
try {
  const manifestPath = require.resolve('typescript/package.json');
  const manifest = require('typescript/package.json');
  const rel = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.tsc;
  if (!rel) throw new Error('typescript package.json declares no `bin.tsc`');
  tscBin = join(dirname(manifestPath), rel);
} catch {
  console.error('Could not resolve `typescript`. Run `npm install` in the repo root.');
  process.exit(1);
}

const result = spawnSync(process.execPath, [tscBin, ...process.argv.slice(2)], { stdio: 'inherit' });
if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
