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
//              The page gets the width. A panel that is itself tabbed (a
//              workbench: task, comments, details) lists `entries`, and the
//              strip shows one icon per entry instead — pressing one opens
//              the column to that panel AT that entry (`onActivate(id,
//              entryId)`), each with its own badge, so a comment or a task
//              that needs someone is visible while the column is folded.
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

/** One of a tabbed panel's parts, as the collapsed strip shows it. Since 2.384.1. */
export interface ContextColumnEntry {
  id: string;
  /** The strip icon's accessible name. */
  label: string;
  icon: ReactNode;
  /** Pending count for this entry alone — unresolved comments, a running task. */
  badge?: number;
}

export interface ContextColumnPanel {
  id: string;
  /** The tab's text and the strip icon's accessible name. */
  label: string;
  icon: ReactNode;
  /** Unread or pending count, shown on the tab and the strip icon. */
  badge?: number;
  /**
   * The panel's own parts, for the collapsed strip: one icon per entry in
   * place of the panel's icon. Pressing one opens the column to this panel
   * and reports the entry (`onActivate(panel.id, entry.id)`). The open tab
   * row is unchanged — the panel's content owns its own tabs. An EMPTY array
   * (2.386.0) puts nothing on the strip for this panel — its parts all live
   * elsewhere right now (a page's comments on its own tab) and the host opens
   * it another way; omit `entries` for the panel's one icon.
   */
  entries?: readonly ContextColumnEntry[];
  /** What the panel shows while it is the active one. */
  content: ReactNode;
  /**
   * `tabs` (default): the column's header row — tabs, width and collapse
   * controls — sits above the panel. `bare`: while this panel is the active
   * one the header row is not drawn and the panel fills the column, bringing
   * its own header and close (a call drawer: "Start a call ×"). Since 2.391.0.
   */
  chrome?: 'tabs' | 'bare';
  /**
   * The open column's width while this panel is active. `default` is the
   * column's own (320px, or `roomy`). The call drawers are wider, and narrow
   * one step below a 1440px viewport so the page keeps its width:
   *   `drawer`       340px → 380px at ≥1440 (call settings, the call panel)
   *   `drawer-wide`  360px → 400px at ≥1440 (start a call)
   * Applies in `open` and `wide` alike. Since 2.391.0.
   */
  width?: 'default' | 'drawer' | 'drawer-wide';
}

export interface ContextColumnProps {
  state: ContextColumnState;
  onStateChange: (next: ContextColumnState) => void;
  /** In tab order. Empty renders nothing at all. */
  panels: ContextColumnPanel[];
  /** Which panel is showing. Unknown or absent falls back to the first. */
  activeId?: string | null;
  /** A tab or a strip icon was pressed; `entryId` when the icon was one of the panel's `entries`. */
  onActivate: (id: string, entryId?: string) => void;
  /** Accessible name of the column. Default "Side column". */
  label?: string;
  /**
   * Open at 384px instead of 320px on a 2xl viewport (≥1536px) — a pane with
   * rows of label + value (a run draft) that the Work mockup draws wider.
   * Narrower viewports keep 320px so the page beside it keeps its width.
   * Since 2.386.13.
   */
  roomy?: boolean;
  className?: string;
  'data-testid'?: string;
}

const WIDTH: Record<ContextColumnState, string> = {
  // 48px (2.386.3): the Folders mockup's strip — 32px buttons, 20px glyphs.
  collapsed: 'w-12',
  open: 'w-80',
  wide: 'w-[32rem]',
};

