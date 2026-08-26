// src/components/forms/RadioGroup.tsx
//
// Vertical (or horizontal) enum picker using native <input type="radio">.
// SegmentedControl handles short horizontal lists; RadioGroup handles vertical
// lists and options that carry a description. Used by wsg-fork's ActionConfig
// on-error picker, condition-mode pickers, error-policy pickers, etc.

import { useId } from 'react';
import { cn } from '../../lib/cn';

export interface RadioOption<T extends string = string> {
  value: T;
  label: string;
  /** Short caption rendered below the label in muted text. */
  description?: string;
}

export interface RadioGroupProps<T extends string = string> {
  /** Used as the HTML radio group name and as a stable ID base for labels. */
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  disabled?: boolean;
  /** @default 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  'data-testid'?: string;
}

export function RadioGroup<T extends string = string>({
  name,
  value,
  onChange,
  options,
  disabled = false,
  orientation = 'vertical',
  'data-testid': testId,
}: RadioGroupProps<T>) {
  const baseId = useId();

  return (
    <div
      role="radiogroup"
      data-testid={testId}
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row flex-wrap gap-x-4 gap-y-2',
      )}
    >
      {options.map((option, idx) => {
        const optionId = `${baseId}-${idx}`;
        const isChecked = option.value === value;

        return (
          <label
            key={option.value}
            htmlFor={optionId}
            className={cn(
              'flex items-start gap-2.5 cursor-pointer select-none',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            {/* Native radio — visually hidden dot replaced by styled ring */}
            <span className="relative flex shrink-0 mt-0.5">
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={disabled}
                onChange={() => onChange(option.value)}
                className="sr-only peer"
              />
              {/* Outer circle */}
              <span
                aria-hidden="true"
                className={cn(
                  'block w-4 h-4 rounded-full border-2 transition-colors duration-150',
                  isChecked
                    ? 'border-info bg-surface'
                    : 'border-border-emphasis bg-surface',
                  !disabled && !isChecked && 'peer-hover:border-info',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1',
                )}
              />
              {/* Inner dot — only rendered when checked */}
              {isChecked && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
                />
              )}
            </span>

            <span className="flex flex-col">
              <span
                className={cn(
                  'text-[13px] leading-5 font-medium',
                  disabled ? 'text-text-tertiary' : 'text-text-primary',
                )}
              >
                {option.label}
              </span>
              {option.description && (
                <span
                  className={cn(
                    'text-[11px] leading-4 mt-0.5',
                    disabled ? 'text-text-disabled' : 'text-neutral',
                  )}
                >
                  {option.description}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export default RadioGroup;
