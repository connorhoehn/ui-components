// CallNoticePill — something the person on a call must know, said in one line.
//
// A call widget is a few hundred pixels across; a page Banner dropped into it
// covers the person's own tile with a title, a paragraph and a button stack,
// which reads as a rendering fault rather than a notice. This is the same
// message at the widget's scale: one pill along the top edge, the action on
// the same line, nothing over the video that does not need to be.
//
// Long text is never silently lost. A message wider than the pill wraps, up
// to `maxLines` (default 2: a standing notice such as "The host made you
// view-only: <their reason>" reads whole without covering the tile); past
// that it ends with an ellipsis, and then the full text is the pill's
// tooltip on hover and on keyboard focus (the message becomes focusable only
// while it is cut). The whole message stays in the status region either way,
// so a screen reader hears all of it. A notice that needs a paragraph and a
// choice is `CallInterruptedNotice`, not a taller pill.

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Tooltip, isTextCut } from '../shared/Tooltip';

export interface CallNoticePillProps {
  show: boolean;
  tone?: 'warning' | 'error' | 'info';
  /** The one sentence. */
  message: ReactNode;
  /** Small buttons, rendered inline after the message. */
  actions?: ReactNode;
  /**
   * Lines the message may wrap to before it is cut with an ellipsis (and its
   * full text moves to a tooltip). Default 2. `1` is the single truncating
   * line the pill drew before.
   */
  maxLines?: 1 | 2 | 3;
  className?: string;
  'data-testid'?: string;
}

// Ink that clears 4.5:1 on each fill in both themes: white on amber was
// 3.2:1 in light and about 1.6:1 on dark mode's pastel amber, so the warning
// pill takes the call-chrome ink (as RaisedHandBadge does); the error pill
// takes the danger fill's own ink (`on-danger`: white in light, dark in dark).
const TONE: Record<NonNullable<CallNoticePillProps['tone']>, string> = {
  warning: 'bg-warning/95 text-call-chrome',
  error: 'bg-danger/95 text-on-danger',
  info: 'bg-black/70 text-white',
};

const CLAMP: Record<1 | 2 | 3, string> = {
  1: 'truncate',
  2: 'line-clamp-2 break-words',
  3: 'line-clamp-3 break-words',
};

export function CallNoticePill({ show, tone = 'warning', message, actions, maxLines = 2, className, 'data-testid': testId = 'call-notice' }: CallNoticePillProps) {
  const messageRef = useRef<HTMLSpanElement | null>(null);
  const [cut, setCut] = useState(false);

  // Is the message cut at its line limit? Read after layout and again
  // whenever the pill's box changes (the tile resizes, the text changes).
  useLayoutEffect(() => {
    const el = messageRef.current;
    if (!show || !el) { setCut(false); return; }
    const read = () => setCut(isTextCut(el));
    read();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, [show, message, maxLines]);

  if (!show) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid={testId}
      data-tone={tone}
      data-max-lines={maxLines}
      data-truncated={cut ? 'true' : undefined}
      className={cn(
        // `w-max` + a max width: the pill hugs a short message and wraps a
        // long one at the tile's width (an absolute box at left:50% would
        // otherwise wrap at half the tile).
        'pointer-events-auto absolute left-1/2 top-3 z-30 flex w-max max-w-[min(36rem,calc(100%-1rem))] -translate-x-1/2 items-center gap-2 px-3 py-1.5 text-xs font-medium shadow-lg',
        maxLines === 1 ? 'rounded-full' : 'rounded-2xl',
        TONE[tone],
        className,
      )}
    >
      <Tooltip content={message} disabled={!cut} placement="bottom" triggerClassName="block min-w-0" data-testid={`${testId}-full-text`}>
        <span
          ref={messageRef}
          className={cn('block min-w-0 leading-4', CLAMP[maxLines], cut && '-mx-1 rounded-sm px-1 focus-visible:outline-2 focus-visible:outline-current')}
          // Only while cut: a keyboard user can reach the rest of the text.
          // The whole text is in the DOM (the clamp is visual), so a screen
          // reader already hears all of it from the status region.
          tabIndex={cut ? 0 : undefined}
          data-testid={`${testId}-message`}
        >
          {message}
        </span>
      </Tooltip>
      {actions && <span className="flex shrink-0 items-center gap-1">{actions}</span>}
    </div>
  );
}

export default CallNoticePill;
