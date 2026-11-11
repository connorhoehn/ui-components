// DisabledReason — what every control disabled WITH a reason does, in one place.
//
// A control that is off-limits for a reason the person can act on ("The host
// made you view-only", "Microphone blocked in the browser") must say why to
// everyone, not only to a mouse. The native `disabled` attribute takes the
// button out of the tab order, and a native `title` shows on hover only, so a
// keyboard or screen-reader user met a dead control with no explanation.
//
// With a reason the control:
// - stays focusable: `aria-disabled="true"` instead of `disabled`, and its
//   activation does nothing (`onClick` is dropped);
// - carries the reason as its accessible description (`aria-describedby` on a
//   hidden node, beside any description the caller passed);
// - shows the reason in the library's `Tooltip` on hover AND on keyboard focus
//   (`DisabledReasonTooltip`), with no native `title` competing with it;
// - keeps a visible focus ring: the caller dims the control's CONTENT
//   (`DISABLED_REASON_DIM`) rather than the whole button, because `opacity` on
//   the button would fade its focus outline with it.
//
// Without a reason nothing changes: `disabled` stays the native attribute.

import { useId, type ReactElement, type ReactNode } from 'react';
import { Tooltip, type TooltipPlacement } from './Tooltip';

/** Dims a control's children (icon, label) and keeps the button's own outline at full strength. */
export const DISABLED_REASON_DIM = 'cursor-not-allowed *:opacity-45';

export interface DisabledReasonState {
  /** The reason, or undefined (an empty string counts as none). */
  reason: string | undefined;
  /** The control is disabled at all — by `disabled` or by a reason. */
  off: boolean;
  /** Spread onto the `<button>`: `disabled` / `aria-disabled`, the description and the no-op press. */
  buttonProps: {
    disabled: boolean | undefined;
    'aria-disabled': 'true' | undefined;
    'aria-describedby': string | undefined;
    'data-disabled-reason': string | undefined;
  };
  /** `onClick` to pass: the caller's, or undefined while a reason holds. */
  guard: <F>(handler: F) => F | undefined;
  /** The hidden description node; render it inside the button. */
  description: ReactNode;
}

export function useDisabledReason(
  reasonInput: string | null | undefined,
  disabled: boolean | undefined,
  describedBy?: string,
): DisabledReasonState {
  const id = useId();
  const reason = reasonInput || undefined;
  const held = reason !== undefined;
  return {
    reason,
    off: Boolean(disabled) || held,
    buttonProps: {
      disabled: held ? undefined : disabled,
      'aria-disabled': held ? 'true' : undefined,
      'aria-describedby': held ? [describedBy, id].filter(Boolean).join(' ') : describedBy,
      'data-disabled-reason': reason,
    },
    guard: (handler) => (held ? undefined : handler),
    description: held ? <span id={id} hidden>{reason}</span> : null,
  };
}

export interface DisabledReasonTooltipProps {
  /** The reason; none renders the control alone with no tooltip. */
  reason: string | undefined;
  /** The control. Its layout is untouched: the wrapper is `display: contents`. */
  children: ReactElement;
  placement?: TooltipPlacement;
  'data-testid'?: string;
}

/**
 * The reason as a `Tooltip` on hover and on keyboard focus. The wrapper is
 * always mounted (a reason that arrives while the control has focus does not
 * remount it and drop focus) and is `display: contents`, so the control stays
 * its parent's flex or grid item exactly as without it.
 */
export function DisabledReasonTooltip({ reason, children, placement = 'top', 'data-testid': testId }: DisabledReasonTooltipProps) {
  return (
    <Tooltip
      content={reason ?? ''}
      disabled={!reason}
      placement={placement}
      triggerClassName="contents"
      openDelay={200}
      {...(testId ? { 'data-testid': testId } : {})}
    >
      {children}
    </Tooltip>
  );
}
