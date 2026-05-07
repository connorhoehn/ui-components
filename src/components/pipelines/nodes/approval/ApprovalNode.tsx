// frontend/src/components/pipelines/nodes/approval/ApprovalNode.tsx
//
// Approval node — 1 input (`in`), 2 outputs (`approved` green, `rejected` red).
// Subtitle: "{N} approver(s), {required}/{N} required".
// Body: approver chips (first 2, "+N more" if more).
// See PIPELINES_PLAN.md §5.8 / §18.4.4 / §19.12.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { ApprovalNodeData, Approver } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

type ApprovalData = ApprovalNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type ApprovalFlowNode = Node<ApprovalData, 'approval'>;

function approverLabel(a: Approver): string {
  return a.type === 'role' ? `@${a.value}` : a.value;
}

export default function ApprovalNode(props: NodeProps<ApprovalFlowNode>) {
  const { id, data, selected } = props;
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  // §17.6 retry-from-here — see TriggerNode for the rationale.
  const retry = useRetryFromStep();
  const onRetry = state === 'failed' ? () => retry(id) : undefined;

  const approvers = data.approvers ?? [];
  const total = approvers.length;
  const required = data.requiredCount ?? 0;
  const subtitle = `${total} approver${total === 1 ? '' : 's'}, ${required}/${total} required`;

  const firstTwo = approvers.slice(0, 2);
  const more = Math.max(0, approvers.length - 2);

  const body = approvers.length === 0
    ? <span className="italic text-text-tertiary">No approvers</span>
    : (
      <div className="flex flex-wrap gap-1">
        {firstTwo.map((a, i) => (
          <span
            key={i}
            className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {approverLabel(a)}
          </span>
        ))}
        {more > 0 && (
          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
            +{more} more
          </span>
        )}
      </div>
    );

  return (
    <BaseNode
      icon="✋"
      subtitle={subtitle}
      state={state}
      body={body}
      selected={selected}
      onRetry={onRetry}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"       style={{ background: '#cbd5e1', width: 10, height: 10 }} />
      <Handle type="source" position={Position.Right} id="approved" style={{ background: '#16a34a', width: 10, height: 10, top: '40%' }} />
      <Handle type="source" position={Position.Right} id="rejected" style={{ background: '#dc2626', width: 10, height: 10, top: '60%' }} />
    </BaseNode>
  );
}
