/** @vitest-environment node */
import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import path from 'node:path';

/**
 * Detects ambiguous `export *` collisions across the whole reachable source
 * graph — the class of bug behind `PopOutIcon`/`EditIcon`/`TrashIcon` in
 * `src/index.ts` (both the shared barrel and the ui barrel star-exported
 * `Icons`, and TS refused the ambiguous name for a consumer; the fix was the
 * explicit named re-export at the bottom of that file).
 *
 * WHY THE TYPESCRIPT COMPILER, NOT A HAND-ROLLED RUNTIME CHECK: the obvious
 * runtime approach — dynamically import each `export *` source of an entry
 * and diff their key sets for a name with two different values — was tried
 * first and rejected. It cannot replicate what TypeScript itself does:
 *   - When the esbuild/Vite transform used by this suite's other tests
 *     resolves a genuinely ambiguous `export *` name, it silently picks ONE
 *     source with no error (confirmed empirically: two fixture modules each
 *     exporting `Foo` with a different value, star-exported into one barrel,
 *     produced a barrel where `Foo` resolved to the FIRST source's value,
 *     no warning). A runtime diff would need to reimplement TS's own
 *     resolution rules to tell a real collision apart from a false one.
 *   - The false-positive case is common and legitimate: the same underlying
 *     symbol re-exported into an entry through two different intermediate
 *     barrels (e.g. two domains both doing `export * from '../ui/Icons'`)
 *     is NOT ambiguous — same declaration, two paths — and must not fail
 *     here. Verified empirically (a fixture where two barrels both
 *     `export *` the identical source module produces zero TS2308s), so a
 *     naive "does more than one source export this name" check would flag
 *     working code.
 *   - TypeScript's own diagnostic (TS2308, "Module X has already exported a
 *     member named Y. Consider explicitly re-exporting to resolve the
 *     ambiguity.") gets both of these right, because it's checking actual
 *     declaration identity, not export-value equality. It only fires for a
 *     genuine distinct-declaration collision (confirmed empirically against
 *     a fixture reproducing exactly that shape) — which is "every name the
 *     entry exposes has a single defining module," the fallback this test
 *     documents choosing.
 *
 * This runs `tsc`'s own program construction (same tsconfig.json, so the
 * exact compiler options `npm run lint`'s `tsc --noEmit` uses) over every
 * file reachable from the package's own source tree and asserts zero
 * TS2308 diagnostics. It is deliberately redundant with `npm run lint` —
 * `npm test` (vitest) should catch this class on its own rather than
 * depend on a human also remembering to run lint separately, and a CI
 * pipeline that runs them as independent jobs should not have a gap between
 * them. SCOPE NOTE: this only catches RUNTIME-relevant ambiguity the way
 * `tsc` reports it against source; the "TS refuses an ambiguous name" half
 * of the original bug (b) — the case where the RELEASED, rolled-up
 * `dist/*.d.ts` disagrees with the source-level check because
 * vite-plugin-dts's declaration bundling resolves (or fails to resolve)
 * `export *` chains differently than compiling the source directly — is not
 * reproducible in-test: compiling the built `.d.ts` files directly produced
 * zero TS2308s even against a hand-built fixture engineered to trigger one,
 * so there is no compiler-API hook available here for the declaration-
 * bundling step itself. Guarding against that half is `npm run build`'s own
 * job (the pre-commit gate builds `dist/` and its `.d.ts` output); this
 * test's job is catching the collision before it ever reaches the bundler.
 */
describe('no ambiguous star-export collisions in the public source graph', () => {
  it(
    'produces zero TS2308 diagnostics ("Module X has already exported a member named Y")',
    () => {
      const root = process.cwd();
      const configFile = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
      expect(configFile.error, 'failed to read tsconfig.json').toBeUndefined();

      const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
      const program = ts.createProgram(parsed.fileNames, parsed.options);
      const ambiguous = ts.getPreEmitDiagnostics(program).filter((d) => d.code === 2308);

      const formatted = ambiguous.map((d) => {
        const file = d.file ? path.relative(root, d.file.fileName) : '(unknown file)';
        const loc =
          d.file && d.start !== undefined
            ? (() => {
                const pos = d.file!.getLineAndCharacterOfPosition(d.start!);
                return `${file}:${pos.line + 1}:${pos.character + 1}`;
              })()
            : file;
        return `${loc} — ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`;
      });

      expect(formatted).toEqual([]);
    },
    // Full-project type-check (~1,985 files as of 2.275.1); measured ~9–15s
    // locally, well past vitest's 5s default per-test timeout.
    30_000,
  );
});
