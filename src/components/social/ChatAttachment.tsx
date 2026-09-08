// ChatAttachment — how a file appears inside a conversation, in both of the
// states a file actually has: still arriving, and arrived.
//
// TWO COMPONENTS BECAUSE THERE ARE TWO STATES, AND THE FIRST ONE IS THE POINT
// ---------------------------------------------------------------------------
// `AttachmentBubble` renders a finished attachment. `TransferBubble` renders
// one that is still transferring — including one being sent by SOMEBODY ELSE.
// That second case is the whole reason this file exists. Without it, a file
// someone drags into the room is invisible until it has fully arrived and then
// materialises out of nowhere; with it, everyone watches it land.
//
// OVERFLOW CONTAINMENT IS NOT OPTIONAL HERE
// -----------------------------------------
// Filenames are user content and are not required to contain a space. A
// 400-character unbroken token once rendered 3144px wide in this app and took
// the whole thread sideways with it. Every text node below is `min-w-0` +
// `break-all`/`truncate`, and every image is `max-w-full`. A file card can be
// ugly; it cannot be allowed to resize the conversation.
//
// COLOURS COME FROM TOKENS, ALWAYS
// --------------------------------
// Nothing here branches on a colour-scheme hook. The app does not mount this
// library's ColorSchemeProvider, so `useColorScheme()` in a library component
// answers 'light' forever and a dark-mode branch would simply never run.
// Painting from CSS custom properties means the `[data-theme="dark"]` block in
// styles.css does the work, and the component is correct in both themes by
// construction rather than by branching.

import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types — the cross-repo attachment contract
// ---------------------------------------------------------------------------

export interface ChatAttachment {
  /** Correlation id shared with the sender's in-flight transfer. */
  id: string;
  /** Original filename. User content — never used as a path, never trusted. */
  name: string;
  /** Byte length of the stored object. */
  size: number;
  /** Declared MIME type. Advisory: used to pick a layout, never to trust. */
  contentType: string;
  /**
   * Authenticated download URL. Because the download route requires a bearer
   * token, an `<img src>` pointed straight at this will 401 — a resolved
   * object URL should be handed in as `src` by the integration layer.
   */
  url: string;
  /** Intrinsic dimensions when known, so the row reserves space before load. */
  width?: number;
  height?: number;
  /**
   * Tiny inline data-URI placeholder captured by the sender before upload.
   * Lets a recipient see what the image IS while the bytes are still moving.
   */
  preview?: string;
}

