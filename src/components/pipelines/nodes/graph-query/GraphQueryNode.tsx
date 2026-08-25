import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { GraphQueryNodeData } from '../../../../types/pipeline';
import { useRetryFromStepIfWired, useLatestStepForNode } from '../../context/PipelineRunsContext';

type GraphData = GraphQueryNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type GraphFlowNode = Node<GraphData, 'graph-query'>;

export default function GraphQueryNode({ id, data, selected }: NodeProps<GraphFlowNode>) {
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const state: NodeExecutionState = data._state ?? liveState ?? 'idle';
  const retryFromStep = useRetryFromStepIfWired();

  const subtitle = data.graphId || 'Not configured';
  const preview = data.query.length > 40 ? `${data.query.slice(0, 37)}...` : data.query;

  return (
    <BaseNode
      icon="🕸️"
      subtitle={subtitle}
      state={state}
      category={categoryFor('graph-query')}
      body={<span className="text-[11px] font-mono">{preview}</span>}
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
