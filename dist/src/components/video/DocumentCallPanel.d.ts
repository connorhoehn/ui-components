import type { ReactNode } from 'react';
import { type CallPeopleListProps } from './CallPeopleList';
import { type ReviewDocumentListProps } from './ReviewDocumentList';
export interface DocumentCallPanelProps {
    title: string;
    participantCount: number;
    elapsedMs: number | null;
    people: CallPeopleListProps;
    documents: Omit<ReviewDocumentListProps, 'trailing'> & {
        count: number;
        onAdd: () => void;
    };
    /** Who presents which document, or nobody. */
    presenting: {
        documentId: string;
        userId: string;
        name: string;
    } | null;
    /** The document the reader has open — what "Present this document" presents. */
    currentDocumentId: string;
    canPresent: boolean;
    /**
     * Whether the viewer may press Present. True while someone else presents
     * means "take over" (the button stays live, titled "Take over from Alice");
     * false disables it with `presentDisabledReason`.
     */
    /** Title of the disabled Present button, e.g. "Alice is presenting". */
    presentDisabledReason?: string;
    /** A document id to present, or null to stop. */
    onPresent: (documentId: string | null) => void;
    onCopyLink: () => void;
    onManageAccess: () => void;
    onPopOut: () => void;
    onClose: () => void;
    loading?: boolean;
    /** Above everything — e.g. an InlineAlert "Reconnecting to the call…". */
    notice?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function DocumentCallPanel({ title, participantCount, elapsedMs, people, documents, presenting, currentDocumentId, canPresent, presentDisabledReason, onPresent, onCopyLink, onManageAccess, onPopOut, onClose, loading, notice, className, 'data-testid': testId, }: DocumentCallPanelProps): import("react").JSX.Element;
export default DocumentCallPanel;
//# sourceMappingURL=DocumentCallPanel.d.ts.map