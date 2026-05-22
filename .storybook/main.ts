import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';

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
