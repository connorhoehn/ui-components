// src/components/forms/Select.tsx
//
// Generic select primitive. Replaces bare <select> elements hand-rolled with
// Tailwind class strings in node config panels (LLMConfig, ForkConfig, etc.).

import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type SelectSize = 'sm' | 'md';

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
  /** When true, applies a danger-colored border. */
  invalid?: boolean;
  'data-testid'?: string;
}

const sizeClasses: Record<SelectSize, string> = {
  sm: 'h-7 px-2 text-[12px]',
  md: 'h-9 px-2.5 text-[13px]',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    options,
    groups,
    placeholder,
    size = 'md',
    invalid = false,
    disabled = false,
    className,
    'data-testid': testId,
    'aria-invalid': ariaInvalidProp,
    value,
    ...rest
  },
  ref,
) {
  // Same gap as Input: `invalid` painted a red border but never reached the
  // accessibility tree. An explicit caller-supplied value still wins.
  const ariaInvalid = ariaInvalidProp ?? (invalid || undefined);
  return (
    <select
      ref={ref}
      disabled={disabled}
      data-testid={testId}
      aria-invalid={ariaInvalid}
      value={value}
      className={cn(
        'w-full appearance-none rounded-md border bg-surface-panel font-inherit text-text-primary',
        'outline-none transition-colors duration-150 cursor-pointer',
        // Custom chevron via background-image is banned (inline style). Instead
        // rely on the native OS chevron — appearance: none removes it but is
        // only needed to remove the native outline; here we let native appearance
        // show through via a Tailwind `select` reset that keeps the arrow.
        // We use `appearance-auto` to restore the native arrow on modern browsers.
        'appearance-auto',
        'focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover',
        invalid
          ? 'border-danger focus:border-danger focus:ring-danger/40'
          : 'border-border-emphasis',
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
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
    </select>
  );
});

export default Select;
