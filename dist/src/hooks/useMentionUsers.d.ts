import { Participant } from '../types/document';
import { UserGroup } from '../data/userDirectory';
export interface MentionUser {
    userId: string;
    displayName: string;
    color: string;
    online: boolean;
    mode?: string;
    type: 'user' | 'group';
    memberCount?: number;
}
/**
 * Aggregate mention-able users from awareness (online) + user directory (offline) + groups.
 * Online users appear first, then offline users, then groups.
 */
export declare function useMentionUsers(participants: Participant[]): MentionUser[];
export type { UserGroup };
//# sourceMappingURL=useMentionUsers.d.ts.map