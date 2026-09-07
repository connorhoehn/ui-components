// One tracked change, as a card you can act on.
//
// The card carries three things and each of them is load-bearing:
//
//   WHO   — an unreviewed suggestion is visible to everyone the moment it
//           exists, so the only thing separating "a proposal" from "an agreed
//           edit" is the name on it. Attribution is not decoration here.
//   WHAT  — the removed text struck through, the added text underlined, in the
//           same colours the marks use inside the prose, so the card and the
//           paragraph read as the same object.
//   ACT   — accept or reject. Both are ordinary document edits; there is no
//           draft state and no undo beyond the editor's own.
//
// Presentational: it takes a summary and calls back. It never touches an editor.

import { cn } from '../../lib/cn';

/** What kind of change is being proposed. */
export type SuggestionCardKind = 'insert' | 'delete' | 'replace' | 'modify';

const KIND_LABEL: Record<SuggestionCardKind, string> = {
  insert: 'Insertion',
  delete: 'Deletion',
  replace: 'Replacement',
  modify: 'Formatting',
};

const KIND_CLASS: Record<SuggestionCardKind, string> = {
  insert: 'bg-success-bg text-success-fg',
  delete: 'bg-danger-bg text-danger-fg',
  replace: 'bg-caution-bg text-caution-fg',
  modify: 'bg-info-bg text-info-fg',
};

export interface SuggestionCardProps {
  kind: SuggestionCardKind;
  /** Display name of whoever proposed it. Never blank — see below. */
  author: string;
  /** When it was proposed, epoch ms. */
  when?: number | null;
  /** Text proposed for removal. */
  deletedText?: string;
  /** Text proposed for addition. */
  insertedText?: string;
  /** True for the suggestion the reader is currently sitting on. */
  active?: boolean;
  /** Scroll/select the change in the document. */
  onFocus?: () => void;
  /**
   * Accept/reject. BOTH optional and BOTH hidden when absent — a reader without
   * the authority to resolve a suggestion must not be shown buttons that do
   * nothing, which is the failure this whole surface exists to remove.
   */
  onAccept?: () => void;
  onReject?: () => void;
  className?: string;
  'data-testid'?: string;
}

function formatWhen(epochMs: number): string {
  return new Date(epochMs).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function SuggestionCard({
  kind,
  author,
  when = null,
  deletedText = '',
  insertedText = '',
  active = false,
  onFocus,
  onAccept,
  onReject,
  className,
  'data-testid': testId = 'suggestion-card',
}: SuggestionCardProps) {
  // An unattributed suggestion is a bug upstream (the marks make author
  // required), but rendering an empty span would hide it. Say so instead.
  const who = author.trim() === '' ? 'Unknown author' : author;

  return (
    <div
      data-testid={testId}
      data-kind={kind}
      data-active={active ? 'true' : 'false'}
      className={cn(
        'flex flex-col gap-2 border-b border-border p-3 text-sm',
        active && 'bg-surface-inset',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn('rounded px-1.5 py-0.5 text-xs font-medium', KIND_CLASS[kind])}
          data-testid={`${testId}-kind`}
        >
          {KIND_LABEL[kind]}
        </span>
        <span className="truncate text-xs text-text-secondary" data-testid={`${testId}-author`}>
          {who}
        </span>
        {when !== null && (
          <span className="ml-auto text-xs tabular-nums text-text-tertiary">{formatWhen(when)}</span>
        )}
      </div>

      {/* The proposal itself. `<del>`/`<ins>` rather than styled spans: the
          semantics are exactly what those elements mean, and a screen reader
          announces them without any aria of ours. */}
      {(deletedText || insertedText) && (
        <button
          type="button"
          onClick={onFocus}
          disabled={!onFocus}
          data-testid={`${testId}-body`}
          className={cn(
            'flex flex-col items-start gap-0.5 text-left',
            onFocus && 'cursor-pointer hover:opacity-80',
          )}
        >
          {deletedText && (
            <del className="suggestion suggestion--delete" data-testid={`${testId}-deleted`}>
              {deletedText}
            </del>
          )}
          {insertedText && (
            <ins className="suggestion suggestion--insert" data-testid={`${testId}-inserted`}>
              {insertedText}
            </ins>
          )}
        </button>
      )}

      {(onAccept || onReject) && (
        <div className="flex items-center gap-2">
          {onAccept && (
            <button
              type="button"
              onClick={onAccept}
              data-testid={`${testId}-accept`}
              className="cursor-pointer rounded border border-border bg-surface px-2 py-1 text-xs font-medium text-text-primary hover:bg-surface-hover"
            >
              Accept
            </button>
          )}
          {onReject && (
            <button
              type="button"
              onClick={onReject}
              data-testid={`${testId}-reject`}
              className="cursor-pointer rounded px-2 py-1 text-xs font-medium text-text-secondary hover:bg-surface-hover"
            >
              Reject
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SuggestionCard;
