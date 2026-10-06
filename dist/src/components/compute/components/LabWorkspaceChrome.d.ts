import type { ReactNode } from 'react';
import { type DropdownMenuSection } from '../../shared/DropdownMenu';
import type { FleetSummary } from '../lib/fleetSummary';
import type { PaneKind } from '../lib/paneKinds';
import type { PaneArrangement } from '../lib/paneTree';
import type { Computer, ComputeModel, ComputeStatus } from '../types';
export interface LabHeaderProps {
    /** Leading title. `null` drops it when the host already titles the page. */
    title: ReactNode | null;
    summary: FleetSummary;
    statusFilter: ComputeStatus | null;
    onStatusFilter: (status: ComputeStatus | null) => void;
    /** Render + Computer — the viewer may provision. */
    canCreate: boolean;
    onCreate: () => void;
    onKeys: () => void;
    keysOpen: boolean;
    keysChord?: string | null;
    /** Host actions after the built-in ones. */
    actions?: ReactNode;
    /** An armed tmux leader, when one is configured. */
    leaderLabel?: string | null;
}
export declare function LabHeader({ title, summary, statusFilter, onStatusFilter, canCreate, onCreate, onKeys, keysOpen, keysChord, actions, leaderLabel, }: LabHeaderProps): import("react").JSX.Element;
export interface LabPaneToolbarProps {
    panes: {
        id: string;
        label: string;
        kind: string;
        active: boolean;
    }[];
    onFocusPane: (paneId: string) => void;
    onAddPane: () => void;
    canAddPane: boolean;
    shellsOpen: number;
    maxShells: number;
    onArrange: (arrangement: PaneArrangement) => void;
    zoomed: boolean;
    onToggleZoom: () => void;
    /** Window list and the lab's other commands, for the ⋯ menu. */
    moreSections: DropdownMenuSection[];
}
export declare function LabPaneToolbar({ panes, onFocusPane, onAddPane, canAddPane, shellsOpen, maxShells, onArrange, zoomed, onToggleZoom, moreSections, }: LabPaneToolbarProps): import("react").JSX.Element;
export interface WorkspacePaneProps {
    computer: Computer;
    kind: PaneKind;
    /** Kinds this computer can switch to, for the kind menu. */
    kinds: readonly PaneKind[];
    onSwitchKind: (kind: PaneKind) => void;
    active: boolean;
    zoomed: boolean;
    broadcasting: boolean;
    models: ComputeModel[];
    onFocus: () => void;
    onClose: () => void;
    onToggleZoom: () => void;
    moreSections: DropdownMenuSection[];
    children: ReactNode;
}
export declare function WorkspacePane({ computer, kind, kinds, onSwitchKind, active, zoomed, broadcasting, models, onFocus, onClose, onToggleZoom, moreSections, children, }: WorkspacePaneProps): import("react").JSX.Element;
//# sourceMappingURL=LabWorkspaceChrome.d.ts.map