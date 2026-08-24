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
import { Navigate, useNavigate, useParams } from 'react-router';

import {
  PipelineEditorProvider,
  usePipelineEditor,
} from './context/PipelineEditorContext';
import {
  usePipelineRuns,
} from './context/PipelineRunsContext';
import PipelineCanvas from './canvas/PipelineCanvas';
import ErrorOverlay from './canvas/ErrorOverlay';
import NodePalette from './canvas/NodePalette';
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
import TagEditor from '../shared/TagEditor';
import { useToast } from '../shared/ToastProvider';
import LiveOutputPanel from './LiveOutputPanel';
import { downloadJSON } from './utils/fileUtils';
import { Button } from '../ui/Button';
import Modal from '../shared/Modal';
import { cn } from '../../lib/cn';
import { Textarea } from '../forms/Textarea';

import {
  EditorTopBar,
  BreakpointPauseOverlay,
  EditorRightSidebar,
  useEditorRunLifecycle,
} from './editor';

import type {
  NodeType,
  PipelineDefinition,
} from '../../types/pipeline';

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
    setTags,
  } = editor;

  // ── Run lifecycle hook ──────────────────────────────────────────────────
  const lifecycle = useEditorRunLifecycle(pipelineId);

  // ── Transient saving indicator ──────────────────────────────────────────
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

  // ── Validation ──────────────────────────────────────────────────────────
  const validation = useMemo(
    () => (definition ? validatePipeline(definition) : null),
    [definition],
  );
  const hasErrors = (validation?.errors.length ?? 0) > 0;

  // ── Trigger input keys ──────────────────────────────────────────────────
  const triggerInputKeys = useMemo(
    () => extractTriggerInputKeys(definition),
    [definition],
  );

  // ── Canvas helpers ──────────────────────────────────────────────────────
  const triggerAlreadyPlaced = useMemo(() => {
    if (!definition) return false;
    return definition.nodes.some((n) => n.type === 'trigger');
  }, [definition]);

  const disabledTypes: NodeType[] = triggerAlreadyPlaced ? ['trigger'] : [];

  // ── Live output panel visibility ────────────────────────────────────────
  const [liveOutputVisible, setLiveOutputVisible] = useState(true);

  // ── Tags row visibility ─────────────────────────────────────────────────
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

  // ── Modal states ────────────────────────────────────────────────────────
  const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [clearRunsConfirmOpen, setClearRunsConfirmOpen] = useState(false);
  const [versionDiffOpen, setVersionDiffOpen] = useState(false);
  const [simPanelOpen, setSimPanelOpen] = useState(false);

  // Published snapshot for version diff
  const publishedSnapshotDef = useMemo<PipelineDefinition | null>(() => {
    if (!definition?.publishedSnapshot) return null;
    return definition.publishedSnapshot as PipelineDefinition;
  }, [definition]);

  // ── Run-related state overrides ─────────────────────────────────────────
  // The hook computes runDisabled based on isPublished only. We augment it
  // with hasErrors + triggerInputKeys handling here in the parent.
  const isPublished = definition?.status === 'published';
  const runDisabled = !lifecycle.isRunActive && (!isPublished || hasErrors);
  const runTitle = lifecycle.isRunActive
    ? 'Cancel the active run'
    : !isPublished
      ? 'Publish the pipeline to enable runs'
      : hasErrors
        ? 'Fix validation errors to enable runs'
        : 'Start a new run';

  // Override handleRunClick to handle triggerInputKeys
  const handleRunClick = useCallback(async () => {
    if (lifecycle.isRunActive && lifecycle.currentRunId) {
      runs.cancelRun(lifecycle.currentRunId);
      return;
    }
    if (runDisabled) return;
    if (triggerInputKeys.length > 0) {
      lifecycle.setTriggerInputValues(
        Object.fromEntries(triggerInputKeys.map((k) => [k, ''])),
      );
      lifecycle.setTriggerInputOpen(true);
      return;
    }
    lifecycle.handleRunClick();
  }, [lifecycle, runs, runDisabled, triggerInputKeys]);

  // ── Failure surfaces ──────────────────────────────────────────────────
  // Two silent-failure paths, both of which previously left the user staring
  // at a UI that had not moved: a rejected autosave (the "Saving…" chip never
  // resolved) and a "Retry from here" the server refused.
  const { saveError, clearSaveError } = editor;
  useEffect(() => {
    if (!saveError) return;
    toast(`Could not save: ${saveError}`, { type: 'error' });
    clearSaveError();
  }, [saveError, clearSaveError, toast]);

  // Publish outcome. The success toast used to fire unconditionally the
  // instant the button was clicked, so a publish the server never accepted
  // read as a green "Pipeline published" while the status chip still said
  // Draft. Both branches now wait for the actual result.
  const { publishError, clearPublishError, publishedAt } = editor;
  const lastPublishedAtRef = useRef<string | null>(publishedAt);
  useEffect(() => {
    if (publishedAt && publishedAt !== lastPublishedAtRef.current) {
      toast('Pipeline published', { type: 'success' });
    }
    lastPublishedAtRef.current = publishedAt;
  }, [publishedAt, toast]);
  useEffect(() => {
    if (!publishError) return;
    toast(`Could not publish: ${publishError}`, { type: 'error' });
    clearPublishError();
  }, [publishError, clearPublishError, toast]);

  const { retryError, clearRetryError } = runs;
  useEffect(() => {
    if (!retryError) return;
    toast(`Retry failed: ${retryError.message}`, { type: 'error' });
    clearRetryError();
  }, [retryError, clearRetryError, toast]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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
        if (lifecycle.isRunActive && lifecycle.currentRunId) runs.cancelRun(lifecycle.currentRunId);
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
  }, [save, toast, handleRunClick, lifecycle, runs, undo, redo, setSelectedNodeId]);

  // ── Menu action handlers ──────────────────────────────────────────────
  const handleDuplicate = () => {
    if (!definition) return;
    const clone = duplicatePipeline(definition.id);
    if (clone) navigate(`/pipelines/${clone.id}`);
  };

  const handleExport = () => {
    if (!definition) return;
    const json = exportPipelineJSON(definition.id);
    if (!json) return;
    downloadJSON(`${slugify(definition.name)}.pipeline.json`, json);
  };

  const handleCopyMermaid = async () => {
    if (!definition) return;
    const mermaid = toMermaid(definition);
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(mermaid);
        toast('Mermaid diagram copied', { type: 'success' });
      } else {
        throw new Error('clipboard unavailable');
      }
    } catch (err) {
      console.warn('[PipelineEditor] clipboard write failed', err);
      toast('Could not copy Mermaid diagram', { type: 'error' });
    }
  };

  const handleViewVersions = () => {
    setVersionDiffOpen(true);
  };

  const handlePublishConfirm = () => {
    setPublishConfirmOpen(false);
    if (hasErrors) return;
    // No toast here — the effects above fire one when the outcome is known.
    publish();
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

  // ── Current run for top bar ───────────────────────────────────────────
  const currentRun = lifecycle.currentRunId ? runs.runs[lifecycle.currentRunId] : undefined;

  // ── Render ────────────────────────────────────────────────────────────
  if (!definition) {
    return (
      <div
        className={cn(
          'flex flex-col min-h-[calc(100vh-200px)]',
          'bg-surface-inset font-inherit text-text-primary',
          'rounded-lg border border-border overflow-hidden',
        )}
      >
        <div className="flex-1 flex items-center justify-center text-text-tertiary text-[13px]">
          Loading pipeline…
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col min-h-[calc(100vh-200px)]',
        'bg-surface-inset font-inherit text-text-primary',
        'rounded-lg border border-border overflow-hidden',
      )}
      data-testid="pipeline-editor"
    >
      {/* ── Top bar ───────────────────────────────────────────────── */}
      <EditorTopBar
        pipelineId={pipelineId}
        definition={definition}
        dirty={dirty}
        savingFlash={savingFlash}
        isRunActive={lifecycle.isRunActive}
        isTriggering={lifecycle.isTriggering}
        runDisabled={runDisabled}
        runTitle={runTitle}
        currentRun={currentRun}
        breakpoints={lifecycle.breakpoints}
        onRunClick={handleRunClick}
        onDebugRunClick={lifecycle.handleDebugRunClick}
        onExport={handleExport}
        onPublishClick={() => setPublishConfirmOpen(true)}
        onDuplicate={handleDuplicate}
        onCopyMermaid={handleCopyMermaid}
        onViewVersions={handleViewVersions}
        onRevert={revert}
        onToggleShowTags={toggleShowTags}
        showTags={showTags}
        onViewRunHistory={() => lifecycle.setSidebarTab('runs')}
        onClearRunHistory={() => setClearRunsConfirmOpen(true)}
        onSimPanelOpen={() => setSimPanelOpen(true)}
        onDelete={() => setDeleteConfirmOpen(true)}
      />

      {/* ── Tags row (compact metadata strip) — hidden by default ── */}
      {showTags && (
        <div
          data-testid="tags-row"
          className={cn(
            'flex items-center gap-2 px-4 py-1.5',
            'border-b border-border bg-surface-inset',
            'min-h-[34px] shrink-0 sticky top-11 z-[4]',
          )}
        >
          <span className="text-[11px] text-text-tertiary font-semibold">TAGS</span>
          <TagEditor
            value={definition.tags ?? []}
            onChange={setTags}
            placeholder="add tag…"
          />
        </div>
      )}

      {/* ── Workspace (palette + canvas + right sidebar) ────────── */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        <NodePalette disabledTypes={disabledTypes} />
        <div className="flex-1 min-w-0 min-h-[600px] relative flex flex-col">
          <PipelineCanvas
            errorNodeId={lifecycle.activeError?.nodeId ?? null}
            onErrorNodePosition={lifecycle.handleErrorNodePosition}
            breakpoints={lifecycle.breakpoints}
            onToggleBreakpoint={lifecycle.handleToggleBreakpoint}
            pausedAtNodeId={lifecycle.pausedBreakpoint?.stepId ?? null}
          />
        </div>

        {/* ── Right sidebar with tabs ─────────────────────────── */}
        <EditorRightSidebar
          pipelineId={pipelineId}
          selectedNodeId={selectedNodeId}
          sidebarTab={lifecycle.sidebarTab}
          onTabChange={lifecycle.setSidebarTab}
        />
      </div>

      {/* ── Breakpoint pause overlay ──────────────────────────────── */}
      {lifecycle.pausedBreakpoint && (
        <BreakpointPauseOverlay
          definition={definition}
          pausedBreakpoint={lifecycle.pausedBreakpoint}
          applyingPatch={lifecycle.applyingPatch}
          revertingPatchId={lifecycle.revertingPatchId}
          dirtyPatch={lifecycle.dirtyPatch}
          dirtyPatchStepId={lifecycle.dirtyPatchStepId}
          resetEditBufferKey={lifecycle.resetEditBufferKey}
          onContinue={lifecycle.handleBreakpointContinue}
          onStepOver={lifecycle.handleBreakpointStepOver}
          onResumeAll={lifecycle.handleBreakpointResumeAll}
          onApplyAndContinue={lifecycle.handleApplyAndContinue}
          onRevertPatch={lifecycle.handleRevertPatch}
          onEditBufferChange={lifecycle.handleContextEditBufferChange}
        />
      )}

      {/* ── Error drill-down overlay ────────────────────────────── */}
      {lifecycle.activeError && lifecycle.errorNodeAnchor && (
        <ErrorOverlay
          error={lifecycle.activeError}
          anchor={lifecycle.errorNodeAnchor}
          onDismiss={lifecycle.handleDismissError}
          onRetry={lifecycle.handleRetryFromError}
        />
      )}

      {/* ── Live LLM output panel (bottom drawer) ────────────────── */}
      <LiveOutputPanel
        runId={lifecycle.currentRunId}
        visible={lifecycle.isRunActive && liveOutputVisible}
      />

      {/* ── Modals ────────────────────────────────────────────────── */}
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

      {/* ── Trigger input modal ───────────────────────────────────── */}
      <Modal
        open={lifecycle.triggerInputOpen}
        onClose={() => lifecycle.setTriggerInputOpen(false)}
        title="Trigger inputs"
        maxWidth={480}
        footer={
          <>
            <Button variant="ghost" onClick={() => lifecycle.setTriggerInputOpen(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={lifecycle.handleTriggerInputSubmit}
              disabled={triggerInputKeys.some((k) => !lifecycle.triggerInputValues[k]?.trim())}
            >
              Run
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <p className="m-0 text-xs text-text-secondary">
            This pipeline expects input data. Provide values for the trigger context:
          </p>
          {triggerInputKeys.map((key) => (
            <label key={key} className="flex flex-col gap-1 text-xs">
              <span className="font-medium text-text-primary">{key}</span>
              <Textarea
                data-autofocus={key === triggerInputKeys[0] ? true : undefined}
                rows={3}
                value={lifecycle.triggerInputValues[key] ?? ''}
                onChange={(e) =>
                  lifecycle.setTriggerInputValues((prev) => ({ ...prev, [key]: e.target.value }))
                }
                aria-label={`Trigger input ${key}`}
              />
            </label>
          ))}
        </div>
      </Modal>
    </div>
  );
}
