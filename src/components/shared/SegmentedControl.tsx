import type { ReactNode } from 'react';
import { useRef } from 'react';
import { cn } from '../../lib/cn';
import { useDensitySize } from './Density';
import { Tooltip } from './Tooltip';

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
  /**
   * A count or marker after the option (since 2.434.0) — "Pinned 3". With
   * `iconOnly` it sits as a small superscript count on the icon, and the
   * option's accessible name carries it ("Pinned, 3").
   */
  badge?: ReactNode;
  /** `data-testid` for this option's button; overrides `<data-testid>-<value>`. */
  testId?: string;
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
  /**
   * Icon-only segments (since 2.434.0): each option shows its `icon`, its
   * `label` becomes the button's accessible name and a hover/focus tooltip.
   * For a compact view switcher on a pane's header row — Chat / Pinned /
   * Files / Calls beside a pane's own tabs — where a second labelled row
   * would stack two tab bars. Options without an icon fall back to the label.
   */
  iconOnly?: boolean;
  className?: string;
  'data-testid'?: string;
}

const ICON_SIZE_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'h-6 min-w-6 px-1 [&_svg]:size-3.5',
  md: 'h-7 min-w-7 px-1.5 [&_svg]:size-4',
};

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
  size: sizeProp,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  disabled = false,
  fullWidth = false,
  tone = 'neutral',
  iconOnly = false,
  className,
  'data-testid': testId,
}: SegmentedControlProps) {
  const size = useDensitySize<'sm' | 'md'>('SegmentedControl', sizeProp, { comfortable: 'md', compact: 'sm' });
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
        const compact = iconOnly && option.icon != null;
        const hasBadge = option.badge !== undefined && option.badge !== null && option.badge !== false;
        const button = (
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
            data-testid={option.testId ?? (testId ? `${testId}-${option.value}` : undefined)}
            {...(compact ? { 'aria-label': hasBadge && (typeof option.badge === 'string' || typeof option.badge === 'number') ? `${option.label}, ${option.badge}` : option.label } : {})}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer',
              fullWidth && 'flex-1',
              disabled && 'cursor-not-allowed opacity-60',
              compact ? cn('relative', ICON_SIZE_CLASSES[size]) : SIZE_CLASSES[size],
              active ? (tone === 'accent' ? ACCENT_ACTIVE_CLASSES : ACTIVE_CLASSES) : INACTIVE_CLASSES,
              tone === 'accent' && 'h-[30px] py-0 text-[15px]',
              tone === 'accent' && !active && 'text-text-primary',
            )}
          >
            {option.icon}
            {!compact && option.label}
            {hasBadge && (compact
              ? <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 min-w-3.5 rounded-full bg-primary px-1 text-center text-[10px] font-semibold leading-3.5 text-on-primary">{option.badge}</span>
              : <span className="text-[var(--color-text-tertiary)] tabular-nums">{option.badge}</span>)}
          </button>
        );
        return compact
          ? <Tooltip key={option.value} content={option.label} placement="bottom">{button}</Tooltip>
          : button;
      })}
    </div>
  );
}

export default SegmentedControl;
