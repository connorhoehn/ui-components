import { test, expect } from '@playwright/test';

// Asserts the branding scheme actually resolves in the browser: every tone's
// four roles are defined, and components render the token value (not a raw
// palette colour). Deterministic — no screenshots.
const TONES = ['neutral','success','warning','danger','info','caution','accent'];

test('every tone defines all four roles', async ({ page }) => {
  await page.goto('/components/data-display');
  await page.waitForLoadState('networkidle');
  const missing = await page.evaluate((tones) => {
    const cs = getComputedStyle(document.documentElement);
    const out: string[] = [];
    for (const t of tones) {
      for (const role of ['', '-bg', '-fg', '-border']) {
        const v = cs.getPropertyValue(`--color-${t}${role}`).trim();
        if (!v) out.push(`--color-${t}${role}`);
      }
    }
    return out;
  }, TONES);
  expect(missing, `unset tone variables: ${missing.join(', ')}`).toEqual([]);
});

test('Chip renders the token colour, not a raw palette colour', async ({ page }) => {
  // /components/data-display renders the Chip gallery, so every tone is on
  // screen without waiting for a simulation to advance.
  await page.goto('/components/data-display');
  await page.waitForLoadState('networkidle');
  const el = page.locator('[class*="bg-danger-bg"]').first();
  await expect(el).toBeVisible({ timeout: 10000 });
  const bg = await el.evaluate((e) => getComputedStyle(e).backgroundColor);
  // --color-danger-bg is the hex #fef2f2. Tailwind v4's own red-50 is an
  // oklch() value that lands a few sRGB units away, so an exact match here is
  // what proves the surface is routing through the token rather than the raw
  // palette.
  expect(bg).toBe('rgb(254, 242, 242)');
});

test('demo inherits library-only tokens (no forked @theme)', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const vals = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    return {
      catAi: cs.getPropertyValue('--color-cat-ai').trim(),
      fontCode: cs.getPropertyValue('--font-code').trim(),
    };
  });
  expect(vals.catAi).toBe('#7c3aed');
  expect(vals.fontCode).toContain('JetBrains Mono');
});
