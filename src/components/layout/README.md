# Layout — `@connorhoehnslalom/ui-components`

App-shell, documentation-shell, and settings-shell composites. Wraps
shared primitives into the full-page compositions every consumer app
uses for its top-level layout.

There is no `/layout` subpath; these components are exported from the root:

```tsx
import {
  AppShell,
  AppLayout,
  CollapsibleSidebar,
  ConnectionStatus,
  DocsShell,
  DocsSidebar,
  DocsTopNav,
  SettingsLayout,
  TopNav,
} from '@connorhoehnslalom/ui-components';
```

## Exports

| Export | Purpose |
|---|---|
| `AppShell` | Top-level shell — header, sidebar, content, footer, optional degraded banner. |
| `AppLayout` | Lower-level layout primitive composed by `AppShell`. |
| `CollapsibleSidebar` | Resizable / collapsible sidebar with persisted state. |
| `CollapsedIconStrip` | Icon-only rail rendered when the sidebar collapses. |
| `ConnectionStatus` | Deprecated alias for `<ConnectionPill>` (in `/shared`). |
| `ApiDegradedBanner` | "Live updates degraded" banner with retry slot. |
| `DocsShell` + `DocsSidebar` + `DocsTopNav` | Documentation-shell trio: collapsible-section sidebar with active-route highlight, sticky topnav with brand + search-hotkey slot. |
| `SettingsLayout` | Section-rail + content + sticky-save-bar shell for identity/admin settings pages. |
| `TopNav` + `NavTabs` | Generic top-nav with tabs, brand, search slot. |

## Stability

**Stable.** `AppShell`, `AppLayout` and `CollapsibleSidebar` are public API
used by every consumer; signature changes need a major version bump.

`ConnectionStatus` is marked `@deprecated`. The replacement is
`<ConnectionPill>` in `/shared`.

## See also

- [`../shared/README.md`](../shared/README.md) — atoms composed by these
  shells.

`ExplorerLayout.railResize` enables a bounded, keyboard-resizable work list
with an optional device storage key and a widen/reset action. Folding preserves
the pane subtree. `SidePane.presentation="document"` gives documents their
requested width while preserving a readable main column; below 1240px of split
space the document takes that column until closed. See the
`Layout/WorkDetailLayout` stories for the combined layout and narrow preview.
