// RecordingActivityCard — a call's recording, as a card in the thread.
//
// The way Teams does it: the recording is an artifact in the conversation,
// beside the "call ended" line, with a thumbnail, its length, who it is by,
// and a ⋯ menu — not a link in a sentence. Ended calls already get a
// CallActivityCard; this is the recording that call produced, posted when
// the media is ready to watch.

import { DropdownMenu, type DropdownMenuSection } from '../shared/DropdownMenu';
import { formatCallDuration } from './CallActivityCard';
import { cn } from '../../lib/cn';

export type RecordingActivityStatus = 'ready' | 'processing' | 'failed';

export interface RecordingActivityCardProps {
  recordingId: string;
  /** "Recording" unless the host names it — "Design review recording", say. */
  title?: string;
  /** Who the recording is by — the person who started the call. */
  recordedBy?: string;
  /** ISO. When it was recorded; the meta line. */
  startedAt?: string;
  durationMs?: number;
  thumbnailUrl?: string;
  participantCount?: number;
  /** 'processing' shows a notice instead of a play affordance; 'failed' says so. */
  status?: RecordingActivityStatus;
  /** ISO. When the recording will be removed — the notice under the card. */
  expiresAt?: string;
  /** Opens the recording. Absent, the card is a record, not a button. */
  onOpen?: (recordingId: string) => void;
  onCopyLink?: (recordingId: string) => void;
  onDownload?: (recordingId: string) => void;
  className?: string;
  'data-testid'?: string;
}

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

export function RecordingActivityCard({
  recordingId,
  title = 'Recording',
  recordedBy,
  startedAt,
  durationMs,
  thumbnailUrl,
  participantCount,
  status = 'ready',
  expiresAt,
  onOpen,
  onCopyLink,
  onDownload,
  className,
  'data-testid': testId = 'recording-activity-card',
}: RecordingActivityCardProps) {
  const playable = status === 'ready' && !!onOpen;
  const open = () => onOpen?.(recordingId);
  const duration = durationMs != null ? formatCallDuration(durationMs) : '';
  const when = formatWhen(startedAt);
  const meta = [
    when,
    participantCount != null && participantCount > 0
      ? `${participantCount} ${participantCount === 1 ? 'person' : 'people'}`
      : '',
  ].filter(Boolean).join(' · ');

  const menuItems = [
    ...(onOpen && status === 'ready' ? [{ id: 'open', label: 'Open', onSelect: open }] : []),
    ...(onCopyLink ? [{ id: 'copy-link', label: 'Copy link', onSelect: () => onCopyLink(recordingId) }] : []),
    ...(onDownload && status === 'ready' ? [{ id: 'download', label: 'Download', onSelect: () => onDownload(recordingId) }] : []),
  ];
  const sections: DropdownMenuSection[] = menuItems.length ? [{ items: menuItems, 'data-testid': `${testId}-menu-items` }] : [];

  const notice =
    status === 'processing'
      ? 'Still processing — it will be ready to watch shortly.'
      : status === 'failed'
        ? 'This recording could not be processed.'
        : expiresAt
          ? `This recording expires on ${formatDate(expiresAt)}.`
          : null;

  return (
    <div
      data-testid={testId}
      data-recording-id={recordingId}
      data-status={status}
      className={cn(
        'max-w-md overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm',
        className,
      )}
    >
      <div className="flex items-stretch">
        {/* The picture: 16:9, black behind it, the length in the corner. A
            button when it can play — the whole picture, not a tiny icon. */}
        <button
          type="button"
          onClick={playable ? open : undefined}
          disabled={!playable}
          aria-label={playable ? `Play ${title.toLowerCase()}` : title}
          data-testid={`${testId}-thumb`}
          className={cn(
            'relative aspect-video w-44 shrink-0 overflow-hidden bg-black text-left',
            playable ? 'cursor-pointer' : 'cursor-default',
          )}
        >
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-white/30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          )}
          {playable && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/25">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          )}
          {duration && (
            <span
              className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white"
              data-testid={`${testId}-duration`}
            >
              {duration}
            </span>
          )}
        </button>

        <div className="flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold text-text-primary" data-testid={`${testId}-title`}>
              {title}
            </div>
            {recordedBy && (
              <div className="truncate text-sm text-text-secondary" data-testid={`${testId}-by`}>
                {recordedBy}
              </div>
            )}
            {meta && <div className="mt-1 truncate text-xs text-text-tertiary">{meta}</div>}
          </div>
          {sections.length > 0 && (
            <DropdownMenu
              trigger={<span className="tracking-wide">⋯</span>}
              triggerLabel="Recording actions"
              triggerTitle="More"
              triggerClassName="h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover"
              align="end"
              sections={sections}
              data-testid={`${testId}-menu`}
            />
          )}
        </div>
      </div>
      {notice && (
        <div
          className={cn(
            'border-t px-3 py-2 text-xs',
            status === 'failed'
              ? 'border-danger-border bg-danger-bg text-danger-fg'
              : 'border-warning-border bg-warning-bg text-warning-fg',
          )}
          data-testid={`${testId}-notice`}
        >
          {notice}
        </div>
      )}
    </div>
  );
}

export default RecordingActivityCard;
