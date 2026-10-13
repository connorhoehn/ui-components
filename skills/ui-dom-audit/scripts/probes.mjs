/**
 * Read-only interaction probes. A state's `enter(page, { probes })` calls one
 * and returns its result; the runner hands that result to `measureDOM` as
 * `probe`, where the `record-popout` and `selection-shift` rules judge it.
 *
 * Every probe blocks each non-GET/HEAD/OPTIONS request while it runs and
 * reports what it stopped (`blockedWrites`): activating a row or toggling a
 * selection must never change business state.
 */
const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);
const INTERACTIVE = 'a[href], button, input, select, textarea, label, [role="button"], [role="checkbox"], [role="link"], [role="menuitem"], [contenteditable="true"], [tabindex]:not([tabindex="-1"])';

async function readOnly(page, run) {
  const blockedWrites = [];
  const guard = route => {
    const request = route.request();
    if (SAFE.has(request.method())) return route.fallback();
    blockedWrites.push(`${request.method()} ${new URL(request.url()).pathname}`);
    return route.abort('blockedbyclient');
  };
  await page.route('**/*', guard);
  try { return { ...(await run()), blockedWrites }; }
  finally { await page.unroute('**/*', guard); }
}

/** Wait (bounded) for the URL to change or a dialog-like surface to appear. */
async function settle(page, beforeUrl, timeout) {
  await page.waitForFunction(before => location.href !== before
    || [...document.querySelectorAll('[role="dialog"], [role="alertdialog"], dialog[open], [data-ui-dialog]')].some(el => el.getBoundingClientRect().width > 0),
  beforeUrl, { timeout }).catch(() => undefined);
  // Leave the pointer off the activated row so a hover preview cannot pose as a popout.
  await page.mouse.move(1, 1);
}

/**
 * Activate a visible body row of the first matching collection table:
 * a focusable row is clicked on a cell that holds no control of its own (never
 * a selection checkbox or row action); a row that is not focusable but carries a
 * link is opened through that link. `via: 'enter'` focuses the row and presses Enter.
 */
export async function activateRow(page, { rows, via = 'click', attempts = 3, timeout = 4000 }) {
  return readOnly(page, async () => {
    const all = page.locator(rows);
    await all.first().waitFor({ state: 'visible', timeout });
    const beforeUrl = page.url();
    // The first row may already be the open record (a page that preselects
    // one): activating it changes nothing. Try the next rows, at most
    // `attempts`, and report the first activation that did something.
    const count = Math.min(attempts, await all.count());
    let result;
    for (let n = 0; n < count; n++) {
      const row = all.nth(n);
      if (!(await row.isVisible())) continue;
      const target = await row.evaluate((tr, interactive) => {
        const cells = [...tr.children].filter(td => td.matches('td, th'));
        const plain = cells.findIndex(td => !td.querySelector(interactive) && td.textContent.trim());
        const focusable = tr.tabIndex >= 0 || ['link', 'button'].includes(tr.getAttribute('role'));
        if (!focusable && tr.querySelector('td a[href]')) return { mode: 'link' };
        return { mode: focusable ? 'row' : 'inert-row', cell: plain < 0 ? 0 : plain };
      }, INTERACTIVE);
      const text = (await row.innerText()).replace(/\s+/g, ' ').trim().slice(0, 80);
      const urlBefore = page.url();
      if (target.mode === 'link') await row.locator('td a[href]').first().click();
      else if (via === 'enter' && target.mode === 'row') { await row.focus(); await page.keyboard.press('Enter'); }
      else await row.locator(':scope > td, :scope > th').nth(target.cell).click();
      await settle(page, urlBefore, timeout);
      result = { kind: 'row-activation', trigger: 'row', via: target.mode === 'link' ? 'link' : via, row: text, attempt: n + 1, beforeUrl, afterUrl: page.url() };
      const opened = await page.evaluate(() => [...document.querySelectorAll('[role="dialog"], [role="alertdialog"], dialog[open], [data-ui-dialog]')].some(el => el.getBoundingClientRect().width > 0));
      if (page.url() !== beforeUrl || opened) break;
    }
    return result;
  });
}

/**
 * Press a record-detail action (Revision history, Details, History …) inside
 * `scope`. `candidates` (CSS) narrows which buttons qualify — e.g. not a rail's
 * disclosure heading that happens to be named "History".
 */
export async function recordAction(page, { scope = 'body', name, candidates, timeout = 4000 }) {
  return readOnly(page, async () => {
    let match = page.locator(scope).getByRole('button', { name });
    if (candidates) match = match.and(page.locator(candidates));
    const button = match.first();
    await button.waitFor({ state: 'visible', timeout });
    const label = (await button.getAttribute('aria-label')) ?? (await button.innerText()).trim();
    const beforeUrl = page.url();
    await button.click();
    await settle(page, beforeUrl, timeout);
    return { kind: 'row-activation', trigger: 'record-action', label, beforeUrl, afterUrl: page.url() };
  });
}

/**
 * Check, measure, then uncheck the first visible row-selection checkbox and
 * measure again: the table's top edge and its first body row must not move.
 */
export async function toggleSelection(page, { checkbox, timeout = 4000 }) {
  return readOnly(page, async () => {
    const box = page.locator(checkbox).first();
    await box.waitFor({ state: 'visible', timeout });
    const geometry = () => box.evaluate(input => {
      const table = input.closest('table');
      const row = table?.querySelector('tbody > tr');
      if (!table || !row) throw new Error('Selection checkbox is not inside a table body');
      const t = table.getBoundingClientRect(), r = row.getBoundingClientRect();
      const round = v => Math.round(v * 100) / 100;
      return { tableTop: round(t.top), rowTop: round(r.top), rowBottom: round(r.bottom), rowLeft: round(r.left), checked: input.checked ?? input.getAttribute('aria-checked') === 'true' };
    });
    const frames = () => page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    const before = await geometry();
    await box.click(); await frames();
    const during = await geometry();
    await box.click(); await frames();
    const after = await geometry();
    return { kind: 'selection', before, during, after, toggled: during.checked !== before.checked && after.checked === before.checked };
  });
}

export const probes = { activateRow, recordAction, toggleSelection };
