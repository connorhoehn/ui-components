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

const realtimeModulesAliases = {
  '@connorhoehn/realtime-modules/client/video': rmSrc('client/video/index.ts'),
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
        },
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
