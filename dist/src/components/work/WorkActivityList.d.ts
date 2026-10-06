import type { ReactNode } from 'react';
export type WorkActivityKind = 'status' | 'run' | 'estimate' | 'comment' | 'system';
export interface WorkActivityEvent {
    id: string;
    kind: WorkActivityKind;
    /** ISO time, epoch ms, or Date. */
    at: string | number | Date;
    /** "Status changed from Open to In progress". Already worded by the host. */
    text: string;
    /** Who did it; absent for machine events. */
    actor?: string | null;
    /** A short trailing fact — "$0.18", "failed", "PR #42". */
    detail?: ReactNode;
    /** Opens the thing the event is about (a run, a PR). */
    onOpen?: () => void;
    href?: string;
    openLabel?: string;
}
export interface WorkActivityListProps {
    title?: string;
    events: WorkActivityEvent[];
    /** Clock for relative times (ms since epoch). Default Date.now(). */
    now?: number;
    emptyLabel?: string;
    loading?: boolean;
    /** Shown instead of the list when the history could not be read. */
    error?: string | null;
    first?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function WorkActivityList({ title, events, now, emptyLabel, loading, error, first, className, 'data-testid': testId, }: WorkActivityListProps): import("react").JSX.Element;
export default WorkActivityList;
//# sourceMappingURL=WorkActivityList.d.ts.map