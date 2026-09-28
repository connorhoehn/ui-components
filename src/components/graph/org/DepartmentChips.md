# DepartmentChips

Root import: `import { DepartmentChips } from '@connorhoehnslalom/ui-components'`.

A row of `FilterChip`s, one per department with anyone in `people`, each in the
department's own colour with its headcount. `onToggle(name | null, memberIds)`
— `null` when the active chip is turned off. The host decides what focusing a
department means (usually: select its members, show `DepartmentInsightStrip`).
