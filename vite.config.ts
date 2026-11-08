import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  // vite-plugin-dts v5 (unplugin-dts) renamed `rollupTypes` -> `bundleTypes`.
  // The old key is silently ignored and emits per-file `dist/src/**/*.d.ts`
  // instead of the self-contained rollup -- keep this as `bundleTypes`. v5
  // also copies every ambient `declare global` / `declare module` block into
  // EVERY bundled entry, so nothing ambient in src may name a module-local
  // type (see useDevEditorBridge.ts).
  //
  // `typescriptCompilerFolder: undefined`: unplugin-dts points api-extractor
  // at the `typescript` package for its lib.*.d.ts files, and TypeScript 7
  // ships none (the Go compiler embeds them), so every rollup failed with
  // "Symbol not found for identifier: Omit". Unset, api-extractor analyses
  // with the TypeScript it bundles — exactly what v4 did.
  plugins: [
    react(),
    tailwindcss(),
    dts({ bundleTypes: { invokeOptions: { typescriptCompilerFolder: undefined } } }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
      '@schemas': resolve(import.meta.dirname, 'schemas'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        pipelines: resolve(import.meta.dirname, 'src/components/pipelines/index.ts'),
        ingest: resolve(import.meta.dirname, 'src/components/ingest/index.ts'),
        observability: resolve(import.meta.dirname, 'src/components/observability/index.ts'),
        'doc-editor': resolve(import.meta.dirname, 'src/components/doc-editor/index.ts'),
        'doc-types': resolve(import.meta.dirname, 'src/components/doc-types/index.ts'),
        diagram: resolve(import.meta.dirname, 'src/components/diagram/index.ts'),
        social: resolve(import.meta.dirname, 'src/components/social/index.ts'),
        graph: resolve(import.meta.dirname, 'src/components/graph/index.ts'),
        // Separate entry so the tiptap optional peers stay OUT of the plain
        // `social` bundle — see src/components/social/rich-composer.ts.
        'social/rich-composer': resolve(import.meta.dirname, 'src/components/social/rich-composer.ts'),
        hooks: resolve(import.meta.dirname, 'src/hooks/index.ts'),
        types: resolve(import.meta.dirname, 'src/types/index.ts'),
        shared: resolve(import.meta.dirname, 'src/components/shared/index.ts'),
        identity: resolve(import.meta.dirname, 'src/components/identity/index.ts'),
        agents: resolve(import.meta.dirname, 'src/components/agents/index.ts'),
        compute: resolve(import.meta.dirname, 'src/components/compute/index.ts'),
        voice: resolve(import.meta.dirname, 'src/components/voice/index.ts'),
        video: resolve(import.meta.dirname, 'src/video.ts'),
        'video-ivs': resolve(import.meta.dirname, 'src/video-ivs.ts'),
        // Scope-agnostic twin of the entry below: no runtime import of
        // @connorhoehn/realtime-modules (hooks are injected), so it loads under
        // any install scope. Guarded by src/integrations/realtime/__tests__/scopeAgnosticPackaging.test.ts.
        'integrations/realtime': resolve(import.meta.dirname, 'src/integrations/realtime/index.ts'),
        'integrations/realtime-modules': resolve(import.meta.dirname, 'src/integrations/realtime-modules/index.ts'),
      },
      formats: ['es', 'cjs'],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        // `react-dom/client` is listed for the same reason `react/jsx-runtime`
        // is: a subpath is not covered by its package. Without it, `createRoot`
        // in the diagram node view dragged all of react-dom AND scheduler into
        // dist/diagram.js — a second React renderer beside the app's.
        'react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'react-router',
        // All three runtime `dependencies` are externalised: npm installs
        // them for the consumer, so bundling them here only duplicates code.
        // cmdk was missed until v2.73.0 — it landed in a shared chunk that
        // EVERY entry pulled, so importing `Chip` dragged in 64KB of
        // command-palette fuzzy-matching.
        'clsx', 'tailwind-merge', 'cmdk',
        // MarkdownView's renderer + its GFM (tables, strikethrough, task
        // lists) plugin. Same rationale as clsx/tailwind-merge/cmdk above:
        // real `dependencies`, so npm installs them for the consumer, and
        // bundling them here would only duplicate code.
        'react-markdown', 'remark-gfm',
        // ajv does runtime schema validation of persisted pipelines. It was
        // an UNDECLARED direct import until v2.73.3 — only resolvable because
        // vite-plugin-dts 4 happened to pull it in transitively, and it got
        // silently inlined into dist/pipelines.js. Declared + externalised now.
        'ajv',
        // The org graph's and RecordGraph's force layout (2.400.0). A real
        // `dependency`, externalised for the same reason as the ones above.
        'd3-force',
        'yjs', 'y-prosemirror', 'y-protocols',
        // xterm paints to a canvas and owns global listeners; two copies in
        // one page fight over both. Peer + external, never bundled.
        '@xterm/xterm', '@xterm/addon-fit', '@xterm/xterm/css/xterm.css',
        '@xyflow/react', 'reactflow', '@tiptap/react', '@tiptap/starter-kit',
        '@tiptap/extension-collaboration',
        '@tiptap/extension-mention', '@tiptap/extension-placeholder',
        '@tiptap/extension-task-item', '@tiptap/extension-task-list',
        // `@tiptap/core` joined the list in v2.120.0, when `./diagram` started
        // SHIPPING a Tiptap extension (`DiagramMacro`) rather than only
        // rendering into one. Bundled, it would be a second copy of the
        // extension manager beside the app's — and the consuming app's vite
        // config keeps @tiptap/core deliberately pre-bundled exactly once.
        '@tiptap/core',
        // SUBPATHS MUST BE LISTED. Rollup matches an external string against
        // the unresolved id and does NOT treat `foo/bar` as covered by `foo` —
        // which is why `react/jsx-runtime` has its own entry above and is not a
        // redundant one. The first build of `DiagramMacro` proved the cost:
        // `@tiptap/pm/state` fell through this list and rolldown inlined
        // prosemirror-model, -transform and -state into `dist/diagram.js`
        // (3.5KB → 770KB), which is a SECOND ProseMirror in the consuming app —
        // the exact `Adding different instances of a keyed plugin` /
        // `localsInner` class of failure the app's optimizeDeps.exclude list
        // exists to prevent.
        '@tiptap/pm',
        '@tiptap/pm/state', '@tiptap/pm/view', '@tiptap/pm/model',
        '@tiptap/pm/transform', '@tiptap/pm/keymap', '@tiptap/pm/commands',
        '@tiptap/y-tiptap',
        'recharts',
        // Optional peers since 2.187.0. They were externalised but only
        // devDependencies, which was harmless while nothing imported them from
        // dist — `doc-types` was not a build entry until 2.184.0, so
        // DocumentTypeWizard's drag-and-drop never shipped. The moment it did,
        // a consumer importing `./doc-types` got ERR_MODULE_NOT_FOUND for
        // three packages npm had never been told to install. Optional, not
        // required: only the doc-types entry needs them.
        '@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities',
        'lib0',
        'amazon-cognito-identity-js',
        'amazon-ivs-web-broadcast',
        // hls.js is dynamic-imported by RecordingPlayer; the consumer
        // app installs it. Externalized to keep this lib bundle lean.
        'hls.js',
        // Excalidraw is ~1.9MB and an OPTIONAL peer. It is imported by exactly
        // one module (ExcalidrawCanvas), which sits behind a React.lazy
        // boundary, so an app that never renders a diagram never fetches it.
        // Its stylesheet is externalized alongside for the same reason —
        // cssCodeSplit is false here, so bundling it would weld ~100KB of
        // editor CSS into the always-loaded ui-components.css.
        '@excalidraw/excalidraw', '@excalidraw/excalidraw/index.css',
        // realtime-modules is a peer dep. The hangout-rooms composites
        // import its hooks at runtime; keeping the package external
        // avoids bundling its CJS dist (which Rollup can't tree-shake)
        // and lets the consumer app's resolution win at runtime.
        /^@connorhoehn\/realtime-modules(\/.*)?$/,
      ],
    },
  },
});
