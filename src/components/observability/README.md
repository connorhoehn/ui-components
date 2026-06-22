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

**In-flux.** Subpath-only. Wave 5 graduation task not yet filed; will
follow after Wave 3 reduces inline-style debt in this domain.

The observability surface composes shared primitives — `<HealthGrid>`,
`<HealthCell>`, `<AlertList>`, `<AlertItem>`, `<LogStream>`,
`<StatCard>`, `<KPIGrid>` — all of which graduated from this domain to
`/shared` during Wave 1.

## Tests

Light. Tracked under #1051.

## See also

- [`../shared/README.md`](../shared/README.md) — atoms graduated out of
  observability during Wave 1.
- Demo route `/workflows/observability-shell` for the dashboard
  composition.
