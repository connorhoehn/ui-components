export interface PersonConnection {
    type: string;
    strength: number;
    otherPerson: {
        id: string;
        name: string;
        title: string;
    } | null;
}
/** The person read — the portal's `GET /api/graph/people/:id` shape. */
export interface PersonDetail {
    id: string;
    name: string;
    title: string;
    department: string;
    skills: string[];
    influenceScore: number;
    scoredAt: string | null;
    connections: PersonConnection[];
}
/** One evidence document — the portal's `/evidence` shape. */
export interface PersonEvidenceDocument {
    id: string;
    title: string;
    source: string;
    sourceUri: string | null;
    ingestedAt: string | null;
    mentionCount: number;
}
export interface PersonDetailCardProps {
    /** The person, once read. */
    person: PersonDetail | null | undefined;
    /** Documents that evidence them. */
    evidence?: PersonEvidenceDocument[];
    loading?: boolean;
    /** A failed read: the message to show. */
    error?: string | null;
    onClose: () => void;
    /** Click a connection → add that person to the graph selection. */
    onFocusPerson: (id: string) => void;
    /** "Ask agent" → open the chat pre-seeded with this person. */
    onAsk: (id: string) => void;
    /** Show influence and scored-at (leadership analytics roles only). */
    showInfluence?: boolean;
    /** Evidence timestamps. Default: a short "3h ago" / date. */
    formatTime?: (iso: string) => string;
    /** The ask button's label. Default "Ask agent about <first name> →". */
    askLabel?: (person: PersonDetail) => string;
    /** Default: floats top-right over the graph (`absolute right-3 top-3`). */
    className?: string;
    'data-testid'?: string;
}
export declare function PersonDetailCard({ person, evidence, loading, error, onClose, onFocusPerson, onAsk, showInfluence, formatTime, askLabel, className, 'data-testid': testId, }: PersonDetailCardProps): import("react").JSX.Element;
//# sourceMappingURL=PersonDetailCard.d.ts.map