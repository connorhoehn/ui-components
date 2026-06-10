// src/components/pipelines/nodes/vision-extract-text/VisionExtractTextNode.tsx
//
// image:vision-extract-text node — OCR / text extraction.
// Body shows line count + first OCR'd line once output lands.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageVisionExtractTextNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';

type VisionExtractTextData = ImageVisionExtractTextNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type VisionExtractTextFlowNode = Node<VisionExtractTextData, 'image:vision-extract-text'>;

type ExtractTextOutput = { extracted?: { text?: string; lines?: string[] } };

export default function VisionExtractTextNode(props: NodeProps<VisionExtractTextFlowNode>) {
  const { id, data, selected } = props;

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const output = liveStep?.output as ExtractTextOutput | undefined;
  const lines = output?.extracted?.lines ?? [];
  const firstLine = lines[0];

  const body = lines.length > 0 ? (
    <div data-testid="extract-text-result">
      <div className="text-[11px] text-text-tertiary mb-0.5">
        {lines.length} line{lines.length !== 1 ? 's' : ''}
      </div>
      <div
        className="font-mono text-[11px] text-text-primary whitespace-nowrap overflow-hidden text-ellipsis"
        data-testid="extract-text-first-line"
      >
        {firstLine}
      </div>
    </div>
  ) : (
    <span className="text-[11px] text-text-tertiary italic">Awaiting OCR</span>
  );

  const model = data.model ?? 'claude-sonnet-4-6';

  return (
    <BaseNode
      icon="📝"
      subtitle={model}
      state={state}
      category={categoryFor('image:vision-extract-text')}
      body={body}
      selected={selected}
      ariaLabel={`Vision Extract Text node, model: ${model}, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="error" className={portCls('error')} style={{ bottom: 8, top: 'auto' }} />
    </BaseNode>
  );
}
