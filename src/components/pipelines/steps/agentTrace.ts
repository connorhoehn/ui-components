// src/components/pipelines/steps/agentTrace.ts
//
// Adapts an `agent` step's persisted output into the shape ui-components'
// `TraceTimeline` already renders.
//
// Why an adapter and not a second waterfall: TraceTimeline is a real,
// tested span-waterfall that until now had zero consumers and was driven
// entirely by hardcoded fixtures. `AgentStepOutput.toolCalls[]` is the
// first real trace data this project has produced, so the job here is
// translation, not reimplementation.
//
// Translation rules:
//   - One synthetic ROOT span of kind 'agent' spans the whole step. It is
//     what gives every tool bar something to be positioned against, since
//     TraceTimeline lays bars out relative to `trace.startedAt` and
//     `trace.totalDurationMs`.
//   - One 'tool' span per AgentToolCall, parented to the root.
//   - A call with no `endedAt` is IN FLIGHT, not zero-length: it gets
//     status 'unset' and is measured up to `now` so a running agent's
//     current tool is visible rather than invisible.
//   - `ok: false` maps to status 'error'; the error message rides along in
//     the span attributes, which TraceTimeline shows in its detail panel.

// Relative import into the local agents module — never the package name
// ('@connorhoehn/ui-components/agents'), which would be a self-import.
import type { TraceSpan, TraceTimeline as TraceTimelineType } from '../../../types/agents';
import type { AgentStepOutput, AgentToolCall } from '../../../types/pipeline';

/**
 * Duck-types a step output as an AgentStepOutput.
 *
 * The discriminator is `toolCalls` (array) plus a numeric `turns` — the two
 * fields no other step output in this project carries. `toolless` is NOT
 * used as the discriminator because it is legitimately `true` on the very
 * outputs we most want to render honestly.
 */
export function isAgentStepOutput(
  output: Record<string, unknown> | undefined | null,
): output is Record<string, unknown> & AgentStepOutput {
  if (!output) return false;
  return (
    Array.isArray((output as { toolCalls?: unknown }).toolCalls) &&
    typeof (output as { turns?: unknown }).turns === 'number' &&
    typeof (output as { text?: unknown }).text === 'string'
  );
}

/** Truncated, single-line rendering of a tool payload for span attributes. */
function summarize(value: unknown, max = 160): string {
  if (value == null) return '';
  const raw = typeof value === 'string' ? value : JSON.stringify(value);
  if (!raw) return '';
  const flat = raw.replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

function ms(iso: string | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  return Number.isFinite(t) ? t : null;
}

export interface AgentTraceBounds {
  /** ISO — the step's own start, used when the agent made no tool calls. */
  startedAt?: string;
  /** ISO — the step's own end. */
  completedAt?: string;
  /** Injectable clock, so in-flight spans are testable. Defaults to Date.now. */
  now?: number;
  /**
   * The step is still executing and `output` is a streamed partial: the
   * root span is open-ended (status 'unset', measured to `now`) and named
   * as running rather than pretending a stop reason exists yet.
   */
  live?: boolean;
}

/**
 * Synthesizes a partial `AgentStepOutput` from the live tool-call stream
 * (`StepExecution.agentLive.toolCalls`) so the same trace adapter and
 * section component render mid-run. The filler fields are deliberately
 * neutral: no text yet, turns unknown (0), and `stopReason: 'cancelled'`
 * is never shown — the live UI replaces the stop-reason badge entirely.
 * On completion the persisted output replaces this synthesis; `callIndex`
 * (array position) is the correlation key, so the two views agree.
 */
export function liveAgentOutputFromCalls(toolCalls: AgentToolCall[]): AgentStepOutput {
  return {
    text: '',
    turns: 0,
    toolCalls,
    model: '',
    tokensIn: 0,
    tokensOut: 0,
    stopReason: 'cancelled',
    toolless: false,
  };
}

/**
 * Builds a TraceTimeline from an agent step's output.
 *
 * Returns a trace with exactly one span (the agent root) when the agent
 * used no tools — which is the honest rendering of a toolless step, and is
 * why the caller should still show the waterfall rather than hide it.
 */
export function traceFromAgentStepOutput(
  stepId: string,
  output: AgentStepOutput,
  bounds: AgentTraceBounds = {},
): TraceTimelineType {
  const now = bounds.now ?? Date.now();
  const calls: AgentToolCall[] = Array.isArray(output.toolCalls) ? output.toolCalls : [];

  const callStarts = calls.map((c) => ms(c.startedAt)).filter((n): n is number => n != null);
  const callEnds = calls
    .map((c) => ms(c.endedAt) ?? (ms(c.startedAt) != null ? now : null))
    .filter((n): n is number => n != null);

  const stepStart = ms(bounds.startedAt);
  const stepEnd = ms(bounds.completedAt);

  const start = Math.min(...[stepStart, ...callStarts].filter((n): n is number => n != null), now);
  // Live traces are open-ended: the root keeps growing toward `now` even
  // when every tool call so far has already closed (the agent is thinking).
  const end = Math.max(
    ...[stepEnd, ...callEnds, bounds.live ? now : null].filter((n): n is number => n != null),
    start,
  );
  const totalDurationMs = Math.max(end - start, 0);

  const traceId = `agent-${stepId}`;
  const rootSpanId = `${traceId}-root`;

  const rootSpan: TraceSpan = {
    traceId,
    spanId: rootSpanId,
    name: bounds.live
      ? 'agent loop · running'
      : `agent loop · ${output.turns} turn${output.turns === 1 ? '' : 's'}`,
    kind: 'agent',
    startTime: new Date(start).toISOString(),
    endTime: new Date(end).toISOString(),
    durationMs: totalDurationMs,
    status:
      bounds.live ? 'unset'
      : output.stopReason === 'complete' ? 'ok'
      : output.stopReason === 'cancelled' ? 'unset'
      : 'error',
    attributes: {
      model: output.model,
      turns: output.turns,
      stopReason: output.stopReason,
      toolCalls: calls.length,
      toolless: output.toolless,
      tokensIn: output.tokensIn,
      tokensOut: output.tokensOut,
    },
  };

  const toolSpans: TraceSpan[] = calls.map((call, i) => {
    const s = ms(call.startedAt) ?? start;
    const e = ms(call.endedAt) ?? now;
    const attributes: Record<string, string | number | boolean> = {
      ok: call.ok,
      callIndex: i,
    };
    const input = summarize(call.input);
    if (input) attributes.input = input;
    const out = summarize(call.output);
    if (out) attributes.output = out;
    if (call.error) attributes.error = call.error;
    if (!call.endedAt) attributes.inFlight = true;

    return {
      traceId,
      spanId: `${traceId}-tool-${i}`,
      parentSpanId: rootSpanId,
      name: call.name,
      kind: 'tool',
      startTime: new Date(s).toISOString(),
      endTime: new Date(e).toISOString(),
      durationMs: Math.max(e - s, 0),
      status: !call.endedAt ? 'unset' : call.ok ? 'ok' : 'error',
      attributes,
    };
  });

  return {
    traceId,
    rootSpanId,
    spans: [rootSpan, ...toolSpans],
    totalDurationMs,
    agentId: output.model,
    startedAt: new Date(start).toISOString(),
  };
}
