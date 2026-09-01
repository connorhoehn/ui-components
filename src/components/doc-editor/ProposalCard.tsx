// src/components/doc-editor/ProposalCard.tsx
//
// One proposed document change, awaiting a human.
//
// The card exists because of a specific failure this library's host application
// already shipped once: a proposals queue whose accept button recorded a
// decision and never applied anything. So the design rule here is that the card
// must never let "I clicked accept" and "the document changed" come apart:
//
//   * `onAccept` returns a result. A card whose accept resolved to a failure
//     shows the failure IN PLACE and stays actionable — it does not congratulate
//     the user and move on.
//   * A stale proposal renders as a first-class state with the two values side
//     by side, not as a generic error, because "someone else changed this since
//     it was drafted" is a different thing from "this broke".
//   * Provenance is always visible. The remark that caused the proposal is shown
//     verbatim, because a change nobody can trace back to a request is a change
//     nobody can evaluate.
//
// Purely presentational: it owns no fetching, no editor, and no document. The
// host decides what accepting means and reports back.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import { Avatar } from '../shared/Avatar';
import { Input } from '../forms/Input';
import ChangeDiff from '../change-review/ChangeDiff';
import ChangeLocation from '../change-review/ChangeLocation';
import VerdictChip from '../change-review/VerdictChip';
import type {
  ChangeAuthor,
  ChangeReviewStatus,
  ChangeReviewVerdict,
} from '../change-review';

/** How much the capture path trusted its own choice of target. */
export type ProposalConfidence = 'high' | 'medium' | 'low';

/** Where the item currently sits relative to the document. */
export type ProposalAttachState = 'attached' | 'author_only' | 'inbox' | 'healed';

export type ProposalKind = 'field' | 'prose';

export type ProposalCardStatus =
  | 'none'
  | 'drafting'
  | 'ready'
  | 'applied'
  | 'rejected'
  | 'failed';

/** What the host reports back after trying to apply. */
export interface ProposalApplyOutcome {
  ok: boolean;
  /** Shown verbatim when `ok` is false. Say what happened, not "error". */
  message?: string;
  /** Set when the refusal was specifically a compare-and-set mismatch. */
  stale?: { expected: unknown; actual: unknown };
}

export interface ProposalCardProps {
  /** Verbatim remark that raised this. Never paraphrase it. */
  utterance: string;
  /** `field` changes a title/scalar; `prose` stages suggestion marks. */
  kind: ProposalKind;
  status: ProposalCardStatus;
  confidence: ProposalConfidence;
  attachState?: ProposalAttachState;
  /** Human-readable target, e.g. "Document title" or "Overview". */
  targetLabel?: string;
  /** Why the capture path chose that target. Shown on the provenance line. */
  targetReason?: string;
  /** For `field`: the two values, so the change is legible without the doc. */
  before?: string;
  after?: string;
  /** For `prose`: one row per edit. */
  edits?: Array<{ before: string; after: string }>;
  /** The model's one-line justification. */
  rationale?: string;
  /** Set when drafting itself failed. Rendered instead of the diff. */
  draftError?: string;

  // ── Change-review additions ───────────────────────────────────────────────
  //
  // All optional. A host that passes none of them gets exactly the card it got
  // before; the surfaces that know these facts show them.

  /**
   * Who ASKED for this change — the person whose remark raised it.
   *
   * Distinct from who drafted it: the draft is always the model's, which is
   * what the permanent "AI proposal" chip says. Omit when the requester is not
   * known. Never synthesise one; an invented author on a change nobody can
   * trace is worse than an honest blank.
   */
  author?: ChangeAuthor;
  /**
   * What kind of change this is, in the reviewer's words — "Document title",
   * "Body text". Defaults to a label derived from `kind`.
   */
  category?: string;
  /**
   * Where in the document this lands, outermost first. Rendered diff-hunk
   * style. Defaults to `targetLabel` when that is all the host knows.
   */
  path?: readonly string[];
  /** Position within the target, e.g. `paragraph 3`. */
  locationHint?: string;

