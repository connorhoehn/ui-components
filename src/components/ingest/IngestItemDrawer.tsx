// frontend/src/components/ingest/IngestItemDrawer.tsx
//
// Right-side drawer that opens when the operator clicks an ingest item.
// Shows the status timeline, the mapping decision, and operator actions.

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import { cn } from '../../lib/cn';
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

function stepReached(step: IngestItemStatus, status: IngestItemStatus): boolean {
  if (status === 'failed') {
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
      className="fixed inset-0 bg-black/35 z-[9999] flex justify-end"
      onClick={onClose}
      data-testid="ingest-item-drawer-scrim"
    >
      <div
        className="w-[min(560px,100vw)] h-full bg-surface shadow-[-12px_0_32px_rgba(0,0,0,0.12)] overflow-y-auto font-[inherit] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Ingest item details"
        data-testid="ingest-item-drawer"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-[1]">
          <h3 className="text-base font-bold text-text-primary m-0">Ingest Item</h3>
          <button
            className="bg-transparent border-none text-[22px] leading-none cursor-pointer text-text-tertiary p-1 font-[inherit]"
            onClick={onClose}
            aria-label="Close"
            data-testid="ingest-item-drawer-close"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4.5 flex-1">
          {/* Path + status */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">Source path</div>
            <div className="font-mono text-xs text-text-primary bg-surface-inset border border-border rounded-md px-2.5 py-2 break-all">
              {item.sourcePath}
            </div>
            <div className="flex gap-2 items-center mt-1">
              <Chip tone={statusTone(item.status)} size="sm">{item.status}</Chip>
              {sourceName && (
                <span className="text-xs text-text-tertiary">
                  from <strong className="text-text-secondary">{sourceName}</strong>
                </span>
              )}
              <span className="text-xs text-text-tertiary ml-auto">
                Updated {relativeTime(item.updatedAt)}
              </span>
            </div>
          </div>

          {/* Status timeline */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">Status timeline</div>
            <div className="flex flex-col relative">
              {TIMELINE_STEPS.map((step, idx) => {
                const reached = stepReached(step, item.status);
                const isCurrent = step === item.status;
                const isFailedHere = failed && idx === 0;
                const dotStyle: CSSProperties = {
                  ...(reached
                    ? {
                        background: isFailedHere ? 'var(--color-state-failed)' : 'var(--color-state-completed)',
                        borderColor: isFailedHere ? 'var(--color-state-failed)' : 'var(--color-state-completed)',
                      }
                    : {}),
                  ...(isCurrent && !isTerminal
                    ? { background: 'var(--color-state-running)', borderColor: 'var(--color-state-running)' }
                    : {}),
                };
                return (
                  <div key={step} className="flex items-start gap-3 relative py-1.5">
                    {idx < TIMELINE_STEPS.length - 1 && (
                      <span className="absolute left-[5px] top-[18px] bottom-[-6px] w-0.5 bg-border" aria-hidden="true" />
                    )}
                    <span
                      className="w-3 h-3 rounded-full shrink-0 mt-1 border-2 border-border bg-surface"
                      style={dotStyle}
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-[13px] font-medium text-text-primary">{step}</div>
                      {(() => {
                        const eventTs = stepTimestamps.get(step);
                        if (eventTs) {
                          return (
                            <div data-testid={`timeline-meta-${step}`} className="text-[11px] text-text-tertiary mt-0.5">
                              {relativeTime(eventTs)}
                            </div>
                          );
                        }
                        if (isCurrent) {
                          return (
                            <div data-testid={`timeline-meta-${step}`} className="text-[11px] text-text-tertiary mt-0.5">
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
                <div className="flex items-start gap-3 relative py-1.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 mt-1 border-2 bg-state-failed border-state-failed"
                  />
                  <div>
                    <div className="text-[13px] font-medium text-[var(--color-state-failed)]">failed</div>
                    <div data-testid="timeline-meta-failed" className="text-[11px] text-text-tertiary mt-0.5">
                      {relativeTime(stepTimestamps.get('failed') ?? item.updatedAt)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mapping decision */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">Mapping decision</div>
            {item.mappingMethod ? (
              <>
                <div className="flex items-center gap-2">
                  <Chip tone={methodTone(item.mappingMethod)} size="sm">{item.mappingMethod}</Chip>
                  <span className="text-xs text-text-secondary">
                    {methodDescription(item.mappingMethod)}
                  </span>
                </div>
                {confidence !== null && (
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-2 bg-surface-inset rounded overflow-hidden border border-border">
                      <div
                        className="h-full transition-[width] duration-200 ease-out"
                        style={{
                          width: `${Math.round(confidence * 100)}%`,
                          background: confidence >= 0.7
                            ? 'var(--color-state-completed)'
                            : confidence >= 0.4
                              ? 'var(--color-state-awaiting)'
                              : 'var(--color-state-failed)',
                        }}
                      />
                    </div>
                    <span className="font-mono text-xs text-text-secondary min-w-[48px] text-right">{(confidence * 100).toFixed(0)}%</span>
                  </div>
                )}
              </>
            ) : (
              <span className="text-xs text-text-tertiary">
                No mapping decision yet &mdash; item is still in {item.status}.
              </span>
            )}
          </div>

          {/* Identity */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">Identity</div>
            <div className="flex items-center gap-3 py-1.5 border-b border-border">
              <span className="text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight">Item ID</span>
              <span className="text-[13px] text-text-secondary font-mono break-all">{item.itemId}</span>
            </div>
            <div className="flex items-center gap-3 py-1.5 border-b border-border">
              <span className="text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight">Document Type</span>
              <span className="text-[13px] text-text-secondary font-mono break-all">{item.documentTypeId ?? '—'}</span>
            </div>
            <div className="flex items-center gap-3 py-1.5 border-b border-border">
              <span className="text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight">Document</span>
              <span className="text-[13px] text-text-secondary font-mono break-all">
                {item.documentId ? (
                  <a href={`/documents/${item.documentId}`} className="text-primary">
                    {item.documentId}
                  </a>
                ) : '—'}
              </span>
            </div>
            <div className="flex items-center gap-3 py-1.5">
              <span className="text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight">Pipeline Run</span>
              <span className="text-[13px] text-text-secondary font-mono break-all">{item.pipelineRunId ?? '—'}</span>
            </div>
          </div>

          {/* Error (if any) */}
          {item.error && (
            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">Error</div>
              <div className="bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words">
                {item.error}
              </div>
            </div>
          )}

          {/* Inline remap error */}
          {remapError && (
            <div className="bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words">
              Re-map failed: {remapError}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-4 py-4 border-t border-border flex gap-2 justify-end flex-wrap bg-surface sticky bottom-0">
          <button
            className={cn(
              'px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-surface border border-border text-text-secondary',
              (busy || item.status === 'done') && 'opacity-50 cursor-not-allowed',
            )}
            onClick={() => void handleRemap()}
            disabled={!!busy || item.status === 'done'}
            data-testid="item-remap-btn"
            title="Re-run the mapping engine for this item"
          >
            {busy === 'remap' ? 'Re-mapping…' : 'Re-map'}
          </button>
          <button
            className={cn(
              'px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] rounded-md cursor-pointer',
              busy || !failed
                ? 'bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed'
                : 'bg-primary border-none text-white',
            )}
            onClick={() => void handleRetry()}
            disabled={!!busy || !failed}
            data-testid="item-retry-btn"
            title={failed ? 'Retry this item from the beginning' : 'Only failed items can be retried'}
          >
            {busy === 'retry' ? 'Retrying…' : 'Retry'}
          </button>
          <button
            className={cn(
              'px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer',
              busy || item.status === 'done'
                ? 'bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed'
                : 'bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]',
            )}
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
