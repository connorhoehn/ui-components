import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { McpToolNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

type McpToolData = McpToolNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type McpToolFlowNode = Node<McpToolData, 'mcp-tool'>;

export default function McpToolNode({ id, data, selected }: NodeProps<McpToolFlowNode>) {
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const state: NodeExecutionState = data._state ?? liveState ?? 'idle';
  const retryFromStep = useRetryFromStep();

  const subtitle = data.toolName || 'Not configured';

  return (
    <BaseNode
      icon="🔌"
      subtitle={subtitle}
      state={state}
      body={data.gatewayUrl ? <span style={{ fontSize: 11 }}>{data.gatewayUrl}</span> : undefined}
      selected={selected}
      onRetry={state === 'failed' && liveStep ? () => retryFromStep(id) : undefined}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left} id="in" />
      <Handle type="source" position={Position.Right} id="out" style={{ top: '40%' }} />
      <Handle type="source" position={Position.Right} id="error" style={{ top: '60%', background: '#dc2626' }} />
    </BaseNode>
  );
}
