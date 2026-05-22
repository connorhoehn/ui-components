// src/integrations/realtime-modules/WrappedActivityPanel.tsx
//
// ActivityFeed wired directly to a useActivity() hook return from realtime-modules.
// Adapts RMActivityEvent[] to ActivityFeedItem[] automatically.

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
  const items = adaptActivityEvents(activity.events);

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
