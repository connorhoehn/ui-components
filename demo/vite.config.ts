import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: __dirname,
  resolve: {
    alias: {
      '@connorhoehn/ui-components/identity': resolve(__dirname, '../src/components/identity/index.ts'),
      '@connorhoehn/ui-components/pipelines': resolve(__dirname, '../src/components/pipelines/index.ts'),
      '@connorhoehn/ui-components/ingest': resolve(__dirname, '../src/components/ingest/index.ts'),
      '@connorhoehn/ui-components/observability': resolve(__dirname, '../src/components/observability/index.ts'),
      '@connorhoehn/ui-components/doc-editor': resolve(__dirname, '../src/components/doc-editor/index.ts'),
      '@connorhoehn/ui-components/social': resolve(__dirname, '../src/components/social/index.ts'),
      '@connorhoehn/ui-components/hooks': resolve(__dirname, '../src/hooks/index.ts'),
      '@connorhoehn/ui-components/types': resolve(__dirname, '../src/types/index.ts'),
      '@connorhoehn/ui-components/shared': resolve(__dirname, '../src/components/shared/index.ts'),
      '@connorhoehn/ui-components': resolve(__dirname, '../src'),
      '@': resolve(__dirname, '../src'),
    },
  },
  server: {
    port: 5174,
  },
});
