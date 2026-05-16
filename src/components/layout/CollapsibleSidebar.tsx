// frontend/src/components/CollapsibleSidebar.tsx
//
// Collapsible sidebar with connection controls, channel/presence, activity feed,
// and recent documents. Replaces the static PresencePanel + DisconnectReconnect
// sidebar in AppLayout.

import { useState, useMemo } from 'react';
import type { ActivityEvent } from '../../hooks/useActivityBus';
import type { DocumentInfo } from '../../hooks/useDocuments';
import { identityToColor, identityToInitials } from '../../utils/identity';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PresenceUser {
  clientId: string;
  metadata: Record<string, unknown>;
}

type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export interface PipelineSidebarEntry {
  id: string;
  name: string;
  status: 'draft' | 'published' | 'archived';
  updatedAt: string;
  icon?: string;
}

export interface CollapsibleSidebarProps {
  // Connection
  connectionState: ConnectionState;
  onDisconnect: () => void;
  onReconnect: () => void;
  onCollapse?: () => void;

  // Channels / presence
  presenceUsers: PresenceUser[];
  currentClientId: string;
  currentChannel: string;

  // Activity
  activityEvents: ActivityEvent[];
  userId: string;

  // Documents
  documents: DocumentInfo[];
  onOpenDocument: (id: string) => void;

  // Pipelines (optional)
  pipelines?: PipelineSidebarEntry[];
  onOpenPipeline?: (id: string) => void;
  onSeeAllPipelines?: () => void;

