// src/components/shared/LiveRegion.tsx
//
// A screen-reader-only ARIA live region with a rate limiter.
//
// The library had no way to announce "something changed on its own" — every
// live surface either shipped no announcement at all (an SSE ticker that a
// screen-reader user experiences as a silent, permanently-empty box) or
// dropped `aria-live` straight onto the scrolling list, which turns a busy
// stream into an unusable page: the reader queues one utterance per row and
// falls minutes behind the screen, and the user cannot get a word in.
//
// The fix in both directions is the same: keep the visible list OUT of the
// live region, and announce a short, coalesced summary of it instead. That is
// what `throttleMs` is for — updates arriving inside the window are collapsed,
// and only the most recent one is spoken when the window closes.
//
// Politeness guidance:
//   'polite'    — default. Waits for the user to stop; correct for anything
//                 the user did not just ask for.
//   'assertive' — interrupts whatever is being read. Reserve it for a state
//                 the operator must act on now (a transport that just went
//                 down). Never put a high-frequency feed behind it.
//   'off'       — mounted but silent. Use it to make "deliberately not
//                 announced" explicit in the markup rather than implied by an
//                 absent attribute.

import { useEffect, useRef, useState } from 'react';
import VisuallyHidden from './VisuallyHidden';

export type LiveRegionPoliteness = 'polite' | 'assertive' | 'off';

export interface LiveRegionProps {
  /**
   * What to announce. Announced whenever the string changes; set it to `''`
   * to say nothing (an empty region is never spoken).
   */
  message: string;
  /** @default 'polite' */
  politeness?: LiveRegionPoliteness;
  /**
   * Announce the whole message rather than only the changed part.
   * @default true — a partial diff of a status line is rarely intelligible.
   */
  atomic?: boolean;
  /**
   * Minimum gap between announcements, in ms. Messages arriving inside the
   * window are coalesced and the latest one is announced when it closes.
   * `0` disables throttling.
   * @default 0
   */
  throttleMs?: number;
  /**
   * Landmark role. `status` (polite) and `alert` (assertive) carry their own
   * implicit live semantics and are what most callers want; `log` suits an
   * append-only feed. `none` renders the bare `aria-live` container — pick it
   * when the page already has a `status`/`alert` element and a second one
   * would make `getByRole` ambiguous.
   * @default 'status'
   */
  role?: 'status' | 'alert' | 'log' | 'none';
  'data-testid'?: string;
}

/** Coalesces rapid updates to at most one per `ms`, keeping the latest. */
function useThrottledValue(value: string, ms: number): string {
  const [shown, setShown] = useState(value);
  const latest = useRef(value);
  const lastEmitted = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    latest.current = value;
    if (ms <= 0) {
      setShown(value);
      return;
    }
    const elapsed = Date.now() - lastEmitted.current;
    if (elapsed >= ms) {
      lastEmitted.current = Date.now();
      setShown(value);
      return;
    }
    // A flush is already scheduled; it will pick up `latest.current`.
    if (timer.current) return;
    timer.current = setTimeout(() => {
      timer.current = null;
      lastEmitted.current = Date.now();
      setShown(latest.current);
    }, ms - elapsed);
  }, [value, ms]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return shown;
}

export default function LiveRegion({
  message,
  politeness = 'polite',
  atomic = true,
  throttleMs = 0,
  role = 'status',
  'data-testid': testId,
}: LiveRegionProps) {
  const announced = useThrottledValue(message, throttleMs);
  return (
    <VisuallyHidden as="div" data-testid={testId}>
      <div
        {...(role === 'none' ? null : { role })}
        aria-live={politeness}
        aria-atomic={atomic}
      >
        {announced}
      </div>
    </VisuallyHidden>
  );
}
