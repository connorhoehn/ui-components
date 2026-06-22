import { Participant } from '../../types/document';
interface ParticipantAvatarsProps {
    participants: Participant[];
    sections?: {
        id: string;
        title: string;
    }[];
    onJumpToUser?: (participant: Participant) => void;
    onFollowUser?: (participant: Participant) => void;
    followingUserId?: string | null;
}
export default function ParticipantAvatars({ participants, sections, onJumpToUser, onFollowUser, followingUserId, }: ParticipantAvatarsProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=ParticipantAvatars.d.ts.map