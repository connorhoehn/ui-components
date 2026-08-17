// src/components/forms/Input.tsx
//
// Generic text input primitive. Replaces the hand-rolled bare <input> patterns
// scattered across config panels. Supports an optional prefix/suffix icon slot
// for units, search icons, etc.

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type InputSize = 'sm' | 'md';
export type InputType = 'text' | 'number' | 'url' | 'password' | 'email' | 'search';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'prefix'> {
  type?: InputType;
  size?: InputSize;
  /** Node rendered inside the left edge of the input (icon, currency symbol, etc.) */
  prefix?: ReactNode;
  /** Node rendered inside the right edge of the input (unit, clear button, etc.) */
  suffix?: ReactNode;
  /** When true, applies a danger-colored border. */
  invalid?: boolean;
  /** When true, renders the input value in a monospace font (e.g. JSONPath, code). */
  mono?: boolean;
  'data-testid'?: string;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-7 px-2 text-[12px]',
  md: 'h-9 px-2.5 text-[13px]',
};

const slotSizeClasses: Record<InputSize, string> = {
  sm: 'px-1.5',
  md: 'px-2',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    size = 'md',
    prefix,
    suffix,
    invalid = false,
    disabled = false,
    mono = false,
    className,
    'data-testid': testId,
    ...rest
  },
  ref,
) {
  const hasPrefix = prefix != null;
  const hasSuffix = suffix != null;

  if (!hasPrefix && !hasSuffix) {
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        data-testid={testId}
        className={cn(
          'w-full rounded-md border bg-surface-panel font-inherit text-text-primary',
          'outline-none transition-colors duration-150',
          'placeholder:text-text-tertiary',
          'focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover',
          invalid
            ? 'border-danger focus:border-danger focus:ring-danger/40'
            : 'border-border-emphasis',
          mono && 'font-mono',
          sizeClasses[size],
          className,
        )}
        {...rest}
      />
    );
  }

  return (
    <div
      className={cn(
        'relative flex w-full items-center rounded-md border bg-surface-panel',
        'transition-colors duration-150',
        'focus-within:bg-white focus-within:border-info focus-within:ring-1 focus-within:ring-info/40',
        invalid
          ? 'border-danger focus-within:border-danger focus-within:ring-danger/40'
          : 'border-border-emphasis',
        disabled && 'opacity-50 cursor-not-allowed bg-surface-hover',
      )}
    >
      {hasPrefix && (
        <span
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center text-text-tertiary',
            slotSizeClasses[size],
          )}
        >
          {prefix}
        </span>
      )}
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        data-testid={testId}
        className={cn(
          'flex-1 min-w-0 bg-transparent font-inherit text-text-primary outline-none',
          'placeholder:text-text-tertiary',
          'disabled:cursor-not-allowed',
          hasPrefix ? 'pl-0' : sizeClasses[size].split(' ')[1],
          hasSuffix ? 'pr-0' : sizeClasses[size].split(' ')[2],
          size === 'sm' ? 'h-7 text-[12px]' : 'h-9 text-[13px]',
          mono && 'font-mono',
          className,
        )}
        {...rest}
      />
      {hasSuffix && (
        <span
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center text-text-tertiary',
            slotSizeClasses[size],
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  );
});

export default Input;
