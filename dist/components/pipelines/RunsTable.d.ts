import type { PipelineRun } from '../../types/pipeline';
export interface RunsTableProps {
    filtered: PipelineRun[];
    selected: Set<string>;
    /** Called with the new full selection set after any selection change. */
    onSelectionChange: (next: Set<string>) => void;
    comparePair: string[];
    onToggleComparePair: (runId: string) => void;
    costByRunId: Record<string, string>;
    pipelineId: string;
    onNavigate: (path: string) => void;
    onOpenRetryModal: (run: PipelineRun) => void;
}
export default function RunsTable({ filtered, selected, onSelectionChange, comparePair, onToggleComparePair, costByRunId, pipelineId, onNavigate, onOpenRetryModal, }: RunsTableProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RunsTable.d.ts.map