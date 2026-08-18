import { test, expect } from '@playwright/test';

test('workflows index renders content, not a blank page', async ({ page }) => {
  await page.goto('/workflows');
  await page.waitForLoadState('networkidle');
  const main = page.getByTestId('docs-shell-main');
  await expect(main.getByRole('heading', { name: 'Workflows' })).toBeVisible();
  const cards = main.locator('a[href^="/workflows/"]');
  console.log('### workflow cards:', await cards.count());
  expect(await cards.count()).toBeGreaterThan(3);
});

test('sidebar scrolls internally instead of stretching the page', async ({ page }) => {
  await page.goto('/workflows/agents/flow');
  await page.waitForLoadState('networkidle');
  const m = await page.evaluate(() => {
    const shell = document.querySelector('[data-testid="docs-shell"]') as HTMLElement;
    const side = document.querySelector('[data-testid="docs-sidebar"]') as HTMLElement;
    const main = document.querySelector('[data-testid="docs-shell-main"]') as HTMLElement;
    return {
      docScroll: document.documentElement.scrollHeight,
      viewport: window.innerHeight,
      shellH: shell?.getBoundingClientRect().height ?? 0,
      sideScrollable: side ? side.scrollHeight > side.clientHeight + 1 : false,
      mainScrollable: main ? main.scrollHeight > main.clientHeight + 1 : false,
    };
  });
  console.log('###', JSON.stringify(m));
  // The document itself must not grow past the viewport — the panes scroll.
  expect(m.docScroll).toBeLessThanOrEqual(m.viewport + 2);
});

test('navigating scrolls the content pane back to the top', async ({ page }) => {
  await page.goto('/components/forms');
  await page.waitForLoadState('networkidle');
  await page.getByTestId('docs-shell-main').evaluate((el) => el.scrollTo(0, 1200));
  expect(await page.getByTestId('docs-shell-main').evaluate((el) => el.scrollTop)).toBeGreaterThan(100);

  await page.getByTestId('docs-sidebar-link-buttons').click();
  await page.waitForURL('**/components/buttons');
  await expect
    .poll(() => page.getByTestId('docs-shell-main').evaluate((el) => el.scrollTop))
    .toBeLessThan(5);
});

test('no nav group repeats its own single item', async ({ page }) => {
  await page.goto('/workflows/social');
  await page.waitForLoadState('networkidle');
  const side = page.getByTestId('docs-sidebar');
  await expect(side.getByText('Social & Chat', { exact: true })).toHaveCount(1);
});
