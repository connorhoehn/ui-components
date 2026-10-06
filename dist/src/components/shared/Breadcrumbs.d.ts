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
    /**
     * `true` (default): the last crumb is the page you are on — primary ink,
     * `aria-current="page"`, not a link. `false`: every crumb is a place to go,
     * for a PATH that ends at the folder a file lives in, not at the file.
     * Since 2.385.0.
     */
    lastIsCurrent?: boolean;
    /**
     * Type step. `md` (default) is 14px. `sm` (2.407.13) is the 13px meta step —
     * the size of a document header's "Saved …" line and status pill, for a
     * trail that sits in that row (EditorShell's folder path). The size is on
     * every crumb, separator and ellipsis; a `className` on the nav cannot
     * reach them.
     */
    size?: BreadcrumbSize;
    className?: string;
    'data-testid'?: string;
}
export type BreadcrumbSize = 'sm' | 'md';
export declare function Breadcrumbs({ items, separator, maxItems, overflow, minItems, lastIsCurrent, size, className, 'data-testid': testId, }: BreadcrumbsProps): import("react").JSX.Element | null;
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.d.ts.map