  /** The agent's verdict on this change. */
  verdict?: ChangeReviewVerdict | undefined;
  /** How the review itself is going. */
  verdictStatus?: ChangeReviewStatus | undefined;
  /** Why the review failed, when `verdictStatus` is `failed`. */
  verdictError?: string | undefined;
  /**
   * The proposal's CURRENT revision. Pass it, or a verdict computed against an
   * earlier draft renders as though it still applies to this one.
   */
  revision?: string | undefined;
  /** Ask for a fresh verdict against the current revision. */
  onRereview?: () => void;
  /**
   * Apply the change. MUST perform the mutation and report what happened —
   * returning `{ ok: true }` without changing the document is the exact bug this
   * component is shaped to prevent.
   */
  onAccept: () => Promise<ProposalApplyOutcome> | ProposalApplyOutcome;
  onReject: (reason: string) => void;
  /** Ask for a fresh draft against the document's current values. */
  onRedraft?: () => void;
  /** Move the item to a different section. Omitted when there is nowhere to go. */
  onReattach?: () => void;
  /** Confirm an `author_only` attachment, publishing it to collaborators. */
  onConfirmAttachment?: () => void;
  className?: string;
  'data-testid'?: string;
}

const CONFIDENCE_LABEL: Record<ProposalConfidence, string> = {
  high: 'High confidence',
  medium: 'Needs your confirmation',
  low: 'Unplaced',
};

const CONFIDENCE_TONE = {
  high: 'success',
  medium: 'warning',
  low: 'neutral',
} as const;

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-2 text-xs">
      <span className="shrink-0 w-16 text-text-tertiary">{label}</span>
      <span className="min-w-0 flex-1 text-text-secondary break-words">{children}</span>
    </div>
  );
}

/** Fallback category when the host does not supply a richer one. */
const KIND_CATEGORY: Record<ProposalKind, string> = {
  field: 'Field change',
  prose: 'Body text',
};

