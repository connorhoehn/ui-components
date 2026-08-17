// src/components/forms/JsonPathInput.tsx
//
// Composes <Input mono> with a horizontal strip of quick-fill sample chips.
// Replaces the copy-pasted SamplePills pattern scattered across wsg-frontend
// config panels (CropConfig, AdjustBwConfig, AdjustLayerConfig, SaveConfig,
// ScatterConfig).

import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn';
import { Input } from './Input';

export interface JsonPathSample {
  /** Short display label, e.g. '$.trigger.imageRef' */
  label: string;
  /** The value to paste into the input when clicked */
  value: string;
}

export interface JsonPathInputProps {
  value: string;
  onChange: (value: string) => void;
  samples?: JsonPathSample[];
  placeholder?: string;
  invalid?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  /**
   * When true, validate that value starts with '$.' on blur and surface the
   * error via the errorMessage slot (caller receives the validated value
   * unchanged — validation is display-only here).
   */
  enforcePrefix?: boolean;
  'data-testid'?: string;
}

const chipSizeClasses = {
  sm: 'px-1.5 py-0.5 text-[11px]',
  md: 'px-2 py-0.5 text-[12px]',
};

export const JsonPathInput = forwardRef<HTMLInputElement, JsonPathInputProps>(
  function JsonPathInput(
    {
      value,
      onChange,
      samples,
      placeholder = '$.path.to.value',
      invalid = false,
      errorMessage,
      disabled = false,
      size = 'md',
      enforcePrefix = false,
      'data-testid': testId,
    },
    ref,
  ) {
    const errorId = useId();

    const prefixError =
      enforcePrefix && value.length > 0 && !value.startsWith('$.')
        ? 'JSONPath must start with "$."'
        : undefined;

    const isInvalid = invalid || prefixError != null;
    const displayError = errorMessage ?? prefixError;

    return (
      <div className="flex flex-col gap-1 w-full">
        <Input
          ref={ref}
          type="text"
          mono
          size={size}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          invalid={isInvalid}
          disabled={disabled}
          data-testid={testId}
          aria-describedby={displayError ? errorId : undefined}
          aria-invalid={isInvalid || undefined}
        />

        {samples && samples.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {samples.map((sample) => (
              <button
                key={sample.value}
                type="button"
                disabled={disabled}
                onClick={() => onChange(sample.value)}
                className={cn(
                  'rounded border border-slate-200 bg-slate-100 font-mono text-slate-600',
                  'transition-colors duration-100',
                  'hover:bg-info-bg hover:border-info-border hover:text-info-fg',
                  'focus:outline-none focus:ring-2 focus:ring-info/40',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  chipSizeClasses[size],
                )}
              >
                {sample.label}
              </button>
            ))}
          </div>
        )}

        {displayError && (
          <p
            id={errorId}
            role="alert"
            className="text-[11px] text-danger-fg leading-4"
          >
            {displayError}
          </p>
        )}
      </div>
    );
  },
);

export default JsonPathInput;
