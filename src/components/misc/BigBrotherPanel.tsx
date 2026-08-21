// frontend/src/components/BigBrotherPanel.tsx
//
// "Big Brother" monitoring dashboard panel — shows room stats, online users,
// and a real-time scrolling event feed for monitoring simulation runs.
// Wired as a switchable tab in AppLayout alongside existing panels.

import type { PresenceUser } from '../../hooks/usePresence';
import type { RoomItem } from '../../hooks/useRooms';
import type { ActivityEvent } from '../../hooks/useActivityBus';

export interface BigBrotherPanelProps {
  rooms: RoomItem[];
  presenceUsers: PresenceUser[];
  activityEvents: ActivityEvent[];
  activityIsLive: boolean;
}

// ---------------------------------------------------------------------------
// Event type display mapping
// ---------------------------------------------------------------------------

function formatActivity(event: ActivityEvent): { icon: string; text: string } {
  const d = event.detail;
  switch (event.eventType) {
    // Social events
    case 'social.room.join':
      return { icon: '🚪', text: `Joined room ${(d.roomId as string)?.slice(0, 8) ?? ''}` };
    case 'social.room.leave':
      return { icon: '🚪', text: `Left room ${(d.roomId as string)?.slice(0, 8) ?? ''}` };
    case 'social.follow':
      return { icon: '👥', text: `Followed @${(d.followeeId as string)?.slice(0, 8) ?? ''}` };
    case 'social.unfollow':
      return { icon: '👥', text: `Unfollowed @${(d.followeeId as string)?.slice(0, 8) ?? ''}` };
    case 'social.like':
      return { icon: '❤️', text: `Liked ${(d.contentId as string)?.slice(0, 8) ?? 'content'}` };
    case 'social.reaction':
      return { icon: (d.emoji as string) ?? '😀', text: `Reacted to ${(d.contentId as string)?.slice(0, 8) ?? 'content'}` };
    case 'social.post.created':
      return { icon: '📝', text: `Posted in room ${(d.roomId as string)?.slice(0, 8) ?? ''}` };
    case 'social.comment.created':
      return { icon: '💬', text: `Commented in room ${(d.roomId as string)?.slice(0, 8) ?? ''}` };
    // Document editor events
    case 'doc.ack':
      return { icon: '✅', text: `Acknowledged ${(d.itemText as string) ?? 'item'}` };
    case 'doc.reject':
      return { icon: '❌', text: `Rejected ${(d.itemText as string) ?? 'item'}` };
    case 'doc.add_item':
      return { icon: '➕', text: `Added task in ${(d.sectionTitle as string) ?? 'section'}` };
    case 'doc.add_section':
      return { icon: '📁', text: 'Added new section' };
    case 'doc.edit_section':
      return { icon: '✏️', text: 'Edited section' };
    // Pipeline run-lifecycle events (relayed via usePipelineActivityRelay)
    case 'pipeline.run.started': {
      const pid = (d.pipelineId as string) ?? '';
      return { icon: '▶', text: pid ? `Triggered pipeline ${pid}` : 'Triggered pipeline' };
    }
    case 'pipeline.run.completed':
      return {
        icon: '✓',
        text:
          typeof d.durationMs === 'number'
            ? `Pipeline run completed in ${d.durationMs}ms`
            : 'Pipeline run completed',
      };
    case 'pipeline.run.failed':
      return {
        icon: '✕',
        text: `Pipeline run failed: ${(d.error as string) ?? 'unknown error'}`,
      };
    case 'pipeline.approval.requested':
      return { icon: '✋', text: 'Approval requested' };
    default:
      return { icon: 'ℹ️', text: event.eventType };
  }
}

// ---------------------------------------------------------------------------
// Relative time helper
// ---------------------------------------------------------------------------

function relativeTime(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return ts.slice(0, 10);
}


// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BigBrotherPanel({
  rooms,
  presenceUsers,
  activityEvents,
  activityIsLive: isLive,
}: BigBrotherPanelProps) {

  return (
    <div className="flex flex-col gap-4">
      {/* Top stats bar */}
      <div className="flex gap-3">
        <div className="bg-surface-panel border border-border rounded-lg px-4 py-2 text-center flex-1">
          <div className="text-xl font-bold text-text-primary">
            <span className="inline-block w-2 h-2 rounded-full bg-success mr-1.5 align-middle" />
            {presenceUsers.length}
          </div>
          <div className="text-xs text-text-secondary uppercase">Online</div>
        </div>
        <div className="bg-surface-panel border border-border rounded-lg px-4 py-2 text-center flex-1">
          <div className="text-xl font-bold text-text-primary">{rooms.length}</div>
          <div className="text-xs text-text-secondary uppercase">Rooms</div>
        </div>
        <div className="bg-surface-panel border border-border rounded-lg px-4 py-2 text-center flex-1">
          <div className="text-xl font-bold text-text-primary">{activityEvents.length}</div>
          <div className="text-xs text-text-secondary uppercase">Events</div>
        </div>
      </div>

      {/* Split panel layout */}
      <div className="grid grid-cols-[280px_1fr] gap-4">
        {/* Left column -- Room Stats */}
        <div className="bg-surface border border-border rounded-lg p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-text-secondary m-0 mb-3">
            Rooms
            <span className="ml-2 text-[11px] font-semibold bg-border text-text-secondary rounded-[10px] px-2 py-px align-middle">
              {rooms.length}
            </span>
          </h2>
          {rooms.length === 0 ? (
            <div className="p-6 text-center text-text-tertiary text-sm">
              No rooms yet
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {rooms.map(room => (
                <div
                  key={room.roomId}
                  className="flex items-center justify-between py-1.5 border-b border-surface-hover"
                >
                  <div>
                    <span className="text-sm text-text-primary font-medium">
                      {room.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium px-1.5 py-px rounded bg-surface-hover text-text-secondary uppercase">
                      {room.type}
                    </span>
                    <span className="text-[11px] text-text-tertiary">
                      {room.createdAt?.slice(0, 10)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column -- Live Event Feed */}
        <div className="bg-surface border border-border rounded-lg p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-text-secondary m-0 mb-3">
            Live Events
            {isLive && (
              <span
                className="inline-block w-2 h-2 rounded-full bg-success ml-2 align-middle"
                title="Live"
              />
            )}
          </h2>
          {activityEvents.length === 0 ? (
            <div className="p-10 text-center text-text-tertiary text-sm">
              No events yet -- run a simulation to see activity here
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto">
              {activityEvents.map((event, idx) => {
                const { icon, text } = formatActivity(event);
                return (
                  <div
                    key={event.id}
                    className={`flex items-center gap-2 py-2 ${idx < activityEvents.length - 1 ? 'border-b border-surface-hover' : ''}`}
                  >
                    <span className="w-6 shrink-0 text-center">{icon}</span>
                    <span className="flex-1 text-sm text-text-primary">
                      {event.displayName && (
                        <span className="font-semibold mr-1" style={{ color: event.color ?? 'var(--color-primary)' }}>
                          {event.displayName}
                        </span>
                      )}
                      {text}
                    </span>
                    <span className="text-xs text-text-tertiary shrink-0">
                      {relativeTime(event.timestamp)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
