# Deep audit — the brief

The ordinary sweep proves the rules it already has. It went to zero findings
while the user kept finding defects by eye, because every rule was added after
a report: native dropdowns, a panel's inset, the composer that was not last, an
empty section on two rows, cramped and clipped text, a misaligned header, a
record opened in a drawer, a table that jumped on selection, lanes with no
surface, a bell feed taller than the window, the gutter, controls cut by
their column. The deep audit inverts that. It measures families of defects
rather than instances, opens what the page can open, renders the states the
seed never shows, and ends with a visual review whose confirmed findings
become new deterministic rules. A run is expected to find things.

Run it when asked to "go deeper", before calling a tenant consistent, and after
any change to a shared composite. It never replaces the ordinary sweep: the
established rules still run inside every deep case.

## What the audit generalizes from

Every user report so far, by the class it belongs to. A new report is first
placed in this table; if no family below covers its class, the family is
missing, not the instance.

| Report (route) | Defect class | Family |
| --- | --- | --- |
| Revision history opens a popout (`/assessment/submissions`) | record surface opened as a layer, not routed | 4 interaction depth (`record.popout`) |
| Rows not clickable (`/assessment/submissions`) | affordance missing | `collection.row-activatable` |
| "2 selected" bar pushes the table down | layout shift on interaction | 4, 11 (`collection.selection-shift`, `tabs.stable`) |
| Unstyled dropdowns, everywhere | native control instead of a composite | 1 consistency, `control.native-select` |
| `/access/requests/new` "looks unfinished" | outlier composition, placeholder copy | 1, 7 |
| `/pipelines/communication` "is off"; "weird header" | header/gutter outlier | 1, 3 |
| Sprint board: filter link, progress, lanes with no stripes | surface not distinct, family outlier | 1, `board.lane-surface` |
| Footer bell feed past the top of the window | layer does not fit, no inner scroll | 4 (`layer.behaviour`, `popover.fit`) |
| "You can read messages" placed apart from the To row | read-only state incoherent | 12 (`composer.readonly-coherent`) |
| Padding off in a channel (`/iq/communication/channels/events`) | stray inset | 3 alignment grid |
| Bell empty state flush left under an inset header | stray inset inside a layer | 3, 4 (`panel.inset`) |
| Blank space under the composer (`/iq/work`) | unexplained empty band | 2 whitespace |
| "Needs your attention" takes two rows when empty | low density | 2 (`section.empty-row`) |
| Cramped, overlapping and clipped labels | legibility | `text.*` (data states make long text) |
| Tabs in the side pane change the layout (`/iq/projects/:id?pane=agent`) | layout shift on tab switch | 11 (`tabs.stable`) |
| Chat disabled but formatting/mode/workflow look live | read-only state incoherent | 12 |
| "Over budget" answer with no reference; mocks off | content not honest | 7 |

## The criteria families

