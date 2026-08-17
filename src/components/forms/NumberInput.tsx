// src/components/forms/NumberInput.tsx
//
// Numeric input primitive that wraps <Input type="number"> with an optional
// unit suffix (px, °, %, etc.) and clamping on blur. Replaces hand-rolled
// number inputs across node config panels.

import { forwardRef, useCallback } from 'react';
import { Input } from './Input';

export interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Rendered as a right-edge suffix: 'px' | '°' | '%' | … */
  unit?: string;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  'data-testid'?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      value,
      onChange,
      min,
      max,
      step,
      unit,
      placeholder,
      invalid = false,
      disabled = false,
      size = 'md',
      'data-testid': testId,
    },
    ref,
  ) {
    const clamp = useCallback(
      (raw: number): number => {
        let clamped = raw;
        if (min !== undefined && clamped < min) clamped = min;
        if (max !== undefined && clamped > max) clamped = max;
        return clamped;
      },
      [min, max],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsed = parseFloat(e.target.value);
        if (!Number.isNaN(parsed)) {
          onChange(parsed);
        }
      },
      [onChange],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        const parsed = parseFloat(e.target.value);
        if (!Number.isNaN(parsed)) {
          const clamped = clamp(parsed);
          if (clamped !== parsed) {
            onChange(clamped);
          }
        }
      },
      [clamp, onChange],
    );

    const unitSuffix = unit ? (
      <span className="text-text-tertiary font-sans text-[12px] select-none">{unit}</span>
    ) : undefined;

    return (
      <Input
        ref={ref}
        type="number"
        size={size}
        value={value}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        invalid={invalid}
        disabled={disabled}
        suffix={unitSuffix}
        data-testid={testId}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  },
);

export default NumberInput;
