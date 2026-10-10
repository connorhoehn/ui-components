import { describe, it, expect } from 'vitest';
import pkg from '../../package.json';
import snapshot from './export-surface.snapshot';

/**
 * Consumer-shaped export-surface guard, covering EVERY public entrypoint the
 * package declares — not just `./shared`.
 *
 * Two defects of this class shipped in the 24h before this test was added:
 *
 *   (a) 2.275.0 added `activeNavItemClassName` / `inactiveNavItemClassName`
 *       to `SubNavLayout.tsx`, documented them, and unit-tested them — but
 *       `src/components/shared/index.ts` never re-exported them, so neither
 *       constant reached `dist/shared.js` / `dist/shared.cjs` / the root
 *       bundle. The existing `SubNavLayout.test.tsx` passed anyway because it
 *       imports the component FILE directly, never the barrel a consumer
 *       actually goes through.
 *   (b) An icon that WAS re-exported still broke a consumer's own `tsc`
 *       because two star-exports fed the same entry the same name — an
 *       ambiguous re-export. `src/index.ts` now carries an explicit named
 *       export for it (see the bottom of that file) to resolve the
 *       ambiguity. That class of bug is covered by
 *       `export-ambiguity.test.ts`, not this file — see its own comment for
 *       why it needs the TypeScript compiler rather than a runtime check.
 *
 * FIDELITY: every assertion here imports the ACTUAL BUILT ARTIFACT under
 * `dist/`, resolved from `package.json`'s own "exports" map — i.e. exactly
 * what `import '@connorhoehnslalom/ui-components/<entry>'` resolves to for a
 * real consumer. This is deliberate: both defects above are invisible to a
 * test that imports a source file or a source barrel instead, because the
 * gap is specifically between "the component/barrel has it" and "the BUILT
 * bundle has it". A source-level test cannot catch either class; only dist
 * can. The entrypoint list itself is read from `package.json`'s "exports"
 * map (not hardcoded), so a newly added subpath is covered automatically the
 * next time this suite runs.
 */

type ExportsMap = Record<string, { import?: string } | string>;

