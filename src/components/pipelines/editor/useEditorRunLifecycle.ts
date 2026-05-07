// src/components/pipelines/editor/useEditorRunLifecycle.ts
//
// Custom hook encapsulating the pipeline run lifecycle: event listeners for
// run started/completed/failed/cancelled, breakpoint handling, approval
// requests, error drill-down state, and the trigger/cancel actions.

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePipelineRuns } from '../context/PipelineRunsContext';
import { useEventStream } from '../context/EventStreamContext';
import type { WildcardEvent } from '../context/EventStreamContext';
import { usePipelineEditor } from '../context/PipelineEditorContext';
import { useToast } from '../../shared/ToastProvider';
import {
  applyPatch,
  revertPatch,
  PatchValidationRejectedError,
  PatchHttpError,
} from '../../../api/pipelineBreakpointPatch';
import type {
  PipelineDefinition,
  PipelineEventMap,
  PipelineRunError,
} from '../../../types/pipeline';

// Human-readable name for a node — prefer `data.label` (Condition) when set,
// otherwise capitalize the node type. Falls back to the nodeId if the node
// can't be located in the current definition.
function lookupStepName(
  definition: PipelineDefinition | null,
  nodeId: string | undefined,
): string {
  if (!nodeId) return 'step';
  const node = definition?.nodes.find((n) => n.id === nodeId);
  if (!node) return nodeId;
  if (node.data.type === 'condition' && node.data.label) return node.data.label;
  return node.type.charAt(0).toUpperCase() + node.type.slice(1);
}

export { lookupStepName };

export interface UseEditorRunLifecycleReturn {
  currentRunId: string | null;
  setCurrentRunId: (id: string | null) => void;
  activeError: PipelineRunError | null;
  setActiveError: (err: PipelineRunError | null) => void;
  errorNodeAnchor: { x: number; y: number } | null;
  handleDismissError: () => void;
  handleErrorNodePosition: (pos: { x: number; y: number } | null) => void;
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
  // Breakpoints
  breakpoints: Set<string>;
  handleToggleBreakpoint: (nodeId: string) => void;
  handleDebugRunClick: () => Promise<void>;
  pausedBreakpoint: { runId: string; stepId: string } | null;
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
  // Sidebar tab
  sidebarTab: 'config' | 'runs';
  setSidebarTab: (tab: 'config' | 'runs') => void;
}