export function ProposalCard({
  utterance,
  kind,
  status,
  confidence,
  attachState,
  targetLabel,
  targetReason,
  before,
  after,
  edits,
  rationale,
  draftError,
  author,
  category,
  path,
  locationHint,
  verdict,
  verdictStatus = 'idle',
  verdictError,
  revision,
  onRereview,
  onAccept,
  onReject,
  onRedraft,
  onReattach,
  onConfirmAttachment,
  className,
  'data-testid': testId = 'proposal-card',
}: ProposalCardProps) {
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<ProposalApplyOutcome | null>(null);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');

  const applied = status === 'applied';
  const rejected = status === 'rejected';
  const decided = applied || rejected;

  async function handleAccept() {
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

  const pairs =
    kind === 'prose'
      ? edits ?? []
      : [{ before: before ?? '', after: after ?? '' }];

  return (
    <div
      data-testid={testId}
      data-status={status}
      data-confidence={confidence}
      className={cn(
        'flex flex-col gap-3 rounded-lg border bg-surface p-3',
        applied ? 'border-success-border' : 'border-border',
        rejected && 'opacity-60',
        className,
      )}
    >
      {/* Category and requester lead the card: what kind of change, and who is
          asking. Those two decide whether this one is worth reading, and a
          queue is that question over and over. */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="text-sm font-semibold leading-tight text-text-primary"
          data-testid={`${testId}-category`}
        >
          {category ?? KIND_CATEGORY[kind]}
        </span>
        {author && (
          <span
            className="flex min-w-0 items-center gap-1.5"
            data-testid={`${testId}-requester`}
          >
            <Avatar
              name={author.name}
              size={18}
              {...(author.avatarUrl ? { src: author.avatarUrl } : {})}
            />
            <span className="truncate text-xs text-text-secondary">{author.name}</span>
          </span>
        )}
        <span className="flex-1" />
        {/*
          The author label is load-bearing, not decoration. Unreviewed marks are
          visible to every collaborator the moment they exist — unlike Gemini,
          which keeps its own private until approved — so the only thing
          separating "a proposal" from "an agreed edit" is this label. It stays
          even when `author` names the requester: a human ASKED, but a model
          WROTE, and the reviewer needs both facts.
        */}
        <Chip tone="info" size="sm" uppercase data-testid={`${testId}-author`}>
          AI proposal
        </Chip>
        <Chip tone={CONFIDENCE_TONE[confidence]} size="sm">
          {CONFIDENCE_LABEL[confidence]}
        </Chip>
        {attachState === 'healed' && (
          // A re-found anchor must never be silent. An attachment that moved on
          // its own is a wrong attachment in disguise until a human agrees.
          <Chip tone="caution" size="sm" data-testid={`${testId}-healed`}>
            Re-found by quote — check this
          </Chip>
        )}
        {attachState === 'author_only' && (
          <Chip tone="neutral" size="sm">Only you can see this</Chip>
        )}
        {applied && (
          <Chip tone="success" size="sm" data-testid={`${testId}-applied`}>Applied</Chip>
        )}
        {rejected && <Chip tone="neutral" size="sm">Rejected</Chip>}
      </div>

      <blockquote className="border-l-2 border-border pl-2 text-sm italic text-text-primary">
        “{utterance}”
      </blockquote>

      {/* WHERE this lands. Replaces the old "Target:" row — same fact, but in
          the diff-hunk shape a reviewer already knows how to read. Falls back
          to `targetLabel` when the host knows no structured path. */}
      <ChangeLocation
        path={path ?? (targetLabel ? [targetLabel] : [])}
        {...(locationHint ? { hint: locationHint } : {})}
        data-testid={`${testId}-location`}
      />

      <div className="flex flex-col gap-1">
        {targetReason && <Row label="Why">{targetReason}</Row>}
        {rationale && <Row label="Rationale">{rationale}</Row>}
      </div>

      {status === 'drafting' && (
        <div className="text-xs text-text-tertiary" data-testid={`${testId}-drafting`}>
          Drafting a proposal…
        </div>
      )}

      {draftError && (
        <div
          className="rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg"
          data-testid={`${testId}-draft-error`}
        >
          {draftError}
        </div>
      )}

      {status !== 'drafting' && !draftError && pairs.length > 0 && (
        <ChangeDiff pairs={pairs} data-testid={`${testId}-diff`} />
      )}

      {/* The agent's verdict, with its reasoning folded away. Rendered even
          when there is none: a queue where "no chip" silently means "nobody
          looked" trains reviewers to read absence as approval. */}
      {status !== 'drafting' && (
        <VerdictChip
          verdict={verdict}
          status={verdictStatus}
          error={verdictError}
          revision={revision}
          data-testid={`${testId}-verdict`}
        />
      )}

      {outcome && !outcome.ok && (
        <div
          className="flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg"
          data-testid={`${testId}-apply-error`}
        >
          <span className="font-semibold">This was not applied.</span>
          <span>{outcome.message ?? 'The document refused the change.'}</span>
          {outcome.stale && (
            <span>
              Drafted against {JSON.stringify(outcome.stale.expected ?? '')}; the document now
              reads {JSON.stringify(outcome.stale.actual ?? '')}.
            </span>
          )}
        </div>
      )}

      {!decided && (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            disabled={busy || status === 'drafting' || !!draftError}
            onClick={handleAccept}
            data-testid={`${testId}-accept`}
          >
            {busy ? 'Applying…' : kind === 'field' ? 'Apply change' : 'Add as suggestion'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={busy}
            onClick={() => setRejecting((v) => !v)}
            data-testid={`${testId}-reject`}
          >
            Reject
          </Button>
          {onRedraft && (
            <Button size="sm" variant="ghost" disabled={busy} onClick={onRedraft}
              data-testid={`${testId}-redraft`}>
              Re-draft
            </Button>
          )}
          {onRereview && (
            <Button size="sm" variant="ghost" disabled={busy} onClick={onRereview}
              data-testid={`${testId}-rereview`}>
              Re-run review
            </Button>
          )}
          {onReattach && (
            <Button size="sm" variant="ghost" disabled={busy} onClick={onReattach}
              data-testid={`${testId}-reattach`}>
              Move…
            </Button>
          )}
          {onConfirmAttachment && attachState === 'author_only' && (
            <Button size="sm" variant="secondary" disabled={busy} onClick={onConfirmAttachment}
              data-testid={`${testId}-confirm`}>
              Right place
            </Button>
          )}
        </div>
      )}

      {rejecting && !decided && (
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
            <Button size="sm" variant="danger" onClick={() => { onReject(reason); setRejecting(false); }}
              data-testid={`${testId}-reject-confirm`}>
              Reject proposal
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

export default ProposalCard;
