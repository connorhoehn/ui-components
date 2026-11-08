# DepartmentInsightStrip

Root import: `import { DepartmentInsightStrip } from '@connorhoehn/ui-components'`.

A tinted band above the graph for one `department` (headcount, top skills,
rare skills) or, with `department={null}`, the org-wide rare-skills list. A
skill is rare when `RARE_THRESHOLD` (2) or fewer people hold it org-wide.
Each rare skill is a button that calls `onFocusPerson(holderId)`, followed by a
"finding →" link when the host's bus-factor sweep filed one:

- `busFactorFindings`: the map from `indexBusFactorFindings(findings)`, or
  `null` while unread (the link then shows unconditionally).
- `busFactorFindingsUnavailable`: the read failed — adds a note.
- `findingHref(skill, findingId?)`: link target; default `rareSkillFindingsUrl`.
- `onNavigate(href, event)`: routes plain clicks; modified clicks stay native.
