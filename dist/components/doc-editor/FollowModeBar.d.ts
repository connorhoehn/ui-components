import type { Participant } from '../../types/document';
interface FollowModeBarProps {
    followingUserId: string | null;
    participants: Participant[];
    onStopFollow: () => void;
}
export default function FollowModeBar({ followingUserId, participants, onStopFollow, }: FollowModeBarProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=FollowModeBar.d.ts.map