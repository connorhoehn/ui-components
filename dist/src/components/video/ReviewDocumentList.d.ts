import { type ReactNode } from 'react';
export interface ReviewDocumentItem {
    id: string;
    title: string;
    subline?: ReactNode;
    /** Accent sublines ("Presenting · Alice") vs tertiary ("Up next"). Default: accent when `selected`. */
    sublineTone?: 'accent' | 'muted';
    selected?: boolean;
    /** Default true. The document a call starts from is not removable. */
    removable?: boolean;
    icon?: ReactNode;
}
export interface ReviewDocumentListProps {
    items: ReviewDocumentItem[];
    trailing: 'remove' | 'open';
    onRemove?: (id: string) => void;
    onOpen?: (id: string) => void;
    onSelect?: (id: string) => void;
    /** Drag-reorder: the id moved and its new index. */
    onReorder?: (id: string, index: number) => void;
    emptyLabel?: string;
    className?: string;
    /** Test id of the list; rows are `<rowTestIdPrefix>-<id>`. */
    'data-testid'?: string;
    /** Default `call-document` (so rows read `call-document-<id>`). */
    rowTestIdPrefix?: string;
}
export declare function ReviewDocumentList({ items, trailing, onRemove, onOpen, onSelect, onReorder, emptyLabel, className, 'data-testid': testId, rowTestIdPrefix, }: ReviewDocumentListProps): import("react").JSX.Element;
export default ReviewDocumentList;
//# sourceMappingURL=ReviewDocumentList.d.ts.map