import { type ReactNode } from 'react';
export interface ChannelHeaderProps {
    /** Display name of the channel or user */
    name: string;
    /**
     * Rename the conversation from its own title: double-click it and the
     * heading becomes an input in place. Enter commits, Escape abandons, and
     * blurring commits too — the same bargain every rename-in-place makes.
     *
     * IN PLACE rather than in a dialog. The thing being renamed is right there
     * and it is one field; a centred modal makes you look away from the title
     * to type its new value and then look back to see whether it took. Omit
     * for a viewer who may not rename this — the affordance should not exist
     * where the action would be refused.
     */
    onRename?: (next: string) => void;
    /** Number of members in the channel */
    memberCount?: number;
    /** Short description shown below the name */
    description?: string;
    /**
     * Views of this channel — files, documents, recordings, pinned. Rendered
     * inline beside the name; pass a <Tabs variant="underline" size="md"> (14px, the app's one tab-row step).
     * The header owns no tab state: which one is active is the caller's.
     */
    tabs?: ReactNode;
    /** Right-aligned action area */
    actions?: ReactNode;
    /** Avatar URL; falls back to name initials */
    avatarUrl?: string;
    /** Show green online indicator */
    online?: boolean;
    /** Called when member-count area is clicked */
    onMembersClick?: () => void;
    /**
     * `sm` for a narrow column (a conversation beside a document): one row that
     * never wraps, a 28px avatar, the description dropped. The default `md` is
     * the full-width bar over a chat pane.
     */
    size?: 'md' | 'sm';
    /**
     * Element the bar renders as. Defaults to `'div'`. Pass `'header'` when a
     * host uses this as the page's own site header, so it lands as a `banner`
     * landmark instead of an anonymous `div`.
     */
    as?: 'div' | 'header';
    className?: string;
    'data-testid'?: string;
}
export declare function ChannelHeader({ name, onRename, memberCount, description, tabs, actions, avatarUrl, online, onMembersClick, size, as, className, 'data-testid': testId, }: ChannelHeaderProps): import("react").JSX.Element;
export default ChannelHeader;
//# sourceMappingURL=ChannelHeader.d.ts.map