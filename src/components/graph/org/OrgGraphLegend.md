# OrgGraphLegend

Root import: `import { OrgGraphLegend } from '@connorhoehnslalom/ui-components'`.

The org graph's key, absolutely positioned top-left of its container:
departments (buttons — `onFilter(name | null)`, `filter` is the active one),
relationship line samples from `RELATIONSHIP_STYLES`, a Clear Filter button,
and the presence key while `presenceFilter` is set. It rests translucent and
opens on hover or keyboard focus; `pinned` keeps it open. `OrgGraph` draws one
unless `legend={false}`.
