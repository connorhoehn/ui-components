import type { Participant } from '../../types/document';
/** The slice of a gateway presence entry this reads. Structural: any roster entry fits. */
export interface DeckRosterEntry {
    clientId: string;
    status?: string;
    metadata?: Record<string, unknown> | undefined;
    timestamp?: string | number;
    lastSeen?: string | number;
}
export interface DeckViewer {
    /** The person's id (their user id, else the socket's client id). */
    id: string;
    clientId: string;
    name: string;
    avatarUrl?: string;
    idle?: boolean;
    /** "editing this deck" / "on this deck" / "viewing this deck". */
    detail: string;
    /** The title of the slide they are on, when `slideTitle` knows it. */
    location?: string;
    slideId?: string;
    editing?: boolean;
}
export interface DeckPresence {
    /** Everyone else on the deck, one per person (their most recent tab), by name. */
    viewers: DeckViewer[];
    /** The same people as `FollowModeBar` participants (`currentSectionId` = their slide id). */
    participants: Participant[];
    /** Slide id → the people on it, for the filmstrip. */
    slideViewers: Record<string, DeckViewer[]>;
    /** I have unsaved edits to this deck in another tab. */
    editingElsewhere: boolean;
}
export declare const EMPTY_DECK_PRESENCE: DeckPresence;
export declare const deckPresenceChannel: (documentId: string) => string;
/** The roster as viewers: others only, one per person, the newest entry winning. */
export declare function deckViewersOf(roster: readonly DeckRosterEntry[], documentId: string, ownClientId: string | null, slideTitle?: (slideId: string) => string | undefined): DeckViewer[];
/** True when another tab of mine (same user, another socket) has unsaved edits to this deck. */
export declare function editingInMyOtherTab(roster: readonly DeckRosterEntry[], documentId: string, ownClientId: string | null): boolean;
/** A viewer as the `FollowModeBar` participant it follows. */
export declare function deckViewerToParticipant(viewer: DeckViewer, entry?: DeckRosterEntry): Participant;
export interface UseDeckPresenceOptions {
    /** The `doc:<documentId>` channel's roster (from realtime-modules `usePresence`). */
    roster: readonly DeckRosterEntry[];
    /** This socket's client id (`useGateway().clientId`). */
    ownClientId: string | null;
    /** Merges into this socket's presence metadata (`usePresence(...).updateMetadata`). Keep it referentially stable. */
    updateMetadata: (metadata: Record<string, unknown>) => void;
    documentId: string;
    /** The slide on this tab's stage; `null` for none. */
    selectedSlideId: string | null;
    /** "Slide 3 · Delivery", for the byline card. Keep it referentially stable. */
    slideTitle?: (slideId: string) => string | undefined;
    /** This tab has unsaved edits — peers' Save warns while it does. */
    editing?: boolean;
}
/**
 * Publishes this tab's slide and editing state, and derives everyone else's.
 * Leaving (unmount) clears both so peers are told.
 */
export declare function useDeckPresence(options: UseDeckPresenceOptions): DeckPresence;
//# sourceMappingURL=useDeckPresence.d.ts.map