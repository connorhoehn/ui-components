import { PipelineDefinition, PipelineRun } from '../../types/pipeline';
interface JsonDiffEntry {
    key: string;
    type: 'added' | 'removed' | 'changed' | 'unchanged';
    valueA?: string;
    valueB?: string;
}
export declare function computeJsonDiff(a: unknown, b: unknown): JsonDiffEntry[];
export interface DiffOutputViewerProps {
    runA: PipelineRun;
    runB: PipelineRun;
    def: PipelineDefinition | null;
}
export default function DiffOutputViewer({ runA, runB, def }: DiffOutputViewerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=DiffOutputViewer.d.ts.map