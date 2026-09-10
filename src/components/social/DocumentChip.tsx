// DocumentChip — a document referenced in a message, as a thing you can open.
//
// The composer's `#` menu puts `{ id, label }` pairs into `metadata.documents`;
// the message text keeps "#Roadmap" as words. This chip is the words made
// clickable: 📄 and the title, one per document, under the message. Sized to
// sit under a line of chat rather than to be a card — a reference is not the
// document arriving in the thread, which is what DocumentActivityCard says.

import { cn } from '../../lib/cn';

export interface DocumentChipProps {
  documentId: string;
  label: string;
  /** The document's own icon, when the reference carried one. */
  icon?: string;
  /** Open the document — beside the chat, or wherever the host puts documents. */
  onOpen?: (documentId: string) => void;
  className?: string;
  'data-testid'?: string;
}

export function DocumentChip({ documentId, label, icon, onOpen, className, 'data-testid': testId = 'chat-message-docref' }: DocumentChipProps) {
  return (
    <button
      type="button"
      onClick={onOpen ? () => onOpen(documentId) : undefined}
      disabled={!onOpen}
      title={label}
      data-testid={testId}
      data-document-id={documentId}
      className={cn(
        'inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary',
        onOpen ? 'hover:border-primary hover:bg-surface-hover' : 'cursor-default',
        className,
      )}
    >
      <span aria-hidden="true" className="shrink-0">{icon || '📄'}</span>
      <span className="min-w-0 truncate">{label}</span>
    </button>
  );
}

export default DocumentChip;
