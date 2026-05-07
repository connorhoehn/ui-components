import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5174',
    headless: true,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run demo',
    port: 5174,
    timeout: 30000,
    reuseExistingServer: true,
  },
});
