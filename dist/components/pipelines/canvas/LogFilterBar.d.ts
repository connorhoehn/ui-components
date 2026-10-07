export type LogFilter = 'all' | 'errors' | 'approvals' | 'llm' | 'lifecycle';
export interface LogFilterBarProps {
    filter: LogFilter;
    onFilterChange: (filter: LogFilter) => void;
    statusLabel: string;
    rowCount: number;
    expanded: boolean;
    onToggleExpand: () => void;
    onExport: () => void;
    onClear: () => void;
    inFullscreen: boolean;
    onFullscreenToggle: () => void;
}
export default function LogFilterBar({ filter, onFilterChange, statusLabel, rowCount, expanded, onToggleExpand, onExport, onClear, inFullscreen, onFullscreenToggle, }: LogFilterBarProps): import("react").JSX.Element;
//# sourceMappingURL=LogFilterBar.d.ts.map