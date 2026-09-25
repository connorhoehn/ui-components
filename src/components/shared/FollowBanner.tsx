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
import { Button } from '../ui/Button';

export interface FollowBannerProps {
  /** Who is being followed. Null renders nothing. */
  name: string | null;
  onStop: () => void;
  /**
   * End follow on the viewer's own mousedown / keydown / wheel. Default on;
   * turn off only where the host routes those interactions itself.
   */
  autoStopOnInteract?: boolean;
  /**
   * Where the followed person is — a section title ("Session flow"). Rendered
   * after the name as ` · <location>` in the regular weight. Empty or unset
   * renders the name alone.
   */
  location?: string;
  /**
   * `banner` (default): the centred strip with a small "Stop" button.
   * `bar`: the in-call follow bar — a rounded row inside the page column,
   * "**Following Alice** · Session flow" on the left and a "Stop following"
   * button on the right.
   */
  appearance?: 'banner' | 'bar';
  className?: string;
  'data-testid'?: string;
}

export function FollowBanner({
  name,
  onStop,
  autoStopOnInteract = true,
  location,
  appearance = 'banner',
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

  if (appearance === 'bar') {
    return (
      <div
        data-testid={testId}
        data-appearance="bar"
        className={cn(
          'flex min-h-10 shrink-0 items-center gap-3 rounded-md border border-info-border bg-info-bg px-3.5 py-1',
          'text-sm text-text-primary',
          className,
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          <span className="font-semibold">Following {name}</span>
          {location ? <span className="text-text-secondary"> · {location}</span> : null}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onStop}
          data-testid={`${testId}-stop`}
          className="shrink-0 bg-surface font-medium"
        >
          Stop following
        </Button>
      </div>
    );
  }

  return (
    <div
      data-testid={testId}
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-1.5 shrink-0',
        'bg-info-bg border-b border-info-border text-info-fg text-[12.5px] font-medium',
        className,
      )}
    >
      <span>
        Following {name}
        {location ? <span className="font-normal"> · {location}</span> : null}
      </span>
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
