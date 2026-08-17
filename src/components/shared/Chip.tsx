import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

import {
  TONE_SOFT,
  TONE_SOLID,
  TONE_SOLID_BG,
  toneKey,
  type ToneOrAlias,
} from './tones';

/** @see Tone — the library-wide semantic tone scale. */
export type ChipTone = ToneOrAlias;

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
  const key = toneKey(tone);
  const paletteClasses = solid ? TONE_SOLID[key] : TONE_SOFT[key];
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
            TONE_SOLID_BG[key],
          )}
        >
          {dot === 'pulse' && (
            <span
              aria-hidden
              className={cn(
                'absolute inset-0 rounded-full animate-ping opacity-70',
                TONE_SOLID_BG[key],
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
