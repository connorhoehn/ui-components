// frontend/src/components/pipelines/nodes/join/JoinNode.tsx
//
// Join node — N inputs (`in-0`…`in-(N-1)`), 1 output (`out`). The handle
// count is dynamically sized from the number of incoming edges (minimum 2).
// Subtitle describes the mode; body shows the merge strategy.
// See PIPELINES_PLAN.md §5.7 / §18.4.4 / §19.12.

import {
  Handle, Position, useNodeConnections,
  type NodeProps, type Node,
} from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { JoinNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

type JoinData = JoinNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type JoinFlowNode = Node<JoinData, 'join'>;

function modeSubtitle(data: JoinData): string {
  if (data.mode === 'all') return 'all';
  if (data.mode === 'any') return 'any';
  return `${data.n ?? 1} of many`;
}

function mergeLabel(strategy: JoinData['mergeStrategy']): string {
  switch (strategy) {
    case 'deep-merge':        return 'Deep merge';
    case 'array-collect':     return 'Array collect';
    case 'last-writer-wins':  return 'Last writer wins';
    default:                  return String(strategy);
  }
}

export default function JoinNode(props: NodeProps<JoinFlowNode>) {
  const { id, data, selected } = props;
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  // §17.6 retry-from-here — see TriggerNode for the rationale.
  const retry = useRetryFromStep();
  const onRetry = state === 'failed' ? () => retry(id) : undefined;

  // Count incoming connections. Always render at least 2 handles so the
  // node has a visible join-point even when unconnected; grow beyond the
  // connected count by 1 so there's always one empty landing slot.
  const incoming = useNodeConnections({ handleType: 'target' });
  const handleCount = Math.max(2, incoming.length + 1);

  return (
    <BaseNode
      icon="⑃"
      subtitle={modeSubtitle(data)}
      state={state}
      body={<span className="italic">{mergeLabel(data.mergeStrategy)}</span>}
      selected={selected}
      onRetry={onRetry}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      {Array.from({ length: handleCount }, (_, i) => {
        const pct = ((i + 1) / (handleCount + 1)) * 100;
        return (
          <Handle
            key={`in-${i}`}
            type="target"
            position={Position.Left}
            id={`in-${i}`}
            style={{ background: '#cbd5e1', width: 10, height: 10, top: `${pct}%` }}
          />
        );
      })}
      <Handle type="source" position={Position.Right} id="out" style={{ background: '#cbd5e1', width: 10, height: 10 }} />
    </BaseNode>
  );
}
