import type { DocumentTypeField } from '../../types/documentType';
export interface FieldDefinitionEditorProps {
    field: DocumentTypeField;
    index: number;
    total: number;
    onRename: (name: string) => void;
    onChangeType: (type: string) => void;
    onRemove: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onToggleRequired: () => void;
    onToggleCollapsed: () => void;
}
export declare function FieldDefinitionEditor({ field, index, total, onRename, onChangeType, onRemove, onMoveUp, onMoveDown, onToggleRequired, onToggleCollapsed, }: FieldDefinitionEditorProps): import("react").JSX.Element;
//# sourceMappingURL=FieldDefinitionEditor.d.ts.map