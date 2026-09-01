/**
 * Which authoring surface a new document opens in.
 *
 * `page` becomes `meta.schemaVersion = 2` on the document's CRDT — the one
 * gate the editor branches on. Doing that translation is the host's job, not
 * this modal's; the modal only reports which shape the person chose.
 */
export type DocumentShape = 'page' | 'sections';
export interface NewDocumentModalProps {
    open: boolean;
    onClose: () => void;
    onCreate: (meta: {
        title: string;
        type: string;
        description?: string;
        icon: string;
        documentTypeId: string;
        shape: DocumentShape;
    }) => void;
}
export default function NewDocumentModal({ open, onClose, onCreate }: NewDocumentModalProps): import("react").JSX.Element | null;
//# sourceMappingURL=NewDocumentModal.d.ts.map