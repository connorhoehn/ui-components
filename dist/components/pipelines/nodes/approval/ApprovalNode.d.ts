import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ApprovalNodeData } from '../../../../types/pipeline';
type ApprovalData = ApprovalNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ApprovalFlowNode = Node<ApprovalData, 'approval'>;
export default function ApprovalNode(props: NodeProps<ApprovalFlowNode>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ApprovalNode.d.ts.map