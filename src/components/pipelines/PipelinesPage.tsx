// frontend/src/components/pipelines/PipelinesPage.tsx
//
// List view for pipelines (route `/pipelines`). Matches PIPELINES_PLAN.md
// §18.3 layout: sticky header with primary CTA, filter bar (search / status /
// trigger / sort), and a card grid populated from localStorage-backed storage.
//
// Decomposed: filter bar → PipelinesFilterBar, bulk actions → PipelinesBulkActionBar,
// selection logic → usePipelinesSelection.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { cn } from '../../lib/cn';
import PipelineCard from './PipelineCard';
import PipelinesFilterBar from './PipelinesFilterBar';
import PipelinesBulkActionBar from './PipelinesBulkActionBar';
import { usePipelinesSelection } from './usePipelinesSelection';
import {
  createDemoPipeline,
  duplicatePipeline,
  exportPipelineJSON,
  type PipelineIndexEntry,
} from './persistence/pipelineStorage';
import {
  listPipelines,
  loadPipeline,
  createPipeline,
  deletePipeline,
  publishPipeline,
  savePipeline,
} from './persistence/pipelineStorageRemote';
import TemplatesModal from './TemplatesModal';
import { useTriggerRun } from './hooks/useTriggerRun';
import type { PipelineTemplate } from './templates';
import type {
  PipelineDefinition,
  TriggerBinding,
  TriggerType,
} from '../../types/pipeline';
import EmptyState from '../shared/EmptyState';
import Modal from '../shared/Modal';
import { useToast } from '../shared/ToastProvider';
import { useIdentityContext } from '../../contexts/IdentityContext';
import { downloadJSON } from './utils/fileUtils';

import type { TriggerFilter, SortKey } from './PipelinesFilterBar';

// ---------------------------------------------------------------------------
// Types / filters
// ---------------------------------------------------------------------------

export type StatusKey = 'draft' | 'published' | 'archived';
export const STATUS_KEYS: readonly StatusKey[] = ['draft', 'published', 'archived'] as const;

// When the URL has no `status` param at all, default the filter to hide
// archived pipelines (so the list isn't cluttered after an archive).
const DEFAULT_STATUS_KEYS: readonly StatusKey[] = ['draft', 'published'] as const;

/**
 * Parse the `?status=` param into a Set. Unknown values are dropped silently.
 * Empty or missing param -> `null`, signaling the caller should fall back to
 * `DEFAULT_STATUS_KEYS`.
 */
export function parseStatusParam(raw: string | null): Set<StatusKey> | null {
  if (raw == null) return null;
  if (raw.trim() === '') return new Set<StatusKey>();
  const allowed = new Set<string>(STATUS_KEYS);
  const out = new Set<StatusKey>(
    raw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => allowed.has(s)) as StatusKey[],
  );
  return out;
}

