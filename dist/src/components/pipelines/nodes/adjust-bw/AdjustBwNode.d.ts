import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageAdjustBwNodeData } from '../../../../types/pipeline';
type AdjustBwData = ImageAdjustBwNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type AdjustBwFlowNode = Node<AdjustBwData, 'image:adjust-bw'>;
export default function AdjustBwNode(props: NodeProps<AdjustBwFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=AdjustBwNode.d.ts.map