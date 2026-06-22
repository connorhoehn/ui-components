import { JudgmentResult } from './types';
export interface CriteriaPanelProps {
    /** Subset of JudgmentResult — pass `result` directly OR pluck just what you need. */
    result: Pick<JudgmentResult, 'criteria' | 'rubricSnapshot'>;
    className?: string;
}
/**
 * Per-criterion rows: id + raw score + verdict chip + 0..1 gauge +
 * rationale. The rubric prompt sits inline so users can see the question
 * the model was answering without flipping tabs.
 */
export declare function CriteriaPanel({ result, className }: CriteriaPanelProps): import("react").JSX.Element | null;
export default CriteriaPanel;
//# sourceMappingURL=CriteriaPanel.d.ts.map