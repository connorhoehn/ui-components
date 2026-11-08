# RecordResultList

Root import: `import { RecordResultList, recordResultKey } from '@connorhoehn/ui-components'`.

Use for a search workspace's Results tab: typed org records (person,
initiative, work, decision, knowledge, asset) grouped by type, each group
headed with its label and count ("People 3"), a trailing "See all N →" when
`count > records.length`, and selectable rows. Use `DocumentResultList` for
file results and `WorkListView`/`WorkTableView` for a backlog.

Rows draw a `Checkbox`, a leading mark (`Avatar` for a person — initials or
`avatarUrl` — otherwise a tinted kind glyph), the title and description with
matched terms marked by `Highlight`, one meta line from `subtitle` and
`matchReason`, a status dot + label (blocked → danger, open/in progress →
success, anything else → neutral; see `recordStatusTone`), and a chevron — or,
with `openLabel`, a labelled "Open work item ↗" link. Selected rows tint.
Collapsed groups draw only their heading with a ›.

The host owns: the query and read model, grouping (`groups` in display order),
the selection (`selectedKeys`, `${type}:${id}` via `recordResultKey`), routing
(`onOpen`, `seeAllHref`/`onSeeAll`), which groups are collapsed
(`collapsed` + optional `onToggleGroup`), and the footer/hint copy. Titles and
open links are real `<a href>`s: plain clicks call `onOpen`, modified clicks
stay native. A failed read (`error`) draws the error with `onRetry` and no rows
or counts; `loading` draws a spinner.

Composes `Checkbox`, `Avatar`, `StatusDot`, `Highlight`, `Button`,
`IconButton`, `EmptyState`, `ErrorState`, `LoadingState`, `Stack`/`Inline`;
theme tokens only. Storybook: Search/RecordResultList (default,
scoped-with-highlights, loading, failed read, empty, collapsed group, dark).
