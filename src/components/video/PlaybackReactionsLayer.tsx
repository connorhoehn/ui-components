import { useEffect, useMemo, useRef, useState } from 'react';
import { ReactionOverlay, type Reaction } from './ReactionOverlay';

// ---------------------------------------------------------------------------
// PlaybackReactionsLayer — replays captured in-call reactions over a
// recording as the playhead crosses each reaction's offset (the same
// floating-emoji treatment ReactionOverlay gives live calls).
//
// The caller owns playback state: pass `currentTimeMs` from the player's
// timeupdate. The layer fires every reaction whose offset falls inside
// the (previousTime, currentTime] window, so:
//   - normal playback fires each reaction exactly once, on time;
//   - seeking BACKWARD rewinds the window — rewatching a moment replays
//     its reactions (deliberate: playback is a re-experience, not a log);
//   - seeking FORWARD does not flood: a jump that skips many reactions
//     surfaces only the last few (SEEK_REPLAY_CAP) instead of a burst
//     storm of everything skipped.
//
// Fired reactions drain onto the overlay one at a time (DRAIN_INTERVAL_MS)
// because ReactionOverlay animates the newest feed entry per change —
// batching several into one update would collapse them into one float.
// ---------------------------------------------------------------------------

export interface TimedReaction {
  id: string;
  emoji: string;
  /** Milliseconds from the start of the recording. */
  offsetMs: number;
  displayName?: string;
}

export interface PlaybackReactionsLayerProps {
  reactions: TimedReaction[];
  /** Current playhead position in ms (player timeupdate). */
  currentTimeMs: number;
  className?: string;
}

/** Max reactions replayed from a single forward seek. */
const SEEK_REPLAY_CAP = 3;
/** A backward jump larger than this is a seek, not timeupdate jitter. */
const SEEK_BACK_THRESHOLD_MS = 1500;
const DRAIN_INTERVAL_MS = 200;
const FEED_MAX = 30;

export function PlaybackReactionsLayer({
  reactions,
  currentTimeMs,
  className,
}: PlaybackReactionsLayerProps) {
  const sorted = useMemo(
    () => [...reactions].sort((a, b) => a.offsetMs - b.offsetMs),
    [reactions],
  );

  const prevTimeRef = useRef(currentTimeMs);
  const queueRef = useRef<TimedReaction[]>([]);
  const [feed, setFeed] = useState<Reaction[]>([]);

  useEffect(() => {
    const prev = prevTimeRef.current;
    prevTimeRef.current = currentTimeMs;

    if (currentTimeMs < prev - SEEK_BACK_THRESHOLD_MS) {
      // Backward seek: drop anything still queued from the abandoned
      // position. The window reset (prevTimeRef above) means replaying
      // past a reaction fires it again.
      queueRef.current = [];
      return;
    }
    if (currentTimeMs <= prev) return;

    const due = sorted.filter(
      r => r.offsetMs > prev && r.offsetMs <= currentTimeMs,
    );
    if (due.length === 0) return;
    const capped =
      due.length > SEEK_REPLAY_CAP ? due.slice(-SEEK_REPLAY_CAP) : due;
    queueRef.current = [...queueRef.current, ...capped];
  }, [currentTimeMs, sorted]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = queueRef.current.shift();
      if (!next) return;
      setFeed(prev => [
        ...prev.slice(-FEED_MAX),
        // Feed ids must be unique per FIRING (a rewatch replays the same
        // reaction id) — suffix with the fire time.
        { id: `${next.id}@${Date.now()}`, emoji: next.emoji, displayName: next.displayName },
      ]);
    }, DRAIN_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      data-testid="playback-reactions-layer"
      className="absolute inset-0 pointer-events-none"
    >
      <ReactionOverlay reactions={feed} className={className} />
    </div>
  );
}
