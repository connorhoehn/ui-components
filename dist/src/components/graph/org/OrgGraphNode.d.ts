import type { GraphNode, GraphDepartment } from './types';
import { type PresenceFilter } from './presence';
export interface OrgGraphNodeProps {
    node: GraphNode;
    departments: GraphDepartment[];
    isSelected: boolean;
    isHighlighted: boolean;
    onSelect: (id: string) => void;
    onHover: (id: string | null) => void;
    /** When set, dim nodes that don't match the given presence filter. */
    presenceFilter?: PresenceFilter | null;
    /** Size by influence (true) or by connection count (false) — so a bigger
     *  circle can't leak a number the viewer is not allowed to see. */
    showInfluence: boolean;
    /** This node's degree in the currently-rendered graph. */
    degree: number;
    /** Largest degree in the currently-rendered graph. */
    maxDegree: number;
    /** Draw the first-name label. OrgGraph turns it off for dimmed people in a
     *  large graph, where forty faded names are noise. Default true. */
    showLabel?: boolean;
}
export declare function OrgGraphNode({ node, departments, isSelected, isHighlighted, onSelect, onHover, presenceFilter, showInfluence, degree, maxDegree, showLabel, }: OrgGraphNodeProps): import("react").JSX.Element;
//# sourceMappingURL=OrgGraphNode.d.ts.map