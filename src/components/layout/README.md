# Layout — `@connorhoehn/ui-components/layout`

App-shell, documentation-shell, and settings-shell composites. Wraps
shared primitives into the full-page compositions every consumer app
uses for its top-level layout. Root-reachable since v2.12.0 (hub#1021).

Subpath import:

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
} from '@connorhoehn/ui-components/layout';
// also reachable from the root barrel.
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
| `DocsShell` + `DocsSidebar` + `DocsTopNav` | Documentation-shell trio: collapsible-section sidebar with active-route highlight, sticky topnav with brand + search-hotkey slot. (#1018) |
| `SettingsLayout` | Section-rail + content + sticky-save-bar shell for identity/admin settings pages. (#1044) |
| `TopNav` + `NavTabs` | Generic top-nav with tabs, brand, search slot. (#983) |

## Stability

**Stable.** Root-reachable since 2.12.0. AppShell + AppLayout +
CollapsibleSidebar are on the charter §1 no-touch list — a handoff to
each consumer is required before any signature change lands.

`ConnectionStatus` is marked `@deprecated`. Scheduled for removal in
2.15 (rollover deferred since 2.14 — consumers still import it).
Replacement is `<ConnectionPill>` in `/shared`.

## Tests

- `AppShell` — 24 cases.
- `AppLayout` — 13 cases (#1204, May 2026).
- `CollapsibleSidebar` — 26 cases (#1080, May 2026).
- `DocsShell` trio — covered by AppShell stories + the docs demo.

## See also

- [`../shared/README.md`](../shared/README.md) — atoms composed by these
  shells.
- Wave 1 in [`../../../ROADMAP.md`](../../../ROADMAP.md) for the
  docs-shell / settings-shell primitives shipped in 2.13–2.14.
