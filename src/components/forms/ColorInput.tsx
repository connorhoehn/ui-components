// src/components/forms/ColorInput.tsx
//
// Color swatch primitive — a thin wrapper over `<input type="color">`. It
// exists so pages needing a color picker (collaboration boards, theming
// panels) don't hand-roll the input: the native control is fine, but the
// sizing/border reset shouldn't be re-invented per call site.

import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export interface ColorInputProps {
  /** Hex color value, e.g. "#3b82f6". */
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  /** Accessible name. Required when no visible <label> wraps this. */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  function ColorInput(
    { value, onChange, disabled = false, 'aria-label': ariaLabel, className, 'data-testid': testId },
    ref,
  ) {
    return (
      <input
        ref={ref}
        type="color"
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-8 h-6 p-0 border-none bg-transparent cursor-pointer disabled:cursor-not-allowed',
          className,
        )}
        data-testid={testId}
      />
    );
  },
);

export default ColorInput;
