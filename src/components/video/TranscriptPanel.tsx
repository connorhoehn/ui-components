// TranscriptPanel — speaker-attributed transcript display with optional
// time-aligned highlighting. Pure presentational shell driven by props:
// the parent owns the fetch, the player time, and the loading/error
// state.
//
// Companion to <RecordingPlayer>: pass `currentTimeMs` (from the
// player's `onTimeUpdate` callback, converted to ms) and the active
// segment gets visually highlighted.

import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface TranscriptSegment {
  startMs: number;
  endMs: number;
  speakerId: string;
  speakerLabel: string;
  text: string;
  avgLogprob?: number;
  noSpeechProb?: number;
}

export type TranscriptStatus =
  | 'idle'         // No transcription opted into for this recording
  | 'pending'      // Queued, worker hasn't started
  | 'processing'   // Worker running (whisper or summary phase)
  | 'ready'        // Done
  | 'failed';

export interface TranscriptPanelProps {
  status: TranscriptStatus;
  segments?: TranscriptSegment[];
  /** Current playback position in milliseconds; used to highlight the
   *  active segment. Pass null/undefined to disable highlighting. */
  currentTimeMs?: number | null;
  /** When provided, clicking a segment seeks the player to that time. */
  onSeek?: (timeMs: number) => void;
  /** Optional title above the panel. Defaults to "Transcript". */
  title?: string;
  /** Surface the failure message when status === 'failed'. */
  errorMessage?: string;
  /** When status is processing/pending, surface what phase. */
  pendingMessage?: string;
  /** Render-prop slot for the empty/idle state. */
  idleState?: ReactNode;
  className?: string;
}

function formatTimestamp(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Deterministic color picker — same speakerId → same hue across renders.
// 36-color rotation through the perceptual color wheel. Saturation + lightness
// fixed so dark/light themes both render legibly.
function speakerHue(speakerId: string): number {
  let hash = 0;
  for (let i = 0; i < speakerId.length; i++) {
    hash = (hash * 31 + speakerId.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 360;
}

export function TranscriptPanel({
  status,
  segments,
  currentTimeMs,
  onSeek,
  title = 'Transcript',
  errorMessage,
  pendingMessage,
  idleState,
  className,
}: TranscriptPanelProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const activeIndex = useMemo(() => {
    if (!segments || currentTimeMs == null) return -1;
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i]!;
      if (currentTimeMs >= s.startMs && currentTimeMs < s.endMs) return i;
    }
    return -1;
  }, [segments, currentTimeMs]);

  useEffect(() => {
    if (activeIndex < 0 || !scrollerRef.current) return;
    const el = scrollerRef.current.querySelector(`[data-seg-index="${activeIndex}"]`) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeIndex]);

  if (status === 'idle') {
    return (
      <section className={cn('rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4', className)}>
        <header className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">{title}</header>
        <div className="text-sm text-[var(--color-text-tertiary,#737373)]">
          {idleState ?? 'Transcription was not enabled for this recording.'}
        </div>
      </section>
    );
  }

  if (status === 'pending' || status === 'processing') {
    return (
      <section className={cn('rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4', className)}>
        <header className="text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center gap-2">
          <span>{title}</span>
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
          <span className="text-xs font-normal text-[var(--color-text-tertiary,#737373)]">
            {status === 'pending' ? 'queued' : 'processing'}
          </span>
        </header>
        <div className="text-sm text-[var(--color-text-secondary)]">
          {pendingMessage ?? (
            status === 'pending'
              ? 'Transcription is queued. This usually starts within a few seconds.'
              : 'Generating transcript and summary. Long recordings may take several minutes.'
          )}
        </div>
      </section>
    );
  }

  if (status === 'failed') {
    return (
      <section className={cn('rounded-lg border border-[var(--color-border-danger,#7f1d1d)] bg-[var(--color-surface)] p-4', className)}>
        <header className="text-sm font-medium text-[var(--color-danger,#dc2626)] mb-2">
          {title} — failed
        </header>
        <div className="text-sm text-[var(--color-text-secondary)]">
          {errorMessage ?? 'Transcript generation failed. Reach out to support if this persists.'}
        </div>
      </section>
    );
  }

  // status === 'ready'
  if (!segments || segments.length === 0) {
    return (
      <section className={cn('rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4', className)}>
        <header className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">{title}</header>
        <div className="text-sm text-[var(--color-text-tertiary,#737373)]">
          No audible speech was captured in this recording.
        </div>
      </section>
    );
  }

  return (
    <section className={cn('rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col', className)}>
      <header className="text-sm font-medium text-[var(--color-text-secondary)] px-4 py-3 border-b border-[var(--color-border)]">
        {title}
        <span className="ml-2 text-xs font-normal text-[var(--color-text-tertiary,#737373)]">
          {segments.length} segments
        </span>
      </header>
      <div ref={scrollerRef} className="flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2">
        {segments.map((seg, i) => {
          const isActive = i === activeIndex;
          const hue = speakerHue(seg.speakerId);
          const seekable = !!onSeek;
          return (
            <div
              key={`${seg.startMs}-${seg.speakerId}-${i}`}
              data-seg-index={i}
              className={cn(
                'rounded-md px-3 py-2 transition-colors',
                isActive
                  ? 'bg-[var(--color-surface-active,rgba(255,255,255,0.06))] ring-1 ring-[var(--color-border-focus,#3b82f6)]'
                  : 'hover:bg-[var(--color-surface-hover,rgba(255,255,255,0.03))]',
                seekable && 'cursor-pointer',
              )}
              onClick={seekable ? () => onSeek!(seg.startMs) : undefined}
              role={seekable ? 'button' : undefined}
              tabIndex={seekable ? 0 : undefined}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="text-xs font-semibold"
                  style={{ color: `hsl(${hue}, 65%, 60%)` }}
                >
                  {seg.speakerLabel}
                </span>
                <span className="text-xs font-mono text-[var(--color-text-tertiary,#737373)]">
                  {formatTimestamp(seg.startMs)}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                {seg.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
