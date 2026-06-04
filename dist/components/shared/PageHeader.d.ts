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
    className?: string;
}
declare function PageHeader({ title, description, actions, back, badge, className, }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
export { PageHeader };
export default PageHeader;
//# sourceMappingURL=PageHeader.d.ts.map