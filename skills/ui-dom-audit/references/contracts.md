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
| `gutter` | selector (content columns), anchor (the trail band), edges? | Ink (text, images, icons) in the column below the trail that starts left of, or ends right of, the trail's padded reading edge |
| `row-start` | selector, anchor, heading?, offset? | The first heading row under the trail (a title, or an avatar + name) not starting at the trail's reading edge |
| `title-count` | selector, titleSize, expected | Headings drawn at the page-title step or larger in a content column, other than exactly `expected` |
| `contained` | selector (controls), region?, scrollers[{selector, reason}] | A control outside the viewport, outside its region, or cut by a clipping/scrolling ancestor that is not a declared scroller |
| `sparse-row` | selector (tile lists), maxGapRatio, minItems | A row of like tiles whose ink sits further apart than `maxGapRatio` x the tile's ink width |
| `table` | selector, rowHeight, cellInset, headerFontSize, headerFontWeight, bodyFontSize?, bodyFontFamily? | Unequal or oversized ordinary rows, cell padding and header/body typography |
| `composer-presence` | selector; per-case composerExpectation | Missing required composer, undocumented exemptions, unclassified policy coverage |
| `composer` | selector, input, boundary, inset, pseudo? | Missing/duplicate inputs, shelf insets, backdrop inset/missing paint, narrowing by an ancestor |
| `row-activatable` | selector (collection tables) | Body rows that open nothing: not a focusable pointer row and no row link, unless the collection declares `data-collection-rows="static"` with a documented reason |
| `record-popout` | selector (dialog-like surfaces), allow | After a row/record-detail activation probe: a drawer/modal/unmarked dialog instead of a routed record, an unchanged URL after a row activation, or a write attempted by the activation |
| `selection-shift` | none (probe only) | After a selection probe: the table's top edge or first row moved when a row was checked or unchecked |

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

## Content column rules (one edge, one title, nothing clipped)

Five rules judge the content column as a reader sees it. They exist because a
reported Communication landing drew its body flush to the chat rail while the
trail and title sat 24px in, set "Join a channel" and every "Open →" against
the window edge, spread six Active-now avatars ~300px apart across a stretched
four-column grid, and — on a conversation route — stacked a 20px conversation
header (avatar 8px left of the trail, tabs running off the row) under the 20px
page title. They hold for every tenant; there are no page-name exceptions.

**The reading edge.** A content column is the trail's parent
(aws-agentcore: `:has(> [data-testid="section-crumbs"])`, so a SectionContent
and a ListRailLayout header column both qualify) and its edge is the trail
band's content box: the band is padded by `--ui-page-gutter`, so its padding
*is* the gutter. A page without a trail (the native Social tenant, a canvas
shell) is unexercised (`matched: 0`), never passed.

**Ink, not boxes.** `gutter`, `row-start` and `sparse-row` measure what is
drawn: visible text runs, `img`/`svg`/`canvas`/`video` and
`[data-ui-text="avatar"]`. A full-bleed row (a ruled list, a hover surface, a
conversation header's border) passes when its text keeps the edge; ink is
clipped to every clipping or scrolling ancestor below the column first, so a
wide table inside its own scroller is judged by the scroller's window, while a
page body scroller that is itself flush to the rail still fails.

- **`content.gutter`** (`gutter`): every piece of ink below the trail starts at
  or right of the edge's left and ends at or left of its right. Ink inside the
  trail band (its hung controls) is the reference, not the subject. The fix is
  the owner's body inset: SectionContent `inset="page"` (or a conversation
  surface whose `--ui-content-gutter` is the page gutter), never a page margin.
- **`content.header-alignment`** (`row-start`, tolerance 2px): the first
  heading under the trail — the page title, or a conversation/record header
  that took the title slot — begins its row at the edge. The row is the ink
  crossing the heading's vertical middle, so an avatar beside the name counts.
- **`content.single-title`** (`title-count`): exactly one heading at the
  page-title step (20px) or larger in the column. A conversation route folds
  the page title into the trail (ScopeHeader `collapsed`) and its
  ChannelHeader name is the one title; two stacked 20px headers fail, and so
  does a column with no title at all.
