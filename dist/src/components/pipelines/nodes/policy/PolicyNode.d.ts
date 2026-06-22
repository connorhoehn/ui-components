import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { PolicyNodeData } from '../../../../types/pipeline';
type PolicyData = PolicyNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type PolicyFlowNode = Node<PolicyData, 'policy'>;
export default function PolicyNode({ id, data, selected }: NodeProps<PolicyFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=PolicyNode.d.ts.map