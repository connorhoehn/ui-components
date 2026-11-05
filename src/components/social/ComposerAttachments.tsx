// ComposerAttachments — files staged in the composer, before they are sent.
//
// ## Why files wait here instead of uploading on drop
//
// Dropping a file used to hand it straight to the host, which sent it as its
// own message. That is why it "looked odd": the file left the composer the
// instant it arrived, so there was no moment where you could see what you had
// attached, attach a second one, write the sentence that explains it, or change
// your mind. Teams, Slack and Outlook all stage attachments in the composer and
// send them WITH the message, because an attachment is part of a message rather
// than a message of its own.
//
// So the composer holds them, shows them, lets you remove them, and hands them
// over on send.
//
// ## Image previews are object URLs, and object URLs leak
//
// A thumbnail needs `URL.createObjectURL`, which pins the whole File in memory
// until it is revoked. Dropping ten screenshots and changing your mind would
// otherwise hold all ten for the lifetime of the tab. Each preview is revoked
// when its chip unmounts.

import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';
import { DocumentIcon } from '../ui/Icons';

export interface StagedFile {
  /** Stable id for keying and removal — the File object itself is not a key. */
  id: string;
  file: File;
}

export interface ComposerAttachmentsProps {
  files: readonly StagedFile[];
  onRemove: (id: string) => void;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

/** Bytes as something a person reads. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Thumb({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file.type.startsWith('image/')) return;
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    // Revoked on unmount: an un-revoked object URL pins the entire File for the
    // lifetime of the tab.
    return () => {
      URL.revokeObjectURL(objectUrl);
      setUrl(null);
    };
  }, [file]);

  if (url) {
    return (
      <img
        src={url}
        alt=""
        aria-hidden
        className="h-9 w-9 shrink-0 rounded object-cover"
        data-testid="composer-attachment-thumb"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="grid h-9 w-9 shrink-0 place-items-center rounded bg-surface-inset text-text-tertiary"
    >
      <DocumentIcon size={16} />
    </span>
  );
}

export function ComposerAttachments({
  files,
  onRemove,
  disabled = false,
  className,
  'data-testid': testId = 'composer-attachments',
}: ComposerAttachmentsProps) {
  if (files.length === 0) return null;

  return (
    <ul
      data-testid={testId}
      aria-label="Attachments"
      className={cn('m-0 flex list-none flex-wrap gap-1.5 px-2 pt-2', className)}
    >
      {files.map(({ id, file }) => (
        <li
          key={id}
          data-testid="composer-attachment"
          className="flex items-center gap-2 rounded-lg border border-border bg-surface-inset py-1 pl-1 pr-1.5"
        >
          <Thumb file={file} />
          <span className="flex min-w-0 flex-col">
            <span className="max-w-[11rem] truncate text-xs text-text-primary" title={file.name}>
              {file.name}
            </span>
            <span className="text-[11px] text-text-tertiary">{formatBytes(file.size)}</span>
          </span>
          <button
            data-ui-part=""
            type="button"
            // Named for the file: a row of identical "Remove attachment"
            // buttons is unusable by screen reader when you have four staged.
            aria-label={`Remove ${file.name}`}
            title="Remove"
            disabled={disabled}
            onClick={() => onRemove(id)}
            className="grid h-5 w-5 shrink-0 place-items-center rounded text-text-tertiary hover:bg-surface-hover hover:text-text-primary"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ComposerAttachments;
