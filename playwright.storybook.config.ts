import { defineConfig } from '@playwright/test';

// Layout checks measured against Storybook stories (not the demo app, which
// `playwright.config.ts` serves). `npm run test:e2e:storybook`.
const port = Number(process.env.STORYBOOK_PORT ?? 6006);

export default defineConfig({
  testDir: './tests/storybook',
  timeout: 60000,
  retries: 0,
  use: {
    baseURL: `http://localhost:${port}`,
    headless: true,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npx storybook dev -p ${port} --ci --no-open`,
    port,
    timeout: 180000,
    reuseExistingServer: true,
  },
});
