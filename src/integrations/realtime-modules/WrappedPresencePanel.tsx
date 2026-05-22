// src/integrations/realtime-modules/WrappedPresencePanel.tsx
//
// PresencePanel wired directly to a usePresence() hook return from realtime-modules.
// Caller passes the `presence` hook result + their local clientId.

import type { RMUsePresenceReturn } from './types';
import { PresencePanel } from '../../components/social/PresencePanel';
import type { PresenceUser } from '../../hooks/usePresence';

export interface WrappedPresencePanelProps {
  /** Return value of usePresence(channel) from realtime-modules */
  presence: RMUsePresenceReturn;
  /** The local user's clientId (from useGateway().clientId) */
  currentClientId: string | null;
}

export function WrappedPresencePanel({
  presence,
  currentClientId,
}: WrappedPresencePanelProps) {
  // PresencePanel expects PresenceUser[] from the local hooks/usePresence.ts
  // Shape: { clientId, status, metadata }
  // realtime-modules PresenceEntry has the same fields, so cast directly.
  const users: PresenceUser[] = presence.roster.map((entry) => ({
    clientId: entry.clientId,
    status: entry.status,
    metadata: entry.metadata,
  }));

  return <PresencePanel users={users} currentClientId={currentClientId} />;
}
