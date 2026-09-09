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

export interface EmbeddedCallPanelProps {
  /** What this call is — a room name, "Alice & Bob", a channel. */
  title: ReactNode;
  /** "3 in call", "Live" — the second thing worth knowing. */
  subtitle?: ReactNode;
  durationSeconds?: number;
  /** Shows the live dot. Default true — an embedded call that is not live is not shown. */
  live?: boolean;
  /** Take the call back out into its floating window. Omitted → no button. */
  onPopOut?: () => void;
  popOutLabel?: string;
  /** The tile area: HangoutLayout / CallParticipantStrip / a stream player. Fills a 16:9 stage. */
  children: ReactNode;
  /** MediaControlsBar or equivalent, rendered under the stage. */
  controls?: ReactNode;
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
  title, subtitle, durationSeconds, live = true, onPopOut, popOutLabel = 'Pop the call out', children, controls,
  stage = 'video', className, 'data-testid': testId = 'embedded-call-panel',
}: EmbeddedCallPanelProps) {
  return (
    <section
      className={cn('flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-video-stage text-white shadow-md', className)}
      aria-label={typeof title === 'string' ? `Call: ${title}` : 'Call'}
      data-testid={testId}
      data-stage={stage}
    >
      <header className="flex min-w-0 items-center gap-2 px-3 py-2">
        {live && <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-success" />}
        <span className="min-w-0 flex-1 truncate text-sm font-semibold" data-testid={`${testId}-title`}>{title}</span>
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
      <div className={cn('relative w-full min-w-0 bg-black/40', stage === 'video' ? 'aspect-video' : 'min-h-[88px]')} data-testid={`${testId}-stage`}>
        <div className="absolute inset-0">{children}</div>
      </div>
      {controls && (
        <div className="flex w-full min-w-0 items-center justify-center overflow-x-auto px-2 py-2" data-testid={`${testId}-controls`}>
          {controls}
        </div>
      )}
    </section>
  );
}

export default EmbeddedCallPanel;
