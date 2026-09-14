// ui-components/src/components/video/CallTileRow.tsx
//
// The call as a ROW: every participant's tile side by side, one strip, with
// the call's controls at its end. For a surface where the call is not the
// point — a document being read, a diagram being drawn — and the people on
// it belong along the bottom edge, not in a panel that competes with the
// page for width. The stage, spotlight and filmstrip of HangoutLayout are
// for a surface the call owns; this is for one it visits.
//
// Floating (the default) is not a bar with the background removed. Each
// person is their own card: a video tile when their camera is on, a small
// avatar bubble when it is off — a dark rectangle for someone you cannot see
// says nothing a bubble does not, at four times the size. The row is as wide
// as the people in it, so one person over a diagram is one small tile, and
// the controls stay out of the way until the pointer is on the row.
//
// Purely presentational, like ParticipantTile: the host hands in the same
// HangoutLayoutParticipant rows it hands the grid.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ParticipantTile } from './ParticipantTile';
import { Avatar } from '../shared/Avatar';
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
  /**
   * `floating` (default): the tiles stand on their own over the page —
   * rounded, shadowed, no bar behind them — with the controls centred
   * beneath. A row of people over a diagram should look like people over a
   * diagram, not like a panel someone laid along the bottom edge. `bar`
   * keeps them in one dark strip with the controls at the end, for a dock
   * that is itself a panel.
   */
  variant?: 'floating' | 'bar';
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
  variant = 'floating',
  className,
  style,
  'data-testid': testId = 'call-tile-row',
}: CallTileRowProps) {
  const tiles = localParticipant ? [...participants, localParticipant] : participants;
  const tileNodes = tiles.map((p) => (
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
      className={cn('shrink-0', variant === 'floating' && 'rounded-xl shadow-lg ring-1 ring-black/10')}
      style={{ width: tileWidth }}
    />
  ));
  const ariaLabel = typeof title === 'string' ? `Call: ${title}` : 'Call';

  if (variant === 'floating') {
    return (
      <div
        className={cn('group/row flex w-fit max-w-full min-w-0 flex-col items-center gap-2', className)}
        style={style}
        role="group"
        aria-label={ariaLabel}
        data-testid={testId}
        data-variant="floating"
        data-tile-count={tiles.length}
      >
        <div className="flex max-w-full items-end gap-3 overflow-x-auto px-2 pb-1" data-testid={`${testId}-tiles`}>
          {tiles.map((p) =>
            p.videoElement ? (
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
                className={cn('shrink-0 rounded-xl shadow-lg ring-1 ring-black/10', p.id === activeSpeakerId && 'shadow-success/40')}
                style={{ width: tileWidth }}
              />
            ) : (
              <AvatarBubble
                key={p.id}
                participant={p}
                speaking={p.id === activeSpeakerId}
                {...(onParticipantClick ? { onClick: () => onParticipantClick(p.id) } : {})}
              />
            ),
          )}
        </div>
        {controls && (
          <div
            className="flex items-center rounded-full bg-black/55 px-1.5 py-1 shadow-md backdrop-blur-sm transition-opacity duration-150 opacity-0 group-hover/row:opacity-100 focus-within:opacity-100"
            data-testid={`${testId}-controls`}
          >
            {controls}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn('flex w-full min-w-0 items-center gap-2 rounded-xl bg-video-stage p-2 text-white shadow-md', className)}
      style={style}
      role="group"
      aria-label={ariaLabel}
      data-testid={testId}
      data-variant="bar"
      data-tile-count={tiles.length}
    >
      {title && (
        <span className="max-w-[10rem] shrink-0 truncate px-1 text-xs font-semibold text-white/80" data-testid={`${testId}-title`}>
          {title}
        </span>
      )}
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto" data-testid={`${testId}-tiles`}>
        {tileNodes}
      </div>
      {controls && <div className="flex shrink-0 items-center" data-testid={`${testId}-controls`}>{controls}</div>}
    </div>
  );
}

/**
 * A person whose camera is off: a bubble, the size of a presence avatar,
 * with the speaking ring and the mute mark a tile would carry. The name is
 * the tooltip and the accessible name — a label under a 44px circle is
 * wider than the circle.
 */
function AvatarBubble({ participant: p, speaking, onClick }: { participant: HangoutLayoutParticipant; speaking: boolean; onClick?: () => void }) {
  const label = `${p.displayName}${p.isLocal ? ' (you)' : ''}${p.isMuted ? ', muted' : ''}`;
  return (
    <div
      className={cn(
        'relative shrink-0 rounded-full shadow-lg ring-2 transition-shadow',
        speaking ? 'ring-success' : 'ring-white/70',
        onClick && 'cursor-pointer',
      )}
      title={label}
      aria-label={label}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
      data-testid={p.isLocal ? 'local-bubble' : 'remote-bubble'}
      data-peer-id={p.id}
      data-is-muted={p.isMuted ? 'true' : 'false'}
    >
      <Avatar name={p.displayName} size={44} {...(p.avatarUrl ? { src: p.avatarUrl } : {})} />
      {p.isMuted && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] text-white ring-2 ring-white" aria-hidden="true">
          ✕
        </span>
      )}
    </div>
  );
}

export default CallTileRow;
