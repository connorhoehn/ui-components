// src/components/pipelines/editor/EditorTopBar.tsx
//
// Top toolbar for the pipeline editor: pipeline name editor, status chips,
// validation indicator, run/stop button, publish button, and overflow menu trigger.

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { cn } from '../../../lib/cn';
import { useClickOutside } from '../hooks/useClickOutside';
import { usePipelineEditor } from '../context/PipelineEditorContext';
import { validatePipeline } from '../validation/validatePipeline';
import IconPicker from '../../shared/IconPicker';
import { IconButton } from '../../ui/IconButton';
import { Button } from '../../ui/Button';
import type {
  PipelineDefinition,
  ValidationIssue,
} from '../../../types/pipeline';
import { lookupStepName } from './useEditorRunLifecycle';
import EditorOverflowMenu from './EditorOverflowMenu';

// ---------------------------------------------------------------------------
// Chip variant utility
// ---------------------------------------------------------------------------

type ChipVariant = 'success' | 'info' | 'neutral' | 'warning' | 'danger';

const chipVariantClasses: Record<ChipVariant, string> = {
  neutral: 'bg-surface-hover text-text-secondary',
  success: 'bg-success-bg text-success-fg',
  warning: 'bg-warning-bg text-warning-fg',
  danger: 'bg-danger-bg text-danger-fg',
  info: 'bg-info-bg text-info-fg',
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface EditorTopBarProps {
  pipelineId: string;
  definition: PipelineDefinition;
  dirty: boolean;
  savingFlash: boolean;
  isRunActive: boolean;
  isTriggering: boolean;
  runDisabled: boolean;
  runTitle: string;
  currentRun?: { status: string; durationMs?: number; error?: { nodeId?: string }; steps: Record<string, { status: string }>; startedAt: string };
  breakpoints: Set<string>;
  onRunClick: () => void;
  onDebugRunClick: () => void;
  onExport: () => void;
  onPublishClick: () => void;
  // Overflow menu actions
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function EditorTopBar({
  pipelineId,
  definition,
  dirty,
  savingFlash,
  isRunActive,
  isTriggering,
  runDisabled,
  runTitle,
  currentRun,
  breakpoints,
  onRunClick,
  onDebugRunClick,
  onExport,
  onPublishClick,
  onDuplicate,
  onCopyMermaid,
  onViewVersions,
  onRevert,
  onToggleShowTags,
  showTags,
  onViewRunHistory,
  onClearRunHistory,
  onSimPanelOpen,
  onDelete,
}: EditorTopBarProps) {
  const navigate = useNavigate();
  const { rename, setIcon, setSelectedNodeId } = usePipelineEditor();

  // ── Inline name editor ─────────────────────────────────────────────────
  const [nameEditing, setNameEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (nameEditing) {
      setNameDraft(definition.name ?? '');
      setTimeout(() => nameInputRef.current?.focus(), 0);
    }
  }, [nameEditing, definition.name]);

  const commitName = () => {
    const next = nameDraft.trim();
    if (next && next !== definition.name) {
      rename(next);
    }
    setNameEditing(false);
  };

  // ── Validation ──────────────────────────────────────────────────────────
  // `validatePipeline` is the full graph validator — cycle detection plus a
  // handle-compatibility pass over every node and edge. It was running on
  // every render of the top bar, and the top bar re-renders on every
  // WebSocket step event during a live run (its `currentRun` prop is a new
  // object each time), so a 40-node pipeline emitting 200 events re-validated
  // the whole graph 200 times. It only depends on the definition.
  const validation = useMemo(
    () => (definition ? validatePipeline(definition) : null),
    [definition],
  );
  const hasErrors = (validation?.errors.length ?? 0) > 0;
  const isPublished = definition.status === 'published';

  // Save-status chip
  const saveChip: { label: string; variant: ChipVariant } =
    dirty
      ? { label: 'Saving…', variant: 'info' }
      : savingFlash
        ? { label: '✓ Saved', variant: 'success' }
        : { label: '✓ Saved', variant: 'neutral' };

  // Version badge
  const versionBadge = definition.status === 'published'
    ? { label: `v${definition.version} · Published`, variant: 'success' as ChipVariant }
    : typeof definition.publishedVersion === 'number'
      ? { label: `v${definition.version} · Draft (pub v${definition.publishedVersion})`, variant: 'warning' as ChipVariant }
      : { label: `v${definition.version} · Draft`, variant: 'neutral' as ChipVariant };

  // Validation indicator
  const validationIndicator = validation
    ? validation.errors.length > 0
      ? { label: `✗ ${validation.errors.length} error${validation.errors.length === 1 ? '' : 's'}`, variant: 'danger' as ChipVariant }
      : validation.warnings.length > 0
        ? { label: `⚠ ${validation.warnings.length} warning${validation.warnings.length === 1 ? '' : 's'}`, variant: 'warning' as ChipVariant }
        : { label: '✓ Valid', variant: 'success' as ChipVariant }
    : { label: '…', variant: 'neutral' as ChipVariant };

  // Validation popover
  const [validationOpen, setValidationOpen] = useState(false);
  const validationRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(validationRef, () => setValidationOpen(false), validationOpen);

  const allIssues: ValidationIssue[] = validation
    ? [...validation.errors, ...validation.warnings]
    : [];

  const jumpToNode = (nodeId?: string) => {
    if (!nodeId) return;
    setSelectedNodeId(nodeId);
    setValidationOpen(false);
  };

  // ── Toolbar run status computation ──────────────────────────────────
  const totalSteps = definition.nodes.filter((n) => n.type !== 'trigger').length;
  const completedSteps = currentRun
    ? Object.values(currentRun.steps).filter(
        (s) => s.status === 'completed' || s.status === 'skipped',
      ).length
    : 0;
  const elapsedMs = currentRun?.startedAt
    ? Date.now() - new Date(currentRun.startedAt).getTime()
    : 0;
  const elapsedSec = (elapsedMs / 1000).toFixed(1);

  const toolbarRunStatus: { text: string; variant: 'running' | 'success' | 'error' | 'none' } =
    isRunActive && currentRun
      ? { text: `Running (${completedSteps}/${totalSteps} steps) · ${elapsedSec}s`, variant: 'running' }
      : currentRun?.status === 'completed'
        // `durationMs` is `number | undefined`; a truthiness test sent a
        // legitimate 0 down the "unknown" branch, so a run that finished in
        // under a millisecond reported "Completed in ?s" instead of
        // "Completed in 0.0s". Only `undefined`/`null` is unknown.
        ? {
            text: `Completed in ${
              currentRun.durationMs != null
                ? (currentRun.durationMs / 1000).toFixed(1)
                : '?'
            }s`,
            variant: 'success',
          }
        : currentRun?.status === 'failed'
          ? { text: `Failed at ${lookupStepName(definition, currentRun.error?.nodeId)}`, variant: 'error' }
          : { text: '', variant: 'none' };

  const runStatusVariantClasses: Record<string, string> = {
    running: 'bg-info-bg text-info-fg',
    success: 'bg-success-bg text-success-fg',
    error: 'bg-danger-bg text-danger-fg',
  };

  // Run button label
  const runBtnLabel = isRunActive
    ? '⏹ Stop'
    : currentRun && currentRun.status !== 'running'
      ? '↻ Re-run'
      : '▶ Run';

  // ── Overflow menu ──────────────────────────────────────────────────────
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);

  return (
    <div
      className={cn(
        'h-11 shrink-0 flex items-center gap-2.5 px-3',
        'border-b border-border bg-surface',
        'sticky top-0 z-5',
      )}
    >
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
          className={cn(
            'px-2 py-1 text-sm font-bold text-text-primary',
            'bg-surface border border-border-field rounded-md',
            'font-inherit outline-none w-[260px]',
          )}
          data-testid="pipeline-name-input"
        />
      ) : (
        <button
          type="button"
          onClick={() => setNameEditing(true)}
          className={cn(
            'px-2 py-1 text-sm font-bold text-text-primary',
            'bg-transparent border border-transparent rounded-md',
            'cursor-text font-inherit max-w-[280px]',
            'overflow-hidden text-ellipsis whitespace-nowrap text-left',
          )}
          title={definition.name}
          data-testid="pipeline-name"
        >
          {definition.name}
        </button>
      )}

      <span
        className={cn(
          'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap',
          chipVariantClasses[saveChip.variant],
        )}
        data-testid="save-status"
      >
        {saveChip.label}
      </span>

      <span
        className={cn(
          'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap',
          chipVariantClasses[versionBadge.variant],
        )}
        data-testid="version-badge"
      >
        {versionBadge.label}
      </span>

      <div className="relative" ref={validationRef}>
        <button
          type="button"
          onClick={() => setValidationOpen((x) => !x)}
          className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap',
            'cursor-pointer border-none',
            chipVariantClasses[validationIndicator.variant],
          )}
          data-testid="validation-indicator"
        >
          {validationIndicator.label}
        </button>
        {validationOpen && allIssues.length > 0 && (
          <div
            className={cn(
              'absolute top-full mt-1.5 bg-surface border border-border rounded-lg',
              'shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20',
            )}
          >
            {allIssues.map((issue, idx) => (
              <button
                key={`${issue.code}-${idx}`}
                type="button"
                onClick={() => jumpToNode(issue.nodeId)}
                className={cn(
                  'block w-full text-left px-3.5 py-2 text-[13px]',
                  'border-none bg-transparent font-inherit text-text-primary',
                  'flex gap-2 items-start leading-snug',
                  issue.nodeId ? 'cursor-pointer' : 'cursor-default',
                  idx < allIssues.length - 1 && 'border-b border-border',
                )}
              >
                <span
                  className={cn(
                    'font-bold text-xs',
                    issue.severity === 'error' ? 'text-danger-fg' : 'text-warning-fg',
                  )}
                >
                  {issue.severity === 'error' ? '✗' : '⚠'}
                </span>
                <span className="flex-1 text-xs">
                  <div className="font-semibold">{issue.code}</div>
                  <div className="text-text-secondary">{issue.message}</div>
                  {issue.nodeId && (
                    <div className="mt-0.5 text-[11px] text-primary">
                      Jump to node →
                    </div>
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Run status indicator */}
      {toolbarRunStatus.variant !== 'none' && (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap',
            runStatusVariantClasses[toolbarRunStatus.variant],
          )}
          data-testid="run-status-indicator"
        >
          {toolbarRunStatus.variant === 'running' && (
            <span className="inline-block w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" />
          )}
          {toolbarRunStatus.variant === 'success' && '✓ '}
          {toolbarRunStatus.variant === 'error' && '✗ '}
          {toolbarRunStatus.text}
        </span>
      )}

      <div className="flex-1" />

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
        onClick={onExport}
        title="Export pipeline as JSON"
        data-testid="export-button"
      >
        Export
      </Button>

      <button
        type="button"
        onClick={onPublishClick}
        title={isPublished ? 'Already published at this version' : 'Publish pipeline to enable runs'}
        disabled={isPublished}
        className={cn(
          'px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0',
          isPublished
            ? 'bg-surface-hover text-text-tertiary cursor-default opacity-70'
            : 'bg-success text-white cursor-pointer',
        )}
        data-testid="publish-button"
      >
        {isPublished ? 'Published' : 'Publish'}
      </button>

      <button
        type="button"
        onClick={onRunClick}
        disabled={runDisabled || isTriggering}
        title={runTitle}
        className={cn(
          'px-3.5 py-1.5 text-[13px] font-semibold text-white border-none rounded-md font-inherit shrink-0',
          isRunActive ? 'bg-danger' : 'bg-primary',
          (runDisabled || isTriggering) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        )}
        data-testid="run-button"
      >
        {isTriggering ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 border-2 border-border border-t-white rounded-full animate-spin" />
            Triggering…
          </span>
        ) : (
          runBtnLabel
        )}
      </button>

      {breakpoints.size > 0 && (
        <button
          type="button"
          onClick={onDebugRunClick}
          disabled={runDisabled || isRunActive}
          title={`Debug run (${breakpoints.size} breakpoint${breakpoints.size > 1 ? 's' : ''})`}
          className={cn(
            'px-3.5 py-1.5 text-[13px] font-semibold bg-warning text-white',
            'border-none rounded-md font-inherit shrink-0',
            (runDisabled || isRunActive) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          )}
          data-testid="debug-run-button"
        >
          Debug ({breakpoints.size})
        </button>
      )}

      <div className="relative" ref={menuRef}>
        <IconButton
          onClick={() => setMenuOpen((x) => !x)}
          aria-label="More actions"
          data-testid="overflow-menu-btn"
        >
          ⋯
        </IconButton>
        {menuOpen && (
          <EditorOverflowMenu
            isPublished={isPublished}
            showTags={showTags}
            onDuplicate={() => { onDuplicate(); setMenuOpen(false); }}
            onCopyMermaid={() => { onCopyMermaid(); setMenuOpen(false); }}
            onViewVersions={() => { onViewVersions(); setMenuOpen(false); }}
            onRevert={() => { onRevert(); setMenuOpen(false); }}
            onToggleShowTags={() => { onToggleShowTags(); setMenuOpen(false); }}
            onViewRunHistory={() => { onViewRunHistory(); setMenuOpen(false); }}
            onClearRunHistory={() => { onClearRunHistory(); setMenuOpen(false); }}
            onSimPanelOpen={() => { onSimPanelOpen(); setMenuOpen(false); }}
            onDelete={() => { onDelete(); setMenuOpen(false); }}
            hasPublishedVersion={typeof definition.publishedVersion === 'number'}
          />
        )}
      </div>
    </div>
  );
}
