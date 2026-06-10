// src/components/pipelines/nodes/resize/ResizeNode.tsx
//
// image:resize node — resizes an image via sharp.resize().
// Body shows target dimensions once configured; inline thumbnail when produced.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageResizeNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type ResizeData = ImageResizeNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type ResizeFlowNode = Node<ResizeData, 'image:resize'>;

export default function ResizeNode(props: NodeProps<ResizeFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const firstImage = liveStep?.images?.[0] ?? null;

  const dimsLabel = data.width != null && data.height != null
    ? `→ ${data.width}×${data.height}`
    : data.width != null
      ? `→ ${data.width}w`
      : data.height != null
        ? `→ ${data.height}h`
        : null;

  const body = firstImage ? (
    <img
      src={getImageUrl(firstImage.imageId)}
      alt="Resize output"
      className="w-full h-20 object-cover rounded border border-border bg-surface-inset block"
      data-testid="resize-output-thumb"
    />
  ) : (
    <div
      className="w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
      data-testid="resize-placeholder"
    >
      {dimsLabel ?? 'No image yet'}
    </div>
  );

  const footer = dimsLabel ? (
    <span className="font-mono text-[11px] text-text-tertiary">
      {dimsLabel}{data.fit ? ` · ${data.fit}` : ''}
    </span>
  ) : undefined;


  return (
    <BaseNode
      icon="⥂"
      subtitle="image:resize"
      state={state}
      category={categoryFor('image:resize')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Resize node, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="error" className={portCls('error')} style={{ bottom: 8, top: 'auto' }} />
    </BaseNode>
  );
}
