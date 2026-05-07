// frontend/src/components/PresencePanel.tsx
//
// Live user list panel — shows who is connected to the current channel,
// with colored avatar circles, initials, and typing indicators.

import type { PresenceUser } from '../../hooks/usePresence';
import { identityToColor, identityToInitials } from '../../utils/identity';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface PresencePanelProps {
  users: PresenceUser[];
  currentClientId: string | null;
}

export function PresencePanel({ users, currentClientId }: PresencePanelProps) {
  return (
    <div className="border border-border rounded p-3 font-mono">
      {/* Header */}
      <div className="text-[0.8rem] font-bold mb-2 text-text-primary">
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
            const color = identityToColor(
              (user.metadata.email as string | undefined) ?? user.clientId
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
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0"
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
