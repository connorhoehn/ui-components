// frontend/src/components/pipelines/nodes/transform/TransformNode.tsx
//
// Transform node — 1 input (`in`), 1 output (`out`). Subtitle is the
// transform type; body shows a truncated mono-font expression snippet.
// See PIPELINES_PLAN.md §5.3 / §18.4.4 / §19.12.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { TransformNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

type TransformData = TransformNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type TransformFlowNode = Node<TransformData, 'transform'>;

function snippet(expr: string): string {
  if (!expr) return '—';
  const flat = expr.replace(/\s+/g, ' ').trim();
  return flat.length > 60 ? `${flat.slice(0, 60)}…` : flat;
}

export default function TransformNode(props: NodeProps<TransformFlowNode>) {
  const { id, data, selected } = props;
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  // §17.6 retry-from-here — see TriggerNode for the rationale.
  const retry = useRetryFromStep();
  const onRetry = state === 'failed' ? () => retry(id) : undefined;

  return (
    <BaseNode
      icon="✨"
      subtitle={data.transformType}
      state={state}
      category={categoryFor('transform')}
      body={
        <span className="font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {snippet(data.expression)}
        </span>
      }
      selected={selected}
      onRetry={onRetry}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"  className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="out" className={portCls('data')} />
    </BaseNode>
  );
}
