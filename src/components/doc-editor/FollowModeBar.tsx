// frontend/src/components/doc-editor/FollowModeBar.tsx
//
// "Following [name]" banner with stop button.
// Auto-unlocks follow mode on any user interaction (mousedown, keydown, wheel).

import type { RefObject } from 'react';
import type { Participant } from '../../types/document';
import { cn } from '../../lib/cn';
import { FollowBanner, useFollowAutoStop } from '../shared/FollowBanner';

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
  /** `false` turns the auto-unlock off (the host ends follow itself). Default true. 2.393.0. */
  autoStop?: boolean;
  /**
   * Listen on this element only (the editor), and only for scrolling or
   * typing — a click on the call dock, the toolbar or a side panel keeps
   * following. Unset: any mousedown/keydown/wheel in the window. 2.393.0.
   */
  autoStopScope?: RefObject<HTMLElement | null>;
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
  autoStop = true,
  autoStopScope,
  className,
  'data-testid': testId = 'follow-bar',
}: FollowModeBarProps) {
  useFollowAutoStop(Boolean(followingUserId), onStopFollow, { enabled: autoStop, scope: autoStopScope });

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
        data-ui-part=""
        data-testid={`${testId}-stop`}
        onClick={onStopFollow}
        className={cn('bg-transparent border border-info-border rounded px-2 py-0.5 text-xs font-semibold text-info-fg cursor-pointer font-[inherit]')}
      >
        Stop
      </button>
    </div>
  );
}
