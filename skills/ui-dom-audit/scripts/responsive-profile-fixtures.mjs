// Rendered regressions for intentional responsive variants. Each variant
// keeps its own geometry checks and a neighboring ordinary control's checks.
import assert from 'node:assert/strict';
import { measureDOM } from './measure.mjs';

export async function responsiveProfileFixtures(page, contract) {
  const base = `<style>:root{--ui-table-inset:12px;--ui-table-row:44px}*{box-sizing:border-box}body{margin:0;font:14px system-ui,sans-serif}table{border-collapse:collapse;font:inherit}th{font-size:12px;font-weight:600}td{height:44px;padding:0 12px}</style>`;
  const judge = (ids, selectors = {}) => page.evaluate(measureDOM, { contract: { ...contract, rules: contract.rules.filter(r => ids.includes(r.id)) }, selectors });
  const clean = async (ids, selectors, why) => {
    const r = await judge(ids, selectors);
    assert.deepEqual(r.issues, [], `${why}: ${JSON.stringify(r.issues)}`);
    return r;
  };
  const mutation = async (ids, selectors, selector, prop, value, why) => {
    const previous = await page.locator(selector).evaluate((el, prop) => el.style.getPropertyValue(prop), prop);
    await page.locator(selector).evaluate((el, [prop, value]) => el.style.setProperty(prop, value), [prop, value]);
    const result = await judge(ids, selectors);
    assert.ok(result.issues.length, why);
    await page.locator(selector).evaluate((el, [prop, value]) => el.style.setProperty(prop, value), [prop, previous]);
  };

  // CollectionPage embeds compact controls in PageHeader's existing gutter.
  // The declared placement is scoped to that owner, not an inset exemption.
  await page.setContent(`${base}<style>[data-toolbar-variant]{padding:0 12px}#header-toolbar{padding:0}</style>
    <header data-testid="page-header"><div id="header-toolbar" data-toolbar-variant="collection" data-collection-placement="header">Filters</div></header>
    <div id="band-toolbar" data-toolbar-variant="collection">Filters</div>`);
  await clean(['toolbar.inset'], {}, 'header controls and ordinary toolbar band');
  await mutation(['toolbar.inset'], {}, '#header-toolbar', 'padding-left', '12px', 'header controls must not double their parent gutter');
  await mutation(['toolbar.inset'], {}, '#band-toolbar', 'padding-right', '0px', 'ordinary toolbar neighbors retain their inset');
  await page.locator('#header-toolbar').evaluate(el => document.body.append(el));
  assert.ok((await judge(['toolbar.inset'])).issues.length, 'header placement outside PageHeader does not waive the band inset');

  // Matches DataTable's NARROW/STACK classes: row inset, flex label/value
  // cells, content height, and an accessible but visually hidden header.
  const row = '<thead><tr><th>Name</th><th>Status</th></tr></thead><tbody><tr><td>Record</td><td>Ready</td></tr></tbody>';
  await page.setContent(`${base}<style>
    #cards{display:block;--ui-table-layout:cards;width:300px}
    #cards thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
    #cards tbody{display:block}#cards tbody tr{display:block;padding:8px 12px}
    #cards td{display:flex;height:auto;padding:4px 0}
  </style><table id="cards" data-ui-table-cards>${row}</table>
  <table id="ordinary">${row}</table><table id="wide" data-ui-table-cards style="--ui-table-layout:table">${row}</table>`);
  const tableIds = ['table.geometry'], tables = { tables: 'table' };
  const cardResult = await clean(tableIds, tables, 'cards and both kinds of ordinary table');
  assert.equal(cardResult.samples.filter(s => s.property === 'layout profile' && s.actual === 'cards').length, 1);
  for (const [selector, prop, value, why] of [
    ['#cards', 'display', 'table', 'card display is checked independently of its declared mode'],
    ['#cards tbody tr', 'padding-left', '0px', 'card rows keep their reading inset'],
    ['#cards tbody tr', 'padding-top', '0px', 'card rows keep vertical spacing'],
    ['#cards tbody tr', 'display', 'table-row', 'card rows must actually be block rows'],
    ['#cards td:first-child', 'padding-left', '12px', 'card cells must not double the row inset'],
    ['#cards td:first-child', 'padding-bottom', '0px', 'card fields keep vertical spacing'],
    ['#cards td:first-child', 'font-size', '10px', 'card body type retains the ordinary floor'],
    ['#cards td:first-child', 'display', 'block', 'card fields remain label/value flex rows'],
    ['#cards thead', 'all', 'unset', 'card headers remain visually hidden'],
    ['#ordinary td:first-child', 'height', '68px', 'ordinary neighbors retain fixed row height'],
    ['#ordinary td:first-child', 'padding-left', '0px', 'ordinary neighbors retain cell inset'],
    ['#wide td:first-child', 'height', '68px', 'a card-capable table in wide mode is still ordinary'],
  ]) await mutation(tableIds, tables, selector, prop, value, why);
  await page.locator('#cards').evaluate(el => el.setAttribute('data-ui-table-rows', 'content'));
  await clean(['table.geometry', 'table.document-geometry'], tables, 'content-height DataTables use the same card profile');
  await mutation(['table.geometry', 'table.document-geometry'], tables, '#cards td:first-child', 'padding-left', '12px', 'content cards still check their cell inset');

  // SubNavLayout narrow: a strip above content, while ordinary neighbors
  // still have side-by-side rails. Removing a replacement never passes.
  await page.setContent(`${base}<style>
    #compact{display:flex;flex-direction:column;width:400px;height:300px;--ui-subnav-layout:strip}
    #compact nav{height:36px;flex:none}#compact aside{display:none}#compact section{flex:1;min-height:0}
    #normal{display:flex;width:600px;height:300px}#normal aside{width:180px;flex:none}#normal section{flex:1}
  </style><div id="compact" data-subnav-narrow><nav data-subnav-strip>Sections</nav><aside>Hidden rail</aside><section data-subnav-content>Content</section></div>
  <div id="normal"><aside>Rail</aside><section data-subnav-content>Content</section></div>`);
  const subnavIds = ['subnav.columns'], subnav = { nestedColumns: '#compact, #normal' };
  await clean(subnavIds, subnav, 'compact strip and ordinary neighboring rail');
  for (const [selector, prop, value, why] of [
    ['#compact nav', 'display', 'none', 'the strip cannot disappear'],
    ['#compact aside', 'display', 'block', 'the old rail must give way'],
    ['#compact', 'flex-direction', 'row', 'compact mode must really stack its regions'],
    ['#compact nav', 'margin-left', '12px', 'strip and content must share an edge'],
    ['#normal aside', 'display', 'none', 'an undeclared missing desktop rail still fails'],
  ]) await mutation(subnavIds, subnav, selector, prop, value, why);

  await page.setContent(`${base}<button data-ui-navigation-trigger aria-label="Workspace navigation" aria-haspopup="menu">Menu</button>
    <div data-ui-navigation-layout="menu"><div id="shell" style="display:flex;height:300px"><aside style="display:none">Rail</aside><main style="flex:1">Content</main></div></div>`);
  const shellIds = ['shell.columns'], shell = { shellColumns: '#shell' };
  await clean(shellIds, shell, 'a declared menu replaces the primary rail');
  await mutation(shellIds, shell, '[data-ui-navigation-trigger]', 'display', 'none', 'the replacement menu must remain reachable');
  await mutation(shellIds, shell, '#shell aside', 'display', 'block', 'menu mode leaves exactly one content column');
  await mutation(shellIds, shell, '#shell main', 'margin-right', '40px', 'menu mode gives content the whole shell width');
  await page.locator('[data-ui-navigation-trigger]').evaluate(el => { el.tabIndex = -1; });
  assert.ok((await judge(shellIds, shell)).issues.some(i => i.property === 'replacement navigation controls'), 'the replacement menu must be keyboard reachable');
  await page.locator('[data-ui-navigation-trigger]').evaluate(el => { el.tabIndex = 0; });
  await page.locator('[data-ui-navigation-trigger]').evaluate(el => { el.disabled = true; });
  assert.ok((await judge(shellIds, shell)).issues.some(i => i.property === 'replacement navigation controls'), 'a disabled menu cannot replace navigation');
  await page.locator('[data-ui-navigation-trigger]').evaluate(el => { el.disabled = false; el.textContent = ''; el.removeAttribute('aria-label'); });
  assert.ok((await judge(shellIds, shell)).issues.some(i => i.property === 'replacement navigation controls'), 'an unnamed menu cannot replace navigation');
  await page.locator('[data-ui-navigation-layout]').evaluate(el => el.removeAttribute('data-ui-navigation-layout'));
  assert.ok((await judge(shellIds, shell)).issues.some(i => i.property === 'column count'), 'ordinary shells still require their rail');

  // StatStrip's drop mode places a leading bullet in a clipped gutter. The
  // same glyph must be rejected as soon as it becomes painted at line start.
  await page.setContent(`${base}<div id="clip" style="overflow:hidden;width:260px;margin-left:30px">
    <div style="display:flex;flex-wrap:wrap;width:280px;margin-left:-20px">
      <span style="width:280px;padding-left:20px">2 agents active</span>
      <span aria-hidden="true" style="width:20px;flex:none">•</span><span>11 active initiatives</span>
    </div></div>`);
  const separator = { ...contract.rules.find(r => r.id === 'text.leading-separator'), selector: 'body' };
  const separatorJudge = () => page.evaluate(measureDOM, { contract: { ...contract, rules: [separator] }, selectors: {} });
  assert.deepEqual((await separatorJudge()).issues, [], 'a wholly clipped bullet is not painted');
  await page.locator('#clip').evaluate(el => { el.style.overflow = 'visible'; });
  assert.ok((await separatorJudge()).issues.some(i => i.rule === separator.id), 'the same bullet fails when its clip is removed');
  await page.locator('#clip').evaluate(el => { el.style.overflow = 'hidden'; });
  await page.locator('#clip > div').evaluate(el => { el.style.marginLeft = '-2px'; });
  assert.ok((await separatorJudge()).issues.some(i => i.rule === separator.id), 'partly painted leading bullets still fail');
}
