import type { DocumentType } from '../../types/documentType';
import '../../renderers';
export interface DocumentTypeWizardProps {
    initialType?: DocumentType;
    onSave: (type: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
}
export declare function DocumentTypeWizard({ initialType, onSave, onCancel }: DocumentTypeWizardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DocumentTypeWizard.d.ts.map