#!/usr/bin/env node
//
// Regenerates src/__tests__/export-surface.snapshot.ts from the current
// dist/ build. Run this AFTER `npm run build` and BEFORE committing a
// deliberate public-API change (a new export, or a removal past its
// deprecation period — see CONTRIBUTING.md's version-bump policy).
//
// This does not reimplement the entrypoint/import logic: it just runs
// export-surface.test.ts's own regeneration test with UPDATE_EXPORT_SNAPSHOT
// set, so the generator can never drift from what the checker itself
// imports and asserts on.

import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

const result = spawnSync(
  'npx',
  ['vitest', 'run', 'src/__tests__/export-surface.test.ts'],
  {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, UPDATE_EXPORT_SNAPSHOT: '1' },
  },
);

if (result.status !== 0) {
  console.error('\nSnapshot regeneration run failed — see output above.');
  process.exit(result.status ?? 1);
}

console.log(
  '\nsrc/__tests__/export-surface.snapshot.ts regenerated. Review the diff, ' +
    'then run `npx vitest run src/__tests__/export-surface.test.ts` again ' +
    '(without the env var) to confirm the suite is green against it.',
);
