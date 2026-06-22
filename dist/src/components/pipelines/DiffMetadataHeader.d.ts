import { PipelineRun } from '../../types/pipeline';
export interface DiffMetadataHeaderProps {
    runA: PipelineRun;
    runB: PipelineRun;
    costA: string;
    costB: string;
}
export default function DiffMetadataHeader({ runA, runB, costA, costB, }: DiffMetadataHeaderProps): import("react").JSX.Element;
//# sourceMappingURL=DiffMetadataHeader.d.ts.map