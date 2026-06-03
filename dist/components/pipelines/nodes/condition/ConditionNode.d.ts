import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ConditionNodeData } from '../../../../types/pipeline';
type ConditionData = ConditionNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ConditionFlowNode = Node<ConditionData, 'condition'>;
export default function ConditionNode(props: NodeProps<ConditionFlowNode>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ConditionNode.d.ts.map