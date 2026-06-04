import type { EdgeProps } from '@xyflow/react';
export type EdgeState = 'default' | 'active' | 'traversed-success' | 'traversed-failure';
export interface AnimatedEdgeData {
    state?: EdgeState;
    label?: string;
}
export default function AnimatedEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEnd, selected, }: EdgeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AnimatedEdge.d.ts.map