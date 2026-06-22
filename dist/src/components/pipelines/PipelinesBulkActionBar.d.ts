export interface PipelinesBulkActionBarProps {
    count: number;
    onClear: () => void;
    onExport: () => void;
    onExportAsJSON: () => void;
    onPublish: () => void;
    onArchive: () => void;
    onAddTag: () => void;
    onRemoveTag: () => void;
    onDelete: () => void;
    onDeleteWithConfirm: () => void;
    addTagOpen: boolean;
    removeTagOpen: boolean;
    onSubmitAddTag: (tag: string) => void;
    onSubmitRemoveTag: (tag: string) => void;
    onCloseAddTag: () => void;
    onCloseRemoveTag: () => void;
    unionTags: string[];
}
export default function PipelinesBulkActionBar({ count, onClear, onExport, onExportAsJSON, onPublish, onArchive, onAddTag, onRemoveTag, onDelete, onDeleteWithConfirm, addTagOpen, removeTagOpen, onSubmitAddTag, onSubmitRemoveTag, onCloseAddTag, onCloseRemoveTag, unionTags, }: PipelinesBulkActionBarProps): import("react").JSX.Element;
//# sourceMappingURL=PipelinesBulkActionBar.d.ts.map