Each family is a set of general rules in `work-ui.contract.json`, measured by
`scripts/measure.mjs` (one page) or `scripts/run.mjs` (across routes), with a
valid fixture and failing mutations in `scripts/self-test.mjs` and a section in
[contracts.md](contracts.md#deep-audit-rules). None names a route.

1. **Consistency outliers** (`consistency.<family>`, kind `fingerprint`). Each
   page records the rendered values of its component families: page title,
   section heading, table header cell, table row, table cell, painted button
   (keyed by font size and icon-only), input, tab, rail item, empty state,
   badge/chip, button icon (keyed by its button's height), card (radius,
   padding), panel radius; and three geometry families per content column:
   the gutter, trail→title gap, title→content gap. After the matrix, the
   runner groups each family by key and width and reports a value shown on at
   most 20% of the routes while the majority value holds at least three
   routes, on each deviating route. `report.json.consistency` lists every
   family's distinct values; `summary.txt` prints families with more than
   three. There are no fixed thresholds: the app's own majority is the
   expectation.
2. **Whitespace and density.** `density.blank-band`: a blank band taller than
   96px between consecutive blocks in the content column, or blank space under
   a short scroller that hides content. `density.table-first`: a list page's
   table starts in the top 60% of the viewport, with at most 240px between the
   title and the table (one compact selector/filter row; no stacked status
   cards). `density.narrow-block`: a table/section narrower than 60% of its
   column with nothing beside it. Sparse tile rows stay `people.sparse-row`.
3. **Alignment grid.** `align.grid`: every reading line in the content column
   starts on the inset grid (0, the table inset, the content gutter and their
   pairwise sums, borders subtracted); a line 1.5–12px off it is stray. The
   right edge of a control or box that ends a row snaps the same way.
   `align.baseline`: label and value of different sizes in one flex row share a
   baseline. `align.icon-center`: an icon beside one line of text is centred on
   it.
4. **Interaction depth (read-only).** With `--deep`, every layer trigger the
   page shows (`aria-haspopup`, `aria-expanded="false"`, `summary`; never a
   trigger whose name implies a write or a call) becomes a state: the probe
   opens it, checks focus moves in, Escape closes it and focus returns, opens
   it again and marks it; then every rule runs with the layer open, plus
   `layer.behaviour` (inside the viewport, above the page at five sample
   points, clear of the header/footer bars, capped with a scrolling region).
   Shell-chrome triggers are opened once per actor. `focus.visible` walks the
   first 20 focusables with Tab: each must be visible and show an indicator,
   and focus never falls to `<body>`. All probes block and report non-GET
   requests.
5. **Data-state coverage.** With `--deep`, each route renders under rewritten
   responses of the adapter's data API (`adapter.dataApi`), in the audit's own
   browser context only: `empty` (every array emptied), `error` (500),
   `loading` (responses held), `long` (names, titles, labels and emails grown
   past 80 characters), `many` (lists repeated to 60 rows), `denied` (every
   boolean in the capabilities read false). Non-GET requests are blocked and reported (a
   page that logs out on a 500 must not revoke the shared session). Every rule
   runs in each; `state.data` adds: an empty table explains itself, an error is written (no raw payload,
   no stack, no "Internal Server Error"), a loading page shows an indicator,
   and the page settles. Interception is preferred because it is read-only to
   the shared stack. The mock's scenario API (`GET /api/__mock/scenarios`,
   `POST /api/__mock/scenario`, `POST /api/__mock/reset`; `docs/mock-floor.md`
   in aws-agentcore) changes the world for every user of the stack: use it only
   when the adapter can isolate it (a private stack), never during another
   audit, and always reset afterwards.
6. **Widths.** The optional matrix adds 1024 and 390. `shell.viewport` (no
   page scroll), `layout.contained-controls`, `layout.scroll-owner` (wide
   tables/pre/media scroll inside their own container) and
   `layout.content-share` (the content column keeps 75% of a phone screen and
   480px on a laptop: rails fold) judge them.
7. **Content honesty** (`content.honesty`). Visible `undefined`/`null`/`NaN`/
   `Invalid Date`, `[object …]`, `$NaN` or ungrouped money, TODO/FIXME/lorem/
   "coming soon", raw ISO timestamps, raw UUIDs, ungrouped numbers of five or
   more digits, internal ids (`p-…`, `u-…`, `spr-…`) shown where a name
   belongs, and the same label twice in a row. Code-styled text is exempt
   (the trail repeating the section name is by design).
8. **Accessibility basics.** axe-core is not a portal dependency, so the
   checks live in `measure.mjs`: `a11y.names` (controls and images), `a11y.contrast`
   (text against the composited background, 4.5:1, 3:1 for large text, per
   theme), `a11y.heading-order` (one h1, no skipped levels), `a11y.landmarks`
   (one main, at most one banner/contentinfo, repeated nav/aside named
   distinctly).
9. **Theme parity** (`theme.parity`). The same route/state/width in light and
   dark draws its structural elements at identical sizes (positions are not compared: live data between the two navigations can move an element), and a border visible
   in one theme is visible in the other. Contrast is judged in each theme by
   `a11y.contrast`.
10. **Visual review** (below): the judgment layer that feeds new rules.
11. **Tab-switch stability** (`tabs.stable`). With `--deep`, every tablist
    (page tabs, pane tabs, section tabs) is cycled: each tab clicked, then the
    first again. Outside the panel nothing may move: the tablist (top, height),
    each tab's height (an active underline that adds 2px fails), the blocks
    above it, its ancestors' position and width, the height of any pane or
    scroller around it, the panel's top edge, and the shell chrome (header,
    footer, rails, composer dock, side pane). Each tab's snapshot carries a
    screenshot under `evidence/` for before/after review.
12. **Composer read-only coherence** (`composer.readonly-coherent`). A
    composer that says it cannot post ("You can read messages…", "read-only",
    or a `data-composer-readonly`/`aria-readonly`/`aria-disabled` host) has no
    enabled button, menu trigger, input or editable region left in it, and a
    marked read-only composer shows its reason inside itself or its dock. A
    control that is the way out of the read-only state (the To: selector, a
    mode switch to a mode that can post) declares it with
    `data-composer-readonly-allow="<reason>"`; links pass; a blank or
    placeholder reason fails coverage.

## Running it

