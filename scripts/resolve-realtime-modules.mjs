// Locate @connorhoehn/realtime-modules' TS source, from anywhere.
//
// Both the Storybook and demo configs alias this peer dep's subpaths at its
// TypeScript source (it ships a CJS dist whose named exports Rollup cannot
// see). They used to locate it two different but equally brittle ways:
//   .storybook/main.ts   -> resolve(process.cwd(), 'node_modules/...')
//   demo/vite.config.ts  -> resolve(<config dir>, '../node_modules/...')
//
// Both assume `node_modules` sits at one fixed spot. A git worktree has no
// `node_modules` of its own, so both resolved to a path that does not exist
// and the build died with an opaque UNLOADABLE_DEPENDENCY. That bit four
// separate agent runs, each of which "fixed" it with a throwaway symlink.
//
// Walking up from the caller instead is correct in both layouts, and in a
// worktree in particular: worktrees live under `<repo>/.claude/worktrees/`,
// so walking up from one reaches the real checkout's `node_modules`.

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const PKG = 'node_modules/@connorhoehn/realtime-modules';

/**
 * @param {string} startDir Directory to search upward from — pass
 *   `import.meta.dirname` from the calling config.
 * @returns {string} Absolute path to the package's `src` directory.
 */
export function realtimeModulesSrc(startDir) {
  let dir = startDir;
  for (let i = 0; i < 8; i++) {
    const candidate = resolve(dir, PKG, 'src');
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break; // filesystem root
    dir = parent;
  }
  // Not found. Return the conventional location so the resulting error names
  // a path a human recognises, rather than something from halfway up the tree.
  return resolve(startDir, PKG, 'src');
}

/** Subpath helper: `rmSrc(dir)('client/index.ts')`. */
export function rmSrc(startDir) {
  const base = realtimeModulesSrc(startDir);
  return (/** @type {string} */ p) => resolve(base, p);
}
