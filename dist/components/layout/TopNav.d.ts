import { type CSSProperties, type ReactNode, type AnchorHTMLAttributes } from 'react';
export interface TopNavItem {
    label: ReactNode;
    to: string;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
}
export interface TopNavProps {
    items: TopNavItem[];
    /** Active href — typically the current pathname. An item is active when activeHref === item.to OR activeHref.startsWith(item.to + '/'). */
    activeHref?: string;
    /** Brand/logo slot rendered at the left. */
    brand?: ReactNode;
    /** Optional right-aligned slot (search, user menu, profile, etc.). */
    rightSlot?: ReactNode;
    /** Render function for link elements. Defaults to <a>. Use this to plug in react-router <Link>, next/link, etc. */
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    /** Maximum number of items to render inline before collapsing the rest into a "More" menu. Default: render all. */
    maxVisible?: number;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
}
export declare function TopNav({ items, activeHref, brand, rightSlot, renderLink, maxVisible, className, style, 'aria-label': ariaLabel, }: TopNavProps): import("react/jsx-runtime").JSX.Element;
export interface NavTabsProps {
    items: TopNavItem[];
    activeHref?: string;
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
}
/** Sub-section navigation: link-based underline tab strip (no state — consumer routes via activeHref). */
export declare function NavTabs({ items, activeHref, renderLink, className, style, 'aria-label': ariaLabel, }: NavTabsProps): import("react/jsx-runtime").JSX.Element;
export default TopNav;
//# sourceMappingURL=TopNav.d.ts.map