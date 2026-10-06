import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
export interface SubNavItem {
    /** Path relative to the section root, e.g. "summary" or "crawl". For action
     *  items (onClick set), this is just used as a React key — provide something
     *  unique like "halt" or "manual". */
    path: string;
    label: string;
    /** Optional small badge (e.g. live count) shown right-aligned. */
    count?: number | string;
    /** Optional dim subtitle below the label. */
    hint?: string;
    /** Optional group heading. When set on any item, the layout renders
     *  collapsible sections by group. Items without a group go into an
     *  un-headered first section. */
    group?: string;
    /** If set, the item renders as a button that calls onClick instead of a
     *  link that navigates. Use for in-page actions like Halt or toggle. */
    onClick?: () => void;
    /** Optional left-side accent color (action items often want danger/warning). */
    accent?: 'default' | 'danger' | 'warning' | 'success';
    /** If any item in a group specifies groupScrollAfter, cap the visible
     *  height at that many items and make the rest scrollable. */
    groupScrollAfter?: number;
}
export interface SubNavLayoutProps {
    /** Section title shown at top of the rail. */
    title: string;
    items: SubNavItem[];
    /** Optional element rendered next to the title (e.g. a help "?" button). */
    titleAction?: ReactNode;
    /** Optional content rendered above the nav items (e.g. a [+ New] button). */
    railHeader?: ReactNode;
    /** Override the default rail width. */
    railWidth?: number;
    /** Storage key prefix for collapsed-section persistence (default 'subnav'). */
    storageKey?: string;
    /** Secondary rail — rendered between the primary rail and main content.
     *  Keeps section-specific items separate from the top-level nav. */
    secondaryTitle?: string;
    secondaryItems?: SubNavItem[];
    secondaryStorageKey?: string;
    secondaryRailWidth?: number;
    /**
     * Custom renderer for navigation link items (items without an onClick).
     * Receives the item, its pre-built body content (label + hint + count), and
     * the base inactive CSSProperties to apply to the link element.
     *
     * Use this to integrate with your router's NavLink (e.g. React Router v7):
     * ```tsx
     * renderNavItem={(item, children, baseStyle) => (
     *   <NavLink
     *     to={item.path}
     *     style={({ isActive }) =>
     *       isActive
     *         ? { ...baseStyle, borderLeft: '3px solid var(--color-primary)', background: 'var(--color-surface-hover)', color: 'var(--color-text-primary)' }
     *         : baseStyle
     *     }
     *   >
     *     {children}
     *   </NavLink>
     * )}
     * ```
     *
     * If not provided, a plain `<a href={item.path}>` is rendered with no
     * active-state detection.
     *
     * `activeNavItemClassName`/`inactiveNavItemClassName` (exported alongside
     * `activeNavItemStyle` below) are the className-based equivalent, for a
     * `NavLink` `className={({isActive}) => ...}` integration that wants no
     * inline `style` prop at all.
     */
    renderNavItem?: (item: SubNavItem, children: ReactNode, baseStyle: CSSProperties) => ReactNode;
    /**
     * `aria-label` for the primary rail's `<nav>`. Undefined (the default)
     * renders today's markup with no label — set it when a page carries more
     * than one nav landmark and a screen reader needs to tell them apart.
     */
    railLabel?: string;
    /**
     * Element for the content pane. Defaults to `'main'` — today's markup.
     * A page that already sits inside its shell's own `<main id="main-content">`
     * should pass `'section'` (with `contentLabel` set, so the region still has
     * a name) to avoid a second `<main>` landmark.
     */
    contentAs?: 'main' | 'section' | 'div';
    /** `aria-label` for the content pane. Only meaningful (and recommended)
     *  when `contentAs` is `'section'`, so the named region reads as one. */
    contentLabel?: string;
    /**
     * The main content area. When used with React Router, omit this and pass an
     * `<Outlet />` as children, or leave empty if the router renders children
     * directly. Defaults to rendering children.
     */
    children?: ReactNode;
}
export declare function SubNavLayout({ title, items, titleAction, railHeader, railWidth, storageKey, secondaryTitle, secondaryItems, secondaryStorageKey, secondaryRailWidth, renderNavItem, railLabel, contentAs, contentLabel, children, }: SubNavLayoutProps): import("react").JSX.Element;
export declare const activeNavItemStyle: CSSProperties;
/**
 * className-based equivalents of `baseStyle` (the item's default look, passed
 * as `renderNavItem`'s third argument) and `activeNavItemStyle` above — for a
 * router integration that wants `NavLink`'s `className={({ isActive }) => ...}`
 * form instead of its `style={({ isActive }) => ...}` form, so hooking up
 * real active-link routing needs no inline `style` prop at all:
 *
 * ```tsx
 * renderNavItem={(item, children) => (
 *   <NavLink
 *     to={item.path}
 *     className={({ isActive }) =>
 *       isActive ? activeNavItemClassName : inactiveNavItemClassName
 *     }
 *   >
 *     {children}
 *   </NavLink>
 * )}
 * ```
 */
export declare const inactiveNavItemClassName = "block px-[14px] py-2 border-l-[3px] border-transparent text-text-primary no-underline cursor-pointer hover:bg-surface-hover";
export declare const activeNavItemClassName = "block px-[14px] py-2 border-l-[3px] border-primary bg-primary/8 text-text-primary no-underline cursor-pointer";
export { cn };
//# sourceMappingURL=SubNavLayout.d.ts.map