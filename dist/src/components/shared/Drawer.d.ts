import { default as React } from 'react';
export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    /** Panel width in pixels. Defaults to 460. */
    width?: number;
    children: React.ReactNode;
    footer?: React.ReactNode;
    'data-testid'?: string;
}
declare function Drawer({ open, onClose, title, subtitle, width, children, footer, 'data-testid': testId, }: DrawerProps): React.ReactPortal | null;
export { Drawer };
export default Drawer;
//# sourceMappingURL=Drawer.d.ts.map