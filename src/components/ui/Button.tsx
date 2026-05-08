// frontend/src/components/ui/Button.tsx
//
// Shared button component with consistent variants.

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#2563eb] text-white border-none hover:bg-[#1d4ed8]',
  secondary: 'bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0] hover:bg-[#e2e8f0]',
  ghost: 'bg-transparent text-[#334155] border border-[#d1d5db] hover:bg-[#f1f5f9]',
  danger: 'bg-transparent text-[#dc2626] border border-[#fecaca] hover:bg-[#fef2f2]',
  'danger-solid': 'bg-[#dc2626] text-white border-none hover:bg-[#b91c1c]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
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
