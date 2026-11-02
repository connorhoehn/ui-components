import { test, expect } from '@playwright/test';

for (const theme of ['light', 'dark']) test(`Compact timing, record rail and breadcrumb geometry: ${theme}`, async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await page.goto(`/iframe.html?id=shared-workflowstepper--run-timing&viewMode=story&globals=theme:${theme}`);
  const track = page.getByTestId('workflow-stepper');
  await expect(track).toBeVisible();
  await expect(page.locator('body')).toHaveAttribute('data-theme', theme);
  expect((await track.boundingBox())!.width).toBeLessThanOrEqual(520);
  expect(await track.evaluate(el => [...el.querySelectorAll('[data-workflow-connector]')].every(line => {
    const next = line.closest('li')?.nextElementSibling?.firstElementChild?.firstElementChild;
    return !!next && Math.abs(line.getBoundingClientRect().right - next.getBoundingClientRect().left) < 1;
  }))).toBe(true);
  await page.goto(`/iframe.html?id=shared-workflowstepper--failed-run&viewMode=story&globals=theme:${theme}`);
  await expect(page.locator('[data-state="failed"]')).toBeVisible();
  await expect(page.locator('[data-state="failed"] svg')).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(`/iframe.html?id=shared-breadcrumbs--narrow-record-trail&viewMode=story&globals=theme:${theme}`);
  const crumb = page.locator('[aria-current="page"]');
  await expect(crumb).toBeVisible();
  expect(await crumb.evaluate(el => el.scrollWidth > el.clientWidth && getComputedStyle(el).textOverflow === 'ellipsis')).toBe(true);
  const link = page.getByRole('link', { name: 'Designs' });
  expect(Math.abs((await link.boundingBox())!.y - (await crumb.boundingBox())!.y)).toBeLessThan(1);
  await page.goto(`/iframe.html?id=shared-groupedlist--design-record-rail&viewMode=story&globals=theme:${theme}`);
  const group = page.getByText('Needs input', { exact: true });
  const row = page.getByText('Session token rotation on tenant switch', { exact: true });
  await expect(row).toBeVisible();
  expect(Math.abs((await group.boundingBox())!.x - (await row.boundingBox())!.x)).toBeLessThanOrEqual(1);
  await page.goto(`/iframe.html?id=shared-railsection--information-pane&viewMode=story&globals=theme:${theme}`);
  await expect(page.getByRole('heading', { name: 'People', level: 2 })).toBeVisible();
  await page.goto(`/iframe.html?id=shared-tabs--segmented&viewMode=story&globals=theme:${theme}`);
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(4);
  const heights = await tabs.evaluateAll(items => items.map(el => el.getBoundingClientRect().height));
  await page.getByRole('tab', { name: 'Config', exact: true }).click();
  expect(await tabs.evaluateAll(items => items.map(el => el.getBoundingClientRect().height))).toEqual(heights);
});
