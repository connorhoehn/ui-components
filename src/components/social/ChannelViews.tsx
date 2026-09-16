// ChannelViews — the channel seen from angles other than its messages.
//
// A channel is not only a transcript. The files shared in it, the messages
// someone pinned to the top of it, and the times you were named in it are all
// the same conversation, and they belong to the channel rather than to some
// other part of the app you have to go find. These are the panels behind the
// tabs on ChannelHeader.
//
// ## Why three panels share one row
//
// Files, pins and mentions are the same shape: something visual on the left,
// a title, a line of "who and when", and a way back to the message it came
// from. Writing that three times produces three subtly different rows and one
// of them ends up without the jump affordance. The row is defined once here
// and stays private — it is an implementation detail of these three panels,
// not a fourth thing to learn.
//
// ## Why every row jumps
//
// Each of these is a POINTER at a message. A pinned message you cannot get
// back to is a screenshot; a file you cannot see in context is a download
// folder. `onJump` is optional only because the original may genuinely be
// out of reach (deleted, or outside the loaded window), and in that case the
// row renders as a record rather than as a dead button.

import type { ReactNode } from 'react';
import { Avatar } from '../shared/Avatar';
import EmptyState from '../shared/EmptyState';
import { formatBytes, isImageAttachment, type ChatAttachment } from './ChatAttachment';
import { DocumentIcon, PaperclipIcon, PinIcon, VideoCallIcon } from '../ui/Icons';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Shared row
// ---------------------------------------------------------------------------

interface DigestRowProps {
  /** Reflected onto the row so callers can select unread ones. */
  'data-unread'?: boolean;
  /** Left-hand visual: a thumbnail, an avatar, a glyph. */
  leading: ReactNode;
  title: ReactNode;
  meta: string;
  /** Trailing controls — unpin, download. Never the jump: the row is the jump. */
  actions?: ReactNode;
  onJump?: () => void;
  jumpLabel?: string;
  'data-testid'?: string;
}

function DigestRow({
  leading, title, meta, actions, onJump, jumpLabel,
  'data-testid': testId, 'data-unread': unread,
}: DigestRowProps) {
  const body = (
    <>
      <span className="shrink-0">{leading}</span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
        <span className="truncate text-[13px] font-medium text-text-primary">{title}</span>
        <span className="truncate text-[11px] text-text-tertiary">{meta}</span>
      </span>
    </>
  );

  return (
    <li
      data-testid={testId}
      data-unread={unread ? 'true' : undefined}
      className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover"
    >
      {onJump ? (
        <button
          type="button"
          onClick={onJump}
          aria-label={jumpLabel}
          data-testid={testId ? `${testId}-jump` : undefined}
          className="flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left"
        >
          {body}
        </button>
      ) : (
        <span className="flex min-w-0 flex-1 items-center gap-3">{body}</span>
      )}
      {actions && <span className="flex shrink-0 items-center gap-1">{actions}</span>}
    </li>
  );
}

function timeLabel(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return sameDay ? time : `${d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ${time}`;
}

