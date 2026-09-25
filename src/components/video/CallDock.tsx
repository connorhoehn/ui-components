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
// Phases: connecting (one skeleton tile, only Leave enabled), active,
// reconnecting (veiled tiles, a warning meta), ended (a one-line summary with
// Dismiss), error (a danger banner with Rejoin and Dismiss).

import { useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Badge } from '../shared/Badge';
import Banner from '../shared/Banner';
import { InlinePopover } from '../shared/InlinePopover';
import SkeletonCard from '../shared/SkeletonCard';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { DocumentIcon } from '../ui/Icons';
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

export type CallDockPhase = 'connecting' | 'active' | 'reconnecting' | 'ended' | 'error';

export interface CallDockProps {
  title: string;
  participantCount: number;
  /** Elapsed call time; null before the call has a start time. */
  elapsedMs: number | null;
  phase: CallDockPhase;
  documents: { id: string; title: string; presenting?: boolean }[];
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
  onOpenDocuments: () => void;
  peopleOpen?: boolean;
  documentsOpen?: boolean;
  onOpenSettings: () => void;
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
  className?: string;
  'data-testid'?: string;
}

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

export function CallDock({
  title,
  participantCount,
  elapsedMs,
  phase,
  documents,
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
  className,
  'data-testid': testId = 'call-dock',
}: CallDockProps) {
  const leaveRef = useRef<HTMLButtonElement | null>(null);
  const [confirmLeave, setConfirmLeave] = useState(false);

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

  const connecting = phase === 'connecting';
  const reconnecting = phase === 'reconnecting';
  const local = participants.find((p) => p.userId === localParticipantId) ?? null;
  const remotes = participants.filter((p) => p.userId !== localParticipantId);
  const toTile = (p: CallDockParticipant, isLocal: boolean): CallTileParticipant => ({
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
  });

  let meta: ReactNode;
  if (connecting) meta = 'Connecting…';
  else if (reconnecting) meta = <span className="text-warning-fg">Reconnecting…</span>;
  else meta = `${peopleLabel(participantCount)}${elapsedMs != null ? ` · ${formatCallElapsed(elapsedMs)}` : ''}`;

  const tileWidth = compact ? 132 : 176;
  const tileHeight = compact ? 74 : 88;
  const leave = () => {
    if (canEndForEveryone && onEndForEveryone) setConfirmLeave(true);
    else onLeave();
  };

  return (
    <section
      className={cn('@container flex flex-col gap-2.5 border-t border-border bg-surface px-5 pt-3 pb-3.5', className)}
      aria-label={`Call: ${title}`}
      data-testid={testId}
      data-phase={phase}
      data-compact={compact ? 'true' : 'false'}
    >
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex min-w-0 flex-1 items-baseline gap-3">
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
          <span className="shrink-0 whitespace-nowrap text-sm tabular-nums text-text-tertiary" data-testid="call-dock-meta">
            {meta}
          </span>
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

        <div className="flex shrink-0 items-center gap-2">
          <DeviceToggleSelect kind="microphone" {...mic} data-testid="call-dock-mic" {...(connecting ? { disabledReason: 'Connecting…' } : {})} />
          <DeviceToggleSelect kind="camera" {...camera} data-testid="call-dock-camera" {...(connecting ? { disabledReason: 'Connecting…' } : {})} />
          <Button
            variant={screenShare.on ? 'danger' : 'ghost'}
            size="sm"
            onClick={screenShare.onToggle}
            disabled={connecting || Boolean(screenShare.disabledReason)}
            title={screenShare.disabledReason ?? (screenShare.on ? 'Stop sharing' : 'Share your screen')}
            aria-label={screenShare.on ? 'Stop sharing' : 'Share'}
            aria-pressed={screenShare.on}
            data-testid="call-dock-share"
            className="inline-flex h-8 items-center gap-1.5 bg-surface font-medium"
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
            className={cn('inline-flex h-8 items-center gap-1.5 font-medium', !peopleOpen && 'bg-surface')}
          >
            <UsersIcon size={16} />
            <span className="hidden @min-[860px]:inline">People</span>
            <Badge variant="count" value={participantCount} color="muted" aria-label={`${participantCount} people`} />
          </Button>
          <Button
            variant={documentsOpen ? 'secondary' : 'ghost'}
            size="sm"
            onClick={onOpenDocuments}
            disabled={connecting}
            aria-label={`Documents (${documents.length})`}
            aria-pressed={documentsOpen}
            data-testid="call-dock-documents"
            className={cn('hidden h-8 items-center gap-1.5 font-medium @min-[980px]:inline-flex', !documentsOpen && 'bg-surface')}
          >
            <DocumentIcon size={16} />
            <span className="hidden @min-[860px]:inline">Documents</span>
            <Badge variant="count" value={documents.length} color="muted" aria-label={`${documents.length} documents`} />
          </Button>
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
          <Button
            ref={leaveRef}
            variant="danger-solid"
            size="sm"
            onClick={leave}
            aria-haspopup={canEndForEveryone ? 'dialog' : undefined}
            data-testid="call-dock-leave"
            className="inline-flex h-8 items-center gap-1.5 px-3.5 font-medium"
          >
            <PhoneOffIcon size={16} />
            Leave
          </Button>
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
            <div className={cn('shrink-0 overflow-hidden rounded-md', compact ? 'h-[74px] w-[132px]' : 'h-[88px] w-[176px]')}>
              <SkeletonCard height="100%" rounded="md" />
            </div>
          </div>
        ) : (
          <CallTileRow
            variant="dock"
            participants={remotes.map((p) => toTile(p, false))}
            localParticipant={local ? toTile(local, true) : null}
            activeSpeakerId={activeSpeakerId}
            highlightedId={followingUserId}
            tileWidth={tileWidth}
            tileHeight={tileHeight}
            overflow="collapse"
            maxVisible={compact ? 5 : 6}
            {...(onTileClick ? { onParticipantClick: onTileClick } : {})}
            title={title}
            data-testid="call-dock-tile-row"
          />
        )}
      </div>
    </section>
  );
}

export default CallDock;
