// Shared argument handling for the three consumer-runnable guards
// (check-static-styles, check-node-controls, check-hex-colors).
//
// With NO arguments each guard keeps its historical, repo-internal behaviour:
// its hardcoded roots and its own baseline/allowlist. That is what
// `npm run lint:*` in this repo runs, and it must not drift.
//
// With `--root <dir>` (repeatable) the guard scans the given directories
// instead and IGNORES the library's own baseline — a consumer has none of the
// library's justified exceptions. `--allowlist <file>` supplies the consumer's
// exceptions. Paths in the allowlist and in the output are the scanned paths as
// `join(root, relative)`, i.e. relative to the working directory when the roots
// are.
//
// Installed under node_modules (as a package `bin`), the repo's default roots
// do not exist and the library's allowlist is meaningless, so running without
// `--root` there is a usage error instead of a silent green.

import { existsSync, readFileSync, statSync } from 'node:fs';
import { parseArgs } from 'node:util';

export function parseGuardArgs({ name, scriptUrl, usage }) {
  let values;
  try {
    ({ values } = parseArgs({
      options: {
        root: { type: 'string', multiple: true },
        allowlist: { type: 'string' },
        help: { type: 'boolean', short: 'h' },
      },
      allowPositionals: false,
    }));
  } catch (err) {
    fail(name, `${err.message}\n\n${usage}`);
  }
  if (values.help) {
    process.stdout.write(usage + '\n');
    process.exit(0);
  }

  const roots = values.root ?? [];
  const custom = roots.length > 0;
  const installed = new URL(scriptUrl).pathname.includes('/node_modules/');

  if (!custom && installed) {
    fail(name, `pass at least one --root <dir> (the defaults only exist inside the ui-components repo).\n\n${usage}`);
  }
  for (const root of roots) {
    if (!existsSync(root) || !statSync(root).isDirectory()) fail(name, `--root ${root} is not a directory.`);
  }
  if (values.allowlist !== undefined && !existsSync(values.allowlist)) {
    fail(name, `--allowlist ${values.allowlist} does not exist.`);
  }

  return { custom, roots, allowlistPath: values.allowlist };
}

/**
 * Read an allowlist: one path per line, optional trailing count, `#` comments.
 *   src/pages/Cursor.tsx        # runtime cursor position
 *   src/legacy/OldForm.tsx 3    # ratchet: at most 3, and lower it as it drops
 * Returns Map<path, number | null>; null means "any count".
 */
export function readAllowlist(path) {
  const entries = new Map();
  for (const raw of readFileSync(path, 'utf8').split('\n')) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const m = line.match(/^(\S+)(?:\s+(\d+))?$/);
    if (!m) continue;
    entries.set(m[1].replace(/^\.\//, ''), m[2] === undefined ? null : Number(m[2]));
  }
  return entries;
}

function fail(name, message) {
  process.stderr.write(`${name}: ${message}\n`);
  process.exit(2);
}
