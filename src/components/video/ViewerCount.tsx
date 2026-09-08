// ViewerCount — how many people are watching, or nothing at all.
//
// ## Why the count is nullable
//
// "Nobody measured" and "somebody measured and the answer was nobody" are
// different claims and this badge must never turn the first into the second.
// Upstream, `getViewerCount` returns `null` when it cannot measure — and this
// codebase spent a long time with a tracker that had NO callers, so every
// channel reported an empty house. A badge that renders `0` for an unmeasured
// channel is that bug wearing a confident face.
//
// So: `null`/`undefined` renders NOTHING (no badge, no zero, no dash), and a
// numeric `0` renders "0 watching" — the honest empty room, and the only thing
// that tells a broadcaster the counter is working rather than missing.
//
// The prop used to be a bare required `number`, which meant a caller with no
// measurement had to invent one to satisfy the type. StreamStage guarded
// around that; anyone rendering the badge directly did not.

import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export interface ViewerCountProps {
  /**
   * Watchers, when the number is KNOWN. Pass `null` (or omit) when it is not —
   * the badge then renders nothing rather than claiming an audience of zero.
   */
  count?: number | null;
  /**
   * Positioning / spacing classes from the caller. Prefer this over `style`:
   * callers overlaying the badge on a player had no className seam, so they
   * were forced into an inline style.
   */
  className?: string;
  /** @deprecated Use `className`. Kept so existing callers keep compiling. */
  style?: CSSProperties;
  'data-testid'?: string;
}

/**
 * `null`/`undefined` mean nobody measured; a numeric 0 means somebody did and
 * the answer was nobody. Negative is nonsense from a broken source, and is
 * treated as unmeasured rather than shown.
 */
export function isKnownViewerCount(count: number | null | undefined): count is number {
  return typeof count === 'number' && Number.isFinite(count) && count >= 0;
}

export function ViewerCount({
  count,
  className,
  style,
  'data-testid': testId = 'viewer-count',
}: ViewerCountProps) {
  // An unmeasured count has no honest badge to render, and a placeholder
  // ("— watching", "0 watching") would be a claim we cannot support.
  if (!isKnownViewerCount(count)) return null;

  const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : `${count}`;

  return (
    <div
      data-testid={testId}
      data-viewers={count}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium',
        className,
      )}
      style={style}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
        <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span>{formatted} watching</span>
    </div>
  );
}
