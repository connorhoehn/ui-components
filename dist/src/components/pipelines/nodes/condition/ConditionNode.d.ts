import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ConditionNodeData } from '../../../../types/pipeline';
type ConditionData = ConditionNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ConditionFlowNode = Node<ConditionData, 'condition'>;
export default function ConditionNode(props: NodeProps<ConditionFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=ConditionNode.d.ts.map