export interface PipelineRow extends PipelineIndexEntry {
  version: number;
  publishedVersion?: number;
  nodeCount: number;
  triggerBinding?: TriggerBinding;
  createdAt: string;
  icon: string;
  tags: string[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toRow(def: PipelineDefinition, fallbackIcon?: string): PipelineRow {
  return {
    id: def.id,
    name: def.name,
    status: def.status || 'draft',
    updatedAt: def.updatedAt,
    version: def.version,
    publishedVersion: def.publishedVersion,
    nodeCount: (def.nodes ?? []).length,
    triggerBinding: def.triggerBinding,
    createdAt: def.createdAt,
    icon: def.icon ?? fallbackIcon ?? '🔀',
    tags: def.tags ?? [],
  };
}

function triggerCategory(binding?: TriggerBinding): TriggerFilter {
  const ev: TriggerType | undefined = binding?.event;
  if (!ev || ev === 'manual') return 'manual';
  if (ev === 'schedule') return 'schedule';
  if (ev === 'webhook') return 'webhook';
  return 'document';
}

function slugify(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'pipeline'
  );
}

function todayStamp(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// ---------------------------------------------------------------------------
// New-pipeline modal
// ---------------------------------------------------------------------------

function NewPipelineModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}) {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setName('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const canSubmit = name.trim().length > 0;
  const handleSubmit = () => {
    if (canSubmit) onCreate(name.trim());
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create new pipeline"
      maxWidth={440}
      footer={
        <>
          <button
            data-testid="new-pipeline-cancel"
            className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            data-testid="new-pipeline-confirm"
            className={cn(
              'px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer',
              !canSubmit && 'opacity-50 cursor-not-allowed',
            )}
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Create pipeline
          </button>
        </>
      }
    >
      <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">
        Name
      </label>
      <input
        ref={inputRef}
        data-testid="new-pipeline-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
        placeholder="e.g. Invoice summarizer"
        className={cn(
          'border border-border-field rounded-md px-3 py-2 text-sm',
          'bg-[#f9fafb] text-text-primary outline-none',
          'box-border w-full',
        )}
      />
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PipelinesPage() {
  const navigate = useNavigate();
  const { userId } = useIdentityContext();
  const { toast } = useToast();
  const { triggerRun, isTriggering } = useTriggerRun();
  const [searchParams, setSearchParams] = useSearchParams();

  const [rows, setRows] = useState<PipelineRow[]>([]);
  const [search, setSearch] = useState('');
  const [triggerFilter, setTriggerFilter] = useState<TriggerFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('updated');

  // Status filter is URL-bound (multi-select) for shareable links + back-button restore.
  const statusFilterParsed = useMemo(
    () => parseStatusParam(searchParams.get('status')),
    [searchParams],
  );
  const statusFilter: Set<StatusKey> = useMemo(() => {
    if (statusFilterParsed == null) return new Set<StatusKey>(DEFAULT_STATUS_KEYS);
    return statusFilterParsed;
  }, [statusFilterParsed]);
  const statusExplicit = statusFilterParsed != null;

  const updateStatusParam = (next: Set<StatusKey>) => {
    const params = new URLSearchParams(searchParams);
    if (next.size === 0) {
      params.set('status', '');
    } else {
      const csv = STATUS_KEYS.filter((k) => next.has(k)).join(',');
      params.set('status', csv);
    }
    setSearchParams(params, { replace: true });
  };

  const toggleStatusKey = (k: StatusKey) => {
    const base: Set<StatusKey> = statusExplicit
      ? new Set(statusFilter)
      : new Set(DEFAULT_STATUS_KEYS);
    if (base.has(k)) base.delete(k);
    else base.add(k);
    updateStatusParam(base);
  };

  const [newModalOpen, setNewModalOpen] = useState(false);
  const [templatesModalOpen, setTemplatesModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ─── Bulk selection / tag popover state ───────────────────────────────────
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [addTagOpen, setAddTagOpen] = useState(false);
  const [removeTagOpen, setRemoveTagOpen] = useState(false);

  // Load / refresh from storage.
  const refresh = useCallback(async () => {
    const entries = await listPipelines();
    const enriched: PipelineRow[] = [];
    for (const e of entries) {
      const def = await loadPipeline(e.id);
      if (def) enriched.push(toRow(def, e.icon));
    }
    setRows(enriched);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // ─── Filter + sort pipeline (client-side) ─────────────────────────────────

  const visibleRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = rows.filter((r) => {
      if (q) {
        const nameHit = r.name.toLowerCase().includes(q);
        const tagHit = r.tags.some((t) => t.toLowerCase().includes(q));
        if (!nameHit && !tagHit) return false;
      }
      if (!(statusExplicit && statusFilter.size === 0)) {
        if (!statusFilter.has(r.status as StatusKey)) return false;
      }
      if (triggerFilter !== 'all' && triggerCategory(r.triggerBinding) !== triggerFilter)
        return false;
      return true;
    });

    const sorted = [...filtered];
    if (sortKey === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortKey === 'created') {
      sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else {
      sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }
    return sorted;
  }, [rows, search, statusFilter, statusExplicit, triggerFilter, sortKey]);

  const filteredIds = useMemo(() => visibleRows.map((r) => r.id), [visibleRows]);

  // ─── Selection hook ───────────────────────────────────────────────────────

  const {
    selectionMode,
    selected,
    allVisibleSelected,
    someVisibleSelected,
    selectAllRef,
    handleToggleSelectMode,
    handleToggleSelect,
    handleSelectAllFiltered,
    handleHeaderToggleAll,
    clearSelection,
    setSelectionMode,
  } = usePipelinesSelection({ visibleRows, filteredIds });

  // Union of tags across the selected rows (for the "Remove tag" popover).
  const selectedUnionTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const r of rows) {
      if (!selected.has(r.id)) continue;
      for (const t of r.tags) tagSet.add(t);
    }
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [rows, selected]);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleCreate = async (name: string) => {
    const def = await createPipeline({ name, createdBy: userId });
    setNewModalOpen(false);
    navigate(`/pipelines/${def.id}`);
  };

  const handleSpawnDemo = () => {
    const def = createDemoPipeline(userId);
    void savePipeline(def).then(() => refresh());
    navigate(`/pipelines/${def.id}`);
  };

  const handleSelectTemplate = (template: PipelineTemplate) => {
    const def = template.build(userId);
    void savePipeline(def);
    setTemplatesModalOpen(false);
    navigate(`/pipelines/${def.id}`);
  };

  const handleOpen = (id: string) => navigate(`/pipelines/${id}`);

  const handleRun = async (row: PipelineRow) => {
    if (row.status !== 'published') {
      toast('Run requires published state', { type: 'warning' });
      return;
    }
    if (isTriggering) return;
    try {
      const runId = await triggerRun(row.id, {});
      if (runId) {
        toast(`Run started for "${row.name}"`, { type: 'success' });
      } else {
        toast('Could not start run', { type: 'error' });
      }
    } catch (err) {
      toast(`Run failed: ${(err as Error).message}`, { type: 'error' });
    } finally {
      navigate(`/pipelines/${row.id}`);
    }
  };

  const handleDuplicate = (id: string) => {
    const clone = duplicatePipeline(id);
    if (clone) {
      void savePipeline(clone).then(() => refresh());
      toast(`Duplicated as "${clone.name}"`, { type: 'success' });
    }
  };

  const handleExport = (row: PipelineRow) => {
    const json = exportPipelineJSON(row.id);
    if (!json) {
      toast('Export failed', { type: 'error' });
      return;
    }
    downloadJSON(`${slugify(row.name)}.pipeline.json`, json);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deletePipeline(deleteId);
    setDeleteId(null);
    void refresh();
    toast('Pipeline deleted', { type: 'success' });
  };

  const deleteRow = deleteId ? rows.find((r) => r.id === deleteId) : null;

  // ─── Bulk action handlers ─────────────────────────────────────────────────

  const handleBulkExport = () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    ids.forEach((id, i) => {
      window.setTimeout(() => {
        const row = rows.find((r) => r.id === id);
        const json = exportPipelineJSON(id);
        if (!row || !json) return;
        downloadJSON(`${slugify(row.name)}-${todayStamp()}.pipeline.json`, json);
      }, i * 100);
    });
    toast(`Exported ${ids.length} pipeline${ids.length === 1 ? '' : 's'}`, {
      type: 'success',
    });
  };

  const handleBulkAddTagSubmit = async (tag: string) => {
    const ids = Array.from(selected);
    for (const id of ids) {
      const def = await loadPipeline(id);
      if (!def) continue;
      const current = def.tags ?? [];
      if (current.includes(tag)) continue;
      def.tags = [...current, tag];
      await savePipeline(def);
    }
    setAddTagOpen(false);
    void refresh();
    toast(`Added tag "${tag}" to ${ids.length} pipeline${ids.length === 1 ? '' : 's'}`, {
      type: 'success',
    });
  };

  const handleBulkRemoveTagSubmit = async (tag: string) => {
    const ids = Array.from(selected);
    for (const id of ids) {
      const def = await loadPipeline(id);
      if (!def) continue;
      const current = def.tags ?? [];
      if (!current.includes(tag)) continue;
      def.tags = current.filter((t) => t !== tag);
      await savePipeline(def);
    }
    void refresh();
    toast(`Removed tag "${tag}" from ${ids.length} pipeline${ids.length === 1 ? '' : 's'}`, {
      type: 'success',
    });
  };

  const handleBulkDeleteConfirm = async () => {
    const ids = Array.from(selected);
    for (const id of ids) await deletePipeline(id);
    setBulkDeleteOpen(false);
    clearSelection();
    void refresh();
    toast(`Deleted ${ids.length} pipeline${ids.length === 1 ? '' : 's'}`, {
      type: 'success',
    });
  };

  const handleBulkPublish = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    let publishedCount = 0;
    let skippedCount = 0;
    for (const id of ids) {
      const def = await loadPipeline(id);
      if (!def) continue;
      if (def.status === 'published') {
        skippedCount += 1;
        continue;
      }
      const res = await publishPipeline(id);
      if (res) publishedCount += 1;
    }
    void refresh();
    if (skippedCount > 0) {
      toast(
        `Published ${publishedCount}; skipped ${skippedCount} already published`,
        { type: 'success' },
      );
    } else {
      toast(
        `Published ${publishedCount} pipeline${publishedCount === 1 ? '' : 's'}`,
        { type: 'success' },
      );
    }
  };

  const handleBulkArchive = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    let archivedCount = 0;
    let unarchivedCount = 0;
    for (const id of ids) {
      const def = await loadPipeline(id);
      if (!def) continue;
      const wasArchived = def.status === 'archived';
      if (wasArchived) {
        def.status = 'draft';
        unarchivedCount += 1;
      } else {
        def.status = 'archived';
        archivedCount += 1;
      }
      await savePipeline(def);
    }
    void refresh();
    const parts: string[] = [];
    if (archivedCount > 0) parts.push(`Archived ${archivedCount}`);
    if (unarchivedCount > 0) parts.push(`Unarchived ${unarchivedCount}`);
    toast(parts.join(' · ') || 'No pipelines changed', { type: 'success' });
  };

  const handleBulkExportAsJSON = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    const defs: PipelineDefinition[] = [];
    for (const id of ids) {
      const def = await loadPipeline(id);
      if (def) defs.push(def);
    }
    if (defs.length === 0) {
      toast('Export failed', { type: 'error' });
      return;
    }
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    downloadJSON(`pipelines-${ts}.json`, JSON.stringify(defs, null, 2));
    toast(`Exported ${defs.length} pipeline${defs.length === 1 ? '' : 's'}`, {
      type: 'success',
    });
  };

  // ─── Keyboard shortcuts ───────────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) {
          return;
        }
      }

      if (e.key === 'Escape') {
        if (selected.size > 0 || selectionMode || addTagOpen || removeTagOpen) {
          setAddTagOpen(false);
          setRemoveTagOpen(false);
          clearSelection();
          setSelectionMode(false);
        }
        return;
      }

      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && (e.key === 'a' || e.key === 'A')) {
        if (selectionMode) {
          e.preventDefault();
          handleSelectAllFiltered();
        }
        return;
      }

      if ((e.key === 'Delete' || e.key === 'Backspace') && selected.size > 0) {
        if (!bulkDeleteOpen && !deleteId && !newModalOpen && !templatesModalOpen) {
          e.preventDefault();
          setBulkDeleteOpen(true);
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    selected,
    selectionMode,
    addTagOpen,
    removeTagOpen,
    bulkDeleteOpen,
    deleteId,
    newModalOpen,
    templatesModalOpen,
    clearSelection,
    handleSelectAllFiltered,
    setSelectionMode,
  ]);

  // ─── Render ───────────────────────────────────────────────────────────────

  const hasAnyPipelines = rows.length > 0;
  const anySelected = selected.size > 0;

  return (
    <div
      data-testid="pipelines-page"
      className="flex flex-col h-full overflow-hidden bg-[#fafbfc] font-inherit"
    >
      {/* Header (sticky, 56px) */}
      <div
        className={cn(
          'h-14 shrink-0 flex items-center justify-between px-6',
          'border-b border-border bg-white',
          'sticky top-0 z-[2]',
        )}
      >
        <div className="text-lg font-bold text-text-primary">Pipelines</div>
        <div className="flex items-center gap-2">
          <button
            data-testid="metrics-btn"
            onClick={() => navigate('/pipelines/metrics')}
            className={cn(
              'px-4 py-[7px] text-[13px] font-semibold',
              'bg-white text-text-secondary',
              'border border-border-field rounded-[7px]',
              'cursor-pointer font-inherit',
            )}
          >
            Metrics
          </button>
          <button
            data-testid="templates-btn"
            onClick={() => setTemplatesModalOpen(true)}
            className={cn(
              'px-4 py-[7px] text-[13px] font-semibold',
              'bg-white text-text-secondary',
              'border border-border-field rounded-[7px]',
              'cursor-pointer font-inherit',
            )}
          >
            Templates
          </button>
          <button
            data-testid="new-pipeline-btn"
            onClick={() => setNewModalOpen(true)}
            className={cn(
              'px-4 py-[7px] text-[13px] font-semibold',
              'bg-primary text-white border-none rounded-md',
              'cursor-pointer font-inherit',
            )}
          >
            + New Pipeline
          </button>
        </div>
      </div>

      {/* Filter bar */}
      {hasAnyPipelines && (
        <PipelinesFilterBar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          statusExplicit={statusExplicit}
          onToggleStatusKey={toggleStatusKey}
          triggerFilter={triggerFilter}
          onTriggerFilterChange={setTriggerFilter}
          sortKey={sortKey}
          onSortKeyChange={setSortKey}
          allVisibleSelected={allVisibleSelected}
          selectAllRef={selectAllRef}
          onHeaderToggleAll={handleHeaderToggleAll}
        />
      )}

      {/* Bulk action bar (sticky under filter row) */}
      {anySelected && (
        <PipelinesBulkActionBar
          count={selected.size}
          onClear={clearSelection}
          onExport={handleBulkExport}
          onExportAsJSON={handleBulkExportAsJSON}
          onPublish={handleBulkPublish}
          onArchive={handleBulkArchive}
          onAddTag={() => {
            setAddTagOpen((v) => !v);
            setRemoveTagOpen(false);
          }}
          onRemoveTag={() => {
            setRemoveTagOpen((v) => !v);
            setAddTagOpen(false);
          }}
          onDelete={() => setBulkDeleteOpen(true)}
          onDeleteWithConfirm={() => setBulkDeleteOpen(true)}
          addTagOpen={addTagOpen}
          removeTagOpen={removeTagOpen}
          onSubmitAddTag={handleBulkAddTagSubmit}
          onSubmitRemoveTag={handleBulkRemoveTagSubmit}
          onCloseAddTag={() => setAddTagOpen(false)}
          onCloseRemoveTag={() => setRemoveTagOpen(false)}
          unionTags={selectedUnionTags}
        />
      )}

      {/* Body */}
      <div
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden min-w-0',
          hasAnyPipelines ? 'p-6' : 'p-0',
        )}
      >
        {!hasAnyPipelines ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
              <EmptyState
                icon="🔀"
                title="No pipelines yet"
                body="Design your first one — from scratch or pick a template later."
                actionLabel="+ New Pipeline"
                onAction={() => setNewModalOpen(true)}
              />
            </div>
            <div className="flex justify-center items-center gap-2.5 text-[13px] text-text-tertiary px-6 pb-8">
              <button
                data-testid="empty-state-demo"
                onClick={handleSpawnDemo}
                className="bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit"
              >
                or try the demo pipeline
              </button>
              <span aria-hidden>·</span>
              <button
                data-testid="empty-state-templates"
                onClick={() => setTemplatesModalOpen(true)}
                className="bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit"
              >
                or browse templates
              </button>
            </div>
          </div>
        ) : visibleRows.length === 0 ? (
          <div
            data-testid="filtered-empty"
            className="text-center p-12 text-[13px] text-text-tertiary"
          >
            No pipelines match the current filters.
          </div>
        ) : (
          <div
            data-testid="pipeline-grid"
            className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[50px]"
          >
            {visibleRows.map((row) => (
              <PipelineCard
                key={row.id}
                row={row}
                onOpen={() => handleOpen(row.id)}
                onRun={() => {
                  void handleRun(row);
                }}
                onDuplicate={() => handleDuplicate(row.id)}
                onExport={() => handleExport(row)}
                onDelete={() => setDeleteId(row.id)}
                selectionMode={selectionMode}
                selected={selected.has(row.id)}
                anySelected={anySelected}
                onToggleSelect={(shift) => handleToggleSelect(row.id, shift)}
              />
            ))}
          </div>
        )}
      </div>

      {/* New pipeline modal */}
      <NewPipelineModal
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        onCreate={handleCreate}
      />

      {/* Templates modal */}
      <TemplatesModal
        open={templatesModalOpen}
        onClose={() => setTemplatesModalOpen(false)}
        onSelect={handleSelectTemplate}
      />

      {/* Single delete confirmation modal */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete pipeline?"
        maxWidth={400}
        footer={
          <>
            <button
              data-testid="delete-pipeline-cancel"
              className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </button>
            <button
              data-testid="delete-pipeline-confirm"
              onClick={handleDeleteConfirm}
              className={cn(
                'px-[18px] py-[7px] text-[13px] font-semibold',
                'bg-danger text-white border-none rounded-[7px]',
                'cursor-pointer font-inherit',
              )}
            >
              Delete
            </button>
          </>
        }
      >
        {deleteRow && (
          <p className="m-0">
            <strong>&ldquo;{deleteRow.name}&rdquo;</strong> will be permanently removed.
            Run history will also be lost.
          </p>
        )}
      </Modal>

      {/* Bulk delete confirmation modal */}
      <Modal
        open={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        title={`Delete ${selected.size} pipeline${selected.size === 1 ? '' : 's'}?`}
        maxWidth={420}
        backdropTestId="bulk-delete-modal"
        footer={
          <>
            <button
              data-testid="bulk-delete-cancel"
              className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer"
              onClick={() => setBulkDeleteOpen(false)}
            >
              Cancel
            </button>
            <button
              data-testid="bulk-delete-confirm"
              onClick={handleBulkDeleteConfirm}
              className={cn(
                'px-[18px] py-[7px] text-[13px] font-semibold',
                'bg-danger text-white border-none rounded-[7px]',
                'cursor-pointer font-inherit',
              )}
            >
              Delete {selected.size}
            </button>
          </>
        }
      >
        <p className="m-0">
          <strong>
            {selected.size} pipeline{selected.size === 1 ? '' : 's'}
          </strong>{' '}
          will be permanently removed. Run history will also be lost.
        </p>
      </Modal>
    </div>
  );
}
