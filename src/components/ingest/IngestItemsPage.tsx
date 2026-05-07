// frontend/src/components/ingest/IngestItemsPage.tsx
//
// Table of ingest items flowing through the pipeline, with source and status
// filters, action buttons (retry/skip), and color-coded status badges.

import type { CSSProperties } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useIngestItems } from '../../hooks/useIngestItems';
import { useIngestSources } from '../../hooks/useIngestSources';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { colors, pageContainerStyle, tableCellStyle, saveBtnStyle } from '../../constants/styles';
import type { IngestItem, IngestItemStatus, IngestMappingMethod } from '../../types/ingest';
import IngestItemDrawer from './IngestItemDrawer';

// ---------------------------------------------------------------------------
// Static styles
// ---------------------------------------------------------------------------

const styles: Record<string, CSSProperties> = {
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
  },
  title: {
    margin: 0, fontSize: 22, fontWeight: 700, color: colors.textPrimary,
  },
  count: {
    fontSize: 13, color: colors.textTertiary,
  },
  filtersRow: {
    display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap',
  },
  select: {
    padding: '6px 10px', fontSize: 13, fontFamily: 'inherit', border: `1px solid ${colors.borderField}`,
    borderRadius: 6, background: colors.surface, color: colors.textPrimary, cursor: 'pointer',
    outline: 'none',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    width: '100%', borderCollapse: 'collapse', fontSize: 13,
  },
  th: {
    ...tableCellStyle, fontWeight: 600, textAlign: 'left' as const,
  },
  row: {
    borderBottom: `1px solid ${colors.border}`, cursor: 'default',
  },
  pathCell: {
    ...tableCellStyle, fontWeight: 500, color: colors.textPrimary, maxWidth: 260,
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  actionsCell: {
    ...tableCellStyle, display: 'flex', gap: 6, alignItems: 'center',
  },
  actionBtn: {
    padding: '4px 10px', fontSize: 11, fontWeight: 500, border: `1px solid ${colors.border}`,
    borderRadius: 5, background: colors.surface, cursor: 'pointer', fontFamily: 'inherit',
    color: colors.textSecondary,
  },
  actionBtnDanger: {
    padding: '4px 10px', fontSize: 11, fontWeight: 500, border: `1px solid ${colors.state.failed}`,
    borderRadius: 5, background: '#fef2f2', cursor: 'pointer', fontFamily: 'inherit',
    color: colors.state.failed,
  },
  errorBanner: {
    padding: '12px 16px', background: '#fef2f2', border: `1px solid ${colors.state.failed}`,
    color: colors.state.failed, borderRadius: 8, display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: 12, marginBottom: 16,
  },
  retryBtn: {
    padding: '6px 14px', fontSize: 13, fontWeight: 500, background: '#fff',
    color: colors.state.failed, border: `1px solid ${colors.state.failed}`,
    borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
  },
  link: {
    color: colors.primary, textDecoration: 'none', fontWeight: 500, fontSize: 12,
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ALL_STATUSES: IngestItemStatus[] = ['queued', 'mapping', 'materializing', 'triggering', 'done', 'failed'];

function statusTone(status: IngestItemStatus): ChipTone {
  switch (status) {
    case 'queued':         return 'neutral';
    case 'mapping':        return 'info';
    case 'materializing':  return 'purple';
    case 'triggering':     return 'caution';
    case 'done':           return 'success';
    case 'failed':         return 'danger';
    default:               return 'neutral';
  }
}

function methodTone(method: IngestMappingMethod): ChipTone {
  switch (method) {
    case 'rule':          return 'neutral';
    case 'llm-match':     return 'info';
    case 'llm-generate':  return 'purple';
    default:              return 'neutral';
  }
}

function truncatePath(path: string, max = 50): string {
  if (path.length <= max) return path;
  return '...' + path.slice(path.length - max + 3);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function IngestItemsPage() {
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<IngestItemStatus | null>(null);
  const [drawerItem, setDrawerItem] = useState<IngestItem | null>(null);

  const { sources } = useIngestSources();
  const { items, loading, error, refresh, retryItem, skipItem } = useIngestItems({
    sourceId: sourceFilter,
    status: statusFilter,
  });

  // Keep the drawer in sync with the latest item state when items refresh
  // (e.g. after a status update via WebSocket → useIngestItems → here).
  const drawerItemFresh = drawerItem
    ? items.find((it) => it.itemId === drawerItem.itemId) ?? drawerItem
    : null;

  // Build a sourceId -> name lookup
  const sourceNameMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of sources) {
      map.set(s.sourceId, s.name);
    }
    return map;
  }, [sources]);

  const handleRetry = useCallback(async (itemId: string) => {
    await retryItem(itemId);
  }, [retryItem]);

  const handleSkip = useCallback(async (itemId: string) => {
    await skipItem(itemId);
  }, [skipItem]);

  if (loading && items.length === 0) {
    return (
      <div data-testid="ingest-items-page" style={pageContainerStyle}>
        <div style={styles.header}>
          <h2 style={styles.title}>Ingest Items</h2>
        </div>
        <SkeletonCard height={48} />
        <SkeletonCard height={48} />
        <SkeletonCard height={48} />
      </div>
    );
  }

  return (
    <div data-testid="ingest-items-page" style={pageContainerStyle}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Ingest Items</h2>
          <span style={styles.count}>
            {items.length} item{items.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Filters row */}
      <div style={styles.filtersRow}>
        <select
          style={styles.select}
          value={sourceFilter ?? ''}
          onChange={(e) => setSourceFilter(e.target.value || null)}
          data-testid="source-filter"
        >
          <option value="">All Sources</option>
          {sources.map((s) => (
            <option key={s.sourceId} value={s.sourceId}>{s.name}</option>
          ))}
        </select>

        <select
          style={styles.select}
          value={statusFilter ?? ''}
          onChange={(e) => setStatusFilter((e.target.value || null) as IngestItemStatus | null)}
          data-testid="status-filter"
        >
          <option value="">All</option>
          {ALL_STATUSES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>

        <button
          style={saveBtnStyle(false)}
          onClick={() => void refresh()}
          data-testid="refresh-btn"
        >
          Refresh
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div style={styles.errorBanner} role="alert">
          <span style={{ fontSize: 13, fontWeight: 500 }}>Failed to load ingest items.</span>
          <button onClick={() => void refresh()} style={styles.retryBtn}>Retry</button>
        </div>
      )}

      {/* Empty state */}
      {!error && items.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No items found"
          body="No ingest items match the current filters."
        />
      ) : !error && (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <th style={styles.th}>File Path</th>
                <th style={styles.th}>Source</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Method</th>
                <th style={styles.th}>Document</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.itemId}
                  style={{ ...styles.row, cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceHover ?? '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => setDrawerItem(item)}
                  data-testid={`item-row-${item.itemId}`}
                >
                  <td style={styles.pathCell} title={item.sourcePath}>
                    {truncatePath(item.sourcePath)}
                  </td>
                  <td style={tableCellStyle}>
                    {sourceNameMap.get(item.sourceId) ?? item.sourceId.slice(0, 8)}
                  </td>
                  <td style={tableCellStyle}>
                    <Chip tone={statusTone(item.status)} size="sm">{item.status}</Chip>
                  </td>
                  <td style={{ ...tableCellStyle, fontFamily: 'monospace', fontSize: 11 }}>
                    {item.documentTypeId ?? '—'}
                  </td>
                  <td style={tableCellStyle}>
                    {item.mappingMethod ? (
                      <Chip tone={methodTone(item.mappingMethod)} size="xs">{item.mappingMethod}</Chip>
                    ) : '—'}
                  </td>
                  <td style={tableCellStyle}>
                    {item.documentId ? (
                      <a
                        href={`/documents/${item.documentId}`}
                        style={styles.link}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.documentId.slice(0, 8)}...
                      </a>
                    ) : '—'}
                  </td>
                  <td
                    style={{ ...tableCellStyle, textAlign: 'right' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      {item.status === 'failed' && (
                        <button
                          style={styles.actionBtn}
                          onClick={() => void handleRetry(item.itemId)}
                          data-testid={`retry-${item.itemId}`}
                        >
                          Retry
                        </button>
                      )}
                      {item.status !== 'done' && (
                        <button
                          style={styles.actionBtnDanger}
                          onClick={() => void handleSkip(item.itemId)}
                          data-testid={`skip-${item.itemId}`}
                        >
                          Skip
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Per-item details drawer */}
      <IngestItemDrawer
        item={drawerItemFresh}
        sourceName={drawerItemFresh ? sourceNameMap.get(drawerItemFresh.sourceId) : undefined}
        onClose={() => setDrawerItem(null)}
        onRetry={async (id) => { await handleRetry(id); }}
        onSkip={async (id) => { await handleSkip(id); }}
      />
    </div>
  );
}
