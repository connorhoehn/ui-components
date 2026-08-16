// src/components/pipelines/nodes/transform-geo/TransformGeoNode.tsx
//
// image:transform node — applies a chain of geometric ops (rotate / flip / flop).
// Body lists the ops in order once configured; thumbnail when image produced.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageTransformNodeData, GeometricOp } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';

type TransformGeoData = ImageTransformNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type TransformGeoFlowNode = Node<TransformGeoData, 'image:transform'>;

function opLabel(op: GeometricOp): string {
  switch (op.op) {
    case 'rotate': return `rotate ${op.degrees}°`;
    case 'flip':   return 'flip ↕';
    case 'flop':   return 'flop ↔';
  }
}

export default function TransformGeoNode(props: NodeProps<TransformGeoFlowNode>) {
  const { id, data, selected } = props;
  const getImageUrl = useImageUrl();

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const firstImage = liveStep?.images?.[0] ?? null;
  const ops = data.operations ?? [];

  const opsPreview = ops.length > 0
    ? ops.map(opLabel).join('  ›  ')
    : null;

  const body = firstImage ? (
    <img
      src={getImageUrl(firstImage.imageId)}
      alt="Transform output"
      className="w-full h-20 object-cover rounded border border-border bg-surface-inset block"
      data-testid="transform-geo-output-thumb"
    />
  ) : (
    <div
      className="w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary"
      data-testid="transform-geo-placeholder"
    >
      {opsPreview ?? 'No ops configured'}
    </div>
  );

  const footer = opsPreview ? (
    <span className="font-mono text-[11px] text-text-tertiary">{opsPreview}</span>
  ) : undefined;


  return (
    <BaseNode
      icon="↻"
      subtitle="image:transform"
      state={state}
      category={categoryFor('image:transform')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Transform node, ops: ${ops.length}, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !bottom-2 !top-auto`} />
    </BaseNode>
  );
}
