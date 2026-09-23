// frontend/src/components/ui/IconButton.tsx
//
// Icon-only button with proper aria-label for accessibility.

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { SurfaceTone } from '../shared/tones';

/** `outline` (since 2.386.5): a bordered square on the surface — an editor head's (i) and ⋯. */
export type IconButtonVariant = 'ghost' | 'primary' | 'danger' | 'outline';
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

const variantClasses: Record<IconButtonVariant, string> = {
  ghost: 'bg-transparent text-text-primary hover:bg-surface-hover',
  primary: 'bg-info text-white hover:bg-info',
  danger: 'bg-danger text-white hover:bg-danger',
  outline: 'bg-surface text-text-secondary border border-solid border-border hover:bg-surface-hover hover:text-text-primary',
};

// Pastel accents take dark text; see the note in Button.tsx.
const codeVariantClasses: Record<IconButtonVariant, string> = {
  ghost: 'bg-transparent text-code-subtle hover:bg-code-surface hover:text-code-text',
  primary: 'bg-code-blue text-code-bg hover:bg-code-blue',
  danger: 'bg-code-red text-code-bg hover:bg-code-red',
  outline: 'bg-transparent text-code-subtle border border-solid border-code-border hover:bg-code-surface hover:text-code-text',
};

const TONE: Record<IconButtonTone, Record<IconButtonVariant, string>> = {
  surface: variantClasses,
  code: codeVariantClasses,
};

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-6 h-6 text-sm',
  md: 'w-8 h-8 text-base',
  lg: 'w-10 h-10 text-lg',
};

export function IconButton({
  'aria-label': ariaLabel,
  icon,
  children,
  disabled = false,
  variant = 'ghost',
  tone = 'surface',
  size = 'md',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center border-none rounded-md',
        'transition-colors duration-150 ease-in-out',
        (TONE[tone] ?? variantClasses)[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        className,
      )}
      {...rest}
    >
      {icon ?? children}
    </button>
  );
}