- **`layout.contained-controls`** (`contained`): every visible control
  (`button`, links, tabs, inputs) lies inside the viewport, inside its region
  (content column, rail, shell header/footer) and inside every ancestor that
  clips or scrolls. The exception is explicit — `scrollers` names a tab row
  (`[role="tablist"]` and its wrapper) and a table's scroller (`:has(> table)`),
  each with a reason; the scroller is then judged in its controls' place. An
  undocumented scroller exception throws.
- **`people.sparse-row`** (`sparse-row`): in a `role="list"` grid, a row of
  three or more tiles whose largest gap between tile ink exceeds 3x the median
  tile ink width fails. The rail's four stretched columns at ~288px pass; the
  same grid across a page-width section fails. The library fix is
  `ActivePeopleGrid columns="fit"` (ui-components 2.442.6): fixed 72px tiles,
  left-aligned.

**Not expressed: an empty view.** A selected view with no content and no
EmptyState would need two library markers the DOM does not carry today:
ConversationSurface's view panels are not `role="tabpanel"` (they are siblings
of its Tabs) and EmptyState has no semantic marker, only an overridable
`data-testid`. Without both, "empty" cannot be told from "loading" or from a
custom empty line, so the rule is not shipped; the adapter's
`conversation-view-*` states still measure each view's geometry.

Fixtures (`self-test.mjs`, `columnHtml`): valid — a body on the trail's edge,
a full-bleed hover row whose text keeps the edge, four stretched tiles in a
264px rail section, a tab row scrolling inside itself, the title folded into
the trail with the conversation header as the one title; failing — a body
flush to the rail, a section action at the window edge, a conversation header
left of the trail, a title indented past it, a second 20px header, no title,
a button clipped at the column edge, a tab row running past the column, and
four stretched tiles across a page-width section.

**Adapter states.** aws-agentcore's `discoverStates` adds one
`conversation-view-<label>` state per unselected ConversationSurface view tab
(`[role="tablist"][aria-label="Views of this conversation"]`), with the
composer declared absent for that view (it belongs to Chat). The route
inventory observes the seeded DM on each tenant's Communication plane
(`/iq|assessment|pipelines/communication/dms/:lobby`) beside Social's own.

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
`states: [{name, enter(page, { probes }), required?, navigates?}]`; `enter`
may return a probe result (see Interaction rules). Each state navigates afresh to the
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

## Interaction rules (records open as pages, selections stay put)

Three rules judge what happens when a reader acts on a collection, not only
how it rests. They exist because a reported Assessment Submissions page had
rows that opened nothing, a "Revision history" row action that opened a
drawer, and a "2 selected" band that pushed the table down when a box was
ticked. They hold for every tenant; there are no page-name exceptions.

**Probes.** `scripts/probes.mjs` holds three read-only probes. The runner
passes them to every state as `enter(page, { probes })`; a state that returns
a probe result has it handed to `measureDOM` as `probe` and stored on the
report case. Every probe blocks each non-GET/HEAD/OPTIONS request while it
runs and reports what it stopped (`blockedWrites`) — activating a row or
toggling a selection must never change business state, and a blocked write is
itself a `record.popout`/`selection-shift` violation.

- `activateRow(page, { rows, via? })` clicks the first body row on a cell
  that holds no control of its own (never the selection checkbox or a row
  action); a row that is not focusable but carries a link is opened through
  that link; `via: 'enter'` focuses the row and presses Enter. It waits
  (bounded) for the URL to change or a dialog to appear, then moves the
  pointer off the row so a hover preview cannot pose as a popout.
- `recordAction(page, { scope, name })` presses a record-detail action
  (Revision history, History, Details …).
- `toggleSelection(page, { checkbox })` checks, measures, unchecks and
  measures the first visible row checkbox's table: top edge, first row
  top/bottom/left.

