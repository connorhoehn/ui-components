#!/usr/bin/env node
/** Real-browser mutation tests: a clean four-column fixture, then deliberate defects. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { measureDOM } from './measure.mjs';
import { runAudit, summarize, validateContract } from './run.mjs';
const project = process.argv[process.argv.indexOf('--project') + 1];
if (!project || !process.argv.includes('--project')) throw new Error('Usage: node self-test.mjs --project <package with @playwright/test>');
const { chromium } = createRequire(path.resolve(project, 'package.json'))('@playwright/test');
const contract = JSON.parse(fs.readFileSync(new URL('../references/work-ui.contract.json', import.meta.url)));
validateContract(contract);
const selectors = {
  codeLabels: 'code', railCaptionLabels: '.rail-label', conversationLabels: '.conversation-label', conversationMetadata: '.conversation-meta', decorativeText: '[aria-hidden="true"]', rowMenuGlyphs: '.row-glyph', keyboardHints: 'kbd', captions: '[data-ui-text="caption"]', tenantControl: '.no-brand', tickerControl: '.no-ticker', avatarControl: '.avatar', header: '#header', footer: '#footer', footerRow: '#footer', shellColumns: '#shell', nestedColumns: '.no-nested', workspaceColumns: '#workspace', splitColumns: '.no-split',
  controls: 'button,input,select,textarea', railHeaders: '.rail-caption', toolbarControls: '#toolbar button', collections: '#collection', collectionToolbars: '#toolbar', sectionTitles: '#section',
  tables: 'table', composers: '#shelf', nestedComposers: '#shelf [data-composer-surface]', composerBoundary: '#content',
};
const html = `<!doctype html><html><head><style>
:root { --ui-control-sm:28px; --ui-page-gutter:24px; --ui-table-inset:12px; --ui-table-row:44px; --ui-content-gutter:16px; }
*{box-sizing:border-box} body{margin:0;font:14px system-ui,-apple-system,sans-serif} #header,#footer{height:44px} #shell{height:712px;display:flex} aside{width:180px;flex:none} main{flex:1;min-width:0} #workspace{display:flex;height:100%} #secondary{width:180px;flex:none} #right{width:180px;flex:none} #content{position:relative;flex:1;min-width:0} #section{padding:8px 24px} #collection{padding:0} #toolbar{padding:0 12px;display:flex;gap:8px} .control{height:28px;font:12px system-ui,-apple-system,sans-serif;border:1px solid black} table{border-collapse:collapse;width:100%;font:14px system-ui,-apple-system,sans-serif} th{font-size:12px;font-weight:600} td{padding:0 12px;height:44px} #shelf-wrapper{position:absolute;bottom:0;left:0;right:0} #shelf{position:relative;padding:8px 16px;width:100%} #shelf:before{content:'';position:absolute;inset:0;background-image:radial-gradient(white,transparent);pointer-events:none} [contenteditable]{position:relative;min-height:28px}
</style></head><body><header id="header">Workspace <button class="control"><span class="rail-label" style="font-size:11px">Group</span><span class="conversation-label" style="font-size:13px">Person</span><span class="conversation-meta" style="font-size:11px">Now</span><code style="font-size:11px;font-family:monospace">ID-123</code><span class="avatar" style="font-size:9.12px">AB</span></button></header><div id="shell"><aside>Primary</aside><main><div id="workspace"><nav id="secondary">Secondary</nav><section id="content"><div id="section">Section</div><div id="collection"><div id="toolbar"><button class="control">Action</button></div><table><thead><tr><th>Name</th><th>State</th></tr></thead><tbody><tr><td>Record</td><td>Ready</td></tr></tbody></table></div><div id="shelf-wrapper"><div id="shelf" data-composer-surface><div contenteditable="true" role="textbox">Draft</div></div></div></section><aside id="right">Details</aside></div></main></div><footer id="footer">Footer</footer></body></html>`;
const browser = await chromium.launch({ headless: true });
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ui-dom-audit-tests-'));
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const payload = { contract, selectors, required: ['$header', '$footer', '$tables', '$composers'] };
  const measure = () => page.evaluate(measureDOM, payload);
  await page.setContent(html);
  const clean = await measure(); assert.deepEqual(clean.issues, [], JSON.stringify(clean.issues));
  assert.deepEqual((await measure()).samples, clean.samples, 'same DOM produces identical measurements');
  const mutations = [
    ['rail caption drift', () => document.querySelector('.rail-label').style.fontSize='14px', 'rail.disclosure-label'],
    ['conversation label drift', () => document.querySelector('.conversation-label').style.fontSize='18px', 'conversation.label'],
    ['code family drift', () => document.querySelector('code').style.fontFamily='serif', 'code.typography'],
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
  await page.close();
  const adapter = {
    baseURL: 'http://audit.test', selectors,
    authenticate: async context => context.route('**/*', route => route.request().url().endsWith('/redirect') ? route.fulfill({ status: 302, headers: { location: 'http://audit.test/login' } }) : route.fulfill({ contentType: 'text/html', body: html })),
    cases: async () => [{ tenant: 'fixture', path: '/good', required: payload.required }, { tenant: 'fixture', path: '/bad', states: [{name:'default',enter: p => p.evaluate(() => { document.querySelector('#section').style.paddingLeft='45px'; localStorage.setItem('audit-state', 'changed'); })}] }, {tenant:'fixture',path:'/redirect'}],
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
  assert.throws(() => validateContract({ version: 1, rules: [{id:'a',kind:'bogus'}] }));
  console.log('PASS clean four-column layout, repeatability, 18 defect mutations, navigation coverage, cross-tenant grouping and honest report comparison');
} finally { await browser.close(); fs.rmSync(temp, { recursive: true, force: true }); }
