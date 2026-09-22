// src/components/ui/InlinePanel.tsx
//
// A sidebar-filling counterpart to Panel's outer chrome: fills its parent's
// box in normal flow (no portal, no fixed width, no `position: fixed` /
// drop-shadow floating chrome), for hosts that already reserve a sidebar
// slot — a flex column sized by the host's own layout, a CSS grid cell —
// and just need Panel's surface treatment inside it.
//
// This is a separate file, not a `variant` on `Panel`, because `Panel`'s
// `variant` prop already means "light vs dark chrome colour". Overloading
// it to also switch "portal + fixed width" vs "inline + fills parent" would
// make both meanings surprising from the call site. `Panel` stays
// byte-identical; pair this with the existing `PanelHeader` / `PanelBody`
// from `./Panel` — neither is portal- or width-bound, so both drop in here
// unchanged.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface InlinePanelProps {
  children: ReactNode;
  /** Chrome colour — same meaning as `Panel`'s `variant`. Default 'light'. */
  variant?: 'light' | 'dark';
  className?: string;
  'data-testid'?: string;
}

export function InlinePanel({
  children,
  variant = 'light',
  className,
  'data-testid': testId = 'inline-panel',
}: InlinePanelProps) {
  return (
    <div
      data-testid={testId}
      className={cn(
        'flex h-full w-full min-w-0 min-h-0 flex-col overflow-hidden border-l',
        variant === 'dark'
          ? 'bg-call-chrome border-call-chrome-border'
          : 'bg-surface border-border',
        className,
      )}
    >
      {children}
    </div>
  );
}
