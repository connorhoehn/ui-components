import { DateRangeKey, StatusKey, TriggerKindKey } from './runsUtils';
export interface RunsFilterBarProps {
    query: string;
    statuses: ReadonlySet<StatusKey>;
    triggerKinds: ReadonlySet<TriggerKindKey>;
    range: DateRangeKey;
    onQueryChange: (q: string) => void;
    onStatusToggle: (s: StatusKey) => void;
    onTriggerToggle: (k: TriggerKindKey) => void;
    onRangeChange: (r: DateRangeKey) => void;
    onClearFilters: () => void;
}
export default function RunsFilterBar({ query, statuses, triggerKinds, range, onQueryChange, onStatusToggle, onTriggerToggle, onRangeChange, onClearFilters, }: RunsFilterBarProps): import("react").JSX.Element;
//# sourceMappingURL=RunsFilterBar.d.ts.map