**`record.popout`** (`record-popout`) runs only when the state's probe is a
`row-activation`; with no probe it reports `matched: 0` (unexercised), so a
Filters popover in another state is never judged. After activation every
visible `[role="dialog"]`, `[role="alertdialog"]`, `dialog[open]` or
`[data-ui-dialog]` is a violation unless it matches `allow`. Allowed kinds are
named by semantic marker, emitted by the library (ui-components 2.442.0):
`[role="alertdialog"]`, `[data-ui-dialog="confirm"]` (`ConfirmDialog`) and
`[data-ui-dialog="command-help"]` (an `InlinePopover kind="command-help"`).
`Modal` emits `modal` (or its `dialogKind`), a floating `Drawer` emits
`drawer` whether it renders as a modal `dialog` or a non-modal
`complementary`, `InlinePopover` emits `popover` — all forbidden after an
activation. A `row` trigger must also change the URL (path + query): the
record is routed (`/…/:id` or `?item=<id>`) into the content column or the
split layout. A `record-action` trigger (revision history) may stay on the
same URL — a tab, section or right-pane tab is fine — but may not open a
drawer or modal.

**`collection.row-activatable`** (`row-activatable`, static) binds
`$collectionTables` (aws-agentcore: the library `DataTable`'s
`[data-collection-table]` and tables inside a `CollectionPage`). Every
ordinary body row (no `colspan`) must be a focusable pointer row (`DataTable
onRowClick` gives `tabindex="0"` and `cursor: pointer`) or carry a row link.
A collection whose rows deliberately open nothing declares it on the owner:
`DataTable staticRows="<reason>"` emits `data-collection-rows="static"` and
`data-collection-rows-reason`. A blank or placeholder reason (`TODO`, `N/A`
…, the composer-policy guard) fails coverage, and a declaration exempts only
its own table.

**`collection.selection-shift`** (`selection-shift`) runs only on a
`selection` probe and requires the table top and the first row's
top/bottom/left to stay within tolerance while a row is selected and after it
is cleared, and the checkbox to have actually toggled. The library fix is
`CollectionToolbar selection={{count, onClear, actions}}`: the selection
replaces search/filters/count on the same toolbar row (same `Toolbar`, same
height), marked `data-collection-selection="active"`. `DataTable` leaves a
click or key on a control inside a clickable row to that control, so ticking
a box never also opens the row.

**Navigating states.** A state whose probe leaves the list (a row opening
its record) sets `navigates: true`: the runner then judges it against the
state's own `required` regions only (aws-agentcore: the shell's header,
footer and columns), never the list route's (`$tables` on a record page would
be a false coverage failure). A state without the flag keeps the case's
required regions; the fixture proves both.

**Adapter states.** aws-agentcore's `discoverStates` adds `row-activate`
(a visible body row in a collection that has not declared static rows),
`record-detail-action` (the first visible button named like Revision
history/History/Details, except the Details buttons the `details-pane` state
already opens into the right pane) and `row-select` (a visible checkbox in a
collection body row). Each waits for loading rows to settle after its probe.

Fixtures (`self-test.mjs`): valid — a row that routes by click and by Enter,
a routed record beside a confirmation/alertdialog/command-help, revision
history drawn inside the record, linked rows, rows declared static with a
reason, a selection that swaps the toolbar row in place; failing — a modal
drawer, a non-modal drawer, an unmarked dialog, an inert row, an activation
that writes, a revision-history action opening a drawer, inert rows, a
focusable row without a pointer, blank/placeholder static reasons, a static
declaration beside an undeclared table, a selection band above the table and
a toolbar row that changes height. A runner-level fixture proves a state's
probe reaches the rules and the report.

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

