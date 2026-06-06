# Pipeline Editor Demo

Demonstrates the visual pipeline editor with animated execution replay,
a node palette, an SVG canvas, and a config panel.

## Library primitives used

This demo composes only `@connorhoehn/ui-components` primitives — no
hand-rolled inline styles for UI chrome.

| Component | Source | Purpose |
|---|---|---|
| `AppShell` | `layout` | Full-page shell with sticky header |
| `PageHeader` | `shared` | Title + badge + actions header row |
| `StatusPill` | `shared` | Semantic-state pills (Saved / Published / warnings / node run states) |
| `Tabs` | `shared` | Config / Runs tab strip in the right panel |
| `Button` | `ui` | Header action buttons |
| `Card` | `ui` | Minimap and zoom-control containers |
| `Input` | `forms` | Node palette search box and config label field |
| `Select` | `forms` | Node type selector in the config panel |
| `Textarea` | `forms` | Auto-growing system prompt editor in the config panel |
| `NodeCard` | `pipelines/nodes` | Per-node canvas card (composes `Card` + `StatusPill`) |

## Canvas coordinate positioning

The two remaining `style={{ left, top }}` usages on canvas node wrappers and
the icon color on palette items are data-driven pixel values from
`MockPipeline.ts` and `nodeTypeColors` respectively. These cannot be expressed
as Tailwind classes because they are computed floating-point coordinates — the
same fundamental constraint that applies to any SVG/canvas-mock layout.
All UI chrome (header, sidebar, panels, controls) is fully Tailwind.
