import type { ReactNode } from 'react';
import { type WorkspaceRailBack } from './WorkspaceRail';
export interface ExplorerLayoutProps {
    /** Left rail — flush to the pane's left edge, its own border, scrolls independently. */
    rail: ReactNode;
    /** The main pane. */
    children: ReactNode;
    /** Optional right-hand context bar. Stacks below the pane under `2xl`, sits beside it at `2xl` and up. */
    aside?: ReactNode;
    /**
     * Rail width. `md` is the 300px agentcore measured against; `xs` is 220px,
     * the Org rail's own width (SubNavLayout's default), for a documents rail
     * that should sit at it (since 2.407.33); `sm` is 240px for
     * a shallower tree; `lg` is 368px for a two-line work list with its toolbar
     * (the Documents Work column, measured against the redesign's 370px); `ms`
     * is 264px for a one-line title list (the Initiatives v2 rail, since 2.392.0).
     */
    railWidth?: 'xs' | 'sm' | 'ms' | 'md' | 'ml' | 'lg';
    /**
     * A band ABOVE all three columns — a scope header (breadcrumb, title, stats,
     * tabs) that names what the rail, the pane and the aside are all looking at.
     * It does not scroll; the columns below it keep their independent scrolling.
     * Since 2.385.0.
     */
    header?: ReactNode;
    /**
     * A band over the PANE only — a crumb trail with the scope's controls
     * ("Build › Distillation › Knowledge" · All repositories · Open Library).
     * Unlike `header` it spans neither the rail (so the rail's own title keeps
     * the top-left corner) nor the aside (so the aside's top row — a
     * `ContextColumn`'s tabs — keeps the top of its own column). It does not
     * scroll; the pane below it does. No border of its own: it reads as the top
     * of the pane. Since 2.389.0; spans only the pane since 2.389.4 (it spanned
     * pane + aside, and `ScopeHeader variant="crumbs"` controls, which hang
     * into the record head below the band, landed on the aside's top row).
     */
    paneHeader?: ReactNode;
    /**
     * A band UNDER the pane only — a docked composer that must stay put while
     * the pane scrolls. It does not scroll; the pane above it does. It spans
     * the pane's column, never the rail or the aside (the same rule as
     * `paneHeader`), and has no border of its own. Since 2.390.0.
     */
    paneFooter?: ReactNode;
    /** A count beside `railTitle` ("Work 11"). Since 2.385.0. */
    railCount?: number;
    /** How `railCount` reads — see `WorkspaceRail.countStyle`. Default `chip`. Since 2.390.0. */
    railCountStyle?: 'chip' | 'plain';
    /**
     * A back link over the rail's title — "‹ Initiatives" above "Work 11". See
     * `WorkspaceRail.back`. Since 2.390.0.
     */
    railBack?: WorkspaceRailBack | null;
    /** The rail's heading style — see `WorkspaceRail.heading`. Default `compact`. Since 2.385.0. */
    railHeading?: 'compact' | 'prominent' | 'label' | 'caption';
    /**
     * The rail folded to a strip with one control that brings it back. For a
     * surface that wants the width — a diagram, a wide table — the list of
     * documents is worth giving up for a while. Controlled: the host owns the
     * state (and typically remembers it).
     */
    railCollapsed?: boolean;
    /** Present, the rail gets a fold control and the strip an unfold control. */
    onToggleRail?: () => void;
    /** What the rail holds, for the controls' accessible names. Default "the list". */
    railLabel?: string;
    /**
     * The rail's name, in its header row — the same row the fold control sits
     * in, so the rail is titled the way a `ContextColumn` on the other side is
     * (its tabs live in the same h-9 row). Without it the row holds only the
     * fold control, which reads as a stray button over the first section.
     */
    railTitle?: string;
    /**
     * Controls that belong to the rail as a whole — "new item", a filter —
     * placed in the header row between the title and the fold control. The
     * rail's own actions are not page chrome; putting them in a band above the
     * frame left them at the window's inset while the rail sat flush below.
     */
    railActions?: ReactNode;
    railHeader?: ReactNode;
    railFooter?: ReactNode;
    /**
     * `stack` (default): the aside stacks below the pane under `2xl` and sits
     * beside it from `2xl`. `beside`: always beside, at every width — for a pane
     * whose bottom row must be the window's (an editor with a pinned composer);
     * the host keeps the aside narrow (a `ContextColumn` strip) when space is
     * short. Since 2.365.0.
     */
    asidePlacement?: 'stack' | 'beside';
    /** Padding inside the main pane. `none` when the pane hosts its own full-bleed surface (an editor). */
    panePadding?: 'none' | 'md';
    className?: string;
    'data-testid'?: string;
}
export declare function ExplorerLayout({ rail, children, aside, railWidth, header, paneHeader, paneFooter, railCount, railCountStyle, railBack, railHeading, railCollapsed, onToggleRail, railLabel, railTitle, railActions, railHeader, railFooter, panePadding, asidePlacement, className, 'data-testid': testId, }: ExplorerLayoutProps): import("react").JSX.Element;
export default ExplorerLayout;
//# sourceMappingURL=ExplorerLayout.d.ts.map