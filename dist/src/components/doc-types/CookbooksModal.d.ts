import type { DocumentType } from '../../types/documentType';
import type { SaveOutcome } from '../../hooks/useDocumentTypes';
interface CookbooksModalProps {
    open: boolean;
    onClose: () => void;
    onCreated: (typeId: string) => void;
    /**
     * Persists the picked cookbook. Async and fallible: `rejected` means the
     * server refused the payload and NOTHING was saved, so the modal must not
     * report success. `offline` did save locally, so it counts as created.
     */
    createType: (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => Promise<SaveOutcome>;
}
export default function CookbooksModal({ open, onClose, onCreated, createType, }: CookbooksModalProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=CookbooksModal.d.ts.map