// src/components/change-review/types.ts
//
// The change-review contract. Plain TypeScript interfaces, deliberately no
// runtime schema library — this repo bans them, and the producer of these
// values is a separate service, so the only thing a schema library would buy
// here is a second place for the shape to drift.
//
// This file is shared with the backend that produces verdicts. Treat every
// field as load-bearing.

/** An agent's judgement on a single proposed change. */
export type ChangeVerdict = 'pass' | 'concern' | 'fail';

export interface ChangeReviewVerdict {
  verdict: ChangeVerdict;
  /** One line, always shown beside the chip. */
  headline: string;
  /** Expandable detail. Absent when the model gave none — render nothing, not "no reasoning". */
  reasoning?: string;
  producedAt: string; // ISO
  /** The change revision this verdict was computed against. */
  forRevision: string;
}

/**
 * How the review itself is going, independent of what it concluded.
 *
 * Separate from `ChangeReviewVerdict` because "we have not asked yet", "we are
 * asking" and "asking failed" are three different things to a reviewer, and
 * none of them is a verdict. Folding them into an optional verdict field would
 * make the absent case ambiguous.
 */
export type ChangeReviewStatus = 'idle' | 'pending' | 'failed';

/**
 * What the UI actually renders. Derived — never passed in directly, so a host
 * cannot claim `ready` for a verdict that is out of date.
 */
export type VerdictState = 'absent' | 'pending' | 'failed' | 'stale' | 'ready';

export interface ResolveVerdictInput {
  verdict?: ChangeReviewVerdict | undefined;
  status?: ChangeReviewStatus | undefined;
  /**
   * The revision of the change as it stands NOW. When this and the verdict's
   * `forRevision` disagree, the verdict describes a change that no longer
   * exists in that form.
   */
  revision?: string | undefined;
}

/**
 * Decide which of the five states to paint.
 *
 * The staleness rule is the reason this function exists. A cached "Pass"
 * computed against an earlier draft of a change is not a weaker Pass — it is a
 * statement about a different change, and showing it as a live Pass is how a
 * reviewer approves something no agent ever looked at. So the comparison is
 * exact-match on `forRevision`, and any disagreement demotes to `stale`.
 *
 * `pending` outranks `stale`: if a fresh review is already in flight, "checking
 * this now" is more useful than "the old answer is out of date", and the
 * pending state does not show the old verdict's colour either way.
 *
 * A missing `revision` means the host cannot tell us what the change's current
 * revision is. We do NOT silently treat that as fresh — but we also cannot call
 * it stale without evidence, so it renders `ready`. Hosts that care about
 * staleness must pass `revision`; that is documented on every consumer prop.
 */
export function resolveVerdictState({
  verdict,
  status = 'idle',
  revision,
}: ResolveVerdictInput): VerdictState {
  if (status === 'pending') return 'pending';
  if (status === 'failed') return 'failed';
  if (!verdict) return 'absent';
  if (revision != null && verdict.forRevision !== revision) return 'stale';
  return 'ready';
}

/** Human label per verdict. Always rendered — the chip must never be colour-only. */
export const VERDICT_LABEL: Record<ChangeVerdict, string> = {
  pass: 'Pass',
  concern: 'Concern',
  fail: 'Fail',
};

/**
 * Glyph per verdict, as a second non-colour channel.
 *
 * Check / bang / cross are distinguishable in monochrome and at small sizes,
 * which is the whole point: the accessibility requirement is not "add an icon",
 * it is "a reader who sees no colour still gets the verdict".
 */
export const VERDICT_GLYPH: Record<ChangeVerdict, string> = {
  pass: '✓',
  concern: '!',
  fail: '✕',
};

/** Tone per verdict, resolved through the library-wide semantic scale. */
export const VERDICT_TONE = {
  pass: 'success',
  concern: 'caution',
  fail: 'danger',
} as const;
