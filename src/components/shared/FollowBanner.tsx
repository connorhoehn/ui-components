// FollowBanner — "Following <name>", and the way out.
//
// Follow mode is a lock: the surface scrolls itself to wherever someone else
// is working. A lock needs two exits, and the second is the important one —
// the explicit Stop button is for people who read banners, and the
// auto-unlock on any local interaction (mouse down, key, wheel) is for
// everyone else, because the natural reaction to a page moving on its own is
// to grab it, and grabbing it should win.
//
// Listener registration is delayed so the click that STARTED following does
// not immediately end it, and the listeners are `once` — after the unlock
// fires there is nothing left to leak.

import { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

export interface FollowBannerProps {
  /** Who is being followed. Null renders nothing. */
  name: string | null;
  onStop: () => void;
  /**
   * End follow on the viewer's own mousedown / keydown / wheel. Default on;
   * turn off only where the host routes those interactions itself.
   */
  autoStopOnInteract?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function FollowBanner({
  name,
  onStop,
  autoStopOnInteract = true,
  className,
  'data-testid': testId = 'follow-banner',
}: FollowBannerProps) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!name || !autoStopOnInteract) return;
    const timer = setTimeout(() => {
      const handler = () => onStop();
      const events: (keyof WindowEventMap)[] = ['mousedown', 'keydown', 'wheel'];
      for (const evt of events) window.addEventListener(evt, handler, { once: true, passive: true });
      cleanupRef.current = () => {
        for (const evt of events) window.removeEventListener(evt, handler);
      };
    }, 500);
    return () => {
      clearTimeout(timer);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [name, autoStopOnInteract, onStop]);

  if (!name) return null;

  return (
    <div
      data-testid={testId}
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-1.5 shrink-0',
        'bg-info-bg border-b border-info-border text-info-fg text-[12.5px] font-medium',
        className,
      )}
    >
      <span>Following {name}</span>
      <button
        type="button"
        onClick={onStop}
        className="text-[11.5px] font-semibold px-2 py-0.5 rounded border border-info-border bg-transparent text-info-fg cursor-pointer"
      >
        Stop
      </button>
    </div>
  );
}

export default FollowBanner;
