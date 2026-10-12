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
const project = process.argv[process.argv.indexOf('--project') + 1];
if (!project || !process.argv.includes('--project')) throw new Error('Usage: node self-test.mjs --project <package with @playwright/test>');
const { chromium } = createRequire(path.resolve(project, 'package.json'))('@playwright/test');
const contract = JSON.parse(fs.readFileSync(new URL('../references/work-ui.contract.json', import.meta.url)));
validateContract(contract);
const selectors = {
  graphDetailLabels: '[data-ui-text="graph-detail"]', graphMetadataLabels: '[data-ui-text="graph-metadata"]', activePersonCaptions: '[data-ui-text="active-person-caption"]',
  codeLabels: 'code', railCaptionLabels: '.rail-label, button[data-heading="label"][data-focus-key^="g:"] > span', railItemLabels: '[data-ui-text="rail-item"]', conversationLabels: '.conversation-label', conversationMetadata: '.conversation-meta', decorativeText: '[aria-hidden="true"]', rowMenuGlyphs: '.row-glyph', keyboardHints: 'kbd', captions: '[data-ui-text="caption"]', tenantControl: '.no-brand', tickerControl: '.no-ticker', avatarControl: '[data-ui-text="avatar"]', header: '#header', footer: '#footer', footerRow: '#footer', shellColumns: '#shell', nestedColumns: '.no-nested', workspaceColumns: '#workspace', splitColumns: '.no-split',
  controls: 'button,input,select,textarea,[role="button"]', railHeaders: '.rail-caption', toolbarControls: '#toolbar button', collections: '#collection', collectionToolbars: '#toolbar', sectionTitles: '#section',
  tables: 'table', composers: '#shelf', nestedComposers: '#shelf [data-composer-surface]', composerBoundary: 'section:has(> [data-collection-command-boundary="embedded"]), #content',
};
const html = `<!doctype html><html><head><style>
:root { --ui-control-sm:28px; --ui-page-gutter:24px; --ui-table-inset:12px; --ui-table-row:44px; --ui-content-gutter:16px; }
*{box-sizing:border-box} body{margin:0;font:14px system-ui,-apple-system,sans-serif} #header,#footer{height:44px} #shell{height:712px;display:flex} aside{width:180px;flex:none} main{flex:1;min-width:0} #workspace{display:flex;height:100%} #secondary{width:180px;flex:none} #right{width:180px;flex:none} #content{position:relative;flex:1;min-width:0} #section{padding:8px 24px} #collection{padding:0} #toolbar{padding:0 12px;display:flex;gap:8px} .control{height:28px;font:12px system-ui,-apple-system,sans-serif;border:1px solid black} table{border-collapse:collapse;width:100%;font:14px system-ui,-apple-system,sans-serif} th{font-size:12px;font-weight:600} td{padding:0 12px;height:44px} #shelf-wrapper{position:absolute;bottom:0;left:0;right:0} #shelf{position:relative;padding:8px 16px;width:100%} #shelf:before{content:'';position:absolute;inset:0;background-image:radial-gradient(white,transparent);pointer-events:none} [contenteditable]{position:relative;min-height:28px}
</style></head><body><header id="header">Workspace <button class="control"><span class="rail-label" style="font-size:11px">Group</span><span class="conversation-label" style="font-size:13px">Person</span><span class="conversation-meta" style="font-size:11px">Now</span><code style="font-size:11px;font-family:monospace">ID-123</code><span class="avatar" data-ui-text="avatar" style="font-size:9.12px">AB</span></button></header><div id="shell"><aside>Primary<section><h3><button class="control" data-heading="label" data-focus-key="g:fixture"><span id="group-label" style="font-size:11px">Projects</span><span id="group-count" style="font-size:11px">2</span></button></h3><ul><li><button class="control"><span id="rail-title" data-ui-text="rail-item" style="font-size:13px;font-weight:500;line-height:20px">Sample initiative</span></button><button id="rail-sibling-action" class="control" style="font-size:14px">Open</button></li></ul></section></aside><main><div id="workspace"><nav id="secondary">Secondary</nav><section id="content"><div id="section">Section</div><div role="button"><span data-ui-text="graph-detail" style="font-size:11px">Graph detail</span><span data-ui-text="graph-metadata" style="font-size:10px">Revision</span><button class="control" id="graph-nested-action">Open graph</button></div><button class="control"><span data-ui-text="active-person-caption" style="font-size:11px;font-weight:500">Person</span></button><div id="collection"><div id="toolbar"><button class="control">Action</button></div><table><thead><tr><th>Name</th><th>State</th></tr></thead><tbody><tr><td>Record</td><td>Ready</td></tr></tbody></table></div><div id="shelf-wrapper"><div id="shelf" data-composer-surface><div contenteditable="true" role="textbox">Draft</div></div></div></section><aside id="right">Details</aside></div></main></div><footer id="footer">Footer <button id="overflow-count" class="control" data-ui-text="avatar" style="font-size:10px">+3</button></footer></body></html>`;
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
    ['missing design token', () => document.documentElement.style.setProperty('--ui-control-sm', 'initial'), 'toolbar.control-height'],
  ];
  for (const [name, mutate, rule] of mutations) {
    await page.setContent(html); await page.evaluate(mutate); const result = await measure();
    assert.ok(result.issues.some(issue => issue.rule === rule), `${name} must fail ${rule}: ${JSON.stringify(result.issues)}`);
    console.log('PASS detects ' + name);
  }
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
  const unknown = await page.evaluate(measureDOM, { ...absencePayload, composerExpectation: undefined });
  assert.ok(unknown.coverage.some(c => c.rule === 'composer.presence' && c.status === 'unclassified'), 'unreviewed pages remain visibly unclassified');
  assert.equal(unknown.issues.length, 0, 'an unreviewed page is not automatically required to have a composer');
  console.log('PASS required composer, documented exemption, blank exemption rejection and unclassified policy coverage');
  await page.close();
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

  const cliBase = ['--project', path.resolve(project), '--adapter', path.join(temp, 'cli-adapter.mjs'), '--out', path.join(temp, 'cli')];
  assert.equal(parseAuditArgs([...cliBase, '--strict-coverage']).strictCoverage, true);
  assert.throws(() => parseAuditArgs([...cliBase, '--strict-coverage=false']), /Unknown/);
  assert.throws(() => parseAuditArgs(['--project', '--strict-coverage']), /missing/);
  assert.throws(() => parseAuditArgs([...cliBase, '--states', 'typo']), /states/);
  await assert.rejects(runAudit(browser, adapter, { out: temp, strictCoverage: 'yes' }), /strictCoverage must be boolean/);
  fs.writeFileSync(path.join(temp, 'cli-adapter.mjs'), `export default {
    baseURL: 'http://audit.test', selectors: ${JSON.stringify(selectors)},
    authenticate: async context => context.route('**/*', route => route.fulfill({ contentType: 'text/html', body: ${JSON.stringify(html)} })),
    cases: async options => [{ tenant: 'fixture', path: '/good', composerExpectation: options.path === 'required' ? {mode:'required'} : undefined }],
    ready: async p => p.locator('#header').waitFor(), theme: async () => {},
  };`);
  for (const [name, flags, expectedExit] of [
    ['advisory', [], 0], ['strict-unclassified', ['--strict-coverage'], 1], ['strict-classified', ['--strict-coverage', '--path', 'required'], 0],
  ]) {
    const out = path.join(temp, name);
    const cli = spawnSync(process.execPath, [fileURLToPath(new URL('./audit.mjs', import.meta.url)), ...cliBase, '--out', out, '--themes', 'light', '--widths', '1280', '--states', 'default', '--no-screenshots', ...flags], { encoding: 'utf8', timeout: 60000 });
    assert.equal(cli.status, expectedExit, `${name} CLI exit: ${cli.stdout} ${cli.stderr}`);
    const receipt = JSON.parse(fs.readFileSync(path.join(out, 'report.json'), 'utf8'));
    assert.equal(receipt.failures, 0, 'strict coverage failure is separate from DOM findings');
    assert.equal(receipt.exitCode, expectedExit);
  }
  console.log('PASS CLI strict coverage propagation, validation and real exit codes; failed readiness cannot resolve prior findings');
  assert.throws(() => validateContract({ version: 1, rules: [{id:'a',kind:'bogus'}] }));
  console.log(`PASS clean four-column layout, repeatability, ${mutations.length} defect mutations, navigation coverage, cross-tenant grouping and honest report comparison`);
} finally { await browser.close(); fs.rmSync(temp, { recursive: true, force: true }); }
