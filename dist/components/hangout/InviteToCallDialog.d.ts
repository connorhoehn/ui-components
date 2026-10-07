import { type InviteCandidate } from './InviteCandidateList';
export type { InviteCandidate } from './InviteCandidateList';
export interface InviteToCallDialogProps {
    open: boolean;
    onClose: () => void;
    /** Confirm handler — receives every selected userId. May be async;
     *  the caller flips `loading` while the invites are in flight. */
    onInvite: (userIds: string[]) => void | Promise<void>;
    /** Everyone invitable, including people already on the call (they
     *  render disabled). */
    candidates: InviteCandidate[];
    /** Human label for the call being invited to, shown in the subtitle. */
    lobbyLabel?: string;
    loading?: boolean;
    /** Optional join URL. Rooms are link-shareable, so the picker is the
     *  natural home for that link — it is the one place the user goes
     *  when they want more people here. Previously this lived in a
     *  full-bleed overlay across the call tiles, which covered the video
     *  and read as a rendering bug. */
    shareLink?: string;
}
export declare function InviteToCallDialog({ open, onClose, onInvite, candidates, lobbyLabel, loading, shareLink, }: InviteToCallDialogProps): import("react").JSX.Element;
export default InviteToCallDialog;
//# sourceMappingURL=InviteToCallDialog.d.ts.map