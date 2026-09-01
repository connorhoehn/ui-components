import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { SurfaceTone } from '../shared/tones';
export type IconButtonVariant = 'ghost' | 'primary' | 'danger';
/** @see SurfaceTone — which colour family the button paints in. */
export type IconButtonTone = SurfaceTone;
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    'aria-label': string;
    icon?: ReactNode;
    children?: ReactNode;
    variant?: IconButtonVariant;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette — the close/split/kill controls
     * that live in terminal pane chrome.
     */
    tone?: IconButtonTone;
    size?: 'sm' | 'md' | 'lg';
}
export declare function IconButton({ 'aria-label': ariaLabel, icon, children, disabled, variant, tone, size, className, ...rest }: IconButtonProps): import("react").JSX.Element;
//# sourceMappingURL=IconButton.d.ts.map