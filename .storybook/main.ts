import { createRequire } from 'node:module';
import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';
import { rmSrc as rmSrcFrom } from '../scripts/resolve-realtime-modules.mjs';

// realtime-modules ships a CJS dist, so Rollup can't see its named exports
// ("useRoomOccupancy is not exported by .../dist/client/hangout-rooms").
// The lib build dodges this by marking the package external, but viteFinal
// below clears `external` (a browser bundle must inline it), so point the
// subpaths at the TS source instead — the same workaround demo/vite.config.ts
// uses. Deeper subpaths first: Vite matches string aliases by prefix.
// Resolved by walking up from THIS file, not from process.cwd(): a git
// worktree has no node_modules of its own, and cwd-relative resolution
// produced an opaque UNLOADABLE_DEPENDENCY there. See the helper for detail.
const rmSrc = rmSrcFrom(import.meta.dirname);
// distributed-core 0.48's ESM entry imports a Node createRequire banner.
// Its browser-safe document CJS entry is prebundled by Vite instead.
const runtimeRequire = createRequire(rmSrc('../package.json'));
const documentEntry = runtimeRequire.resolve('distributed-core/applications/document');

// Every subpath a story imports must be listed. These are PREFIX aliases, so
// an unlisted subpath does not fall back to node resolution — it matches the
// bare entry and becomes `<rmSrc>/index.ts/adapters/tiptap`, which fails as an
// unresolved import rather than as a missing alias. Add the entry when you add
// the import.
const realtimeModulesAliases = {
  '@connorhoehn/realtime-modules/adapters/tiptap': rmSrc('adapters/tiptap/index.ts'),
  '@connorhoehn/realtime-modules/client/video': rmSrc('client/video/index.ts'),
  // Video/MeetingRehearsal (2.468.0) runs the real useMeeting over a loopback.
  '@connorhoehn/realtime-modules/client/meeting': rmSrc('client/meeting/index.ts'),
  '@connorhoehn/realtime-modules/meeting': rmSrc('meeting/index.ts'),
  '@connorhoehn/realtime-modules/client/hangout-rooms': rmSrc(
    'client/hangout-rooms/index.ts',
  ),
  '@connorhoehn/realtime-modules/client': rmSrc('client/index.ts'),
  '@connorhoehn/realtime-modules': rmSrc('index.ts'),
};

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  async viteFinal(config: InlineConfig) {
    // Strip vite-plugin-dts — it runs tsc/api-extractor which breaks
    // Storybook's compilation. Plugins array can be nested (PluginOption[]).
    function filterPlugins(plugins: unknown[]): unknown[] {
      return plugins
        .filter((p) => {
          if (!p) return false;
          if (Array.isArray(p)) return true; // recurse
          const plug = p as { name?: string };
          return plug.name !== 'vite-plugin-dts' && plug.name !== 'vite:dts';
        })
        .map((p) => (Array.isArray(p) ? filterPlugins(p) : p));
    }

    return {
      ...config,
      plugins: filterPlugins((config.plugins ?? []) as unknown[]) as InlineConfig['plugins'],
      resolve: {
        ...config.resolve,
        alias: {
          ...((config.resolve?.alias as Record<string, string>) ?? {}),
          ...realtimeModulesAliases,
          'distributed-core/applications/document': documentEntry,
        },
        // The aliases above point at realtime-modules' TS SOURCE, which lives
        // in a sibling checkout with its own node_modules. Without deduping,
        // its imports resolve a SECOND copy of React (and of the Tiptap/Yjs
        // singletons), and the second copy has a null hook dispatcher — the
        // story dies with "Cannot read properties of null (reading 'useRef')"
        // inside @tiptap/react, which reads like a Tiptap bug and is not one.
        //
        // Yjs and prosemirror-model matter for the same reason in a different
        // way: two copies break `instanceof` across the boundary, which is the
        // failure the app's optimizeDeps.exclude entries already guard against.
        dedupe: [
          ...((config.resolve?.dedupe as string[]) ?? []),
          'react',
          'react-dom',
          'yjs',
          'y-protocols',
          '@tiptap/react',
          '@tiptap/core',
          '@tiptap/pm',
        ],
      },
      build: {
        ...config.build,
        lib: undefined,
        rollupOptions: {
          ...(config.build?.rollupOptions ?? {}),
          external: [],
        },
      },
    };
  },
};

export default config;
