// Org graph (2.400.0) — ported from the aws-agentcore portal's
// `components/org-graph`: the force-directed people graph, its legend, and
// the Explore panels (search box, department chips + insight strip,
// connection path, person card) with the pure helpers behind them.
//
// NOTE: the graph barrel re-exports `GraphPerson` from here as
// `OrgGraphPerson`, because `PeopleGraph` already owns `GraphPerson` there.
export { OrgGraph } from './OrgGraph';
export type { OrgGraphProps } from './OrgGraph';
export { focusOrgGraph } from './focusOrgGraph';
export type { FocusOrgGraphOptions, FocusedOrgGraph } from './focusOrgGraph';
export { OrgGraphLegend } from './OrgGraphLegend';
export type { OrgGraphLegendProps } from './OrgGraphLegend';
export { useForceLayout, forceParamsFor } from './useForceLayout';
export type { LayoutMode, UseForceLayoutProps, UseForceLayoutReturn, OrgForceParams } from './useForceLayout';
export { fitTransform } from './fitTransform';
export type { FitBounds, ViewTransform } from './fitTransform';
export type { GraphPerson, GraphRelationship, GraphDepartment, PresenceStatus } from './types';
export { PRESENCE_DOT, RELATIONSHIP_STYLES, passesPresenceFilter } from './presence';
export type { PresenceFilter } from './presence';

export { GraphSearchBox } from './GraphSearchBox';
export type { GraphSearchBoxProps } from './GraphSearchBox';
export { PersonDetailCard } from './PersonDetailCard';
export type { PersonDetailCardProps, PersonDetail, PersonConnection, PersonEvidenceDocument } from './PersonDetailCard';
export { ConnectionPathStrip } from './ConnectionPathStrip';
export type { ConnectionPathStripProps } from './ConnectionPathStrip';
export { DepartmentChips } from './DepartmentChips';
export type { DepartmentChipsProps } from './DepartmentChips';
export { DepartmentInsightStrip } from './DepartmentInsightStrip';
export type { DepartmentInsightStripProps } from './DepartmentInsightStrip';

export { findConnectionPath, PATH_TYPE_LABELS } from './connectionPath';
export type { PathHop } from './connectionPath';
export {
  CONNECTION_TYPE_LABELS,
  RARE_THRESHOLD,
  RARE_SKILL_SWEEP,
  RARE_SKILL_FINDINGS_PATH,
  searchGraph,
  membersByDepartment,
  departmentInsight,
  orgInsight,
  firstName,
  parseFocusIds,
  rareSkillFindingsUrl,
  indexBusFactorFindings,
  findingForSkill,
  nodeRadius,
  degreeMap,
  maxDegree,
} from './graphInsights';
export type { SkillMatch, GraphSearchResult, AtRiskSkill, DepartmentInsight, FindingLike } from './graphInsights';
