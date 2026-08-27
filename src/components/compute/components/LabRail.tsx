// The left rail: the fleet twice, answering two different questions.
//
// The top list is "what boxes exist" — the whole fleet, stable order, the
// thing you navigate. The bottom list is "what is happening right now" —
// only the boxes doing something, sorted by how much they want you. Those
// look like the same list and are not: at twelve boxes the first is a
// directory you scan and the second is three rows you actually read.
//
// Rows are buttons in a roving-tabindex listbox, so the rail is reachable
// without a mouse. A multiplexer whose sidebar needs pointing at is a
// multiplexer people will not use.

import { useCallback, useRef } from 'react';
import { cn } from '../../../lib/cn';
import { StatusDot } from '../../shared/StatusDot';
import Chip from '../../shared/Chip';
import { COMPUTE_STATUS, statusOf } from '../lib/status';
import { shortModelName } from './PaneStatusLine';
import type { Computer, ComputeModel } from '../types';

/** Boxes that want attention first, then busy ones, then the rest. */
const ATTENTION_ORDER: Record<string, number> = {
  waiting: 0,
  error: 1,
  running: 2,
  idle: 3,
  stopped: 4,
};

export interface LabRailProps {
  computers: Computer[];
  /** Computer bound to the focused pane. */
  activeComputerId: string | null;
  /** Computers currently on screen in some pane — marked as mounted. */
  openComputerIds: readonly string[];
  onSelect: (computer: Computer) => void;
  /** Open this computer in a new pane rather than retargeting the current one. */
  onOpenInPane?: (computer: Computer) => void;
  onCreate?: () => void;
  onOpenMenu?: () => void;
  /** Show every box in the activity list, not just the active ones. */
  showAllActivity: boolean;
  onToggleShowAll: () => void;
  canManage?: boolean;
  models?: ComputeModel[];
  className?: string;
}

export function LabRail({
  computers,
  activeComputerId,
  openComputerIds,
  onSelect,
  onOpenInPane,
  onCreate,
  onOpenMenu,
  showAllActivity,
  onToggleShowAll,
  canManage = false,
  models = [],
  className,
}: LabRailProps) {
  const open = new Set(openComputerIds);
  const active = computers.filter((c) => {
    const status = statusOf(c);
    return status === 'running' || status === 'waiting' || status === 'error';
  });
  const activity = showAllActivity ? computers : active;
  const sorted = [...activity].sort(
    (a, b) => (ATTENTION_ORDER[statusOf(a)] ?? 9) - (ATTENTION_ORDER[statusOf(b)] ?? 9),
  );

  return (
    <div className={cn('flex flex-col h-full min-h-0 bg-code-panel border-r border-code-border', className)}>
      <RailSection
        title="computers"
        count={computers.length}
        rows={computers}
        activeId={activeComputerId}
        onSelect={onSelect}
        onOpenInPane={onOpenInPane ?? null}
        open={open}
        renderSub={null}
      />

      <div className="flex items-center px-3 py-1.5 border-y border-code-border shrink-0">
        {canManage && onCreate ? (
          <button
            type="button"
            onClick={onCreate}
            className="text-[11px] font-mono text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline"
          >
            new
          </button>
        ) : (
          <span className="text-[11px] font-mono text-code-raised">new</span>
        )}
        <span className="flex-1" />
        <button
          type="button"
          onClick={onOpenMenu}
          className="text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer p-0 hover:text-code-text"
        >
          menu
        </button>
      </div>

      <RailSection
        title="agents"
        // The count is the *unfiltered* number of active boxes on purpose:
        // toggling `all` should not appear to change how much is happening.
        count={active.length}
        rows={sorted}
        activeId={activeComputerId}
        onSelect={onSelect}
        onOpenInPane={onOpenInPane ?? null}
        open={open}
        action={
          <button
            type="button"
            onClick={onToggleShowAll}
            aria-pressed={showAllActivity}
            title={showAllActivity ? 'Show only boxes doing something' : 'Show every box'}
            className={cn(
              'text-[11px] font-mono bg-transparent border-none cursor-pointer p-0',
              showAllActivity ? 'text-code-blue' : 'text-code-muted hover:text-code-text',
            )}
          >
            all
          </button>
        }
        renderSub={(computer) => {
          const status = statusOf(computer);
          const model = computer.lastResult ? shortModelName(null, models) : null;
          return (
            <span className="flex items-center gap-1 truncate">
              <Chip size="xs" mono tone={COMPUTE_STATUS[status].tone} className="bg-transparent px-0">
                {COMPUTE_STATUS[status].label}
              </Chip>
              {computer.currentTask && (
                <>
                  <span aria-hidden="true" className="text-code-raised">·</span>
                  <span className="truncate text-code-comment">{computer.currentTask}</span>
                </>
              )}
              {!computer.currentTask && model && (
                <>
                  <span aria-hidden="true" className="text-code-raised">·</span>
                  <span className="text-code-comment">{model}</span>
                </>
              )}
            </span>
          );
        }}
      />
    </div>
  );
}

