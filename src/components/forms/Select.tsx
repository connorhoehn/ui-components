// src/components/forms/Select.tsx
//
// Generic select primitive. Replaces bare <select> elements hand-rolled with
// Tailwind class strings in node config panels (LLMConfig, ForkConfig, etc.).

import { forwardRef, type SelectHTMLAttributes } from 'react';
import { useDensity } from '../shared/Density';
import { CONTROL_HEIGHT } from '../shared/controlMetrics';
import { cn } from '../../lib/cn';
import {
  TONE_BG,
  TONE_BORDER,
  TONE_TEXT,
  toneKey,
  type ToneOrAlias,
} from '../shared/tones';

export type SelectSize = 'sm' | 'md';

/**
 * `default` is the boxed field. `pill` is the compact, tone-coloured capsule
 * that status and priority pickers want — a chip you can change.
 *
 * It exists because that shape kept getting hand-rolled: a task row's
 * priority/status pickers are visually chips, and the only way to get one was
 * a bare `<select>` with `appearance-none rounded-full` plus a background-image
 * data-URI arrow and a hand-written `border-*-border bg-*-bg text-*-fg` triple
 * per state. Native `<select>` semantics (keyboard, mobile pickers, form
 * submission) are worth keeping, so this is the real element restyled, not a
 * button-and-menu impostor.
 */
/**
 * `ghost` (2.385.0) is the value side of a label/value row — no box, the
 * value right-aligned with the native chevron after it, a hover tint to say it
 * can be changed ("Model   Haiku ▾" in a run panel).
 */
export type SelectVariant = 'default' | 'pill' | 'ghost';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  /** Optional labelled option groups, rendered after the flat `options`. */
  groups?: SelectOptionGroup[];
  /** Shown as a disabled placeholder option when no value is selected. */
  placeholder?: string;
  size?: SelectSize;
  /** Shape. See `SelectVariant`. Default `default`. */
  variant?: SelectVariant;
  /**
   * Semantic tone for `variant="pill"` — the capsule paints in that tone's
   * soft surface (`-bg` / `-fg` / `-border`). Ignored by `variant="default"`,
   * whose chrome is the neutral field border. Default `neutral`.
   */
  tone?: ToneOrAlias;
  /** When true, applies a danger-colored border. */
  invalid?: boolean;
  /**
   * Classes for the `variant="pill"` wrapper `<span>` (the positioning context
   * for the chevron). `className` still lands on the `<select>` itself, so a
   * caller can restyle the capsule without losing the layout hook.
   */
  wrapperClassName?: string;
  /**
   * `native` (default): the browser's own arrow. `custom` (2.391.1): the
   * default field with `appearance-none` and the library's chevron drawn over
   * its right edge, so the field looks the same in every browser and theme
   * (the call-settings selects). The select is then wrapped in a relative
   * `<span>` that takes `wrapperClassName`.
   */
  chevron?: 'native' | 'custom';
  'data-testid'?: string;
}

const sizeClasses: Record<SelectSize, string> = {
  sm: `${CONTROL_HEIGHT.sm} px-2 text-xs`,
  md: `${CONTROL_HEIGHT.md} px-2.5 text-sm`,
};

// Right padding leaves room for the chevron, which is absolutely positioned
// over the select rather than painted as a background-image data-URI (an
// inline style, and unthemeable — the URI would have to bake in a colour).
const pillSizeClasses: Record<SelectSize, string> = {
  sm: 'h-6 pl-2 pr-4 text-xs',
  md: 'h-7 pl-2.5 pr-5 text-[12px]',
};

