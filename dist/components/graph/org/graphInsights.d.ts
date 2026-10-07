import type { GraphPerson } from './types';
export declare const CONNECTION_TYPE_LABELS: Record<string, string>;
/** A skill held org-wide by this many people or fewer is a bus-factor risk. */
export declare const RARE_THRESHOLD = 2;
export interface SkillMatch {
    skill: string;
    personIds: string[];
}
export interface GraphSearchResult {
    personMatches: GraphPerson[];
    skillMatches: SkillMatch[];
}
/** Name/title/department matches first, then skills ordered by how many people
 *  hold them — a skill five people share is a more useful jump than one only
 *  one person has. */
export declare function searchGraph(people: GraphPerson[], query: string): GraphSearchResult;
/** department name → the ids of everyone in it. */
export declare function membersByDepartment(people: GraphPerson[]): Map<string, string[]>;
export interface AtRiskSkill {
    skill: string;
    /** A holder who sits in the department being inspected. */
    holder: GraphPerson;
    /** How many people hold it ORG-WIDE, not just in this department. */
    holderCount: number;
}
export interface DepartmentInsight {
    members: GraphPerson[];
    /** [skill, headcount within the department], most common first. */
    topSkills: [string, number][];
    atRisk: AtRiskSkill[];
}
/** Headcount, the department's most common skills, and the skills it depends
 *  on that almost nobody in the org holds. */
export declare function departmentInsight(people: GraphPerson[], department: string): DepartmentInsight;
export declare function firstName(full: string): string;
/** Parse a `?focus=` query param into individual ids. Accepts a single id
 *  (related-people cards on /search) or a comma-joined list ("Open in Ask →"
 *  / "Show all N in Explore" round-trip) alike; trims whitespace and drops
 *  empties so a trailing comma or stray space never adds a blank selection. */
export declare function parseFocusIds(focus: string | null): string[];
/** Same bus-factor rule as `departmentInsight`'s `atRisk`, but with no
 *  department to pick "the" holder from — every holder of a rare skill gets
 *  its own entry (same `AtRiskSkill` shape, so callers that already render
 *  `atRisk` need no branching), sorted rarest-first. */
export declare function orgInsight(people: GraphPerson[]): {
    atRisk: AtRiskSkill[];
};
/** Sweep id the org-sweep scheduler files bus-factor findings under
 *  (`schema`/work findings — see `findingsFilter.ts`'s `SWEEP_TITLES`). */
export declare const RARE_SKILL_SWEEP = "bus_factor";
/** The findings route the portal serves. A default, not a contract: pass your
 *  own `basePath` (or give `DepartmentInsightStrip` a `findingHref`). */
export declare const RARE_SKILL_FINDINGS_PATH = "/iq/work/findings";
/** Where the rare-skill pill sends you: a findings view filtered to the
 *  bus-factor sweep and this skill, or (once we know a specific finding exists
 *  for it) straight to that finding. The target reads `?sweep=`/`?q=`/`?finding=`. */
export declare function rareSkillFindingsUrl(skill: string, findingId?: string | null, basePath?: string): string;
export interface FindingLike {
    id: string;
    sweep: string;
    status: string;
    entityType: string | null;
    title: string;
}
/** skill name (lowercased) → the bus-factor finding for it. Later findings
 *  for a name already seen are ignored — `sweepBusFactor` upserts by
 *  fingerprint, so the caller's list should carry at most one open finding
 *  per skill; if it ever carries more, the first (most-recently-fetched
 *  order) wins over silently picking one at random on every render. */
export declare function indexBusFactorFindings(findings: FindingLike[]): Map<string, FindingLike>;
/** Look up the server's bus-factor finding for a skill name, case-insensitive. */
export declare function findingForSkill(index: Map<string, FindingLike>, skill: string): FindingLike | null;
/**
 * `showInfluence` true → size by `influenceScore` (0..1), the original rule.
 * `showInfluence` false → size by `degree` relative to `maxDegree` in the
 * currently-rendered graph (0 when there are no edges at all, so an edgeless
 * graph draws every node at the minimum radius rather than one arbitrary node
 * reading as "biggest").
 */
export declare function nodeRadius(showInfluence: boolean, influenceScore: number, degree: number, maxDegree: number): number;
/** id → degree (count of links touching that id), from a flat list of
 *  {source, target} pairs. Self-loops (shouldn't occur in this graph) count
 *  once, not twice. */
export declare function degreeMap(links: Array<{
    source: string;
    target: string;
}>): Map<string, number>;
/** Largest value in a degree map, or 0 for an empty graph. */
export declare function maxDegree(map: Map<string, number>): number;
//# sourceMappingURL=graphInsights.d.ts.map