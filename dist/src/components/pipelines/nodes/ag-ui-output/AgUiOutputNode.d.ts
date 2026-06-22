import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { AgUiOutputNodeData } from '../../../../types/pipeline';
type AgUiData = AgUiOutputNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type AgUiFlowNode = Node<AgUiData, 'ag-ui-output'>;
export default function AgUiOutputNode({ id, data, selected }: NodeProps<AgUiFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=AgUiOutputNode.d.ts.map