// frontend/src/components/ActivityPanel.tsx
//
// Activity feed section card -- shows the user's recent social events.
// Hydrates from REST on mount, then subscribes to live WebSocket events
// and prepends them in real-time with dedup and a 50-item cap.
// Only ActivityPanel is exported.

import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '../shared/ToastProvider';
import { cn } from '../../lib/cn';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Inline, Stack } from '../ui/Stack';
import LoadingState from '../shared/LoadingState';
import ErrorState from '../shared/ErrorState';
import EmptyState from '../shared/EmptyState';
import { StatusDot } from '../shared/StatusDot';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ActivityItem {
  eventType: string;
  timestamp: string;
  detail: Record<string, unknown>;
}

export interface ActivityResponse {
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

// `import.meta.env.VITE_*` is STATICALLY REPLACED at build time — and the
// build that matters is THIS library's, not the consumer's. So whatever the
// host sets in its own .env never reaches here: the published bundle carries
// the literal the library was built with, which is `''`, which made the guard
// below take the "nothing to hydrate from" branch for every consumer and
// silently render an empty feed forever. That is why `baseUrl` (and
// `fetchActivity`, for a host whose activity lives behind its own client)
// exist, and why they take precedence over this.
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
  baseUrl: baseUrlProp,
  fetchActivity,
  onError,
}: {
  idToken: string | null;
  sendMessage: (msg: Record<string, unknown>) => void;
  onMessage: OnMessageFn;
  connectionState: ConnectionState;
  baseUrl?: string;
  fetchActivity?: FetchActivityFn;
  onError?: (err: Error) => void;
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
  const onErrorRef = useRef(onError);
  useEffect(() => { onErrorRef.current = onError; }, [onError]);

  const userId = extractUserId(idToken);

  const retry = useCallback(() => setReloadKey(k => k + 1), []);

  // 1. Hydrate from REST on mount
  useEffect(() => {
    if (fetchActivity) {
      let dropped = false;
      setLoading(true); // eslint-disable-line react-hooks/set-state-in-effect
      setError(null); // eslint-disable-line react-hooks/set-state-in-effect
      Promise.resolve(fetchActivity({ idToken, limit: 20 }))
        .then((data) => {
          if (dropped) return;
          setItems(data?.items ?? []);
          setError(null);
        })
        .catch((err) => {
          if (dropped) return;
          const normalized = err instanceof Error ? err : new Error(String(err));
          console.error('[activity] fetch failed:', err);
          setError(normalized.message);
          toast("Couldn't load activity feed", { type: 'error' });
          onErrorRef.current?.(normalized);
        })
        .finally(() => { if (!dropped) setLoading(false); });
      return () => { dropped = true; };
    }
    const resolvedBase = baseUrlProp ?? getBaseUrl();
    if (!idToken || !resolvedBase) {
      // Nothing to hydrate from — resolve to the empty state instead of
      // leaving the spinner up forever. `loading` starts true so a real
      // fetch shows the spinner immediately; without this branch an
      // unset VITE_SOCIAL_API_URL (the default — there is no .env) or a
      // signed-out user spins indefinitely with no way out.
      setLoading(false); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }
    let cancelled = false;
    // Set loading synchronously before the async fetch — this is intentional
    // to show a loading indicator immediately on mount/token change.
    setLoading(true); // eslint-disable-line react-hooks/set-state-in-effect
    setError(null); // eslint-disable-line react-hooks/set-state-in-effect
    fetch(`${resolvedBase}/api/activity?limit=20`, {
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
        const normalized = err instanceof Error ? err : new Error(String(err));
        console.error('[activity] fetch failed:', err);
        setError(normalized.message);
        toast("Couldn't load activity feed", { type: 'error' });
        onErrorRef.current?.(normalized);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [idToken, reloadKey, toast, baseUrlProp, fetchActivity]);

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

export interface ActivityPanelProps {
  idToken: string | null;
  sendMessage: (msg: Record<string, unknown>) => void;
  onMessage: OnMessageFn;
  connectionState: ConnectionState;
  /**
   * Origin for `GET /api/activity`. Wins over the build-time
   * `VITE_SOCIAL_API_URL`, which a consumer cannot influence — see the note
   * on `getBaseUrl` above. Pass the same origin the host's other REST calls
   * use; `''` is a same-origin request.
   */
  baseUrl?: string;
  /**
   * Full replacement for the REST hydration, for a host that already owns an
   * authorized client (signed requests, a proxy, a mock in tests). Wins over
   * `baseUrl`. The live WebSocket half is untouched either way.
   */
  fetchActivity?: FetchActivityFn;
  /**
   * Called with the normalized `Error` whenever a hydrate (REST or
   * `fetchActivity`) fails — in addition to, not instead of, the panel's own
   * inline `ErrorState` and toast. A host with its own error-reporting
   * (Sentry, a status bar) hooks in here instead of re-deriving failure from
   * the panel's render output.
   */
  onError?: (err: Error) => void;
}

/** Hydration seam — see `ActivityPanelProps.fetchActivity`. */
export type FetchActivityFn = (args: {
  idToken: string | null;
  limit: number;
}) => Promise<ActivityResponse>;

export function ActivityPanel({
  idToken,
  sendMessage,
  onMessage,
  connectionState,
  baseUrl,
  fetchActivity,
  onError,
}: ActivityPanelProps) {
  const { items, loading, isLive, error, retry } = useActivityFeed({
    idToken, sendMessage, onMessage, connectionState, baseUrl, fetchActivity, onError,
  });

  return (
    <Card padding="md">
      <Inline gap="sm" align="center" className="mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-secondary m-0">
          Activity
        </h2>
        {isLive && <StatusDot color="var(--color-success)" size="xs" title="Live" aria-label="Live" />}
      </Inline>
      {loading ? (
        <LoadingState label="Loading..." />
      ) : error && items.length === 0 ? (
        <ErrorState
          title="Couldn't load activity"
          body={error}
          action={<Button variant="secondary" size="sm" onClick={retry}>Retry</Button>}
        />
      ) : items.length === 0 ? (
        <EmptyState title="No activity yet" />
      ) : (
        <Stack gap="none">
          {items.map((item, idx) => {
            const { icon, text } = formatActivity(item);
            return (
              <Inline
                key={idx}
                gap="sm"
                align="center"
                className={cn(
                  'py-2',
                  idx < items.length - 1 && 'border-b border-surface-hover',
                )}
              >
                <span className="w-6 shrink-0 text-center">{icon}</span>
                <span className="flex-1 text-sm text-text-primary">{text}</span>
                <span className="text-xs text-text-tertiary shrink-0">
                  {relativeTime(item.timestamp)}
                </span>
              </Inline>
            );
          })}
        </Stack>
      )}
    </Card>
  );
}
