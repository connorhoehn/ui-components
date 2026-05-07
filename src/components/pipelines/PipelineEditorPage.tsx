// frontend/src/components/pipelines/PipelineEditorPage.tsx
//
// Route: /pipelines/:pipelineId — the visual editor per PIPELINES_PLAN.md §18.4.
//
// Layout:
//   top bar (44px)
//   └── palette 220px │ canvas │ config panel 320px (when node selected)
//
// The page is wrapped in EventStream → PipelineRuns → PipelineEditor providers
// so child components read state from context. The inner `EditorFrame`
// actually composes the editor surface and owns the run lifecycle (currentRunId,
// keyboard shortcuts, confirm modals, popovers).

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { CSSProperties } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useClickOutside } from './hooks/useClickOutside';

import {
  PipelineEditorProvider,
  usePipelineEditor,
} from './context/PipelineEditorContext';
import {
  usePipelineRuns,
} from './context/PipelineRunsContext';
import {
  useEventStream,
} from './context/EventStreamContext';
import type { WildcardEvent } from './context/EventStreamContext';
import PipelineCanvas from './canvas/PipelineCanvas';
import ErrorOverlay from './canvas/ErrorOverlay';
import NodePalette from './canvas/NodePalette';
import ConfigPanel from './canvas/ConfigPanel';
import { validatePipeline } from './validation/validatePipeline';
import {
  deletePipeline,
  duplicatePipeline,
  exportPipelineJSON,
  loadPipeline,
} from './persistence/pipelineStorage';
import { clearRuns } from './persistence/runHistory';
import { toMermaid } from './export/toMermaid';
import EditorModals from './EditorModals';
import IconPicker from '../shared/IconPicker';
import TagEditor from '../shared/TagEditor';
import { useToast } from '../shared/ToastProvider';
import LiveOutputPanel from './LiveOutputPanel';
import PipelineRunsPanel from './PipelineRunsPanel';
import ContextInspector from './ContextInspector';
import {
  applyPatch,
  revertPatch,
  PatchValidationRejectedError,
  PatchHttpError,
} from '../../api/pipelineBreakpointPatch';
import { colors } from '../../constants/styles';
import type {
  NodeType,
  PipelineDefinition,
  PipelineEventMap,
  PipelineRunError,
  ValidationIssue,
} from '../../types/pipeline';
import { downloadJSON } from './utils/fileUtils';
import Button from './ui/Button';
import IconButton from './ui/IconButton';
import Modal from '../shared/Modal';

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function slugify(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'pipeline'
  );
}

function extractTriggerInputKeys(definition: PipelineDefinition | null): string[] {
  if (!definition) return [];
  const keys = new Set<string>();
  const re = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
  for (const node of definition.nodes) {
    const d = node.data;
    if (d.type === 'llm') {
      for (const m of (d.userPromptTemplate || '').matchAll(re)) {
        if (!m[1].startsWith('steps.')) keys.add(m[1]);
      }
      for (const m of (d.systemPrompt || '').matchAll(re)) {
        if (!m[1].startsWith('steps.')) keys.add(m[1]);
      }
    } else if (d.type === 'transform' && d.expression) {
      for (const m of d.expression.matchAll(re)) {
        if (!m[1].startsWith('steps.')) keys.add(m[1]);
      }
    }
  }
  return Array.from(keys);
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (target.isContentEditable) return true;
  return false;
}

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

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const pageStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  // The AppLayout body scrolls; we use a min-height (not height: 100%) so the
  // editor always has room for the canvas while still fitting inside the
  // surrounding chrome. 200px approximates the AppLayout header + primary
  // tabs + sub-nav + outer padding above this page.
  minHeight: 'calc(100vh - 200px)',
  background: colors.surfaceInset,
  fontFamily: 'inherit',
  color: colors.textPrimary,
  borderRadius: 8,
  border: `1px solid ${colors.border}`,
  overflow: 'hidden',
};

const topBarStyle: CSSProperties = {
  height: 44,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '0 12px',
  borderBottom: `1px solid ${colors.border}`,
  background: colors.surface,
  // Sticky so the run/save controls remain visible if the workspace grows
  // taller than the viewport (e.g. during scroll on a tall canvas).
  position: 'sticky',
  top: 0,
  zIndex: 5,
};

const workspaceStyle: CSSProperties = {
  flex: 1,
  display: 'flex',
  minHeight: 0,
  position: 'relative',
  overflow: 'hidden',
};

const canvasAreaStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  // Explicit min-height — without it, the flex container can collapse to 0px
  // when the page's height is undefined, leaving React Flow with nothing to
  // render (nodes invisible after import).
  minHeight: 600,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
};


const nameButtonStyle: CSSProperties = {
  padding: '4px 8px',
  fontSize: 14,
  fontWeight: 700,
  color: colors.textPrimary,
  background: 'transparent',
  border: '1px solid transparent',
  borderRadius: 6,
  cursor: 'text',
  fontFamily: 'inherit',
  maxWidth: 280,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'left',
};

const nameInputStyle: CSSProperties = {
  padding: '4px 8px',
  fontSize: 14,
  fontWeight: 700,
  color: colors.textPrimary,
  background: colors.surface,
  border: `1px solid ${colors.borderField}`,
  borderRadius: 6,
  fontFamily: 'inherit',
  outline: 'none',
  width: 260,
};

const chipBase: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '2px 8px',
  borderRadius: 4,
  fontSize: 11,
  fontWeight: 600,
  fontFamily: 'inherit',
  lineHeight: 1.4,
  whiteSpace: 'nowrap',
};

