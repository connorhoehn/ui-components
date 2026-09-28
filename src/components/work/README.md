# Work

Import these components from `@connorhoehnslalom/ui-components`.

- `ScopeHeader`: initiative/scope title, people, status, repository link, and tabs.
- `WorkListView`: narrow selection rail, using `WorkListItem` and `WorkListGroup`.
- [`WorkTableView`](./WorkTableView.md): full-width backlog using the same data contracts; grouped by status, owner, or type.
- `WorkListToolbar` and `WorkListFilters`: reusable controlled search, sort, and filter controls.
- Detail compositions: `WorkItemMetaBar`, `OutcomeSection`, `ChecklistSection`, `LinkedItemsSection`, `CommentList`, and `RunDraftPanel`.

Use `ExplorerLayout` for independently scrolling rail and pane regions. Put a
shared `RailNavList` above the record list when views and records share one rail.
Hosts own API reads, permissions, URL state, navigation, and writes; components
own presentation and interactions. Stories and tests live beside each component.
