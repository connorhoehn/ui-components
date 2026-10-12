# Contract and adapter maintenance

## Ownership

- `references/work-ui.contract.json`: shared compact UI rules and tolerances.
- `scripts/measure.mjs`: one browser DOM pass; no application imports or requests.
- `scripts/run.mjs`: matrix execution, coverage, evidence, root-cause grouping,
  comparison against a prior report.
- `scripts/audit.mjs`: CLI bridge into the consumer's existing Playwright install.
- Frontend adapter: route discovery, current real session helper, readiness,
  selector bindings, theme activation and read-only state transitions.

The existing source audit (`scripts/audit-ui-inheritance.cjs` in aws-agentcore)
can point at potential overrides/package drift. It complements this rendered
measurement and must not substitute for it.

## Measured rules

| Kind | Contract fields | What it detects |
| --- | --- | --- |
| `text` | selector, properties | Actual visible labels including nested spans; ignores icon-only/visually hidden text |
| `style` | selector, properties | Computed font family/size/weight, padding, border style |
| `box` | selector, properties | Rendered width/height/edges outside a size contract |
| `count` | selector, expected | Missing/duplicate shell regions or nested composers |
| `viewport` | none | Horizontal document overflow |
| `align` | selector, anchor, ancestor?, edges?, offset? | Content/header/shelf edges drifting from their real region |
| `within` | selector, anchor, ancestor?, axes? | Element escaping its region; exclude intended scroll/portal surfaces explicitly |
| `columns` | selector, children, min, max, maxGap | Gaps/overlap, uneven tops/bottoms in direct peer columns |
| `table` | selector, rowHeight, cellInset, headerFontSize, headerFontWeight, bodyFontSize?, bodyFontFamily? | Unequal or oversized ordinary rows, cell padding and header/body typography |
| `composer-presence` | selector; per-case composerExpectation | Missing required composer, undocumented exemptions, unclassified policy coverage |
| `composer` | selector, input, boundary, inset, pseudo? | Missing/duplicate inputs, shelf insets, backdrop inset/missing paint, narrowing by an ancestor |

`columns` can alternatively use `regions: ["$primary", "$secondary",
"$content", "$right"]`. Never select nested parents and children as peers.
For nested shells, measure primary/main at the outer level and secondary/content/
right at the workspace/split level. The same contract covers a four-column
layout without assuming every route always has four visible columns.

Properties accept exact strings, numbers (pixel values), arrays of allowed values,
`{"min":40,"max":56}`, `{"token":"--ui-control-sm"}` for px/rem geometry,
`{"contains":"monospace"}` for a font-family constraint, or `{"from":"body","property":"fontFamily"}` for a canonical rendered reference.
Numeric tolerance defaults to 1px; typography size uses 0.1px so a browser-default
13.333px control is not mistaken for a 14px component. CSS reference strings
compare computed values; geometry tokens must exist. Missing tokens are failures.

Selectors starting with `$` resolve through adapter bindings. Other selectors
are CSS. `required: true` means at least one visible match. Each case also lists
required regions/components (for example `$tables` on a table route). Optional
rules with zero matches remain visible in coverage, not counted as measurements.
`exclude: [{selector, reason}]` is explicit and counted. Do not blanket-exclude
portals, controls or custom components merely because they fail.

Table expansion/empty rows with colSpan are outside the ordinary row-height
rule. This is structural, not a free-text whitelist. Table overflow is allowed
inside its scroll container; page overflow is not. Composer checks use an
explicit ancestor content region; choosing its immediately padded wrapper would
hide the exact defect users have repeatedly reported.

## Frontend adapter interface

Export an object from `.ts` or `.mjs`. The CLI uses the consumer's Playwright
transformer, so an adapter may import its existing TypeScript session helpers.

```ts
export default {
  baseURL: 'http://localhost:5183',
  selectors: { header: '[data-ui-region="header"]', /* all contract aliases */ },
  // Optional contract path; CLI --contract takes precedence.
  // Optional revision() -> commit/source digest.
  cases: async options => existingInventory.filter(/* tenant/path/archetype */),
  authenticate: async (context, firstCase) => existingSignIn(context, firstCase),
  // Optional resolveCases(context, cases): GET-based dynamic route resolution.
  theme: async (page, theme) => activateExistingTheme(page, theme),
  ready: async (page, spec) => waitForActualRouteContent(page, spec),
  // Optional discoverStates(page, spec) -> [{name, enter(page), required?}].
};
```

Cases have `tenant`, `path`, optional `actor`, `required` alias list and
`states: [{name, enter(page), required?}]`. Each state navigates afresh to the
case route. Scope context/session reuse to one actor and run actors sequentially:
a tenant switch may revoke that user's other sessions. Never import authentication
cookies into output. Reuse the repository's route inventory and session helpers;
do not create a second route list or sign-in implementation in this skill.

