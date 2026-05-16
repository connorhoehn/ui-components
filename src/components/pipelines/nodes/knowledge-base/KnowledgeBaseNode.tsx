import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { KnowledgeBaseNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

type KBData = KnowledgeBaseNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type KBFlowNode = Node<KBData, 'knowledge-base'>;

export default function KnowledgeBaseNode({ id, data, selected }: NodeProps<KBFlowNode>) {
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const state: NodeExecutionState = data._state ?? liveState ?? 'idle';
  const retryFromStep = useRetryFromStep();

  const subtitle = data.knowledgeBaseId || 'Not configured';
  const body = `Top ${data.topK} chunks${data.scoreThreshold ? ` (≥${data.scoreThreshold})` : ''}`;

  return (
    <BaseNode
      icon="📚"
      subtitle={subtitle}
      state={state}
      body={<span className="text-[11px]">{body}</span>}
      selected={selected}
      onRetry={state === 'failed' && liveStep ? () => retryFromStep(id) : undefined}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left} id="in" />
      <Handle type="source" position={Position.Right} id="out" className="!top-[40%]" />
      <Handle type="source" position={Position.Right} id="error" className="!top-[60%] !bg-red-600" />
    </BaseNode>
  );
}
