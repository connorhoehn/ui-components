// src/components/pipelines/steps/AgentTraceSection.tsx
//
// The run-detail rendering of an `agent` step: the final text, an honest
// header, and the tool-call waterfall.
//
// The waterfall is ui-components' `TraceTimeline` — the span renderer that
// already existed with 11 passing unit tests and zero consumers. This is
// its first real data. We adapt (agentTrace.ts), we do not fork.
//
// The header is deliberately blunt about two things the raw JSON hides:
//   - `toolless` — the agent ran with no tools at all, i.e. it was an
//     expensive completion. Saying "0 tools" in small grey text is not
//     enough; it gets its own warning-token badge.
//   - `stopReason` — 'max_turns' and 'timeout' mean the agent was CUT OFF
//     mid-task, and its final text is therefore partial. A run that hit a
//     ceiling must not read like a run that finished.
//
// LIVE MODE (`live` prop): while the agent step is still running, the
// caller feeds a partial output synthesized from streamed
// `pipeline.step.agent.tool` events (StepExecution.agentLive). In this
// mode the header says "running" instead of a stop reason, turn/model
// badges are shown only when known, and a 1s tick keeps in-flight bars
// growing toward `now` (agentTrace measures open calls against the
// injectable clock). When the step completes, the persisted output takes
// over and this component renders exactly as before.

import { useEffect, useState } from 'react';
// Relative import into the local agents module — never the package name
// ('@connorhoehn/ui-components/agents'), which would be a self-import.
import { TraceTimeline } from '../../agents/components/TraceTimeline';
import { cn } from '../../../lib/cn';
import type { AgentStepOutput, AgentStopReason } from '../../../types/pipeline';
import { StepSection } from './StepSection';
import { proseBlockClass } from './stepStyles';
import { traceFromAgentStepOutput } from './agentTrace';

export interface AgentTraceSectionProps {
  stepId: string;
  output: AgentStepOutput;
  /** ISO — the step's own start; bounds the trace when no tools ran. */
  startedAt?: string;
  /** ISO — the step's own end. */
  completedAt?: string;
  /**
   * True while the step is still executing and `output` is a live partial
   * (streamed tool events, no final text/stopReason yet).
   */
  live?: boolean;
}

/** Base badge shape; callers add the token colour pair. */
const badgeBase =
  'text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap';

/**
 * Warning = bounded-breach, danger = failure, success = clean finish.
 *
 * Design tokens, not hex: this section renders inside the run detail in
 * both themes, and a literal `#fef3c7` amber is unreadable on the dark
 * surface. `bg-*-bg` / `text-*-fg` are the paired tokens that flip.
 */
const STOP_REASON_STYLE: Record<AgentStopReason, { className: string; label: string }> = {
  complete:  { className: 'bg-success-bg text-success-fg', label: 'complete' },
  max_turns: { className: 'bg-warning-bg text-warning-fg', label: 'cut off: max turns' },
  timeout:   { className: 'bg-warning-bg text-warning-fg', label: 'cut off: timeout' },
  error:     { className: 'bg-danger-bg text-danger-fg',   label: 'error' },
  cancelled: { className: 'bg-surface-hover text-text-secondary', label: 'cancelled' },
};

/** 1s re-render tick while `active` — keeps in-flight bars honest. */
function useClockTick(active: boolean): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [active]);
  return now;
}

export function AgentTraceSection({
  stepId,
  output,
  startedAt,
  completedAt,
  live = false,
}: AgentTraceSectionProps) {
  const hasInFlight = (output.toolCalls ?? []).some((c) => !c.endedAt);
  const now = useClockTick(live || hasInFlight);
  const trace = traceFromAgentStepOutput(stepId, output, { startedAt, completedAt, now, live });
  const callCount = output.toolCalls?.length ?? 0;
  const failedCalls = (output.toolCalls ?? []).filter((c) => c.endedAt && !c.ok).length;
  const stop = STOP_REASON_STYLE[output.stopReason] ?? STOP_REASON_STYLE.error;

  return (
    <StepSection title="Agent">
      {/* Honest header — turns, tools, and how it stopped (or that it hasn't). */}
      <div
        data-testid="agent-summary"
        className="flex flex-wrap items-center gap-2 mb-2.5"
      >
        {output.model && (
          <span className={cn(badgeBase, 'bg-accent-bg text-accent-fg')}>{output.model}</span>
        )}
        {(!live || output.turns > 0) && (
          <span className={cn(badgeBase, 'bg-surface-hover text-text-secondary')}>
            {output.turns} turn{output.turns === 1 ? '' : 's'}
          </span>
        )}
        {output.toolless && !live ? (
          <span
            data-testid="agent-toolless-badge"
            className={cn(badgeBase, 'bg-warning-bg text-warning-fg')}
          >
            no tools — ran as a plain completion (toolless)
          </span>
        ) : (
          <span
            data-testid="agent-toolcall-count"
            className={cn(badgeBase, 'bg-surface-hover text-text-secondary')}
          >
            {callCount} tool call{callCount === 1 ? '' : 's'}
          </span>
        )}
        {failedCalls > 0 && (
          <span
            data-testid="agent-failed-calls"
            className={cn(badgeBase, 'bg-danger-bg text-danger-fg')}
          >
            {failedCalls} failed
          </span>
        )}
        {live ? (
          <span
            data-testid="agent-live-badge"
            className={cn(badgeBase, 'bg-info-bg text-info-fg')}
          >
            running — trace streaming
          </span>
        ) : (
          <span data-testid="agent-stop-reason" className={cn(badgeBase, stop.className)}>
            {stop.label}
          </span>
        )}
      </div>

      {/* Tool-call waterfall — ui-components TraceTimeline, real data. */}
      <div data-testid="agent-trace">
        {callCount === 0 ? (
          <div className="px-3 py-2.5 border border-border rounded-lg text-[12px] text-text-secondary bg-surface-inset">
            {live
              ? 'No tool calls yet — the agent is thinking.'
              : 'No tool calls — nothing to trace. The agent produced its answer from the prompt alone.'}
          </div>
        ) : (
          // `agent` and `tool` are the only kinds this adapter can emit, so
          // the legend is narrowed to those two — showing swatches for
          // Retrieval / Guardrail / LLM here would advertise data that can
          // never appear (`legendKinds`).
          <TraceTimeline trace={trace} title="Tool calls" legendKinds={['agent', 'tool']} />
        )}
      </div>

      {/* Final text. Labelled as partial when the agent was cut off. */}
      {output.text && (
        <div className="mt-3">
          <div className="text-[11px] font-semibold text-text-secondary mb-1">
            {output.stopReason === 'complete' ? 'Final response' : 'Partial response'}
          </div>
          <div data-testid="agent-text" className={proseBlockClass}>
            {output.text}
          </div>
        </div>
      )}
    </StepSection>
  );
}
