// Identity user journeys — the OIDC auth screens and the full admin demo.
//
// These demos mount the REAL library pages (LoginPage, ConsentPage,
// MfaVerifyPage, the admin list pages inside IdentityAdminLayout) with mock
// data, so the assertions here are about the shipped components' behavior:
// tab switching, form submission, code entry, and admin sidebar navigation.

import { test, expect } from '@playwright/test';

test.describe('Login journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/identity/login');
  });

  test('sign-in form submits the entered credentials', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', (msg) => logs.push(msg.text()));

    const form = page.getByRole('form', { name: /sign in form/i }).first();
    await form.getByLabel(/Email/).fill('ada@example.com');
    await form.getByLabel(/Password/).fill('hunter2');
    await form.getByRole('button', { name: /Sign in/i }).click();

    await expect
      .poll(() => logs.some((l) => l.includes('[LoginDemo] onLogin') && l.includes('ada@example.com')))
      .toBe(true);
  });

  test('error state renders the inline banner', async ({ page }) => {
    await expect(page.getByText('Invalid email or password')).toHaveCount(0);
    await page.getByText('Show error state').click();
    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });

  test('the sign-in-only variant renders a single tabless form', async ({ page }) => {
    // Two LoginPage instances mount; only the full one offers Register.
    await expect(page.getByRole('form', { name: /sign in form/i })).toHaveCount(2);
    await expect(page.getByRole('tab', { name: /Register/i })).toHaveCount(1);
  });
});

test.describe('MFA verify journey', () => {
  test('entering six digits reports the code', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', (msg) => logs.push(msg.text()));
    await page.goto('/workflows/identity/mfa-verify');

    await expect(page.getByLabel('Digit 1 of 6').first()).toBeVisible();
    for (let i = 0; i < 6; i++) {
      await page.getByLabel(`Digit ${i + 1} of 6`).first().fill(String(i + 1));
    }
    await expect
      .poll(() => logs.some((l) => l.includes('[MfaVerifyDemo] Code entered') && l.includes('123456')))
      .toBe(true);
  });
});

test.describe('Consent journey', () => {
  test('lists the requested scopes for the client', async ({ page }) => {
    await page.goto('/workflows/identity/consent');
    await expect(page.getByText('Acme Dashboard').first()).toBeVisible();
    // Scopes render as human descriptions, not raw scope names.
    await expect(page.getByText('Maintain access when you are not present').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Authorize|Allow/i }).first()).toBeVisible();
  });
});

test.describe('Full admin journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/identity/admin/full');
  });

  test('dashboard renders stats and the sidebar navigates to pools', async ({ page }) => {
    await expect(page.getByText('User Pools').first()).toBeVisible();
    await page.getByRole('button', { name: /Pools/ }).first().click();
    await expect(page.getByRole('button', { name: /Create Pool/i })).toBeVisible();
  });

  test('viewing a pool jumps to its user list', async ({ page }) => {
    await page.getByRole('button', { name: /Pools/ }).first().click();
    await page.getByRole('button', { name: /^View$/ }).first().click();
    await expect(page.getByText('Acme Production').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Create User/i })).toBeVisible();
  });

  test('audit view renders the query bar', async ({ page }) => {
    await page.getByRole('button', { name: /Audit/i }).first().click();
    await expect(page.getByRole('button', { name: 'Query' })).toBeVisible();
  });
});
