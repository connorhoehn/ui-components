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

const SIZE_CLASSES: Record<'sm' | 'xs', string> = {
  sm: 'px-2 py-0.5 text-[11px]',
  xs: 'px-1.5 py-px text-[10px]',
};

export interface ChipProps {
  tone?: ChipTone;
  size?: 'sm' | 'xs';
  /** Solid fill (dark bg + white text) instead of soft tint. */
  solid?: boolean;
  /** Monospace font — for count badges. */
  mono?: boolean;
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
  children,
  title,
  className,
  style,
  'data-testid': testId,
  'aria-label': ariaLabel,
}: ChipProps) {
  const paletteClasses = solid ? SOLID_CLASSES[tone] : SOFT_CLASSES[tone];
  return (
    <span
      data-testid={testId}
      aria-label={ariaLabel}
      title={title}
      className={cn(
        'inline-block rounded-sm font-semibold leading-[1.4] whitespace-nowrap',
        SIZE_CLASSES[size],
        paletteClasses,
        mono && 'font-mono',
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}
