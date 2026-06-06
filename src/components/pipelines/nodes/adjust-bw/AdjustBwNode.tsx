// src/components/pipelines/nodes/adjust-bw/AdjustBwNode.tsx
//
// Greyscale conversion node — converts a source image to black and white.
// Body: thumbnail when produced; placeholder otherwise.
// Footer: algorithm chip + contrast value.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { ImageAdjustBwNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type AdjustBwData = ImageAdjustBwNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type AdjustBwFlowNode = Node<AdjustBwData, 'image:adjust-bw'>;

export default function AdjustBwNode(props: NodeProps<AdjustBwFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const producedImage = liveStep?.images?.[0] ?? null;

  const body = producedImage ? (
    <div className="flex gap-1 w-full">
      <div className="flex-1 min-w-0">
        <img
          src={getImageUrl(producedImage.imageId)}
          alt="B/W output"
          className="flex-1 h-16 object-cover rounded border border-border bg-surface-inset block"
          data-testid="adjust-bw-output-thumb"
        />
        <div className="text-[9px] text-text-tertiary text-center mt-0.5">output</div>
      </div>
    </div>
  ) : (
    <div
      className="w-full h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
      data-testid="adjust-bw-placeholder"
    >
      Awaiting input
    </div>
  );

  const algorithm = data.algorithm ?? 'luminosity';
  const contrast = data.contrast ?? 1;

  const footer = (
    <span
      className="font-mono text-[11px] text-text-tertiary"
      data-testid="adjust-bw-footer"
    >
      {algorithm} · contrast {contrast}
    </span>
  );

  const ariaLabel = `Adjust B/W node, algorithm: ${algorithm}, state: ${state}`;
  const handleCls = 'bg-border-emphasis w-2.5 h-2.5';

  return (
    <BaseNode
      icon="◐"
      subtitle="image:adjust-bw"
      state={state}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={ariaLabel}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={handleCls} />
      <Handle type="source" position={Position.Right} id="out"   className={handleCls} />
      <Handle type="source" position={Position.Right} id="error" className={handleCls} style={{ top: '75%' }} />
    </BaseNode>
  );
}
