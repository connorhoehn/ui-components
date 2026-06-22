import { PipelineRun } from '../../../types/pipeline';
export interface ExecutionTimelineProps {
    run: PipelineRun;
    onNodeClick?: (nodeId: string) => void;
}
export default function ExecutionTimeline({ run, onNodeClick }: ExecutionTimelineProps): import("react").JSX.Element;
//# sourceMappingURL=ExecutionTimeline.d.ts.map