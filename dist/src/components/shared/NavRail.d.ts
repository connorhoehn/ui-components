import { type AnchorHTMLAttributes, type ReactNode } from 'react';
import type { SurfaceTone } from './tones';
/** @see SurfaceTone — which colour family the rail paints in. */
export type NavRailTone = SurfaceTone;
export interface NavRailItem {
    /** Target path. Also the React key unless `id` is given. */
    to?: string;
    /** Renders as a button instead of a link. For in-page verbs (Halt, Reset). */
    onClick?: () => void;
    /** Required when an item has neither `to` nor a unique label. */
    id?: string;
    label: ReactNode;
    /** Small right-aligned count — queue depth, unread, failures. */
    badge?: ReactNode;
    /** One dim line under the label. Say what the page is FOR, not what it is. */
    hint?: string;
    /** Leading glyph. */
    icon?: ReactNode;
    /** Section heading. Items sharing a group render under one collapsible head. */
    group?: string;
    disabled?: boolean;
}
/** How `activeHref` is matched against an item's `to`. */
export type NavRailMatch = 'exact' | 'prefix';
export interface NavRailProps {
    /** Rail heading. Omit for a rail that needs no name (a single leaf list). */
    title?: ReactNode;
    items: NavRailItem[];
    /** Current path. An item lights when it matches per `match`. */
    activeHref?: string;
    /**
     * `prefix` (default) keeps a rail lit while you are anywhere beneath it —
     * what an outer rail wants. `exact` is for the innermost rail, where two
     * items share a prefix and both would otherwise light.
     */
    match?: NavRailMatch;
    /** Element beside the title — a help "?" or a count. */
    titleAction?: ReactNode;
    /** Content above the items — a [+ New] button, a filter. */
    header?: ReactNode;
    /** Content pinned below the items — a status line, a collapse toggle. */
    footer?: ReactNode;
    /**
     * Discrete widths, not a pixel number: a `style={{ width }}` here is an
     * inline style on every rail in the app, and three sizes have covered every
     * rail we have shipped. Use `className` for the genuine exception.
     */
    width?: 'narrow' | 'default' | 'wide';
    /**
     * Persist per-group collapsed state under this key. Omit and groups still
     * collapse — they just forget on reload. Rails at different depths MUST use
     * different keys or they share collapse state.
     */
    storageKey?: string;
    /** Render links with a router's Link/NavLink. Defaults to a plain `<a>`. */
    renderLink?: (item: NavRailItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    tone?: NavRailTone;
    /**
     * Layout only, since 2.397.0 — both sizes draw the one shared rail type
     * scale (`railType`: 13px/500 labels on 36px rows, 11px caps group labels,
     * plain counts), the same as SubNavLayout and the explorer rails. `sm`
     * (default) is flush with the rail's edges under a ruled title row; `md` is
     * the Documents surface's Workspace rail (the All documents mockup): items
     * inset under the group's caret, a heading row with no rule under it, and a
     * hairline between groups. Since 2.389.2. (Before 2.397.0 `sm` was a 13px
     * rail and `md` 15px/400 on 36px rows.)
     */
    size?: 'sm' | 'md';
    /** Names the nav landmark. Falls back to the title, then 'Navigation'. */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function NavRail({ title, items, activeHref, match, titleAction, header, footer, width, storageKey, renderLink, tone, size, 'aria-label': ariaLabel, className, 'data-testid': testId, }: NavRailProps): import("react").JSX.Element;
/** One level of the stack. `id` keys the rail and seeds its storage key. */
export interface NavRailSpec extends Omit<NavRailProps, 'storageKey'> {
    id: string;
}
export interface NavRailStackProps {
    /**
     * Outermost rail first. An empty array renders content full-bleed, which is
     * the right answer for a leaf page that wants the width back — a rail with
     * nothing in it is a dead 200px column, not a smaller rail.
     */
    rails: NavRailSpec[];
    /** Applied to every rail that does not set its own. */
    activeHref?: string;
    /** Applied to every rail that does not set its own. */
    renderLink?: NavRailProps['renderLink'];
    /** Applied to every rail that does not set its own. */
    tone?: NavRailTone;
    /** Prefix for each rail's group-collapse persistence, suffixed by rail id. */
    storageKey?: string;
    /** The content region beside the rails. Usually a `WorkArea` or an Outlet. */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function NavRailStack({ rails, activeHref, renderLink, tone, storageKey, children, className, 'data-testid': testId, }: NavRailStackProps): import("react").JSX.Element;
export default NavRail;
//# sourceMappingURL=NavRail.d.ts.map