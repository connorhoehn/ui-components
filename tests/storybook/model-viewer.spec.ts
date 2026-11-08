// ModelViewer and FrameStrip (2.511.0), measured in a real browser against
// `Shared/ModelViewer` and `Shared/FrameStrip`.
//
// What this proves that the unit tests cannot: the fixture GLB parses and
// headless Chromium renders it through WebGL (`data-model-viewer-state`
// reaches "ready" only on model-viewer's `load`), the 3D frame and the
// reference are the same height side by side when wide and stacked when
// narrow, a channel switch really changes the canvas pixels, a part click
// reaches the root's state, and FrameStrip's thumbnail row scrolls inside its
// column instead of widening the page.
//
// Run: `STORYBOOK_PORT=6116 npm run test:e2e:storybook -- tests/storybook/model-viewer.spec.ts`

import { test, expect, type Page, type Locator } from '@playwright/test';

// Headless Chromium on a GPU-less runner has no hardware WebGL; SwiftShader
// is the software path. Harmless where a GPU exists.
test.use({ launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] } });

const READY_MS = 30000;

async function openStory(page: Page, id: string, width: number) {
  await page.setViewportSize({ width, height: 900 });
  // No turntable (reduced motion), so two screenshots of a still view match.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`/iframe.html?id=${id}&viewMode=story`);
}

async function waitReady(root: Locator) {
  await expect(root).toHaveAttribute('data-model-viewer-state', 'ready', { timeout: READY_MS });
}

/** Mean absolute per-channel difference (0..255) between two PNG screenshots, decoded in the page. */
async function pixelDiff(page: Page, a: Buffer, b: Buffer): Promise<number> {
  return page.evaluate(async ([x, y]) => {
    const decode = async (b64: string) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0, 0, c.width, c.height).data;
    };
    const [p, q] = await Promise.all([decode(x), decode(y)]);
    if (p.length !== q.length) return 255;
    let sum = 0;
    for (let i = 0; i < p.length; i += 4) sum += Math.abs(p[i]! - q[i]!) + Math.abs(p[i + 1]! - q[i + 1]!) + Math.abs(p[i + 2]! - q[i + 2]!);
    return sum / ((p.length / 4) * 3);
  }, [a.toString('base64'), b.toString('base64')] as const);
}

