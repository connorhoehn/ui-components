// Hangout-related shells live here: ResumeCallDialog (the "you were in
// a call — rejoin?" prompt on app mount) and ActiveCallBanner (the
// non-participant "call in progress — join?" affordance backed by the
// call `status` query).

export { InviteToCallDialog } from './InviteToCallDialog';
export type { InviteToCallDialogProps } from './InviteToCallDialog';

export { InviteCandidateList } from './InviteCandidateList';
export type {
    InviteCandidateListProps,
    InviteCandidateListParts,
    InviteCandidate,
} from './InviteCandidateList';

export { CallPresenceIndicator } from './CallPresenceIndicator';
export type { CallPresenceIndicatorProps } from './CallPresenceIndicator';

export { ActiveCallBanner } from './ActiveCallBanner';
export type {
    ActiveCallBannerProps,
    ActiveCallBannerParticipant,
} from './ActiveCallBanner';

export { ResumeCallDialog } from './ResumeCallDialog';
export type {
    ResumeCallDialogProps,
    ResumeCallParticipant,
} from './ResumeCallDialog';
