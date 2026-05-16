// frontend/src/components/pipelines/nodes/action/ActionNode.tsx
//
// Action node — 1 input (`in`), 2 outputs (`out`, `error`). Subtitle is
// the action type; body is a one-line description derived from config.
// See PIPELINES_PLAN.md §5.5 / §18.4.4 / §19.12.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { ActionNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

type ActionData = ActionNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type ActionFlowNode = Node<ActionData, 'action'>;

function describe(data: ActionData): string {
  const cfg = data.config ?? {};
  switch (data.actionType) {
    case 'update-document': {
      const id = typeof cfg.documentId === 'string' ? cfg.documentId : '(current)';
      return `Update ${id}`;
    }
    case 'post-comment': {
      const target = typeof cfg.target === 'string' ? cfg.target : '(current doc)';
      return `Comment on ${target}`;
    }
    case 'notify': {
      const channel = typeof cfg.channel === 'string' ? cfg.channel : 'recipients';
      return `Notify ${channel}`;
    }
    case 'webhook': {
      const url = typeof cfg.url === 'string' ? cfg.url : '(no URL)';
      return `POST → ${url}`;
    }
    case 'mcp-tool': {
      const tool = typeof cfg.tool === 'string' ? cfg.tool : '(no tool)';
      return `Invoke ${tool}`;
    }
    default:
      return 'Action';
  }
}

export default function ActionNode(props: NodeProps<ActionFlowNode>) {
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
      icon="⚡"
      subtitle={data.actionType}
      state={state}
      body={<span className="italic">{describe(data)}</span>}
      selected={selected}
      onRetry={onRetry}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className="!bg-slate-300 !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Right} id="out"   className="!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" />
      <Handle type="source" position={Position.Right} id="error" className="!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" />
    </BaseNode>
  );
}
