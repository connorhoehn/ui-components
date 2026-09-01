import { type ReactNode } from 'react';
import { type PaneLeaf, type PaneNode } from '../lib/paneTree';
export interface PaneTreeViewProps {
    node: PaneNode;
    activePaneId: string | null;
    /**
     * When set, only this pane renders — tmux's `resize-pane -Z`. The rest of
     * the tree stays mounted-in-state but unrendered, so unzooming restores the
     * exact layout rather than rebuilding a guess at it.
     */
    zoomedPaneId?: string | null;
    renderLeaf: (leaf: PaneLeaf) => ReactNode;
    onRatioChange: (splitId: string, ratio: number) => void;
    className?: string;
}
export declare function PaneTreeView({ node, activePaneId, zoomedPaneId, renderLeaf, onRatioChange, className, }: PaneTreeViewProps): import("react").JSX.Element;
//# sourceMappingURL=PaneTreeView.d.ts.map