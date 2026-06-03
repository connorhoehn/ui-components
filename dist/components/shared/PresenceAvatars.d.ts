export interface PresenceUser {
    /** Unique identifier for the user */
    id: string;
    name: string;
    /** Optional avatar image URL */
    avatarUrl?: string;
    online?: boolean;
}
export interface PresenceAvatarsProps {
    users: PresenceUser[];
    /** Maximum avatars to render before "+N" chip (default 5) */
    maxVisible?: number;
    /** Avatar diameter in px (default 28) */
    size?: number;
    /** Called when the "+N" overflow chip is clicked */
    onMoreClick?: () => void;
    className?: string;
}
export declare function PresenceAvatars({ users, maxVisible, size, onMoreClick, className, }: PresenceAvatarsProps): import("react/jsx-runtime").JSX.Element;
export default PresenceAvatars;
//# sourceMappingURL=PresenceAvatars.d.ts.map