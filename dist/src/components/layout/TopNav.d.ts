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
/**
 * How the active item is marked.
 *
 * The two variants are a HIERARCHY, not two interchangeable looks. Apps stack
 * them: a primary row in the header (`pill`) and a section row under it
 * (`underline`). Which one you pick says which row the reader is meant to read
 * first.
 *
 * `pill` is the PRIMARY form, for a nav sitting in a bar rather than on a
 * strip. Active is a filled tint (`--color-primary-bg` / `--color-primary-fg`)
 * plus semibold — a block of brand colour roughly 90x36, which is what makes
 * it the loudest thing in the row. It also carries no bottom border: a header
 * owns its own rule, lower down, so an underline indicator there hangs in
 * mid-air (measured at 12px above the header rule, attached to nothing), which
 * is exactly what "the nav is not aligned" looks like.
 *
 * `underline` is the SECONDARY form: a 2px rule under the active item, sitting
 * ON the strip's own bottom border. Indicator and rule are one continuous
 * line — the `-mb-px` below is what overlaps them — so it is only correct
 * where that border exists. Against a filled pill it reads as a hairline:
 * same brand colour, ~1/18th of the area.
 */
export type NavTabsVariant = 'underline' | 'pill';
export declare function TopNav({ items, activeHref, brand, rightSlot, renderLink, maxVisible, className, style, 'aria-label': ariaLabel, }: TopNavProps): import("react").JSX.Element;
export interface NavTabsProps {
    items: TopNavItem[];
    activeHref?: string;
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    /** See NavTabsVariant. `pill` also drops the strip's bottom border, since
     *  there is no underline left for it to complete. */
    variant?: NavTabsVariant;
}
/** Sub-section navigation: link-based underline tab strip (no state — consumer routes via activeHref). */
export declare function NavTabs({ items, activeHref, renderLink, className, style, 'aria-label': ariaLabel, variant, }: NavTabsProps): import("react").JSX.Element;
export default TopNav;
//# sourceMappingURL=TopNav.d.ts.map