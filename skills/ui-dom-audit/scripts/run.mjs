import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { measureDOM } from './measure.mjs';
const hash = x => crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex').slice(0, 16);

export function validateContract(contract) {
  if (contract.version !== 1 || !Array.isArray(contract.rules) || !contract.rules.length) throw new Error('Contract requires version: 1 and nonempty rules');
  const ids = new Set(), kinds = new Set(['style', 'text', 'box', 'count', 'viewport', 'align', 'within', 'columns', 'table', 'composer']);
  for (const rule of contract.rules) {
    if (!rule.id || ids.has(rule.id) || !kinds.has(rule.kind)) throw new Error('Invalid/duplicate rule: ' + rule.id);
    ids.add(rule.id);
    if ((rule.exclude ?? []).some(e => !e.reason || !e.selector)) throw new Error(`Undocumented exclusion: ${rule.id}`);
  }
}
export function summarize(cases) {
  const groups = new Map();
  for (const item of cases) for (const issue of item.issues) {
    const key = hash([issue.rule, issue.property, issue.expected, issue.actual]);
    if (!groups.has(key)) groups.set(key, { id: key, rule: issue.rule, owner: issue.owner, property: issue.property, expected: issue.expected, actual: issue.actual, occurrences: 0, routes: new Set(), tenants: new Set(), example: issue.selector });
    const group = groups.get(key); group.occurrences++; group.routes.add(item.route); group.tenants.add(item.tenant);
  }
  return [...groups.values()].map(g => ({ ...g, routes: [...g.routes].sort(), tenants: [...g.tenants].sort() })).sort((a, b) => b.routes.length - a.routes.length || b.occurrences - a.occurrences || a.id.localeCompare(b.id));
}
/** Adapter owns authentication/routes/read-only UI transitions; runner owns measurements. */
export async function runAudit(browser, adapter, options) {
  const start = Date.now(), out = path.resolve(options.out); fs.mkdirSync(out, { recursive: true });
  const contract = JSON.parse(fs.readFileSync(options.contract ?? adapter.contract ?? fileURLToPath(new URL('../references/work-ui.contract.json', import.meta.url)), 'utf8')); validateContract(contract);
  const matrix = await adapter.cases(options);
  if (!matrix.length) throw new Error('No audit cases selected; an empty sweep is not a pass');
  const report = { version: 1, contract: contract.name, contractHash: hash(contract), revision: await adapter.revision?.() ?? null, cases: [], groups: [], failures: 0, elapsedMs: 0 };
  const themes = options.themes?.split(',') ?? ['light', 'dark'];
  const widths = options.widths?.split(',').map(Number) ?? [1440];
  if (widths.some(w => !Number.isFinite(w) || w < 320)) throw new Error('Invalid viewport width');
  const actors = [...new Set(matrix.map(c => c.actor ?? c.tenant))];
  // Sequential actors: switching tenant can invalidate another session for the same user.
  for (const actor of actors) {
    let actorCases = matrix.filter(c => (c.actor ?? c.tenant) === actor);
    const context = await browser.newContext({ baseURL: adapter.baseURL, reducedMotion: 'reduce' });
    try {
      await adapter.authenticate(context, actorCases[0]);
      if (adapter.resolveCases) actorCases = await adapter.resolveCases(context, actorCases);
      const page = await context.newPage(); page.setDefaultTimeout(options.timeout ?? 5000);
      // Each navigation starts with the actor's original browser preferences.
      // A details/accordion state must not leak into the next default/theme case.
      const origin = new URL(adapter.baseURL).origin;
      const initialStorage = (await context.storageState()).origins.find(o => o.origin === origin)?.localStorage ?? [];
      await page.addInitScript(({ origin, entries }) => {
        if (window === window.top && location.origin === origin) {
          localStorage.clear(); sessionStorage.clear();
          for (const { name, value } of entries) localStorage.setItem(name, value);
        }
      }, { origin, entries: initialStorage });
      for (const spec of actorCases) for (const theme of themes) for (const width of widths) {
        await page.setViewportSize({ width, height: options.height ?? 900 });
        let states = spec.states ?? [{ name: 'default' }];
        if (adapter.discoverStates && options.states !== 'default') {
          try {
            await page.goto(spec.path, { waitUntil: 'domcontentloaded', timeout: options.navigationTimeout ?? 15000 });
            await adapter.ready(page, spec);
            states = [...states, ...await adapter.discoverStates(page, spec)];
          } catch (error) { states.push({ name: 'state-discovery', enter: async () => { throw error; } }); }
        }
        for (const state of states) {
          const entry = { actor, tenant: spec.tenant, route: spec.path, theme, width, state: state.name, issues: [], coverage: [], samples: [] };
          const errors = []; const onError = error => errors.push(error.message); page.on('pageerror', onError);
          try {
            await page.goto(spec.path, { waitUntil: 'domcontentloaded', timeout: options.navigationTimeout ?? 15000 });
            if (adapter.assertRoute) await adapter.assertRoute(page, spec);
            else if (new URL(page.url()).pathname !== new URL(spec.path, adapter.baseURL).pathname) throw new Error(`Unexpected redirect to ${new URL(page.url()).pathname}`);
            await adapter.theme(page, theme);
            await adapter.ready(page, spec);
            if (state.enter) await state.enter(page);
            if (adapter.describe) entry.view = await adapter.describe(page, spec);
            await page.addStyleTag({ content: '*,*::before,*::after { animation-play-state: paused !important; transition-duration: 0s !important; caret-color: transparent !important; }' });
            await page.evaluate(async () => { await document.fonts.ready; await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); });
            const payload = { contract, selectors: adapter.selectors, required: [...(spec.required ?? []), ...(state.required ?? [])] };
            const first = await page.evaluate(measureDOM, payload);
            // Repeat the same DOM measurement to expose unstable geometry instead
            // of blessing whichever frame happened to pass.
            await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
            const second = await page.evaluate(measureDOM, payload);
            Object.assign(entry, second);
            if (hash(first.samples) !== hash(second.samples)) entry.issues.push({ rule: 'coverage.stability', category: 'coverage', selector: 'document', property: 'measurement hash', expected: hash(first.samples), actual: hash(second.samples) });
            for (const message of errors) entry.issues.push({ rule: 'runtime.error', category: 'runtime', selector: 'document', property: 'pageerror', expected: 'none', actual: message });
          } catch (error) {
            entry.issues.push({ rule: 'coverage.navigation-state', category: 'coverage', selector: 'document', property: 'ready state', expected: 'requested route and state rendered', actual: String(error.message) });
          } finally { page.off('pageerror', onError); }
          for (const issue of entry.issues) issue.fingerprint = hash([entry.actor, entry.tenant, entry.route, theme, width, state.name, issue.rule, issue.selector, issue.property]);
          if (entry.issues.length && options.screenshots !== false) {
            entry.screenshot = `${hash([spec.path, theme, width, state.name])}.png`;
            await page.screenshot({ path: path.join(out, entry.screenshot) }).catch(() => { delete entry.screenshot; });
          }
          report.cases.push(entry);
          console.log(`${entry.issues.length ? 'FAIL' : 'PASS'} ${spec.tenant} ${spec.path} ${theme}/${width}/${state.name}: ${entry.issues.length} findings`);
        }
      }
    } catch (error) {
      report.cases.push({ actor, tenant: actorCases[0].tenant, route: '<actor setup>', theme: '', width: 0, state: 'setup', issues: [{ rule: 'coverage.actor', category: 'coverage', property: 'actor setup', expected: 'authenticated actor and resolved routes', actual: String(error.message), selector: 'document' }], coverage: [], samples: [] });
    } finally { await context.close(); }
  }
  for (const entry of report.cases) for (const issue of entry.issues) issue.fingerprint ??= hash([entry.actor, entry.tenant, entry.route, entry.theme, entry.width, entry.state, issue.rule, issue.selector, issue.property]);
  report.groups = summarize(report.cases);
  report.failures = report.cases.reduce((n, c) => n + c.issues.length, 0);
  report.elapsedMs = Date.now() - start;
  if (options.previous) {
    const previous = JSON.parse(fs.readFileSync(options.previous, 'utf8'));
    if (previous.contractHash !== report.contractHash) report.comparisonWarning = 'Contract changed; compare rule definitions before interpreting improvement';
    const old = new Set(previous.cases.flatMap(c => c.issues.map(i => i.fingerprint))), current = new Set(report.cases.flatMap(c => c.issues.map(i => i.fingerprint)));
    // Only compare cases that were measured in BOTH sweeps; omitted pages do not count as fixed.
    const caseKey = c => JSON.stringify([c.actor, c.tenant, c.route, c.theme, c.width, c.state]);
    const shared = new Set(report.cases.map(caseKey).filter(k => previous.cases.some(c => caseKey(c) === k)));
    report.delta = { new: report.cases.filter(c => shared.has(caseKey(c))).flatMap(c => c.issues.filter(i => !old.has(i.fingerprint)).map(i => i.fingerprint)), resolved: previous.cases.filter(c => shared.has(caseKey(c))).flatMap(c => c.issues.filter(i => !current.has(i.fingerprint)).map(i => i.fingerprint)), comparedCases: shared.size };
  }
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  fs.writeFileSync(path.join(out, 'summary.txt'), [`${report.cases.length} cases; ${report.failures} findings; ${(report.elapsedMs / 1000).toFixed(1)}s`, ...report.groups.map(g => `${g.rule} | ${g.property}: expected ${JSON.stringify(g.expected)}, got ${JSON.stringify(g.actual)} | ${g.routes.length} routes / ${g.occurrences} instances | ${g.owner}`)].join('\n') + '\n');
  return report;
}
