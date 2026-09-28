# RecordGraph

Root import: `import { RecordGraph } from '@connorhoehnslalom/ui-components'` (also `/graph`).

A search result set as a typed record graph: people, initiatives, work,
decisions, knowledge and agent-library assets as avatar-style nodes joined by
labelled, directed relationships. It replaces the aws-agentcore portal's
`SearchConnections` + `searchConnections.css`; the props map one-to-one.

The host owns data and state — `records`, `edges` (`source`/`target` are
`type:id` keys, see `recordGraphKey`), `selectedKeys` + `onSelectionChange`,
`onAskSelection`, optional `onOpenRecord`, and optionally controlled `layout`
(`force` | `radial` | `hierarchy`) and `typeFilter`. Omit a controlled value and
the graph holds it. `typeLabels` renames the plural labels in the type filter
and legend.

The graph owns the drawing: a toolbar (layout switch, type select, "N records ·
M connections", "N selected", Open record ↗ for exactly one, Clear, Ask about
selection →), 48px avatar nodes (initials or a photo for people, a kind glyph
otherwise, a warning glyph on blocked work) with a ring and check when
selected, curved edges clipped to the circles with an arrowhead and a haloed
label ("Related result/match" edges are dashed), a legend of the types on
screen (bottom-left), and `CanvasZoomControls` plus full screen (bottom-right).

Built on `@xyflow/react` for pan/zoom/fit and culling; nodes and edges are
custom renderers painted with tokens, so no xyflow CSS overrides. Positions come
from the pure `layoutRecordGraph`, and `filterRecordGraph` drops records of
other types and any edge left dangling — both exported for hosts and tests.

It never draws a cloud of unconnected records by default: when the
type-filtered records have no connections among them, the canvas is replaced by
`emptyLabel` (default "No recorded connections — search, or select related
records"); the toolbar stays so the filter and selection still work.
`showIsolated` draws them anyway (the pre-2.403 behaviour).
Storybook: Graph/RecordGraph (Default with the Auth Migration cast, Hierarchy,
Radial, Empty, Unconnected, ShowIsolated, Dark).
