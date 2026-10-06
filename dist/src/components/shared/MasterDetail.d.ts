import { type ReactNode } from 'react';
export interface MasterDetailProps<T> {
    items: T[];
    keyOf: (item: T) => string;
    selectedKey: string | null;
    onSelect: (key: string) => void;
    /** Expanded rail row. */
    renderRow: (item: T, index: number, selected: boolean) => ReactNode;
    /** Compact (72px) rail row. Falls back to an index badge when omitted. */
    renderCompactRow?: (item: T, index: number, selected: boolean) => ReactNode;
    renderDetail: (item: T, index: number) => ReactNode;
    railTitle?: ReactNode;
    /** Expanded rail width in px. Default 340. */
    railWidth?: number;
    /** Compact rail width in px. Default 72. */
    compactWidth?: number;
    /** Persists compact/expanded mode under this localStorage key. */
    storageKey?: string;
    /** Rendered in the detail pane when nothing resolves from `selectedKey`. */
    emptyDetail?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function MasterDetail<T>({ items, keyOf, selectedKey, onSelect, renderRow, renderCompactRow, renderDetail, railTitle, railWidth, compactWidth, storageKey, emptyDetail, className, 'data-testid': testId, }: MasterDetailProps<T>): import("react").JSX.Element;
export default MasterDetail;
//# sourceMappingURL=MasterDetail.d.ts.map