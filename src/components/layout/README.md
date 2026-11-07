# Layout

App shells and pane layouts. Since 2.506.0 every layout component except
`AppLayout` is on the `/shared` subpath; there is no `/layout` subpath
(`package.json` `exports` has none):

```tsx
import { AppShell, ExplorerLayout, SplitPane } from '@connorhoehnslalom/ui-components/shared';
```

`AppLayout` stays root-only because it wires the pipelines providers. Avoid
root imports otherwise: they pull every optional peer into the bundle.

## Start here: the shell

Use `AppShell` with **`layout="fill"`** for a portal app. The shell is exactly
`100dvh`, the document never scrolls, and the main region is `min-h-0
overflow-hidden`, so the page layout below it gets a definite height and each
pane scrolls on its own. The default `layout="document"` (min-height window,
the document scrolls) is kept for back-compat; it is what makes stacked
sections scroll like a web page.

```tsx
<AppShell layout="fill" header={<TopNav … />} sidebar={<CollapsibleSidebar … />}>
  <ExplorerLayout rail={…}>{record}</ExplorerLayout>
</AppShell>
```

The page gutter (`AppShell`, `ExplorerLayout`, `WorkArea`, `SubNavLayout`)
reads `--ui-page-gutter` (default `1.5rem`, `src/styles.css`). Override it once
at the shell, never per page.

## I need X → use Y

| I need… | Use | Notes |
|---|---|---|
| The app frame: header row, optional section band, left sidebar, routed page | `AppShell` (`layout="fill"`) | Wraps a `ToastProvider` by default; `contentPadding="none"` for a full-bleed page. |
| A list or tree on the left, the record in the middle, an optional aside on the right | `ExplorerLayout` | `h-full min-h-0`; rail, pane and aside scroll independently. `railResize` for a draggable rail. Needs a definite-height parent (`AppShell layout="fill"` or `ViewportFillRegion`). |
| The same, but the rail is a flush list described as data (title, count, search, rows, footer) | `ListRailLayout` | An `ExplorerLayout` configuration: 264px rail, no pane padding, aside beside the pane, docked footer. |
| A selectable item rail with a detail pane for the selected item, rail collapsible to icons | `MasterDetail` | Selection is controlled (`selectedKey`/`onSelect`); `storageKey` persists the collapsed mode. |
| Two regions side by side with a divider the person drags | `SplitPane` | Keyboard-nudgeable separator. Does not persist the ratio or collapse; `secondary={null}` gives the primary the room. |
| A right-hand pane (conversation, details, log) a page opens "far right" without leaving the page | `SidePane` + `SidePaneProvider` + `SidePaneSplit` | One pane per page; provider sits above the rails, `SidePaneSplit` where the page renders. `presentation="document"` for a wide document pane. |
| A section with its own left nav (settings-like areas, Ingest, Identity) | `SubNavLayout` | Flat or grouped rail; pass `renderNavItem` for router links. Content pane scrolls and uses the page gutter. |
| A detail page with a main column and a right context rail (who, status, gates) | `RailLayout` | Rail stacks under the main column below `lg`. Rail is on the right; for a left rail use `ExplorerLayout`. |
| A static right-hand column for an editor: selected file, its agent task, tabs for comments/activity/details | `Workbench` | Content, not a rail: put it inside `ContextColumn`, `ExplorerLayout`'s aside or `EditorShell`'s `workbench` slot. |
| A content column with fixed breadcrumbs, toolbar and status bar, and one scrolling body | `WorkArea` | The body is the only scroller; `padded` uses the page gutter. |
| A column beside the page for what is about the page (conversation, activity), collapsible to an icon strip | `ContextColumn` | Three states: collapsed strip, open, wide. Host remembers the state. |
| A canvas (graph, map, board) with a details pane that stays usable at every width | `CanvasPaneLayout` | Pane takes a column while the canvas keeps its floor, overlays the canvas below that; foldable to a rail. |
| A settings page: section rail, scrolling body, sticky save bar | `SettingsLayout` | Data-driven sections; caller owns dirty state and save handlers. |
| A column docked beside page text (a comment thread, a work-items list) that reserves its width | `DockedAside` | Caps at the viewport so its body scrolls; can start lower than its row. |
| A region that ends where the window ends, inside a `document`-mode shell | `ViewportFillRegion` | Measures its offset and sets a definite height. Prefer `AppShell layout="fill"` in new apps; this is the escape hatch for shells you cannot convert. |

## Other exports

| Export | Purpose |
|---|---|
| `CollapsibleSidebar` + `CollapsedIconStrip` | Resizable / collapsible sidebar for `AppShell`'s `sidebar` slot. |
| `TopNav` + `NavTabs` | Header row content: brand, tabs, search slot. |
| `DocsShell` + `DocsSidebar` + `DocsTopNav` | Documentation-site shell. |
| `ApiDegradedBanner` | "Live updates degraded" banner for `AppShell`'s `apiDegraded` slot. |
| `ConnectionStatus` | Deprecated alias for `ConnectionPill` (`/shared`). |
| `AppLayout` | **Deprecated.** The demo app's wired shell (channel routing, gateway transport, pipeline providers), not a primitive. Use `AppShell`. |

## Stability

**Stable.** `AppShell` and `CollapsibleSidebar` are on the no-touch list: a
consumer handoff is required before any signature change. `layout` and the
gutter token were additive (2.504.0).

## Notes

`ExplorerLayout.railResize` enables a bounded, keyboard-resizable work list
with an optional device storage key and a widen/reset action. Folding preserves
the pane subtree. `SidePane.presentation="document"` gives documents their
requested width while preserving a readable main column; below 1240px of split
space the document takes that column until closed. See the
`Layout/WorkDetailLayout` stories (an `ExplorerLayout` + `SidePane`
composition, not a component) for the combined layout and narrow preview.
