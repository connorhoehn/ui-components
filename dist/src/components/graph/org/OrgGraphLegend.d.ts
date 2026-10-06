import type { GraphDepartment } from './types';
import { type PresenceFilter } from './presence';
export interface OrgGraphLegendProps {
    departments: GraphDepartment[];
    /** The department the graph is filtered to, or null. */
    filter: string | null;
    onFilter: (dept: string | null) => void;
    /** Shows the presence key while a presence filter is active. */
    presenceFilter?: PresenceFilter | null;
    /** Keep the legend fully open instead of showing its first rows at rest. */
    pinned?: boolean;
    className?: string;
    'data-testid'?: string;
}
/**
 * Screen px the legend takes from the canvas's left edge: its 12px offset,
 * its fixed 176px (`w-44`) panel and a 12px gap. `OrgGraph` keeps its
 * drawing clear of this while the legend is on. Since 2.403.2.
 */
export declare const ORG_LEGEND_INSET = 200;
export declare function OrgGraphLegend({ departments, filter, onFilter, presenceFilter, pinned, className, 'data-testid': testId, }: OrgGraphLegendProps): import("react").JSX.Element;
//# sourceMappingURL=OrgGraphLegend.d.ts.map