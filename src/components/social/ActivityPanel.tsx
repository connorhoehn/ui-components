// frontend/src/components/ActivityPanel.tsx
//
// Activity feed section card -- shows the user's recent social events.
// Hydrates from REST on mount, then subscribes to live WebSocket events
// and prepends them in real-time with dedup and a 50-item cap.
// Only ActivityPanel is exported.

import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '../shared/ToastProvider';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ActivityItem {
  eventType: string;
  timestamp: string;
  detail: Record<string, unknown>;
}

interface ActivityResponse {
  items: ActivityItem[];
  nextKey: string | null;
}

type ConnectionState = 'connected' | 'connecting' | 'disconnected';
type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

interface GatewayMessage {
  type: string;
  channel?: string;
  payload?: unknown;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

function getBaseUrl(): string {
  return (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
}

const MAX_ITEMS = 50;

// ---------------------------------------------------------------------------
// Event type display mapping
// ---------------------------------------------------------------------------

function formatActivity(item: ActivityItem): { icon: string; text: string } {
  const d = item.detail;
  switch (item.eventType) {
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
      return { icon: 'ℹ️', text: item.eventType };
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
// extractUserId helper
// ---------------------------------------------------------------------------

function extractUserId(idToken: string | null): string | null {
  if (!idToken) return null;
  try {
    return (JSON.parse(atob(idToken.split('.')[1])) as { sub: string }).sub;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// useActivityFeed hook
// ---------------------------------------------------------------------------

function useActivityFeed({
  idToken,
  sendMessage,
  onMessage,
  connectionState,
}: {
  idToken: string | null;
  sendMessage: (msg: Record<string, unknown>) => void;
  onMessage: OnMessageFn;
  connectionState: ConnectionState;
}): {
  items: ActivityItem[];
  loading: boolean;
  isLive: boolean;
  error: string | null;
  retry: () => void;
} {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const sendMessageRef = useRef(sendMessage);
  useEffect(() => { sendMessageRef.current = sendMessage; }, [sendMessage]);
  const { toast } = useToast();

  const userId = extractUserId(idToken);

  const retry = useCallback(() => setReloadKey(k => k + 1), []);

  // 1. Hydrate from REST on mount
  useEffect(() => {
    const baseUrl = getBaseUrl();
    if (!idToken || !baseUrl) return;
    let cancelled = false;
    // Set loading synchronously before the async fetch — this is intentional
    // to show a loading indicator immediately on mount/token change.
    setLoading(true); // eslint-disable-line react-hooks/set-state-in-effect
    setError(null); // eslint-disable-line react-hooks/set-state-in-effect
    fetch(`${baseUrl}/api/activity?limit=20`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((data: ActivityResponse) => {
        if (!cancelled && data?.items) {
          setItems(data.items);
          setError(null);
        }
      })
      .catch(err => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        console.error('[activity] fetch failed:', err);
        setError(msg);
        toast("Couldn't load activity feed", { type: 'error' });
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [idToken, reloadKey, toast]);

  // 2. Subscribe to WebSocket channel when connected
  useEffect(() => {
    if (connectionState !== 'connected' || !userId) {
      setIsLive(false); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }
    const channelId = `activity:${userId}`;
    sendMessageRef.current({ service: 'activity', action: 'subscribe', channelId });
    setIsLive(true);
    return () => {
      sendMessageRef.current({ service: 'activity', action: 'unsubscribe', channelId });
      setIsLive(false);
    };
  }, [connectionState, userId]);

  // 3. Append live events with dedup
  useEffect(() => {
    const unregister = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'activity:event') return;
      const payload = msg.payload as { eventType: string; detail: Record<string, unknown>; timestamp: string } | undefined;
      if (!payload) return;
      setItems(prev => {
        // Dedup: skip if first item already has same timestamp+eventType
        if (prev.length > 0 && prev[0].timestamp === payload.timestamp && prev[0].eventType === payload.eventType) {
          return prev;
        }
        return [
          { eventType: payload.eventType, timestamp: payload.timestamp, detail: payload.detail },
          ...prev,
        ].slice(0, MAX_ITEMS);
      });
    });
    return unregister;
  }, [onMessage]);

  return { items, loading, isLive, error, retry };
}

// ---------------------------------------------------------------------------
// ActivityPanel (exported)
// ---------------------------------------------------------------------------

interface ActivityPanelProps {
  idToken: string | null;
  sendMessage: (msg: Record<string, unknown>) => void;
  onMessage: OnMessageFn;
  connectionState: ConnectionState;
}

export function ActivityPanel({ idToken, sendMessage, onMessage, connectionState }: ActivityPanelProps) {
  const { items, loading, isLive, error, retry } = useActivityFeed({ idToken, sendMessage, onMessage, connectionState });

  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3">
        Activity
        {isLive && (
          <span
            className="inline-block w-2 h-2 rounded-full bg-success ml-2 align-middle"
            title="Live"
          />
        )}
      </h2>
      {loading ? (
        <div className="flex items-center gap-2 p-4 justify-center text-text-secondary">
          <span className="inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" />
          Loading...
        </div>
      ) : error && items.length === 0 ? (
        <div
          role="alert"
          className="py-6 px-4 text-center text-danger-fg text-sm flex flex-col items-center gap-2"
        >
          <span>Couldn't load activity</span>
          <span className="text-text-secondary text-xs">{error}</span>
          <button
            type="button"
            onClick={retry}
            className="mt-1 px-3 py-1 text-xs font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="py-10 text-center text-text-tertiary text-sm">
          No activity yet
        </div>
      ) : (
        <div>
          {items.map((item, idx) => {
            const { icon, text } = formatActivity(item);
            return (
              <div
                key={idx}
                className={cn(
                  'flex flex-row items-center gap-2 py-2',
                  idx < items.length - 1 && 'border-b border-surface-hover',
                )}
              >
                <span className="w-6 shrink-0 text-center">{icon}</span>
                <span className="flex-1 text-sm text-text-primary">{text}</span>
                <span className="text-xs text-text-tertiary shrink-0">
                  {relativeTime(item.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
