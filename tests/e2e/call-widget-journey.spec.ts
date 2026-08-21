// Call-widget journey — the simulated in-app call. The demo AUTO-PLAYS a
// scripted lifecycle (ring → answer → active → speaking → end), so the spec
// observes the shipped widget through those states and uses the simulation
// controls (Reset) rather than fighting the timeline.

import { test, expect } from '@playwright/test';

test.describe('Call widget journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/call-widget');
  });

  test('the scripted call goes active with a ticking timer', async ({ page }) => {
    // The header chip flips once the call connects.
    await expect(page.getByText('Call in progress')).toBeVisible({ timeout: 20_000 });

    // Active call stamps the timer contract (data-call-duration).
    const timer = page.getByTestId('call-timer').first();
    await expect(timer).toBeVisible({ timeout: 20_000 });
    const d1 = Number(await timer.getAttribute('data-call-duration'));
    await expect
      .poll(async () => Number(await timer.getAttribute('data-call-duration')), { timeout: 10_000 })
      .toBeGreaterThan(d1);
  });

  test('participants and speaking state surface in the widget', async ({ page }) => {
    await expect(page.getByTestId('call-timer').first()).toBeVisible({ timeout: 20_000 });
    // The scripted roster joins the call.
    await expect(page.getByText(/speaking/i).first()).toBeVisible({ timeout: 20_000 });
  });

  test('resetting the simulation now resets the call state too', async ({ page }) => {
    await expect(page.getByTestId('call-timer').first()).toBeVisible({ timeout: 20_000 });
    await page.getByTitle('Reset').click();
    await expect(page.getByTestId('call-timer')).toHaveCount(0);
    await expect(page.getByText('Call in progress')).toHaveCount(0);
  });

  test('the scripted call ends and the widget returns to idle', async ({ page }) => {
    // Speed the timeline up; the script ends the call itself.
    await page.getByRole('button', { name: '4x' }).click();
    await expect(page.getByTestId('call-timer').first()).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId('call-timer')).toHaveCount(0, { timeout: 30_000 });
  });
});
