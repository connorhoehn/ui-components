// frontend/src/components/ingest/MappingReviewPage.tsx
//
// Operator queue for ingest items the LLM mapper produced low-confidence
// type matches for. Per AGENTIC_ETL_VISION §B Tier 2: below the confidence
// threshold, items fall through to this queue instead of auto-accepting
// (which risks the wrong type) or silently DLQ'ing.
//
// Per-row actions:
//   • Accept — commit the suggested type as-is (re-maps with method='rule').
//   • Re-map — pick a different type from the DocType list and re-queue.
//   • Discard — mark the item as skipped.

import type { CSSProperties } from 'react';
import { useState } from 'react';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { colors, fieldStyle, pageContainerStyle, saveBtnStyle, cancelBtnStyle } from '../../constants/styles';
import { useIdentityContext } from '../../contexts/IdentityContext';
import { useMappingReviewQueue } from '../../hooks/useMappingReviewQueue';
import { useDocumentTypes } from '../../hooks/useDocumentTypes';
import type { IngestItem } from '../../types/ingest';

const styles: Record<string, CSSProperties> = {
  header: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 700, color: colors.textPrimary },
  threshold: { fontSize: 12, color: colors.textTertiary },
  errorBanner: { padding: '8px 12px', background: '#fef2f2', border: `1px solid ${colors.state.failed}`, color: colors.state.failed, borderRadius: 8, marginBottom: 12 },
  list: { display: 'flex', flexDirection: 'column', gap: 12 },
  card: { padding: 16, background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 8 },
  cardHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  filePath: { fontFamily: 'ui-monospace, monospace', fontSize: 13, color: colors.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  confidencePill: { fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: '#fef3c7', color: '#92400e' },
  meta: { fontSize: 12, color: colors.textSecondary, display: 'flex', gap: 12, flexWrap: 'wrap' },
  actions: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
  remapPicker: { ...fieldStyle, flex: 'none', minWidth: 200 },
};

export default function MappingReviewPage() {
  const { idToken } = useIdentityContext();
  const { items, threshold, loading, error, remap, skip } = useMappingReviewQueue();
  const { types: docTypes } = useDocumentTypes({ idToken });
  // Per-row chosen typeId for the Re-map action (when not accepting suggestion).
  const [remapById, setRemapById] = useState<Record<string, string>>({});

  return (
    <div data-testid="mapping-review-page" style={pageContainerStyle}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Mapping needs review</div>
          <div style={styles.threshold}>
            Showing items with confidence &lt; {Math.round(threshold * 100)}%.
          </div>
        </div>
      </div>

      {error ? (
        <div data-testid="mapping-review-error" style={styles.errorBanner}>
          Couldn't load review queue: {error}
        </div>
      ) : null}

      {loading && items.length === 0 ? (
        <div style={styles.list}>
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
        <div data-testid="mapping-review-list" style={styles.list}>
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
    <div data-testid={`review-row-${item.itemId}`} style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.filePath} title={item.sourcePath}>{item.sourcePath}</span>
        <span style={styles.confidencePill}>conf {conf}</span>
      </div>
      <div style={styles.meta}>
        <span>Suggested type: <strong>{suggestedName}</strong></span>
        <span>Source: {item.sourceId.slice(0, 8)}</span>
      </div>
      {item.error ? (
        <div style={{ fontSize: 12, color: colors.textSecondary, fontStyle: 'italic' }}>
          {item.error.slice(0, 200)}
        </div>
      ) : null}
      <div style={styles.actions}>
        <button
          data-testid={`review-accept-${item.itemId}`}
          style={saveBtnStyle(false)}
          onClick={onAccept}
          disabled={!item.documentTypeId}
          title={item.documentTypeId ? 'Commit the suggested type' : 'No suggestion to accept'}
        >
          Accept suggestion
        </button>
        <select
          data-testid={`review-remap-picker-${item.itemId}`}
          style={styles.remapPicker}
          value={remapTypeId}
          onChange={(e) => onPickRemapType(e.target.value)}
        >
          <option value="">Re-map to…</option>
          {docTypes.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <button
          data-testid={`review-remap-${item.itemId}`}
          style={saveBtnStyle(false)}
          onClick={onRemap}
          disabled={!remapTypeId}
        >
          Re-map
        </button>
        <button
          data-testid={`review-discard-${item.itemId}`}
          style={cancelBtnStyle}
          onClick={onDiscard}
        >
          Discard
        </button>
      </div>
    </div>
  );
}
