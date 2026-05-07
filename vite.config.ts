import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ rollupTypes: true })],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
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
        '@schemas/pipeline.schema.json',
      ],
    },
  },
});