export function isImageAttachment(a: { contentType?: string }): boolean {
  return typeof a.contentType === 'string' && a.contentType.startsWith('image/');
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ---------------------------------------------------------------------------
// AttachmentBubble — a landed attachment
// ---------------------------------------------------------------------------

export interface AttachmentBubbleProps {
  attachment: ChatAttachment;
  /**
   * Resolved, directly-renderable source for an image (typically an object
   * URL produced by an authenticated fetch). Falls back to `attachment.preview`
   * so the recipient sees the placeholder rather than a broken image while
   * the full-size fetch is in flight.
   *
   * `undefined` means "not resolved yet"; **`null` means it will not resolve**
   * — the fetch failed, the row is gone, the viewer is not permitted. The two
   * cannot be collapsed: with only `undefined` to work with, a picture that
   * can never arrive says "Loading image…" for as long as the thread stays
   * open, which is a promise the component has no way to keep.
   */
  src?: string | null;
  /** Invoked when the viewer activates the attachment (open / download). */
  onOpen?: (attachment: ChatAttachment) => void;
  className?: string;
}

export function AttachmentBubble({ attachment, src, onOpen, className }: AttachmentBubbleProps) {
  const image = isImageAttachment(attachment);
  const shown = src ?? attachment.preview;

  if (image) {
    return (
      <div
        data-testid="attachment-bubble"
        data-attachment-kind="image"
        className={cn('mt-1 min-w-0 max-w-full', className)}
      >
        <button
          type="button"
          onClick={onOpen ? () => onOpen(attachment) : undefined}
          aria-label={`Open image ${attachment.name}`}
          className={cn(
            'block max-w-full overflow-hidden rounded-lg border text-left',
            'border-[var(--color-border)] bg-[var(--color-surface-inset)]',
            onOpen ? 'cursor-zoom-in' : 'cursor-default',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          )}
        >
          {shown ? (
            <img
              src={shown}
              alt={attachment.name}
              width={attachment.width}
              height={attachment.height}
              data-testid="attachment-bubble-image"
              // max-w-full is what keeps a 4000px-wide photo from widening
              // the thread; max-h caps a tall portrait so one image cannot
              // occupy the entire scrollback.
              className={cn(
                'block h-auto max-h-[320px] w-auto max-w-full object-contain',
                // The placeholder is a handful of pixels scaled up — blur it
                // so it reads as "loading", not as "we sent you a bad image".
                !src && 'blur-[6px]',
              )}
            />
          ) : src === null ? (
            // Not a loading state. The name and size below still identify the
            // file, and the row stays clickable — the picture is unavailable,
            // the attachment is not.
            <div
              data-testid="attachment-bubble-unavailable"
              className="flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]"
            >
              Preview unavailable
            </div>
          ) : (
            <div className="flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]">
              Loading image…
            </div>
          )}
        </button>
        <div className="mt-0.5 flex min-w-0 items-baseline gap-2">
          <span className="min-w-0 truncate text-xs text-[var(--color-text-tertiary)]">
            {attachment.name}
          </span>
          <span className="shrink-0 text-xs text-[var(--color-text-tertiary)]">
            {formatBytes(attachment.size)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="attachment-bubble"
      data-attachment-kind="file"
      className={cn('mt-1 min-w-0 max-w-full', className)}
    >
      <button
        type="button"
        onClick={onOpen ? () => onOpen(attachment) : undefined}
        aria-label={`Download ${attachment.name}`}
        className={cn(
          'flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left',
          'border-[var(--color-border)] bg-[var(--color-surface-inset)]',
          'hover:bg-[var(--color-surface-hover)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        )}
      >
        <FileGlyph />
        <span className="flex min-w-0 flex-col">
          {/* break-all, not truncate: a recipient needs to be able to read the
              whole filename to decide whether to open it. Wrapping is safe
              because the parent is min-w-0. */}
          <span className="min-w-0 break-all text-sm text-[var(--color-text-primary)]">
            {attachment.name}
          </span>
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {formatBytes(attachment.size)}
          </span>
        </span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TransferBubble — an attachment that has not arrived yet
// ---------------------------------------------------------------------------

export type TransferPhase =
  | 'started'
  | 'transferring'
  | 'verifying'
  | 'complete'
  | 'failed'
  | 'cancelled';

export interface ChatTransfer {
  transferId: string;
  /**
   * Who is sending, for DISPLAY ONLY. A human-facing name is not an identity:
   * two people can be called "Alex", and one person can rename themselves
   * mid-transfer. Never decide ownership from this field — use `uploader`.
   */
  actor: string;
  /**
   * Authed user id of the sender — the reliable identity for "is this mine".
   * Mirrors realtime-modules' `ChannelTransfer.uploader`. Optional because
   * hosts on older transports may not carry it; when it is absent the panel
   * falls back to the display-name comparison, which is the pre-existing
   * (wrong, but no worse than before) behaviour.
   */
  uploader?: string;
  name: string;
  size: number;
  transferred: number;
  phase: TransferPhase;
  contentType?: string;
  preview?: string;
  error?: string;
}

/**
 * Decides whether an in-flight transfer belongs to the viewer.
 *
 * Identity first, name never. The old test was `transfer.actor ===
 * currentActor` — a comparison of two DISPLAY NAMES — which handed each of two
 * participants called "Alex" a cancel button on the other's upload, and moved
 * ownership of a live transfer the moment somebody renamed themselves. When
 * both sides carry an authed id we compare ids and STOP: we deliberately do
 * not fall back to names on an id mismatch, because a fallback would
 * reintroduce exactly the collision the id exists to rule out.
 *
 * The name comparison survives only for transfers that carry no id at all,
 * where it is the only signal available. A transfer that DOES carry an
 * `uploader` and a viewer who cannot be identified by id is answered "not
 * mine" — the cancel button is withheld rather than offered to a guess.
 */
export function isOwnTransfer(
  transfer: Pick<ChatTransfer, 'actor' | 'uploader'>,
  currentUserId?: string,
  currentActor?: string,
): boolean {
  if (transfer.uploader) return !!currentUserId && transfer.uploader === currentUserId;
  return !!currentActor && transfer.actor === currentActor;
}

export interface TransferBubbleProps {
  transfer: ChatTransfer;
  /**
   * True when the viewer is the sender. Only the sender gets a cancel
   * affordance — a recipient cancelling someone else's upload is not a
   * feature, and offering the button implies a permission that does not exist.
   */
  mine?: boolean;
  onCancel?: (transferId: string) => void;
  className?: string;
}

export function TransferBubble({ transfer, mine = false, onCancel, className }: TransferBubbleProps) {
  const { size, transferred, phase } = transfer;
  const pct = size > 0 ? Math.min(100, Math.round((transferred / size) * 100)) : 0;
  const failed = phase === 'failed' || phase === 'cancelled';
  const label =
    phase === 'failed'
      ? (transfer.error ?? 'Upload failed')
      : phase === 'cancelled'
        ? 'Cancelled'
        : phase === 'verifying'
          ? 'Verifying…'
          : size > 0
            ? `${pct}%`
            : formatBytes(transferred);

  return (
    <div
      data-testid="transfer-bubble"
      data-transfer-phase={phase}
      data-transfer-pct={pct}
      className={cn(
        'mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2',
        'border-[var(--color-border)] bg-[var(--color-surface-inset)]',
        className,
      )}
    >
      {transfer.preview ? (
        <img
          src={transfer.preview}
          alt=""
          aria-hidden="true"
          data-testid="transfer-bubble-preview"
          // The sender's downscaled placeholder. Blurred because it genuinely
          // is a few pixels — showing it sharp would look like a rendering bug.
          className="h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
        />
      ) : (
        <FileGlyph />
      )}

      <div className="flex min-w-0 grow flex-col gap-1">
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="min-w-0 truncate text-sm text-[var(--color-text-primary)]">
            {transfer.name}
          </span>
          <span
            data-testid="transfer-bubble-status"
            className={cn(
              'shrink-0 text-xs tabular-nums',
              failed ? 'text-[var(--color-danger,#dc2626)]' : 'text-[var(--color-text-tertiary)]',
            )}
          >
            {label}
          </span>
        </div>

        {/* Attribution matters on the recipient side: "a file is arriving" is
            far less useful than "Ada is sending you a file". */}
        <span className="min-w-0 truncate text-xs text-[var(--color-text-tertiary)]">
          {mine ? 'Sending…' : `${transfer.actor} is sending…`}
        </span>

        {!failed && (
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label={`${transfer.name} upload progress`}
            data-testid="transfer-bubble-bar"
            className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]"
          >
            <div
              className="h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out"
              // A width percentage is the one dynamic value that cannot be a
              // utility class — it is data, not design. Everything visual
              // (colour, height, radius, easing) stays in tokens/classes.
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>

      {mine && onCancel && !failed && phase !== 'complete' && (
        <button
          type="button"
          onClick={() => onCancel(transfer.transferId)}
          aria-label={`Cancel upload of ${transfer.name}`}
          data-testid="transfer-bubble-cancel"
          className={cn(
            'shrink-0 rounded px-1.5 py-0.5 text-xs',
            'text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          )}
        >
          ✕
        </button>
      )}
    </div>
  );
}

function FileGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-[var(--color-text-tertiary)]"
    >
      <path
        d="M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default AttachmentBubble;
