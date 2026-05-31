import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

// Bound worker concurrency. Each jsdom worker allocates a heavy DOM heap;
// the default fork pool (numCpus) can OOM the dev box. Override with
// VITEST_MAX_WORKERS=N for CI machines with dedicated RAM.
const maxWorkers = process.env.VITEST_MAX_WORKERS ?? '25%';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@schemas': resolve(__dirname, 'schemas'),
      // hls.js is an optional peer dep (consumer apps install it). Vitest's
      // import-analysis tries to resolve dynamic-import targets even with
      // `/* @vite-ignore */`, so point it at a stub for tests.
      'hls.js': resolve(__dirname, 'src/test-stubs/hls.js-stub.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
    exclude: ['tests/e2e/**', 'node_modules/**', '.claude/worktrees/**'],
    maxWorkers,
    minWorkers: 1,
  },
});
