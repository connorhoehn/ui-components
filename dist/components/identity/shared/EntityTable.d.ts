export interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'right' | 'center';
}
export interface EntityTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyField: string;
    onRowClick?: (item: T) => void;
    actions?: (item: T) => React.ReactNode;
    emptyMessage?: string;
    emptyIcon?: string;
    loading?: boolean;
}
export declare function EntityTable<T extends Record<string, unknown>>({ columns, data, keyField, onRowClick, actions, emptyMessage, emptyIcon, loading, }: EntityTableProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EntityTable.d.ts.map