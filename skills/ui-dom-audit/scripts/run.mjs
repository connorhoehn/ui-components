import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { measureDOM } from './measure.mjs';
import { probes } from './probes.mjs';
const hash = x => crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex').slice(0, 16);

export function validateContract(contract) {
  if (contract.version !== 1 || !Array.isArray(contract.rules) || !contract.rules.length) throw new Error('Contract requires version: 1 and nonempty rules');
  const ids = new Set(), kinds = new Set(['style', 'text', 'box', 'count', 'viewport', 'align', 'within', 'columns', 'table', 'composer', 'composer-presence', 'record-popout', 'row-activatable', 'selection-shift', 'gutter', 'row-start', 'title-count', 'contained', 'sparse-row', 'in-viewport', 'dock-clearance', 'popover-fit', 'surface-distinct', 'text-cramped', 'text-overlap', 'text-clipped', 'placeholder-squeezed']);
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
  if (options.strictCoverage !== undefined && typeof options.strictCoverage !== 'boolean') throw new Error('strictCoverage must be boolean');
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
            // A state may run a read-only interaction probe and return its result for the rules to judge.
            const entered = state.enter ? await state.enter(page, { probes }) : undefined;
            const probe = entered && typeof entered === 'object' && typeof entered.kind === 'string' ? entered : undefined;
            if (probe) entry.probe = probe;
            // A navigating state is classified on the page it reached, not the list it left.
            const reached = new URL(page.url());
            const judged = state.navigates ? { ...spec, path: reached.pathname + reached.search, navigatedFrom: spec.path } : spec;
            if (state.navigates) entry.reached = judged.path;
            if (adapter.describe) entry.view = await adapter.describe(page, judged);
            await page.addStyleTag({ content: '*,*::before,*::after { animation-play-state: paused !important; transition-duration: 0s !important; caret-color: transparent !important; }' });
            await page.evaluate(async () => { await document.fonts.ready; await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); });
            const composerExpectation = state.composerExpectation ?? await adapter.composerExpectation?.(page, judged) ?? (state.navigates ? undefined : spec.composerExpectation);
            // A state that navigates away (a row opening its record) is judged on the
            // page it reached: the list route's required regions no longer apply.
            const required = state.navigates ? [...(state.required ?? [])] : [...(spec.required ?? []), ...(state.required ?? [])];
            const payload = { contract, selectors: adapter.selectors, required, composerExpectation, probe };
            const first = await page.evaluate(measureDOM, payload);
            // Repeat the same DOM measurement to expose unstable geometry instead
            // of blessing whichever frame happened to pass.
            await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
            const second = await page.evaluate(measureDOM, payload);
            Object.assign(entry, second);
            if (hash(first.samples) !== hash(second.samples)) {
              // Name what moved, so an unstable case points at its moving node instead of a bare hash.
              const key = x => `${x.rule}|${x.selector}|${x.property}`, before = new Map(first.samples.map(x => [key(x), JSON.stringify(x.actual)]));
              const after = new Set(second.samples.map(key));
              const moved = [
                ...second.samples.filter(x => before.get(key(x)) !== JSON.stringify(x.actual)).map(x => ({ rule: x.rule, selector: x.selector, property: x.property, first: before.has(key(x)) ? JSON.parse(before.get(key(x))) : 'absent', second: x.actual })),
                ...first.samples.filter(x => !after.has(key(x))).map(x => ({ rule: x.rule, selector: x.selector, property: x.property, first: x.actual, second: 'absent' })),
              ].slice(0, 6);
              entry.issues.push({ rule: 'coverage.stability', category: 'coverage', selector: 'document', property: 'measurement hash', expected: hash(first.samples), actual: hash(second.samples), moved });
            }
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
          const unclassified = entry.coverage.filter(c => c.status === 'unclassified').length;
          console.log(`${entry.issues.length ? 'FAIL' : unclassified ? 'PARTIAL' : 'PASS'} ${spec.tenant} ${spec.path} ${theme}/${width}/${state.name}: ${entry.issues.length} findings${unclassified ? '; composer policy unclassified' : ''}`);
        }
      }
    } catch (error) {
      report.cases.push({ actor, tenant: actorCases[0].tenant, route: '<actor setup>', theme: '', width: 0, state: 'setup', issues: [{ rule: 'coverage.actor', category: 'coverage', property: 'actor setup', expected: 'authenticated actor and resolved routes', actual: String(error.message), selector: 'document' }], coverage: [], samples: [] });
    } finally { await context.close(); }
  }
  for (const entry of report.cases) for (const issue of entry.issues) issue.fingerprint ??= hash([entry.actor, entry.tenant, entry.route, entry.theme, entry.width, entry.state, issue.rule, issue.selector, issue.property]);
  report.groups = summarize(report.cases);
  report.failures = report.cases.reduce((n, c) => n + c.issues.length, 0);
  report.unclassified = report.cases.filter(c => c.coverage.some(item => item.status === 'unclassified')).map(({ tenant, route, theme, width, state }) => ({ tenant, route, theme, width, state }));
  report.strictCoverage = options.strictCoverage ?? false;
  report.exitCode = report.failures || (report.strictCoverage && report.unclassified.length) ? 1 : 0;
  report.elapsedMs = Date.now() - start;
  if (options.previous) {
    const previous = JSON.parse(fs.readFileSync(options.previous, 'utf8'));
    if (previous.contractHash !== report.contractHash) report.comparisonWarning = 'Contract changed; compare rule definitions before interpreting improvement';
    const old = new Set(previous.cases.flatMap(c => c.issues.map(i => i.fingerprint))), current = new Set(report.cases.flatMap(c => c.issues.map(i => i.fingerprint)));
    // A route that failed readiness/coverage/runtime is unverified, not fixed.
    // Missing findings on that route cannot close a previously observed defect.
    const caseKey = c => JSON.stringify([c.actor, c.tenant, c.route, c.theme, c.width, c.state]);
    const measured = c => c.samples?.length > 0 && !c.issues.some(i => ['coverage', 'runtime'].includes(i.category));
    const priorCases = new Map(previous.cases.map(c => [caseKey(c), c]));
    const currentCases = new Map(report.cases.map(c => [caseKey(c), c]));
    const overlapping = [...currentCases.keys()].filter(key => priorCases.has(key));
    const shared = new Set(overlapping.filter(key => measured(priorCases.get(key)) && measured(currentCases.get(key))));
    const unverified = [...priorCases.keys()].filter(key => !shared.has(key) && (currentCases.has(key) || priorCases.get(key).issues.length));
    report.delta = {
      new: report.cases.filter(c => shared.has(caseKey(c))).flatMap(c => c.issues.filter(i => !old.has(i.fingerprint)).map(i => i.fingerprint)),
      resolved: previous.cases.filter(c => shared.has(caseKey(c))).flatMap(c => c.issues.filter(i => !current.has(i.fingerprint)).map(i => i.fingerprint)),
      comparedCases: shared.size,
      overlappingCases: overlapping.length,
      unverifiedFindings: unverified.reduce((count, key) => count + priorCases.get(key).issues.length, 0),
      unverifiedCases: unverified.map(key => {
        const prior = priorCases.get(key), now = currentCases.get(key);
        return { actor: prior.actor, tenant: prior.tenant, route: prior.route, theme: prior.theme, width: prior.width, state: prior.state,
          reason: !now ? 'not visited' : !measured(now) ? 'current case did not complete stable measurement' : 'previous case did not complete stable measurement' };
      }),
    };
  }
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  fs.writeFileSync(path.join(out, 'summary.txt'), [`${report.cases.length} cases; ${report.failures} findings; ${report.unclassified.length} composer policies unclassified; ${report.strictCoverage ? 'strict coverage' : 'advisory coverage'}; exit ${report.exitCode}; ${(report.elapsedMs / 1000).toFixed(1)}s`, ...report.unclassified.map(c => `UNCLASSIFIED composer policy | ${c.tenant} ${c.route} ${c.theme}/${c.width}/${c.state}`), ...(report.delta ? [`Comparison: ${report.delta.comparedCases} verified cases; ${report.delta.resolved.length} resolved; ${report.delta.unverifiedFindings} prior findings unverified across ${report.delta.unverifiedCases.length} cases`] : []), ...report.groups.map(g => `${g.rule} | ${g.property}: expected ${JSON.stringify(g.expected)}, got ${JSON.stringify(g.actual)} | ${g.routes.length} routes / ${g.occurrences} instances | ${g.owner}`)].join('\n') + '\n');
  return report;
}
