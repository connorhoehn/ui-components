// src/integrations/realtime-modules/WrappedActivityPanel.tsx
//
// ActivityFeed wired directly to a useActivity() hook return from realtime-modules.
// Adapts RMActivityEvent[] to ActivityFeedItem[] automatically.
//
// Two modes. `ticker` (default): the rotating three-line feed. `history`
// (since 2.515.10): a record's history — newest first, no rotation, the
// newest `lines` lines all shown. An event that carries its own sentence in
// `detail.text` is drawn as that sentence (see `adaptActivityEvent`) in both.

import { useMemo } from 'react';
import type { RMUseActivityReturn } from './types';
import { adaptActivityEvents, newestActivityFirst } from './adapters';
import { ActivityFeed } from '../../components/shared/ActivityFeed';
import type { ActivityFeedProps } from '../../components/shared/ActivityFeed';

/** How many lines `mode="history"` shows when `lines` is omitted. */
export const ACTIVITY_HISTORY_LINES = 50;

export interface WrappedActivityPanelProps {
  /** Return value of useActivity(channel) from realtime-modules */
  activity: RMUseActivityReturn;
  /**
   * `ticker` (default, unchanged): the rotating feed. `history` (since
   * 2.515.10): newest first by timestamp, no rotation, the newest `lines`
   * lines shown; `visibleCount`, `rotateMs` and `staggerMs` are ignored.
   */
  mode?: 'ticker' | 'history';
  /** `mode="history"`: how many lines (default 50). */
  lines?: number;
  /** Forwarded to ActivityFeed */
  visibleCount?: ActivityFeedProps['visibleCount'];
  rotateMs?: ActivityFeedProps['rotateMs'];
  staggerMs?: ActivityFeedProps['staggerMs'];
  kindColors?: ActivityFeedProps['kindColors'];
  className?: string;
  /** On the feed's root (since 2.515.10). */
  'data-testid'?: string;
}

export function WrappedActivityPanel({
  activity,
  mode = 'ticker',
  lines = ACTIVITY_HISTORY_LINES,
  visibleCount,
  rotateMs,
  staggerMs,
  kindColors,
  className,
  'data-testid': testId,
}: WrappedActivityPanelProps) {
  const history = mode === 'history';
  const max = Math.max(0, Math.floor(lines));
  // `adaptActivityEvents` is a `.map()`, so an unmemoised call handed
  // ActivityFeed a fresh `items` array on every render. Both of ActivityFeed's
  // effects key on `items`: one setStates unconditionally (a guaranteed extra
  // render pass per commit) and the other tears down and re-creates the
  // rotation timers — so a parent re-rendering faster than the rotate
  // interval stopped the feed rotating at all.
  const items = useMemo(
    () => adaptActivityEvents(history ? newestActivityFirst(activity.events).slice(0, max) : activity.events),
    [activity.events, history, max],
  );

  return (
    <ActivityFeed
      items={items}
      visibleCount={history ? Math.max(1, items.length) : visibleCount}
      rotateMs={history ? 0 : rotateMs}
      staggerMs={history ? 0 : staggerMs}
      kindColors={kindColors}
      className={className}
      data-activity-mode={mode}
      {...(testId ? { 'data-testid': testId } : {})}
    />
  );
}
