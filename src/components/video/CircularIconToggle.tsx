// CircularIconToggle — round on/off button used by the hangout pre-join
// shell and the upcoming MediaControlsBar. Replaces the inline
// ToggleButton in HangoutPreJoinShell.
//
// Consumer supplies `iconOn` and `iconOff` (typically a pair from
// MediaIcons). Pressed state is reflected via `aria-pressed`; visual
// tone flips between "active" (soft surface) and "off" (red soft).

import { useId, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type CircularIconToggleTone = 'neutral' | 'danger';
export type CircularIconToggleSize = 'sm' | 'md' | 'lg';

export interface CircularIconToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Whether the underlying feature (mic / cam / share) is currently on. */
  on: boolean;
  /** Icon rendered when `on === true`. */
  iconOn: ReactNode;
  /** Icon rendered when `on === false`. */
  iconOff: ReactNode;
  /** Required for screen readers — describes the toggle target
   *  ("Microphone", "Camera"). The component derives the on/off state
   *  via aria-pressed. */
  'aria-label': string;
  /** Tone when in the OFF state. Defaults to 'danger' (red soft) to
   *  match the Google Meet convention. */
  offTone?: CircularIconToggleTone;
  size?: CircularIconToggleSize;
  /**
   * Why the control is off-limits ("The host made you view-only"). Disables
   * it and is its tooltip and accessible description. Unlike `disabled`
   * alone, the button stays focusable (`aria-disabled="true"`, clicks do
   * nothing) so a keyboard or screen-reader user can reach it and hear why.
   */
  disabledReason?: string;
}

const SIZE_CLASSES: Record<CircularIconToggleSize, string> = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
};

const ON_CLASSES =
  'bg-surface-emphasis text-text-primary hover:bg-surface-emphasis';

const OFF_NEUTRAL =
  'bg-surface-hover text-neutral hover:bg-surface-emphasis';

const OFF_DANGER =
  'bg-danger-bg text-danger-fg hover:bg-danger-bg';

export function CircularIconToggle({
  on,
  iconOn,
  iconOff,
  'aria-label': ariaLabel,
  offTone = 'danger',
  size = 'md',
  disabled,
  disabledReason,
  className,
  title,
  onClick,
  'aria-describedby': describedBy,
  ...rest
}: CircularIconToggleProps) {
  const reasonId = useId();
  const reason = disabledReason || undefined;
  const off = Boolean(disabled) || reason !== undefined;
  const palette = on
    ? ON_CLASSES
    : offTone === 'danger'
      ? OFF_DANGER
      : OFF_NEUTRAL;
  return (
    <button
      data-ui-part=""
      type="button"
      aria-label={ariaLabel}
      aria-pressed={on}
      disabled={reason === undefined ? disabled : undefined}
      aria-disabled={reason !== undefined ? 'true' : undefined}
      aria-describedby={reason !== undefined ? [describedBy, reasonId].filter(Boolean).join(' ') : describedBy}
      title={reason ?? title}
      onClick={reason !== undefined ? undefined : onClick}
      data-disabled-reason={reason}
      className={cn(
        'rounded-full grid place-items-center transition-colors duration-150',
        SIZE_CLASSES[size],
        palette,
        off && 'opacity-40 cursor-not-allowed',
        !off && 'cursor-pointer',
        className,
      )}
      {...rest}
    >
      {on ? iconOn : iconOff}
      {reason !== undefined && <span id={reasonId} hidden>{reason}</span>}
    </button>
  );
}

export default CircularIconToggle;
