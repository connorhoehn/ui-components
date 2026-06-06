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
          'w-full rounded-md border bg-slate-50 font-inherit text-slate-900',
          'outline-none transition-colors duration-150',
          'placeholder:text-slate-400',
          'focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100',
          invalid
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
            : 'border-slate-300',
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
        'relative flex w-full items-center rounded-md border bg-slate-50',
        'transition-colors duration-150',
        'focus-within:bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/40',
        invalid
          ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/40'
          : 'border-slate-300',
        disabled && 'opacity-50 cursor-not-allowed bg-slate-100',
      )}
    >
      {hasPrefix && (
        <span
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center text-slate-400',
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
          'flex-1 min-w-0 bg-transparent font-inherit text-slate-900 outline-none',
          'placeholder:text-slate-400',
          'disabled:cursor-not-allowed',
          hasPrefix ? 'pl-0' : sizeClasses[size].split(' ')[1],
          hasSuffix ? 'pr-0' : sizeClasses[size].split(' ')[2],
          size === 'sm' ? 'h-7 text-[12px]' : 'h-9 text-[13px]',
          className,
        )}
        {...rest}
      />
      {hasSuffix && (
        <span
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center text-slate-400',
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
