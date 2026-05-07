// frontend/src/components/ingest/SourcesPage.tsx
//
// Table of all ingest sources with columns for name, type, status, last sync,
// files synced, and row actions (Sync Now, Pause/Resume, Delete).

import type { CSSProperties } from 'react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useIngestSources } from '../../hooks/useIngestSources';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { colors, pageContainerStyle, tableCellStyle, saveBtnStyle } from '../../constants/styles';
import type { IngestSource, IngestSourceStatus, IngestSourceType } from '../../types/ingest';

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
  nameCell: {
    ...tableCellStyle, fontWeight: 500, color: colors.textPrimary,
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
  syncingBtn: {
    padding: '4px 10px', fontSize: 11, fontWeight: 500, border: `1px solid ${colors.border}`,
    borderRadius: 5, background: colors.surfaceInset, cursor: 'not-allowed', fontFamily: 'inherit',
    color: colors.textTertiary, opacity: 0.7,
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

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  if (d < 259_200_000) return `${Math.floor(d / 86_400_000)}d ago`;
  return new Date(iso).toLocaleDateString();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SourcesPage() {
  const navigate = useNavigate();
  const { sources, loading, error, refresh, deleteSource, triggerSync } = useIngestSources();
  const [syncing, setSyncing] = useState<Set<string>>(() => new Set());

  const handleSync = useCallback(async (sourceId: string) => {
    setSyncing((prev) => new Set(prev).add(sourceId));
    await triggerSync(sourceId);
    setSyncing((prev) => {
      const next = new Set(prev);
      next.delete(sourceId);
      return next;
    });
    // Refresh sources to pick up updated lastSyncAt
    void refresh();
  }, [triggerSync, refresh]);

  const handleDelete = useCallback(async (source: IngestSource) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Delete source "${source.name}"? This cannot be undone.`)) return;
    await deleteSource(source.sourceId);
  }, [deleteSource]);

  if (loading && sources.length === 0) {
    return (
      <div data-testid="sources-page" style={pageContainerStyle}>
        <div style={styles.header}>
          <h2 style={styles.title}>Sources</h2>
        </div>
        <SkeletonCard height={48} />
        <SkeletonCard height={48} />
        <SkeletonCard height={48} />
      </div>
    );
  }

  return (
    <div data-testid="sources-page" style={pageContainerStyle}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Sources</h2>
          <span style={styles.count}>
            {sources.length} source{sources.length !== 1 ? 's' : ''}
          </span>
        </div>
        <button
          style={saveBtnStyle(false)}
          onClick={() => navigate('/ingest/sources')}
          data-testid="add-source-btn"
        >
          Add Source
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div style={styles.errorBanner} role="alert">
          <span style={{ fontSize: 13, fontWeight: 500 }}>Failed to load sources.</span>
          <button onClick={() => void refresh()} style={styles.retryBtn}>Retry</button>
        </div>
      )}

      {/* Empty state */}
      {!error && sources.length === 0 ? (
        <EmptyState
          icon="📂"
          title="No sources configured"
          body="Add a data source to start ingesting files into the system."
          actionLabel="Add Source"
          onAction={() => navigate('/ingest/sources')}
        />
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Last Sync</th>
                <th style={styles.th}>Files Synced</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => (
                <tr
                  key={source.sourceId}
                  style={styles.row}
                  onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceHover ?? '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={styles.nameCell}>
                    <button
                      type="button"
                      data-testid={`source-name-link-${source.sourceId}`}
                      onClick={() => navigate(`/ingest/sources/${source.sourceId}`)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        font: 'inherit',
                        color: colors.primary,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textAlign: 'left',
                      }}
                    >
                      {source.name}
                    </button>
                  </td>
                  <td style={tableCellStyle}>
                    <Chip tone={typeTone(source.type)} size="xs">{typeLabel(source.type)}</Chip>
                  </td>
                  <td style={tableCellStyle}>
                    <Chip tone={statusTone(source.status)} size="sm">{source.status}</Chip>
                  </td>
                  <td style={tableCellStyle}>
                    {source.lastSyncAt ? relativeTime(source.lastSyncAt) : 'Never'}
                  </td>
                  <td
                    data-testid={`source-files-synced-${source.sourceId}`}
                    style={{ ...tableCellStyle, fontFamily: 'monospace', fontSize: 12 }}
                  >
                    {source.lastSyncStats ? (
                      <span>
                        {source.lastSyncStats.filesFound}
                        {source.lastSyncStats.filesNew > 0 ? (
                          <span style={{ color: colors.textTertiary }}>
                            {' · '}
                            {source.lastSyncStats.filesNew} new
                          </span>
                        ) : null}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td style={{ ...tableCellStyle, textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button
                        style={syncing.has(source.sourceId) || source.status === 'paused' ? styles.syncingBtn : styles.actionBtn}
                        disabled={syncing.has(source.sourceId) || source.status === 'paused'}
                        onClick={() => void handleSync(source.sourceId)}
                        data-testid={`sync-${source.sourceId}`}
                      >
                        {syncing.has(source.sourceId) ? 'Syncing...' : 'Sync Now'}
                      </button>
                      <button
                        style={styles.actionBtnDanger}
                        onClick={() => void handleDelete(source)}
                        data-testid={`delete-${source.sourceId}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
