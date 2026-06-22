import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ApprovalNodeData } from '../../../../types/pipeline';
type ApprovalData = ApprovalNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ApprovalFlowNode = Node<ApprovalData, 'approval'>;
export default function ApprovalNode(props: NodeProps<ApprovalFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=ApprovalNode.d.ts.map