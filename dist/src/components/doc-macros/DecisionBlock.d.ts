import { type Decision, type DecisionStatus } from './decisionText';
export interface DecisionBlockProps {
    decision: Decision;
    /** False in read/print, and for a reader without write access. */
    editable?: boolean;
    onStatusChange?: (status: DecisionStatus) => void;
    onSupersededBy?: (ref: string) => void;
    onRemove?: () => void;
    testId?: string;
}
export declare function DecisionBlock({ decision, editable, onStatusChange, onSupersededBy, onRemove, testId, }: DecisionBlockProps): import("react").JSX.Element;
export default DecisionBlock;
//# sourceMappingURL=DecisionBlock.d.ts.map