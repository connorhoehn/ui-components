// frontend/src/components/ingest/SourcesPage.tsx
//
// Table of all ingest sources with columns for name, type, status, last sync,
// files synced, and row actions (Sync Now, Pause/Resume, Delete).

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useIngestSources } from '../../hooks/useIngestSources';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { cn } from '../../lib/cn';
import type { IngestSource, IngestSourceStatus, IngestSourceType } from '../../types/ingest';

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
  const {
    sources, loading, error, refresh, deleteSource, triggerSync,
    actionError, clearActionError,
  } = useIngestSources();
  const [syncing, setSyncing] = useState<Set<string>>(() => new Set());

  const handleSync = useCallback(async (sourceId: string) => {
    setSyncing((prev) => new Set(prev).add(sourceId));
    const ok = await triggerSync(sourceId);
    setSyncing((prev) => {
      const next = new Set(prev);
      next.delete(sourceId);
      return next;
    });
    // Only re-list when the trigger actually landed. `refresh()` calls
    // `setError(null)`, which used to wipe the failure the sync had just
    // recorded — so a rejected "Sync now" ended with the spinner stopping and
    // nothing else changing, identical to success.
    if (ok) void refresh();
  }, [triggerSync, refresh]);

  const handleDelete = useCallback(async (source: IngestSource) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Delete source "${source.name}"? This cannot be undone.`)) return;
    await deleteSource(source.sourceId);
  }, [deleteSource]);

  if (loading && sources.length === 0) {
    return (
      <div data-testid="sources-page" className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="m-0 text-[22px] font-bold text-text-primary">Sources</h2>
        </div>
        <SkeletonCard height={48} />
        <SkeletonCard height={48} />
        <SkeletonCard height={48} />
      </div>
    );
  }

  return (
    <div data-testid="sources-page" className="p-6 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="m-0 text-[22px] font-bold text-text-primary">Sources</h2>
          <span className="text-[13px] text-text-tertiary">
            {sources.length} source{sources.length !== 1 ? 's' : ''}
          </span>
        </div>
        <button
          data-ui-part=""
          className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit]"
          onClick={() => navigate('/ingest/sources')}
          data-testid="add-source-btn"
        >
          Add Source
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4" role="alert">
          <span className="text-[13px] font-medium">Failed to load sources.</span>
          <button
            data-ui-part=""
            onClick={() => void refresh()}
            className="px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]"
          >
            Retry
          </button>
        </div>
      )}

      {/* Action-failure banner — a failed delete or sync is not a failed load,
          and must not be reported as one. */}
      {actionError && (
        <div
          data-testid="sources-action-error"
          role="alert"
          className="px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4"
        >
          <span className="text-[13px] font-medium">
            That action did not go through: {actionError}
          </span>
          <button
            data-ui-part=""
            onClick={clearActionError}
            className="px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]"
          >
            Dismiss
          </button>
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
        <div className="overflow-x-auto">
          <table data-ui-part="" className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">Name</th>
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">Type</th>
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">Status</th>
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">Last Sync</th>
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">Files Synced</th>
                <th className="p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => (
                <tr
                  key={source.sourceId}
                  className="border-b border-border hover:bg-surface-hover"
                >
                  <td className="p-2 font-medium text-text-primary">
                    <button
                      data-ui-part=""
                      type="button"
                      data-testid={`source-name-link-${source.sourceId}`}
                      onClick={() => navigate(`/ingest/sources/${source.sourceId}`)}
                      className="bg-transparent border-none p-0 font-[inherit] text-primary cursor-pointer underline text-left"
                    >
                      {source.name}
                    </button>
                  </td>
                  <td className="p-2">
                    <Chip tone={typeTone(source.type)} size="xs">{typeLabel(source.type)}</Chip>
                  </td>
                  <td className="p-2">
                    <Chip tone={statusTone(source.status)} size="sm">{source.status}</Chip>
                  </td>
                  <td className="p-2 text-text-secondary">
                    {source.lastSyncAt ? relativeTime(source.lastSyncAt) : 'Never'}
                  </td>
                  <td
                    data-testid={`source-files-synced-${source.sourceId}`}
                    className="p-2 font-mono text-xs text-text-secondary"
                  >
                    {source.lastSyncStats ? (
                      <span>
                        {source.lastSyncStats.filesFound}
                        {source.lastSyncStats.filesNew > 0 ? (
                          <span className="text-text-tertiary">
                            {' · '}
                            {source.lastSyncStats.filesNew} new
                          </span>
                        ) : null}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="p-2 text-right">
                    <div className="flex gap-1.5 justify-end">
                      <button
                        data-ui-part=""
                        className={cn(
                          'px-2.5 py-1 text-[11px] font-medium rounded-[5px] cursor-pointer font-[inherit]',
                          syncing.has(source.sourceId) || source.status === 'paused'
                            ? 'border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed'
                            : 'border border-border bg-surface text-text-secondary',
                        )}
                        disabled={syncing.has(source.sourceId) || source.status === 'paused'}
                        onClick={() => void handleSync(source.sourceId)}
                        data-testid={`sync-${source.sourceId}`}
                      >
                        {syncing.has(source.sourceId) ? 'Syncing...' : 'Sync Now'}
                      </button>
                      <button
                        data-ui-part=""
                        className="px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]"
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
