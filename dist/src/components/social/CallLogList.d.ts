export interface CallLogEntry {
    id: string;
    who: string;
    /** "Incoming", "Outgoing", "Room" … */
    direction: string;
    /** "Answered", "Missed", "Declined" … */
    outcome: string;
    missed: boolean;
    startedAt: string;
    /** Already formatted ("4m 12s"). */
    duration: string;
}
export interface CallLogListProps {
    rows: readonly CallLogEntry[];
    onCallBack?: (row: CallLogEntry) => void;
    /** Label per row for the action ("Call back", "Open room"). */
    callBackLabel?: (row: CallLogEntry) => string;
    callBackDisabled?: boolean;
    formatWhen?: (iso: string) => string;
    /** Initial filter. */
    defaultFilter?: 'all' | 'missed';
    className?: string;
    'data-testid'?: string;
}
export declare function CallLogList({ rows, onCallBack, callBackLabel, callBackDisabled, formatWhen, defaultFilter, className, 'data-testid': testId, }: CallLogListProps): import("react").JSX.Element;
export default CallLogList;
//# sourceMappingURL=CallLogList.d.ts.map