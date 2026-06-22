import { DocumentType } from '../../types/documentType';
export interface DocumentTypeWizardProps {
    initialType?: DocumentType;
    onSave: (type: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
}
export declare function DocumentTypeWizard({ initialType, onSave, onCancel }: DocumentTypeWizardProps): import("react").JSX.Element;
//# sourceMappingURL=DocumentTypeWizard.d.ts.map