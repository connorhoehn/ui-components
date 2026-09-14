// ui-components/src/components/video/CallTileRow.tsx
//
// The call as a ROW: every participant's tile side by side, one strip, with
// the call's controls at its end. For a surface where the call is not the
// point — a document being read, a diagram being drawn — and the people on
// it belong along the bottom edge, not in a panel that competes with the
// page for width. The stage, spotlight and filmstrip of HangoutLayout are
// for a surface the call owns; this is for one it visits.
//
// Purely presentational, like ParticipantTile: the host hands in the same
// HangoutLayoutParticipant rows it hands the grid.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ParticipantTile } from './ParticipantTile';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';

export interface CallTileRowProps {
  participants: HangoutLayoutParticipant[];
  /** The viewer's own tile — drawn last, at the controls' side, where a mirror belongs. */
  localParticipant?: HangoutLayoutParticipant | null;
  activeSpeakerId?: string | null;
  /** Width of one tile; tiles keep 16:9. Default 144. */
  tileWidth?: number;
  /** The call's controls (mute, camera, leave, pop-out…), rendered at the row's end. */
  controls?: ReactNode;
  /** A short label at the row's start — the room, or who is on the call. */
  title?: ReactNode;
  onParticipantClick?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

export function CallTileRow({
  participants,
  localParticipant,
  activeSpeakerId,
  tileWidth = 144,
  controls,
  title,
  onParticipantClick,
  className,
  style,
  'data-testid': testId = 'call-tile-row',
}: CallTileRowProps) {
  const tiles = localParticipant ? [...participants, localParticipant] : participants;
  return (
    <div
      className={cn('flex w-full min-w-0 items-center gap-2 rounded-xl bg-video-stage p-2 text-white shadow-md', className)}
      style={style}
      role="group"
      aria-label={typeof title === 'string' ? `Call: ${title}` : 'Call'}
      data-testid={testId}
      data-tile-count={tiles.length}
    >
      {title && (
        <span className="max-w-[10rem] shrink-0 truncate px-1 text-xs font-semibold text-white/80" data-testid={`${testId}-title`}>
          {title}
        </span>
      )}
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto" data-testid={`${testId}-tiles`}>
        {tiles.map((p) => (
          <ParticipantTile
            key={p.id}
            id={p.id}
            displayName={p.displayName}
            {...(p.avatarUrl ? { avatarUrl: p.avatarUrl } : {})}
            isMuted={p.isMuted}
            isLocal={p.isLocal}
            isSpeaking={p.id === activeSpeakerId}
            videoElement={p.videoElement}
            {...(onParticipantClick ? { onClick: () => onParticipantClick(p.id) } : {})}
            className="shrink-0"
            style={{ width: tileWidth }}
          />
        ))}
      </div>
      {controls && <div className="flex shrink-0 items-center" data-testid={`${testId}-controls`}>{controls}</div>}
    </div>
  );
}

export default CallTileRow;
