// ui-components/src/components/video/CallDock.tsx
//
// The in-call dock under a document: one header row — the call's title,
// "4 people · 09:41", the review-document chips, then mic ▾, camera ▾,
// Share, People N, Documents N, settings, pop-out and Leave — over a row of
// video tiles. It is part of the editor's footer (above the composer), not
// a floating window, so it never covers the page.
//
// The header row follows the page theme; the tiles are the video tokens,
// dark in both themes. It responds to its OWN width (container queries), not
// the viewport's: the document chips go below a 1240px content width (they would truncate first), the Documents button
// below 980px, and the People/Share labels shrink to icon + count below 860px.
//
// Phases: calling (ringing the other side: "Calling Frank Davis…", no clock
// or head count, mic/camera usable, Share disabled, Leave reads Cancel),
// connecting (one skeleton tile, only Leave enabled), active,
// reconnecting (veiled tiles, a warning meta), ended (a one-line summary with
// Dismiss), error (a danger banner with Rejoin and Dismiss).
//
// A conversation call (a DM or room shelf above the chat composer) has no
// review documents: leave `documents` / `onOpenDocuments` out and the chips
// and the Documents button are not rendered. `extras` carries the host's own
// controls (reactions, recording chip, side-panel toggles) into the controls
// row, before the settings gear.
//
// `layout="stack"` (2.432.0) is the same header over a reflowing tile grid,
// for a narrow host (the shell's right pane, a popped-out chat): mic ▾,
// camera ▾ and Leave stay on the bar; Share, People, Documents, settings and
// pop-out fold into one "⋯" menu; the tiles wrap two to a row. `tileSize`
// (2.432.0) picks the shelf's tile size: `sm` 132 × 74 (= `compact`), `md`
// 176 × 88 (default), `lg` 240 × 135 above a full-width composer.
//
// A narrow column (a chat pane with a side panel open, ~520–650px) keeps
// every control: the labels collapse first (below 860px), then the controls
// wrap onto further right-aligned lines. Settings, pop-out and Leave travel
// as one unit, so Leave is always visible and always last.
//
// Render budget (2.407.7): the host re-renders the dock once a second for the
// clock. Only the meta line (`CallDockMeta`) depends on `elapsedMs`; the tile
// row sits behind `CallDockTiles` (memo on the participants, the speaker, the
// followed person and the size) and each tile behind a memoised `DockTile`
// (shallow on its participant), with `onTileClick` held in a ref so an inline
// host handler does not break either. A clock tick renders no tile.

import { memo, useCallback, useRef, useState, type ReactNode } from 'react';
import { noteCallDockRender } from './callDockRenderProbe';
import { cn } from '../../lib/cn';
import { Badge } from '../shared/Badge';
import Banner from '../shared/Banner';
import { InlinePopover } from '../shared/InlinePopover';
import SkeletonCard from '../shared/SkeletonCard';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { DocumentIcon, MoreIcon } from '../ui/Icons';
import { DropdownMenu, type DropdownMenuItem } from '../shared/DropdownMenu';
import { CallTileRow, type CallTileParticipant } from './CallTileRow';
import { DeviceToggleSelect, type DeviceToggleSelectProps } from './DeviceToggleSelect';
import {
  ExpandIcon,
  PhoneOffIcon,
  ScreenShareIcon,
  SettingsGearIcon,
  UsersIcon,
} from './MediaIcons';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';

export interface CallDockParticipant extends HangoutLayoutParticipant {
  userId: string;
  cameraOn: boolean;
  audioOn: boolean;
  screenSharing: boolean;
  presenting: boolean;
  connection: 'connected' | 'reconnecting';
  /**
   * An audio sink independent of the camera (an `<audio autoPlay>` on the
   * person's stream). Optional: with camera off the dock keeps `videoElement`
   * mounted but invisible anyway, so the audio that rides that stream plays.
   */
  audioElement?: ReactNode;
}

/**
 * `calling` is the caller's side of a ring before anyone answers: the call
 * exists but nobody else is in it, so the meta names who is being called
 * instead of "1 person · 00:33".
 */
export type CallDockPhase = 'calling' | 'connecting' | 'active' | 'reconnecting' | 'ended' | 'error';

