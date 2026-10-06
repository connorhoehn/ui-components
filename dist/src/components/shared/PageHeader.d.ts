import React from 'react';
export interface PageHeaderBack {
    label: string;
    to: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
export interface PageHeaderProps {
    title: string;
    description?: string;
    /** Right-aligned action area (buttons, menus). */
    actions?: React.ReactNode;
    /** Optional back link rendered above the title. */
    back?: PageHeaderBack;
    /** Badge or status pill rendered to the right of the title. */
    badge?: React.ReactNode;
    /**
     * Title size. `md` (default) is the 20px heading every page has had;
     * `lg` is a 28px directory title — a page that IS the list, not a page
     * about one thing.
     */
    size?: 'md' | 'lg';
    className?: string;
}
declare function PageHeader({ title, description, actions, back, badge, size, className, }: PageHeaderProps): React.JSX.Element;
export { PageHeader };
export default PageHeader;
//# sourceMappingURL=PageHeader.d.ts.map