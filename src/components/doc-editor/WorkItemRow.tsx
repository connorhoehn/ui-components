// src/components/doc-editor/WorkItemRow.tsx
//
// A captured remark that has not been turned into a proposal yet.
//
// This replaces the old `WorkItemInbox`, which rendered only the UNPLACED case
// and gave it a section picker and a dismiss button and nothing else. That split
// is the bug, not a layout choice: the moment "unplaced" gets its own component,
// the actions available on it drift apart from the placed one, and the action
// that goes missing is the one that matters.
//
// WHY AN UNPLACED REMARK MUST STILL BE DRAFTABLE
//
// A remark about the document as a whole — "update this document to have a
// different header" — has no section, so the capture path files it as unplaced
// BY CONSTRUCTION. If drafting is only offered to placed remarks, the single
// proposal shape that can change a header (`meta.title`) is reachable only by
// first filing the remark under a section it does not belong to. Being unplaced
// is not the same as being unactionable.
//
// So there is ONE row for both states. `unplaced` changes the chip and reveals
// the filing controls; it never removes an action. Filing is offered, never
// required.
//
// Purely presentational, like `ProposalCard` beside it: this owns no fetching
// and no document. It renders the state the host hands it and reports intent
// back through the callbacks. That split is what keeps "accept mutates the
// document" testable one step later — the row cannot fake an outcome it does
// not compute.
//
// NOT a `ChangeReviewCard`. That card is the POST-proposal surface: it carries a
// diff, a verdict and an accept/reject decision. This row is what exists before
// any of that, when all we have is something a person said. The two are
// sequential states of the same item, not two renderings of one state.

import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import Chip from '../shared/Chip';
import { Select } from '../forms/Select';

/**
 * A ranked guess at where the remark belongs.
 *
 * Ordering only. `score` decides the order and is never rendered as a number —
 * no percentage, no bar, nothing that invites reading a ranking heuristic as a
 * probability.
 */
export interface WorkItemCandidate {
  sectionId: string;
  sectionTitle?: string;
  score: number;
  reason: string;
}

export interface WorkItemRowProps {
  /** Identifies the row and seeds its test ids. */
  itemId: string;
  /** The verbatim remark. */
  utterance: string;
  /**
   * True when the capture path could not place this remark. Changes the chip
   * and reveals the filing controls — it never withholds an action.
   */
  unplaced?: boolean;
  /**
   * Where it is filed, in words, when it IS placed. Ignored when `unplaced`.
   */
  targetLabel?: string;
  /** Why the capture path declined to place it. Shown so it is never a mystery. */
  reason?: string;
  /** True when the speaker's screen moved mid-utterance. */
  contextSplit?: boolean;
  /** A draft is in flight; the draft action reads as busy and is disabled. */
  drafting?: boolean;
  /** A drafting failure, shown verbatim rather than swallowed. */
  draftError?: string;
  /** Ranked guesses. Ordered here, never pre-selected. */
  candidates?: WorkItemCandidate[];
  /** All sections, so a user can file the remark somewhere no candidate names. */
  sections: Array<{ id: string; title: string }>;
  /** Turn the remark into a proposal. Offered on every remark, placed or not. */
  onPropose: () => void;
  /** File the remark under a section. */
  onAttach: (sectionId: string) => void;
  /** Discard the remark. */
  onDismiss: () => void;
  className?: string;
  'data-testid'?: string;
}

export function WorkItemRow({
  itemId,
  utterance,
  unplaced = false,
  targetLabel,
  reason,
  contextSplit,
  drafting = false,
  draftError,
  candidates,
  sections,
  onPropose,
  onAttach,
  onDismiss,
  className,
  'data-testid': testId = `work-item-${itemId}`,
}: WorkItemRowProps) {
  const ranked = [...(candidates ?? [])].sort((a, b) => b.score - a.score);
  const rankedIds = new Set(ranked.map((c) => c.sectionId));
  const rest = sections.filter((s) => !rankedIds.has(s.id));

  return (
    <Card padding="sm" className={className} data-testid={testId} data-item-id={itemId}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip tone={unplaced ? 'neutral' : 'success'} size="sm" uppercase>
            {unplaced ? 'Unplaced' : (targetLabel ?? 'Placed')}
          </Chip>
          {contextSplit && (
            <Chip tone="caution" size="sm" data-testid={`${testId}-split`}>
              The screen moved while you spoke
            </Chip>
          )}
        </div>

        <blockquote className="border-l-2 border-border pl-2 text-sm italic text-text-primary">
          “{utterance}”
        </blockquote>

        {reason && <p className="text-xs text-text-tertiary">{reason}</p>}

        {draftError && (
          <div
            className={cn(
              'rounded border border-warning-border bg-warning-bg',
              'px-2 py-1.5 text-xs text-warning-fg',
            )}
            data-testid={`${testId}-draft-error`}
          >
            {draftError}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            disabled={drafting}
            onClick={onPropose}
            data-testid={`${testId}-propose`}
          >
            {drafting ? 'Drafting…' : 'Draft a change'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDismiss}
            data-testid={`${testId}-dismiss`}
          >
            Not useful
          </Button>
        </div>

        {/* Filing is offered, never required — a document-level remark has
            nowhere to go and must stay actionable anyway. */}
        {unplaced && ranked.length > 0 && (
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-text-tertiary">
              Best guesses
            </span>
            {ranked.map((c) => (
              <Button
                key={c.sectionId}
                size="sm"
                variant="secondary"
                onClick={() => onAttach(c.sectionId)}
                data-testid={`${testId}-candidate`}
              >
                {c.sectionTitle ?? c.sectionId} — {c.reason}
              </Button>
            ))}
          </div>
        )}

        {unplaced && rest.length > 0 && (
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-text-tertiary">
              Or file it under
            </span>
            <Select
              size="sm"
              value=""
              placeholder="Choose a section…"
              options={rest.map((s) => ({ value: s.id, label: s.title || s.id }))}
              onChange={(e) => {
                if (e.target.value) onAttach(e.target.value);
              }}
              data-testid={`${testId}-file-under`}
            />
          </label>
        )}
      </div>
    </Card>
  );
}

export default WorkItemRow;
