// The workspace lab's chrome — the pieces `ComputerLab appearance="workspace"`
// draws around the same pane tree, keyboard and broadcast the classic lab has.
//
//   LabHeader       the title, "18 computers · 12 agents", the fleet's own
//                   status pills (each one a rail filter), + Computer, Keys.
//   LabPaneToolbar  "3 panes ▾" (jump to one), + (another pane), "1 / 8
//                   shells", arrange-as-list / arrange-as-split, expand, ⋯.
//   WorkspacePane   one pane: a kind menu, the computer and its status badge,
//                   one meta line, expand / ⋯ / ✕, then the kind's body.
//
// Every surface here is on the host's tokens (surface, border, text-*), so the
// lab is light in a light app and dark in a dark one without a forced theme.
// The panes' bodies keep the code family, which the lab's `app` chrome
// already re-points at the host — so a terminal follows the theme too.

import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import Chip from '../../shared/Chip';
import { StatusDot } from '../../shared/StatusDot';
import { DropdownMenu, type DropdownMenuSection } from '../../shared/DropdownMenu';
import {
  CloseIcon, MaximizeIcon, KeyboardIcon, ListIcon, MoreIcon, PlusIcon, SplitViewIcon,
} from '../../ui/Icons';
import { COMPUTE_STATUS, statusOf } from '../lib/status';
import type { FleetSummary } from '../lib/fleetSummary';
import type { PaneKind } from '../lib/paneKinds';
import type { PaneArrangement } from '../lib/paneTree';
import type { Computer, ComputeModel, ComputeStatus } from '../types';
import { PaneStatusLine } from './PaneStatusLine';

// ── Header ──────────────────────────────────────────────────────────────────

// Tones follow the rail's dots (`COMPUTE_STATUS`): a pill and the rows it
// filters to must be the same colour or the filter reads as a different set.
const PILLS: { status: ComputeStatus; word: (n: number) => string; tone: 'warning' | 'danger' | 'info'; hint: string }[] = [
  { status: 'waiting', word: (n) => (n === 1 ? 'needs you' : 'need you'), tone: 'warning', hint: 'Show only computers waiting on an answer' },
  { status: 'running', word: () => 'running', tone: 'info', hint: 'Show only computers with a run in flight' },
  { status: 'error', word: (n) => (n === 1 ? 'error' : 'errors'), tone: 'danger', hint: 'Show only computers whose last run failed' },
];

const PILL_COUNT: Record<'waiting' | 'running' | 'error', keyof FleetSummary> = {
  waiting: 'needsYou',
  running: 'running',
  error: 'error',
};

export interface LabHeaderProps {
  /** Leading title. `null` drops it when the host already titles the page. */
  title: ReactNode | null;
  summary: FleetSummary;
  statusFilter: ComputeStatus | null;
  onStatusFilter: (status: ComputeStatus | null) => void;
  /** Render + Computer — the viewer may provision. */
  canCreate: boolean;
  onCreate: () => void;
  onKeys: () => void;
  keysOpen: boolean;
  keysChord?: string | null;
  /** Host actions after the built-in ones. */
  actions?: ReactNode;
  /** An armed tmux leader, when one is configured. */
  leaderLabel?: string | null;
}

export function LabHeader({
  title, summary, statusFilter, onStatusFilter, canCreate, onCreate, onKeys, keysOpen, keysChord, actions, leaderLabel,
}: LabHeaderProps) {
  return (
    <div
      data-testid="lab-header"
      className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-3 py-2 shrink-0 border-b border-border bg-surface"
    >
      <div className="flex items-baseline gap-2 min-w-0">
        {title !== null && (
          <span className="text-[14px] font-semibold text-text-primary truncate">{title}</span>
        )}
        <span data-testid="lab-summary" className="text-[12px] text-text-tertiary tabular-nums whitespace-nowrap">
          {title !== null && <span aria-hidden="true">· </span>}
          {summary.computers} {summary.computers === 1 ? 'computer' : 'computers'} · {summary.agents} {summary.agents === 1 ? 'agent' : 'agents'}
        </span>
      </div>
      <span className="flex-1" />
      <div role="group" aria-label="Fleet status" className="flex items-center gap-1.5">
        {PILLS.map(({ status, word, tone, hint }) => {
          const count = summary[PILL_COUNT[status as 'waiting' | 'running' | 'error']] as number;
          const on = statusFilter === status;
          return (
            <button
              key={status}
              type="button"
              aria-pressed={on}
              onClick={() => onStatusFilter(on ? null : status)}
              title={on ? 'Show every computer' : hint}
              data-testid={`lab-pill-${status}`}
              className={cn(
                'rounded-full p-0 bg-transparent border-none cursor-pointer',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                count === 0 && !on && 'opacity-60',
              )}
            >
              <Chip size="sm" tone={tone} dot="static" outline={on ? undefined : 'soft'} solid={on} className="tabular-nums">
                {count} {word(count)}
              </Chip>
            </button>
          );
        })}
      </div>
      {leaderLabel && (
        <span data-testid="leader-armed" className="animate-pulse">
          <Chip size="sm" tone="caution">{leaderLabel} …</Chip>
        </span>
      )}
      {canCreate && (
        <Button size="sm" variant="primary" onClick={onCreate} data-testid="lab-create">
          <PlusIcon size={14} /> Computer
        </Button>
      )}
      <Button
        size="sm"
        variant="secondary"
        onClick={onKeys}
        aria-pressed={keysOpen}
        title={`Keyboard shortcuts${keysChord ? ` · ${keysChord}` : ''}`}
        data-testid="lab-keys"
      >
        <KeyboardIcon size={14} /> Keys
      </Button>
      {actions}
    </div>
  );
}

