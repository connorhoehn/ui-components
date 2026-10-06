export interface CallPerson {
    userId: string;
    name: string;
    avatarUrl?: string;
    color?: string;
    isLocal: boolean;
    isHost: boolean;
    presence?: 'online' | 'away' | 'offline';
    state: 'in-call' | 'ringing' | 'notified' | 'missed' | 'declined' | 'left' | 'reconnecting';
    audioOn: boolean;
    cameraOn: boolean;
    screenSharing: boolean;
    presenting: boolean;
}
export interface CallPeopleListProps {
    people: CallPerson[];
    /** The number in the heading badge (people in the call). */
    count: number;
    followingUserId?: string | null;
    /** Host controls: Mute, Remove from call, Make host. */
    canModerate: boolean;
    onInvite: () => void;
    onFollow: (userId: string | null) => void;
    onMuteForMe: (userId: string) => void;
    onMute?: (userId: string) => void;
    onRemove?: (userId: string) => void;
    onMakeHost?: (userId: string) => void;
    onRingAgain?: (userId: string) => void;
    /** Your own row's ⋯ menu (2.391.1, mockup 06): "Call settings". */
    onOpenSelfSettings?: () => void;
    /** Your own row's ⋯ menu: "Leave call". */
    onLeave?: () => void;
    /** Hide the "People N · Invite…" heading (a host that draws its own). */
    hideHeading?: boolean;
    className?: string;
    'data-testid'?: string;
}
export interface CallPersonStatus {
    label: string;
    tone: 'accent' | 'muted' | 'warning';
    kind: 'presenting' | 'sharing' | 'camera-off' | 'reconnecting' | 'ringing' | 'notified' | 'missed' | 'declined' | 'left' | 'host' | 'none';
}
/** The one sub-status a row shows. Exported for hosts and tests. */
export declare function callPersonStatus(p: CallPerson): CallPersonStatus;
export declare function CallPeopleList({ people, count, followingUserId, canModerate, onInvite, onFollow, onMuteForMe, onMute, onRemove, onMakeHost, onRingAgain, onOpenSelfSettings, onLeave, hideHeading, className, 'data-testid': testId, }: CallPeopleListProps): import("react").JSX.Element;
export default CallPeopleList;
//# sourceMappingURL=CallPeopleList.d.ts.map