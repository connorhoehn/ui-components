import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  /** Dot color (for colored department/status dots); also tints the active state. */
  color?: string;
  /** Show a colored dot before the label. */
  dot?: boolean;
  /**
   * `md` is the comfortable default for a filter bar people actually click.
   * `sm`/`xs` are for chips packed into a dense row or a table cell — at xs a
   * filter reads as a caption rather than a control.
   */
  size?: 'md' | 'sm' | 'xs';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  /** Forwarded to the underlying <button> for test selectors. */
  'data-testid'?: string;
}

const SIZE_CLASSES: Record<'md' | 'sm' | 'xs', string> = {
  md: 'px-3 py-1 text-[12.5px]',
  sm: 'px-2.5 py-0.5 text-[11px]',
  xs: 'px-2 py-px text-[10px]',
};

const INACTIVE_CLASSES =
  'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]';

const ACTIVE_DEFAULT_CLASSES =
  'bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90';

const ACTIVE_COLORED_CLASSES =
  'border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]';

export function FilterChip({
  active,
  onClick,
  color,
  dot = false,
  size = 'sm',
  children,
  className,
  disabled = false,
  'data-testid': dataTestId,
}: FilterChipProps) {
  const useColoredActive = active && !!color;

  const style: CSSProperties | undefined = useColoredActive
    ? { background: `${color}22`, borderColor: `${color}66`, color }
    : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      data-testid={dataTestId}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none',
        SIZE_CLASSES[size],
        active
          ? useColoredActive
            ? ACTIVE_COLORED_CLASSES
            : ACTIVE_DEFAULT_CLASSES
          : INACTIVE_CLASSES,
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      style={style}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: color || 'currentColor' }}
        />
      )}
      {children}
    </button>
  );
}

export default FilterChip;
