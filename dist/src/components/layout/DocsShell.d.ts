import type { ReactNode, CSSProperties } from 'react';
export interface DocsShellProps {
    /** Sticky top navigation. Typically <DocsTopNav>. */
    topNav: ReactNode;
    /** Left sidebar. Typically <DocsSidebar>. */
    sidebar: ReactNode;
    /**
     * Changing this scrolls the content pane back to the top — pass the current
     * pathname. <main> is the scroll container, not the window, so the browser's
     * scroll restoration does not apply.
     */
    scrollResetKey?: string;
    /** Optional right rail. Typically <TableOfContents>. */
    rightRail?: ReactNode;
    /** Main content. */
    children: ReactNode;
    /**
     * Full-bleed mode skips the centered content padding so a hosted
     * application demo (e.g. a chat panel filling the viewport) can
     * occupy the entire content rectangle.
     */
    fullBleed?: boolean;
    /** Pre-content slot (breadcrumbs, page header). Skipped when fullBleed. */
    preContent?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export declare function DocsShell({ topNav, sidebar, rightRail, children, fullBleed, preContent, className, style, scrollResetKey, }: DocsShellProps): import("react").JSX.Element;
export default DocsShell;
//# sourceMappingURL=DocsShell.d.ts.map