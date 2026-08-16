// src/components/pipelines/nodes/upscale/UpscaleNode.tsx
//
// image:upscale node — super-resolves a source image via a self-hosted x4
// upscaler and outputs a new image. Body shows an inline thumbnail once the
// live step produces an image, else a placeholder showing the maxEdge target.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageUpscaleNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type UpscaleData = ImageUpscaleNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type UpscaleFlowNode = Node<UpscaleData, 'image:upscale'>;

export default function UpscaleNode(props: NodeProps<UpscaleFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const firstImage = liveStep?.images?.[0] ?? null;

  const edgeLabel = `≤ ${data.maxEdge ?? 1024}px → 4×`;

  const body = firstImage ? (
    <img
      src={getImageUrl(firstImage.imageId)}
      alt="Upscale output"
      className="w-full h-20 object-cover rounded border border-border bg-surface-inset block"
      data-testid="upscale-output-thumb"
    />
  ) : (
    <div
      className="w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
      data-testid="upscale-placeholder"
    >
      {edgeLabel}
    </div>
  );

  const footer = (
    <span className="font-mono text-[11px] text-text-tertiary">
      {edgeLabel}
    </span>
  );

  return (
    <BaseNode
      icon="⤢"
      subtitle="image:upscale"
      state={state}
      category={categoryFor('image:upscale')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Upscale node, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !bottom-2 !top-auto`} />
    </BaseNode>
  );
}
