import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ScatterNodeData } from '../../../../types/pipeline';
type ScatterData = ScatterNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ScatterFlowNode = Node<ScatterData, 'scatter'>;
export default function ScatterNode(props: NodeProps<ScatterFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=ScatterNode.d.ts.map