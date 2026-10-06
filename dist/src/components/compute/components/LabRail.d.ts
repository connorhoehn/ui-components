import type { Computer, ComputeModel } from '../types';
export interface LabRailProps {
    computers: Computer[];
    /** Computer bound to the focused pane. */
    activeComputerId: string | null;
    /** Computers currently on screen in some pane — marked as mounted. */
    openComputerIds: readonly string[];
    onSelect: (computer: Computer) => void;
    /** Open this computer in a new pane rather than retargeting the current one. */
    onOpenInPane?: (computer: Computer) => void;
    /**
     * Watch this computer read-only — offered on the activity rows only.
     *
     * Selecting an activity row retargets a pane the way selecting a computer
     * does, which lands you in a shell. That is the wrong verb for this list:
     * the boxes here are ones something ELSE is driving (a cron bot, the job
     * dispatcher, another operator), and the question is what it is doing, not
     * what you want to type at it. Watching costs no shell slot, so you can
     * keep several open.
     */
    onWatch?: (computer: Computer) => void;
    onCreate?: () => void;
    onOpenMenu?: () => void;
    /** Show every box in the activity list, not just the active ones. */
    showAllActivity: boolean;
    onToggleShowAll: () => void;
    canManage?: boolean;
    models?: ComputeModel[];
    className?: string;
}
export declare function LabRail({ computers, activeComputerId, openComputerIds, onSelect, onOpenInPane, onWatch, onCreate, onOpenMenu, showAllActivity, onToggleShowAll, canManage, models, className, }: LabRailProps): import("react").JSX.Element;
//# sourceMappingURL=LabRail.d.ts.map