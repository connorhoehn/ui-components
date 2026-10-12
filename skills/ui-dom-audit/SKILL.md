---
name: ui-dom-audit
description: Audit rendered UI consistency across tenant frontends using deterministic DOM geometry and computed-style contracts. Use for recurring layout, button, typography, table, sidebar or composer defects, and for extending reusable audit rules after a reported UI regression.
---

Measure the rendered app against a shared contract. Fix a component family once,
then verify its consumers. Source searches and screenshots help diagnosis; they
are not the pass/fail oracle.

The portable runner and contract live with this skill. Each frontend supplies a
small adapter for its existing route inventory, real sign-in helper, readiness,
semantic selectors and read-only UI states. Keep tenant routes and authentication
out of the shared engine. A split frontend repo can reuse the same skill and
contract with another adapter.

## Run

Read [the contract/adapter reference](references/contracts.md) when adapting a
repo or extending rules. For the existing aws-agentcore workspace, run from its
root (the adapter is already present):

```bash
node ~/.codex/skills/ui-dom-audit/scripts/audit.mjs \
  --project portal --adapter portal/e2e/ui-dom-audit.adapter.ts \
  --tenant pipelines --path /pipelines/runs \
  --themes light,dark --widths 1440,900 --out .scratch/ui-dom-audit
```

The repository shortcut is `npm --prefix portal run audit:ui -- --tenant pipelines`.
Use `UI_DOM_AUDIT_SKILL` to select another installed/versioned skill directory.

Omit tenant/path for a fast representative list/chat sweep across tenants.
`--all` uses the adapter's full route inventory. `--states default` checks only
the resting state; otherwise the adapter discovers supported filter/details
and sidebar states. State coverage in the report matters: a closed pane does not prove the
four-column layout works. For a new report, prefer one implicated route first,
then its component family across tenants, then the full matrix when justified.

The runner launches an isolated Chromium context per actor through the project's
installed Playwright. It uses computed styles, bounding rectangles and repeated
measurements after fonts/layout settle. It does not attach to the user's tabs.
Use adapter actions for navigation, local disclosure and view changes; this
skill does not authorize sending chat messages, starting runs/calls or changing
business records.

Outputs: `report.json` contains exact rule, selector, expected/actual value,
geometry, route/theme/width/state, coverage and source revision. `summary.txt`
groups repeated failures by rule/value/owner across tenants. Screenshots are
failure evidence only; `--no-screenshots` disables them. Nonzero exit means
violations or incomplete execution. Pass a previous `report.json` with
`--previous` to compare matching cases; unvisited routes are never called fixed.

## Refine from a reported defect

1. Reproduce the supplied path/state. Inspect measured values and identify the
   owning primitive, composition or shell boundary. An extra padded ancestor
   must be checked against the actual content column, not that same ancestor.
2. If the engine misses the defect, add a general measurement rule and a
   deliberately broken fixture to `scripts/self-test.mjs`, alongside a valid
   counterpart. Use semantic roles/attributes and shared tokens, not screenshot
   coordinates or a page-name exception. Add a new rule kind only if existing
   style/box/count/alignment/containment/columns/table/composer checks cannot
   express the invariant.
3. Repair the shared owner, rebuild/reinstall the real consumed package when
   needed, then rerun the defect case and other consumers. Keep fetches, tenant
   authority and business state in their adapters/pages.
4. Keep every remaining failure visible. Do not increase tolerances, edit
   expected values to match a bad page, automatically accept a baseline, or
   remove a selector just to make the report green. Intentional design variants
   need a named profile or narrow exclusion with its reason and validation.
5. Run the mutation tests and skill validator after changing the audit itself.
   Report measured scope, findings and untested states; never equate a narrow
   sweep with a clean entire application.

```bash
node ~/.codex/skills/ui-dom-audit/scripts/self-test.mjs --project portal
```

The default contract describes this app's compact UI, not universal design
requirements. Reuse it across its tenants; supply `--contract` for a different
product's documented design system. Pixel/style checks do not establish correct
copy, visual taste, full accessibility or backend/realtime behavior. Add explicit
interaction assertions when those are the reported problem.
