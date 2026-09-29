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
`RECORD_GRAPH_MIN_FIT_ZOOM` (0.8 since 2.403.4, was 0.7) nor above 100%: a larger graph overflows and
the viewer pans. `focusKeys` (usually the host's `selectedKeys`) frames those
records plus their direct neighbours first (`recordGraphFitKeys`); "Fit to
view" frames the whole graph. The view re-fits when the drawing changes, not
on a selection click. `layoutRecordGraph(records, edges, layout, { width,
height })` takes the canvas to fill.

Fit and resize (2.403.4): the view also re-fits when the canvas is resized (a
host strip opening under it), one fit per animation frame. A selection click
never moves it. At the floor the fit keeps the focus whole: it centres on the
whole graph, the neighbourhood, or the focus itself, whichever fits
(`recordGraphViewport(positions, { width, height }, { mode, focusKeys,
fitKeys })`, pure). "Fit to view" re-centres on the focus. Pressed again, or
with no `focusKeys`, it frames the whole graph, top-left aligned when that
overflows.

A host whose own layout moves the canvas in ways the graph cannot see (or
that wants "Show selection" / "Show all" buttons) takes the handle:

```tsx
const graph = useRef<RecordGraphHandle>(null);
<RecordGraph ref={graph} focusKeys={selected} … />
graph.current?.fitToFocus(); // focus + neighbours; the focus is never clipped while it fits
graph.current?.fitAll();     // the whole graph, centred or top-left aligned
```

Keep-outs and the whole-graph fit (2.403.5): every fit keeps the drawing
clear of the bottom-left legend and the bottom-right zoom cluster
(`recordGraphInset(size, { legend: recordGraphLegendSize(labels, width),
controls: RECORD_GRAPH_CONTROLS_SIZE })`, passed to `recordGraphViewport` as
`inset`) — each corner is reserved along the bottom or its side, whichever
costs less, so on the search canvas one bottom band clears both. A focus
taller than the clear area keeps its whole boxes 16px inside the canvas, and
when even that is too tall, its avatar circles. The automatic fit keeps the
0.8 floor (since 2.403.7, except to show the whole graph at ≥ 0.7); the viewer's whole-graph fit (the second "Fit to view" press, or
`fitAll()`) may zoom down to `RECORD_GRAPH_FIT_ALL_MIN_ZOOM` (0.5) so the whole
graph is in view. Force pulls go as the aspect ratio squared once a set packs
the canvas, and start from an ellipse of the canvas's shape, so 25 records on
a 1160 × 418 canvas fill its width (~99%) rather than overflow its height.

Automatic fit: everything when it is readable (2.403.7). On open, on a new
drawing and on a canvas resize, the view shows the whole graph when it fits at
`RECORD_GRAPH_READABLE_ZOOM` (0.7, 13px names at ~9px) or above; only
otherwise does it fall back to the focus-centred fit at the 0.8 floor
(`recordGraphViewport(…, { mode: 'auto', … })`). "Fit to view",
`fitToFocus()` and `fitAll()` keep their meaning: the first press frames the
focus at the floor, the second the whole graph. So a search result opens with
nothing cut off, and the selection is one press away at a larger zoom. To make
the ~25-record case qualify, Radial rings are spaced from the node box
(128px between rings, the canvas's aspect sideways) and squeezed only as far as
the outer ring's ellipse must be to fit the canvas at 0.7
(`recordRadialRings(count, width, height)` — the fewest rings that hold
everyone, filled in proportion to their perimeters, a record whose ring point
is taken moving to the nearest free spot, so no boxes overlap; past ~30
records the natural spacing returns). Hierarchy centres its column block on
x = 0 and scales the column gaps to the canvas width and the column count (to
fit at 0.7 when wide, to fill the canvas at 100% when there are few), with rows
sized to the canvas at 0.7. Force keeps its shaping; a packed set a few
percent taller than the readable area closes its rows up by at most 15%, never
into a new box overlap. On the search canvas (1160 × 418) 25 records open at
~71% in all three layouts.

Edge labels (2.403.4) draw at rest only on edges that touch a selected or
focused record; the others appear on hover. With nothing selected, a graph of
≤ 16 edges labels every edge. Names and status lines sit on a surface pill,
so a crossing edge passes under the text.

Storybook: Graph/RecordGraph (Default with the Auth Migration cast, Search
result (25 records), 25 records, strip opens, 25 records, all layouts, Hierarchy, Radial, Empty,
Unconnected, ShowIsolated, Dark).

The canvas keeps a 160px minimum height inside its pane; give the graph a taller host to draw larger, never a fixed height on the graph itself.
