import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { MemoryNodeData } from '../../../../types/pipeline';
import { useRetryFromStepIfWired, useLatestStepForNode } from '../../context/PipelineRunsContext';

type MemData = MemoryNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type MemFlowNode = Node<MemData, 'memory'>;

export default function MemoryNode({ id, data, selected }: NodeProps<MemFlowNode>) {
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const state: NodeExecutionState = data._state ?? liveState ?? 'idle';
  const retryFromStep = useRetryFromStepIfWired();

  const subtitle = `${data.mode} ${data.scope}`;
  const body = data.namespace ? `ns: ${data.namespace}` : 'No namespace';

  return (
    <BaseNode
      icon="💾"
      subtitle={subtitle}
      state={state}
      category={categoryFor('memory')}
      body={<span className="text-[11px]">{body}</span>}
      selected={selected}
      onRetry={state === 'failed' && liveStep && retryFromStep ? () => retryFromStep(id) : undefined}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left} id="in" className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="out" className={`${portCls('data')} !top-[40%]`} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !top-[60%]`} />
    </BaseNode>
  );
}
