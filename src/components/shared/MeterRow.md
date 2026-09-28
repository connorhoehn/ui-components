# MeterRow

Root import: `import { MeterRow } from '@connorhoehnslalom/ui-components'` (also `/shared`).

A dense, clickable row pairing a label (plus a muted `note`) with a trailing
meter — "this name, this strong". The meter is any node, usually
`<ScoreBarGauge size="sm" showLabel={false} />`; its slot has a fixed width
(`meterWidth` `sm` 44px, `md` 72px) so a column of rows lines the meters up.
The row is a real button; put what the click does in `title`.
`PersonDetailCard`'s "Strongest connections" is the worked example.
