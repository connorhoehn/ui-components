// src/components/pipelines/nodes/image-source/ImageSourceNode.tsx
//
// image-source node — injects an existing image into the pipeline context.
// Body shows the bound image; the latest run wins over design-time config:
// the server-side handler emits `pipeline:step:image:produced` (folded into
// `liveStep.images`) and returns `output.imageId`, so a runtime-injected
// image (trigger payload / context path) is reflected even when it differs
// from the configured literal `imageId`. Thumb is click-to-lightbox.

import { useState } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageSourceNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';
import { cn } from '../../../../lib/cn';
import { ImageLightbox } from '../../../shared/ImageLightbox';

type ImageSourceData = ImageSourceNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type ImageSourceFlowNode = Node<ImageSourceData, 'image-source'>;

// React Flow selects/drag-starts nodes on mousedown — interactive elements
// inside the node body must stop propagation on both mousedown and click.
const stopMouseDown = (e: React.MouseEvent) => e.stopPropagation();

export default function ImageSourceNode(props: NodeProps<ImageSourceFlowNode>) {
  const { id, data, selected } = props;
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const getImageUrl = useImageUrl();
  // Runtime-resolved image from the latest run, if any. The handler both
  // emits image:produced (→ liveStep.images) and returns output.imageId —
  // prefer images[] (the canvas protocol), fall back to output, then config.
  const liveImageId =
    liveStep?.images?.[0]?.imageId ??
    (liveStep?.output as { imageId?: string } | undefined)?.imageId;
  const imageId = liveImageId ?? data.imageId;

  const body = imageId ? (
    <>
      <button
        type="button"
        aria-label="View source image"
        className={cn(
          'block w-full rounded border-none bg-transparent p-0 cursor-zoom-in',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
        )}
        onMouseDown={stopMouseDown}
        onClick={(e) => {
          e.stopPropagation();
          setLightboxOpen(true);
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={getImageUrl(imageId)}
          alt="Source image"
          className={cn(
            'w-full h-20 object-cover rounded block',
            'border border-[#d1d5db] bg-[#f3f4f6]',
          )}
          data-testid="image-source-thumb"
        />
      </button>
      <ImageLightbox
        images={[{ src: getImageUrl(imageId), alt: 'Source image' }]}
        openIndex={lightboxOpen ? 0 : null}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  ) : (
    <div
      className={cn(
        'w-full h-20 rounded flex items-center justify-center',
        'border border-dashed border-[#d1d5db] bg-[#f3f4f6]',
        'text-[11px] text-[#6b7280]',
      )}
      data-testid="image-source-placeholder"
    >
      No image configured
    </div>
  );

  const footer = imageId ? (
    <span className="font-mono text-[11px] text-[#6b7280]">
      {imageId.slice(0, 16)}&hellip;
    </span>
  ) : undefined;

  return (
    <BaseNode
      icon="🖼"
      subtitle="image-source"
      state={state}
      category={categoryFor('image-source')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Image Source node, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        className={portCls('image')}
      />
    </BaseNode>
  );
}
