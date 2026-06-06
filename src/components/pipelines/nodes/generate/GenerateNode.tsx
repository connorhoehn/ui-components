// src/components/pipelines/nodes/generate/GenerateNode.tsx
//
// image:generate node — Bedrock Titan image generation.
// Body shows prompt preview pre-run; thumbnail once produced.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { ImageGenerateNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type GenerateData = ImageGenerateNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type GenerateFlowNode = Node<GenerateData, 'image:generate'>;

function promptPreview(prompt: string): string {
  if (!prompt || !prompt.trim()) return 'No prompt set';
  return prompt.length > 80 ? `${prompt.slice(0, 77)}…` : prompt;
}

export default function GenerateNode(props: NodeProps<GenerateFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const firstImage = liveStep?.images?.[0] ?? null;

  const body = firstImage ? (
    <img
      src={getImageUrl(firstImage.imageId)}
      alt="Generate output"
      className="w-full h-20 object-cover rounded border border-border bg-surface-inset block"
      data-testid="generate-output-thumb"
    />
  ) : (
    <div
      className="w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary"
      data-testid="generate-placeholder"
    >
      {promptPreview(data.prompt)}
    </div>
  );

  const numLabel = (data.numImages ?? 1) > 1 ? `×${data.numImages}` : null;
  const dimsLabel = data.width && data.height ? `${data.width}×${data.height}` : null;

  const footer = (numLabel || dimsLabel) ? (
    <span className="font-mono text-[11px] text-text-tertiary">
      {[dimsLabel, numLabel].filter(Boolean).join(' · ')}
    </span>
  ) : undefined;

  const handleCls = 'bg-border-emphasis w-2.5 h-2.5';

  return (
    <BaseNode
      icon="✦"
      subtitle="image:generate"
      state={state}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Generate node, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={handleCls} />
      <Handle type="source" position={Position.Right} id="out"   className={handleCls} />
      <Handle type="source" position={Position.Right} id="error" className={handleCls} style={{ bottom: 8, top: 'auto' }} />
    </BaseNode>
  );
}
