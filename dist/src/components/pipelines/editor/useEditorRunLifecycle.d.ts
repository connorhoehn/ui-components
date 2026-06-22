import { PipelineDefinition, PipelineRunError } from '../../../types/pipeline';
declare function lookupStepName(definition: PipelineDefinition | null, nodeId: string | undefined): string;
export { lookupStepName };
export interface UseEditorRunLifecycleReturn {
    currentRunId: string | null;
    setCurrentRunId: (id: string | null) => void;
    activeError: PipelineRunError | null;
    setActiveError: (err: PipelineRunError | null) => void;
    errorNodeAnchor: {
        x: number;
        y: number;
    } | null;
    handleDismissError: () => void;
    handleErrorNodePosition: (pos: {
        x: number;
        y: number;
    } | null) => void;
    handleRetryFromError: () => void;
    handleRunClick: () => Promise<void>;
    handleTriggerInputSubmit: () => void;
    isRunActive: boolean;
    runDisabled: boolean;
    runTitle: string;
    isTriggering: boolean;
    triggerInputOpen: boolean;
    setTriggerInputOpen: (open: boolean) => void;
    triggerInputValues: Record<string, string>;
    setTriggerInputValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    breakpoints: Set<string>;
    handleToggleBreakpoint: (nodeId: string) => void;
    handleDebugRunClick: () => Promise<void>;
    pausedBreakpoint: {
        runId: string;
        stepId: string;
    } | null;
    handleBreakpointContinue: () => void;
    handleBreakpointStepOver: () => void;
    handleBreakpointResumeAll: () => void;
    handleApplyAndContinue: () => Promise<void>;
    handleRevertPatch: (patchId: string) => Promise<void>;
    applyingPatch: boolean;
    revertingPatchId: string | null;
    dirtyPatch: Record<string, unknown> | null;
    dirtyPatchStepId: string | null;
    handleContextEditBufferChange: (stepId: string, buffer: Record<string, unknown> | null) => void;
    resetEditBufferKey: number;
    sidebarTab: 'config' | 'runs';
    setSidebarTab: (tab: 'config' | 'runs') => void;
}
export declare function useEditorRunLifecycle(pipelineId: string): UseEditorRunLifecycleReturn;
//# sourceMappingURL=useEditorRunLifecycle.d.ts.map