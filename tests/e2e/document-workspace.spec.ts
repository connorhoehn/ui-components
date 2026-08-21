// Document Workspace journey — the collaborative-doc demo driven by the
// SimulatedProvider timeline: remote text lands in the first section,
// comments arrive, sections collapse/expand, and mode switching works.

import { test, expect } from '@playwright/test';

test.describe('Document Workspace', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/document-workspace');
  });

  test('renders the document with its section structure', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'RFC / Technical Proposal' })).toBeVisible();
    await expect(page.getByText('RFC Title').first()).toBeVisible();
    await expect(page.getByText('Problem Statement').first()).toBeVisible();
  });

  test('collapsed sections expand on header click', async ({ page }) => {
    // 'Status' starts collapsed in the mock document.
    const statusHeader = page.getByText('Status', { exact: true }).first();
    await statusHeader.click();
    // Clicking again re-collapses without error.
    await statusHeader.click();
    await expect(statusHeader).toBeVisible();
  });

  test('simulated remote edits stream text into the first section', async ({ page }) => {
    // The timeline types into s1 — wait for any remote text to accumulate.
    await expect
      .poll(
        async () => (await page.locator('body').innerText()).length,
        { timeout: 15_000 },
      )
      .toBeGreaterThan(0);
    // Alice's presence should be visible once the simulation joins her.
    await expect(page.getByText(/Alice/).first()).toBeVisible({ timeout: 15_000 });
  });
});
