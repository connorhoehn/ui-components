// frontend/src/components/pipelines/DLQInspector.tsx
//
// Dead Letter Queue inspector panel. Shows failed pipeline events with
// filtering by error kind, sorting by age, and redrive/purge actions.
// Mounted at /pipelines/dlq and accessible from the pipeline editor toolbar.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { cn } from '../../lib/cn';
import {
  listDLQEntries,
  redriveDLQEntries,
  purgeDLQEntries,
} from '../../api/pipelineDLQ';
import type { DLQEntry } from '../../api/pipelineDLQ';
import Modal from '../shared/Modal';
import { useToast } from '../shared/ToastProvider';
import { DLQEntryCard } from './DLQEntryCard';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Rows fetched per page (and per "Load more" click). */
const PAGE_SIZE = 100;

/** Extract distinct error kinds from entries for the filter dropdown. */
function extractErrorKinds(entries: DLQEntry[]): string[] {
  const kinds = new Set<string>();
  for (const e of entries) {
    if (e.errorKind) kinds.add(e.errorKind);
  }
  return Array.from(kinds).sort();
}

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

  // How many rows are currently loaded, so a background refresh can re-request
  // the same span instead of collapsing back to the first page. A ref, not
  // state: the refresh interval captures `fetchEntries` once per filter change.
  const loadedCountRef = useRef(0);

  // ── Fetch ─────────────────────────────────────────────────────────────

  const fetchEntries = useCallback(async (append = false) => {
    try {
      if (!append) setLoading(true);
      setError(null);
      const res = await listDLQEntries({
        // A non-appending fetch replaces the whole list, and the 15s
        // auto-refresh is one of those. Asking for a flat 100 meant every
        // refresh silently threw away the pages "Load more" had added: the
        // table went 200 rows -> 100 rows, "Redrive All (200)" -> "(100)", with
        // no indication anything had been dropped. Re-request the span the user
        // has actually loaded.
        limit: append ? PAGE_SIZE : Math.max(PAGE_SIZE, loadedCountRef.current),
        cursor: append ? cursor : undefined,
        errorKind: filterKind || undefined,
      });
      if (append) {
        setEntries((prev) => {
          const next = [...prev, ...res.items];
          loadedCountRef.current = next.length;
          return next;
        });
      } else {
        setEntries(res.items);
        loadedCountRef.current = res.items.length;
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
    <div className="py-6 px-8 font-[inherit] text-text-primary max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          data-ui-part=""
          type="button"
          onClick={() => navigate('/pipelines')}
          className="bg-none border-none text-base cursor-pointer text-text-secondary py-1 px-2"
          aria-label="Back to pipelines"
          title="Back to pipelines"
        >
          ←
        </button>
        <h1 className="text-lg font-bold text-text-primary m-0">Dead Letter Queue</h1>
        {/* `DLQListResponse` carries no server-side total, so this badge can
            only ever report what is loaded. It used to print that bare — a
            4,312-message queue read "100", and "200" after one Load more, i.e.
            a queue-depth figure that was a function of how many times you had
            clicked. The trailing "+" is the honest form while `hasMore` says
            there is more behind the cursor. */}
        <span
          className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold bg-danger-bg text-danger-fg"
          data-testid="dlq-depth-badge"
          title={
            hasMore
              ? `${entries.length} loaded — more remain in the queue`
              : `${entries.length} in the queue`
          }
        >
          {entries.length}
          {hasMore ? '+' : ''}
        </span>
        <div className="flex-1" />
        <button
          data-ui-part=""
          type="button"
          onClick={() => void fetchEntries(false)}
          className="px-2.5 py-1 text-xs font-semibold border-none rounded-[5px] cursor-pointer font-[inherit] bg-surface-hover text-text-secondary border border-border"
          title="Refresh"
        >
          Refresh
        </button>
      </div>

      {/* Toolbar: filters + bulk actions */}
      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
        <Input
          size="sm"
          type="search"
          placeholder="Filter by error text or event type..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="flex-1 min-w-30 max-w-75"
          aria-label="Filter dead letters"
          data-testid="dlq-filter-text"
        />

        <Select
          size="sm"
          value={filterKind}
          onChange={(e) => setFilterKind(e.target.value)}
          className="max-w-50 flex-none"
          aria-label="Filter by error kind"
          data-testid="dlq-filter-kind"
          options={[
            { value: '', label: 'All error kinds' },
            ...errorKinds.map((kind) => ({ value: kind, label: kind })),
          ]}
        />

        <div className="flex-1" />

        {selected.size > 0 && (
          <>
            <span className="text-xs text-text-secondary">
              {selected.size} selected
            </span>
            <button
              data-ui-part=""
              type="button"
              onClick={() => void handleRedrive(Array.from(selected))}
              className="px-2.5 py-1 text-xs font-semibold border-none rounded-[5px] cursor-pointer font-[inherit] bg-primary text-white"
              data-testid="dlq-bulk-redrive"
            >
              Redrive Selected
            </button>
            <button
              data-ui-part=""
              type="button"
              onClick={() => setPurgeTarget(Array.from(selected))}
              className="px-2.5 py-1 text-xs font-semibold border-none rounded-[5px] cursor-pointer font-[inherit] bg-danger-bg text-danger-fg"
              data-testid="dlq-bulk-purge"
            >
              Purge Selected
            </button>
          </>
        )}

        {entries.length > 0 && selected.size === 0 && (
          <button
            data-ui-part=""
            type="button"
            onClick={() => void handleRedrive(sorted.map((e) => e.messageId))}
            className="px-2.5 py-1 text-xs font-semibold border-none rounded-[5px] cursor-pointer font-[inherit] bg-primary text-white"
            data-testid="dlq-redrive-all"
          >
            Redrive All ({sorted.length})
          </button>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div role="alert" className="py-2.5 px-3.5 mb-4 bg-danger-bg border border-danger-border rounded-md text-[13px] text-danger-fg">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && entries.length === 0 && (
        <div role="status" className="text-center py-12 px-6 text-text-tertiary text-sm">
          Loading DLQ entries...
        </div>
      )}

      {/* Empty state */}
      {!loading && entries.length === 0 && !error && (
        <div className="text-center py-12 px-6 text-text-tertiary text-sm">
          <div className="text-[32px] mb-2">--</div>
          <div>No dead-letter entries.</div>
          <div className="mt-1 text-xs">
            Failed events will appear here when pipeline subscribers throw errors.
          </div>
        </div>
      )}

      {/* Table */}
      {sorted.length > 0 && (
        <>
          <table data-ui-part="" className="w-full border-collapse text-[13px]" data-testid="dlq-table">
            <thead>
              <tr>
                <th className="text-left p-2.5 border-b-2 border-border text-[11px] font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap w-8">
                  <Checkbox
                    checked={selected.size === sorted.length && sorted.length > 0}
                    indeterminate={selected.size > 0 && selected.size < sorted.length}
                    onChange={toggleSelectAll}
                    aria-label="Select all dead letters"
                  />
                </th>
                <th className="text-left p-2.5 border-b-2 border-border text-[11px] font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Event Type</th>
                <th className="text-left p-2.5 border-b-2 border-border text-[11px] font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Error</th>
                <th className="text-left p-2.5 border-b-2 border-border text-[11px] font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap w-[100px]">Kind</th>
                <th className="text-left p-2.5 border-b-2 border-border text-[11px] font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap w-20">Attempts</th>
                <th className="text-left p-2.5 border-b-2 border-border text-[11px] font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap w-[100px]">Failed</th>
                <th className="text-left p-2.5 border-b-2 border-border text-[11px] font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap w-[140px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry) => (
                <DLQEntryCard
                  key={entry.messageId}
                  entry={entry}
                  isHovered={hoveredRow === entry.messageId}
                  isSelected={selected.has(entry.messageId)}
                  onToggleSelect={toggleSelect}
                  onRedrive={handleRedrive}
                  onPurge={(ids) => setPurgeTarget(ids)}
                  onMouseEnter={setHoveredRow}
                  onMouseLeave={() => setHoveredRow(null)}
                />
              ))}
            </tbody>
          </table>

          {/* Load more */}
          {hasMore && (
            <div className="text-center mt-4">
              <button
                data-ui-part=""
                type="button"
                onClick={() => void fetchEntries(true)}
                className="py-2 px-4 text-xs font-semibold border-none rounded-[5px] cursor-pointer font-[inherit] bg-surface-hover text-text-secondary border border-border"
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
              data-ui-part=""
              onClick={() => setPurgeTarget(null)}
              className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer"
            >
              Cancel
            </button>
            <button
              data-ui-part=""
              onClick={() => void handlePurgeConfirm()}
              className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer"
            >
              Purge
            </button>
          </>
        }
      >
        <p className="m-0">
          This will permanently delete{' '}
          <strong>{purgeTarget?.length ?? 0}</strong> entr
          {purgeTarget?.length === 1 ? 'y' : 'ies'} from the dead letter queue.
          This action cannot be undone. The events will not be reprocessed.
        </p>
      </Modal>
    </div>
  );
}
