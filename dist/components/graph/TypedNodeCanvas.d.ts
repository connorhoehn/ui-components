import { type Viewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type ReactNode } from 'react';
import { type Tone } from '../shared/tones';
export interface TypedCanvasNode<K extends string = string, D = unknown> {
    id: string;
    /** What the node is — `tier`, `library`, `note`, `cluster`… The host's `renderNode` switches on it. */
    kind: K;
    data: D;
    /** Column in the `ltr` layout. Absent: derived from the edges (longest path from a root). */
    rank?: number;
    /** Explicit position. Required-ish for `manual`; in `ltr` it overrides the computed spot. */
    x?: number;
    y?: number;
    /** Accessible name, and the list view's text when there is no `renderListItem`. Default: `id`. */
    label?: string;
}
/** A job marker on an edge — a dot on the line the reader can select. */
export interface TypedCanvasEdgeMarker {
    /** Accessible name — "Compaction L0 → L1, running". */
    label: string;
    tone?: Tone;
}
export interface TypedCanvasEdge {
    id: string;
    from: string;
    to: string;
    /** Short word over the line — "Compact", "Publish". */
    label?: string;
    /** A quiet line under it — "13 notes → 4 patterns · 3h ago". */
    detail?: ReactNode;
    /** Line colour. Default: the brand colour. */
    tone?: Tone;
    /** A dot rides the line. Only for work CONFIRMED running; never under reduced motion. */
    animated?: boolean;
    marker?: TypedCanvasEdgeMarker | null;
}
export interface TypedNodeCanvasProps<N extends TypedCanvasNode = TypedCanvasNode> {
    nodes: N[];
    edges: TypedCanvasEdge[];
    renderNode: (node: N, state: {
        selected: boolean;
    }) => ReactNode;
    /** `ltr` (default): rank columns left to right. `manual`: every node at its own `x`/`y`. */
    layout?: 'ltr' | 'manual';
    onSelectNode?: (id: string) => void;
    /** Called from an edge's marker or its line. */
    onSelectEdge?: (id: string) => void;
    /** The selected node OR edge id. */
    selectedId?: string | null;
    /** Draw the list equivalent instead of the canvas. */
    listFallback?: boolean;
    /** The list view's row body. Default: the node's `label` and `kind`. */
    renderListItem?: (node: N) => ReactNode;
    /** Layout box for a node, px. Defaults 224 × 168. */
    nodeWidth?: number;
    nodeHeight?: number;
    /** Space between rank columns, px. Default 144 (room for an edge label). */
    columnGap?: number;
    /** Space between nodes in one column, px. Default 32. */
    rowGap?: number;
    /** Draw `CanvasZoomControls` in the bottom-left corner. Default `true`. */
    controls?: boolean;
    /** A quiet line in the bottom band beside the controls — the legend in words. */
    caption?: ReactNode;
    minZoom?: number;
    maxZoom?: number;
    onViewportChange?: (viewport: Viewport) => void;
    /** Shown when `nodes` is empty. */
    emptyLabel?: string;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}
/** Longest-path rank from the roots; cycles fall back to column 0. Exported for tests. */
export declare function rankTypedNodes(nodes: Pick<TypedCanvasNode, 'id' | 'rank'>[], edges: Pick<TypedCanvasEdge, 'from' | 'to'>[]): Map<string, number>;
/** Node positions for a layout. Exported for tests and hosts that draw their own minimap. */
export declare function layoutTypedNodes(nodes: TypedCanvasNode[], edges: Pick<TypedCanvasEdge, 'from' | 'to'>[], options?: {
    layout?: 'ltr' | 'manual';
    nodeWidth?: number;
    nodeHeight?: number;
    columnGap?: number;
    rowGap?: number;
}): Map<string, {
    x: number;
    y: number;
}>;
export declare function TypedNodeCanvas<N extends TypedCanvasNode = TypedCanvasNode>({ nodes, edges, renderNode, layout, onSelectNode, onSelectEdge, selectedId, listFallback, renderListItem, nodeWidth, nodeHeight, columnGap, rowGap, controls, caption, minZoom, maxZoom, onViewportChange, emptyLabel, className, 'aria-label': ariaLabel, 'data-testid': testId, }: TypedNodeCanvasProps<N>): import("react").JSX.Element;
export default TypedNodeCanvas;
//# sourceMappingURL=TypedNodeCanvas.d.ts.map