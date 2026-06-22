import { PipelineDefinition, PipelineRun } from '../../types/pipeline';
type DiffPart = {
    type: 'eq' | 'add' | 'del';
    text: string;
};
export declare function wordDiff(a: string, b: string): DiffPart[];
export interface CompareStepMatrixProps {
    runA: PipelineRun;
    runB: PipelineRun;
    def: PipelineDefinition | null;
}
export default function CompareStepMatrix({ runA, runB, def }: CompareStepMatrixProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=CompareStepMatrix.d.ts.map