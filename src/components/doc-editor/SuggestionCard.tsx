// One tracked change, as a card you can act on.
//
// The card carries three things and each of them is load-bearing:
//
//   WHO   — an unreviewed suggestion is visible to everyone the moment it
//           exists, so the only thing separating "a proposal" from "an agreed
//           edit" is the name on it. Attribution is not decoration here.
//   WHAT  — the removed text struck through, the added text tinted, one line
//           PER BLOCK. A suggestion is one author over ten minutes, so an agent
//           that appends a rule, a table and a paragraph is one suggestion;
//           run together it read "| Column 1 | Column 2 ||-----|| | |Placeholder".
//   ACT   — show, accept or reject. Both resolutions are ordinary document
//           edits; there is no draft state and no undo beyond the editor's own.
//
// Presentational: it takes a summary and calls back. It never touches an editor.

import { cn } from '../../lib/cn';
import Avatar from '../shared/Avatar';
import { Button } from '../ui/Button';

/** What kind of change is being proposed. */
export type SuggestionCardKind = 'insert' | 'delete' | 'replace' | 'modify';

const KIND_LABEL: Record<SuggestionCardKind, string> = {
  insert: 'Added',
  delete: 'Removed',
  replace: 'Replaced',
  modify: 'Formatted',
};

const KIND_CLASS: Record<SuggestionCardKind, string> = {
  insert: 'bg-success-bg text-success-fg',
  delete: 'bg-danger-bg text-danger-fg',
  replace: 'bg-caution-bg text-caution-fg',
  modify: 'bg-info-bg text-info-fg',
};

/** Lines shown before the card folds the rest behind a count. */
const MAX_LINES = 6;

export interface SuggestionCardProps {
  kind: SuggestionCardKind;
  /** Display name of whoever proposed it. Never blank — see below. */
  author: string;
  /** When it was proposed, epoch ms. */
  when?: number | null;
  /** Where in the document, e.g. a section title. */
  context?: string;
  /** Text proposed for removal — the whole run, for hosts without block detail. */
  deletedText?: string;
  /** Text proposed for addition — the whole run. */
  insertedText?: string;
  /** The same, one entry per block. Preferred over `insertedText` when given. */
  insertedBlocks?: readonly string[];
  deletedBlocks?: readonly string[];
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

function Lines({ lines, tone, testId }: { lines: readonly string[]; tone: 'insert' | 'delete'; testId: string }) {
  const shown = lines.slice(0, MAX_LINES);
  const Tag = tone === 'insert' ? 'ins' : 'del';
  return (
    <div className="flex flex-col gap-0.5" data-testid={testId}>
      {shown.map((line, i) => (
        <Tag
          key={i}
          title={line}
          className={cn(
            'block truncate rounded px-1.5 py-0.5 text-[13px] leading-snug no-underline',
            tone === 'insert' ? 'bg-success-bg text-success-fg' : 'bg-danger-bg text-danger-fg line-through',
          )}
        >
          {line}
        </Tag>
      ))}
      {lines.length > MAX_LINES && (
        <span className="px-1.5 text-xs text-text-tertiary">and {lines.length - MAX_LINES} more</span>
      )}
    </div>
  );
}

export function SuggestionCard({
  kind,
  author,
  when = null,
  context,
  deletedText = '',
  insertedText = '',
  insertedBlocks,
  deletedBlocks,
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
  const inserted = insertedBlocks && insertedBlocks.length > 0 ? insertedBlocks : (insertedText ? [insertedText] : []);
  const deleted = deletedBlocks && deletedBlocks.length > 0 ? deletedBlocks : (deletedText ? [deletedText] : []);
  const hasBody = inserted.length > 0 || deleted.length > 0;
  return (
    <div
      data-testid={testId}
      data-kind={kind}
      data-active={active ? 'true' : 'false'}
      className={cn(
        'flex flex-col gap-2 border-b border-border px-3 py-2.5 text-sm last:border-b-0',
        active && 'bg-surface-inset',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar name={who} size={20} />
        <span className="min-w-0 truncate text-[13px] font-medium text-text-primary" data-testid={`${testId}-author`}>
          {who}
        </span>
        {when !== null && (
          <span className="shrink-0 text-xs tabular-nums text-text-tertiary">{formatWhen(when)}</span>
        )}
        <span
          className={cn('ml-auto shrink-0 rounded px-1.5 py-0.5 text-[11px] font-medium', KIND_CLASS[kind])}
          data-testid={`${testId}-kind`}
        >
          {KIND_LABEL[kind]}
        </span>
      </div>
      {context && (
        <div className="text-xs text-text-tertiary" data-testid={`${testId}-context`}>in {context}</div>
      )}
      {/* The proposal itself. `<del>`/`<ins>` rather than styled spans: the
          semantics are exactly what those elements mean, and a screen reader
          announces them without any aria of ours. The body is the click target
          that takes the reader to the change. */}
      {hasBody && (
        <button
          type="button"
          onClick={onFocus}
          disabled={!onFocus}
          data-testid={`${testId}-body`}
          className={cn(
            'flex w-full flex-col items-stretch gap-1 border-none bg-transparent p-0 text-left font-[inherit]',
            onFocus && 'cursor-pointer hover:opacity-80',
          )}
        >
          {deleted.length > 0 && <Lines lines={deleted} tone="delete" testId={`${testId}-deleted`} />}
          {inserted.length > 0 && <Lines lines={inserted} tone="insert" testId={`${testId}-inserted`} />}
        </button>
      )}
      {(onFocus || onAccept || onReject) && (
        <div className="flex items-center justify-end gap-1.5">
          {onFocus && (
            <Button variant="ghost" size="sm" onClick={onFocus} data-testid={`${testId}-show`} className="mr-auto">
              Show
            </Button>
          )}
          {onReject && (
            <Button variant="ghost" size="sm" onClick={onReject} data-testid={`${testId}-reject`}>
              Reject
            </Button>
          )}
          {onAccept && (
            <Button variant="primary" size="sm" onClick={onAccept} data-testid={`${testId}-accept`}>
              Accept
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default SuggestionCard;
