// src/components/pipelines/nodes/adjust-layer/AdjustLayerNode.tsx
//
// Layered image adjustment node — applies a composable stack of colour/filter ops.
// Body: thumbnail when produced; chip list of configured layers otherwise.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageAdjustLayerNodeData, AdjustLayer } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type AdjustLayerData = ImageAdjustLayerNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type AdjustLayerFlowNode = Node<AdjustLayerData, 'image:adjust-layer'>;

function layerLabel(layer: AdjustLayer): string {
  switch (layer.kind) {
    case 'brightness': return `brightness ${layer.value}`;
    case 'contrast':   return `contrast ${layer.value}`;
    case 'saturation': return `sat ${layer.value}`;
    case 'hue':        return `hue ${layer.degrees}°`;
    case 'blur':       return `blur ${layer.radiusPx}px`;
  }
}

export default function AdjustLayerNode(props: NodeProps<AdjustLayerFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const producedImage = liveStep?.images?.[0] ?? null;
  const layers = data.layers ?? [];

  const body = producedImage ? (
    <img
      src={getImageUrl(producedImage.imageId)}
      alt="Adjust output"
      className="w-full h-20 object-cover rounded border border-border bg-surface-inset block"
      data-testid="adjust-layer-output-thumb"
    />
  ) : layers.length > 0 ? (
    <div
      className="w-full rounded border border-dashed border-border bg-surface-inset p-1.5 flex flex-wrap gap-1 min-h-8"
      data-testid="adjust-layer-chips"
    >
      {layers.map((layer, idx) => (
        <span
          key={idx}
          className="text-[10px] font-mono bg-surface-hover border border-border text-text-secondary rounded px-1 py-0.5"
        >
          {layerLabel(layer)}
        </span>
      ))}
    </div>
  ) : (
    <div
      className="w-full rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary min-h-8"
      data-testid="adjust-layer-placeholder"
    >
      Awaiting input
    </div>
  );

  const footer = (
    <span
      className="text-[11px] text-text-tertiary"
      data-testid="adjust-layer-footer"
    >
      {layers.length} layer{layers.length === 1 ? '' : 's'}
    </span>
  );

  const ariaLabel = `Adjust Layer node, ${layers.length} layer${layers.length === 1 ? '' : 's'}, state: ${state}`;

  return (
    <BaseNode
      icon="𝍩"
      subtitle="image:adjust-layer"
      state={state}
      category={categoryFor('image:adjust-layer')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={ariaLabel}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !top-[75%]`} />
    </BaseNode>
  );
}
