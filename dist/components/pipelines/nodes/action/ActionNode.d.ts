import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ActionNodeData } from '../../../../types/pipeline';
type ActionData = ActionNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ActionFlowNode = Node<ActionData, 'action'>;
export default function ActionNode(props: NodeProps<ActionFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=ActionNode.d.ts.map