const popoverStyle: CSSProperties = {
  position: 'absolute',
  top: '100%',
  marginTop: 6,
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  boxShadow: '0 12px 28px rgba(15,23,42,0.14)',
  padding: 0,
  minWidth: 260,
  maxWidth: 360,
  maxHeight: 320,
  overflowY: 'auto',
  zIndex: 20,
};

const runBtnStyle = (disabled: boolean, running: boolean): CSSProperties => ({
  padding: '6px 14px',
  fontSize: 13,
  fontWeight: 600,
  background: running ? '#dc2626' : colors.primary,
  color: '#ffffff',
  border: 'none',
  borderRadius: 6,
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.5 : 1,
  fontFamily: 'inherit',
  flexShrink: 0,
});

const menuBtnStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '8px 14px',
  fontSize: 13,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontFamily: 'inherit',
  color: colors.textPrimary,
};

// ---------------------------------------------------------------------------
// Right sidebar styles
// ---------------------------------------------------------------------------

const sidebarWidth = 350;

const sidebarStyle: CSSProperties = {
  width: sidebarWidth,
  flexShrink: 0,
  borderLeft: `1px solid ${colors.border}`,
  background: colors.surface,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const sidebarTabsRowStyle: CSSProperties = {
  height: 38,
  display: 'flex',
  borderBottom: `1px solid ${colors.border}`,
  flexShrink: 0,
};

const sidebarTabStyle = (active: boolean): CSSProperties => ({
  flex: 1,
  border: 'none',
  background: 'transparent',
  fontSize: 12,
  fontWeight: 600,
  color: active ? colors.textPrimary : colors.textSecondary,
  borderBottom: active ? `2px solid ${colors.primary}` : '2px solid transparent',
  cursor: 'pointer',
  fontFamily: 'inherit',
  padding: '0 8px',
});

const sidebarBodyStyle: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
};

const sidebarEmptyStyle: CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.textTertiary,
  fontSize: 13,
  padding: 20,
  textAlign: 'center',
};

// ---------------------------------------------------------------------------
// Run status in toolbar styles
// ---------------------------------------------------------------------------

const runStatusChipStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '2px 10px',
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 600,
  fontFamily: 'inherit',
  lineHeight: 1.4,
  whiteSpace: 'nowrap',
};

const spinnerStyle: CSSProperties = {
  display: 'inline-block',
  width: 12,
  height: 12,
  border: '2px solid #e2e8f0',
  borderTopColor: colors.primary,
  borderRadius: '50%',
  animation: 'spin 0.6s linear infinite',
};

// ---------------------------------------------------------------------------
// Outer page — providers + sanity check
// ---------------------------------------------------------------------------

export default function PipelineEditorPage() {
  const { pipelineId } = useParams<{ pipelineId: string }>();

  // Validate existence eagerly so we can redirect when the URL is stale.
  const exists = useMemo(() => {
    if (!pipelineId) return false;
    return loadPipeline(pipelineId) !== null;
  }, [pipelineId]);

  if (!pipelineId || !exists) {
    return <Navigate to="/pipelines" replace />;
  }

  return (
    <PipelineEditorProvider pipelineId={pipelineId}>
      <EditorFrame pipelineId={pipelineId} />
    </PipelineEditorProvider>
  );
}

// ---------------------------------------------------------------------------
// Inner frame — consumes editor + runs context
// ---------------------------------------------------------------------------

type SidebarTab = 'config' | 'runs';

interface EditorFrameProps {
  pipelineId: string;
}

