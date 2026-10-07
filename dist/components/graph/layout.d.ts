import type { GraphEdge, GraphLayout, GraphNode, GraphPoint } from './types';
export interface GraphLayoutSize {
    width: number;
    height: number;
    /** Space kept clear of the edges so a node's circle and label fit. */
    padding?: number;
}
export type GraphPositions = Map<string, GraphPoint>;
/**
 * The node the radial layout puts in the middle: the one whose `group` is
 * `'center'`, else the node with the strictly highest weight, else none.
 * "Strictly" matters: a graph with no weights has no centre rather than an
 * arbitrary one.
 */
export declare function graphCenterNode(nodes: GraphNode[]): GraphNode | null;
/** Groups in first-appearance order, the centre bucket excluded; undefined groups collapse to ''. */
export declare function graphGroups(nodes: GraphNode[]): string[];
export declare function layoutGraph(nodes: GraphNode[], edges: GraphEdge[], layout: GraphLayout, size: GraphLayoutSize): GraphPositions;
//# sourceMappingURL=layout.d.ts.map