async function layout(page: Page) {
  return page.evaluate(() => {
    const r = (sel: string) => {
      const b = document.querySelector(sel)!.getBoundingClientRect();
      return { left: Math.round(b.left), top: Math.round(b.top), right: Math.round(b.right), bottom: Math.round(b.bottom), width: Math.round(b.width), height: Math.round(b.height) };
    };
    const refFrame = document.querySelector('[data-model-viewer-reference] > span')!.getBoundingClientRect();
    const canvas = document.querySelector('model-viewer')!.shadowRoot?.querySelector('canvas');
    return {
      frame: r('[data-model-viewer-frame]'),
      element: r('model-viewer'),
      reference: { left: Math.round(refFrame.left), top: Math.round(refFrame.top), width: Math.round(refFrame.width), height: Math.round(refFrame.height), bottom: Math.round(refFrame.bottom) },
      canvas: canvas ? { width: canvas.width, height: canvas.height } : null,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

for (const width of [1280, 390]) {
  test(`ModelViewer at ${width}px: the cube renders, the frame keeps its aspect beside or above the reference`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await openStory(page, 'shared-modelviewer--default', width);
    const root = page.getByTestId('model-default');
    await waitReady(root);
    const g = await layout(page);
    console.log('model-viewer', width, JSON.stringify(g));

    expect(g.canvas, 'model-viewer drew a WebGL canvas').not.toBeNull();
    expect(Math.abs(g.frame.width - g.frame.height), 'square frame').toBeLessThanOrEqual(1);
    expect(Math.abs(g.element.width - g.frame.width)).toBeLessThanOrEqual(2);
    expect(Math.abs(g.element.height - g.frame.height)).toBeLessThanOrEqual(2);
    expect(Math.abs(g.reference.height - g.frame.height), 'reference same height').toBeLessThanOrEqual(1);
    expect(Math.abs(g.reference.width - g.frame.width)).toBeLessThanOrEqual(1);
    if (width === 1280) {
      expect(Math.abs(g.reference.top - g.frame.top), 'side by side').toBeLessThanOrEqual(1);
      expect(g.reference.left).toBeGreaterThan(g.frame.right);
    } else {
      expect(g.reference.top, 'stacked').toBeGreaterThan(g.frame.bottom);
      expect(Math.abs(g.reference.left - g.frame.left)).toBeLessThanOrEqual(1);
    }
    expect(g.overflowX, 'no horizontal overflow').toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test('ModelViewer: a channel switch changes data-model-viewer-channel and the rendered pixels', async ({ page }) => {
  await openStory(page, 'shared-modelviewer--default', 1280);
  const root = page.getByTestId('model-default');
  await waitReady(root);
  const frame = root.locator('[data-model-viewer-frame]');
  // Let the first frames settle, then prove two shots of the still view match.
  await page.waitForTimeout(1000);
  const lit1 = await frame.screenshot();
  await page.waitForTimeout(300);
  const lit2 = await frame.screenshot();
  const noise = await pixelDiff(page, lit1, lit2);

  const toggle = page.getByRole('radiogroup', { name: 'Texture channel' });
  await expect(toggle.getByRole('radio')).toHaveText(['Lit', 'Base colour', 'Normal']);
  await toggle.getByRole('radio', { name: 'Normal' }).click();
  await expect(root).toHaveAttribute('data-model-viewer-channel', 'normal');
  await page.waitForTimeout(800);
  const normal = await frame.screenshot();
  const changed = await pixelDiff(page, lit1, normal);

  await toggle.getByRole('radio', { name: 'Lit' }).click();
  await expect(root).toHaveAttribute('data-model-viewer-channel', 'lit');
  await page.waitForTimeout(800);
  const back = await frame.screenshot();
  const restored = await pixelDiff(page, lit1, back);
  console.log('channel pixel diff', JSON.stringify({ noise, changed, restored }));

  // Software WebGL shimmers a little between two shots of a still view
  // (about 1/255); the channel switch must dwarf it, and Lit must come back.
  expect(changed, 'Normal channel changed the canvas').toBeGreaterThan(10);
  expect(noise, 'a still view is stable next to the change').toBeLessThan(changed / 10);
  expect(restored, 'Lit restored the view').toBeLessThan(changed / 10);
});

test('ModelViewer: a part click sets data-model-viewer-part and lights the mesh', async ({ page }) => {
  await openStory(page, 'shared-modelviewer--parts', 1280);
  const root = page.getByTestId('model-parts');
  await waitReady(root);
  const frame = root.locator('[data-model-viewer-frame]');
  // The legs are a small block under the body: compare the bottom-centre of
  // the frame, where they sit in the default camera.
  const fb = (await frame.boundingBox())!;
  const clip = { x: fb.x + fb.width * 0.35, y: fb.y + fb.height * 0.7, width: fb.width * 0.3, height: fb.height * 0.2 };
  await page.waitForTimeout(1000);
  const before = await page.screenshot({ clip });
  await page.getByRole('button', { name: 'Legs' }).click();
  await expect(root).toHaveAttribute('data-model-viewer-part', 'legs');
  await expect(page.getByRole('button', { name: 'Legs' })).toHaveAttribute('aria-pressed', 'true');
  await page.mouse.move(0, 0); // leave hover so only the selection highlights
  await page.waitForTimeout(800);
  const after = await page.screenshot({ clip });
  const diff = await pixelDiff(page, before, after);
  console.log('part highlight pixel diff', diff);
  expect(diff, 'the selected part is lit on the mesh').toBeGreaterThan(2);
  await page.getByRole('button', { name: 'Legs' }).click();
  await expect(root).toHaveAttribute('data-model-viewer-part', '');
});

test('FrameStrip at 390px: thumbnails scroll inside the column; slider and arrows change the frame', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/iframe.html?id=shared-framestrip--narrow-column&viewMode=story');
  const strip = page.getByTestId('frames-narrow');
  await strip.waitFor();
  const g = await page.evaluate(() => {
    const strip = document.querySelector('[data-testid="frames-narrow"]')!;
    const row = strip.querySelector('[data-frame-strip-thumbnails]') as HTMLElement;
    return {
      stripWidth: Math.round(strip.getBoundingClientRect().width),
      rowWidth: Math.round(row.getBoundingClientRect().width),
      rowScrollWidth: row.scrollWidth,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  console.log('frame-strip', JSON.stringify(g));
  expect(g.rowWidth).toBeLessThanOrEqual(g.stripWidth);
  expect(g.rowScrollWidth, 'the row has more frames than fit').toBeGreaterThan(g.rowWidth);
  expect(g.overflowX).toBeLessThanOrEqual(0);

  const img = strip.locator('[data-frame-strip-current]');
  const first = await img.getAttribute('src');
  const slider = strip.getByRole('slider', { name: 'Frame' });
  // Drag the scrubber thumb to the far end.
  const box = (await slider.boundingBox())!;
  await page.mouse.move(box.x + 4, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width - 2, box.y + box.height / 2, { steps: 8 });
  await page.mouse.up();
  await expect(strip).toHaveAttribute('data-frame-strip-index', '19');
  expect(await img.getAttribute('src')).not.toBe(first);
  await expect(strip.getByText('Frame 20 of 20')).toBeVisible();
  // The current thumbnail scrolled into view at the end of the row.
  const scrolled = await page.evaluate(() => (document.querySelector('[data-testid="frames-narrow"] [data-frame-strip-thumbnails]') as HTMLElement).scrollLeft);
  expect(scrolled).toBeGreaterThan(0);

  // Arrow keys on the strip.
  await strip.focus();
  await page.keyboard.press('Home');
  await expect(strip).toHaveAttribute('data-frame-strip-index', '0');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(strip).toHaveAttribute('data-frame-strip-index', '2');
  expect(await img.getAttribute('src')).not.toBe(first);
  // And on the scrubber itself (native range keys), one step per press.
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(strip).toHaveAttribute('data-frame-strip-index', '3');
});
