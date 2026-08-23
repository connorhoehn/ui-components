import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: import.meta.dirname,
  resolve: {
    alias: {
      '@connorhoehnslalom/ui-components/identity': resolve(import.meta.dirname, '../src/components/identity/index.ts'),
      '@connorhoehnslalom/ui-components/pipelines': resolve(import.meta.dirname, '../src/components/pipelines/index.ts'),
      '@connorhoehnslalom/ui-components/ingest': resolve(import.meta.dirname, '../src/components/ingest/index.ts'),
      '@connorhoehnslalom/ui-components/observability': resolve(import.meta.dirname, '../src/components/observability/index.ts'),
      '@connorhoehnslalom/ui-components/doc-editor': resolve(import.meta.dirname, '../src/components/doc-editor/index.ts'),
      '@connorhoehnslalom/ui-components/social': resolve(import.meta.dirname, '../src/components/social/index.ts'),
      '@connorhoehnslalom/ui-components/hooks': resolve(import.meta.dirname, '../src/hooks/index.ts'),
      '@connorhoehnslalom/ui-components/types': resolve(import.meta.dirname, '../src/types/index.ts'),
      '@connorhoehnslalom/ui-components/shared': resolve(import.meta.dirname, '../src/components/shared/index.ts'),
      '@connorhoehnslalom/ui-components/layout': resolve(import.meta.dirname, '../src/components/layout/index.ts'),
      '@connorhoehnslalom/ui-components/video': resolve(import.meta.dirname, '../src/video.ts'),
      '@connorhoehnslalom/ui-components/integrations/realtime-modules': resolve(import.meta.dirname, '../src/integrations/realtime-modules/index.ts'),
      '@connorhoehnslalom/ui-components': resolve(import.meta.dirname, '../src'),
      // realtime-modules: alias subpaths to TS source so Vite/Rollup can process ESM.
      // The dist/ is CJS-only; pointing at src/ avoids the "not exported" Rollup error.
      // Deeper subpaths must precede the '/client' entry — Vite matches string
      // aliases by prefix, so '/client' would otherwise swallow them and
      // resolve to '…/src/client/index.ts/video'.
      '@connorhoehn/realtime-modules/client/video': resolve(import.meta.dirname, '../node_modules/@connorhoehn/realtime-modules/src/client/video/index.ts'),
      '@connorhoehn/realtime-modules/client/hangout-rooms': resolve(import.meta.dirname, '../node_modules/@connorhoehn/realtime-modules/src/client/hangout-rooms/index.ts'),
      '@connorhoehn/realtime-modules/client': resolve(import.meta.dirname, '../node_modules/@connorhoehn/realtime-modules/src/client/index.ts'),
      '@connorhoehn/realtime-modules': resolve(import.meta.dirname, '../node_modules/@connorhoehn/realtime-modules/src/index.ts'),
      '@': resolve(import.meta.dirname, '../src'),
      '@schemas': resolve(import.meta.dirname, '../schemas'),
    },
  },
  server: {
    port: 5174,
  },
});
