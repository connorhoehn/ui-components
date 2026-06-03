import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { AgUiOutputNodeData } from '../../../../types/pipeline';
type AgUiData = AgUiOutputNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type AgUiFlowNode = Node<AgUiData, 'ag-ui-output'>;
export default function AgUiOutputNode({ id, data, selected }: NodeProps<AgUiFlowNode>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AgUiOutputNode.d.ts.map