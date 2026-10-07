import type { ReactNode } from 'react';
export interface CollaboratorRow {
    userId: string;
    name: string;
    avatarUrl?: string;
    color?: string;
    presence: 'online' | 'away' | 'offline';
    /** "Online", "Away", "Offline", "In a call"… */
    statusLabel: string;
    /** Disables the checkbox with this as the title (e.g. "You"). */
    disabledReason?: string;
}
export interface CollaboratorCheckListProps {
    /** Section label, e.g. "Document collaborators". Omit for none. */
    title?: string;
    rows: CollaboratorRow[];
    selected: string[];
    onToggle: (userId: string, next: boolean) => void;
    loading?: boolean;
    emptyLabel?: string;
    footnote?: ReactNode;
    className?: string;
    'data-testid'?: string;
    /** Rows are `<rowTestIdPrefix>-<userId>`. Default `start-call-collaborator`. */
    rowTestIdPrefix?: string;
}
export declare function CollaboratorCheckList({ title, rows, selected, onToggle, loading, emptyLabel, footnote, className, 'data-testid': testId, rowTestIdPrefix, }: CollaboratorCheckListProps): import("react").JSX.Element;
export default CollaboratorCheckList;
//# sourceMappingURL=CollaboratorCheckList.d.ts.map