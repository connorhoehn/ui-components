import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { AgentNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

type AgentData = AgentNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type AgentFlowNode = Node<AgentData, 'agent'>;

export default function AgentNode({ id, data, selected }: NodeProps<AgentFlowNode>) {
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const state: NodeExecutionState = data._state ?? liveState ?? 'idle';
  const retryFromStep = useRetryFromStep();

  // The canvas face has one job beyond identifying the node: make the
  // default-deny tool allowlist impossible to miss. An agent with no tools
  // is a legal but expensive no-op — it should not look identical on the
  // canvas to one wired up with Bash and Read.
  const toolCount = data.allowedTools?.length ?? 0;
  const subtitle = data.prompt?.trim()
    ? data.prompt.trim().split('\n')[0].slice(0, 48)
    : 'No prompt';
  const body = toolCount === 0
    ? `${data.model ?? 'sonnet'} · no tools`
    : `${data.model ?? 'sonnet'} · ${toolCount} tool${toolCount === 1 ? '' : 's'}`;

  return (
    <BaseNode
      icon="🤖"
      subtitle={subtitle}
      state={state}
      category={categoryFor('agent')}
      body={
        <span className={toolCount === 0 ? 'text-[11px] text-warning-fg' : 'text-[11px]'}>
          {body}
        </span>
      }
      selected={selected}
      onRetry={state === 'failed' && liveStep ? () => retryFromStep(id) : undefined}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left} id="in" className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="out" className={`${portCls('data')} !top-[40%]`} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !top-[60%]`} />
    </BaseNode>
  );
}
