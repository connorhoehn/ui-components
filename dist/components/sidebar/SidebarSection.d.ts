import { type ReactNode } from 'react';
export interface SidebarSectionProps {
    /** Visible section label. Used to derive the localStorage key. */
    title: string;
    /** Right-aligned slot in the header (e.g. an IconButton). */
    actions?: ReactNode;
    /** When true (default), header click toggles collapse. */
    collapsible?: boolean;
    /** Initial collapsed state. Defaults to false (open). */
    defaultCollapsed?: boolean;
    /** Optional explicit localStorage key. Defaults to `sidebar-section:${title}`. */
    storageKey?: string;
    /** Section body. */
    children?: ReactNode;
    /** Extra classes for the outer wrapper. */
    className?: string;
    /** Test id (defaults to "sidebar-section"). */
    'data-testid'?: string;
}
export declare function SidebarSection({ title, actions, collapsible, defaultCollapsed, storageKey, children, className, 'data-testid': testId, }: SidebarSectionProps): import("react").JSX.Element;
export default SidebarSection;
//# sourceMappingURL=SidebarSection.d.ts.map