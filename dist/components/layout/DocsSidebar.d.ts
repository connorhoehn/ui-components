import { type ReactNode, type CSSProperties, type AnchorHTMLAttributes } from 'react';
export interface DocsSidebarItem {
    id: string;
    label: ReactNode;
    to: string;
    badge?: ReactNode;
}
export interface DocsSidebarGroup {
    id: string;
    label?: ReactNode;
    /** When set, the group label itself is rendered as a direct link instead of a section. */
    to?: string;
    items: DocsSidebarItem[];
}
export interface DocsSidebarSection {
    id: string;
    label: ReactNode;
    /** Used to detect "section active" highlighting in section header. */
    basePath?: string;
    groups: DocsSidebarGroup[];
}
type LinkRenderer = (item: {
    to: string;
    id: string;
}, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
export interface DocsSidebarProps {
    sections: DocsSidebarSection[];
    /** Current pathname — drives the active-item highlight. */
    activeHref?: string;
    /** Section ids that should start collapsed. */
    defaultCollapsedSections?: string[];
    /** Plug a routing library's Link. Defaults to <a href>. */
    renderLink?: LinkRenderer;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
}
export declare function DocsSidebar({ sections, activeHref, defaultCollapsedSections, renderLink, className, style, 'aria-label': ariaLabel, }: DocsSidebarProps): import("react/jsx-runtime").JSX.Element;
export default DocsSidebar;
//# sourceMappingURL=DocsSidebar.d.ts.map