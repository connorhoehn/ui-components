import type { TraceTimeline as TraceTimelineType, SpanKind } from '../../../types/agents';
export interface TraceTimelineProps {
    trace: TraceTimelineType;
    className?: string;
    /**
     * Header label. Defaults to 'Trace'.
     *
     * Exists because this component is no longer only a generic OTEL viewer:
     * a caller rendering one specific thing (an agent step's tool calls, say)
     * should be able to name it, rather than leaving a bare 'Trace' above a
     * waterfall the reader has to work out for themselves.
     */
    title?: string;
    /**
     * Span kinds to show in the legend. Defaults to all six.
     *
     * A caller whose traces can only ever contain two kinds should not
     * advertise six colored swatches — four of which can never appear —
     * because a legend entry with no possible referent reads as missing data.
     */
    legendKinds?: SpanKind[];
}
export declare function TraceTimeline({ trace, className, title, legendKinds }: TraceTimelineProps): import("react").JSX.Element;
//# sourceMappingURL=TraceTimeline.d.ts.map