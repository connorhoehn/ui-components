import type { ReactNode } from 'react';
export interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
}
export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    /** Custom separator rendered between items (default: "/") */
    separator?: ReactNode;
    /**
     * When set, truncate the middle of the list to fit this many visible items.
     * The first and last are always shown; middle items collapse to "…".
     */
    maxItems?: number;
    className?: string;
    'data-testid'?: string;
}
export declare function Breadcrumbs({ items, separator, maxItems, className, 'data-testid': testId, }: BreadcrumbsProps): import("react/jsx-runtime").JSX.Element | null;
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.d.ts.map