function distEntries(): Array<[string, string]> {
  const exportsMap = (pkg as unknown as { exports: ExportsMap }).exports;
  const entries: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(exportsMap)) {
    // Skip non-JS entries: "./styles.css" (a string, not an exports
    // condition object) and "./package.json" (points at itself).
    if (typeof value !== 'object' || !value.import) continue;
    entries.push([key, value.import.replace(/^\.\//, '../../')]);
  }
  return entries;
}

describe('public export surface (every package.json "exports" entrypoint)', () => {
  const entries = distEntries();

  // Regeneration path for export-surface.snapshot.ts (see the update
  // workflow documented at the top of that file). Skipped in every normal
  // `npm test` run — it only runs via `node scripts/update-export-snapshot.mjs`,
  // which sets this env var. Reuses `distEntries()` above so the generator
  // can never drift from what the checks below actually import.
  it.skipIf(!process.env.UPDATE_EXPORT_SNAPSHOT)(
    'regenerates export-surface.snapshot.ts from the current dist/ build',
    async () => {
      const { writeFileSync, readFileSync } = await import('node:fs');
      const path = await import('node:path');
      const snapshotPath = path.join(import.meta.dirname, 'export-surface.snapshot.ts');
      const current = readFileSync(snapshotPath, 'utf8');
      const declStart = 'const exportSurfaceSnapshot: Record<string, string[]> = {';
      const headerEnd = current.indexOf(declStart);
      if (headerEnd === -1) {
        throw new Error(
          `could not find "${declStart}" in export-surface.snapshot.ts — refusing to ` +
            `regenerate (would have corrupted the file by duplicating its header).`,
        );
      }
      const header = current.slice(0, headerEnd);

      const data: Record<string, string[]> = {};
      for (const [key, distPath] of entries) {
        const ns: Record<string, unknown> = await import(/* @vite-ignore */ distPath);
        data[key] = Object.keys(ns).sort();
      }

      const lines = ['const exportSurfaceSnapshot: Record<string, string[]> = {'];
      for (const [key, names] of Object.entries(data)) {
        lines.push(`  ${JSON.stringify(key)}: [`);
        for (const name of names) lines.push(`    ${JSON.stringify(name)},`);
        lines.push('  ],');
      }
      lines.push('};', '', 'export default exportSurfaceSnapshot;', '');

      writeFileSync(snapshotPath, header.trimEnd() + '\n' + lines.join('\n'));
    },
  );

  it('enumerates every entrypoint that has a committed snapshot, and vice versa', () => {
    // Catches a new "exports" subpath landing with no corresponding
    // snapshot entry (silently uncovered by this suite), and a removed
    // subpath leaving a stale snapshot entry behind.
    const declaredKeys = entries.map(([key]) => key).sort();
    const snapshotKeys = Object.keys(snapshot).sort();
    expect(
      declaredKeys,
      `package.json "exports" now declares different JS entrypoints than ` +
        `src/__tests__/export-surface.snapshot.ts covers. Regenerate the ` +
        `snapshot (see the comment at the top of that file) after confirming ` +
        `the change is deliberate.`,
    ).toEqual(snapshotKeys);
  });

  // The runtime checks below cannot see a broken TYPES artifact. 2.425.0
  // committed a per-file `tsc` emit over the rolled-up dist/index.d.ts
  // (7 KB, no StackedRail, ~3,000 stray d.ts files) while every runtime
  // assertion stayed green. So: each entrypoint's declaration file must be a
  // self-contained rollup (no relative imports) that names every runtime
  // export in the snapshot.
  for (const [key] of entries) {
    it(`entrypoint "${key}" ships a complete rolled-up .d.ts naming every snapshot export`, async () => {
      const { readFileSync, existsSync } = await import('node:fs');
      const path = await import('node:path');
      const exportsMap = (pkg as unknown as { exports: Record<string, { types?: string }> }).exports;
      const rel = exportsMap[key]?.types;
      expect(rel, `exports["${key}"] declares no "types"`).toBeTruthy();
      const file = path.resolve(import.meta.dirname, '../..', rel as string);
      expect(existsSync(file), `${rel} is missing from dist/`).toBe(true);
      const text = readFileSync(file, 'utf8');
      const relative = text.match(/(?:from|import\()\s*['"]\.\.?\/[^'"]*['"]/g) ?? [];
      expect(
        relative.slice(0, 3),
        `${rel} has relative imports: it is a per-file tsc emit, not the rolled-up bundle`,
      ).toEqual([]);
      const idents = new Set(text.match(/[A-Za-z_$][\w$]*/g));
      const missing = (snapshot[key] ?? []).filter((n) => n !== 'default' && !idents.has(n));
      expect(missing, `${rel} does not mention these runtime exports: ${missing.slice(0, 20).join(', ')}`).toEqual([]);
    });
  }

  for (const [key, distPath] of entries) {
    describe(`entrypoint "${key}"`, () => {
      it('loads without throwing and exposes a non-empty named export surface', async () => {
        const ns = await import(/* @vite-ignore */ distPath);
        expect(Object.keys(ns).length).toBeGreaterThan(0);
      });

      it('has no export name that resolves to undefined', async () => {
        // Rarely fires against dist directly — a name that a barrel forgot
        // to re-export (defect (a) above) is simply ABSENT as a key, not
        // present-and-undefined, so the snapshot check below is what
        // actually catches that class. This assertion is defense-in-depth
        // for the narrower case of a real `export const x = undefined`
        // (or an export whose value construction throws away its result)
        // reaching a published bundle.
        const ns: Record<string, unknown> = await import(/* @vite-ignore */ distPath);
        const undefinedExports = Object.keys(ns).filter((name) => ns[name] === undefined);
        expect(
          undefinedExports,
          `entrypoint "${key}" exports resolve to undefined: ${undefinedExports.join(', ')}`,
        ).toEqual([]);
      });

      it('matches the committed export-name snapshot', async () => {
        const ns: Record<string, unknown> = await import(/* @vite-ignore */ distPath);
        const actual = Object.keys(ns).sort();
        const expected: string[] = snapshot[key] ?? [];

        const removed = expected.filter((name) => !actual.includes(name));
        const added = actual.filter((name) => !expected.includes(name));

        // A removal is the missing-re-export defect class: something a
        // consumer could previously import is silently gone. Never update
        // the snapshot to make this pass without confirming the removal is
        // an intended, deliberate breaking change (see CONTRIBUTING.md's
        // deprecation-period rule).
        expect(
          removed,
          `entrypoint "${key}" lost these public exports: ${removed.join(', ')}. If ` +
            `intentional, update src/__tests__/export-surface.snapshot.ts.`,
        ).toEqual([]);

        // An addition is not a bug, but it IS a deliberate public-API
        // change (CONTRIBUTING.md's version-bump policy: new exports are at
        // least a minor bump) — the snapshot update is the record that a
        // human looked at the new name and meant to ship it.
        expect(
          added,
          `entrypoint "${key}" gained new public exports: ${added.join(', ')}. If ` +
            `intentional, update src/__tests__/export-surface.snapshot.ts.`,
        ).toEqual([]);
      });
    });
  }
});
