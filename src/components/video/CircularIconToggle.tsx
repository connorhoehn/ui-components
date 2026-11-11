// CircularIconToggle — round on/off button used by the hangout pre-join
// shell and the upcoming MediaControlsBar. Replaces the inline
// ToggleButton in HangoutPreJoinShell.
//
// Consumer supplies `iconOn` and `iconOff` (typically a pair from
// MediaIcons). Pressed state is reflected via `aria-pressed`; visual
// tone flips between "active" (soft surface) and "off" (red soft).

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { DISABLED_REASON_DIM, DisabledReasonTooltip, useDisabledReason } from '../shared/DisabledReason';

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
   * it and is its tooltip (the library's `Tooltip`, on hover and on keyboard
   * focus) and accessible description. Unlike `disabled` alone, the button
   * stays focusable (`aria-disabled="true"`, clicks do nothing) so a keyboard
   * or screen-reader user can reach it and hear why.
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

/**
 * Held by a reason: the same fills, faded through their alpha rather than the
 * button's `opacity`, so the focus outline drawn around it stays at full
 * strength. No hover change: the control does nothing.
 */
const HELD_ON = 'bg-surface-emphasis/50 text-text-primary';
const HELD_OFF_NEUTRAL = 'bg-surface-hover/60 text-neutral';
const HELD_OFF_DANGER = 'bg-danger-bg/60 text-danger-fg';

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
  const held = useDisabledReason(disabledReason, disabled, describedBy);
  const reason = held.reason;
  const palette = reason !== undefined
    ? on ? HELD_ON : offTone === 'danger' ? HELD_OFF_DANGER : HELD_OFF_NEUTRAL
    : on
      ? ON_CLASSES
      : offTone === 'danger'
        ? OFF_DANGER
        : OFF_NEUTRAL;
  return (
    <DisabledReasonTooltip reason={reason}>
      <button
        data-ui-part=""
        type="button"
        aria-label={ariaLabel}
        aria-pressed={on}
        {...held.buttonProps}
        // The reason is the Tooltip; a native title would draw a second one.
        title={reason === undefined ? title : undefined}
        onClick={held.guard(onClick)}
        className={cn(
          'rounded-full grid place-items-center transition-colors duration-150',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          SIZE_CLASSES[size],
          palette,
          reason !== undefined && DISABLED_REASON_DIM,
          reason === undefined && held.off && 'opacity-40 cursor-not-allowed',
          !held.off && 'cursor-pointer',
          className,
        )}
        {...rest}
      >
        {on ? iconOn : iconOff}
        {held.description}
      </button>
    </DisabledReasonTooltip>
  );
}

export default CircularIconToggle;
