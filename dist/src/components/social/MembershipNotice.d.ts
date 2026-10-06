export type MembershipHistoryMode = 'none' | 'days' | 'all';
export interface MembershipHistory {
    mode: MembershipHistoryMode;
    days?: number;
}
export interface MembershipRef {
    event: 'added' | 'removed';
    actorId: string;
    actorName?: string;
    userIds: string[];
    names?: string[];
    history?: MembershipHistory;
}
export interface MembershipNoticeProps {
    membership: MembershipRef;
    /** The message text — what the line says when the names are missing. */
    fallbackText?: string;
    timestamp?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function describeMembershipHistory(history: MembershipHistory | undefined): string;
/** The sentence the line shows; the fallback when the names are not on the wire. */
export declare function describeMembership(ref: MembershipRef, fallbackText?: string): string;
export declare function MembershipNotice({ membership, fallbackText, timestamp, className, 'data-testid': testId, }: MembershipNoticeProps): import("react").JSX.Element;
export default MembershipNotice;
//# sourceMappingURL=MembershipNotice.d.ts.map