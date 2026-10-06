import type { GraphEdge, GraphLayout, GraphNode } from './types';
export interface NodeGraphProps {
    nodes: GraphNode[];
    edges: GraphEdge[];
    layout?: GraphLayout;
    selectedId?: string | null;
    onSelect?: (node: GraphNode) => void;
    /** Pixel height of the drawing; the width follows the container. */
    height?: number;
    className?: string;
    'data-testid'?: string;
}
/** The logical drawing width; the SVG scales it to whatever width it is given. */
export declare const NODE_GRAPH_VIEW_WIDTH = 480;
/** The token classes for a group, by its legend position. Exported so PeopleGraph's list can match the graph. */
export declare function graphGroupPalette(group: string | undefined, groups: string[]): {
    fill: string;
    bg: string;
};
export declare function NodeGraph({ nodes, edges, layout, selectedId, onSelect, height, className, 'data-testid': testId, }: NodeGraphProps): import("react").JSX.Element;
export default NodeGraph;
//# sourceMappingURL=NodeGraph.d.ts.map