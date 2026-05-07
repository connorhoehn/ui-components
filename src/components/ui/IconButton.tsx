// frontend/src/components/ui/IconButton.tsx
//
// Icon-only button with proper aria-label for accessibility.

import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface IconButtonProps {
  /** Accessible label for screen readers (required) */
  'aria-label': string;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'ghost' | 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  className?: string;
}

const variantClasses: Record<'ghost' | 'primary' | 'danger', string> = {
  ghost: 'bg-transparent text-[#374151] hover:bg-[#f3f4f6]',
  primary: 'bg-[#3b82f6] text-white hover:bg-[#2563eb]',
  danger: 'bg-[#ef4444] text-white hover:bg-[#dc2626]',
};

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-6 h-6 text-sm',
  md: 'w-8 h-8 text-base',
  lg: 'w-10 h-10 text-lg',
};

export function IconButton({
  'aria-label': ariaLabel,
  icon,
  onClick,
  disabled = false,
  variant = 'ghost',
  size = 'md',
  style,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center border-none rounded-md',
        'transition-colors duration-150 ease-in-out',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        className,
      )}
      style={style}
    >
      {icon}
    </button>
  );
}
