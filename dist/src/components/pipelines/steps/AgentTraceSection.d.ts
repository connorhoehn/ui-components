import type { AgentStepOutput } from '../../../types/pipeline';
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
export declare function AgentTraceSection({ stepId, output, startedAt, completedAt, live, }: AgentTraceSectionProps): import("react").JSX.Element;
//# sourceMappingURL=AgentTraceSection.d.ts.map