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
content/empty/error state to render. Do not add long sleeps or silence instability.

## Fast loop and CI

- Single path, one theme/width: diagnosis in seconds.
- Representative list/chat per tenant: catches shared drift with few navigations.
- Full route/state/theme/width matrix: broader verification, proportionally slower.
- `--previous`: matching cases only. Changed contracts emit a comparison warning.
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
these bindings. Its legacy Avatar binding also uses the titled circular root;
replace that binding with a semantic marker if Avatar's public markup changes.
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

In aws-agentcore, an exact parameterized `--path` (including query parameters)
uses that requested record; only inventory placeholder cases resolve fixture IDs.
This makes a user-reported path directly reproducible without editing the route
inventory. No route selected is an error, never a zero-case success.
