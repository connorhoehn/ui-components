# OrgGraphLegend

Root import: `import { OrgGraphLegend } from '@connorhoehnslalom/ui-components'`.

The org graph's key, absolutely positioned top-left of its container:
departments (buttons — `onFilter(name | null)`, `filter` is the active one),
relationship line samples from `RELATIONSHIP_STYLES`, a Clear Filter button,
and the presence key while `presenceFilter` is set. Since 2.403.2 it is an
opaque `bg-surface` panel with a hairline border and a fixed 176px width (it
used to rest at 20% opacity over the nodes); at rest it shows its first rows,
hover or keyboard focus opens it, `pinned` keeps it open. `OrgGraph` draws one
unless `legend={false}` and keeps its drawing clear of `ORG_LEGEND_INSET`
(200px) on the left.
