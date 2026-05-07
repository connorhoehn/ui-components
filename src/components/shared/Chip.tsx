import type { CSSProperties, ReactNode } from 'react';

export type ChipTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'caution' | 'purple';

const SOFT: Record<ChipTone, { background: string; color: string }> = {
  neutral: { background: '#f1f5f9', color: '#475569' },
  success: { background: '#f0fdf4', color: '#16a34a' },
  warning: { background: '#fffbeb', color: '#d97706' },
  danger:  { background: '#fef2f2', color: '#dc2626' },
  info:    { background: '#eff6ff', color: '#2563eb' },
  caution: { background: '#fff7ed', color: '#ea580c' },
  purple:  { background: '#faf5ff', color: '#9333ea' },
};

const SOLID: Record<ChipTone, { background: string; color: string }> = {
  neutral: { background: '#64748b', color: '#fff' },
  success: { background: '#16a34a', color: '#fff' },
  warning: { background: '#d97706', color: '#fff' },
  danger:  { background: '#dc2626', color: '#fff' },
  info:    { background: '#2563eb', color: '#fff' },
  caution: { background: '#ea580c', color: '#fff' },
  purple:  { background: '#9333ea', color: '#fff' },
};

const SIZE: Record<'sm' | 'xs', CSSProperties> = {
  sm: { padding: '2px 8px', fontSize: 11 },
  xs: { padding: '1px 6px', fontSize: 10 },
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
  style,
  'data-testid': testId,
  'aria-label': ariaLabel,
}: ChipProps) {
  const palette = solid ? SOLID[tone] : SOFT[tone];
  return (
    <span
      data-testid={testId}
      aria-label={ariaLabel}
      title={title}
      style={{
        display: 'inline-block',
        borderRadius: 4,
        fontWeight: 600,
        fontFamily: mono ? 'monospace' : 'inherit',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        ...SIZE[size],
        ...palette,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
