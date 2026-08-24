// Packaging contract.
//
// These are the failures a consumer hits that our own test suite cannot see,
// because in-repo everything resolves from devDependencies. Found by packing a
// tarball and installing it into a scratch project:
//
//   - dist/index.d.ts imported y-protocols/awareness and lib0/observable, so
//     every consumer's typecheck failed on the ROOT import (TS2307).
//   - the root bundle statically imports amazon-cognito-identity-js, so
//     `import { Button } from '@connorhoehnslalom/ui-components'` crashed at
//     runtime with ERR_MODULE_NOT_FOUND.
//   - 13 of 15 export subpaths declared only `import`, so nothing but the root
//     could be require()d even though a .cjs shipped for each.
//
// Anything vite externalises must be declared, or it is a runtime crash in
// somebody else's app.

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';

const ROOT = join(__dirname, '..', '..');
const DIST = join(ROOT, 'dist');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

const declared = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]);

/** A valid npm specifier: `foo`, `foo-bar`, `@scope/name`, plus subpaths. */
const SPECIFIER = /^(?:@[a-z0-9][\w.-]*\/)?[a-z0-9][\w.-]*(?:\/[\w.@-]+)*$/i;
const NODE_BUILTINS = new Set([
  'url', 'path', 'fs', 'os', 'crypto', 'util', 'stream', 'buffer', 'events',
  'assert', 'process', 'child_process', 'http', 'https', 'zlib', 'tty', 'net',
]);

function packageOf(spec: string): string {
  return spec.startsWith('@')
    ? spec.split('/').slice(0, 2).join('/')
    : spec.split('/')[0];
}

function walk(dir: string, test: (f: string) => boolean, out: string[] = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, test, out);
    else if (test(entry)) out.push(full);
  }
  return out;
}

function bareImports(files: string[]): Set<string> {
  const found = new Set<string>();
  const RE = /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)["']([^"']+)["']/g;
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(RE)) {
      const spec = m[1];
      if (spec.startsWith('.') || spec.startsWith('/')) continue;
      if (spec.startsWith('node:')) continue;
      if (!SPECIFIER.test(spec)) continue; // minified template-literal noise
      const name = packageOf(spec);
      if (NODE_BUILTINS.has(name)) continue;
      found.add(name);
    }
  }
  return found;
}

const distExists = existsSync(join(DIST, 'index.js'));

