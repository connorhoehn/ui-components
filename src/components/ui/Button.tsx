// frontend/src/components/ui/Button.tsx
//
// Shared button component with consistent variants.

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
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

// Token-mapped, not hex-literal: consumers rebrand by overriding the
// --color-* variables, so a hex here would be the one button that never
// re-tones. (Until v2.61.0 `primary` was hardcoded blue-600 — visibly a
// different colour from the brand --color-primary.)
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white border-none hover:bg-primary-hover',
  secondary: 'bg-surface-inset text-text-primary border border-border hover:bg-surface-hover',
  ghost: 'bg-transparent text-text-primary border border-border hover:bg-surface-hover',
  danger: 'bg-transparent text-danger-fg border border-danger-border hover:bg-danger-bg',
  'danger-solid': 'bg-danger text-white border-none hover:bg-danger/90',
};

// The code family's accents are pastels, so solid fills take `code-bg` text
// rather than white — white on Catppuccin blue is unreadable.
const codeVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-code-blue text-code-bg border-none hover:bg-code-blue/90',
  secondary: 'bg-code-surface text-code-text border border-code-border hover:bg-code-raised',
  ghost: 'bg-transparent text-code-text border border-code-border hover:bg-code-surface',
  danger: 'bg-transparent text-code-red border border-code-red/40 hover:bg-code-surface',
  'danger-solid': 'bg-code-red text-code-bg border-none hover:bg-code-red/90',
};

const TONE: Record<ButtonTone, Record<ButtonVariant, string>> = {
  surface: variantClasses,
  code: codeVariantClasses,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  tone = 'surface',
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
        (TONE[tone] ?? variantClasses)[variant],
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
