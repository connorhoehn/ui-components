import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface SegmentOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
  /**
   * What the whole group is FOR.
   *
   * `role="group"` with no name announces as a bare "group", so a reader
   * arriving at Editing / Suggesting / Viewing is told three unrelated toggle
   * buttons rather than one setting with three values. Optional because every
   * existing caller sits under a heading that already says it; new callers on
   * a bare toolbar should pass it.
   */
  'aria-label'?: string;
  className?: string;
}

const SIZE_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

const INACTIVE_CLASSES =
  'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]';

const ACTIVE_CLASSES =
  'bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]';

export function SegmentedControl({
  options,
  value,
  onChange,
  size = 'md',
  'aria-label': ariaLabel,
  className,
}: SegmentedControlProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5',
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer',
              SIZE_CLASSES[size],
              active ? ACTIVE_CLASSES : INACTIVE_CLASSES,
            )}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
