// src/components/pipelines/nodes/scatter/ScatterNode.tsx
//
// Scatter node — fans out execution over an array in context, spawning
// one arm per item. Dispatched server-side by platform-api's ScatterStepHandler.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { categoryFor } from '../categories';
import { portCls } from '../shared/ports';
import type { ScatterNodeData } from '../../../../types/pipeline';
import { useLatestStepForNode } from '../../context/PipelineRunsContext';

type ScatterData = ScatterNodeData & {
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type ScatterFlowNode = Node<ScatterData, 'scatter'>;

function truncatePath(path: string): string {
  if (!path) return 'Not configured';
  return path.length > 40 ? `${path.slice(0, 37)}…` : path;
}

export default function ScatterNode(props: NodeProps<ScatterFlowNode>) {
  const { id, data, selected } = props;

  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const liveOutput = liveStep?.output as { items?: unknown[] } | undefined;
  const itemCount = Array.isArray(liveOutput?.items) ? liveOutput!.items.length : null;

  const body = (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[11px] text-text-secondary break-all">
        {truncatePath(data.itemsPath ?? '')}
      </span>
      {itemCount !== null && (
        <span className="text-[11px] text-text-tertiary">
          {itemCount} item{itemCount === 1 ? '' : 's'} resolved
        </span>
      )}
    </div>
  );

  const armsCount = itemCount;
  const footer =
    armsCount !== null && state !== 'idle' ? (
      <span className="inline-block text-[11px] font-semibold text-info-fg bg-info-bg border border-info rounded-full px-2 py-0.5">
        Dispatched {armsCount} arm{armsCount === 1 ? '' : 's'}
      </span>
    ) : undefined;

  const aliasSuffix = data.itemAlias ? ` · alias: ${data.itemAlias}` : '';
  const concurrencySuffix = data.maxConcurrency ? ` · max ${data.maxConcurrency}` : '';
  const subtitle = `scatter${aliasSuffix}${concurrencySuffix}`;
  const ariaLabel = `Scatter node, path: ${data.itemsPath ?? 'not set'}, state: ${state}`;


  return (
    <BaseNode
      icon="⑂"
      subtitle={subtitle}
      state={state}
      category={categoryFor('scatter')}
      body={body}
      footer={footer}
      selected={selected}
      ariaLabel={ariaLabel}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"  className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="out" className={portCls('control')} />
    </BaseNode>
  );
}
