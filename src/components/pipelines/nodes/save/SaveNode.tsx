// src/components/pipelines/nodes/save/SaveNode.tsx
//
// Image save node — writes a produced image to a named file in the artifact
// store. Dispatched server-side by platform-api's SaveStepHandler.
//
// Body: NodeThumbStrip over ALL saved artifacts (with built-in lightbox)
// + filename badge when resolved. Falls back to placeholder.
// Footer: filename template summary.
// Icon: down-arrow (save/download).

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ImageSaveNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';
import { cn } from '../../../../lib/cn';
import { NodeThumbStrip } from '../shared/NodeThumbStrip';

type SaveData = ImageSaveNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type SaveFlowNode = Node<SaveData, 'image:save'>;

export default function SaveNode(props: NodeProps<SaveFlowNode>) {
  const { id, data, selected } = props;

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const producedImages = liveStep?.images ?? [];

  // The step output may carry the resolved filename.
  type StepOutput = { filename?: string } | undefined;
  const stepOutput = liveStep?.output as StepOutput;
  const resolvedFilename = stepOutput?.filename ?? null;

  const body = producedImages.length > 0 ? (
    <div>
      {/* Saved artifacts — all of them; the strip owns lightbox + propagation guards. */}
      <NodeThumbStrip images={producedImages} data-testid="save-thumb-strip" />
      {resolvedFilename && (
        <div
          className="mt-1 text-[10px] font-mono text-[#6b7280] overflow-hidden text-ellipsis whitespace-nowrap"
          data-testid="save-filename-badge"
          title={resolvedFilename}
        >
          {resolvedFilename}
        </div>
      )}
    </div>
  ) : (
    <div
      className={cn(
        'w-full h-20 rounded flex items-center justify-center',
        'border border-dashed border-[#d1d5db] bg-[#f3f4f6]',
        'text-[11px] text-[#6b7280]',
      )}
      data-testid="save-placeholder"
    >
      Awaiting input
    </div>
  );

  const template = data.filenameTemplate ?? 'crop-{{scatter.index}}.png';
  const truncated = template.length > 28 ? `${template.slice(0, 25)}…` : template;

  const footer = (
    <span
      className="font-mono text-[11px] text-[#6b7280]"
      data-testid="save-footer"
      title={template}
    >
      {truncated}
    </span>
  );

  const subtitle = 'image:save';
  const ariaLabel = `Save node, template: ${template}, state: ${state}`;

  return (
    <BaseNode
      icon="&#x2B07;"
      subtitle={subtitle}
      state={state}
      category={categoryFor('image:save')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={ariaLabel}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="in"
        className={portCls('image')}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        className={portCls('image')}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="error"
        className={`${portCls('error')} !top-[75%]`}
      />
    </BaseNode>
  );
}
