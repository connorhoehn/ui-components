// frontend/src/components/doc-editor/FollowModeBar.tsx
//
// "Following [name]" banner with stop button.
// Auto-unlocks follow mode on any user interaction (mousedown, keydown, wheel).

import { useEffect, useRef } from 'react';
import type { Participant } from '../../types/document';
import { cn } from '../../lib/cn';

interface FollowModeBarProps {
  followingUserId: string | null;
  participants: Participant[];
  onStopFollow: () => void;
}

export default function FollowModeBar({
  followingUserId,
  participants,
  onStopFollow,
}: FollowModeBarProps) {
  const cleanupRef = useRef<(() => void) | null>(null);

  // Auto-unlock follow on local user interaction in the editor area
  // Delay listener registration to avoid the "Follow" click itself triggering it
  useEffect(() => {
    if (!followingUserId) return;
    const timerId = setTimeout(() => {
      const handler = () => onStopFollow();
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
  }, [followingUserId, onStopFollow]);

  if (!followingUserId) return null;

  const followed = participants.find(
    (p) => (p.userId || p.clientId) === followingUserId,
  );
  if (!followed) return null;

  return (
    <div className={cn('flex items-center justify-center gap-2 px-4 py-1.5 bg-info-bg border-b border-info-border text-[13px] font-medium text-[#1d4ed8] shrink-0')}>
      <span>Following {followed.displayName}</span>
      <button
        onClick={onStopFollow}
        className={cn('bg-transparent border border-[#93c5fd] rounded px-2 py-0.5 text-xs font-semibold text-[#1d4ed8] cursor-pointer font-[inherit]')}
      >
        Stop
      </button>
    </div>
  );
}
