import { PipelineRow } from './PipelinesPage';
export interface UsePipelinesSelectionOptions {
    visibleRows: PipelineRow[];
    filteredIds: string[];
}
export interface UsePipelinesSelectionReturn {
    selectionMode: boolean;
    selected: Set<string>;
    allVisibleSelected: boolean;
    someVisibleSelected: boolean;
    selectAllRef: React.RefObject<HTMLInputElement | null>;
    handleToggleSelectMode: () => void;
    handleToggleSelect: (id: string, shiftKey?: boolean) => void;
    handleSelectAllFiltered: () => void;
    handleHeaderToggleAll: () => void;
    clearSelection: () => void;
    setSelectionMode: (v: boolean) => void;
}
export declare function usePipelinesSelection({ visibleRows, filteredIds, }: UsePipelinesSelectionOptions): UsePipelinesSelectionReturn;
//# sourceMappingURL=usePipelinesSelection.d.ts.map