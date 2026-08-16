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
 * Raw text resolution order (when `showRawText` is true):
 *   1. `result.rawModelText` (inline body) — shown immediately
 *   2. `result.rawTextTruncated && <JudgmentApiProvider>` is mounted —
 *      "Show raw" triggers a lazy fetch via `api.fetchRawText(judgmentId)`
 *   3. Neither — show "raw output unavailable" message
 *
 * The viewer never knows about URLs or fetch impls; the provider does.
 */
export declare function JudgmentResultViewer({ result, showVerdict, showCriteria, showMetadata, showRawText, className, }: JudgmentResultViewerProps): import("react").JSX.Element;
export default JudgmentResultViewer;
//# sourceMappingURL=JudgmentResultViewer.d.ts.map