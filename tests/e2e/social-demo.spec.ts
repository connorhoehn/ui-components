import { test, expect } from '@playwright/test';

test.describe('Social Panel Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/social');
  });

  test('room list is visible with channels', async ({ page }) => {
    await expect(page.getByText('Channels')).toBeVisible();
    // Room items show as "#general", "#feed", "#random" in the room list
    await expect(page.getByText('#general')).toBeVisible();
    await expect(page.getByText('#feed')).toBeVisible();
    await expect(page.getByText('#random')).toBeVisible();
  });

  test('simulation starts and chat messages appear', async ({ page }) => {
    // First message is from Alice with specific text
    await expect(page.getByText('Has anyone looked at the new pipeline config?')).toBeVisible({ timeout: 15000 });
  });

  test('typing indicator appears during simulation', async ({ page }) => {
    // Typing indicator shows "Bob is typing..." - use first() to avoid strict mode
    const typingIndicator = page.getByText(/is typing\.\.\./).first();
    await expect(typingIndicator).toBeVisible({ timeout: 15000 });
  });

  test('multiple messages accumulate over time', async ({ page }) => {
    // Wait for Bob's message which comes after the typing indicator
    await expect(page.getByText('The new transform step is way faster')).toBeVisible({ timeout: 15000 });
    // At this point we should have at least Alice's and Bob's messages
    await expect(page.getByText('Has anyone looked at the new pipeline config?')).toBeVisible();
  });
});
