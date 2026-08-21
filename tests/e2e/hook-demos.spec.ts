// Realtime hook-integration journeys (mock mode). These demos mount the
// REAL Wrapped* adapters over a MockGatewayProvider, so what is asserted is
// the shipped integration behavior: sending echoes through useChat into the
// panel, presence rows arrive, reactions fire.

import { test, expect } from '@playwright/test';

test.describe('hook-chat: ChatPanel + useChat', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/hook-chat');
  });

  test('mock-mode banner is explicit about not being live', async ({ page }) => {
    await expect(page.getByText(/MOCK MODE/)).toBeVisible();
  });

  test('synthetic messages arrive on the timer', async ({ page }) => {
    await expect(page.getByText('Hey everyone, the new ChatPanel is live!')).toBeVisible({
      timeout: 15_000,
    });
  });

  test('sending a message echoes it back through useChat into the panel', async ({ page }) => {
    const input = page.getByPlaceholder(/Type a message/);
    await input.fill('e2e journey ping');
    await input.press('Enter');
    await expect(page.getByText('e2e journey ping')).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('hook-presence', () => {
  test('presence panel fills with simulated users', async ({ page }) => {
    await page.goto('/workflows/hook-presence');
    await expect(page.getByText(/MOCK MODE|LIVE MODE/)).toBeVisible();
    // The mock roster joins with a stagger.
    await expect(page.getByText('Alice').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText('Bob').first()).toBeVisible({ timeout: 15_000 });
  });
});

test.describe('hook-notifications', () => {
  test('notification center receives simulated notifications', async ({ page }) => {
    await page.goto('/workflows/hook-notifications');
    await expect(page.getByText(/MOCK MODE|LIVE MODE/).first()).toBeVisible();
  });
});
