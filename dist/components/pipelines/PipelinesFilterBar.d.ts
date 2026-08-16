import type { RefObject } from 'react';
import type { StatusKey } from './PipelinesPage';
export type TriggerFilter = 'all' | 'manual' | 'document' | 'schedule' | 'webhook';
export type SortKey = 'updated' | 'name' | 'created';
export interface PipelinesFilterBarProps {
    search: string;
    onSearchChange: (v: string) => void;
    statusFilter: Set<StatusKey>;
    statusExplicit: boolean;
    onToggleStatusKey: (k: StatusKey) => void;
    triggerFilter: TriggerFilter;
    onTriggerFilterChange: (v: TriggerFilter) => void;
    sortKey: SortKey;
    onSortKeyChange: (v: SortKey) => void;
    allVisibleSelected: boolean;
    selectAllRef: RefObject<HTMLInputElement | null>;
    onHeaderToggleAll: () => void;
}
export default function PipelinesFilterBar({ search, onSearchChange, statusFilter, statusExplicit, onToggleStatusKey, triggerFilter, onTriggerFilterChange, sortKey, onSortKeyChange, allVisibleSelected, selectAllRef, onHeaderToggleAll, }: PipelinesFilterBarProps): import("react").JSX.Element;
//# sourceMappingURL=PipelinesFilterBar.d.ts.map