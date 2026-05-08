import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { AgUiOutputNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';

type AgUiData = AgUiOutputNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type AgUiFlowNode = Node<AgUiData, 'ag-ui-output'>;

export default function AgUiOutputNode({ id, data, selected }: NodeProps<AgUiFlowNode>) {
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const state: NodeExecutionState = data._state ?? liveState ?? 'idle';

  const subtitle = data.eventType === 'CUSTOM' ? data.customEventName || 'Custom' : data.eventType;

  return (
    <BaseNode
      icon="📡"
      subtitle={subtitle}
      state={state}
      body={<span style={{ fontSize: 11 }}>Source: {data.sourceField}</span>}
      footer={<span style={{ fontSize: 10, color: '#6366f1' }}>Terminal — streams to AG-UI frontend</span>}
      selected={selected}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left} id="in" />
    </BaseNode>
  );
}
