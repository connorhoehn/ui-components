// src/components/pipelines/nodes/vision-classify/VisionClassifyNode.tsx
//
// image:vision-classify node — classifies image into a label set.
// Body shows label + confidence badge once output lands.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageVisionClassifyNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';

type VisionClassifyData = ImageVisionClassifyNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type VisionClassifyFlowNode = Node<VisionClassifyData, 'image:vision-classify'>;

type ClassifyOutput = { extracted?: { label?: string; confidence?: number } };

export default function VisionClassifyNode(props: NodeProps<VisionClassifyFlowNode>) {
  const { id, data, selected } = props;

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const output = liveStep?.output as ClassifyOutput | undefined;
  const label = output?.extracted?.label;
  const confidence = output?.extracted?.confidence;

  const labelsPreview = (data.labels ?? []).slice(0, 4).join(', ');

  const body = label ? (
    <div className="flex items-center gap-1.5 py-0.5">
      <span
        className="text-[12px] font-semibold text-text-primary bg-surface-inset border border-border rounded px-2 py-0.5"
        data-testid="classify-label"
      >
        {label}
      </span>
      {confidence != null && (
        <span
          className="text-[11px] font-mono text-text-tertiary"
          data-testid="classify-confidence"
        >
          {(confidence * 100).toFixed(0)}%
        </span>
      )}
    </div>
  ) : (
    <span className="text-[11px] text-text-tertiary italic">
      {labelsPreview ? `Labels: ${labelsPreview}` : 'No labels configured'}
    </span>
  );

  const model = data.model ?? 'claude-haiku-4-5';

  return (
    <BaseNode
      icon="🏷"
      subtitle={model}
      state={state}
      category={categoryFor('image:vision-classify')}
      body={body}
      selected={selected}
      ariaLabel={`Vision Classify node, model: ${model}, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="error" className={portCls('error')} style={{ bottom: 8, top: 'auto' }} />
    </BaseNode>
  );
}