  // Docked video panel slot (rendered between Activity and Documents)
  videoSlot?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;
  if (diffMs < 0) return 'just now';
  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function eventIcon(eventType: string): string {
  if (eventType.includes('cursor')) return '◎';     // cursor
  if (eventType.includes('chat')) return '✉';       // envelope
  if (eventType.includes('reaction')) return '❤';   // heart
  if (eventType.includes('join')) return '→';        // arrow
  if (eventType.includes('leave')) return '←';       // arrow
  if (eventType.includes('doc') || eventType.includes('edit')) return '✎'; // pencil
  if (eventType.includes('mention')) return '@';
  if (eventType.includes('presence')) return '●';    // dot
  return '•'; // bullet
}

function eventDescription(event: ActivityEvent): string {
  const who = event.displayName ?? event.userId?.slice(0, 8) ?? 'Someone';
  const detail = event.detail;

  if (event.eventType.includes('chat')) {
    const text = typeof detail.text === 'string' ? detail.text : '';
    return `${who}: ${text}`;
  }
  if (event.eventType.includes('join')) return `${who} joined`;
  if (event.eventType.includes('leave')) return `${who} left`;
  if (event.eventType.includes('reaction')) {
    const emoji = typeof detail.emoji === 'string' ? detail.emoji : '';
    return `${who} reacted ${emoji}`;
  }
  if (event.eventType.includes('mention')) {
    const section = typeof detail.sectionTitle === 'string' ? detail.sectionTitle : '';
    return `${who} mentioned you${section ? ` in ${section}` : ''}`;
  }
  if (event.eventType.includes('edit') || event.eventType.includes('doc')) {
    const title = typeof detail.title === 'string' ? detail.title : '';
    return `${who} edited${title ? ` ${title}` : ''}`;
  }

  return `${who}: ${event.eventType}`;
}

function isMentionEvent(event: ActivityEvent, userId: string): boolean {
  if (event.eventType.includes('mention')) return true;
  const mentioned = event.detail.mentionedUsers;
  if (Array.isArray(mentioned) && mentioned.includes(userId)) return true;
  return false;
}

// ---------------------------------------------------------------------------
// CollapsibleSection
// ---------------------------------------------------------------------------

function CollapsibleSection({
  title,
  emoji,
  count,
  defaultExpanded = true,
  children,
}: {
  title: string;
  emoji?: string;
  count?: number;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div>
      <div
        className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#64748b] m-0 cursor-pointer flex items-center gap-1.5 select-none py-2"
        onClick={() => setExpanded(v => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(v => !v); } }}
      >
        <span
          className={cn(
            'inline-block transition-transform duration-200 ease-in-out text-[10px]',
            expanded ? 'rotate-90' : 'rotate-0',
          )}
        >
          {'▸'}
        </span>
        {emoji && <span className="text-xs">{emoji}</span>}
        <span>{title}</span>
        {typeof count === 'number' && count > 0 && (
          <span className="ml-1 text-[10px] font-semibold text-[#64748b] bg-border rounded-lg px-1.5 py-px tracking-normal normal-case">
            {count}
          </span>
        )}
      </div>
      <div
        className={cn(
          'overflow-hidden transition-[max-height] duration-[250ms] ease-in-out',
          expanded ? 'max-h-[600px]' : 'max-h-0',
        )}
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CollapsibleSidebar({
  connectionState,
  onDisconnect,
  onReconnect,
  onCollapse,
  presenceUsers,
  currentClientId,
  currentChannel,
  activityEvents,
  userId,
  documents,
  onOpenDocument,
  pipelines,
  onOpenPipeline,
  onSeeAllPipelines,
  videoSlot,
}: CollapsibleSidebarProps) {
  const isConnected = connectionState === 'connected';
  const recentEvents = useMemo(() => activityEvents.slice(0, 5), [activityEvents]);
  const recentDocs = useMemo(() => documents.slice(0, 5), [documents]);
  const pipelineList = pipelines ?? [];
  const visiblePipelines = useMemo(() => pipelineList.slice(0, 12), [pipelineList]);
  const showPipelinesSection = pipelines !== undefined;

  return (
    <div className="flex flex-col gap-0">

      {/* ---- Connection controls ---- */}
      <div className="pt-1 pb-2 flex items-center gap-2">
        <span
          className={cn(
            'w-2 h-2 rounded-full inline-block shrink-0',
            isConnected ? 'bg-[#22c55e]' : 'bg-[#ef4444]'
          )}
        />
        <span
          className={cn(
            'text-[13px] font-medium font-sans',
            isConnected ? 'text-[#16a34a]' : 'text-[#dc2626]'
          )}
        >
          {isConnected ? 'Connected' : connectionState === 'connecting' || connectionState === 'reconnecting' ? 'Connecting...' : 'Disconnected'}
        </span>
        <div className="ml-auto flex gap-1">
          {isConnected ? (
            <button
              onClick={onDisconnect}
              className="text-[11px] px-2 py-0.5 border border-border rounded bg-surface text-[#64748b] cursor-pointer font-sans"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={onReconnect}
              className="text-[11px] px-2 py-0.5 border border-[#3b82f6] rounded bg-info-bg text-[#2563eb] cursor-pointer font-sans"
            >
              Reconnect
            </button>
          )}
          {onCollapse && (
            <button
              onClick={onCollapse}
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
              className="w-[22px] h-[22px] border-none bg-transparent text-text-tertiary cursor-pointer text-sm leading-none p-0 flex items-center justify-center rounded"
            >{'✕'}</button>
          )}
        </div>
      </div>

      <hr className="border-t border-border m-0" />

      {/* ---- Channels ---- */}
      <CollapsibleSection title="Channels">
        <div className="pb-2">
          <div className="text-[13px] font-semibold text-text-primary font-mono mb-1.5">
            # {currentChannel}
          </div>
          <div className="flex flex-col gap-0.5">
            {presenceUsers.map(user => {
              const name = (user.metadata.displayName as string | undefined) ?? user.clientId.slice(0, 8);
              const isSelf = user.clientId === currentClientId;
              const color = identityToColor(
                (user.metadata.email as string | undefined) ?? user.clientId
              );
              const initials = identityToInitials(name);

              return (
                <div
                  key={user.clientId}
                  className={cn(
                    'flex items-center gap-2 py-[3px] text-[13px] font-sans',
                    isSelf ? 'text-text-primary' : 'text-text-secondary'
                  )}
                >
                  <span
                    className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ background: color }}
                  >
                    {initials}
                  </span>
                  <span className={isSelf ? 'font-semibold' : 'font-normal'}>
                    {name}{isSelf ? ' (you)' : ''}
                  </span>
                </div>
              );
            })}
            {presenceUsers.length === 0 && (
              <span className="text-xs text-text-tertiary italic">
                No users online
              </span>
            )}
          </div>
        </div>
      </CollapsibleSection>

      <hr className="border-t border-border m-0" />

      {/* ---- Activity ---- */}
      <CollapsibleSection title="Activity">
        <div className="flex flex-col gap-0.5 pb-1 relative">
          {/* Fade gradient overlay at bottom */}
          {recentEvents.length > 3 && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white pointer-events-none z-[1]" />
          )}
          {recentEvents.length === 0 && (
            <span className="text-xs text-text-tertiary italic">
              No recent activity
            </span>
          )}
          {recentEvents.map(event => {
            const isMention = isMentionEvent(event, userId);
            return (
              <div
                key={event.id}
                className={cn(
                  'flex items-start gap-1.5 px-1 py-[3px] rounded text-xs font-sans',
                  isMention
                    ? 'bg-[rgba(59,130,246,0.10)] [animation:mentionPulse_2s_ease-in-out_3,fadeSlideIn_0.3s_ease-out]'
                    : '[animation:fadeSlideIn_0.3s_ease-out]',
                )}
              >
                <span className="shrink-0 w-4 text-center text-text-tertiary">
                  {eventIcon(event.eventType)}
                </span>
                <span className="flex-1 text-[#374151] overflow-hidden text-ellipsis whitespace-nowrap">
                  {eventDescription(event)}
                </span>
                <span className="shrink-0 text-[10px] text-text-tertiary font-mono whitespace-nowrap">
                  {relativeTime(event.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      </CollapsibleSection>

      <hr className="border-t border-border m-0" />

      {/* ---- Documents ---- */}
      <CollapsibleSection title="Documents">
        <div className="flex flex-col gap-0.5 pb-2">
          {recentDocs.length === 0 && (
            <span className="text-xs text-text-tertiary italic">
              No documents
            </span>
          )}
          {recentDocs.map(doc => (
            <div
              key={doc.id}
              onClick={() => onOpenDocument(doc.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') onOpenDocument(doc.id); }}
              className="flex items-center justify-between px-1 py-1 rounded cursor-pointer text-xs text-[#374151] font-sans hover:bg-surface-hover"
            >
              <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                {doc.title}
              </span>
              <span className="shrink-0 text-[10px] text-text-tertiary font-mono ml-2">
                {relativeTime(doc.updatedAt ?? doc.createdAt)}
              </span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* ---- Pipelines ---- */}
      {showPipelinesSection && (
        <>
          <hr className="border-t border-border m-0" />
          <CollapsibleSection title="Pipelines" emoji={'\u{1F500}'} count={pipelineList.length}>
            <div className="flex flex-col gap-0.5 pb-2">
              {pipelineList.length === 0 && (
                <div className="flex items-center justify-between px-1 py-0.5 text-xs text-text-tertiary italic font-sans">
                  <span>No pipelines yet</span>
                  {onSeeAllPipelines && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={onSeeAllPipelines}
                      onKeyDown={e => { if (e.key === 'Enter') onSeeAllPipelines(); }}
                      className="text-[11px] text-[#2563eb] not-italic cursor-pointer ml-2"
                    >
                      + New
                    </span>
                  )}
                </div>
              )}
              {visiblePipelines.map(p => (
                <div
                  key={p.id}
                  onClick={() => onOpenPipeline?.(p.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') onOpenPipeline?.(p.id); }}
                  className="flex items-center justify-between px-1 py-1 rounded cursor-pointer text-xs text-[#374151] font-sans gap-1.5 min-w-0 hover:bg-surface-hover"
                >
                  <span className="shrink-0 text-xs w-4 text-center">
                    {p.icon ?? '\u{1F500}'}
                  </span>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                    {p.name}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[9px] font-semibold uppercase tracking-[0.4px] px-1.5 py-px rounded-lg font-sans',
                      p.status === 'published'
                        ? 'text-[#166534] bg-[#dcfce7]'
                        : 'text-[#92400e] bg-[#fef3c7]'
                    )}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
              {pipelineList.length > 12 && onSeeAllPipelines && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={onSeeAllPipelines}
                  onKeyDown={e => { if (e.key === 'Enter') onSeeAllPipelines(); }}
                  className="px-1 py-1 text-[11px] text-[#2563eb] cursor-pointer font-sans"
                >
                  See all pipelines {'→'}
                </div>
              )}
            </div>
          </CollapsibleSection>
        </>
      )}

      {/* ---- Docked Video (bottom) ---- */}
      {videoSlot && (
        <>
          <hr className="border-t border-border m-0" />
          <CollapsibleSection title="Video">
            {videoSlot}
          </CollapsibleSection>
        </>
      )}
    </div>
  );
}
