import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { measureDOM } from '../../skills/ui-dom-audit/scripts/measure.mjs';

const contract = JSON.parse(readFileSync(new URL('../../skills/ui-dom-audit/references/work-ui.contract.json', import.meta.url), 'utf8'));
const contrastContract = { ...contract, rules: contract.rules.filter((rule: { id: string }) => rule.id === 'a11y.contrast') };

for (const width of [1440, 900, 390]) test(`prompt dialogue fits ${width}px and exposes text only when requested`, async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width, height: 900 });
  for (const theme of ['light', 'dark']) {
    await page.goto(`/iframe.html?id=social-conversationcomposer--model-choice&viewMode=story&globals=theme:${theme}`);
    const prompt = page.locator('[data-composer-prompt]');
    await expect(prompt).toBeVisible();
    await expect(page.locator('[data-composer-prompt-option="haiku"]')).toBeFocused();
    await expect(page.getByRole('textbox')).toHaveCount(0);
    await expect(page.getByRole('toolbar')).toHaveCount(0);
    await expect(page.locator('body')).toHaveAttribute('data-theme', theme);
    await page.evaluate(async () => {
      await document.fonts.ready;
      // Theme selection transitions control colours; judge the settled theme.
      await Promise.all(document.getAnimations().filter(animation => Number.isFinite(animation.effect?.getComputedTiming().endTime))
        .map(animation => animation.finished.catch(() => undefined)));
    });
    expect((await page.evaluate(measureDOM, { contract: contrastContract, selectors: {}, required: [] })).issues).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: test.info().outputPath(`choice-${theme}-${width}.png`) });
    await page.keyboard.press('2');
    await expect(page.getByRole('status')).toContainText('Model selected');
    await expect(page.locator('.ProseMirror')).toHaveText('My unsent discussion draft');
  }
  await page.goto('/iframe.html?id=social-conversationcomposer--cap-with-manual-follow-up&viewMode=story');
  await expect(page.locator('[data-composer-prompt-option]:focus')).toHaveCount(1);
  await page.keyboard.press('3');
  const answer = page.getByRole('textbox', { name: 'Custom run cap' });
  await expect(answer).toBeFocused();
  await expect(page.getByRole('toolbar')).toHaveCount(0);
  await answer.fill('2.50');
  await page.screenshot({ path: test.info().outputPath(`manual-${width}.png`) });
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('Run cap saved');
  expect(errors).toEqual([]);
});

test('the movable ticker story exposes controls below the header and retains both dock locations', async ({ page }) => {
  await page.goto('/iframe.html?id=shared-activityticker--header-and-footer&viewMode=story');
  await page.getByRole('button', { name: 'Move Today strip to header' }).click();
  const ticker = page.locator('header [data-testid="activity-ticker"]');
  await expect(ticker).toBeVisible();
  await ticker.getByRole('button', { name: /^Demo today:/ }).hover();
  const toolbar = page.getByRole('toolbar', { name: 'Sample Today controls' });
  await expect(toolbar).toBeVisible();
  const box = (await toolbar.boundingBox())!;
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.x).toBeGreaterThanOrEqual(0);
  await page.screenshot({ path: test.info().outputPath('ticker-header.png') });
  await page.getByRole('button', { name: 'Move Today strip to footer' }).click();
  await expect(page.locator('footer [data-testid="activity-ticker"]')).toBeVisible();
});

test('the code copy action stays outside the horizontally scrolling text', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/iframe.html?id=shared-codeblock--tsx-dark&viewMode=story');
  const code = page.getByLabel('Code (tsx)').locator('pre');
  const copy = page.getByRole('button', { name: 'Copy code' });
  await expect(copy).toBeVisible();
  for (const end of [false, true]) {
    await code.evaluate((el, toEnd) => { el.scrollLeft = toEnd ? el.scrollWidth : 0; }, end);
    const text = (await code.boundingBox())!;
    const action = (await copy.boundingBox())!;
    expect(text.x + text.width).toBeLessThanOrEqual(action.x);
  }
});
