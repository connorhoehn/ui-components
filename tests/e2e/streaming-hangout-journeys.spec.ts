// Video streaming + hangout rooms journeys.

import { test, expect } from '@playwright/test';

test.describe('Video streaming demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/video-streaming');
  });

  test('the stream page renders participants and live stats', async ({ page }) => {
    await expect(page.getByText(/Participants \(\d+\)/)).toBeVisible();
    await expect(page.getByText(/Bitrate/i).first()).toBeVisible();
  });

  test('simulated participants churn over time', async ({ page }) => {
    const countText = () => page.getByText(/Participants \(\d+\)/).innerText();
    const first = await countText();
    await expect
      .poll(async () => (await countText()) !== first, { timeout: 20_000 })
      .toBe(true);
  });
});

test.describe('Hangout rooms journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/hook-hangoutrooms');
  });

  test('the rooms list renders the seeded rooms with occupancy', async ({ page }) => {
    await expect(page.getByText('General').first()).toBeVisible();
    await expect(page.getByText('Design Jam').first()).toBeVisible();
    await expect(page.getByText('Water Cooler').first()).toBeVisible();
  });

  test('joining a room reports the join to the host', async ({ page }) => {
    // Rows expose a join affordance; the demo echoes the joined slug.
    await page.getByText('Design Jam').first().click();
    await expect(page.getByText(/Joined/).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('design-jam').first()).toBeVisible();
  });
});

test.describe('Wrapped components comparison', () => {
  test('both columns mount: raw wiring and the wrapped adapters behave alike', async ({ page }) => {
    await page.goto('/workflows/wrapped-components');
    await expect(page.getByText('Wrapped Components vs Raw Hook Wiring')).toBeVisible();
    await expect(page.getByText('Wrapped (adapter built-in)')).toBeVisible();
    // Two chat panels mount (raw + wrapped).
    await expect(page.getByPlaceholder(/Type a message/)).toHaveCount(2);
  });
});

test.describe('Video hangout journey', () => {
  test('HangoutLayout mounts with its tiles via the wrapped adapter', async ({ page }) => {
    await page.goto('/workflows/hook-videohangout');
    await expect(page.getByText(/HangoutLayout \+ useVideoHangout/).first()).toBeVisible();
    await expect(page.getByText(/MOCK MODE|LIVE MODE/).first()).toBeVisible();
  });
});
