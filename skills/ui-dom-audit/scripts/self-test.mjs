#!/usr/bin/env node
/** Real-browser mutation tests: a clean four-column fixture, then deliberate defects. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseAuditArgs } from './cli-options.mjs';
import { measureDOM } from './measure.mjs';
import { runAudit, summarize, validateContract, consistencyOutliers, loadContract, measureCase, isDeepRule, withRuleOptions } from './run.mjs';
import { probes } from './probes.mjs';
const project = process.argv[process.argv.indexOf('--project') + 1];
if (!project || !process.argv.includes('--project')) throw new Error('Usage: node self-test.mjs --project <package with @playwright/test>');
const { chromium } = createRequire(path.resolve(project, 'package.json'))('@playwright/test');
const fullContract = JSON.parse(fs.readFileSync(new URL('../references/work-ui.contract.json', import.meta.url)));
validateContract(fullContract);
// The deep-audit rules (references/deep-audit.md) have their own fixtures below; the
// four-column fixture and the runner tests keep judging the established rule set.
const DEEP_KINDS = new Set(['fingerprint', 'blank-band', 'table-first', 'narrow-block', 'alignment-grid', 'baseline', 'icon-center', 'scroll-owner', 'content-share', 'content-honesty', 'a11y-names', 'contrast', 'heading-order', 'landmarks', 'composer-readonly', 'layer', 'focus-walk', 'tab-stability', 'data-state', 'geometry-snapshot', 'text-fragmented', 'leading-separator', 'selection-column', 'column-hog', 'marker-first-line', 'pane-budget']);
const contract = { ...fullContract, rules: fullContract.rules.filter(r => !DEEP_KINDS.has(r.kind)) };
assert.ok(fullContract.rules.filter(r => DEEP_KINDS.has(r.kind)).length >= DEEP_KINDS.size, 'every deep rule kind is bound in the shipped contract');
assert.ok(fullContract.rules.every(r => (r.deep === true) === DEEP_KINDS.has(r.kind)), 'exactly the deep-audit rules carry deep: true');
assert.deepEqual(loadContract().rules.length, fullContract.rules.length, 'loadContract reads the shipped contract');
assert.throws(() => validateContract({ version: 1, rules: [{ id: 'x', kind: 'count', deep: 'yes' }] }), /deep must be boolean/);
const selectors = {
  graphDetailLabels: '[data-ui-text="graph-detail"]', graphMetadataLabels: '[data-ui-text="graph-metadata"]', activePersonCaptions: '[data-ui-text="active-person-caption"]',
  codeLabels: 'code, input[data-ui-text="code"]', railCaptionLabels: '.rail-label, button[data-heading="label"][data-focus-key^="g:"] > span, [data-ui-text="rail-caption"]', railItemLabels: '[data-ui-text="rail-item"]', conversationLabels: '.conversation-label', conversationMetadata: '.conversation-meta', decorativeText: '[aria-hidden="true"]', rowMenuGlyphs: '.row-glyph', keyboardHints: 'kbd', captions: '[data-ui-text="caption"]', tenantControl: '.no-brand', tickerControl: '.no-ticker', avatarControl: '[data-ui-text="avatar"]', header: '#header', footer: '#footer', footerRow: '#footer', shellColumns: '#shell', nestedColumns: '.no-nested', workspaceColumns: '#workspace', splitColumns: '.no-split',
  controls: 'button,input,select,textarea,[role="button"]', nativeSelects: 'select:not([data-ui-native-select][data-ui-native-reason]), select[data-ui-native-reason=""], input[list], datalist', unmarkedListboxes: '[role="listbox"]:not([data-ui-listbox])', listboxOptions: '[data-ui-listbox] [role="option"]', openListboxes: '[data-ui-listbox]', railHeaders: '.rail-caption', toolbarControls: '#toolbar button', collections: '#collection', collectionToolbars: '#toolbar', sectionTitles: '#section',
  tables: 'table', collectionTables: '[data-collection-table] table', composers: '#shelf', nestedComposers: '#shelf [data-composer-surface]', composerBoundary: '#content',
  // composer.last: the column a composer docks at the bottom of, and the dock that holds it.
  composerColumns: '#content', composerDocks: '#shelf-wrapper',
  // panel.inset / panel.empty-height: anchored panels and the library EmptyState marker.
  panels: '[role="dialog"], [role="alertdialog"], dialog[open], [data-ui-dialog]', emptyStates: '[data-ui-empty]',
  // section.empty-row: page sections (PageSection's data-ui-section).
  sections: '[data-ui-section]',
  // The content-column rules (gutter, header alignment, one title, containment, sparse tiles):
  // the column is the trail's parent, the trail band's padding is the reading edge.
  contentColumns: ':has(> [data-trail])', trail: '[data-trail]',
  containedControls: 'button, a[href], [role="tab"], input, select, textarea', containmentRegions: '#content, aside, nav, [data-column]',
  tileLists: '[role="list"]',
  popovers: '[data-ui-dialog="popover"]', boards: '[data-ui-board]', boardLanes: '[data-ui-board-lane]',
};
const html = `<!doctype html><html><head><style>
:root { --ui-control-sm:28px; --ui-page-gutter:24px; --ui-table-inset:12px; --ui-table-row:44px; --ui-content-gutter:16px; }
*{box-sizing:border-box} body{margin:0;font:14px system-ui,-apple-system,sans-serif} #header,#footer{height:44px} #shell{height:712px;display:flex} aside{width:180px;flex:none} main{flex:1;min-width:0} #workspace{display:flex;height:100%} #secondary{width:180px;flex:none} #right{width:180px;flex:none} #content{position:relative;flex:1;min-width:0} #section{padding:8px 24px} #collection{padding:0} #toolbar{padding:0 12px;display:flex;gap:8px} .control{height:28px;font:12px system-ui,-apple-system,sans-serif;border:1px solid black} table{border-collapse:collapse;width:100%;font:14px system-ui,-apple-system,sans-serif} th{font-size:12px;font-weight:600} td{padding:0 12px;height:44px} #shelf-wrapper{position:absolute;bottom:0;left:0;right:0} #shelf{position:relative;padding:8px var(--ui-content-gutter);width:100%} #shelf:before{content:'';position:absolute;inset:0;background-image:radial-gradient(white,transparent);pointer-events:none} [contenteditable]{position:relative;min-height:28px}
</style></head><body><header id="header">Workspace <button class="control"><span class="rail-label" style="font-size:12px">Group</span><span class="conversation-label" style="font-size:14px">Person</span><span class="conversation-meta" style="font-size:12px">Now</span><code style="font-size:11px;font-family:monospace">ID-123</code><span class="avatar" data-ui-text="avatar" style="font-size:9.12px">AB</span></button></header><div id="shell"><aside>Primary<section><h3><button class="control" data-heading="label" data-focus-key="g:fixture"><span id="group-label" style="font-size:12px">Projects</span><span id="group-count" style="font-size:12px">2</span></button></h3><ul><li><button class="control"><span data-ui-rail-leading="indicator" style="display:inline-block;width:8px;height:6px"></span><span id="rail-title" data-ui-text="rail-item" style="font-size:14px;font-weight:500;line-height:20px">Sample initiative</span></button><button id="rail-sibling-action" class="control" style="font-size:14px">Open</button></li></ul></section></aside><main><div id="workspace"><nav id="secondary">Secondary</nav><section id="content"><div id="section">Section</div><div role="button"><span data-ui-text="graph-detail" style="font-size:12px">Graph detail</span><span data-ui-text="graph-metadata" style="font-size:12px">Revision</span><button class="control" id="graph-nested-action">Open graph</button></div><button class="control"><span data-ui-text="active-person-caption" style="font-size:12px;font-weight:500">Person</span></button><div id="collection"><div id="toolbar"><button class="control">Action</button></div><div data-collection-table data-collection-rows="activatable"><table><thead><tr><th>Name</th><th>State</th></tr></thead><tbody><tr tabindex="0" style="cursor:pointer"><td>Record</td><td>Ready</td></tr></tbody></table></div></div><div id="shelf-wrapper"><div id="shelf" data-composer-surface><div contenteditable="true" role="textbox">Draft</div></div></div></section><aside id="right">Details<div id="dropzone" role="button" tabindex="0" data-ui-dropzone style="border:2px dashed #888">Drop files</div><button id="drop-sibling" class="control">Browse</button><div id="terminal" data-ui-code-surface="terminal"><textarea class="xterm-helper-textarea" aria-label="Terminal input" style="font-size:16px;font-family:monospace;width:8px;height:15px"></textarea></div></aside></div></main></div><footer id="footer">Footer <button id="overflow-count" class="control" data-ui-text="avatar" style="font-size:10px">+3</button></footer></body></html>`;
const browser = await chromium.launch({ headless: true });
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ui-dom-audit-tests-'));
const legacyContractPath = path.join(temp, 'legacy.contract.json'); fs.writeFileSync(legacyContractPath, JSON.stringify(contract));
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const payload = { contract, selectors, required: ['$header', '$footer', '$tables', '$composers'], composerExpectation: { mode: 'required' } };
  const measure = () => page.evaluate(measureDOM, payload);
  await page.setContent(html);
  // A one-person call must not become a full-width portrait; a manually
  // folded composer must remain a single row even with a retained draft.
  await page.setContent('<section data-call-dock data-layout="stage"><div data-dock-item style="width:416px;height:234px"></div></section><button data-composer-surface="collapsed" style="height:40px">Chat · Draft kept</button>');
  const compactContract = { ...fullContract, rules: fullContract.rules.filter(r => ['call.gallery.tile-width', 'composer.folded.height'].includes(r.id)) };
  const compactMeasure = () => page.evaluate(measureDOM, { contract: compactContract, selectors: {} });
  assert.deepEqual((await compactMeasure()).issues, []);
  await page.locator('[data-dock-item]').evaluate(el => { el.style.width = '900px'; });
  assert.ok((await compactMeasure()).issues.some(i => i.rule === 'call.gallery.tile-width'));
  await page.locator('[data-composer-surface]').evaluate(el => { el.style.height = '160px'; });
  assert.ok((await compactMeasure()).issues.some(i => i.rule === 'composer.folded.height'));
  await page.setContent(html);
  // Content-width segments must hug their last option even inside a stretch column.
  const segments = { ...fullContract, rules: fullContract.rules.filter(r => r.id.startsWith('control.segmented-content-width.')) };
  const segmentMeasure = () => page.evaluate(measureDOM, { contract: segments, selectors: {} });
  for (const [tone, padding] of [['neutral', 2], ['accent', 3]]) {
    await page.setContent(`<div style="display:flex;flex-direction:column;width:800px"><div data-segmented-width="content" data-segmented-tone="${tone}" style="display:inline-flex;align-self:start;border:1px solid;padding:${padding}px;gap:2px"><button>All</button><button>Missed</button></div><div data-segmented-width="full" data-segmented-tone="${tone}" style="display:flex;width:100%"><button>All</button><button>Missed</button></div></div>`);
    assert.deepEqual((await segmentMeasure()).issues, []);
    await page.locator('[data-segmented-width="content"]').evaluate(el => { el.style.alignSelf = 'stretch'; });
    assert.ok((await segmentMeasure()).issues.some(i => i.rule === `control.segmented-content-width.${tone}`));
  }
  await page.setContent(html);
  const refreshRules = { ...fullContract, rules: fullContract.rules.filter(r => r.id === 'collection.refresh-with-query') };
  const refreshMeasure = () => page.evaluate(measureDOM, { contract: refreshRules, selectors: {} });
  // Refresh belongs to the query group (data-collection-query), which since
  // 2.503.0 sits in the toolbar's trailing end — with the search open or
  // folded to its icon button. Valid: open field; valid: collapsed search
  // (an icon, no input). Defect: Refresh moved among the named actions.
  for (const search of ['<input aria-label="Search">', '<button aria-label="Search" aria-expanded="false" data-search-collapsed>S</button>']) {
    await page.setContent(`<div data-toolbar-variant="collection" style="display:flex"><div data-toolbar-controls><span>3 bots</span></div><div style="display:flex"><div data-collection-query style="display:flex">${search}<button aria-label="Refresh">Refresh</button></div><div id="trailing-actions" style="display:flex"><button aria-label="Add bot">+</button></div></div></div>`);
    assert.deepEqual((await refreshMeasure()).issues, [], search);
  }
  await page.evaluate(() => document.querySelector('#trailing-actions').append(document.querySelector('[aria-label="Refresh"]')));
  assert.ok((await refreshMeasure()).issues.some(i => i.rule === 'collection.refresh-with-query'));
  await page.setContent(html);
  const clean = await measure(); assert.deepEqual(clean.issues, [], JSON.stringify(clean.issues));
  assert.deepEqual((await measure()).samples, clean.samples, 'same DOM produces identical measurements');
  await page.evaluate(() => { const table = document.querySelector('table'); table.dataset.uiTableRows = 'content'; table.querySelector('tbody td').style.height = '180px'; });
  assert.equal((await measure()).issues.filter(i => i.rule.startsWith('table.')).length, 0, 'document prose may make a row taller');
  await page.evaluate(() => document.querySelector('tbody td').style.paddingLeft = '3px');
  assert.ok((await measure()).issues.some(i => i.rule === 'table.document-geometry'), 'document cells still obey their inset');
  await page.evaluate(() => { document.querySelector('tbody td').style.paddingLeft = '12px'; document.querySelector('table').removeAttribute('data-ui-table-rows'); });
  assert.ok((await measure()).issues.some(i => i.rule === 'table.geometry'), 'ordinary neighboring tables retain fixed row heights');
  await page.setContent(html);
  // Work tables intentionally share overview row anatomy, not comparison-table insets.
  await page.setContent(`<table data-ui-table-rows="work" style="border-collapse:collapse"><thead><tr><th style="font-size:12px;font-weight:600">Work</th></tr></thead><tbody><tr data-work-row style="height:44px"><td style="padding:0 10px"><span data-work-title style="font-size:14px;font-weight:500;line-height:20px">Fix alerts</span><div data-work-description style="font-size:12px;line-height:16px">ORG-OBS-11</div></td><td style="width:184px;padding:0"><span data-ui-text="avatar" style="display:block;width:24px;height:24px"></span></td></tr></tbody></table>`);
  const workMeasure = () => page.evaluate(measureDOM, { contract: { ...fullContract, rules: fullContract.rules.filter(r => r.id.startsWith('work.')) }, selectors: {}, context: {} });
  assert.equal((await workMeasure()).issues.length, 0, 'work profile accepts overview typography and columns');
  for (const [selector, property, value, rule] of [
    ['[data-work-title]', 'fontSize', '18px', 'work.title'],
    ['[data-work-description]', 'fontSize', '14px', 'work.secondary'],
    ['[data-work-row] > td:first-child', 'paddingLeft', '32px', 'work.title-inset'],
    ['[data-work-row] > td:nth-child(2)', 'width', '220px', 'work.owner-column'],
    ['[data-ui-text="avatar"]', 'width', '28px', 'work.portrait'],
  ]) {
    const prior = await page.locator(selector).evaluate((el, property) => el.style[property], property);
    await page.locator(selector).evaluate((el, [property, value]) => { el.style[property] = value; }, [property, value]);
    assert.ok((await workMeasure()).issues.some(i => i.rule === rule), `work profile rejects ${rule}`);
    await page.locator(selector).evaluate((el, [property, value]) => { el.style[property] = value; }, [property, prior]);
  }
  await page.setContent(html);
  // Real code-review geometry, including intentional nested marker/composer grids.
  const diffFixture = `<style>
    :root{--ui-table-inset:12px;--ui-table-row:44px;--ui-content-gutter:16px}
    *{box-sizing:border-box}body{margin:0;font:14px system-ui,sans-serif}
    main{width:600px;padding:24px} [data-trail]{height:24px}
    table{border-collapse:collapse;font:inherit} #ordinary td{height:44px;padding:0 12px}
    [data-ui-diff-scroll]{overflow-x:auto;width:240px}
    [data-diff-cell]{font:12px/18px monospace;padding-top:0;padding-bottom:0}
    [data-diff-cell=gutter]{padding-left:6px;padding-right:6px}
    [data-diff-cell=code]{padding-left:8px;padding-right:8px;white-space:pre}
    [data-ui-change-location]{padding:4px 8px;display:flex;gap:4px}
    [data-ui-change-diff-side]{padding:4px 8px;display:flex;gap:8px}
    [data-ui-composer-tools]{padding:4px 8px;display:flex;justify-content:flex-end}
    [data-ui-composer-modes]{padding:4px 12px;display:flex;justify-content:flex-end}
    button{font:12px system-ui,sans-serif}
    </style><main><div data-trail>Review</div>
    <div data-ui-change-location><span aria-hidden=true>@@</span><span>Document level</span></div>
    <div data-ui-change-diff-side><span aria-hidden=true>+</span><span>Proposed text</span></div>
    <div data-ui-diff-scroll><table data-ui-table-rows="code-diff"><tbody><tr data-diff-line=ctx>
    <td data-diff-cell=gutter>16</td><td data-diff-cell=gutter>16</td><td data-diff-cell=code>${'long_complete_identifier '.repeat(20)}</td>
    </tr></tbody></table></div>
    <table id=ordinary><tbody><tr><td>Neighbor</td><td>Ready</td></tr></tbody></table>
    <div data-ui-composer-tools=docked><button>Send</button></div>
    <div data-ui-composer-modes=docked><button>Help</button></div>
    <ol data-ui-procedure=md style="list-style:none;padding:0;margin:0"><li style="display:flex;gap:12px"><span aria-hidden=true style="display:block;flex:none;width:24px;height:24px">1</span><span>Run the command.</span></li></ol>
    <button data-ui-source-row style="display:flex;gap:12px;padding:0;border:0"><span aria-hidden=true style="width:32px;height:32px;flex:none"></span><span>Source title<br>Source description</span></button>
    <button data-ui-control=select data-ui-size=sm data-variant=default style="padding:0 6px 0 8px"><span>Select a record</span></button>
    <div id=neighbor>Ordinary prose</div></main>`;
  await page.setContent(diffFixture);
  const diffMeasure = () => page.evaluate(measureDOM, { contract: { ...fullContract, rules: fullContract.rules.filter(r => r.id.startsWith('source.row-') || r.id.startsWith('control.select-inset') || r.id.startsWith('procedure.') || r.id.startsWith('diff.') || r.id.startsWith('change.') || r.id.startsWith('composer.mode-inset') || r.id.startsWith('composer.tools-inset') || ['table.geometry','table.column-hog','align.grid','control.font-size'].includes(r.id)) }, selectors, context: {} });
  assert.deepEqual((await diffMeasure()).issues, [], 'code review and mode controls use their own measured inner grids');
  for (const [selector, property, value, rule] of [
    ['[data-diff-cell=code]', 'fontSize', '14px', 'diff.line-type'],
    ['[data-diff-cell=code]', 'fontFamily', 'serif', 'diff.line-type'],
    ['[data-diff-cell=code]', 'paddingLeft', '12px', 'diff.code-inset'],
    ['[data-diff-cell=code]', 'whiteSpace', 'normal', 'diff.code-inset'],
    ['[data-diff-cell=gutter]', 'paddingRight', '12px', 'diff.gutter-inset'],
    ['[data-diff-line]', 'height', '44px', 'diff.line-height'],
    ['[data-ui-diff-scroll]', 'overflowX', 'hidden', 'diff.scroll'],
    ['[data-ui-change-location]', 'paddingLeft', '20px', 'change.location-inset'],
    ['[data-ui-change-diff-side]', 'columnGap', '20px', 'change.diff-inset'],
    ['[data-ui-composer-tools]', 'paddingRight', '16px', 'composer.tools-inset-docked'],
    ['[data-ui-composer-tools] button', 'fontSize', '18px', 'control.font-size'],
    ['[data-ui-composer-modes]', 'paddingRight', '16px', 'composer.mode-inset-docked'],
    ['[data-ui-composer-modes] button', 'fontSize', '18px', 'control.font-size'],
    ['#ordinary td', 'height', '68px', 'table.geometry'],
    ['#ordinary td', 'paddingLeft', '8px', 'table.geometry'],
    ['[data-ui-procedure] > li', 'columnGap', '16px', 'procedure.marker-gap'],
    ['[data-ui-procedure] > li > span', 'width', '28px', 'procedure.marker-md'],
    ['[data-ui-source-row]', 'paddingLeft', '4px', 'source.row-inset'],
    ['[data-ui-source-row] > span', 'width', '28px', 'source.row-mark'],
    ['[data-ui-control=select]', 'paddingLeft', '12px', 'control.select-inset-field-sm'],
    ['[data-ui-control=select] > span', 'fontSize', '18px', 'control.font-size'],
    ['#neighbor', 'paddingLeft', '20px', 'align.grid'],
  ]) {
    await page.locator(selector).first().evaluate((el, [property, value]) => { el.style[property] = value; }, [property, value]);
    assert.ok((await diffMeasure()).issues.some(i => i.rule === rule), `code review profile rejects ${rule} at ${selector}`);
    await page.setContent(diffFixture);
  }
  for (const [size, left, right] of [['sm', 8, 6], ['md', 10, 8]]) for (const variant of ['default', 'ghost', 'pill']) {
    await page.locator('[data-ui-control=select]').evaluate((el, [size, variant, left, right]) => {
      el.dataset.uiSize = size; el.dataset.variant = variant;
      el.style.paddingLeft = `${left}px`; el.style.paddingRight = `${right}px`;
    }, [size, variant, left, variant === 'pill' ? right - 2 : right]);
    assert.deepEqual((await diffMeasure()).issues, [], `valid ${size} ${variant} selector inset`);
    await page.locator('[data-ui-control=select]').evaluate(el => { el.style.paddingRight = '20px'; });
    assert.ok((await diffMeasure()).issues.some(i => i.rule === `control.select-inset-${variant === 'pill' ? 'pill' : 'field'}-${size}`), 'selector variant rejects the wrong inset');
  }
  await page.setContent(diffFixture);
  await page.locator('[data-ui-table-rows="code-diff"]').evaluate(el => el.removeAttribute('data-ui-table-rows'));
  const ordinaryDiff = await diffMeasure();
  assert.ok(ordinaryDiff.issues.some(i => i.rule === 'table.geometry'), 'unmarked tables retain ordinary geometry checks');
  assert.ok(ordinaryDiff.issues.some(i => i.rule === 'table.column-hog'), 'unmarked overflowing tables retain column-share checks');
  await page.setContent(diffFixture);
  await page.locator('[data-ui-composer-modes]').evaluate(el => { el.dataset.uiComposerModes = 'compact'; el.style.padding = '4px 8px'; });
  assert.deepEqual((await diffMeasure()).issues, [], 'compact mode uses its 8px grid');
  await page.locator('[data-ui-composer-modes]').evaluate(el => { el.style.paddingLeft = '12px'; });
  assert.ok((await diffMeasure()).issues.some(i => i.rule === 'composer.mode-inset-compact'), 'compact mode rejects a docked inset');
  await page.setContent(html);
  const mutations = [
    ['graph detail typography drift', () => document.querySelector('[data-ui-text="graph-detail"]').style.fontSize='14px', 'graph.detail'],
    ['graph metadata typography drift', () => document.querySelector('[data-ui-text="graph-metadata"]').style.fontSize='8px', 'graph.metadata'],
    ['active person caption typography drift', () => document.querySelector('[data-ui-text="active-person-caption"]').style.fontSize='13px', 'people.active-caption'],
    ['ordinary nested graph control remains checked', () => document.querySelector('#graph-nested-action').style.fontSize='11px', 'control.font-size'],
    ['missing required composer', () => document.querySelector('#shelf').remove(), 'composer.presence'],
    ['empty composer surface', () => document.querySelector('#shelf [contenteditable]').remove(), 'composer.presence'],
    ['unrelated page textbox cannot replace composer input', () => { document.querySelector('#shelf [contenteditable]').remove(); const input = document.createElement('textarea'); document.querySelector('#content').prepend(input); }, 'composer.presence'],
    ['decorative rail indicator wastes title space', () => document.querySelector('[data-ui-rail-leading="indicator"]').style.width='24px', 'rail.indicator-width'],
    ['grouped rail caption drift', () => document.querySelector('#group-label').style.fontSize='13px', 'rail.disclosure-label'],
    ['grouped rail count drift', () => document.querySelector('#group-count').style.fontSize='9px', 'rail.disclosure-label'],
    ['grouped rail item size drift', () => document.querySelector('#rail-title').style.fontSize='13px', 'rail.item-label'],
    ['grouped rail item weight drift', () => document.querySelector('#rail-title').style.fontWeight='700', 'rail.item-label'],
    ['grouped rail item line-height drift', () => document.querySelector('#rail-title').style.lineHeight='24px', 'rail.item-label'],
    ['ordinary action beside rail title', () => document.querySelector('#rail-sibling-action').style.fontSize='13px', 'control.font-size'],
    ['rail caption drift', () => document.querySelector('.rail-label').style.fontSize='13px', 'rail.disclosure-label'],
    ['conversation label drift', () => document.querySelector('.conversation-label').style.fontSize='18px', 'conversation.label'],
    ['code family drift', () => document.querySelector('code').style.fontFamily='serif', 'code.typography'],
    ['unreadable overflow count', () => document.querySelector('#overflow-count').style.fontSize='6.8px', 'avatar.readability'],
    ['unreadable avatar', () => document.querySelector('.avatar').style.fontSize='6.8px', 'avatar.readability'],
    ['browser default button', () => { const b = document.createElement('button'); b.textContent = 'Unstyled'; document.querySelector('#content').append(b); }, 'control.font-family'],
    ['nested label font', () => { document.querySelector('#toolbar button').innerHTML='<span style="font-size:19px">Wrong label</span>'; }, 'control.font-size'],
    ['random font size', () => document.querySelector('#toolbar button').style.fontSize = '18px', 'control.font-size'],
    ['toolbar height', () => document.querySelector('#toolbar button').style.height = '38px', 'toolbar.control-height'],
    ['section padding', () => document.querySelector('#section').style.paddingLeft = '40px', 'section.gutter'],
    ['table row', () => document.querySelector('td').style.height = '68px', 'table.geometry'],
    ['table body type', () => document.querySelector('td').style.fontSize = '20px', 'table.geometry'],
    ['table padding', () => document.querySelector('td').style.paddingLeft = '31px', 'table.geometry'],
    ['composer padded ancestor', () => document.querySelector('#shelf-wrapper').style.padding = '12px', 'composer.surface'],
    ['full-page semantic self-boundary cannot hide ancestor padding', () => {
      const wrapper = document.querySelector('#shelf-wrapper'); wrapper.style.padding = '0 24px';
      const falseBoundary = document.createElement('div'); falseBoundary.setAttribute('data-collection-command-boundary', '');
      falseBoundary.append(document.querySelector('#shelf')); wrapper.append(falseBoundary);
    }, 'composer.surface'],
    ['oversized footer', () => document.querySelector('#footer').style.height = '72px', 'shell.footer.height'],
    ['fourth column gap', () => document.querySelector('#right').style.marginLeft = '20px', 'workspace.columns'],
    ['missing shell region', () => document.querySelector('#header').remove(), 'shell.header.count'],
    ['missing table', () => document.querySelector('table').remove(), 'coverage.required'],
    ['unmarked dashed control', () => document.querySelector('#dropzone').removeAttribute('data-ui-dropzone'), 'control.border-style'],
    ['ordinary button beside a dropzone', () => { document.querySelector('#drop-sibling').style.borderStyle = 'dashed'; }, 'control.border-style'],
    ['dropzone hosting a nested control loses its exemption', () => { const b = document.createElement('button'); b.className = 'control'; b.textContent = 'Browse'; document.querySelector('#dropzone').append(b); }, 'control.border-style'],
    ['unmarked terminal input helper', () => document.querySelector('#terminal').removeAttribute('data-ui-code-surface'), 'control.font-size'],
    ['ordinary textarea inside a terminal surface', () => { const t = document.createElement('textarea'); t.style.fontSize = '16px'; document.querySelector('#terminal').append(t); }, 'control.font-size'],
    ['composer padding off its token (16 expected, 20 drawn)', () => { document.querySelector('#shelf').style.paddingLeft = '20px'; }, 'composer.surface'],
    ['host-scoped token without the matching padding', () => { const shelf = document.querySelector('#shelf'); shelf.parentElement.style.setProperty('--ui-content-gutter', '20px'); shelf.style.padding = '8px 16px'; }, 'composer.surface'],
    ['ordinary control beside a host-scoped composer', () => { document.querySelector('#shelf-wrapper').style.setProperty('--ui-content-gutter', '20px'); document.querySelector('#toolbar button').style.fontSize = '18px'; }, 'control.font-size'],
    ['inert collection rows (no focus, no pointer, no link)', () => { const tr = document.querySelector('[data-collection-table] tbody tr'); tr.removeAttribute('tabindex'); tr.style.cursor = ''; }, 'collection.row-activatable'],
    ['focusable row without a pointer cursor', () => { document.querySelector('[data-collection-table] tbody tr').style.cursor = 'default'; }, 'collection.row-activatable'],
    ['static rows declared with a placeholder reason', () => { const host = document.querySelector('[data-collection-table]'); host.setAttribute('data-collection-rows', 'static'); host.setAttribute('data-collection-rows-reason', 'TODO'); }, 'collection.row-activatable'],
    ['static rows declared without a reason', () => { document.querySelector('[data-collection-table]').setAttribute('data-collection-rows', 'static'); }, 'collection.row-activatable'],
    ['monospace input without the code marker', () => { const i = document.createElement('input'); i.value = '0 */4 * * *'; i.style.cssText = 'font-family:monospace;font-size:12px;height:28px;border:1px solid black'; document.querySelector('#toolbar').append(i); }, 'control.font-family'],
    ['marked code input off the code profile', () => { const i = document.createElement('input'); i.value = '/docs/.*'; i.setAttribute('data-ui-text', 'code'); i.style.cssText = 'font-family:serif;font-size:12px;height:28px;border:1px solid black'; document.querySelector('#toolbar').append(i); }, 'code.typography'],
    ['raw native select', () => { const s = document.createElement('select'); s.className = 'control'; s.innerHTML = '<option>One</option>'; document.querySelector('#toolbar').append(s); }, 'control.native-select'],
    ['native select hidden behind a custom trigger', () => { const s = document.createElement('select'); s.style.display = 'none'; s.innerHTML = '<option>One</option>'; document.querySelector('#toolbar').append(s); }, 'control.native-select'],
    ['native select marked without a reason', () => { const s = document.createElement('select'); s.className = 'control'; s.setAttribute('data-ui-native-select', ''); s.setAttribute('data-ui-native-reason', ''); document.querySelector('#toolbar').append(s); }, 'control.native-select'],
    ['input bound to a datalist', () => { const i = document.createElement('input'); i.className = 'control'; i.setAttribute('list', 'dl'); const d = document.createElement('datalist'); d.id = 'dl'; d.innerHTML = '<option value="x">'; document.querySelector('#toolbar').append(i, d); }, 'control.native-select'],
    ['hand-rolled listbox without the library marker', () => { const u = document.createElement('ul'); u.setAttribute('role', 'listbox'); u.innerHTML = '<li role="option" style="font-size:14px">One</li>'; document.querySelector('#content').append(u); }, 'control.unmarked-listbox'],
    ['open listbox option off the type scale', () => { const u = document.createElement('ul'); u.setAttribute('role', 'listbox'); u.setAttribute('data-ui-listbox', 'select'); u.innerHTML = '<li role="option" style="font-size:16px">One</li>'; document.querySelector('#content').append(u); }, 'listbox.option-type'],
    ['open listbox option whose label text is 11px', () => { const u = document.createElement('ul'); u.setAttribute('role', 'listbox'); u.setAttribute('data-ui-listbox', 'select'); u.innerHTML = '<li role="option" style="font-size:14px"><span style="font-size:11px">One</span></li>'; document.querySelector('#content').append(u); }, 'listbox.option-type'],
    ['open listbox spilling out of the viewport', () => { const u = document.createElement('ul'); u.setAttribute('role', 'listbox'); u.setAttribute('data-ui-listbox', 'select'); u.style.cssText = 'position:fixed;top:780px;left:1200px;width:200px;margin:0;padding:0'; u.innerHTML = '<li role="option" style="font-size:14px;height:40px">One</li>'; document.body.append(u); }, 'listbox.in-viewport'],
    ['missing design token', () => document.documentElement.style.setProperty('--ui-control-sm', 'initial'), 'toolbar.control-height'],
  ];
  await page.setContent(html);
  await page.evaluate(() => { const u = document.createElement('ul'); u.setAttribute('role', 'listbox'); u.setAttribute('data-ui-listbox', 'select'); u.innerHTML = '<li role="option" style="font-size:14px">One <kbd style="font-size:11px">K</kbd></li>'; document.querySelector('#content').append(u); });
  const hinted = await measure();
  assert.deepEqual(hinted.issues.filter(i => i.rule === 'listbox.option-type'), [], 'a key hint inside an option is not judged by listbox.option-type: ' + JSON.stringify(hinted.issues));
  console.log('PASS an option with an 11px kbd hint passes listbox.option-type');
  for (const [name, mutate, rule] of mutations) {
    await page.setContent(html); await page.evaluate(mutate); const result = await measure();
    assert.ok(result.issues.some(issue => issue.rule === rule), `${name} must fail ${rule}: ${JSON.stringify(result.issues)}`);
    console.log('PASS detects ' + name);
  }
  await page.setContent(html);
  await page.evaluate(() => document.querySelector('#shelf-wrapper').style.setProperty('--ui-content-gutter', '20px'));
  const scoped = await measure();
  assert.deepEqual(scoped.issues, [], 'a composer padded to a host-scoped --ui-content-gutter (20px) passes: ' + JSON.stringify(scoped.issues));
  assert.ok(scoped.samples.some(x => x.rule === 'composer.surface' && x.property === 'paddingLeft' && x.expected === 20), 'the inset resolves on the surface element, not the document root');
  assert.ok(clean.samples.some(x => x.rule === 'composer.surface' && x.property === 'paddingLeft' && x.expected === 16), 'with no host override the token resolves to the 16px default');
  console.log('PASS composer inset follows --ui-content-gutter at 16 and at a host-scoped 20');
  // An embedded section is no longer a composer boundary (the composer docks
  // at the bottom of the content column, ui-components 2.448.0): a composer
  // inside a section inset from the column fails both its shelf and its band.
  await page.setContent(html);
  await page.evaluate(() => {
    const section = document.createElement('section'); section.style.margin = '0 24px';
    const ledger = document.createElement('div'); ledger.setAttribute('data-collection-command-boundary', 'embedded');
    ledger.append(document.querySelector('#shelf')); section.append(ledger); document.querySelector('#shelf-wrapper').append(section);
  });
  const embeddedInset = await measure();
  assert.ok(embeddedInset.issues.some(i => i.rule === 'composer.surface' && i.property === 'shelf left'), 'a composer in an inset section is measured against the content column');
  assert.ok(embeddedInset.issues.some(i => i.rule === 'composer.last' && i.property === 'band left margin'), 'its band has side margins inside the column');
  console.log('PASS full-page content boundary; an embedded section is not a composer boundary');
  await page.setContent(html);
  await page.evaluate(() => document.querySelector('#shelf').remove());
  const absencePayload = { ...payload, required: payload.required.filter(name => name !== '$composers') };
  const requiredWithoutWrapper = await page.evaluate(measureDOM, { ...absencePayload, contract: { ...contract, rules: contract.rules.filter(r => r.kind === 'composer-presence') } });
  assert.ok(requiredWithoutWrapper.issues.some(i => i.rule === 'composer.presence'), 'presence policy detects missing composer independently of geometry or required aliases');
  const exempt = await page.evaluate(measureDOM, { ...absencePayload, composerExpectation: { mode: 'exempt', reason: 'Read-only archived conversation does not accept new messages.' } });
  assert.deepEqual(exempt.issues, [], 'documented contextual exemption permits an absent composer');
  assert.ok(exempt.coverage.some(c => c.rule === 'composer.presence' && c.status === 'exempt' && c.reason.includes('Read-only')));
  const undocumented = await page.evaluate(measureDOM, { ...absencePayload, composerExpectation: { mode: 'exempt', reason: '  ' } });
  assert.ok(undocumented.issues.some(i => i.rule === 'composer.presence' && i.property === 'exemption reason' && i.category === 'coverage'), 'blank exemption must fail coverage');
  for (const reason of ['TODO', ' tbd. ', 'N/A', 'None', 'exempt', 'Not applicable', '...', 42, {}]) {
    const placeholder = await page.evaluate(measureDOM, { ...absencePayload, composerExpectation: { mode: 'exempt', reason } });
    assert.ok(placeholder.issues.some(i => i.rule === 'composer.presence' && i.property === 'exemption reason' && i.category === 'coverage'), `placeholder exemption must fail: ${JSON.stringify(reason)}`);
  }
  for (const composerExpectation of [{}, { mode: null }, { mode: 'require' }, { mode: false }, 'exempt', []]) {
    const malformed = await page.evaluate(measureDOM, { ...absencePayload, composerExpectation });
    assert.ok(malformed.issues.some(i => i.rule === 'composer.presence' && i.property === 'presence policy' && i.category === 'coverage'), `malformed policy must fail: ${JSON.stringify(composerExpectation)}`);
    assert.ok(malformed.coverage.some(c => c.rule === 'composer.presence' && c.status === 'invalid'), 'malformed policy is distinguished from unreviewed coverage');
  }
  await page.setContent(html);
  await page.evaluate(() => document.querySelector('#shelf-wrapper').style.paddingLeft = '24px');
  const exemptButMisaligned = await page.evaluate(measureDOM, { ...absencePayload, composerExpectation: { mode: 'exempt', reason: 'Read-only archived conversation does not accept new messages.' } });
  assert.ok(exemptButMisaligned.issues.some(i => i.rule === 'composer.surface'), 'an exemption cannot bypass geometry checks on a rendered composer');
  await page.setContent(html);
  await page.evaluate(() => document.querySelector('#shelf').remove());
  const unknown = await page.evaluate(measureDOM, { ...absencePayload, composerExpectation: undefined });
  assert.ok(unknown.coverage.some(c => c.rule === 'composer.presence' && c.status === 'unclassified'), 'unreviewed pages remain visibly unclassified');
  assert.equal(unknown.issues.length, 0, 'an unreviewed page is not automatically required to have a composer');
  console.log('PASS composer policy: required, contextual exemption, geometry under exemption, malformed modes, placeholder rejection and unclassified coverage');

  await page.setContent(html);
  await page.evaluate(() => { const i = document.createElement('input'); i.value = 'https://example.com/docs'; i.setAttribute('data-ui-text', 'code'); i.style.cssText = 'font-family:monospace;font-size:12px;height:28px;border:1px solid black'; document.querySelector('#toolbar').append(i); });
  assert.deepEqual((await measure()).issues, [], 'a marked code input (Input mono) is measured on the code profile');
  console.log('PASS a marked monospace input passes; unmarked or off-profile ones fail');
  await page.setContent(html);
  await page.evaluate(() => document.querySelector('#content').insertAdjacentHTML('beforeend', '<div class="doc-page" style="font-family:Arial"><div data-reading-contents><button class="control" style="font-family:inherit">1. Preparation</button></div></div>'));
  assert.deepEqual((await measure()).issues, [], 'embedded contents inherit the document paper font');
  await page.evaluate(() => document.querySelector('[data-reading-contents] button').style.fontFamily = 'serif');
  assert.ok((await measure()).issues.some(i => i.rule === 'document.contents-font'), 'contents with an unrelated font fail their own profile');
  await page.evaluate(() => { document.querySelector('[data-reading-contents] button').style.fontFamily = 'inherit'; document.querySelector('#toolbar button').style.fontFamily = 'Arial'; });
  assert.ok((await measure()).issues.some(i => i.rule === 'control.font-family'), 'an ordinary action beside the paper still uses the UI font');
  console.log('PASS document contents font and neighboring ordinary control mutation');

  await page.setContent(html);
  await page.evaluate(() => {
    const s = document.createElement('select'); s.className = 'control'; s.setAttribute('data-ui-native-select', ''); s.setAttribute('data-ui-native-reason', 'Mobile OS picker for a long list'); s.innerHTML = '<option>One</option>'; document.querySelector('#toolbar').append(s);
    const u = document.createElement('ul'); u.setAttribute('role', 'listbox'); u.setAttribute('data-ui-listbox', 'select'); u.style.cssText = 'position:fixed;top:100px;left:300px;width:200px;margin:0;padding:0'; u.innerHTML = '<li role="option" style="font-size:14px">One</li><li role="option" style="font-size:12px">Two</li>'; document.body.append(u);
  });
  assert.deepEqual((await measure()).issues, [], 'a reasoned native escape hatch and a marked, in-viewport listbox on the 12/14 scale pass');
  console.log('PASS dropdowns: a reasoned native select and a marked listbox pass; raw, hidden, unreasoned, datalist, unmarked, off-scale and off-screen ones fail');
  // Dock clearance: a pinned composer dock takes layout space. Content that
  // scrolls inside a scroller ending at the dock's top passes; content drawn
  // over (or under) the dock fails, wherever it comes from.
  {
    const pinned = () => { const shelf = document.querySelector('#shelf'); shelf.setAttribute('data-floating-composer-dock', ''); shelf.setAttribute('data-placement', 'pinned'); };
    await page.setContent(html); await page.evaluate(pinned);
    const docked = await measure();
    assert.deepEqual(docked.issues.filter(i => i.rule === 'dock.clearance'), [], `a pinned dock clear of the content passes: ${JSON.stringify(docked.issues)}`);
    assert.ok(docked.samples.some(x => x.rule === 'dock.clearance'), 'dock.clearance is exercised by the pinned fixture');
    await page.setContent(html); await page.evaluate(pinned);
    await page.evaluate(() => { const content = document.querySelector('#content'); const scroller = document.createElement('div');
      const dock = document.querySelector('#shelf-wrapper').getBoundingClientRect(), top = content.getBoundingClientRect().top;
      scroller.style.cssText = `position:absolute;left:0;right:0;top:0;height:${Math.floor(dock.top - top)}px;overflow-y:auto`;
      scroller.innerHTML = '<p style="height:1200px;margin:0">Long brief that scrolls above the dock</p><p>Its last line</p>'; content.append(scroller); });
    assert.deepEqual((await measure()).issues.filter(i => i.rule === 'dock.clearance'), [], 'content scrolling in a scroller that ends at the dock top passes');
    await page.setContent(html); await page.evaluate(pinned);
    await page.evaluate(() => { const p = document.createElement('p'); p.textContent = 'Next step drawn under the deck'; p.style.cssText = 'position:absolute;left:0;right:0;bottom:4px;margin:0;z-index:-1'; document.querySelector('#content').append(p); });
    assert.ok((await measure()).issues.some(i => i.rule === 'dock.clearance'), 'content painted inside the dock box fails');
    await page.evaluate(() => { const overlay = document.querySelector('#content > p'); overlay.setAttribute('data-uic-popover', ''); overlay.setAttribute('role', 'toolbar'); overlay.style.zIndex = '10'; });
    assert.deepEqual((await measure()).issues.filter(i => i.rule === 'dock.clearance'), [], 'floating controls use the established popover layer profile');
    await page.evaluate(() => { const ordinary = document.querySelector('#content > p').cloneNode(true); ordinary.removeAttribute('data-uic-popover'); document.querySelector('#content').append(ordinary); });
    assert.ok((await measure()).issues.some(i => i.rule === 'dock.clearance'), 'an ordinary toolbar beside the popup still cannot paint in the dock');
    console.log('PASS a pinned dock takes layout space; content under it fails, content scrolling above it passes');
    // An embedded command host is the LAST ROW of a scrolling column: it scrolls
    // with that column, and its box running past the column's bottom edge lies
    // over the shell chrome below only on paper (the column clips it). Same
    // geometry with the dock pinned outside the scroller is a real overlap.
    const embedded = (pinnedOutside) => page.evaluate((outside) => {
      document.querySelector('#shelf-wrapper').remove();
      const content = document.querySelector('#content');
      const col = document.createElement('div'); col.style.cssText = 'position:absolute;top:0;left:0;right:0;height:300px;overflow-y:auto';
      col.innerHTML = '<p style="height:400px;margin:0">Rows</p>';
      const dock = document.createElement('div'); dock.id = 'embedded-dock'; dock.setAttribute('data-floating-composer-dock', ''); dock.setAttribute('data-placement', 'pinned');
      dock.style.cssText = 'position:relative;height:120px'; dock.innerHTML = '<div data-composer-surface><div contenteditable="true" role="textbox">Command</div></div>';
      const chrome = document.createElement('p'); chrome.textContent = 'Footer status under the column'; chrome.style.cssText = 'position:absolute;left:0;right:0;top:305px;height:12px;margin:0;font-size:12px';
      content.append(col, chrome);
      if (outside) { dock.style.cssText = 'position:absolute;left:0;right:0;top:200px;height:120px'; content.append(dock); }
      else { col.append(dock); col.scrollTop = 200; }
    }, pinnedOutside);
    await page.setContent(html); await embedded(false);
    const flow = await measure();
    assert.deepEqual(flow.issues.filter(i => i.rule === 'dock.clearance'), [], `an embedded host scrolling with its column is not a pinned dock: ${JSON.stringify(flow.issues.filter(i => i.rule === 'dock.clearance'))}`);
    assert.ok(flow.samples.some(x => x.rule === 'dock.clearance' && /not pinned/.test(String(x.actual))), 'the embedded host is classified, not silently skipped');
    await page.setContent(html); await embedded(true);
    assert.ok((await measure()).issues.some(i => i.rule === 'dock.clearance'), 'the same overlap under a dock pinned outside the scroller still fails');
    console.log('PASS an embedded command host in the scroll flow passes; the same overlap under a pinned dock fails');
  }
  // A closed disclosure paints nothing: a control inside it that would overrun
  // the column is not judged (and cannot flip the measurement); opened, it is.
  {
    const disclosure = (open) => page.evaluate((isOpen) => {
      const d = document.createElement('details'); d.open = isOpen; d.innerHTML = '<summary>Bots pulling from this queue</summary><div style="width:4000px"><a id="hidden-link" href="/bots" style="margin-left:3000px">Manage bots</a></div>';
      document.querySelector('#collection').append(d);
    }, open);
    await page.setContent(html); await disclosure(false);
    const closed = await measure();
    assert.deepEqual(closed.issues.filter(i => i.rule === 'layout.contained-controls'), [], `a control inside a closed <details> is not painted, so not judged: ${JSON.stringify(closed.issues)}`);
    await page.setContent(html); await disclosure(true);
    assert.ok((await measure()).issues.some(i => i.rule === 'layout.contained-controls'), 'the same control in an open disclosure overruns its column and fails');
    console.log('PASS a closed disclosure\'s contents are not judged; opened, an overrunning control fails');
  }
  // Row activation: a row link or a static declaration with a reason is a valid
  // inert-looking row; an ordinary inert row beside them still fails.
  for (const [name, mutate] of [
    ['row opened by its link', () => { const tr = document.querySelector('[data-collection-table] tbody tr'); tr.removeAttribute('tabindex'); tr.style.cursor = ''; tr.firstElementChild.innerHTML = '<a href="/records/1">Record</a>'; }],
    ['rows declared static with a reason', () => { const host = document.querySelector('[data-collection-table]'); host.setAttribute('data-collection-rows', 'static'); host.setAttribute('data-collection-rows-reason', 'Read-only revisions of the open record.'); const tr = host.querySelector('tbody tr'); tr.removeAttribute('tabindex'); tr.style.cursor = ''; }],
  ]) {
    await page.setContent(html); await page.evaluate(mutate);
    const valid = await measure();
    assert.deepEqual(valid.issues.filter(i => i.rule === 'collection.row-activatable'), [], `${name} must pass: ${JSON.stringify(valid.issues)}`);
  }
  await page.setContent(html);
  await page.evaluate(() => { const host = document.querySelector('[data-collection-table]'); host.setAttribute('data-collection-rows', 'static'); host.setAttribute('data-collection-rows-reason', 'Read-only revisions of the open record.');
    const second = document.createElement('div'); second.setAttribute('data-collection-table', ''); second.innerHTML = '<table><tbody><tr><td>Other</td></tr></tbody></table>'; host.after(second); });
  assert.ok((await measure()).issues.some(i => i.rule === 'collection.row-activatable' && i.property === 'row activation'), 'a static declaration on one table cannot exempt a neighbouring collection');
  console.log('PASS row activation: activatable, linked and declared-static rows; inert rows, missing pointer, blank/placeholder reasons and a neighbouring table still fail');

  // Anchored popovers (popover.fit) and board lanes (board.lane-surface,
  // board.lane-columns): a footer bell's 99+ feed once grew past the window
  // and over its own trigger with the header scrolling away; a sprint board's
  // cards floated on the page with no lane behind them.
  const only = ids => ({ ...payload, required: [], composerExpectation: undefined, contract: { ...contract, rules: contract.rules.filter(r => ids.includes(r.id)) } });
  const surfaceHtml = `<!doctype html><html><head><style>
*{box-sizing:border-box} body{margin:0;font:14px system-ui;background:#eef1f5;height:800px}
#bell{position:fixed;left:300px;bottom:8px;width:28px;height:28px}
#panel{position:fixed;left:300px;width:360px;top:198px;height:560px;display:flex;flex-direction:column;background:#fff}
#panel h2{margin:0;height:40px;flex:none} #feed{flex:1;min-height:0;overflow-y:auto} #feed div{height:80px}
#board{display:grid;grid-template-columns:repeat(4,minmax(13rem,1fr));gap:12px;align-items:stretch;padding:16px;width:1100px}
[data-ui-board-lane]{background:rgba(15,23,42,0.04);border-radius:8px;padding:8px;min-height:192px} .card{height:60px;background:#fff;margin-bottom:8px}
</style></head><body>
<button id="bell" aria-haspopup="dialog" aria-expanded="true">B</button>
<div id="panel" role="dialog" data-ui-dialog="popover"><h2>Notifications</h2><div role="tablist"><button>Unread</button></div><div id="feed">${'<div>Item</div>'.repeat(40)}</div></div>
<div id="board" data-ui-board><section data-ui-board-lane><div class="card"></div><div class="card"></div><div class="card"></div></section><section data-ui-board-lane><div class="card"></div></section><section data-ui-board-lane><div data-board-lane-empty>No items</div></section><section data-ui-board-lane><div class="card"></div></section></div>
</body></html>`;
  const surfaceIds = ['popover.fit', 'board.lane-surface', 'board.lane-columns'];
  await page.setContent(surfaceHtml);
  const surfaces = await page.evaluate(measureDOM, only(surfaceIds));
  assert.deepEqual(surfaces.issues, [], 'a capped panel above its footer trigger with an inner feed, and tinted full-height lanes, pass: ' + JSON.stringify(surfaces.issues));
  assert.ok(surfaceIds.every(id => surfaces.coverage.some(c => c.rule === id && c.matched > 0)), 'each surface rule is exercised by the valid fixture');
  const validSurfaces = [
    ['a header-less menu clamped to the viewport may scroll as a whole', () => { const p = document.querySelector('#panel'); p.innerHTML = '<div style="height:2000px">Menu items</div>'; p.style.cssText += ';overflow-y:auto;top:8px;height:500px'; }],
    ['a lane on a dark page with a light tint is still distinct', () => { document.body.style.background = '#0f172a'; document.querySelectorAll('[data-ui-board-lane]').forEach(l => { l.style.background = 'rgba(241,245,249,0.04)'; }); }],
  ];
  for (const [name, mutate] of validSurfaces) {
    await page.setContent(surfaceHtml); await page.evaluate(mutate);
    const result = await page.evaluate(measureDOM, only(surfaceIds));
    assert.deepEqual(result.issues, [], `${name}: ${JSON.stringify(result.issues)}`);
    console.log('PASS allows ' + name);
  }
  const surfaceDefects = [
    ['popover grown past the top of the window', () => { const p = document.querySelector('#panel'); p.style.top = '-140px'; p.style.height = '900px'; }, 'popover.fit', 'y containment'],
    ['popover clamped over the trigger that opened it', () => { const p = document.querySelector('#panel'); p.style.top = '8px'; p.style.height = '784px'; }, 'popover.fit', 'covers trigger'],
    ['popover scrolling as a whole, carrying its header away', () => { const p = document.querySelector('#panel'); p.style.display = 'block'; p.style.overflowY = 'auto'; document.querySelector('#feed').style.overflowY = 'visible'; }, 'popover.fit', 'scroll region'],
    ['popover hanging off the right edge', () => { document.querySelector('#panel').style.left = '1100px'; }, 'popover.fit', 'x containment'],
    ['lane with no background (cards float on the page)', () => { document.querySelector('[data-ui-board-lane]').style.background = 'transparent'; }, 'board.lane-surface', 'backgroundColor'],
    ['lane painted the same as the page behind it', () => { document.querySelector('[data-ui-board-lane]').style.background = '#eef1f5'; }, 'board.lane-surface', 'backgroundColor'],
    ['lanes sized to their cards instead of the board height', () => { document.querySelector('#board').style.alignItems = 'start'; }, 'board.lane-columns', 'column bottom alignment'],
    ['lanes wrapped into a second row', () => { document.querySelector('#board').style.gridTemplateColumns = 'repeat(2, 1fr)'; }, 'board.lane-columns', 'column top alignment'],
  ];
  for (const [name, mutate, rule, property] of surfaceDefects) {
    await page.setContent(surfaceHtml); await page.evaluate(mutate);
    const result = await page.evaluate(measureDOM, only(surfaceIds));
    assert.ok(result.issues.some(i => i.rule === rule && i.property === property), `${name} must fail ${rule} (${property}): ${JSON.stringify(result.issues)}`);
    console.log('PASS detects ' + name);
  }
  await page.setContent(surfaceHtml);
  await page.evaluate(() => { const b = document.createElement('button'); b.setAttribute('aria-expanded', 'true'); b.style.cssText = 'position:fixed;left:310px;top:300px'; b.textContent = 'Rail group'; document.body.append(b); });
  assert.deepEqual((await page.evaluate(measureDOM, only(['popover.fit']))).issues, [], 'an expanded disclosure (no aria-haspopup) under the panel is not its trigger');
  console.log('PASS popover.fit judges only popup triggers; board lanes need a distinct surface and the full board height');
  await page.close();

  // Anchored panel sections (panel.inset, panel.empty-height): the footer
  // bell's empty Unread tab drew "All caught up" flush on the panel's edge
  // under an inset title and tab row, and kept its full fixed height with a
  // blank area under it. Every block shares the header's inset; an empty
  // panel shrinks to its content (the height cap is a maximum).
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const panelIds = ['panel.inset', 'panel.empty-height'];
    const panelHtml = `<!doctype html><html><head><style>
*{box-sizing:border-box} body{margin:0;font:14px system-ui;background:#eef1f5;height:800px}
#bell{position:fixed;left:300px;bottom:8px;width:28px;height:28px}
#panel{position:fixed;left:300px;bottom:44px;width:360px;max-height:560px;display:flex;flex-direction:column;background:#fff;border:1px solid #ccd;overflow:hidden}
#head{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;flex:none} #head h2{margin:0;font-size:14px}
#tabs{margin:0 16px;display:flex;gap:4px;flex:none} #tabs button{font:inherit;border:0;background:none;padding:6px 0}
#feed{flex:1;min-height:0;overflow-y:auto;padding:8px 0}
.empty{padding:8px 16px} .empty p{margin:0}
.row{display:block;width:100%;padding:12px 16px;border:0;background:none;text-align:left;font:inherit;height:72px}
#foot{flex:none;text-align:center;padding:6px 16px;border-top:1px solid #ccd}
</style></head><body>
<button id="bell" aria-haspopup="dialog" aria-expanded="true">B</button>
<div id="panel" role="dialog" data-ui-dialog="popover"><div id="head"><h2>Notifications</h2><button aria-label="Mark all read">✓</button></div>
<div id="tabs" role="tablist"><button role="tab">Unread</button><button role="tab">All</button></div>
<div id="feed"><div class="empty" data-ui-empty><p><b>All caught up</b></p><p>No unread notifications.</p></div></div>
<div id="foot"><button>See all activity</button></div></div>
</body></html>`;
    const pmeasure = () => page.evaluate(measureDOM, only(panelIds));
    await page.setContent(panelHtml);
    const clean = await pmeasure();
    assert.deepEqual(clean.issues, [], 'an empty panel at its content height with its empty state at the header inset passes: ' + JSON.stringify(clean.issues));
    assert.ok(panelIds.every(id => clean.coverage.some(c => c.rule === id && c.matched > 0)), 'each panel rule is exercised by the valid fixture');
    const validPanels = [
      ['a long feed capped at its max height with full-bleed rows whose text keeps the inset', () => { document.querySelector('#feed').innerHTML = '<button class="row">Sana Iqbal in #general</button>'.repeat(20); }],
      ['a header-less "Nothing new" panel with a centred empty state', () => { const p = document.querySelector('#panel'); p.innerHTML = '<div data-ui-empty style="display:flex;flex-direction:column;align-items:center;padding:24px 16px"><p style="margin:0">Nothing new</p><p style="margin:0">Activity will appear here.</p></div><div id="foot"><button>See all activity</button></div>'; }],
    ];
    for (const [name, mutate] of validPanels) {
      await page.setContent(panelHtml); await page.evaluate(mutate);
      const result = await pmeasure();
      assert.deepEqual(result.issues, [], `${name}: ${JSON.stringify(result.issues)}`);
      console.log('PASS allows ' + name);
    }
    const panelDefects = [
      ['an empty state flush on the panel edge under an inset header', () => { document.querySelector('.empty').style.padding = '8px 0'; }, 'panel.inset', 'left inset (ink left of the panel header)'],
      ['a feed row whose label runs to the panel edge', () => { document.querySelector('#feed').insertAdjacentHTML('beforeend', '<div style="text-align:right;padding:0 2px">Flush label</div>'); }, 'panel.inset', 'right inset (ink past the header inset)'],
      ['an empty panel kept at its full fixed height (blank under its footer)', () => { document.querySelector('#panel').style.height = '560px'; document.querySelector('#feed').style.flex = 'none'; }, 'panel.empty-height', 'blank band in an empty panel'],
      ['an empty fixed-height panel whose footer is pinned at its bottom', () => { const p = document.querySelector('#panel'); p.style.height = '560px'; document.querySelector('#feed').style.flex = '1'; }, 'panel.empty-height', 'blank band in an empty panel'],
    ];
    for (const [name, mutate, rule, property] of panelDefects) {
      await page.setContent(panelHtml); await page.evaluate(mutate);
      const result = await pmeasure();
      assert.ok(result.issues.some(i => i.rule === rule && i.property === property), `${name} must fail ${rule} (${property}): ${JSON.stringify(result.issues)}`);
      console.log('PASS detects ' + name);
    }
    console.log('PASS panel sections share the header inset; an empty panel shrinks to its content');
    await page.close();
  }

  // The column's composer is its last content (composer.last): a section's
  // command composer once sat mid-page on an inset band, with the page's
  // findings link and a disclosure after it and blank space to the footer.
  // Docked at the column's bottom it spans the column and nothing follows it.
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const lastIds = ['composer.last'];
    const lastSelectors = { ...selectors, composers: '[data-composer-surface]', composerColumns: '[data-col]', composerDocks: '[data-dock]' };
    const lastHtml = `<!doctype html><html><head><style>
*{box-sizing:border-box} body{margin:0;font:14px system-ui}
#col{display:flex;flex-direction:column;width:900px;height:600px;margin-left:200px}
#body{flex:1;min-height:0;overflow:auto;padding:0 24px} section{padding:8px 0}
[data-dock]{flex:none} [data-composer-surface]{padding:8px 16px;position:relative} [data-composer-surface]::before{content:'';position:absolute;inset:0;background-image:radial-gradient(#ccd 1px,transparent 1px)}
</style></head><body><div id="col" data-col><div id="body">
<section><h3>Needs your attention</h3><p>Nothing right now.</p></section>
<section id="runs"><h3>Recent runs</h3><table><tr><td>inference-canary-nightly</td></tr></table></section>
<a id="findings" href="#f">5 open findings →</a><details><summary>Queue operations</summary></details>
</div><div data-dock><div data-composer-surface><div contenteditable="true" role="textbox">Search runs…</div></div></div></div></body></html>`;
    const lmeasure = () => page.evaluate(measureDOM, { ...only(lastIds), selectors: lastSelectors });
    await page.setContent(lastHtml);
    const clean = await lmeasure();
    assert.deepEqual(clean.issues, [], 'a composer docked at the column bottom, spanning it, passes: ' + JSON.stringify(clean.issues));
    assert.ok(clean.coverage.some(c => c.rule === 'composer.last' && c.matched > 0), 'composer.last is exercised by the valid fixture');
    const validLast = [
      ['a call strip under the composer inside the same dock', () => { document.querySelector('[data-dock]').insertAdjacentHTML('beforeend', '<div>In call · 2 people</div>'); }],
      ['an open menu (a fixed layer) drawn below the composer', () => { document.body.insertAdjacentHTML('beforeend', '<div role="menu" style="position:fixed;left:300px;top:640px">Menu item</div>'); }],
      ['rows scrolled past the bottom of a list that ends above the dock', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<p style="height:900px;margin:0">Long list</p><p>Last row</p>'); }],
    ];
    for (const [name, mutate] of validLast) {
      await page.setContent(lastHtml); await page.evaluate(mutate);
      const result = await lmeasure();
      assert.deepEqual(result.issues, [], `${name}: ${JSON.stringify(result.issues)}`);
      console.log('PASS allows ' + name);
    }
    // Serialized into the page, so each mutation carries its own steps.
    const lastDefects = [
      ['a section composer followed by the page\'s findings link and disclosure', () => { document.querySelector('#runs').append(document.querySelector('[data-composer-surface]')); document.querySelector('[data-dock]').remove(); }, 'content below the composer'],
      ['content below the composer scrolled out of view', () => { document.querySelector('#runs').append(document.querySelector('[data-composer-surface]')); document.querySelector('[data-dock]').remove(); document.querySelector('#body').insertAdjacentHTML('afterbegin', '<p style="height:900px;margin:0">Long page</p>'); }, 'content below the composer'],
      ['a composer band with side margins inside its column', () => { document.querySelector('#runs').append(document.querySelector('[data-composer-surface]')); document.querySelector('[data-dock]').remove(); document.querySelector('#findings').remove(); document.querySelector('details').remove(); }, 'band left margin'],
    ];
    for (const [name, mutate, property] of lastDefects) {
      await page.setContent(lastHtml); await page.evaluate(mutate);
      const result = await lmeasure();
      assert.ok(result.issues.some(i => i.rule === 'composer.last' && i.property === property), `${name} must fail composer.last (${property}): ${JSON.stringify(result.issues)}`);
      console.log('PASS detects ' + name);
    }
    console.log('PASS the column\'s composer is its last content and spans it');
    await page.close();
  }

  // An empty page section takes one row (section.empty-row): /iq/work's
  // "Needs your attention" drew a heading over a two-line "Nothing needs your
  // attention right now…" block, two full rows of screen for nothing.
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const ids = ['section.empty-row'];
    const sectionHtml = `<!doctype html><html><head><style>
*{box-sizing:border-box} body{margin:0;font:14px system-ui;width:900px} section{display:flex;flex-direction:column;gap:8px;padding:8px 24px}
.row{display:flex;justify-content:space-between;align-items:center} .title{display:flex;align-items:baseline;gap:12px} h2{margin:0;font-size:14px}
</style></head><body>
<section id="empty" data-ui-section data-section-empty><div class="row"><div class="title"><h2>Needs your attention</h2><span data-ui-empty>Nothing right now</span></div><a href="#all">All runs →</a></div></section>
<section id="full" data-ui-section><div class="row"><div class="title"><h2>Recent runs</h2></div></div><p style="margin:0">inference-canary-nightly</p><p style="margin:0">obs-nightly-maintenance</p></section>
</body></html>`;
    const smeasure = () => page.evaluate(measureDOM, only(ids));
    await page.setContent(sectionHtml);
    const clean = await smeasure();
    assert.deepEqual(clean.issues, [], 'an empty section on one row and a section with content pass: ' + JSON.stringify(clean.issues));
    assert.ok(clean.coverage.some(c => c.rule === 'section.empty-row' && c.matched === 1), 'only the empty section is judged');
    const valid = [
      ['an empty state inside a nested section is judged on the nested one', () => { document.querySelector('#full').insertAdjacentHTML('beforeend', '<section data-ui-section><div class="title"><h2>Nested</h2><span data-ui-empty>None</span></div></section>'); }],
      ['a section whose empty state sits beside real content (a toolbar and a table) is not an empty section', () => { document.querySelector('#full').insertAdjacentHTML('beforeend', '<div data-ui-empty style="padding:24px">No run matches this search</div>'); }],
    ];
    for (const [name, mutate] of valid) {
      await page.setContent(sectionHtml); await page.evaluate(mutate);
      const result = await smeasure();
      assert.deepEqual(result.issues, [], `${name}: ${JSON.stringify(result.issues)}`);
      console.log('PASS allows ' + name);
    }
    const defects = [
      ['a heading over a "nothing here" block', () => { const s = document.querySelector('#empty'); s.querySelector('[data-ui-empty]').remove(); s.insertAdjacentHTML('beforeend', '<div data-ui-empty style="padding:12px 16px;border-left:3px solid #36c">Nothing needs your attention right now — agent questions and finished work awaiting review will show up here.</div>'); }],
      ['an empty line stacked under the title', () => { document.querySelector('#empty .title').style.flexDirection = 'column'; }],
    ];
    for (const [name, mutate] of defects) {
      await page.setContent(sectionHtml); await page.evaluate(mutate);
      const result = await smeasure();
      assert.ok(result.issues.some(i => i.rule === 'section.empty-row'), `${name} must fail section.empty-row: ${JSON.stringify(result.issues)}`);
      console.log('PASS detects ' + name);
    }
    console.log('PASS an empty page section is one row');
    await page.close();
  }

  // An empty collection draws no result chrome (collection.empty-chrome):
  // storymaker's Artwork page drew a full-width search band and "0 of 0
  // artworks" over its empty state, and a pager above nothing is the same
  // defect. A search that holds a query stays — it is the way back out.
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const ids = ['collection.empty-chrome'];
    const emptyHtml = `<!doctype html><html><head><style>
*{box-sizing:border-box} body{margin:0;font:14px system-ui;width:900px} [data-collection-page]{display:flex;flex-direction:column;gap:12px;padding:16px}
header{display:flex;justify-content:space-between;align-items:center} h1{margin:0;font-size:20px} [role=toolbar]{display:flex;gap:8px;align-items:center}
</style></head><body>
<div id="empty" data-collection-page><header data-testid="page-header"><h1>Artwork</h1><div><div role="toolbar" data-toolbar-variant="collection" data-collection-placement="header"><button aria-label="Search artworks">S</button><button aria-label="Filters">F</button></div><button>Generate artwork</button></div></header>
<div data-ui-empty><strong>No artwork yet</strong><p style="margin:0">Generate artwork to start the catalog.</p></div></div>
<div id="full" data-collection-page><header data-testid="page-header-2"><h1>Characters</h1></header><div role="toolbar" data-toolbar-variant="collection"><input type="text" aria-label="Search characters" value=""><span data-collection-summary>2 of 2 characters</span></div>
<ul><li data-collection-item>Mira</li><li data-collection-item>Oskar</li></ul><div data-collection-pager>Page 1 of 3</div></div>
</body></html>`;
    const emeasure = () => page.evaluate(measureDOM, only(ids));
    await page.setContent(emptyHtml);
    const clean = await emeasure();
    assert.deepEqual(clean.issues, [], 'an empty collection with header-hosted controls, and a full one with its chrome, pass: ' + JSON.stringify(clean.issues));
    assert.ok(clean.coverage.some(c => c.rule === 'collection.empty-chrome' && c.matched === 1), 'only the empty collection is judged: ' + JSON.stringify(clean.coverage));
    const valid = [
      ['a search band that holds a query over "no matches"', () => { document.querySelector('#empty [data-ui-empty]').insertAdjacentHTML('beforebegin', '<div role="toolbar" data-toolbar-variant="collection"><input type="text" aria-label="Search" value="moon"></div>'); }],
      ['an empty state beside real items (a side panel) does not make the collection empty', () => { document.querySelector('#full ul').insertAdjacentHTML('afterend', '<div data-ui-empty>No comments</div>'); }],
    ];
    for (const [name, mutate] of valid) {
      await page.setContent(emptyHtml); await page.evaluate(mutate);
      const result = await emeasure();
      assert.deepEqual(result.issues, [], `${name}: ${JSON.stringify(result.issues)}`);
      console.log('PASS allows ' + name);
    }
    const defects = [
      ['a marked count over the empty state', 'count while the collection is empty', () => { document.querySelector('#empty [data-ui-empty]').insertAdjacentHTML('beforebegin', '<span data-collection-summary>0 of 0 artworks</span>'); }],
      ['a hand-rolled "0 of 0 artworks" line', 'count while the collection is empty', () => { document.querySelector('#empty [data-ui-empty]').insertAdjacentHTML('beforebegin', '<p>0 of 0 artworks</p>'); }],
      ['a pager over the empty state', 'pager while the collection is empty', () => { document.querySelector('#empty').insertAdjacentHTML('beforeend', '<div data-collection-pager><button>Prev</button> Page 1 of 1 <button>Next</button></div>'); }],
      ['a full-width empty search band', 'search band while the collection is empty', () => { document.querySelector('#empty [data-ui-empty]').insertAdjacentHTML('beforebegin', '<div role="toolbar" data-toolbar-variant="collection"><input type="text" aria-label="Search artworks" value="" style="width:100%"></div>'); }],
    ];
    for (const [name, property, mutate] of defects) {
      await page.setContent(emptyHtml); await page.evaluate(mutate);
      const result = await emeasure();
      assert.ok(result.issues.some(i => i.rule === 'collection.empty-chrome' && i.property === property), `${name} must fail collection.empty-chrome (${property}): ${JSON.stringify(result.issues)}`);
      console.log('PASS detects ' + name);
    }
    console.log('PASS an empty collection draws its empty state and no result chrome');
    await page.close();
  }

  // Legible text (text.cramped, text.overlap, text.clipped,
  // placeholder.squeezed): a red callout split into side-by-side columns
  // left its message ~3 words wide and 12+ lines tall; a flow strip's labels
  // ran into the next column and off the strip; a docked composer's chips
  // squeezed its input until the placeholder read "Sear…".
  {
    const textIds = ['text.cramped', 'text.overlap', 'text.clipped', 'placeholder.squeezed'];
    const textHtml = `<!doctype html><html><head><style>
*{box-sizing:border-box} body{margin:0;font:14px system-ui,-apple-system,sans-serif;width:1280px}
.banner{display:flex;gap:8px;align-items:center;padding:10px 14px;font-size:13px;border:1px solid #c00;margin:8px} .banner > span{flex:1}
#narrow{width:330px} #wide{width:900px}
.strip{display:flex;border:1px solid #ccc;margin:8px;width:480px} .cluster{flex:1;min-width:0;padding:8px 16px} .label{font-size:12px;text-transform:uppercase;white-space:nowrap}
.label.truncate{overflow:hidden;text-overflow:ellipsis}
table{border-collapse:collapse;margin:8px} td{width:120px;max-width:120px;padding:0 12px;height:44px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.chip{display:inline-flex;font-size:12px;padding:2px 8px;border-radius:999px;border:1px solid #ccc;white-space:nowrap}
#rail{width:120px;margin:8px;font-size:13px} .avatar{position:relative;width:32px;height:32px;border-radius:50%;background:#ddd;display:grid;place-items:center;font-size:12px}
.badge{position:absolute;right:-4px;bottom:-4px;font-size:10px;background:#fff;border-radius:999px;padding:0 3px}
.row{display:flex;align-items:center;gap:6px;margin:8px;border:1px solid #ccc;padding:4px} .row > .grow{flex:1;min-width:0}
.row input{width:100%;font:14px system-ui;border:1px solid #999;padding:4px 8px} .pill{flex:none;font-size:12px;padding:2px 8px;white-space:nowrap}
#scroller{width:200px;overflow-x:auto;white-space:nowrap;margin:8px}
</style></head><body>
<div id="wide"><div class="banner" id="callout" role="alert"><strong>Guide updates stalled · Last run 12h ago</strong><span>10 patterns waiting for L2 and no compaction has run into it in 13h — trigger one by hand before the backlog grows further.</span><button>View runs →</button></div></div>
<div class="strip" id="strip"><button class="cluster" title="244 run notes"><div class="label truncate" title="L0 Run notes">L0 Run notes</div><div>244</div></button><button class="cluster"><div class="label truncate" title="L1 Patterns">L1 Patterns</div><div>22</div></button><button class="cluster"><div class="label truncate" title="L2 Guides &amp; findings">L2 Guides &amp; findings</div><div>11</div></button><button class="cluster" aria-label="Agent library linked guides: 7"><div class="label truncate">Agent library linked guides</div><div>7</div></button></div>
<table><tr><td title="A very long initiative name that truncates">A very long initiative name that truncates</td><td>Ready</td></tr></table>
<p><span class="chip">Compaction runs</span> <span class="chip">L2</span></p>
<div id="rail"><p>Pneumonoultramicroscopic</p><p>A short note for the rail that wraps a little.</p><div class="avatar">AB<span class="badge" data-ui-layered="Unread count badge sits over the avatar's corner">3</span></div></div>
<div class="row" id="search-row" style="width:320px"><div class="grow"><input placeholder="Search runs"></div><button class="pill">Filter</button></div>
<div class="row" id="composer-row" style="width:520px"><span class="pill">Agent</span><span class="pill">Compaction runs</span><div class="grow"><input id="cmd" placeholder="Search runs, filter, open a record, or refresh…"></div><button class="pill">Apply</button></div>
<div id="scroller"><span>Rows that scroll sideways inside their own frame keep going past the edge</span></div>
</body></html>`;
    const textMeasure = () => page2.evaluate(measureDOM, only(textIds));
    const page2 = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page2.setContent(textHtml);
    const textClean = await textMeasure();
    assert.deepEqual(textClean.issues, [], 'a wide callout, ellipsised labels with titles, truncated cells, chips, a single long word, a layered badge with a reason, a roomy search input and a scroller pass: ' + JSON.stringify(textClean.issues));
    assert.ok(textIds.every(id => textClean.coverage.some(c => c.rule === id)), 'each text rule runs on the valid fixture');
    const textValid = [
      ['the callout stacked in a narrow column (title, body, action each full width)', () => { const n = document.querySelector('#wide'); n.id = 'narrow'; const b = document.querySelector('#callout'); b.style.flexDirection = 'column'; b.style.alignItems = 'flex-start'; }],
      ['a long word wrapping in a narrow rail is one label, not a cramped block', () => { const p = document.querySelector('#rail p'); p.style.wordBreak = 'break-all'; p.style.width = '60px'; }],
      ['an ellipsis without a title is a declared truncation (the full text is advisory)', () => { document.querySelectorAll('#strip .label')[2].removeAttribute('title'); }],
      ['a node canvas (a declared pannable viewport) cutting a node at its edge', () => { const v = document.createElement('div'); v.className = 'react-flow'; v.style.cssText = 'position:relative;width:200px;height:60px;overflow:hidden;margin:8px'; v.innerHTML = '<div style="position:absolute;left:150px;top:10px;white-space:nowrap">Data Lake Migration node</div>'; document.body.append(v); }],
      ['a placeholder mostly shown (over half) beside row items a little wider than the input', () => { document.querySelectorAll('#composer-row .pill')[1].style.cssText = 'flex:none;width:170px'; }],
      ['a card under a scale transform (a zoomed canvas) whose label fits', () => { const z = document.createElement('div'); z.style.cssText = 'transform:scale(1.6);transform-origin:0 0;margin:8px;height:120px'; z.innerHTML = '<article style="width:200px;overflow:hidden;border:1px solid #ccc;padding:4px"><span style="white-space:nowrap;font-size:14px">Checkout Experience T3</span></article>'; document.body.append(z); }],
      ['the composer row giving its input the room first, chips folded', () => { document.querySelector('#composer-row').style.width = '340px'; document.querySelectorAll('#composer-row .pill')[1].remove(); }],
    ];
    for (const [name, mutate] of textValid) {
      await page2.setContent(textHtml); await page2.evaluate(mutate);
      const r = await textMeasure();
      assert.deepEqual(r.issues, [], `${name} must pass: ${JSON.stringify(r.issues)}`);
      console.log('PASS allows ' + name);
    }
    const textBroken = [
      ['a callout split into side-by-side columns in a narrow container', () => { document.querySelector('#wide').id = 'narrow'; }, 'text.cramped', 'characters per line'],
      ['flow-strip labels running into the next column', () => { document.querySelectorAll('#strip .label').forEach(l => l.classList.remove('truncate')); }, 'text.overlap', 'text overlaps text'],
      ['a label clipped mid-glyph with no ellipsis', () => { document.querySelectorAll('#strip .label')[2].style.textOverflow = 'clip'; }, 'text.clipped', 'text clipped (x)'],
      ['the same node cut by an ordinary clipping box (no pannable declaration)', () => { const v = document.createElement('div'); v.style.cssText = 'position:relative;width:200px;height:60px;overflow:hidden;margin:8px'; v.innerHTML = '<div style="position:absolute;left:150px;top:10px;white-space:nowrap">Data Lake Migration node</div>'; document.body.append(v); }, 'text.clipped', 'text clipped (x)'],
      ['a caption cut at the bottom of a fixed-height box', () => { const p = document.querySelector('#rail p:nth-of-type(2)'); p.style.cssText = 'height:24px;overflow:hidden;margin:0'; }, 'text.clipped', 'text clipped (y)'],
      ['a badge layered over text with a placeholder reason', () => { document.querySelector('.badge').setAttribute('data-ui-layered', 'TODO'); }, 'text.overlap', 'layered reason'],
      ['text absolutely placed over a neighbour', () => { const b = document.querySelector('.badge'); b.removeAttribute('data-ui-layered'); b.style.cssText = 'position:absolute;left:4px;top:8px;font-size:12px'; }, 'text.overlap', 'text overlaps text'],
      ['a composer input squeezed by chips to a few characters', () => { document.querySelector('#composer-row').style.width = '340px'; }, 'placeholder.squeezed', 'input width'],
      ['a placeholder cut while the row items take more room than the input', () => { document.querySelector('#composer-row').style.width = '460px'; document.querySelectorAll('#composer-row .pill')[1].style.cssText = 'flex:none;width:170px'; }, 'placeholder.squeezed', 'placeholder truncated'],
    ];
    for (const [name, mutate, rule, property] of textBroken) {
      await page2.setContent(textHtml); await page2.evaluate(mutate);
      const r = await textMeasure();
      assert.ok(r.issues.some(i => i.rule === rule && i.property === property), `${name} must fail ${rule} (${property}): ${JSON.stringify(r.issues)}`);
      console.log('PASS detects ' + name);
    }
    console.log('PASS legible text: cramped blocks, overlapping and clipped labels, and squeezed inputs fail; truncation with full text, chips, single words, declared layers and scrollers pass');
    await page2.close();
  }
  // Content column: trail first, the title under it, the body at the same edge.
  const columnHtml = `<!doctype html><html><head><style>
*{box-sizing:border-box} body{margin:0;font:14px system-ui,-apple-system,sans-serif}
#shell{display:flex;height:800px;width:1280px} #rail{width:240px;flex:none} #col{flex:1;min-width:0;display:flex;flex-direction:column;overflow:hidden}
[data-trail]{padding:8px 24px 4px;display:flex} #title{padding:4px 24px 16px;display:flex;justify-content:space-between;align-items:center} #title h1{font-size:20px;font-weight:600;margin:0}
#body{flex:1;min-height:0;overflow:auto;padding:0 24px 24px} h2{font-size:14px;margin:0} .row{display:flex;justify-content:space-between;padding:8px 10px;margin:0 -10px}
.tiles{display:grid;gap:4px} .tile{display:flex;flex-direction:column;align-items:center;font-size:11px} .bubble{width:40px;height:40px;border-radius:50%}
.tabs{display:flex;gap:16px;white-space:nowrap} .tabs button{flex:none;width:160px}
#convo{display:none;align-items:center;gap:12px;padding:8px 24px;border-bottom:1px solid #ddd} #convo h2{font-size:20px}
</style></head><body><div id="shell"><nav id="rail">Rail <button>Channels</button></nav>
<section id="col" data-column><div data-trail><a href="/runs">Runs</a> › <span>Communication</span></div>
<div id="title"><h1>Communication</h1><button id="title-action">Your work</button></div>
<div id="convo"><svg class="bubble" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg><h2>Rachel Kowalski</h2><div class="tabs" role="tablist"><button role="tab">Chat</button><button role="tab">Documents</button></div></div>
<div id="body"><p id="meta">You are not in a conversation yet.</p>
<section><h2>Active now</h2><div class="tiles" role="list" id="tiles" style="grid-template-columns:repeat(auto-fill,72px)">
<div class="tile" role="listitem"><svg class="bubble" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>Asha</div><div class="tile" role="listitem"><svg class="bubble" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>Jonas</div><div class="tile" role="listitem"><svg class="bubble" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>Lena</div><div class="tile" role="listitem"><svg class="bubble" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>Nora</div></div></section>
<section><div style="display:flex;justify-content:space-between"><h2>Channels you can join</h2><button id="join">Join a channel</button></div>
<div class="row"><span>#general</span><span>Open →</span></div></section>
<div id="scroller" style="overflow-x:auto"><table style="width:1600px"><tr><td>wide</td><td style="text-align:right">far right cell</td></tr></table></div>
</div></section></div></body></html>`;
  const columnPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const columnRules = contract.rules.filter(r => ['gutter', 'row-start', 'title-count', 'contained', 'sparse-row'].includes(r.kind));
  const columnMeasure = () => columnPage.evaluate(measureDOM, { contract: { ...contract, rules: columnRules }, selectors, required: [] });
  await columnPage.setContent(columnHtml);
  const columnClean = await columnMeasure();
  assert.deepEqual(columnClean.issues, [], 'a column whose body shares the trail edge passes: ' + JSON.stringify(columnClean.issues));
  for (const rule of columnRules) assert.ok(columnClean.coverage.find(c => c.rule === rule.id)?.matched > 0, `${rule.id} is exercised by the valid column`);
  const columnValid = [
    ['a document with its own heading below the host page title', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<article role="document"><h1>Document title</h1><h2>Section</h2></article>'); }],
    ['a full-bleed hover row whose text keeps the edge', () => { document.querySelector('.row').style.cssText = 'display:flex;justify-content:space-between;padding:8px 24px;margin:0 -24px;background:#eee'; }],
    ['four stretched tiles in a 288px rail section', () => { const t = document.querySelector('#tiles'); t.style.gridTemplateColumns = 'repeat(4,1fr)'; t.style.width = '264px'; }],
    ['a tab row scrolling inside its own scroller', () => { const tabs = document.querySelector('#convo .tabs'); tabs.style.overflowX = 'auto'; tabs.style.minWidth = '0'; tabs.style.flex = '1'; tabs.innerHTML += '<button role="tab">Pinned</button><button role="tab">Calls</button>'.repeat(4);
      document.querySelector('#title').remove(); document.querySelector('#convo').style.display = 'flex'; }],
    ['a collapsed panel (1px, overflow hidden) whose controls are wholly hidden', () => { const p = document.createElement('div'); p.style.cssText = 'width:1px;overflow:hidden;white-space:nowrap'; p.innerHTML = '<span style="display:inline-block;width:1px"></span><button>Hidden action</button>'; document.querySelector('#rail').append(p); }],
    ['the title folded into the trail; the conversation header is the one title at the edge', () => { document.querySelector('#title').remove(); document.querySelector('#convo').style.display = 'flex'; }],
  ];
  for (const [name, mutate] of columnValid) {
    await columnPage.setContent(columnHtml); await columnPage.evaluate(mutate);
    const valid = await columnMeasure();
    assert.deepEqual(valid.issues, [], `${name} must pass: ${JSON.stringify(valid.issues)}`);
  }
  // An ellipsized element clips its own text Range, not just its children.
  await columnPage.setContent(columnHtml);
  await columnPage.evaluate(() => {
    const p = document.createElement('p');
    p.id = 'long-description'; p.textContent = 'A long channel description '.repeat(40);
    p.style.cssText = 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%';
    document.querySelector('#body').append(p);
  });
  assert.deepEqual((await columnMeasure()).issues, [], 'ellipsized text paints within its own box');
  await columnPage.evaluate(() => { document.querySelector('#long-description').style.overflow = 'visible'; });
  assert.ok((await columnMeasure()).issues.some(i => i.rule === 'content.gutter'), 'unclipped neighboring text still fails the gutter');
  const columnBroken = [
    ['body flush to the rail while the trail and title are inset', () => { document.querySelector('#body').style.padding = '0'; }, 'content.gutter'],
    ['a section action against the window edge', () => { document.querySelector('#body').style.paddingRight = '0'; }, 'content.gutter'],
    ['conversation header starting left of the trail edge', () => { document.querySelector('#title').remove(); const c = document.querySelector('#convo'); c.style.display = 'flex'; c.style.paddingLeft = '16px'; }, 'content.header-alignment'],
    ['title indented past the trail edge', () => { document.querySelector('#title').style.paddingLeft = '40px'; }, 'content.header-alignment'],
    ['a second title-size header under the page title', () => { document.querySelector('#convo').style.display = 'flex'; }, 'content.single-title'],
    ['a document heading does not excuse a second host heading', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<article role="document"><h1>Document title</h1></article><h2 style="font-size:20px">Duplicate page title</h2>'); }, 'content.single-title'],
    ['no title at all', () => { document.querySelector('#title h1').style.fontSize = '14px'; }, 'content.single-title'],
    ['a button clipped at the column edge', () => { const j = document.querySelector('#join'); j.style.cssText = 'margin-right:-120px'; }, 'layout.contained-controls'],
    ['a tab row running past the column', () => { document.querySelector('#title').remove(); const c = document.querySelector('#convo'); c.style.display = 'flex'; c.querySelector('.tabs').innerHTML += '<button role="tab">Pinned</button><button role="tab">Calls</button>'.repeat(4); }, 'layout.contained-controls'],
    ['four stretched tiles across a page-width section', () => { document.querySelector('#tiles').style.gridTemplateColumns = 'repeat(4,1fr)'; }, 'people.sparse-row'],
  ];
  for (const [name, mutate, rule] of columnBroken) {
    await columnPage.setContent(columnHtml); await columnPage.evaluate(mutate);
    const result = await columnMeasure();
    assert.ok(result.issues.some(issue => issue.rule === rule), `${name} must fail ${rule}: ${JSON.stringify(result.issues)}`);
    console.log('PASS detects ' + name);
  }
  console.log('PASS content column: shared edge, full-bleed rows, rail tiles, scrolling tab rows and a conversation header as the one title pass');
  await columnPage.close();

  // Interaction rules: real clicks through the shared probes, judged by measureDOM.
  const interactionHtml = `<!doctype html><html><head><style>body{margin:0;font:14px system-ui} table{border-collapse:collapse} td{height:44px;padding:0 12px} tr[tabindex]{cursor:pointer} #toolbar{height:40px;display:flex;align-items:center;gap:8px}</style></head><body>
<main id="content"><div id="toolbar" data-toolbar-variant="collection"><input aria-label="Search"></div>
<div data-collection-table data-collection-rows="activatable"><table><thead><tr><th></th><th>Team</th><th>Actions</th></tr></thead><tbody>
<tr tabindex="0"><td><input type="checkbox" aria-label="Select A"></td><td>Team A</td><td><button aria-label="Revision history for A">H</button></td></tr>
<tr tabindex="0"><td><input type="checkbox" aria-label="Select B"></td><td>Team B</td><td><button aria-label="Revision history for B">H</button></td></tr></tbody></table></div>
<section id="record"></section></main>
<script>
const v = new URLSearchParams(location.search).get('v');
const overlay = (attrs, text) => { const el = document.createElement('aside'); for (const [k, val] of Object.entries(attrs)) el.setAttribute(k, val); el.textContent = text; el.style.cssText = 'position:fixed;right:0;top:0;width:300px;height:100%;background:#fff'; document.body.append(el); };
const open = tr => { const id = tr.cells[1].textContent.replace(/\\s/g, '-'); if (v === 'hash-route') location.hash = '#/list/' + id; else history.pushState({}, '', '/list/' + id + location.search); document.querySelector('#record').textContent = 'Record ' + tr.cells[1].textContent; };
document.querySelectorAll('tbody tr').forEach(tr => {
  tr.addEventListener('keydown', e => { if (e.key === 'Enter' && (v === 'route' || v === 'hash-route')) open(tr); });
  tr.addEventListener('click', e => {
    if (e.target.closest('input,button')) return;
    if (v === 'drawer') return overlay({ role: 'dialog', 'aria-modal': 'true', 'data-ui-dialog': 'drawer' }, 'Submission');
    if (v === 'complementary') return overlay({ role: 'complementary', 'data-ui-dialog': 'drawer' }, 'Submission');
    if (v === 'unmarked') return overlay({ role: 'dialog' }, 'Submission');
    if (v === 'inert') return;
    if (v === 'preselected' && tr === document.querySelector('tbody tr')) return;
    if (v === 'writes') fetch('/api/mark-read', { method: 'POST' }).catch(() => {});
    open(tr);
    if (v === 'confirm') overlay({ role: 'dialog', 'data-ui-dialog': 'confirm' }, 'Discard draft?');
    if (v === 'alert') overlay({ role: 'alertdialog' }, 'Discard draft?');
    if (v === 'help') overlay({ role: 'dialog', 'data-ui-dialog': 'command-help' }, 'Available commands');
  });
});
document.querySelectorAll('tbody button').forEach(b => b.addEventListener('click', () => {
  if (v === 'history-section') { const s = document.createElement('section'); s.textContent = 'Revision history'; document.querySelector('#record').append(s); }
  else overlay({ role: 'dialog', 'data-ui-dialog': 'drawer' }, 'Revision history');
}));
document.querySelectorAll('tbody input[type=checkbox]').forEach(cb => cb.addEventListener('change', () => {
  const n = document.querySelectorAll('tbody input:checked').length, bar = document.querySelector('#toolbar');
  if (v === 'band') { document.querySelector('#band')?.remove(); if (n) { const band = document.createElement('div'); band.id = 'band'; band.style.height = '36px'; band.textContent = n + ' selected'; bar.after(band); } }
  else if (v === 'shrink') bar.style.height = n ? '32px' : '40px';
  else bar.innerHTML = n ? '<span>' + n + ' selected</span><button>Clear selected</button>' : '<input aria-label="Search">';
}));
</script></body></html>`;
  const interactionRules = ['record.popout', 'collection.row-activatable', 'collection.selection-shift'];
  const interactionContract = { ...contract, rules: contract.rules.filter(r => interactionRules.includes(r.id)) };
  const interactionContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await interactionContext.route('http://interaction.test/**', route => route.request().url().includes('/api/') ? route.fulfill({ status: 204 }) : route.fulfill({ contentType: 'text/html', body: interactionHtml }));
  const ipage = await interactionContext.newPage();
  const rows = '[data-collection-table] table > tbody > tr';
  const judge = async (variant, enter) => {
    await ipage.goto(`http://interaction.test/list?v=${variant}`);
    const probe = await enter(ipage);
    const result = await ipage.evaluate(measureDOM, { contract: interactionContract, selectors, probe });
    return { probe, result, issues: result.issues };
  };
  const activate = page => probes.activateRow(page, { rows });
  const history = page => probes.recordAction(page, { scope: 'main', name: /^(revision history|history|revisions|details)\b/i });
  const select = page => probes.toggleSelection(page, { checkbox: `${rows} input[type="checkbox"]` });
  for (const [variant, enter, rule, valid, label] of [
    ['route', activate, 'record.popout', true, 'row click routes the record into the page'],
    ['hash-route', activate, 'record.popout', true, 'row click routes the record by changing only the URL hash (hash router)'],
    ['route', page => probes.activateRow(page, { rows, via: 'enter' }), 'record.popout', true, 'Enter on a focused row routes the record'],
    ['preselected', activate, 'record.popout', true, 'the first row is already open; the next row routes'],
    ['confirm', activate, 'record.popout', true, 'a confirmation (data-ui-dialog="confirm") beside the routed record'],
    ['alert', activate, 'record.popout', true, 'an alertdialog beside the routed record'],
    ['help', activate, 'record.popout', true, 'command help (data-ui-dialog="command-help")'],
    ['history-section', history, 'record.popout', true, 'revision history drawn inside the record'],
    ['drawer', activate, 'record.popout', false, 'row opens a modal drawer'],
    ['complementary', activate, 'record.popout', false, 'row opens a non-modal drawer (complementary role, drawer marker)'],
    ['unmarked', activate, 'record.popout', false, 'row opens an unmarked dialog'],
    ['inert', activate, 'record.popout', false, 'row click changes nothing'],
    ['writes', activate, 'record.popout', false, 'row activation attempts a write'],
    ['route', history, 'record.popout', false, 'revision history action opens a drawer'],
    ['in-place', select, 'collection.selection-shift', true, 'selection replaces the toolbar row in place'],
    ['band', select, 'collection.selection-shift', false, 'selection inserts a band above the table'],
    ['shrink', select, 'collection.selection-shift', false, 'selection changes the toolbar row height'],
  ]) {
    const { probe, issues } = await judge(variant, enter);
    const hits = issues.filter(i => i.rule === rule);
    if (valid) assert.deepEqual(hits, [], `${label} must pass ${rule}: ${JSON.stringify({ probe, issues })}`);
    else assert.ok(hits.some(i => i.category === 'violation'), `${label} must fail ${rule}: ${JSON.stringify({ probe, issues })}`);
    console.log(`PASS ${valid ? 'accepts' : 'detects'} ${label}`);
  }
  const blocked = await judge('writes', activate);
  assert.deepEqual(blocked.probe.blockedWrites, ['POST /api/mark-read'], 'the probe blocks and reports the write it stopped');
  await ipage.goto('http://interaction.test/list?v=drawer');
  await ipage.locator(rows).first().click();
  const unprobed = await ipage.evaluate(measureDOM, { contract: interactionContract, selectors });
  assert.deepEqual(unprobed.issues.filter(i => i.rule !== 'collection.row-activatable'), [], 'without an activation probe a visible dialog (a Filters popover, say) is not judged');
  assert.ok(unprobed.coverage.some(c => c.rule === 'record.popout' && c.matched === 0), 'an unprobed record.popout is reported as unexercised coverage');
  await interactionContext.close();
  const adapter = {
    baseURL: 'http://audit.test', selectors, contract: legacyContractPath,
    authenticate: async context => context.route('**/*', route => route.request().url().endsWith('/redirect') ? route.fulfill({ status: 302, headers: { location: 'http://audit.test/login' } }) : route.fulfill({ contentType: 'text/html', body: html })),
    cases: async () => [{ tenant: 'fixture', path: '/good', required: payload.required }, { tenant: 'fixture', path: '/bad', states: [{name:'default',enter: p => p.evaluate(() => { document.querySelector('#section').style.paddingLeft='45px'; localStorage.setItem('audit-state', 'changed'); })}] }, {tenant:'fixture',path:'/redirect'}].map(spec => ({ ...spec, composerExpectation: { mode: 'required' } })),
    ready: async p => { await p.locator('#header').waitFor(); assert.equal(await p.evaluate(() => localStorage.getItem('audit-state')), null, 'state preferences reset between navigations'); }, theme: async () => {},
  };
  const result = await runAudit(browser, adapter, { out: temp, themes: 'light', widths: '1280', height: 800, screenshots: false });
  assert.equal(result.cases.length, 3); assert.equal(result.cases[0].issues.length, 0);
  assert.ok(result.cases[1].issues.some(i => i.rule === 'section.gutter'));
  assert.ok(result.cases[2].issues.some(i => i.rule === 'coverage.navigation-state'), 'redirect must not pass as audited route');
  assert.ok(fs.existsSync(path.join(temp, 'report.json')));
  const groups = summarize([result.cases[1], { ...result.cases[1], tenant: 'second', route: '/second' }]);
  assert.ok(groups.some(g => g.routes.length === 2 && g.tenants.length === 2), 'group shared defects across tenants');
  const previous = path.join(temp, 'prior.json'); fs.copyFileSync(path.join(temp, 'report.json'), previous);
  const narrowed = await runAudit(browser, { ...adapter, cases: async () => [{ tenant: 'fixture', path: '/good' }] }, { out: path.join(temp, 'narrow'), themes: 'light', widths: '1280', height: 800, screenshots: false, previous });
  assert.equal(narrowed.delta.resolved.length, 0, 'omitting broken routes must not mark them resolved');
  assert.equal(narrowed.unclassified.length, 1, 'unclassified route is listed in the report');
  assert.match(fs.readFileSync(path.join(temp, 'narrow', 'summary.txt'), 'utf8'), /UNCLASSIFIED composer policy/, 'summary must not silently present unclassified routes as complete');
  const brokenReady = await runAudit(browser, { ...adapter,
    cases: async () => [{ tenant: 'fixture', path: '/bad', composerExpectation: { mode: 'required' } }],
    ready: async () => { throw new Error('Fixture readiness failed'); },
  }, { out: path.join(temp, 'broken-ready'), themes: 'light', widths: '1280', height: 800, screenshots: false, previous });
  assert.equal(brokenReady.delta.resolved.length, 0, 'readiness failure cannot close previously measured styling defects');
  assert.ok(brokenReady.delta.unverifiedCases.some(c => c.route === '/bad' && c.reason.includes('current case')));
  assert.ok(brokenReady.delta.unverifiedFindings >= 1);
  const runtimeFailed = await runAudit(browser, { ...adapter,
    cases: async () => [{ tenant: 'fixture', path: '/bad', composerExpectation: { mode: 'required' } }],
    ready: async p => {
      await p.locator('#header').waitFor();
      const raised = p.waitForEvent('pageerror');
      await p.evaluate(() => { setTimeout(() => { throw new Error('Fixture runtime failure'); }, 0); });
      await raised;
    },
  }, { out: path.join(temp, 'runtime-failed'), themes: 'light', widths: '1280', height: 800, screenshots: false, previous });
  assert.ok(runtimeFailed.cases[0].samples.length > 0, 'runtime case otherwise completed DOM measurements');
  assert.ok(runtimeFailed.cases[0].issues.some(i => i.category === 'runtime'));
  assert.equal(runtimeFailed.delta.resolved.length, 0, 'runtime failure cannot close previous styling findings');
  const repaired = await runAudit(browser, { ...adapter,
    cases: async () => [{ tenant: 'fixture', path: '/bad', composerExpectation: { mode: 'required' } }],
  }, { out: path.join(temp, 'repaired'), themes: 'light', widths: '1280', height: 800, screenshots: false, previous });
  assert.equal(repaired.delta.resolved.length, 1, 'stable successful remeasurement can close the styling defect');
  assert.equal(repaired.delta.comparedCases, 1);
  // The runner hands a state's probe result to the rules and keeps it in the report.
  const interactionContractPath = path.join(temp, 'interaction.contract.json');
  fs.writeFileSync(interactionContractPath, JSON.stringify(interactionContract));
  const probed = await runAudit(browser, {
    baseURL: 'http://interaction.test', selectors,
    authenticate: async context => context.route('http://interaction.test/**', route => route.request().url().includes('/api/') ? route.fulfill({ status: 204 }) : route.fulfill({ contentType: 'text/html', body: interactionHtml })),
    cases: async () => [
      ...['drawer', 'route'].map(v => ({ tenant: 'fixture', path: `/list?v=${v}`, states: [{ name: 'row-activate', enter: (p, { probes: shared }) => shared.activateRow(p, { rows }) }] })),
      // A list route's required regions (here a composer the record page lacks) bind a
      // state that stays on the list, not one that navigated to the record.
      ...[false, true].map(navigates => ({ tenant: 'fixture', path: '/list?v=route', required: ['$composers'], states: [{ name: navigates ? 'navigated' : 'stayed', navigates, enter: (p, { probes: shared }) => shared.activateRow(p, { rows }) }] })),
    ],
    ready: async p => p.locator('table').waitFor(), theme: async () => {},
  }, { out: path.join(temp, 'probed'), contract: interactionContractPath, themes: 'light', widths: '1280', height: 800, screenshots: false });
  assert.ok(probed.cases[0].issues.some(i => i.rule === 'record.popout'), 'runner judges the drawer opened by the row-activate state');
  assert.equal(probed.cases[0].probe?.kind, 'row-activation', 'the probe is recorded with its case');
  assert.deepEqual(probed.cases[1].issues, [], 'a routed record passes through the runner: ' + JSON.stringify(probed.cases[1].issues));
  assert.ok(probed.cases[2].issues.some(i => i.rule === 'coverage.required'), 'a state that stays on the list keeps the list route\'s required regions');
  assert.ok(!probed.cases[3].issues.some(i => i.rule === 'coverage.required'), 'a navigating state is judged on the page it reached: ' + JSON.stringify(probed.cases[3].issues));

  // ── Deep audit (references/deep-audit.md): each family's rules on a small
  // portal-shaped page. Every rule has a valid fixture that exercises it and
  // deliberately broken mutations that fail it; none is a page-name exception.
  {
    const dpage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const dselectors = { ...selectors, tables: 'table', contentColumns: ':has(> [data-trail])', trail: '[data-trail]', collectionTables: '[data-collection-page] table', composers: '[data-composer-surface]', composerDocks: '[data-dock]', header: 'header', footer: 'footer', containmentRegions: 'main, aside', panels: '[role="dialog"], [role="menu"], [data-ui-dialog]' };
    const deep = ids => ({ contract: { ...fullContract, rules: fullContract.rules.filter(r => ids.includes(r.id)) }, selectors: dselectors, required: [] });
    const deepHtml = `<!doctype html><html><head><style>
:root{--ui-table-inset:12px;--ui-content-gutter:16px;--ui-page-gutter:24px;--ui-table-row:44px;--ui-control-sm:28px}
*{box-sizing:border-box} body{margin:0;font:14px system-ui,-apple-system,sans-serif;color:#111;background:#fff}
header{height:44px;padding:0 16px} footer{height:44px;padding:0 16px}
#shell{display:flex;height:812px} aside{width:200px;flex:none;padding:8px}
#col{flex:1;min-width:0;display:flex;flex-direction:column;overflow:auto}
[data-trail]{padding:12px 24px;font-size:12px;margin:0} .body{padding:0 24px}
h1{font-size:20px;margin:16px 0 12px;line-height:28px} h2{font-size:14px;margin:16px 0 8px}
table{width:100%;border-collapse:collapse} th,td{padding:0 12px;height:44px;text-align:left} th{font-size:12px;font-weight:600}
.filters{display:flex;gap:8px;height:40px;align-items:center} button{font:inherit;height:28px}
.meta{display:flex;align-items:baseline;gap:8px} .card{border:1px solid #d4d4d8;border-radius:8px;padding:16px;background:#fff}
#act{display:inline-flex;align-items:center;gap:6px;height:32px}
</style></head><body><header>Workspace</header>
<div id="shell" data-shell-nav><aside aria-label="Primary"><nav aria-label="Sections"><a href="#runs">Runs</a></nav></aside>
<main id="col"><p data-trail>Build › Runs</p><div class="body" id="body">
<h1>Runs</h1>
<div class="meta" id="meta"><span id="lbl" style="font-size:12px">Owner</span><span id="val" style="font-size:24px">Sana Iqbal</span></div>
<div class="filters" id="filters"><button id="act"><svg width="16" height="16" aria-hidden="true"><rect width="16" height="16"/></svg><span>Refresh</span></button></div>
<div data-collection-page id="list"><table><thead><tr><th>Name</th><th>Tokens</th><th>Status</th></tr></thead><tbody>
<tr><td>inference-canary-nightly</td><td>12,345</td><td>Ready</td></tr><tr><td>obs-nightly-maintenance</td><td>12.3k</td><td>Ready</td></tr></tbody></table></div>
<h2>Notes</h2><div class="card" id="card"><p style="margin:0">Owned by 2026 planning. <code>p-auth-migration</code></p></div>
</div></main></div><footer>Footer</footer></body></html>`;
    const dmeasure = ids => dpage.evaluate(measureDOM, deep(ids));
    const families = [
      { ids: ['density.blank-band'], valid: [['the resting list page', () => {}], ['a short page ending above the footer (nothing scrolls)', () => { document.querySelector('#card').remove(); }]],
        broken: [['a 200px blank band between the title and the table', () => document.querySelector('#filters').insertAdjacentHTML('afterend', '<div style="height:200px"></div>'), 'interior blank band'],
          ['a short scroller hiding its rows while the column under it is blank', () => { const l = document.querySelector('#list'); l.style.cssText = 'height:150px;overflow-y:auto'; l.querySelector('tbody').innerHTML = '<tr><td>row</td><td>1</td><td>Ready</td></tr>'.repeat(20); document.querySelector('#card').remove(); document.querySelector('h2').remove(); }, 'blank below a short scroller']] },
      { ids: ['density.table-first'], valid: [['one filter row above the table', () => {}]],
        broken: [['a stack of status cards pushing the table down', () => document.querySelector('#filters').insertAdjacentHTML('afterend', '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:12px 0">' + '<div class="card" style="height:110px">Open 4</div>'.repeat(4) + '</div>'), 'preamble above the table'],
          ['a table starting below the fold', () => document.querySelector('#filters').insertAdjacentHTML('afterend', '<p style="margin:0;height:520px">Long introduction</p>'), 'table below the fold']] },
      { ids: ['density.narrow-block'], valid: [['a full-width table', () => {}], ['a narrow table with a summary beside it', () => { const l = document.querySelector('#list'); const row = document.createElement('div'); row.style.cssText = 'display:flex;gap:16px'; l.before(row); row.append(l); l.style.width = '420px'; row.insertAdjacentHTML('beforeend', '<div class="card" style="flex:1">Summary of runs</div>'); }]],
        broken: [['a table held to 420px with the rest of the column blank', () => { document.querySelector('#list').style.maxWidth = '420px'; }, 'block width']] },
      { ids: ['align.grid'], valid: [['lines on the gutter, the table inset and card padding', () => {}], ['a document page uses its own inset grid', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<section data-reading-presentation="page"><p style="padding-left:4px">Document page text</p></section>'); }], ['a card inside a card (16 + 16)', () => { document.querySelector('#card').insertAdjacentHTML('beforeend', '<div class="card" style="margin-top:8px">Nested note</div>'); }], ['an icon centred inside its grid cell', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<span style="display:inline-grid;place-items:center;width:28px;height:28px;margin-left:12px"><svg width="24" height="24"><path d="M0 0h24v24H0z" /></svg></span>'); }], ['a centred empty state', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<div style="text-align:center;padding:4px">Nothing else</div>'); }]],
        broken: [['a paragraph indented 4px off the grid', () => document.querySelector('#body').insertAdjacentHTML('beforeend', '<p style="padding-left:4px">Stray paragraph</p>'), 'line start off the grid'], ['an ordinary paragraph beside a document still fails', () => document.querySelector('#body').insertAdjacentHTML('beforeend', '<section data-reading-presentation="page"><p style="padding-left:4px">Document page text</p></section><p style="padding-left:4px">Stray host paragraph</p>'), 'line start off the grid'],
          ['a header action 6px short of the reading edge', () => { const f = document.querySelector('#filters'); f.style.justifyContent = 'space-between'; f.insertAdjacentHTML('beforeend', '<button style="margin-right:6px">Export</button>'); }, 'right edge off the grid']] },
      { ids: ['align.baseline'], valid: [['a label and value on one baseline', () => {}], ['a ✓ glyph centred beside its label (an icon, not a label)', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<div style="display:flex;align-items:center;gap:6px"><span style="font-size:16px">✓</span><span style="font-size:12px">Contract complete</span></div>'); }]],
        broken: [['a 12px label centred against a 24px value', () => { document.querySelector('#meta').style.alignItems = 'center'; }, 'baseline delta']] },
      { ids: ['align.icon-center'], valid: [['an icon centred on its label', () => {}],
          ['a positioned count badge on an icon-only button', () => { const b = document.querySelector('#act'); b.style.position = 'relative'; for (const node of [...b.childNodes]) if (node.nodeType === Node.TEXT_NODE) node.remove(); b.insertAdjacentHTML('beforeend', '<span data-ui-badge="count" style="position:absolute;top:20px;right:0;font-size:12px">3</span>'); }]],
        broken: [['an icon pinned to the top of its button', () => { document.querySelector('#act svg').style.alignSelf = 'flex-start'; }, 'icon vertical centre'],
          ['an ordinary label still fails beside a count badge', () => { const b = document.querySelector('#act'); b.style.position = 'relative'; b.querySelector('svg').style.alignSelf = 'flex-start'; b.insertAdjacentHTML('beforeend', '<span data-ui-badge="count" style="position:absolute;top:20px;right:0;font-size:12px">3</span>'); }, 'icon vertical centre']] },
      { ids: ['layout.scroll-owner'], valid: [['a wide table in its own scroller', () => { const l = document.querySelector('#list'); l.style.overflowX = 'auto'; l.querySelector('table').style.width = '2000px'; }]],
        broken: [['a wide table with no scroller of its own', () => { document.querySelector('#list table').style.width = '2000px'; }, 'wide content without its own scroller']] },
      { ids: ['layout.content-share'], valid: [['rails leaving the content column its room', () => {}]],
        broken: [['a rail that does not fold, squeezing the content column', () => { document.querySelector('aside').style.width = '1000px'; }, 'content column width']] },
      { ids: ['content.honesty'], valid: [['equal values in distinct native table cells', () => { document.querySelector('tbody tr').innerHTML = '<td><span>Yes</span></td><td><span>Yes</span></td><td><span>Yes</span></td>'; }], ['equal values in distinct ARIA cells', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<div role="table"><div role="row" style="display:flex;gap:16px"><div role="cell"><span>Yes</span></div><div role="cell"><span>Yes</span></div></div></div>'); }], ['formatted numbers, a year, an id in code style and a status repeated down a column', () => {}], ['the trail and the title sharing the section name', () => {}], ['two neighbouring regions each captioned with the same word', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<div style="display:flex;gap:16px"><section><div><div><span>Status</span></div></div></section><section><div><div><span>Status</span></div></div></section></div>'); }]],
        broken: [['repeated labels inside one table cell', () => { document.querySelector('tbody td').innerHTML = '<span>Yes</span> <span>Yes</span>'; }, 'duplicated adjacent label'], ['repeated labels inside one ARIA cell', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<div role="table"><div role="row"><div role="cell"><span>Yes</span> <span>Yes</span></div></div></div>'); }, 'duplicated adjacent label'], ['undefined shown as a value', () => { document.querySelector('#val').textContent = 'undefined'; }, 'undefined/null/NaN shown'],
          ['an object leaked into text', () => { document.querySelector('#val').textContent = '[object Object]'; }, 'object leaked'],
          ['money that did not format', () => { document.querySelector('#val').textContent = 'Budget $NaN'; }, 'unformatted money'],
          ['placeholder copy', () => { document.querySelector('#card p').textContent = 'Budget view coming soon'; }, 'placeholder copy'],
          ['a raw ISO timestamp', () => { document.querySelector('tbody td').textContent = '2026-10-14T13:55:00Z'; }, 'raw ISO timestamp'],
          ['a raw UUID', () => { document.querySelector('tbody td').textContent = '3f2b8c1e-9a7d-4b2e-8f1a-2c3d4e5f6a7b'; }, 'raw UUID'],
          ['an ungrouped large number', () => { document.querySelector('tbody td:nth-child(2)').textContent = '123456'; }, 'ungrouped number'],
          ['an internal id where a name belongs', () => { document.querySelector('#val').textContent = 'p-auth-migration'; }, 'internal id shown as text'],
          ['the same label twice in a row', () => { document.querySelector('#lbl').insertAdjacentHTML('afterend', '<span style="font-size:12px">Owner</span>'); }, 'duplicated adjacent label']] },
      { ids: ['a11y.names'], valid: [['labelled controls and decorative images', () => { document.querySelector('#filters').insertAdjacentHTML('beforeend', '<button aria-label="More actions"><svg width="16" height="16"><rect width="16" height="16"/></svg></button><img alt="" width="8" height="8">'); }]],
        broken: [['an icon-only button with no name', () => document.querySelector('#filters').insertAdjacentHTML('beforeend', '<button><svg width="16" height="16"><rect width="16" height="16"/></svg></button>'), 'accessible name'],
          ['an image with no alt', () => document.querySelector('#filters').insertAdjacentHTML('beforeend', '<img width="8" height="8" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=">'), 'img alt']] },
      { ids: ['a11y.contrast'], valid: [['muted text at 4.8:1 and a disabled control', () => { document.querySelector('#lbl').style.color = '#6b7280'; document.querySelector('#filters').insertAdjacentHTML('beforeend', '<button disabled style="color:#ccc">Archive</button>'); }]],
        broken: [['light grey text on white', () => { document.querySelector('#lbl').style.color = '#aaa'; }, 'text contrast'],
          ['a dark theme whose secondary text sinks into the surface', () => { document.body.style.background = '#111'; document.body.style.color = '#eee'; document.querySelector('#lbl').style.color = '#555'; }, 'text contrast']] },
      { ids: ['a11y.heading-order'], valid: [['a named authored document has its own outline under the application heading', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<div role="document" aria-label="Document content"><h1>Authored title</h1><h2>Authored section</h2></div>'); }], ['one h1, then h2', () => {}]],
        broken: [['a document never excuses another application h1', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<div role="document" aria-label="Document content"><h1>Authored title</h1></div><h1>Extra app title</h1>'); }, 'h1 count'], ['an unnamed document cannot hide a heading', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<div role="document"><h1>Extra title</h1></div>'); }, 'h1 count'], ['an h3 straight after the h1', () => { document.querySelector('h2').outerHTML = '<h3>Notes</h3>'; }, 'heading level skipped'],
          ['two h1s', () => document.querySelector('#card').insertAdjacentHTML('afterend', '<h1>Second title</h1>'), 'h1 count']] },
      { ids: ['a11y.landmarks'], valid: [['one main, one header/footer, named navigation', () => {}]],
        broken: [['two unnamed navigation landmarks', () => { document.querySelector('nav').removeAttribute('aria-label'); document.querySelector('#body').insertAdjacentHTML('afterbegin', '<nav><a href="#x">Tabs</a></nav>'); }, 'navigation landmark names'],
          ['a second main', () => document.querySelector('#body').insertAdjacentHTML('beforeend', '<main>Nested</main>'), 'main landmarks']] },
      // Rules born in the visual review pass (deep-audit.md): each confirmed candidate became one of these.
      { ids: ['text.flex-fragmented'], valid: [['an icon link: bare text beside an svg on one line', () => { document.querySelector('#filters').insertAdjacentHTML('beforeend', '<a href="#a" style="display:inline-flex;gap:4px;align-items:center">All runs <svg width="12" height="12"><rect width="12" height="12"/></svg></a>'); }], ['a sentence wrapped in one element inside a flex row', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<div style="display:flex;gap:8px;width:220px"><span>▶</span><p style="margin:0">Click Scenarios in the toolbar, generate a set of people, then hit Run all.</p></div>'); }], ['an icon beside one wrapping sentence of bare text', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<li style="display:flex;gap:8px;width:220px"><svg width="12" height="12"><rect width="12" height="12"/></svg>Configure CI to trigger on commit, push, merge request or pull request.</li>'); }]],
        broken: [['a sentence split into flex items that each wrap', () => document.querySelector('#body').insertAdjacentHTML('beforeend', '<p style="display:flex;gap:8px;width:260px">Click <b>▶ Scenarios</b> in the toolbar, generate a set of people, then hit <b>Run all</b> to generate traffic.</p>'), 'prose split into flex items']] },
      { ids: ['text.leading-separator'], valid: [['a stats line on one row', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<div id="stats" style="width:900px"><span>2 agents</span> <span>·</span> <span>11 active</span> <span>·</span> <span>41 open</span></div>'); }]],
        broken: [['a wrapped stats line whose second row starts with "•"', () => document.querySelector('#body').insertAdjacentHTML('beforeend', '<div style="display:flex;flex-wrap:wrap;gap:8px;width:300px"><span style="width:290px">2 agents active on 1 initiative</span><span aria-hidden="true">•</span><span>11 active initiatives</span></div>'), 'line starts with a separator']] },
      { ids: ['text.leading-separator'], valid: [['"Page 1 of 4 · 77 total" rendered as sibling text nodes in a multi-line section', () => { const s = document.createElement('span'); for (const part of ['Page ', '1', ' of ', '4', ' · ', '77', ' total']) s.append(document.createTextNode(part)); const row = document.createElement('div'); row.style.cssText = 'display:flex;justify-content:space-between'; row.append(s); document.querySelector('#card').append(row); }], ['a bulleted list whose items start with "•" markers', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<ul style="list-style:none;padding:0;width:260px">' + '<li style="display:flex;gap:6px;align-items:flex-start"><span>•</span><span>Ensure the majority of active development runs through CI.</span></li>'.repeat(3) + '</ul>'); }]], broken: [] },
      { ids: ['list.marker-alignment'], valid: [['bullets on the first line of wrapping items', () => { document.querySelector('#body').insertAdjacentHTML('beforeend', '<ul style="list-style:none;padding:0;width:260px">' + '<li style="display:flex;gap:6px;align-items:flex-start;line-height:20px"><span>•</span><span>Ensure the majority of active development runs through CI rather than manual builds.</span></li>'.repeat(2) + '</ul>'); }]],
        broken: [['bullets centred on two-line items', () => document.querySelector('#body').insertAdjacentHTML('beforeend', '<ul style="list-style:none;padding:0;width:260px">' + '<li style="display:flex;gap:6px;align-items:center;line-height:20px"><span>•</span><span>Ensure the majority of active development runs through CI rather than manual builds.</span></li>'.repeat(2) + '</ul>'), 'list marker position']] },
      { ids: ['table.selection-column'], valid: [['a selection checkbox in the first column', () => { document.querySelectorAll('#list tr').forEach(tr => tr.insertAdjacentHTML('afterbegin', tr.closest('thead') ? '<th></th>' : '<td><input type="checkbox" aria-label="Select"></td>')); }]],
        broken: [['a selection checkbox between Name and Tokens', () => { document.querySelectorAll('#list tr').forEach(tr => tr.children[0].insertAdjacentHTML('afterend', tr.closest('thead') ? '<th></th>' : '<td><input type="checkbox" aria-label="Select"></td>')); }, 'selection column']] },
      { ids: ['table.column-hog'], valid: [['a long name truncated in its cell', () => { const l = document.querySelector('#list'); l.style.overflowX = 'auto'; const td = l.querySelector('tbody td'); td.innerHTML = '<div style="max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + 'inference-canary-nightly extraordinarily long name '.repeat(6) + '</div>'; }]],
        broken: [['a long name widening its column until the other columns scroll away', () => { const l = document.querySelector('#list'); l.style.overflowX = 'auto'; const td = l.querySelector('tbody td'); td.style.whiteSpace = 'nowrap'; td.textContent = 'inference-canary-nightly extraordinarily long name '.repeat(6); }, 'column pushing the table out of view']] },
      // pane.vertical-budget (storymaker Work inspector): a side pane fits in a few heights and never lists identical rows.
      { ids: ['pane.vertical-budget'], valid: [['a tabbed pane with a grouped, capped feed', () => { const pane = html => document.querySelector('#shell').insertAdjacentHTML('beforeend', `<aside data-ui-pane="side" aria-label="Details" style="width:320px;flex:none;height:100%;overflow-y:auto;padding:12px">${html}</aside>`); pane('<div role="tablist"><button role="tab">Definition</button><button role="tab">Activity</button></div><ol>' + ['Worker heartbeat ×12', 'Worker progress ×7', 'Worker started', 'Job claimed', 'Definition saved'].map(t => `<li style="height:36px">${t}</li>`).join('') + '</ol><button>Show 3 more</button>'); }],
          ['a numbered list whose rows differ', () => { const pane = html => document.querySelector('#shell').insertAdjacentHTML('beforeend', `<aside data-ui-pane="side" aria-label="Details" style="width:320px;flex:none;height:100%;overflow-y:auto;padding:12px">${html}</aside>`); pane('<ol>' + Array.from({ length: 8 }, (_, i) => `<li>Step ${i + 1}</li>`).join('') + '</ol>'); }]],
        broken: [['a heartbeat log of identical rows', () => { const pane = html => document.querySelector('#shell').insertAdjacentHTML('beforeend', `<aside data-ui-pane="side" aria-label="Details" style="width:320px;flex:none;height:100%;overflow-y:auto;padding:12px">${html}</aside>`); pane('<ol>' + '<li style="height:36px">Worker heartbeat · definition recorded <span>1d ago</span></li>'.repeat(8) + '</ol>'); }, 'identical row run'],
          ['a pane stacking every facet into 3000px of scroll', () => { const pane = html => document.querySelector('#shell').insertAdjacentHTML('beforeend', `<aside data-ui-pane="side" aria-label="Details" style="width:320px;flex:none;height:100%;overflow-y:auto;padding:12px">${html}</aside>`); pane('<section style="height:3000px">Requested change, criteria, constraints, inputs, activity</section>'); }, 'pane content height']] },
    ];
    for (const { ids, valid, broken } of families) {
      for (const [name, mutate] of valid) {
        await dpage.setContent(deepHtml); await dpage.evaluate(mutate);
        const r = await dmeasure(ids);
        assert.deepEqual(r.issues, [], `${ids} must pass ${name}: ${JSON.stringify(r.issues)}`);
        console.log(`PASS ${ids} allows ${name}`);
      }
      for (const [name, mutate, property] of broken) {
        await dpage.setContent(deepHtml); await dpage.evaluate(mutate);
        const r = await dmeasure(ids);
        assert.ok(r.issues.some(i => ids.includes(i.rule) && i.property === property), `${name} must fail ${ids} (${property}): ${JSON.stringify(r.issues)}`);
        console.log(`PASS ${ids} detects ${name}`);
      }
    }
    // Rules that judge exercise their valid fixture (a pass is not a zero-match).
    await dpage.setContent(deepHtml);
    // A full-width bottom dock deliberately leaves flexible space above it.
    // Keep checking gaps inside that dock and a dock detached from the bottom.
    {
      const dockHtml = deepHtml.replace('</main>', '<div data-column-dock style="margin-top:auto"><button>Command</button></div></main>');
      const dockCheck = () => dpage.evaluate(measureDOM, { ...deep(['density.blank-band']), selectors: { ...dselectors, composerDocks: '[data-column-dock]' } });
      await dpage.setContent(dockHtml);
      assert.deepEqual((await dockCheck()).issues, [], 'flex space before an anchored column dock is intentional');
      await dpage.locator('[data-column-dock]').evaluate(el => el.style.marginBottom = '40px');
      assert.ok((await dockCheck()).issues.some(i => i.rule === 'density.blank-band'), 'a detached dock is not exempt');
      await dpage.setContent(dockHtml);
      await dpage.locator('[data-column-dock]').evaluate(el => { el.innerHTML = '<button>First</button><div style="height:150px"></div><button>Second</button>'; });
      assert.ok((await dockCheck()).issues.some(i => i.rule === 'density.blank-band'), 'a gap inside the dock still fails');
      await dpage.setContent(deepHtml);
    }
    await dpage.evaluate(() => document.querySelector('#shell').insertAdjacentHTML('beforeend', '<aside data-ui-pane="side" aria-label="Details" style="width:320px;flex:none"><p>Definition</p></aside>'));
    const exercised = await dmeasure(['pane.vertical-budget', 'density.blank-band', 'density.table-first', 'density.narrow-block', 'align.grid', 'align.baseline', 'align.icon-center', 'a11y.contrast']);
    for (const c of exercised.coverage) assert.ok(c.matched > 0, `${c.rule} is exercised by the valid deep fixture: ${JSON.stringify(c)}`);
    console.log('PASS each deep layout rule is exercised by the valid fixture');

    // composer.readonly-coherent: a composer that cannot post is read-only as a whole.
    const composerHtml = `<!doctype html><html><body style="margin:0;font:14px system-ui"><div data-dock><div data-composer-surface id="c">
<div id="to">To: Initiative discussion <span id="note">You can read messages. Your current role cannot post to this discussion.</span></div>
<div role="toolbar"><button id="bold" aria-label="Bold" disabled>B</button><button aria-label="Italic" disabled>I</button><button aria-label="Link" disabled>L</button></div>
<div id="ed" role="textbox" contenteditable="false">Write a message…</div>
<button id="mode" aria-haspopup="menu" disabled>Chat</button><button id="wf" disabled>Workflow</button><button id="send" aria-label="Send" disabled>Send</button>
<a href="/access/requests/new">Request access</a></div></div></body></html>`;
    const cmeasure = () => dpage.evaluate(measureDOM, deep(['composer.readonly-coherent']));
    for (const [name, mutate] of [['a read-only composer with every affordance disabled and the reason inline', () => {}],
      ['the To: selector kept live as the way out, with its reason', () => { document.querySelector('#to').insertAdjacentHTML('beforeend', '<button aria-haspopup="listbox" data-composer-readonly-allow="Choosing another destination is the way out of read-only">Initiative discussion ▾</button>'); }],
      ['a prompt disclosure kept live with its local-only reason', () => { document.querySelector('#c').insertAdjacentHTML('beforeend', '<button data-composer-readonly-allow="Shows existing prompt facts without changing a record or submitting an answer">Show</button>'); }],
      ['an ordinary composer whose Send waits for a draft', () => { document.querySelector('#note').remove(); document.querySelectorAll('button').forEach(b => { if (b.id !== 'send') b.disabled = false; }); document.querySelector('#ed').contentEditable = 'true'; }]]) {
      await dpage.setContent(composerHtml); await dpage.evaluate(mutate);
      const r = await cmeasure();
      assert.deepEqual(r.issues, [], `${name}: ${JSON.stringify(r.issues)}`);
      console.log('PASS composer.readonly-coherent allows ' + name);
    }
    await dpage.setContent(composerHtml); assert.ok((await cmeasure()).coverage.some(c => c.rule === 'composer.readonly-coherent' && c.matched === 1), 'the read-only fixture is exercised');
    for (const [name, mutate, property] of [
      ['formatting buttons left live under the read-only note', () => { document.querySelector('#bold').disabled = false; }, 'enabled controls in a read-only composer'],
      ['a prompt disclosure exemption does not exempt neighboring formatting', () => { document.querySelector('#c').insertAdjacentHTML('beforeend', '<button data-composer-readonly-allow="Shows existing prompt facts without changing a record or submitting an answer">Show</button>'); document.querySelector('#bold').disabled = false; }, 'enabled controls in a read-only composer'],
      ['an editor still editable under the read-only note', () => { document.querySelector('#ed').contentEditable = 'true'; }, 'enabled controls in a read-only composer'],
      ['the Chat mode menu and Workflow still live', () => { document.querySelector('#mode').disabled = false; document.querySelector('#wf').disabled = false; }, 'enabled controls in a read-only composer'],
      ['a live control exempted with a placeholder reason', () => { document.querySelector('#to').insertAdjacentHTML('beforeend', '<button data-composer-readonly-allow="TODO">Initiative discussion ▾</button>'); }, 'read-only exemption reason'],
      ['a composer marked read-only with no reason shown', () => { document.querySelector('#note').remove(); document.querySelector('#c').setAttribute('data-composer-readonly', ''); }, 'read-only reason'],
    ]) {
      await dpage.setContent(composerHtml); await dpage.evaluate(mutate);
      const r = await cmeasure();
      assert.ok(r.issues.some(i => i.rule === 'composer.readonly-coherent' && i.property === property), `${name} must fail composer.readonly-coherent (${property}): ${JSON.stringify(r.issues)}`);
      console.log('PASS composer.readonly-coherent detects ' + name);
    }

    // tabs.stable: real clicks through the tabCycle probe, judged by measureDOM.
    const tabsHtml = `<!doctype html><html><head><style>
*{box-sizing:border-box} body{margin:0;font:14px system-ui} #shell{display:flex;height:800px} main{flex:1}
aside{width:360px;height:800px;display:flex;flex-direction:column;border-left:1px solid #ddd}
[role=tablist]{display:flex;gap:4px;flex:none;padding:0 16px;align-items:flex-start} [role=tab]{font:inherit;border:0;background:none;height:36px;padding:0 8px}
[role=tab][aria-selected=true]{box-shadow:inset 0 -2px 0 #2563eb}
#panel{flex:1;min-height:0;overflow-y:auto;padding:12px 16px} #intro{flex:none;padding:8px 16px}
</style></head><body><div id="shell"><main><h1>Initiative</h1></main><aside id="pane" aria-label="Side pane"><div id="intro">Agent</div>
<div role="tablist" aria-label="Pane views"><button role="tab" aria-selected="true" aria-controls="panel">Agent</button><button role="tab" aria-selected="false" aria-controls="panel">Activity</button><button role="tab" aria-selected="false" aria-controls="panel">Files</button></div>
<div id="panel" role="tabpanel"><p>Agent conversation</p></div></aside></div>
<script>{
const bodies = { Agent: '<p>Agent conversation</p>', Activity: '<p>One</p><p>Two</p><p>Three</p><p>Four</p>', Files: '<p>Spec.md</p>' };
document.querySelectorAll('[role=tab]').forEach(t => t.addEventListener('click', () => {
  document.querySelectorAll('[role=tab]').forEach(o => o.setAttribute('aria-selected', String(o === t)));
  document.querySelector('#panel').innerHTML = bodies[t.textContent];
  if (window.variant === 'underline') document.querySelectorAll('[role=tab]').forEach(o => { o.style.boxSizing = 'content-box'; o.style.height = '36px'; o.style.borderBottom = o === t ? '2px solid #2563eb' : '0'; });
  if (window.variant === 'intro') document.querySelector('#intro').innerHTML = t.textContent === 'Activity' ? 'Activity<br>Everything that happened on this initiative, newest first' : t.textContent;
}));
}</script></body></html>`;
    const tabCase = async variant => {
      await dpage.setContent(tabsHtml);
      await dpage.evaluate(v => {
        window.variant = v;
        if (v === 'pane') { const pane = document.querySelector('#pane'); pane.style.height = 'auto'; pane.style.alignSelf = 'flex-start'; document.querySelector('#panel').style.overflow = 'visible'; }
      }, variant);
      const probe = await probes.tabCycle(dpage, { index: 0, name: 'Pane views', chrome: ['main'] });
      return dpage.evaluate(measureDOM, { ...deep(['tabs.stable']), probe });
    };
    const stable = await tabCase('stable');
    assert.deepEqual(stable.issues, [], 'a fixed-height tab row with an inset underline and a scrolling panel is stable: ' + JSON.stringify(stable.issues));
    assert.ok(stable.coverage.some(c => c.rule === 'tabs.stable' && c.matched >= 3), 'every tab was visited');
    console.log('PASS tabs.stable allows a tab switch that only changes its panel');
    for (const [variant, name, pattern] of [['underline', 'an active underline adding 2px to the tab row', /^(tab \d|tablist) height/], ['intro', 'content above the tabs that changes with the tab and shifts the tablist', /^(tablist top|panel top)/], ['pane', 'a content-sized side pane that resizes on each tab', /^ancestor \d+ \(frame\) height/]]) {
      const r = await tabCase(variant);
      assert.ok(r.issues.some(i => i.rule === 'tabs.stable' && pattern.test(i.property)), `${name} must fail tabs.stable (${pattern}): ${JSON.stringify(r.issues)}`);
      console.log('PASS tabs.stable detects ' + name);
    }

    // Descriptive nonmodal cards preserve focus on a linked trigger. Ordinary
    // dialogs and broken trigger-focus cards still fail their focus contract.
    for (const variant of ['valid', 'steals-focus', 'ordinary-dialog']) {
      await dpage.setContent(`<!doctype html><html><body><button id="about" aria-expanded="false">About</button><script>
      { const trigger = document.querySelector('#about');
      trigger.onclick = () => {
        const panel = document.createElement('div'); panel.id = 'about-panel'; panel.role = 'dialog'; panel.setAttribute('aria-modal', 'false');
        panel.setAttribute('data-ui-focus', 'trigger'); panel.tabIndex = -1;
        panel.style.cssText = 'position:fixed;left:20px;top:60px;padding:12px;background:white;border:1px solid gray;z-index:99'; panel.textContent = 'About this setting';
        document.body.append(panel); trigger.setAttribute('aria-expanded', 'true'); trigger.setAttribute('aria-controls', panel.id); trigger.setAttribute('aria-describedby', panel.id);
        if (window.variant === 'steals-focus') panel.focus();
        if (window.variant === 'ordinary-dialog') panel.removeAttribute('data-ui-focus');
      };
      document.addEventListener('keydown', e => { if (e.key === 'Escape') { document.querySelector('#about-panel')?.remove(); trigger.setAttribute('aria-expanded','false'); trigger.focus(); } }); }
      </script></body></html>`);
      await dpage.evaluate(v => { window.variant = v; }, variant);
      const probe = await probes.openLayer(dpage, { index: 0, name: 'About' });
      const measured = await dpage.evaluate(measureDOM, { ...deep(['layer.behaviour']), probe });
      if (variant === 'valid') assert.deepEqual(measured.issues, [], 'a linked descriptive card keeps focus on its trigger');
      else assert.ok(measured.issues.some(i => i.property === (variant === 'steals-focus' ? 'focus stays on the trigger' : 'focus moves into the layer')), `${variant} must retain its focus failure: ${JSON.stringify(measured.issues)}`);
    }
    console.log('PASS layer.behaviour: linked descriptive cards retain focus; ordinary dialogs and broken cards are still judged');

    // layer.behaviour: a menu opened through the openLayer probe.
    const layerHtml = `<!doctype html><html><head><style>*{box-sizing:border-box} body{margin:0;font:14px system-ui;height:900px} header{height:44px;background:#eee} footer{position:fixed;bottom:0;left:0;right:0;height:44px;background:#eee;z-index:5}
#menu{position:fixed;left:200px;top:120px;width:200px;background:#fff;border:1px solid #ccc;z-index:10;padding:4px} #menu[hidden]{display:none} #menu button{display:block;width:100%;font:inherit}
#cover{position:fixed;left:0;right:0;top:100px;height:300px;z-index:20;display:none;background:rgba(0,0,0,.02)}</style></head><body><header>Workspace</header>
<main><button id="more" aria-haspopup="menu" aria-expanded="false">More options</button></main>
<div id="menu" role="menu" hidden><button role="menuitem">Copy link</button><button role="menuitem">Duplicate</button></div><div id="cover"></div><footer>Footer</footer>
<script>{
const more = document.querySelector('#more'), menu = document.querySelector('#menu');
more.addEventListener('click', () => { menu.hidden = false; more.setAttribute('aria-expanded', 'true'); if (window.variant !== 'no-focus') menu.querySelector('button').focus(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && window.variant !== 'no-escape') { menu.hidden = true; more.setAttribute('aria-expanded', 'false'); if (window.variant !== 'no-return') more.focus(); } });
}</script></body></html>`;
    const layerCase = async (variant, style) => {
      await dpage.setContent(layerHtml);
      await dpage.evaluate(({ v, css }) => { window.variant = v; if (css) document.querySelector('#menu').style.cssText += css; if (v === 'covered') document.querySelector('#cover').style.display = 'block';
        // A dropdown panel whose sticky header overlaps the role=menu list inside it.
        if (v === 'header-over-list') { const menu = document.querySelector('#menu'); const panel = document.createElement('div'); panel.style.cssText = 'position:fixed;left:200px;top:120px;width:200px;height:120px;background:#fff;z-index:10'; menu.style.cssText = 'position:static;width:200px;background:#fff'; panel.append(menu); const head = document.createElement('div'); head.style.cssText = 'position:absolute;inset:0 0 auto 0;height:120px;background:rgba(255,255,255,.01)'; head.innerHTML = '<button style="width:100%;height:120px;opacity:.01">Sort</button>'; panel.append(head); document.body.append(panel); } }, { v: variant, css: style });
      const found = await probes.discoverDeep(dpage, { chrome: 'header, footer' });
      const trigger = found.triggers.find(t => t.name === 'More options');
      assert.ok(trigger, 'discoverDeep finds the menu trigger');
      const probe = await probes.openLayer(dpage, trigger);
      return dpage.evaluate(measureDOM, { ...deep(['layer.behaviour']), probe });
    };
    const goodLayer = await layerCase('ok');
    assert.deepEqual(goodLayer.issues, [], 'a menu that takes focus, closes on Escape and returns focus passes: ' + JSON.stringify(goodLayer.issues));
    console.log('PASS layer.behaviour allows a well-behaved menu');
    for (const [variant, css, name, property] of [
      ['no-focus', '', 'a menu that leaves focus on the page', 'focus moves into the layer'],
      ['no-escape', '', 'a menu Escape does not close', 'Escape closes'],
      ['no-return', '', 'a menu that drops focus on close', 'focus returns to the trigger'],
      ['ok', ';top:870px', 'a menu hanging off the bottom of the window', 'bottom inside viewport'],
      ['ok', ';top:830px;height:40px', 'a menu drawn over the footer bar', 'overlaps shell chrome'],
      ['covered', '', 'a menu painted under another layer', 'z-order'],
      ['header-over-list', '', 'a menu painted under another layer (control: the panel\'s own header is not a cover)', null],
    ]) {
      const r = await layerCase(variant, css);
      if (property === null) { assert.deepEqual(r.issues, [], `${name}: ${JSON.stringify(r.issues)}`); console.log('PASS layer.behaviour allows a panel whose own header overlaps its menu list'); continue; }
      assert.ok(r.issues.some(i => i.rule === 'layer.behaviour' && i.property === property), `${name} must fail layer.behaviour (${property}): ${JSON.stringify(r.issues)}`);
      console.log('PASS layer.behaviour detects ' + name);
    }
    await dpage.setContent(`<!doctype html><html><body style="font:14px system-ui"><main><button id="cb" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-controls="lb">All departments</button><ul id="lb" role="listbox" hidden style="position:fixed;top:60px;left:10px;background:#fff;margin:0"><li role="option" id="o1">Platform</li></ul></main><script>{const cb=document.querySelector('#cb'),lb=document.querySelector('#lb');cb.addEventListener('click',()=>{lb.hidden=false;cb.setAttribute('aria-expanded','true');cb.setAttribute('aria-activedescendant','o1');});document.addEventListener('keydown',e=>{if(e.key==='Escape'){lb.hidden=true;cb.setAttribute('aria-expanded','false');}});}</script></body></html>`);
    const combo = (await probes.discoverDeep(dpage)).triggers.find(t => t.name === 'All departments');
    const comboResult = await dpage.evaluate(measureDOM, { ...deep(['layer.behaviour']), probe: await probes.openLayer(dpage, combo) });
    assert.deepEqual(comboResult.issues, [], 'a select-only combobox keeps focus on itself while its listbox is open: ' + JSON.stringify(comboResult.issues));
    await dpage.setContent('<details><summary>Queue operations</summary><p>Drain the queue from the runbook.</p></details>');
    const disclosure = (await probes.discoverDeep(dpage)).triggers.find(t => t.name === 'Queue operations');
    const disclosureResult = await dpage.evaluate(measureDOM, { ...deep(['layer.behaviour']), probe: await probes.openLayer(dpage, disclosure) });
    assert.deepEqual(disclosureResult.issues, [], 'a <details> disclosure opens in place and is judged by the page rules: ' + JSON.stringify(disclosureResult.issues));
    console.log('PASS layer.behaviour allows a combobox keeping focus and an in-place disclosure');
    assert.ok(!(await probes.discoverDeep(dpage)).triggers.some(t => /delete/i.test(t.name)), 'discovery never offers a write-named trigger');
    await dpage.setContent('<button aria-haspopup="dialog">Delete record</button><button aria-haspopup="dialog">Start call</button>');
    assert.deepEqual((await probes.discoverDeep(dpage)).triggers, [], 'write- and call-named triggers are never opened');
    console.log('PASS discovery skips write- and call-named triggers');

    // focus.visible: Tab through the page.
    const focusCase = async css => {
      await dpage.setContent(`<!doctype html><html><head><style>body{font:14px system-ui} ${css}</style></head><body><button>One</button><button>Two</button><a href="#x">Three</a><input aria-label="Four"></body></html>`);
      const probe = await probes.focusWalk(dpage, { count: 4 });
      return dpage.evaluate(measureDOM, { ...deep(['focus.visible']), probe });
    };
    await dpage.setContent('<button>First</button><button tabindex="-1">Programmatic</button><button>Last</button>');
    await dpage.getByRole('button', { name: 'Last' }).focus();
    const fromEnd = await probes.focusWalk(dpage);
    assert.equal(fromEnd.total, 2);
    assert.deepEqual(fromEnd.steps.map(step => step.name), ['First', 'Last'], 'focus walks reset the browser navigation start and count sequential controls');
    assert.deepEqual((await focusCase('')).issues, [], 'the browser focus ring passes');
    assert.deepEqual((await focusCase('button:focus-visible{outline:none;box-shadow:0 0 0 2px #2563eb}')).issues, [], 'a ring drawn as a shadow passes');
    assert.ok((await focusCase('button:focus{outline:none}')).issues.some(i => i.rule === 'focus.visible' && i.property === 'no visible focus indicator'), 'outline:none with no replacement fails');
    assert.ok((await focusCase('a{position:absolute;left:-9999px}')).issues.some(i => i.rule === 'focus.visible' && i.property === 'focused element not visible'), 'a focusable that stays off screen when focused fails');
    console.log('PASS focus.visible: rings pass; a removed outline and an off-screen focus target fail');

    // state.data: the probe's interception, and the rule judging the rendered state.
    const dataHtml = `<!doctype html><html><body style="font:14px system-ui"><main><h1>Runs</h1><div id="out">Loading…</div></main><script>
fetch('/api/runs').then(r => r.ok ? r.json() : Promise.reject(r.status)).then(d => { document.querySelector('#out').innerHTML = '<table><thead><tr><th>Name</th></tr></thead><tbody>' + d.runs.map(x => '<tr><td>' + x.name + '</td></tr>').join('') + '</tbody></table>'; }).catch(() => {});
</script></body></html>`;
    // A real loopback server: interception fetches the original response before rewriting it.
    const http = await import('node:http');
    const server = http.createServer((req, res) => { if (req.url.startsWith('/api/slow')) { setTimeout(() => { res.setHeader('content-type', 'application/json'); res.end('{"name":"late"}'); }, 600); return; } if (req.url.startsWith('/api/')) { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ runs: [{ id: 'r1', name: 'nightly' }, { id: 'r2', name: 'canary' }], canExport: true })); } else { res.setHeader('content-type', 'text/html'); res.end(dataHtml); } });
    await new Promise(r => server.listen(0, '127.0.0.1', r));
    const dataBase = `http://127.0.0.1:${server.address().port}`;
    const dctx = await browser.newContext();
    const dp = await dctx.newPage();
    const dataCase = async (mode, wait = 'table, #out') => {
      const handle = await probes.interceptData(dp, { mode, permissions: mode === 'denied' ? '/api/runs' : undefined });
      await dp.goto(`${dataBase}/runs`);
      await dp.waitForTimeout(300);
      const text = await dp.locator('#out').innerText();
      const probe = { kind: 'data-state', mode, intercepted: handle.stats.intercepted };
      const r = await dp.evaluate(measureDOM, { ...deep(['state.data']), selectors: { ...dselectors, contentColumns: 'main' }, probe });
      await handle.release();
      return { text, r, rows: await dp.locator('tbody tr').count() };
    };
    const many = await dataCase('many'); assert.equal(many.rows, 60, 'many-rows fills a list to 60 rows');
    const long = await dataCase('long'); assert.ok(long.text.length > 150, 'long-text lengthens names');
    const empty = await dataCase('empty'); assert.equal(empty.rows, 0, 'empty clears every list');
    assert.ok(empty.r.issues.some(i => i.rule === 'state.data' && i.property === 'empty: table explains itself'), 'a header row over nothing fails the empty state: ' + JSON.stringify(empty.r.issues));
    const error = await dataCase('error');
    assert.ok(error.r.issues.some(i => i.rule === 'state.data' && i.property === 'error: message shown'), 'a silent failure fails the error state: ' + JSON.stringify(error.r.issues));
    const loading = await dataCase('loading'); assert.match(loading.text, /Loading/, 'loading holds the response');
    assert.deepEqual(loading.r.issues, [], 'a page saying Loading… passes the loading state');
    console.log('PASS interceptData renders empty, error, loading, long-text and many-row states in the audit context only');
    const judged = async (body, mode) => { await dp.setContent(`<main>${body}</main>`); return dp.evaluate(measureDOM, { ...deep(['state.data']), selectors: { ...dselectors, contentColumns: 'main' }, probe: { kind: 'data-state', mode, intercepted: 1 } }); };
    assert.deepEqual((await judged('<h1>Runs</h1><table><thead><tr><th>Name</th></tr></thead><tbody></tbody></table><div data-ui-empty>No runs yet</div>', 'empty')).issues, [], 'an empty table with an empty state passes');
    assert.deepEqual((await judged('<h1>Runs</h1><div role="alert">Couldn\'t load runs. Try again.</div>', 'error')).issues, [], 'a written error passes');
    assert.ok((await judged('<h1>Runs</h1><p>{"error":"audit_injected_failure"}</p>', 'error')).issues.some(i => i.property === 'error: raw error text'), 'a raw payload shown as the message fails');
    assert.ok((await judged('', 'loading')).issues.some(i => i.property === 'loading: indicator'), 'a blank page while loading fails');
    assert.deepEqual((await judged('<div aria-busy="true" class="skeleton"></div>', 'loading')).issues, [], 'a busy skeleton passes');
    // A response landing after its state was released must not throw inside the page's context.
    for (const mode of ['long', 'loading', 'error']) {
      const late = await probes.interceptData(dp, { mode });
      await dp.goto(`${dataBase}/runs`); dp.evaluate(() => fetch('/api/slow').catch(() => {})).catch(() => {});
      await dp.waitForTimeout(100); await late.release(); await dp.waitForTimeout(900);
      assert.equal(await dp.evaluate(() => 1 + 1), 2, `the page survives a late ${mode} response after release`);
    }
    console.log('PASS interception released mid-request leaves the page alive');
    // A page that writes in reaction to a data state (a logout after a 500) is stopped and reported.
    const writer = await probes.interceptData(dp, { mode: 'error' });
    await dp.goto(`${dataBase}/runs`);
    await dp.evaluate(() => fetch('/api/session/logout', { method: 'POST' }).catch(() => {}));
    await dp.waitForTimeout(200);
    assert.deepEqual(writer.stats.blockedWrites, ['POST /api/session/logout'], 'the write was blocked and recorded');
    const writeJudged = await dp.evaluate(measureDOM, { ...deep(['state.data']), selectors: { ...dselectors, contentColumns: 'main' }, probe: { kind: 'data-state', mode: 'error', intercepted: writer.stats.intercepted, blockedWrites: writer.stats.blockedWrites } });
    assert.ok(writeJudged.issues.some(i => i.property === 'error: writes attempted'), 'state.data reports the attempted write');
    await writer.release();
    console.log('PASS data states block and report writes');
    await dctx.close(); server.close();
    console.log('PASS state.data: empty, error and loading pages must explain themselves');

    // Cross-route consistency and theme parity, through the runner.
    const routes = ['/a', '/b', '/c', '/d', '/e'];
    const pageFor = (route, dark) => `<!doctype html><html><head><style>body{margin:0;font:14px system-ui;${dark ? 'background:#111;color:#eee' : ''}} h1{font-size:${route === '/e' ? 24 : 20}px;font-weight:600;line-height:28px;margin:0} [data-shell-nav]{padding:24px} .box{border:1px solid ${dark && route === '/d' ? '#111' : '#888'};padding:${dark && route === '/c' ? 20 : 16}px}</style></head><body><div data-shell-nav><h1>Title ${route}</h1><section data-ui-section class="box"><button>Act</button></section></div></body></html>`;
    const crossPath = path.join(temp, 'cross.contract.json');
    fs.writeFileSync(crossPath, JSON.stringify({ ...fullContract, rules: fullContract.rules.filter(r => ['consistency.fingerprint', 'theme.parity'].includes(r.id)) }));
    const cross = await runAudit(browser, {
      baseURL: 'http://cross.test', selectors: dselectors, contract: crossPath,
      authenticate: async context => context.route('http://cross.test/**', route => { const u = new URL(route.request().url()); return route.fulfill({ contentType: 'text/html', body: pageFor(u.pathname, u.searchParams.get('t') === 'dark') }); }),
      cases: async () => routes.map(r => ({ tenant: 'fixture', path: r })),
      ready: async p => p.locator('h1').waitFor(),
      theme: async (p, theme) => { if (theme === 'dark') await p.goto(p.url().split('?')[0] + '?t=dark'); },
      assertRoute: async () => {},
    }, { out: path.join(temp, 'cross'), themes: 'light,dark', widths: '1280', height: 800, screenshots: false });
    const crossIssues = cross.cases.flatMap(c => c.issues.map(i => ({ ...i, route: c.route, theme: c.theme })));
    assert.ok(crossIssues.some(i => i.rule === 'consistency.page-title' && i.route === '/e'), 'the one route whose title is 24px is a consistency outlier: ' + JSON.stringify(crossIssues));
    assert.ok(!crossIssues.some(i => i.rule === 'consistency.page-title' && i.route !== '/e'), 'the majority routes are not reported');
    assert.ok(cross.consistency.some(f => f.family === 'page-title' && f.values.length === 2), 'the report lists the family\'s distinct values');
    assert.ok(crossIssues.some(i => i.rule === 'theme.parity' && i.route === '/c' && i.theme === 'dark' && /^size/.test(i.property)), 'padding that changes with the theme breaks parity');
    assert.ok(crossIssues.some(i => i.rule === 'theme.parity' && i.route === '/d' && i.property === 'border visibility'), 'a border that vanishes in dark breaks parity');
    assert.ok(!crossIssues.some(i => i.rule === 'theme.parity' && ['/a', '/b', '/e'].includes(i.route)), 'colour-only theme changes keep parity');
    const split = consistencyOutliers([['/a', 20], ['/b', 20], ['/c', 24], ['/d', 24]].map(([route, size]) => ({ route, state: 'default', width: 1280, samples: [1], issues: [], fingerprints: [{ family: 'page-title', key: '*', value: JSON.stringify({ fontSize: size }), selector: 'h1' }] })));
    assert.equal(split.issues.length, 0, 'an even split has no majority to deviate from');
    console.log('PASS consistency outliers (minority values across routes) and theme parity (boxes and borders light vs dark)');
    assert.ok(cross.gate.deep > 0 && cross.gate.resting === 0, 'consistency and parity findings count toward the deep gate, not the resting-state gate: ' + JSON.stringify(cross.gate));
    assert.ok(isDeepRule(fullContract, 'consistency.page-title') && !isDeepRule(fullContract, 'table.geometry'), 'isDeepRule separates the families');
    // measureCase: the runner's measure-twice step, exported for other runners.
    await dpage.setContent(deepHtml);
    const once = await measureCase(dpage, { ...deep(['align.grid']) });
    assert.equal(once.stable, true, 'a still page measures stable'); assert.deepEqual(once.issues, []);
    // Layered important transitions survive an unlayered duration override.
    // Settle their endpoint without exempting the control from its box rule.
    const transitionContract = { ...fullContract, rules: [{ id: 'fixture.control-height', kind: 'box', selector: '#fade', properties: { height: 28 } }] };
    for (const height of [28, 18]) {
      await dpage.setContent(`<style>@layer controls { #fade { transition: background-color 10s linear !important; } }</style><button id="fade" style="height:${height}px;background:rgb(100,90,200)">Choice</button>`);
      await dpage.evaluate(async () => { const el = document.querySelector('#fade'); getComputedStyle(el).backgroundColor; await new Promise(r => requestAnimationFrame(r)); el.style.backgroundColor = 'transparent'; });
      await dpage.waitForFunction(() => document.querySelector('#fade').getAnimations().some(a => a instanceof CSSTransition));
      const faded = await measureCase(dpage, { contract: transitionContract, selectors: {} });
      assert.equal(faded.stable, true, 'a finite CSS transition is measured at its endpoint');
      assert.equal(await dpage.$eval('#fade', el => getComputedStyle(el).backgroundColor), 'rgba(0, 0, 0, 0)');
      assert.equal(faded.issues.some(i => i.rule === 'fixture.control-height'), height !== 28, 'a malformed endpoint still fails');
    }
    await dpage.setContent(deepHtml);
    await dpage.evaluate(() => { let n = 0; const list = document.querySelector('#list'); const tick = () => { list.style.marginTop = (n++ % 40) + 'px'; requestAnimationFrame(tick); }; tick(); });
    const moving = await measureCase(dpage, { ...deep(['density.table-first']) });
    assert.ok(moving.stable === false && moving.issues.some(i => i.rule === 'coverage.stability' && i.moved?.length), 'a page that keeps moving is reported unstable with what moved: ' + JSON.stringify(moving.issues));
    // Aggregate fingerprint counts need a concrete owner in their diagnostic.
    let measurementPass = 0;
    const fingerprintMotion = await measureCase({
      addStyleTag: async () => {},
      evaluate: async fn => fn === measureDOM ? {
        issues: [],
        samples: [{ rule: 'consistency.fingerprint', selector: 'document', property: 'fingerprints', actual: measurementPass ? 0 : 1 }],
        fingerprints: measurementPass++ ? [] : [{ family: 'button', key: 'height=28', selector: '#moving-control', value: '{"height":28}' }],
      } : undefined,
    }, { contract: fullContract, selectors: dselectors });
    assert.equal(fingerprintMotion.stable, false);
    assert.ok(fingerprintMotion.issues[0].moved.some(x => x.selector === '#moving-control' && x.second === 'absent'));
    // classifyContext: a page outside the app frame is recorded, not judged; a placeholder reason fails coverage.
    const ctxRun = await runAudit(browser, {
      baseURL: 'http://cross.test', selectors: dselectors, contract: crossPath,
      authenticate: async context => context.route('http://cross.test/**', route => route.fulfill({ contentType: 'text/html', body: pageFor('/e', false) })),
      cases: async () => [{ tenant: 'fixture', path: '/signin' }, { tenant: 'fixture', path: '/blank' }],
      ready: async p => p.locator('h1').waitFor(), theme: async () => {}, assertRoute: async () => {},
      classifyContext: async (p, spec) => ({ skip: true, kind: 'outside-app-frame', reason: spec.path === '/signin' ? 'The identity provider\'s sign-in page is not part of the app' : 'TODO' }),
    }, { out: path.join(temp, 'ctx'), themes: 'light', widths: '1280', height: 800, screenshots: false });
    assert.deepEqual(ctxRun.cases[0].issues, [], 'a documented outside-the-app page is recorded without findings');
    assert.equal(ctxRun.cases[0].context.kind, 'outside-app-frame');
    assert.ok(ctxRun.cases[1].issues.some(i => i.rule === 'coverage.context'), 'a placeholder context reason fails coverage');
    console.log('PASS exported loadContract / measureCase / isDeepRule, the resting vs deep gate, and the classifyContext hook');
    await dpage.close();
  }

  const cliBase = ['--project', path.resolve(project), '--adapter', path.join(temp, 'cli-adapter.mjs'), '--out', path.join(temp, 'cli')];
  assert.equal(parseAuditArgs([...cliBase, '--strict-coverage']).strictCoverage, true);
  assert.throws(() => parseAuditArgs([...cliBase, '--strict-coverage=false']), /Unknown/);
  assert.throws(() => parseAuditArgs(['--project', '--strict-coverage']), /missing/);
  assert.throws(() => parseAuditArgs([...cliBase, '--states', 'typo']), /states/);
  await assert.rejects(runAudit(browser, adapter, { out: temp, strictCoverage: 'yes' }), /strictCoverage must be boolean/);
  fs.writeFileSync(path.join(temp, 'cli-adapter.mjs'), `export default {
    baseURL: 'http://audit.test', selectors: ${JSON.stringify(selectors)}, contract: ${JSON.stringify(legacyContractPath)},
    authenticate: async context => context.route('**/*', route => route.fulfill({ contentType: 'text/html', body: ${JSON.stringify(html)} })),
    cases: async options => [{ tenant: 'fixture', path: '/good', composerExpectation: ({ required: {mode:'required'}, exempt: {mode:'exempt',reason:'Archived conversation does not accept new messages.'}, placeholder: {mode:'exempt',reason:'TODO'}, malformed: {}, typo: {mode:'requried'} })[options.path] }],
    ready: async p => p.locator('#header').waitFor(), theme: async () => {},
  };`);
  for (const [name, flags, expectedExit, expectedFailures = 0] of [
    ['advisory', [], 0], ['strict-unclassified', ['--strict-coverage'], 1], ['strict-classified', ['--strict-coverage', '--path', 'required'], 0],
    ['strict-exempt', ['--strict-coverage', '--path', 'exempt'], 0],
    ['advisory-placeholder', ['--path', 'placeholder'], 1, 1],
    ['advisory-malformed', ['--path', 'malformed'], 1, 1],
    ['advisory-typo', ['--path', 'typo'], 1, 1],
  ]) {
    const out = path.join(temp, name);
    const cli = spawnSync(process.execPath, [fileURLToPath(new URL('./audit.mjs', import.meta.url)), ...cliBase, '--out', out, '--themes', 'light', '--widths', '1280', '--states', 'default', '--no-screenshots', ...flags], { encoding: 'utf8', timeout: 60000 });
    assert.equal(cli.status, expectedExit, `${name} CLI exit: ${cli.stdout} ${cli.stderr}`);
    const receipt = JSON.parse(fs.readFileSync(path.join(out, 'report.json'), 'utf8'));
    assert.equal(receipt.failures, expectedFailures, 'invalid policies fail coverage even in advisory mode; omitted policies stay separate from DOM findings');
    assert.equal(receipt.exitCode, expectedExit);
  }
  console.log('PASS CLI strict coverage propagation, validation and real exit codes; failed readiness cannot resolve prior findings');
  assert.throws(() => validateContract({ version: 1, rules: [{id:'a',kind:'bogus'}] }));
  // A form, card toolbar and standalone shelf body must be measured even with no breadcrumb.
  {
    const contractPage = await browser.newPage();
    const ids = ['toolbar.inset', 'collection.cards-inset', 'page.body-inset', 'form.text-control-height'];
    const subset = { ...fullContract, rules: fullContract.rules.filter(r => ids.includes(r.id)) };
    const fixture = `<style>:root{--ui-page-gutter:24px;--ui-table-inset:12px}*{box-sizing:border-box}</style><main data-page-body="inset" style="padding:0 24px"><div data-toolbar-variant="collection" data-collection-layout="cards" style="padding:0">Find hangouts</div><div data-toolbar-variant="collection" style="padding:0 12px">Ordinary table toolbar</div><div data-ui-dialog="form"><input type="text" style="height:28px" aria-label="Name"><div data-ui-control="combobox"><div style="height:28px"><input role="combobox" style="height:16px" aria-label="Person"></div></div></div></main>`;
    const check = () => contractPage.evaluate(measureDOM, { ...payload, required: [], contract: subset });
    await contractPage.setContent(fixture);
    assert.deepEqual((await check()).issues, []);
    for (const [selector, property, value, rule] of [
      ['[data-page-body]', 'paddingLeft', '0px', 'page.body-inset'],
      ['[data-collection-layout]', 'paddingLeft', '12px', 'collection.cards-inset'],
      ['[data-toolbar-variant]:not([data-collection-layout])', 'paddingLeft', '0px', 'toolbar.inset'],
      ['input', 'height', '40px', 'form.text-control-height'],
      ['[data-ui-control="combobox"] > div', 'height', '40px', 'form.text-control-height'],
    ]) {
      await contractPage.setContent(fixture);
      await contractPage.evaluate(([selector, property, value]) => { document.querySelector(selector).style[property] = value; }, [selector, property, value]);
      assert.ok((await check()).issues.some(i => i.rule === rule), `${rule} rejects the reported defect`);
    }
    const activityRules = { ...fullContract, rules: fullContract.rules.filter(r => r.id === 'page.activity-unique') };
    const activity = '<section data-page-activity>Activity and summaries</section>';
    const checkActivity = () => contractPage.evaluate(measureDOM, { ...payload, required: [], contract: activityRules });
    await contractPage.setContent(`<main>${activity}</main>`);
    assert.deepEqual((await checkActivity()).issues, []);
    await contractPage.setContent(`<main>${activity}${activity}</main>`);
    assert.ok((await checkActivity()).issues.some(i => i.rule === 'page.activity-unique'));
    // Separate page/pane owners may each show their own activity.
    await contractPage.setContent(`<main>${activity}</main><aside>${activity}</aside>`);
    assert.deepEqual((await checkActivity()).issues, []);
    await contractPage.close();
    console.log('PASS standalone gutters, card toolbars and compact form controls');
  }
  {
    const ids = ['meeting.badge-contained', 'call.header-inset'];
    const page = await browser.newPage();
    const subset = { ...fullContract, rules: fullContract.rules.filter(r => ids.includes(r.id)) };
    const fixture = `<style>*{box-sizing:border-box}button{position:relative;display:inline-flex;align-items:center;gap:6px;height:32px;padding:6px} [data-ui-badge]{display:inline-flex;height:18px;min-width:18px}</style><div data-ui-meeting-toolbar><button>People <span data-ui-badge="count">99+</span><span data-ui-badge="count">12</span></button><button>Raise <span data-ui-badge="count">1</span></button></div><section data-call-dock style="padding-top:12px"><div data-call-dock-header>Call controls</div></section>`;
    const check = () => page.evaluate(measureDOM, { ...payload, required: [], contract: subset });
    await page.setContent(fixture);
    assert.deepEqual((await check()).issues, []);
    await page.locator('[data-ui-badge]').first().evaluate(el => { el.style.position = 'absolute'; el.style.right = '-12px'; });
    assert.ok((await check()).issues.some(i => i.rule === 'meeting.badge-contained'));
    await page.setContent(fixture);
    await page.locator('[data-call-dock]').evaluate(el => { el.style.paddingTop = '0'; });
    assert.ok((await check()).issues.some(i => i.rule === 'call.header-inset'));
    await page.close();
    console.log('PASS contained meeting counts and call control top inset');
  }
  {
    const page = await browser.newPage();
    const subset = { ...fullContract, rules: fullContract.rules.filter(r => r.id.startsWith('chat.message-') || r.id === 'align.grid') };
    const fixture = `<style>:root{--ui-table-inset:12px;--ui-content-gutter:16px}*{box-sizing:border-box}main{width:800px} [data-testid=chat-message]{padding:0 8px}[data-testid=message-row]{display:flex;gap:8px} .slot{width:20px;height:20px;flex-shrink:0;text-align:center}.body{flex:1;min-width:0}[data-testid=message-row-header]{display:flex;justify-content:space-between}p{margin:8px 0}</style><main id="chat"><nav data-trail>Conversation</nav><div data-testid="chat-message"><div data-testid="message-row"><div class="slot">A</div><div class="body"><div data-testid="message-row-header"><span>Alex</span><button>More</button></div><div data-testid="message-row-content"><p>Message text</p></div><div data-testid="message-row-footer">Reply</div></div></div></div><p id="neighbor">Ordinary section</p></main>`;
    const check = () => page.evaluate(measureDOM, { ...payload, required: [], selectors: { ...selectors, contentColumns: '#chat', trail: '[data-trail]' }, contract: subset });
    await page.setContent(fixture);
    assert.deepEqual((await check()).issues, [], 'message text follows the avatar while its actions follow the hover inset');
    for (const [selector, property, value, rule] of [
      ['[data-testid=chat-message]', 'paddingLeft', '4px', 'chat.message-inset'],
      ['[data-testid=message-row]', 'gap', '12px', 'chat.message-gap'],
      ['.slot', 'width', '28px', 'chat.message-avatar-slot'],
      ['#neighbor', 'paddingLeft', '5px', 'align.grid'],
    ]) {
      await page.setContent(fixture);
      await page.locator(selector).evaluate((el, x) => { el.style[x.property] = x.value; }, { property, value });
      assert.ok((await check()).issues.some(i => i.rule === rule), `message profile must catch ${rule}`);
    }
    await page.close();
    console.log('PASS message avatar/inset profile preserves ordinary neighboring grid checks');
  }
  {
    const page = await browser.newPage();
    const subset = { ...fullContract, rules: fullContract.rules.filter(r => r.id === 'consistency.fingerprint') };
    const fixture = `<style>button{font:14px sans-serif;height:28px;border:1px solid #222;border-radius:4px;background:#fff}[role=tab]{height:34px;border:0;border-bottom:2px solid blue;border-radius:0;background:transparent;padding:0 12px;font-weight:500}</style><div data-shell-nav><button id="ordinary">Action</button><button id="tab" role="tab">Chat</button></div>`;
    const check = () => page.evaluate(measureDOM, { ...payload, required: [], contract: subset });
    await page.setContent(fixture);
    const before = await check();
    assert.deepEqual(before.fingerprints.filter(f => f.family === 'button').map(f => f.selector), ['#ordinary']);
    assert.equal(before.fingerprints.filter(f => f.family === 'tab').length, 1);
    await page.locator('#tab').evaluate(el => { el.style.borderColor = 'transparent'; });
    assert.deepEqual((await check()).fingerprints, before.fingerprints, 'selection paint cannot reclassify a tab as a button');
    const outliers = changed => consistencyOutliers(Array.from({ length: 5 }, (_, i) => ({ route: `/fixture-${i}`, state: 'default', width: 1280, samples: [1], issues: [], fingerprints: i === 4 ? changed.fingerprints : before.fingerprints })));
    await page.locator('#tab').evaluate(el => { el.style.height = '50px'; });
    assert.ok(outliers(await check()).issues.some(i => i.issue.rule === 'consistency.tab'), 'the tab is still measured and wrong geometry fails');
    await page.setContent(fixture);
    await page.locator('#ordinary').evaluate(el => { el.style.height = '44px'; });
    assert.ok(outliers(await check()).issues.some(i => i.issue.rule === 'consistency.button'), 'ordinary buttons retain their independent contract');
    await page.close();
    console.log('PASS tabs retain their own fingerprint while painted buttons remain checked');
  }
  {
    const page = await browser.newPage();
    const subset = { ...fullContract, rules: fullContract.rules.filter(r => ['composer.dialogue-tools', 'composer.choice-input'].includes(r.id)) };
    const check = () => page.evaluate(measureDOM, { ...payload, required: [], contract: subset });
    await page.setContent('<section data-composer-dialogue="choice"><button>1 Choose</button></section><section data-composer-dialogue="text"><textarea aria-label="Answer"></textarea></section><aside><div role="toolbar"><button>Bold</button></div><textarea aria-label="Discussion"></textarea></aside>');
    assert.deepEqual((await check()).issues, [], 'choice buttons, a permitted answer field, and an ordinary neighboring composer are valid');
    await page.locator('[data-composer-dialogue=choice]').evaluate(el => el.insertAdjacentHTML('beforeend', '<textarea aria-label="Unused input"></textarea>'));
    assert.ok((await check()).issues.some(i => i.rule === 'composer.choice-input'));
    await page.locator('[data-composer-dialogue=text]').evaluate(el => el.insertAdjacentHTML('beforeend', '<div role="toolbar"><button>Bold</button></div>'));
    assert.ok((await check()).issues.some(i => i.rule === 'composer.dialogue-tools'));
    await page.close();
    console.log('PASS prompt dialogue: choices have no input, manual answers have no message tools, ordinary composers retain theirs');
  }
  {
    const page = await browser.newPage();
    const subset = { ...fullContract, rules: fullContract.rules.filter(r => r.id === 'composer.presence') };
    const check = () => page.evaluate(measureDOM, { ...payload, required: [], selectors: { ...selectors, composers: '[data-composer-surface]' }, contract: subset });
    const fixture = '<style>[data-composer-surface]{min-height:28px}</style><section data-composer-surface><div data-composer-dialogue="choice"><button data-composer-prompt-option="one">1 Choose</button></div></section><aside data-composer-surface><textarea aria-label="Discussion"></textarea></aside>';
    await page.setContent(fixture);
    assert.deepEqual((await check()).issues, [], 'an active choice replaces its editor; a neighboring ordinary composer retains its input');
    await page.locator('aside textarea').evaluate(el => el.remove());
    assert.ok((await check()).issues.some(i => i.rule === 'composer.presence'), 'a prompt cannot excuse a missing neighboring editor');
    await page.setContent(fixture);
    await page.locator('[data-composer-prompt-option]').evaluate(el => el.remove());
    assert.ok((await check()).issues.some(i => i.rule === 'composer.presence'), 'an empty prompt marker cannot replace input');
    await page.setContent(fixture);
    await page.locator('[data-composer-dialogue]').evaluate(el => el.setAttribute('data-composer-dialogue', 'number'));
    assert.ok((await check()).issues.some(i => i.rule === 'composer.presence'), 'a manual answer still needs a field');
    await page.close();
    console.log('PASS active choice presence requires real answers and leaves neighboring editors checked');
  }
  {
    const page = await browser.newPage();
    const subset = { ...fullContract, rules: fullContract.rules.filter(r => r.id === 'navigation.breadcrumb') };
    const check = () => page.evaluate(measureDOM, { ...payload, required: [], contract: subset });
    const fixture = '<style>nav{width:300px}ol{display:flex;list-style:none;padding:0;gap:8px}li{min-width:0}li:last-child{flex:1}a,span{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}</style><nav data-ui-breadcrumbs><ol><li><a href="/designs">Designs</a></li><li><span title="A long design title describing the work in this record">A long design title describing the work in this record</span></li></ol></nav>';
    await page.setContent(fixture);
    assert.deepEqual((await check()).issues, [], 'a single collection level and truncated record title are valid');
    await page.locator('li:last-child span').evaluate(el => el.textContent = 'Design');
    assert.ok((await check()).issues.some(i => i.rule === 'navigation.breadcrumb'), 'singular/plural duplication fails');
    await page.locator('li:last-child span').evaluate(el => el.textContent = 'All designs');
    assert.ok((await check()).issues.some(i => i.rule === 'navigation.breadcrumb'), 'redundant all collection level fails');
    await page.setContent(fixture);
    await page.locator('ol').evaluate(el => el.style.flexDirection = 'column');
    assert.ok((await check()).issues.some(i => i.rule === 'navigation.breadcrumb'), 'wrapped trails fail');
    await page.setContent(fixture);
    await page.locator('li:last-child span').evaluate(el => el.style.textOverflow = 'clip');
    assert.ok((await check()).issues.some(i => i.rule === 'navigation.breadcrumb'), 'silent clipping fails');
    await page.close();
    console.log('PASS breadcrumb distinct levels, single-line layout and explicit ellipsis');
  }
  {
    const page = await browser.newPage();
    const subset = { ...fullContract, rules: fullContract.rules.filter(r => ['align.grid', 'markdown.inline-code-inset', 'notice.marker-gap'].includes(r.id)) };
    const fixture = `<style>:root{--ui-table-inset:12px;--ui-content-gutter:16px}main{width:800px}p{margin:8px 0}code{padding:2px 4px;margin:0}[data-ui-access-notice]{display:flex;gap:8px}.dot{width:8px;flex-shrink:0}</style><main id="prose"><nav data-trail>Runbook</nav><p><code data-ui-inline-code>data/snapshot.json</code> records the captured result.</p><div data-ui-access-notice><span class="dot"></span><div>Read access<br>Only the owner may approve.</div></div><p id="neighbor">Ordinary section</p></main>`;
    const check = () => page.evaluate(measureDOM, { ...payload, required: [], selectors: { ...selectors, contentColumns: '#prose', trail: '[data-trail]' }, contract: subset });
    await page.setContent(fixture);
    assert.deepEqual((await check()).issues, [], 'code background insets do not move the paragraph reading edge');
    for (const [selector, property, value, rule] of [
      ['code', 'paddingLeft', '8px', 'markdown.inline-code-inset'],
      ['code', 'marginLeft', '4px', 'markdown.inline-code-inset'],
      ['[data-ui-access-notice]', 'gap', '10px', 'notice.marker-gap'],
      ['#neighbor', 'paddingLeft', '5px', 'align.grid'],
    ]) {
      await page.setContent(fixture);
      await page.locator(selector).evaluate((el, x) => { el.style[x.property] = x.value; }, { property, value });
      assert.ok((await check()).issues.some(i => i.rule === rule), `prose profile must catch ${rule}`);
    }
    await page.close();
    console.log('PASS inline-code and notice profiles preserve neighboring prose alignment');
  }
  {
    // Build-time density rules: striped tables, separated groups, a page that
    // fits the viewport, and library-owned DOM. Each runs in the resting gate.
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    for (const id of ['table.zebra', 'section.separator', 'page.vertical-budget', 'element.unmarked']) {
      const rule = fullContract.rules.find(r => r.id === id);
      assert.ok(rule && !rule.deep && !isDeepRule(fullContract, id), `${id} is shipped in the resting (non-deep) gate`);
    }
    const judge = (ids, contractIn = fullContract) => page.evaluate(measureDOM, { contract: { ...contractIn, rules: contractIn.rules.filter(r => ids.includes(r.id)) }, selectors: { contentColumns: '#col' } });
    const fails = async (ids, rule, why, contractIn) => { const r = await judge(ids, contractIn); assert.ok(r.issues.some(i => i.rule === rule && i.category === 'violation'), `${rule} must fail: ${why} ${JSON.stringify(r.issues)}`); return r; };
    const passes = async (ids, why, contractIn) => { const r = await judge(ids, contractIn); assert.deepEqual(r.issues, [], `${why}`); return r; };
    const base = '<style>:root{--ui-section-gap:12px}*{box-sizing:border-box}body{margin:0;font:14px/20px system-ui,sans-serif}#col{width:900px;padding:0 24px}td{height:44px;padding:0 12px}.stripe > tbody > tr:nth-child(even){background:#f3f4f6}[role=row]{display:flex;height:44px}</style>';
    const rows = n => Array.from({ length: n }, (_, i) => `<tr><td>Record ${i + 1}</td><td>Ready</td></tr>`).join('');

    // table.zebra
    const zebra = ['table.zebra'];
    await page.setContent(`${base}<main id="col"><table class="stripe"><thead><tr><th>Name</th><th>State</th></tr></thead><tbody>${rows(6)}</tbody></table><table><tbody>${rows(3)}</tbody></table></main>`);
    await passes(zebra, 'a striped table and a three-row table are valid');
    await page.locator('table.stripe').evaluate(el => el.classList.remove('stripe'));
    await fails(zebra, 'table.zebra', 'six flat rows');
    await page.locator('table').first().evaluate(el => { const w = document.createElement('div'); w.setAttribute('data-ui-table-striped', ''); el.before(w); w.append(el); });
    await passes(zebra, 'the library stripe marker is trusted');
    await page.setContent(`${base}<main id="col"><table data-ui-table><tbody data-ui-table-striped>${rows(6)}</tbody></table></main>`);
    await passes(zebra, 'the stripe marker on the body (Table/DataTable) is trusted');
    await page.setContent(`${base}<main id="col"><div role="table"><div role="row"><span role="columnheader">Name</span></div>${Array.from({ length: 5 }, (_, i) => `<div role="row"><span role="cell">Row ${i}</span></div>`).join('')}</div></main>`);
    await fails(zebra, 'table.zebra', 'a hand-rolled role=table without stripes');
    await page.evaluate(() => document.querySelectorAll('[role=row]:nth-child(odd) [role=cell]').forEach(c => { c.style.background = '#eef'; c.style.flex = '1'; }));
    await passes(zebra, 'a cell-painted stripe on a hand-rolled table is valid');
    await page.setContent(`${base}<main id="col"><article role="document"><table><tbody>${rows(6)}</tbody></table></article></main>`);
    await passes(zebra, 'a table authored inside a document is prose');

    // section.separator
    const sep = ['section.separator'];
    const groupsFixture = `${base}<main id="col"><div id="stack" style="display:flex;flex-direction:column;gap:12px"><section data-ui-section><h2>Overview</h2><p style="margin:0">Summary text</p></section><section data-ui-section><h2 style="margin-top:0">Activity</h2><p style="margin:0">Recent events</p></section></div></main>`;
    await page.setContent(groupsFixture);
    await passes(sep, 'groups a section gap apart are separated');
    await page.locator('#stack').evaluate(el => { el.style.gap = '0'; el.querySelectorAll('h2').forEach(h => { h.style.margin = '0'; }); });
    await fails(sep, 'section.separator', 'flush stacked groups');
    await page.locator('#stack > section:nth-child(2)').evaluate(el => { el.style.borderTop = '1px solid #d1d5db'; });
    await passes(sep, 'a top border separates flush groups');
    await page.locator('#stack > section:nth-child(2)').evaluate(el => { el.style.borderTop = ''; el.before(document.createElement('hr')); });
    await passes(sep, 'a divider element separates flush groups');
    await page.locator('#stack hr').evaluate(el => el.remove());
    await page.locator('#stack > section:nth-child(2)').evaluate(el => { el.style.background = '#f3f4f6'; });
    await passes(sep, 'distinct surfaces separate flush groups');
    await page.locator('#stack > section:nth-child(2)').evaluate(el => { el.style.background = ''; el.parentElement.style.flexDirection = 'row'; });
    await passes(sep, 'side-by-side groups are a columns concern');
    await page.setContent(`${base}<main id="col"><div><section><b>Hand-rolled one</b></section><section><b>Hand-rolled two</b></section></div></main>`);
    await fails(sep, 'section.separator', 'hand-rolled flush sections');

    // page.vertical-budget
    const budget = ['page.vertical-budget'];
    const sections = (n, h = 100) => Array.from({ length: n }, (_, i) => `<section data-ui-section style="height:${h}px;margin-bottom:12px">Section ${i + 1}</section>`).join('');
    await page.setContent(`${base}<main id="col"><div data-page-template="DetailPage"><header><h1>Record</h1></header><div role="tablist"><button role="tab" aria-selected="true">Overview</button><button role="tab">Activity</button><button role="tab">Settings</button></div><div role="tabpanel">${sections(2)}</div><div role="tabpanel" hidden>${sections(6)}</div></div></main>`);
    await passes(budget, 'a DetailPage shows one tab of groups at rest');
    await page.setContent(`${base}<main id="col">${sections(6)}</main>`);
    await fails(budget, 'page.vertical-budget', 'six stacked sections');
    await page.setContent(`${base}<main id="col"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">${sections(4)}</div>${sections(2)}</main>`);
    await passes(budget, 'a dashboard row of tiles counts as one row');
    await page.setContent(`${base}<main id="col"><section data-ui-section style="height:2000px">Long</section></main>`);
    const long = await fails(budget, 'page.vertical-budget', 'a page two and a half viewports long');
    assert.ok(long.issues.some(i => i.property === 'content height / viewport'), 'the length, not the section count, fails');
    await page.locator('#col').evaluate(el => el.setAttribute('data-collection-page', ''));
    await passes(budget, "a collection's own rows may scroll");
    await page.setContent(`${base}<main id="col" style="height:800px;overflow:hidden"><div style="height:100%;overflow:auto"><section data-ui-section style="height:2000px">Long</section></div></main>`);
    await fails(budget, 'page.vertical-budget', 'a fill-layout shell scrolling an inner body');
    const tuned = withRuleOptions(fullContract, { 'page.vertical-budget': { maxScrollRatio: 3 } });
    await passes(budget, 'an adapter may raise the length budget', tuned);
    assert.throws(() => withRuleOptions(fullContract, { 'page.vertical-budget': { selector: 'body' } }), /only a declared threshold/);
    assert.throws(() => withRuleOptions(fullContract, { 'page.vertical-budget': { maxStacked: 9 } }), /only a declared threshold/);
    assert.throws(() => withRuleOptions(fullContract, { 'page.nope': { maxScrollRatio: 9 } }), /unknown rule/);

    // element.unmarked
    const marked = ['element.unmarked'];
    const library = `${base}<main id="col"><section data-ui-section><button data-variant="primary">Save</button><div data-table-scroller><table data-ui-table><tbody><tr><td>Row</td></tr></tbody></table></div><input data-ui-control="input" aria-label="Name"><textarea data-ui-control="textarea" aria-label="Notes"></textarea><button data-ui-control="switch" role="switch" aria-checked="false"></button><nav aria-label="Pages"><button data-ui-part>2</button><span role="button" tabindex="0" data-ui-part>Next</span></nav><div data-ui-board><button>Card action</button></div><select data-ui-native-select data-ui-native-reason="OS picker"><option>A</option></select><div data-toolbar-variant="collection"><input aria-label="Search"></div><div role="tablist"><button role="tab">Tab</button></div><button data-ui-control="select">Pick</button></section></main><button id="outside">Outside the content column</button>`;
    await page.setContent(library);
    await passes(marked, 'library controls, library-internal parts and composite internals are valid');
    for (const [name, mutate] of [
      ['button', () => document.querySelector('[data-variant]').removeAttribute('data-variant')],
      ['button', () => document.querySelector('section').insertAdjacentHTML('beforeend', '<div role="button" tabindex="0">Div button</div>')],
      ['table', () => document.querySelector('[data-ui-table]').removeAttribute('data-ui-table')],
      ['select', () => document.querySelector('select').removeAttribute('data-ui-native-select')],
      ['input', () => document.querySelector('section').insertAdjacentHTML('beforeend', '<input aria-label="Name">')],
      ['input', () => document.querySelector('[data-ui-control="input"]').removeAttribute('data-ui-control')],
      ['button', () => document.querySelector('section').insertAdjacentHTML('beforeend', '<button>Raw in page content</button>')],
      ['button', () => document.querySelector('section').insertAdjacentHTML('beforeend', '<div data-ui-card><button>Raw in a Card</button></div>')],
      ['button', () => document.querySelector('nav [data-ui-part]').removeAttribute('data-ui-part')],
      ['section', () => document.querySelector('section').removeAttribute('data-ui-section')],
    ]) {
      await page.setContent(library);
      await page.evaluate(mutate);
      const r = await fails(marked, 'element.unmarked', `hand-rolled ${name}`);
      assert.ok(r.issues.some(i => i.property === `unmarked ${name}`), `the finding names the ${name}`);
    }
    await page.setContent(`${base}<main id="col">${'<button>Raw</button>'.repeat(12)}</main>`);
    const flood = await judge(marked);
    assert.equal(flood.issues.length, 11, 'ten located findings and one count of the rest');
    // A library layout primitive rendered as a section (`<Stack as="section">`) is library DOM; a raw section is not.
    await page.setContent(library);
    await page.evaluate(() => { const s = document.querySelector('section'); s.removeAttribute('data-ui-section'); s.setAttribute('data-ui-layout', 'stack'); });
    await passes(marked, 'a Stack/Inline rendered as a section carries data-ui-layout');
    await page.evaluate(() => document.querySelector('section').insertAdjacentHTML('afterend', '<section><p>Raw</p></section>'));
    await fails(marked, 'element.unmarked', 'a raw section beside a library Stack section');

    // Library template markers (contract `librarySelectors`): a page template's column (data-page-column), its
    // trail row (data-page-trail) and title band (data-page-title) are measured with NO adapter binding, and
    // a template nested in another template's column is not a second column.
    const columnRules = ['content.gutter', 'content.header-alignment', 'section.gutter', 'element.unmarked'];
    const bare = ids => page.evaluate(measureDOM, { contract: { ...fullContract, rules: fullContract.rules.filter(r => ids.includes(r.id)) }, selectors: {} });
    const template = `${base}<style>:root{--ui-page-gutter:24px}.g{padding:0 24px}</style><div id="frame" data-page-column style="width:900px;display:flex;flex-direction:column"><div data-page-trail class="g"><nav data-ui-breadcrumbs>Section › View</nav></div><div data-page-title class="g"><h1 style="font-size:20px;margin:0">View</h1></div><div id="body" class="g"><section data-ui-section><p style="margin:0">Body copy</p><button data-variant="primary">Save</button></section><div data-page-column id="nested"><div data-page-trail style="padding:0 60px">nested</div></div></div></div>`;
    await page.setContent(template);
    const clean = await bare(columnRules);
    assert.deepEqual(clean.issues, [], `a library template column passes unbound: ${JSON.stringify(clean.issues)}`);
    assert.ok(clean.samples.some(x => x.rule === 'content.gutter' && /frame/.test(x.selector)), 'the template column is measured without an adapter binding');
    assert.ok(!clean.samples.some(x => x.rule === 'content.gutter' && /nested/.test(x.selector)), 'a template nested in a column is not a second column');
    for (const [why, mutate, rule] of [
      ['body flush to the column edge', () => { document.querySelector('#body').style.padding = '0'; }, 'content.gutter'],
      ['title band indented past the trail', () => { document.querySelector('[data-page-title]').style.paddingLeft = '48px'; }, 'content.header-alignment'],
      ['title band off the page gutter', () => { document.querySelector('[data-page-title]').style.padding = '0 12px'; }, 'section.gutter'],
      ['raw button in a template body', () => document.querySelector('#body').insertAdjacentHTML('beforeend', '<button>Raw</button>'), 'element.unmarked'],
    ]) {
      await page.setContent(template);
      await page.evaluate(mutate);
      const r = await bare(columnRules);
      assert.ok(r.issues.some(i => i.rule === rule && i.category === 'violation'), `${rule} must fail unbound: ${why} ${JSON.stringify(r.issues)}`);
    }
    await page.close();
    console.log('PASS table.zebra, section.separator, page.vertical-budget and element.unmarked catch hand-rolled density defects and accept library pages (layout primitives and template columns included)');
  }
  console.log(`PASS clean four-column layout, repeatability, ${mutations.length} defect mutations, navigation coverage, cross-tenant grouping and honest report comparison`);
} finally { await browser.close(); fs.rmSync(temp, { recursive: true, force: true }); }
