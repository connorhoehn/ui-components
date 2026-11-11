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

import { memo, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { noteCallDockRender } from './callDockRenderProbe';
import { ParticipantTile } from './ParticipantTile';
import { RaisedHandBadge, raisedHandLabel } from './RaisedHandBadge';
import { gridCols } from './HangoutGrid';
import { Avatar } from '../shared/Avatar';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';
import { MicIcon, MicOffIcon, ScreenShareIcon } from './MediaIcons';
import { ParticipantAccessBadge, participantAccessInfo } from './ParticipantAccessBadge';

/** A row participant. The extra flags are read by the `dock` and `grid` variants only. */
export interface CallTileParticipant extends HangoutLayoutParticipant {
  /** Draws the screen-share glyph on the tile (the shared stream is the host's `videoElement`). */
  screenSharing?: boolean;
  /** Veils the tile (last frame kept) while this person's connection recovers. */
  reconnecting?: boolean;
  /**
   * Camera off, but keep `videoElement` MOUNTED (invisible) and draw the
   * initials. A remote person's audio rides the same MediaStream as their
   * video, so unmounting the element on camera-off silences them. `dock`/`grid` only.
   */
  cameraOff?: boolean;
  /** An audio sink (e.g. `<audio autoPlay>`), always mounted and never shown. `dock`/`grid` only. */
  audioElement?: ReactNode;
  /**
   * Invited and still ringing (2.436.0): a placeholder tile — the person's
   * avatar, dimmed, with "Ringing…" in place of the mic state — until they
   * answer. `dock`/`grid` only.
   */
  ringing?: boolean;
}

export interface CallTileRowProps {
  participants: CallTileParticipant[];
  /** The viewer's own tile — drawn last, at the controls' side, where a mirror belongs.
   *  The `dock` variant draws it FIRST, as "You", the way a call dock reads left to right. */
  localParticipant?: CallTileParticipant | null;
  activeSpeakerId?: string | null;
  /** Width of one tile; tiles keep 16:9. Default 144. */
  tileWidth?: number;
  /** The call's controls (mute, camera, leave, pop-out…), rendered at the row's end. */
  controls?: ReactNode;
  /** A short label at the row's start — the room, or who is on the call. */
  title?: ReactNode;
  onParticipantClick?: (id: string) => void;
  /**
   * The person being FOLLOWED: a 2px accent ring, distinct from the green
   * speaking ring (both can show at once — the accent wins the ring, the
   * speaking state keeps its corner dot).
   */
  highlightedId?: string | null;
  /**
   * What happens when there are more people than `maxVisible`:
   * `collapse` (default) ends the row with a `+N` tile; `scroll` keeps every
   * tile and lets the row scroll sideways.
   */
  overflow?: 'scroll' | 'collapse';
  /** Tiles before the `+N` tile under `overflow="collapse"`. Default 6. */
  maxVisible?: number;
  /** Tile height for the `dock` variant (tiles are `tileWidth` × `tileHeight`). Default 84. */
  tileHeight?: number;
  /** Prefix of each tile's test id in the `dock` variant (`<prefix>-<id>`). Default `call-tile`. */
  tileTestIdPrefix?: string;
  /**
   * `floating` (default): the tiles stand on their own over the page —
   * rounded, shadowed, no bar behind them — with the controls centred
   * beneath. A row of people over a diagram should look like people over a
   * diagram, not like a panel someone laid along the bottom edge. `bar`
   * keeps them in one dark strip with the controls at the end, for a dock
   * that is itself a panel.
   *
   * `gallery`: bounded 16:9 participant tiles (maximum 26rem), reflowing with
   * available width. A lone participant stays the same comfortable size.
   *
   * `grid` (2.423.0): the call's media panel — the same dock tiles (camera-off
   * initials with the media kept playing, audio sink, name, mic state,
   * speaking/followed ring, reconnecting veil), fluid 16:9 tiles in a grid
   * that reflows with the head count (`gridCols`: 1 → 1 column, 2–4 → 2,
   * 5–9 → 3, 10+ → 4). The viewer's tile is first, inline, as "You" — never
   * a PiP — and nobody is collapsed into `+N`. `tileWidth`, `tileHeight`,
   * `overflow` and `maxVisible` are ignored.
   */
  variant?: 'floating' | 'bar' | 'dock' | 'grid' | 'gallery';
  /** `grid` only (2.432.0): never more columns than this — a narrow pane keeps two tiles to a row. */
  maxColumns?: number;
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
  highlightedId = null,
  overflow = 'collapse',
  maxVisible = 6,
  tileHeight = 84,
  tileTestIdPrefix = 'call-tile',
  maxColumns,
  className,
  style,
  'data-testid': testId = 'call-tile-row',
}: CallTileRowProps) {
  if (variant === 'grid' || variant === 'gallery') {
    const all = localParticipant ? [localParticipant, ...participants] : participants;
    const cols = maxColumns ? Math.max(1, Math.min(gridCols(all.length), maxColumns)) : gridCols(all.length);
    return (
      <div
        className={cn('grid w-full min-w-0 gap-3', variant === 'gallery' ? 'grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] justify-items-center [&>*]:max-w-[26rem]' : GRID_COLUMNS[cols] ?? GRID_COLUMNS[4], className)}
        style={style}
        role="group"
        aria-label={typeof title === 'string' ? `Call: ${title}` : 'Call participants'}
        data-testid={testId}
        data-variant={variant}
        data-tile-count={all.length}
        data-columns={variant === 'gallery' ? undefined : cols}
      >
        {all.map((p) => (
          <DockTile
            key={p.id}
            participant={p}
            width={0}
            height={0}
            fluid
            speaking={p.id === activeSpeakerId}
            highlighted={p.id === highlightedId}
            testId={`${tileTestIdPrefix}-${p.id}`}
            {...(onParticipantClick ? { onParticipantClick } : {})}
          />
        ))}
      </div>
    );
  }

  if (variant === 'dock') {
    return (
      <DockRow
        all={localParticipant ? [localParticipant, ...participants] : participants}
        activeSpeakerId={activeSpeakerId ?? null}
        highlightedId={highlightedId}
        tileWidth={tileWidth}
        tileHeight={tileHeight}
        overflow={overflow}
        maxVisible={maxVisible}
        tileTestIdPrefix={tileTestIdPrefix}
        title={title}
        {...(onParticipantClick ? { onParticipantClick } : {})}
        {...(className ? { className } : {})}
        {...(style ? { style } : {})}
        testId={testId}
      />
    );
  }

  const tiles = localParticipant ? [...participants, localParticipant] : participants;
  const tileNodes = tiles.map((p) => (
    <ParticipantTile
      key={p.id}
      id={p.id}
      displayName={p.displayName}
      {...(p.avatarUrl ? { avatarUrl: p.avatarUrl } : {})}
      isMuted={p.isMuted}
      handRaised={p.handRaised}
      access={p.access}
      isLocal={p.isLocal}
      isSpeaking={p.id === activeSpeakerId}
      videoElement={p.videoElement}
      {...(onParticipantClick ? { onClick: () => onParticipantClick(p.id) } : {})}
      className={cn(
        'shrink-0',
        variant === 'floating' && 'rounded-xl shadow-lg ring-1 ring-black/10',
        p.id === highlightedId && 'ring-2 ring-primary',
      )}
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
        <div className="flex max-w-full items-end gap-2 bg-transparent" data-testid={`${testId}-tiles`}>
          {tiles.map((p) =>
            p.videoElement ? (
              <ParticipantTile
                key={p.id}
                id={p.id}
                displayName={p.displayName}
                {...(p.avatarUrl ? { avatarUrl: p.avatarUrl } : {})}
                isMuted={p.isMuted}
                handRaised={p.handRaised}
                access={p.access}
                isLocal={p.isLocal}
                isSpeaking={p.id === activeSpeakerId}
                videoElement={p.videoElement}
                {...(onParticipantClick ? { onClick: () => onParticipantClick(p.id) } : {})}
                // Every card the same: one rounded frame, one shadow, the
                // media filling it edge to edge. The speaking state is the
                // ring's colour, never a different frame — two people on one
                // row must look like two of the same thing.
                className={cn(
                  'shrink-0 rounded-xl !border-0 shadow-lg ring-2 [&_video]:h-full [&_video]:w-full [&_video]:object-cover [&>*:first-child]:h-full [&>*:first-child]:w-full',
                  p.id === highlightedId ? 'ring-primary' : p.id === activeSpeakerId ? 'ring-success' : 'ring-white/80',
                )}
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
            className="flex items-center rounded-full bg-black/60 px-1 py-0.5 shadow-md backdrop-blur-sm transition-opacity duration-150 opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 [&_button]:!h-9 [&_button]:!w-9"
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

/** Static column classes for the `grid` variant, keyed by `gridCols`. */
const GRID_COLUMNS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

/**
 * Elements of a wrapped dock row that sit below its first line (2.436.4):
 * the row is one tile tall with its overflow clipped, so they are the ones
 * that did not fit its width. Read from offsets only — finding them changes
 * no layout, so a host that sizes the dock to its content (nothing wraps)
 * and one that holds it to a column (the extras wrap) both settle at once.
 */
export function wrappedDockItems(items: readonly { offsetTop: number }[]): number[] {
  if (!items.length) return [];
  const firstLine = items[0]!.offsetTop;
  return items.flatMap((item, index) => (item.offsetTop > firstLine + 1 ? [index] : []));
}

interface DockRowProps {
  all: CallTileParticipant[];
  activeSpeakerId: string | null;
  highlightedId: string | null;
  tileWidth: number;
  tileHeight: number;
  overflow: 'scroll' | 'collapse';
  maxVisible: number;
  tileTestIdPrefix: string;
  title: ReactNode;
  onParticipantClick?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
  testId: string;
}

interface DockRowFold { hidden: number; names: string; left: number }

function DockRow({ all, activeSpeakerId, highlightedId, tileWidth, tileHeight, overflow, maxVisible, tileTestIdPrefix, title, onParticipantClick, className, style, testId }: DockRowProps) {
  const collapse = overflow === 'collapse' && all.length > maxVisible;
  // Keep the room for the +N tile inside maxVisible, so the row never grows past it.
  const shown = collapse ? all.slice(0, Math.max(1, maxVisible - 1)) : all;
  const folded = all.slice(shown.length);
  const rowRef = useRef<HTMLDivElement | null>(null);
  // Under `collapse` the row wraps instead of clipping a tile at its edge;
  // the tiles past its width sit on the clipped second line, still mounted
  // (their audio rides their video element), and a +N badge on the last
  // tile that fits counts them.
  const [fold, setFold] = useState<DockRowFold | null>(null);
  const shownKey = shown.map((p) => p.id).join('|');
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row || overflow !== 'collapse') return undefined;
    const measure = () => {
      const items = [...row.children].filter((child): child is HTMLElement => child instanceof HTMLElement && child.dataset.dockItem === 'true');
      const wrapped = wrappedDockItems(items);
      if (!wrapped.length) { setFold((current) => (current ? null : current)); return; }
      const names: string[] = [];
      let hidden = 0;
      for (const index of wrapped) {
        const item = items[index]!;
        if (item.dataset.dockOverflow === 'true') { hidden += folded.length; names.push(...folded.map((p) => p.displayName)); }
        else { hidden += 1; names.push(item.dataset.dockName ?? ''); }
      }
      const last = items[wrapped[0]! - 1];
      const left = last ? last.offsetLeft + last.offsetWidth : 0;
      const next = { hidden, names: names.join(', '), left };
      setFold((current) => (current && current.hidden === next.hidden && current.left === next.left && current.names === next.names ? current : next));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [overflow, shownKey, folded.length]); // eslint-disable-line react-hooks/exhaustive-deps
  const wraps = overflow === 'collapse';
  return (
    <div className={cn('relative min-w-0', className)} style={style}>
      <div
        ref={rowRef}
        className={cn(
          'flex min-w-0 items-center gap-2',
          wraps ? 'flex-wrap overflow-hidden' : 'overflow-x-auto',
        )}
        // One tile tall: the tiles that wrap are clipped, not shown on a second line.
        style={wraps ? { height: tileHeight } : undefined}
        role="group"
        aria-label={typeof title === 'string' ? `Call: ${title}` : 'Call participants'}
        data-testid={testId}
        data-variant="dock"
        data-tile-count={all.length}
        data-hidden-count={fold?.hidden ?? 0}
      >
        {shown.map((p) => (
          <DockTile
            key={p.id}
            participant={p}
            width={tileWidth}
            height={tileHeight}
            speaking={p.id === activeSpeakerId}
            highlighted={p.id === highlightedId}
            testId={`${tileTestIdPrefix}-${p.id}`}
            {...(onParticipantClick ? { onParticipantClick } : {})}
          />
        ))}
        {folded.length > 0 && (
          <div
            className="relative flex shrink-0 items-center justify-center rounded-md bg-video-tile text-white"
            // Tile size is a prop (74px at 1280, 84px at 1672) — not a static class.
            style={{ width: tileWidth, height: tileHeight }}
            data-testid={`${tileTestIdPrefix}-overflow`}
            data-dock-item="true"
            data-dock-overflow="true"
            aria-label={`${folded.length} more`}
            title={folded.map((p) => p.displayName).join(', ')}
            role="img"
          >
            {/* Folded people keep playing: their voice rides the same stream as their video. */}
            {folded.map((p) => (p.videoElement != null || p.audioElement != null) && (
              <div key={p.id} className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0" aria-hidden="true" data-testid={`${tileTestIdPrefix}-${p.id}-media-sink`}>
                {p.videoElement}
                {p.audioElement}
              </div>
            ))}
            <Avatar name={`+ ${folded.length}`} initials={`+${folded.length}`} size={40} color="rgba(255,255,255,0.18)" showTitle={false} />
          </div>
        )}
      </div>
      {fold && (
        <span
          className="pointer-events-none absolute top-1 z-20 -translate-x-full rounded-full bg-surface-inverse/70 px-2 py-0.5 text-xs font-medium text-white"
          // Placed at the right edge of the last tile that fits — a measured offset, not a static class.
          style={{ left: fold.left - 4 }}
          title={fold.names}
          aria-label={`${fold.hidden} more: ${fold.names}`}
          data-testid={`${tileTestIdPrefix}-wrapped`}
        >
          +{fold.hidden}
        </span>
      )}
    </div>
  );
}

interface DockTileProps {
  participant: CallTileParticipant;
  width: number;
  height: number;
  /** `grid`: fill the grid cell at 16:9 instead of `width` × `height`. */
  fluid?: boolean;
  speaking: boolean;
  highlighted: boolean;
  testId: string;
  /** Called with the tile's id; pass a stable function so the memo holds. */
  onParticipantClick?: (id: string) => void;
}

function shallowEqualObjects(a: object, b: object): boolean {
  if (a === b) return true;
  const ka = Object.keys(a) as (keyof typeof a)[];
  if (ka.length !== Object.keys(b).length) return false;
  return ka.every((k) => Object.is(a[k], b[k]));
}

/**
 * A dock tile re-renders only when what it draws changes: its own speaking /
 * followed flags (computed per tile by the row, so a new active speaker
 * re-renders two tiles, not all of them), its size, its click handler, or a
 * field of its participant (shallow — a host's `videoElement` must keep its
 * identity across renders, as a memoised element does). The dock's clock
 * tick changes none of these.
 */
const DockTile = memo(DockTileImpl, (prev, next) =>
  prev.width === next.width &&
  prev.height === next.height &&
  prev.fluid === next.fluid &&
  prev.speaking === next.speaking &&
  prev.highlighted === next.highlighted &&
  prev.testId === next.testId &&
  prev.onParticipantClick === next.onParticipantClick &&
  shallowEqualObjects(prev.participant, next.participant),
);

/**
 * One tile of the in-call dock: the person's video filling a rounded frame,
 * or — camera off — their initials on the dark tile colour; the name
 * bottom-left and the mic state bottom-right on a soft gradient, so both
 * read over any frame. The tile colours are the video tokens, dark in both
 * themes on purpose.
 */
function DockTileImpl({
  participant: p,
  width,
  height,
  fluid = false,
  speaking,
  highlighted,
  testId,
  onParticipantClick,
}: DockTileProps) {
  noteCallDockRender('tile', p.id);
  const onClick = onParticipantClick ? () => onParticipantClick(p.id) : undefined;
  const name = p.isLocal ? 'You' : p.displayName;
  const label = p.ringing
    ? `${p.displayName}, ringing`
    : `${p.isLocal ? 'You' : p.displayName}${accessSuffix(p.access)}${p.handRaised ? `, ${raisedHandLabel(p.handRaised)!.toLowerCase()}` : ''}${p.isMuted ? ', muted' : ''}${p.screenSharing ? ', sharing screen' : ''}`;
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-md text-white',
        fluid && 'aspect-video w-full',
        // Camera off: the soft grey tile with initials (mockup 02); a live
        // frame sits on the dark video tile.
        p.videoElement && !p.cameraOff ? 'bg-video-tile' : 'bg-video-tile-off',
        '[&_video]:h-full [&_video]:w-full [&_video]:object-cover',
        onClick && 'cursor-pointer',
      )}
      // Tile size is a prop (74px tall at 1280, 84px at 1672) — not a static class.
      style={fluid ? undefined : { width, height }}
      title={label}
      aria-label={label}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
      data-testid={testId}
      data-peer-id={p.id}
      data-dock-item="true"
      data-dock-name={p.displayName}
      data-is-local={p.isLocal ? 'true' : 'false'}
      data-is-muted={p.isMuted ? 'true' : 'false'}
      data-highlighted={highlighted ? 'true' : 'false'}
      data-speaking={speaking ? 'true' : 'false'}
      data-track-kind={p.videoElement && !p.cameraOff ? 'camera' : 'avatar'}
      data-ringing={p.ringing ? 'true' : undefined}
      data-hand-raised={p.handRaised ? 'true' : undefined}
      data-access={p.access}
    >
      {p.videoElement && (
        // Keep the SAME sink mounted when the camera toggles; replacing the
        // video node can interrupt remote audio and restart stream playback.
        <div className={p.cameraOff ? 'pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0' : 'absolute inset-0'} aria-hidden={p.cameraOff || undefined} data-testid={p.cameraOff ? `${testId}-media-sink` : `${testId}-media`}>
          {p.videoElement}
        </div>
      )}
      {p.audioElement != null && (
        <div className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0" aria-hidden="true" data-testid={`${testId}-audio-sink`}>
          {p.audioElement}
        </div>
      )}
      {(!p.videoElement || p.cameraOff) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Avatar
            name={p.displayName}
            size={fluid ? 56 : Math.round(Math.min(40, height * 0.48))}
            {...(p.avatarUrl ? { src: p.avatarUrl } : {})}
            color="rgba(71,80,92,0.28)"
            showTitle={false}
            {...(p.ringing ? { className: 'animate-pulse' } : {})}
          />
        </div>
      )}
      {p.reconnecting && (
        <div className="absolute inset-0 bg-surface-inverse/40" data-testid={`${testId}-reconnecting`} aria-hidden="true" />
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1 pt-3 text-xs">
        <span className="min-w-0 flex-1 truncate font-medium">{name}</span>
        {p.ringing ? (
          <span className="shrink-0 text-white/80" data-testid={`${testId}-ringing`}>Ringing…</span>
        ) : (
          <>
            <ParticipantAccessBadge access={p.access} tone="overlay" iconOnly data-testid={`${testId}-access`} />
            <RaisedHandBadge raised={p.handRaised} tone="overlay" data-testid={`${testId}-hand`} />
            {p.screenSharing && <ScreenShareIcon size={13} className="shrink-0" />}
            {p.isMuted ? <MicOffIcon size={14} className="shrink-0" /> : <MicIcon size={14} className="shrink-0" />}
          </>
        )}
      </div>
      {(highlighted || speaking) && (
        // The ring is drawn INSIDE the tile, on top of the video (2.395.3): an
        // outer ring/offset was clipped by the dock row's overflow and never
        // showed. Accent = followed; green = speaking.
        <span
          aria-hidden="true"
          data-testid={`${testId}-ring`}
          data-ring={highlighted ? 'highlighted' : 'speaking'}
          className={cn(
            'pointer-events-none absolute inset-0 z-10 rounded-md ring-2 ring-inset',
            highlighted ? 'ring-primary' : 'ring-success',
          )}
        />
      )}
      {speaking && highlighted && (
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-success" aria-hidden="true" />
      )}
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
  const label = `${p.displayName}${p.isLocal ? ' (you)' : ''}${accessSuffix(p.access)}${p.handRaised ? `, ${raisedHandLabel(p.handRaised)!.toLowerCase()}` : ''}${p.isMuted ? ', muted' : ''}`;
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
      data-access={p.access}
    >
      <Avatar name={p.displayName} size={44} {...(p.avatarUrl ? { src: p.avatarUrl } : {})} />
      {p.handRaised ? (
        <RaisedHandBadge raised={p.handRaised} tone="overlay" className="absolute -left-1 -top-1 ring-2 ring-white" data-testid="bubble-hand" />
      ) : null}
      <ParticipantAccessBadge access={p.access} tone="overlay" iconOnly className="absolute -bottom-1 -left-1 bg-call-chrome ring-2 ring-white" data-testid="bubble-access" />
      {p.isMuted && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] text-white ring-2 ring-white" aria-hidden="true">
          ✕
        </span>
      )}
    </div>
  );
}

/** ", view only" for a tile's accessible name, or "" with full access. */
function accessSuffix(access: CallTileParticipant['access']): string {
  const info = participantAccessInfo(access);
  return info ? `, ${info.label.toLowerCase()}` : '';
}

export default CallTileRow;
