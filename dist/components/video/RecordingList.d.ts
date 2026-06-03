import type { ReactNode } from 'react';
import { type RecordingStatus } from './RecordingRow';
export interface RecordingListItem {
    id: string;
    startIso: string;
    endIso: string;
    durationSec: number;
    participantCount?: number;
    thumbnailUrl?: string;
    /** Optional human label — e.g. "Hank & Alice" or "Global hangout". */
    label?: string;
    /** Defaults to 'ready'. Forwarded to RecordingRow. */
    status?: RecordingStatus;
}
export interface RecordingListProps {
    recordings: RecordingListItem[];
    selectedId?: string;
    onSelect: (id: string) => void;
    loading?: boolean;
    emptyState?: ReactNode;
    /** Render a per-row actions slot (e.g. download/share buttons). */
    renderActions?: (item: RecordingListItem) => ReactNode;
    className?: string;
}
export declare function RecordingList({ recordings, selectedId, onSelect, loading, emptyState, renderActions, className, }: RecordingListProps): import("react/jsx-runtime").JSX.Element;
export default RecordingList;
//# sourceMappingURL=RecordingList.d.ts.map