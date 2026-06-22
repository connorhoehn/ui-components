import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { TriggerNodeData } from '../../../../types/pipeline';
type TriggerData = TriggerNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type TriggerFlowNode = Node<TriggerData, 'trigger'>;
export default function TriggerNode(props: NodeProps<TriggerFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=TriggerNode.d.ts.map