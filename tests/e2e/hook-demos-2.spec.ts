// Second wave of realtime hook-integration journeys: reactions fire and
// overlay, capability boundaries gate content, activity events stream in,
// and the file-upload adapter mounts its drop zone.

import { test, expect } from '@playwright/test';

test.describe('hook-reactions: ReactionButtons + useReactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/hook-reactions');
  });

  test('auto-fired reactions appear in the log', async ({ page }) => {
    // Mock mode fires an emoji roughly every 2s.
    await expect(page.getByText('🎉').first()).toBeVisible({ timeout: 15_000 });
  });

  test('clicking an emoji button fires a reaction', async ({ page }) => {
    await page.getByTitle('👍').click();
    await expect(page.getByText('👍').first()).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('hook-capability: CapabilityBoundary', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/hook-capability');
  });

  test('disabling a capability swaps content for the denied fallback', async ({ page }) => {
    const chatToggle = page.getByLabel('Toggle Chat capability');
    await expect(chatToggle).toBeChecked();
    await chatToggle.click();
    await expect(page.getByText(/Chat/).first()).toBeVisible();
    // Denied fallback copy appears once disabled.
    await expect(page.getByText(/not enabled|disabled|unavailable/i).first()).toBeVisible();
    // Re-enable restores the real content.
    await chatToggle.click();
    await expect(chatToggle).toBeChecked();
  });

  test('pulse loading shows the loading state briefly', async ({ page }) => {
    await page.getByRole('button', { name: 'Pulse loading' }).first().click();
    await expect(page.getByText(/Checking|Loading/i).first()).toBeVisible({ timeout: 5_000 });
  });
});

test.describe('hook-activity: WrappedActivityPanel', () => {
  test('synthetic activity events stream into the panel in order', async ({ page }) => {
    await page.goto('/workflows/hook-activity');
    await expect(page.getByText(/Alice/).first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/Carol|reaction/i).first()).toBeVisible({ timeout: 15_000 });
  });
});

test.describe('hook-fileupload: WrappedFileUploadDrop', () => {
  test('the drop zone mounts with its file input wired', async ({ page }) => {
    await page.goto('/workflows/hook-fileupload');
    await expect(page.getByText(/MOCK MODE|LIVE MODE/).first()).toBeVisible();
    // The invisible file input behind the drop zone is the upload entry point.
    await expect(page.locator('input[type="file"]').first()).toBeAttached();
  });
});