export interface CallDockProps {
  title: string;
  participantCount: number;
  /** Elapsed call time; null before the call has a start time. */
  elapsedMs: number | null;
  phase: CallDockPhase;
  /** `phase: 'calling'`: who is being rung — the meta reads "Calling <name>…" (else "Calling…"). */
  callingTo?: string;
  /** The review documents; omit (or pass []) with no `onOpenDocuments` for a call without documents. */
  documents?: { id: string; title: string; presenting?: boolean }[];
  /** Everyone in the call, the viewer included (matched by `localParticipantId`). */
  participants: CallDockParticipant[];
  localParticipantId: string;
  activeSpeakerId?: string | null;
  /** The person being followed — their tile gets the accent ring. */
  followingUserId?: string | null;
  mic: Omit<DeviceToggleSelectProps, 'kind'>;
  camera: Omit<DeviceToggleSelectProps, 'kind'>;
  screenShare: { on: boolean; disabledReason?: string; onToggle: () => void };
  onOpenPeople: () => void;
  /** Omitted → no Documents button (a conversation call). */
  onOpenDocuments?: () => void;
  peopleOpen?: boolean;
  documentsOpen?: boolean;
  onOpenSettings: () => void;
  /** Host controls rendered in the controls row, before the settings gear. */
  extras?: ReactNode;
  onPopOut: () => void;
  onLeave: () => void;
  /** The host with others present: Leave asks "Leave the call? Others stay on." with End for everyone. */
  canEndForEveryone?: boolean;
  onEndForEveryone?: () => void;
  onTileClick?: (userId: string) => void;
  onTitleClick?: () => void;
  onDocumentClick?: (id: string) => void;
  /** Ended: the line after "Call ended · 12:04 · ". */
  endedSummary?: ReactNode;
  /**
   * The error banner. `title` replaces the default "Lost the call — <message>"
   * (a join that never connected reads "Couldn't join the call — …"), and
   * `retryLabel` replaces "Rejoin" ("Try again" for that same case).
   */
  error?: { message: string; onRetry: () => void; title?: string; retryLabel?: string };
  onDismiss?: () => void;
  /** 132 × 74 tiles (a 1280 × 720 window) instead of 176 × 88 (the mockup's 166 × 84 at its 1.054 scale). */
  compact?: boolean;
  /**
   * Shelf tile size (2.432.0): `sm` 132 × 74 (what `compact` picks), `md`
   * 176 × 88 (the default), `lg` 240 × 135 — the tiles above a full-width
   * conversation composer. Wins over `compact` when both are given.
   */
  tileSize?: CallDockTileSize;
  /**
   * `shelf` (default): the header row (title, meta, device controls, Leave)
   * over a row of fixed-size tiles. `grid` (2.423.0): the call's media
   * panel — ONLY the tile stage, as a reflowing grid of fluid 16:9 tiles
   * (`CallTileRow variant="grid"`, the viewer first as "You"). No header,
   * meta or controls render: the host's bar (e.g. `HuddleBar`) owns mic,
   * camera and Leave. Connecting draws one fluid skeleton; reconnecting keeps
   * its badge; the ended and error phases render as they do for `shelf`.
   * `stack` (2.432.0): the narrow form of `shelf` — the header (title, meta,
   * mic ▾, camera ▾, a "⋯" menu holding Share, People, Documents, settings
   * and pop-out, then Leave) over the reflowing tile grid, at most two tiles
   * to a row. For a conversation composer in a side pane.
   */
  layout?: 'shelf' | 'grid' | 'stack';
  className?: string;
  'data-testid'?: string;
}

export type CallDockTileSize = 'sm' | 'md' | 'lg';
const TILE_PX: Record<CallDockTileSize, { w: number; h: number; box: string; visible: number }> = {
  sm: { w: 132, h: 74, box: 'h-[74px] w-[132px]', visible: 5 },
  md: { w: 176, h: 88, box: 'h-[88px] w-[176px]', visible: 6 },
  lg: { w: 240, h: 135, box: 'h-[135px] w-[240px]', visible: 6 },
};

/** "09:41", or "1:02:03" past an hour. */
export function formatCallElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function peopleLabel(n: number): string {
  return n === 1 ? '1 person' : `${n} people`;
}

