import { type ButtonHTMLAttributes, type ReactNode } from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    children: ReactNode;
}
export declare function Button({ variant, size, disabled, fullWidth, children, type, className, ...rest }: ButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Button.d.ts.map