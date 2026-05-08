import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
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
      body={<span style={{ fontSize: 11 }}>{data.principal} → {data.resource}</span>}
      selected={selected}
      onRetry={state === 'failed' && liveStep ? () => retryFromStep(id) : undefined}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left} id="in" />
      <Handle type="source" position={Position.Right} id="allow" style={{ top: '40%', background: '#16a34a' }} />
      <Handle type="source" position={Position.Right} id="deny" style={{ top: '60%', background: '#dc2626' }} />
    </BaseNode>
  );
}
