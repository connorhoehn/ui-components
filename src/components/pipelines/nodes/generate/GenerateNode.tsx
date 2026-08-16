// src/components/pipelines/nodes/generate/GenerateNode.tsx
//
// image:generate node — Bedrock Titan image generation.
// Body shows prompt preview pre-run; an indeterminate "synthesizing"
// shimmer while the step is running with no results yet; a blur-up reveal
// (GenerativeImagePreview) when a single image lands; and a NodeThumbStrip
// for multi-image results (numImages > 1 or images.length > 1).
//
// Composition note (NODE-VISUALS-AUDIT §3.2/§3.3): the single-image path
// keeps GenerativeImagePreview mounted across the synthesizing → done
// transition (wrapped in a lightbox-opening button in BOTH phases) so the
// blur-up reveal actually plays — swapping component types at image-landing
// time would remount the preview and skip the animation. Multi-image
// results go straight to NodeThumbStrip, which owns its own lightbox.

import { useState } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import { cn } from '../../../../lib/cn';
import type { ImageGenerateNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';
import { GenerativeImagePreview } from '../../../image/GenerativeImagePreview';
import { NodeThumbStrip } from '../shared/NodeThumbStrip';
import { ImageLightbox } from '../../../shared/ImageLightbox';

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

// React Flow selects/drag-starts nodes on mousedown — interactive elements
// inside the node body must stop propagation on both mousedown and click.
const stopMouseDown = (e: React.MouseEvent) => e.stopPropagation();

export default function GenerateNode(props: NodeProps<GenerateFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const images = liveStep?.images ?? [];
  // Step start time arrives as the ISO `at` of pipeline.step.started.
  const startedAtMs = liveStep?.startedAt ? Date.parse(liveStep.startedAt) : NaN;
  const synthesizing = state === 'running' && images.length === 0;
  const multi = (data.numImages ?? 1) > 1 || images.length > 1;

  let body: React.ReactNode;
  if (images.length > 0 && multi) {
    // All results, live — arms/images popping in as they land. The strip
    // owns its own lightbox + propagation guards.
    body = <NodeThumbStrip images={images} data-testid="generate-thumb-strip" />;
  } else if (synthesizing || images.length === 1) {
    const src = images[0] ? getImageUrl(images[0].imageId) : undefined;
    body = (
      <>
        <button
          type="button"
          data-testid="generate-output-preview"
          aria-label={src ? 'View generated image' : 'Image synthesizing'}
          className={cn(
            'block w-full rounded-md border-none bg-transparent p-0',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
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
            alt="Generate output"
            {...(synthesizing && Number.isFinite(startedAtMs) ? { startedAt: startedAtMs } : {})}
            className="w-full h-20"
          />
        </button>
        {src && (
          <ImageLightbox
            images={[{ src, alt: 'Generate output' }]}
            openIndex={lightboxOpen ? 0 : null}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </>
    );
  } else {
    body = (
      <div
        className="w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary"
        data-testid="generate-placeholder"
      >
        {promptPreview(data.prompt)}
      </div>
    );
  }

  const numLabel = (data.numImages ?? 1) > 1 ? `×${data.numImages}` : null;
  const dimsLabel = data.width && data.height ? `${data.width}×${data.height}` : null;

  const footer = (numLabel || dimsLabel) ? (
    <span className="font-mono text-[11px] text-text-tertiary">
      {[dimsLabel, numLabel].filter(Boolean).join(' · ')}
    </span>
  ) : undefined;


  return (
    <BaseNode
      icon="✦"
      subtitle="image:generate"
      state={state}
      category={categoryFor('image:generate')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Generate node, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !bottom-2 !top-auto`} />
    </BaseNode>
  );
}