// ── Pane toolbar ────────────────────────────────────────────────────────────

export interface LabPaneToolbarProps {
  panes: { id: string; label: string; kind: string; active: boolean }[];
  onFocusPane: (paneId: string) => void;
  onAddPane: () => void;
  canAddPane: boolean;
  shellsOpen: number;
  maxShells: number;
  onArrange: (arrangement: PaneArrangement) => void;
  zoomed: boolean;
  onToggleZoom: () => void;
  /** Window list and the lab's other commands, for the ⋯ menu. */
  moreSections: DropdownMenuSection[];
}

function ToolbarIconButton({ label, onClick, pressed, disabled, children, testId }: {
  label: string; onClick: () => void; pressed?: boolean; disabled?: boolean; children: ReactNode; testId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      disabled={disabled}
      data-testid={testId}
      className={cn(
        'h-6.5 w-6.5 inline-flex items-center justify-center rounded-md border border-border bg-transparent cursor-pointer',
        'text-text-secondary hover:bg-surface-hover hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed',
        pressed && 'bg-surface-hover text-text-primary',
      )}
    >
      {children}
    </button>
  );
}

export function LabPaneToolbar({
  panes, onFocusPane, onAddPane, canAddPane, shellsOpen, maxShells, onArrange, zoomed, onToggleZoom, moreSections,
}: LabPaneToolbarProps) {
  return (
    <div data-testid="lab-pane-toolbar" className="flex items-center gap-1.5 px-2 py-1.5 shrink-0">
      <DropdownMenu
        trigger={<span className="text-[12px]">{panes.length} {panes.length === 1 ? 'pane' : 'panes'} ▾</span>}
        triggerLabel="Panes"
        triggerTestId="lab-panes-menu"
        sections={[{
          label: 'Panes in this window',
          items: panes.map((p, i) => ({
            label: `${i + 1}. ${p.label}`,
            trailing: p.kind,
            active: p.active,
            onSelect: () => onFocusPane(p.id),
          })),
        }]}
      />
      <ToolbarIconButton label="Add a pane" onClick={onAddPane} disabled={!canAddPane} testId="lab-add-pane">
        <PlusIcon size={14} />
      </ToolbarIconButton>
      <span className="flex-1" />
      <span
        data-testid="lab-shell-count"
        title="Open terminals hold a real shell against the runtime's limit"
        className={cn('text-[12px] tabular-nums', shellsOpen >= maxShells ? 'text-warning' : 'text-text-tertiary')}
      >
        {shellsOpen} / {maxShells} shells
      </span>
      <ToolbarIconButton label="Arrange as a list" onClick={() => onArrange('rows')} testId="lab-arrange-rows">
        <ListIcon size={14} />
      </ToolbarIconButton>
      <ToolbarIconButton label="Arrange as a split" onClick={() => onArrange('main')} testId="lab-arrange-main">
        <SplitViewIcon size={14} />
      </ToolbarIconButton>
      <ToolbarIconButton label={zoomed ? 'Restore panes' : 'Expand the focused pane'} onClick={onToggleZoom} pressed={zoomed} testId="lab-zoom">
        <MaximizeIcon size={14} />
      </ToolbarIconButton>
      <DropdownMenu
        trigger={<MoreIcon size={14} />}
        triggerLabel="More lab commands"
        align="end"
        sections={moreSections}
        data-testid="lab-more-menu"
      />
    </div>
  );
}

// ── One pane ────────────────────────────────────────────────────────────────

