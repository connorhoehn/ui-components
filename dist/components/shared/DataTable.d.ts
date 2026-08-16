import { type ReactNode } from 'react';
export interface DataTableColumn<T> {
    /** Stable id for the column. When `accessor` is omitted, used as the data key on T. */
    key: string;
    /** Header label. */
    header: ReactNode;
    /** Optional cell renderer. If absent, the value at `key` is rendered as a string. */
    render?: (row: T, rowIndex: number) => ReactNode;
    /** Optional sort comparator. If absent but `sortable=true`, sorts by `String(row[key])`. */
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
    className?: string;
    'data-testid'?: string;
}
export declare function DataTable<T>({ data, columns, keyField, onRowClick, rowActions, searchable, searchPlaceholder, pageSize, emptyMessage, loading, loadingRows, className, 'data-testid': testId, }: DataTableProps<T>): import("react").JSX.Element;
export default DataTable;
//# sourceMappingURL=DataTable.d.ts.map