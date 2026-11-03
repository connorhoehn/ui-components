---
name: ui-dom-audit
description: Audit rendered UI consistency across tenant frontends using deterministic DOM geometry and computed-style contracts. Use for recurring layout, button, typography, table, sidebar or composer defects, and for extending reusable audit rules after a reported UI regression.
---

Measure the rendered app against a shared contract. Fix a component family once,
then verify its consumers. When the user asks to fix findings or improve the UI,
continue through repair, rebuilding the consumed package and a confirming sweep;
a list of failures is an intermediate result. Preserve an explicitly read-only
audit request. Source searches and screenshots help diagnosis; they
are not the pass/fail oracle.

Shared collection/chat pages need an explicit composer policy: required, or a
documented contextual exemption (a placeholder such as `TODO` is rejected).
Malformed policy declarations fail even without strict coverage. Unreviewed pages remain visibly unclassified;
geometry checks alone cannot certify a composer that is absent. See the
[composer policy contract](references/contracts.md#composer-presence-policy) when
adding a route family.

**Claude Code.** This directory is a Claude Code skill (`SKILL.md` frontmatter):
aws-agentcore links it as `.claude/skills/ui-dom-audit` (a user-level
`~/.claude/skills/ui-dom-audit` or `~/.codex/skills/ui-dom-audit` link works
too), so `/ui-dom-audit` loads these instructions and
`npm --prefix portal run audit:ui -- …` finds the runner through
`scripts/audit-ui-dom.cjs`. One Playwright test holds a whole run (cap: `UI_DOM_AUDIT_TIMEOUT_MS`,
30 minutes by default; aws-agentcore's wrapper sets 60 because the interaction
probes lengthen the larger sections), so run the acceptance matrix per tenant or section
(`--tenant orgiq --path iq/`, `--tenant orgiq --path admin/`, `--tenant
assessment --all`, `--tenant social --all`, `--tenant pipelines --all`) and
never two runs at once: they share the fixture identity and a tenant switch
revokes the other's cookie. A section whose matrix outgrows the 30-minute cap can raise it
with `UI_DOM_AUDIT_TIMEOUT_MS`; the report is written only when the run ends. Parity across tenants means every section reports
`0 findings; 0 composer policies unclassified` under `--strict-coverage`.

The portable runner and contract live with this skill. Each frontend supplies a
small adapter for its existing route inventory, real sign-in helper, readiness,
semantic selectors and read-only UI states. Keep tenant routes and authentication
out of the shared engine. A split frontend repo can reuse the same skill and
contract with another adapter.

The npm archive includes this skill alongside `dist`. Consumer automation should
prefer that installed copy so its audit contract is pinned with the UI runtime;
it must not require a sibling source checkout or personal skill installation.
For library development, set `UI_DOM_AUDIT_SKILL` explicitly to the source skill
directory, then verify the released package without that override.

## Run

Read [the contract/adapter reference](references/contracts.md) when adapting a
repo or extending rules. For the existing aws-agentcore workspace, run from its
root (the adapter is already present):

```bash
node .claude/skills/ui-dom-audit/scripts/audit.mjs \
  --project portal --adapter portal/e2e/ui-dom-audit.adapter.ts \
  --tenant pipelines --path /pipelines/runs \
  --themes light,dark --widths 1440,900 --out .scratch/ui-dom-audit
```

The repository shortcut is `npm --prefix portal run audit:ui -- --tenant pipelines`.
Use `--strict-coverage` for an explicitly classified acceptance matrix: it fails
when composer policy remains unclassified, separately from visual violations.
An absolute `--path /pipelines/runs` selects that exact page only; use `--path runs`
for a substring sweep or `/pipelines/runs/:id` for the inventory record template.
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
business records. Interaction rules (a row activation, a record-detail action, a row
selection) run through the shared read-only probes in `scripts/probes.mjs`,
which block and report every write; see
[interaction rules](references/contracts.md#interaction-rules-records-open-as-pages-selections-stay-put).

Outputs: `report.json` contains exact rule, selector, expected/actual value,
geometry, route/theme/width/state, coverage and source revision. `summary.txt`
groups repeated failures by rule/value/owner across tenants. Screenshots are
failure evidence only; `--no-screenshots` disables them. Nonzero exit means
violations or incomplete execution. Unclassified composer policy is separately
reported as PARTIAL coverage, even when there are no violations;
`--strict-coverage` also makes that incomplete policy coverage exit nonzero. Pass a previous `report.json` with
`--previous` to compare successfully measured matching cases. Unvisited, unstable, navigation-
failed or runtime-failed cases are reported as unverified, never called fixed.

## Deep audit

When asked to go deeper, before calling a tenant consistent, or after a change
to a shared composite, run from [the deep-audit brief](references/deep-audit.md):
`--deep` adds every layer the page can open, a keyboard focus walk, a click
through every tablist and data states rendered by response interception, and
captures every case for a visual review whose confirmed candidates become new
rules. Consistency outliers (a family value few routes use) and theme parity
are judged across the whole matrix. Expect findings; the brief says how to run
sections, review screenshots into `review.jsonl`, and triage.

Breadcrumbs name each level once: omit redundant singular/plural grouping and “All” collection repetitions. Keep the trail to one line, truncate long labels with ellipsis while retaining their full accessible names, and verify `navigation.breadcrumb` on every rendered trail.

## Context and compact collection controls

Inventory each rail/header action against the current page's purpose. Remove
cross-context shortcuts already served by primary navigation unless they have a
clear task reason. Parent/back links, an overflow link to the same collection,
and explicit actions on the selected record (Message, Call, View work) are valid;
a generic “Browse hangouts” in a Channels toolbar is not. Record the reason for
any cross-context action retained. This is a semantic review; DOM geometry alone
cannot establish intent. Verify navigation without sending messages or starting
calls.

Content-sized segmented filters must hug their options inside flex/grid columns;
only an explicit `fullWidth` mode fills the row. The shared alignment checks use
`data-segmented-width` and `data-segmented-tone` to check the last option's inset.
Keep search, filters, refresh and result counts together. Put compact presence
summaries on that row when practical; avoid a separate heading/avatar block that
pushes the collection down. Check narrow wrapping and keyboard selection too.

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
   need a named profile or narrow exclusion with its reason, shared-source
   evidence and a valid/failing fixture pair. Verify that neighboring ordinary
   controls still fail when mutated; never exempt an entire row for one label.
5. Compare the repaired sweep against the original report using `--previous`.
   Recheck every failing route/state/theme/width, including narrow layouts; a
   passing representative sweep cannot close a defect found on a detail route.
   Confirm the frontend actually serves the rebuilt shared package. An installed
   version alone is insufficient: if the browser still measures old styles or
   lacks new component markers, refresh its optimized dependency bundle through
   the repository's frontend restart workflow, then remeasure. Prefer
   semantic markers emitted by the owner (e.g. `data-ui-text="avatar"`) over
   inferring identity from visual classes. Keep font floors in the component,
   not a page CSS override. For an icon action rendered as a text character,
   use the shared SVG icon/control and verify its menu still opens and closes.
6. Run the mutation tests and skill validator after changing the audit itself.
   Report measured scope, findings and untested states; never equate a narrow
   sweep with a clean entire application.

```bash
node .claude/skills/ui-dom-audit/scripts/self-test.mjs --project portal
```

The default contract describes this app's compact UI, not universal design
requirements. Reuse it across its tenants; supply `--contract` for a different
product's documented design system. Pixel/style checks do not establish correct
copy, visual taste, full accessibility or backend/realtime behavior. Add explicit
interaction assertions when those are the reported problem.

## Source and installed-package checks

Use [the source audit API](references/source-audit.md) to find composition
candidates and compare an installed package with its reviewed archive. The
shared implementation is `scripts/source-audit.cjs`; consumer adapters own
source roots, density entry points, required migrations and ratchet policies.
Source candidates are review evidence, not automatic UI defects. Run the source
fixtures with `node --test skills/ui-dom-audit/scripts/source-self-test.cjs` in
the library after changing this mode.
