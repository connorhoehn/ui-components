import { StepContextSnapshot } from './useContextSnapshots';
export interface ContextStepListProps {
    snapshots: StepContextSnapshot[];
    activeStepId: string | null;
    /** The snapshot that is currently displayed (fallback when activeStepId is null). */
    fallbackActiveStepId?: string;
    onStepSelect?: (stepId: string) => void;
}
export declare function ContextStepList({ snapshots, activeStepId, fallbackActiveStepId, onStepSelect, }: ContextStepListProps): import("react").JSX.Element;
//# sourceMappingURL=ContextStepList.d.ts.map