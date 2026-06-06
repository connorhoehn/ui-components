// src/components/pipelines/nodes/crop/CropNode.tsx
//
// Image crop node — crops a region from a source image using bbox coords
// pulled from pipeline context.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { ImageCropNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type CropData = ImageCropNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type CropFlowNode = Node<CropData, 'image:crop'>;

function formatBbox(
  bbox: { x: number; y: number; width: number; height: number } | undefined,
): string | null {
  if (!bbox) return null;
  const x2 = bbox.x + bbox.width;
  const y2 = bbox.y + bbox.height;
  return `[${bbox.x},${bbox.y} → ${x2},${y2}]`;
}

export default function CropNode(props: NodeProps<CropFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const firstImage = liveStep?.images?.[0] ?? null;

  type StepOutput = { bbox?: { x: number; y: number; width: number; height: number } } | undefined;
  const stepOutput = liveStep?.output as StepOutput;
  const bboxStr = formatBbox(firstImage?.bbox ?? stepOutput?.bbox);

  const body = firstImage ? (
    <img
      src={getImageUrl(firstImage.imageId)}
      alt="Crop output"
      className="w-full h-20 object-cover rounded border border-border bg-surface-inset block"
      data-testid="crop-output-thumb"
    />
  ) : (
    <div
      className="w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
      data-testid="crop-placeholder"
    >
      No crop yet
    </div>
  );

  const footer = bboxStr ? (
    <span
      className="font-mono text-[11px] text-text-tertiary"
      data-testid="crop-bbox-coords"
    >
      {bboxStr}
    </span>
  ) : undefined;

  const ariaLabel = `Crop node, source: ${data.sourceImagePath ?? 'default'}, state: ${state}`;
  const handleCls = 'bg-border-emphasis w-2.5 h-2.5';

  return (
    <BaseNode
      icon="✂"
      subtitle="image:crop"
      state={state}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={ariaLabel}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"  className={handleCls} />
      <Handle type="source" position={Position.Right} id="out" className={handleCls} />
    </BaseNode>
  );
}
