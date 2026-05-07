// frontend/src/components/ingest/DeadLetterQueuePage.tsx
//
// Operator-facing inspect + replay surface for failed ingest items
// sitting in the dead-letter queue. AGENTIC_ETL_VISION slice I.
//
// Per-row actions:
//   • Replay — re-enqueue the entry (POST /api/ingest/dlq/:id/replay).
//   • Drop   — purge without replay   (DELETE /api/ingest/dlq/:id).

import type { CSSProperties } from 'react';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { colors, fieldStyle, pageContainerStyle, saveBtnStyle, cancelBtnStyle } from '../../constants/styles';
import { useIngestDLQ } from '../../hooks/useIngestDLQ';
import type { DLQEntryRow } from '../../hooks/useIngestDLQ';

const styles: Record<string, CSSProperties> = {
  header: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' },
  title: { fontSize: 22, fontWeight: 700, color: colors.textPrimary },
  subtitle: { fontSize: 12, color: colors.textTertiary },
  errorBanner: { padding: '8px 12px', background: '#fef2f2', border: `1px solid ${colors.state.failed}`, color: colors.state.failed, borderRadius: 8, marginBottom: 12 },
  list: { display: 'flex', flexDirection: 'column', gap: 12 },
  card: { padding: 14, background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 8 },
  cardHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  envId: { fontFamily: 'ui-monospace, monospace', fontSize: 13, color: colors.textPrimary },
  meta: { fontSize: 12, color: colors.textSecondary, display: 'flex', gap: 16, flexWrap: 'wrap' },
  errorText: { fontSize: 12, color: colors.textPrimary, fontFamily: 'ui-monospace, monospace', background: colors.surfaceInset, padding: '6px 8px', borderRadius: 6, whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: 80, overflow: 'auto' },
  actions: { display: 'flex', gap: 8 },
};

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

  return (
    <div data-testid="ingest-dlq-page" style={pageContainerStyle}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Dead Letter Queue</div>
          <div style={styles.subtitle}>Items the engine couldn't process. Replay re-enqueues; drop purges.</div>
        </div>
      </div>

      {error ? (
        <div data-testid="ingest-dlq-error" style={styles.errorBanner}>
          {error}
        </div>
      ) : null}

      {loading && entries.length === 0 ? (
        <div style={styles.list}>
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
        <div data-testid="ingest-dlq-list" style={styles.list}>
          {entries.map((e) => (
            <DLQRow
              key={e.id}
              entry={e}
              onReplay={() => void replay(e.id)}
              onDrop={() => void drop(e.id)}
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
    <div data-testid={`dlq-row-${entry.id}`} style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.envId} title={entry.id}>{entry.id}</span>
        <span style={{ fontSize: 11, color: colors.textTertiary }}>{formatAge(entry.failedAtMs)}</span>
      </div>
      <div style={styles.meta}>
        <span>Attempts: <strong>{entry.totalAttempts}</strong></span>
        {(entry.envelope as { body?: { sourceId?: string } }).body?.sourceId ? (
          <span>Source: {(entry.envelope as { body: { sourceId: string } }).body.sourceId.slice(0, 12)}</span>
        ) : null}
      </div>
      {entry.lastError ? (
        <div style={styles.errorText}>{entry.lastError}</div>
      ) : null}
      <div style={styles.actions}>
        <button
          data-testid={`dlq-replay-${entry.id}`}
          style={saveBtnStyle(false)}
          onClick={onReplay}
        >
          Replay
        </button>
        <button
          data-testid={`dlq-drop-${entry.id}`}
          style={cancelBtnStyle}
          onClick={onDrop}
        >
          Drop
        </button>
      </div>
    </div>
  );
}
