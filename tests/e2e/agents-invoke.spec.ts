// Agents invoke journey — AgentInvokePage in simulated mode: send a prompt,
// watch the scripted AG-UI stream produce reasoning, a tool call, and the
// final streamed answer.

import { test, expect } from '@playwright/test';

test.describe('Agent Invoke (simulated stream)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/agents/invoke');
  });

  test('starts in simulated mode with the mode banner', async ({ page }) => {
    await expect(page.getByText(/Simulated mode — scripted AG-UI event stream/)).toBeVisible();
  });

  test('sending a prompt streams the scripted answer with its tool call', async ({ page }) => {
    const input = page.getByPlaceholder('Send a message to the agent...');
    await input.fill('What is AG-UI?');
    await input.press('Enter');

    // Streamed final text lands (markdown-rendered, so match a fragment).
    await expect(page.getByText(/open protocol/).first()).toBeVisible({ timeout: 15_000 });
    // The scripted tool call surfaced too.
    await expect(page.getByText(/query_knowledge_base/).first()).toBeVisible();
  });

  test('mode toggle switches to the live-endpoint banner', async ({ page }) => {
    await page.getByRole('button', { name: /Switch to live endpoint/ }).click();
    await expect(page.getByText(/Live mode — requires an agent runtime/)).toBeVisible();
  });
});
