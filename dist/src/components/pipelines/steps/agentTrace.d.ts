import type { TraceTimeline as TraceTimelineType } from '../../../types/agents';
import type { AgentStepOutput, AgentToolCall } from '../../../types/pipeline';
/**
 * Duck-types a step output as an AgentStepOutput.
 *
 * The discriminator is `toolCalls` (array) plus a numeric `turns` — the two
 * fields no other step output in this project carries. `toolless` is NOT
 * used as the discriminator because it is legitimately `true` on the very
 * outputs we most want to render honestly.
 */
export declare function isAgentStepOutput(output: Record<string, unknown> | undefined | null): output is Record<string, unknown> & AgentStepOutput;
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
export declare function liveAgentOutputFromCalls(toolCalls: AgentToolCall[]): AgentStepOutput;
/**
 * Builds a TraceTimeline from an agent step's output.
 *
 * Returns a trace with exactly one span (the agent root) when the agent
 * used no tools — which is the honest rendering of a toolless step, and is
 * why the caller should still show the waterfall rather than hide it.
 */
export declare function traceFromAgentStepOutput(stepId: string, output: AgentStepOutput, bounds?: AgentTraceBounds): TraceTimelineType;
//# sourceMappingURL=agentTrace.d.ts.map