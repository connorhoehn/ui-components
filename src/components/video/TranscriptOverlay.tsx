// TranscriptOverlay — bottom-of-call live caption display. Reads as a
// running ticker: new lines POP onto the bottom of the stack (fade +
// 8px rise), age into a ghost fade, and drop out of the DOM entirely
// once fully faded. Pure presentational — caller feeds in a list of
// CaptionLine objects (typically from useLiveCaptions hook in
// realtime-modules).
//
// Design:
//   - Anchored bottom-center, fixed-width band with a subtle top
//     gradient mask so the stack looks like it emerges
//   - Per-speaker color via speakerId
//   - Entrance animation per line (`transcript-line-enter`, defined in
//     src/styles.css; reduced-motion drops the transform, keeps the fade)
//   - LIVE ghost fade: an internal ~500ms tick re-evaluates each line's
//     age-based opacity between line arrivals, so fades progress
//     smoothly instead of only on prop changes. Disabled when the `now`
//     prop is provided (deterministic tests/stories).
//   - Fully-faded lines (age > fadeAfterMs * 1.6) are removed from the
//     DOM rather than lingering at the 0.35 opacity floor — the floor
//     only applies within the visible window.

import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';

export interface CaptionLine {
  id: string;
  speakerId: string;
  speakerName?: string;
  text: string;
  /** ISO timestamp of caption emission. Used for fade-out + ordering. */
  at: string;
  /** True if the caption is still being updated (interim) vs final. */
  interim?: boolean;
}

export interface TranscriptOverlayProps {
  lines: CaptionLine[];
  /** How many recent lines to show simultaneously. Default 4. */
  maxLines?: number;
  /** Fade-out duration ms. Default 8000. Lines older than 1.6× this drop
   *  from the DOM entirely. */
  fadeAfterMs?: number;
  /**
   * "Now" in ms since epoch, used as the reference point for each line's
   * age-based opacity. Defaults to `Date.now()` — exposed for deterministic
   * tests and stories. When provided, the internal live-fade interval is
   * disabled, so the render is a pure function of props.
   *
   * Without it, any fixture built from fixed ISO timestamps is arbitrarily
   * old by the time it renders, so every line has aged past the drop window
   * and nothing renders at all. Pass the same epoch the fixture timestamps
   * were written against and the ramp is reproducible.
   */
  now?: number;
  className?: string;
}

const SPEAKER_COLORS = [
  '#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#a78bfa', '#fb7185',
];

/** Lines older than fadeAfterMs × this factor drop from the DOM. */
const DROP_FACTOR = 1.6;

function colorForSpeaker(speakerId: string): string {
  let hash = 0;
  for (let i = 0; i < speakerId.length; i++) hash = (hash * 31 + speakerId.charCodeAt(i)) | 0;
  return SPEAKER_COLORS[Math.abs(hash) % SPEAKER_COLORS.length]!;
}

export function TranscriptOverlay({
  lines,
  maxLines = 4,
  fadeAfterMs = 8000,
  now: nowProp,
  className,
}: TranscriptOverlayProps) {
  // Live tick: while lines exist and no `now` override is supplied,
  // re-render every ~500ms so the ghost fade progresses between line
  // arrivals. Cleaned up on unmount / when the line list empties.
  const [, setTick] = useState(0);
  const live = nowProp === undefined;
  const hasLines = lines.length > 0;
  useEffect(() => {
    if (!live || !hasLines) return;
    const id = setInterval(() => setTick((t) => t + 1), 500);
    return () => clearInterval(id);
  }, [live, hasLines]);

  const now = nowProp ?? Date.now();
  const dropAfterMs = fadeAfterMs * DROP_FACTOR;
  const visible = lines
    .slice(-maxLines)
    .map((line) => {
      const age = now - new Date(line.at).getTime();
      const opacity = Math.max(0.35, 1 - age / fadeAfterMs);
      return { ...line, age, opacity };
    })
    .filter((line) => line.age <= dropAfterMs);

  if (visible.length === 0) return null;

  return (
    <div
      className={cn(
        'absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20',
        'flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm overflow-hidden',
        className,
      )}
      aria-live="polite"
      aria-label="Live transcript"
    >
      {/* Top gradient mask — the stack emerges from a soft edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-5 rounded-t-lg bg-gradient-to-b from-black/60 to-transparent"
      />
      {visible.map((line) => (
        <div
          key={line.id}
          className={cn(
            'transcript-line-enter flex items-baseline gap-2 text-sm transition-opacity',
            line.interim && 'italic',
          )}
          style={{ opacity: line.opacity }}
        >
          <span
            className="font-medium text-xs shrink-0"
            style={{ color: colorForSpeaker(line.speakerId) }}
          >
            {line.speakerName ?? line.speakerId.slice(0, 6)}
          </span>
          <span className="text-white">{line.text}</span>
        </div>
      ))}
    </div>
  );
}

export default TranscriptOverlay;
