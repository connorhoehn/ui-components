// frontend/src/components/pipelines/DLQInspector.tsx
//
// Dead Letter Queue inspector panel. Shows failed pipeline events with
// filtering by error kind, sorting by age, and redrive/purge actions.
// Mounted at /pipelines/dlq and accessible from the pipeline editor toolbar.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router';
import {
  listDLQEntries,
  redriveDLQEntries,
  purgeDLQEntries,
} from '../../api/pipelineDLQ';
import type { DLQEntry } from '../../api/pipelineDLQ';
import Modal from '../shared/Modal';
import { useToast } from '../shared/ToastProvider';
import { colors, chipStyle, fieldStyle, saveBtnStyle, cancelBtnStyle } from '../../constants/styles';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 0) return 'just now';
  if (d < 60_000) return `${Math.floor(d / 1000)}s ago`;
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  return `${Math.floor(d / 86_400_000)}d ago`;
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max) + '...';
}

/** Extract distinct error kinds from entries for the filter dropdown. */
function extractErrorKinds(entries: DLQEntry[]): string[] {
  const kinds = new Set<string>();
  for (const e of entries) {
    if (e.errorKind) kinds.add(e.errorKind);
  }
  return Array.from(kinds).sort();
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const pageStyle: CSSProperties = {
  padding: '24px 32px',
  fontFamily: 'inherit',
  color: colors.textPrimary,
  maxWidth: 1200,
  margin: '0 auto',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 20,
};

const titleStyle: CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: colors.textPrimary,
  margin: 0,
};

const badgeStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 22,
  height: 22,
  padding: '0 6px',
  borderRadius: 11,
  fontSize: 12,
  fontWeight: 700,
  background: '#fef2f2',
  color: '#dc2626',
};

const toolbarStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 16,
  flexWrap: 'wrap',
};

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 13,
};

const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '8px 10px',
  borderBottom: `2px solid ${colors.border}`,
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: colors.textSecondary,
  whiteSpace: 'nowrap',
};

const tdStyle: CSSProperties = {
  padding: '10px 10px',
  borderBottom: `1px solid ${colors.border}`,
  verticalAlign: 'top',
};

const rowHoverBg = colors.surfaceHover;

