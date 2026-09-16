// RecordingActivityCard — a call's recording, as a card in the thread.
//
// The Teams journey: the recording stops, a chiclet lands in the chat while
// the media is still being saved, and it grows into the artifact — a real
// thumbnail, its length, who was there, whether the transcript and summary
// exist yet, when it expires, and a ⋯ menu for open / link / share / pin /
// download. This is that chiclet, built from the library's own pieces:
// Avatar tiles stand in for the thumbnail until there is one, PresenceAvatars
// say who was in the call, StatusPill says where the pipeline is.

import Avatar from '../shared/Avatar';
import { PresenceAvatars } from '../shared/PresenceAvatars';
import StatusPill, { type StatusPillState } from '../shared/StatusPill';
import { DropdownMenu, type DropdownMenuItem, type DropdownMenuSection } from '../shared/DropdownMenu';
import { Button } from '../ui/Button';
import { formatCallDuration } from './CallActivityCard';
import { cn } from '../../lib/cn';

/** Where the recording is on its way to being watchable. */
/** `gone`: the recording no longer exists — expired or removed — so the card is the record of a thing that was. */
export type RecordingStage = 'saving' | 'transcribing' | 'summarizing' | 'ready' | 'failed' | 'gone';

export interface RecordingParticipant {
  id: string;
  name: string;
  avatarUrl?: string;
  color?: string;
}

export interface RecordingActivityCardProps {
  recordingId: string;
  /** "Recording" unless the host names it — "Design review", say. */
  title?: string;
  /** Who the recording is by — the person who started the call. */
  recordedBy?: string;
  /** Who was in the call. Real people: names and avatars, not counts. */
  participants?: readonly RecordingParticipant[];
  /** When the list is a sample: the true headcount. */
  participantCount?: number;
  /** ISO. When it was recorded. */
  startedAt?: string;
  durationMs?: number;
  /** The recording's own thumbnail. Absent, the participants stand in as tiles. */
  thumbnailUrl?: string;
  stage?: RecordingStage;
  transcriptReady?: boolean;
  summaryReady?: boolean;
  /** ISO. The "Set to expire" line. */
  expiresAt?: string;
  /** Pinned in the conversation. */
  pinned?: boolean;
  /** Opens the recording (its page or player). Absent, the card is a record, not a button. */
  onOpen?: (recordingId: string) => void;
  onCopyLink?: (recordingId: string) => void;
  /** Mints a share link (who it works for is the host's business). */
  onShare?: (recordingId: string) => void;
  onTogglePin?: (recordingId: string) => void;
  onDownload?: (recordingId: string) => void;
  onOpenTranscript?: (recordingId: string) => void;
  /** "View or change" on the expiry line. */
  onManageExpiry?: (recordingId: string) => void;
  onParticipantClick?: (participantId: string) => void;
  className?: string;
  'data-testid'?: string;
}

const STAGE: Record<RecordingStage, { state: StatusPillState; label: string }> = {
  saving: { state: 'pending', label: 'Saving recording' },
  transcribing: { state: 'pending', label: 'Transcribing' },
  summarizing: { state: 'pending', label: 'Summarizing' },
  ready: { state: 'success', label: 'Ready to watch' },
  failed: { state: 'error', label: 'Could not be processed' },
  gone: { state: 'neutral', label: 'No longer available' },
};