describe.skipIf(!distExists)('packaging contract (requires a build)', () => {
  it('every runtime import in dist/ is a declared dependency or peer', () => {
    const js = walk(DIST, (f) => f.endsWith('.js') || f.endsWith('.cjs'));
    const undeclaredRuntime = [...bareImports(js)].filter((n) => !declared.has(n)).sort();
    expect(
      undeclaredRuntime,
      `These are externalised in vite.config.ts and imported by the shipped\n` +
        `bundle, but not declared — a consumer gets ERR_MODULE_NOT_FOUND:\n  ` +
        undeclaredRuntime.join('\n  '),
    ).toEqual([]);
  });

  // The inverse of the check above, and the one that was missing until
  // v2.73.0: a runtime `dependency` that is NOT externalised gets inlined
  // into a shared chunk that every entry drags in. `cmdk` was bundled that
  // way — importing `Chip` pulled 64KB of command-palette fuzzy-matching,
  // a 10x weight penalty on the smallest primitives.
  it('every runtime dependency is externalised, not bundled into dist', () => {
    const js = walk(DIST, (f) => f.endsWith('.js'));
    const imported = bareImports(js);
    const bundled = Object.keys(pkg.dependencies ?? {})
      .filter((dep) => !imported.has(dep))
      .sort();
    expect(
      bundled,
      `These are declared dependencies but never imported by the shipped\n` +
        `bundle, which means vite INLINED them. Add them to the externals\n` +
        `list in vite.config.ts so consumers resolve them from node_modules:\n  ` +
        bundled.join('\n  '),
    ).toEqual([]);
  });

  it('every type-only import in dist/**.d.ts is declared', () => {
    const dts = walk(DIST, (f) => f.endsWith('.d.ts'));
    const undeclaredTypes = [...bareImports(dts)].filter((n) => !declared.has(n)).sort();
    expect(
      undeclaredTypes,
      `These appear in the shipped .d.ts files but are not declared — a\n` +
        `consumer's tsc fails with TS2307 on import:\n  ` +
        undeclaredTypes.join('\n  '),
    ).toEqual([]);
  });

  // A vite-plugin-dts 5 evaluation (2026-08-23) found a failure mode this
  // suite could not see: v5 renamed `rollupTypes` -> `bundleTypes` and
  // IGNORES the old key silently, so the build stays exit-0 and green while
  // emitting a 1237-file `dist/src/**` tree and NO `dist/index.d.ts` at all.
  // Every `exports` map `types` target would 404 for consumers. Assert the
  // rollup's actual shape, not merely that some file exists.
  it('ships rolled-up .d.ts bundles, not a stub or an unbundled tree', () => {
    const rootDts = readdirSync(DIST).filter((f) => f.endsWith('.d.ts'));
    expect(
      rootDts.length,
      `Expected rolled-up .d.ts bundles at the dist root; found ${rootDts.length}.`,
    ).toBeGreaterThanOrEqual(13);

    const index = readFileSync(join(DIST, 'index.d.ts'), 'utf8');
    // The stub form is ~2.8KB of `export * from './src/...'` re-exports.
    expect(
      index.length,
      'dist/index.d.ts looks like the stub form, not the self-contained rollup.',
    ).toBeGreaterThan(50_000);
    expect(index).not.toMatch(/from '\.\/src\//);

    // An unbundled tree next to the rollup means the bundler silently changed mode.
    expect(
      existsSync(join(DIST, 'src')),
      'dist/src/ exists — the dts plugin emitted per-file declarations instead of bundling.',
    ).toBe(false);
  });

  it('every export subpath ships both an ESM and a CJS entry', () => {
    const broken: string[] = [];
    for (const [key, val] of Object.entries<Record<string, string> | string>(pkg.exports)) {
      if (typeof val === 'string') continue; // ./styles.css, ./package.json
      for (const cond of ['types', 'import', 'require'] as const) {
        const target = val[cond];
        if (!target) { broken.push(`${key} has no "${cond}" condition`); continue; }
        if (!existsSync(join(ROOT, target))) broken.push(`${key} "${cond}" -> ${target} missing`);
      }
    }
    expect(broken, broken.join('\n')).toEqual([]);
  });

  it('exposes ./package.json, which build tooling and version probes read', () => {
    expect(pkg.exports['./package.json']).toBe('./package.json');
  });
});

// ---------------------------------------------------------------------------
// Which optional peers does each entry point actually DRAG IN?
// ---------------------------------------------------------------------------

// `peerDependenciesMeta` marks recharts, the @tiptap/* packages, cognito, hls
// and others `optional: true`. That flag promises a consumer can skip them.
// For several entry points the promise is false: the barrel re-exports a
// component that imports the peer at module scope, so `import { Button } from
// '@connorhoehnslalom/ui-components/shared'` fails at runtime with
// ERR_MODULE_NOT_FOUND unless recharts is installed — because `shared/Chart.tsx`
// is `export *`'d from the same barrel.
//
// Verified against a real packed tarball in a scratch consumer: with the
// optional peers absent, 8 of 13 subpaths failed to import; with them present,
// all but `/integrations/realtime-modules` (genuinely unpublished) import clean.
//
// Bundler consumers are usually spared by tree-shaking. Node-ESM and SSR
// consumers are not. This test does not force that to change — moving Chart out
// of the barrel would be a breaking change needing a consumer handoff. It pins
// the CURRENT truth so the set cannot quietly grow, and so the cost of adding an
// eager peer import to a common barrel is visible at review time.
describe('entry points and their transitive optional peers', () => {
  it('no entry point drags in an optional peer beyond the documented set', async () => {
    const { readFileSync, existsSync } = await import('node:fs');
    const { join, dirname } = await import('node:path');

    const ROOT = join(process.cwd(), 'dist');
    if (!existsSync(join(ROOT, 'index.js'))) return; // dist absent; build first

    // A bare specifier, not a `from` inside a template literal or a string.
    const SPECIFIER = /^(@[a-z0-9-~][\w.-]*\/)?[a-z0-9-~][\w.-]*$/;
    const ALWAYS = new Set(['react', 'react-dom', 'react/jsx-runtime', 'clsx', 'tailwind-merge']);

    /** Follow relative chunk imports so transitive peers are counted. */
    function peersOf(entry: string): string[] {
      const seen = new Set<string>();
      const found = new Set<string>();
      const queue = [entry];
      while (queue.length) {
        const file = queue.pop()!;
        if (seen.has(file) || !existsSync(file)) continue;
        seen.add(file);
        for (const m of readFileSync(file, 'utf8').matchAll(/from\s*"([^"]+)"/g)) {
          const spec = m[1];
          if (spec.startsWith('.')) { queue.push(join(dirname(file), spec)); continue; }
          const pkg = spec.split('/').slice(0, spec.startsWith('@') ? 2 : 1).join('/');
          if (SPECIFIER.test(pkg) && !ALWAYS.has(pkg) && !ALWAYS.has(spec)) found.add(pkg);
        }
      }
      return [...found].sort();
    }

    // The documented truth. Shrinking an entry is always fine — update the
    // list. GROWING one means a common import path now needs another package
    // installed, so make that a deliberate decision, not a side effect.
    const EXPECTED: Record<string, string[]> = {
      types: [],
      video: [],
      social: ['cmdk'],
      agents: ['@xyflow/react'],
      identity: [],
      shared: ['cmdk', 'recharts'],
      observability: ['react-router', 'recharts'],
      ingest: ['react-router', 'recharts'],
      hooks: ['amazon-cognito-identity-js', 'react-router', 'yjs'],
      pipelines: ['@xyflow/react', 'react-router', 'recharts'],
      'doc-editor': [
        '@tiptap/extension-collaboration', '@tiptap/extension-placeholder',
        '@tiptap/extension-task-item', '@tiptap/extension-task-list',
        '@tiptap/react', '@tiptap/starter-kit', '@tiptap/y-tiptap', 'yjs',
      ],
      // The root barrel re-exports nearly everything, so it needs nearly
      // everything. That is expected — subpaths are how a consumer opts out.
      index: [
        '@tiptap/extension-collaboration', '@tiptap/extension-placeholder',
        '@tiptap/extension-task-item', '@tiptap/extension-task-list',
        '@tiptap/react', '@tiptap/starter-kit', '@tiptap/y-tiptap',
        'amazon-cognito-identity-js', 'cmdk', 'react-router', 'recharts', 'yjs',
      ],
    };

    const actual: Record<string, string[]> = {};
    for (const entry of Object.keys(EXPECTED)) {
      actual[entry] = peersOf(join(ROOT, `${entry}.js`));
    }
    expect(actual).toEqual(EXPECTED);
  });
});
