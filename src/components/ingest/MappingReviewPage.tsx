// frontend/src/components/ingest/MappingReviewPage.tsx
//
// Operator queue for ingest items the LLM mapper produced low-confidence
// type matches for.

import { useState } from 'react';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { cn } from '../../lib/cn';
import { useIdentityContext } from '../../contexts/IdentityContext';
import { useMappingReviewQueue } from '../../hooks/useMappingReviewQueue';
import { useDocumentTypes } from '../../hooks/useDocumentTypes';
import { Select } from '../forms/Select';
import type { IngestItem } from '../../types/ingest';

export default function MappingReviewPage() {
  const { idToken } = useIdentityContext();
  const { items, threshold, loading, error, remap, skip } = useMappingReviewQueue();
  const { types: docTypes } = useDocumentTypes({ idToken });
  // Per-row chosen typeId for the Re-map action (when not accepting suggestion).
  const [remapById, setRemapById] = useState<Record<string, string>>({});

  return (
    <div data-testid="mapping-review-page" className="p-6 flex flex-col gap-3">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="text-[22px] font-bold text-text-primary">Mapping needs review</div>
          <div className="text-xs text-text-tertiary">
            Showing items with confidence &lt; {Math.round(threshold * 100)}%.
          </div>
        </div>
      </div>

      {error ? (
        <div data-testid="mapping-review-error" className="px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3">
          Couldn't load review queue: {error}
        </div>
      ) : null}

      {loading && items.length === 0 ? (
        <div className="flex flex-col gap-3">
          <SkeletonCard height={96} />
          <SkeletonCard height={96} />
          <SkeletonCard height={96} />
        </div>
      ) : items.length === 0 && !error ? (
        <EmptyState
          icon="✨"
          title="No items need review"
          body="When the LLM mapper produces a low-confidence match, it'll show up here for your call."
          testId="mapping-review-empty"
        />
      ) : (
        <div data-testid="mapping-review-list" className="flex flex-col gap-3">
          {items.map((item) => (
            <ReviewRow
              key={item.itemId}
              item={item}
              docTypes={docTypes}
              remapTypeId={remapById[item.itemId] ?? ''}
              onPickRemapType={(typeId) =>
                setRemapById((prev) => ({ ...prev, [item.itemId]: typeId }))
              }
              onAccept={() => {
                if (item.documentTypeId) void remap(item.itemId, item.documentTypeId);
              }}
              onRemap={() => {
                const typeId = remapById[item.itemId];
                if (typeId) void remap(item.itemId, typeId);
              }}
              onDiscard={() => void skip(item.itemId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ReviewRowProps {
  item: IngestItem;
  docTypes: Array<{ id: string; name: string }>;
  remapTypeId: string;
  onPickRemapType: (typeId: string) => void;
  onAccept: () => void;
  onRemap: () => void;
  onDiscard: () => void;
}

function ReviewRow({ item, docTypes, remapTypeId, onPickRemapType, onAccept, onRemap, onDiscard }: ReviewRowProps) {
  const suggested = docTypes.find((t) => t.id === item.documentTypeId);
  const suggestedName = suggested?.name ?? item.documentTypeId ?? '(unknown)';
  const conf = typeof item.mappingConfidence === 'number'
    ? `${Math.round(item.mappingConfidence * 100)}%`
    : '—';

  return (
    <div data-testid={`review-row-${item.itemId}`} className="p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="font-[ui-monospace,monospace] text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap" title={item.sourcePath}>
          {item.sourcePath}
        </span>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-warning-bg text-warning-fg">
          conf {conf}
        </span>
      </div>
      <div className="text-xs text-text-secondary flex gap-3 flex-wrap">
        <span>Suggested type: <strong>{suggestedName}</strong></span>
        <span>Source: {item.sourceId.slice(0, 8)}</span>
      </div>
      {item.error ? (
        <div className="text-xs text-text-secondary italic">
          {item.error.slice(0, 200)}
        </div>
      ) : null}
      <div className="flex gap-2 items-center flex-wrap">
        <button
          data-testid={`review-accept-${item.itemId}`}
          className={cn(
            'px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]',
            !item.documentTypeId && 'opacity-50 cursor-not-allowed',
          )}
          onClick={onAccept}
          disabled={!item.documentTypeId}
          title={item.documentTypeId ? 'Commit the suggested type' : 'No suggestion to accept'}
        >
          Accept suggestion
        </button>
        {/* One per row and none of them named: a screen reader heard a
            column of identical combo boxes with no tie to the item. */}
        <Select
          aria-label={`Re-map ${item.sourcePath ?? item.itemId} to document type`}
          data-testid={`review-remap-picker-${item.itemId}`}
          className="w-auto min-w-[200px]"
          value={remapTypeId}
          onChange={(e) => onPickRemapType(e.target.value)}
          options={[
            { value: '', label: 'Re-map to…' },
            ...docTypes.map((t) => ({ value: t.id, label: t.name })),
          ]}
        />
        <button
          data-testid={`review-remap-${item.itemId}`}
          className={cn(
            'px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]',
            !remapTypeId && 'opacity-50 cursor-not-allowed',
          )}
          onClick={onRemap}
          disabled={!remapTypeId}
        >
          Re-map
        </button>
        <button
          data-testid={`review-discard-${item.itemId}`}
          className="px-3 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary"
          onClick={onDiscard}
        >
          Discard
        </button>
      </div>
    </div>
  );
}
