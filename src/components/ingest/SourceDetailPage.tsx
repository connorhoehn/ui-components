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
import { colors, pageContainerStyle, fieldStyle, saveBtnStyle } from '../../constants/styles';
import type { IngestSource, IngestSourceStatus, IngestSourceType, MappingRule } from '../../types/ingest';
import { usePipelineDefs } from '../../hooks/usePipelineDefs';
import { useDocumentTypes } from '../../hooks/useDocumentTypes';
import SourceSloPanel from './SourceSloPanel';

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
// Static styles
// ---------------------------------------------------------------------------

const styles: Record<string, CSSProperties> = {
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
    flexWrap: 'wrap', gap: 12,
  },
  headerLeft: {
    display: 'flex', alignItems: 'center', gap: 10,
  },
  title: {
    margin: 0, fontSize: 22, fontWeight: 700, color: colors.textPrimary,
  },
  backLink: {
    fontSize: 13, color: colors.primary, cursor: 'pointer', background: 'none',
    border: 'none', fontFamily: 'inherit', padding: 0, textDecoration: 'underline',
  },
  editBtn: {
    padding: '6px 14px', fontSize: 13, fontWeight: 500, border: `1px solid ${colors.border}`,
    borderRadius: 6, background: colors.surface, cursor: 'pointer', fontFamily: 'inherit',
    color: colors.textSecondary,
  },
  section: {
    background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10,
    padding: 16, marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 14, fontWeight: 600, color: colors.textPrimary, marginBottom: 12,
  },
  kvRow: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0',
    borderBottom: `1px solid ${colors.border}`,
  },
  kvLabel: {
    fontSize: 12, fontWeight: 600, color: colors.textTertiary, minWidth: 130,
    textTransform: 'uppercase' as const, letterSpacing: '0.03em',
  },
  kvValue: {
    fontSize: 13, color: colors.textSecondary, fontFamily: 'monospace', wordBreak: 'break-all',
  },
  statsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10,
  },
  statCard: {
    padding: 12, background: colors.surfaceInset, border: `1px solid ${colors.border}`,
    borderRadius: 8, textAlign: 'center',
  },
  statValue: {
    fontSize: 20, fontWeight: 700, color: colors.textPrimary, lineHeight: 1,
  },
  statLabel: {
    fontSize: 11, color: colors.textTertiary, marginTop: 4,
    textTransform: 'uppercase' as const, letterSpacing: '0.03em',
  },
  syncBtn: {
    padding: '6px 14px', fontSize: 13, fontWeight: 500, border: `1px solid ${colors.primary}`,
    borderRadius: 6, background: '#eff6ff', cursor: 'pointer', fontFamily: 'inherit',
    color: colors.primary,
  },
  syncingBtn: {
    padding: '6px 14px', fontSize: 13, fontWeight: 500, border: `1px solid ${colors.border}`,
    borderRadius: 6, background: colors.surfaceInset, cursor: 'not-allowed', fontFamily: 'inherit',
    color: colors.textTertiary, opacity: 0.7,
  },
  formRow: {
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
  },
  formLabel: {
    fontSize: 12, fontWeight: 600, color: colors.textTertiary, minWidth: 140,
  },
  toggleBtn: {
    padding: '6px 14px', fontSize: 12, fontWeight: 500, borderRadius: 6,
    cursor: 'pointer', fontFamily: 'inherit', border: 'none',
  },
  errorBanner: {
    padding: '12px 16px', background: '#fef2f2', border: `1px solid ${colors.state.failed}`,
    color: colors.state.failed, borderRadius: 8, display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: 12,
  },
  retryBtn: {
    padding: '6px 14px', fontSize: 13, fontWeight: 500, background: '#fff',
    color: colors.state.failed, border: `1px solid ${colors.state.failed}`,
    borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
  },
  actionsRow: {
    display: 'flex', gap: 10, alignItems: 'center',
  },
};

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
// Rule format bridge: backend uses { condition: { field, op, value } },
// frontend editor uses { pattern: "field:op:value" }
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

  // Dirty-state guard: while editing, warn the operator if they try to leave
  // with unsaved changes (browser-level beforeunload — covers refresh / tab
  // close / external nav). Internal react-router nav doesn't fire this; that
  // would require useBlocker and is left for a follow-up.
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
      // Refresh source to get updated sync stats
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
      <div data-testid="source-detail-page" style={pageContainerStyle}>
        <div style={styles.header}>
          <h2 style={styles.title}>Source Detail</h2>
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
      <div data-testid="source-detail-page" style={pageContainerStyle}>
        <div style={styles.header}>
          <button style={styles.backLink} onClick={() => navigate('/ingest/sources')}>
            Back to Sources
          </button>
        </div>
        <div style={styles.errorBanner} role="alert">
          <span style={{ fontSize: 13, fontWeight: 500 }}>Failed to load source: {error}</span>
          <button onClick={() => void fetchSource()} style={styles.retryBtn}>Retry</button>
        </div>
      </div>
    );
  }

  if (!source) return null;

  return (
    <div data-testid="source-detail-page" style={pageContainerStyle}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backLink} onClick={() => navigate('/ingest/sources')}>
            Back to Sources
          </button>
        </div>
      </div>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>{source.name}</h2>
          <Chip tone={typeTone(source.type)} size="sm">{typeLabel(source.type)}</Chip>
          <Chip tone={statusTone(source.status)} size="sm">{source.status}</Chip>
        </div>
        <div style={styles.actionsRow}>
          {editing ? (
            <>
              <button style={styles.editBtn} onClick={cancelEdit}>Cancel</button>
              <button style={saveBtnStyle(saving)} onClick={() => void saveChanges()} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button style={styles.editBtn} onClick={enterEditMode}>Edit</button>
          )}
        </div>
      </div>

      {/* Error banner (non-blocking) */}
      {error && (
        <div style={styles.errorBanner} role="alert">
          <span style={{ fontSize: 13, fontWeight: 500 }}>{error}</span>
          <button onClick={() => setError(null)} style={styles.retryBtn}>Dismiss</button>
        </div>
      )}

      {/* Config section */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Configuration</div>
        {editing ? (
          <div>
            {Object.entries(editConfig).map(([key, value]) => (
              <div key={key} style={styles.formRow}>
                <span style={styles.formLabel}>{key}</span>
                <input
                  style={fieldStyle}
                  value={typeof value === 'string' ? value : JSON.stringify(value)}
                  onChange={(e) => setEditConfig({ ...editConfig, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {Object.entries(source.config).map(([key, value]) => (
              <div key={key} style={styles.kvRow}>
                <span style={styles.kvLabel}>{key}</span>
                <span style={styles.kvValue}>
                  {typeof value === 'string' ? value : JSON.stringify(value)}
                </span>
              </div>
            ))}
            {Object.keys(source.config).length === 0 && (
              <span style={{ fontSize: 13, color: colors.textTertiary }}>No configuration fields.</span>
            )}
          </div>
        )}
      </div>

      {/* Per-source SLO panel — latency / error rate / queue depth. */}
      {source ? <SourceSloPanel sourceId={source.sourceId} /> : null}

      {/* Mapping Rules section */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Mapping Rules</div>
        {editing ? (
          <MappingRuleEditor rules={editRules} onChange={setEditRules} />
        ) : (
          <MappingRuleEditor rules={source.mappingRules} onChange={() => { /* read-only when not editing */ }} />
        )}
      </div>

      {/* Sync History section */}
      <div style={styles.section}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={styles.sectionTitle}>Sync History</div>
          <button
            style={syncing || source.status === 'paused' ? styles.syncingBtn : styles.syncBtn}
            disabled={syncing || source.status === 'paused'}
            onClick={() => void handleSync()}
            data-testid="sync-now-btn"
          >
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
        {source.lastSyncAt ? (
          <>
            <div style={{ fontSize: 12, color: colors.textTertiary, marginBottom: 10 }}>
              Last synced: {relativeTime(source.lastSyncAt)} ({new Date(source.lastSyncAt).toLocaleString()})
            </div>
            {source.lastSyncStats && (
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statValue}>{(source.lastSyncStats as any).filesDiscovered}</div>
                  <div style={styles.statLabel}>Found</div>
                </div>
                <div style={styles.statCard}>
                  <div style={{ ...styles.statValue, color: colors.state.completed }}>{(source.lastSyncStats as any).filesIngested}</div>
                  <div style={styles.statLabel}>Ingested</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statValue}>{source.lastSyncStats.filesSkipped}</div>
                  <div style={styles.statLabel}>Skipped</div>
                </div>
                <div style={styles.statCard}>
                  <div style={{ ...styles.statValue, color: (source.lastSyncStats as any).filesFailed > 0 ? colors.state.failed : colors.textPrimary }}>
                    {(source.lastSyncStats as any).filesFailed}
                  </div>
                  <div style={styles.statLabel}>Errors</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statValue}>{formatDuration(source.lastSyncStats.durationMs)}</div>
                  <div style={styles.statLabel}>Duration</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <span style={{ fontSize: 13, color: colors.textTertiary }}>No sync history yet.</span>
        )}
      </div>

      {/* Settings section */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Settings</div>
        {editing ? (
          <div>
            <div style={styles.formRow}>
              <span style={styles.formLabel}>Sync Schedule</span>
              <div style={{ display: 'flex', gap: 8, flex: 1, flexWrap: 'wrap' }}>
                <select
                  style={{ ...fieldStyle, flex: 'none', minWidth: 160 }}
                  value={SCHEDULE_PRESETS.some((p) => p.cron === editSchedule) ? editSchedule : '__custom__'}
                  onChange={(e) => {
                    if (e.target.value !== '__custom__') setEditSchedule(e.target.value);
                  }}
                  data-testid="schedule-preset"
                >
                  {SCHEDULE_PRESETS.map((p) => (
                    <option key={p.cron || '__manual__'} value={p.cron}>{p.label}</option>
                  ))}
                  <option value="__custom__">Custom…</option>
                </select>
                <input
                  style={{ ...fieldStyle, fontFamily: 'monospace' }}
                  value={editSchedule}
                  onChange={(e) => setEditSchedule(e.target.value)}
                  placeholder="Cron (e.g. 0 */6 * * *) — empty = manual"
                  data-testid="schedule-cron"
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <span style={styles.formLabel}>Default Pipeline</span>
              <select
                style={fieldStyle}
                value={editPipelineId}
                onChange={(e) => setEditPipelineId(e.target.value)}
                data-testid="default-pipeline-picker"
              >
                <option value="">— None (use mapping rule pipeline) —</option>
                {pipelineDefs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {p.status ? `(${p.status})` : ''}
                  </option>
                ))}
                {/* Allow keeping a stale id even when the pipeline isn't in the loaded list */}
                {editPipelineId && !pipelineDefs.some((p) => p.id === editPipelineId) && (
                  <option value={editPipelineId}>{editPipelineId} (unknown)</option>
                )}
              </select>
            </div>
            <div style={styles.formRow}>
              <span style={styles.formLabel}>Pipeline overrides</span>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  data-testid="overrides-toggle"
                  onClick={() => setShowOverrides(!showOverrides)}
                  style={{
                    background: 'transparent', border: 'none', textAlign: 'left',
                    color: colors.textSecondary, padding: 0, cursor: 'pointer', fontSize: 13,
                  }}
                >
                  {showOverrides ? '▾' : '▸'} Per-matched-DocType pipeline override ({Object.keys(editPipelineByDocType).length})
                </button>
                {showOverrides ? (
                  <div data-testid="overrides-section" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {Object.keys(editPipelineByDocType).length === 0 ? (
                      <div style={{ fontSize: 12, color: colors.textTertiary }}>
                        No overrides — every matched type uses the default pipeline.
                      </div>
                    ) : (
                      Object.entries(editPipelineByDocType).map(([typeId, pipelineId]) => (
                        <div key={typeId} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span style={{ flex: '0 0 160px', fontSize: 13 }}>
                            {docTypes.find((t) => t.id === typeId)?.name ?? typeId}
                          </span>
                          <select
                            data-testid={`overrides-pipeline-${typeId}`}
                            style={{ ...fieldStyle, flex: 1 }}
                            value={pipelineId}
                            onChange={(e) =>
                              setEditPipelineByDocType({ ...editPipelineByDocType, [typeId]: e.target.value })
                            }
                          >
                            {pipelineDefs.map((p) => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                          </select>
                          <button
                            type="button"
                            data-testid={`overrides-remove-${typeId}`}
                            onClick={() => {
                              const next = { ...editPipelineByDocType };
                              delete next[typeId];
                              setEditPipelineByDocType(next);
                            }}
                            style={{ ...fieldStyle, flex: 'none', cursor: 'pointer' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                    <select
                      data-testid="overrides-add-type"
                      style={{ ...fieldStyle, alignSelf: 'flex-start' }}
                      value=""
                      onChange={(e) => {
                        const typeId = e.target.value;
                        if (!typeId) return;
                        setEditPipelineByDocType({
                          ...editPipelineByDocType,
                          [typeId]: pipelineDefs[0]?.id ?? '',
                        });
                      }}
                    >
                      <option value="">+ Add override for type…</option>
                      {docTypes
                        .filter((t) => editPipelineByDocType[t.id] === undefined)
                        .map((t) => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div style={styles.kvRow}>
              <span style={styles.kvLabel}>Sync Schedule</span>
              <span style={styles.kvValue}>
                {source.syncSchedule ?? 'Manual (no schedule)'}
              </span>
            </div>
            <div style={styles.kvRow}>
              <span style={styles.kvLabel}>Default Pipeline</span>
              <span style={styles.kvValue}>
                {source.defaultPipelineId
                  ? (pipelineDefs.find((p) => p.id === source.defaultPipelineId)?.name ?? source.defaultPipelineId)
                  : '—'}
              </span>
            </div>
            <div style={{ ...styles.kvRow, borderBottom: 'none' }}>
              <span style={styles.kvLabel}>Status</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Chip tone={statusTone(source.status)} size="sm">{source.status}</Chip>
                <button
                  style={{
                    ...styles.toggleBtn,
                    background: source.status === 'paused' ? colors.state.completed : colors.state.awaiting,
                    color: '#fff',
                  }}
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
