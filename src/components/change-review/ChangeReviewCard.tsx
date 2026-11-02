// src/components/change-review/ChangeReviewCard.tsx
//
// One proposed change to a document, in the shape a reviewer actually reads it.
//
// The ordering of this card is its argument, so it is worth stating: CATEGORY
// and AUTHOR come first, on one line, before anything else. Not the system that
// raised the change, not its id, not its status — what KIND of change this is
// and WHO is asking. Those two answer "do I care about this one?", and a queue
// is mostly that question repeated. Everything below them answers "is it
// right?", which is only worth reading once the first question passes.
//
// Then the change itself, in diff order: WHERE (`ChangeLocation`), then WHAT
// (`ChangeDiff`), then the agent's verdict with its reasoning folded away.
//
// Purely presentational. It owns no fetching and no document; the host decides
// what accepting means and reports back — see `onAccept`.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import { Avatar } from '../shared/Avatar';
import { Input } from '../forms/Input';
import ChangeDiff, { type ChangeDiffPair } from './ChangeDiff';
import ChangeLocation from './ChangeLocation';
import VerdictChip from './VerdictChip';
import type { ChangeReviewStatus, ChangeReviewVerdict } from './types';

/** Who is asking for the change. */
export interface ChangeAuthor {
  name: string;
  /**
   * `agent` renders the machine label. This is not decoration: an unreviewed
   * machine edit and a colleague's edit carry very different weight, and the
   * only thing separating them on screen is this.
   */
  kind?: 'human' | 'agent';
  avatarUrl?: string;
}

/** What the host reports back after trying to apply. */
export interface ChangeApplyOutcome {
  ok: boolean;
  /** Shown verbatim when `ok` is false. Say what happened, not "error". */
  message?: string;
  /** Set when the refusal was specifically a compare-and-set mismatch. */
  stale?: { expected: unknown; actual: unknown };
}

export type ChangeReviewCardStatus = 'pending' | 'applied' | 'rejected';

export interface ChangeReviewCardProps {
  /**
   * What KIND of change this is, in the reviewer's words — "Title", "Payment
   * terms", "Body text". Rendered first and most prominent.
   */
  category: string;
  /**
   * Who made / is asking for the change.
   *
   * Optional, and its absence is RENDERED — as "Unattributed", not as a blank.
   * Plenty of real sources cannot name an editor (an S3 object has no author),
   * and the wrong fix is to fill the gap with the system that delivered the
   * change. "Contracts (Google Drive)" is a provenance, not a person; showing
   * it where a person belongs is what made the queue it replaces unreadable.
   */
  author?: ChangeAuthor;
  /** Breadcrumb to the change site. See `ChangeLocation`. */
  path?: readonly string[];
  /** Position within the target, e.g. `paragraph 3`. */
  locationHint?: string;
  /** The before/after pairs. One for a field, several for prose edits. */
  pairs: readonly ChangeDiffPair[];
  /** Label for the current value. Defaults to "Now". */
  beforeLabel?: string;
  /** Label for the proposed value. Defaults to "Proposed". */
  afterLabel?: string;
  /** Verbatim request that raised this, if there was one. Never paraphrase it. */
  utterance?: string;
  /** The author's one-line justification for the change itself. */
  rationale?: string;

  verdict?: ChangeReviewVerdict | undefined;
  verdictStatus?: ChangeReviewStatus | undefined;
  verdictError?: string | undefined;
  /**
   * The change's CURRENT revision. Pass it, or a verdict computed against an
   * older revision renders as though it still applies.
   */
  revision?: string | undefined;

  status?: ChangeReviewCardStatus;
  /** When set, rendered instead of the diff — the change could not be drafted. */
  draftError?: string;
  /** Extra chips for the header line (attachment state, confidence, …). */
  badges?: ReactNode;

  /**
   * Apply the change. MUST perform the mutation and report what happened —
   * returning `{ ok: true }` without changing the document is the exact bug
   * this component is shaped to prevent.
   */
  onAccept?: () => Promise<ChangeApplyOutcome> | ChangeApplyOutcome;
  onReject?: (reason: string) => void;
  /** Ask for a fresh review of the current revision. Offered on stale/failed. */
  onRereview?: () => void;
  /** Extra actions, rendered after the built-in ones. */
  actions?: ReactNode;

  className?: string;
  'data-testid'?: string;
}

