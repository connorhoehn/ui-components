// src/components/forms/Slider.tsx
//
// Range input primitive. The last hand-rolled control type left in the node
// config panels: three panels each had their own `<input type="range">` with
// its own value readout stuck above or beside it, laid out differently in each.
//
// The readout is part of the component rather than each caller's job, because
// a slider with no numeric feedback is unusable for anything with a real scale
// — "somewhere around the middle" is not a temperature.

import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Accessible name. Required when no visible label is wired up. */
  'aria-label'?: string;
  /**
   * What the value means to a listener ("Frame 12 of 48") when the raw number
   * does not say it. Since 2.520.0.
   */
  'aria-valuetext'?: string;
  /**
   * Show the current value beside the track. Pass a formatter to control how
   * it reads (units, decimal places); `true` uses the raw number.
   * @default true
   */
  readout?: boolean | ((value: number) => string);
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValueText,
    readout = true,
    disabled = false,
    className,
    'data-testid': testId,
  },
  ref,
) {
  const id = useId();
  const text =
    typeof readout === 'function' ? readout(value) : String(value);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        data-ui-part=""
        ref={ref}
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-valuetext={ariaValueText}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 w-full min-w-0 accent-primary cursor-pointer disabled:cursor-not-allowed"
        data-testid={testId}
        data-ui-control="slider"
      />
      {readout !== false && (
        <output
          htmlFor={id}
          className="text-xs text-text-secondary tabular-nums min-w-[2.5rem] text-right"
        >
          {text}
        </output>
      )}
    </div>
  );
});

export default Slider;
