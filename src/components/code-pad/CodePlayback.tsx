// ui-components/src/components/code-pad/CodePlayback.tsx
//
// Code over time, read only: a `CodePad` showing the snapshot for the current
// time, over a time strip (the library's `Slider` across the duration, with
// the page's markers drawn on it as labelled, focusable stops).
//
// It does not play by itself and owns no clock. A page beside a recording
// ties them together: `timeMs` follows the player's `onTimeUpdate`, and
// `onTimeChange` (the slider moved, a marker was chosen) calls the player's
// `seek`. Without `timeMs` it keeps its own time.
//
// Moving between frames sets the editor's text in place, as the smallest
// change between the two texts, so the editor is never rebuilt and the scroll
// stays where it was wherever the text above it did not change.

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Slider } from '../forms/Slider';
import { Inline, Stack } from '../ui/Stack';
import { T } from '../shared/Text';
import { CodePad, type CodePadHandle, type CodePadProps } from './CodePad';

/** The whole text at one moment, `atMs` from the start. */
export interface CodePlaybackFrame {
  atMs: number;
  text: string;
  /** The language from this frame on; defaults to the playback's `language`. */
  language?: string;
}

/** Something that happened at a moment: a question asked, a run, a paste, or the page's own kind. */
export interface CodePlaybackMarker {
  atMs: number;
  kind: 'question' | 'run' | 'paste' | (string & {});
  /** What the stop is called ("Two sum", "Run 3", "Pasted 120 characters"). */
  label: string;
  /** A longer line, shown on hover and read with the label. */
  detail?: string;
}

