// frontend/src/components/PresencePanel.tsx
//
// Live user list panel — shows who is connected to the current channel,
// with colored avatar circles, initials, and typing indicators.

import type { PresenceUser } from '../../hooks/usePresence';
import { identityToColor, identityToInitials } from '../../utils/identity';
import { presenceColorKey } from './presenceIdentity';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface PresencePanelProps {
  users: PresenceUser[];
  currentClientId: string | null;
}

export function PresencePanel({ users, currentClientId }: PresencePanelProps) {
  return (
    // House font and type scale (2.515.12): the panel was monospace with a
    // 12.8px header and 8.8px initials; now the body font, a 12px header and
    // 11px initials (Avatar's step for a 20px circle).
    <div className="border border-border rounded p-3" data-testid="presence-panel">
      {/* Header */}
      <div className="text-xs font-bold mb-2 text-text-primary" data-testid="presence-panel-title">
        Users in channel ({users.length})
      </div>

      {/* User list */}
      {users.length === 0 ? (
        <div className="text-text-tertiary text-xs">
          No other users connected
        </div>
      ) : (
        <div>
          {users.map((user) => {
            // Hash the colour off the stable human id, never the per-WS
            // clientId: one person with three tabs is three clientIds, and
            // hashing those gave that one person three avatar colours in the
            // same roster (UX audit 2026-08-25, "one human, five colours").
            // `metadata.email` is absent on most rosters, so the old
            // `email ?? clientId` was the clientId branch in practice.
            const color = identityToColor(
              presenceColorKey(
                (user.metadata.userId as string | undefined) ??
                  (user.metadata.email as string | undefined),
                user.metadata.displayName as string | undefined,
                user.clientId,
              )
            );
            const initials = identityToInitials(
              (user.metadata.displayName as string | undefined) ?? user.clientId.slice(0, 2)
            );
            const isTyping = user.metadata.isTyping === true;
            const isYou = user.clientId === currentClientId;
            const displayLabel =
              (user.metadata.displayName as string | undefined) ??
              (user.clientId.length > 12
                ? user.clientId.slice(0, 12) + '...'
                : user.clientId);

            return (
              <div
                key={user.clientId}
                className="flex items-center gap-2 py-1 text-xs"
              >
                {/* Colored avatar circle */}
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] leading-none font-bold text-white shrink-0"
                  data-ui-text="avatar"
                  style={{ backgroundColor: color }}
                >
                  {initials}
                </div>

                {/* Display name (or truncated clientId fallback) */}
                <span className="text-text-primary">{displayLabel}</span>

                {/* "You" label */}
                {isYou && (
                  <span className="text-text-tertiary">(you)</span>
                )}

                {/* Typing indicator */}
                {isTyping && (
                  <span className="text-text-tertiary italic">
                    typing...
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