/** Status badge wording — sentence case for a badge, not the rail's lowercase. */
const BADGE: Record<ComputeStatus, { label: string; tone: 'warning' | 'info' | 'danger' | 'success' | 'neutral' }> = {
  waiting: { label: 'Needs you', tone: 'warning' },
  running: { label: 'Running', tone: 'info' },
  error: { label: 'Error', tone: 'danger' },
  idle: { label: 'Idle', tone: 'success' },
  stopped: { label: 'Stopped', tone: 'neutral' },
};

export interface WorkspacePaneProps {
  computer: Computer;
  kind: PaneKind;
  /** Kinds this computer can switch to, for the kind menu. */
  kinds: readonly PaneKind[];
  onSwitchKind: (kind: PaneKind) => void;
  active: boolean;
  zoomed: boolean;
  broadcasting: boolean;
  models: ComputeModel[];
  onFocus: () => void;
  onClose: () => void;
  onToggleZoom: () => void;
  moreSections: DropdownMenuSection[];
  children: ReactNode;
}

export function WorkspacePane({
  computer, kind, kinds, onSwitchKind, active, zoomed, broadcasting, models,
  onFocus, onClose, onToggleZoom, moreSections, children,
}: WorkspacePaneProps) {
  const status = statusOf(computer);
  const meta = COMPUTE_STATUS[status];
  const badge = BADGE[status];
  return (
    <section
      aria-label={`${kind.title ?? kind.label} · ${computer.label}`}
      data-testid="lab-pane"
      data-active={active || undefined}
      onMouseDown={onFocus}
      onFocusCapture={onFocus}
      className={cn(
        // A container, so the header sheds its quieter parts in a narrow
        // split instead of pushing close off the edge.
        '@container flex flex-col flex-1 min-w-0 min-h-0 h-full rounded-lg border overflow-hidden bg-surface',
        active ? 'border-primary' : 'border-border',
      )}
    >
      <header className="shrink-0 flex flex-col gap-0.5 px-2.5 py-1.5 border-b border-border">
        <div className="flex items-center gap-1.5 min-w-0">
          <DropdownMenu
            trigger={(
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-text-primary whitespace-nowrap">
                {kind.icon}
                <span className="hidden @[18rem]:inline">{kind.title ?? kind.label}</span> ▾
              </span>
            )}
            triggerLabel="Pane kind"
            triggerVariant="link"
            triggerTestId="lab-pane-kind"
            sections={[{
              label: 'Show this computer as',
              items: kinds.map((k) => ({
                label: k.title ?? k.label,
                icon: k.icon,
                description: k.description,
                active: k.id === kind.id,
                onSelect: () => onSwitchKind(k),
              })),
            }]}
          />
          <span aria-hidden="true" className="text-text-tertiary">·</span>
          <StatusDot size="xs" color={meta.color} pulse={meta.pulse} aria-label={meta.label} />
          <span className="min-w-[3rem] text-[12px] font-mono text-text-primary truncate" title={computer.project ?? computer.label}>
            {computer.label}
          </span>
          <span className="hidden @[20rem]:inline-flex shrink-0" data-testid="lab-pane-status">
            <Chip size="xs" tone={badge.tone} outline="soft">
              {badge.label}
            </Chip>
          </span>
          {zoomed && <span className="text-[11px] text-text-tertiary">expanded</span>}
          <span className="flex-1" />
          <button
            type="button"
            onClick={onToggleZoom}
            aria-label={zoomed ? `Restore ${computer.label}` : `Expand ${computer.label}`}
            title={zoomed ? 'Restore' : 'Expand'}
            className="hidden @[16rem]:inline-flex p-1 rounded bg-transparent border-none cursor-pointer text-text-tertiary hover:text-text-primary hover:bg-surface-hover"
          >
            <MaximizeIcon size={13} />
          </button>
          <DropdownMenu
            trigger={<MoreIcon size={13} />}
            triggerLabel={`More for ${computer.label}`}
            triggerVariant="link"
            align="end"
            sections={moreSections}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close pane ${computer.label}`}
            title="Close pane"
            className="p-1 rounded bg-transparent border-none cursor-pointer text-text-tertiary hover:text-danger hover:bg-surface-hover"
          >
            <CloseIcon size={13} />
          </button>
        </div>
        <PaneStatusLine
          variant="meta"
          computer={computer}
          models={models}
          broadcasting={broadcasting}
          mode={kind.statusMode ?? kind.label}
          data-testid="lab-pane-meta"
        />
      </header>
      <div className="flex-1 min-h-0 flex flex-col">{children}</div>
    </section>
  );
}
