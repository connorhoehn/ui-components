// One tracked change, as a card you can act on.
//
// The card carries three things and each of them is load-bearing:
//
//   WHO   — an unreviewed suggestion is visible to everyone the moment it
//           exists, so the only thing separating "a proposal" from "an agreed
//           edit" is the name on it. Attribution is not decoration here. A
//           suggestion an agent drafted belongs to the PERSON who asked for it;
//           the model is a second-tier fact and is laid out as one.
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

const KIND_TEXT: Record<SuggestionCardKind, string> = {
  insert: 'text-success-fg',
  delete: 'text-danger-fg',
  replace: 'text-caution-fg',
  modify: 'text-info-fg',
};

/** Lines shown before the card folds the rest behind a count. */
const MAX_LINES = 6;

/**
 * An author who is a person a model drafted for: "Eve (powered by Haiku)".
 *
 * A suggestion an agent run produced belongs to the PERSON who asked for it —
 * they are who you talk to about the change — with the engine as the secondary
 * fact. Both have to be on the card and only one of them can win the space.
 *
 * Read off the `author` string rather than taken as a second prop on purpose.
 * Hosts pin this package by commit and upgrade on their own schedule, so a new
 * required-at-the-call-site prop would mean every card said the wrong name until
 * each host re-pinned. Parsing a string an existing host already passes makes
 * the improvement arrive with the package. A plain name matches nothing and is
 * rendered exactly as before.
 */
const POWERED_BY = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;

function splitAuthor(author: string): { person: string; model?: string } {
  const match = POWERED_BY.exec(author);
  if (!match) return { person: author };
  const person = match[1]!.trim();
  const model = match[2]!.trim();
  return person && model ? { person, model } : { person: author };
}

export interface SuggestionCardProps {
  kind: SuggestionCardKind;
  /**
   * Display name of whoever proposed it. Never blank — see below.
   *
   * `"Eve (powered by Haiku)"` is understood as a person and the model that
   * drafted for them, and is laid out as two tiers: Eve owns the author row,
   * the model sits under it. Anything else is one name and renders as one.
   */
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
    <div
      className={cn(
        // A quiet rule in the change's colour beside plain text — the text
        // stays the document's own text, readable at length, not a row of
        // tinted pills.
        'flex flex-col gap-1 border-l-2 pl-2.5',
        tone === 'insert' ? 'border-success-fg' : 'border-danger-fg',
      )}
      data-testid={testId}
    >
      {shown.map((line, i) => (
        <Tag
          key={i}
          className={cn(
            'block whitespace-pre-line text-[13px] leading-relaxed no-underline',
            tone === 'insert' ? 'text-text-primary' : 'text-text-secondary line-through',
          )}
        >
          {line}
        </Tag>
      ))}
      {lines.length > MAX_LINES && (
        <span className="text-xs text-text-tertiary">and {lines.length - MAX_LINES} more</span>
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
  const { person: who, model } = splitAuthor(
    author.trim() === '' ? 'Unknown author' : author.trim(),
  );
  const inserted = insertedBlocks && insertedBlocks.length > 0 ? insertedBlocks : (insertedText ? [insertedText] : []);
  const deleted = deletedBlocks && deletedBlocks.length > 0 ? deletedBlocks : (deletedText ? [deletedText] : []);
  const hasBody = inserted.length > 0 || deleted.length > 0;
  return (
    <div
      data-testid={testId}
      data-kind={kind}
      data-active={active ? 'true' : 'false'}
      className={cn(
        'flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0',
        active && 'bg-surface-inset',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar name={who} size={20} />
        {/* The person, and only the person, gets the row's flexible space.
            This card lives in a 280px margin gutter where the row also carries
            a timestamp and a kind label, leaving roughly 110px for a name — so
            something has to give, and it must never be the name. `title` makes
            a name too long even for that recoverable on hover. */}
        <span
          className="min-w-0 truncate text-[13px] font-medium text-text-primary"
          title={who}
          data-testid={`${testId}-author`}
        >
          {who}
        </span>
        {when !== null && (
          <span className="shrink-0 text-xs tabular-nums text-text-tertiary">{formatWhen(when)}</span>
        )}
        <span
          className={cn('ml-auto shrink-0 text-[11px] font-medium', KIND_TEXT[kind])}
          data-testid={`${testId}-kind`}
        >
          {KIND_LABEL[kind]}
        </span>
      </div>
      {/* The secondary facts, on their own line rather than crowded into the
          author row. Putting "powered by Haiku" inline would make the author
          row's budget the model's budget too, and whichever of the two lost
          would lose by clipping mid-word. Down here the model is complete, in
          the muted weight that says "not who to talk to", and the row above is
          unchanged for the suggestions a person typed themselves. */}
      {(model || context) && (
        <div className="flex flex-wrap items-center gap-x-1.5 text-xs text-text-tertiary">
          {model && <span data-testid={`${testId}-model`}>powered by {model}</span>}
          {model && context && <span aria-hidden="true">·</span>}
          {context && <span data-testid={`${testId}-context`}>in {context}</span>}
        </div>
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
