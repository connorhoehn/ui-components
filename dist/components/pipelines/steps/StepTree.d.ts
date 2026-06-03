import type { NodeType, PipelineEdge, StepExecution } from '../../../types/pipeline';
export interface StepTreeProps {
    steps: Record<string, StepExecution>;
    nodeDataMap: Record<string, {
        type: NodeType;
        data: Record<string, unknown>;
    }>;
    edges?: PipelineEdge[];
    onRetryFromStep?: (stepId: string) => void;
    onResumeFromStep?: (stepId: string) => void;
}
export interface StepTreeNode {
    stepId: string;
    step: StepExecution;
    branch?: string;
    children: StepTreeNode[];
}
export declare function StepTree({ steps, nodeDataMap, edges, onRetryFromStep, onResumeFromStep }: StepTreeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=StepTree.d.ts.map