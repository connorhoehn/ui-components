import type { EdgeProps } from '@xyflow/react';
export type EdgeState = 'default' | 'active' | 'traversed-success' | 'traversed-failure';
export type EdgePayload = 'image' | 'text' | 'data' | 'control';
export interface AnimatedEdgeData {
    state?: EdgeState;
    label?: string;
    /** Payload type carried over this edge. 'text'/'data'/unset → no change. */
    payload?: EdgePayload;
    /** Fan-out multiplicity; >= 2 scales width and shows a ×N midpoint pill. */
    volume?: number;
}
export default function AnimatedEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEnd, selected, }: EdgeProps): import("react").JSX.Element;
//# sourceMappingURL=AnimatedEdge.d.ts.map