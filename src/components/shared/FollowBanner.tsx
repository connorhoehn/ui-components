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

import { useEffect, type RefObject } from 'react';
import { cn } from '../../lib/cn';
import { useEventCallback } from '../../hooks/useEventCallback';
import { Button } from '../ui/Button';

/**
 * The follow lock's auto-unlock, shared by FollowBanner and FollowModeBar.
 *
 * Unscoped (the default, and the historical behaviour): the viewer's
 * mousedown / keydown / wheel ANYWHERE in the window ends follow. Scoped
 * (2.393.0): only scrolling (wheel, touchmove) or typing (keydown) INSIDE
 * `scope` ends it — a click on a call dock, a toolbar or a side panel does
 * not, because those are not the viewer taking the page back (SPEC §2.2 row
 * 13). Registration waits 500ms so the click that started following cannot
 * end it.
 */
export function useFollowAutoStop(
  active: boolean,
  onStop: () => void,
  { enabled = true, scope }: { enabled?: boolean; scope?: RefObject<HTMLElement | null> | undefined } = {},
): void {
  const stop = useEventCallback(onStop);
  useEffect(() => {
    if (!active || !enabled) return;
    let cleanup: (() => void) | null = null;
    const timer = setTimeout(() => {
      const target: HTMLElement | Window | null = scope ? scope.current : window;
      if (!target) return;
      const events = scope ? ['keydown', 'wheel', 'touchmove'] : ['mousedown', 'keydown', 'wheel'];
      const handler = () => stop();
      for (const evt of events) target.addEventListener(evt, handler, { once: true, passive: true });
      cleanup = () => {
        for (const evt of events) target.removeEventListener(evt, handler);
      };
    }, 500);
    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
  }, [active, enabled, scope, stop]);
}

export interface FollowBannerProps {
  /** Who is being followed. Null renders nothing. */
  name: string | null;
  onStop: () => void;
  /**
   * End follow on the viewer's own mousedown / keydown / wheel. Default on;
   * turn off only where the host routes those interactions itself.
   */
  autoStopOnInteract?: boolean;
  /** Same switch as `autoStopOnInteract` (2.393.0 name); `false` turns the auto-unlock off. */
  autoStop?: boolean;
  /**
   * Listen on this element only, and only for scrolling or typing — the
   * editor, typically — instead of every mousedown/keydown/wheel in the
   * window. Clicks elsewhere (a call dock, a toolbar) keep following. 2.393.0.
   */
  autoStopScope?: RefObject<HTMLElement | null>;
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
  autoStop,
  autoStopScope,
  location,
  appearance = 'banner',
  className,
  'data-testid': testId = 'follow-banner',
}: FollowBannerProps) {
  useFollowAutoStop(Boolean(name), onStop, {
    enabled: autoStop ?? autoStopOnInteract,
    scope: autoStopScope,
  });

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
