import { DocumentType } from '../../types/documentType';
interface CookbooksModalProps {
    open: boolean;
    onClose: () => void;
    onCreated: (typeId: string) => void;
    createType: (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => DocumentType;
}
export default function CookbooksModal({ open, onClose, onCreated, createType, }: CookbooksModalProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=CookbooksModal.d.ts.map