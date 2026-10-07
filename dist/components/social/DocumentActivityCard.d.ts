export interface DocumentActivityEditor {
    userId: string;
    displayName?: string;
    avatarUrl?: string;
}
export interface DocumentActivityCardProps {
    documentId: string;
    title: string;
    /** Emoji or short glyph from the document's type. */
    icon?: string;
    /** Who created it — a display name, never a raw userId. */
    createdBy?: string;
    /** People in the document right now. Empty means nobody. */
    editors?: readonly DocumentActivityEditor[];
    /**
     * Opens the document. Omit and the card is a record rather than a dead
     * button — a document the viewer cannot reach should not offer a way in.
     */
    onOpen?: (documentId: string) => void;
    /**
     * The document behind the card can no longer be reached: `gone` (it was
     * deleted — the server answers 404) or `forbidden` (it exists but the viewer
     * may not read it). The card stays as a record of what was shared, muted,
     * says which, and offers no way in — a live "Open" onto a 404 is the bug.
     * Since 2.406.0.
     */
    unavailable?: DocumentUnavailableReason;
    className?: string;
    'data-testid'?: string;
}
/** Why a referenced document cannot be opened. */
export type DocumentUnavailableReason = 'gone' | 'forbidden';
/** The words a card or chip uses for an unreachable document. */
export declare function documentUnavailableLabel(reason: DocumentUnavailableReason): string;
export declare function DocumentActivityCard({ documentId, title, icon, createdBy, editors, onOpen, unavailable, className, 'data-testid': testId, }: DocumentActivityCardProps): import("react").JSX.Element;
export default DocumentActivityCard;
//# sourceMappingURL=DocumentActivityCard.d.ts.map