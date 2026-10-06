import { type ProjectRollup } from '../hooks/useComputeProjects';
import type { Computer, ComputeStatus } from '../types';
export type LabFleetTab = 'computers' | 'agents';
export interface LabFleetRailProps {
    computers: Computer[];
    /** Computer bound to the focused pane. */
    activeComputerId: string | null;
    /** Computers on screen in some pane. */
    openComputerIds: readonly string[];
    /** Computers picked as instruction targets (⌘/Ctrl-click a row). */
    selectedIds?: ReadonlySet<string>;
    /** Plain click retargets the focused pane; `toggle` is a ⌘/Ctrl-click. */
    onSelect: (computer: Computer, options: {
        toggle: boolean;
    }) => void;
    /** Open in a new pane (the row's detail action, middle-click, ⌘⏎). */
    onOpenInPane?: (computer: Computer) => void;
    /** Show only computers in this status — the top bar's pills set it. */
    statusFilter?: ComputeStatus | null;
    onStatusFilterChange?: (status: ComputeStatus | null) => void;
    tab?: LabFleetTab;
    onTabChange?: (tab: LabFleetTab) => void;
    /** Start a computer. Offered in the empty-fleet state when present. */
    onCreate?: () => void;
    className?: string;
}
/**
 * "6 computers · $0.46 / $95 · 5 bots" — every clause only when known. A
 * project with no allocation shows its spend alone, and a bucket with no bots
 * says nothing about bots rather than "0 bots".
 */
export declare function groupQuickLine(project: Pick<ProjectRollup, 'budgetUsd' | 'spentUsd' | 'liveSpendUsd' | 'botCount'>, count: number): string;
export declare function LabFleetRail({ computers, activeComputerId, openComputerIds, selectedIds, onSelect, onOpenInPane, statusFilter, onStatusFilterChange, tab: controlledTab, onTabChange, onCreate, className, }: LabFleetRailProps): import("react").JSX.Element;
//# sourceMappingURL=LabFleetRail.d.ts.map