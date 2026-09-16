// CallInterruptedNotice — the call stopped, and only the person can decide
// what happens next.
//
// Sibling of <CallNoticePill> and deliberately a different shape. The pill is
// one truncating line because its messages are transient and self-resolving
// ("Reconnecting…") — nothing there is worth covering a tile for, and anything
// that overflows is gone by the time it would have mattered. This moment is the
// opposite on every axis: it does not resolve on its own, it carries two
// actions with different consequences, and the person needs the reason before
// choosing between them. A second sentence inside the pill would be clipped by
// its own `truncate`, which is worse than saying nothing.
//
// So: a centred card over the stage, the way Teams and Zoom both stage this.
// Title names the moment, one line says what happened and what the buttons do,
// actions sit under it where a decision belongs. Everything else in the call
// chrome stays reachable behind it — this is not a modal, and trapping focus
// would take Leave away from someone who only wanted to hang up.
//
// Copy is consumer-supplied rather than baked in. "Terminal call failure" is
// several different sentences depending on what the host actually knows —
// exhausted ICE retries, a revoked token, a room that was closed under you —
// and a component that hardcodes one of them makes the other two lie.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface CallInterruptedNoticeProps {
  show: boolean;
  /** Names the moment in two or three words, e.g. "Call disconnected". */
  title: ReactNode;
  /** One line: what happened, and what the actions below will do about it. */
  description: ReactNode;
  /** The buttons. Rendered in a centred row under the description. */
  actions?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function CallInterruptedNotice({
  show,
  title,
  description,
  actions,
  className,
  'data-testid': testId = 'call-interrupted-notice',
}: CallInterruptedNoticeProps) {
  if (!show) return null;
  return (
    <div
      // `alert`, not the pill's `status`. A polite live region is queued behind
      // whatever the screen reader is already saying and may be dropped
      // outright if the user is mid-utterance — acceptable for "Reconnecting…",
      // which repeats itself by existing, and not for a dead call, which
      // otherwise reads as silence. Assertive also announces the whole subtree,
      // so the remedies arrive with the problem rather than having to be
      // hunted for. Not `alertdialog`: that contract obliges us to trap focus,
      // and the control bar behind this card is still the user's.
      role="alert"
      aria-live="assertive"
      data-testid={testId}
      className={cn(
        'pointer-events-auto absolute left-1/2 top-1/2 z-30 w-[min(22rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2',
        'rounded-xl px-4 py-4 text-center shadow-2xl',
        // Call chrome, not a themed surface: this sits on the stage, which is
        // dark in both themes, so the card is too. See --color-call-chrome —
        // `bg-surface` here would go white-on-white-text in light mode.
        'border border-call-chrome-border bg-call-chrome text-white',
        className,
      )}
    >
      <p className="m-0 text-sm font-semibold">{title}</p>
      {/* No `truncate` anywhere in here — the whole point of the card over the
          pill is that the cause gets to be a sentence. */}
      <p className="m-0 mt-1 text-xs leading-relaxed text-white/70">{description}</p>
      {actions && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">{actions}</div>
      )}
    </div>
  );
}

export default CallInterruptedNotice;
