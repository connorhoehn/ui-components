# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: social-demo.spec.ts >> Social Panel Demo >> simulation starts and chat messages appear
- Location: tests/e2e/social-demo.spec.ts:16:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Has anyone looked at the new pipeline config?')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByText('Has anyone looked at the new pipeline config?')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Social Panel Demo', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/demo/social-panel');
  6  |   });
  7  | 
  8  |   test('room list is visible with channels', async ({ page }) => {
  9  |     await expect(page.getByText('Channels')).toBeVisible();
  10 |     // Room items show as "#general", "#feed", "#random" in the room list
  11 |     await expect(page.getByText('#general')).toBeVisible();
  12 |     await expect(page.getByText('#feed')).toBeVisible();
  13 |     await expect(page.getByText('#random')).toBeVisible();
  14 |   });
  15 | 
  16 |   test('simulation starts and chat messages appear', async ({ page }) => {
  17 |     // First message is from Alice with specific text
> 18 |     await expect(page.getByText('Has anyone looked at the new pipeline config?')).toBeVisible({ timeout: 15000 });
     |                                                                                   ^ Error: expect(locator).toBeVisible() failed
  19 |   });
  20 | 
  21 |   test('typing indicator appears during simulation', async ({ page }) => {
  22 |     // Typing indicator shows "Bob is typing..." - use first() to avoid strict mode
  23 |     const typingIndicator = page.getByText(/is typing\.\.\./).first();
  24 |     await expect(typingIndicator).toBeVisible({ timeout: 15000 });
  25 |   });
  26 | 
  27 |   test('multiple messages accumulate over time', async ({ page }) => {
  28 |     // Wait for Bob's message which comes after the typing indicator
  29 |     await expect(page.getByText('The new transform step is way faster')).toBeVisible({ timeout: 15000 });
  30 |     // At this point we should have at least Alice's and Bob's messages
  31 |     await expect(page.getByText('Has anyone looked at the new pipeline config?')).toBeVisible();
  32 |   });
  33 | });
  34 | 
```