// src/components/pipelines/nodes/watermark/WatermarkNode.tsx
//
// image:watermark node — composites an overlay image atop source.
// Body shows thumbnail once produced; placeholder with gravity info.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { ImageWatermarkNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type WatermarkData = ImageWatermarkNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type WatermarkFlowNode = Node<WatermarkData, 'image:watermark'>;

export default function WatermarkNode(props: NodeProps<WatermarkFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const firstImage = liveStep?.images?.[0] ?? null;
  const gravityLabel = data.gravity ?? 'southeast';
  const opacityLabel = data.opacity != null ? `${Math.round(data.opacity * 100)}%` : '100%';

  const body = firstImage ? (
    <img
      src={getImageUrl(firstImage.imageId)}
      alt="Watermark output"
      className="w-full h-20 object-cover rounded border border-border bg-surface-inset block"
      data-testid="watermark-output-thumb"
    />
  ) : (
    <div
      className="w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
      data-testid="watermark-placeholder"
    >
      {data.overlayImageId ? `${gravityLabel} · ${opacityLabel}` : 'No overlay image set'}
    </div>
  );

  const footer = data.overlayImageId ? (
    <span className="font-mono text-[11px] text-text-tertiary">
      {gravityLabel} · {opacityLabel}
    </span>
  ) : undefined;

  const handleCls = 'bg-border-emphasis w-2.5 h-2.5';

  return (
    <BaseNode
      icon="⊕"
      subtitle="image:watermark"
      state={state}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Watermark node, gravity: ${gravityLabel}, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={handleCls} />
      <Handle type="source" position={Position.Right} id="out"   className={handleCls} />
      <Handle type="source" position={Position.Right} id="error" className={handleCls} style={{ bottom: 8, top: 'auto' }} />
    </BaseNode>
  );
}
