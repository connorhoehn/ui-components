// Change review — the reusable pattern for "here is a document, here are the
// changes waiting on you".
//
// Compose it as: ChangeReviewList (document + count + queue)
//                  └─ ChangeReviewCard (category + author, then where/what)
//                       ├─ ChangeLocation  (WHERE, diff-hunk shaped)
//                       ├─ ChangeDiff      (WHAT, before/after)
//                       └─ VerdictChip     (agent's Pass/Concern/Fail)
//
// The pieces are exported individually because existing review surfaces
// (doc-editor's ProposalCard) adopt them one at a time rather than swapping
// wholesale.

export { ChangeReviewList } from './ChangeReviewList';
export type { ChangeReviewListProps } from './ChangeReviewList';

export { ChangeReviewCard } from './ChangeReviewCard';
export type {
  ChangeReviewCardProps,
  ChangeReviewCardStatus,
  ChangeAuthor,
  ChangeApplyOutcome,
} from './ChangeReviewCard';

export { ChangeLocation } from './ChangeLocation';
export type { ChangeLocationProps } from './ChangeLocation';

export { ChangeDiff } from './ChangeDiff';
export type { ChangeDiffProps, ChangeDiffPair } from './ChangeDiff';

export { VerdictChip } from './VerdictChip';
export type { VerdictChipProps } from './VerdictChip';

export {
  resolveVerdictState,
  VERDICT_LABEL,
  VERDICT_GLYPH,
  VERDICT_TONE,
} from './types';
export type {
  ChangeVerdict,
  ChangeReviewVerdict,
  ChangeReviewStatus,
  VerdictState,
  ResolveVerdictInput,
} from './types';
