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

Readability (2.403.2): nodes are 140 × 104 and every layout is sized to the
measured canvas, so a search result reads without zooming out to 5px labels.
Force scales its link distance and charge to the record count and canvas
(`recordForceParams(count, width, height)`; collide follows the node box, the
x/y pulls the aspect ratio). Radial rings are ellipses shaped to the canvas,
filled by arc length. Hierarchy ranks by longest path from the roots, falls
back to columns by type (person → initiative → work/decision/knowledge/asset)
when nothing forms a directed chain, and wraps a rank taller than the canvas
into side-by-side columns. The fit never goes below
`RECORD_GRAPH_MIN_FIT_ZOOM` (0.7) nor above 100%: a larger graph overflows and
the viewer pans. `focusKeys` (usually the host's `selectedKeys`) frames those
records plus their direct neighbours first (`recordGraphFitKeys`); "Fit to
view" frames the whole graph. The view re-fits when the drawing changes, not
on a selection click. `layoutRecordGraph(records, edges, layout, { width,
height })` takes the canvas to fill.

Storybook: Graph/RecordGraph (Default with the Auth Migration cast, Search
result (25 records), Hierarchy, Radial, Empty, Unconnected, ShowIsolated, Dark).
