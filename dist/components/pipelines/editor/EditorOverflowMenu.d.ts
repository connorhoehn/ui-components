export interface EditorOverflowMenuProps {
    isPublished: boolean;
    showTags: boolean;
    hasPublishedVersion: boolean;
    onDuplicate: () => void;
    onCopyMermaid: () => void;
    onViewVersions: () => void;
    onRevert: () => void;
    onToggleShowTags: () => void;
    onViewRunHistory: () => void;
    onClearRunHistory: () => void;
    onSimPanelOpen: () => void;
    onDelete: () => void;
}
export default function EditorOverflowMenu({ isPublished, showTags, hasPublishedVersion, onDuplicate, onCopyMermaid, onViewVersions, onRevert, onToggleShowTags, onViewRunHistory, onClearRunHistory, onSimPanelOpen, onDelete, }: EditorOverflowMenuProps): import("react").JSX.Element;
//# sourceMappingURL=EditorOverflowMenu.d.ts.map