const actionBtnStyle: CSSProperties = {
  padding: '4px 10px',
  fontSize: 12,
  fontWeight: 600,
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const emptyStyle: CSSProperties = {
  textAlign: 'center',
  padding: '48px 24px',
  color: colors.textTertiary,
  fontSize: 14,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DLQInspector() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [entries, setEntries] = useState<DLQEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(false);

  // Filter state
  const [filterKind, setFilterKind] = useState<string>('');
  const [filterText, setFilterText] = useState('');

  // Selection state for bulk actions
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Purge confirmation modal
  const [purgeTarget, setPurgeTarget] = useState<string[] | null>(null);

  // Hover state for row highlight
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  // Auto-refresh interval
  const refreshRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch ─────────────────────────────────────────────────────────────

  const fetchEntries = useCallback(async (append = false) => {
    try {
      if (!append) setLoading(true);
      setError(null);
      const res = await listDLQEntries({
        limit: 100,
        cursor: append ? cursor : undefined,
        errorKind: filterKind || undefined,
      });
      if (append) {
        setEntries((prev) => [...prev, ...res.items]);
      } else {
        setEntries(res.items);
      }
      setCursor(res.cursor);
      setHasMore(!!res.cursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [cursor, filterKind]);

  // Initial load + reload on filter change
  useEffect(() => {
    void fetchEntries(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKind]);

  // Auto-refresh every 15s
  useEffect(() => {
    refreshRef.current = setInterval(() => {
      void fetchEntries(false);
    }, 15_000);
    return () => {
      if (refreshRef.current) clearInterval(refreshRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKind]);

  // ── Derived state ─────────────────────────────────────────────────────

  const errorKinds = useMemo(() => extractErrorKinds(entries), [entries]);

  // Client-side text filter (regex on lastError)
  const filtered = useMemo(() => {
    if (!filterText.trim()) return entries;
    try {
      const re = new RegExp(filterText, 'i');
      return entries.filter((e) => re.test(e.lastError) || re.test(e.eventType));
    } catch {
      // Invalid regex — fall back to substring match
      const lower = filterText.toLowerCase();
      return entries.filter(
        (e) =>
          e.lastError.toLowerCase().includes(lower) ||
          e.eventType.toLowerCase().includes(lower),
      );
    }
  }, [entries, filterText]);

  // Sort oldest first by default
  const sorted = useMemo(() => {
    return [...filtered].sort(
      (a, b) => new Date(a.failedAt).getTime() - new Date(b.failedAt).getTime(),
    );
  }, [filtered]);

  // ── Actions ───────────────────────────────────────────────────────────

  const handleRedrive = useCallback(async (ids: string[]) => {
    try {
      const res = await redriveDLQEntries(ids, { resetAttempts: true });
      const count = res.redriven?.length ?? ids.length;
      toast(`Redrove ${count} entr${count === 1 ? 'y' : 'ies'}`, { type: 'success' });
      setSelected(new Set());
      void fetchEntries(false);
    } catch (err) {
      toast(`Redrive failed: ${err instanceof Error ? err.message : String(err)}`, { type: 'error' });
    }
  }, [toast, fetchEntries]);

  const handlePurgeConfirm = useCallback(async () => {
    if (!purgeTarget) return;
    try {
      const res = await purgeDLQEntries(purgeTarget);
      const count = res.purged?.length ?? purgeTarget.length;
      toast(`Purged ${count} entr${count === 1 ? 'y' : 'ies'}`, { type: 'success' });
      setSelected(new Set());
      setPurgeTarget(null);
      void fetchEntries(false);
    } catch (err) {
      toast(`Purge failed: ${err instanceof Error ? err.message : String(err)}`, { type: 'error' });
      setPurgeTarget(null);
    }
  }, [purgeTarget, toast, fetchEntries]);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selected.size === sorted.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(sorted.map((e) => e.messageId)));
    }
  }, [selected, sorted]);

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <button
          type="button"
          onClick={() => navigate('/pipelines')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 16,
            cursor: 'pointer',
            color: colors.textSecondary,
            padding: '4px 8px',
          }}
          aria-label="Back to pipelines"
          title="Back to pipelines"
        >
          ←
        </button>
        <h1 style={titleStyle}>Dead Letter Queue</h1>
        <span style={badgeStyle} data-testid="dlq-depth-badge">
          {entries.length}
        </span>
        <div style={{ flex: 1 }} />
        <button
          type="button"
          onClick={() => void fetchEntries(false)}
          style={{
            ...actionBtnStyle,
            background: colors.surfaceHover,
            color: colors.textSecondary,
            border: `1px solid ${colors.border}`,
          }}
          title="Refresh"
        >
          Refresh
        </button>
      </div>

      {/* Toolbar: filters + bulk actions */}
      <div style={toolbarStyle}>
        <input
          type="text"
          placeholder="Filter by error text or event type..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ ...fieldStyle, maxWidth: 300 }}
          data-testid="dlq-filter-text"
        />

        <select
          value={filterKind}
          onChange={(e) => setFilterKind(e.target.value)}
          style={{
            ...fieldStyle,
            maxWidth: 200,
            flex: 'none',
            cursor: 'pointer',
          }}
          data-testid="dlq-filter-kind"
        >
          <option value="">All error kinds</option>
          {errorKinds.map((kind) => (
            <option key={kind} value={kind}>
              {kind}
            </option>
          ))}
        </select>

        <div style={{ flex: 1 }} />

        {selected.size > 0 && (
          <>
            <span style={{ fontSize: 12, color: colors.textSecondary }}>
              {selected.size} selected
            </span>
            <button
              type="button"
              onClick={() => void handleRedrive(Array.from(selected))}
              style={{
                ...actionBtnStyle,
                background: colors.primary,
                color: '#fff',
              }}
              data-testid="dlq-bulk-redrive"
            >
              Redrive Selected
            </button>
            <button
              type="button"
              onClick={() => setPurgeTarget(Array.from(selected))}
              style={{
                ...actionBtnStyle,
                background: '#fef2f2',
                color: '#dc2626',
              }}
              data-testid="dlq-bulk-purge"
            >
              Purge Selected
            </button>
          </>
        )}

        {entries.length > 0 && selected.size === 0 && (
          <button
            type="button"
            onClick={() => void handleRedrive(sorted.map((e) => e.messageId))}
            style={{
              ...actionBtnStyle,
              background: colors.primary,
              color: '#fff',
            }}
            data-testid="dlq-redrive-all"
          >
            Redrive All ({sorted.length})
          </button>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div
          style={{
            padding: '10px 14px',
            marginBottom: 16,
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 6,
            fontSize: 13,
            color: '#dc2626',
          }}
        >
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && entries.length === 0 && (
        <div style={emptyStyle}>Loading DLQ entries...</div>
      )}

      {/* Empty state */}
      {!loading && entries.length === 0 && !error && (
        <div style={emptyStyle}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>--</div>
          <div>No dead-letter entries.</div>
          <div style={{ marginTop: 4, fontSize: 12 }}>
            Failed events will appear here when pipeline subscribers throw errors.
          </div>
        </div>
      )}

      {/* Table */}
      {sorted.length > 0 && (
        <>
          <table style={tableStyle} data-testid="dlq-table">
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 32 }}>
                  <input
                    type="checkbox"
                    checked={selected.size === sorted.length && sorted.length > 0}
                    onChange={toggleSelectAll}
                    title="Select all"
                  />
                </th>
                <th style={thStyle}>Event Type</th>
                <th style={thStyle}>Error</th>
                <th style={{ ...thStyle, width: 100 }}>Kind</th>
                <th style={{ ...thStyle, width: 80 }}>Attempts</th>
                <th style={{ ...thStyle, width: 100 }}>Failed</th>
                <th style={{ ...thStyle, width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry) => (
                <tr
                  key={entry.messageId}
                  onMouseEnter={() => setHoveredRow(entry.messageId)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    background:
                      hoveredRow === entry.messageId ? rowHoverBg : 'transparent',
                    transition: 'background 0.1s',
                  }}
                >
                  <td style={tdStyle}>
                    <input
                      type="checkbox"
                      checked={selected.has(entry.messageId)}
                      onChange={() => toggleSelect(entry.messageId)}
                    />
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 12,
                        color: colors.textPrimary,
                      }}
                    >
                      {entry.eventType}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{ fontSize: 12, color: colors.textSecondary }}
                      title={entry.lastError}
                    >
                      {truncate(entry.lastError, 80)}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {entry.errorKind ? (
                      <span style={chipStyle('danger')}>{entry.errorKind}</span>
                    ) : (
                      <span style={{ fontSize: 11, color: colors.textTertiary }}>
                        unknown
                      </span>
                    )}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <span
                      style={{
                        ...chipStyle('neutral'),
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {entry.totalAttempts}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{ fontSize: 12, color: colors.textSecondary }}
                      title={new Date(entry.failedAt).toLocaleString()}
                    >
                      {relativeTime(entry.failedAt)}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        type="button"
                        onClick={() => void handleRedrive([entry.messageId])}
                        style={{
                          ...actionBtnStyle,
                          background: '#eff6ff',
                          color: '#2563eb',
                        }}
                        title="Redrive this entry"
                      >
                        Redrive
                      </button>
                      <button
                        type="button"
                        onClick={() => setPurgeTarget([entry.messageId])}
                        style={{
                          ...actionBtnStyle,
                          background: '#fef2f2',
                          color: '#dc2626',
                        }}
                        title="Purge this entry"
                      >
                        Purge
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Load more */}
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button
                type="button"
                onClick={() => void fetchEntries(true)}
                style={{
                  ...actionBtnStyle,
                  background: colors.surfaceHover,
                  color: colors.textSecondary,
                  border: `1px solid ${colors.border}`,
                  padding: '8px 16px',
                }}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}

      {/* Purge confirmation modal */}
      <Modal
        open={purgeTarget !== null}
        onClose={() => setPurgeTarget(null)}
        title="Purge DLQ entries?"
        maxWidth={420}
        footer={
          <>
            <button
              onClick={() => setPurgeTarget(null)}
              style={cancelBtnStyle}
            >
              Cancel
            </button>
            <button
              onClick={() => void handlePurgeConfirm()}
              style={saveBtnStyle(false)}
            >
              Purge
            </button>
          </>
        }
      >
        <p style={{ margin: 0 }}>
          This will permanently delete{' '}
          <strong>{purgeTarget?.length ?? 0}</strong> entr
          {purgeTarget?.length === 1 ? 'y' : 'ies'} from the dead letter queue.
          This action cannot be undone. The events will not be reprocessed.
        </p>
      </Modal>
    </div>
  );
}
