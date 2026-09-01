import React from 'react';
export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    /** Panel width in pixels. Defaults to 460. */
    width?: number;
    children: React.ReactNode;
    footer?: React.ReactNode;
    /**
     * Accessible name for the dialog when there is no visible `title` to point
     * at. When `title` IS set the heading labels the dialog via
     * `aria-labelledby` and this prop is unnecessary.
     */
    'aria-label'?: string;
    'data-testid'?: string;
}
declare function Drawer({ open, onClose, title, subtitle, width, children, footer, 'aria-label': ariaLabel, 'data-testid': testId, }: DrawerProps): React.ReactPortal | null;
export { Drawer };
export default Drawer;
//# sourceMappingURL=Drawer.d.ts.map