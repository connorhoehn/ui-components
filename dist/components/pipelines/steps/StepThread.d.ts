import type { StepExecution } from '../../../types/pipeline';
export interface StepThreadProps {
    stepId: string;
    step: StepExecution;
    index: number;
    nodeType: string;
    nodeConfig?: Record<string, unknown>;
    onRetryFromStep?: (stepId: string) => void;
    onResumeFromStep?: (stepId: string) => void;
}
export declare function StepThread({ stepId, step, index, nodeType, nodeConfig, onRetryFromStep, onResumeFromStep }: StepThreadProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=StepThread.d.ts.map