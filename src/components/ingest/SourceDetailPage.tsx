// frontend/src/components/ingest/SourceDetailPage.tsx
//
// Detail page for a single ingest source. Shows config, mapping rules, sync
// history, and settings. Available at /ingest/sources/:id.

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useIdentityContext } from '../../contexts/IdentityContext';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import SkeletonCard from '../shared/SkeletonCard';
import MappingRuleEditor from './MappingRuleEditor';
import { cn } from '../../lib/cn';
import type { IngestSource, IngestSourceStatus, IngestSourceType, MappingRule } from '../../types/ingest';
import { usePipelineDefs } from '../../hooks/usePipelineDefs';
import { useDocumentTypes } from '../../hooks/useDocumentTypes';
import SourceSloPanel from './SourceSloPanel';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';

// Schedule presets — operator-friendly cron expressions for common cadences.
const SCHEDULE_PRESETS: Array<{ label: string; cron: string }> = [
  { label: 'Manual only',    cron: '' },
  { label: 'Every 15 min',   cron: '*/15 * * * *' },
  { label: 'Hourly',         cron: '0 * * * *' },
  { label: 'Every 6 hours',  cron: '0 */6 * * *' },
  { label: 'Daily 2am',      cron: '0 2 * * *' },
  { label: 'Weekly Mon 6am', cron: '0 6 * * 1' },
];

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function statusTone(status: IngestSourceStatus): ChipTone {
  switch (status) {
    case 'active': return 'success';
    case 'paused': return 'warning';
    case 'error':  return 'danger';
    default:       return 'neutral';
  }
}

function typeLabel(type: IngestSourceType): string {
  switch (type) {
    case 'local':        return 'Local';
    case 's3':           return 'S3';
    case 'google-drive': return 'Google Drive';
    case 'webhook':      return 'Webhook';
    default:             return type;
  }
}

