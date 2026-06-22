import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { GuardrailNodeData } from '../../../../types/pipeline';
type GuardrailData = GuardrailNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type GuardrailFlowNode = Node<GuardrailData, 'guardrail'>;
export default function GuardrailNode({ id, data, selected }: NodeProps<GuardrailFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=GuardrailNode.d.ts.map