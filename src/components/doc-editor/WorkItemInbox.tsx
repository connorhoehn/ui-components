// src/components/doc-editor/WorkItemInbox.tsx
//
// Where a remark goes when we do not know where it goes.
//
// The whole point of this surface is that it is the ONLY thing that happens on
// ambiguity. The tempting alternative — attach the item to every plausible
// target and let the user delete the wrong ones — is what Fireflies does, and it
// is strictly worse than doing nothing: once a note is filed in three places, a
// reader who finds it in the wrong one cannot tell whether it is also in the
// right one. So an ambiguous remark produces exactly one row, here, addressed to
// a person rather than to a place, carrying its ranked alternatives as data the
// human chooses from.
//
// Candidates are ordered, never pre-selected, and their scores are shown as
// ordering only — no percentage, no progress bar, nothing that invites reading a
// ranking heuristic as a probability.

import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import EmptyState from '../shared/EmptyState';

export interface WorkItemCandidate {
  sectionId: string;
  sectionTitle?: string;
  /** Ordering only. Never rendered as a number. */
  score: number;
  reason: string;
}

export interface WorkItemInboxEntry {
  itemId: string;
  /** Verbatim remark. */
  utterance: string;
  /** Why the capture path declined to place it. Shown so it is never a mystery. */
  reason?: string;
  /** True when the speaker's screen moved mid-utterance. */
  contextSplit?: boolean;
  capturedAt?: string;
  candidates?: WorkItemCandidate[];
}

export interface WorkItemInboxProps {
  entries: WorkItemInboxEntry[];
  /** All sections, so a user can file an item somewhere no candidate names. */
  sections: Array<{ id: string; title: string }>;
  onAttach: (itemId: string, sectionId: string) => void;
  onDismiss: (itemId: string) => void;
  className?: string;
  'data-testid'?: string;
}

function EntryRow({
  entry,
  sections,
  onAttach,
  onDismiss,
  testId,
}: {
  entry: WorkItemInboxEntry;
  sections: Array<{ id: string; title: string }>;
  onAttach: (itemId: string, sectionId: string) => void;
  onDismiss: (itemId: string) => void;
  testId: string;
}) {
  const ranked = [...(entry.candidates ?? [])].sort((a, b) => b.score - a.score);
  const rankedIds = new Set(ranked.map((c) => c.sectionId));
  const rest = sections.filter((s) => !rankedIds.has(s.id));

  return (
    <li
      className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3"
      data-testid={`${testId}-entry`}
      data-item-id={entry.itemId}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip tone="neutral" size="sm" uppercase>Unplaced</Chip>
        {entry.contextSplit && (
          <Chip tone="caution" size="sm" data-testid={`${testId}-split`}>
            The screen moved while you spoke
          </Chip>
        )}
      </div>

      <blockquote className="border-l-2 border-border pl-2 text-sm italic text-text-primary">
        “{entry.utterance}”
      </blockquote>

      {entry.reason && <p className="text-xs text-text-tertiary">{entry.reason}</p>}

      {ranked.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wide text-text-tertiary">
            Best guesses
          </span>
          {ranked.map((c) => (
            <button
              key={c.sectionId}
              type="button"
              onClick={() => onAttach(entry.itemId, c.sectionId)}
              className={cn(
                'flex flex-col items-start gap-0.5 rounded border border-border',
                'bg-surface-inset px-2 py-1.5 text-left transition-colors',
                'hover:bg-surface-hover cursor-pointer',
              )}
              data-testid={`${testId}-candidate`}
              data-section-id={c.sectionId}
            >
              <span className="text-xs font-semibold text-text-primary">
                {c.sectionTitle ?? c.sectionId}
              </span>
              <span className="text-[11px] text-text-tertiary">{c.reason}</span>
            </button>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <label className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wide text-text-tertiary">
            Or file it under
          </span>
          <select
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) onAttach(entry.itemId, e.target.value);
            }}
            className="rounded border border-border bg-surface-inset px-2 py-1 text-xs text-text-primary"
            data-testid={`${testId}-select`}
          >
            <option value="">Choose a section…</option>
            {rest.map((s) => (
              <option key={s.id} value={s.id}>{s.title || s.id}</option>
            ))}
          </select>
        </label>
      )}

      <div>
        <Button size="sm" variant="ghost" onClick={() => onDismiss(entry.itemId)}
          data-testid={`${testId}-dismiss`}>
          Not useful
        </Button>
      </div>
    </li>
  );
}

export function WorkItemInbox({
  entries,
  sections,
  onAttach,
  onDismiss,
  className,
  'data-testid': testId = 'work-item-inbox',
}: WorkItemInboxProps) {
  if (entries.length === 0) {
    return (
      <div className={className} data-testid={`${testId}-empty`}>
        <EmptyState
          title="Nothing unplaced"
          body="Remarks we could not confidently attach to a section will wait here."
          testId={`${testId}-empty-state`}
        />
      </div>
    );
  }

  return (
    <ul className={cn('flex flex-col gap-2', className)} data-testid={testId}>
      {entries.map((entry) => (
        <EntryRow
          key={entry.itemId}
          entry={entry}
          sections={sections}
          onAttach={onAttach}
          onDismiss={onDismiss}
          testId={testId}
        />
      ))}
    </ul>
  );
}

export default WorkItemInbox;