function typeTone(type: IngestSourceType): ChipTone {
  switch (type) {
    case 's3':           return 'info';
    case 'google-drive': return 'purple';
    case 'webhook':      return 'caution';
    case 'local':        return 'neutral';
    default:             return 'neutral';
  }
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60_000).toFixed(1)}m`;
}

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  if (d < 259_200_000) return `${Math.floor(d / 86_400_000)}d ago`;
  return new Date(iso).toLocaleDateString();
}

// ---------------------------------------------------------------------------
// Rule format bridge
// ---------------------------------------------------------------------------

function normalizeRules(raw: unknown[]): MappingRule[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((r: any) => {
    if (typeof r.pattern === 'string') return r as unknown as MappingRule;
    const cond = r.condition as { field?: string; op?: string; value?: string } | undefined;
    return {
      pattern: cond ? `${cond.field ?? 'path'}:${cond.op ?? 'contains'}:${cond.value ?? ''}` : '',
      documentTypeId: (r.targetTypeId as string) ?? (r.documentTypeId as string) ?? '',
      pipelineId: r.pipelineId as string | undefined,
      priority: (r.priority as number) ?? 0,
    };
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { idToken } = useIdentityContext();
  const { pipelines: pipelineDefs } = usePipelineDefs();
  const { types: docTypes } = useDocumentTypes({ idToken });

  const [source, setSource] = useState<IngestSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Editable fields (only used when editing === true)
  const [editConfig, setEditConfig] = useState<Record<string, unknown>>({});
  const [editRules, setEditRules] = useState<MappingRule[]>([]);
  const [editSchedule, setEditSchedule] = useState<string>('');
  const [editPipelineId, setEditPipelineId] = useState<string>('');
  const [editPipelineByDocType, setEditPipelineByDocType] = useState<Record<string, string>>({});
  const [showOverrides, setShowOverrides] = useState(false);

  const headers = useCallback((): Record<string, string> => {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (idToken) h['Authorization'] = `Bearer ${idToken}`;
    return h;
  }, [idToken]);

  const fetchSource = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/sources/${id}`, { headers: headers() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();
      const normalized: IngestSource = { ...body, mappingRules: normalizeRules(body.mappingRules ?? []) };
      setSource(normalized);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [id, headers]);

  useEffect(() => {
    void fetchSource();
  }, [fetchSource]);

  const enterEditMode = useCallback(() => {
    if (!source) return;
    setEditConfig({ ...source.config });
    setEditRules([...source.mappingRules]);
    setEditSchedule(source.syncSchedule ?? '');
    setEditPipelineId(source.defaultPipelineId ?? '');
    setEditPipelineByDocType({ ...(source.pipelineByDocType ?? {}) });
    setEditing(true);
  }, [source]);

  const cancelEdit = useCallback(() => {
    setEditing(false);
  }, []);

  const saveChanges = useCallback(async () => {
    if (!source || !id) return;
    setSaving(true);
    try {
      const body = {
        config: editConfig,
        mappingRules: editRules,
        syncSchedule: editSchedule.trim() || null,
        defaultPipelineId: editPipelineId.trim() || null,
        pipelineByDocType: editPipelineByDocType,
      };
      const res = await fetch(`${BASE_URL}/api/ingest/sources/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated = await res.json() as IngestSource;
      setSource(updated);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }, [source, id, editConfig, editRules, editSchedule, editPipelineId, editPipelineByDocType, headers]);

  const isDirty = editing && source !== null && (
    JSON.stringify(editConfig) !== JSON.stringify(source.config) ||
    JSON.stringify(editRules) !== JSON.stringify(source.mappingRules) ||
    editSchedule !== (source.syncSchedule ?? '') ||
    editPipelineId !== (source.defaultPipelineId ?? '') ||
    JSON.stringify(editPipelineByDocType) !== JSON.stringify(source.pipelineByDocType ?? {})
  );

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const handleSync = useCallback(async () => {
    if (!id) return;
    setSyncing(true);
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/sources/${id}/sync`, {
        method: 'POST',
        headers: headers(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchSource();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSyncing(false);
    }
  }, [id, headers, fetchSource]);

  const handleTogglePause = useCallback(async () => {
    if (!source || !id) return;
    const newStatus: IngestSourceStatus = source.status === 'paused' ? 'active' : 'paused';
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/sources/${id}`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated = await res.json() as IngestSource;
      setSource(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [source, id, headers]);

  // Loading state
  if (loading && !source) {
    return (
      <div data-testid="source-detail-page" className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="m-0 text-[22px] font-bold text-text-primary">Source Detail</h2>
        </div>
        <SkeletonCard height={120} />
        <SkeletonCard height={200} />
        <SkeletonCard height={100} />
      </div>
    );
  }

  // Error state with no source loaded
  if (error && !source) {
    return (
      <div data-testid="source-detail-page" className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <button
            className="text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline"
            onClick={() => navigate('/ingest/sources')}
          >
            Back to Sources
          </button>
        </div>
        <div className="px-4 py-3 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3" role="alert">
          <span className="text-[13px] font-medium">Failed to load source: {error}</span>
          <button
            onClick={() => void fetchSource()}
            className="px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!source) return null;

  return (
    <div data-testid="source-detail-page" className="p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <button
            className="text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline"
            onClick={() => navigate('/ingest/sources')}
          >
            Back to Sources
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="m-0 text-[22px] font-bold text-text-primary">{source.name}</h2>
          <Chip tone={typeTone(source.type)} size="sm">{typeLabel(source.type)}</Chip>
          <Chip tone={statusTone(source.status)} size="sm">{source.status}</Chip>
        </div>
        <div className="flex gap-2.5 items-center">
          {editing ? (
            <>
              <button
                className="px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button
                className={cn(
                  'px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]',
                  saving && 'opacity-50 cursor-not-allowed',
                )}
                onClick={() => void saveChanges()}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              className="px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary"
              onClick={enterEditMode}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Error banner (non-blocking) */}
      {error && (
        <div className="px-4 py-3 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3" role="alert">
          <span className="text-[13px] font-medium">{error}</span>
          <button
            onClick={() => setError(null)}
            className="px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Config section */}
      <div className="bg-surface border border-border rounded-[10px] p-4">
        <div className="text-sm font-semibold text-text-primary mb-3">Configuration</div>
        {editing ? (
          <div>
            {Object.entries(editConfig).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3 mb-2.5">
                <span className="text-xs font-semibold text-text-tertiary min-w-[140px]">{key}</span>
                <Input
                  className="flex-1"
                  value={typeof value === 'string' ? value : JSON.stringify(value)}
                  onChange={(e) => setEditConfig({ ...editConfig, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {Object.entries(source.config).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3 py-1.5 border-b border-border">
                <span className="text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight">{key}</span>
                <span className="text-[13px] text-text-secondary font-mono break-all">
                  {typeof value === 'string' ? value : JSON.stringify(value)}
                </span>
              </div>
            ))}
            {Object.keys(source.config).length === 0 && (
              <span className="text-[13px] text-text-tertiary">No configuration fields.</span>
            )}
          </div>
        )}
      </div>

      {/* Per-source SLO panel */}
      {source ? <SourceSloPanel sourceId={source.sourceId} /> : null}

      {/* Mapping Rules section */}
      <div className="bg-surface border border-border rounded-[10px] p-4">
        <div className="text-sm font-semibold text-text-primary mb-3">Mapping Rules</div>
        {editing ? (
          <MappingRuleEditor rules={editRules} onChange={setEditRules} />
        ) : (
          <MappingRuleEditor rules={source.mappingRules} onChange={() => { /* read-only when not editing */ }} />
        )}
      </div>

      {/* Sync History section */}
      <div className="bg-surface border border-border rounded-[10px] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-text-primary">Sync History</div>
          <button
            className={cn(
              'px-3.5 py-1.5 text-[13px] font-medium rounded-md cursor-pointer font-[inherit]',
              syncing || source.status === 'paused'
                ? 'border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed'
                : 'border border-primary bg-[#eff6ff] text-primary',
            )}
            disabled={syncing || source.status === 'paused'}
            onClick={() => void handleSync()}
            data-testid="sync-now-btn"
          >
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
        {source.lastSyncAt ? (
          <>
            <div className="text-xs text-text-tertiary mb-2.5">
              Last synced: {relativeTime(source.lastSyncAt)} ({new Date(source.lastSyncAt).toLocaleString()})
            </div>
            {source.lastSyncStats && (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5">
                <div className="p-3 bg-surface-inset border border-border rounded-lg text-center">
                  <div className="text-xl font-bold text-text-primary leading-none">{(source.lastSyncStats as any).filesDiscovered}</div>
                  <div className="text-[11px] text-text-tertiary mt-1 uppercase tracking-tight">Found</div>
                </div>
                <div className="p-3 bg-surface-inset border border-border rounded-lg text-center">
                  <div className="text-xl font-bold text-[var(--color-state-completed)] leading-none">{(source.lastSyncStats as any).filesIngested}</div>
                  <div className="text-[11px] text-text-tertiary mt-1 uppercase tracking-tight">Ingested</div>
                </div>
                <div className="p-3 bg-surface-inset border border-border rounded-lg text-center">
                  <div className="text-xl font-bold text-text-primary leading-none">{source.lastSyncStats.filesSkipped}</div>
                  <div className="text-[11px] text-text-tertiary mt-1 uppercase tracking-tight">Skipped</div>
                </div>
                <div className="p-3 bg-surface-inset border border-border rounded-lg text-center">
                  <div className={cn('text-xl font-bold leading-none', (source.lastSyncStats as any).filesFailed > 0 ? 'text-[var(--color-state-failed)]' : 'text-text-primary')}>
                    {(source.lastSyncStats as any).filesFailed}
                  </div>
                  <div className="text-[11px] text-text-tertiary mt-1 uppercase tracking-tight">Errors</div>
                </div>
                <div className="p-3 bg-surface-inset border border-border rounded-lg text-center">
                  <div className="text-xl font-bold text-text-primary leading-none">{formatDuration(source.lastSyncStats.durationMs)}</div>
                  <div className="text-[11px] text-text-tertiary mt-1 uppercase tracking-tight">Duration</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <span className="text-[13px] text-text-tertiary">No sync history yet.</span>
        )}
      </div>

      {/* Settings section */}
      <div className="bg-surface border border-border rounded-[10px] p-4">
        <div className="text-sm font-semibold text-text-primary mb-3">Settings</div>
        {editing ? (
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-xs font-semibold text-text-tertiary min-w-[140px]">Sync Schedule</span>
              <div className="flex gap-2 flex-1 flex-wrap">
                <Select
                  className="w-auto min-w-[160px]"
                  value={SCHEDULE_PRESETS.some((p) => p.cron === editSchedule) ? editSchedule : '__custom__'}
                  onChange={(e) => {
                    if (e.target.value !== '__custom__') setEditSchedule(e.target.value);
                  }}
                  data-testid="schedule-preset"
                  options={[
                    ...SCHEDULE_PRESETS.map((p) => ({ value: p.cron, label: p.label })),
                    { value: '__custom__', label: 'Custom…' },
                  ]}
                />
                <Input
                  mono
                  className="flex-1"
                  value={editSchedule}
                  onChange={(e) => setEditSchedule(e.target.value)}
                  placeholder="Cron (e.g. 0 */6 * * *) — empty = manual"
                  data-testid="schedule-cron"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-xs font-semibold text-text-tertiary min-w-[140px]">Default Pipeline</span>
              <Select
                className="flex-1"
                value={editPipelineId}
                onChange={(e) => setEditPipelineId(e.target.value)}
                data-testid="default-pipeline-picker"
                options={[
                  { value: '', label: '— None (use mapping rule pipeline) —' },
                  ...pipelineDefs.map((p) => ({
                    value: p.id,
                    label: `${p.name}${p.status ? ` (${p.status})` : ''}`,
                  })),
                  ...(editPipelineId && !pipelineDefs.some((p) => p.id === editPipelineId)
                    ? [{ value: editPipelineId, label: `${editPipelineId} (unknown)` }]
                    : []),
                ]}
              />
            </div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-xs font-semibold text-text-tertiary min-w-[140px]">Pipeline overrides</span>
              <div className="flex-1 flex flex-col gap-2">
                <button
                  type="button"
                  data-testid="overrides-toggle"
                  onClick={() => setShowOverrides(!showOverrides)}
                  className="bg-transparent border-none text-left text-text-secondary p-0 cursor-pointer text-[13px]"
                >
                  {showOverrides ? '▾' : '▸'} Per-matched-DocType pipeline override ({Object.keys(editPipelineByDocType).length})
                </button>
                {showOverrides ? (
                  <div data-testid="overrides-section" className="flex flex-col gap-1.5">
                    {Object.keys(editPipelineByDocType).length === 0 ? (
                      <div className="text-xs text-text-tertiary">
                        No overrides — every matched type uses the default pipeline.
                      </div>
                    ) : (
                      Object.entries(editPipelineByDocType).map(([typeId, pipelineId]) => (
                        <div key={typeId} className="flex gap-2 items-center">
                          <span className="flex-[0_0_160px] text-[13px]">
                            {docTypes.find((t) => t.id === typeId)?.name ?? typeId}
                          </span>
                          <Select
                            data-testid={`overrides-pipeline-${typeId}`}
                            className="flex-1"
                            value={pipelineId}
                            onChange={(e) =>
                              setEditPipelineByDocType({ ...editPipelineByDocType, [typeId]: e.target.value })
                            }
                            options={pipelineDefs.map((p) => ({ value: p.id, label: p.name }))}
                          />
                          <button
                            type="button"
                            data-testid={`overrides-remove-${typeId}`}
                            onClick={() => {
                              const next = { ...editPipelineByDocType };
                              delete next[typeId];
                              setEditPipelineByDocType(next);
                            }}
                            className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                    <Select
                      data-testid="overrides-add-type"
                      className="w-auto self-start"
                      value=""
                      onChange={(e) => {
                        const typeId = e.target.value;
                        if (!typeId) return;
                        setEditPipelineByDocType({
                          ...editPipelineByDocType,
                          [typeId]: pipelineDefs[0]?.id ?? '',
                        });
                      }}
                      options={[
                        { value: '', label: '+ Add override for type…' },
                        ...docTypes
                          .filter((t) => editPipelineByDocType[t.id] === undefined)
                          .map((t) => ({ value: t.id, label: t.name })),
                      ]}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 py-1.5 border-b border-border">
              <span className="text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight">Sync Schedule</span>
              <span className="text-[13px] text-text-secondary font-mono break-all">
                {source.syncSchedule ?? 'Manual (no schedule)'}
              </span>
            </div>
            <div className="flex items-center gap-3 py-1.5 border-b border-border">
              <span className="text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight">Default Pipeline</span>
              <span className="text-[13px] text-text-secondary font-mono break-all">
                {source.defaultPipelineId
                  ? (pipelineDefs.find((p) => p.id === source.defaultPipelineId)?.name ?? source.defaultPipelineId)
                  : '—'}
              </span>
            </div>
            <div className="flex items-center gap-3 py-1.5">
              <span className="text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight">Status</span>
              <span className="flex items-center gap-2.5">
                <Chip tone={statusTone(source.status)} size="sm">{source.status}</Chip>
                <button
                  className={cn(
                    'px-3.5 py-1.5 text-xs font-medium rounded-md cursor-pointer font-[inherit] border-none text-white',
                    source.status === 'paused' ? 'bg-state-completed' : 'bg-state-awaiting',
                  )}
                  onClick={() => void handleTogglePause()}
                >
                  {source.status === 'paused' ? 'Resume' : 'Pause'}
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
