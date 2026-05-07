// frontend/src/components/pipelines/replay/Scrubber.tsx
//
// Replay scrubber strip for PipelineRunReplayPage. Renders playback transport
// controls (play/pause/stop), speed pills, a seekable timeline track with
// event ticks, a range slider for smooth scrubbing, and a cursor readout with
// the current event type label.

import { useCallback, useRef } from 'react';
import type { CSSProperties, ChangeEvent, MouseEvent } from 'react';

import type { ReplayDriver, ReplaySpeed } from './useReplayDriver';
import { getEventGlyph } from '../../shared/eventGlyphs';
import { colors } from '../../../constants/styles';

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
// Styles (60px strip per PIPELINES_PLAN.md §18.5)
// ---------------------------------------------------------------------------

const scrubberStyle: CSSProperties = {
  height: 60,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '0 16px',
  background: colors.surface,
  borderTop: `1px solid ${colors.border}`,
};

const transportGroupStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
};

const scrubberBtnStyle: CSSProperties = {
  width: 28,
  height: 28,
  padding: 0,
  background: 'transparent',
  border: `1px solid ${colors.border}`,
  borderRadius: 6,
  color: colors.textSecondary,
  fontSize: 12,
  fontFamily: 'inherit',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const scrubberBtnDisabledStyle: CSSProperties = {
  ...scrubberBtnStyle,
  cursor: 'not-allowed',
  opacity: 0.5,
};

const scrubberBtnActiveStyle: CSSProperties = {
  ...scrubberBtnStyle,
  background: colors.primary,
  color: '#ffffff',
  borderColor: colors.primary,
};

const speedGroupStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  flexShrink: 0,
};

const speedPillStyle: CSSProperties = {
  fontSize: 11,
  color: colors.textSecondary,
  padding: '2px 7px',
  border: `1px solid ${colors.border}`,
  borderRadius: 4,
  fontFamily: 'inherit',
  background: 'transparent',
  cursor: 'pointer',
  lineHeight: 1.4,
};

const speedPillActiveStyle: CSSProperties = {
  ...speedPillStyle,
  background: colors.primary,
  color: '#ffffff',
  borderColor: colors.primary,
  fontWeight: 600,
};

const trackContainerStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  position: 'relative',
};

const scrubberTrackStyle: CSSProperties = {
  width: '100%',
  height: 4,
  borderRadius: 2,
  background: colors.border,
  position: 'relative',
  overflow: 'visible',
};

const scrubberFillStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  borderRadius: 2,
  background: `linear-gradient(to right, ${colors.primary}, rgba(100, 108, 255, 0.6))`,
  transition: 'width 80ms linear',
};

const sliderStyle: CSSProperties = {
  position: 'absolute',
  top: -6,
  left: 0,
  width: '100%',
  height: 16,
  margin: 0,
  padding: 0,
  opacity: 0,
  cursor: 'pointer',
  zIndex: 2,
};

const thumbStyle = (leftPct: number): CSSProperties => ({
  position: 'absolute',
  top: -4,
  left: `calc(${leftPct}% - 5px)`,
  width: 10,
  height: 12,
  borderRadius: 3,
  background: colors.primary,
  border: '2px solid #ffffff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  pointerEvents: 'none',
  transition: 'left 80ms linear',
});

const readoutStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 1,
  flexShrink: 0,
  minWidth: 100,
};

const readoutCounterStyle: CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 12,
  color: colors.textSecondary,
};

const readoutLabelStyle: CSSProperties = {
  fontSize: 10,
  color: colors.textTertiary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 120,
};

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
    <div style={scrubberStyle} data-testid="replay-scrubber">
      {/* Transport controls */}
      <div style={transportGroupStyle}>
        <button
          type="button"
          style={
            !hasEvents
              ? scrubberBtnDisabledStyle
              : playing
                ? scrubberBtnStyle
                : scrubberBtnActiveStyle
          }
          onClick={playing ? pause : play}
          disabled={!hasEvents}
          title={playing ? 'Pause (Space)' : 'Play (Space)'}
          aria-label={playing ? 'Pause' : 'Play'}
          data-testid="replay-play"
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <button
          type="button"
          style={!hasEvents ? scrubberBtnDisabledStyle : scrubberBtnStyle}
          onClick={stop}
          disabled={!hasEvents}
          title="Stop (Home)"
          aria-label="Stop"
          data-testid="replay-stop"
        >
          ◼
        </button>
        <button
          type="button"
          style={
            !hasEvents || cursor <= 0
              ? scrubberBtnDisabledStyle
              : scrubberBtnStyle
          }
          onClick={() => seek(Math.max(0, cursor - 1))}
          disabled={!hasEvents || cursor <= 0}
          title="Previous event (←)"
          aria-label="Previous event"
          data-testid="replay-prev"
        >
          ◀
        </button>
        <button
          type="button"
          style={
            !hasEvents || cursor >= totalEvents
              ? scrubberBtnDisabledStyle
              : scrubberBtnStyle
          }
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
      <div style={speedGroupStyle}>
        {SPEEDS.map((s) => (
          <button
            key={String(s)}
            type="button"
            style={speedMultiplier === s ? speedPillActiveStyle : speedPillStyle}
            onClick={() => setSpeed(s)}
            title={`Playback speed ${formatSpeedLabel(s)}`}
            data-testid={`replay-speed-${s}`}
          >
            {formatSpeedLabel(s)}
          </button>
        ))}
      </div>

      {/* Timeline track with ticks, fill bar, and slider overlay */}
      <div style={trackContainerStyle}>
        <div
          ref={trackRef}
          style={scrubberTrackStyle}
          onClick={handleTrackClick}
          data-testid="replay-track"
        >
          {/* Progress fill */}
          <div style={{ ...scrubberFillStyle, width: `${fillPct}%` }} />

          {/* Event ticks */}
          {events.map((evt, idx) => {
            const glyph = getEventGlyph(evt.eventType);
            const leftPct =
              totalEvents > 1 ? (idx / (totalEvents - 1)) * 100 : 50;
            return (
              <button
                key={`${evt.seq}-${evt.eventType}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  seek(idx + 1);
                }}
                aria-label={`Seek to ${evt.eventType}`}
                title={evt.eventType}
                data-testid={`replay-tick-${idx}`}
                style={{
                  position: 'absolute',
                  top: -3,
                  left: `calc(${leftPct}% - 3px)`,
                  width: 6,
                  height: 10,
                  padding: 0,
                  border: 'none',
                  borderRadius: 2,
                  background: glyph.color,
                  opacity: idx < cursor ? 1 : 0.35,
                  cursor: 'pointer',
                  transition: 'opacity 120ms',
                  zIndex: 1,
                }}
              />
            );
          })}

          {/* Playhead thumb */}
          {hasEvents && <div style={thumbStyle(fillPct)} />}

          {/* Invisible range input for accessible scrubbing */}
          <input
            type="range"
            min={0}
            max={totalEvents}
            value={cursor}
            onChange={handleSliderChange}
            style={sliderStyle}
            aria-label="Replay scrubber"
            data-testid="replay-slider"
          />
        </div>
      </div>

      {/* Readout: counter + current event label */}
      <div style={readoutStyle} data-testid="replay-readout">
        <span style={readoutCounterStyle}>
          {cursor} / {totalEvents}
        </span>
        <span style={readoutLabelStyle} title={currentEvent?.eventType ?? ''}>
          {currentLabel}
        </span>
      </div>
    </div>
  );
}
