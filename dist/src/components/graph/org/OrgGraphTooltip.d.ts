import type { GraphNode, GraphDepartment } from './types';
export interface OrgGraphTooltipProps {
    node: GraphNode;
    departments: GraphDepartment[];
    /** Node position in container pixels (after pan/zoom). */
    x: number;
    y: number;
    containerWidth: number;
    /** Influence is leadership analytics — shown only when the host says so. */
    showInfluence: boolean;
}
export declare function OrgGraphTooltip({ node, departments, x, y, containerWidth, showInfluence }: OrgGraphTooltipProps): import("react").JSX.Element;
//# sourceMappingURL=OrgGraphTooltip.d.ts.map