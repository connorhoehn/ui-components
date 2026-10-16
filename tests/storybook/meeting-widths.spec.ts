// Meeting UI at phone, tablet and desktop widths — goal G17 (realtime-modules
// docs/design/meeting-rooms-goal.md), measured in a real browser.
//
// The bug this exists to stop: at 390px the meeting toolbar was 884px wide
// (labelled buttons, split chevrons, nothing folded), the room banner squeezed
// its title under the Return button, and the stories' fixed-width frames
// scrolled sideways. Fixed in ui-components 2.472.0. Asserts, per story, width
// and theme: the page never scrolls sideways, and below 820px the toolbar is in
// its phone layout with the status cluster on its own row above the buttons.
//
// Run: `npm run test:e2e:storybook` (starts Storybook on :6006, or reuses one).

import { test, expect } from '@playwright/test';

const STORIES = [
  'video-meetingstage-composition--main-meeting',
  'video-meetingstage-composition--in-breakout-room',
  'video-breakoutroomspanel--organizer-open',
  'video-meetingtoolbar--phone',
  'video-meetingchat-announcements--organizer-rooms-open',
  'video-meetingrehearsal-live-bindings--three-people',
] as const;
const WIDTHS = [390, 768, 1440] as const;
const THEMES = ['light', 'dark'] as const;

for (const id of STORIES) for (const width of WIDTHS) for (const theme of THEMES) {
  test(`${id} at ${width}px, ${theme}: no sideways scroll`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'networkidle' });
    if (theme === 'dark') {
      await page.evaluate(() => {
        document.documentElement.removeAttribute('style');
        document.documentElement.dataset.theme = 'dark';
      });
    }
    await page.locator('#storybook-root > *').first().waitFor();
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth, 'the page scrolls sideways').toBeLessThanOrEqual(width);

    const bar = page.getByRole('toolbar', { name: 'Meeting controls' }).first();
    if (width < 820 && (await bar.count()) > 0) {
      await expect(bar).toHaveAttribute('data-layout', 'phone');
      const buttons = bar.locator('[data-testid$="-items"]');
      const start = bar.locator(':scope > div').first();
      const [sb, bb] = [await start.boundingBox(), await buttons.boundingBox()];
      expect(sb && bb && sb.y + sb.height <= bb.y + 1, 'status cluster sits above the buttons').toBe(true);
    }
  });
}
