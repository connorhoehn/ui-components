import { type ReactNode } from 'react';
export interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
}
export type BreadcrumbOverflow = 'ellipsis' | 'menu';
export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    /** Custom separator rendered between items (default: "/") */
    separator?: ReactNode;
    /**
     * When set, truncate the middle of the list to fit this many visible items.
     * The first and last are always shown; middle items collapse per `overflow`.
     */
    maxItems?: number;
    /**
     * How the collapsed middle behaves. `ellipsis` (default) is inert text;
     * `menu` opens the hidden crumbs as a list of real links.
     */
    overflow?: BreadcrumbOverflow;
    /**
     * Render nothing below this many crumbs. A two-level trail usually repeats
     * what the nav rail already highlights, so shells that show breadcrumbs on
     * every route can set `minItems={3}` and let shallow pages keep the row.
     */
    minItems?: number;
    className?: string;
    'data-testid'?: string;
}
export declare function Breadcrumbs({ items, separator, maxItems, overflow, minItems, className, 'data-testid': testId, }: BreadcrumbsProps): import("react").JSX.Element | null;
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.d.ts.map