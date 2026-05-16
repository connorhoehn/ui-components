// frontend/src/components/pipelines/nodes/llm/LLMNode.tsx
//
// LLM node — 1 input (`in`), 2 outputs (`out`, `error`). Subtitle is the
// model name; body shows the first 2 lines of the user-prompt template;
// footer is an expandable response preview when `_llmResponse` is present.
// See PIPELINES_PLAN.md §5.2 / §7.3 / §18.4.4 / §19.12.

import { useState } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import BaseNode, { type NodeExecutionState } from '../BaseNode';
import type { LLMNodeData } from '../../../../types/pipeline';
import { useRetryFromStep, useLatestStepForNode } from '../../context/PipelineRunsContext';

interface LLMResponseInfo {
  response: string;
  tokensIn?: number;
  tokensOut?: number;
  /** True while tokens are actively arriving (tokensOut > 0 and step still running). */
  streaming?: boolean;
  /**
   * True between `pipeline.llm.stream.opened` and the first token. Distinct
   * from `streaming` — this is the open-but-no-tokens window and is the
   * visual signal that latency is being measured. Cleared as soon as the
   * first token lands.
   */
  streamOpening?: boolean;
}

type LLMData = LLMNodeData & {
  _state?: NodeExecutionState;
  _llmResponse?: LLMResponseInfo;
  _hasBreakpoint?: boolean;
  _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

type LLMFlowNode = Node<LLMData, 'llm'>;

function previewPrompt(template: string): string {
  if (!template || template.trim().length === 0) return 'Not configured';
  const lines = template.split('\n').slice(0, 2);
  const out = lines.join(' ').trim();
  return out.length > 120 ? `${out.slice(0, 117)}…` : out;
}

function ResponseFooter({ info }: { info: LLMResponseInfo }) {
  const [open, setOpen] = useState(false);

  const text = open
    ? info.response
    : info.response.length > 60 ? `${info.response.slice(0, 60)}…` : info.response;

  const showTokens = info.tokensIn != null || info.tokensOut != null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="bg-transparent border-none p-0 cursor-pointer font-inherit text-xs text-text-secondary font-medium text-left"
      >
        {open ? '▾' : '▸'} Response
        {showTokens && (
          <span className="ml-1.5 text-[11px] text-text-tertiary">
            {info.tokensIn ?? 0} → {info.tokensOut ?? 0} tokens
          </span>
        )}
        {info.streamOpening && (
          <span
            className="ml-1.5 text-[11px] text-[#2563eb]"
            data-testid="llm-stream-opening"
            title="LLM stream is open — waiting for the first token"
          >
            · stream open — waiting…
          </span>
        )}
        {!info.streamOpening && info.streaming && (
          <span className="ml-1.5 text-[11px] text-text-tertiary">· streaming…</span>
        )}
      </button>
      <div
        className={open
          ? 'mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words line-clamp-6'
          : 'mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words max-h-[1.4em] overflow-hidden'
        }
      >
        {text}
      </div>
    </div>
  );
}

export default function LLMNode(props: NodeProps<LLMFlowNode>) {
  const { id, data, selected } = props;

  // Runtime step state for this node — folded from the latest run that has
  // executed it (see useLatestStepForNode). Falls back to the static node
  // config when no run has touched this node yet, so editor view (no runs
  // triggered) renders as before.
  const liveStep = useLatestStepForNode(id);
  const liveState: NodeExecutionState | undefined =
    liveStep?.status === 'cancelled' ? 'failed' : (liveStep?.status as NodeExecutionState | undefined);
  const replayState = data._state && data._state !== 'idle' ? data._state : undefined;
  const state: NodeExecutionState = replayState ?? liveState ?? data._state ?? 'idle';

  // Build a runtime LLMResponseInfo from the live step.
  const liveLlm = liveStep?.llm;
  const isStreamOpening =
    state === 'running' &&
    liveLlm?.streamOpened === true &&
    (liveLlm?.tokensOut ?? 0) === 0;
  const isStreaming =
    state === 'running' &&
    liveLlm !== undefined &&
    (liveLlm.tokensOut ?? 0) > 0;

  // §17.6 retry-from-here — see TriggerNode for the rationale.
  const retry = useRetryFromStep();
  const onRetry = state === 'failed' ? () => retry(id) : undefined;

  const body = (
    <span className="italic">
      {previewPrompt(data.userPromptTemplate)}
    </span>
  );

  // Prefer the live response info when a run has touched this node; otherwise
  // fall back to whatever static `_llmResponse` was stamped on the data.
  const liveResponse: LLMResponseInfo | undefined = liveLlm
    ? {
        response: liveLlm.response ?? '',
        tokensIn: liveLlm.tokensIn,
        tokensOut: liveLlm.tokensOut,
        streaming: isStreaming,
        streamOpening: isStreamOpening,
      }
    : undefined;

  const responseInfo = liveResponse ?? data._llmResponse;
  const footer = responseInfo ? <ResponseFooter info={responseInfo} /> : undefined;

  // Build a descriptive aria-label for screen readers
  const sys = (data.systemPrompt ?? '').replace(/\s+/g, ' ').trim();
  const sysPreview = sys.length === 0
    ? 'no system prompt'
    : `system prompt: ${sys.length > 60 ? `${sys.slice(0, 60)}…` : sys}`;
  const ariaLabel = `LLM node, ${data.model || data.provider}, ${sysPreview}, state: ${state}`;

  return (
    <BaseNode
      icon="🧠"
      subtitle={data.model || data.provider}
      state={state}
      body={body}
      footer={footer}
      selected={selected}
      onRetry={onRetry}
      ariaLabel={ariaLabel}
      hasBreakpoint={data._hasBreakpoint}
      pausedAtBreakpoint={data._pausedAtBreakpoint}
    >
      <Handle type="target" position={Position.Left}  id="in"    className="!bg-slate-300 !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Right} id="out"   className="!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" />
      <Handle type="source" position={Position.Right} id="error" className="!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" />
    </BaseNode>
  );
}
