import type { PipelineDefinition } from '../../../types/pipeline';
export interface EditorTopBarProps {
    pipelineId: string;
    definition: PipelineDefinition;
    dirty: boolean;
    savingFlash: boolean;
    isRunActive: boolean;
    isTriggering: boolean;
    runDisabled: boolean;
    runTitle: string;
    currentRun?: {
        status: string;
        durationMs?: number;
        error?: {
            nodeId?: string;
        };
        steps: Record<string, {
            status: string;
        }>;
        startedAt: string;
    };
    breakpoints: Set<string>;
    onRunClick: () => void;
    onDebugRunClick: () => void;
    onExport: () => void;
    onPublishClick: () => void;
    onDuplicate: () => void;
    onCopyMermaid: () => void;
    onViewVersions: () => void;
    onRevert: () => void;
    onToggleShowTags: () => void;
    showTags: boolean;
    onViewRunHistory: () => void;
    onClearRunHistory: () => void;
    onSimPanelOpen: () => void;
    onDelete: () => void;
}
export default function EditorTopBar({ pipelineId, definition, dirty, savingFlash, isRunActive, isTriggering, runDisabled, runTitle, currentRun, breakpoints, onRunClick, onDebugRunClick, onExport, onPublishClick, onDuplicate, onCopyMermaid, onViewVersions, onRevert, onToggleShowTags, showTags, onViewRunHistory, onClearRunHistory, onSimPanelOpen, onDelete, }: EditorTopBarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EditorTopBar.d.ts.map