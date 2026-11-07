# Observability — `@connorhoehnslalom/ui-components/observability`

Dashboard, events log, metrics, and per-node observability surfaces.

Subpath import (no root re-export yet — in-flux):

```tsx
import {
  ObservabilityDashboard,
  EventsPage,
  MetricsPage,
  NodesPage,
  DashboardPage,
  ObservabilityLayout,
} from '@connorhoehnslalom/ui-components/observability';
```

## Layout

```
observability/
  components/  — chart, panel, and badge primitives specific to this domain
  context/     — ObservabilityContext provider + hook
  fixtures/    — seed data used by demos + tests
  hooks/       — local hooks
  DashboardPage.tsx, EventsPage.tsx, MetricsPage.tsx, NodesPage.tsx
  ObservabilityLayout.tsx
```

## Stability

**In-flux.** Subpath-only; the API may change between minor versions.

The observability surface composes shared primitives — `<HealthGrid>`,
`<HealthCell>`, `<AlertList>`, `<AlertItem>`, `<LogStream>`,
`<StatCard>`, `<KPIGrid>` — which live in `/shared`.

## See also

- [`../shared/README.md`](../shared/README.md) — the shared primitives
  this domain composes.
- Demo route `/workflows/observability-shell` for the dashboard
  composition.
