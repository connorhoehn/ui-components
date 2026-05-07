// frontend/src/components/ingest/ConflictsPage.tsx
//
// Operator queue for write-back conflicts.
//
// Backend endpoint shape (Agent F to implement — restated here so the
// integration commit has a single grep target):
//
//   GET    /api/sync/conflicts                  -> { conflicts: SyncConflict[] }
//   POST   /api/sync/conflicts/:id/resolve      body: ConflictResolution
//          -> { conflict: SyncConflict }
//   POST   /api/sync/conflicts/:id/discard      -> { conflict: SyncConflict }
//
// SyncConflict / ConflictResolution / ConflictField live in
// frontend/src/types/ingest.ts.
//
// Layout: a left rail listing pending conflicts, and a main pane showing
// the dual-pane diff (source vs platform vs merged) for the selected
// conflict. Operator can pick one side wholesale, pick per-field, or
// supply a custom merge note.

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useSyncConflicts } from '../../hooks/useSyncConflicts';
import { useIngestSources } from '../../hooks/useIngestSources';
import Chip from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { colors, pageContainerStyle, fieldStyle, saveBtnStyle } from '../../constants/styles';
import type { ConflictField, ConflictSide, SyncConflict, ConflictResolution } from '../../types/ingest';

// ---------------------------------------------------------------------------
// Static styles
// ---------------------------------------------------------------------------

