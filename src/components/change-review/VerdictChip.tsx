// src/components/change-review/VerdictChip.tsx
//
// The agent's verdict on one change: a chip, a one-line headline, and the
// reasoning behind it folded away until asked for.
//
// Collapsed by default on purpose. The reviewer's job is to decide, and a
// paragraph of model reasoning printed above the diff turns a three-second
// decision into a reading task. The headline is the summary; the reasoning is
// there for the one change in ten where the headline is not enough.
//
// FIVE STATES, ALL VISIBLE
//
// A verdict UI that renders nothing when there is no verdict teaches reviewers
// that "no chip" means "fine". It does not — it means nobody looked. So every
// state paints something:
//
//   ready    the verdict, in its tone
//   stale    the verdict, DE-EMPHASISED, labelled as computed against an older
//            revision of this change
//   pending  a review is in flight
//   failed   the review could not be produced, with the reason
//   absent   nothing has reviewed this yet, said plainly
//
// `stale` is the one that matters most. A confidently wrong "Pass" on a change
// that has since been edited is worse than no verdict at all, so the stale
// chip drops the verdict's colour entirely, goes neutral, and leads with the
// staleness rather than the conclusion.

import { useId, useState } from 'react';
import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import {
  resolveVerdictState,
  VERDICT_GLYPH,
  VERDICT_LABEL,
  VERDICT_TONE,
  type ChangeReviewStatus,
  type ChangeReviewVerdict,
} from './types';

export interface VerdictChipProps {
  verdict?: ChangeReviewVerdict | undefined;
  /** How the review itself is going. Defaults to `idle`. */
  status?: ChangeReviewStatus | undefined;
  /** Why the review failed. Shown verbatim when `status` is `failed`. */
  error?: string | undefined;
  /**
   * The change's CURRENT revision. Pass it, or staleness cannot be detected
   * and an out-of-date verdict will render as if it still applies.
   */
  revision?: string | undefined;
  /** Start with the reasoning open. Default false — see the note above. */
  defaultExpanded?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function VerdictChip({
  verdict,
  status = 'idle',
  error,
  revision,
  defaultExpanded = false,
  className,
  'data-testid': testId = 'verdict',
}: VerdictChipProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const panelId = useId();

  const state = resolveVerdictState({ verdict, status, revision });

  // Only a verdict we are willing to stand behind gets to expand. A stale one
  // still expands — the reasoning is the evidence for WHY it should be re-run —
  // but the pending/failed/absent states have nothing to unfold.
  const hasReasoning = (state === 'ready' || state === 'stale') && !!verdict?.reasoning;

  return (
    <div
      data-testid={testId}
      data-verdict-state={state}
      data-verdict={verdict?.verdict ?? ''}
      className={cn('flex flex-col gap-1', className)}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {state === 'ready' && verdict && (
          <Chip
            tone={VERDICT_TONE[verdict.verdict]}
            size="sm"
            uppercase
            data-testid={`${testId}-chip`}
          >
            {/* Glyph AND word. Either alone would be a colour-adjacent signal;
                together they survive monochrome and small type. */}
            <span aria-hidden>{VERDICT_GLYPH[verdict.verdict]}</span>{' '}
            {VERDICT_LABEL[verdict.verdict]}
          </Chip>
        )}

        {state === 'stale' && verdict && (
          // Neutral, not the verdict's tone. The reviewer must not read a green
          // chip here — the conclusion is reported as history, not as advice.
          <Chip tone="neutral" size="sm" uppercase data-testid={`${testId}-chip`}>
            Out of date
          </Chip>
        )}

        {state === 'pending' && (
          <Chip tone="info" size="sm" uppercase dot="pulse" data-testid={`${testId}-chip`}>
            Reviewing
          </Chip>
        )}

        {state === 'failed' && (
          <Chip tone="warning" size="sm" uppercase data-testid={`${testId}-chip`}>
            Review failed
          </Chip>
        )}

        {state === 'absent' && (
          <Chip tone="neutral" size="sm" uppercase data-testid={`${testId}-chip`}>
            Not reviewed
          </Chip>
        )}

        <span
          className={cn(
            'min-w-0 text-xs',
            state === 'stale' ? 'text-text-tertiary' : 'text-text-secondary',
          )}
          data-testid={`${testId}-headline`}
        >
          {state === 'ready' && verdict?.headline}
          {state === 'stale' && verdict && (
            <>
              Was “{VERDICT_LABEL[verdict.verdict]}” against an earlier version of this change.
            </>
          )}
          {state === 'pending' && 'Checking this change…'}
          {state === 'failed' && (error || 'The reviewer could not be reached.')}
          {state === 'absent' && 'No agent has reviewed this change.'}
        </span>

        {hasReasoning && (
          <button
            data-ui-part=""
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={panelId}
            className={cn(
              'shrink-0 rounded border border-border bg-surface px-1.5 py-px text-[10px]',
              'cursor-pointer text-text-secondary hover:border-border-emphasis hover:text-text-primary',
            )}
            data-testid={`${testId}-toggle`}
          >
            {expanded ? 'Hide reasoning' : 'Why?'}
          </button>
        )}
      </div>

      {/* A stale verdict says what to DO about it, not just that it is old.
          Without this line the reviewer is left holding a chip they cannot
          act on. */}
      {state === 'stale' && (
        <p className="m-0 text-[11px] text-text-tertiary" data-testid={`${testId}-stale-note`}>
          This change has been edited since it was reviewed. Re-run the review before trusting it.
        </p>
      )}

      {hasReasoning && expanded && (
        <div
          id={panelId}
          data-testid={`${testId}-reasoning`}
          className={cn(
            'rounded border border-border bg-surface-inset px-2 py-1.5 text-xs',
            state === 'stale' ? 'text-text-tertiary' : 'text-text-secondary',
          )}
        >
          {verdict?.reasoning}
        </div>
      )}
    </div>
  );
}

export default VerdictChip;
