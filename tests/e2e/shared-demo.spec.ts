import { test, expect } from '@playwright/test';

// Formerly targeted /pages/shared-components — a single combined showcase that
// the demo IA restructure split into per-domain pages. Modal / Toast / Banner /
// ConfirmDialog now live on /components/feedback.
//
// The old interaction cases (open a modal, press Escape, click a toast trigger,
// dismiss a banner) are NOT ported: FeedbackPage renders local presentational
// stand-ins (ToastPreview / BannerPreview / ModalPreview built from plain divs)
// rather than mounting the real <Modal>, <Toast>, and <Banner> components, so
// there is nothing interactive to drive. That is a CLAUDE.md hand-rolled-markup
// violation and the reason this interaction coverage was lost — fixing the page
// to use the real components should come first, then these cases can return.
test.describe('Feedback components page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/feedback');
  });

  test('page renders with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Feedback', exact: true })).toBeVisible();
  });

  test('all component sections are visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Toast notifications' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Banner variants' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Modal', exact: true })).toBeVisible();
    // exact: the page also has a "ConfirmDialog Props" table heading.
    await expect(
      page.getByRole('heading', { name: 'ConfirmDialog', exact: true }),
    ).toBeVisible();
  });

  test('toast previews render one per type', async ({ page }) => {
    await expect(page.getByText('A new version is available.')).toBeVisible();
    await expect(page.getByText('Changes saved successfully.')).toBeVisible();
    await expect(page.getByText('Your session will expire in 5 minutes.')).toBeVisible();
    await expect(page.getByText('Failed to connect to the server.')).toBeVisible();
  });

  test('toast previews can carry an action label', async ({ page }) => {
    await expect(page.getByText('Message archived.')).toBeVisible();
    await expect(page.getByText('Deployment complete.')).toBeVisible();
  });

  test('banner variants render', async ({ page }) => {
    await expect(
      page.getByText('Payment method declined. Please update your billing info.'),
    ).toBeVisible();
    await expect(page.getByText('Storage usage is above 90%.')).toBeVisible();
    await expect(page.getByText('Scheduled maintenance tonight at 11 PM UTC.')).toBeVisible();
    await expect(page.getByText('All systems operational.')).toBeVisible();
  });

  test('banners support an optional title line', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Banner with title' })).toBeVisible();
    await expect(page.getByText('Sync Failed')).toBeVisible();
    await expect(page.getByText('Deprecation Notice')).toBeVisible();
  });
});
