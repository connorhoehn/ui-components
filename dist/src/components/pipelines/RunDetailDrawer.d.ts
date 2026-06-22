import { PipelineRun } from '../../types/pipeline';
export interface RunDetailDrawerProps {
    pipelineId: string;
    run: PipelineRun;
    onBack: () => void;
}
export default function RunDetailDrawer({ pipelineId, run, onBack }: RunDetailDrawerProps): import("react").JSX.Element;
//# sourceMappingURL=RunDetailDrawer.d.ts.map