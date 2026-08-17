// src/components/pipelines/nodes/vision/VisionNode.tsx
//
// Vision node — image:vision-analyze. Streaming response footer,
// inline thumbnail (click-to-lightbox), retry on failure.

import { memo, useState } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import { cn } from '../../../../lib/cn';
import type { ImageVisionAnalyzeNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';
import { ImageLightbox } from '../../../shared/ImageLightbox';

type VisionData = ImageVisionAnalyzeNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type VisionFlowNode = Node<VisionData, 'image:vision-analyze'>;

interface VisionFooterInfo {
  response: string;
  tokensIn?: number;
  tokensOut?: number;
  streaming: boolean;
  awaiting: boolean;
  failure?: { reason: string; error: string };
  imageId?: string;
  costUsd?: number;
  onRetry?: () => void;
  getImageUrl: (id: string) => string;
}

function formatCost(usd: number): string {
  if (usd === 0) return '$0';
  if (usd < 0.001) return '<$0.001';
  if (usd < 1) return `$${usd.toFixed(3)}`;
  return `$${usd.toFixed(2)}`;
}

function previewPrompt(template: string): string {
  if (!template || template.trim().length === 0) return 'Not configured';
  const lines = template.split('\n').slice(0, 2);
  const out = lines.join(' ').trim();
  return out.length > 120 ? `${out.slice(0, 117)}…` : out;
}

// React Flow selects/drag-starts nodes on mousedown — interactive elements
// inside the node must stop propagation on both mousedown and click.
const stopMouseDown = (e: React.MouseEvent) => e.stopPropagation();

const VisionResponseFooter = memo(function VisionResponseFooter({ info }: { info: VisionFooterInfo }) {
  const [open, setOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (info.failure) {
    const isRefusal = info.failure.reason === 'refusal';
    return (
      <div>
        <output aria-live="polite" className="sr-only">
          {isRefusal ? 'Content policy refusal' : `Failure: ${info.failure.reason}`}
        </output>
        <div className="flex items-start gap-1">
          <span className="bg-transparent border-none p-0 text-[12px] text-danger-fg font-medium text-left">
            {isRefusal ? '✕ Content policy refusal' : `✕ ${info.failure.reason}`}
          </span>
          {info.onRetry && (
            <button
              type="button"
              onClick={info.onRetry}
              className="ml-2 bg-transparent border border-border-emphasis rounded px-1.5 py-0.5 text-[11px] cursor-pointer text-text-secondary"
              title="Retry this step"
            >
              Retry ↺
            </button>
          )}
        </div>
        <div className="mt-1 font-mono text-[11px] leading-snug text-text-secondary">
          {info.failure.error}
        </div>
      </div>
    );
  }

  const showTokens = info.tokensIn != null || info.tokensOut != null;
  const isCompleted = !info.streaming && !info.awaiting && info.response.length > 0;
  const text = open
    ? info.response
    : info.response.length > 60 ? `${info.response.slice(0, 60)}…` : info.response;

  const liveStatus = info.awaiting
    ? 'Vision: waiting for first token'
    : info.streaming
      ? 'Vision: streaming response'
      : isCompleted
        ? 'Vision: completed'
        : '';

  return (
    <div>
      <output aria-live="polite" className="sr-only">{liveStatus}</output>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] text-text-secondary font-medium text-left"
      >
        {open ? '▾' : '▸'} {info.streaming ? 'Streaming' : 'Response'}
        {typeof info.costUsd === 'number' && (
          <span className="ml-1.5 text-[11px] text-text-tertiary" data-testid="vision-cost" title="Cost based on model usage rate">
            · {formatCost(info.costUsd)}
          </span>
        )}
        {showTokens && (
          <span className="ml-1.5 text-[11px] text-text-tertiary">
            · {info.tokensIn ?? 0} → {info.tokensOut ?? 0} tokens
          </span>
        )}
        {info.awaiting && (
          <span className="ml-1.5 text-[11px] text-info-fg" data-testid="vision-awaiting">
            · waiting…
          </span>
        )}
        {info.streaming && !info.awaiting && (
          <span className="ml-1.5 text-[11px] text-text-tertiary">· streaming…</span>
        )}
      </button>
      {isCompleted && info.imageId && (
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('pipeline:open-run-modal'))}
          className="mt-1 block bg-transparent border-none p-0 cursor-pointer text-[11px] text-primary underline font-inherit"
        >
          Run with new image →
        </button>
      )}
      {info.imageId && (
        <>
          <button
            type="button"
            aria-label="View vision input image"
            className={cn(
              'mt-1.5 block h-14 w-14 overflow-hidden rounded border border-border bg-surface-inset',
              'p-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-info',
            )}
            onMouseDown={stopMouseDown}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
          >
            <img
              src={info.getImageUrl(info.imageId)}
              alt="Vision input"
              className="h-full w-full object-cover"
              data-testid="vision-input-thumb"
            />
          </button>
          <ImageLightbox
            images={[{ src: info.getImageUrl(info.imageId), alt: 'Vision input', caption: 'Vision input' }]}
            openIndex={lightboxOpen ? 0 : null}
            onClose={() => setLightboxOpen(false)}
          />
        </>
      )}
      <div
        className={cn(
          'mt-1 overflow-hidden font-mono text-[11px] leading-snug text-text-primary whitespace-pre-wrap break-words',
          open ? 'max-h-none' : 'max-h-[1.4em]',
        )}
      >
        {text}
      </div>
    </div>
  );
});

export default function VisionNode(props: NodeProps<VisionFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const retry = useRetryFromStep();
  const onRetry = state === 'failed' ? () => retry(id) : undefined;

  const body = (
    <span className="italic text-text-secondary text-[13px]">
      {previewPrompt(data.userPrompt)}
    </span>
  );

  const liveVision = liveStep?.vision;
  const isStreaming =
    state === 'running' && liveVision !== undefined && liveVision.tokensSeen > 0 && !liveVision.analyzed;
  const isAwaiting =
    state === 'running' && liveVision !== undefined && liveVision.tokensSeen === 0 && !liveVision.failure;
  const footerInfo: VisionFooterInfo | undefined = liveVision
    ? {
        response: liveVision.response,
        tokensIn: liveVision.tokensIn,
        tokensOut: liveVision.tokensOut,
        streaming: isStreaming,
        awaiting: isAwaiting,
        ...(liveVision.failure ? { failure: liveVision.failure } : {}),
        ...(liveVision.imageId ? { imageId: liveVision.imageId } : {}),
        ...(typeof liveVision.costUsd === 'number' ? { costUsd: liveVision.costUsd } : {}),
        ...(onRetry ? { onRetry } : {}),
        getImageUrl,
      }
    : undefined;
  const footer = footerInfo ? <VisionResponseFooter info={footerInfo} /> : undefined;

  const subtitle = data.model || 'claude-sonnet-4-6';
  const mode = data.outputSchema ? 'extract' : 'caption';
  const ariaLabel = `Vision node, model ${subtitle}, mode ${mode}, state: ${state}`;

  return (
    <BaseNode
      icon="📷"
      subtitle={`${subtitle} · ${mode}`}
      state={state}
      category={categoryFor('image:vision-analyze')}
      body={body}
      footer={footer}
      selected={selected}
      onRetry={onRetry}
      ariaLabel={ariaLabel}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"  className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out" className={portCls('data')} />
    </BaseNode>
  );
}
