import type { JudgmentResult } from './types';
export interface JudgmentResultViewerProps {
    result: JudgmentResult;
    /** Render the top-level verdict header. Default true. */
    showVerdict?: boolean;
    /** Render the per-criterion section. Default true. */
    showCriteria?: boolean;
    /** Render the model / token / cost footer. Default true. */
    showMetadata?: boolean;
    /** Render an expandable raw-model-text section. Default false. */
    showRawText?: boolean;
    className?: string;
}
/**
 * Top-level composite for a `JudgmentResult` — verdict header + per-criterion
 * scores + cost/latency/model footer. Drop into a
 * `pipeline.judge.scored` step's expanded view OR render standalone for
 * direct judgment exploration.
 *
 * Layout: stacked single column — the criteria list is the dense surface,
 * everything else is a thin wrapper. Embedding consumers can hide
 * sections via the `show*` flags.
 */
export declare function JudgmentResultViewer({ result, showVerdict, showCriteria, showMetadata, showRawText, className, }: JudgmentResultViewerProps): import("react/jsx-runtime").JSX.Element;
export default JudgmentResultViewer;
//# sourceMappingURL=JudgmentResultViewer.d.ts.map