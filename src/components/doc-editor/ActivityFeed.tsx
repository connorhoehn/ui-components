// frontend/src/components/doc-editor/ActivityFeed.tsx
//
// Live activity feed showing who did what in the document editor.
// Consumes ActivityEvent[] from useActivityBus and renders doc/social events.

import { useState } from 'react';
import type { Participant } from '../../types/document';
import type { ActivityEvent } from '../../hooks/useActivityBus';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ActivityFeedProps {
  events: ActivityEvent[];
  participants: Participant[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map event types to display icons */
function eventIcon(eventType: string): string {
  if (eventType === 'doc.ack') return '✅';
  if (eventType === 'doc.reject') return '❌';
  if (eventType === 'doc.add_item') return '➕';
  if (eventType === 'doc.add_section') return '➕';
  if (eventType === 'doc.edit_section') return '✏️';
  if (eventType === 'doc.remove_item') return '➖';
  if (eventType === 'doc.comment') return '\u{1F4AC}';
  if (eventType.endsWith('.join')) return '\u{1F7E2}';
  if (eventType.endsWith('.leave')) return '\u{1F534}';
  if (eventType.startsWith('social.')) return '\u{1F4AC}';
  if (eventType === 'pipeline.run.started') return '▶';
  if (eventType === 'pipeline.run.completed') return '✓';
  if (eventType === 'pipeline.run.failed') return '✕';
  if (eventType === 'pipeline.approval.requested') return '✋';
  return '•';
}

/** Map event type + detail to human-readable description */
function eventDescription(eventType: string, detail: Record<string, unknown>): string {
  const docCtx = detail.documentTitle ? ` in ${detail.documentTitle}` : '';
  switch (eventType) {
    case 'doc.ack':
      return `acknowledged "${(detail.itemText as string) || 'item'}"${docCtx}`;
    case 'doc.reject':
      return `rejected "${(detail.itemText as string) || 'item'}"${docCtx}`;
    case 'doc.add_item':
      return `added task in "${(detail.sectionTitle as string) || 'section'}"${docCtx}`;
    case 'doc.add_section':
      return `added new section${docCtx}`;
    case 'doc.edit_section':
      return `edited "${(detail.sectionTitle as string) || 'section'}"${docCtx}`;
    case 'doc.remove_item':
      return `removed "${(detail.itemText as string) || 'item'}"${docCtx}`;
    case 'doc.comment':
      return `commented: "${(detail.text as string) || '...'}"${docCtx}`;
    case 'pipeline.run.started': {
      const pid = (detail.pipelineId as string) ?? '';
      return pid ? `triggered pipeline ${pid}` : 'triggered a pipeline';
    }
    case 'pipeline.run.completed':
      return typeof detail.durationMs === 'number'
        ? `pipeline run completed in ${detail.durationMs}ms`
        : 'pipeline run completed';
    case 'pipeline.run.failed':
      return `pipeline run failed: ${(detail.error as string) ?? 'unknown error'}`;
    case 'pipeline.approval.requested':
      return 'approval requested';
    default:
      if (detail.description) return String(detail.description);
      return eventType;
  }
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0] ?? '').join('').toUpperCase().slice(0, 2);
}

function formatTime(ts: string): string {
  try {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  } catch {
    return '';
  }
}

function modeLabel(mode: Participant['mode']): string {
  switch (mode) {
    case 'editor': return 'editing';
    case 'reviewer': return 'reviewing';
    case 'reader': return 'reading';
    default: return 'online';
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ActivityFeed({ events, participants }: ActivityFeedProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn('bg-surface-panel border border-border rounded-lg overflow-hidden')}>
      <div
        className={cn('flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-[#334155] cursor-pointer select-none')}
        onClick={() => setCollapsed(v => !v)}
      >
        <span>Activity {events.length > 0 && `(${events.length})`}</span>
        <span className={cn('text-[11px] font-normal text-text-tertiary')}>
          {collapsed ? '▶' : '▼'}
        </span>
      </div>

      {!collapsed && (
        <>
          {/* Active participants bar */}
          {participants.length > 0 && (
            <div className={cn('flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap')}>
              <span className={cn('font-semibold')}>Active:</span>
              {participants.map(p => (
                <span key={p.clientId} className={cn('inline-flex items-center gap-1 bg-white border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-[#334155]')}>
                  <span className={cn('w-2 h-2 rounded-full shrink-0')} style={{ background: p.color }} />
                  {p.displayName} ({modeLabel(p.mode)})
                </span>
              ))}
            </div>
          )}

          {/* Feed entries */}
          <div className={cn('max-h-[260px] overflow-y-auto py-1')}>
            {events.length === 0 ? (
              <div className={cn('px-3 py-4 text-center text-text-tertiary text-xs')}>
                No activity yet. Actions like acknowledging tasks will appear here.
              </div>
            ) : (
              events.map(event => (
                <div key={event.id} className={cn('flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-[#f1f5f9]')}>
                  <div
                    className={cn('w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px')}
                    style={{ background: event.color || '#94a3b8' }}
                  >
                    {getInitials(event.displayName || 'Unknown')}
                  </div>
                  <div>
                    <span className={cn('font-semibold text-[#334155]')}>{event.displayName || 'Unknown'}</span>
                    {' '}
                    <span className={cn('text-neutral')}>
                      {eventIcon(event.eventType)} {eventDescription(event.eventType, event.detail)}
                    </span>
                  </div>
                  <span className={cn('text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0')}>{formatTime(event.timestamp)}</span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