export interface CodePlaybackProps {
  /** Snapshots in time order; the view shows the last frame at or before the time. */
  frames: readonly CodePlaybackFrame[];
  markers?: readonly CodePlaybackMarker[];
  /** Length of the timeline, in milliseconds. */
  durationMs: number;
  /** The time to show, controlled (tie it to a recording's `onTimeUpdate`). Omit and it keeps its own. */
  timeMs?: number;
  /** The slider moved or a marker was chosen; seek the recording here. */
  onTimeChange?(timeMs: number): void;
  /** Syntax mode for frames that name none. Default `'python'`. */
  language?: string;
  /** Extra languages, as `CodePad` takes them. */
  languages?: CodePadProps['languages'];
  /** How a time reads. Default `m:ss` (`h:mm:ss` past an hour). */
  formatTime?(ms: number): string;
  /** Shown instead of the editor when there are no frames. Default "No code was written." */
  emptyMessage?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

function defaultFormatTime(ms: number): string {
  const total = Math.max(0, Math.floor((Number.isFinite(ms) ? ms : 0) / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

/** Index of the last item at or before `t` (items sorted by `atMs`), or -1. */
function lastAtOrBefore(items: readonly { atMs: number }[], t: number): number {
  let lo = 0;
  let hi = items.length - 1;
  let found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (items[mid].atMs <= t) {
      found = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return found;
}

const KIND_NAME: Record<string, string> = { question: 'Question', run: 'Run', paste: 'Paste' };
const KIND_CLASS: Record<string, string> = {
  question: 'border-[var(--color-info-fg,#1d4ed8)] text-[var(--color-info-fg,#1d4ed8)]',
  run: 'border-[var(--color-success-fg,#15803d)] text-[var(--color-success-fg,#15803d)]',
  paste: 'border-[var(--color-warning-fg,#b45309)] text-[var(--color-warning-fg,#b45309)]',
};

/** The kind as a word ("Question"; a page's own kind capitalised). */
function kindName(kind: string): string {
  return KIND_NAME[kind] ?? (kind ? kind.charAt(0).toUpperCase() + kind.slice(1) : 'Marker');
}

/** The letter on the stop: Q, R, P, or the first letter of a page's own kind. */
export function codePlaybackMarkerLetter(kind: string): string {
  return kindName(kind).charAt(0).toUpperCase();
}

/** A stop's drawn width (`min-w-5`) plus the least room left between two stops, in px. */
const MARKER_PITCH_PX = 24;
/** The vertical step between rows of stops (a 20px stop and 4px between rows). */
const MARKER_ROW_PX = 24;

/**
 * Which row each stop sits on (since NEXT), given their centres in px along the
 * strip in time order: each stop takes the first row whose last stop is at
 * least `pitchPx` to its left, else opens a new row. Stops far enough apart all
 * stay on row 0, so a sparse strip draws as before; stops that would touch (a
 * paste and a run a second apart) stack instead of overlapping.
 */
export function codePlaybackMarkerRows(centresPx: readonly number[], pitchPx: number = MARKER_PITCH_PX): number[] {
  const rowEnds: number[] = [];
  return centresPx.map((x) => {
    let row = rowEnds.findIndex((end) => x - end >= pitchPx);
    if (row < 0) row = rowEnds.length;
    rowEnds[row] = x;
    return row;
  });
}

/** The smallest single change that turns `from` into `to`. */
function smallestChange(from: string, to: string): { from: number; to: number; insert: string } | null {
  if (from === to) return null;
  let start = 0;
  const max = Math.min(from.length, to.length);
  while (start < max && from.charCodeAt(start) === to.charCodeAt(start)) start++;
  let endA = from.length;
  let endB = to.length;
  while (endA > start && endB > start && from.charCodeAt(endA - 1) === to.charCodeAt(endB - 1)) {
    endA--;
    endB--;
  }
  return { from: start, to: endA, insert: to.slice(start, endB) };
}

/**
 * A read-only view of code over time: a `CodePad` showing the snapshot for the current time, over the library's `Slider` with question, run and paste markers as labelled, focusable stops; driven by the page (`timeMs` from a recording, `onTimeChange` to seek it).
 *
 * Import from `@connorhoehn/ui-components/code-pad`. It never plays by itself:
 *
 * ```tsx
 * const player = useRef<RecordingPlayerHandle>(null);
 * const [t, setT] = useState(0);
 * <RecordingPlayer ref={player} playlistUrl={url} onTimeUpdate={(s) => setT(s * 1000)} />
 * <CodePlayback frames={frames} markers={markers} durationMs={duration}
 *   timeMs={t} onTimeChange={(ms) => player.current?.seek(ms / 1000)} />
 * ```
 */
export function CodePlayback({
  frames,
  markers = [],
  durationMs,
  timeMs,
  onTimeChange,
  language = 'python',
  languages,
  formatTime = defaultFormatTime,
  emptyMessage = 'No code was written.',
  className,
  'data-testid': testId = 'code-playback',
}: CodePlaybackProps) {
  const [ownTime, setOwnTime] = useState(timeMs ?? 0);
  const duration = Math.max(0, Number.isFinite(durationMs) ? durationMs : 0);
  const time = Math.min(duration, Math.max(0, timeMs ?? ownTime));

  const setTime = useCallback(
    (next: number) => {
      const t = Math.min(duration, Math.max(0, next));
      if (timeMs === undefined) setOwnTime(t);
      onTimeChange?.(t);
    },
    [duration, timeMs, onTimeChange],
  );

  // Pages pass what they stored; sort once rather than trust the order.
  const sortedFrames = useMemo(() => [...frames].sort((a, b) => a.atMs - b.atMs), [frames]);
  const sortedMarkers = useMemo(() => [...markers].sort((a, b) => a.atMs - b.atMs), [markers]);

  const frameIndex = lastAtOrBefore(sortedFrames, time);
  const frame = frameIndex >= 0 ? sortedFrames[frameIndex] : null;
  // Before the first snapshot nothing had been written yet.
  const text = frame?.text ?? '';
  const frameLanguage = frame?.language ?? language;

  // Set the text in place. `defaultValue` is only read when the pad builds
  // its editor (once, or again under StrictMode's remount), so passing the
  // current text there means a rebuilt editor starts right too.
  const pad = useRef<CodePadHandle>(null);
  const hasFrames = sortedFrames.length > 0;
  useEffect(() => {
    // `hasFrames`: the pad mounts when the first frames arrive, with the text
    // it was first given; bring it to the current one.
    const view = pad.current?.view;
    if (!view) return;
    const change = smallestChange(view.state.doc.toString(), text);
    if (change) view.dispatch({ changes: change });
  }, [text, hasFrames]);

  const lastMarker = lastAtOrBefore(sortedMarkers, time);
  const current = lastMarker >= 0 ? sortedMarkers[lastMarker] : null;

  // One tab stop for the markers; the arrow keys move between them.
  const [focusIndex, setFocusIndex] = useState(0);
  const stopRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabStop = Math.min(focusIndex, Math.max(0, sortedMarkers.length - 1));
  const onMarkerKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = Math.min(sortedMarkers.length - 1, i + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = Math.max(0, i - 1);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = sortedMarkers.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setFocusIndex(next);
    stopRefs.current[next]?.focus();
  };

  const pct = (ms: number) => (duration > 0 ? Math.min(100, Math.max(0, (ms / duration) * 100)) : 0);

  // The strip's width, so stops that would touch can stack into rows. Unmeasured
  // (0, as before layout or in a test DOM) every stop stays on the first row.
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [stripPx, setStripPx] = useState(0);
  const hasMarkers = sortedMarkers.length > 0;
  useLayoutEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const measure = () => setStripPx(el.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMarkers]);
  const markerRows = useMemo(
    () => stripPx > 0 && duration > 0
      ? codePlaybackMarkerRows(sortedMarkers.map((m) => (Math.min(duration, Math.max(0, m.atMs)) / duration) * stripPx))
      : sortedMarkers.map(() => 0),
    [sortedMarkers, stripPx, duration],
  );
  const rowCount = markerRows.reduce((n, r) => Math.max(n, r + 1), 1);
  const step = duration > 20_000 ? 1000 : 100;

  return (
    <Stack gap="sm" data-testid={testId} className={cn('min-h-0 min-w-0', className)}>
      {!hasFrames ? (
        <Stack gap="none" align="center" justify="center" data-testid={`${testId}-empty`} className="min-h-0 flex-1 rounded-md border border-border py-8">
          <T size="sm" tone="tertiary">
            {emptyMessage}
          </T>
        </Stack>
      ) : (
        <CodePad
          ref={pad}
          readOnly
          defaultValue={text}
          language={frameLanguage}
          languages={languages}
          aria-label="Code playback"
          className="min-h-0 flex-1"
        />
      )}
      <Stack gap="xs" data-testid={`${testId}-timeline`} className="shrink-0">
        {sortedMarkers.length > 0 && (
          // Half a thumb of inset each side, so a stop sits over the thumb's
          // centre at its time rather than over the track's raw edge.
          // Stops that would touch stack into rows (`data-row`), each still its own
          // button in time order for the arrow keys.
          <div
            ref={stripRef}
            role="group"
            aria-label="Moments"
            data-testid={`${testId}-markers`}
            data-rows={rowCount}
            className="relative mx-2 h-6"
            style={rowCount > 1 ? { height: `${(rowCount - 1) * MARKER_ROW_PX + 24}px` } : undefined}
          >
            {sortedMarkers.map((m, i) => {
              const name = kindName(m.kind);
              const spoken = `${name}: ${m.label}${m.detail ? `. ${m.detail}` : ''}, at ${formatTime(m.atMs)}`;
              return (
                <button
                  key={`${m.atMs}-${i}`}
                  ref={(el) => {
                    stopRefs.current[i] = el;
                  }}
                  type="button"
                  data-ui-part=""
                  data-testid={`${testId}-marker`}
                  data-kind={m.kind}
                  data-row={markerRows[i] ?? 0}
                  data-passed={m.atMs <= time ? 'true' : undefined}
                  tabIndex={i === tabStop ? 0 : -1}
                  aria-label={spoken}
                  title={`${name}: ${m.label}${m.detail ? ` (${m.detail})` : ''} at ${formatTime(m.atMs)}`}
                  onClick={() => {
                    setFocusIndex(i);
                    setTime(m.atMs);
                  }}
                  onFocus={() => setFocusIndex(i)}
                  onKeyDown={(e) => onMarkerKey(e, i)}
                  className={cn(
                    'absolute top-0 flex h-5 min-w-5 -translate-x-1/2 cursor-pointer items-center justify-center rounded border border-solid bg-surface px-1 font-mono text-[10px] font-semibold leading-none',
                    'outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    KIND_CLASS[m.kind] ?? 'border-border text-text-secondary',
                    m.atMs <= time ? 'opacity-100' : 'opacity-70',
                  )}
                  // A stop's place is its time: there is no class for 37.4%.
                  style={markerRows[i] ? { left: `${pct(m.atMs)}%`, top: `${markerRows[i] * MARKER_ROW_PX}px` } : { left: `${pct(m.atMs)}%` }}
                >
                  {codePlaybackMarkerLetter(m.kind)}
                </button>
              );
            })}
          </div>
        )}
        <Slider
          value={time}
          onChange={setTime}
          min={0}
          max={duration}
          step={step}
          readout={false}
          aria-label="Time in the code"
          aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
          data-testid={`${testId}-slider`}
        />
        <Inline gap="sm" justify="between" wrap={false} className="min-w-0">
          <T size="xs" tone="secondary" tabular data-testid={`${testId}-time`}>
            {formatTime(time)} / {formatTime(duration)}
          </T>
          {current && (
            <T size="xs" tone="tertiary" truncate data-testid={`${testId}-current`}>
              {kindName(current.kind)}: {current.label} at {formatTime(current.atMs)}
            </T>
          )}
        </Inline>
      </Stack>
    </Stack>
  );
}

export default CodePlayback;
