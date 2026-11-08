# Shared — `@connorhoehnslalom/ui-components/shared`

The shared module is the **most stable surface** in the library. Every
consumer depends on it; breaking changes here ripple to every app.
Tokens come from `src/styles.css` via Tailwind v4 `@theme`.

Subpath import:

```tsx
import { Button, Card, Modal, EmptyState } from '@connorhoehnslalom/ui-components/shared';
// or from the root:
import { Button, Card, Modal, EmptyState } from '@connorhoehnslalom/ui-components';
```

## Categories

`DetailSection` and `CardHeader` accept `as="h2" | "h3" | "h4"` to match
the surrounding document outline without changing their visual scale. Both
default to `h3` for nested sections; use `h2` directly below the page's `h1`.
`Breadcrumbs` accepts `aria-label` for distinct trails; `EditorShell` names its
folder path "Document location" separately from the application breadcrumb.

| Category | Primitives |
|---|---|
| Atoms | `Button`, `IconButton`, `Badge`, `Chip`, `Avatar`, `AvatarGroup`, `PresenceDot`, `UserChip`, `Spinner`, `TypingIndicator`, `ConnectionPill` |
| Containers | `Card`, `CardHeader`, `Modal`, `Panel`, `Banner`, `EmptyState`, `ErrorState`, `LoadingState`, `Toast`, `ToastProvider` |
| Forms | `TextField`, `Select`, `Toggle`, `Slider`, `TagEditor`, `CodeEditor`, `FileUploadDrop`, `FormField` |
| List rows | `SuggestionRow` (combobox option row), `MeterRow` (label + trailing meter) |
| Data | `Table`, `DataTable`, `Tabs`, `ThumbnailCard`, `CatalogGrid`, `StatCard`, `KPIGrid`, `Chart` (recharts wrapper) |
| Rails | `RailNavList` (flat views list), `StackedRail` (caption + collapsible groups + nested rows with meta, ⋯ slot, presence, drag pass-through, roving keyboard — the one left-rail look for trees too), `railType` constants |
| Text | `Highlight` (matched-term `<mark>` for search rows) |
| Domain | `ChannelHeader`, `PageHeader`, `Breadcrumbs`, `PresenceAvatars`, `NotificationCenter`, `CommandPalette`, `Skeleton`, `Tooltip` |
| Visualisation | `LogStream` / `TerminalLog`, `StackDiagram` / `LayerStack`, `HealthGrid` / `HealthCell`, `AlertList` / `AlertItem`, `CodeBlock` |
| Media | `ImageCompare`, `ImageLightbox`, `ModelViewer` (GLB turntable beside its reference; channels, parts, wireframe, versions), `FrameStrip` (scrubbable image sequence) |

## Stability

**Stable.** Every export here has consumers. Changing a signature
needs a major version bump and a heads-up to each consumer repo.

## Tests + stories

Shared primitives have tests in `src/components/shared/__tests__/` and
stories next to the component (`Default` plus variant args).

When adding a new primitive: write the tests next to it, write a
`*.stories.tsx` next to it, and add the export to `index.ts` in the
same commit.

## Design tokens

Tokens live in `src/styles.css`. Use the CSS variables, not hard-coded
colours:

```
--color-primary, --color-border, --color-border-field
--color-surface, --color-text-primary, --color-text-secondary
--color-success, --color-success-bg
--color-state-running, --color-state-pending, --color-state-error
```

Compose classes via `cn()` from `src/lib/cn.ts` (`clsx` +
`tailwind-merge`).

## See also

- [`../layout/README.md`](../layout/README.md) — app-shell composites
  that consume shared primitives.

For a document-like review, `RailLayout variant="plain"` pairs an unboxed
content column with context that stacks according to the column's width.
`ReviewThread` and `SignoffPanel` offer `variant="inline"` for the same surface.
The default card variants remain available. `GroupedList.leadingSize` reserves
8px for a decorative indicator, keeps the normal hit area for controls, or
omits an absent leading slot; `WorkListView layout="rail"` uses this compact
indicator and moves item identifiers into metadata to preserve title width.
A row's own buttons (quick actions) go in `GroupedListRow.actions` (and
`ActionRowItem.trailing` on `ActionRowList`): siblings of the row's button,
never inside it, at the row's end when wide and wrapped under the title below
a 35rem row.

`ModelViewer` shows a GLB/glTF on a turntable through Google's
`<model-viewer>`, an optional peer loaded with a dynamic `import()` only when
one mounts: an app that renders it installs `@google/model-viewer@4.4.0` and
`three@^0.183`. A `reference` image sits beside the model in the same aspect
frame (two up from a 28rem container, stacked below). The channel toggle puts
one texture map flat on the mesh (`channels` URLs plus the maps embedded in
the model); `parts` highlight named GLB nodes and `wireframe` draws the mesh's
edges through the three.js scene, which is not public model-viewer API: when
it is unreachable the controls still report, the view does not change.
`FrameStrip` scrubs an image sequence (Play/Pause, a Slider, arrow keys, a
scrolling thumbnail row, an optional contact sheet).

`DataTable rowHeight="content"` declares a document table whose prose may wrap
into taller rows. `KeyValue responsive` allows divided labels to move above
their values in a narrow column while keeping actions visible.
