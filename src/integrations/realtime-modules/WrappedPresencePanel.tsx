// src/integrations/realtime-modules/WrappedPresencePanel.tsx
//
// PresencePanel wired directly to a usePresence() hook return from realtime-modules.
// Caller passes the `presence` hook result + their local clientId.

import { useMemo } from 'react';
import type { RMPresenceEntry, RMUsePresenceReturn } from './types';
import { PresencePanel } from '../../components/social/PresencePanel';
import type { PresenceUser } from '../../hooks/usePresence';
import { applyNetworkShim, type NetworkShimOptions } from './networkShim';

export interface WrappedPresencePanelProps {
  /** Return value of usePresence(channel) from realtime-modules */
  presence: RMUsePresenceReturn;
  /** The local user's clientId (from useGateway().clientId) */
  currentClientId: string | null;
  /**
   * Show one row per CONNECTION instead of one per person.
   *
   * The gateway keys presence by clientId — a per-WebSocket id — so a person
   * with three tabs is three rows and every reconnect mints another. Rendering
   * that raw is the "13 rows for 4 humans" bug, and it is the default this
   * component used to have. Turn it on only for a diagnostic view where the
   * sockets themselves are the subject.
   */
  perConnection?: boolean;
  /**
   * Opt-in: wrap the rendered PresencePanel in a NetworkErrorBoundary +
   * ReconnectingShim using the supplied connection state and retry
   * callback. Omit for no wrapping (default).
   */
  wrapWithNetworkShim?: NetworkShimOptions;
}

/** Higher = more alive. Unknown statuses sort just under `online`. */
const STATUS_RANK: Record<string, number> = {
  typing: 4,
  online: 3,
  away: 2,
  busy: 1,
  offline: 0,
};
function statusRank(status: string): number {
  return STATUS_RANK[status] ?? 2.5;
}

/**
 * Collapse per-session presence entries into ONE row per human.
 *
 * The surviving row is the most-alive session, EXCEPT that the viewer's own
 * connection always wins their row — `currentClientId` is what the panel
 * compares against to mark "(you)", and a person whose other tab happened to
 * be livelier would otherwise stop recognising themselves in their own roster.
 *
 * Metadata is merged across all of the person's sessions so a displayName or
 * avatarUrl published by one tab is never lost because a quieter tab won, and
 * `isTyping` is the OR: the person is typing if any of their tabs is.
 *
 * Sessions with no userId cannot be attributed to a human and stay keyed by
 * their connection.
 */
function collapseByUser(
  roster: RMPresenceEntry[],
  currentClientId: string | null,
): PresenceUser[] {
  const groups = new Map<string, RMPresenceEntry[]>();
  for (const entry of roster) {
    const userId = typeof entry.metadata?.userId === 'string' ? entry.metadata.userId : undefined;
    const key = userId ? `u:${userId}` : `c:${entry.clientId}`;
    const bucket = groups.get(key);
    if (bucket) bucket.push(entry);
    else groups.set(key, [entry]);
  }

  const out: PresenceUser[] = [];
  for (const bucket of groups.values()) {
    // Oldest → newest so the freshest metadata lands last and wins the spread.
    const ordered = [...bucket].sort((a, b) => a.lastHeartbeat - b.lastHeartbeat);
    const metadata: Record<string, unknown> = {};
    for (const s of ordered) {
      for (const [k, v] of Object.entries(s.metadata ?? {})) {
        if (v !== undefined && v !== null && v !== '') metadata[k] = v;
      }
    }
    metadata.isTyping = bucket.some((s) => s.metadata?.isTyping === true);

    const mine = bucket.find((s) => s.clientId === currentClientId);
    const winner =
      mine ??
      bucket.reduce((best, s) => {
        const byStatus = statusRank(s.status) - statusRank(best.status);
        if (byStatus !== 0) return byStatus > 0 ? s : best;
        return s.lastHeartbeat > best.lastHeartbeat ? s : best;
      });

    out.push({ clientId: winner.clientId, status: winner.status, metadata });
  }
  return out;
}

export function WrappedPresencePanel({
  presence,
  currentClientId,
  perConnection = false,
  wrapWithNetworkShim,
}: WrappedPresencePanelProps) {
  // PresencePanel expects PresenceUser[] from the local hooks/usePresence.ts
  // Shape: { clientId, status, metadata } — structurally what a
  // realtime-modules PresenceEntry already is, minus the transport fields.
  const users: PresenceUser[] = useMemo(
    () =>
      perConnection
        ? presence.roster.map((entry) => ({
            clientId: entry.clientId,
            status: entry.status,
            metadata: entry.metadata,
          }))
        : collapseByUser(presence.roster, currentClientId),
    [presence.roster, currentClientId, perConnection],
  );

  const panel = <PresencePanel users={users} currentClientId={currentClientId} />;

  return <>{applyNetworkShim(panel, wrapWithNetworkShim)}</>;
}
