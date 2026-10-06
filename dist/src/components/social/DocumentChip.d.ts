import { type DocumentUnavailableReason } from './DocumentActivityCard';
export interface DocumentChipProps {
    documentId: string;
    label: string;
    /** The document's own icon, when the reference carried one. */
    icon?: string;
    /** Open the document — beside the chat, or wherever the host puts documents. */
    onOpen?: (documentId: string) => void;
    /**
     * The document cannot be reached (`gone`: deleted; `forbidden`: not shared
     * with the viewer). The chip stays, muted and labelled, and is not a link.
     * Since 2.406.0.
     */
    unavailable?: DocumentUnavailableReason;
    className?: string;
    'data-testid'?: string;
}
export declare function DocumentChip({ documentId, label, icon, onOpen, unavailable, className, 'data-testid': testId }: DocumentChipProps): import("react").JSX.Element;
export default DocumentChip;
//# sourceMappingURL=DocumentChip.d.ts.map