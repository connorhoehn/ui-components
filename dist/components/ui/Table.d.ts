import { type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes, type ReactNode } from 'react';
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children: ReactNode;
}
export declare function Table({ children, className, ...rest }: TableProps): import("react/jsx-runtime").JSX.Element;
export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}
export declare function TableHead({ children, className, ...rest }: TableHeadProps): import("react/jsx-runtime").JSX.Element;
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}
export declare function TableBody({ children, className, ...rest }: TableBodyProps): import("react/jsx-runtime").JSX.Element;
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
    clickable?: boolean;
}
export declare function TableRow({ children, clickable, className, ...rest }: TableRowProps): import("react/jsx-runtime").JSX.Element;
export interface TableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
}
export declare function TableTh({ children, sortable, sortDirection, className, ...rest }: TableThProps): import("react/jsx-runtime").JSX.Element;
export interface TableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
}
export declare function TableTd({ children, className, ...rest }: TableTdProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Table.d.ts.map