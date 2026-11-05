// frontend/src/components/pipelines/replay/Scrubber.tsx
//
// Replay scrubber strip for PipelineRunReplayPage. Renders playback transport
// controls (play/pause/stop), speed pills, a seekable timeline track with
// event ticks, a range slider for smooth scrubbing, and a cursor readout with
// the current event type label.

import { useCallback, useRef } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';

import type { ReplayDriver, ReplaySpeed } from './useReplayDriver';
import { getEventGlyph } from '../../shared/eventGlyphs';
import { cn } from '../../../lib/cn';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPEEDS: ReplaySpeed[] = [0.5, 1, 2, 4, 'instant'];

function formatSpeedLabel(speed: ReplaySpeed): string {
  return speed === 'instant' ? '⚡' : `${speed}×`;
}

/** Human-friendly short name for event types shown in the scrubber. */
function shortEventLabel(eventType: string): string {
  const parts = eventType.split('.');
  // e.g. "pipeline.step.started" -> "step started"
  if (parts.length >= 3) return `${parts[1]} ${parts.slice(2).join('.')}`;
  if (parts.length === 2) return parts[1];
  return eventType;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface ScrubberProps {
  replay: ReplayDriver;
}

export default function Scrubber({ replay }: ScrubberProps) {
  const { state, play, pause, stop, seek, setSpeed, events } = replay;
  const { playing, cursor, totalEvents, speedMultiplier } = state;
  const hasEvents = totalEvents > 0;
  const fillPct = hasEvents
    ? Math.min(100, (cursor / totalEvents) * 100)
    : 0;

  const trackRef = useRef<HTMLDivElement>(null);

  // Current event label (the event that was just dispatched, i.e. cursor - 1).
  const currentEvent = cursor > 0 && cursor <= events.length ? events[cursor - 1] : null;
  const currentLabel = currentEvent ? shortEventLabel(currentEvent.eventType) : 'ready';

  // Click on the track to seek.
  const handleTrackClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!hasEvents || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      const target = Math.round(pct * totalEvents);
      seek(target);
    },
    [hasEvents, totalEvents, seek],
  );

  // Range input for smooth slider scrubbing.
  const handleSliderChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      seek(val);
    },
    [seek],
  );

  return (
    <div
      className="h-[60px] shrink-0 flex items-center gap-2.5 px-4 bg-surface border-t border-border"
      data-testid="replay-scrubber"
    >
      {/* Transport controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          data-ui-part=""
          type="button"
          className={cn(
            'w-7 h-7 p-0 border rounded-md text-xs font-[inherit] inline-flex items-center justify-center',
            !hasEvents
              ? 'border-border text-text-secondary cursor-not-allowed opacity-50'
              : playing
                ? 'bg-transparent border-border text-text-secondary cursor-pointer'
                : 'bg-primary text-white border-primary cursor-pointer'
          )}
          onClick={playing ? pause : play}
          disabled={!hasEvents}
          title={playing ? 'Pause (Space)' : 'Play (Space)'}
          aria-label={playing ? 'Pause' : 'Play'}
          data-testid="replay-play"
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <button
          data-ui-part=""
          type="button"
          className={cn(
            'w-7 h-7 p-0 border rounded-md text-xs font-[inherit] inline-flex items-center justify-center',
            !hasEvents
              ? 'border-border text-text-secondary cursor-not-allowed opacity-50'
              : 'bg-transparent border-border text-text-secondary cursor-pointer'
          )}
          onClick={stop}
          disabled={!hasEvents}
          title="Stop (Home)"
          aria-label="Stop"
          data-testid="replay-stop"
        >
          ◼
        </button>
        <button
          data-ui-part=""
          type="button"
          className={cn(
            'w-7 h-7 p-0 border rounded-md text-xs font-[inherit] inline-flex items-center justify-center',
            !hasEvents || cursor <= 0
              ? 'border-border text-text-secondary cursor-not-allowed opacity-50'
              : 'bg-transparent border-border text-text-secondary cursor-pointer'
          )}
          onClick={() => seek(Math.max(0, cursor - 1))}
          disabled={!hasEvents || cursor <= 0}
          title="Previous event (←)"
          aria-label="Previous event"
          data-testid="replay-prev"
        >
          ◀
        </button>
        <button
          data-ui-part=""
          type="button"
          className={cn(
            'w-7 h-7 p-0 border rounded-md text-xs font-[inherit] inline-flex items-center justify-center',
            !hasEvents || cursor >= totalEvents
              ? 'border-border text-text-secondary cursor-not-allowed opacity-50'
              : 'bg-transparent border-border text-text-secondary cursor-pointer'
          )}
          onClick={() => seek(Math.min(totalEvents, cursor + 1))}
          disabled={!hasEvents || cursor >= totalEvents}
          title="Next event (→)"
          aria-label="Next event"
          data-testid="replay-next"
        >
          ▶
        </button>
      </div>

      {/* Speed pills */}
      <div className="flex items-center gap-[3px] shrink-0">
        {SPEEDS.map((s) => (
          <button
            data-ui-part=""
            key={String(s)}
            type="button"
            className={cn(
              'text-[11px] px-[7px] py-[2px] rounded-sm font-[inherit] leading-[1.4] cursor-pointer',
              speedMultiplier === s
                ? 'bg-primary text-white border border-primary font-semibold'
                : 'bg-transparent text-text-secondary border border-border'
            )}
            onClick={() => setSpeed(s)}
            title={`Playback speed ${formatSpeedLabel(s)}`}
            data-testid={`replay-speed-${s}`}
          >
            {formatSpeedLabel(s)}
          </button>
        ))}
      </div>

      {/* Timeline track with ticks, fill bar, and slider overlay */}
      <div className="flex-1 min-w-0 flex flex-col gap-1 relative">
        <div
          ref={trackRef}
          className="w-full h-1 rounded-sm bg-border relative overflow-visible"
          onClick={handleTrackClick}
          data-testid="replay-track"
        >
          {/* Progress fill */}
          <div
            className="absolute top-0 left-0 h-full rounded-sm bg-gradient-to-r from-primary to-primary/60 transition-[width] duration-[80ms] linear"
            style={{ width: `${fillPct}%` }}
          />

          {/* Event ticks */}
          {events.map((evt, idx) => {
            const glyph = getEventGlyph(evt.eventType);
            const leftPct =
              totalEvents > 1 ? (idx / (totalEvents - 1)) * 100 : 50;
            return (
              <button
                data-ui-part=""
                key={`${evt.seq}-${evt.eventType}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  seek(idx + 1);
                }}
                aria-label={`Seek to ${evt.eventType}`}
                title={evt.eventType}
                data-testid={`replay-tick-${idx}`}
                className="absolute w-1.5 h-2.5 p-0 border-none rounded-sm cursor-pointer transition-opacity duration-[120ms] z-[1]"
                style={{
                  top: -3,
                  left: `calc(${leftPct}% - 3px)`,
                  background: glyph.color,
                  opacity: idx < cursor ? 1 : 0.35,
                }}
              />
            );
          })}

          {/* Playhead thumb */}
          {hasEvents && (
            <div
              className="absolute w-2.5 h-3 rounded-sm bg-primary border-2 border-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] pointer-events-none transition-[left] duration-[80ms] linear"
              style={{
                top: -4,
                left: `calc(${fillPct}% - 5px)`,
              }}
            />
          )}

          {/* Invisible range input for accessible scrubbing */}
          <input
            data-ui-part=""
            type="range"
            min={0}
            max={totalEvents}
            value={cursor}
            onChange={handleSliderChange}
            className="absolute -top-1.5 left-0 w-full h-4 m-0 p-0 opacity-0 cursor-pointer z-[2]"
            aria-label="Replay scrubber"
            data-testid="replay-slider"
          />
        </div>
      </div>

      {/* Readout: counter + current event label */}
      <div className="flex flex-col items-end gap-px shrink-0 min-w-[100px]" data-testid="replay-readout">
        <span className="font-mono text-xs text-text-secondary">
          {cursor} / {totalEvents}
        </span>
        <span
          className="text-[10px] text-text-tertiary whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]"
          title={currentEvent?.eventType ?? ''}
        >
          {currentLabel}
        </span>
      </div>
    </div>
  );
}
