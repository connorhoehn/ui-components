import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: '.', testMatch: 'message-hover.spec.ts', timeout: 30_000, workers: 1, use: { baseURL: process.env.UI_MESSAGE_PREVIEW_ORIGIN ?? 'http://127.0.0.1:5267', headless: true } });