State discovery is useful for affordances that exist (Filters, Details). If a
feature must exist, declare a required selector or case state as well, so removing
it cannot silently reduce the sweep. Include real panes open, collapsed rails,
menus, empty/error/loading fixtures where relevant. State labels must identify
what was actually opened. Pane and accordion geometry are not exercised by a
screenshot of their closed state.

The runner waits for the adapter, fonts and two animation frames, then measures
twice. Unstable measurements are coverage failures. It does not use networkidle:
realtime connections and background polling make that an unreliable readiness
signal. An adapter should wait for known loading rows to disappear and expected
content/empty/error state to render. Spinner absence alone can pass before a
lazy page mounts; require a positive control or view marker before classifying
its composer policy. Do not add long sleeps or silence instability.

## Fast loop and CI

- Single path, one theme/width: diagnosis in seconds.
- Representative list/chat per tenant: catches shared drift with few navigations.
- Full route/state/theme/width matrix: broader verification, proportionally slower.
- `--previous`: matching, stably measured cases only. A navigation, coverage or
  runtime failure cannot close older findings. `delta.unverifiedCases` and
  `delta.unverifiedFindings` preserve unresolved evidence for omitted or failed
  cases. Changed contracts emit a comparison warning.
- CI invokes the same CLI and archives report.json, summary.txt and failure images.
  An empty route selection, failed sign-in or redirect is never a successful audit.

The CLI does not install packages, start servers or fix code. Start/rebuild the
local app through its existing workflow. The adapter must use the version of
ui-components actually consumed by that frontend. Independent repositories keep
small adapters; distribute/version the skill and shared contract from ui-components
rather than copying and independently editing measurement logic in each repo.

## Proving a new anomaly rule

`self-test.mjs` launches Chromium against a deterministic four-column fixture.
It checks a clean counterpart, repeatability, deliberately injected defects,
missing-region/token coverage, a redirected route, grouped cross-tenant failures,
and comparison behavior when a broken route is omitted. Extend it with the
smallest real DOM defect, then also run the actual implicated page. Fixture
success alone cannot prove the production adapter uses the correct boundaries.

The Work profile distinguishes ordinary labels from shell identity text, ticker
text, keyboard hints, secondary role captions and avatar counts. These use
separate measured rules, not blanket exemptions. Captions have the semantic
`data-ui-text="caption"` marker; bindings live in the frontend adapter.

## Work profile bindings

Typography variants follow existing component families: `railType` and
`RailSectionHeader` group labels (11px); `ConversationList` names (13px),
metadata (11px) and previews (12px); `Avatar` initials use a bounded readability
range; code identifiers have a compact monospace profile. Text glyphs marked
`aria-hidden` are icons, not label typography. New arbitrary button text still
uses the ordinary control profile. Validate each special profile with a valid
fixture and a size/family mutation; do not broaden ordinary controls to accept
all sizes encountered in the app.

The current frontend adapter uses public test IDs and component structure for
these bindings. Avatar and overflow chips emit `data-ui-text="avatar"`; use that marker
rather than rounded/title styling to identify text whose size scales with its host.
A zero-match optional profile is recorded as unexercised. Required page regions
must be declared separately; selector absence must not count as a successful
measurement.

`describe(page, spec)` can attach a small non-sensitive view classification to
reports (e.g. `join-required`, `shared-work`, `composer`). A join-required channel
is audited in that state; a seeded DM separately requires a real composer. The
runner restores the actor's initial local storage and clears session storage
before each top-level navigation in its isolated context, preventing a Details
or accordion preference from contaminating the next scenario. Authentication
must use cookies or durable local storage; session-storage-only authentication
needs an adapter/runner extension that preserves that auth separately.

In aws-agentcore, an absolute concrete `--path` (static or record, including query
parameters) selects only that requested URL. Static `/pipelines/runs` cannot
accidentally expand to its detail routes. An unknown absolute path selects zero
cases and fails; it never becomes a substring sweep. Explicit `:id` templates
select the inventory record family and resolve fixture IDs. A filter without a
leading slash, such as `runs`, intentionally uses substring matching.
This makes a user-reported path directly reproducible without editing the route
inventory. No route selected is an error, never a zero-case success.

## Closing findings

Keep the original report until the same failing cases pass. A representative
matrix and a narrow detail-page check are separate coverage: rerun both when
both produced findings. Record the shared package version installed by the
frontend, and rebuild/reinstall it before accepting DOM results.

A flush custom composer must reach its content edges in both filling and
standalone chat panels. The latter often retains card padding even when the
filling variant is correct. Keep the history's reading gutter independent of
the composer shelf; do not hide the mismatch by changing its boundary selector.

For compact avatars, test both initials and the overflow count at small sizes.
A proportional font size needs a readability floor; increasing the avatar itself
would enlarge the shell and evade the original compact-layout requirement.

