export interface NewConversationPerson {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    color?: string;
    /** Secondary line — role, team, or handle. */
    hint?: string;
}
export interface NewConversationPanelProps {
    people: readonly NewConversationPerson[];
    /** Start (or open) a direct conversation with this person. */
    onStartDm: (userId: string) => void | Promise<void>;
    /** Create a channel with this name. Omit to disable channel creation. */
    onCreateChannel?: (name: string) => void | Promise<void>;
    onCancel?: () => void;
    /**
     * Set when the directory fetch FAILED. An empty list and a failed fetch look
     * identical on screen otherwise, and "no one to talk to" is a much stronger
     * claim than "we could not ask".
     */
    peopleError?: string | null;
    busy?: boolean;
    className?: string;
    'data-testid'?: string;
}
/** Channel names are lowercase and hyphenated, like every chat product's. */
export declare function toChannelName(raw: string): string;
export declare function NewConversationPanel({ people, onStartDm, onCreateChannel, onCancel, peopleError, busy, className, 'data-testid': testId, }: NewConversationPanelProps): import("react").JSX.Element;
export default NewConversationPanel;
//# sourceMappingURL=NewConversationPanel.d.ts.map