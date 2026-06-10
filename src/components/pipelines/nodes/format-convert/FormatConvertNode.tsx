// src/components/pipelines/nodes/format-convert/FormatConvertNode.tsx
//
// image:format-convert node — converts image format via sharp.
// Body shows format chip; thumbnail when produced.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageFormatConvertNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type FormatConvertData = ImageFormatConvertNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type FormatConvertFlowNode = Node<FormatConvertData, 'image:format-convert'>;

function formatChipLabel(data: ImageFormatConvertNodeData): string {
  const fmt = data.format?.toUpperCase() ?? '?';
  const quality = data.lossless ? 'lossless' : data.quality != null ? `q${data.quality}` : '';
  return quality ? `${fmt} ${quality}` : fmt;
}

export default function FormatConvertNode(props: NodeProps<FormatConvertFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const firstImage = liveStep?.images?.[0] ?? null;
  const chipLabel = data.format ? formatChipLabel(data) : null;

  const body = firstImage ? (
    <img
      src={getImageUrl(firstImage.imageId)}
      alt="Format convert output"
      className="w-full h-20 object-cover rounded border border-border bg-surface-inset block"
      data-testid="format-convert-output-thumb"
    />
  ) : (
    <div
      className="w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
      data-testid="format-convert-placeholder"
    >
      {chipLabel ?? 'No format set'}
    </div>
  );

  const footer = chipLabel ? (
    <span className="font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary">
      {chipLabel}
    </span>
  ) : undefined;


  return (
    <BaseNode
      icon="⇌"
      subtitle="image:format-convert"
      state={state}
      category={categoryFor('image:format-convert')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Format Convert node, format: ${data.format ?? 'unset'}, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="error" className={portCls('error')} style={{ bottom: 8, top: 'auto' }} />
    </BaseNode>
  );
}