A token expectation resolves on the document root unless it says `"scope": "element"`, in which case it resolves on the measured element. The composer inset is `{"token": "--ui-content-gutter", "scope": "element"}`: `ComposerSurface` pads by that token, so a host that scopes it (a record pane setting `--ui-content-gutter` to 20px so its composer shares the record's one edge) is measured against its own value, and everywhere else the token's 16px default applies. A surface whose padding differs from the token in force still fails.

A flush custom composer must reach its content edges in both filling and
standalone chat panels. The latter often retains card padding even when the
filling variant is correct. Keep the history's reading gutter independent of
the composer shelf; do not hide the mismatch by changing its boundary selector.

For compact avatars, test both initials and the overflow count at small sizes.
A proportional font size needs a readability floor; increasing the avatar itself
would enlarge the shell and evade the original compact-layout requirement.

GroupedList label headings bind through `button[data-heading="label"][data-focus-key^="g:"] > span`; their title and count both use the 11px rail profile. Plain rail rows and medium rows emit `data-ui-text="rail-item"` on the title alone (13px, weight 500, line height 20px). Since ui-components 2.441.0 every railType row title emits that marker (StackedRail, SubNavLayout, NavRail, RailNavList and `TreeView size="rail"`, not only GroupedList), and StackedRail's caption and group heading label/count emit `data-ui-text="rail-caption"` (the 11px profile); a frontend adapter should include `[data-ui-text="rail-caption"]` in `railCaptionLabels` rather than binding each rail's structure. Pills, metadata and neighboring actions remain outside that marker. Every named typography variant needs evidence in the shared component's source, a valid fixture and a failing mutation. Include an ordinary sibling control in the fixture and prove its mutation still fails, so the variant cannot silently exempt an entire row.


Library `Input mono` (a URL, regex, cron or JSONPath value) emits
`data-ui-text="code"` since ui-components 2.442.1; bind it in `codeLabels`
(`input[data-ui-text="code"]`) so it is measured on the code profile. An
unmarked monospace input still fails the ordinary control font-family, and a
marked one off the code profile fails `code.typography` (fixture pair).


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
Pipeline view policies live in the frontend adapter’s `ui-dom-audit.policies.ts`;
since 2026-10-12 the same file's `tenantComposerPolicy` classifies the orgiq,
assessment and social routes from evidence the adapter reads after the network
settles (the inventory's list judge, a visible collection toolbar or searchable
table, a visible composer, charts, a spatial canvas, a settings surface, a
registration placeholder, the lab workspace, a chat directory with no selected
conversation, an observed 404, a titled record), in an order that makes
`required` win before any exemption. The adapter's documented route aliases
(tenant roots and section indexes that `Navigate` to a front door) are listed
with their reasons; any other redirect fails readiness.
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

## Dropdowns (2.445.0)

Every dropdown is the library's: `Select` is a custom listbox (a
`role="combobox"` trigger marked `data-ui-control="select"` over a portal
`role="listbox"` marked `data-ui-listbox="select"`), and `Combobox` and the
library's suggestion/picker lists mark their listboxes `data-ui-listbox="<kind>"`.
Four rules hold the line:

- `control.native-select` (`count`, `includeHidden`) — any `<select>`, painted
  or hidden behind a trigger, any `<input list>` and any `<datalist>` opens the
  platform's unstyled menu. The only accepted `<select>` is the opt-in escape
  hatch `Select native={{ reason }}`, which emits `data-ui-native-select` and a
  non-empty `data-ui-native-reason`. Bind `$nativeSelects` to
  `select:not([data-ui-native-select][data-ui-native-reason]), select[data-ui-native-reason=""], input[list], datalist`.
- `control.unmarked-listbox` (`count`, `includeHidden`) — a `role="listbox"`
  without `data-ui-listbox` is a hand-rolled dropdown. Bind `$unmarkedListboxes`
  to `[role="listbox"]:not([data-ui-listbox])`.
- `listbox.option-type` (`text`) — option rows of an open listbox read at 12 or
  14px. Bind `$listboxOptions` to `[data-ui-listbox] [role="option"]`.
- `listbox.in-viewport` (`in-viewport`, new kind) — an open listbox sits wholly
  inside the viewport (each edge's margin ≥ 0 within tolerance). Bind
  `$openListboxes` to `[data-ui-listbox]`.

The last two only see a listbox while it is open, so an adapter should add a
state that opens the first `[data-ui-control="select"]` on a page (the
aws-agentcore adapter's `dropdown-open`). `includeHidden` is a general `count`
option: it counts matching elements whether or not they paint. Fix a finding
by rendering the library `Select` (or `Combobox` for a typed filter), never by
adding a marker by hand.
