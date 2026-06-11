// src/components/pipelines/nodes/dimensions/DimensionsNode.tsx
//
// image:dimensions node — reads a source image's natural size and emits
// dimension data (width/height/aspectRatio/genWidth/genHeight) into context.
// It does NOT output an image — its output is structured data wired into
// image:generate's width/height. Body shows the derived generation dims once
// a live step has output, else a "reads image size" placeholder.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageDimensionsNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';

type DimensionsData = ImageDimensionsNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type DimensionsFlowNode = Node<DimensionsData, 'image:dimensions'>;

interface DimensionsOutput {
  width?: number;
  height?: number;
  aspectRatio?: number;
  genWidth?: number;
  genHeight?: number;
}

export default function DimensionsNode(props: NodeProps<DimensionsFlowNode>) {
  const { id, data, selected } = props;

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const output = (liveStep?.output as DimensionsOutput | undefined) ?? undefined;
  const genLabel = output?.genWidth != null && output?.genHeight != null
    ? `${output.genWidth}×${output.genHeight}`
    : null;

  const body = genLabel ? (
    <div
      className="w-full h-20 rounded border border-border bg-surface-inset flex flex-col items-center justify-center gap-0.5 text-text-secondary"
      data-testid="dimensions-output"
    >
      <span className="font-mono text-[13px]">{genLabel}</span>
      {output?.width != null && output?.height != null && (
        <span className="font-mono text-[11px] text-text-tertiary">
          src {output.width}×{output.height}
        </span>
      )}
    </div>
  ) : (
    <div
      className="w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
      data-testid="dimensions-placeholder"
    >
      reads image size
    </div>
  );

  const footer = (
    <span className="font-mono text-[11px] text-text-tertiary">
      maxEdge {data.maxEdge ?? 1024}
    </span>
  );

  return (
    <BaseNode
      icon="📐"
      subtitle="image:dimensions"
      state={state}
      category={categoryFor('image:dimensions')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Dimensions node, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="error" className={portCls('error')} style={{ bottom: 8, top: 'auto' }} />
    </BaseNode>
  );
}
