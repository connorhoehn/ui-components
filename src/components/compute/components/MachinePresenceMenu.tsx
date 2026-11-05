// MachinePresenceMenu — the top-nav "my machine is in the fleet" item.
//
// A trigger chip for the app-shell header (`⌂ connor-macbook · 3`) that opens
// a panel listing the live agent sessions on the user's own machines: which
// project each is in, what it is doing, which model provider it is running
// (the `ollama · qwen2.5-coder:14b` case is the point — local compute looks
// different from platform compute), how much context it has used, and how
// synced its local memory is against the shared mesh.
//
// Renders NOTHING when there are no machines: an empty presence chip is
// chrome for a feature the user hasn't paired, and the header is the last
// place to advertise one.
//
// PALETTE: this is header chrome, read against the app shell — surface
// tokens, following ConnectionPill, and the opposite call from PaneStatusLine
// (which is pane-side and stays `code`; its docblock records the boundary
// rule: the pane frame is the theme boundary, and this sits outside every
// frame).
//
// Deliberately NOT a `Computer` list: a machine only ever dials out, so the
// panel offers no shell, no stop, no create — the only affordances are the
// two the host wires (`onOpenLab`, `onManage`), and none if it wires none.

import { useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import DotMeter from '../../shared/DotMeter';
import InlinePopover from '../../shared/InlinePopover';
import { InlinePlaceholder } from '../../shared/InlinePlaceholder';
import { SectionLabel } from '../../shared/SectionLabel';
import type { Tone } from '../../shared/tones';
import { shortModelName } from './PaneStatusLine';
import type {
  ComputeModel,
  MachineMemoryState,
  MachineNode,
  MachinePresenceStatus,
  MachineSession,
} from '../types';

const STATUS_TONE: Record<MachinePresenceStatus, Tone> = {
  connected: 'success',
  // Stale is "missed a heartbeat or two" — the machine may just be asleep.
  // Caution, not danger: nothing is broken until the horizon passes.
  stale: 'caution',
  offline: 'neutral',
};

const STATUS_LABEL: Record<MachinePresenceStatus, string> = {
  connected: 'connected',
  stale: 'stale',
  offline: 'offline',
};

/**
 * One line for the session's memory-sync state. Exported for tests and for
 * hosts that render the same state elsewhere (a settings page, a lab pane).
 *
 *   synced   → "● synced"
 *   pending  → "◐ 14 pending"      (the sidecar's outbox is draining)
 *   offline  → "○ offline — queuing" (writes queue locally; nothing is lost)
 *   disabled → "— sync off"
 */
export function memorySummary(memory: MachineMemoryState | undefined): string {
  if (!memory || memory.mode === 'disabled') return '— sync off';
  if (memory.mode === 'offline') return '○ offline — queuing';
  if (memory.mode === 'pending') return `◐ ${memory.pendingOps ?? '?'} pending`;
  return '● synced';
}

/** `ollama · qwen2.5-coder:14b` / `bedrock · nova-pro`. Bedrock ids go
 *  through the same shortener the pane status line uses. */
export function providerSummary(session: MachineSession, models: ComputeModel[] = []): string {
  const model = session.modelProvider === 'bedrock'
    ? shortModelName(session.model, models)
    : session.model ?? '—';
  return session.modelProvider ? `${session.modelProvider} · ${model}` : model;
}

function sessionCount(nodes: MachineNode[]): number {
  return nodes.reduce((sum, n) => sum + n.sessions.length, 0);
}

interface SessionRowProps {
  session: MachineSession;
  models: ComputeModel[];
}

function SessionRow({ session, models }: SessionRowProps) {
  const project = session.projectName ?? session.projectId ?? session.repo ?? '—';
  const where = session.branch ? `${project} · ${session.branch}` : project;
  // Local providers get the accent tone so a glance separates "my GPU is
  // doing this" from platform-billed compute — the distinction this whole
  // surface exists to make visible.
  const localProvider = session.modelProvider != null && session.modelProvider !== 'bedrock';
  return (
    <li
      data-testid="machine-session-row"
      className="flex flex-col gap-1 rounded-md px-2 py-1.5 hover:bg-surface-hover"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs font-medium text-text-primary truncate" title={session.worktree ?? where}>
          {where}
        </span>
        <span className="flex-1" />
        <Chip size="xs" mono tone={localProvider ? 'accent' : 'neutral'} className="shrink-0">
          {providerSummary(session, models)}
        </Chip>
      </div>
      {session.intent && (
        <div className="text-[11px] text-text-tertiary truncate" title={session.intent}>
          {session.intent}
        </div>
      )}
      <div className="flex items-center gap-3 min-w-0">
        {session.contextUsed != null && (
          <DotMeter label="ctx" value={session.contextUsed} tone="surface" segments={8} className="shrink-0" />
        )}
        <span
          className="text-[10px] font-mono text-text-tertiary truncate"
          title={
            session.memory?.pullCursorAgeS != null
              ? `read replica ${session.memory.pullCursorAgeS}s behind the mesh`
              : undefined
          }
        >
          {memorySummary(session.memory)}
        </span>
      </div>
    </li>
  );
}

export interface MachinePresenceMenuProps {
  /** The user's paired machines with their live sessions. Empty → renders null. */
  nodes: MachineNode[];
  /** Known platform models, so Bedrock ids shorten the way the lab shortens them. */
  models?: ComputeModel[];
  /** Wire to deep-link into the Computer Lab. Omitted → no lab affordance. */
  onOpenLab?: () => void;
  /** Wire to the machines settings surface (pairing, revoke). */
  onManage?: () => void;
  className?: string;
  'data-testid'?: string;
}

export function MachinePresenceMenu({
  nodes,
  models = [],
  onOpenLab,
  onManage,
  className,
  'data-testid': testId = 'machine-presence-menu',
}: MachinePresenceMenuProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  if (nodes.length === 0) return null;

  const total = sessionCount(nodes);
  const best: MachinePresenceStatus = nodes.some((n) => n.status === 'connected')
    ? 'connected'
    : nodes.some((n) => n.status === 'stale')
      ? 'stale'
      : 'offline';
  const label = nodes.length === 1 ? nodes[0].label : `${nodes.length} machines`;
  const working = best === 'connected' && total > 0;

  return (
    <>
      <button
        data-ui-part=""
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Local machines: ${label}, ${total} active session${total === 1 ? '' : 's'}, ${STATUS_LABEL[best]}`}
        title={`${label} — ${STATUS_LABEL[best]}`}
        onClick={() => setOpen((v) => !v)}
        data-testid={testId}
        className={cn(
          'inline-flex items-center cursor-pointer rounded-md border border-border px-2 py-1',
          'bg-transparent hover:bg-surface-hover transition-colors duration-100',
          open && 'bg-surface-hover',
          className,
        )}
      >
        <Chip
          size="xs"
          mono
          tone={STATUS_TONE[best]}
          dot={working ? 'pulse' : 'static'}
          className="bg-transparent px-0"
        >
          {total === 0 ? `⌂ ${label}` : `⌂ ${label} · ${total}`}
        </Chip>
      </button>
      <InlinePopover
        trigger={triggerRef}
        open={open}
        onClose={() => setOpen(false)}
        placement="bottom-end"
        aria-label="Local machine sessions"
        className="w-[320px] p-2"
        data-testid={`${testId}-panel`}
      >
        <div className="flex flex-col gap-2">
          {nodes.map((node) => (
            <div key={node.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <SectionLabel>{node.label}</SectionLabel>
                {node.platform && (
                  <span className="text-[10px] font-mono text-text-tertiary">{node.platform}</span>
                )}
                <span className="flex-1" />
                <Chip size="xs" uppercase tone={STATUS_TONE[node.status]} dot="static">
                  {STATUS_LABEL[node.status]}
                </Chip>
              </div>
              {node.sessions.length > 0 ? (
                <ul className="flex flex-col">
                  {node.sessions.map((session) => (
                    <SessionRow key={session.id} session={session} models={models} />
                  ))}
                </ul>
              ) : (
                <InlinePlaceholder data-testid="machine-no-sessions">
                  {node.status === 'offline' ? 'machine offline' : 'no active sessions'}
                </InlinePlaceholder>
              )}
            </div>
          ))}
          {(onOpenLab || onManage) && (
            <div className="flex items-center gap-2 border-t border-border pt-2">
              {onOpenLab && (
                <button
                  data-ui-part=""
                  type="button"
                  onClick={() => { setOpen(false); onOpenLab(); }}
                  className="text-[11px] font-medium text-primary hover:underline cursor-pointer bg-transparent border-0 p-0"
                >
                  Open Computer Lab
                </button>
              )}
              <span className="flex-1" />
              {onManage && (
                <button
                  data-ui-part=""
                  type="button"
                  onClick={() => { setOpen(false); onManage(); }}
                  className="text-[11px] text-text-secondary hover:underline cursor-pointer bg-transparent border-0 p-0"
                >
                  Manage machines
                </button>
              )}
            </div>
          )}
        </div>
      </InlinePopover>
    </>
  );
}

export default MachinePresenceMenu;