One section at a time, never two runs at once (they share the fixture
identity), and never sign in as the fixture user anywhere else while a run is
underway — a diagnostic script's login or tenant switch bumps the session epoch
and turns the rest of the run into coverage failures; and only when `pgrep -f audit.mjs` is empty and `uptime` load is
under 20. From aws-agentcore:

```bash
S=.scratch/deep-$(date +%Y%m%d-%H%M)
UI_DOM_AUDIT_TIMEOUT_MS=14400000 npm --prefix portal run audit:ui -- \
  --tenant orgiq --path iq/ --deep --themes light,dark --widths 1440 --out $S/orgiq-iq
# then: --tenant orgiq --path admin/ · --tenant assessment --all · --tenant social --all
#       --tenant pipelines --all · --tenant access --all
# narrow widths, resting states only:
npm --prefix portal run audit:ui -- --tenant pipelines --all --states default \
  --themes light --widths 1024,390 --out $S/pipelines-narrow
```

`--deep` adds the interaction, tab, focus and data states once per route (at
the first theme and width), turns on `--review` (every case captured under
`review/`, indexed in `review-index.jsonl`), and keeps the established rules
in every state. `--deep-states layers,tabs,focus,data`, `--data-modes
empty,error,loading,long,many,denied` and `--deep-layers N` narrow a run while
diagnosing. The adapter supplies `dataApi` ({include, exclude[], permissions})
and `deep` ({chrome[], panes, chromeTriggers}); without `dataApi` the data
states are skipped, never faked.

## The visual review pass

Rules only find what they were written for. After each section, the agent
running the skill reads screenshots from `review/` (a sample of every route
family: the resting state, one opened layer, one data state, the narrow width)
and judges them against this rubric, drawn from the house rules and the table
above:

- the content column reads as one edge: trail first, title under it, body on
  the gutter; nothing hugs a rail or the window edge;
- a list page shows its table above the fold with one compact filter row;
  empty things take one row, not a paragraph;
- every region the eye treats as separate (lane, card, pane, panel) is drawn
  as separate, and its contents share its inset;
- nothing jumps: a tab, a selection or an open pane changes its own area only;
- nothing looks unfinished: placeholder copy, raw ids, unformatted numbers,
  a control that looks live but does nothing;
- type follows the shared scale (`T` tokens; no one-off sizes or weights);
- dropdowns, menus and dialogs are the library's, inside the window and
  above the page;
- dark mode is the same page in other colours.

Write each candidate as one JSON line to `review.jsonl` beside the report:

```json
{"route":"/iq/work","state":"default","theme":"light","width":1440,"region":"composer dock","class":"whitespace","description":"240px blank band under the composer down to the footer","screenshot":"review/ab12….png"}
```

`class` is a family name above (or `new:<name>` when none fits). A candidate
counts as **fixed** only when it is a rule: confirm it on the page, write the
general invariant (semantic markers, tokens, never a route or a pixel
coordinate), add a valid fixture and a failing mutation to `self-test.mjs`,
document it in contracts.md, and rerun the section so the rule — not the
reviewer — reports it. A candidate that cannot be expressed deterministically
stays in `review.jsonl` with `"rule": null` and a reason; it is not dropped.
That is the loop by which the audit grows on its own.

The first deep run's review produced five such rules, each now judged on every
route: `list.marker-alignment` (a bullet centred on a two-line item instead of
its first line — `/assessment/teams/:id` criteria), `text.flex-fragmented` (a sentence laid out as flex items, each phrase
wrapping in its own column — `/iq/canary`), `text.leading-separator` (a wrapped
"a · b · c" line opening with its separator — the `/iq/projects` stats line),
`table.selection-column` (a row-selection checkbox that is not the first
column — `/iq/scores`) and `table.column-hog` (one long value widening its
column until the other columns scroll out of view — `/iq/projects` under the
long-text state). Two candidates stayed judgment-only in `review.jsonl`, with
their reasons.

## Triage and reporting

Produce a findings report per run: counts per rule and section; the defect
classes ranked by how many routes they hit; three screenshot examples per
class (`screenshot`, `review/`, or `evidence/`); the owner of each class
(library composite vs portal page — a value repeated identically on many
routes is the composite's, a value on one route is the page's); and every
false positive tuned out, with the general reason. Tuning never widens a
tolerance or edits an expectation to match a bad page; it narrows what a rule
judges by a structural reason (for example: punctuation carries no words to
contrast; avatar initials sit on identity palette data; an icon beside a
two-line block centres on the block) and adds that reason's fixture.

Do not fix the app inside an audit run unless asked. A deep run's report is
the input to the repair loop in SKILL.md.
