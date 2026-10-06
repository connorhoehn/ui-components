export interface DocumentInfo {
    id: string;
    title: string;
    type: string;
    status: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    description?: string;
    activeCallSessionId?: string;
}
export interface PresenceInfo {
    userId: string;
    displayName: string;
    color: string;
    mode?: string;
    idle?: boolean;
}
export interface DocumentListPageProps {
    documents: DocumentInfo[];
    presence: Record<string, PresenceInfo[]>;
    onOpenDocument: (documentId: string) => void;
    onCreateDocument: (meta: {
        title: string;
        type: string;
        description?: string;
    }) => void;
    onDeleteDocument: (documentId: string) => void;
    onJumpToUser: (documentId: string, userId: string) => void;
    hideHeader?: boolean;
}
export default function DocumentListPage({ documents, presence, onOpenDocument, onCreateDocument, onDeleteDocument, onJumpToUser, hideHeader, }: DocumentListPageProps): import("react").JSX.Element;
//# sourceMappingURL=DocumentListPage.d.ts.map