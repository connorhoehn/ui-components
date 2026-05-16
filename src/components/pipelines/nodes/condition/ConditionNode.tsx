// frontend/src/components/pipelines/nodes/condition/ConditionNode.tsx
//
// Condition node — 1 input (`in`), 2 outputs (`true` green, `false` orange).
// Subtitle = label or 'condition'; body shows the expression snippet.
// See PIPELINES_PLAN.md §5.4 / §18.4.4 / §19.12.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { ConditionNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

type ConditionData = ConditionNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type ConditionFlowNode = Node<ConditionData, 'condition'>;

function snippet(expr: string): string {
  if (!expr) return '—';
  const flat = expr.replace(/\s+/g, ' ').trim();
  return flat.length > 60 ? `${flat.slice(0, 60)}…` : flat;
}

export default function ConditionNode(props: NodeProps<ConditionFlowNode>) {
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
      icon="❓"
      subtitle={data.label || 'condition'}
      state={state}
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
      <Handle type="target" position={Position.Left}  id="in"    className="!bg-slate-300 !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Right} id="true"  className="!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" />
      <Handle type="source" position={Position.Right} id="false" className="!bg-amber-500 !w-2.5 !h-2.5 !top-[60%]" />
    </BaseNode>
  );
}
