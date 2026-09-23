// frontend/src/components/ingest/DeadLetterQueuePage.tsx
//
// Operator-facing inspect + replay surface for failed ingest items
// sitting in the dead-letter queue. AGENTIC_ETL_VISION slice I.
//
// Per-row actions:
//   • Replay — re-enqueue the entry (POST /api/ingest/dlq/:id/replay).
//   • Drop   — purge without replay   (DELETE /api/ingest/dlq/:id).

import { useState } from 'react';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { useIngestDLQ } from '../../hooks/useIngestDLQ';
import type { DLQEntryRow } from '../../hooks/useIngestDLQ';

function formatAge(ms: number): string {
  const delta = Date.now() - ms;
  if (delta < 0) return 'just now';
  if (delta < 60_000) return `${Math.floor(delta / 1000)}s ago`;
  if (delta < 3_600_000) return `${Math.floor(delta / 60_000)}m ago`;
  if (delta < 86_400_000) return `${Math.floor(delta / 3_600_000)}h ago`;
  return `${Math.floor(delta / 86_400_000)}d ago`;
}

export default function DeadLetterQueuePage() {
  const { entries, loading, error, replay, drop } = useIngestDLQ();
  // `replay` / `drop` REJECT on a non-2xx response. Both call sites were
  // `void replay(...)`, so a failed replay produced an unhandled promise
  // rejection and nothing else: the row stayed in the queue, no message
  // appeared, and the operator could not tell a failed replay from one that
  // succeeded but hadn't refreshed yet. `error` above only ever carries a
  // *load* failure — the action path never reached it.
  const [actionError, setActionError] = useState<string | null>(null);

  const runAction = (promise: Promise<void>): void => {
    setActionError(null);
    void promise.catch((err: unknown) => {
      setActionError(err instanceof Error ? err.message : String(err));
    });
  };

  return (
    <div data-testid="ingest-dlq-page" className="p-6 flex flex-col gap-3">
      <div className="flex items-baseline justify-between mb-4 gap-3 flex-wrap">
        <div>
          <div className="text-[22px] font-bold text-text-primary">Dead Letter Queue</div>
          <div className="text-xs text-text-tertiary">Items the engine couldn't process. Replay re-enqueues; drop purges.</div>
        </div>
      </div>

      {error ? (
        <div role="alert" data-testid="ingest-dlq-error" className="px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3">
          {error}
        </div>
      ) : null}

      {/* Action-failure banner. Kept separate from the load error above so a
          rejected Replay never claims the queue failed to load — the list
          below it is correct and stays visible. */}
      {actionError ? (
        <div
          data-testid="ingest-dlq-action-error"
          role="alert"
          className="px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3"
        >
          <span className="text-[13px] font-medium">
            That entry was not updated: {actionError}
          </span>
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {loading && entries.length === 0 ? (
        <div className="flex flex-col gap-3">
          <SkeletonCard height={96} />
          <SkeletonCard height={96} />
          <SkeletonCard height={96} />
        </div>
      ) : entries.length === 0 && !error ? (
        <EmptyState
          icon="🧹"
          title="DLQ is empty"
          body="Failed items will land here. Replay re-enqueues into the source queue; drop purges without retry."
          testId="ingest-dlq-empty"
        />
      ) : (
        <div data-testid="ingest-dlq-list" className="flex flex-col gap-3">
          {entries.map((e) => (
            <DLQRow
              key={e.id}
              entry={e}
              onReplay={() => runAction(replay(e.id))}
              onDrop={() => runAction(drop(e.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface DLQRowProps {
  entry: DLQEntryRow;
  onReplay: () => void;
  onDrop: () => void;
}

function DLQRow({ entry, onReplay, onDrop }: DLQRowProps) {
  return (
    <div data-testid={`dlq-row-${entry.id}`} className="p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[13px] text-text-primary" title={entry.id}>{entry.id}</span>
        <span className="text-[11px] text-text-tertiary">{formatAge(entry.failedAtMs)}</span>
      </div>
      <div className="text-xs text-text-secondary flex gap-4 flex-wrap">
        <span>Attempts: <strong>{entry.totalAttempts}</strong></span>
        {(entry.envelope as { body?: { sourceId?: string } }).body?.sourceId ? (
          <span>Source: {(entry.envelope as { body: { sourceId: string } }).body.sourceId.slice(0, 12)}</span>
        ) : null}
      </div>
      {entry.lastError ? (
        <div className="text-xs text-text-primary font-mono bg-surface-inset px-2 py-1.5 rounded-md whitespace-pre-wrap break-words max-h-20 overflow-auto">{entry.lastError}</div>
      ) : null}
      <div className="flex gap-2">
        <button
          data-testid={`dlq-replay-${entry.id}`}
          className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit] shrink-0"
          onClick={onReplay}
        >
          Replay
        </button>
        <button
          data-testid={`dlq-drop-${entry.id}`}
          className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0"
          onClick={onDrop}
        >
          Drop
        </button>
      </div>
    </div>
  );
}
