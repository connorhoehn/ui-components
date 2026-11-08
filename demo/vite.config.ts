import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
// Walk up to find the peer dep's source: a git worktree has no node_modules
// of its own, so '<configdir>/../node_modules' does not exist there.
import { rmSrc as rmSrcFrom } from '../scripts/resolve-realtime-modules.mjs';

const rmSrc = rmSrcFrom(import.meta.dirname);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: import.meta.dirname,
  resolve: {
    alias: {
      '@connorhoehn/ui-components/identity': resolve(import.meta.dirname, '../src/components/identity/index.ts'),
      '@connorhoehn/ui-components/pipelines': resolve(import.meta.dirname, '../src/components/pipelines/index.ts'),
      '@connorhoehn/ui-components/ingest': resolve(import.meta.dirname, '../src/components/ingest/index.ts'),
      '@connorhoehn/ui-components/observability': resolve(import.meta.dirname, '../src/components/observability/index.ts'),
      '@connorhoehn/ui-components/doc-editor': resolve(import.meta.dirname, '../src/components/doc-editor/index.ts'),
      '@connorhoehn/ui-components/social': resolve(import.meta.dirname, '../src/components/social/index.ts'),
      '@connorhoehn/ui-components/hooks': resolve(import.meta.dirname, '../src/hooks/index.ts'),
      '@connorhoehn/ui-components/types': resolve(import.meta.dirname, '../src/types/index.ts'),
      '@connorhoehn/ui-components/shared': resolve(import.meta.dirname, '../src/components/shared/index.ts'),
      '@connorhoehn/ui-components/layout': resolve(import.meta.dirname, '../src/components/layout/index.ts'),
      '@connorhoehn/ui-components/video': resolve(import.meta.dirname, '../src/video.ts'),
      '@connorhoehn/ui-components/integrations/realtime-modules': resolve(import.meta.dirname, '../src/integrations/realtime-modules/index.ts'),
      '@connorhoehn/ui-components': resolve(import.meta.dirname, '../src'),
      // realtime-modules: alias subpaths to TS source so Vite/Rollup can process ESM.
      // The dist/ is CJS-only; pointing at src/ avoids the "not exported" Rollup error.
      // Deeper subpaths must precede the '/client' entry — Vite matches string
      // aliases by prefix, so '/client' would otherwise swallow them and
      // resolve to '…/src/client/index.ts/video'.
      '@connorhoehn/realtime-modules/client/video': rmSrc('client/video/index.ts'),
      '@connorhoehn/realtime-modules/client/hangout-rooms': rmSrc('client/hangout-rooms/index.ts'),
      '@connorhoehn/realtime-modules/client': rmSrc('client/index.ts'),
      '@connorhoehn/realtime-modules': rmSrc('index.ts'),
      '@': resolve(import.meta.dirname, '../src'),
      '@schemas': resolve(import.meta.dirname, '../schemas'),
    },
  },
  server: {
    port: 5174,
  },
});
