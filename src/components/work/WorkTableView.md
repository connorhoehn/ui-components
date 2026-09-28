# WorkTableView

Root import: `import { WorkTableView } from '@connorhoehnslalom/ui-components'`.

Use for a full-width backlog inside `ExplorerLayout`'s main pane. Use
`WorkListView` for a narrow work-selection rail. Both use `WorkListItem`,
`WorkListGroup`, and `WorkListToolbar` so hosts can switch presentation without
inventing a second data model.

The host supplies visible rows, the unfiltered count, search/filter/sort state,
and callbacks. No API or router is embedded. Unknown points display an em dash;
unknown owners display Unassigned. A failed read suppresses the count and rows.
`onToggleDone` opts into editable checkboxes; omit it for read-only roles.
`groups[].defaultOpen` controls initial status disclosures. Optional controlled
`groupBy` and `onGroupByChange` support URL-backed grouping.

The component composes shared Table, Checkbox, Avatar, Chip, IconButton,
DropdownMenu and WorkListToolbar primitives, uses theme tokens, and confines
horizontal scrolling to the table on narrow panes. Storybook's Work/WorkTableView
contains default, narrow, dark, loading, error, empty, and editable examples.

Pair with `ScopeHeader`, `ExplorerLayout`, a `RailNavList` above the record list,
and `RichChatComposer` (`toolbar="editor"`) in `FloatingComposerDock` for the
initiative-work reference layout. Application code supplies data and navigation;
the library owns visual controls and styling.
