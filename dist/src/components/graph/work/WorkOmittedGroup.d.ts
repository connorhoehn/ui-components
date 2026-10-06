import type { WorkActivityOmitted } from './types';
export interface WorkOmittedGroupProps {
    omitted: WorkActivityOmitted;
    /** The graph's timezone, for the item times. */
    timezone?: string;
    className?: string;
}
/**
 * The work a capped snapshot held back (realtime-examples NFR #221): collapsed
 * it is one card, "N more earlier"; expanded it lists what the host has paged
 * in so far, newest first, with a control for the next page. The host owns the
 * fetch — this renders the count, the items and the paging state it is given.
 */
export declare function WorkOmittedGroup({ omitted, timezone, className }: WorkOmittedGroupProps): import("react").JSX.Element;
//# sourceMappingURL=WorkOmittedGroup.d.ts.map