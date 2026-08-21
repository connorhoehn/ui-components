import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
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
      category={categoryFor('ag-ui-output')}
      body={<span className="text-[11px]">Source: {data.sourceField}</span>}
      footer={<span className="text-[10px] text-primary">Terminal — streams to AG-UI frontend</span>}
      selected={selected}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left} id="in" className={portCls('data')} />
    </BaseNode>
  );
}
