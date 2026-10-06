export interface ActivePerson {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    /** What they are doing right now — "In a call", "Editing the roadmap". A tooltip, and a small glyph on the bubble. */
    activity?: string;
    /** In a live call right now: the bubble gets a ring and the tile a small live marker. */
    inCall?: boolean;
    status?: 'online' | 'busy' | 'away';
    /** Voluntary work sharing is independent from presence and call state. */
    workSharing?: {
        state: 'active' | 'historical';
        fresh: boolean;
    };
}
export interface ActivePeopleGridProps {
    people: readonly ActivePerson[];
    /** Beyond this many, the rest collapse into a "+N" tile. Default 8. */
    maxVisible?: number;
    /** Clicking a tile — the host opens a chat with them. */
    onSelectPerson?: (userId: string) => void;
    /** Clicking the "+N" tile. Without it, the tile is inert text rather than a button. */
    onShowAll?: () => void;
    /** Opens this person's server-filtered shared work graph. */
    onSelectSharedWork?: (userId: string) => void;
    emptyLabel?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function ActivePeopleGrid({ people, maxVisible, onSelectPerson, onShowAll, onSelectSharedWork, emptyLabel, className, 'data-testid': testId, }: ActivePeopleGridProps): import("react").JSX.Element;
export default ActivePeopleGrid;
//# sourceMappingURL=ActivePeopleGrid.d.ts.map