import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

// Bound worker concurrency. Each jsdom worker allocates a heavy DOM heap;
// the default fork pool (numCpus) can OOM the dev box. Override with
// VITEST_MAX_WORKERS=N for CI machines with dedicated RAM.
const maxWorkers = process.env.VITEST_MAX_WORKERS ?? '25%';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
      '@schemas': resolve(import.meta.dirname, 'schemas'),
      // hls.js is an optional peer dep (consumer apps install it). Vitest's
      // import-analysis tries to resolve dynamic-import targets even with
      // `/* @vite-ignore */`, so point it at a stub for tests.
      'hls.js': resolve(import.meta.dirname, 'src/test-stubs/hls.js-stub.ts'),
      // Same story for the @xterm/* peers, which `ShellTerminal` imports
      // statically and `HerdMode` pulls in transitively — without these
      // aliases every compute render test fails at module resolution rather
      // than on anything it meant to assert.
      // ORDER MATTERS: vite alias keys match as prefixes, so the stylesheet
      // entry has to come before the package entry or '@xterm/xterm' rewrites
      // it to '<stub>.ts/css/xterm.css' and resolution fails.
      '@xterm/xterm/css/xterm.css': resolve(import.meta.dirname, 'src/test-stubs/empty.css'),
      '@xterm/xterm': resolve(import.meta.dirname, 'src/test-stubs/xterm-stub.ts'),
      '@xterm/addon-fit': resolve(import.meta.dirname, 'src/test-stubs/xterm-stub.ts'),
      // The realtime-modules /client/hangout-rooms subpath has not been
      // shipped yet (see CLAUDE.md "Known issues"). The HangoutRoomRow /
      // HangoutRoomsSection / WrappedHangoutRoomsList integration code
      // imports `useRoomOccupancy` + `RoomsIndexSubscriber` from there;
      // this alias points vitest at a structural stub so the test suite
      // can exercise the integration wrappers without the real package.
      '@connorhoehn/realtime-modules/client/hangout-rooms': resolve(
        import.meta.dirname,
        'tests/stubs/realtime-modules-hangout-rooms.ts',
      ),
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