interface RailSectionProps {
  title: string;
  count: number;
  rows: Computer[];
  activeId: string | null;
  open: Set<string>;
  onSelect: (computer: Computer) => void;
  onOpenInPane: ((computer: Computer) => void) | null;
  action?: React.ReactNode;
  renderSub: ((computer: Computer) => React.ReactNode) | null;
}

function RailSection({
  title, count, rows, activeId, open, onSelect, onOpenInPane, action, renderSub,
}: RailSectionProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Roving tabindex: one tab stop for the whole list, arrows move within it.
  // A list of twenty boxes that is twenty tab stops is a list nobody tabs past.
  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    const buttons = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[data-rail-row]') ?? []);
    if (buttons.length === 0) return;
    const index = buttons.findIndex((b) => b === document.activeElement);
    event.preventDefault();
    const next =
      event.key === 'Home' ? 0
      : event.key === 'End' ? buttons.length - 1
      : index < 0 ? 0
      : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
  }, []);

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <div className="flex items-center gap-2 px-3 py-2 shrink-0">
        <span className="text-[11px] font-mono text-code-subtle lowercase tracking-wide">{title}</span>
        <span className="text-[10px] font-mono text-code-raised tabular-nums">{count}</span>
        <span className="flex-1" />
        {action}
      </div>

      {rows.length === 0 ? (
        <div className="px-3 pb-3 text-[11px] font-mono text-code-raised">nothing here</div>
      ) : (
        <div
          ref={listRef}
          role="listbox"
          aria-label={title}
          onKeyDown={onKeyDown}
          className="flex-1 min-h-0 overflow-y-auto pb-1"
        >
          {rows.map((computer) => {
            const status = statusOf(computer);
            const meta = COMPUTE_STATUS[status];
            const isActive = computer.id === activeId;
            return (
              <button
                key={computer.id}
                data-rail-row
                type="button"
                role="option"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                title={`${meta.label} — ${meta.help}`}
                onClick={() => onSelect(computer)}
                // A modifier opens a second pane instead of retargeting this
                // one, which is the difference between "look at that" and
                // "watch both".
                onAuxClick={(e) => {
                  if (e.button === 1 && onOpenInPane) {
                    e.preventDefault();
                    onOpenInPane(computer);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && onOpenInPane) {
                    e.preventDefault();
                    onOpenInPane(computer);
                  }
                }}
                className={cn(
                  'w-full text-left flex items-start gap-2 px-3 py-1.5 border-l-2 cursor-pointer bg-transparent transition-colors',
                  'focus:outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset',
                  isActive
                    ? 'border-code-blue bg-code-surface'
                    : 'border-transparent hover:bg-code-surface/60',
                )}
              >
                <StatusDot
                  size="xs"
                  color={meta.color}
                  pulse={meta.pulse}
                  className="mt-[5px]"
                  aria-label={meta.label}
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block text-[12px] font-mono truncate',
                      isActive ? 'text-code-text' : 'text-code-subtle',
                    )}
                  >
                    {computer.label}
                  </span>
                  {renderSub && (
                    <span className="block text-[10px] font-mono truncate">{renderSub(computer)}</span>
                  )}
                </span>
                {open.has(computer.id) && (
                  <span
                    aria-label="open in a pane"
                    title="Open in a pane"
                    className="mt-[3px] text-[9px] font-mono text-code-blue shrink-0"
                  >
                    ▣
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
