// src/components/pipelines/nodes/vision-describe/VisionDescribeNode.tsx
//
// image:vision-describe node — generates image caption via Haiku.
// Body shows first 80 chars of caption once output lands.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageVisionDescribeNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';

type VisionDescribeData = ImageVisionDescribeNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type VisionDescribeFlowNode = Node<VisionDescribeData, 'image:vision-describe'>;

type DescribeOutput = { extracted?: { caption?: string } };

export default function VisionDescribeNode(props: NodeProps<VisionDescribeFlowNode>) {
  const { id, data, selected } = props;

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const output = liveStep?.output as DescribeOutput | undefined;
  const caption = output?.extracted?.caption;

  const captionPreview = caption
    ? caption.length > 80 ? `${caption.slice(0, 77)}…` : caption
    : null;

  const promptPreview = data.userPrompt
    ? data.userPrompt.length > 60 ? `${data.userPrompt.slice(0, 57)}…` : data.userPrompt
    : 'No prompt set';

  const body = captionPreview ? (
    <span
      className="text-[11px] text-text-primary leading-snug"
      data-testid="describe-caption"
    >
      {captionPreview}
    </span>
  ) : (
    <span className="text-[11px] text-text-tertiary italic">
      {promptPreview}
    </span>
  );

  const model = data.model ?? 'claude-haiku-4-5';

  return (
    <BaseNode
      icon="💬"
      subtitle={model}
      state={state}
      category={categoryFor('image:vision-describe')}
      body={body}
      selected={selected}
      ariaLabel={`Vision Describe node, model: ${model}, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !bottom-2 !top-auto`} />
    </BaseNode>
  );
}