export function ChangeReviewCard({
  category,
  author,
  path = [],
  locationHint,
  pairs,
  beforeLabel,
  afterLabel,
  utterance,
  rationale,
  verdict,
  verdictStatus = 'idle',
  verdictError,
  revision,
  status = 'pending',
  draftError,
  badges,
  onAccept,
  onReject,
  onRereview,
  actions,
  className,
  'data-testid': testId = 'change-review-card',
}: ChangeReviewCardProps) {
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<ChangeApplyOutcome | null>(null);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');

  const applied = status === 'applied';
  const rejected = status === 'rejected';
  const decided = applied || rejected;

  async function handleAccept() {
    if (!onAccept) return;
    setBusy(true);
    setOutcome(null);
    try {
      const result = await onAccept();
      // Keep a failed outcome on screen. Clearing it and re-enabling the button
      // would present a refused apply as a transient glitch.
      setOutcome(result);
    } catch (err) {
      setOutcome({ ok: false, message: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      data-testid={testId}
      data-status={status}
      data-category={category}
      className={cn(
        'flex flex-col gap-2.5 rounded-lg border bg-surface p-4',
        applied ? 'border-success-border' : 'border-border',
        rejected && 'opacity-60',
        className,
      )}
    >
      {/* Category + author. The two facts that decide whether to read on. */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="text-sm font-semibold leading-tight text-text-primary"
          data-testid={`${testId}-category`}
        >
          {category}
        </span>
        <span className="flex min-w-0 items-center gap-1.5" data-testid={`${testId}-author`}>
          {author ? (
            <>
              <Avatar
                name={author.name}
                size={18}
                {...(author.avatarUrl ? { src: author.avatarUrl } : {})}
              />
              <span className="truncate text-xs text-text-secondary">{author.name}</span>
              {author.kind === 'agent' && (
                <Chip tone="info" size="xs" uppercase data-testid={`${testId}-agent`}>
                  AI
                </Chip>
              )}
            </>
          ) : (
            <span className="text-xs italic text-text-tertiary">Unattributed</span>
          )}
        </span>
        <span className="flex-1" />
        {badges}
        {applied && (
          <Chip tone="success" size="sm" data-testid={`${testId}-applied`}>
            Applied
          </Chip>
        )}
        {rejected && <Chip tone="neutral" size="sm">Rejected</Chip>}
      </div>

      {utterance && (
        <blockquote className="m-0 border-l-2 border-border pl-2 text-sm italic text-text-primary">
          “{utterance}”
        </blockquote>
      )}

      {/* WHERE, then WHAT — diff order. */}
      <ChangeLocation
        path={path}
        {...(locationHint ? { hint: locationHint } : {})}
        data-testid={`${testId}-location`}
      />

      {draftError ? (
        <div
          className="rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg"
          data-testid={`${testId}-draft-error`}
        >
          {draftError}
        </div>
      ) : (
        <ChangeDiff
          pairs={pairs}
          {...(beforeLabel ? { beforeLabel } : {})}
          {...(afterLabel ? { afterLabel } : {})}
          data-testid={`${testId}-diff`}
        />
      )}

      {rationale && (
        <p className="m-0 text-xs text-text-secondary" data-testid={`${testId}-rationale`}>
          {rationale}
        </p>
      )}

      <VerdictChip
        verdict={verdict}
        status={verdictStatus}
        error={verdictError}
        revision={revision}
        data-testid={`${testId}-verdict`}
      />

      {outcome && !outcome.ok && (
        <div
          className="flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg"
          data-testid={`${testId}-apply-error`}
        >
          <span className="font-semibold">This was not applied.</span>
          <span>{outcome.message ?? 'The document refused the change.'}</span>
          {outcome.stale && (
            <span>
              Drafted against {JSON.stringify(outcome.stale.expected ?? '')}; the document now reads{' '}
              {JSON.stringify(outcome.stale.actual ?? '')}.
            </span>
          )}
        </div>
      )}

      {!decided && (onAccept || onReject || onRereview || actions) && (
        <div className="flex flex-wrap items-center gap-2">
          {onAccept && (
            <Button
              size="sm"
              variant="primary"
              disabled={busy || !!draftError}
              onClick={handleAccept}
              data-testid={`${testId}-accept`}
            >
              {busy ? 'Applying…' : 'Apply change'}
            </Button>
          )}
          {onReject && (
            <Button
              size="sm"
              variant="ghost"
              disabled={busy}
              onClick={() => setRejecting((v) => !v)}
              data-testid={`${testId}-reject`}
            >
              Reject
            </Button>
          )}
          {onRereview && (
            <Button
              size="sm"
              variant="ghost"
              disabled={busy}
              onClick={onRereview}
              data-testid={`${testId}-rereview`}
            >
              Re-run review
            </Button>
          )}
          {actions}
        </div>
      )}

      {rejecting && !decided && onReject && (
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] text-text-tertiary" htmlFor={`${testId}-reason`}>
            Why? (optional — helps the next draft)
          </label>
          <Input
            id={`${testId}-reason`}
            size="sm"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            data-testid={`${testId}-reason`}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                onReject(reason);
                setRejecting(false);
              }}
              data-testid={`${testId}-reject-confirm`}
            >
              Reject change
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setRejecting(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeReviewCard;
