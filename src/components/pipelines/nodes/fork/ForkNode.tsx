// frontend/src/components/pipelines/nodes/fork/ForkNode.tsx
//
// Fork node — 1 input (`in`), N outputs (`branch-0`…`branch-(N-1)`).
// Handles are stacked evenly by vertical percentage. Subtitle shows the
// branch count; body lists branch labels.
// See PIPELINES_PLAN.md §5.6 / §18.4.4 / §19.12.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ForkNodeData } from '../../../../types/pipeline';
import { useRetryFromStepIfWired, useLatestStepForNode } from '../../context/PipelineRunsContext';

type ForkData = ForkNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type ForkFlowNode = Node<ForkData, 'fork'>;


export default function ForkNode(props: NodeProps<ForkFlowNode>) {
  const { id, data, selected } = props;
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  // §17.6 retry-from-here — see TriggerNode for the rationale.
  const retry = useRetryFromStepIfWired();
  const onRetry = state === 'failed' && retry ? () => retry(id) : undefined;

  const count = Math.max(2, Math.min(8, data.branchCount ?? 2));
  const labels: string[] = Array.from({ length: count }, (_, i) => {
    const custom = data.branchLabels?.[i];
    return custom && custom.trim().length > 0 ? custom : `branch ${i}`;
  });

  return (
    <BaseNode
      icon="⑂"
      subtitle={`${count} branches`}
      state={state}
      category={categoryFor('fork')}
      body={
        <ul className="m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary">
          {labels.map((label, i) => (
            <li key={i} className="overflow-hidden text-ellipsis whitespace-nowrap">• {label}</li>
          ))}
        </ul>
      }
      selected={selected}
      onRetry={onRetry}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left} id="in" className={portCls('data')} />
      {labels.map((_label, i) => {
        // Evenly spaced in the vertical axis (leave 0% and 100% as margins).
        const pct = ((i + 1) / (count + 1)) * 100;
        return (
          <Handle
            key={i}
            type="source"
            position={Position.Right}
            id={`branch-${i}`}
            className={portCls('control')}
            style={{ top: `${pct}%` }}
          />
        );
      })}
    </BaseNode>
  );
}