GroupedList label headings bind through `button[data-heading="label"][data-focus-key^="g:"] > span`; their title and count both use the 11px rail profile. Plain rail rows and medium rows emit `data-ui-text="rail-item"` on the title alone (13px, weight 500, line height 20px). Pills, metadata and neighboring actions remain outside that marker. Every named typography variant needs evidence in the shared component's source, a valid fixture and a failing mutation. Include an ordinary sibling control in the fixture and prove its mutation still fails, so the variant cannot silently exempt an entire row.


## Composer presence policy

Geometry alone cannot catch a composer that was never rendered. Cases can declare
`composerExpectation: { mode: 'required' }` or `{ mode: 'exempt', reason: '…' }`.
A state may override the case. For context-dependent pages an adapter can expose
`composerExpectation(page, spec)`, inspecting a known read-only/membership state
and returning the same object. State overrides take precedence, then the hook,
then the case. Do not infer an exemption merely because the composer is absent.

The `composer-presence` rule counts visible `$composers` and requires a visible
contenteditable/textarea/textbox inside a matched surface. An empty particle
wrapper or unrelated page textbox does not satisfy it; disabled/read-only visible
inputs still count. Required + zero surfaces or zero contained inputs is a
violation. Exempt requires a nonempty trimmed contextual reason. Blank/non-string
reasons and standalone placeholders (`TODO`, `TBD`, `N/A`, `none`, `exempt`,
`not applicable`, `coming soon`, punctuation) are coverage failures. This is a
placeholder guard, not an automated judgment of whether a written rationale is
appropriate; review the route context. An explicit policy must be an object with
`required`, `exempt` or `unclassified` mode. Missing mode, unknown mode and scalar/array
policies fail coverage even in advisory mode. Omitted/null policy remains
unclassified. An exemption permits absence, but does not disable
geometry/style checks on any composer that is present. Missing policy is recorded
as `unclassified`, displayed as PARTIAL in console output and listed in
`report.unclassified` and `summary.txt`; it is not an automatic demand for a
composer or proof of complete compliance. The CLI returns nonzero for actual violations/failed execution. By default,
unclassified policy alone remains advisory. `--strict-coverage` additionally exits
nonzero when `report.unclassified` is nonempty; it does not turn those cases into
DOM violations or increase `report.failures`. `report.strictCoverage` records the
chosen policy and `report.exitCode` the outcome. Use this flag for reviewed
acceptance/CI matrices; do not invent exemptions merely to make strict mode pass.

Work enforcement covers the inspected RunsLedger pages `/pipelines/runs`,
`/iq/runs`, `/assessment/runs`, the shared Contacts collection at
`/social/contacts`, Pipeline Definitions, Runbooks, Queues, Artifacts, Approvals
and source registries, plus existing DM/initiative contextual composers.
Pipeline view policies live in the frontend adapter’s `ui-dom-audit.policies.ts`.
Exceptions require positive rendered evidence (graph controls, communication
directory, configuration form or unavailable settings feature). A report’s
missing-record state requires both a real 404 and its visible load-error view;
this does not establish coverage of a loaded editor. Verify SPA navigation after
readiness, including supplied query values, so a redirect or discarded view
selection cannot certify a different page. Only explicit
route aliases, such as `/pipelines` opening Runs, are accepted. Channel membership-required and shared-work-only views use documented
state exemptions. Other page families remain unclassified until their context is
reviewed; never attach a blanket exemption to a tenant. New tenant collection
pages should reuse the shared composer for natural-language search/actions unless
a documented contextual reason applies. Presence/geometry do not prove the
language-command behavior; validate supported search/ops separately with bounded
interaction tests that do not perform unauthorized business mutations.


### Composer boundaries are host regions

For full-page Work/Pipeline ledgers, measure against the real shell content column
(`data-subnav-content`), not a marker on the ledger or composer wrapper. Otherwise
ancestor page padding can shrink both measured nodes equally and falsely pass.
The Assessment ledger is intentionally embedded within a PageSection: its binding
is `section:has(> [data-collection-command-boundary="embedded"])`. The marker
identifies which section applies; the ledger itself is not the geometry anchor.
A valid embedded section can be inset from the page, while extra ledger margins
inside that section must still fail. Fixtures cover both an artificial full-page
boundary nested under padding and drift inside a legitimate embedded section.


Graph/card typography uses leaf-only source markers: WorkActivityNode detail
text (`graph-detail`, 11px), its metadata (`graph-metadata`, 10px), and
ActivePeopleGrid names/More captions (`active-person-caption`, 11px/500). Cards,
rows and preview containers are not exempt. The fixture mutates a nested ordinary
graph action to prove it remains governed by the standard control typography.

The CLI regression fixture launches the real runner against an isolated local
HTML response and checks advisory/strict unclassified exits and strict classified
success. It also rejects malformed flags. Route-selection tests live beside the
frontend adapter (`node --test portal/e2e/ui-dom-audit.routes.test.ts`) so portable
runner changes do not require copying app-specific route logic into this skill.
