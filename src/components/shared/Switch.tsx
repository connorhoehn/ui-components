import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  /** Accessible label — required for screen readers when no visible label is wired. */
  'aria-label'?: string;
  /** When using <FormField label="..."><Switch ...></FormField>, set this to the label's id. */
  'aria-labelledby'?: string;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const TRACK_SIZES: Record<SwitchSize, string> = {
  sm: 'w-7 h-4',
  md: 'w-9 h-5',
};

const KNOB_SIZES: Record<SwitchSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
};

const KNOB_TRANSLATE: Record<SwitchSize, string> = {
  sm: 'translate-x-3',
  md: 'translate-x-4',
};

/**
 * Accessible on/off toggle. Renders as a `role="switch"` button so screen
 * readers announce the state. Use inside `FormField` for a labeled row, or
 * pass `aria-label` directly for inline use.
 */
export default function Switch({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  style,
  'data-testid': testId,
}: SwitchProps) {
  return (
    <button
      data-ui-part=""
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
      data-testid={testId}
      data-ui-control="switch"
      onClick={() => { if (!disabled) onChange(!checked); }}
      className={cn(
        'relative inline-flex items-center rounded-full border border-transparent transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-info',
        TRACK_SIZES[size],
        checked ? 'bg-info' : 'bg-surface-emphasis',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      style={style}
    >
      <span
        className={cn(
          // `bg-white` is DELIBERATE: the knob rides an accent/grey TRACK,
          // not the page, so it must contrast with the track in both themes.
          // `bg-surface` would go #1e293b in dark and vanish into the track.
          'inline-block rounded-full bg-white shadow transform transition-transform',
          KNOB_SIZES[size],
          checked ? KNOB_TRANSLATE[size] : 'translate-x-0.5',
        )}
      />
    </button>
  );
}
