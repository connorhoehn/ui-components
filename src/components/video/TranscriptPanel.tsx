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
import { onActivationKey } from '../../lib/activationKey';

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
      <section className={cn('rounded-lg border border-border bg-surface p-4', className)}>
        <header className="text-sm font-medium text-text-secondary mb-2">{title}</header>
        <div className="text-sm text-text-tertiary">
          {idleState ?? 'Transcription was not enabled for this recording.'}
        </div>
      </section>
    );
  }

  if (status === 'pending' || status === 'processing') {
    return (
      <section className={cn('rounded-lg border border-border bg-surface p-4', className)}>
        <header className="text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
          <span>{title}</span>
          <span className="inline-block h-2 w-2 rounded-full bg-warning animate-pulse" aria-hidden="true" />
          <span className="text-xs font-normal text-text-tertiary">
            {status === 'pending' ? 'queued' : 'processing'}
          </span>
        </header>
        <div className="text-sm text-text-secondary">
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
      <section className={cn('rounded-lg border border-danger-border bg-surface p-4', className)}>
        <header className="text-sm font-medium text-danger mb-2">
          {title} — failed
        </header>
        <div className="text-sm text-text-secondary">
          {errorMessage ?? 'Transcript generation failed. Reach out to support if this persists.'}
        </div>
      </section>
    );
  }

  // status === 'ready'
  if (!segments || segments.length === 0) {
    return (
      <section className={cn('rounded-lg border border-border bg-surface p-4', className)}>
        <header className="text-sm font-medium text-text-secondary mb-2">{title}</header>
        <div className="text-sm text-text-tertiary">
          No audible speech was captured in this recording.
        </div>
      </section>
    );
  }

  return (
    <section className={cn('rounded-lg border border-border bg-surface flex flex-col', className)}>
      <header className="text-sm font-medium text-text-secondary px-4 py-3 border-b border-border">
        {title}
        <span className="ml-2 text-xs font-normal text-text-tertiary">
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
                  ? 'bg-surface-emphasis ring-1 ring-primary'
                  : 'hover:bg-surface-hover',
                seekable && 'cursor-pointer',
              )}
              onClick={seekable ? () => onSeek!(seg.startMs) : undefined}
              onKeyDown={seekable ? onActivationKey(() => onSeek!(seg.startMs)) : undefined}
              role={seekable ? 'button' : undefined}
              tabIndex={seekable ? 0 : undefined}
              aria-label={seekable ? `Seek to ${formatTimestamp(seg.startMs)} — ${seg.speakerLabel}` : undefined}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="text-xs font-semibold"
                  style={{ color: `hsl(${hue}, 65%, 60%)` }}
                >
                  {seg.speakerLabel}
                </span>
                <span className="text-xs font-mono text-text-tertiary">
                  {formatTimestamp(seg.startMs)}
                </span>
              </div>
              <p className="text-sm text-text-primary leading-relaxed">
                {seg.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
