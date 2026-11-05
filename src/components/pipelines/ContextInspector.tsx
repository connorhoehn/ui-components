// frontend/src/components/pipelines/ContextInspector.tsx
//
// Context Inspector — shows the accumulated pipeline context object at each
// step boundary during/after execution. Allows developers to inspect what
// data flowed into each step, what it produced, and how the context evolved.
//
// Decomposed into sub-components under ./context-inspector/:
//   - ContextJsonTree: recursive JSON tree viewer
//   - ContextStepList: sidebar step list with navigation
//   - ContextEditBuffer: inline edit mode UI
//   - useContextSnapshots: hook that derives step-level context snapshots

import { useCallback, useEffect, useState } from 'react';
import type { PipelineRun, StepAttempt } from '../../types/pipeline';
import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import { CODE_TONE_SOFT } from '../shared/tones';
import {
  ContextJsonTree,
  ContextStepList,
  ContextEditBuffer,
  useContextSnapshots,
} from './context-inspector';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ContextInspectorProps {
  /** The run to inspect (from PipelineRunsContext). */
  run: PipelineRun | null;
  /** Currently selected step — controls which snapshot is shown. */
  activeStepId: string | null;
  /** Callback when the user clicks a step in the step list. */
  onStepSelect?: (stepId: string) => void;
  /**
   * hub#2226: when true AND the run is paused at `activeStepId`, the
   * inspector shows an "Edit" toggle on the input-context tab and exposes
   * the dirty edit buffer + per-row affordances. The Apply combo button
   * lives in the parent toolbar, but the inspector publishes its dirty
   * buffer + reset hook here so the toolbar can hand it to
   * `applyContextPatch`.
   */
  editable?: boolean;
  /**
   * hub#2226: notified whenever the user mutates the edit buffer for the
   * paused step. The parent uses this to enable the Apply combo button and
   * to read the buffer when the user clicks Apply.
   */
  onEditBufferChange?: (
    stepId: string,
    /** When `null`, the buffer was reset (Apply succeeded or user toggled off edit). */
    buffer: Record<string, unknown> | null,
  ) => void;
  /**
   * hub#2226: imperative ref consumers can call to drop the in-memory edit
   * buffer (e.g. after a successful Apply or after the run resumed past
   * pausedAtNodeId). Called by the parent via the `onEditBufferChange(_, null)`
   * round-trip is also acceptable, but a direct reset is simpler from the
   * toolbar callback.
   */
  resetEditBufferKey?: number;
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

type TabId = 'input' | 'output' | 'prompt' | 'details' | 'attempts';

// ---------------------------------------------------------------------------
// AttemptCard — one column in the side-by-side attempt diff
// ---------------------------------------------------------------------------

function AttemptCard({ attempt, label }: { attempt: StepAttempt; label: string }) {
  const succeeded = !attempt.error;
  return (
    <div className="bg-code-bg rounded-md border border-code-border p-2.5 overflow-auto">
      <div className="text-[11px] font-bold text-code-text mb-2">{label}</div>
      <div className="flex gap-1.5 mb-1.5 items-center">
        <Chip palette="code" tone={succeeded ? 'success' : 'danger'} size="xs">
          {succeeded ? 'OK' : 'FAIL'}
        </Chip>
        {attempt.durationMs != null && (
          <span className="text-[10px] text-code-muted">{attempt.durationMs}ms</span>
        )}
      </div>
      {attempt.error && (
        <div className={cn(
          'text-[11px] font-mono mb-1.5 px-2 py-1.5 rounded whitespace-pre-wrap break-words',
          CODE_TONE_SOFT.danger,
        )}>
          {attempt.error}
        </div>
      )}
      {attempt.output !== undefined && (
        <div>
          <div className="text-[10px] text-code-muted font-semibold mb-1 uppercase">
            Output
          </div>
          <ContextJsonTree data={attempt.output} depth={0} />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContextInspector({
  run,
  activeStepId,
  onStepSelect,
  editable = false,
  onEditBufferChange,
  resetEditBufferKey,
}: ContextInspectorProps) {
  const [activeTab, setActiveTab] = useState<TabId>('input');
  const [compareIdx, setCompareIdx] = useState(0);

  // hub#2226: edit-mode state
  const [editMode, setEditMode] = useState(false);
  const [editBuffer, setEditBuffer] = useState<Record<string, unknown>>({});
  const [editBufferStepId, setEditBufferStepId] = useState<string | null>(null);
  const [editParseErrors, setEditParseErrors] = useState<Record<string, string>>({});
  const [newKeyDraft, setNewKeyDraft] = useState<{ key: string; value: string }>({
    key: '',
    value: '',
  });

  // Use the extracted hook for snapshot computation
  const { enrichedSnapshots, activeSnapshot, newKeysSet } = useContextSnapshots(run, activeStepId);

  // Tab visibility — only show "Resolved Prompt" tab when applicable.
  const showPromptTab = activeSnapshot?.resolvedPrompt != null;
  const stepAttempts = activeSnapshot?.stepExecution.attempts;
  const showAttemptsTab = (stepAttempts?.length ?? 0) >= 2;

  // Reset to 'input' tab if current tab becomes invalid.
  useEffect(() => {
    if (activeTab === 'prompt' && !showPromptTab) setActiveTab('input');
    if (activeTab === 'attempts' && !showAttemptsTab) setActiveTab('input');
  }, [activeTab, showPromptTab, showAttemptsTab]);

  // Reset attempt comparison cursor when the active step changes.
  useEffect(() => {
    setCompareIdx(0);
  }, [activeStepId]);

  // ── hub#2226 edit-mode: gating + buffer wiring ─────────────────────────
  const isPausedAtActive = !!(
    run &&
    run.status === 'paused_at_breakpoint' &&
    activeStepId &&
    (run.currentStepIds?.includes(activeStepId) ||
      activeSnapshot?.stepExecution.status === 'running' ||
      activeSnapshot?.stepExecution.status === 'awaiting' ||
      activeSnapshot?.stepExecution.status === 'pending')
  );
  const editingAllowed = !!editable && !!isPausedAtActive;

  // Reset buffer when the active step changes or the run resumes past it.
  useEffect(() => {
    if (!editingAllowed) {
      if (editMode) setEditMode(false);
      if (Object.keys(editBuffer).length > 0) setEditBuffer({});
      if (editBufferStepId) setEditBufferStepId(null);
      if (Object.keys(editParseErrors).length > 0) setEditParseErrors({});
    } else if (editBufferStepId && editBufferStepId !== activeStepId) {
      setEditBuffer({});
      setEditBufferStepId(null);
      setEditParseErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingAllowed, activeStepId]);

  // Imperative reset hook for the parent (e.g. after a successful Apply).
  useEffect(() => {
    if (resetEditBufferKey === undefined) return;
    setEditBuffer({});
    setEditBufferStepId(null);
    setEditParseErrors({});
    setNewKeyDraft({ key: '', value: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetEditBufferKey]);

  // Notify parent on every buffer change so it can drive the Apply button.
  useEffect(() => {
    if (!editingAllowed || !activeStepId) return;
    if (!onEditBufferChange) return;
    if (Object.keys(editBuffer).length === 0) {
      onEditBufferChange(activeStepId, null);
    } else {
      onEditBufferChange(activeStepId, editBuffer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editBuffer, editingAllowed, activeStepId]);

  const beginEditingKey = useCallback(
    (key: string, currentValue: unknown) => {
      setEditBufferStepId(activeStepId);
      setEditBuffer((prev) => {
        if (key in prev) return prev;
        return { ...prev, [key]: currentValue };
      });
    },
    [activeStepId],
  );

  const setBufferValue = useCallback(
    (key: string, value: unknown) => {
      setEditBufferStepId(activeStepId);
      setEditBuffer((prev) => ({ ...prev, [key]: value }));
      setEditParseErrors((prev) => {
        if (!(key in prev)) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [activeStepId],
  );

  const removeBufferKey = useCallback((key: string) => {
    setEditBuffer((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setEditParseErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const setParseError = useCallback((key: string, msg: string) => {
    setEditParseErrors((prev) => ({ ...prev, [key]: msg }));
  }, []);

  const discardChanges = useCallback(() => {
    setEditBuffer({});
    setEditBufferStepId(null);
    setEditParseErrors({});
    setNewKeyDraft({ key: '', value: '' });
  }, []);

  const commitNewKey = useCallback(() => {
    const key = newKeyDraft.key.trim();
    if (!key) return;
    let parsed: unknown = newKeyDraft.value;
    const v = newKeyDraft.value;
    if (v.trim().length > 0) {
      try {
        parsed = JSON.parse(v);
      } catch {
        parsed = v;
      }
    }
    setBufferValue(key, parsed);
    setNewKeyDraft({ key: '', value: '' });
  }, [newKeyDraft, setBufferValue]);

  // ── Empty state ────────────────────────────────────────────────────────
  if (!run || enrichedSnapshots.length === 0) {
    return (
      <div className="flex flex-col overflow-hidden h-full" data-testid="context-inspector">
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0">
          <span className="text-xs font-bold text-text-primary tracking-wide uppercase">
            Context Inspector
          </span>
        </div>
        <div className="flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs flex items-center justify-center flex-col gap-2">
          <span className="text-[13px] text-code-muted">
            {!run ? 'Run a pipeline to inspect context flow' : 'Waiting for step execution data...'}
          </span>
          <span className="text-[11px] text-code-raised">
            {!run
              ? 'Trigger a run to see inputs, outputs, and context at each step.'
              : 'Context data will appear as steps complete.'}
          </span>
        </div>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col overflow-hidden h-full" data-testid="context-inspector">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0">
        <span className="text-xs font-bold text-text-primary tracking-wide uppercase">
          Context Inspector
        </span>
        {activeSnapshot && activeSnapshot.stepId && (
          <span className="text-[10px] text-code-muted">
            Step: {activeSnapshot.stepId.slice(0, 8)}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-border shrink-0">
        {([
          { id: 'input' as TabId, label: 'Input Context', show: true },
          { id: 'output' as TabId, label: 'Output', show: true },
          { id: 'prompt' as TabId, label: 'Resolved Prompt', show: showPromptTab },
          { id: 'details' as TabId, label: 'Details', show: true },
          { id: 'attempts' as TabId, label: `Attempts (${stepAttempts?.length})`, show: showAttemptsTab },
        ]).filter((t) => t.show).map((tab) => (
          <button
            data-ui-part=""
            key={tab.id}
            type="button"
            data-testid={tab.id === 'attempts' ? 'attempts-tab' : undefined}
            className={cn(
              'px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2',
              activeTab === tab.id
                ? 'text-primary border-b-primary'
                : 'text-text-tertiary border-b-transparent',
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Step list sidebar */}
        <ContextStepList
          snapshots={enrichedSnapshots}
          activeStepId={activeStepId}
          fallbackActiveStepId={activeSnapshot?.stepId}
          onStepSelect={onStepSelect}
        />

        {/* Content area */}
        <div className="flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs">
          {!activeSnapshot ? (
            <div className="flex items-center justify-center h-full text-text-tertiary text-xs italic">
              Select a step to inspect
            </div>
          ) : activeTab === 'input' ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] text-code-muted font-semibold uppercase">
                  Input context{activeSnapshot.stepId ? ` — step ${activeSnapshot.stepId.slice(0, 8)}` : ''}
                </div>
                {editingAllowed && (
                  <div className="flex gap-1.5 items-center">
                    {editMode && Object.keys(editBuffer).length > 0 && (
                      <button
                        data-ui-part=""
                        type="button"
                        onClick={discardChanges}
                        data-testid="context-inspector-discard"
                        className="px-2 py-0.5 text-[10px] font-semibold bg-transparent text-code-red border border-code-border rounded-sm cursor-pointer font-mono"
                      >
                        Discard changes
                      </button>
                    )}
                    <button
                      data-ui-part=""
                      type="button"
                      onClick={() => {
                        const next = !editMode;
                        setEditMode(next);
                        if (!next) discardChanges();
                      }}
                      data-testid="context-inspector-edit-toggle"
                      className={cn(
                        'px-2 py-0.5 text-[10px] font-semibold border rounded-sm cursor-pointer font-mono uppercase tracking-wide',
                        editMode
                          ? 'bg-warning text-white border-warning'
                          : 'bg-transparent text-warning-fg border-warning',
                      )}
                    >
                      {editMode ? 'Editing' : 'Edit'}
                    </button>
                  </div>
                )}
              </div>
              {Object.keys(activeSnapshot.inputContext).length === 0 && !(editingAllowed && editMode) ? (
                <div className="text-code-muted text-xs italic">
                  No input context (first step or no upstream output)
                </div>
              ) : editingAllowed && editMode ? (
                <ContextEditBuffer
                  inputContext={activeSnapshot.inputContext}
                  buffer={editBuffer}
                  parseErrors={editParseErrors}
                  newKeyDraft={newKeyDraft}
                  setNewKeyDraft={setNewKeyDraft}
                  onCommitNewKey={commitNewKey}
                  onBeginEditKey={beginEditingKey}
                  onSetValue={setBufferValue}
                  onRemoveKey={removeBufferKey}
                  onParseError={setParseError}
                />
              ) : (
                <ContextJsonTree
                  data={activeSnapshot.inputContext}
                  highlightKeys={newKeysSet}
                />
              )}
            </div>
          ) : activeTab === 'output' ? (
            <div>
              <div className="mb-2 text-[10px] text-code-muted font-semibold uppercase">
                Output{activeSnapshot.stepId ? ` — step ${activeSnapshot.stepId.slice(0, 8)}` : ''}
              </div>
              <ContextJsonTree data={activeSnapshot.output} />
              {activeSnapshot.newKeys.length > 0 && (
                <div className="mt-3">
                  <div className="text-[10px] text-code-green font-semibold uppercase mb-1">
                    New context keys added
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activeSnapshot.newKeys.map((key) => (
                      <Chip key={key} palette="code" tone="success" size="sm" mono>
                        {key}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'prompt' ? (
            <div>
              <div className="mb-2 text-[10px] text-code-muted font-semibold uppercase">
                Resolved prompt template
              </div>
              <div className="px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto">
                {activeSnapshot.resolvedPrompt}
              </div>
            </div>
          ) : activeTab === 'details' ? (
            <div>
              <div className="mb-2 text-[10px] text-code-muted font-semibold uppercase">
                Step execution details
              </div>
              <div className="flex flex-col gap-3">
                {/* Duration */}
                {activeSnapshot.stepExecution.startedAt && (
                  <div>
                    <div className="text-[11px] text-code-blue font-semibold mb-1">Duration</div>
                    <div className="text-[11px] text-code-text">
                      Started: {activeSnapshot.stepExecution.startedAt}
                      {activeSnapshot.stepExecution.completedAt && (
                        <>
                          <br />
                          Completed: {activeSnapshot.stepExecution.completedAt}
                          {activeSnapshot.stepExecution.durationMs != null && (
                            <>
                              <br />
                              Duration: {activeSnapshot.stepExecution.durationMs}ms
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* LLM details */}
                {activeSnapshot.stepExecution.llm && (
                  <div>
                    <div className="text-[11px] text-code-blue font-semibold mb-1">LLM Metrics</div>
                    <div className="text-[11px] text-code-text">
                      Tokens in: {activeSnapshot.stepExecution.llm.tokensIn}
                      <br />
                      Tokens out: {activeSnapshot.stepExecution.llm.tokensOut}
                      {activeSnapshot.stepExecution.llm.firstTokenLatencyMs != null && (
                        <>
                          <br />
                          First token latency: {activeSnapshot.stepExecution.llm.firstTokenLatencyMs}ms
                        </>
                      )}
                    </div>
                    {activeSnapshot.stepExecution.llm.response && (
                      <>
                        <div className="text-[11px] text-code-blue font-semibold mt-2 mb-1">
                          Response Text
                        </div>
                        <div className="px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto">
                          {activeSnapshot.stepExecution.llm.response}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Error details */}
                {activeSnapshot.stepExecution.error && (
                  <div>
                    <div className="text-[11px] text-code-red font-semibold mb-1">Error</div>
                    {/* Code-surface bg, not a tinted danger-bg: the nested
                        label below is code-red, a pastel tuned for the dark
                        code palette, and reads poorly on a light surface
                        tint. Matches CODE_TONE_SOFT.danger's flat-bg rule. */}
                    <div className="px-3 py-2.5 bg-code-surface border border-code-red rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto">
                      <div className="text-code-red font-semibold mb-1">
                        {activeSnapshot.stepExecution.error}
                      </div>
                    </div>
                  </div>
                )}

                {/* Approval records */}
                {activeSnapshot.stepExecution.approvals && activeSnapshot.stepExecution.approvals.length > 0 && (
                  <div>
                    <div className="text-[11px] text-code-blue font-semibold mb-1">
                      Approvals ({activeSnapshot.stepExecution.approvals.length})
                    </div>
                    {activeSnapshot.stepExecution.approvals.map((approval, idx) => (
                      <div key={idx} className="px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2">
                        <div className="flex gap-2 mb-1">
                          <Chip palette="code" tone={approval.decision === 'approve' ? 'success' : 'danger'} size="xs">
                            {approval.decision.toUpperCase()}
                          </Chip>
                          <span className="text-[11px] text-code-text">{approval.userId}</span>
                        </div>
                        {approval.comment && (
                          <div className="text-[11px] text-code-comment italic">
                            &quot;{approval.comment}&quot;
                          </div>
                        )}
                        <div className="text-[10px] text-code-muted mt-1">
                          {approval.at}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Status */}
                <div>
                  <div className="text-[11px] text-code-blue font-semibold mb-1">Status</div>
                  <div className="text-[11px] text-code-text">
                    {activeSnapshot.stepExecution.status}
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'attempts' && stepAttempts && stepAttempts.length >= 2 ? (
            <div>
              {/* Pair selector */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  data-ui-part=""
                  type="button"
                  data-testid="attempts-prev"
                  disabled={compareIdx === 0}
                  onClick={() => setCompareIdx((c) => c - 1)}
                  className={cn(
                    'px-2 py-0.5 text-[11px] bg-transparent border border-code-border rounded-sm font-mono',
                    compareIdx === 0 ? 'text-code-raised cursor-not-allowed' : 'text-code-text cursor-pointer',
                  )}
                >
                  ←
                </button>
                <span
                  data-testid="attempts-label"
                  className="text-[11px] text-code-comment flex-1 text-center"
                >
                  Attempt {compareIdx + 1} vs {compareIdx + 2} of {stepAttempts.length}
                </span>
                <button
                  data-ui-part=""
                  type="button"
                  data-testid="attempts-next"
                  disabled={compareIdx >= stepAttempts.length - 2}
                  onClick={() => setCompareIdx((c) => c + 1)}
                  className={cn(
                    'px-2 py-0.5 text-[11px] bg-transparent border border-code-border rounded-sm font-mono',
                    compareIdx >= stepAttempts.length - 2 ? 'text-code-raised cursor-not-allowed' : 'text-code-text cursor-pointer',
                  )}
                >
                  →
                </button>
              </div>
              {/* Two-column diff */}
              <div className="grid grid-cols-2 gap-2.5">
                <AttemptCard attempt={stepAttempts[compareIdx]} label={`Attempt ${compareIdx + 1}`} />
                <AttemptCard attempt={stepAttempts[compareIdx + 1]} label={`Attempt ${compareIdx + 2}`} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
