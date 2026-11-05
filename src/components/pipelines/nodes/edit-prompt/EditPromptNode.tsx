// src/components/pipelines/nodes/edit-prompt/EditPromptNode.tsx
//
// image:edit-prompt node — Nova Canvas inpaint/outpaint.
// Body shows prompt-preview placeholder pre-run; an indeterminate
// "synthesizing" shimmer while running with no results; a blur-up reveal
// for a single result; and a NodeThumbStrip for multi-image results.
// Same composition as GenerateNode — see the note there about keeping
// GenerativeImagePreview mounted across the synthesizing → done transition.

import { useState } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import { cn } from '../../../../lib/cn';
import type { ImageEditPromptNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';
import { GenerativeImagePreview } from '../../../image/GenerativeImagePreview';
import { NodeThumbStrip } from '../shared/NodeThumbStrip';
import { ImageLightbox } from '../../../shared/ImageLightbox';

type EditPromptData = ImageEditPromptNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type EditPromptFlowNode = Node<EditPromptData, 'image:edit-prompt'>;

function promptPreview(prompt: string): string {
  if (!prompt || !prompt.trim()) return 'No prompt set';
  return prompt.length > 80 ? `${prompt.slice(0, 77)}…` : prompt;
}

const stopMouseDown = (e: React.MouseEvent) => e.stopPropagation();

export default function EditPromptNode(props: NodeProps<EditPromptFlowNode>) {
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
  const multi = images.length > 1;

  let body: React.ReactNode;
  if (multi) {
    body = <NodeThumbStrip images={images} data-testid="edit-prompt-thumb-strip" />;
  } else if (synthesizing || images.length === 1) {
    const src = images[0] ? getImageUrl(images[0].imageId) : undefined;
    body = (
      <>
        <button
          data-ui-part=""
          type="button"
          data-testid="edit-prompt-output-preview"
          aria-label={src ? 'View edited image' : 'Image synthesizing'}
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
            alt="Edit output"
            {...(synthesizing && Number.isFinite(startedAtMs) ? { startedAt: startedAtMs } : {})}
            className="w-full h-20"
          />
        </button>
        {src && (
          <ImageLightbox
            images={[{ src, alt: 'Edit output' }]}
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
        data-testid="edit-prompt-placeholder"
      >
        {promptPreview(data.prompt)}
      </div>
    );
  }

  const footer = data.maskImagePath ? (
    <span className="font-mono text-[11px] text-text-tertiary">
      mask: {data.maskImagePath}
    </span>
  ) : undefined;


  return (
    <BaseNode
      icon="✎"
      subtitle="image:edit-prompt"
      state={state}
      category={categoryFor('image:edit-prompt')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Edit Prompt node, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !bottom-2 !top-auto`} />
    </BaseNode>
  );
}
