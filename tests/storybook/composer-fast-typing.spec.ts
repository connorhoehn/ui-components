// Zero-delay typing into the ContextComposer in Agent mode.
//
// The bug this pins (fixed in 2.407.39): Playwright `type()` at delay 0 into a
// document's ContextComposer (Agent is the default mode there) threw React
// "Maximum update depth exceeded" from RichChatComposer's editor `onUpdate`
// after ~50 keys; at 15ms per key it did not. Each key's sync commit ran the
// draft-sync effect for the host's echo of the composer's own draft, and its
// setStates (Default priority, from a sync commit's passive phase) count as a
// nested update that only resets once that Default render runs — which never
// happens while keys keep arriving first. The controlled story re-renders a
// heavy page per key, as a real document page does. Asserts no console or
// page error, and that the editor (and the host's draft) hold the typed text.
//
// Run: `npm run test:e2e:storybook`.

import { test, expect } from '@playwright/test';

const TEXT = 'Tighten the rollout plan; cite the ADR!! Then add one line on the Neptune fallback.';

const STORIES = [
  { id: 'social-contextcomposer--controlled-agent', root: '[data-testid="controlled-agent"]', hostDraft: '[data-testid="controlled-agent-draft"]' },
  { id: 'social-contextcomposer--document', root: '[data-testid="composer-light-idle"]', hostDraft: null },
] as const;

for (const story of STORIES) {
  test(`${story.id}: zero-delay keys in Agent mode — no update-depth error, the draft is the typed text`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      // Storybook's own 404s (favicon, source maps) are not the component's.
      if (msg.type() === 'error' && !/Failed to load resource/.test(msg.text())) errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    const root = page.locator(story.root);
    const editor = root.locator('.ProseMirror').first();
    await editor.waitFor();
    await expect(root.locator('[data-mode]').first()).toHaveAttribute('data-mode', 'agent');
    await editor.click();
    expect(TEXT.length).toBeGreaterThanOrEqual(60);
    await editor.pressSequentially(TEXT, { delay: 0 });
    await expect(editor).toHaveText(TEXT);
    if (story.hostDraft) await expect(page.locator(story.hostDraft)).toHaveText(`<p>${TEXT}</p>`);
    // A render loop that has not thrown yet gets the time to.
    await page.waitForTimeout(300);
    expect(errors).toEqual([]);
  });
}
