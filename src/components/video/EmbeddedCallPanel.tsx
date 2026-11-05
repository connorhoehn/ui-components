// EmbeddedCallPanel — a live call as a BLOCK in somebody else's layout.
//
// The floating widget is a window: it has its own pixel size, corners, drag
// handles and z-index, and every one of those is wrong the moment it is
// placed inside a column. Docked into a document gutter or a chat it kept its
// width and was clipped at the edge of whatever held it. This component is
// the other shape: full width, height from its content, no positioning, a
// header that says what it is and one way back out ("pop out"). The tiles,
// the controls and what "pop out" does all belong to the host.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { PopOutIcon } from './MediaIcons';
import { RecordingChip, type RecordingChipState } from './RecordingChip';

export interface EmbeddedCallPanelProps {
  /** What this call is — a room name, "Alice & Bob", a channel. */
  title: ReactNode;
  /** "3 in call", "Live" — the second thing worth knowing. */
  subtitle?: ReactNode;
  durationSeconds?: number;
  /** Shows the live dot. Default true — an embedded call that is not live is not shown. */
  live?: boolean;
  /**
   * Whether this call records. `armed` = it will (a room with recording on, a
   * DM both people opted into) but nothing is written yet; `active` = writing
   * now. Omitted or neither → no chip, which is the "not recorded" statement.
   */
  recording?: RecordingChipState;
  /** Take the call back out into its floating window. Omitted → no button. */
  onPopOut?: () => void;
  popOutLabel?: string;
  /** The tile area: HangoutLayout / CallParticipantStrip / a stream player. Fills a 16:9 stage. */
  children: ReactNode;
  /** MediaControlsBar or equivalent, rendered under the stage. */
  controls?: ReactNode;
  /**
   * A side panel beside the stage — the call's Chat / People / Devices.
   * Omitted renders nothing (today's output, byte-for-byte). Typically
   * <CallSidePanel> from ./CallSidePanel, fed the same `sidePanelTabs` /
   * `activeSidePanelTab` the floating widget uses, so the docked shape
   * reaches the same destinations instead of forcing a pop-out.
   */
  aside?: ReactNode;
  /** Stage aspect. `video` keeps 16:9; `audio` is a short strip for an audio-only call. */
  stage?: 'video' | 'audio';
  className?: string;
  'data-testid'?: string;
}

function clock(total: number): string {
  const s = Math.max(0, Math.floor(total));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}` : `${m}:${String(sec).padStart(2, '0')}`;
}

export function EmbeddedCallPanel({
  title, subtitle, durationSeconds, live = true, recording, onPopOut, popOutLabel = 'Pop the call out', children, controls,
  aside, stage = 'video', className, 'data-testid': testId = 'embedded-call-panel',
}: EmbeddedCallPanelProps) {
  return (
    <section
      data-ui-part=""
      className={cn(
        // '@container' only when there's an aside to respond to it — with
        // no aside the output stays byte-for-byte what it was before this
        // slot existed.
        'flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-video-stage text-white shadow-md',
        aside && '@container',
        className,
      )}
      aria-label={typeof title === 'string' ? `Call: ${title}` : 'Call'}
      data-testid={testId}
      data-stage={stage}
    >
      <header className="flex min-w-0 items-center gap-2 px-3 py-2">
        {live && <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-success" />}
        <span className="min-w-0 flex-1 truncate text-sm font-semibold" data-testid={`${testId}-title`}>{title}</span>
        {recording && (
          <RecordingChip armed={recording.armed} active={recording.active} className="shrink-0" data-testid={`${testId}-recording`} />
        )}
        {subtitle && <span className="shrink-0 text-xs text-white/60" data-testid={`${testId}-subtitle`}>{subtitle}</span>}
        {durationSeconds !== undefined && (
          <span className="shrink-0 font-mono text-xs tabular-nums text-white/80" data-testid={`${testId}-duration`}>{clock(durationSeconds)}</span>
        )}
        {onPopOut && (
          <IconButton
            aria-label={popOutLabel}
            title={popOutLabel}
            size="sm"
            variant="ghost"
            icon={<PopOutIcon size={16} />}
            onClick={onPopOut}
            className="shrink-0 text-white/80 hover:text-white"
            data-testid={`${testId}-pop-out`}
          />
        )}
      </header>
      {/* The stage sizes from WIDTH, never from a stored pixel box: whatever
          column this sits in, the tiles fit it. */}
      {aside ? (
        // With an aside, the stage and the dock become siblings in a row
        // that only appears once there's a container wide enough to hold
        // both without crushing the tiles — under that, they stack, aside
        // last. `@container` on the root (above) makes '@lg:' respond to
        // THIS panel's own box, not the viewport: the point of this
        // component is that its column width is somebody else's decision.
        <div className="flex min-h-0 min-w-0 flex-col @lg:flex-row">
          <div className={cn('relative w-full min-w-0 bg-black/40 @lg:flex-1', stage === 'video' ? 'aspect-video' : 'min-h-[88px]')} data-testid={`${testId}-stage`}>
            <div className="absolute inset-0">{children}</div>
          </div>
          {/* `max-h-80` + its own scroll caps a long chat when stacked
              under the stage; `@lg:max-h-none` lets it stretch to match
              the stage's height instead once the two sit side by side
              (flex's default cross-axis stretch), still capped by its own
              `overflow-y-auto` rather than growing the whole panel. */}
          <div className="flex max-h-80 min-h-0 min-w-0 flex-col overflow-y-auto @lg:max-h-none @lg:shrink-0" data-testid={`${testId}-aside`}>
            {aside}
          </div>
        </div>
      ) : (
        <div className={cn('relative w-full min-w-0 bg-black/40', stage === 'video' ? 'aspect-video' : 'min-h-[88px]')} data-testid={`${testId}-stage`}>
          <div className="absolute inset-0">{children}</div>
        </div>
      )}
      {controls && (
        <div className="flex w-full min-w-0 items-center justify-center overflow-x-auto px-2 py-2" data-testid={`${testId}-controls`}>
          {controls}
        </div>
      )}
    </section>
  );
}

export default EmbeddedCallPanel;
