// src/components/pipelines/nodes/variation/VariationNode.tsx
//
// image:variation node — Nova Canvas variation generation (always fan-out).
// Body shows variation count badge + live visuals: an indeterminate
// "synthesizing" shimmer while running with no results, a blur-up reveal
// for a single result, and a NodeThumbStrip rendering ALL results when
// numVariations > 1 (or more than one image has landed). Same composition
// as GenerateNode — see the note there about keeping GenerativeImagePreview
// mounted across the synthesizing → done transition.

import { useState } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import { cn } from '../../../../lib/cn';
import type { ImageVariationNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';
import { GenerativeImagePreview } from '../../../image/GenerativeImagePreview';
import { NodeThumbStrip } from '../shared/NodeThumbStrip';
import { ImageLightbox } from '../../../shared/ImageLightbox';

type VariationData = ImageVariationNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type VariationFlowNode = Node<VariationData, 'image:variation'>;

const stopMouseDown = (e: React.MouseEvent) => e.stopPropagation();

export default function VariationNode(props: NodeProps<VariationFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const images = liveStep?.images ?? [];
  const startedAtMs = liveStep?.startedAt ? Date.parse(liveStep.startedAt) : NaN;
  const synthesizing = state === 'running' && images.length === 0;
  const numVariations = data.numVariations ?? 1;
  const multi = numVariations > 1 || images.length > 1;

  const badge = (
    <span className="inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1">
      ×{numVariations} variation{numVariations !== 1 ? 's' : ''}
    </span>
  );

  let visual: React.ReactNode;
  if (images.length > 0 && multi) {
    visual = <NodeThumbStrip images={images} data-testid="variation-thumb-strip" />;
  } else if (synthesizing || images.length === 1) {
    const src = images[0] ? getImageUrl(images[0].imageId) : undefined;
    visual = (
      <>
        <button
          data-ui-part=""
          type="button"
          data-testid="variation-output-preview"
          aria-label={src ? 'View variation image' : 'Image synthesizing'}
          className={cn(
            'block w-full rounded-md border-none bg-transparent p-0',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-info',
            src ? 'cursor-zoom-in' : 'cursor-default',
          )}
          onMouseDown={stopMouseDown}
          onClick={(e) => {
            e.stopPropagation();
            if (src) setLightboxOpen(true);
          }}
        >
          <GenerativeImagePreview
            status={synthesizing ? 'synthesizing' : 'done'}
            {...(src ? { src } : {})}
            alt="Variation output"
            {...(synthesizing && Number.isFinite(startedAtMs) ? { startedAt: startedAtMs } : {})}
            className="w-full h-20"
          />
        </button>
        {src && (
          <ImageLightbox
            images={[{ src, alt: 'Variation output' }]}
            openIndex={lightboxOpen ? 0 : null}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </>
    );
  } else {
    visual = (
      <div
        className="w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
        data-testid="variation-placeholder"
      >
        Awaiting input
      </div>
    );
  }

  const body = (
    <div>
      {badge}
      {visual}
    </div>
  );

  const footer = data.similarity != null ? (
    <span className="font-mono text-[11px] text-text-tertiary">
      similarity {data.similarity}
    </span>
  ) : undefined;


  return (
    <BaseNode
      icon="⊞"
      subtitle="image:variation"
      state={state}
      category={categoryFor('image:variation')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Variation node, ${numVariations} variations, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !bottom-2 !top-auto`} />
    </BaseNode>
  );
}
