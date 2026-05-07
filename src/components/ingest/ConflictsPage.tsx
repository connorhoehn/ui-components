// frontend/src/components/ingest/ConflictsPage.tsx
//
// Operator queue for write-back conflicts.

import { useEffect, useMemo, useState } from 'react';
import { useSyncConflicts } from '../../hooks/useSyncConflicts';
import { useIngestSources } from '../../hooks/useIngestSources';
import Chip from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { cn } from '../../lib/cn';
import type { ConflictField, ConflictSide, SyncConflict, ConflictResolution } from '../../types/ingest';

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
      <div data-testid="conflicts-page" className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="m-0 text-[22px] font-bold text-text-primary">Sync Conflicts</h2>
        </div>
        <SkeletonCard height={48} />
        <SkeletonCard height={200} />
      </div>
    );
  }

  return (
    <div data-testid="conflicts-page" className="p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="m-0 text-[22px] font-bold text-text-primary">Sync Conflicts</h2>
          <span className="text-[13px] text-text-tertiary">
            {pending.length} pending{pending.length !== 1 ? '' : ''} &bull; {conflicts.length - pending.length} resolved
          </span>
        </div>
        <button
          className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]"
          onClick={() => void refresh()}
          data-testid="conflicts-refresh"
        >
          Refresh
        </button>
      </div>

      {usingMock && (
        <div
          className="px-3.5 py-2.5 bg-[#fffbeb] border border-[var(--color-state-awaiting)] text-[#92400e] rounded-lg text-xs mb-3"
          data-testid="conflicts-mock-banner"
        >
          Showing mock conflicts &mdash; backend endpoint <code>/api/sync/conflicts</code> not implemented yet.
        </div>
      )}

      {error && !usingMock && (
        <div className="px-4 py-3 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-3" role="alert">
          <span className="text-[13px]">Failed to load conflicts: {error}</span>
        </div>
      )}

      {pending.length === 0 ? (
        <EmptyState
          icon="✅"
          title="No pending conflicts"
          body="Write-back conflicts that need operator intervention will appear here."
        />
      ) : (
        <div className="grid grid-cols-[320px_1fr] gap-4 items-start">
          {/* Left rail — conflict list */}
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden" data-testid="conflicts-list">
            <div className="px-3.5 py-2.5 border-b border-border text-xs font-semibold text-text-tertiary uppercase tracking-wide bg-surface-panel">
              Pending ({pending.length})
            </div>
            {pending.map((c) => {
              const isActive = c.conflictId === selectedId;
              return (
                <div
                  key={c.conflictId}
                  className={cn(
                    'px-3.5 py-2.5 border-b border-border cursor-pointer flex flex-col gap-1',
                    isActive && 'bg-[#eef2ff]',
                  )}
                  onClick={() => setSelectedId(c.conflictId)}
                  data-testid={`conflict-row-${c.conflictId}`}
                >
                  <div className="text-[13px] font-semibold text-text-primary leading-tight line-clamp-2">
                    {c.summary}
                  </div>
                  <div className="flex gap-1.5 items-center flex-wrap text-[11px] text-text-tertiary">
                    <Chip tone="warning" size="xs">{c.fields.length} field{c.fields.length !== 1 ? 's' : ''}</Chip>
                    <span>{sourceNameMap.get(c.sourceId) ?? c.sourceId.slice(0, 10)}</span>
                    <span>&bull;</span>
                    <span>{relativeTime(c.detectedAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main pane — diff view */}
          {selected && (
            <div className="bg-surface border border-border rounded-[10px] p-4.5 flex flex-col gap-4" data-testid="conflict-detail">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h3 className="m-0 text-base font-bold text-text-primary">{selected.summary}</h3>
                  <div className="mt-1.5 flex gap-2 items-center flex-wrap">
                    <Chip tone="info" size="xs">{sourceNameMap.get(selected.sourceId) ?? selected.sourceId}</Chip>
                    {selected.documentTypeId && (
                      <Chip tone="purple" size="xs">{selected.documentTypeId}</Chip>
                    )}
                    <span className="text-[11px] text-text-tertiary">
                      Detected {relativeTime(selected.detectedAt)}
                    </span>
                  </div>
                  <div className="text-xs text-text-tertiary font-mono break-all mt-1.5">{selected.sourceRef}</div>
                </div>
                <div className="text-[11px] text-text-tertiary text-right">
                  <div>Source edited: {relativeTime(selected.sourceUpdatedAt)}</div>
                  <div>Platform edited: {relativeTime(selected.platformUpdatedAt)}</div>
                </div>
              </div>

              {/* Whole-conflict pick */}
              <div className="flex gap-2 p-2.5 bg-surface-inset border border-border rounded-lg items-center flex-wrap">
                <span className="text-xs font-semibold text-text-secondary mr-1">Apply to all fields:</span>
                {(['source', 'merged', 'platform'] as const).map((side) => {
                  const enabled = side !== 'merged' || selected.fields.some((f) => f.mergedValue !== undefined);
                  return (
                    <button
                      key={side}
                      className={cn(
                        'px-3 py-1 text-xs font-medium font-[inherit] border rounded-md cursor-pointer',
                        globalPick === side
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface text-text-secondary border-border',
                        !enabled && 'opacity-40 cursor-not-allowed',
                      )}
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
              <div className="flex gap-2 justify-end border-t border-border pt-3.5 flex-wrap">
                <input
                  className="border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none font-[inherit] min-w-[240px] flex-1"
                  placeholder="Optional note (logged in audit trail)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  data-testid="conflict-note"
                />
                <button
                  className={cn(
                    'px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)]',
                    submitting && 'opacity-50 cursor-not-allowed',
                  )}
                  onClick={() => void handleDiscard()}
                  disabled={submitting}
                  data-testid="conflict-discard"
                >
                  Discard
                </button>
                <button
                  className={cn(
                    'px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]',
                    submitting && 'opacity-50 cursor-not-allowed',
                  )}
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
    <div className="border border-border rounded-lg overflow-hidden" data-testid={`field-diff-${field.field}`}>
      <div className="px-3 py-2 bg-surface-panel border-b border-border flex items-center justify-between gap-2 flex-wrap">
        <span className="font-mono text-xs text-text-primary font-semibold">{field.field}</span>
        {fieldChoice && (
          <button
            onClick={onClear}
            className="text-[10px] px-2.5 py-0.5 rounded-full cursor-pointer border border-border bg-surface text-text-secondary font-[inherit] font-medium"
            data-testid={`field-clear-${field.field}`}
          >
            Clear override
          </button>
        )}
      </div>
      <div className="grid grid-cols-3">
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
      <div className="flex gap-1.5 px-2.5 py-1.5 border-t border-border bg-surface-inset">
        <span className="text-[11px] text-text-tertiary mr-1">Pick for this field:</span>
        {(['source', 'merged', 'platform'] as const).map((side) => {
          const enabled = side !== 'merged' || hasMerge;
          const isActive = effective === side;
          return (
            <button
              key={side}
              className={cn(
                'text-[11px] px-2.5 py-0.5 rounded-full cursor-pointer border font-[inherit] font-medium',
                isActive
                  ? 'bg-[var(--color-state-completed)] text-white border-[var(--color-state-completed)]'
                  : 'bg-surface text-text-secondary border-border',
                !enabled && 'opacity-40 cursor-not-allowed',
              )}
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
      className={cn(
        'p-3 text-xs text-text-secondary font-mono whitespace-pre-wrap break-words min-h-[60px] bg-surface',
        !last && 'border-r border-border',
        selected && 'bg-[#ecfdf5] border-[var(--color-state-completed)]',
        dim && 'opacity-55',
      )}
    >
      <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-wide mb-1.5 font-sans">{label}</div>
      <div>{formatValue(value)}</div>
    </div>
  );
}
