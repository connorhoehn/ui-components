# WorkTableView

Root import: `import { WorkTableView } from '@connorhoehn/ui-components'`.

Use for a full-width backlog inside `ExplorerLayout`'s main pane. Use
`WorkListView` for a narrow work-selection rail. Both use `WorkListItem`,
`WorkListGroup`, and `WorkListToolbar` so hosts can switch presentation without
inventing a second data model.

The host supplies visible rows, the unfiltered count, search/filter/sort state,
and callbacks. No API or router is embedded. Unknown points display Unsized;
unknown owners display Unassigned. A failed read suppresses the count and rows.
`onToggleDone` opts into editable checkboxes; omit it for read-only roles.
`groups[].defaultOpen` controls initial status disclosures. Optional controlled
`groupBy` and `onGroupByChange` support URL-backed grouping.

The component composes shared Table, Checkbox, ActionRowPerson, IconButton,
DropdownMenu and WorkListToolbar primitives, uses theme tokens, and confines
horizontal scrolling to the table on narrow panes. Storybook's Work/WorkTableView
contains default, narrow, dark, loading, error, empty, and editable examples.

Pair with `ScopeHeader`, `ExplorerLayout`, a `RailNavList` above the record list,
and `RichChatComposer` (`toolbar="editor"`) in `FloatingComposerDock` for the
initiative-work reference layout. Application code supplies data and navigation;
the library owns visual controls and styling.

Work rows use the same hierarchy as `ActionRowList size="sm"`: 14px medium
titles, a 12px secondary line, 24px portraits and aligned 184px owner / 88px
points columns. Put the item key in `reference`; it appears as plain monospace
text below the title in both the table and selection rail. Kind and state stay
on that second line. Decorative type icons are omitted. Editable completion
checkboxes sit after the title block so permissions do not shift the title edge.
`OverviewAndWork` shows both presentations together for visual comparison.