/** "4 people · 09:41" (or the calling / connecting / reconnecting line) — the only part a clock tick changes. */
const CallDockMeta = memo(function CallDockMeta({
  phase,
  callingTo,
  participantCount,
  elapsedMs,
}: {
  phase: CallDockPhase;
  callingTo: string | undefined;
  participantCount: number;
  elapsedMs: number | null;
}) {
  noteCallDockRender('meta');
  let meta: ReactNode;
  if (phase === 'calling') meta = callingTo ? `Calling ${callingTo}…` : 'Calling…';
  else if (phase === 'connecting') meta = 'Connecting…';
  else if (phase === 'reconnecting') meta = <span className="text-warning-fg">Reconnecting…</span>;
  else meta = `${peopleLabel(participantCount)}${elapsedMs != null ? ` · ${formatCallElapsed(elapsedMs)}` : ''}`;
  return (
    <span className="shrink-0 whitespace-nowrap text-sm tabular-nums text-text-tertiary" data-testid="call-dock-meta">
      {meta}
    </span>
  );
});

function toTile(p: CallDockParticipant, isLocal: boolean, reconnecting: boolean): CallTileParticipant {
  return {
    ...p,
    id: p.userId,
    isLocal,
    isMuted: !p.audioOn,
    // Camera off → the tile draws the initials, but the video element stays
    // mounted (hidden): the person's audio rides the same stream.
    videoElement: p.videoElement,
    cameraOff: !p.cameraOn && !p.screenSharing,
    audioElement: p.audioElement,
    screenSharing: p.screenSharing,
    reconnecting: reconnecting || p.connection === 'reconnecting',
  };
}

/** The tile row, kept out of the clock's re-render: none of its props change on a tick. */
const CallDockTiles = memo(function CallDockTiles({
  participants,
  localParticipantId,
  activeSpeakerId,
  followingUserId,
  reconnecting,
  size,
  grid = false,
  maxColumns,
  onTileClick,
  title,
}: {
  participants: CallDockParticipant[];
  localParticipantId: string;
  activeSpeakerId: string | null;
  followingUserId: string | null;
  reconnecting: boolean;
  size: CallDockTileSize;
  grid?: boolean;
  maxColumns?: number;
  onTileClick: ((userId: string) => void) | undefined;
  title: string;
}) {
  const local = participants.find((p) => p.userId === localParticipantId) ?? null;
  const remotes = participants.filter((p) => p.userId !== localParticipantId);
  return (
    <CallTileRow
      variant={grid ? 'grid' : 'dock'}
      participants={remotes.map((p) => toTile(p, false, reconnecting))}
      localParticipant={local ? toTile(local, true, reconnecting) : null}
      activeSpeakerId={activeSpeakerId}
      highlightedId={followingUserId}
      tileWidth={TILE_PX[size].w}
      tileHeight={TILE_PX[size].h}
      overflow="collapse"
      maxVisible={TILE_PX[size].visible}
      {...(maxColumns ? { maxColumns } : {})}
      {...(onTileClick ? { onParticipantClick: onTileClick } : {})}
      title={title}
      data-testid="call-dock-tile-row"
    />
  );
});

