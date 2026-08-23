import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  // vite-plugin-dts is deliberately pinned to v4. v5 (a wrapper over
  // unplugin-dts) renames `rollupTypes` -> `bundleTypes` and silently ignores
  // the old key, and even with the rename it appends every ambient
  // `declare module` / `declare global` block from src/declarations.d.ts to
  // EVERY rolled-up entry -- shipping a `declare module 'reactflow'`
  // augmentation and an unresolvable `DevEditorBridge` reference to consumers.
  // v4 works fine on vite 8 (rolldown) and emits byte-identical .d.ts.
  plugins: [react(), tailwindcss(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@schemas': resolve(__dirname, 'schemas'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        pipelines: resolve(__dirname, 'src/components/pipelines/index.ts'),
        ingest: resolve(__dirname, 'src/components/ingest/index.ts'),
        observability: resolve(__dirname, 'src/components/observability/index.ts'),
        'doc-editor': resolve(__dirname, 'src/components/doc-editor/index.ts'),
        social: resolve(__dirname, 'src/components/social/index.ts'),
        hooks: resolve(__dirname, 'src/hooks/index.ts'),
        types: resolve(__dirname, 'src/types/index.ts'),
        shared: resolve(__dirname, 'src/components/shared/index.ts'),
        identity: resolve(__dirname, 'src/components/identity/index.ts'),
        agents: resolve(__dirname, 'src/components/agents/index.ts'),
        video: resolve(__dirname, 'src/video.ts'),
        'video-ivs': resolve(__dirname, 'src/video-ivs.ts'),
        'integrations/realtime-modules': resolve(__dirname, 'src/integrations/realtime-modules/index.ts'),
      },
      formats: ['es', 'cjs'],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        'react', 'react-dom', 'react/jsx-runtime', 'react-router',
        // All three runtime `dependencies` are externalised: npm installs
        // them for the consumer, so bundling them here only duplicates code.
        // cmdk was missed until v2.73.0 — it landed in a shared chunk that
        // EVERY entry pulled, so importing `Chip` dragged in 64KB of
        // command-palette fuzzy-matching.
        'clsx', 'tailwind-merge', 'cmdk',
        // ajv does runtime schema validation of persisted pipelines. It was
        // an UNDECLARED direct import until v2.73.3 — only resolvable because
        // vite-plugin-dts 4 happened to pull it in transitively, and it got
        // silently inlined into dist/pipelines.js. Declared + externalised now.
        'ajv',
        'yjs', 'y-prosemirror', 'y-protocols',
        '@xyflow/react', 'reactflow', '@tiptap/react', '@tiptap/starter-kit',
        '@tiptap/extension-collaboration',
        '@tiptap/extension-mention', '@tiptap/extension-placeholder',
        '@tiptap/extension-task-item', '@tiptap/extension-task-list',
        '@tiptap/pm', '@tiptap/y-tiptap',
        'recharts',
        '@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities',
        'lib0',
        'amazon-cognito-identity-js',
        'amazon-ivs-web-broadcast',
        // hls.js is dynamic-imported by RecordingPlayer; the consumer
        // app installs it. Externalized to keep this lib bundle lean.
        'hls.js',
        // realtime-modules is a peer dep. The hangout-rooms composites
        // import its hooks at runtime; keeping the package external
        // avoids bundling its CJS dist (which Rollup can't tree-shake)
        // and lets the consumer app's resolution win at runtime.
        /^@connorhoehn\/realtime-modules(\/.*)?$/,
      ],
    },
  },
});
