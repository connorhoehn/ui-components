export interface MessageReaction {
    emoji: string;
    /** Who reacted. Drives the count, the "you" state, and the tooltip. */
    userId: string;
    displayName?: string;
}
export interface ReactionChipsProps {
    reactions: readonly MessageReaction[];
    /** The viewer, so their own reactions can be marked and toggled. */
    currentUserId: string;
    onToggle: (emoji: string) => void;
    className?: string;
    'data-testid'?: string;
}
export interface ReactionGroup {
    emoji: string;
    count: number;
    mine: boolean;
    names: string[];
}
/** Groups by emoji, preserving first-seen order so chips do not reshuffle. */
export declare function groupReactions(reactions: readonly MessageReaction[], currentUserId: string): ReactionGroup[];
/** "You and Ada", "Ada, Sam and 3 others" — the tooltip people expect. */
export declare function describeReactors(group: ReactionGroup): string;
export declare function ReactionChips({ reactions, currentUserId, onToggle, className, 'data-testid': testId, }: ReactionChipsProps): import("react").JSX.Element | null;
export default ReactionChips;
//# sourceMappingURL=ReactionChips.d.ts.map