export function CallDock({
  title,
  participantCount,
  elapsedMs,
  phase,
  callingTo,
  documents = [],
  participants,
  localParticipantId,
  activeSpeakerId = null,
  followingUserId = null,
  mic,
  camera,
  screenShare,
  onOpenPeople,
  onOpenDocuments,
  peopleOpen = false,
  documentsOpen = false,
  onOpenSettings,
  extras,
  onPopOut,
  onLeave,
  canEndForEveryone = false,
  onEndForEveryone,
  onTileClick,
  onTitleClick,
  onDocumentClick,
  endedSummary,
  error,
  onDismiss,
  compact = false,
  tileSize,
  layout = 'shelf',
  className,
  'data-testid': testId = 'call-dock',
}: CallDockProps) {
  const size: CallDockTileSize = tileSize ?? (compact ? 'sm' : 'md');
  const leaveRef = useRef<HTMLButtonElement | null>(null);
  const [confirmLeave, setConfirmLeave] = useState(false);
  // The host's handler, read at click time: an inline `onTileClick` gets a new
  // identity every render and would otherwise re-render every tile on the clock.
  const tileClickRef = useRef(onTileClick);
  tileClickRef.current = onTileClick;
  const stableTileClick = useCallback((userId: string) => tileClickRef.current?.(userId), []);

  if (phase === 'error' && error) {
    return (
      <div className={cn('border-t border-border bg-surface px-5 py-3', className)} data-testid={testId} data-phase="error">
        <Banner
          variant="error"
          title={error.title ?? `Lost the call — ${error.message}`}
          data-testid="call-dock-error"
          action={
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={error.onRetry} data-testid="call-dock-rejoin">
                {error.retryLabel ?? 'Rejoin'}
              </Button>
              {onDismiss && (
                <Button size="sm" variant="ghost" onClick={onDismiss} data-testid="call-dock-dismiss">
                  Dismiss
                </Button>
              )}
            </div>
          }
        />
      </div>
    );
  }

  if (phase === 'ended') {
    return (
      <div
        className={cn('flex items-center gap-2 border-t border-border bg-surface px-5 py-3 text-sm', className)}
        data-testid={testId}
        data-phase="ended"
      >
        <span className="min-w-0 flex-1 truncate text-text-secondary" data-testid="call-dock-ended">
          <span className="font-semibold text-text-primary">Call ended</span>
          {elapsedMs != null && <> · {formatCallElapsed(elapsedMs)}</>}
          {endedSummary != null && <> · {endedSummary}</>}
        </span>
        {onDismiss && (
          <Button variant="link" onClick={onDismiss} data-testid="call-dock-dismiss" className="text-sm">
            Dismiss
          </Button>
        )}
      </div>
    );
  }

  const calling = phase === 'calling';
  const connecting = phase === 'connecting';
  const reconnecting = phase === 'reconnecting';
  const leave = () => {
    if (!calling && canEndForEveryone && onEndForEveryone) setConfirmLeave(true);
    else onLeave();
  };
  const grid = layout === 'grid';
  const stack = layout === 'stack';
  // `stack`: what the wide bar draws inline, as menu rows (mic, camera and Leave stay on the bar).
  const shareReason = calling ? 'You can share once someone joins' : connecting ? 'Connecting…' : screenShare.disabledReason;
  const stackMenuItems: DropdownMenuItem[] = [
    { label: screenShare.on ? 'Stop sharing' : 'Share your screen', icon: <ScreenShareIcon size={16} />, onSelect: screenShare.onToggle,
      ...(shareReason ? { disabled: true, disabledReason: shareReason } : {}), 'data-testid': 'call-dock-share' },
    { label: `People (${participantCount})`, icon: <UsersIcon size={16} />, onSelect: onOpenPeople, ...(peopleOpen ? { active: true } : {}),
      ...(connecting ? { disabled: true, disabledReason: 'Connecting…' } : {}), 'data-testid': 'call-dock-people' },
    ...(onOpenDocuments ? [{ label: `Documents (${documents.length})`, icon: <DocumentIcon size={16} />, onSelect: onOpenDocuments,
      ...(documentsOpen ? { active: true } : {}), ...(connecting ? { disabled: true, disabledReason: 'Connecting…' } : {}), 'data-testid': 'call-dock-documents' }] : []),
    { label: 'Call settings', icon: <SettingsGearIcon size={16} />, onSelect: onOpenSettings, 'data-testid': 'call-dock-settings' },
    { label: 'Pop out the call', icon: <ExpandIcon size={16} />, onSelect: onPopOut,
      ...(connecting ? { disabled: true, disabledReason: 'Connecting…' } : {}), 'data-testid': 'call-dock-popout' },
  ];

  const tiles = (
    <div className="relative" data-testid="call-dock-tiles">
      {reconnecting && (
        <div
          className="mb-2 inline-flex rounded-full bg-warning-bg px-3 py-1 text-xs font-medium text-warning-fg"
          role="status"
          data-testid="call-dock-reconnecting"
        >
          Reconnecting…
        </div>
      )}
      {connecting ? (
        <div className="flex gap-2" data-testid="call-dock-connecting">
          <div
            className={cn(
              'shrink-0 overflow-hidden rounded-md',
              grid || stack ? 'aspect-video w-full' : TILE_PX[size].box,
            )}
          >
            <SkeletonCard height="100%" rounded="md" />
          </div>
        </div>
      ) : (
        <CallDockTiles
          participants={participants}
          localParticipantId={localParticipantId}
          activeSpeakerId={activeSpeakerId}
          followingUserId={followingUserId}
          reconnecting={reconnecting}
          size={size}
          grid={grid || stack}
          {...(stack ? { maxColumns: 2 } : {})}
          onTileClick={onTileClick ? stableTileClick : undefined}
          title={title}
        />
      )}
    </div>
  );

  if (grid) {
    return (
      <section
        className={cn('flex min-w-0 flex-col gap-2 bg-surface p-3', className)}
        aria-label={`Call: ${title}`}
        data-testid={testId}
        data-phase={phase}
        data-layout="grid"
        data-compact={size === 'sm' ? 'true' : 'false'}
      >
        {tiles}
      </section>
    );
  }

  return (
    <section
      className={cn('@container flex flex-col gap-2.5 border-t border-border bg-surface px-5 pt-3 pb-3.5', className)}
      aria-label={`Call: ${title}`}
      data-testid={testId}
      data-phase={phase}
      data-layout={stack ? 'stack' : 'shelf'}
      data-compact={size === 'sm' || stack ? 'true' : 'false'}
      data-tile-size={stack ? undefined : size}
    >
      {/* The header wraps rather than overlaps: the title block's basis is its
          content (`flex-auto`, not `flex-1`), so when title + meta + controls
          outgrow the dock — a narrow chat column, a caller's `extras` — the
          controls move to their own right-aligned line instead of painting
          over the name and the clock. */}
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2" data-testid={`${testId}-header`}>
        <div className="flex min-w-0 flex-auto items-baseline gap-3">
          <button
            type="button"
            onClick={onTitleClick}
            disabled={!onTitleClick}
            className="max-w-[45cqw] shrink-0 truncate whitespace-nowrap border-none bg-transparent p-0 text-left font-[inherit] text-base font-semibold text-text-primary enabled:cursor-pointer enabled:hover:underline"
            data-testid="call-dock-title"
            title={title}
          >
            {title}
          </button>
          <CallDockMeta phase={phase} callingTo={callingTo} participantCount={participantCount} elapsedMs={elapsedMs} />
          {documents.length > 0 && (
            <span className="hidden min-w-0 flex-1 items-center gap-4 overflow-hidden @min-[1240px]:flex" data-testid="call-dock-documents-chips">
              {documents.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={onDocumentClick ? () => onDocumentClick(d.id) : undefined}
                  className={cn(
                    'inline-flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap border-none bg-transparent p-0 font-[inherit] text-[13px]',
                    d.presenting ? 'text-primary' : 'text-text-primary',
                    onDocumentClick ? 'cursor-pointer hover:underline' : 'cursor-default',
                  )}
                  data-testid={`call-dock-document-${d.id}`}
                  data-presenting={d.presenting ? 'true' : 'false'}
                  title={d.presenting ? `${d.title} · Presenting` : d.title}
                >
                  <DocumentIcon size={16} className="shrink-0" />
                  <span className="truncate">{d.title}</span>
                </button>
              ))}
            </span>
          )}
        </div>

        {/* The controls shrink to the header's width and wrap (right-aligned)
            rather than running past the dock's edge in a narrow column. */}
        <div
          className="ml-auto flex min-w-0 max-w-full flex-wrap items-center justify-end gap-2"
          data-testid={`${testId}-controls`}
        >
          <DeviceToggleSelect kind="microphone" {...mic} data-testid="call-dock-mic" {...(connecting ? { disabledReason: 'Connecting…' } : {})} />
          <DeviceToggleSelect kind="camera" {...camera} data-testid="call-dock-camera" {...(connecting ? { disabledReason: 'Connecting…' } : {})} />
          {!stack && (<>
          <Button
            variant={screenShare.on ? 'danger' : 'ghost'}
            size="sm"
            onClick={screenShare.onToggle}
            disabled={connecting || calling || Boolean(screenShare.disabledReason)}
            title={
              calling
                ? 'You can share once someone joins'
                : (screenShare.disabledReason ?? (screenShare.on ? 'Stop sharing' : 'Share your screen'))
            }
            aria-label={screenShare.on ? 'Stop sharing' : 'Share'}
            aria-pressed={screenShare.on}
            data-testid="call-dock-share"
            className="inline-flex h-8 items-center gap-1.5 bg-surface"
          >
            <ScreenShareIcon size={16} />
            <span className="hidden @min-[860px]:inline">{screenShare.on ? 'Stop sharing' : 'Share'}</span>
          </Button>
          <Button
            variant={peopleOpen ? 'secondary' : 'ghost'}
            size="sm"
            onClick={onOpenPeople}
            disabled={connecting}
            aria-label={`People (${participantCount})`}
            aria-pressed={peopleOpen}
            data-testid="call-dock-people"
            className={cn('inline-flex h-8 items-center gap-1.5', !peopleOpen && 'bg-surface')}
          >
            <UsersIcon size={16} />
            <span className="hidden @min-[860px]:inline">People</span>
            <Badge variant="count" value={participantCount} color="muted" aria-label={`${participantCount} people`} />
          </Button>
          {onOpenDocuments && (
            <Button
              variant={documentsOpen ? 'secondary' : 'ghost'}
              size="sm"
              onClick={onOpenDocuments}
              disabled={connecting}
              aria-label={`Documents (${documents.length})`}
              aria-pressed={documentsOpen}
              data-testid="call-dock-documents"
              className={cn('hidden h-8 items-center gap-1.5 @min-[980px]:inline-flex', !documentsOpen && 'bg-surface')}
            >
              <DocumentIcon size={16} />
              <span className="hidden @min-[860px]:inline">Documents</span>
              <Badge variant="count" value={documents.length} color="muted" aria-label={`${documents.length} documents`} />
            </Button>
          )}
          </>)}
          {extras != null && (
            // `contents`: each host control is its own flex item, so they wrap one by one.
            <div className="contents" data-testid="call-dock-extras">
              {extras}
            </div>
          )}
          {/* Settings, pop-out and Leave never separate: Leave stays last and on screen. */}
          <div className="flex shrink-0 items-center gap-2" data-testid="call-dock-end">
            {stack ? (
              <DropdownMenu
                trigger={<MoreIcon size={16} />}
                triggerLabel="More call controls"
                triggerTitle="More"
                triggerTestId="call-dock-more"
                triggerClassName="h-8 w-8 px-0 py-0"
                align="end"
                sections={[{ items: stackMenuItems }]}
                data-testid="call-dock-more-menu"
              />
            ) : (<>
            <IconButton
              aria-label="Call settings"
              title="Call settings"
              variant="outline"
              onClick={onOpenSettings}
              icon={<SettingsGearIcon size={18} />}
              data-testid="call-dock-settings"
            />
            <IconButton
              aria-label="Pop out the call"
              title="Pop out the call"
              variant="outline"
              onClick={onPopOut}
              disabled={connecting}
              icon={<ExpandIcon size={16} />}
              data-testid="call-dock-popout"
            />
            </>)}
            <Button
              ref={leaveRef}
              variant="danger-solid"
              size="sm"
              onClick={leave}
              aria-haspopup={canEndForEveryone && !calling ? 'dialog' : undefined}
              title={calling ? 'Cancel the call' : undefined}
              data-testid="call-dock-leave"
              className="inline-flex h-8 shrink-0 items-center gap-1.5 px-3.5"
            >
              <PhoneOffIcon size={16} />
              {calling ? 'Cancel' : 'Leave'}
            </Button>
          </div>
          <InlinePopover
            trigger={leaveRef}
            open={confirmLeave}
            onClose={() => setConfirmLeave(false)}
            placement="bottom-end"
            aria-label="Leave the call"
            data-testid="call-dock-leave-confirm"
            className="w-64 p-3"
          >
            <p className="m-0 mb-3 text-sm text-text-primary">Leave the call? Others stay on.</p>
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setConfirmLeave(false);
                  onLeave();
                }}
                data-testid="call-dock-leave-confirm-leave"
              >
                Leave
              </Button>
              <Button
                variant="danger-solid"
                size="sm"
                onClick={() => {
                  setConfirmLeave(false);
                  onEndForEveryone?.();
                }}
                data-testid="call-dock-end-for-everyone"
              >
                End for everyone
              </Button>
            </div>
          </InlinePopover>
        </div>
      </div>

      {tiles}
    </section>
  );
}

export default CallDock;
