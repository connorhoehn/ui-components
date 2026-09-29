// The point of `integrations/realtime`: it loads under ANY install scope of
// realtime-modules, because it never imports `@connorhoehn/realtime-modules` at
// runtime. That property lives in the BUILT output (a type import that the
// compiler failed to erase, or a shared chunk that happens to carry a canonical
// binder, only shows up there), so this walks dist/ — every chunk reachable from
// the entry, static and dynamic, ESM and CJS.
//
// Paths are anchored on this file, not `process.cwd()` or a package
// self-reference, so it runs the same in the main checkout and in a worktree
// whose node_modules is a symlink.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const DIST = resolve(import.meta.dirname, '../../../../dist');

/** Every bare specifier reachable from `entry` through relative chunk imports. */
function bareSpecifiersFrom(entry: string): Set<string> {
  const out = new Set<string>();
  const seen = new Set<string>();
  const queue = [entry];
  while (queue.length) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    expect(existsSync(file), `missing chunk ${file}`).toBe(true);
    const src = readFileSync(file, 'utf8');
    const specs = [
      ...[...src.matchAll(/\bfrom\s*["']([^"']+)["']/g)].map((m) => m[1]),
      ...[...src.matchAll(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]),
      ...[...src.matchAll(/\bimport\s*["']([^"']+)["']/g)].map((m) => m[1]),
      ...[...src.matchAll(/\brequire\s*\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]),
    ];
    for (const spec of specs) {
      if (spec.startsWith('.')) queue.push(join(dirname(file), spec));
      else out.add(spec);
    }
  }
  return out;
}

const CANONICAL = /^@connorhoehn\/realtime-modules(\/|$)/;

describe('dist/integrations/realtime — scope-agnostic', () => {
  for (const ext of ['js', 'cjs']) {
    it(`realtime.${ext} reaches no runtime import of @connorhoehn/realtime-modules`, () => {
      const entry = join(DIST, 'integrations', `realtime.${ext}`);
      expect(existsSync(entry), `${entry} not built — run npm run build`).toBe(true);
      const hits = [...bareSpecifiersFrom(entry)].filter((s) => CANONICAL.test(s));
      expect(hits).toEqual([]);
    });

    // Proves the walker can see such an import at all: the canonical entry
    // must still reach the package it binds.
    it(`realtime-modules.${ext} still binds the canonical package`, () => {
      const entry = join(DIST, 'integrations', `realtime-modules.${ext}`);
      const hits = [...bareSpecifiersFrom(entry)].filter((s) => CANONICAL.test(s)).sort();
      expect(hits).toEqual([
        '@connorhoehn/realtime-modules/call',
        '@connorhoehn/realtime-modules/client',
        '@connorhoehn/realtime-modules/client/hangout-rooms',
        '@connorhoehn/realtime-modules/client/video',
      ]);
    });
  }
});
