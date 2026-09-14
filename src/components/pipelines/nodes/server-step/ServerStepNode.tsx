// ui-components/src/components/pipelines/nodes/server-step/ServerStepNode.tsx
//
// The card for a step kind the editor has no dedicated component for.
//
// A host registers its own step kinds with the executor and writes them
// straight into `node.type` — platform-api's `recording:resolve`,
// `transcription:transcribe`, `document:apply` — and ships those definitions
// to the editor. React Flow rendered them with its bare `default` node: a
// grey box with no ports, so every edge into or out of one failed to
// resolve ("Couldn't create edge for target handle id: in") and a published,
// running pipeline drew as a row of disconnected boxes.
//
// A consumer-registered kind is a plain step: one input, a success and a
// failure output. That is what every such kind in platform-api is and what
// the executor assumes of them. This card draws exactly that, names the kind
// on its face, and takes the same live/replay state as every other card.
//
// A host mounts it under the key its canvas maps unknown types to; the
// definition keeps the real kind in `data.type` (and `data.nodeType`), which
// is what the subtitle reads.

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import { portCls } from '../shared/ports';
import { useRetryFromStepIfWired, useLatestStepForNode } from '../../context/PipelineRunsContext';

export interface ServerStepNodeData extends Record<string, unknown> {
  /** The consumer-registered kind, e.g. `transcription:transcribe`. */
  type?: string;
  /** The canvas's copy of the kind; read when `type` is absent. */
  nodeType?: string;
  label?: string;
  /** A step the executor may skip without failing the run. */
  optional?: boolean;
  _state?: NodeExecutionState;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
}

type ServerStepFlowNode = Node<ServerStepNodeData, string>;

/** `transcription:transcribe` → `transcription`, the namespace the kind lives in. */
export function serverStepNamespace(kind: string): string | undefined {
  const i = kind.indexOf(':');
  return i > 0 ? kind.slice(0, i) : undefined;
}

export default function ServerStepNode(props: NodeProps<ServerStepFlowNode>) {
  const { id, data, selected } = props;
  const kind = data.type ?? data.nodeType ?? 'step';
  const liveStep = useLatestStepForNode(id);
  const liveState = liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  const retry = useRetryFromStepIfWired();
  const onRetry = state === 'failed' && retry ? () => retry(id) : undefined;

  return (
    <BaseNode
      icon="⚙"
      subtitle={kind}
      state={state}
      // No `nodeType`: BaseNode uses it to mark a kind the HOST's executor has
      // no handler for ("Preview — no executor"). A server step is by
      // definition executed elsewhere, so that badge would be a lie on every
      // one of them.
      body={
        <span data-testid="server-step-label">
          {data.label ?? kind}
          {data.optional ? <span className="ml-1 text-text-tertiary">(optional)</span> : null}
        </span>
      }
      ariaLabel={`${kind} step${data.label ? `, ${data.label}` : ''}, ${state}`}
      selected={selected}
      onRetry={onRetry}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className={portCls('data')} />
      <Handle type="source" position={Position.Right} id="out"   className={`${portCls('data')} !top-[40%]`} />
      <Handle type="source" position={Position.Right} id="error" className={`${portCls('error')} !top-[60%]`} />
    </BaseNode>
  );
}
