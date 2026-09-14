// ui-components/src/components/layout/ContextColumn.tsx
//
// The column beside a page that holds what is ABOUT the page — a
// conversation, an activity feed — and knows how to get out of the way.
//
// Three states, all the reader's to set and the host's to remember:
//
//   collapsed  a strip the width of an icon. One icon per panel the host has
//              registered, with its unread count; press one and the column
//              opens to that panel. The page gets the width.
//   open       the panels, stacked, each with its own header. A feed's width.
//   wide       the same, wider — a conversation someone is typing into.
//
// The column's own controls live in a header row of their own, with the
// same height and padding as every other header in the app, so they never
// sit over a panel's heading. That row is the column's; the panels below it
// are the host's.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import Chip from '../shared/Chip';

export type ContextColumnState = 'collapsed' | 'open' | 'wide';

export interface ContextColumnPanel {
  id: string;
  /** Shown as the strip icon's tooltip and accessible name. */
  label: string;
  icon: ReactNode;
  /** Unread or pending count, shown on the strip icon. */
  badge?: number;
  /** Called when the strip icon is pressed, after the column opens. */
  onOpen?: () => void;
}

export interface ContextColumnProps {
  state: ContextColumnState;
  onStateChange: (next: ContextColumnState) => void;
  /** What the strip shows while collapsed. Order is the strip's order. */
  panels: ContextColumnPanel[];
  /** The stacked panels, when open or wide. */
  children?: ReactNode;
  /** Accessible name of the column. Default "Side column". */
  label?: string;
  className?: string;
  'data-testid'?: string;
}

const WIDTH: Record<ContextColumnState, string> = {
  collapsed: 'w-10',
  open: 'w-72',
  wide: 'w-[30rem]',
};

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {dir === 'left'
        ? <path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function WidthGlyph({ wide }: { wide: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {wide
        ? <path d="M2 4l4 4-4 4M14 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M6 4 2 8l4 4M10 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

export function ContextColumn({
  state,
  onStateChange,
  panels,
  children,
  label = 'Side column',
  className,
  'data-testid': testId = 'context-column',
}: ContextColumnProps) {
  if (state === 'collapsed') {
    return (
      <aside
        aria-label={label}
        data-testid={testId}
        data-state="collapsed"
        className={cn('flex h-full shrink-0 flex-col items-center gap-1 border-l border-border bg-surface-panel py-1.5', WIDTH.collapsed, className)}
      >
        <IconButton
          aria-label={`Open ${label.toLowerCase()}`}
          title={`Open ${label.toLowerCase()}`}
          size="sm"
          variant="ghost"
          icon={<Chevron dir="left" />}
          onClick={() => onStateChange('open')}
          data-testid={`${testId}-expand`}
        />
        {panels.length > 0 && <div className="my-1 h-px w-5 bg-border" aria-hidden="true" />}
        {panels.map((p) => (
          <div key={p.id} className="relative">
            <IconButton
              aria-label={p.badge ? `${p.label} (${p.badge} unread)` : p.label}
              title={p.label}
              size="sm"
              variant="ghost"
              icon={p.icon}
              onClick={() => { onStateChange('open'); p.onOpen?.(); }}
              data-testid={`${testId}-panel-${p.id}`}
            />
            {p.badge ? (
              <span className="pointer-events-none absolute -right-1 -top-1">
                <Chip tone="accent" size="xs" mono solid data-testid={`${testId}-badge-${p.id}`}>{p.badge > 99 ? '99+' : p.badge}</Chip>
              </span>
            ) : null}
          </div>
        ))}
      </aside>
    );
  }

  const wide = state === 'wide';
  return (
    <aside
      aria-label={label}
      data-testid={testId}
      data-state={state}
      className={cn('flex h-full shrink-0 flex-col border-l border-border bg-surface-panel', WIDTH[state], className)}
    >
      {/* The column's row: its controls, and nothing else. Same height and
          inset as the app's other header rows. */}
      <div className="flex h-9 shrink-0 items-center justify-end gap-0.5 border-b border-border px-1.5" data-testid={`${testId}-header`}>
        <IconButton
          aria-label={wide ? 'Narrow the column' : 'Widen the column'}
          title={wide ? 'Narrow the column' : 'Widen the column'}
          size="sm"
          variant="ghost"
          icon={<WidthGlyph wide={wide} />}
          onClick={() => onStateChange(wide ? 'open' : 'wide')}
          data-testid={`${testId}-width`}
        />
        <IconButton
          aria-label={`Collapse ${label.toLowerCase()}`}
          title={`Collapse ${label.toLowerCase()}`}
          size="sm"
          variant="ghost"
          icon={<Chevron dir="right" />}
          onClick={() => onStateChange('collapsed')}
          data-testid={`${testId}-collapse`}
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto" data-testid={`${testId}-panels`}>
        {children}
      </div>
    </aside>
  );
}

export default ContextColumn;
