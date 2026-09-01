export type SplitDirection = 'row' | 'column';
export interface PaneLeaf {
    kind: 'leaf';
    id: string;
    /** The computer this pane is bound to. */
    computerId: string;
    /**
     * Which registered pane kind renders this pane.
     *
     * A string, not a union: kinds come from a registry the host controls (see
     * `paneKinds.ts`), so the set is open. It is persisted in the saved layout,
     * and `resolveKind` handles an id the current registry no longer knows.
     */
    kindId: string;
}
export interface PaneSplit {
    kind: 'split';
    id: string;
    /** `row` puts children side by side; `column` stacks them. */
    direction: SplitDirection;
    /** Fraction of the axis taken by `a`. Clamped to [0.1, 0.9]. */
    ratio: number;
    a: PaneNode;
    b: PaneNode;
}
export type PaneNode = PaneLeaf | PaneSplit;
/** Panes below this get unreadable; splitting further is refused. */
export declare const MIN_RATIO = 0.1;
export declare const MAX_RATIO = 0.9;
export declare function makeLeaf(id: string, computerId: string, kindId: string): PaneLeaf;
export declare function listLeaves(node: PaneNode): PaneLeaf[];
export declare function findLeaf(node: PaneNode, paneId: string): PaneLeaf | null;
export declare function countPanes(node: PaneNode): number;
/** Replace one leaf with a split holding it and a new sibling. */
export declare function splitPane(root: PaneNode, paneId: string, direction: SplitDirection, newPane: PaneLeaf, splitId: string): PaneNode;
/**
 * Remove a pane; its sibling takes the split's place.
 *
 * Returns the root unchanged when `paneId` is the only pane — a window with
 * no panes has nothing to render and no way back, so the last one is not
 * closeable. The caller closes the window instead.
 */
export declare function closePane(root: PaneNode, paneId: string): PaneNode;
export declare function setRatio(root: PaneNode, splitId: string, ratio: number): PaneNode;
export declare function updateLeaf(root: PaneNode, paneId: string, patch: Partial<Omit<PaneLeaf, 'kind' | 'id'>>): PaneNode;
export interface PaneRect {
    id: string;
    /** All in 0–1 of the window, so the caller picks the pixel units. */
    x: number;
    y: number;
    width: number;
    height: number;
}
/** Flatten the tree into leaf rectangles in unit space. */
export declare function layoutRects(node: PaneNode, frame?: {
    x: number;
    y: number;
    width: number;
    height: number;
}): PaneRect[];
export type Direction = 'left' | 'right' | 'up' | 'down';
/**
 * The pane in a given direction, tmux's `select-pane -L/-R/-U/-D`.
 *
 * Candidates are panes that actually lie that way *and* overlap on the other
 * axis — without the overlap test, pressing "right" from a tall left-hand
 * pane could land in a pane sitting well above or below it, which feels like
 * the focus teleported. Among the survivors, the nearest edge wins.
 */
export declare function neighborPane(root: PaneNode, paneId: string, direction: Direction): string | null;
/** Next / previous pane in layout order — the `⌃a o` cycle. */
export declare function cyclePane(root: PaneNode, paneId: string, delta: number): string | null;
/** The split whose child contains `paneId` along `axis` — the one a resize moves. */
export declare function enclosingSplit(root: PaneNode, paneId: string, axis: SplitDirection): {
    splitId: string;
    onA: boolean;
} | null;
export declare function ratioOf(root: PaneNode, splitId: string): number | null;
//# sourceMappingURL=paneTree.d.ts.map