import type { ReactNode } from 'react';
import { useRef } from 'react';
import { cn } from '../../lib/cn';

// ## Why it is a radiogroup and not a row of toggles
//
// Every caller uses it for ONE choice out of a few: Public/Private,
// Editing/Suggesting/Viewing, Ring me/Do not disturb. As a `role="group"` of
// `aria-pressed` buttons that announced as several independent toggles — a
// reader was told "Public, pressed" then "Private, not pressed" with nothing
// saying they are one question, and could reasonably think both could be on.
// It also cost one tab stop per option.
//
// `radiogroup` is the pattern for exactly this. One tab stop, the arrow keys
// move AND choose (which is what a segmented control looks like it does), and
// the state is `aria-checked`, which is a value rather than a pressed button.

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
  /**
   * The element that already says what the group is for — a `FormField`'s
   * label, typically, via the `labelId` it hands its render prop. Prefer this
   * over `aria-label` inside a form: it keeps ONE copy of the wording, so the
   * visible label and the announced one cannot drift apart. Same wiring
   * `Switch` takes.
   */
  'aria-labelledby'?: string;
  /** Every segment disabled — used while a form that owns it is saving. */
  disabled?: boolean;
  /** Stretch the group and share its width equally between the segments. */
  fullWidth?: boolean;
  /**
   * `neutral` (default): a raised white segment on an inset track.
   * `accent` (2.391.1): a flat track on the surface and the chosen segment in
   * the brand's soft fill and text — the start-a-call Video | Audio switch.
   */
  tone?: 'neutral' | 'accent';
  className?: string;
  'data-testid'?: string;
}

const SIZE_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

const INACTIVE_CLASSES =
  'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]';

const ACTIVE_CLASSES =
  'bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]';

const ACCENT_ACTIVE_CLASSES = 'bg-primary-bg text-primary border border-transparent';

export function SegmentedControl({
  options,
  value,
  onChange,
  size = 'md',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  disabled = false,
  fullWidth = false,
  tone = 'neutral',
  className,
  'data-testid': testId,
}: SegmentedControlProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = options.filter((o) => !disabled);
  const index = options.findIndex((o) => o.value === value);

  /** Move to an option and CHOOSE it — radiogroup arrows do both. */
  const step = (delta: number) => {
    if (disabled || enabled.length === 0) return;
    const from = index < 0 ? 0 : index;
    const next = ((from + delta) % options.length + options.length) % options.length;
    onChange(options[next]!.value);
    // Focus follows the selection, or the reader is left on the old option.
    ref.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus();
  };

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-testid={testId}
      className={cn(
        fullWidth ? 'flex w-full items-center' : 'inline-flex items-center',
        'rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5',
        tone === 'accent' && 'bg-surface p-[3px] gap-1',
        className,
      )}
    >
      {options.map((option, i) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            // One tab stop for the whole group: the chosen option holds it, so
            // Tab lands on the current answer rather than on the first one.
            // Nothing chosen yet -> the first option, so the group is never
            // unreachable.
            tabIndex={active || (index < 0 && i === 0) ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              const back = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
              const fwd = event.key === 'ArrowRight' || event.key === 'ArrowDown';
              if (!back && !fwd && event.key !== 'Home' && event.key !== 'End') return;
              event.preventDefault();
              if (event.key === 'Home') { onChange(options[0]!.value); return; }
              if (event.key === 'End') { onChange(options[options.length - 1]!.value); return; }
              step(back ? -1 : 1);
            }}
            disabled={disabled}
            data-testid={testId ? `${testId}-${option.value}` : undefined}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer',
              fullWidth && 'flex-1',
              disabled && 'cursor-not-allowed opacity-60',
              SIZE_CLASSES[size],
              active ? (tone === 'accent' ? ACCENT_ACTIVE_CLASSES : ACTIVE_CLASSES) : INACTIVE_CLASSES,
              tone === 'accent' && 'h-[30px] py-0 text-[15px]',
              tone === 'accent' && !active && 'text-text-primary',
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
