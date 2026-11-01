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

`page.activity-unique` rejects repeated sibling `[data-page-activity]` regions.
An activity timeline is one region within its owner; separate pane owners may
each expose their own history. Repeated configuration-open/close probes must
leave that count unchanged (a duplicate React child key caused this regression).

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
| `dock-clearance` | selector (pinned docks), ignore?, maxPerDock? | Content painting inside a pinned composer dock's box (judged on each element's visible rect, cut by its clipping/scrolling ancestors): the dock — and a prompt deck inside it — must take layout space, with the content column scrolling above it (`dock.clearance`). Pinned means sticky/fixed, or not scrolled by any ancestor scroll container; a dock laid out as the last row inside a scrolling column (an embedded collection command host) scrolls with that column and is reported as `dock placement: scrolls with its column`, not judged |
| `row-activatable` | selector (collection tables) | Body rows that open nothing: not a focusable pointer row and no row link, unless the collection declares `data-collection-rows="static"` with a documented reason |
| `record-popout` | selector (dialog-like surfaces), allow | After a row/record-detail activation probe: a drawer/modal/unmarked dialog instead of a routed record, an unchanged URL after a row activation, or a write attempted by the activation |
| `selection-shift` | none (probe only) | After a selection probe: the table's top edge or first row moved when a row was checked or unchecked |
| `popover-fit` | selector (open panels), trigger?, header?, margin? | An open anchored panel outside the viewport, covering the popup trigger that opened it, or scrolling as a whole while it holds a header |
| `surface-distinct` | selector | A surface meant to read as its own region (a board lane) painting no background, or the same background as the surface behind it |
| `text-cramped` | selector (scope), maxLines, minChars | A block of wrapped text over `maxLines` lines whose width holds fewer than `minChars` characters at its own font |
| `text-overlap` | selector (scope), tolerance, maxPerPage | Two runs of text whose em boxes intersect in the same stacking context; `data-ui-layered="<reason>"` exempts a declared layer |
| `text-clipped` | selector (scope), scrollers[{selector, reason}], requireFullText? | Text cut by an overflow hidden/clip ancestor with no ellipsis or line clamp |
| `placeholder-squeezed` | selector (inputs), minEm, maxHidden | An input narrower than `minEm` of its font beside other row items, or whose placeholder is cut while those items are wider than it |
| `panel-inset` | selector (open panels), header?, tolerance? | Ink inside an anchored panel (popover, dialog, drawer) starting left of the panel header's first ink, or ending right of the same inset from the panel's right edge |
| `panel-empty` | selector (open panels), empty (empty-state marker), maxGap | A panel holding an empty state with a blank band (between what it draws, padded top to padded bottom) taller than `maxGap`: a fixed height where the cap should be a maximum |
| `composer-last` | selector (composers), column, dock?, ignore? | Ink in the composer's column laid out below it (scrolled into view or not; its own dock and fixed layers excepted), or a composer band with side margins inside its column |
| `section-empty` | selector (page sections), empty (empty-state marker), maxLines | A page section with nothing to show (its own empty state, no ink but headings and controls) drawn on more than `maxLines` lines |

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

The repeated-label check treats each native or ARIA table cell as its own
composition: equal answers under separate column headers are valid (for example,
the Social permission matrix), while duplicated adjacent labels inside one cell
still fail. The self-test covers both cases, including ARIA cells.

