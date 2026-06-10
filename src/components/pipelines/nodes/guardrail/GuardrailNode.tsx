import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { GuardrailNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

type GuardrailData = GuardrailNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type GuardrailFlowNode = Node<GuardrailData, 'guardrail'>;

export default function GuardrailNode({ id, data, selected }: NodeProps<GuardrailFlowNode>) {
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const state: NodeExecutionState = data._state ?? liveState ?? 'idle';
  const retryFromStep = useRetryFromStep();

  const subtitle = data.label || data.guardrailId || 'Not configured';

  return (
    <BaseNode
      icon="🛡️"
      subtitle={subtitle}
      state={state}
      category={categoryFor('guardrail')}
      body={<span className="text-[11px]">Action: {data.action}</span>}
      selected={selected}
      onRetry={state === 'failed' && liveStep ? () => retryFromStep(id) : undefined}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left} id="in" className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="pass" className={`${portCls('control')} !top-[40%]`} />
      <Handle type="source" position={Position.Right} id="block" className={`${portCls('control')} !top-[60%]`} />
    </BaseNode>
  );
}