export function useEditorRunLifecycle(pipelineId: string): UseEditorRunLifecycleReturn {
  const runs = usePipelineRuns();
  const { toast } = useToast();
  const { definition, selectedNodeId, setSelectedNodeId } = usePipelineEditor();

  // ── Run-lifecycle toasts ──────────────────────────────────────────────
  const runsRef = useRef(runs.runs);
  useEffect(() => {
    runsRef.current = runs.runs;
  }, [runs.runs]);

  const definitionRef = useRef(definition);
  useEffect(() => {
    definitionRef.current = definition;
  }, [definition]);

  const belongsToPipeline = useCallback(
    (runId: string | undefined): boolean => {
      if (!runId) return false;
      return runsRef.current[runId]?.pipelineId === pipelineId;
    },
    [pipelineId],
  );

  // ── Error drill-down state ──────────────────────────────────────────────
  const [activeError, setActiveError] = useState<PipelineRunError | null>(null);
  const [errorNodeAnchor, setErrorNodeAnchor] = useState<{ x: number; y: number } | null>(null);

  const handleDismissError = useCallback(() => {
    setActiveError(null);
    setErrorNodeAnchor(null);
  }, []);

  const handleErrorNodePosition = useCallback(
    (pos: { x: number; y: number } | null) => {
      setErrorNodeAnchor(pos);
    },
    [],
  );

  const handleRunStarted = useCallback(
    (
      payload:
        | PipelineEventMap['pipeline.run.started']
        | WildcardEvent,
    ) => {
      if ('eventType' in payload) return;
      if (payload.pipelineId !== pipelineId) return;
      toast('Run started', { type: 'info' });
      setActiveError(null);
      setErrorNodeAnchor(null);
    },
    [pipelineId, toast],
  );

  const handleRunCompleted = useCallback(
    (
      payload:
        | PipelineEventMap['pipeline.run.completed']
        | WildcardEvent,
    ) => {
      if ('eventType' in payload) return;
      if (!belongsToPipeline(payload.runId)) return;
      const seconds = Math.round(payload.durationMs / 100) / 10;
      toast(`Run completed in ${seconds}s`, { type: 'success' });
    },
    [belongsToPipeline, toast],
  );

  const handleRunFailed = useCallback(
    (
      payload:
        | PipelineEventMap['pipeline.run.failed']
        | WildcardEvent,
    ) => {
      if ('eventType' in payload) return;
      if (!belongsToPipeline(payload.runId)) return;
      const failedNodeId = payload.error.nodeId;
      const stepName = lookupStepName(definitionRef.current, failedNodeId);
      toast(`Run failed at ${stepName}`, {
        type: 'error',
        durationMs: 8000,
        actionLabel: 'View',
        onAction: () => setSelectedNodeId(failedNodeId),
      });
      setActiveError(payload.error);
    },
    [belongsToPipeline, setSelectedNodeId, toast],
  );

  const handleRunCancelled = useCallback(
    (
      payload:
        | PipelineEventMap['pipeline.run.cancelled']
        | WildcardEvent,
    ) => {
      if ('eventType' in payload) return;
      if (!belongsToPipeline(payload.runId)) return;
      toast('Run cancelled', { type: 'warning' });
    },
    [belongsToPipeline, toast],
  );

  const handleApprovalRequested = useCallback(
    (
      payload:
        | PipelineEventMap['pipeline.approval.requested']
        | WildcardEvent,
    ) => {
      if ('eventType' in payload) return;
      if (!belongsToPipeline(payload.runId)) return;
      const stepId = payload.stepId;
      const stepName = lookupStepName(definitionRef.current, stepId);
      toast(`Approval requested on "${stepName}"`, {
        type: 'warning',
        durationMs: 6000,
        actionLabel: 'Resolve',
        onAction: () => setSelectedNodeId(stepId),
      });
    },
    [belongsToPipeline, setSelectedNodeId, toast],
  );

  useEventStream('pipeline.run.started', handleRunStarted);
  useEventStream('pipeline.run.completed', handleRunCompleted);
  useEventStream('pipeline.run.failed', handleRunFailed);
  useEventStream('pipeline.run.cancelled', handleRunCancelled);
  useEventStream('pipeline.approval.requested', handleApprovalRequested);

  // ── Current run tracking ──────────────────────────────────────────────
  const [currentRunId, setCurrentRunId] = useState<string | null>(null);

  useEffect(() => {
    if (runs.activeRunIds.length > 0) {
      const lastActive = runs.activeRunIds[runs.activeRunIds.length - 1];
      if (lastActive !== currentRunId) setCurrentRunId(lastActive);
      return;
    }
    if (!currentRunId) {
      const all = Object.values(runs.runs).sort((a, b) =>
        b.startedAt.localeCompare(a.startedAt),
      );
      if (all.length > 0) setCurrentRunId(all[0].id);
    }
  }, [runs.activeRunIds, runs.runs, currentRunId]);

  const currentRun = currentRunId ? runs.runs[currentRunId] : undefined;
  const isRunActive =
    !!currentRun &&
    (currentRun.status === 'running' ||
      currentRun.status === 'pending' ||
      currentRun.status === 'awaiting_approval');

  // ── Debug breakpoints state ──────────────────────────────────────────────
  const [breakpoints, setBreakpoints] = useState<Set<string>>(new Set());
  const [pausedBreakpoint, setPausedBreakpoint] = useState<{
    runId: string;
    stepId: string;
  } | null>(null);
  const [dirtyPatch, setDirtyPatch] = useState<Record<string, unknown> | null>(null);
  const [dirtyPatchStepId, setDirtyPatchStepId] = useState<string | null>(null);
  const [resetEditBufferKey, setResetEditBufferKey] = useState(0);
  const [applyingPatch, setApplyingPatch] = useState(false);
  const [revertingPatchId, setRevertingPatchId] = useState<string | null>(null);

  const handleContextEditBufferChange = useCallback(
    (stepId: string, buffer: Record<string, unknown> | null) => {
      if (buffer === null) {
        setDirtyPatch(null);
        setDirtyPatchStepId(null);
      } else {
        setDirtyPatch(buffer);
        setDirtyPatchStepId(stepId);
      }
    },
    [],
  );

  const handleToggleBreakpoint = useCallback((nodeId: string) => {
    setBreakpoints((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const handleDebugRunClick = useCallback(async () => {
    if (breakpoints.size === 0) return;
    try {
      const runId = await runs.triggerDebugRun(
        pipelineId,
        Array.from(breakpoints),
      );
      setCurrentRunId(runId);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[PipelineEditor] triggerDebugRun failed', err);
    }
  }, [breakpoints, runs, pipelineId]);

  const handleBreakpointContinue = useCallback(() => {
    if (!pausedBreakpoint) return;
    runs.resolveBreakpoint(pausedBreakpoint.runId, pausedBreakpoint.stepId, 'continue');
    setPausedBreakpoint(null);
  }, [pausedBreakpoint, runs]);

  const handleBreakpointStepOver = useCallback(() => {
    if (!pausedBreakpoint) return;
    runs.resolveBreakpoint(pausedBreakpoint.runId, pausedBreakpoint.stepId, 'step_over' as any);
    setPausedBreakpoint(null);
  }, [pausedBreakpoint, runs]);

  const handleBreakpointResumeAll = useCallback(() => {
    if (!pausedBreakpoint) return;
    runs.resolveBreakpoint(pausedBreakpoint.runId, pausedBreakpoint.stepId, 'resume_all');
    setPausedBreakpoint(null);
  }, [pausedBreakpoint, runs]);

  const handleApplyAndContinue = useCallback(async () => {
    if (!pausedBreakpoint || !dirtyPatch || dirtyPatchStepId !== pausedBreakpoint.stepId) {
      return;
    }
    if (Object.keys(dirtyPatch).length === 0) return;
    setApplyingPatch(true);
    try {
      await applyPatch(
        pipelineId,
        pausedBreakpoint.runId,
        pausedBreakpoint.stepId,
        { mode: 'merge', values: dirtyPatch },
      );
      setDirtyPatch(null);
      setDirtyPatchStepId(null);
      setResetEditBufferKey((k) => k + 1);
      runs.resolveBreakpoint(pausedBreakpoint.runId, pausedBreakpoint.stepId, 'continue');
      setPausedBreakpoint(null);
    } catch (err) {
      if (err instanceof PatchValidationRejectedError) {
        toast(`Patch rejected: ${err.reason}`, { type: 'error', durationMs: 8000 });
      } else if (err instanceof PatchHttpError) {
        toast(`Apply failed (HTTP ${err.status})`, { type: 'error', durationMs: 6000 });
      } else {
        const msg = err instanceof Error ? err.message : String(err);
        toast(`Apply failed: ${msg}`, { type: 'error', durationMs: 6000 });
      }
    } finally {
      setApplyingPatch(false);
    }
  }, [pausedBreakpoint, dirtyPatch, dirtyPatchStepId, pipelineId, runs, toast]);

  const handleRevertPatch = useCallback(
    async (patchId: string) => {
      if (!pausedBreakpoint) return;
      setRevertingPatchId(patchId);
      try {
        await revertPatch(
          pipelineId,
          pausedBreakpoint.runId,
          pausedBreakpoint.stepId,
          patchId,
        );
        toast('Patch reverted', { type: 'success', durationMs: 3000 });
      } catch (err) {
        if (err instanceof PatchHttpError) {
          toast(`Revert failed (HTTP ${err.status})`, { type: 'error', durationMs: 6000 });
        } else {
          const msg = err instanceof Error ? err.message : String(err);
          toast(`Revert failed: ${msg}`, { type: 'error', durationMs: 6000 });
        }
      } finally {
        setRevertingPatchId(null);
      }
    },
    [pausedBreakpoint, pipelineId, toast],
  );

  // Listen for breakpoint hit events.
  const handleBreakpointHit = useCallback(
    (
      payload:
        | PipelineEventMap['pipeline.step.breakpoint']
        | WildcardEvent,
    ) => {
      if ('eventType' in payload) return;
      if (!belongsToPipeline(payload.runId)) return;
      setPausedBreakpoint({ runId: payload.runId, stepId: payload.stepId });
      const stepName = lookupStepName(definitionRef.current, payload.stepId);
      toast(`Paused at breakpoint: ${stepName}`, { type: 'warning', durationMs: 6000 });
    },
    [belongsToPipeline, toast],
  );
  useEventStream('pipeline.step.breakpoint', handleBreakpointHit);

  // Clear breakpoint pause when the run terminates.
  const handleClearBreakpointOnTerminal = useCallback(
    (payload: PipelineEventMap['pipeline.run.completed'] | PipelineEventMap['pipeline.run.failed'] | PipelineEventMap['pipeline.run.cancelled'] | WildcardEvent) => {
      if ('eventType' in payload) return;
      if (pausedBreakpoint && pausedBreakpoint.runId === payload.runId) {
        setPausedBreakpoint(null);
      }
    },
    [pausedBreakpoint],
  );
  useEventStream('pipeline.run.completed', handleClearBreakpointOnTerminal);
  useEventStream('pipeline.run.failed', handleClearBreakpointOnTerminal);
  useEventStream('pipeline.run.cancelled', handleClearBreakpointOnTerminal);

  const handleRetryFromError = useCallback(() => {
    if (!activeError?.nodeId) return;
    runs.retryFromStep(activeError.nodeId);
    handleDismissError();
  }, [activeError, runs, handleDismissError]);

  // ── Run controls ──────────────────────────────────────────────────────
  const isPublished = definition?.status === 'published';
  const runDisabled = !isRunActive && !isPublished;

  const runTitle = isRunActive
    ? 'Cancel the active run'
    : !isPublished
      ? 'Publish the pipeline to enable runs'
      : 'Start a new run';

  const [triggerInputOpen, setTriggerInputOpen] = useState(false);
  const [triggerInputValues, setTriggerInputValues] = useState<Record<string, string>>({});
  const [isTriggering, setIsTriggering] = useState(false);

  // Sidebar tab state
  const [sidebarTab, setSidebarTab] = useState<'config' | 'runs'>('config');

  // Auto-switch sidebar to Config tab when a node is selected.
  useEffect(() => {
    if (selectedNodeId !== null) {
      setSidebarTab('config');
    }
  }, [selectedNodeId]);

  const doTrigger = useCallback(async (payload?: Record<string, unknown>) => {
    setIsTriggering(true);
    try {
      const runId = await runs.triggerRun(pipelineId, payload);
      setCurrentRunId(runId);
      setSidebarTab('runs');
      toast(`Pipeline triggered — run ${runId.slice(0, 8)}…`, { type: 'success' });
    } catch (err) {
      console.error('[PipelineEditor] triggerRun failed', err);
      toast(`Trigger failed: ${(err as Error).message}`, { type: 'error' });
    } finally {
      setIsTriggering(false);
    }
  }, [runs, pipelineId, toast]);

  const handleRunClick = useCallback(async () => {
    if (isRunActive && currentRunId) {
      runs.cancelRun(currentRunId);
      return;
    }
    if (runDisabled) return;
    doTrigger();
  }, [isRunActive, currentRunId, runDisabled, runs, doTrigger]);

  const handleTriggerInputSubmit = useCallback(() => {
    setTriggerInputOpen(false);
    doTrigger(triggerInputValues);
  }, [doTrigger, triggerInputValues]);

  return {
    currentRunId,
    setCurrentRunId,
    activeError,
    setActiveError,
    errorNodeAnchor,
    handleDismissError,
    handleErrorNodePosition,
    handleRetryFromError,
    handleRunClick,
    handleTriggerInputSubmit,
    isRunActive,
    runDisabled,
    runTitle,
    isTriggering,
    triggerInputOpen,
    setTriggerInputOpen,
    triggerInputValues,
    setTriggerInputValues,
    breakpoints,
    handleToggleBreakpoint,
    handleDebugRunClick,
    pausedBreakpoint,
    handleBreakpointContinue,
    handleBreakpointStepOver,
    handleBreakpointResumeAll,
    handleApplyAndContinue,
    handleRevertPatch,
    applyingPatch,
    revertingPatchId,
    dirtyPatch,
    dirtyPatchStepId,
    handleContextEditBufferChange,
    resetEditBufferKey,
    sidebarTab,
    setSidebarTab,
  };
}
