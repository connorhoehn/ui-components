// ui-components/src/components/doc-macros/AttachmentBlock.tsx
//
// A `macro:attachment` fence, drawn as a file card.
//
// Presentation only, and the first macro block with nothing to edit: every
// field describes the stored object and was set at upload. The card shows the
// file, offers to open it, and lets an editor take it off the page.
//
// ## Three ways to open, in order
//
//   1. `onOpen`   — the host fetches the bytes with the reader's credentials
//                   and shows them. This is the only way a same-origin upload
//                   can open at all: a plain `<a href="/api/uploads/…">` is an
//                   anonymous request and comes back 403 (see the app's
//                   `AuthedImage` for the identical problem, one node over).
//   2. `href`     — an absolute URL `linkHref` accepted, as an ordinary anchor.
//   3. neither    — the name is shown as text. The card never disappears
//                   because it cannot be opened; the reader still learns that
//                   a file was here and what it was called.
//
// ## Overflow containment is not optional
//
// Filenames are user content and need not contain a space. `min-w-0` +
// `break-all` on every text node; the same rule `ChatAttachment` learned the
// hard way when a 400-character token took a whole thread sideways.

import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import { formatBytes } from '../../lib/formatBytes';
import { isImageAttachment, type Attachment } from './attachmentText';
import { safeHref } from '../../lib/safeHref';

export interface AttachmentBlockProps {
    attachment: Attachment;
    /** False hides the Remove control. Opening is never gated on it. */
    editable?: boolean;
    /** A directly-followable URL. Ignored when `onOpen` is given. */
    href?: string | null;
    /** The host opens it with credentials. Wins over `href`. */
    onOpen?: () => void;
    /**
     * A renderable `src` for an image attachment — an object URL the host
     * resolved, or `null` while it has not / could not. Only consulted when
     * `type` is `image/*`.
     */
    previewSrc?: string | null;
    onRemove?: () => void;
    'data-testid'?: string;
}

/** A glyph by broad kind. Advisory: the MIME type is never trusted. */
function glyphFor(type: string): string {
    if (type.startsWith('image/')) return '🖼';
    if (type.startsWith('video/')) return '🎞';
    if (type.startsWith('audio/')) return '🎵';
    if (type === 'application/pdf') return '📄';
    if (type.includes('zip') || type.includes('compressed') || type.includes('tar')) return '🗜';
    if (type.startsWith('text/') || type.includes('json') || type.includes('xml')) return '📝';
    return '📎';
}

export function AttachmentBlock({
    attachment,
    editable = false,
    href = null,
    onOpen,
    previewSrc = null,
    onRemove,
    'data-testid': testId = 'attachment',
}: AttachmentBlockProps) {
    const size = attachment.size === null ? '' : formatBytes(attachment.size);
    const canOpen = Boolean(onOpen || href);
    const showPreview = isImageAttachment(attachment) && Boolean(previewSrc);

    const name = (
        <span
            data-testid={`${testId}-name`}
            className="min-w-0 break-all text-[13px] font-medium leading-5 text-text-primary"
        >
            {attachment.name}
        </span>
    );

    return (
        <div
            data-testid={testId}
            data-openable={String(canOpen)}
            className="my-3 overflow-hidden rounded-md border border-border bg-surface"
        >
            {showPreview ? (
                <img
                    data-testid={`${testId}-preview`}
                    src={previewSrc!}
                    alt={attachment.name}
                    className="block max-h-[360px] w-full bg-surface-inset object-contain"
                    draggable={false}
                />
            ) : null}
            <div className="flex items-center gap-2.5 px-2.5 py-2">
                <span aria-hidden="true" className="shrink-0 text-[18px] leading-none">
                    {glyphFor(attachment.type)}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                    {onOpen ? (
                        <button
                            data-ui-part=""
                            type="button"
                            data-testid={`${testId}-open`}
                            onClick={onOpen}
                            className="m-0 flex min-w-0 cursor-pointer border-0 bg-transparent p-0 text-left hover:underline"
                        >
                            {name}
                        </button>
                    ) : href ? (
                        <a
                            data-testid={`${testId}-anchor`}
                            href={safeHref(href) ?? undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-w-0 hover:underline"
                        >
                            {name}
                        </a>
                    ) : (
                        name
                    )}
                    <span
                        data-testid={`${testId}-meta`}
                        className={cn(
                            'min-w-0 truncate text-[11px] text-text-tertiary',
                            !size && !attachment.type && 'hidden',
                        )}
                    >
                        {[size, attachment.type].filter(Boolean).join(' · ')}
                    </span>
                </div>
                {editable && onRemove ? (
                    <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Remove attachment"
                        data-testid={`${testId}-remove`}
                        onClick={onRemove}
                    >
                        ✕
                    </Button>
                ) : null}
            </div>
        </div>
    );
}

export default AttachmentBlock;
