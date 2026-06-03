import type { PipelineDefinition } from '../../types/pipeline';
export interface EditorModalsProps {
    publishConfirmOpen: boolean;
    onPublishClose: () => void;
    onPublishConfirm: () => void;
    hasErrors: boolean;
    validationErrorCount: number;
    definitionName: string;
    definitionVersion: number;
    deleteConfirmOpen: boolean;
    onDeleteClose: () => void;
    onDeleteConfirm: () => void;
    clearRunsConfirmOpen: boolean;
    onClearRunsClose: () => void;
    onClearRunsConfirm: () => void;
    versionDiffOpen: boolean;
    onVersionDiffClose: () => void;
    currentDef: PipelineDefinition;
    publishedDef: PipelineDefinition | null;
    onJumpToNode: (nodeId: string) => void;
    simPanelOpen: boolean;
    onSimPanelClose: () => void;
}
export default function EditorModals(props: EditorModalsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EditorModals.d.ts.map