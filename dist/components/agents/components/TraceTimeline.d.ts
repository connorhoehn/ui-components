import type { TraceTimeline as TraceTimelineType, TraceSpan, SpanKind } from '../../../types/agents';
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
    /**
     * Bar geometry. `'time'` (default) places each bar on the trace's real time
     * axis, so gaps between bars show deliberation. `'duration'` starts every bar
     * at 0 and scales to the longest span, which ranks spans by cost alone.
     * Controlled when `onScaleChange` is given; otherwise this is the initial mode.
     */
    scale?: TraceScale;
    onScaleChange?: (scale: TraceScale) => void;
    /** Render the "By time / By duration" toggle in the header. Default false. */
    scaleToggle?: boolean;
    /**
     * Colour bars by pass/fail (`status === 'error'` -> danger, otherwise success)
     * instead of by span kind, and swap the legend for Passed / Failed.
     */
    colorByStatus?: boolean;
    /** Show durations in a fixed right-hand column instead of trailing the bar. */
    durationColumn?: boolean;
    /**
     * Error text for a failed span. Defaults to the span's `error.message`,
     * `errorMessage` or `error` attribute. Shown in the row tooltip and the
     * detail panel.
     */
    errorText?: (span: TraceSpan) => string | undefined;
}
export type TraceScale = 'time' | 'duration';
export declare function TraceTimeline({ trace, className, title, legendKinds, scale: scaleProp, onScaleChange, scaleToggle, colorByStatus, durationColumn, errorText, }: TraceTimelineProps): import("react").JSX.Element;
//# sourceMappingURL=TraceTimeline.d.ts.map