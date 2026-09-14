// ui-components/src/components/layout/ContextColumn.tsx
//
// The column beside a page that holds what is ABOUT the page — a
// conversation, an activity feed — one panel at a time, and knows how to get
// out of the way.
//
// Three states, all the reader's to set and the host's to remember:
//
//   collapsed  a strip the width of an icon. One icon per panel, with its
//              unread count; press one and the column opens to that panel.
//              The page gets the width.
//   open       one panel, chosen by the tabs in the column's header row.
//   wide       the same, wider — a conversation someone is typing into.
//
// The header row is the column's: the tabs on the left, the width and
// collapse controls on the right, at the height and inset of every other
// header row in the app. The panel below it is the host's.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import Chip from '../shared/Chip';

export type ContextColumnState = 'collapsed' | 'open' | 'wide';

export interface ContextColumnPanel {
  id: string;
  /** The tab's text and the strip icon's accessible name. */
  label: string;
  icon: ReactNode;
  /** Unread or pending count, shown on the tab and the strip icon. */
  badge?: number;
  /** What the panel shows while it is the active one. */
  content: ReactNode;
}

export interface ContextColumnProps {
  state: ContextColumnState;
  onStateChange: (next: ContextColumnState) => void;
  /** In tab order. Empty renders nothing at all. */
  panels: ContextColumnPanel[];
  /** Which panel is showing. Unknown or absent falls back to the first. */
  activeId?: string | null;
  /** A tab or a strip icon was pressed. */
  onActivate: (id: string) => void;
  /** Accessible name of the column. Default "Side column". */
  label?: string;
  className?: string;
  'data-testid'?: string;
}

const WIDTH: Record<ContextColumnState, string> = {
  collapsed: 'w-10',
  open: 'w-80',
  wide: 'w-[32rem]',
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

function Badge({ n, testId }: { n: number; testId: string }) {
  return <Chip tone="accent" size="xs" mono solid data-testid={testId}>{n > 99 ? '99+' : n}</Chip>;
}

export function ContextColumn({
  state,
  onStateChange,
  panels,
  activeId,
  onActivate,
  label = 'Side column',
  className,
  'data-testid': testId = 'context-column',
}: ContextColumnProps) {
  if (panels.length === 0) return null;
  const active = panels.find((p) => p.id === activeId) ?? panels[0]!;

  if (state === 'collapsed') {
    return (
      <div
        role="group"
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
        <div className="my-1 h-px w-5 bg-border" aria-hidden="true" />
        {panels.map((p) => (
          <div key={p.id} className="relative">
            <IconButton
              aria-label={p.badge ? `${p.label} (${p.badge} unread)` : p.label}
              title={p.label}
              size="sm"
              variant="ghost"
              icon={p.icon}
              onClick={() => { onActivate(p.id); onStateChange('open'); }}
              data-testid={`${testId}-panel-${p.id}`}
            />
            {p.badge ? (
              <span className="pointer-events-none absolute -right-1 -top-1">
                <Badge n={p.badge} testId={`${testId}-badge-${p.id}`} />
              </span>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  const wide = state === 'wide';
  return (
    <div
      role="group"
      aria-label={label}
      data-testid={testId}
      data-state={state}
      data-active={active.id}
      className={cn('flex h-full shrink-0 flex-col border-l border-border bg-surface-panel', WIDTH[state], className)}
    >
      <div className="flex h-9 shrink-0 items-center gap-1 border-b border-border pl-1.5 pr-1.5" data-testid={`${testId}-header`}>
        <div role="tablist" aria-label={label} className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
          {panels.map((p) => {
            const selected = p.id === active.id;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onActivate(p.id)}
                className={cn(
                  'flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border-none px-2 text-[12px] font-medium transition-colors',
                  selected ? 'bg-surface text-text-primary shadow-sm' : 'bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                )}
                data-testid={`${testId}-tab-${p.id}`}
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center" aria-hidden="true">{p.icon}</span>
                <span className="truncate">{p.label}</span>
                {p.badge ? <Badge n={p.badge} testId={`${testId}-badge-${p.id}`} /> : null}
              </button>
            );
          })}
        </div>
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
      <div role="tabpanel" className="flex min-h-0 flex-1 flex-col overflow-y-auto" data-testid={`${testId}-panel`}>
        {active.content}
      </div>
    </div>
  );
}

export default ContextColumn;
