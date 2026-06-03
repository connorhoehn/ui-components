import type { ReactNode, CSSProperties, AnchorHTMLAttributes } from 'react';
import { type TopNavItem } from './TopNav';
export interface DocsTopNavProps {
    items: TopNavItem[];
    activeHref?: string;
    /** Brand/logo. A string renders as a bold title; ReactNode is rendered as-is. */
    brand?: ReactNode;
    /** Optional href for the brand to link to. Default "/". Pass null to render brand as a static span. */
    brandTo?: string | null;
    /**
     * Search affordance. Convention: a button that opens a CommandPalette.
     * Falls back to a styled "Search… ⌘K" placeholder when omitted but
     * `showSearchPlaceholder` is true.
     */
    search?: ReactNode;
    /** Renders a static "Search… ⌘K" pill when `search` is omitted. Default true. */
    showSearchPlaceholder?: boolean;
    /** Right-side slot for auxiliary links (GitHub, version, theme switcher). */
    rightSlot?: ReactNode;
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    className?: string;
    style?: CSSProperties;
}
export declare function DocsTopNav({ items, activeHref, brand, brandTo, search, showSearchPlaceholder, rightSlot, renderLink, className, style, }: DocsTopNavProps): import("react/jsx-runtime").JSX.Element;
export default DocsTopNav;
//# sourceMappingURL=DocsTopNav.d.ts.map