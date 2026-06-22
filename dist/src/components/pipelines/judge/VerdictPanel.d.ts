import { JudgmentResult } from './types';
export interface VerdictPanelProps {
    /** Subset of JudgmentResult — pass `result` directly OR pluck just what you need. */
    result: Pick<JudgmentResult, 'overallScore' | 'overallVerdict' | 'overallPassed' | 'confidence' | 'rubricSnapshot' | 'model' | 'mode'>;
    className?: string;
}
/**
 * The header card for a `JudgmentResult` — overall score gauge + verdict
 * chip + rubric + model + mode metadata. Drop at the top of a
 * `JudgmentResultViewer` or use standalone alongside a CriteriaPanel.
 *
 * Label-prefix verdict tones ("PASS · …") follow the same color-blind-safe
 * convention the vision audit established for EditRecommendationsPanel.
 */
export declare function VerdictPanel({ result, className }: VerdictPanelProps): import("react").JSX.Element;
export default VerdictPanel;
//# sourceMappingURL=VerdictPanel.d.ts.map