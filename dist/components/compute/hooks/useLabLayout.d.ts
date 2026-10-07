import { listLeaves, type Direction, type PaneArrangement, type PaneNode, type SplitDirection } from '../lib/paneTree';
export interface LabWindow {
    id: string;
    /** Display name. Defaults to the window's index. */
    name?: string;
    root: PaneNode;
}
export interface UseLabLayoutResult {
    windows: LabWindow[];
    activeWindow: LabWindow | null;
    activePaneId: string | null;
    zoomedPaneId: string | null;
    /** Panes in the active window, in layout order. */
    panes: ReturnType<typeof listLeaves>;
    /** Every computer bound to a pane in the active window. */
    openComputerIds: string[];
    focusPane: (paneId: string) => void;
    split: (direction: SplitDirection, computerId: string, kindId: string) => void;
    closeActivePane: () => void;
    setPaneComputer: (paneId: string, computerId: string) => void;
    setPaneKind: (paneId: string, kindId: string) => void;
    resize: (splitId: string, ratio: number) => void;
    move: (direction: Direction) => void;
    cycle: (delta: number) => void;
    toggleZoom: () => void;
    /** Re-flow the active window's panes — see `arrangePanes`. Drops zoom. */
    arrange: (arrangement: PaneArrangement) => void;
    newWindow: (computerId: string, kindId: string) => void;
    closeWindow: (windowId: string) => void;
    selectWindow: (windowId: string) => void;
    stepWindow: (delta: number) => void;
    /** Seed the first window when the lab opens with nothing in it. */
    ensureSeeded: (computerId: string | null, kindId: string) => void;
    /** Drop panes bound to computers that no longer exist. */
    reconcile: (liveComputerIds: readonly string[]) => void;
}
export declare function useLabLayout(): UseLabLayoutResult;
//# sourceMappingURL=useLabLayout.d.ts.map