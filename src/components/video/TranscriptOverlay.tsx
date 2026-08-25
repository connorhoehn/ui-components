// TranscriptOverlay — bottom-of-call live caption display. Reads as a
// running ticker: new lines POP onto the bottom of the stack (fade +
// 8px rise), ghost-fade once their speaker goes quiet, and drop from
// the DOM 3s after their last update. Pure presentational — caller
// feeds in a list of CaptionLine objects (typically from
// useLiveCaptions hook in realtime-modules).
//
// Ticker parameters are Jitsi-derived:
//   - REMOVE_AFTER_MS (3000): a line lingers 3s after its LAST update
//     (not its first emission) before it is dropped. A line that keeps
//     receiving interim updates stays on screen at full opacity.
//   - STABLE_TRANSCRIPTION_FACTOR (0.85): ASR interim results routinely
//     regress (shrink) before growing again, which reads as flicker. An
//     INTERIM update only replaces the displayed text when the new text
//     is longer than 0.85× what is currently shown; FINAL text always
//     replaces. Rejected shrinks still count as updates for the linger
//     timer — the speaker is clearly still talking.
//
// Design:
//   - Anchored bottom-center, fixed-width band with a subtle top
//     gradient mask so the stack looks like it emerges
//   - Per-speaker color via speakerId
//   - Each line's text sits on its own translucent scrim
//     (`transcript-line-scrim` in src/styles.css) that hugs the text
//     through line wraps via box-decoration-break: clone
//   - Entrance animation per line (`transcript-line-enter`, defined in
//     src/styles.css; reduced-motion drops the transform, keeps the fade)
//   - LIVE tick: an internal ~500ms interval re-evaluates each line's
//     since-last-update opacity/removal between prop changes, so fades
//     and drops progress smoothly. Disabled when the `now` prop is
//     provided (deterministic tests/stories).

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

export interface CaptionLine {
  id: string;
  speakerId: string;
  speakerName?: string;
  text: string;
  /** ISO timestamp of caption emission. Seeds the linger timer for lines
   *  that never update again. */
  at: string;
  /** True if the caption is still being updated (interim) vs final.
   *  Omitted/false = final: final text always replaces the displayed text;
   *  interim text is subject to the stable-transcription shrink filter. */
  interim?: boolean;
}

export interface TranscriptOverlayProps {
  lines: CaptionLine[];
  /** How many recent lines to show simultaneously. Default 4. */
  maxLines?: number;
  /**
   * Fade window ms: opacity ramps from 1 toward the 0.35 floor over this
   * span of no-update time. Default = REMOVE_AFTER_MS (3000), so a quiet
   * line fades all the way out and is then removed.
   */
  fadeAfterMs?: number;
  /**
   * "Now" in ms since epoch, used as the reference point for each line's
   * since-last-update opacity. Defaults to `Date.now()` — exposed for
   * deterministic tests and stories. When provided, the internal live-fade
   * interval is disabled, so the render is a pure function of props (plus
   * the per-line displayed-text memory).
   *
   * Without it, any fixture built from fixed ISO timestamps is arbitrarily
   * old by the time it renders, so every line has aged past the 3s linger
   * window and nothing renders at all. Pass the same epoch the fixture
   * timestamps were written against and the ramp is reproducible.
   */
  now?: number;
  className?: string;
}

const SPEAKER_COLORS = [
  '#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#a78bfa', '#fb7185',
];

/** A line is dropped from display this long after its LAST update. */
export const REMOVE_AFTER_MS = 3000;

/** Interim text only replaces the displayed text when it is longer than
 *  this fraction of what is currently shown (anti shrink-flicker). */
export const STABLE_TRANSCRIPTION_FACTOR = 0.85;

/** Minimum opacity a still-lingering line fades to before removal. */
const OPACITY_FLOOR = 0.35;

function colorForSpeaker(speakerId: string): string {
  let hash = 0;
  for (let i = 0; i < speakerId.length; i++) hash = (hash * 31 + speakerId.charCodeAt(i)) | 0;
  return SPEAKER_COLORS[Math.abs(hash) % SPEAKER_COLORS.length]!;
}

interface LineMemory {
  /** What we actually render — may lag line.text across interim shrinks. */
  displayedText: string;
  /** Last incoming text, replaced or not — change detection for the timer. */
  lastIncomingText: string;
  /** Epoch ms of the last observed update to this line. */
  lastUpdateMs: number;
}

export function TranscriptOverlay({
  lines,
  maxLines = 4,
  fadeAfterMs = REMOVE_AFTER_MS,
  now: nowProp,
  className,
}: TranscriptOverlayProps) {
  // Live tick: while lines exist and no `now` override is supplied,
  // re-render every ~500ms so fades/removals progress between line
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

  // Per-line memory (displayed text + last-update time). Mutated during
  // render, but idempotently: re-rendering with identical props writes
  // nothing, so StrictMode double-renders are safe.
  const memoryRef = useRef(new Map<string, LineMemory>());
  const memory = memoryRef.current;

  const liveIds = new Set(lines.map((l) => l.id));
  for (const staleId of memory.keys()) {
    if (!liveIds.has(staleId)) memory.delete(staleId);
  }

  for (const line of lines) {
    const existing = memory.get(line.id);
    if (!existing) {
      // First sight: the linger timer starts at the line's emission time,
      // so pre-aged fixtures/late mounts don't get a fresh 3s.
      const atMs = Date.parse(line.at);
      memory.set(line.id, {
        displayedText: line.text,
        lastIncomingText: line.text,
        lastUpdateMs: Number.isFinite(atMs) ? Math.min(atMs, now) : now,
      });
    } else if (line.text !== existing.lastIncomingText) {
      existing.lastIncomingText = line.text;
      existing.lastUpdateMs = now;
      const isFinal = !line.interim;
      if (
        isFinal ||
        line.text.length > STABLE_TRANSCRIPTION_FACTOR * existing.displayedText.length
      ) {
        existing.displayedText = line.text;
      }
    }
  }

  const visible = lines
    .slice(-maxLines)
    .map((line) => {
      const mem = memory.get(line.id)!;
      const sinceUpdate = now - mem.lastUpdateMs;
      const opacity = Math.max(OPACITY_FLOOR, 1 - sinceUpdate / fadeAfterMs);
      return { ...line, text: mem.displayedText, sinceUpdate, opacity };
    })
    .filter((line) => line.sinceUpdate <= REMOVE_AFTER_MS);

  if (visible.length === 0) return null;

  return (
    <div
      className={cn(
        'absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20',
        'flex flex-col items-start gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm overflow-hidden',
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
          <span className="transcript-line-scrim text-white">{line.text}</span>
        </div>
      ))}
    </div>
  );
}

export default TranscriptOverlay;