const pillChevronClasses: Record<SelectSize, string> = {
  sm: 'right-1.5',
  md: 'right-2',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    options,
    groups,
    placeholder,
    size: requestedSize,
    variant = 'default',
    tone = 'neutral',
    invalid = false,
    disabled = false,
    className,
    wrapperClassName,
    chevron = 'native',
    'data-testid': testId,
    'aria-invalid': ariaInvalidProp,
    value,
    ...rest
  },
  ref,
) {
  const density = useDensity();
  const size = requestedSize ?? (density === 'compact' ? 'sm' : 'md');
  // Same gap as Input: `invalid` painted a red border but never reached the
  // accessibility tree. An explicit caller-supplied value still wins.
  const ariaInvalid = ariaInvalidProp ?? (invalid || undefined);

  const optionNodes = (
    <>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
      {groups?.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </optgroup>
      ))}
    </>
  );

  const pill = variant === 'pill';
  const ghost = variant === 'ghost';
  const key = toneKey(tone);

  // ONE `<select>` for both variants: the element is the same control either
  // way, and rendering it twice would be two places to forget a prop.
  const select = (
    <select
      ref={ref}
      disabled={disabled}
      data-testid={testId}
      aria-invalid={ariaInvalid}
      value={value}
      className={cn(
        'font-inherit outline-none transition-colors duration-150 cursor-pointer',
        pill
          ? cn(
              'w-auto appearance-none rounded-full border font-semibold capitalize leading-[1.4]',
              'focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed',
              invalid
                ? 'border-danger text-danger-fg bg-danger-bg focus:ring-danger/40'
                : cn(TONE_BORDER[key], TONE_BG[key], TONE_TEXT[key]),
              pillSizeClasses[size],
            )
          : ghost
          ? cn(
              'w-auto max-w-full appearance-auto rounded-md border border-transparent bg-transparent text-right font-medium text-text-primary [text-align-last:right]',
              'hover:bg-surface-hover focus:border-info focus:ring-1 focus:ring-info/40',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              invalid && 'border-danger',
              sizeClasses[size],
            )
          : cn(
              'w-full appearance-none rounded-md border bg-surface-panel text-text-primary',
              // Custom chevron via background-image is banned (inline style).
              // Instead rely on the native OS chevron — appearance: none removes
              // it but is only needed to remove the native outline; here we let
              // native appearance show through via a Tailwind `select` reset
              // that keeps the arrow. We use `appearance-auto` to restore the
              // native arrow on modern browsers.
              chevron === 'custom' ? 'appearance-none pr-8' : 'appearance-auto',
              'focus:bg-surface focus:border-info focus:ring-1 focus:ring-info/40',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover',
              invalid
                ? 'border-danger focus:border-danger focus:ring-danger/40'
                : 'border-border-emphasis',
              sizeClasses[size],
            ),
        className,
      )}
      {...rest}
    >
      {optionNodes}
    </select>
  );

  // The default variant is the bare element, with no wrapper of any kind —
  // callers position it directly and a surprise <span> would break them.
  if (!pill && !ghost && chevron === 'custom') {
    return (
      <span className={cn('relative flex w-full items-center', wrapperClassName)}>
        {select}
        <svg
          aria-hidden="true"
          focusable="false"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('pointer-events-none absolute right-3 top-1/2 -translate-y-1/2', invalid ? 'text-danger-fg' : 'text-text-secondary')}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </span>
    );
  }

  if (!pill) return select;

  return (
    <span
      className={cn(
        'relative inline-flex items-center align-middle',
        disabled && 'opacity-50',
        wrapperClassName,
      )}
    >
      {select}
      {/* Decorative: the select underneath owns the semantics. The chevron is
          drawn here rather than painted as a background-image data-URI, which
          would be an inline style AND would bake in a colour the tone system
          could not reach. */}
      <svg
        aria-hidden="true"
        focusable="false"
        width="8"
        height="5"
        viewBox="0 0 8 5"
        className={cn(
          'pointer-events-none absolute top-1/2 -translate-y-1/2',
          pillChevronClasses[size],
          invalid ? 'text-danger-fg' : TONE_TEXT[key],
        )}
      >
        <path d="M0 0l4 5 4-5z" fill="currentColor" />
      </svg>
    </span>
  );
});

export default Select;
