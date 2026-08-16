import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: __dirname,
  resolve: {
    alias: {
      '@connorhoehnslalom/ui-components/identity': resolve(__dirname, '../src/components/identity/index.ts'),
      '@connorhoehnslalom/ui-components/pipelines': resolve(__dirname, '../src/components/pipelines/index.ts'),
      '@connorhoehnslalom/ui-components/ingest': resolve(__dirname, '../src/components/ingest/index.ts'),
      '@connorhoehnslalom/ui-components/observability': resolve(__dirname, '../src/components/observability/index.ts'),
      '@connorhoehnslalom/ui-components/doc-editor': resolve(__dirname, '../src/components/doc-editor/index.ts'),
      '@connorhoehnslalom/ui-components/social': resolve(__dirname, '../src/components/social/index.ts'),
      '@connorhoehnslalom/ui-components/hooks': resolve(__dirname, '../src/hooks/index.ts'),
      '@connorhoehnslalom/ui-components/types': resolve(__dirname, '../src/types/index.ts'),
      '@connorhoehnslalom/ui-components/shared': resolve(__dirname, '../src/components/shared/index.ts'),
      '@connorhoehnslalom/ui-components/layout': resolve(__dirname, '../src/components/layout/index.ts'),
      '@connorhoehnslalom/ui-components/video': resolve(__dirname, '../src/video.ts'),
      '@connorhoehnslalom/ui-components/integrations/realtime-modules': resolve(__dirname, '../src/integrations/realtime-modules/index.ts'),
      '@connorhoehnslalom/ui-components': resolve(__dirname, '../src'),
      // realtime-modules: alias subpaths to TS source so Vite/Rollup can process ESM.
      // The dist/ is CJS-only; pointing at src/ avoids the "not exported" Rollup error.
      '@connorhoehn/realtime-modules/client': resolve(__dirname, '../node_modules/@connorhoehn/realtime-modules/src/client/index.ts'),
      '@connorhoehn/realtime-modules': resolve(__dirname, '../node_modules/@connorhoehn/realtime-modules/src/index.ts'),
      '@': resolve(__dirname, '../src'),
      '@schemas': resolve(__dirname, '../schemas'),
    },
  },
  server: {
    port: 5174,
  },
});
