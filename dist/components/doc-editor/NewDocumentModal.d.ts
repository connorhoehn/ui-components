export interface NewDocumentModalProps {
    open: boolean;
    onClose: () => void;
    onCreate: (meta: {
        title: string;
        type: string;
        description?: string;
        icon: string;
        documentTypeId: string;
    }) => void;
}
export default function NewDocumentModal({ open, onClose, onCreate }: NewDocumentModalProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=NewDocumentModal.d.ts.map