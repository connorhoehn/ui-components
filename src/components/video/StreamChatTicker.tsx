// StreamChatTicker — chat messages as a rotating overlay on a live stream.
//
// ## Why chat needs a different shape during a call
//
// A chat PANEL is a column you read by scrolling: it assumes your attention is
// on the text. During a call or a stream your attention is on the video, and a
// panel competes with it — it eats horizontal space, and the newest message is
// only visible if you happen to be scrolled to the bottom.
//
// A ticker inverts that. It shows the few most recent messages, rotates them,
// and takes no layout from the video because it floats over it. You read it
// with peripheral attention and lose nothing by ignoring it, which is the
// correct relationship between chat and a stream you are actually watching.
//
// This is the same rotation `ActivityFeed` already does for activity events —
// deliberately reused rather than re-implemented, so the two surfaces behave
// identically and there is one rotation timer implementation in the library.
//
// ## Newest-first
//
// ActivityFeed rotates through its items in order. A stream ticker wants the
// LATEST messages, so the list is reversed and capped here rather than asking
// every caller to remember to do it.

import { useMemo } from 'react';
import { cn } from '../../lib/cn';
import { ActivityFeed } from '../shared/ActivityFeed';
import type { ActivityFeedItem } from '../shared/ActivityFeed';

export interface StreamChatMessage {
  id: string;
  /** Who sent it. */
  displayName: string;
  /** The message body. */
  content: string;
  /** ISO timestamp, rendered as HH:MM. */
  timestamp?: string;
}

export interface StreamChatTickerProps {
  messages: readonly StreamChatMessage[];
  /** How many messages are on screen at once. */
  visibleCount?: number;
  /** Rotation interval in ms. 0 disables rotation and pins the newest. */
  rotateMs?: number;
  /**
   * How many recent messages the ticker may cycle through.
   *
   * Without a cap, a long call's history keeps growing and the rotation takes
   * minutes to come back around to anything current — a "live" ticker showing
   * a message from twenty minutes ago is worse than showing none.
   */
  window?: number;
  className?: string;
  'data-testid'?: string;
}

function timeLabel(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function StreamChatTicker({
  messages,
  visibleCount = 3,
  rotateMs = 4200,
  window: windowSize = 20,
  className,
  'data-testid': testId = 'stream-chat-ticker',
}: StreamChatTickerProps) {
  const items = useMemo<ActivityFeedItem[]>(() => {
    // Newest first, then capped — capping before reversing would keep the
    // OLDEST messages, which is precisely backwards for a live ticker.
    const recent = messages.slice(-windowSize).reverse();
    return recent.map((m) => ({
      id: m.id,
      actor: m.displayName,
      // ActivityFeed renders "<actor> <action> <subject>". Chat has no verb,
      // and inventing one ("said") would put a word in the sender's mouth on
      // every line, so the action is empty and the message is the subject.
      action: '',
      subject: m.content,
      timeLabel: timeLabel(m.timestamp),
      kind: 'comment',
    }));
  }, [messages, windowSize]);

  if (items.length === 0) return null;

  return (
    <div
      data-testid={testId}
      // pointer-events-none: the ticker sits over the video, and a viewer
      // clicking to pause or fullscreen must not be intercepted by chat they
      // were only reading. Nothing here is interactive by design.
      className={cn('pointer-events-none max-w-sm', className)}
    >
      <ActivityFeed
        items={items}
        visibleCount={visibleCount}
        rotateMs={rotateMs}
        className="text-white"
      />
    </div>
  );
}

export default StreamChatTicker;
