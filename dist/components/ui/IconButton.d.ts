import { type ButtonHTMLAttributes, type ReactNode } from 'react';
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    'aria-label': string;
    icon?: ReactNode;
    children?: ReactNode;
    variant?: 'ghost' | 'primary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}
export declare function IconButton({ 'aria-label': ariaLabel, icon, children, disabled, variant, size, className, ...rest }: IconButtonProps): import("react").JSX.Element;
//# sourceMappingURL=IconButton.d.ts.map