// src/components/pipelines/nodes/variation/VariationNode.tsx
//
// image:variation node — Nova Canvas variation generation (always fan-out).
// Body shows variation count badge + first thumbnail when produced.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { ImageVariationNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type VariationData = ImageVariationNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type VariationFlowNode = Node<VariationData, 'image:variation'>;

export default function VariationNode(props: NodeProps<VariationFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const firstImage = liveStep?.images?.[0] ?? null;
  const numVariations = data.numVariations ?? 1;

  const badge = (
    <span className="inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1">
      ×{numVariations} variation{numVariations !== 1 ? 's' : ''}
    </span>
  );

  const body = (
    <div>
      {badge}
      {firstImage ? (
        <img
          src={getImageUrl(firstImage.imageId)}
          alt="Variation output"
          className="w-full h-18 object-cover rounded border border-border bg-surface-inset block"
          data-testid="variation-output-thumb"
        />
      ) : (
        <div
          className="w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
          data-testid="variation-placeholder"
        >
          Awaiting input
        </div>
      )}
    </div>
  );

  const footer = data.similarity != null ? (
    <span className="font-mono text-[11px] text-text-tertiary">
      similarity {data.similarity}
    </span>
  ) : undefined;

  const handleCls = 'bg-border-emphasis w-2.5 h-2.5';

  return (
    <BaseNode
      icon="⊞"
      subtitle="image:variation"
      state={state}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Variation node, ${numVariations} variations, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={handleCls} />
      <Handle type="source" position={Position.Right} id="out"   className={handleCls} />
      <Handle type="source" position={Position.Right} id="error" className={handleCls} style={{ bottom: 8, top: 'auto' }} />
    </BaseNode>
  );
}
