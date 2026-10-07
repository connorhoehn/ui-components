import type { NodeType, PipelineRun } from '../../types/pipeline';
export interface StepTimelineProps {
    run: PipelineRun;
    /** Map of nodeId -> NodeType from the pipeline definition. */
    nodeTypes?: Record<string, NodeType>;
    /** Called when user hovers a step bar — parent can highlight the canvas node. */
    onStepHover?: (stepId: string | null) => void;
    /** Called when user clicks a step bar — can drive context inspector selection. */
    onStepClick?: (stepId: string) => void;
}
export default function StepTimeline({ run, nodeTypes, onStepHover, onStepClick, }: StepTimelineProps): import("react").JSX.Element;
//# sourceMappingURL=StepTimeline.d.ts.map