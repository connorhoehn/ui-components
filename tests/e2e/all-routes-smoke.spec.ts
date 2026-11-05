// Smoke test for every demo route declared in demo/src/navigation/nav-tree.ts.
// Each route mounts the page, waits for network idle, and asserts that the
// app shell rendered (no Vite error overlay) and the <main> region has
// non-trivial content. Rich behavioural assertions belong in the per-domain
// spec files (social-demo.spec.ts, pipeline-demo.spec.ts, ...).
//
// If a route is added to nav-tree.ts, add it here too — there is no auto-sync.
// A coverage delta is far easier to spot in this single file than scattered
// across 50+ per-route specs.

import { test, expect, type Page } from '@playwright/test';

interface Route {
  path: string;
  // Marked routes are skipped via test.fixme. Use this for routes whose demo
  // imports an optional/external peer dep that may not be installed in every
  // environment (the demo dev server fails the Vite import-analysis pass).
  // Remove the skipReason when the dep is installed in this worktree.
  skipReason?: string;
}

// No skips. hls.js and amazon-ivs-web-broadcast are now devDependencies, so
// the video / call-widget routes are smoke-tested for real. Reintroduce a
// skipReason only if a route genuinely cannot run in this environment.
// SKIP_RM retired 2026-08-16: @connorhoehn/realtime-modules IS installed
// (v0.16.0 via the file:../realtime-modules link), and demo/vite.config.ts now
// aliases its /client/video and /client/hangout-rooms subpaths, so the
// hook-integration routes mount for real instead of being skipped.

const ROUTES: ReadonlyArray<Route> = [
  // Get Started
  { path: '/get-started/introduction' },
  { path: '/get-started/installation' },
  { path: '/get-started/quick-start' },
  { path: '/get-started/theming' },

  // Foundations (Components)
  { path: '/components/buttons' },
  { path: '/components/feedback' },
  { path: '/components/data-display' },
  { path: '/components/forms' },
  { path: '/components/layout' },
  { path: '/components/node-editor' },
  { path: '/components/collaboration' },
  { path: '/components/real-time-editing' },
  { path: '/components/video' },
  { path: '/components/call-widget' },
  { path: '/components/primitives' },
  { path: '/components/chat' },
  { path: '/components/patterns' },

  // Workflows — Pipelines
  { path: '/workflows/pipeline-editor' },
  // NOTE: no '/workflows/pipeline-runs' entry. The library exports
  // PipelineRunsPage (frozen /pipelines surface) but the demo app has never
  // routed it — no demo dir, no nav-tree entry, no catalog entry. This spec
  // used to list the path and failed on a blank no-match render. Building
  // that demo is a coverage gap, not a smoke-test fix.

  // Workflows — Agents
  { path: '/workflows/layouts/page-templates' },
  { path: '/workflows/agents/dashboard' },
  { path: '/workflows/agents/flow' },
  { path: '/workflows/agents/invoke' },
  { path: '/workflows/agents/detail' },

  // Workflows — Documents
  { path: '/workflows/document-workspace' },
  { path: '/workflows/collaboration' },

  // Workflows — Data
  { path: '/workflows/ingest-dashboard' },
  { path: '/workflows/observability' },

  // Workflows — Social / Video
  { path: '/workflows/social' },
  { path: '/workflows/video-streaming' },
  { path: '/workflows/call-widget' },

  // Workflows — Hook Integrations (all import realtime-modules at runtime)
  { path: '/workflows/hook-chat' },
  { path: '/workflows/hook-presence' },
  { path: '/workflows/hook-reactions' },
  { path: '/workflows/hook-fileupload' },
  { path: '/workflows/hook-videohangout' },
  { path: '/workflows/hook-activity' },
  { path: '/workflows/hook-notifications' },
  { path: '/workflows/hook-capability' },

  // Identity — Auth flows
  { path: '/identity/login' },
  { path: '/identity/consent' },
  { path: '/identity/mfa-verify' },
  { path: '/identity/mfa-setup' },
  { path: '/identity/logout' },

  // Identity — Admin
  { path: '/identity/admin' },
  { path: '/identity/admin/pools' },
  { path: '/identity/admin/users' },
  { path: '/identity/admin/groups' },
  { path: '/identity/admin/applications' },
  { path: '/identity/admin/email-templates' },
  { path: '/identity/admin/mfa' },
  { path: '/identity/admin/audit' },
  { path: '/identity/admin/full' },

  // Patterns
  { path: '/patterns/websocket-provider' },
  { path: '/patterns/auth-integration' },
  { path: '/patterns/theming' },
  { path: '/patterns/custom-renderers' },
  { path: '/patterns/simulations' },
  { path: '/patterns/embedding-modules' },

  // Hooks (docs)
  { path: '/hooks/connection' },
  { path: '/hooks/ui' },
  { path: '/hooks/documents' },
  { path: '/hooks/collaboration' },
  { path: '/hooks/ag-ui-stream' },
  { path: '/hooks/agent-registry' },
  { path: '/hooks/a2a-session' },
];

async function expectRouteSmokes(page: Page, path: string) {
  const pageErrors: string[] = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));

  await page.goto(path);
  // networkidle is the right signal for SPA mount + lazy-route hydration.
  await page.waitForLoadState('networkidle');

  // Vite shows a fullscreen <vite-error-overlay> custom element when import
  // analysis or transform fails. Detecting it explicitly turns an opaque
  // "<main> never appeared" failure into a clear "Vite couldn't compile X".
  const overlayCount = await page.locator('vite-error-overlay').count();
  if (overlayCount > 0) {
    const text = await page
      .locator('vite-error-overlay')
      .first()
      .evaluate((el) => el.shadowRoot?.textContent ?? '');
    throw new Error(
      `Vite error overlay on ${path}:\n${text.replace(/\s+/g, ' ').slice(0, 400)}`,
    );
  }

  // The route should have mounted inside the app's <main> region with some
  // page content. Looser than per-domain specs on purpose — interactive
  // demos like /workflows/pipeline-editor use a chrome bar instead of an
  // h1/h2/h3, so a heading-only check is too strict.
  // .first() because some demos (e.g. /identity/admin/full embeds the live
  // IdentityAdminLayout) render a nested <main> inside the outer app shell.
  const main = page.locator('main').first();
  await expect(main).toBeVisible();
  const mainText = (await main.textContent()) ?? '';
  expect(
    mainText.replace(/\s+/g, '').length,
    `<main> appears empty on ${path}`,
  ).toBeGreaterThan(20);

  // Any uncaught page error is a smoke failure.
  expect(
    pageErrors,
    `Uncaught page errors on ${path}:\n${pageErrors.join('\n')}`,
  ).toEqual([]);
}

test.describe('Demo routes — smoke', () => {
  for (const { path, skipReason } of ROUTES) {
    test(`${path} mounts without fatal errors`, async ({ page }) => {
      if (skipReason) test.fixme(true, skipReason);
      await expectRouteSmokes(page, path);
    });
  }
});