const styles: Record<string, CSSProperties> = {
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12,
  },
  title: {
    margin: 0, fontSize: 22, fontWeight: 700, color: colors.textPrimary,
  },
  count: {
    fontSize: 13, color: colors.textTertiary,
  },
  banner: {
    padding: '10px 14px', background: '#fffbeb', border: `1px solid ${colors.state.awaiting}`,
    color: '#92400e', borderRadius: 8, fontSize: 12, marginBottom: 12,
  },
  layout: {
    display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16, alignItems: 'start',
  },
  // Left rail
  list: {
    background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10,
    overflow: 'hidden',
  },
  listHeader: {
    padding: '10px 14px', borderBottom: `1px solid ${colors.border}`, fontSize: 12,
    fontWeight: 600, color: colors.textTertiary, textTransform: 'uppercase' as const, letterSpacing: '0.04em',
    background: colors.surfacePanel,
  },
  listItem: {
    padding: '10px 14px', borderBottom: `1px solid ${colors.border}`, cursor: 'pointer',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  listItemActive: {
    background: '#eef2ff',
  },
  listSummary: {
    fontSize: 13, fontWeight: 600, color: colors.textPrimary, lineHeight: 1.3,
    overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
  },
  listMeta: {
    display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', fontSize: 11, color: colors.textTertiary,
  },
  // Main pane
  pane: {
    background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10,
    padding: 18, display: 'flex', flexDirection: 'column', gap: 16,
  },
  paneHeader: {
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
  },
  paneTitle: {
    margin: 0, fontSize: 16, fontWeight: 700, color: colors.textPrimary,
  },
  paneSubtitle: {
    fontSize: 12, color: colors.textTertiary, fontFamily: 'monospace', wordBreak: 'break-all',
  },
  // Picker buttons
  pickerRow: {
    display: 'flex', gap: 8, padding: 10, background: colors.surfaceInset,
    border: `1px solid ${colors.border}`, borderRadius: 8, alignItems: 'center', flexWrap: 'wrap',
  },
  pickerLabel: {
    fontSize: 12, fontWeight: 600, color: colors.textSecondary, marginRight: 4,
  },
  pickerBtn: {
    padding: '5px 12px', fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
    border: `1px solid ${colors.border}`, background: colors.surface, color: colors.textSecondary,
    borderRadius: 6, cursor: 'pointer',
  },
  pickerBtnActive: {
    background: colors.primary, color: '#fff', border: `1px solid ${colors.primary}`,
  },
  // Field diff rows
  fieldBlock: {
    border: `1px solid ${colors.border}`, borderRadius: 8, overflow: 'hidden',
  },
  fieldHeader: {
    padding: '8px 12px', background: colors.surfacePanel, borderBottom: `1px solid ${colors.border}`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap',
  },
  fieldName: {
    fontFamily: 'monospace', fontSize: 12, color: colors.textPrimary, fontWeight: 600,
  },
  diffGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
  },
  diffCell: {
    padding: 12, fontSize: 12, color: colors.textSecondary, borderRight: `1px solid ${colors.border}`,
    fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word', minHeight: 60,
    background: colors.surface,
  },
  diffCellLast: {
    borderRight: 'none',
  },
  diffCellHeader: {
    fontSize: 10, fontWeight: 700, color: colors.textTertiary, textTransform: 'uppercase' as const,
    letterSpacing: '0.04em', marginBottom: 6, fontFamily: 'inherit',
  },
  diffCellSelected: {
    background: '#ecfdf5', borderColor: colors.state.completed,
  },
  diffPickRow: {
    display: 'flex', gap: 6, padding: '6px 10px', borderTop: `1px solid ${colors.border}`,
    background: colors.surfaceInset,
  },
  pickPill: {
    fontSize: 11, padding: '3px 10px', borderRadius: 12, cursor: 'pointer',
    border: `1px solid ${colors.border}`, background: colors.surface, color: colors.textSecondary,
    fontFamily: 'inherit', fontWeight: 500,
  },
  pickPillActive: {
    background: colors.state.completed, color: '#fff', border: `1px solid ${colors.state.completed}`,
  },
  // Footer
  footer: {
    display: 'flex', gap: 8, justifyContent: 'flex-end', borderTop: `1px solid ${colors.border}`,
    paddingTop: 14, flexWrap: 'wrap',
  },
  noteInput: {
    ...fieldStyle, fontFamily: 'inherit', minWidth: 240, flex: 1,
  },
  // Misc
  errorBanner: {
    padding: '12px 16px', background: '#fef2f2', border: `1px solid ${colors.state.failed}`,
    color: colors.state.failed, borderRadius: 8, display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: 12, marginBottom: 12,
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  return `${Math.floor(d / 86_400_000)}d ago`;
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'string') return v;
  try { return JSON.stringify(v, null, 2); } catch { return String(v); }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConflictsPage() {
  const { conflicts, loading, error, usingMock, refresh, resolveConflict, discardConflict } = useSyncConflicts();
  const { sources } = useIngestSources();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [globalPick, setGlobalPick] = useState<ConflictSide>('platform');
  const [fieldChoices, setFieldChoices] = useState<Record<string, ConflictSide>>({});
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const sourceNameMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of sources) map.set(s.sourceId, s.name);
    return map;
  }, [sources]);

  // Pending conflicts only — resolved/discarded fall off the queue.
  const pending = useMemo(() => conflicts.filter((c) => c.status === 'pending'), [conflicts]);

  // Auto-select the first pending conflict on load / after refresh.
  useEffect(() => {
    if (selectedId && pending.some((c) => c.conflictId === selectedId)) return;
    setSelectedId(pending[0]?.conflictId ?? null);
  }, [pending, selectedId]);

  const selected = useMemo(
    () => pending.find((c) => c.conflictId === selectedId) ?? null,
    [pending, selectedId],
  );

  // Reset per-conflict state when switching conflicts.
  useEffect(() => {
    setGlobalPick('platform');
    setFieldChoices({});
    setNote('');
  }, [selectedId]);

  const handleResolve = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      const resolution: ConflictResolution = {
        pick: globalPick,
        ...(Object.keys(fieldChoices).length > 0 ? { fieldChoices } : {}),
        ...(note.trim() ? { note: note.trim() } : {}),
      };
      await resolveConflict(selected.conflictId, resolution);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDiscard = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      await discardConflict(selected.conflictId);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && conflicts.length === 0) {
    return (
      <div data-testid="conflicts-page" style={pageContainerStyle}>
        <div style={styles.header}>
          <h2 style={styles.title}>Sync Conflicts</h2>
        </div>
        <SkeletonCard height={48} />
        <SkeletonCard height={200} />
      </div>
    );
  }

  return (
    <div data-testid="conflicts-page" style={pageContainerStyle}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Sync Conflicts</h2>
          <span style={styles.count}>
            {pending.length} pending{pending.length !== 1 ? '' : ''} • {conflicts.length - pending.length} resolved
          </span>
        </div>
        <button style={saveBtnStyle(false)} onClick={() => void refresh()} data-testid="conflicts-refresh">
          Refresh
        </button>
      </div>

      {usingMock && (
        <div style={styles.banner} data-testid="conflicts-mock-banner">
          Showing mock conflicts — backend endpoint <code>/api/sync/conflicts</code> not implemented yet.
        </div>
      )}

      {error && !usingMock && (
        <div style={styles.errorBanner} role="alert">
          <span style={{ fontSize: 13 }}>Failed to load conflicts: {error}</span>
        </div>
      )}

      {pending.length === 0 ? (
        <EmptyState
          icon="✅"
          title="No pending conflicts"
          body="Write-back conflicts that need operator intervention will appear here."
        />
      ) : (
        <div style={styles.layout}>
          {/* Left rail — conflict list */}
          <div style={styles.list} data-testid="conflicts-list">
            <div style={styles.listHeader}>Pending ({pending.length})</div>
            {pending.map((c) => {
              const isActive = c.conflictId === selectedId;
              return (
                <div
                  key={c.conflictId}
                  style={{ ...styles.listItem, ...(isActive ? styles.listItemActive : {}) }}
                  onClick={() => setSelectedId(c.conflictId)}
                  data-testid={`conflict-row-${c.conflictId}`}
                >
                  <div style={styles.listSummary}>{c.summary}</div>
                  <div style={styles.listMeta}>
                    <Chip tone="warning" size="xs">{c.fields.length} field{c.fields.length !== 1 ? 's' : ''}</Chip>
                    <span>{sourceNameMap.get(c.sourceId) ?? c.sourceId.slice(0, 10)}</span>
                    <span>•</span>
                    <span>{relativeTime(c.detectedAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main pane — diff view */}
          {selected && (
            <div style={styles.pane} data-testid="conflict-detail">
              <div style={styles.paneHeader}>
                <div>
                  <h3 style={styles.paneTitle}>{selected.summary}</h3>
                  <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Chip tone="info" size="xs">{sourceNameMap.get(selected.sourceId) ?? selected.sourceId}</Chip>
                    {selected.documentTypeId && (
                      <Chip tone="purple" size="xs">{selected.documentTypeId}</Chip>
                    )}
                    <span style={{ fontSize: 11, color: colors.textTertiary }}>
                      Detected {relativeTime(selected.detectedAt)}
                    </span>
                  </div>
                  <div style={{ ...styles.paneSubtitle, marginTop: 6 }}>{selected.sourceRef}</div>
                </div>
                <div style={{ fontSize: 11, color: colors.textTertiary, textAlign: 'right' }}>
                  <div>Source edited: {relativeTime(selected.sourceUpdatedAt)}</div>
                  <div>Platform edited: {relativeTime(selected.platformUpdatedAt)}</div>
                </div>
              </div>

              {/* Whole-conflict pick */}
              <div style={styles.pickerRow}>
                <span style={styles.pickerLabel}>Apply to all fields:</span>
                {(['source', 'merged', 'platform'] as const).map((side) => {
                  const enabled = side !== 'merged' || selected.fields.some((f) => f.mergedValue !== undefined);
                  return (
                    <button
                      key={side}
                      style={{
                        ...styles.pickerBtn,
                        ...(globalPick === side ? styles.pickerBtnActive : {}),
                        ...(enabled ? {} : { opacity: 0.4, cursor: 'not-allowed' }),
                      }}
                      onClick={() => enabled && setGlobalPick(side)}
                      disabled={!enabled}
                      data-testid={`global-pick-${side}`}
                    >
                      {side === 'source' ? 'Source side' : side === 'platform' ? 'Platform side' : 'Auto-merged'}
                    </button>
                  );
                })}
              </div>

              {/* Per-field diffs */}
              {selected.fields.map((f) => (
                <FieldDiff
                  key={f.field}
                  field={f}
                  globalPick={globalPick}
                  fieldChoice={fieldChoices[f.field]}
                  onPick={(side) => setFieldChoices((prev) => ({ ...prev, [f.field]: side }))}
                  onClear={() => setFieldChoices((prev) => {
                    const next = { ...prev };
                    delete next[f.field];
                    return next;
                  })}
                />
              ))}

              {/* Note + actions */}
              <div style={styles.footer}>
                <input
                  style={styles.noteInput}
                  placeholder="Optional note (logged in audit trail)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  data-testid="conflict-note"
                />
                <button
                  style={{
                    padding: '6px 14px', fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                    borderRadius: 6, cursor: submitting ? 'not-allowed' : 'pointer',
                    background: '#fef2f2', border: `1px solid ${colors.state.failed}`, color: colors.state.failed,
                    opacity: submitting ? 0.5 : 1,
                  }}
                  onClick={() => void handleDiscard()}
                  disabled={submitting}
                  data-testid="conflict-discard"
                >
                  Discard
                </button>
                <button
                  style={saveBtnStyle(submitting)}
                  onClick={() => void handleResolve()}
                  disabled={submitting}
                  data-testid="conflict-resolve"
                >
                  {submitting ? 'Resolving…' : 'Resolve'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FieldDiff — the dual/triple-pane row for a single conflicted field.
// ---------------------------------------------------------------------------

function FieldDiff({
  field,
  globalPick,
  fieldChoice,
  onPick,
  onClear,
}: {
  field: ConflictField;
  globalPick: ConflictSide;
  fieldChoice: ConflictSide | undefined;
  onPick: (side: ConflictSide) => void;
  onClear: () => void;
}) {
  const effective = fieldChoice ?? globalPick;
  const hasMerge = field.mergedValue !== undefined;

  return (
    <div style={styles.fieldBlock} data-testid={`field-diff-${field.field}`}>
      <div style={styles.fieldHeader}>
        <span style={styles.fieldName}>{field.field}</span>
        {fieldChoice && (
          <button
            onClick={onClear}
            style={{ ...styles.pickPill, fontSize: 10 }}
            data-testid={`field-clear-${field.field}`}
          >
            Clear override
          </button>
        )}
      </div>
      <div style={styles.diffGrid}>
        <DiffCell
          label="Source side"
          value={field.sourceValue}
          selected={effective === 'source'}
        />
        <DiffCell
          label={hasMerge ? 'Auto-merged' : 'Auto-merged (none)'}
          value={hasMerge ? field.mergedValue : '—'}
          selected={hasMerge && effective === 'merged'}
          dim={!hasMerge}
        />
        <DiffCell
          label="Platform side"
          value={field.platformValue}
          selected={effective === 'platform'}
          last
        />
      </div>
      <div style={styles.diffPickRow}>
        <span style={{ fontSize: 11, color: colors.textTertiary, marginRight: 4 }}>Pick for this field:</span>
        {(['source', 'merged', 'platform'] as const).map((side) => {
          const enabled = side !== 'merged' || hasMerge;
          const isActive = effective === side;
          return (
            <button
              key={side}
              style={{
                ...styles.pickPill,
                ...(isActive ? styles.pickPillActive : {}),
                ...(enabled ? {} : { opacity: 0.4, cursor: 'not-allowed' }),
              }}
              onClick={() => enabled && onPick(side)}
              disabled={!enabled}
              data-testid={`field-pick-${field.field}-${side}`}
            >
              {side === 'source' ? 'Source' : side === 'platform' ? 'Platform' : 'Merged'}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DiffCell({
  label, value, selected, last, dim,
}: { label: string; value: unknown; selected: boolean; last?: boolean; dim?: boolean }) {
  return (
    <div
      style={{
        ...styles.diffCell,
        ...(last ? styles.diffCellLast : {}),
        ...(selected ? styles.diffCellSelected : {}),
        ...(dim ? { opacity: 0.55 } : {}),
      }}
    >
      <div style={styles.diffCellHeader}>{label}</div>
      <div>{formatValue(value)}</div>
    </div>
  );
}
