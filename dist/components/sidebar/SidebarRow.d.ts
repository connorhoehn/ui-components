import { type MouseEvent, type ReactNode } from 'react';
export interface SidebarRowProps {
    /** Leading icon. */
    icon?: ReactNode;
    /** Primary label (string or ReactNode). */
    label: ReactNode;
    /** Right-side slot for badges, avatar stacks, etc. */
    trailing?: ReactNode;
    /** Highlighted state. */
    active?: boolean;
    onClick?: () => void;
    onContextMenu?: (e: MouseEvent<HTMLElement>) => void;
    /** When set, the row renders as an <a href>. Click handling still fires. */
    href?: string;
    /** Optional kebab-menu trigger node (typically an IconButton). */
    kebab?: ReactNode;
    /** Disabled state — non-interactive, muted styling. */
    disabled?: boolean;
    /** Accessibility label override (when `label` isn't a string). */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
    /** Arbitrary `data-*` attributes spread onto the root element.
     *  Used by e2e tooling to expose row-level metadata (e.g.
     *  `data-room-slug`) without bespoke wrapper divs that interfere
     *  with the row layout. */
    dataAttrs?: Record<string, string | number | undefined>;
}
export declare function SidebarRow({ icon, label, trailing, active, onClick, onContextMenu, href, kebab, disabled, 'aria-label': ariaLabel, className, 'data-testid': testId, dataAttrs, }: SidebarRowProps): import("react/jsx-runtime").JSX.Element;
export default SidebarRow;
//# sourceMappingURL=SidebarRow.d.ts.map