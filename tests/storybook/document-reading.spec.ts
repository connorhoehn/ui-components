import { test, expect } from '@playwright/test';

for (const [story, width] of [['read-only-pane', 390], ['read-only-pane', 900], ['read-only-page', 1440]] as const) {
  test(`${story} at ${width}: navigate headings and return inside the document`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/iframe.html?id=doc-editor-canvasdocumentview--${story}&viewMode=story`);
    const workspace = page.getByTestId('canvas-document-workspace');
    const contents = page.getByTestId('canvas-document-contents');
    await expect(contents).toBeVisible();
    await contents.getByRole('button', { name: /Recover a failed release/ }).click();
    const heading = workspace.locator('[data-reading-number]').filter({ hasText: 'Recover a failed release' });
    await expect(heading).toBeFocused();
    await expect.poll(() => workspace.evaluate(el => el.scrollTop)).toBeGreaterThan(200);
    await expect.poll(async () => {
      const a = await heading.boundingBox(), b = await workspace.boundingBox();
      return Math.abs((a?.y ?? 0) - (b?.y ?? 0) - 16);
    }).toBeLessThan(4);
    await expect(workspace.getByRole('textbox')).toHaveAttribute('contenteditable', 'false');
    await expect(page.getByTestId('canvas-document-back-to-top')).toBeVisible();
    await page.getByTestId('canvas-document-back-to-top').click();
    await expect(contents).toBeFocused();
    await expect.poll(() => workspace.evaluate(el => el.scrollTop)).toBe(0);
    expect(await contents.evaluate(el => Boolean(el.closest('.ProseMirror') && el.closest('.doc-page')))).toBe(true);
    await expect(contents.locator('.doc-reading-section-number').first()).toHaveText('1.');
    expect(await workspace.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    const cellWidths = await workspace.locator('td').evaluateAll(cells => cells.map(el => el.getBoundingClientRect().width));
    expect(cellWidths.length).toBeGreaterThan(0);
    expect(Math.min(...cellWidths)).toBeGreaterThanOrEqual(224);
    if (story === 'read-only-page') {
      await expect.poll(() => workspace.evaluate(el => {
        const paper = el.querySelector<HTMLElement>('.doc-page')!;
        const zoom = Number(getComputedStyle(paper).zoom) || 1;
        return [...el.querySelectorAll<HTMLElement>('.doc-reading-contents-entry')].every(entry => {
          const number = entry.querySelector('.doc-reading-section-number')!.textContent!.replace(/\.$/, '');
          const heading = el.querySelector<HTMLElement>(`[data-reading-number="${number}"]`)!;
          const expected = Math.floor((heading.getBoundingClientRect().top - paper.getBoundingClientRect().top) / zoom / 1056) + 1;
          return Number(entry.querySelector('.doc-reading-page-number')!.textContent) === expected;
        });
      })).toBe(true);
    }
    await page.screenshot({ path: `test-results/document-${story}-${width}.png`, fullPage: true });
  });
}

test('review page uses section navigation without a document canvas', async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.goto('/iframe.html?id=doc-editor-documentoutline--review-page&viewMode=story');
  const contents = page.getByRole('navigation', { name: 'On this page' });
  await expect(contents).toBeVisible();
  expect(await page.locator('.doc-page').count()).toBe(0);
  await contents.getByRole('button', { name: '5. Sources' }).click();
  await expect(page.locator('#section-4')).toBeFocused();
  await page.getByRole('button', { name: 'Back to contents ↑' }).click();
  await expect(page.locator('#contents')).toBeFocused();
  await page.screenshot({ path: 'test-results/review-page-contents.png' });
});
