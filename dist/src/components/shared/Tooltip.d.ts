import { type ReactElement, type ReactNode } from 'react';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export interface TooltipProps {
    content: ReactNode;
    children: ReactElement;
    placement?: TooltipPlacement;
    /** ms before hover opens the tooltip. Default 350. */
    openDelay?: number;
    /** ms before leaving closes it. Default 100. */
    closeDelay?: number;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function Tooltip({ content, children, placement, openDelay, closeDelay, disabled, className, 'data-testid': testId, }: TooltipProps): import("react").JSX.Element;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map