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
import { runAudit, summarize, validateContract } from './run.mjs';
import { probes } from './probes.mjs';
const project = process.argv[process.argv.indexOf('--project') + 1];
if (!project || !process.argv.includes('--project')) throw new Error('Usage: node self-test.mjs --project <package with @playwright/test>');
const { chromium } = createRequire(path.resolve(project, 'package.json'))('@playwright/test');
const contract = JSON.parse(fs.readFileSync(new URL('../references/work-ui.contract.json', import.meta.url)));
validateContract(contract);
const selectors = {
  graphDetailLabels: '[data-ui-text="graph-detail"]', graphMetadataLabels: '[data-ui-text="graph-metadata"]', activePersonCaptions: '[data-ui-text="active-person-caption"]',
  codeLabels: 'code, input[data-ui-text="code"]', railCaptionLabels: '.rail-label, button[data-heading="label"][data-focus-key^="g:"] > span, [data-ui-text="rail-caption"]', railItemLabels: '[data-ui-text="rail-item"]', conversationLabels: '.conversation-label', conversationMetadata: '.conversation-meta', decorativeText: '[aria-hidden="true"]', rowMenuGlyphs: '.row-glyph', keyboardHints: 'kbd', captions: '[data-ui-text="caption"]', tenantControl: '.no-brand', tickerControl: '.no-ticker', avatarControl: '[data-ui-text="avatar"]', header: '#header', footer: '#footer', footerRow: '#footer', shellColumns: '#shell', nestedColumns: '.no-nested', workspaceColumns: '#workspace', splitColumns: '.no-split',
  controls: 'button,input,select,textarea,[role="button"]', nativeSelects: 'select:not([data-ui-native-select][data-ui-native-reason]), select[data-ui-native-reason=""], input[list], datalist', unmarkedListboxes: '[role="listbox"]:not([data-ui-listbox])', listboxOptions: '[data-ui-listbox] [role="option"]', openListboxes: '[data-ui-listbox]', railHeaders: '.rail-caption', toolbarControls: '#toolbar button', collections: '#collection', collectionToolbars: '#toolbar', sectionTitles: '#section',
  tables: 'table', collectionTables: '[data-collection-table] table', composers: '#shelf', nestedComposers: '#shelf [data-composer-surface]', composerBoundary: 'section:has(> [data-collection-command-boundary="embedded"]), #content',
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
</style></head><body><header id="header">Workspace <button class="control"><span class="rail-label" style="font-size:11px">Group</span><span class="conversation-label" style="font-size:13px">Person</span><span class="conversation-meta" style="font-size:11px">Now</span><code style="font-size:11px;font-family:monospace">ID-123</code><span class="avatar" data-ui-text="avatar" style="font-size:9.12px">AB</span></button></header><div id="shell"><aside>Primary<section><h3><button class="control" data-heading="label" data-focus-key="g:fixture"><span id="group-label" style="font-size:11px">Projects</span><span id="group-count" style="font-size:11px">2</span></button></h3><ul><li><button class="control"><span id="rail-title" data-ui-text="rail-item" style="font-size:13px;font-weight:500;line-height:20px">Sample initiative</span></button><button id="rail-sibling-action" class="control" style="font-size:14px">Open</button></li></ul></section></aside><main><div id="workspace"><nav id="secondary">Secondary</nav><section id="content"><div id="section">Section</div><div role="button"><span data-ui-text="graph-detail" style="font-size:11px">Graph detail</span><span data-ui-text="graph-metadata" style="font-size:10px">Revision</span><button class="control" id="graph-nested-action">Open graph</button></div><button class="control"><span data-ui-text="active-person-caption" style="font-size:11px;font-weight:500">Person</span></button><div id="collection"><div id="toolbar"><button class="control">Action</button></div><div data-collection-table data-collection-rows="activatable"><table><thead><tr><th>Name</th><th>State</th></tr></thead><tbody><tr tabindex="0" style="cursor:pointer"><td>Record</td><td>Ready</td></tr></tbody></table></div></div><div id="shelf-wrapper"><div id="shelf" data-composer-surface><div contenteditable="true" role="textbox">Draft</div></div></div></section><aside id="right">Details<div id="dropzone" role="button" tabindex="0" data-ui-dropzone style="border:2px dashed #888">Drop files</div><button id="drop-sibling" class="control">Browse</button><div id="terminal" data-ui-code-surface="terminal"><textarea class="xterm-helper-textarea" aria-label="Terminal input" style="font-size:16px;font-family:monospace;width:8px;height:15px"></textarea></div></aside></div></main></div><footer id="footer">Footer <button id="overflow-count" class="control" data-ui-text="avatar" style="font-size:10px">+3</button></footer></body></html>`;
const browser = await chromium.launch({ headless: true });
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ui-dom-audit-tests-'));
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const payload = { contract, selectors, required: ['$header', '$footer', '$tables', '$composers'], composerExpectation: { mode: 'required' } };
  const measure = () => page.evaluate(measureDOM, payload);
  await page.setContent(html);
  const clean = await measure(); assert.deepEqual(clean.issues, [], JSON.stringify(clean.issues));
  assert.deepEqual((await measure()).samples, clean.samples, 'same DOM produces identical measurements');
  const mutations = [
    ['graph detail typography drift', () => document.querySelector('[data-ui-text="graph-detail"]').style.fontSize='14px', 'graph.detail'],
    ['graph metadata typography drift', () => document.querySelector('[data-ui-text="graph-metadata"]').style.fontSize='8px', 'graph.metadata'],
    ['active person caption typography drift', () => document.querySelector('[data-ui-text="active-person-caption"]').style.fontSize='13px', 'people.active-caption'],
    ['ordinary nested graph control remains checked', () => document.querySelector('#graph-nested-action').style.fontSize='11px', 'control.font-size'],
    ['missing required composer', () => document.querySelector('#shelf').remove(), 'composer.presence'],
    ['empty composer surface', () => document.querySelector('#shelf [contenteditable]').remove(), 'composer.presence'],
    ['unrelated page textbox cannot replace composer input', () => { document.querySelector('#shelf [contenteditable]').remove(); const input = document.createElement('textarea'); document.querySelector('#content').prepend(input); }, 'composer.presence'],
    ['grouped rail caption drift', () => document.querySelector('#group-label').style.fontSize='14px', 'rail.disclosure-label'],
    ['grouped rail count drift', () => document.querySelector('#group-count').style.fontSize='9px', 'rail.disclosure-label'],
    ['grouped rail item size drift', () => document.querySelector('#rail-title').style.fontSize='14px', 'rail.item-label'],
    ['grouped rail item weight drift', () => document.querySelector('#rail-title').style.fontWeight='700', 'rail.item-label'],
    ['grouped rail item line-height drift', () => document.querySelector('#rail-title').style.lineHeight='24px', 'rail.item-label'],
    ['ordinary action beside rail title', () => document.querySelector('#rail-sibling-action').style.fontSize='13px', 'control.font-size'],
    ['rail caption drift', () => document.querySelector('.rail-label').style.fontSize='14px', 'rail.disclosure-label'],
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
    ['open listbox spilling out of the viewport', () => { const u = document.createElement('ul'); u.setAttribute('role', 'listbox'); u.setAttribute('data-ui-listbox', 'select'); u.style.cssText = 'position:fixed;top:780px;left:1200px;width:200px;margin:0;padding:0'; u.innerHTML = '<li role="option" style="font-size:14px;height:40px">One</li>'; document.body.append(u); }, 'listbox.in-viewport'],
    ['missing design token', () => document.documentElement.style.setProperty('--ui-control-sm', 'initial'), 'toolbar.control-height'],
  ];
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
  await page.setContent(html);
  await page.evaluate(() => {
    const section = document.createElement('section'); section.style.margin = '0 24px';
    const ledger = document.createElement('div'); ledger.setAttribute('data-collection-command-boundary', 'embedded');
    ledger.append(document.querySelector('#shelf')); section.append(ledger); document.querySelector('#shelf-wrapper').append(section);
  });
  assert.deepEqual((await measure()).issues, [], 'intentional embedded section may be inset from the page');
  await page.evaluate(() => document.querySelector('[data-collection-command-boundary="embedded"]').style.margin = '0 12px');
  assert.ok((await measure()).issues.some(i => i.rule === 'composer.surface' && i.property === 'shelf left'), 'inset embedded ledger must be measured against its section, not itself');
  console.log('PASS full-page content boundary and intentional embedded-section boundary');
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
  const columnBroken = [
    ['body flush to the rail while the trail and title are inset', () => { document.querySelector('#body').style.padding = '0'; }, 'content.gutter'],
    ['a section action against the window edge', () => { document.querySelector('#body').style.paddingRight = '0'; }, 'content.gutter'],
    ['conversation header starting left of the trail edge', () => { document.querySelector('#title').remove(); const c = document.querySelector('#convo'); c.style.display = 'flex'; c.style.paddingLeft = '16px'; }, 'content.header-alignment'],
    ['title indented past the trail edge', () => { document.querySelector('#title').style.paddingLeft = '40px'; }, 'content.header-alignment'],
    ['a second title-size header under the page title', () => { document.querySelector('#convo').style.display = 'flex'; }, 'content.single-title'],
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
const open = tr => { history.pushState({}, '', '/list/' + tr.cells[1].textContent.replace(/\\s/g, '-') + location.search); document.querySelector('#record').textContent = 'Record ' + tr.cells[1].textContent; };
document.querySelectorAll('tbody tr').forEach(tr => {
  tr.addEventListener('keydown', e => { if (e.key === 'Enter' && v === 'route') open(tr); });
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
    baseURL: 'http://audit.test', selectors,
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

  const cliBase = ['--project', path.resolve(project), '--adapter', path.join(temp, 'cli-adapter.mjs'), '--out', path.join(temp, 'cli')];
  assert.equal(parseAuditArgs([...cliBase, '--strict-coverage']).strictCoverage, true);
  assert.throws(() => parseAuditArgs([...cliBase, '--strict-coverage=false']), /Unknown/);
  assert.throws(() => parseAuditArgs(['--project', '--strict-coverage']), /missing/);
  assert.throws(() => parseAuditArgs([...cliBase, '--states', 'typo']), /states/);
  await assert.rejects(runAudit(browser, adapter, { out: temp, strictCoverage: 'yes' }), /strictCoverage must be boolean/);
  fs.writeFileSync(path.join(temp, 'cli-adapter.mjs'), `export default {
    baseURL: 'http://audit.test', selectors: ${JSON.stringify(selectors)},
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
  console.log(`PASS clean four-column layout, repeatability, ${mutations.length} defect mutations, navigation coverage, cross-tenant grouping and honest report comparison`);
} finally { await browser.close(); fs.rmSync(temp, { recursive: true, force: true }); }