const PANEL_WIDTH: Record<'drawer' | 'drawer-wide', string> = {
  drawer: 'w-[340px] min-[1440px]:w-[380px]',
  'drawer-wide': 'w-[360px] min-[1440px]:w-[400px]',
};

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 16 16" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
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
  roomy = false,
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
        className={cn('flex h-full shrink-0 flex-col items-center gap-2.5 border-l border-border bg-surface-panel py-1', WIDTH.collapsed, className)}
      >
        <IconButton
          aria-label={`Open ${label.toLowerCase()}`}
          title={`Open ${label.toLowerCase()}`}
          size="md"
          variant="ghost"
          icon={<Chevron dir="left" />}
          onClick={() => onStateChange('open')}
          data-testid={`${testId}-expand`}
        />
        <div className="h-px w-full shrink-0 bg-border" aria-hidden="true" />
        {panels.flatMap((p) => (p.entries
          ? p.entries.map((e) => (
              <div key={`${p.id}:${e.id}`} className="relative">
                <IconButton
                  aria-label={e.badge ? `${e.label} (${e.badge} pending)` : e.label}
                  title={e.label}
                  size="md"
                  className="[&_svg]:h-5 [&_svg]:w-5"
                  variant="ghost"
                  icon={e.icon}
                  onClick={() => { onActivate(p.id, e.id); onStateChange('open'); }}
                  data-testid={`${testId}-entry-${p.id}-${e.id}`}
                />
                {e.badge ? (
                  <span className="pointer-events-none absolute -right-1 -top-1">
                    <Badge n={e.badge} testId={`${testId}-badge-${p.id}-${e.id}`} />
                  </span>
                ) : null}
              </div>
            ))
          : [(
              <div key={p.id} className="relative">
                <IconButton
                  aria-label={p.badge ? `${p.label} (${p.badge} unread)` : p.label}
                  title={p.label}
                  size="md"
                  className="[&_svg]:h-5 [&_svg]:w-5"
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
            )]))}
      </div>
    );
  }

  const panelWidth = active.width && active.width !== 'default' ? PANEL_WIDTH[active.width] : null;

  if (active.chrome === 'bare') {
    return (
      <div
        role="group"
        aria-label={label}
        data-testid={testId}
        data-state={state}
        data-active={active.id}
        data-chrome="bare"
        className={cn(
          'flex h-full shrink-0 flex-col border-l border-border bg-surface-panel',
          panelWidth ?? WIDTH[state],
          !panelWidth && roomy && state === 'open' && '2xl:w-96',
          className,
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden" data-testid={`${testId}-panel`}>
          {active.content}
        </div>
      </div>
    );
  }

  const wide = state === 'wide';
  // More labelled tabs than the header row holds (2.386.13): the open panel
  // keeps its label and the others become icons, named by tooltip and
  // aria-label, so no tab is clipped mid-word behind the width controls.
  const crowded = panels.length > (wide ? 4 : 2);
  return (
    <div
      role="group"
      aria-label={label}
      data-testid={testId}
      data-state={state}
      data-active={active.id}
      data-crowded={crowded || undefined}
      className={cn(
        'flex h-full shrink-0 flex-col border-l border-border bg-surface-panel',
        panelWidth ?? WIDTH[state],
        !panelWidth && roomy && state === 'open' && '2xl:w-96',
        className,
      )}
    >
      <div className="flex h-9 shrink-0 items-center gap-1 border-b border-border pl-1.5 pr-1.5" data-testid={`${testId}-header`}>
        <div role="tablist" aria-label={label} className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
          {panels.map((p) => {
            const selected = p.id === active.id;
            const iconOnly = crowded && !selected;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={selected}
                {...(iconOnly ? { 'aria-label': p.badge ? `${p.label} (${p.badge} unread)` : p.label, title: p.label } : {})}
                onClick={() => onActivate(p.id)}
                className={cn(
                  'flex h-7 cursor-pointer items-center gap-1.5 rounded-md border-none px-2 text-[12px] font-medium transition-colors',
                  selected ? 'min-w-0' : 'shrink-0',
                  selected ? 'bg-surface text-text-primary shadow-sm' : 'bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                )}
                data-testid={`${testId}-tab-${p.id}`}
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center" aria-hidden="true">{p.icon}</span>
                {!iconOnly && <span className="truncate">{p.label}</span>}
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