function PanelShell({
  children,
  empty,
  className,
  'data-testid': testId,
}: {
  children: ReactNode;
  empty: boolean;
  emptyNode?: ReactNode;
  className?: string;
  'data-testid'?: string;
}) {
  return (
    <div className={cn('min-h-0 overflow-y-auto p-2', className)} data-testid={testId}>
      {empty ? children : <ul className="m-0 flex list-none flex-col gap-0.5 p-0">{children}</ul>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pinned
// ---------------------------------------------------------------------------

export interface PinnedMessageItem {
  messageId: string;
  /** Who wrote the message. */
  author: string;
  /** Short excerpt of it — the panel never re-reads the transcript. */
  preview: string;
  /** ISO-8601. */
  pinnedAt?: string;
  /** Display name of whoever pinned it. */
  pinnedBy?: string;
}

export interface PinnedMessagesPanelProps {
  pins: readonly PinnedMessageItem[];
  onJump?: (messageId: string) => void;
  /** Omit to render a read-only panel — e.g. for someone who may not unpin. */
  onUnpin?: (messageId: string) => void;
  className?: string;
  'data-testid'?: string;
}

export function PinnedMessagesPanel({
  pins,
  onJump,
  onUnpin,
  className,
  'data-testid': testId = 'pinned-messages-panel',
}: PinnedMessagesPanelProps) {
  return (
    <PanelShell empty={pins.length === 0} className={className} data-testid={testId}>
      {pins.length === 0 ? (
        <EmptyState
          icon={<PinIcon size={40} />}
          title="Nothing pinned yet"
          description="Pin a message to keep it at the top of this channel for everyone."
        />
      ) : (
        pins.map((pin) => (
          <DigestRow
            key={pin.messageId}
            data-testid="pinned-message"
            leading={<Avatar name={pin.author} size={28} />}
            title={pin.preview}
            meta={[pin.author, pin.pinnedBy && `pinned by ${pin.pinnedBy}`, timeLabel(pin.pinnedAt)]
              .filter(Boolean)
              .join(' · ')}
            onJump={onJump ? () => onJump(pin.messageId) : undefined}
            jumpLabel={`Go to the pinned message from ${pin.author}`}
            actions={
              onUnpin && (
                <button
                  type="button"
                  aria-label="Unpin"
                  title="Unpin"
                  data-testid="pinned-message-unpin"
                  onClick={() => onUnpin(pin.messageId)}
                  className="grid h-6 w-6 place-items-center rounded bg-transparent text-xs text-text-tertiary hover:bg-surface-hover hover:text-text-primary"
                >
                  ✕
                </button>
              )
            }
          />
        ))
      )}
    </PanelShell>
  );
}

// ---------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------

export interface ChannelFileItem {
  /** The message the file arrived on — what the row jumps back to. */
  messageId: string;
  attachment: ChatAttachment;
  author: string;
  /** ISO-8601 of the message. */
  sentAt?: string;
}

export interface ChannelFilesPanelProps {
  files: readonly ChannelFileItem[];
  /**
   * Resolves a displayable image source. The download route is authenticated,
   * so `attachment.url` in an <img> would 401 — the integration layer hands
   * back a resolved object URL. Falling back to the inline preview keeps the
   * thumbnail honest while the real bytes are still being fetched.
   */
  // `null` is allowed and means the same as it does on
  // AttachmentBubble.src: it will not resolve. Here the row simply
  // falls back to the file glyph, which is already the honest answer.
  thumbnailSrc?: (a: ChatAttachment) => string | null | undefined;
  onJump?: (messageId: string) => void;
  className?: string;
  'data-testid'?: string;
}

export function ChannelFilesPanel({
  files,
  thumbnailSrc,
  onJump,
  className,
  'data-testid': testId = 'channel-files-panel',
}: ChannelFilesPanelProps) {
  return (
    <PanelShell empty={files.length === 0} className={className} data-testid={testId}>
      {files.length === 0 ? (
        <EmptyState
          icon={<PaperclipIcon size={40} />}
          title="No files here yet"
          description="Drag a file into the conversation and it will show up in this list."
        />
      ) : (
        files.map((file) => {
          const src = thumbnailSrc?.(file.attachment) ?? file.attachment.preview;
          const isImage = isImageAttachment(file.attachment);
          return (
            <DigestRow
              key={`${file.messageId}:${file.attachment.id}`}
              data-testid="channel-file"
              leading={
                isImage && src ? (
                  <img
                    src={src}
                    alt=""
                    className="h-8 w-8 rounded object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary"
                  >
                    <DocumentIcon />
                  </span>
                )
              }
              // Filenames are user content and need not contain a space; the
              // row truncates rather than letting one widen the panel.
              title={file.attachment.name}
              meta={[file.author, formatBytes(file.attachment.size), timeLabel(file.sentAt)]
                .filter(Boolean)
                .join(' · ')}
              onJump={onJump ? () => onJump(file.messageId) : undefined}
              jumpLabel={`Go to the message with ${file.attachment.name}`}
            />
          );
        })
      )}
    </PanelShell>
  );
}

// ---------------------------------------------------------------------------
// Mentions
// ---------------------------------------------------------------------------

/**
 * One time you were named, in a CHANNEL. Named `ChannelMention…` because the
 * library already has a `MentionItem` for the other kind — being named in a
 * document comment — and those two are not interchangeable: one points at a
 * message in a conversation, the other at a comment on a section.
 */
export interface ChannelMentionItem {
  messageId: string;
  /** Channel the mention happened in — the id used to navigate. */
  channel: string;
  /** Human-readable channel name. Falls back to the id when absent. */
  channelLabel?: string;
  author: string;
  /** The message text, trimmed by the caller if it is long. */
  excerpt: string;
  /** ISO-8601. */
  at?: string;
  /** Unread mentions are the ones that still need you. */
  unread?: boolean;
}

export interface ChannelMentionsPanelProps {
  mentions: readonly ChannelMentionItem[];
  /** Jump takes both, because a mention can be in a channel you are not in. */
  onJump?: (channel: string, messageId: string) => void;
  className?: string;
  'data-testid'?: string;
}

export function ChannelMentionsPanel({
  mentions,
  onJump,
  className,
  'data-testid': testId = 'mentions-panel',
}: ChannelMentionsPanelProps) {
  return (
    <PanelShell empty={mentions.length === 0} className={className} data-testid={testId}>
      {mentions.length === 0 ? (
        <EmptyState
          icon="@"
          title="No mentions"
          description="When somebody @-mentions you, it lands here."
        />
      ) : (
        mentions.map((m) => (
          <DigestRow
            key={`${m.channel}:${m.messageId}`}
            // Stable id, state as an attribute. Encoding "unread" in the
            // testid means the row has no selector that survives being read,
            // which is exactly when a test or an e2e script wants to find it.
            data-testid="mention"
            data-unread={m.unread}
            leading={
              <span className="relative">
                <Avatar name={m.author} size={28} />
                {m.unread && (
                  <span
                    aria-label="Unread"
                    className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
                  />
                )}
              </span>
            }
            title={m.excerpt}
            meta={[m.author, m.channelLabel ?? m.channel, timeLabel(m.at)].filter(Boolean).join(' · ')}
            onJump={onJump ? () => onJump(m.channel, m.messageId) : undefined}
            jumpLabel={`Go to the mention from ${m.author}`}
          />
        ))
      )}
    </PanelShell>
  );
}

// ---------------------------------------------------------------------------
// Recordings
// ---------------------------------------------------------------------------

export interface ChannelRecordingItem {
  recordingId: string;
  /** ISO-8601 of when the call started. */
  startedAt?: string;
  /** Length of the recorded media, in milliseconds. */
  durationMs?: number;
  /** Distinct PEOPLE on the call, not sessions — rejoins are not extra heads. */
  participantCount?: number;
  participants?: Array<{ userId: string; displayName?: string }>;
  thumbnailUrl?: string;
  /**
   * Whether the recording can actually be played. A row that opens a player
   * showing nothing is worse than a row that says the recording is still
   * being assembled.
   */
  playable?: boolean;
}

export interface ChannelRecordingsPanelProps {
  recordings: readonly ChannelRecordingItem[];
  onOpen?: (recordingId: string) => void;
  className?: string;
  'data-testid'?: string;
}

/** "12:04" / "1:02:11" — a duration people read, not a millisecond count. */
export function formatDuration(ms?: number): string {
  if (!ms || ms < 0) return '';
  const total = Math.round(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
}

/** Names, never raw ids: "dev-e2e-bob-uo0cpk" is not a person. */
function describeParticipants(r: ChannelRecordingItem): string {
  const named = (r.participants ?? []).map((p) => p.displayName).filter(Boolean) as string[];
  if (named.length > 0) {
    return named.length <= 3 ? named.join(', ') : `${named.slice(0, 2).join(', ')} and ${named.length - 2} others`;
  }
  const n = r.participantCount ?? 0;
  return n > 0 ? `${n} ${n === 1 ? 'person' : 'people'}` : '';
}

export function ChannelRecordingsPanel({
  recordings,
  onOpen,
  className,
  'data-testid': testId = 'channel-recordings-panel',
}: ChannelRecordingsPanelProps) {
  return (
    <PanelShell empty={recordings.length === 0} className={className} data-testid={testId}>
      {recordings.length === 0 ? (
        <EmptyState
          icon={<VideoCallIcon size={40} />}
          title="No recorded calls"
          description="Calls recorded in this conversation show up here."
        />
      ) : (
        recordings.map((r) => {
          const notReady = r.playable === false;
          return (
            <DigestRow
              key={r.recordingId}
              data-testid="channel-recording"
              leading={
                r.thumbnailUrl ? (
                  <img src={r.thumbnailUrl} alt="" className="h-8 w-12 rounded object-cover" />
                ) : (
                  <span aria-hidden className="grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary">
                    <VideoCallIcon />
                  </span>
                )
              }
              title={[timeLabel(r.startedAt), formatDuration(r.durationMs)].filter(Boolean).join(' · ') || 'Recording'}
              meta={
                notReady
                  ? 'Still being assembled'
                  : describeParticipants(r)
              }
              // A row that opens a player showing nothing is worse than one
              // that says so and stays put.
              onJump={onOpen && !notReady ? () => onOpen(r.recordingId) : undefined}
              jumpLabel="Play this recording"
            />
          );
        })
      )}
    </PanelShell>
  );
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

export interface ChannelDocumentItem {
  documentId: string;
  title: string;
  /** Emoji or short glyph from the document's type. */
  icon?: string;
  /** Display name of whoever created it. */
  createdBy?: string;
  /** ISO-8601 of the last edit — what people scan this list by. */
  updatedAt?: string;
  /** People with the document open right now. */
  activeEditors?: number;
}

export interface ChannelDocumentsPanelProps {
  documents: readonly ChannelDocumentItem[];
  onOpen?: (documentId: string) => void;
  /** Omit for a viewer who may not create documents here. */
  onCreate?: () => void;
  className?: string;
  'data-testid'?: string;
}

export function ChannelDocumentsPanel({
  documents,
  onOpen,
  onCreate,
  className,
  'data-testid': testId = 'channel-documents-panel',
}: ChannelDocumentsPanelProps) {
  const create = onCreate && (
    <button
      type="button"
      onClick={onCreate}
      data-testid="channel-documents-create"
      className="mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover"
    >
      <span aria-hidden className="grid h-7 w-7 place-items-center rounded bg-surface-inset">+</span>
      New document in this conversation
    </button>
  );

  // The create affordance sits ABOVE the list in both states. Hiding it behind
  // an empty state means it disappears the moment the list stops being empty —
  // exactly when a second document becomes likely.
  return (
    <div className={cn('min-h-0 overflow-y-auto p-2', className)} data-testid={testId}>
      {create}
      {documents.length === 0 ? (
        <EmptyState
          icon={<DocumentIcon size={40} />}
          title="No documents yet"
          description="Documents written in this conversation stay with it."
        />
      ) : (
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
          {documents.map((d) => (
            <DigestRow
              key={d.documentId}
              data-testid="channel-document"
              leading={
                <span aria-hidden className="grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary">
                  {d.icon || <DocumentIcon />}
                </span>
              }
              title={d.title || 'Untitled'}
              meta={[
                d.createdBy,
                timeLabel(d.updatedAt),
                // Presence is the reason to open it NOW rather than later.
                d.activeEditors ? `${d.activeEditors} editing` : '',
              ]
                .filter(Boolean)
                .join(' \u00b7 ')}
              onJump={onOpen ? () => onOpen(d.documentId) : undefined}
              jumpLabel={`Open ${d.title || 'this document'}`}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
