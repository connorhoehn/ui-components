import { type ReactNode } from 'react';
export interface DataTableColumn<T> {
    /** Stable id for the column. When `accessor` is omitted, used as the data key on T. */
    key: string;
    /** Header label. */
    header: ReactNode;
    /** Optional cell renderer. If absent, the value at `key` is rendered as a string. */
    render?: (row: T, rowIndex: number) => ReactNode;
    /**
     * Optional sort comparator. If absent but `sortable=true`, the default
     * comparator compares numbers/bigints/Dates/booleans by VALUE and everything
     * else by `String(...)`. (It used to stringify unconditionally, which sorted a
     * numeric column lexicographically — 1, 10, 100, 2, 9 — and a Date column by
     * weekday name.)
     */
    compare?: (a: T, b: T) => number;
    /** Optional filter accessor. If absent but `filterable=true`, filters by `String(row[key])`. */
    getFilterText?: (row: T) => string;
    sortable?: boolean;
    /** Include this column's text in the global search box. Default: true if a search box is shown. */
    filterable?: boolean;
    width?: string;
    align?: 'left' | 'right' | 'center';
    className?: string;
}
export interface DataTableProps<T> {
    data: T[];
    columns: DataTableColumn<T>[];
    /** Stable id for each row. Used as React key. */
    keyField: (row: T) => string;
    onRowClick?: (row: T) => void;
    /** Per-row trailing action cell (buttons, menu, etc.). */
    rowActions?: (row: T) => ReactNode;
    /** Show a global search input. Default: false. */
    searchable?: boolean;
    searchPlaceholder?: string;
    /** Page size. Pagination is shown when data.length > pageSize. */
    pageSize?: number;
    emptyMessage?: ReactNode;
    loading?: boolean;
    loadingRows?: number;
    /**
     * Drop the table's own border/rounding so a composite (e.g. a Card-framed
     * table like identity's EntityTable) can provide the frame instead.
     */
    frameless?: boolean;
    /**
     * Tint alternate rows so the eye can track one row across a wide table.
     *
     * `surface-inset` is the tint, at full strength — about 2% off `surface`,
     * which is a reading aid you feel rather than see. Half that (the first
     * attempt) measured ~1% and was simply invisible: a stripe nobody can
     * perceive is not a subtle stripe, it is a no-op with a prop attached.
     *
     * It stays lighter than `surface-panel`, the hover fill, so hover still
     * reads as the darker row — a stripe that fights the hover state is worse
     * than no stripe, because it makes the row under the pointer ambiguous.
     * Both are tokens, so the relationship holds in dark mode too.
     */
    striped?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function DataTable<T>({ data: dataProp, columns: columnsProp, keyField, onRowClick, rowActions, searchable, searchPlaceholder, pageSize, emptyMessage, loading, loadingRows, frameless, striped, className, 'data-testid': testId, }: DataTableProps<T>): import("react").JSX.Element;
export default DataTable;
//# sourceMappingURL=DataTable.d.ts.map