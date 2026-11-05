// frontend/src/components/ui/IconButton.tsx
//
// Icon-only button with proper aria-label for accessibility.

import { type ButtonHTMLAttributes, type ReactNode, type Ref } from 'react';
import { useDensity } from '../shared/Density';
import { CONTROL_HEIGHT, CONTROL_SQUARE } from '../shared/controlMetrics';
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
  /** The button element (React 19 passes `ref` as a prop; 2.432.0 names it in the type). */
  ref?: Ref<HTMLButtonElement>;
}

const variantClasses: Record<IconButtonVariant, string> = {
  ghost: 'bg-transparent text-text-secondary enabled:hover:bg-primary/10 enabled:hover:text-primary aria-pressed:bg-primary/12 aria-pressed:text-primary',
  primary: 'bg-primary text-on-primary enabled:hover:bg-primary-hover',
  danger: 'bg-danger text-white hover:bg-danger',
  outline: 'bg-primary/5 text-text-secondary border border-solid border-primary/20 enabled:hover:bg-primary/12 enabled:hover:text-primary aria-pressed:bg-primary/12 aria-pressed:text-primary',
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
  sm: `${CONTROL_HEIGHT.sm} ${CONTROL_SQUARE.sm} shrink-0 text-sm [&_svg]:size-4`,
  md: `${CONTROL_HEIGHT.md} ${CONTROL_SQUARE.md} shrink-0 text-sm [&_svg]:size-4`,
  lg: `${CONTROL_HEIGHT.lg} ${CONTROL_SQUARE.lg} shrink-0 text-sm [&_svg]:size-4`,
};

export function IconButton({
  'aria-label': ariaLabel,
  icon,
  children,
  disabled = false,
  variant = 'ghost',
  tone = 'surface',
  size: requestedSize,
  className,
  ...rest
}: IconButtonProps) {
  const density = useDensity();
  const size = requestedSize ?? (density === 'compact' ? 'sm' : 'md');
  return (
    <button
      data-ui-part=""
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
      className={cn(
        'inline-flex items-center justify-center border-none rounded-md',
        'transition-colors duration-150 ease-in-out',
        tone === 'code' ? 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-code-blue' : 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
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
