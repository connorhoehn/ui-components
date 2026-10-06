export interface WorkflowStep {
    step: number;
    label: string;
    done: boolean;
    active: boolean;
}
export interface WorkflowStepperProps {
    steps: WorkflowStep[];
    size?: 'sm' | 'md';
    className?: string;
    'data-testid'?: string;
}
export declare function WorkflowStepper({ steps, size, className, 'data-testid': testId }: WorkflowStepperProps): import("react").JSX.Element;
export default WorkflowStepper;
//# sourceMappingURL=WorkflowStepper.d.ts.map