// HangoutRoomHeader — top bar for an active hangout call.
//
// Composition of the new Chip primitives + an actions slot. Leave-call
// affordance is intentionally NOT exposed here — per the locked
// boundary vs. websocket-gateway, leave belongs to <MediaControlsBar>.
//
// Consumer wires:
//   - channelName        → big title
//   - subtitle           → people-count copy ("3 people in the room")
//   - recording          → optional RecordingPill on the subtitle row
//   - elapsedLabel       → optional elapsed-time chip on the subtitle row
//   - phase              → optional PhaseChip on the right (live/reconnecting…)
//   - actions            → arbitrary right-side actions (Debug button, …)
//
// All chrome is presentational; the component subscribes to nothing.

import type { ReactNode } from 'react';
import Chip, { type ChipTone } from '../shared/Chip';
import { RecordingChip, type RecordingChipState } from './RecordingChip';
import { cn } from '../../lib/cn';

export type HangoutPhase =
  | 'idle'
  | 'joining'
  | 'joined'
  | 'reconnecting'
  | 'ended'
  | 'failed';

/** Same two states as RecordingChip; kept as a named alias for existing consumers. */
export type HangoutRoomHeaderRecording = RecordingChipState;

export interface HangoutRoomHeaderProps {
  channelName: string;
  subtitle?: ReactNode;
  recording?: HangoutRoomHeaderRecording;
  elapsedLabel?: string;
  phase?: HangoutPhase;
  actions?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

const PHASE_TONES: Record<HangoutPhase, ChipTone> = {
  idle:         'neutral',
  joining:      'warning',
  joined:       'success',
  reconnecting: 'warning',
  ended:        'neutral',
  failed:       'danger',
};

const PHASE_LABELS: Record<HangoutPhase, string> = {
  idle:         'Idle',
  joining:      'Joining…',
  joined:       'Live',
  reconnecting: 'Reconnecting…',
  ended:        'Ended',
  failed:       'Failed',
};

function ClockIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}

export function HangoutRoomHeader({
  channelName,
  subtitle,
  recording,
  elapsedLabel,
  phase,
  actions,
  className,
  'data-testid': testId,
}: HangoutRoomHeaderProps) {
  return (
    <header
      data-testid={testId}
      className={cn(
        'flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-surface',
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <h1 className="text-lg font-semibold truncate text-text-primary">{channelName}</h1>
        {(subtitle || recording?.armed || elapsedLabel) && (
          <div className="text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap">
            {subtitle && <span>{subtitle}</span>}
            {recording?.armed && (
              <RecordingChip
                armed={recording.armed}
                active={recording.active}
                titles={{ armed: 'Recording armed — will start when someone joins' }}
                data-testid="hangout-room-header-recording"
              />
            )}
            {elapsedLabel && (
              <Chip
                tone="neutral"
                size="xs"
                icon={<ClockIcon />}
                title="Time since you joined this room"
                data-testid="hangout-room-header-elapsed"
              >
                <span className="tabular-nums">{elapsedLabel}</span>
              </Chip>
            )}
          </div>
        )}
      </div>
      {(phase || actions) && (
        <div className="flex items-center gap-3 shrink-0">
          {phase && (
            <Chip
              tone={PHASE_TONES[phase]}
              size="sm"
              dot={phase === 'reconnecting' ? 'pulse' : 'static'}
              data-testid="hangout-room-header-phase"
            >
              {PHASE_LABELS[phase]}
            </Chip>
          )}
          {actions}
        </div>
      )}
    </header>
  );
}

export default HangoutRoomHeader;
