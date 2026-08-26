// The effects surface inside CallSettingsDialog.
//
// This shipped with its Apply/Cancel footer laid out BELOW the dialog card
// and below the viewport, so the whole effects catalogue was unreachable in
// the running app — while every unit test passed. Unit tests cannot see
// layout; this measures it.

import { test, expect } from '@playwright/test';

for (const vp of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1280x800', width: 1280, height: 800 },
]) {
  test(`effects footer stays inside the card and the viewport @ ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/components/call-widget');
    await page.locator('[data-testid="open-effects-dialog"]').click();

    const panel = page.locator('[data-testid="media-effects-preview-panel"]');
    await expect(panel).toBeVisible();

    const card = page.locator('[data-testid="call-settings-panel"]');
    const apply = page.locator('[data-testid="media-effects-preview-apply"]');
    const cancel = page.locator('[data-testid="media-effects-preview-cancel"]');

    const cardBox = (await card.boundingBox())!;
    const applyBox = (await apply.boundingBox())!;
    const cancelBox = (await cancel.boundingBox())!;

    // eslint-disable-next-line no-console
    console.log(`MEASURE ${vp.name} card=${JSON.stringify(cardBox)} apply=${JSON.stringify(applyBox)}`);

    // 1. Inside the viewport — the original failure was apply.y ≈ 1071 in a
    //    1080-tall window, i.e. off-screen and un-clickable.
    expect(applyBox.y + applyBox.height, 'Apply must be inside the viewport').toBeLessThanOrEqual(vp.height);
    expect(cancelBox.y + cancelBox.height, 'Cancel must be inside the viewport').toBeLessThanOrEqual(vp.height);

    // 2. Inside the dialog's own scroll region, not spilling out below it.
    expect(applyBox.y, 'Apply must not render below the dialog body').toBeLessThanOrEqual(
      cardBox.y + cardBox.height + 1,
    );

    // 3. Actually clickable once there is something to apply. Apply is
    //    correctly DISABLED while the draft matches live, so choose an
    //    effect first — otherwise this asserts the disabled state and tells
    //    us nothing about reachability.
    await page.locator('[data-testid="media-effects-preview-tray"] button').nth(1).click();
    await expect(apply).toBeEnabled();
    const afterBox = (await apply.boundingBox())!;
    expect(afterBox.y + afterBox.height, 'Apply stays in the viewport once enabled').toBeLessThanOrEqual(vp.height);
    await apply.click({ trial: true, timeout: 4000 });
  });
}
