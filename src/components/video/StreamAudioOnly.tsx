// StreamAudioOnly — what an audio-only broadcast looks like.
//
// ## Why this is not "the video area, but empty"
//
// A call published from a machine whose camera is busy carries audio and no
// video, and that is the COMMON case, not an edge one. The stage rendered it
// literally: a black rectangle wearing a LIVE badge. Everything the viewer
// could see said "broken" — no picture, no motion, no name — while the
// broadcast was working perfectly and, if they were still muted, silent too.
//
// So this card says the one thing the black rectangle could not: it is audio,
// on purpose, and here is who is talking. Three pieces, in that order of
// importance:
//
//   * the WORDS "Audio only", because a viewer's first question is whether
//     their own player is broken;
//   * the SPEAKER, so the stream has an identity when it has no picture;
//   * a MOTION signal, so a working stream does not look like a frozen one.
//
// ## The meter is measured, or it is honest about not being
//
// `level` comes from `useAudioLevel`, which returns null when it cannot
// measure — no Web Audio, no audio track, or a suspended AudioContext. On
// null this renders a fixed pattern rather than a meter pinned at zero: a
// flat meter reads as "dead stream", which is the very claim that has to be
// right. The bars still animate through the `uic-audio-bar` class when the CSS
// for it is present, and sit at their static heights when it is not, so the
// card degrades to something meaningful either way.

import { cn } from '../../lib/cn';
import Avatar from '../shared/Avatar';

export interface StreamAudioOnlyProps {
  /** Who is talking. Renders an avatar and a name when known. */
  name?: string;
  /** Profile image for the speaker; falls back to initials. */
  avatarUrl?: string;
  /**
   * Measured loudness, 0..1, or null when it cannot be measured. Null is not
   * silence — see the file header.
   */
  level?: number | null;
  /** Whether audio is actually reaching the viewer (playing AND not muted). */
  active?: boolean;
  /** Muted gets its own wording: the fix is one click away and worth naming. */
  muted?: boolean;
  /** Replaces the default explanation line. */
  hint?: string;
  className?: string;
  'data-testid'?: string;
}

/**
 * Per-bar sensitivity. The middle bars respond first so the meter reads as a
 * shape rather than five identical bars rising in lockstep.
 */
const BAR_WEIGHTS = [0.55, 0.8, 1, 0.8, 0.55];
/** Quantised heights, so every class is a literal in the source Tailwind scans. */
const BAR_HEIGHTS = ['h-1', 'h-1.5', 'h-2', 'h-3', 'h-4', 'h-6', 'h-8', 'h-10'];
/** Where the bars sit when there is nothing to measure. */
const IDLE_HEIGHTS = ['h-2', 'h-4', 'h-6', 'h-4', 'h-2'];
/**
 * Staggered so the unmeasured pattern reads as a wave. Literal classes, not an
 * inline style: the consuming app has no Tailwind build and only ever gets the
 * classes this library's own source used.
 */
const BAR_DELAYS = [
  '[animation-delay:0ms]',
  '[animation-delay:110ms]',
  '[animation-delay:220ms]',
  '[animation-delay:330ms]',
  '[animation-delay:440ms]',
];

function barHeight(level: number, weight: number): string {
  const scaled = Math.max(0, Math.min(1, level * weight));
  const index = Math.min(BAR_HEIGHTS.length - 1, Math.round(scaled * (BAR_HEIGHTS.length - 1)));
  return BAR_HEIGHTS[index];
}

export function StreamAudioOnly({
  name,
  avatarUrl,
  level = null,
  active = false,
  muted = false,
  hint,
  className,
  'data-testid': testId = 'stream-audio-only',
}: StreamAudioOnlyProps) {
  const measured = typeof level === 'number' && active;
  const explanation =
    hint ??
    (muted
      ? 'Audio only — unmute to hear it.'
      : active
        ? 'Audio only — there is no picture on this broadcast.'
        : 'Audio only.');

  return (
    <div
      data-testid={testId}
      data-measured={String(measured)}
      data-active={String(active)}
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center',
        className,
      )}
    >
      {name ? (
        <Avatar name={name} src={avatarUrl} size={64} />
      ) : (
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl"
        >
          {'\u{1F399}'}
        </div>
      )}

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-medium text-white">{name ?? 'Audio only'}</span>
        <span data-testid={`${testId}-hint`} className="text-xs text-white/60">
          {explanation}
        </span>
      </div>

      {/* The motion signal. `items-end` so the bars grow upward from a common
          baseline the way a meter does, rather than from their own centres. */}
      <div
        data-testid={`${testId}-meter`}
        aria-hidden
        className="flex h-10 items-end gap-1"
      >
        {BAR_WEIGHTS.map((weight, i) => (
          <span
            key={i}
            className={cn(
              'w-1.5 rounded-full transition-[height] duration-100',
              active ? 'bg-white/80' : 'bg-white/25',
              // Only animate when nothing is being measured. A measured meter
              // that also animates is two claims about the same thing, and the
              // fake one wins visually.
              !measured && active && ['uic-audio-bar', BAR_DELAYS[i]],
              measured ? barHeight(level as number, weight) : IDLE_HEIGHTS[i],
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default StreamAudioOnly;
