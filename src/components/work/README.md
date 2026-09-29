# Work

Import these components from `@connorhoehnslalom/ui-components`.

- `ScopeHeader`: initiative/scope title, people, status, repository link, and tabs. `variant="crumbs"` is a crumb line only; `variant="inline"` (2.405.2) puts crumbs, title, tabs and controls on one 48px row; since 2.406.4 that row never wraps — crumbs truncate inside a cap (10rem, the last 14rem) and give up width before the title, and the middle crumbs collapse to "…" when they are squeezed further. Since 2.407.2 an over-full inline row gives up space in a fixed order: (a) the `controls` cluster first — it is `min-w-0 overflow-hidden`, shrinks ahead of the trail (`shrink-[100]` against the trail's 1) with its items allowed to shrink, and once its content no longer fits (or the trail would drop under its minimum, or the row is under `controlsCollapseAt`) the controls leave the row: into the ⋯ menu as a "Filters" section when `controlsMenu` (the same controls as menu rows, same `onSelect`s) is given, else into a popover behind one "Filters ▾" button (`<testid>-controls-toggle` / `-controls-popover`); (b) then the crumbs truncate and fold to "…"; (c) the title never goes below `min-w-[12rem]` and the first crumb never below its own width. The tabs never shrink. The row reports `data-controls="inline" | "collapsed"`. Since 2.407.4 the controls never wrap or shrink inside the row (`flex-nowrap`, `whitespace-nowrap`, items and a wrapper's items `shrink-0`), so an over-full cluster overflows; the collapse also fires when the right cluster overflows, when a crumb is cut below its natural width (to the sub-pixel), or when the row's content at its wanted width exceeds the row (`inlineRowDeficit`). Collapsed, the right cluster is `shrink-0` (Filters ▾ and ⋯ stay inside the padding), the Filters popover is a vertical `Stack` of one-line full-width rows at least 16rem wide (a single host wrapper `<div>` such as an `Inline` is flattened so each control is a row), and the last crumb's cap is 15rem.
- `WorkListView`: narrow selection rail, using `WorkListItem` and `WorkListGroup`.
- [`WorkTableView`](./WorkTableView.md): full-width backlog using the same data contracts; grouped by status, owner, or type.
- `WorkListToolbar` and `WorkListFilters`: reusable controlled search, sort, and filter controls.
- Detail compositions: `WorkItemMetaBar`, `OutcomeSection`, `ChecklistSection`, `LinkedItemsSection`, `CommentList`, and `RunDraftPanel`.

Use `ExplorerLayout` for independently scrolling rail and pane regions. Put a
shared `RailNavList` above the record list when views and records share one rail.
Hosts own API reads, permissions, URL state, navigation, and writes; components
own presentation and interactions. Stories and tests live beside each component.