function formatWhen(iso: string | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

/** "Mia Zhao and 2 others" — the sentence beside the avatar row. */
export function describeRecordingParticipants(participants: readonly RecordingParticipant[], total: number): string {
  if (total <= 0) return '';
  const [first] = participants;
  if (!first) return `${total} ${total === 1 ? 'person' : 'people'}`;
  const rest = total - 1;
  if (rest <= 0) return first.name;
  return `${first.name} and ${rest} ${rest === 1 ? 'other' : 'others'}`;
}

/** The participants as a tile grid — what stands where the thumbnail will be. */
function ParticipantTiles({ participants, total, testId }: { participants: readonly RecordingParticipant[]; total: number; testId: string }) {
  const shown = participants.slice(0, total > 4 ? 3 : 4);
  const more = total - shown.length;
  const cols = shown.length + (more > 0 ? 1 : 0) <= 1 ? 'grid-cols-1' : 'grid-cols-2';
  return (
    <div className={cn('grid h-full w-full gap-0.5 bg-black p-0.5', cols)} data-testid={`${testId}-tiles`}>
      {shown.map((p) => (
        <div key={p.id} className="flex items-center justify-center bg-neutral-800" data-testid={`${testId}-tile`}>
          <Avatar name={p.name} src={p.avatarUrl} color={p.color} size={shown.length <= 1 ? 48 : 32} />
        </div>
      ))}
      {more > 0 && (
        <div className="flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80" data-testid={`${testId}-tile-more`}>
          +{more}
        </div>
      )}
      {shown.length === 0 && more <= 0 && (
        <div className="flex items-center justify-center text-white/30">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
        </div>
      )}
    </div>
  );
}

export function RecordingActivityCard({
  recordingId,
  title = 'Recording',
  recordedBy,
  participants = [],
  participantCount,
  startedAt,
  durationMs,
  thumbnailUrl,
  stage = 'ready',
  transcriptReady = false,
  summaryReady = false,
  expiresAt,
  pinned = false,
  onOpen,
  onCopyLink,
  onShare,
  onTogglePin,
  onDownload,
  onOpenTranscript,
  onManageExpiry,
  onParticipantClick,
  className,
  'data-testid': testId = 'recording-activity-card',
}: RecordingActivityCardProps) {
  const total = participantCount ?? participants.length;
  const gone = stage === 'gone';
  const playable = stage !== 'saving' && stage !== 'failed' && !gone && !!onOpen;
  const open = () => { onOpen?.(recordingId); };
  const duration = durationMs != null && durationMs > 0 ? formatCallDuration(durationMs) : '';
  const when = formatWhen(startedAt);
  const people = describeRecordingParticipants(participants, total);
  const { state, label } = STAGE[stage];

  const items: DropdownMenuItem[] = [
    ...(onOpen && playable ? [{ 'data-testid': `${testId}-menu-open`, label: 'Open', onSelect: open }] : []),
    ...(onOpenTranscript && transcriptReady ? [{ 'data-testid': `${testId}-menu-transcript`, label: 'Transcript', onSelect: () => onOpenTranscript(recordingId) }] : []),
    ...(onCopyLink && !gone ? [{ 'data-testid': `${testId}-menu-copy-link`, label: 'Copy link', onSelect: () => onCopyLink(recordingId) }] : []),
    ...(onShare && !gone ? [{ 'data-testid': `${testId}-menu-share`, label: 'Share…', description: 'A link that works outside this conversation', onSelect: () => onShare(recordingId) }] : []),
    ...(onTogglePin && !gone ? [{ 'data-testid': `${testId}-menu-pin`, label: pinned ? 'Unpin' : 'Pin', onSelect: () => onTogglePin(recordingId) }] : []),
    ...(onDownload && playable ? [{ 'data-testid': `${testId}-menu-download`, label: 'Download', onSelect: () => onDownload(recordingId) }] : []),
  ];
  const sections: DropdownMenuSection[] = items.length ? [{ items, 'data-testid': `${testId}-menu-items` }] : [];

  return (
    <div
      data-testid={testId}
      data-recording-id={recordingId}
      data-stage={stage}
      className={cn('max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm', className)}
    >
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={playable ? open : undefined}
          disabled={!playable}
          aria-label={playable ? `Play ${title.toLowerCase()}` : `${title}: ${label.toLowerCase()}`}
          data-testid={`${testId}-thumb`}
          className={cn('relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left', playable ? 'cursor-pointer' : 'cursor-default')}
        >
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="" loading="lazy" className="h-full w-full object-cover" data-testid={`${testId}-thumbnail`} />
          ) : (
            <ParticipantTiles participants={participants} total={total} testId={testId} />
          )}
          {playable && (
            <span className="absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              </span>
            </span>
          )}
          {duration && (
            <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white" data-testid={`${testId}-duration`}>
              {duration}
            </span>
          )}
        </button>

        <div className="flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-[15px] font-semibold text-text-primary" data-testid={`${testId}-title`}>{title}</span>
              {pinned && <span className="text-xs text-text-tertiary" data-testid={`${testId}-pinned`} title="Pinned">📌</span>}
            </div>
            {recordedBy && (
              <div className="truncate text-sm text-text-secondary" data-testid={`${testId}-by`}>by {recordedBy}</div>
            )}
            {total > 0 && (
              <div className="flex items-center gap-2" data-testid={`${testId}-people`}>
                <PresenceAvatars
                  users={participants.map((p) => ({ id: p.id, name: p.name, avatarUrl: p.avatarUrl, color: p.color }))}
                  size={20}
                  maxVisible={4}
                  onUserClick={onParticipantClick}
                />
                <span className="truncate text-xs text-text-tertiary">{people}</span>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-1.5">
              <StatusPill state={state} label={label} size="sm" data-testid={`${testId}-stage`} />
              {stage === 'ready' && transcriptReady && <StatusPill state="neutral" label="Transcript" size="sm" data-testid={`${testId}-transcript`} />}
              {stage === 'ready' && summaryReady && <StatusPill state="neutral" label="Summary" size="sm" data-testid={`${testId}-summary`} />}
              {when && <span className="text-xs text-text-tertiary" data-testid={`${testId}-when`}>{when}</span>}
            </div>
          </div>
          {sections.length > 0 && (
            <DropdownMenu
              trigger={<span className="tracking-wide">⋯</span>}
              triggerLabel="More options"
              triggerTitle="More options"
              triggerClassName="h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover"
              align="end"
              sections={sections}
              data-testid={`${testId}-menu`}
            />
          )}
        </div>
      </div>
      {expiresAt && stage !== 'failed' && !gone && (
        <div className="flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg" data-testid={`${testId}-expiry`}>
          <span>Set to expire {formatDate(expiresAt)}</span>
          {onManageExpiry && (
            <Button variant="ghost" size="sm" onClick={() => onManageExpiry(recordingId)} data-testid={`${testId}-manage-expiry`}>
              View or change
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default RecordingActivityCard;
