import type { GraphNode } from './types';
export interface OrgGraphEdgeProps {
    source: GraphNode;
    target: GraphNode;
    type: string;
    strength: number;
    isHighlighted: boolean;
    /** Radius of the target circle, so an arrowhead lands on its edge. */
    targetRadius?: number;
    /** Id of the `<marker>` the owning graph defined for `reports_to`. */
    arrowMarkerId: string;
}
export declare function OrgGraphEdge({ source, target, type, strength, isHighlighted, targetRadius, arrowMarkerId }: OrgGraphEdgeProps): import("react").JSX.Element;
//# sourceMappingURL=OrgGraphEdge.d.ts.map