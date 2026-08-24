// src/integrations/realtime-modules/WrappedActivityPanel.tsx
//
// ActivityFeed wired directly to a useActivity() hook return from realtime-modules.
// Adapts RMActivityEvent[] to ActivityFeedItem[] automatically.

import { useMemo } from 'react';
import type { RMUseActivityReturn } from './types';
import { adaptActivityEvents } from './adapters';
import { ActivityFeed } from '../../components/shared/ActivityFeed';
import type { ActivityFeedProps } from '../../components/shared/ActivityFeed';

export interface WrappedActivityPanelProps {
  /** Return value of useActivity(channel) from realtime-modules */
  activity: RMUseActivityReturn;
  /** Forwarded to ActivityFeed */
  visibleCount?: ActivityFeedProps['visibleCount'];
  rotateMs?: ActivityFeedProps['rotateMs'];
  staggerMs?: ActivityFeedProps['staggerMs'];
  kindColors?: ActivityFeedProps['kindColors'];
  className?: string;
}

export function WrappedActivityPanel({
  activity,
  visibleCount,
  rotateMs,
  staggerMs,
  kindColors,
  className,
}: WrappedActivityPanelProps) {
  // `adaptActivityEvents` is a `.map()`, so an unmemoised call handed
  // ActivityFeed a fresh `items` array on every render. Both of ActivityFeed's
  // effects key on `items`: one setStates unconditionally (a guaranteed extra
  // render pass per commit) and the other tears down and re-creates the
  // rotation timers — so a parent re-rendering faster than the rotate
  // interval stopped the feed rotating at all.
  const items = useMemo(() => adaptActivityEvents(activity.events), [activity.events]);

  return (
    <ActivityFeed
      items={items}
      visibleCount={visibleCount}
      rotateMs={rotateMs}
      staggerMs={staggerMs}
      kindColors={kindColors}
      className={className}
    />
  );
}
