# RecordGraphCard

Root import: `import { RecordGraphCard } from '@connorhoehnslalom/ui-components'`.
Since 2.405.2.

Use in a chat / Answer view to show how the records behind an answer
connect, without leaving the conversation. Collapsed, it is one row: a graph
glyph, the title ("Connections"), the summary ("25 records · 31
connections"), up to six record marks (the selection's, else the
best-connected records, then "+N"; each carries an `sr-only` title, anchored inside the `relative` strip so it cannot escape a host scroll container), **Expand ⌄** and **Open graph ↗**.
Expanded, the same header reads **Collapse ⌃** and a `RecordGraph` (toolbar,
legend, zoom controls, `focusKeys` = the selection) fills a fixed-height
canvas (`height`, default 320px) under it, so the conversation below stays
where it was. With no connections among the records the summary says "No
recorded connections" and Expand is not drawn. Use `RecordGraph` directly for
a full-height Connections tab.

| Prop | Type | Notes |
|------|------|-------|
| `records` | `RecordGraphRecord[]` | Required. |
| `edges` | `RecordGraphEdge[]` | Required. `source`/`target` are `type:id` keys; edges to records not in `records` are ignored. |
| `selectedKeys` | `string[]` | Controlled selection. Omit and the card holds it. |
| `title` | `string` | Default "Connections". Also the region's accessible name. |
| `summary` | `string` | Default `recordGraphSummary(records, connections)`. |
| `expanded` / `onToggleExpanded` | `boolean` / `(next) => void` | Controlled or not; starts collapsed. |
| `onOpen` | `() => void` | "Open graph ↗" — switch to the host's Connections view. Omitted, no button. |
| `onSelectionChange` | `(keys) => void` | From the expanded graph. |
| `onOpenRecord` | `(record) => void` | "Open record ↗" while one record is selected. |
| `onAskSelection` | `() => void` | "Ask about selection →". Omitted, no button. |
| `height` | `number` | Expanded canvas height in px, toolbar included. Default 320. |
| `className`, `data-testid` | | Default testid `record-graph-card` (`-header`, `-summary`, `-marks`, `-toggle`, `-open`, `-canvas`, `-graph`). |

The host owns the records, edges, selection, navigation and (optionally) the
expanded state; the card owns the summary and the frame. Composes `Card`,
`Button`, `RecordMark`, `RecordGraph`, `Inline`, `T` and the `GraphIcon`,
`ChevronIcon` and `ExternalLinkIcon` glyphs; theme tokens only (the canvas
height is the one runtime style). Storybook: Search/RecordGraphCard
(collapsed, expanded, with a selection, no connections).
