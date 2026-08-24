// scripts/vite-build.mjs
//
// Runs `vite build` with the 8GB heap the dts rollup needs.
//
// This exists because `package.json` used to spell the invocation as
// `node --max-old-space-size=8192 ./node_modules/vite/bin/vite.js build`.
// That relative path is a FILESYSTEM path, not a module specifier, so it only
// resolves in the main checkout. A git worktree under `<repo>/.claude/worktrees/`
// has no `node_modules` of its own — `npm test` and `npm run lint` still work
// there because Node's resolver walks UP the directory tree to `<repo>/node_modules`,
// but a literal `./node_modules/...` path never gets that treatment. So the build
// was the one script that silently could not run in a worktree, which is exactly
// where the agents doing the work live.
//
// Same fix shape as scripts/resolve-realtime-modules.mjs: let Node resolve it.
//
// The heap flag has to be on the child process, not this one — `--max-old-space-size`
// applies per V8 isolate and cannot be raised from inside a running process.

import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

// Resolve the package.json, not `vite/bin/vite.js` directly: vite ships an
// `exports` map that does not list the bin, so asking for it fails with
// ERR_PACKAGE_PATH_NOT_EXPORTED even in a perfectly normal install. The
// package.json IS exported (packages must expose it), which gives us the
// install directory, and the bin path comes from the manifest rather than
// being hardcoded.
let viteBin;
try {
  const manifestPath = require.resolve('vite/package.json');
  const manifest = require('vite/package.json');
  const rel = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.vite;
  if (!rel) throw new Error('vite package.json declares no `bin`');
  viteBin = join(dirname(manifestPath), rel);
} catch {
  console.error(
    'Could not resolve `vite`. Run `npm install` in the repo root.\n' +
      'If you are in a git worktree, it must live under the repo (the default\n' +
      '`<repo>/.claude/worktrees/`) so Node can walk up to the root node_modules.',
  );
  process.exit(1);
}

const result = spawnSync(
  process.execPath,
  ['--max-old-space-size=8192', viteBin, 'build', ...process.argv.slice(2)],
  { stdio: 'inherit' },
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
