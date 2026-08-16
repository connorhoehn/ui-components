import { test, expect } from '@playwright/test';

test.describe('Collaboration Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/collaboration');
  });

  test('page renders with heading', async ({ page }) => {
    await expect(page.getByText('Real-time Collaboration')).toBeVisible();
  });

  test('user presence indicators appear', async ({ page }) => {
    await expect(page.getByText('users online')).toBeVisible({ timeout: 10000 });
  });

  test('cursors appear as simulation fires events', async ({ page }) => {
    await expect(page.getByText('Alice Chen').first()).toBeVisible({ timeout: 10000 });
  });

  test('multiple cursors join over time', async ({ page }) => {
    await expect(page.getByText('Bob Martinez').first()).toBeVisible({ timeout: 10000 });
  });
});
