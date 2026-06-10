// src/components/pipelines/nodes/sharpen/SharpenNode.tsx
//
// image:sharpen node — sharpens image via sharp unsharp mask.
// Body shows sigma chip; thumbnail when produced.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageSharpenNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type SharpenData = ImageSharpenNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type SharpenFlowNode = Node<SharpenData, 'image:sharpen'>;

export default function SharpenNode(props: NodeProps<SharpenFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const firstImage = liveStep?.images?.[0] ?? null;
  const sigmaLabel = data.sigma != null ? `σ ${data.sigma}` : null;

  const body = firstImage ? (
    <img
      src={getImageUrl(firstImage.imageId)}
      alt="Sharpen output"
      className="w-full h-20 object-cover rounded border border-border bg-surface-inset block"
      data-testid="sharpen-output-thumb"
    />
  ) : (
    <div
      className="w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
      data-testid="sharpen-placeholder"
    >
      {sigmaLabel ?? 'Sharpen (default σ)'}
    </div>
  );

  const footer = sigmaLabel ? (
    <span className="font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary">
      {sigmaLabel}
    </span>
  ) : undefined;


  return (
    <BaseNode
      icon="◈"
      subtitle="image:sharpen"
      state={state}
      category={categoryFor('image:sharpen')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Sharpen node, sigma: ${data.sigma ?? 'default'}, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="error" className={portCls('error')} style={{ bottom: 8, top: 'auto' }} />
    </BaseNode>
  );
}
