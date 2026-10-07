import { type ReactNode } from 'react';
import { type FileKind } from './FileKindMark';
import { type DropdownMenuSection } from './DropdownMenu';
export interface DocumentResultItem {
    id: string;
    title: string;
    /** One line: the document's opening sentence or description. */
    summary?: string | null;
    kind: FileKind;
    /** The folder's name; absent = no folder line segment. */
    folder?: string | null;
    updatedAt?: string | number | Date | null;
    /** In the working set (the toggle reads "Added"). */
    attached?: boolean;
    /**
     * Always-visible content at the row's right, before Add and ⋯ — a live
     * badge such as `CallPresenceIndicator` ("● 3" for a document with an
     * active call). Outside the row's open target, so clicking it never opens
     * the document. Keep it one line (≤ the row's text height); the row height
     * does not change. Since 2.394.0.
     */
    trailing?: ReactNode;
}
export interface DocumentResultListProps {
    items: readonly DocumentResultItem[];
    currentId?: string | null;
    /** Keyboard focus moved to a row. */
    onCurrentChange?: (id: string) => void;
    onOpen: (item: DocumentResultItem) => void;
    /** Omit to draw no toggle. */
    onToggleAttach?: (item: DocumentResultItem) => void;
    /** Default true. */
    draggable?: boolean;
    /** Extra drag data (called after the prompt-context payload is written). */
    onDragStartItem?: (item: DocumentResultItem, dataTransfer: DataTransfer) => void;
    /** Per-row trailing content computed by the host (wins over `item.trailing` when it returns non-null). Since 2.394.0. */
    rowTrailing?: (item: DocumentResultItem) => ReactNode;
    /** The row's ⋯ menu; null or empty = no menu. */
    rowMenu?: (item: DocumentResultItem) => DropdownMenuSection[] | null;
    emptyState?: ReactNode;
    /** For the age labels; default Date.now(). */
    now?: number;
    toggleLabels?: {
        add: string;
        added: string;
    };
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}
/** "just now", "15m ago", "2h ago", "Yesterday", "3d ago", "Sep 12". */
export declare function documentAgeLabel(value: string | number | Date | null | undefined, now?: number): string | null;
export declare function DocumentResultList({ items, currentId, onCurrentChange, onOpen, onToggleAttach, draggable, onDragStartItem, rowMenu, rowTrailing, emptyState, now, toggleLabels, 'aria-label': ariaLabel, className, 'data-testid': testId, }: DocumentResultListProps): import("react").JSX.Element;
export default DocumentResultList;
//# sourceMappingURL=DocumentResultList.d.ts.map