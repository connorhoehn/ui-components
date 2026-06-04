import type { ReactNode } from 'react';
export interface ChannelHeaderProps {
    /** Display name of the channel or user */
    name: string;
    /** Number of members in the channel */
    memberCount?: number;
    /** Short description shown below the name */
    description?: string;
    /** Right-aligned action area */
    actions?: ReactNode;
    /** Avatar URL; falls back to name initials */
    avatarUrl?: string;
    /** Show green online indicator */
    online?: boolean;
    /** Called when member-count area is clicked */
    onMembersClick?: () => void;
    className?: string;
}
export declare function ChannelHeader({ name, memberCount, description, actions, avatarUrl, online, onMembersClick, className, }: ChannelHeaderProps): import("react/jsx-runtime").JSX.Element;
export default ChannelHeader;
//# sourceMappingURL=ChannelHeader.d.ts.map