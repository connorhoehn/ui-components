import type { ReactNode } from 'react';
export type ProcedureStepStatus = 'done' | 'failed' | 'pending' | 'skipped';
export interface ProcedureStep {
    id: string;
    title: ReactNode;
    /** Longer instruction under the title. */
    body?: ReactNode;
    /** The latest outcome for this step. Absent: no run has reached a verdict — the number is shown. */
    status?: ProcedureStepStatus;
    /** A quiet line under the step — "Not reached in this run.", the failure reason. */
    note?: ReactNode;
}
export interface ProcedureStepsProps {
    steps: ProcedureStep[];
    /** Show step numbers. Default `true`. */
    numbered?: boolean;
    /** `sm` 13px text, 20px markers (an inspector); `md` (default) 14px, 24px markers (a record body). */
    size?: 'sm' | 'md';
    onSelectStep?: (id: string) => void;
    /** Shown when `steps` is empty. Default "No steps recorded". */
    emptyLabel?: string;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}
/** What each outcome marker says to a screen reader (and a host's legend). */
export declare const PROCEDURE_STEP_STATUS_LABELS: Record<ProcedureStepStatus, string>;
export declare function ProcedureSteps({ steps, numbered, size, onSelectStep, emptyLabel, className, 'aria-label': ariaLabel, 'data-testid': testId, }: ProcedureStepsProps): import("react").JSX.Element;
export default ProcedureSteps;
//# sourceMappingURL=ProcedureSteps.d.ts.map