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
    /**
     * Space between panes. `tight` (default) is the classic multiplexer's 4px
     * rule; `roomy` is 8px, for panes that are cards with their own borders.
     */
    gutter?: 'tight' | 'roomy';
    className?: string;
}
export declare function PaneTreeView({ node, activePaneId, zoomedPaneId, renderLeaf, onRatioChange, gutter, className, }: PaneTreeViewProps): import("react").JSX.Element;
//# sourceMappingURL=PaneTreeView.d.ts.map