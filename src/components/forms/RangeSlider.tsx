import { useId } from 'react';
import { cn } from '../../lib/cn';

export interface RangeSliderProps {
  value: readonly [number, number];
  min: number;
  max: number;
  step?: number;
  minDistance?: number;
  labels: readonly [string, string];
  formatValue?: (value: number) => string;
  onChange: (value: [number, number]) => void;
  className?: string;
}

/** Two native keyboard-operable handles on one track, with stable tab order. */
export function RangeSlider({ value, min, max, step = 1, minDistance = step, labels, formatValue, onChange, className }: RangeSliderProps) {
  const id = useId();
  const span = Math.max(1, max - min);
  const clamp = (number: number) => Math.max(min, Math.min(max, number));
  const lower = clamp(value[0]);
  const upper = Math.max(lower, clamp(value[1]));
  const distance = Math.min(minDistance, max - min);
  return (
    <div className={cn('relative h-7 min-w-0', className)}>
      <div className="absolute inset-x-0 top-3 h-1 rounded-full bg-surface-inset" />
      <div className="absolute top-3 h-1 rounded-full bg-primary/30" style={{ left: `${(lower - min) / span * 100}%`, right: `${(max - upper) / span * 100}%` }} />
      {([0, 1] as const).map((index) => (
        <input
          key={index}
          id={`${id}-${index}`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={index === 0 ? lower : upper}
          disabled={max <= min}
          aria-label={labels[index]}
          aria-valuemin={index === 0 ? min : Math.min(max, lower + distance)}
          aria-valuemax={index === 0 ? Math.max(min, upper - distance) : max}
          aria-valuetext={formatValue?.(index === 0 ? lower : upper)}
          onChange={(event) => {
            const next = clamp(Number(event.target.value));
            onChange(index === 0 ? [Math.min(next, upper - distance), upper] : [lower, Math.max(next, lower + distance)]);
          }}
          className="pointer-events-none absolute inset-0 m-0 h-7 w-full appearance-none bg-transparent accent-primary focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-surface [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface [&::-moz-range-thumb]:bg-primary"
        />
      ))}
    </div>
  );
}
