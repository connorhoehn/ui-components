// frontend/src/components/ingest/IngestItemsPage.tsx
//
// Table of ingest items flowing through the pipeline, with source and status
// filters, action buttons (retry/skip), and color-coded status badges.

import { useCallback, useMemo, useState } from 'react';
import { useIngestItems } from '../../hooks/useIngestItems';
import { useIngestSources } from '../../hooks/useIngestSources';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { cn } from '../../lib/cn';
import { onActivationKey } from '../../lib/activationKey';
import type { IngestItem, IngestItemStatus, IngestMappingMethod } from '../../types/ingest';
import IngestItemDrawer from './IngestItemDrawer';
import { Select } from '../forms/Select';

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
      <div data-testid="ingest-items-page" className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="m-0 text-[22px] font-bold text-text-primary">Ingest Items</h2>
        </div>
        <SkeletonCard height={48} />
        <SkeletonCard height={48} />
        <SkeletonCard height={48} />
      </div>
    );
  }

  return (
    <div data-testid="ingest-items-page" className="p-6 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="m-0 text-[22px] font-bold text-text-primary">Ingest Items</h2>
          <span className="text-[13px] text-text-tertiary">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex gap-2.5 items-center mb-3 flex-wrap">
        {/* Neither filter had any accessible name: the toolbar announced as
            two anonymous combo boxes reading out only their current option. */}
        <Select
          aria-label="Filter by source"
          className="w-auto"
          value={sourceFilter ?? ''}
          onChange={(e) => setSourceFilter(e.target.value || null)}
          data-testid="source-filter"
          options={[
            { value: '', label: 'All Sources' },
            ...sources.map((s) => ({ value: s.sourceId, label: s.name })),
          ]}
        />

        <Select
          aria-label="Filter by status"
          className="w-auto"
          value={statusFilter ?? ''}
          onChange={(e) => setStatusFilter((e.target.value || null) as IngestItemStatus | null)}
          data-testid="status-filter"
          options={[
            { value: '', label: 'All' },
            ...ALL_STATUSES.map((st) => ({ value: st, label: st })),
          ]}
        />

        <button
          className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]"
          onClick={() => void refresh()}
          data-testid="refresh-btn"
        >
          Refresh
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4" role="alert">
          <span className="text-[13px] font-medium">Failed to load ingest items.</span>
          <button
            onClick={() => void refresh()}
            className="px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]"
          >
            Retry
          </button>
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
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">File Path</th>
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">Source</th>
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">Status</th>
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">Type</th>
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">Method</th>
                <th className="p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase">Document</th>
                <th className="p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.itemId}
                  className="border-b border-border cursor-pointer hover:bg-surface-hover"
                  onClick={() => setDrawerItem(item)}
                  onKeyDown={onActivationKey(() => setDrawerItem(item))}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open details for ${item.sourcePath}`}
                  data-testid={`item-row-${item.itemId}`}
                >
                  <td className="p-2 font-medium text-text-primary max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap" title={item.sourcePath}>
                    {truncatePath(item.sourcePath)}
                  </td>
                  <td className="p-2 text-text-secondary">
                    {sourceNameMap.get(item.sourceId) ?? item.sourceId.slice(0, 8)}
                  </td>
                  <td className="p-2">
                    <Chip tone={statusTone(item.status)} size="sm">{item.status}</Chip>
                  </td>
                  <td className="p-2 font-mono text-[11px] text-text-secondary">
                    {item.documentTypeId ?? '—'}
                  </td>
                  <td className="p-2">
                    {item.mappingMethod ? (
                      <Chip tone={methodTone(item.mappingMethod)} size="xs">{item.mappingMethod}</Chip>
                    ) : '—'}
                  </td>
                  <td className="p-2">
                    {item.documentId ? (
                      <a
                        href={`/documents/${item.documentId}`}
                        className="text-primary no-underline font-medium text-xs"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        {item.documentId.slice(0, 8)}...
                      </a>
                    ) : '—'}
                  </td>
                  <td
                    className="p-2 text-right"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <div className="flex gap-1.5 justify-end">
                      {item.status === 'failed' && (
                        <button
                          className="px-2.5 py-1 text-[11px] font-medium border border-border rounded-[5px] bg-surface cursor-pointer font-[inherit] text-text-secondary"
                          onClick={() => void handleRetry(item.itemId)}
                          data-testid={`retry-${item.itemId}`}
                        >
                          Retry
                        </button>
                      )}
                      {item.status !== 'done' && (
                        <button
                          className="px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]"
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
