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

// `peerDependenciesMeta` marks recharts, the @tiptap/* packages, cognito, the
// IVS SDK and others `optional: true`. That flag promises a consumer can skip
// them. For STATIC imports the promise is false: the barrel re-exports a
// component that imports the peer at module scope, so `import { Button } from
// '@connorhoehnslalom/ui-components/shared'` dies with ERR_MODULE_NOT_FOUND
// unless recharts is installed — because `shared/Chart.tsx` is `export *`'d
// from that same barrel.
//
// Verified against a real packed tarball in a scratch consumer: with the
// optional peers absent, 8 of 13 subpaths failed to import; with them present,
// all but `/integrations/realtime-modules` (genuinely unpublished) import clean.
//
// STATIC vs DYNAMIC is the distinction that matters, and they are tracked
// separately below:
//   - a static peer breaks the import itself, for every consumer of that
//     subpath, whether or not they touch the feature;
//   - a dynamic peer (`import('amazon-ivs-web-broadcast')`) only fails when the
//     feature actually runs, which is the deliberate design — the IVS SDK loads
//     when a hangout starts, not when someone imports a Button.
// A walk that follows only `from "…"` reports the IVS SDK as absent from three
// entry points that do reach it. That undercount is the reason this tracks both.
//
// Bundler consumers are usually spared the static problem by tree-shaking.
// Node-ESM and SSR consumers are not. This test does not force that to change —
// moving Chart out of the barrel would be a breaking change needing a consumer
// handoff. It pins the CURRENT truth so the set cannot quietly grow, and so the
// cost of adding an eager peer import to a common barrel is visible at review.
describe('entry points and their transitive optional peers', () => {
  it('no entry point drags in an optional peer beyond the documented set', async () => {
    const { readFileSync, existsSync } = await import('node:fs');
    const { join, dirname } = await import('node:path');

    const ROOT = join(process.cwd(), 'dist');
    if (!existsSync(join(ROOT, 'index.js'))) return; // dist absent; build first

    // A bare specifier, not a `from` inside a template literal or a string.
    const SPECIFIER = /^(@[a-z0-9-~][\w.-]*\/)?[a-z0-9-~][\w.-]*$/;
    const ALWAYS = new Set(['react', 'react-dom', 'react/jsx-runtime', 'clsx', 'tailwind-merge']);

    /**
     * Follow relative chunk imports — static AND dynamic — so transitive peers
     * are counted, and record which kind reached each package.
     */
    function peersOf(entry: string): { static: string[]; dynamic: string[] } {
      const seen = new Set<string>();
      const stat = new Set<string>();
      const dyn = new Set<string>();
      // [file, reachedDynamically]
      const queue: Array<[string, boolean]> = [[entry, false]];
      while (queue.length) {
        const [file, lazy] = queue.pop()!;
        const key = `${file}|${lazy}`;
        if (seen.has(key) || !existsSync(file)) continue;
        seen.add(key);
        const src = readFileSync(file, 'utf8');
        const edges: Array<[string, boolean]> = [
          ...[...src.matchAll(/from\s*"([^"]+)"/g)].map((m) => [m[1], lazy] as [string, boolean]),
          // Anything behind a dynamic import stays dynamic for the rest of the walk.
          ...[...src.matchAll(/import\("([^"]+)"\)/g)].map((m) => [m[1], true] as [string, boolean]),
        ];
        for (const [spec, isLazy] of edges) {
          if (spec.startsWith('.')) { queue.push([join(dirname(file), spec), isLazy]); continue; }
          const pkg = spec.split('/').slice(0, spec.startsWith('@') ? 2 : 1).join('/');
          if (!SPECIFIER.test(pkg) || ALWAYS.has(pkg) || ALWAYS.has(spec)) continue;
          (isLazy ? dyn : stat).add(pkg);
        }
      }
      // A package reachable statically is statically required, full stop.
      return { static: [...stat].sort(), dynamic: [...dyn].filter((p) => !stat.has(p)).sort() };
    }

    const TIPTAP = [
      // `@tiptap/core` joined this list when `TiptapEditor` began registering
      // `CanvasLineSpacing`, which is an `Extension.create` and so imports the
      // base class from core. It is a DELIBERATE growth and a nominal one: core
      // is not an extra install for anyone, because every other name below
      // already depends on it (`@tiptap/react`, `@tiptap/starter-kit` and the
      // extensions all list it as a hard dependency), so no import path gained
      // a package it did not already have on disk.
      '@tiptap/core',
      '@tiptap/extension-collaboration', '@tiptap/extension-placeholder',
      '@tiptap/extension-task-item', '@tiptap/extension-task-list',
      '@tiptap/react', '@tiptap/starter-kit', '@tiptap/y-tiptap',
    ];

    // The documented truth. Shrinking a `static` list is always good — update
    // it. GROWING one means a common import path now needs another package
    // installed to import at all, so make that a deliberate decision.
    const EXPECTED: Record<string, { static: string[]; dynamic: string[] }> = {
      types: { static: [], dynamic: [] },
      video: { static: [], dynamic: [] },
      identity: { static: [], dynamic: [] },
      // The whole point of this subpath: the SDK is lazy, so importing it costs
      // nothing until a hangout actually starts.
      'video-ivs': { static: [], dynamic: ['amazon-ivs-web-broadcast'] },
      // xterm is DYNAMIC here, and it has to stay that way. `ChatLabShell`
      // (the chat column borrowed by an agent loop) offers a Terminal tab into
      // the loop's box, and that tab is `React.lazy`-imported precisely so
      // importing `ChatPanel` does not require two optional peers on disk. If
      // this ever moves to `static`, the lazy boundary in ChatLabShell.tsx has
      // been lost and every chat consumer now needs xterm installed.
      social: { static: ['cmdk'], dynamic: ['@xterm/addon-fit', '@xterm/xterm'] },
      // WorkGraph is the React Flow-backed graph composition.
      //
      // xterm is DYNAMIC here for the same reason it is on `social`, and must
      // stay that way. `WorkComputePane` — the detail pane for a node that is a
      // cloud compute session — offers a Shell tab into the session's box, and
      // reaches `ChatLabTerminal` through `React.lazy` precisely so importing
      // `WorkGraph` does not require two optional peers on disk. If this ever
      // moves to `static`, that lazy boundary has been lost and every Active
      // Now consumer now needs xterm installed to import the graph at all.
      graph: { static: ['@xyflow/react'], dynamic: ['@xterm/addon-fit', '@xterm/xterm'] },
      agents: { static: ['@xyflow/react'], dynamic: [] },
      // react-markdown + remark-gfm power MarkdownView (real `dependencies`,
      // same footing as cmdk — npm installs them for the consumer).
      shared: { static: ['cmdk', 'react-markdown', 'recharts', 'remark-gfm'], dynamic: [] },
      observability: { static: ['react-router', 'recharts'], dynamic: [] },
      ingest: { static: ['react-router', 'recharts'], dynamic: [] },
      hooks: { static: ['amazon-cognito-identity-js', 'react-router', 'yjs'], dynamic: [] },
      pipelines: { static: ['@xyflow/react', 'react-router', 'recharts'], dynamic: [] },
      // `@dnd-kit/core` and `@dnd-kit/sortable` are DYNAMIC here: `SlideList.tsx`
      // reaches `SortableSlideList.tsx` through `React.lazy` precisely so that
      // importing the presentation editor does not require `@dnd-kit` on disk
      // for a consumer who never drags a slide. See SlideList.tsx's own note.
      //
      // `@tiptap/extension-mention`, `@tiptap/pm` and `cmdk` are DYNAMIC for the
      // same reason (2.361.0): the editor's agent box is the chat's
      // `RichChatComposer`, reached through `React.lazy` in
      // `PresentationEditor.tsx` (see `PresentationAgentComposer.tsx`), so a
      // host that never passes `onInstruct` never loads the mention stack.
      'doc-editor': {
        static: [...TIPTAP, 'yjs'].sort(),
        dynamic: ['@dnd-kit/core', '@dnd-kit/sortable', '@tiptap/extension-mention', '@tiptap/pm', 'amazon-ivs-web-broadcast', 'cmdk'],
      },
      // The root barrel re-exports nearly everything, so it needs nearly
      // everything. That is expected — subpaths are how a consumer opts out.
      // The tiptap peers are STATIC here, and that is a real cost: importing
      // `Button` from the root barrel needs seven tiptap packages on disk,
      // because `src/index.ts` re-exports `./renderers` and
      // `DefaultRenderer.tsx` imports `TiptapEditor` at module scope. The
      // chain is index.js -> renderers-*.js -> TiptapEditor-*.js.
      //
      // This entry briefly claimed the opposite. In 2.187.0 it was changed to
      // list them as dynamic, with a comment congratulating the move — but the
      // walker had been run against a dist built one release earlier, so the
      // "improvement" was a reading of a stale artifact and no such change ever
      // happened. Verified afterwards by walking BOTH the 2.187.0 and 2.188.0
      // dists from `git archive`: identical static path in each.
      //
      // The honest fix, if anyone wants it, is to stop re-exporting the
      // renderers from the root barrel or to make DefaultRenderer's editor a
      // dynamic import. Until then this pins the truth.
      index: {
        static: [
          ...TIPTAP,
          '@xyflow/react', 'amazon-cognito-identity-js', 'cmdk', 'react-markdown', 'react-router', 'recharts', 'remark-gfm', 'yjs',
        ].sort(),
        // The IVS SDK and xterm entries are lazy tabs: see the `social` note
        // above. `@dnd-kit/core` and `@dnd-kit/sortable` are lazy the same
        // way, via `SlideList.tsx` — see the `doc-editor` note above.
        // The mention stack is lazy via the presentation editor's agent box.
        dynamic: ['@dnd-kit/core', '@dnd-kit/sortable', '@tiptap/extension-mention', '@tiptap/pm', '@xterm/addon-fit', '@xterm/xterm', 'amazon-ivs-web-broadcast'],
      },
    };

    const actual: Record<string, { static: string[]; dynamic: string[] }> = {};
    for (const entry of Object.keys(EXPECTED)) {
      actual[entry] = peersOf(join(ROOT, `${entry}.js`));
    }
    expect(actual).toEqual(EXPECTED);
  });
});
