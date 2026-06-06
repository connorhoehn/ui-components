// src/components/pipelines/nodes/image-source/ImageSourceNode.tsx
//
// image-source node — injects an existing image into the pipeline context.
// Body shows a placeholder; no processing, just a source.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { ImageSourceNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { useImageUrl } from '../../services';
import { cn } from '../../../../lib/cn';

type ImageSourceData = ImageSourceNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type ImageSourceFlowNode = Node<ImageSourceData, 'image-source'>;

export default function ImageSourceNode(props: NodeProps<ImageSourceFlowNode>) {
  const { id, data, selected } = props;

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const getImageUrl = useImageUrl();
  const imageId = data.imageId;

  const body = imageId ? (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={getImageUrl(imageId)}
      alt="Source image"
      className={cn(
        'w-full h-20 object-cover rounded block',
        'border border-[#d1d5db] bg-[#f3f4f6]',
      )}
      data-testid="image-source-thumb"
    />
  ) : (
    <div
      className={cn(
        'w-full h-20 rounded flex items-center justify-center',
        'border border-dashed border-[#d1d5db] bg-[#f3f4f6]',
        'text-[11px] text-[#6b7280]',
      )}
      data-testid="image-source-placeholder"
    >
      No image configured
    </div>
  );

  const footer = imageId ? (
    <span className="font-mono text-[11px] text-[#6b7280]">
      {imageId.slice(0, 16)}&hellip;
    </span>
  ) : undefined;

  return (
    <BaseNode
      icon="🖼"
      subtitle="image-source"
      state={state}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={`Image Source node, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        className="!w-2.5 !h-2.5 !bg-[#6b7280]"
      />
    </BaseNode>
  );
}
