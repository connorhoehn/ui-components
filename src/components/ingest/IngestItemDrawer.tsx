// frontend/src/components/ingest/IngestItemDrawer.tsx
//
// Right-side drawer that opens when the operator clicks an ingest item.
// Shows the status timeline (queued → mapping → materializing → triggering
// → done/failed), the mapping decision (rule | llm-match | llm-generate +
// confidence), and operator actions: retry, discard, re-map.
//
// Pattern: matches existing inline-style conventions used by the rest of
// the ingest UI. We don't reuse Modal here because a side-drawer is the
// more appropriate UX for "inspect-and-act-on-a-row" — Modal centers a
// card and dims the page, which is wrong for transient deep-dives.
//
// Re-map endpoint expected (Agent E to confirm shape):
//   POST /api/ingest/items/:id/remap     -> { item: IngestItem }
// (current backend exposes /retry and /skip; remap is an additive endpoint)

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import { colors } from '../../constants/styles';
import { useIdentityContext } from '../../contexts/IdentityContext';
import { useIngestProgress } from '../../hooks/useIngestProgress';
import type { IngestItem, IngestItemStatus, IngestMappingMethod } from '../../types/ingest';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

export interface IngestItemDrawerProps {
  item: IngestItem | null;
  sourceName?: string;
  onClose: () => void;
  onRetry: (itemId: string) => Promise<boolean | void>;
  onSkip: (itemId: string) => Promise<boolean | void>;
}

// Canonical pipeline order — used to render the timeline.
const TIMELINE_STEPS: IngestItemStatus[] = [
  'queued',
  'mapping',
  'materializing',
  'triggering',
  'done',
];

// ---------------------------------------------------------------------------
// Static styles
// ---------------------------------------------------------------------------