The application heading outline excludes a named `role="document"` body.
`CanvasDocumentView` owns that semantic boundary for authored document content
in both edit and read-only modes. Toolbars and titles outside the body still
count; a document cannot excuse a missing or duplicated application h1.
Mutation fixtures cover those neighboring failures.

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
  undocumented scroller exception throws. A control wholly outside a clipping
  ancestor (a collapsed panel's contents) is hidden, not clipped, and is skipped;
  a partly cut control fails.
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
a collapsed 1px panel whose controls are wholly hidden,
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
  // Optional classifyContext(page, spec, state) -> { kind, skip?, reason? }: where the page landed
  // (outside the app frame, an unreadable record). skip: true records it without measuring; a
  // blank/placeholder reason fails coverage (coverage.context).
  // Optional dataApi {include, exclude[], permissions} and deep {chrome[], panes, chromeTriggers}: deep-audit.md.
};
```

Other runners reuse the engine through `scripts/run.mjs` exports rather than
copying it: `loadContract(path?)` (read + validate; the shipped contract when no
path), `measureCase(page, { contract, selectors, required, composerExpectation,
probe })` (pause motion, fonts, two frames, measure twice; returns the
measurement with `stable` and, when unstable, a `coverage.stability` issue
naming what moved), `isDeepRule(contract, id)`, `consistencyOutliers(cases)` and
`themeParity(cases)`. Rules carry `deep: true` when they belong to the deep
audit; the report's `gate` counts findings apart — `resting` (established rules
on resting and adapter states) and `deep` (deep rules, cross-route passes and
every `deep:*` state) — and each deep finding is marked `deep: true`.

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
its composer policy. Do not add long sleeps or silence instability. The snapshot
finishes finite CSS transitions at their endpoints before measuring; a transition
already running or a layered important duration can survive the reduced-motion
style override. Endpoint defects and script-driven movement remain checked.

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

## Anchored panels and board lanes

Two rules came from reports where the resting page was fine and the defect
only showed in an opened or populated state. Both are general; neither names
a page.

**`popover.fit`** (`popover-fit`) binds `$popovers` (aws-agentcore: the
library `InlinePopover`'s `[data-ui-dialog="popover"]`). Every visible open
panel must (1) lie inside the viewport (`margin`, default 0), (2) not overlap
its trigger — any visible `[aria-expanded="true"][aria-haspopup]` outside the
panel; an expanded rail disclosure (no `aria-haspopup`) is not a trigger — and
(3) when it holds a `header` (`h2, h3, [role="tablist"]`), scroll a region
inside itself rather than scrolling as a whole. It exists because the footer
NotificationBell with a 99+ feed grew to the window's height: the popover's
viewport clamp pinned it at the top, it covered the bell that opened it, and
the "Notifications / Mark all read" header scrolled away with the feed. The
library fix (ui-components 2.446.1) is a fixed `min(70vh, 560px)` panel whose
feed scrolls between a pinned header and an optional `seeAll` footer, plus
`InlinePopover` re-anchoring when a placed panel grows out of the viewport. A
header-less menu clamped to a short viewport may still scroll as a whole.

**`board.lane-surface`** (`surface-distinct`) binds `$boardLanes`
(`[data-ui-board-lane]`, emitted by `BoardColumn`): the lane's computed
background must be painted and differ from the nearest painted ancestor's.
**`board.lane-columns`** (`columns`, selector `$boards` =
`[data-ui-board]`, emitted by `CatalogGrid variant="lanes"`) requires the
lanes in one row with equal tops and bottoms (gap ≤ 16px): lanes sized to
their cards, or wrapped into a second row at a narrow width, fail. Since
2.446.1 `BoardColumn` is a tinted (`color-mix` of the text colour at 4%),
full-height lane with its header inside and a dashed empty-lane message, and
the `lanes` grid keeps fixed columns in one row that scrolls sideways.

**Adapter states.** aws-agentcore's `discoverStates` adds
`notification-bell-open` (the footer bell, on one representative list route
per tenant — the bell is shell chrome, identical everywhere) and
`sprint-board` on `/iq/projects` (Sprints lens, first sprint opened, board
lanes required).

**Not a rule: the composer To: notice.** The reported defect (a read-only
reason on its own line under the To: selector) is a placement inside one
composite with no second consumer, so it is fixed and unit-tested in
`ConversationComposer` (`data-composer-recipient-row` holds the selector and
`data-composer-recipient-notice`). A general geometry rule ("a notice shares
its control's row") cannot tell a deliberate second line from a misplaced
one without a page-specific selector, which this skill does not take.

Fixtures (`self-test.mjs`): valid — a capped panel above its footer trigger
with an inner feed, a header-less clamped menu scrolling whole, tinted
full-height lanes on light and dark pages; failing — a panel past the top of
the window, a panel over its trigger, a panel scrolling as a whole with its
header, a panel off the right edge, a transparent lane, a lane matching the
page, lanes sized to their cards, lanes wrapped to a second row.

## Panel sections and the column's composer (2.448.0)

Two reports, one shape each. The footer bell's empty Unread tab drew "All
caught up / No unread notifications." flush on the panel's left edge while the
panel's "Notifications" title and tab row sat 16px in, and kept the full
`min(70vh, 560px)` height with a blank area under the message. And on
`/iq/work` (Automate › Inbox) the "Recent runs" command composer sat
mid-page as its section's last row, on its own dotted band inset from the
column, with "5 open findings →" and the "Queue operations" disclosure after
it and blank space down to the footer. Three general rules; none names a page.

- **`panel.inset`** (`panel-inset`, tolerance 2px) binds `$panels`
  (aws-agentcore: `[role="dialog"], [role="alertdialog"], dialog[open],
  [data-ui-dialog]`). In a panel with a heading (`h1, h2, h3,
  [role="heading"]`, the first visible one that is not inside a nested
  panel), the header's first ink sets the inset: no ink in the panel starts
  left of it, and none ends right of the same distance from the panel's right
  edge. Ink, not boxes: a full-bleed feed row whose text keeps the inset
  passes. Ink is clipped to the panel's clipping/scrolling descendants first;
  a nested panel is judged on its own; a panel with no heading (the command
  help, a header-less menu) is unexercised (`matched: 0`), never passed.
- **`panel.empty-height`** (`panel-empty`, `maxGap: 96`) binds `$panels` and
  `$emptyStates` (the library EmptyState's `data-ui-empty`, ui-components
  2.448.0 — its `data-testid` is overridable, so it is not a marker). A
  panel holding a visible empty state must not leave a blank band taller
  than 96px between what it draws, measured from its padded top to its padded
  bottom: a pinned footer link under a blank 350px area still fails. 96px is
  more than any library empty state's own padding and centring (the md
  block's `min-h-[220px]` with `p-8`), so only a height the content does not
  fill trips it. The fix is a `max-height`, never a `height`.
- **`composer.last`** (`composer-last`) binds `$composers`, `$composerColumns`
  (the content-column hosts: aws-agentcore's `[data-docked-column]`, pane
  columns, `[data-section-content]`, `[data-subnav-content]`, the split
  primary and the conversation pane — the nearest one is the column) and
  `$composerDocks` (`[data-column-dock], [data-floating-composer-dock]`).
  Nothing in the column is laid out below the composer — any ink whose top is
  at or below the composer's bottom and overlaps it horizontally, whether or
  not it is scrolled into view — except inside the dock that holds it (a
  call strip under the composer) and in fixed layers (menus, popovers,
  tooltips; `ignore` names them). And the composer's band (the surface whose
  backdrop is painted) spans the column: a left or right margin inside it
  fails (`band left|right margin`), which is how a composer embedded in an
  inset section with a decorative strip reads. `composerBoundary` no longer
  accepts an embedded section (`section:has(> [data-collection-command-boundary="embedded"])`).

Library owners (ui-components 2.448.0): `DockedColumn` is a content column —
a scrolling body over a dock slot that does not scroll — and `ColumnDock`
renders its children into the nearest DockedColumn's dock through a portal
(in place when there is none), so a section deep in the body keeps owning and
driving its composer while the composer lands at the column's bottom,
spanning it. `NotificationBell` renders one panel, empty or not (the
`NotificationCenter`, whose empty state sits at the header's 16px inset),
capped by `max-height: min(70vh, 560px)`.

**Adapter states.** aws-agentcore's `notification-bell-open` now requires an
empty state (`$emptyStates`) with the Unread tab selected, opened read-only as
the sweep user, who is seeded with no inbox items — no item is marked read and
no scenario is switched. It runs on one list route per tenant, including
`/access/requests`. `composer.last` needs no state: it runs on every route.

Fixtures (`self-test.mjs`): valid — an empty panel at its content height with
the empty state at the header inset, a long capped feed of full-bleed rows,
a header-less centred "Nothing new" panel, a composer docked at the column's
bottom, a call strip in the same dock, a fixed menu drawn below the composer;
failing — an empty state flush on the panel edge, a row label running to the
panel's right edge, an empty panel kept at its fixed height (blank under the
footer, and with the footer pinned at the bottom), a section composer followed
by the findings link and a disclosure, content below the composer scrolled out
of view, and a composer band with side margins in its column.

## Empty sections are one row (2.449.0)

On `/iq/work` "Needs your attention" drew a 14px heading over a two-line
"Nothing needs your attention right now — agent questions and finished work
awaiting review will show up here." callout: two full rows of screen for
nothing. **`section.empty-row`** (`section-empty`, `maxLines: 1`) binds
`$sections` (PageSection's `data-ui-section`) and `$emptyStates`. A section
qualifies when it holds its own empty state (one whose nearest section is it,
not a nested one's) and no other ink apart from headings and controls (a
header link, a button); all of its ink must then sit on one line — the title
and one quiet line on the title's row. A section whose empty state sits
beside real content (a toolbar over an empty table) is not an empty section.
The library owner is `PageSection empty="…"` (ui-components 2.449.0): the
title row carries the quiet line (`data-ui-empty`), no description and no
content block, actions on the right. When the section's items do exist and
need a response, aws-agentcore surfaces them through the page's docked
composer's prompt deck rather than a block above it (`/iq/work`).

Fixtures (`self-test.mjs`): valid — an empty section on one row beside a
header link, a section with content, an empty state in a nested section, an
empty state beside real content; failing — a heading over a "nothing here"
block, and the quiet line stacked under the title.

## Legible text (cramped, overlapping, clipped, squeezed)

Four rules judge whether text can be read at the widths the matrix runs
(the 900px pass is the narrow state; no extra adapter state is needed). They
came from one report — a 900px page whose content column sat beside a list
rail: a red callout laid its title, message and action side by side and left
the message ~3 words wide and 13 lines tall; a tier-flow strip's labels ran
into the next column and the last column was cut to its number; and a docked
command composer's mode and context chips squeezed its input until the
placeholder read "Sear…". They are general and name no page.

All four measure **text runs**: non-empty text nodes whose parent paints (no
`display:none`, `visibility:hidden`, sr-only clip or opacity-0 ancestor) and
that are not icon glyphs (`svg`, `aria-hidden`). Each line is judged by its
**em box** — the range rect shrunk vertically to the font size — because a
range reports ascent + descent (~1.2em), and two tight `leading-none` lines
would otherwise "touch" with no ink meeting.

- **`text.cramped`** (`text-cramped`, `maxLines: 4`, `minChars: 20`): runs are
  grouped by their block (the nearest non-inline ancestor). A block wrapping
  past `maxLines` lines whose content width holds fewer than `minChars`
  characters — measured with the block's own font (canvas `measureText`), not
  assumed — fails, provided the text is long enough to fill those lines by
  wrapping (`length / chars-per-line > maxLines`): lines forced by `<br>` or by
  separate items do not count. 20 characters is ~10–12em at this app's type.
  A truncated cell, a chip and a single-word label are one line; a single long
  word broken across lines in a narrow rail fails the length test. Calibrated
  on the reported callout (12 characters, 71px, 13 lines). `pre`, code,
  contenteditable drafts and vertical writing modes are skipped.
- **`text.overlap`** (`text-overlap`, tolerance 2px, at most 10 per page): every
  pair of em boxes — each cut to its clipping and scrolling ancestors first —
  that intersect by more than the tolerance on both axes inside the same
  stacking context fails. A popover, a sticky header, a transformed canvas
  node or anything with a z-index is its own context, drawn over the page by
  design. Text deliberately layered over text (a count badge over an avatar)
  declares it on the owning element: `data-ui-layered="<reason>"`; a blank or
  placeholder reason (the composer-policy guard) fails coverage.
- **`text.clipped`** (`text-clipped`, tolerance 1px): a run cut by an ancestor
  whose overflow is `hidden`/`clip` on the cut axis, with no `text-overflow:
  ellipsis` (horizontal) or `-webkit-line-clamp` (vertical) on the cutting
  element or between it and the text — a label sliced mid-glyph. Clipping
  honours containing blocks (an absolutely positioned box escapes static
  ancestors' overflow, a fixed one everything below a transform), and a
  clipping box under a scale transform (a zoomed node canvas) is converted to
  viewport pixels by its own rendered/layout ratio. Text wholly
  outside the clip box is hidden, not clipped (a collapsed panel). A scroll
  container's edge is not a cut — the reader scrolls — and neither is a
  declared pannable viewport: `scrollers` lists `.react-flow` (the xyflow node
  canvas behind TypedNodeCanvas and WorkActivityGraph) with its reason.
  Whether the full text of an ellipsis is reachable (a `title`, or an
  `aria-label` on the element or an ancestor near the cut carrying it) is
  recorded on the sample; `requireFullText: true` turns its absence into a
  violation. The default contract keeps it advisory: ellipsis truncation is a
  declared design choice; truncation with a title stays allowed either way.
- **`placeholder.squeezed`** (`placeholder-squeezed`, `minEm: 10`): an empty
  input showing a placeholder (`input[placeholder]` of a text type,
  `textarea[placeholder]`, a contenteditable carrying `[data-placeholder]` or
  `aria-placeholder`) is judged against its row — the nearest flex/grid row
  ancestor (`display: contents` wrappers flattened) holding other painted
  items on the input's line. With such items it must be at least `minEm` of
  its own font wide; and when more than `maxHidden` (0.5) of its placeholder
  is cut (canvas width of the `::placeholder` / `::before` text against the
  input's content box), the row items must not be wider than the input. A
  placeholder that loses its tail ("Search initiatives, open a record, or r…")
  is still read; one cut to its first word beside wide chips is not. A lone
  input in a narrow container is not this rule's concern.

Library owners (ui-components 2.447.0): `Banner` is a size container —
`layout="inline"` stacks title, body and action under 30rem of the banner's
own width; a `StatStrip` with `connectors` (a flow) is a size container that
stacks one line per cluster with a downward connector under 40rem, and every
default-variant cluster label truncates with an ellipsis and a `title`; the
composer's idle row folds its mode pill and context chip into ONE mode chip
(the subject in its tooltip and its menu) when the composer is `narrow`, and
caps reference chips on wider idle rows so the input keeps ~10em; `Toolbar`
sizes its controls from their content and lets `end` give way first (2.447.1);
`CollapsibleSection` never shrinks in a scrolling flex column (2.447.2).

Fixtures (`self-test.mjs`, `textHtml`): valid — a wide inline callout, the
callout stacked in a narrow column, ellipsised labels with and without a title,
a truncated table cell, chips, a single long word in a 60px rail, a badge
layered with a reason, a roomy search input, a composer row with its chips
folded, a placeholder mostly shown beside slightly wider row items, a card
under a scale transform whose label fits, a scroller and a node canvas cutting text at their edges; failing — the
callout split into columns in a narrow container, flow labels running into
the next column, a label clipped with no ellipsis, a node cut by an ordinary
clipping box, a caption cut at the bottom of a fixed-height box, a layered
badge with a placeholder reason, text absolutely placed over a neighbour, a
composer input squeezed to a few characters, and a cut placeholder beside row
items wider than the input.

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
`RailSectionHeader` group labels (12px); `ConversationList` names (14px),
metadata (12px) and previews (12px); `Avatar` initials use a bounded readability
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

GroupedList label headings bind through `button[data-heading="label"][data-focus-key^="g:"] > span`; their title and count both use the 12px rail profile. Plain rail rows and medium rows emit `data-ui-text="rail-item"` on the title alone (14px, weight 500, line height 20px). Since ui-components 2.441.0 every railType row title emits that marker (StackedRail, SubNavLayout, NavRail, RailNavList and `TreeView size="rail"`, not only GroupedList), and StackedRail's caption and group heading label/count emit `data-ui-text="rail-caption"` (the 12px profile); a frontend adapter should include `[data-ui-text="rail-caption"]` in `railCaptionLabels` rather than binding each rail's structure. Pills, metadata and neighboring actions remain outside that marker. Every named typography variant needs evidence in the shared component's source, a valid fixture and a failing mutation. Include an ordinary sibling control in the fixture and prove its mutation still fails, so the variant cannot silently exempt an entire row.


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
contenteditable/textarea/textbox inside each matched surface, or the active
choice/confirmation profile described below. An empty particle wrapper or
unrelated page textbox does not satisfy it; disabled/read-only visible inputs
still count. Required + zero surfaces or a surface without an answer control is
a violation. Exempt requires a nonempty trimmed contextual reason. Blank/non-string
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

Measure against the real shell content column (`data-subnav-content`,
`data-docked-column`, a pane column), not a marker on the ledger or composer
wrapper. Otherwise ancestor page padding can shrink both measured nodes equally
and falsely pass. Since 2.448.0 there is no embedded boundary: a section that
owns a table docks its command composer at the bottom of the content column
(`ColumnDock`), so the composer is measured against the column like every
other. Fixtures cover an artificial full-page boundary nested under padding and
a composer inside an inset section (it fails `composer.surface` and
`composer.last`).


Graph/card typography uses leaf-only source markers: WorkActivityNode detail
text (`graph-detail`, 12px), its metadata (`graph-metadata`, 12px), and
ActivePeopleGrid names/More captions (`active-person-caption`, 12px/500). Cards,
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
  14px. Bind `$listboxOptions` to `[data-ui-listbox] [role="option"]`. Elements matched by
  `$keyboardHints` are excluded; `keyboard.typography` judges them.
- `listbox.in-viewport` (`in-viewport`, new kind) — an open listbox sits wholly
  inside the viewport (each edge's margin ≥ 0 within tolerance). Bind
  `$openListboxes` to `[data-ui-listbox]`.

The last two only see a listbox while it is open, so an adapter should add a
state that opens the first `[data-ui-control="select"]` on a page (the
aws-agentcore adapter's `dropdown-open`). `includeHidden` is a general `count`
option: it counts matching elements whether or not they paint. Fix a finding
by rendering the library `Select` (or `Combobox` for a typed filter), never by
adding a marker by hand.

## Deep-audit rules

The families in [deep-audit.md](deep-audit.md) as contract kinds. Page kinds
run in every case; probe kinds judge only a state whose probe returned their
`kind`; the two cross-route kinds are recorded per page and judged by the
runner over the whole matrix. Each has a valid fixture and failing mutations in
`self-test.mjs`.

| Kind (rule id) | Contract fields | What it detects |
| --- | --- | --- |
| `fingerprint` (`consistency.<family>`) | families[{name, selector, properties, keyBy?, of?, host?, where?, exclude?, max?}], columns, trail, outliers{minRoutes, minMajority, maxShare, maxDistinct} | Cross-route: a family value (title type, table header, button height per size, gutter, trail→title gap…) shown on ≤ `maxShare` of the routes while the majority value holds ≥ `minMajority` routes. `where` filters by look (`control`: painted; `pill`: a rounded chip; `card`: a bordered/shadowed surface); `of` measures the item a marker labels; `host.<prop>` keys by the enclosing `host` |
| `blank-band` (`density.blank-band`) | selector (content columns), maxGap | A blank band taller than `maxGap` between consecutive things the column draws (text, media, controls), or blank space under a short scroller that hides content |
| `table-first` (`density.table-first`) | selector (collection tables), columns, trail, maxTopRatio, maxPreamble | A list page's table starting below `maxTopRatio` of the viewport, or more than `maxPreamble` px below the title |
| `narrow-block` (`density.narrow-block`) | selector (blocks), columns, trail, minRatio | A table/section narrower than `minRatio` of its column with nothing beside it |
| `alignment-grid` (`align.grid`) | columns, trail, insets[], maxStray, boxes? | A reading line whose start, or a row-ending control/box whose right edge, is 1.5–`maxStray` px off the inset grid (the insets and their pairwise sums; borders subtracted; centred/end-aligned blocks skipped) |
| `baseline` (`align.baseline`) | selector (rows), tolerance | Two plain text items of different sizes side by side in a flex row whose baselines differ (a baseline-aligned row is counted, not judged) |
| `icon-center` (`align.icon-center`) | selector (hosts), tolerance | An icon beside one line of text not centred on it |
| `scroll-owner` (`layout.scroll-owner`) | selector (wide content), region | A table/pre/grid/media wider than its column with no horizontal scroller of its own inside the column |
| `content-share` (`layout.content-share`) | selector (content columns), narrowBelow, narrowRatio, minWidth | A content column narrower than `narrowRatio` of a narrow viewport, or than `minWidth` on a wide one: the rails did not fold |
| `content-honesty` (`content.honesty`) | selector (scope), patterns[{name, pattern, flags?, whole?, inCode?, expect?}], code?, duplicates? | Visible text matching a pattern (undefined/NaN, `[object …]`, TODO/lorem, raw ISO times, UUIDs, ungrouped numbers, internal ids), and the same label twice in a row outside list/table items |
| `a11y-names` (`a11y.names`) | selector (controls, images) | A control with no accessible name; an `img` with no `alt` |
| `contrast` (`a11y.contrast`) | selector (scope), min, minLarge | Text below the WCAG ratio against its composited background in the theme measured (disabled controls, punctuation-only runs and backgrounds under an image/gradient are not judged) |
| `heading-order` (`a11y.heading-order`) | selector (scope) | Not exactly one h1; a heading level skipped going down |
| `landmarks` (`a11y.landmarks`) | none | Not one main; more than one banner/contentinfo; repeated navigation/complementary landmarks without distinct names |
| `composer-readonly` (`composer.readonly-coherent`) | selector (composers), dock?, marker?, noticeText?, allow? | A composer that says it cannot post (notice text, or a read-only marker on its host) with any enabled button, menu trigger, input or editable region left in it (links, and a control marked `data-composer-readonly-allow="<reason>"` as the way out or to disclose existing facts without submitting an answer, excepted; a blank/placeholder reason fails coverage); a marked one that does not show its reason |
| `layer` (`layer.behaviour`) | chrome[], margin? | After `openLayer`: nothing opened; focus not moved into a dialog/menu/listbox; Escape not closing it; focus not returned; the layer outside the viewport, under other content, over the header/footer bar (its own trigger's bar excepted), or taller than the window with nothing scrolling |
| `focus-walk` (`focus.visible`) | maxPerPage? | After `focusWalk`: focus dropped to body, an invisible focused element, or no style change between focused and blurred (outline, ring, border, background, colour on it or its two ancestors) |
| `tab-stability` (`tabs.stable`) | tolerance, maxPerTablist? | After `tabCycle`: anything outside the tab panel moved — the tablist's top/height, a tab's height, blocks above it, ancestors' position/width, panes' and scrollers' heights, the panel's top, the shell chrome |
| `data-state` (`state.data`) | region, busy?, ignore?, minInk? | After `interceptData`: an empty table with no explanation, a blank page, a silent or raw error, a blank loading page, a page that never settles |
| `text-fragmented` (`text.flex-fragmented`) | selector (candidate rows) | A flex/grid row holding several pieces of one sentence (two bare text runs, or bare text between word-carrying phrasing elements) whose bare text wraps inside its own item: prose split into columns; an icon beside one wrapping sentence is not judged |
| `leading-separator` (`text.leading-separator`) | selector (scope), separators? | A separator glyph (`·`, `•`, `|`) that opens a wrapped line of its inline list (a glyph that is its holder's first text is a list marker, judged by `list.marker-alignment`) |
| `marker-first-line` (`list.marker-alignment`) | selector (items), tolerance | A list marker (bullet glyph, number, small icon) beside one wrapping text block whose centre is not on the block's first line |
| `selection-column` (`table.selection-column`) | selector (tables) | A row-selection checkbox cell that is neither the first nor the last column |
| `column-hog` (`table.column-hog`) | selector (tables), maxShare | In a table wider than its window, one column taking more than `maxShare` of the window (a long value that should truncate) |
| `geometry-snapshot` (`theme.parity`) | selector (structural elements), tolerance, max? | Cross-theme: an element whose size differs between light and dark, or a border visible in one theme only |

`fingerprint` and `geometry-snapshot` return their data on the page result
(`fingerprints`, `geometry`); the runner judges them and strips them before
writing `report.json`, which keeps `consistency` (every family's distinct
values with the routes that show them). Consistency findings are categorised
`consistency` and attached to the deviating route's resting case; a family
needs four routes before it is judged.

Probes (`scripts/probes.mjs`): `discoverDeep` lists layer triggers (never one
named like a write or a call: delete, send, start, call, join, approve…),
tablists and their chrome flag; `openLayer`, `focusWalk`, `tabCycle` (with a
screenshot per tab when the runner passes `shoot`), and `interceptData`
(`mode`: empty, error, loading, long, many, denied). All run under the
read-only guard. A state may declare `before(page)` / `after(handle)` hooks
(interception installed before navigation and released after measurement) and
`ready: 'shell' | 'lenient'` when the page is not expected to settle, and
`ownRequired: true` when its `required` list replaces the route's (a data
state's empty page does not owe the list route's table). Loading and error data
states carry a composer exemption: the composer policy is judged on the resting
state.

### Count badges beside icons

`Badge variant="count"` emits `data-ui-badge="count"` and uses the 12px control floor. A count positioned absolutely over an icon is an overlay, so `align.icon-center` omits only that marked badge from its text baseline. Ordinary labels in the same button remain measured; inline badges remain measured. Font size and contrast still apply to the badge.

Card collection toolbars explicitly use `data-collection-layout="cards"`: their search aligns with the card content edge (zero horizontal toolbar inset). Table toolbars retain the 12px table-row inset. The two profiles have independent rules and mutation checks; the card profile does not exempt controls from typography, size, or containment checks.

The blank-band rule recognizes a semantic composer dock only when it reaches the measured column bottom. Flexible space immediately before that anchored dock is intentional. Gaps inside the dock, detached docks, and gaps between ordinary content blocks remain failures, with mutation coverage for each case.

Compact form height measures the standalone input or a Combobox’s painted field
frame. Its internal unbordered input occupies only the text line (16px); it is not
a second field. The valid fixture includes that inner input and rejects both an
oversized standalone input and an oversized Combobox frame.

Meeting toolbar count badges stay within their owning button (`meeting.badge-contained`), including simultaneous count and attention badges. Call headers retain at least 8px above their controls (`call.header-inset`); a composer host must not zero this inset when joining the call dock to its editor. Both contracts have valid and deliberately broken fixtures.

Tabs have their own consistency family regardless of their selected/hover paint.
The painted-button family excludes only semantic `role=tab` controls; the tab
family retains height, font weight, inset and radius. This avoids transient
button membership when an underline fades (shared `Tabs` / `ConversationSurface`),
without excluding tab typography or geometry. Fixtures prove selected/unselected
parity and detect both an oversized tab and an oversized ordinary button.

### Descriptive card focus

HoverCard emits `data-ui-focus="trigger"` on its nonmodal dialog. Its controlling
trigger names the same panel with `aria-controls` and `aria-describedby`. Only
this complete relationship uses the keep-focus-on-trigger profile: both opens
and Escape must retain focus there. Ordinary dialogs still move focus inside.
Valid, focus-stealing, and neighboring ordinary-dialog fixtures exercise it.

### Prompt dialogue

A self-contained ComposerPromptDeck emits `data-composer-dialogue` with its
answer kind. Choice and confirmation panels have no text entry. All prompt
dialogues exclude message formatting toolbars and the rich message editor;
text, number and compose prompts own their explicit answer fields. Neighboring
conversation editors remain ordinary composers. Count rules and valid/broken
fixtures enforce both boundaries without changing composer geometry rules.
For presence, a choice/confirmation marker must contain visible, named
`button[data-composer-prompt-option]` answers. Empty markers fail, manual-answer
prompts still require a field, and another composer still requires its own input.

The `rail.indicator-width` box rule measures GroupedList’s named decorative
indicator column (`data-ui-rail-leading="indicator"`) at 8px. Interactive status
controls keep their normal hit area and ordinary control checks. The valid
fixture and a 24px mutation guard the title space without exempting row actions.

Document tables declare `data-ui-table-rows="content"` through DataTable's
`rowHeight="content"`. Their profile permits rows at least 44px tall while
retaining header type, cell type and inset checks. Ordinary tables continue
to require the fixed collection rhythm. A valid tall row, a broken inset and
a tall ordinary neighbor are mutation-tested. Focus walks reset the browser's
sequential navigation start and omit programmatically focusable controls.
