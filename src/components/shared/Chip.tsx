import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ChipTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'caution' | 'purple';

const SOFT_CLASSES: Record<ChipTone, string> = {
  neutral: 'bg-slate-100 text-slate-600',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-amber-50 text-amber-600',
  danger:  'bg-red-50 text-red-600',
  info:    'bg-blue-50 text-blue-600',
  caution: 'bg-orange-50 text-orange-600',
  purple:  'bg-purple-50 text-purple-600',
};

const SOLID_CLASSES: Record<ChipTone, string> = {
  neutral: 'bg-slate-500 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-amber-600 text-white',
  danger:  'bg-red-600 text-white',
  info:    'bg-blue-600 text-white',
  caution: 'bg-orange-600 text-white',
  purple:  'bg-purple-600 text-white',
};

// Dot color matches the tone's saturated swatch. Used by `dot` prop —
// the soft palette pairs with a small filled circle indicator the
// consumer doesn't have to compose themselves (the recurring "status
// pill with a dot" pattern across hangout/recordings/cluster routes).
const DOT_CLASSES: Record<ChipTone, string> = {
  neutral: 'bg-slate-400',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger:  'bg-red-500',
  info:    'bg-blue-500',
  caution: 'bg-orange-500',
  purple:  'bg-purple-500',
};

const SIZE_CLASSES: Record<'sm' | 'xs', string> = {
  sm: 'px-2 py-0.5 text-[11px]',
  xs: 'px-1.5 py-px text-[10px]',
};

const DOT_SIZE: Record<'sm' | 'xs', string> = {
  sm: 'h-1.5 w-1.5',
  xs: 'h-1 w-1',
};

export interface ChipProps {
  tone?: ChipTone;
  size?: 'sm' | 'xs';
  /** Solid fill (dark bg + white text) instead of soft tint. */
  solid?: boolean;
  /** Monospace font — for count badges. */
  mono?: boolean;
  /** Indicator dot. 'static' = filled circle, 'pulse' = filled circle
   *  with an animated outer ping (matches Badge variant="pulse"). */
  dot?: 'static' | 'pulse';
  /** Uppercase the label with letter-spacing — the "REC" / "LIVE"
   *  pattern common to status pills. */
  uppercase?: boolean;
  /** Optional leading icon (SVG element). Sized by the chip's `size`. */
  icon?: ReactNode;
  children: ReactNode;
  title?: string;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  'aria-label'?: string;
}

export default function Chip({
  tone = 'neutral',
  size = 'sm',
  solid = false,
  mono = false,
  dot,
  uppercase = false,
  icon,
  children,
  title,
  className,
  style,
  'data-testid': testId,
  'aria-label': ariaLabel,
}: ChipProps) {
  const paletteClasses = solid ? SOLID_CLASSES[tone] : SOFT_CLASSES[tone];
  const hasAdornment = !!(dot || icon);
  return (
    <span
      data-testid={testId}
      aria-label={ariaLabel}
      title={title}
      className={cn(
        'inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap',
        SIZE_CLASSES[size],
        paletteClasses,
        mono && 'font-mono',
        uppercase && 'uppercase tracking-wide',
        hasAdornment && 'gap-1',
        className,
      )}
      style={style}
    >
      {dot && (
        <span
          aria-hidden
          className={cn(
            'relative inline-block rounded-full shrink-0',
            DOT_SIZE[size],
            DOT_CLASSES[tone],
          )}
        >
          {dot === 'pulse' && (
            <span
              aria-hidden
              className={cn(
                'absolute inset-0 rounded-full animate-ping opacity-70',
                DOT_CLASSES[tone],
              )}
            />
          )}
        </span>
      )}
      {icon && (
        <span aria-hidden className="inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
