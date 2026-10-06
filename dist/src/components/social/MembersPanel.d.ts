export interface ChatMember {
    id: string;
    name: string;
    avatarUrl?: string;
    role: 'owner' | 'member';
    /** ISO. */
    addedAt?: string;
}
export interface MembersPanelProps {
    members: readonly ChatMember[];
    /** True when the channel gates nobody — everyone in the org can read it. */
    open?: boolean;
    /** The viewer may add and remove (an owner). */
    canManage?: boolean;
    currentUserId?: string;
    /**
     * "Add people". Receives the button that was pressed, so the host can open
     * an anchored form beside it rather than a centred modal.
     */
    onAdd?: (trigger?: HTMLElement) => void;
    onRemove?: (userId: string) => void;
    className?: string;
    'data-testid'?: string;
}
export declare function MembersPanel({ members, open, canManage, currentUserId, onAdd, onRemove, className, 'data-testid': testId, }: MembersPanelProps): import("react").JSX.Element;
export default MembersPanel;
//# sourceMappingURL=MembersPanel.d.ts.map