import type { PipelineDefinition, PipelineRun } from '../../types/pipeline';
export interface DiffStepTableProps {
    runA: PipelineRun;
    runB: PipelineRun;
    def: PipelineDefinition | null;
}
export default function DiffStepTable({ runA, runB, def }: DiffStepTableProps): import("react").JSX.Element;
//# sourceMappingURL=DiffStepTable.d.ts.map