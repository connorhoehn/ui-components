// frontend/src/components/doc-editor/FollowModeBar.tsx
//
// "Following [name]" banner with stop button.
// Auto-unlocks follow mode on any user interaction (mousedown, keydown, wheel).

import { useEffect, useRef } from 'react';
import { useEventCallback } from '../../hooks/useEventCallback';
import type { Participant } from '../../types/document';
import { cn } from '../../lib/cn';
import { FollowBanner } from '../shared/FollowBanner';

export interface FollowModeBarProps {
  followingUserId: string | null;
  participants: Participant[];
  onStopFollow: () => void;
  /** The followed person's section title — rendered as ` · <location>`. */
  location?: string;
  /**
   * `banner` (default): the centred strip. `bar`: the in-call follow bar
   * ("**Following Alice** · Session flow" … "Stop following"), see FollowBanner.
   */
  appearance?: 'banner' | 'bar';
  className?: string;
  /** Default `follow-bar`; the stop button is `<id>-stop`. */
  'data-testid'?: string;
}

export default function FollowModeBar({
  followingUserId,
  participants,
  onStopFollow,
  location,
  appearance = 'banner',
  className,
  'data-testid': testId = 'follow-bar',
}: FollowModeBarProps) {
  const cleanupRef = useRef<(() => void) | null>(null);
  // Stable, so the deferred listener registration below is not restarted by
  // a parent re-render handing us a new `onStopFollow` arrow.
  const stopFollow = useEventCallback(onStopFollow);

  // Auto-unlock follow on local user interaction in the editor area
  // Delay listener registration to avoid the "Follow" click itself triggering it
  useEffect(() => {
    if (!followingUserId) return;
    const timerId = setTimeout(() => {
      const handler = () => stopFollow();
      const events: (keyof WindowEventMap)[] = ['mousedown', 'keydown', 'wheel'];
      for (const evt of events) {
        window.addEventListener(evt, handler, { once: true, passive: true });
      }
      cleanupRef.current = () => {
        for (const evt of events) {
          window.removeEventListener(evt, handler);
        }
      };
    }, 500);
    return () => {
      clearTimeout(timerId);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [followingUserId, stopFollow]);

  if (!followingUserId) return null;

  const followed = participants.find(
    (p) => (p.userId || p.clientId) === followingUserId,
  );
  if (!followed) return null;

  if (appearance === 'bar') {
    return (
      <FollowBanner
        name={followed.displayName}
        onStop={onStopFollow}
        autoStopOnInteract={false}
        appearance="bar"
        {...(location !== undefined ? { location } : {})}
        {...(className ? { className } : {})}
        data-testid={testId}
      />
    );
  }

  return (
    <div data-testid={testId} className={cn('flex items-center justify-center gap-2 px-4 py-1.5 bg-info-bg border-b border-info-border text-[13px] font-medium text-info-fg shrink-0', className)}>
      <span>
        Following {followed.displayName}
        {location ? <span className="font-normal"> · {location}</span> : null}
      </span>
      <button
        data-testid={`${testId}-stop`}
        onClick={onStopFollow}
        className={cn('bg-transparent border border-info-border rounded px-2 py-0.5 text-xs font-semibold text-info-fg cursor-pointer font-[inherit]')}
      >
        Stop
      </button>
    </div>
  );
}
