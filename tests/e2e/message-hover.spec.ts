import { test, expect, type Locator } from '@playwright/test';
import { resolve } from 'node:path';

const fixture = resolve(process.cwd(), 'tests/e2e/fixtures/message-hover.tsx');
async function box(locator: Locator) { const value = await locator.boundingBox(); expect(value).not.toBeNull(); return value!; }
function overlaps(a: {x:number;y:number;width:number;height:number}, b: {x:number;y:number;width:number;height:number}) { return a.x < b.x+b.width-.5 && b.x < a.x+a.width-.5 && a.y < b.y+b.height-.5 && b.y < a.y+a.height-.5; }
for (const theme of ['light', 'dark']) for (const width of [980, 360, 280]) {
  test(`${theme} ${width}px message actions keep metadata and body clear`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 860 });
    const unexpected: string[] = [];
    await page.route('**/api/**', route => { unexpected.push(new URL(route.request().url()).pathname); return route.abort(); });
    await page.route('**/__message-hover?*', route => route.fulfill({ contentType: 'text/html', body: `<div id="root"></div><script type="module">import RefreshRuntime from "/@react-refresh";RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;</script><script type="module" src="/@fs${fixture}"></script>` }));
    await page.goto(`/__message-hover?theme=${theme}`);
    const first = page.locator('[data-message-id="received-first"]');
    await expect(first).toBeVisible();
    for (const id of ['received-first', 'sent', 'sent-continued', 'received-long']) {
      const row = page.locator(`[data-message-id="${id}"]`), toolbar = row.getByRole('toolbar', { name: 'Message actions' });
      await row.scrollIntoViewIfNeeded();
      const before = await box(row);
      await page.mouse.move(1, 1);
      await expect(toolbar).toHaveCSS('opacity', '0');
      await row.hover();
      await expect(toolbar).toHaveCSS('opacity', '1');
      const after = await box(row), actions = await box(toolbar), content = await box(row.getByTestId('message-row-content'));
      expect(after).toEqual(before);
      expect(actions.x).toBeGreaterThanOrEqual(after.x);
      expect(actions.x + actions.width).toBeLessThanOrEqual(after.x + after.width + .5);
      expect(actions.y).toBeGreaterThanOrEqual(after.y);
      expect(overlaps(actions, content)).toBe(false);
      const meta = row.getByTestId('message-row-author');
      if (await meta.count()) {
        const author = await box(meta), time = await box(row.getByTestId('message-row-time'));
        expect(overlaps(actions, author)).toBe(false);
        expect(overlaps(actions, time)).toBe(false);
      }
      // Hover padding survives both received text and sent tinted bubbles.
      expect(after.y + after.height - content.y - content.height).toBeGreaterThanOrEqual(7.5);
      expect(after.y + after.height - content.y - content.height).toBeLessThanOrEqual(8.5);
    }
    // The first toolbar is within the scroll viewport, without a negative lift.
    await first.scrollIntoViewIfNeeded();
    const firstActions = await box(first.getByRole('toolbar')), panel = await box(page.getByTestId('fixture-panel'));
    expect(firstActions.y).toBeGreaterThanOrEqual(panel.y);
    await page.mouse.move(1, 1);
    await page.getByTestId('keyboard-start').focus();
    const firstButton = first.getByRole('button', { name: 'React 👍' });
    // The independently scrollable transcript is also a keyboard stop.
    for (let step = 0; step < 4 && !await firstButton.evaluate(el => el === document.activeElement); step++) await page.keyboard.press('Tab');
    await expect(firstButton).toBeFocused();
    await expect(first.getByRole('toolbar')).toHaveCSS('opacity', '1');
    await page.keyboard.press('ArrowRight');
    await expect(first.getByRole('button', { name: 'React 🎉' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('fixture-receipt')).toHaveText('received-first:🎉');
    const sent = page.locator('[data-message-id="sent"]');
    await sent.hover();
    await sent.getByRole('button', { name: 'More reactions' }).click();
    const picker = page.getByTestId('reaction-picker-popover');
    await expect(picker).toBeVisible();
    const pickerBox = await box(picker);
    expect(pickerBox.x).toBeGreaterThanOrEqual(0);
    expect(pickerBox.x + pickerBox.width).toBeLessThanOrEqual(width + .5);
    expect(pickerBox.y).toBeGreaterThanOrEqual(0);
    expect(pickerBox.y + pickerBox.height).toBeLessThanOrEqual(860 + .5);
    await page.keyboard.press('Escape');
    await expect(picker).not.toBeVisible();
    await page.screenshot({ path: testInfo.outputPath('message-hover.png'), fullPage: true });
    expect(unexpected).toEqual([]);
  });
}

for (const theme of ['light', 'dark']) for (const width of [980, 360]) {
  test(`${theme} ${width}px native prejoin preserves device controls in fitting columns`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 860 });
    const unexpected: string[] = [];
    await page.route('**/api/**', route => { unexpected.push(route.request().url()); return route.abort(); });
    const path = resolve(process.cwd(), 'tests/e2e/fixtures/prejoin-native.tsx');
    await page.route('**/__native-prejoin?*', route => route.fulfill({ contentType: 'text/html', body: `<div id="root"></div><script type="module">import RefreshRuntime from "/@react-refresh";RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;</script><script type="module" src="/@fs${path}"></script>` }));
    await page.goto(`/__native-prejoin?theme=${theme}`);
    const form = page.getByTestId('audio-video-settings-form');
    await expect(form).toHaveAttribute('data-layout', 'prejoin');
    const preview = await box(page.getByTestId('settings-preview')), mic = await box(page.getByTestId('settings-mic-select')), dialog = await box(page.getByRole('dialog'));
    expect(dialog.x).toBeGreaterThanOrEqual(0);
    expect(dialog.x + dialog.width).toBeLessThanOrEqual(width + .5);
    expect(dialog.y).toBeGreaterThanOrEqual(0);
    expect(dialog.y + dialog.height).toBeLessThanOrEqual(860 + .5);
    if (width > 768) expect(preview.x + preview.width).toBeLessThan(mic.x);
    else { expect(Math.abs(preview.x - mic.x)).toBeLessThan(1); expect(preview.y).toBeGreaterThan(mic.y); }
    await page.getByTestId('settings-quality').selectOption('720p');
    await expect(page.getByTestId('fixture-settings')).toHaveText('720p');
    await expect(page.getByTestId('settings-preview-off').locator('img')).toHaveAttribute('src', /^data:image/);
    await page.screenshot({ path: testInfo.outputPath('native-prejoin.png'), fullPage: true });
    expect(unexpected).toEqual([]);
  });
}
