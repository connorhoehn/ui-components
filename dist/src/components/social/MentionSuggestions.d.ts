export interface MentionCandidate {
    /** Stable identity — this is what travels in the message, not the label. */
    id: string;
    label: string;
    avatarUrl?: string;
    color?: string;
    /** Shown under the name, e.g. a role or team. */
    hint?: string;
    /**
     * False when the composer knows the chat's members and this person is not
     * one: the row lists under "Not in this chat" and picking it offers to add
     * them rather than mentioning someone who could not read the message.
     */
    member?: boolean;
}
export interface MentionSuggestionsProps {
    items: MentionCandidate[];
    command: (item: {
        id: string;
        label: string;
    }) => void;
    /** Picked a non-member: no mention is inserted; the host opens its add flow. */
    onPickNonMember?: (userId: string) => void;
}
export interface MentionSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}
export declare const MentionSuggestions: import("react").ForwardRefExoticComponent<MentionSuggestionsProps & import("react").RefAttributes<MentionSuggestionsHandle>>;
export default MentionSuggestions;
//# sourceMappingURL=MentionSuggestions.d.ts.map