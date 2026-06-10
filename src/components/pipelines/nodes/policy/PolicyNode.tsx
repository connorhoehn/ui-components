import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { PolicyNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

type PolicyData = PolicyNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type PolicyFlowNode = Node<PolicyData, 'policy'>;

export default function PolicyNode({ id, data, selected }: NodeProps<PolicyFlowNode>) {
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const state: NodeExecutionState = data._state ?? liveState ?? 'idle';
  const retryFromStep = useRetryFromStep();

  const subtitle = data.label || data.action || 'Not configured';

  return (
    <BaseNode
      icon="📜"
      subtitle={subtitle}
      state={state}
      category={categoryFor('policy')}
      body={<span className="text-[11px]">{data.principal} → {data.resource}</span>}
      selected={selected}
      onRetry={state === 'failed' && liveStep ? () => retryFromStep(id) : undefined}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left} id="in" className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="allow" className={`${portCls('control')} !top-[40%]`} />
      <Handle type="source" position={Position.Right} id="deny" className={`${portCls('control')} !top-[60%]`} />
    </BaseNode>
  );
}