const styles: Record<string, CSSProperties> = {
  scrim: {
    position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.35)',
    zIndex: 9999, display: 'flex', justifyContent: 'flex-end',
  },
  drawer: {
    width: 'min(560px, 100vw)', height: '100%', background: colors.surface,
    boxShadow: '-12px 0 32px rgba(0,0,0,0.12)', overflowY: 'auto',
    fontFamily: 'inherit', display: 'flex', flexDirection: 'column',
  },
  header: {
    padding: '16px 20px', borderBottom: `1px solid ${colors.border}`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky', top: 0, background: colors.surface, zIndex: 1,
  },
  title: {
    fontSize: 16, fontWeight: 700, color: colors.textPrimary, margin: 0,
  },
  closeBtn: {
    background: 'none', border: 'none', fontSize: 22, lineHeight: 1, cursor: 'pointer',
    color: colors.textTertiary, padding: 4, fontFamily: 'inherit',
  },
  body: {
    padding: 20, display: 'flex', flexDirection: 'column', gap: 18, flex: 1,
  },
  section: {
    display: 'flex', flexDirection: 'column', gap: 8,
  },
  sectionTitle: {
    fontSize: 11, fontWeight: 600, color: colors.textTertiary,
    textTransform: 'uppercase' as const, letterSpacing: '0.04em',
  },
  pathRow: {
    fontFamily: 'monospace', fontSize: 12, color: colors.textPrimary,
    background: colors.surfaceInset, border: `1px solid ${colors.border}`,
    borderRadius: 6, padding: '8px 10px', wordBreak: 'break-all',
  },
  kvRow: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0',
    borderBottom: `1px solid ${colors.border}`,
  },
  kvLabel: {
    fontSize: 11, fontWeight: 600, color: colors.textTertiary, minWidth: 110,
    textTransform: 'uppercase' as const, letterSpacing: '0.03em',
  },
  kvValue: {
    fontSize: 13, color: colors.textSecondary, fontFamily: 'monospace', wordBreak: 'break-all',
  },
  // Timeline
  timeline: {
    display: 'flex', flexDirection: 'column', gap: 0, position: 'relative',
  },
  timelineRow: {
    display: 'flex', alignItems: 'flex-start', gap: 12, position: 'relative',
    padding: '6px 0',
  },
  timelineDot: {
    width: 12, height: 12, borderRadius: '50%', flexShrink: 0, marginTop: 4,
    border: `2px solid ${colors.border}`, background: colors.surface,
  },
  timelineLine: {
    position: 'absolute', left: 5, top: 18, bottom: -6, width: 2,
    background: colors.border,
  },
  timelineLabel: {
    fontSize: 13, fontWeight: 500, color: colors.textPrimary,
  },
  timelineMeta: {
    fontSize: 11, color: colors.textTertiary, marginTop: 1,
  },
  // Confidence bar
  confidenceWrap: {
    display: 'flex', alignItems: 'center', gap: 10,
  },
  confidenceTrack: {
    flex: 1, height: 8, background: colors.surfaceInset,
    borderRadius: 4, overflow: 'hidden', border: `1px solid ${colors.border}`,
  },
  confidenceFill: {
    height: '100%', background: colors.state.completed, transition: 'width 200ms ease',
  },
  confidenceLabel: {
    fontFamily: 'monospace', fontSize: 12, color: colors.textSecondary, minWidth: 48, textAlign: 'right' as const,
  },
  // Error block
  errorBlock: {
    background: '#fef2f2', border: `1px solid ${colors.state.failed}`,
    color: colors.state.failed, borderRadius: 6, padding: 10, fontSize: 12,
    fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
  },
  // Footer / actions
  footer: {
    padding: 16, borderTop: `1px solid ${colors.border}`,
    display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap',
    background: colors.surface, position: 'sticky', bottom: 0,
  },
  btn: {
    padding: '6px 14px', fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
    borderRadius: 6, cursor: 'pointer',
    background: colors.surface, border: `1px solid ${colors.border}`, color: colors.textSecondary,
  },
  btnPrimary: {
    padding: '6px 14px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
    borderRadius: 6, cursor: 'pointer',
    background: colors.primary, border: 'none', color: '#fff',
  },
  btnDanger: {
    padding: '6px 14px', fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
    borderRadius: 6, cursor: 'pointer',
    background: '#fef2f2', border: `1px solid ${colors.state.failed}`, color: colors.state.failed,
  },
  btnDisabled: {
    opacity: 0.5, cursor: 'not-allowed',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

function methodDescription(method: IngestMappingMethod): string {
  switch (method) {
    case 'rule':         return 'Matched a configured rule';
    case 'llm-match':    return 'LLM matched to existing DocType';
    case 'llm-generate': return 'LLM proposed a new DocType';
    default:             return method;
  }
}

// Timeline reaches the current step. Failed items terminate at whatever
// step they were in when they failed — we surface that with a red dot.
function stepReached(step: IngestItemStatus, status: IngestItemStatus): boolean {
  if (status === 'failed') {
    // Best-effort: assume failure happens at or after `mapping`; the API
    // doesn't currently emit fine-grained failure-step today. Show the
    // first step (queued) as reached and the rest as not.
    return step === 'queued';
  }
  const order = TIMELINE_STEPS;
  return order.indexOf(step) <= order.indexOf(status);
}

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  return `${Math.floor(d / 86_400_000)}d ago`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function IngestItemDrawer({ item, sourceName, onClose, onRetry, onSkip }: IngestItemDrawerProps) {
  const { idToken } = useIdentityContext();
  const [busy, setBusy] = useState<'retry' | 'skip' | 'remap' | null>(null);
  const [remapError, setRemapError] = useState<string | null>(null);
  const { events: progressEvents } = useIngestProgress();

  // Esc to close
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  /**
   * Per-step transition timestamps for THIS item. Walks the rolling
   * `useIngestProgress` event buffer, picks events whose `ingestId` matches
   * the item, and records the latest timestamp for each status
   * (`item.status` events) plus terminal-class events (`item.materialized`,
   * `item.failed`). Used to decorate the timeline rows with the wall-clock
   * time the transition fired, not just the row's `updatedAt`.
   *
   * Note on id key: the backend `IngestEvent` payloads carry `ingestId`,
   * while the frontend `IngestItem` type uses `itemId`. We compare against
   * `item.itemId` here because that's what the page hands the drawer; the
   * gateway bridge is expected to forward the backend `ingestId` field
   * verbatim into events but the IngestItem itself is reshaped on read.
   */
  const stepTimestamps = useMemo(() => {
    if (!item) return new Map<string, string>();
    const out = new Map<string, string>();
    for (const ev of progressEvents) {
      if (ev.ingestId !== item.itemId) continue;
      if (ev.type === 'item.status' && typeof ev.status === 'string' && typeof ev.timestamp === 'string') {
        out.set(ev.status, ev.timestamp);
      }
      if (ev.type === 'item.materialized' && typeof ev.timestamp === 'string') {
        out.set('done', ev.timestamp);
      }
      if (ev.type === 'item.failed' && typeof ev.timestamp === 'string') {
        out.set('failed', ev.timestamp);
      }
    }
    return out;
  }, [progressEvents, item]);

  if (!item) return null;

  const failed = item.status === 'failed';
  const isTerminal = item.status === 'done' || item.status === 'failed';
  const confidence = typeof item.mappingConfidence === 'number' ? item.mappingConfidence : null;

  const handleRetry = async () => {
    setBusy('retry');
    try { await onRetry(item.itemId); } finally { setBusy(null); onClose(); }
  };
  const handleSkip = async () => {
    setBusy('skip');
    try { await onSkip(item.itemId); } finally { setBusy(null); onClose(); }
  };
  const handleRemap = async () => {
    setBusy('remap');
    setRemapError(null);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (idToken) headers['Authorization'] = `Bearer ${idToken}`;
      const res = await fetch(`${BASE_URL}/api/ingest/items/${item.itemId}/remap`, {
        method: 'POST',
        headers,
      });
      // Accept any 2xx — mapping engine reroutes the item back to 'mapping'.
      // We also accept 404 gracefully so this UI still works pre-Agent-E
      // landing the endpoint (operator just sees the error inline).
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onClose();
    } catch (err) {
      setRemapError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div
      style={styles.scrim}
      onClick={onClose}
      data-testid="ingest-item-drawer-scrim"
    >
      <div
        style={styles.drawer}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Ingest item details"
        data-testid="ingest-item-drawer"
      >
        {/* Header */}
        <div style={styles.header}>
          <h3 style={styles.title}>Ingest Item</h3>
          <button
            style={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
            data-testid="ingest-item-drawer-close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={styles.body}>
          {/* Path + status */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Source path</div>
            <div style={styles.pathRow}>{item.sourcePath}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
              <Chip tone={statusTone(item.status)} size="sm">{item.status}</Chip>
              {sourceName && (
                <span style={{ fontSize: 12, color: colors.textTertiary }}>
                  from <strong style={{ color: colors.textSecondary }}>{sourceName}</strong>
                </span>
              )}
              <span style={{ fontSize: 12, color: colors.textTertiary, marginLeft: 'auto' }}>
                Updated {relativeTime(item.updatedAt)}
              </span>
            </div>
          </div>

          {/* Status timeline */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Status timeline</div>
            <div style={styles.timeline}>
              {TIMELINE_STEPS.map((step, idx) => {
                const reached = stepReached(step, item.status);
                const isCurrent = step === item.status;
                const isFailedHere = failed && idx === 0; // see stepReached note
                const dotStyle: CSSProperties = {
                  ...styles.timelineDot,
                  ...(reached
                    ? {
                        background: isFailedHere ? colors.state.failed : colors.state.completed,
                        borderColor: isFailedHere ? colors.state.failed : colors.state.completed,
                      }
                    : {}),
                  ...(isCurrent && !isTerminal
                    ? { background: colors.state.running, borderColor: colors.state.running }
                    : {}),
                };
                return (
                  <div key={step} style={styles.timelineRow}>
                    {idx < TIMELINE_STEPS.length - 1 && (
                      <span style={styles.timelineLine} aria-hidden="true" />
                    )}
                    <span style={dotStyle} aria-hidden="true" />
                    <div>
                      <div style={styles.timelineLabel}>{step}</div>
                      {(() => {
                        const eventTs = stepTimestamps.get(step);
                        if (eventTs) {
                          return (
                            <div data-testid={`timeline-meta-${step}`} style={styles.timelineMeta}>
                              {relativeTime(eventTs)}
                            </div>
                          );
                        }
                        if (isCurrent) {
                          return (
                            <div data-testid={`timeline-meta-${step}`} style={styles.timelineMeta}>
                              {isTerminal ? relativeTime(item.updatedAt) : 'in progress'}
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                );
              })}
              {failed && (
                <div style={styles.timelineRow}>
                  <span style={{ ...styles.timelineDot, background: colors.state.failed, borderColor: colors.state.failed }} />
                  <div>
                    <div style={{ ...styles.timelineLabel, color: colors.state.failed }}>failed</div>
                    <div data-testid="timeline-meta-failed" style={styles.timelineMeta}>
                      {relativeTime(stepTimestamps.get('failed') ?? item.updatedAt)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mapping decision */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Mapping decision</div>
            {item.mappingMethod ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Chip tone={methodTone(item.mappingMethod)} size="sm">{item.mappingMethod}</Chip>
                  <span style={{ fontSize: 12, color: colors.textSecondary }}>
                    {methodDescription(item.mappingMethod)}
                  </span>
                </div>
                {confidence !== null && (
                  <div style={styles.confidenceWrap}>
                    <div style={styles.confidenceTrack}>
                      <div
                        style={{
                          ...styles.confidenceFill,
                          width: `${Math.round(confidence * 100)}%`,
                          background: confidence >= 0.7
                            ? colors.state.completed
                            : confidence >= 0.4
                              ? colors.state.awaiting
                              : colors.state.failed,
                        }}
                      />
                    </div>
                    <span style={styles.confidenceLabel}>{(confidence * 100).toFixed(0)}%</span>
                  </div>
                )}
              </>
            ) : (
              <span style={{ fontSize: 12, color: colors.textTertiary }}>
                No mapping decision yet — item is still in {item.status}.
              </span>
            )}
          </div>

          {/* Identity */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Identity</div>
            <div style={styles.kvRow}>
              <span style={styles.kvLabel}>Item ID</span>
              <span style={styles.kvValue}>{item.itemId}</span>
            </div>
            <div style={styles.kvRow}>
              <span style={styles.kvLabel}>Document Type</span>
              <span style={styles.kvValue}>{item.documentTypeId ?? '—'}</span>
            </div>
            <div style={styles.kvRow}>
              <span style={styles.kvLabel}>Document</span>
              <span style={styles.kvValue}>
                {item.documentId ? (
                  <a href={`/documents/${item.documentId}`} style={{ color: colors.primary }}>
                    {item.documentId}
                  </a>
                ) : '—'}
              </span>
            </div>
            <div style={{ ...styles.kvRow, borderBottom: 'none' }}>
              <span style={styles.kvLabel}>Pipeline Run</span>
              <span style={styles.kvValue}>{item.pipelineRunId ?? '—'}</span>
            </div>
          </div>

          {/* Error (if any) */}
          {item.error && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Error</div>
              <div style={styles.errorBlock}>{item.error}</div>
            </div>
          )}

          {/* Inline remap error */}
          {remapError && (
            <div style={styles.errorBlock}>Re-map failed: {remapError}</div>
          )}
        </div>

        {/* Footer actions */}
        <div style={styles.footer}>
          <button
            style={busy ? { ...styles.btn, ...styles.btnDisabled } : styles.btn}
            onClick={() => void handleRemap()}
            disabled={!!busy || item.status === 'done'}
            data-testid="item-remap-btn"
            title="Re-run the mapping engine for this item"
          >
            {busy === 'remap' ? 'Re-mapping…' : 'Re-map'}
          </button>
          <button
            style={busy || !failed ? { ...styles.btn, ...styles.btnDisabled } : styles.btnPrimary}
            onClick={() => void handleRetry()}
            disabled={!!busy || !failed}
            data-testid="item-retry-btn"
            title={failed ? 'Retry this item from the beginning' : 'Only failed items can be retried'}
          >
            {busy === 'retry' ? 'Retrying…' : 'Retry'}
          </button>
          <button
            style={busy || item.status === 'done' ? { ...styles.btn, ...styles.btnDisabled } : styles.btnDanger}
            onClick={() => void handleSkip()}
            disabled={!!busy || item.status === 'done'}
            data-testid="item-discard-btn"
            title="Skip / discard this item"
          >
            {busy === 'skip' ? 'Discarding…' : 'Discard'}
          </button>
        </div>
      </div>
    </div>
  );
}
