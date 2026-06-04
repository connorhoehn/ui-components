import { type ReactNode, type RefObject } from 'react';
export type InlinePopoverPlacement = 'bottom-start' | 'right';
export interface InlinePopoverProps {
    /** Ref to the anchor element (the visible trigger). */
    trigger: RefObject<HTMLElement | null>;
    /** Whether the popover is currently open. Controlled by the caller. */
    open: boolean;
    /** Fires when the popover should dismiss (outside click / Esc / tab-out). */
    onClose: () => void;
    /** Placement relative to the trigger. Defaults to 'bottom-start'. */
    placement?: InlinePopoverPlacement;
    /** Pixel gap between trigger and panel. Default 6. */
    offset?: number;
    /** Optional className for the panel. */
    className?: string;
    /** Optional z-index (default 9500 — under modals at 10000). */
    zIndex?: number;
    /** Optional testid for the panel. Default 'inline-popover'. */
    'data-testid'?: string;
    children: ReactNode;
}
export declare function InlinePopover({ trigger, open, onClose, placement, offset, className, zIndex, 'data-testid': testId, children, }: InlinePopoverProps): import("react").ReactPortal | null;
export default InlinePopover;
//# sourceMappingURL=InlinePopover.d.ts.map