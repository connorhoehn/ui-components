// frontend/src/components/ui/Button.tsx
//
// Shared button component with consistent variants.

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#3b82f6] text-white border-none hover:bg-[#2563eb]',
  secondary: 'bg-[#6b7280] text-white border-none hover:bg-[#4b5563]',
  ghost: 'bg-transparent text-[#374151] border border-border-field hover:bg-[#f3f4f6]',
  danger: 'bg-[#ef4444] text-white border-none hover:bg-[#dc2626]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-1.5 text-[13px]',
  lg: 'px-[18px] py-2 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  children,
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'font-semibold rounded-md font-[inherit] transition-colors duration-150 ease-in-out',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
