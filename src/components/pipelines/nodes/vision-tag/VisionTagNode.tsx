// src/components/pipelines/nodes/vision-tag/VisionTagNode.tsx
//
// image:vision-tag node — extracts ranked tags from image.
// Body shows top 5 tags as pills once output lands.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageVisionTagNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';

type VisionTagData = ImageVisionTagNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type VisionTagFlowNode = Node<VisionTagData, 'image:vision-tag'>;

type TagOutput = { extracted?: { tags?: string[] } };

export default function VisionTagNode(props: NodeProps<VisionTagFlowNode>) {
  const { id, data, selected } = props;

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const output = liveStep?.output as TagOutput | undefined;
  const tags = output?.extracted?.tags ?? [];
  const topTags = tags.slice(0, 5);

  const candidatePreview = (data.candidateTags ?? []).slice(0, 3).join(', ');

  const body = topTags.length > 0 ? (
    <div className="flex flex-wrap gap-1" data-testid="tag-pills">
      {topTags.map((tag) => (
        <span
          key={tag}
          className="inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap"
        >
          {tag}
        </span>
      ))}
    </div>
  ) : (
    <span className="text-[11px] text-text-tertiary italic">
      {candidatePreview ? `Candidates: ${candidatePreview}…` : 'Open-vocabulary tagging'}
    </span>
  );

  const model = data.model ?? 'claude-haiku-4-5';

  return (
    <BaseNode
      icon="🔖"
      subtitle={model}
      state={state}
      category={categoryFor('image:vision-tag')}
      body={body}
      selected={selected}
      ariaLabel={`Vision Tag node, model: ${model}, state: ${state}`}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('image')} />
      <Handle type="source" position={Position.Right} id="out"   className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !bottom-2 !top-auto`} />
    </BaseNode>
  );
}
