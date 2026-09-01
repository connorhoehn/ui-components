import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { SurfaceTone } from '../shared/tones';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid';
export type ButtonSize = 'sm' | 'md' | 'lg';
/** @see SurfaceTone — which colour family the button paints in. */
export type ButtonTone = SurfaceTone;
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette. Every bare `<button>` in a
     * terminal or log surface is there because this prop did not exist.
     */
    tone?: ButtonTone;
    fullWidth?: boolean;
    children: ReactNode;
}
export declare function Button({ variant, size, tone, disabled, fullWidth, children, type, className, ...rest }: ButtonProps): import("react").JSX.Element;
//# sourceMappingURL=Button.d.ts.map