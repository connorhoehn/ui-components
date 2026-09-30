# Shared — `@connorhoehnslalom/ui-components/shared`

The shared module is the **most stable surface** in the library. Every
consumer depends on it; breaking changes here ripple to every app.
51 components in tree, 88 entries including `__tests__`, stories, and
helpers. Tokens come from `src/styles.css` via Tailwind v4 `@theme`.

Subpath import:

```tsx
import { Button, Card, Modal, EmptyState } from '@connorhoehnslalom/ui-components/shared';
// or from the root:
import { Button, Card, Modal, EmptyState } from '@connorhoehnslalom/ui-components';
```

## Categories

| Category | Primitives |
|---|---|
| Atoms | `Button`, `IconButton`, `Badge`, `Chip`, `Avatar`, `AvatarGroup`, `PresenceDot`, `UserChip`, `Spinner`, `TypingIndicator`, `ConnectionPill` |
| Containers | `Card`, `CardHeader`, `Modal`, `Panel`, `Banner`, `EmptyState`, `ErrorState`, `LoadingState`, `Toast`, `ToastProvider` |
| Forms | `TextField`, `Select`, `Toggle`, `Slider`, `TagEditor`, `CodeEditor`, `FileUploadDrop`, `FormField` |
| List rows | `SuggestionRow` (combobox option row), `MeterRow` (label + trailing meter) — 2.400.0 |
| Data | `Table`, `DataTable`, `Tabs`, `ThumbnailCard`, `CatalogGrid`, `StatCard`, `KPIGrid`, `Chart` (recharts wrapper) |
| Rails | `RailNavList` (flat views list), `StackedRail` (caption + collapsible groups + nested rows with meta, ⋯ slot, presence, drag pass-through, roving keyboard — the one left-rail look for trees too), `railType` constants |
| Text | `Highlight` (matched-term `<mark>` for search rows, 2.400.0) |
| Domain | `ChannelHeader`, `PageHeader`, `Breadcrumbs`, `PresenceAvatars`, `NotificationCenter`, `CommandPalette`, `Skeleton`, `Tooltip` |
| Visualisation | `LogStream` / `TerminalLog`, `StackDiagram` / `LayerStack`, `HealthGrid` / `HealthCell`, `AlertList` / `AlertItem`, `CodeBlock` |

## Stability

**Stable.** Every export here has consumers. Changing a signature
requires:

1. A `create_handoff` to `event-catalog`, `websocket-gateway`, and
   `vnl-ads` (per the charter §1 no-touch list).
2. The 24h soak window before the version bump merges.
3. Breaking changes: a `raise_blocker` first.

## Tests + stories

Every shared primitive ships with tests in
`src/components/shared/__tests__/`. The Storybook backlog is tracked
under hub task #1059 — 51 components, 7 stories today, target is 1
canonical story per primitive (`Default` + variant args).

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
- [`../../../docs/AUTONOMY_CHARTER.md`](../../../docs/AUTONOMY_CHARTER.md)
  §1 no-touch list.
- [`../../../ROADMAP.md`](../../../ROADMAP.md) Wave 4 for the
  test/story coverage plan.
