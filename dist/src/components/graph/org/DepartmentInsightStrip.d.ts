import { type MouseEvent } from 'react';
import { type FindingLike } from './graphInsights';
import type { GraphPerson } from './types';
export interface DepartmentInsightStripProps {
    /** null renders the org-wide rare-skills view instead of one department. */
    department: string | null;
    people: GraphPerson[];
    /** Click an at-risk holder → focus them (select + detail). */
    onFocusPerson: (id: string) => void;
    /**
     * skill name → the host's open bus-factor finding for it, built by
     * `indexBusFactorFindings`. `null` means the read has not resolved (loading
     * or failed) — the strip then shows the unconditional "finding →" link
     * rather than asserting "not on the sweep yet" for something unchecked.
     */
    busFactorFindings: Map<string, FindingLike> | null;
    /** True only when the findings read genuinely failed (not while loading). */
    busFactorFindingsUnavailable?: boolean;
    /** Where "finding →" points. Default `rareSkillFindingsUrl(skill, findingId)`. */
    findingHref?: (skill: string, findingId?: string | null) => string;
    /** Route a plain click on "finding →" (modified clicks stay native). */
    onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
}
export declare function DepartmentInsightStrip({ department, people, onFocusPerson, busFactorFindings, busFactorFindingsUnavailable, findingHref, onNavigate, }: DepartmentInsightStripProps): import("react").JSX.Element;
//# sourceMappingURL=DepartmentInsightStrip.d.ts.map