function EditorFrame({ pipelineId }: EditorFrameProps) {
  const navigate = useNavigate();
  const editor = usePipelineEditor();
  const runs = usePipelineRuns();
  const { toast } = useToast();

  const {
    definition,
    dirty,
    selectedNodeId,
    setSelectedNodeId,
    save,
    publish,
    revert,
    undo,
    redo,
    rename,
    setIcon,
    setTags,
  } = editor;

  // ── Run-lifecycle toasts ──────────────────────────────────────────────
  // Only surface toasts for runs that belong to this pipeline. The runs map
  // is the source of truth for runId → pipelineId; we capture it in a ref so
  // stable useCallback handlers can look it up without re-subscribing.
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

  const handleRunStarted = useCallback(
    (
      payload:
        | PipelineEventMap['pipeline.run.started']
        | WildcardEvent,
    ) => {
      if ('eventType' in payload) return;
      // The started event carries pipelineId directly — prefer that so we
      // can show the toast even before the runs map has been updated.
      if (payload.pipelineId !== pipelineId) return;
      toast('Run started', { type: 'info' });
      // Clear any active error overlay when a new run starts.
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
      // Activate error drill-down: highlight the failed node and show overlay.
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

  // Which run the editor should visually "follow" — most recent active,
  // falling back to the most recent completed.
  const [currentRunId, setCurrentRunId] = useState<string | null>(null);

  // ── Error drill-down state ──────────────────────────────────────────────
  // When a run fails, we capture the error and highlight the failed node.
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

  const handleRetryFromError = useCallback(() => {
    if (!activeError?.nodeId) return;
    runs.retryFromStep(activeError.nodeId);
    handleDismissError();
  }, [activeError, runs, handleDismissError]);

  // ── Debug breakpoints state ──────────────────────────────────────────────
  const [breakpoints, setBreakpoints] = useState<Set<string>>(new Set());
  const [pausedBreakpoint, setPausedBreakpoint] = useState<{
    runId: string;
    stepId: string;
  } | null>(null);
  // hub#2226 — edit-and-continue state. The dirty patch buffer comes from
  // ContextInspector (per-key edits while paused); the toolbar's Apply &
  // Continue button reads it, POSTs to social-api, then resolves the
  // breakpoint with action='continue'. `dirtyPatchStepId` tracks which step
  // the buffer applies to — we ignore the buffer once the run resumes past
  // that step.
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

  // hub#2226 Apply & Continue: POST the patch, then resolve the breakpoint.
  // 422 → keep edit mode open, surface the rejection reason via toast.
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
      // Success → drop the buffer and continue.
      setDirtyPatch(null);
      setDirtyPatchStepId(null);
      setResetEditBufferKey((k) => k + 1);
      runs.resolveBreakpoint(pausedBreakpoint.runId, pausedBreakpoint.stepId, 'continue');
      setPausedBreakpoint(null);
    } catch (err) {
      if (err instanceof PatchValidationRejectedError) {
        toast(`Patch rejected: ${err.reason}`, { type: 'error', durationMs: 8000 });
        // Keep edit mode + buffer untouched so the user can fix the patch.
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

  // Transient saving indicator — flips on any dirty→clean transition.
  const [savingFlash, setSavingFlash] = useState(false);
  const savingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevDirtyRef = useRef(dirty);
  useEffect(() => {
    if (prevDirtyRef.current && !dirty) {
      setSavingFlash(true);
      if (savingTimerRef.current) clearTimeout(savingTimerRef.current);
      savingTimerRef.current = setTimeout(() => setSavingFlash(false), 450);
    }
    prevDirtyRef.current = dirty;
    return () => {
      if (savingTimerRef.current) {
        clearTimeout(savingTimerRef.current);
        savingTimerRef.current = null;
      }
    };
  }, [dirty]);


  // Inline name editor.
  const [nameEditing, setNameEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (nameEditing) {
      setNameDraft(definition?.name ?? '');
      setTimeout(() => nameInputRef.current?.focus(), 0);
    }
  }, [nameEditing, definition?.name]);

  const commitName = () => {
    const next = nameDraft.trim();
    if (!definition) {
      setNameEditing(false);
      return;
    }
    if (next && next !== definition.name) {
      rename(next);
    }
    setNameEditing(false);
  };

  // Validation memo.
  const validation = useMemo(
    () => (definition ? validatePipeline(definition) : null),
    [definition],
  );

  // Keep the canvas re-mounted when pipelineId changes (defensive).
  const triggerAlreadyPlaced = useMemo(() => {
    if (!definition) return false;
    return definition.nodes.some((n) => n.type === 'trigger');
  }, [definition]);

  const disabledTypes: NodeType[] = triggerAlreadyPlaced ? ['trigger'] : [];

  // ── Current run tracking ──────────────────────────────────────────────
  useEffect(() => {
    // Prefer an active run if there is one; else keep last completed.
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

  // ── Run controls ──────────────────────────────────────────────────────
  const isPublished = definition?.status === 'published';
  const hasErrors = (validation?.errors.length ?? 0) > 0;
  const runDisabled = !isRunActive && (!isPublished || hasErrors);

  const runTitle = isRunActive
    ? 'Cancel the active run'
    : !isPublished
      ? 'Publish the pipeline to enable runs'
      : hasErrors
        ? 'Fix validation errors to enable runs'
        : 'Start a new run';

  const [triggerInputOpen, setTriggerInputOpen] = useState(false);
  const [triggerInputValues, setTriggerInputValues] = useState<Record<string, string>>({});
  const triggerInputKeys = useMemo(
    () => extractTriggerInputKeys(definition),
    [definition],
  );

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
    if (triggerInputKeys.length > 0) {
      setTriggerInputValues(
        Object.fromEntries(triggerInputKeys.map((k) => [k, ''])),
      );
      setTriggerInputOpen(true);
      return;
    }
    doTrigger();
  }, [isRunActive, currentRunId, runDisabled, runs, triggerInputKeys, doTrigger]);

  const handleTriggerInputSubmit = useCallback(() => {
    setTriggerInputOpen(false);
    doTrigger(triggerInputValues);
  }, [doTrigger, triggerInputValues]);

  // ── Overflow menu + popovers ─────────────────────────────────────────
  const [menuOpen, setMenuOpen] = useState(false);
  const [validationOpen, setValidationOpen] = useState(false);
  const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [clearRunsConfirmOpen, setClearRunsConfirmOpen] = useState(false);
  const [versionDiffOpen, setVersionDiffOpen] = useState(false);
  // Live output panel — visible when a run is active. User can toggle.
  const [liveOutputVisible, setLiveOutputVisible] = useState(true);
  // Right sidebar tab state
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('config');
  // Triggering state — tracks async POST duration for button loading feedback.
  const [isTriggering, setIsTriggering] = useState(false);

  // Auto-switch sidebar to Config tab when a node is selected.
  useEffect(() => {
    if (selectedNodeId !== null) {
      setSidebarTab('config');
    }
  }, [selectedNodeId]);
  // Dev-only simulator panel (Vite dev mode). Gated on `import.meta.env.DEV`
  // so the state declaration is harmless in production — SimulatorPanel itself
  // is a no-op when !DEV.
  const [simPanelOpen, setSimPanelOpen] = useState(false);
  // Tag row visibility — hidden by default per UX feedback. Persisted in
  // localStorage so the choice survives reloads; SSR-safe via the typeof guard.
  const [showTags, setShowTags] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem('ws_pipelines_v1_show_tags') === 'true';
    } catch {
      return false;
    }
  });
  const toggleShowTags = useCallback(() => {
    setShowTags((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(
          'ws_pipelines_v1_show_tags',
          next ? 'true' : 'false',
        );
      } catch {
        // localStorage may be unavailable (private mode, quota): ignore.
      }
      return next;
    });
  }, []);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const validationRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);
  useClickOutside(validationRef, () => setValidationOpen(false), validationOpen);

  // ── Keyboard shortcuts ────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore when the user is typing in an input/textarea/contentEditable.
      if (isEditableTarget(e.target)) return;

      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.key.toLowerCase() === 's') {
        e.preventDefault();
        save();
        toast('Saved', { type: 'success', durationMs: 1200 });
        return;
      }
      if (mod && e.key === 'Enter') {
        e.preventDefault();
        void handleRunClick();
        return;
      }
      if (mod && e.key === '.') {
        e.preventDefault();
        if (isRunActive && currentRunId) runs.cancelRun(currentRunId);
        return;
      }
      if (mod && e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        redo();
        return;
      }
      if (mod && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
        return;
      }
      if (e.key === 'Escape') {
        setSelectedNodeId(null);
        return;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    save,
    toast,
    handleRunClick,
    isRunActive,
    currentRunId,
    runs,
    undo,
    redo,
    setSelectedNodeId,
  ]);

  // ── Overflow-menu handlers ────────────────────────────────────────────
  const handleDuplicate = () => {
    if (!definition) return;
    const clone = duplicatePipeline(definition.id);
    setMenuOpen(false);
    if (clone) navigate(`/pipelines/${clone.id}`);
  };

  const handleExport = () => {
    if (!definition) return;
    const json = exportPipelineJSON(definition.id);
    if (!json) return;
    downloadJSON(`${slugify(definition.name)}.pipeline.json`, json);
    setMenuOpen(false);
  };

  const handleCopyMermaid = async () => {
    if (!definition) return;
    setMenuOpen(false);
    const mermaid = toMermaid(definition);
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(mermaid);
        toast('Mermaid diagram copied', { type: 'success' });
      } else {
        throw new Error('clipboard unavailable');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[PipelineEditor] clipboard write failed', err);
      toast('Could not copy Mermaid diagram', { type: 'error' });
    }
  };

  const handleViewVersions = () => {
    setMenuOpen(false);
    setVersionDiffOpen(true);
  };

  const publishedSnapshotDef = useMemo<PipelineDefinition | null>(() => {
    if (!definition?.publishedSnapshot) return null;
    // The snapshot type is `Omit<PipelineDefinition, 'publishedSnapshot'>` —
    // structurally assignable where the modal needs a readable PipelineDefinition.
    return definition.publishedSnapshot as PipelineDefinition;
  }, [definition]);

  const handlePublishConfirm = () => {
    setPublishConfirmOpen(false);
    if (hasErrors) return;
    publish();
    toast('Pipeline published', { type: 'success' });
  };

  const handleDeleteConfirm = () => {
    if (!definition) return;
    deletePipeline(definition.id);
    setDeleteConfirmOpen(false);
    navigate('/pipelines');
  };

  const handleClearRunsConfirm = () => {
    clearRuns(pipelineId);
    setClearRunsConfirmOpen(false);
    toast('Run history cleared', { type: 'success' });
  };

  // ── Save-status chip ──────────────────────────────────────────────────
  const saveChip: { label: string; variant: 'success' | 'info' | 'neutral' } =
    dirty
      ? { label: 'Saving…', variant: 'info' }
      : savingFlash
        ? { label: '✓ Saved', variant: 'success' }
        : { label: '✓ Saved', variant: 'neutral' };

  // ── Version badge ─────────────────────────────────────────────────────
  const versionBadge = definition
    ? definition.status === 'published'
      ? {
          label: `v${definition.version} · Published`,
          variant: 'success' as const,
        }
      : typeof definition.publishedVersion === 'number'
        ? {
            label: `v${definition.version} · Draft (pub v${definition.publishedVersion})`,
            variant: 'warning' as const,
          }
        : {
            label: `v${definition.version} · Draft`,
            variant: 'neutral' as const,
          }
    : { label: 'Loading…', variant: 'neutral' as const };

  // ── Validation indicator ──────────────────────────────────────────────
  const validationIndicator = validation
    ? validation.errors.length > 0
      ? {
          label: `✗ ${validation.errors.length} error${validation.errors.length === 1 ? '' : 's'}`,
          variant: 'danger' as const,
        }
      : validation.warnings.length > 0
        ? {
            label: `⚠ ${validation.warnings.length} warning${validation.warnings.length === 1 ? '' : 's'}`,
            variant: 'warning' as const,
          }
        : { label: '✓ Valid', variant: 'success' as const }
    : { label: '…', variant: 'neutral' as const };

  const chipVariantStyle = (
    variant: 'success' | 'info' | 'neutral' | 'warning' | 'danger',
  ): CSSProperties => {
    const palette: Record<
      'success' | 'info' | 'neutral' | 'warning' | 'danger',
      { bg: string; fg: string }
    > = {
      neutral: { bg: '#f1f5f9', fg: '#475569' },
      success: { bg: '#f0fdf4', fg: '#16a34a' },
      warning: { bg: '#fffbeb', fg: '#d97706' },
      danger: { bg: '#fef2f2', fg: '#dc2626' },
      info: { bg: '#eff6ff', fg: '#2563eb' },
    };
    const p = palette[variant];
    return { ...chipBase, background: p.bg, color: p.fg };
  };

  // ── Validation popover — jump to node ────────────────────────────────
  const allIssues: ValidationIssue[] = validation
    ? [...validation.errors, ...validation.warnings]
    : [];

  const jumpToNode = (nodeId?: string) => {
    if (!nodeId) return;
    setSelectedNodeId(nodeId);
    setValidationOpen(false);
  };

  // ── Render ────────────────────────────────────────────────────────────
  if (!definition) {
    return (
      <div style={pageStyle}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.textTertiary,
            fontSize: 13,
          }}
        >
          Loading pipeline…
        </div>
      </div>
    );
  }


  const runBtnLabel = isRunActive
    ? '⏹ Stop'
    : currentRun && currentRun.status !== 'running'
      ? '↻ Re-run'
      : '▶ Run';

  // ── Toolbar run status computation ──────────────────────────────────
  const totalSteps = definition ? definition.nodes.filter((n) => n.type !== 'trigger').length : 0;
  const completedSteps = currentRun
    ? Object.values(currentRun.steps).filter(
        (s) => s.status === 'completed' || s.status === 'skipped',
      ).length
    : 0;
  const elapsedMs = currentRun?.startedAt
    ? Date.now() - new Date(currentRun.startedAt).getTime()
    : 0;
  const elapsedSec = (elapsedMs / 1000).toFixed(1);

  // Determine what status to show in the toolbar
  const toolbarRunStatus: { text: string; variant: 'running' | 'success' | 'error' | 'none' } =
    isRunActive && currentRun
      ? { text: `Running (${completedSteps}/${totalSteps} steps) · ${elapsedSec}s`, variant: 'running' }
      : currentRun?.status === 'completed'
        ? {
            text: `Completed in ${currentRun.durationMs ? (currentRun.durationMs / 1000).toFixed(1) : '?'}s`,
            variant: 'success',
          }
        : currentRun?.status === 'failed'
          ? {
              text: `Failed at ${lookupStepName(definition, currentRun.error?.nodeId)}`,
              variant: 'error',
            }
          : { text: '', variant: 'none' };

  return (
    <div style={pageStyle} data-testid="pipeline-editor">
      {/* ── Top bar ───────────────────────────────────────────────── */}
      <div style={topBarStyle}>
        <IconButton
          onClick={() => navigate('/pipelines')}
          aria-label="Back to pipelines"
          title="Back to pipelines"
        >
          ←
        </IconButton>

        <IconPicker
          value={definition.icon ?? '🔀'}
          onChange={setIcon}
        />

        {nameEditing ? (
          <input
            ref={nameInputRef}
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitName();
              if (e.key === 'Escape') {
                setNameDraft(definition.name);
                setNameEditing(false);
              }
            }}
            style={nameInputStyle}
            data-testid="pipeline-name-input"
          />
        ) : (
          <button
            type="button"
            onClick={() => setNameEditing(true)}
            style={nameButtonStyle}
            title={definition.name}
            data-testid="pipeline-name"
          >
            {definition.name}
          </button>
        )}

        <span
          style={chipVariantStyle(saveChip.variant)}
          data-testid="save-status"
        >
          {saveChip.label}
        </span>

        <span
          style={chipVariantStyle(versionBadge.variant)}
          data-testid="version-badge"
        >
          {versionBadge.label}
        </span>

        <div style={{ position: 'relative' }} ref={validationRef}>
          <button
            type="button"
            onClick={() => setValidationOpen((x) => !x)}
            style={{
              ...chipVariantStyle(validationIndicator.variant),
              cursor: 'pointer',
              border: 'none',
            }}
            data-testid="validation-indicator"
          >
            {validationIndicator.label}
          </button>
          {validationOpen && allIssues.length > 0 ? (
            <div style={popoverStyle}>
              {allIssues.map((issue, idx) => (
                <button
                  key={`${issue.code}-${idx}`}
                  type="button"
                  onClick={() => jumpToNode(issue.nodeId)}
                  style={{
                    ...menuBtnStyle,
                    borderBottom:
                      idx === allIssues.length - 1
                        ? 'none'
                        : `1px solid ${colors.border}`,
                    display: 'flex',
                    gap: 8,
                    alignItems: 'flex-start',
                    lineHeight: 1.4,
                    cursor: issue.nodeId ? 'pointer' : 'default',
                  }}
                >
                  <span
                    style={{
                      color:
                        issue.severity === 'error'
                          ? '#dc2626'
                          : '#d97706',
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {issue.severity === 'error' ? '✗' : '⚠'}
                  </span>
                  <span style={{ flex: 1, fontSize: 12 }}>
                    <div style={{ fontWeight: 600 }}>{issue.code}</div>
                    <div style={{ color: colors.textSecondary }}>
                      {issue.message}
                    </div>
                    {issue.nodeId ? (
                      <div
                        style={{
                          marginTop: 2,
                          fontSize: 11,
                          color: colors.primary,
                        }}
                      >
                        Jump to node →
                      </div>
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* ── Run status indicator ──────────────────────────── */}
        {toolbarRunStatus.variant !== 'none' && (
          <span
            style={{
              ...runStatusChipStyle,
              background:
                toolbarRunStatus.variant === 'running'
                  ? '#eff6ff'
                  : toolbarRunStatus.variant === 'success'
                    ? '#f0fdf4'
                    : '#fef2f2',
              color:
                toolbarRunStatus.variant === 'running'
                  ? '#2563eb'
                  : toolbarRunStatus.variant === 'success'
                    ? '#16a34a'
                    : '#dc2626',
            }}
            data-testid="run-status-indicator"
          >
            {toolbarRunStatus.variant === 'running' && (
              <span style={spinnerStyle} />
            )}
            {toolbarRunStatus.variant === 'success' && '✓ '}
            {toolbarRunStatus.variant === 'error' && '✗ '}
            {toolbarRunStatus.text}
          </span>
        )}

        <div style={{ flex: 1 }} />

        <Button
          variant="secondary"
          onClick={() => navigate('/pipelines/metrics')}
          title="View pipeline metrics dashboard"
          data-testid="metrics-button"
        >
          Metrics
        </Button>

        <Button
          variant="secondary"
          onClick={handleExport}
          title="Export pipeline as JSON"
          data-testid="export-button"
        >
          Export
        </Button>

        <button
          type="button"
          onClick={() => setPublishConfirmOpen(true)}
          title={isPublished ? 'Already published at this version' : 'Publish pipeline to enable runs'}
          disabled={isPublished}
          style={{
            padding: '6px 12px',
            fontSize: 13,
            fontWeight: 600,
            background: isPublished ? colors.surfaceHover : '#16a34a',
            color: isPublished ? colors.textTertiary : '#ffffff',
            border: 'none',
            borderRadius: 6,
            cursor: isPublished ? 'default' : 'pointer',
            opacity: isPublished ? 0.7 : 1,
            fontFamily: 'inherit',
            flexShrink: 0,
          }}
          data-testid="publish-button"
        >
          {isPublished ? 'Published' : 'Publish'}
        </button>

        <button
          type="button"
          onClick={handleRunClick}
          disabled={runDisabled || isTriggering}
          title={runTitle}
          style={runBtnStyle(runDisabled || isTriggering, isRunActive)}
          data-testid="run-button"
        >
          {isTriggering ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ ...spinnerStyle, borderTopColor: '#ffffff' }} />
              Triggering…
            </span>
          ) : (
            runBtnLabel
          )}
        </button>

        {breakpoints.size > 0 && (
          <button
            type="button"
            onClick={handleDebugRunClick}
            disabled={runDisabled || isRunActive}
            title={`Debug run (${breakpoints.size} breakpoint${breakpoints.size > 1 ? 's' : ''})`}
            style={{
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 600,
              background: '#d97706',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              cursor: (runDisabled || isRunActive) ? 'not-allowed' : 'pointer',
              opacity: (runDisabled || isRunActive) ? 0.5 : 1,
              fontFamily: 'inherit',
              flexShrink: 0,
            }}
            data-testid="debug-run-button"
          >
            Debug ({breakpoints.size})
          </button>
        )}

        <div style={{ position: 'relative' }} ref={menuRef}>
          <IconButton
            onClick={() => setMenuOpen((x) => !x)}
            aria-label="More actions"
            data-testid="overflow-menu-btn"
          >
            ⋯
          </IconButton>
          {menuOpen ? (
            <div style={{ ...popoverStyle, right: 0, minWidth: 200 }} role="menu">
              <button style={menuBtnStyle} role="menuitem" onClick={handleDuplicate}>
                Duplicate
              </button>
              <button
                style={menuBtnStyle}
                role="menuitem"
                onClick={handleCopyMermaid}
                data-testid="copy-mermaid-btn"
              >
                Copy Mermaid
              </button>
              <button
                style={menuBtnStyle}
                role="menuitem"
                onClick={handleViewVersions}
                data-testid="view-versions-btn"
              >
                View changes since publish
              </button>
              <button
                style={menuBtnStyle}
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  revert();
                }}
                disabled={typeof definition.publishedVersion !== 'number'}
              >
                Revert to published
              </button>
              <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />
              <button
                style={menuBtnStyle}
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  toggleShowTags();
                }}
                data-testid="toggle-tags-row"
              >
                {showTags ? 'Hide tags' : 'Show tags'}
              </button>
              <button
                style={menuBtnStyle}
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setSidebarTab('runs');
                }}
              >
                View run history
              </button>
              <button
                style={{ ...menuBtnStyle, color: '#dc2626' }}
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setClearRunsConfirmOpen(true);
                }}
              >
                Clear run history
              </button>
              {import.meta.env.DEV ? (
                <>
                  <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />
                  <button
                    style={menuBtnStyle}
                    role="menuitem"
                    data-testid="sim-panel-open"
                    title="Dev-only event simulator"
                    onClick={() => {
                      setMenuOpen(false);
                      setSimPanelOpen(true);
                    }}
                  >
                    🧪 Event simulator…
                  </button>
                </>
              ) : null}
              <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />
              <button
                style={{ ...menuBtnStyle, color: '#dc2626' }}
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setDeleteConfirmOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Tags row (compact metadata strip) — hidden by default ── */}
      {showTags ? (
        <div
          data-testid="tags-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderBottom: '1px solid #e2e8f0',
            background: '#fafbfc',
            minHeight: 34,
            flexShrink: 0,
            position: 'sticky',
            top: 44,
            zIndex: 4,
          }}
        >
          <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>TAGS</span>
          <TagEditor
            value={definition.tags ?? []}
            onChange={setTags}
            placeholder="add tag…"
          />
        </div>
      ) : null}

      {/* ── Workspace (palette + canvas + right sidebar) ────────── */}
      <div style={workspaceStyle}>
        <NodePalette disabledTypes={disabledTypes} />
        <div style={canvasAreaStyle}>
          <PipelineCanvas
            errorNodeId={activeError?.nodeId ?? null}
            onErrorNodePosition={handleErrorNodePosition}
            breakpoints={breakpoints}
            onToggleBreakpoint={handleToggleBreakpoint}
            pausedAtNodeId={pausedBreakpoint?.stepId ?? null}
          />
        </div>

        {/* ── Right sidebar with tabs ─────────────────────────── */}
        <div style={sidebarStyle} data-testid="right-sidebar">
          {!(selectedNodeId !== null && sidebarTab === 'config') && (
            <div style={sidebarTabsRowStyle}>
              <button
                type="button"
                style={sidebarTabStyle(sidebarTab === 'config')}
                onClick={() => setSidebarTab('config')}
                data-testid="sidebar-tab-config"
              >
                Config
              </button>
              <button
                type="button"
                style={sidebarTabStyle(sidebarTab === 'runs')}
                onClick={() => setSidebarTab('runs')}
                data-testid="sidebar-tab-runs"
              >
                Runs
              </button>
            </div>
          )}
          <div style={sidebarBodyStyle}>
            {sidebarTab === 'config' && (
              selectedNodeId !== null ? (
                <ConfigPanel />
              ) : (
                <div style={sidebarEmptyStyle}>
                  Select a node to configure
                </div>
              )
            )}
            {sidebarTab === 'runs' && (
              <PipelineRunsPanel
                pipelineId={pipelineId}
                onClose={() => setSidebarTab('config')}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Breakpoint pause overlay ──────────────────────────────── */}
      {pausedBreakpoint && (() => {
        const pausedRun = runs.runs[pausedBreakpoint.runId] ?? null;
        const pausedStep = pausedRun?.steps?.[pausedBreakpoint.stepId];
        const stepPatches = pausedStep?.patches ?? [];
        const canApplyAndContinue =
          !!dirtyPatch &&
          dirtyPatchStepId === pausedBreakpoint.stepId &&
          Object.keys(dirtyPatch).length > 0;
        // While the run is still paused at the same step, Revert is allowed.
        const revertAllowed = pausedRun?.status === 'paused_at_breakpoint';
        return (
          <div
            data-testid="breakpoint-pause-overlay"
            style={{
              position: 'absolute',
              top: 56,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 30,
              background: colors.surface,
              border: `2px solid #d97706`,
              borderRadius: 8,
              padding: '12px 16px',
              boxShadow: '0 8px 24px rgba(217, 119, 6, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              fontFamily: 'inherit',
              width: 'min(900px, 92vw)',
              maxHeight: 'calc(100vh - 120px)',
            }}
          >
            {/* Toolbar row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#d97706' }}>
                Paused at: {lookupStepName(definition, pausedBreakpoint.stepId)}
              </span>
              {canApplyAndContinue && (
                <button
                  type="button"
                  onClick={handleApplyAndContinue}
                  disabled={applyingPatch}
                  data-testid="breakpoint-apply-continue-btn"
                  style={{
                    padding: '4px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    background: '#a6e3a1',
                    color: '#1e1e2e',
                    border: 'none',
                    borderRadius: 4,
                    cursor: applyingPatch ? 'wait' : 'pointer',
                    opacity: applyingPatch ? 0.7 : 1,
                    fontFamily: 'inherit',
                  }}
                >
                  {applyingPatch ? 'Applying…' : 'Apply & Continue'}
                </button>
              )}
              <button
                type="button"
                onClick={handleBreakpointContinue}
                disabled={applyingPatch}
                style={{
                  padding: '4px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  background: '#d97706',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: applyingPatch ? 'not-allowed' : 'pointer',
                  opacity: applyingPatch ? 0.6 : 1,
                  fontFamily: 'inherit',
                }}
                data-testid="breakpoint-continue-btn"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={handleBreakpointStepOver}
                disabled={applyingPatch}
                style={{
                  padding: '4px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  background: 'transparent',
                  color: '#d97706',
                  border: `1px solid #d97706`,
                  borderRadius: 4,
                  cursor: applyingPatch ? 'not-allowed' : 'pointer',
                  opacity: applyingPatch ? 0.6 : 1,
                  fontFamily: 'inherit',
                }}
                data-testid="breakpoint-step-over-btn"
              >
                Step Over
              </button>
              <button
                type="button"
                onClick={handleBreakpointResumeAll}
                disabled={applyingPatch}
                style={{
                  padding: '4px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  background: 'transparent',
                  color: '#d97706',
                  border: `1px solid #d97706`,
                  borderRadius: 4,
                  cursor: applyingPatch ? 'not-allowed' : 'pointer',
                  opacity: applyingPatch ? 0.6 : 1,
                  fontFamily: 'inherit',
                }}
                data-testid="breakpoint-resume-all-btn"
              >
                Resume All
              </button>
            </div>

            {/* Body: ContextInspector (editable) + Patch history side panel */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) 240px',
                gap: 12,
                minHeight: 280,
                maxHeight: 'calc(100vh - 220px)',
              }}
            >
              <div
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  background: colors.surfaceInset,
                  overflow: 'hidden',
                  minHeight: 0,
                }}
              >
                {pausedRun ? (
                  <ContextInspector
                    run={pausedRun}
                    activeStepId={pausedBreakpoint.stepId}
                    editable
                    onEditBufferChange={handleContextEditBufferChange}
                    resetEditBufferKey={resetEditBufferKey}
                  />
                ) : (
                  <div style={{ padding: 12, fontSize: 12, color: colors.textTertiary }}>
                    Loading run…
                  </div>
                )}
              </div>

              {/* Patch history side panel */}
              <div
                data-testid="breakpoint-patch-history"
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  background: colors.surfaceInset,
                  padding: '10px 12px',
                  overflow: 'auto',
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: colors.textPrimary,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  Patch history ({stepPatches.length})
                </div>
                {stepPatches.length === 0 ? (
                  <div
                    style={{ fontSize: 11, color: colors.textTertiary, fontStyle: 'italic' }}
                    data-testid="breakpoint-patch-history-empty"
                  >
                    No patches applied yet.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {stepPatches.map((p) => {
                      const reverted = !!p.revertedAt;
                      return (
                        <div
                          key={p.patchId}
                          data-testid={`breakpoint-patch-row-${p.patchId}`}
                          style={{
                            border: `1px solid ${colors.border}`,
                            borderRadius: 4,
                            padding: '6px 8px',
                            background: reverted ? 'rgba(108, 112, 134, 0.1)' : '#11111b',
                            opacity: reverted ? 0.6 : 1,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                              fontSize: 10,
                              color: '#cdd6f4',
                              marginBottom: 2,
                            }}
                          >
                            <span style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                              {p.patchId.slice(0, 8)}
                            </span>
                            {p.unvalidated && (
                              <span
                                data-testid={`breakpoint-patch-unvalidated-${p.patchId}`}
                                title="No validator was registered for this step's node type"
                                style={{
                                  padding: '0 4px',
                                  fontSize: 9,
                                  fontWeight: 700,
                                  background: 'rgba(250, 179, 135, 0.15)',
                                  color: '#fab387',
                                  borderRadius: 2,
                                }}
                              >
                                ⚠ Unvalidated
                              </span>
                            )}
                            {reverted && (
                              <span
                                style={{
                                  padding: '0 4px',
                                  fontSize: 9,
                                  fontWeight: 700,
                                  background: 'rgba(108, 112, 134, 0.2)',
                                  color: '#9399b2',
                                  borderRadius: 2,
                                }}
                              >
                                Reverted
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: 10, color: '#9399b2' }}>
                            {p.appliedAt}
                            {p.appliedBy && (
                              <>
                                {' · '}
                                <span style={{ color: '#cdd6f4' }}>{p.appliedBy}</span>
                              </>
                            )}
                          </div>
                          {!reverted && (
                            <button
                              type="button"
                              data-testid={`breakpoint-patch-revert-${p.patchId}`}
                              onClick={() => handleRevertPatch(p.patchId)}
                              disabled={!revertAllowed || revertingPatchId === p.patchId}
                              title={
                                revertAllowed
                                  ? 'Revert this patch'
                                  : 'Run has progressed past this breakpoint — revert no longer allowed'
                              }
                              style={{
                                marginTop: 4,
                                padding: '2px 8px',
                                fontSize: 10,
                                fontWeight: 600,
                                background: 'transparent',
                                color: revertAllowed ? '#f38ba8' : '#45475a',
                                border: `1px solid ${revertAllowed ? '#f38ba8' : '#313244'}`,
                                borderRadius: 3,
                                cursor:
                                  revertAllowed && revertingPatchId !== p.patchId
                                    ? 'pointer'
                                    : 'not-allowed',
                                fontFamily: 'inherit',
                              }}
                            >
                              {revertingPatchId === p.patchId ? 'Reverting…' : 'Revert'}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Error drill-down overlay ────────────────────────────── */}
      {activeError && errorNodeAnchor && (
        <ErrorOverlay
          error={activeError}
          anchor={errorNodeAnchor}
          onDismiss={handleDismissError}
          onRetry={handleRetryFromError}
        />
      )}


      {/* ── Live LLM output panel (bottom drawer) ────────────────── */}
      <LiveOutputPanel
        runId={currentRunId}
        visible={isRunActive && liveOutputVisible}
      />


      <EditorModals
        publishConfirmOpen={publishConfirmOpen}
        onPublishClose={() => setPublishConfirmOpen(false)}
        onPublishConfirm={handlePublishConfirm}
        hasErrors={hasErrors}
        validationErrorCount={validation?.errors.length ?? 0}
        definitionName={definition.name}
        definitionVersion={definition.version}
        deleteConfirmOpen={deleteConfirmOpen}
        onDeleteClose={() => setDeleteConfirmOpen(false)}
        onDeleteConfirm={handleDeleteConfirm}
        clearRunsConfirmOpen={clearRunsConfirmOpen}
        onClearRunsClose={() => setClearRunsConfirmOpen(false)}
        onClearRunsConfirm={handleClearRunsConfirm}
        versionDiffOpen={versionDiffOpen}
        onVersionDiffClose={() => setVersionDiffOpen(false)}
        currentDef={definition}
        publishedDef={publishedSnapshotDef}
        onJumpToNode={setSelectedNodeId}
        simPanelOpen={simPanelOpen}
        onSimPanelClose={() => setSimPanelOpen(false)}
      />
      <Modal
        open={triggerInputOpen}
        onClose={() => setTriggerInputOpen(false)}
        title="Trigger inputs"
        maxWidth={480}
        footer={
          <>
            <Button variant="ghost" onClick={() => setTriggerInputOpen(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={handleTriggerInputSubmit}
              disabled={triggerInputKeys.some((k) => !triggerInputValues[k]?.trim())}
            >
              Run
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 12, color: colors.textSecondary }}>
            This pipeline expects input data. Provide values for the trigger context:
          </p>
          {triggerInputKeys.map((key) => (
            <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
              <span style={{ fontWeight: 500, color: colors.textPrimary }}>{key}</span>
              <textarea
                data-autofocus={key === triggerInputKeys[0] ? true : undefined}
                rows={3}
                style={{
                  resize: 'vertical',
                  padding: '6px 8px',
                  borderRadius: 6,
                  border: `1px solid ${colors.border}`,
                  fontSize: 12,
                  fontFamily: 'inherit',
                }}
                value={triggerInputValues[key] ?? ''}
                onChange={(e) =>
                  setTriggerInputValues((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </label>
          ))}
        </div>
      </Modal>
    </div>
  );
}

