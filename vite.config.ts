import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
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
        'clsx', 'tailwind-merge',
        'yjs', 'y-prosemirror', 'y-protocols',
        '@xyflow/react', 'reactflow', '@tiptap/react', '@tiptap/starter-kit',
        '@tiptap/extension-collaboration', '@tiptap/extension-collaboration-cursor',
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
