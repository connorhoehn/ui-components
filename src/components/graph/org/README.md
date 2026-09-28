# graph/org — the org graph

Ported from the aws-agentcore portal's `components/org-graph` in 2.400.0 so
the portal's People panel and Explore page consume it instead of carrying it.
Everything is exported from the root barrel and `/graph`.

| Export | What it is |
|---|---|
| `OrgGraph` | Force-directed (d3-force, animated) or radial people graph: department-coloured nodes, relationship line styles, legend, hover card, pan/zoom, single/multi-select, spotlight. [OrgGraph.md](./OrgGraph.md) |
| `OrgGraphLegend` | The departments + relationships (+ presence) key; OrgGraph draws it. |
| `GraphSearchBox` | Combobox to jump to a person or skill. [GraphSearchBox.md](./GraphSearchBox.md) |
| `DepartmentChips` | Counted, coloured department filter chips. [DepartmentChips.md](./DepartmentChips.md) |
| `DepartmentInsightStrip` | Headcount, top skills and bus-factor risk for a department, or org-wide. [DepartmentInsightStrip.md](./DepartmentInsightStrip.md) |
| `ConnectionPathStrip` | "How are these two connected?" band. [ConnectionPathStrip.md](./ConnectionPathStrip.md) |
| `PersonDetailCard` | A person's role, skills, strongest connections, evidence. [PersonDetailCard.md](./PersonDetailCard.md) |
| `useForceLayout` | The layout hook OrgGraph uses. |
| `forceParamsFor`, `fitTransform` | The layout's forces for a drawn count and canvas, and the pan/zoom that frames a box (2.403.1). |
| pure helpers | `findConnectionPath`, `searchGraph`, `departmentInsight`, `orgInsight`, `indexBusFactorFindings`, `findingForSkill`, `rareSkillFindingsUrl`, `nodeRadius`, `degreeMap`, `maxDegree`, `membersByDepartment`, `parseFocusIds`, `firstName` and the label maps. |

## What changed from the portal

- **Types.** `GraphPerson` collides with `PeopleGraph`'s in the graph barrel,
  so from the root and `/graph` it is `OrgGraphPerson`. `GraphRelationship`,
  `GraphDepartment`, `PresenceStatus` and `LayoutMode` keep their names.
- **No app state inside.** `OrgGraphTooltip` and `PersonDetailCard` read the
  session role to decide whether to show influence; both now take
  `showInfluence` (OrgGraph forwards its own). `PersonDetailCard` no longer
  fetches: pass `person`, `evidence`, `loading`, `error` (and optionally
  `formatTime`). `DepartmentInsightStrip`'s "finding →" is a library `Link`;
  pass `onNavigate` for client-side routing and `findingHref` to change the
  target (default `rareSkillFindingsUrl`, which gained an optional `basePath`).
- **Zoom.** OrgGraph's +/−/⟲ buttons are `CanvasZoomControls` (−, %, +, Fit —
  since 2.403.1 Fit frames the drawn nodes rather than resetting to 1:1). The `reports_to` arrow marker id is per instance.
- **Tokens.** Presence dots and relationship lines paint from theme tokens;
  department colours stay data.
- `SuggestionRow` / `MeterRow` graduated to `shared/` as list-row primitives.

Layout for the typed *record* graph lives beside it in
`../recordGraphLayout.ts` (`RecordGraph`).
