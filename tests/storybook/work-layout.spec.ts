import { expect, test } from '@playwright/test';

for (const width of [1440, 900]) test(`work layout uses its available width at ${width}`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('/iframe.html?id=layout-workdetaillayout--resizable-work-and-brief&viewMode=story');
  const rail = page.getByTestId('explorer-layout-rail');
  const row = page.getByTestId('work-list-groups-row-open-alerts');
  const before = (await row.boundingBox())!.width;
  await page.getByRole('button', { name: 'Widen work items' }).click();
  await expect.poll(async () => (await row.boundingBox())!.width).toBeGreaterThan(before + (width === 900 ? 50 : 180));
  expect((await page.getByTestId('explorer-layout-pane').boundingBox())!.width).toBeGreaterThanOrEqual(479);
  const divider = page.getByRole('separator', { name: 'Resize work items' });
  await divider.focus(); await page.keyboard.press('ArrowLeft');
  const resized = (await rail.boundingBox())!.width;
  await page.reload();
  await expect.poll(async () => (await rail.boundingBox())!.width).toBeCloseTo(resized, 0);
  const mark = page.getByTestId('work-signal-dot').first().locator('span');
  expect((await mark.boundingBox())!.width).toBeLessThanOrEqual(6);
  const title = row.locator('[data-ui-text="rail-item"]');
  expect((await title.boundingBox())!.x - (await rail.boundingBox())!.x).toBeLessThanOrEqual(33);
  await page.screenshot({ path: test.info().outputPath(`rail-${width}.png`) });
  await page.getByRole('button', { name: 'Brief preview', exact: true }).click();
  const pane = page.getByTestId('side-pane');
  await expect(page.getByTestId('story-brief')).toBeVisible();
  await expect(pane.getByRole('tablist')).toHaveCount(0);
  const available = (await page.getByTestId('side-pane-split').boundingBox())!.width;
  const expectedWidth = available < 1240 ? available : Math.min(960, available - 640);
  expect(Math.abs((await pane.boundingBox())!.width - expectedWidth)).toBeLessThanOrEqual(2);
  if (width === 900) await expect(row).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath(`brief-${width}.png`) });
  if (width === 900) {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(pane).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const draftAction = (await page.getByRole('button', { name: 'Draft with agent' }).boundingBox())!;
    const paneBounds = (await pane.boundingBox())!;
    expect(draftAction.x + draftAction.width).toBeLessThanOrEqual(paneBounds.x + paneBounds.width);
    await page.screenshot({ path: test.info().outputPath('brief-390.png') });
    await page.setViewportSize({ width, height: 1000 });
  }
  await page.getByRole('button', { name: 'Close brief preview' }).click();
  await expect(page.getByRole('button', { name: 'Brief preview', exact: true })).toBeFocused();
});

test('design review uses plain sections and its context stacks in a narrow column', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 1000 });
  await page.goto('/iframe.html?id=layout-workdetaillayout--plain-design-review&viewMode=story');
  const context = page.getByRole('complementary', { name: 'Record context' });
  const thread = page.locator('[data-variant="inline"]').first();
  expect((await context.boundingBox())!.x).toBeGreaterThan((await thread.boundingBox())!.x);
  await page.setViewportSize({ width: 650, height: 1000 });
  expect((await context.boundingBox())!.y).toBeGreaterThan((await thread.boundingBox())!.y);
  expect(await thread.evaluate(el => getComputedStyle(el).borderTopLeftRadius)).toBe('0px');
  await page.screenshot({ path: test.info().outputPath('plain-design-narrow.png') });
});

test('the conversation mode menu has no formatting commands', async ({ page }) => {
  await page.goto('/iframe.html?id=social-conversationcomposer--mode-selection&viewMode=story');
  await page.getByTestId('rich-chat-composer-mode-menu').click();
  const menu = page.getByTestId('rich-chat-composer-mode-menu-list');
  await expect(menu).toBeVisible();
  await expect(menu).not.toContainText('Formatting');
  await expect(menu).not.toContainText('Strikethrough');
  await expect(menu).not.toContainText('Numbered list');
  await expect(menu).toContainText('Chat');
  await expect(menu).toContainText('Agent');
});
