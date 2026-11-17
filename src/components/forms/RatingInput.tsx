// src/components/forms/RatingInput.tsx
//
// One rating on a fixed scale, each point carrying its own label (a scorecard
// competency rated 1 to 4: "Does not meet" to "Exceeds"). "Not rated" is a
// value of its own (null), offered as the first choice. A radio group with a
// single tab stop; the arrow keys move the choice, as native radios do.
// Read-only mode shows the chosen label as text.

import { useId, useRef, type KeyboardEvent } from 'react';
import FormField from '../shared/FormField';
import { T } from '../shared/Text';
import { cn } from '../../lib/cn';

export interface RatingOption {
  value: number;
  label: string;
}

export interface RatingInputProps {
  label: string;
  /** The chosen point's value, or null for "not rated". */
  value: number | null;
  onChange: (value: number | null) => void;
  /** The scale, lowest to highest, each point with its label. */
  options: RatingOption[];
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** Shows the chosen label as text instead of the choices. */
  readOnly?: boolean;
  /** Label of the null choice. @default 'Not rated' */
  notRatedLabel?: string;
  'data-testid'?: string;
}

export function RatingInput({
  label, value, onChange, options, hint, error, required, disabled = false, readOnly = false,
  notRatedLabel = 'Not rated', 'data-testid': testId,
}: RatingInputProps) {
  const baseId = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  // Choice 0 is "not rated"; choices 1..n are the scale.
  const choices: Array<{ value: number | null; label: string }> = [{ value: null, label: notRatedLabel }, ...options];
  const selected = Math.max(0, choices.findIndex((c) => c.value === value));

  const move = (from: number, step: number) => {
    const to = (from + step + choices.length) % choices.length;
    onChange(choices[to].value);
    refs.current[to]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, idx: number) => {
    if (disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(idx, 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(idx, -1); }
    else if (e.key === 'Home') { e.preventDefault(); move(idx, -idx); }
    else if (e.key === 'End') { e.preventDefault(); move(idx, choices.length - 1 - idx); }
  };

  return (
    <FormField label={label} hint={hint} error={error} required={required} data-testid={testId}>
      {(wiring) => readOnly ? (
        <T
          size="sm"
          tone={value === null ? 'tertiary' : 'primary'}
          id={wiring.id}
          data-testid={testId ? `${testId}-value` : undefined}
        >
          {choices[selected].label}
        </T>
      ) : (
        <div
          id={wiring.id}
          role="radiogroup"
          aria-labelledby={wiring.labelId}
          aria-describedby={wiring['aria-describedby']}
          aria-invalid={wiring['aria-invalid']}
          aria-required={wiring['aria-required']}
          aria-disabled={disabled || undefined}
          data-ui-control="rating"
          className="flex flex-wrap gap-1.5"
        >
          {choices.map((c, idx) => {
            const checked = idx === selected;
            return (
              <button
                key={`${baseId}-${c.value ?? 'none'}`}
                ref={(el) => { refs.current[idx] = el; }}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                disabled={disabled}
                onClick={() => onChange(c.value)}
                onKeyDown={(e) => onKeyDown(e, idx)}
                className={cn(
                  'rounded-md border px-2.5 py-1 transition-colors duration-150 outline-none',
                  'focus-visible:ring-2 focus-visible:ring-info/40',
                  checked
                    ? 'border-info bg-info/10'
                    : 'border-border-emphasis bg-surface-panel hover:border-info',
                  error && !checked && 'border-danger',
                  disabled && 'opacity-50 cursor-not-allowed',
                )}
              >
                <T size="sm" weight={checked ? 'medium' : 'normal'} tone={checked ? 'primary' : 'secondary'}>
                  {c.value !== null ? `${c.value} ` : ''}{c.label}
                </T>
              </button>
            );
          })}
        </div>
      )}
    </FormField>
  );
}

export default RatingInput;
