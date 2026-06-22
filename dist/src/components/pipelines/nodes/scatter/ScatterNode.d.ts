import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ScatterNodeData } from '../../../../types/pipeline';
type ScatterData = ScatterNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ScatterFlowNode = Node<ScatterData, 'scatter'>;
export default function ScatterNode(props: NodeProps<ScatterFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=ScatterNode.d.ts.map