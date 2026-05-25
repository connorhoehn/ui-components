import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type CallStartedBannerMode = 'started' | 'calling';

export interface CallStartedBannerProps {
  /** Display name of the user who started / is making the call. */
  callerName: string;
  /** Optional avatar URL — falls back to an initial-circle. */
  callerAvatarUrl?: string;
  /** Optional channel / room context shown under the caller name
   * (e.g. "in #general", "in this document"). */
  context?: string;
  /**
   * Copy framing:
   *   - 'started' (default) — "Name started a call". Use for broadcast /
   *     ambient hangouts where multiple people might be invited.
   *   - 'calling'           — "Name is calling you". Use for direct 1:1
   *     calls where the recipient is specifically targeted.
   */
  mode?: CallStartedBannerMode;
  /** Click handler for the "Join" action. */
  onJoin?: () => void;
  /** Click handler for the dismiss / decline action. Banner self-hides
   * via the autoExpireSec timeout if not provided. */
  onDismiss?: () => void;
  /** Auto-expire after this many seconds. Set to 0 to disable. Default 30. */
  autoExpireSec?: number;
  /** Escape hatches. */
  className?: string;
  style?: CSSProperties;
}

/**
 * Slack-Huddles-style "someone started a hangout" banner. Lightweight,
 * inline (not modal), low-friction: click "Join" to enter the call,
 * click dismiss to ignore. No system-level ringing.
 *
 * Pure presentational — the consumer mounts it (typically near the top of
 * the app shell or inside a notifications stack) and wires `onJoin` /
 * `onDismiss` to actual behavior (joining the lobby, declining the invite).
 *
 * Auto-dismisses after `autoExpireSec` seconds (default 30) to avoid
 * stale-banner spam if the call is over by the time the recipient looks.
 */
export function CallStartedBanner({
  callerName,
  callerAvatarUrl,
  context,
  mode = 'started',
  onJoin,
  onDismiss,
  autoExpireSec = 30,
  className,
  style,
}: CallStartedBannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoExpireSec || autoExpireSec <= 0) return;
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, autoExpireSec * 1000);
    return () => clearTimeout(t);
  }, [autoExpireSec, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="incoming-call-toast"
      data-call-mode={mode}
      data-caller-name={callerName}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg',
        'bg-[#1e293b] text-white border border-white/10',
        className,
      )}
      style={style}
    >
      <Avatar name={callerName} avatarUrl={callerAvatarUrl} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold m-0 truncate">
          {mode === 'calling' ? `${callerName} is calling you` : `${callerName} started a call`}
        </p>
        {context && <p className="text-xs text-white/60 m-0 truncate">{context}</p>}
      </div>

      <div className="flex items-center gap-2">
        {onDismiss && (
          <button
            type="button"
            onClick={() => { setVisible(false); onDismiss(); }}
            className="text-xs text-white/60 hover:text-white px-2 py-1 rounded"
            aria-label="Dismiss call invitation"
            data-testid="incoming-call-dismiss"
          >
            Dismiss
          </button>
        )}
        {onJoin && (
          <button
            type="button"
            onClick={() => { setVisible(false); onJoin(); }}
            className="text-xs font-semibold bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded"
            aria-label="Join call"
            data-testid="incoming-call-join"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
}

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  const hue = stringToHue(name);
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative"
      style={{ background: avatarUrl ? undefined : `hsl(${hue}, 55%, 45%)` }}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
      ) : (
        getInitials(name)
      )}
      {/* Pulse dot — signals "active call" */}
      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" />
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function stringToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}
