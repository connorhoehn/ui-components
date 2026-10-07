// Computer Lab — a terminal multiplexer over the whole fleet.
//
// The premise is that the interesting work is not one agent doing one task
// well; it is a person with six boxes open, reading four of them, and typing
// at whichever one has stopped. The single-computer page cannot express that:
// it shows one box at a time, so "what is everything doing" costs a
// navigation per box and the answer is stale before you finish.
//
// The layout borrows from tmux — a tree of split panes, one focused, each
// labelled in its own border — but the *keys* deliberately do not. A leader
// chord is worth learning if you live in tmux; here it is a tax, because
// every command costs two keystrokes and none of them are guessable. The
// bindings are ordinary Mac chords (see `keymap.ts`), fully overridable, and
// ⌘/ lists them.
//
// The one addition tmux does not have to make is broadcast: `synchronize-panes`
// for shells is the same idea as sending one instruction to five agents, and
// it is the reason to be here at all.

import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { StatusDot } from '../../shared/StatusDot';
import { TitledFrame } from '../../shared/TitledFrame';
import { DotMeter } from '../../shared/DotMeter';
import { useCompute } from '../context/ComputeContext';
import { useLabLayout } from '../hooks/useLabLayout';
import { COMPUTE_STATUS, statusOf } from '../lib/status';
import { MAX_SHELLS } from '../lib/dockStore';
import {
  defaultKindFor, kindsFor, nextKind, quotaUsage, resolveKind,
  type PaneHandle, type PaneKind, type PaneKindRegistry,
} from '../lib/paneKinds';
import { summarizeFleet } from '../lib/fleetSummary';
import {
  LabInstructContext, runInstructionAsTasks, type LabInstructionOutcome, type LabInstructRoute,
} from '../context/LabInstructContext';
import type { DropdownMenuSection } from '../../shared/DropdownMenu';
import { DropdownMenu } from '../../shared/DropdownMenu';
import { LabFleetRail } from './LabFleetRail';
import { LabHeader, LabPaneToolbar, WorkspacePane } from './LabWorkspaceChrome';
import {
  DEFAULT_KEYMAP, groupBindings, isLeaderKey, labelFor, matchBinding, matchLeaderBinding,
  type KeyBinding, type LabCommand, type LeaderConfig,
} from '../lib/keymap';
import { chromeVarsFor, type ChromeTone } from '../lib/chromeTokens';
import type { Direction, PaneLeaf } from '../lib/paneTree';
import { LabRail } from './LabRail';
import { LabChooser } from './LabChooser';
import { PaneTreeView } from './PaneTreeView';
import { PaneStatusLine, DEFAULT_IDLE_WINDOW_MS } from './PaneStatusLine';
import type { Computer, ComputeStatus } from '../types';

/** Which computers an instruction reaches. */
export type LabInstructionScope = 'focused' | 'selected' | 'all';

/** What the workspace lab's instruction bar hands the host. */
export interface LabInstruction {
  text: string;
  /** The computers in scope, laptops included — the host decides what reaches them. */
  computers: Computer[];
  scope: LabInstructionScope;
}

// Defined beside the shared route so the Nudge bar and the Agent pane's reply
// cannot drift apart; re-exported here where hosts have always imported it.
export type { LabInstructionOutcome } from '../context/LabInstructContext';

export interface ComputerLabProps {
  open: boolean;
  onClose: () => void;
  /**
   * Keyboard bindings. Defaults to `DEFAULT_KEYMAP` — plain Mac chords, chosen
   * from the ones a browser actually forwards to the page. Pass your own to
   * rebind; nothing in the component hardcodes a chord.
   */
  keymap?: readonly KeyBinding[];
  /**
   * Optional tmux-style prefix key. Off by default.
   *
   * When set, every binding that carries a `leaderKey` *also* answers to
   * `leader → key`, on top of its direct chord. Both models work at once, so
   * turning this on takes nothing away — pass `TMUX_LEADER` to try it.
   */
  leader?: LeaderConfig | null;
  /** Denominator for the per-pane expiry meters. */
  idleWindowMs?: number;
  /**
   * Open with this computer in focus — a deep link's landing spot.
   *
   * Applied ONCE per distinct value, not held: it places you and then gets out
   * of the way, so moving to another pane afterwards is not undone on the next
   * render. If the computer already has a pane in the active window that pane
   * is focused; otherwise the focused pane is retargeted to it, which keeps a
   * deliberate split from being torn down by a link.
   *
   * An id that is not in the fleet is ignored rather than cleared: it usually
   * means the fleet has not loaded yet, and blanking the pane on the way to
   * finding out is a worse answer than doing nothing.
   */
  focusComputerId?: string | null;
  /**
   * How the lab occupies the page.
   *
   * `overlay` (default) covers the viewport — the lab as a mode you enter,
   * which is right when it is summoned over whatever you were doing.
   *
   * `inline` fills its container instead, so a host that routes to the lab as
   * a *page* keeps its own nav and header around it. The difference is not
   * only cosmetic: an overlay is `role="dialog" aria-modal`, which tells a
   * screen reader the rest of the page is inert. That is a lie when the lab is
   * the page's content and the app's navigation is still right there, so the
   * inline variant drops both.
   */
  variant?: 'overlay' | 'inline';
  /**
   * Which palette the lab's *chrome* uses — top bar, rail, command line.
   *
   * `code` is the terminal family (Catppuccin, permanently dark). Right for an
   * overlay, which is a place you enter and where the whole viewport is the
   * lab.
   *
   * `app` re-points the same tokens at the host's surface/border/text, so the
   * chrome takes the host's theme and flips with it. Without this the lab is a
   * dark slab dropped into a light page — it reads as an embedded widget
   * rather than part of the app, which is exactly the "feels like an iframe"
   * complaint.
   *
   * Panes are NOT affected either way: a terminal is dark, and the remap is
   * applied to the chrome containers rather than the root precisely so it does
   * not inherit into them. Defaults to `app` for an inline lab and `code` for
   * an overlay, which is what each is usually for.
   *
   * @see `../lib/chromeTokens` for the map itself and where it may be applied.
   */
  chrome?: ChromeTone;
  /**
   * `classic` (default) is the tmux-shaped lab: window tabs, a two-list rail,
   * code-family frames and a broadcast prompt. `workspace` is the same
   * multiplexer under host-themed chrome — a header with the fleet's status
   * pills, + Computer and Keys; a tabbed, searchable, numbered rail grouped by
   * project; card panes with a kind menu and a status badge; and an
   * instruction bar that targets the focused pane, a selection, or the whole
   * fleet. Keyboard, layout persistence and pane kinds are shared.
   */
  appearance?: 'classic' | 'workspace';
  /** Workspace header title. `null` drops it when the host titles the page. Default `Computer Lab`. */
  title?: ReactNode | null;
  /** Workspace header: host actions after + Computer and Keys. */
  headerActions?: ReactNode;
  /**
   * Workspace instruction bar, `Nudge` mode: deliver an instruction to the
   * computers in scope through the host's own route (a governed dispatch, a
   * queue). Resolve with how many took it; reject to report a refusal (a 403,
   * a budget brake) and the text is kept for a retry.
   *
   * Absent, the lab runs it as an agent task on each targeted microVM through
   * the provider's client (`runTask`, resume on). Laptops are skipped on that
   * path: they have no runtime session to resume.
   */
  onInstruct?: (instruction: LabInstruction) => Promise<LabInstructionOutcome | void>;
  className?: string;
}

export function ComputerLab({
  open,
  onClose,
  focusComputerId = null,
  variant = 'overlay',
  chrome: chromeTone = 'app',
  keymap = DEFAULT_KEYMAP,
  leader = null,
  idleWindowMs = DEFAULT_IDLE_WINDOW_MS,
  appearance = 'classic',
  title = 'Computer Lab',
  headerActions,
  onInstruct,
  className,
}: ComputerLabProps) {
  const { client, computers, canManage, create, models, notify, refresh, paneKinds, projects } = useCompute();
  const defaultKindId = paneKinds[0]?.id ?? 'agent';
  /** The kind a new pane on this computer gets — a laptop never gets a PTY. */
  const kindIdFor = useCallback(
    (computer: Computer | null | undefined) => defaultKindFor(paneKinds, computer)?.id ?? defaultKindId,
    [paneKinds, defaultKindId],
  );
  const layout = useLabLayout();
  const workspace = appearance === 'workspace';
  const [statusFilter, setStatusFilter] = useState<ComputeStatus | null>(null);
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(() => new Set());
  const [instructMode, setInstructMode] = useState<'nudge' | 'type'>('nudge');
  const [scope, setScope] = useState<LabInstructionScope>('focused');
  const [instructing, setInstructing] = useState(false);

  const [broadcast, setBroadcast] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showChooser, setShowChooser] = useState(false);
  const [leaderArmed, setLeaderArmed] = useState(false);

  const panesRef = useRef(new Map<string, { handle: PaneHandle; kind: PaneKind }>());
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const byId = useMemo(() => new Map(computers.map((c) => [c.id, c])), [computers]);
  const activePane = layout.panes.find((p) => p.id === layout.activePaneId) ?? layout.panes[0] ?? null;
  const activeComputer = activePane ? (byId.get(activePane.computerId) ?? null) : null;

  // Shells are the scarce resource: each holds a real PTY against the
  // runtime's quota. Which kinds cost one is declared by the kind itself, so
  // a host-registered kind is metered without this file knowing about it.
  const shellPanes = quotaUsage(paneKinds, layout.panes.map((p) => p.kindId), 'shell');

  // Seed once the fleet is actually known. Keyed on `open` alone this fired
  // before the first fetch resolved, seeded with null, and never ran again —
  // so the lab opened permanently empty next to a full rail.
  //
  // A deep link's computer wins the seed, so arriving from one does not open
  // on somebody else's box and then jump.
  const hasWindows = layout.windows.length > 0;
  const linked = focusComputerId && byId.has(focusComputerId) ? focusComputerId : null;
  const firstComputerId = linked ?? computers[0]?.id ?? null;
  const firstKindId = kindIdFor(firstComputerId ? byId.get(firstComputerId) : null);
  useEffect(() => {
    if (!open || hasWindows || !firstComputerId) return;
    layout.ensureSeeded(firstComputerId, firstKindId);
  }, [open, hasWindows, firstComputerId, firstKindId, layout.ensureSeeded]);

  // Land a deep link. Fires per distinct id — following one link, moving away,
  // then following the same link again re-lands you, which is what a link
  // should do; a render in between does not.
  const landedRef = useRef<string | null>(null);
  const { focusPane, setPaneComputer, panes: layoutPanes, activePaneId } = layout;
  useEffect(() => {
    if (!open || !linked) return;
    if (landedRef.current === linked) return;
    const existing = layoutPanes.find((p) => p.computerId === linked);
    if (existing) focusPane(existing.id);
    else if (activePaneId) setPaneComputer(activePaneId, linked);
    else return;   // nothing to land in yet — try again once a pane exists
    landedRef.current = linked;
  }, [open, linked, layoutPanes, activePaneId, focusPane, setPaneComputer]);

  // Closing the lab forgets where a link put you, so reopening from the same
  // link lands again rather than silently doing nothing.
  useEffect(() => {
    if (!open) landedRef.current = null;
  }, [open]);

  // `layout` is rebuilt every render, so depending on the object itself would
  // reconcile -> setState -> re-render forever. The callback is stable.
  const reconcile = layout.reconcile;
  const computerIds = useMemo(() => computers.map((c) => c.id), [computers]);
  useEffect(() => {
    if (!open || computerIds.length === 0) return;
    reconcile(computerIds);
  }, [open, computerIds, reconcile]);

  /**
   * Point a pane at another computer, switching its kind when the current one
   * cannot render that computer (a terminal retargeted at a laptop).
   */
  const retarget = useCallback(
    (paneId: string, computer: Computer) => {
      const pane = layout.panes.find((p) => p.id === paneId);
      layout.setPaneComputer(paneId, computer.id);
      const kind = pane ? resolveKind(paneKinds, pane.kindId) : null;
      if (kind?.appliesTo && !kind.appliesTo(computer)) layout.setPaneKind(paneId, kindIdFor(computer));
    },
    [layout, paneKinds, kindIdFor],
  );

  /** A kind for a new pane on `computer`: keep the focused pane's kind when it applies. */
  const kindForNewPane = useCallback(
    (computer: Computer | null | undefined) => {
      const current = activePane ? resolveKind(paneKinds, activePane.kindId) : null;
      if (current && computer && (!current.appliesTo || current.appliesTo(computer))) return current.id;
      return kindIdFor(computer);
    },
    [activePane, paneKinds, kindIdFor],
  );

  const registerPane = useCallback((paneId: string, kind: PaneKind, handle: PaneHandle | null) => {
    if (handle) panesRef.current.set(paneId, { handle, kind });
    else panesRef.current.delete(paneId);
  }, []);

  /** Panes broadcast reaches. Everything in the window, or just the focused one. */
  const targets = broadcast ? layout.panes : activePane ? [activePane] : [];

  /** Type `text` into each pane that will take it; the count that did. */
  const deliverToPanes = useCallback((text: string, panes: readonly PaneLeaf[]) => {
    let delivered = 0;
    for (const pane of panes) {
      const entry = panesRef.current.get(pane.id);
      if (!entry?.handle.send) continue;
      // Whether the text needs a trailing newline is a property of the kind
      // (a PTY does, an agent prompt must not), so it is declared there
      // rather than branched on here.
      if (entry.handle.send(`${text}${entry.kind.inputSuffix ?? ''}`)) delivered += 1;
    }
    return delivered;
  }, []);

  const sendBroadcast = useCallback(() => {
    const text = broadcastText.trim();
    if (!text || targets.length === 0) return;
    const delivered = deliverToPanes(text, targets);
    if (delivered === 0) {
      notify({ tone: 'error', title: 'Nothing received that', detail: 'No pane was ready to accept input.' });
      return;
    }
    setBroadcastText('');
    if (delivered < targets.length) {
      notify({
        tone: 'info',
        title: `Sent to ${delivered} of ${targets.length} panes`,
        detail: 'The rest were not connected.',
      });
    }
  }, [broadcastText, targets, notify, deliverToPanes]);

  // ── Workspace instruction bar ───────────────────────────────────────────
  // The same composer, aimed by scope rather than by a broadcast toggle. Two
  // modes: Nudge hands an instruction to each computer's agent (the host's
  // route, or a resumed agent task); Type sends keystrokes into the panes
  // already open on those computers, which is the classic broadcast.

  const scopedComputers = useMemo(() => {
    if (scope === 'all') return computers;
    if (scope === 'selected') return computers.filter((c) => selectedIds.has(c.id));
    return activeComputer ? [activeComputer] : [];
  }, [scope, computers, selectedIds, activeComputer]);

  const scopedPanes = useMemo(() => {
    if (scope === 'focused') return activePane ? [activePane] : [];
    const ids = new Set(scopedComputers.map((c) => c.id));
    return layout.panes.filter((p) => ids.has(p.computerId));
  }, [scope, activePane, scopedComputers, layout.panes]);

  /** The default Nudge route: a resumed agent task on each targeted microVM. */
  const runAsTasks = useCallback(
    (text: string, targetComputers: readonly Computer[]) => runInstructionAsTasks(client, text, targetComputers),
    [client],
  );

  /**
   * The route a pane's inline reply takes — the same one Nudge takes, aimed
   * at that pane's computer alone.
   */
  const paneInstruct = useCallback<LabInstructRoute>(
    (text, targetComputers) => (onInstruct
      ? onInstruct({ text, computers: [...targetComputers], scope: 'focused' })
      : runAsTasks(text, targetComputers)),
    [onInstruct, runAsTasks],
  );

  const sendInstruction = useCallback(async () => {
    const text = broadcastText.trim();
    if (!text || instructing) return;
    if (instructMode === 'type') {
      if (scopedPanes.length === 0) {
        notify({ tone: 'info', title: 'No open pane to type into', detail: 'Open a pane on one of these computers first.' });
        return;
      }
      const delivered = deliverToPanes(text, scopedPanes);
      if (delivered === 0) {
        notify({ tone: 'error', title: 'Nothing received that', detail: 'No pane was ready to accept input.' });
        return;
      }
      setBroadcastText('');
      if (delivered < scopedPanes.length) {
        notify({ tone: 'info', title: `Typed into ${delivered} of ${scopedPanes.length} panes`, detail: 'The rest do not take input.' });
      }
      return;
    }
    if (scopedComputers.length === 0) return;
    setInstructing(true);
    try {
      const outcome = onInstruct
        ? await onInstruct({ text, computers: scopedComputers, scope })
        : await runAsTasks(text, scopedComputers);
      const delivered = outcome?.delivered ?? scopedComputers.length;
      if (delivered > 0) setBroadcastText('');
      notify({
        tone: delivered > 0 ? 'success' : 'error',
        title: delivered > 0
          ? `Sent to ${delivered} of ${scopedComputers.length} ${scopedComputers.length === 1 ? 'computer' : 'computers'}`
          : 'No computer took that',
        ...(outcome?.detail ? { detail: outcome.detail } : {}),
      });
    } catch (err) {
      // Kept in the bar: a refusal (a permission, a budget brake) is usually
      // fixed elsewhere and then retried as written.
      notify({ tone: 'error', title: 'Instruction not sent', detail: err instanceof Error ? err.message : undefined });
    } finally {
      setInstructing(false);
    }
  }, [
    broadcastText, instructing, instructMode, scopedPanes, scopedComputers, scope, onInstruct, runAsTasks,
    deliverToPanes, notify,
  ]);

  const splitWith = useCallback(
    (direction: 'row' | 'column') => {
      const computerId = activePane?.computerId ?? computers[0]?.id;
      if (!computerId) return;
      layout.split(direction, computerId, activePane?.kindId ?? kindIdFor(byId.get(computerId)));
    },
    [activePane, computers, layout, kindIdFor, byId],
  );

  /** Switch a pane to a kind, refusing if that kind's quota is spent. */
  const switchKind = useCallback(
    (paneId: string, currentKindId: string, target: PaneKind | null) => {
      if (!target || target.id === currentKindId) return;
      const current = resolveKind(paneKinds, currentKindId);
      const takesSlot = target.quota === 'shell' && current?.quota !== 'shell';
      if (takesSlot && shellPanes >= MAX_SHELLS) {
        notify({
          tone: 'error',
          title: 'No shell slots left',
          detail: `${MAX_SHELLS} open terminals is the limit here. Close one, or use a pane kind that costs nothing.`,
        });
        return;
      }
      layout.setPaneKind(paneId, target.id);
    },
    [layout, paneKinds, shellPanes, notify],
  );

  /** ⌃B e — advance the focused pane to the next registered kind. */
  const cycleActiveKind = useCallback(() => {
    if (!activePane) return;
    switchKind(activePane.id, activePane.kindId, nextKind(paneKinds, activePane.kindId, byId.get(activePane.computerId)));
  }, [activePane, paneKinds, switchKind, byId]);

  const provision = useCallback((projectId?: string) => {
    void create(projectId ? { projectId } : undefined)
      .then((box) => {
        layout.newWindow(box.id, kindIdFor(box));
        notify({ tone: 'success', title: `${box.label} ready`, detail: 'microVM session live · workspace persists' });
      })
      .catch((err: unknown) => {
        notify({
          tone: 'error',
          title: 'Provisioning failed',
          detail: err instanceof Error ? err.message : undefined,
        });
      });
  }, [create, layout, notify, kindIdFor]);

  // ── Keyboard ───────────────────────────────────────────────────────────
  // Capture phase, because xterm swallows nearly everything once a terminal
  // has focus. Without capture, the multiplexer becomes unreachable from
  // inside its own panes — which is every pane, most of the time.
  // Move the keyboard with the border.
  //
  // Repainting the active border without moving DOM focus meant every
  // keyboard move had to be finished with a mouse click — the one thing
  // moving by keyboard exists to avoid. Deferred a frame because the pane may
  // have only just mounted (a split, or a kind switch) and cannot take focus
  // until it has.
  useEffect(() => {
    if (!open || !layout.activePaneId) return;
    // A dialog owns the keyboard while it is up; stealing it back would make
    // the chooser impossible to type in.
    if (showChooser || showHelp) return;
    const paneId = layout.activePaneId;
    const frame = requestAnimationFrame(() => panesRef.current.get(paneId)?.handle.focus?.());
    return () => cancelAnimationFrame(frame);
  }, [open, layout.activePaneId, layout.zoomedPaneId, showChooser, showHelp]);

  const run = useCallback(
    (command: LabCommand) => {
      const moves: Partial<Record<LabCommand, Direction>> = {
        'focus-left': 'left', 'focus-right': 'right', 'focus-up': 'up', 'focus-down': 'down',
      };
      const direction = moves[command];
      if (direction) { layout.move(direction); return; }

      switch (command) {
        case 'split-right': splitWith('row'); return;
        case 'split-down': splitWith('column'); return;
        case 'close-pane': layout.closeActivePane(); return;
        case 'zoom-pane': layout.toggleZoom(); return;
        case 'next-kind': cycleActiveKind(); return;
        case 'jump': setShowChooser(true); return;
        case 'focus-composer': composerRef.current?.focus(); return;
        // Same landing as focus-composer, different reason for existing: this
        // one is the advertised exit from a pane that eats Tab and Escape.
        // The lab listens in the capture phase, so it fires from inside xterm.
        case 'leave-pane': composerRef.current?.focus(); return;
        // One key cycles the three focus regions: panes → computers list →
        // agents list → panes. The rail's rows already carry a roving
        // tabindex, so landing on the row marked tabindex=0 (the active one)
        // resumes where the operator left off rather than resetting to the
        // top; an empty section is skipped rather than focused, because
        // focusing nothing strands the keyboard.
        case 'focus-rail': {
          const rail = railRef.current;
          if (!rail) return;
          const rowIn = (label: string) =>
            rail.querySelector<HTMLElement>(`[role="listbox"][aria-label="${label}"] [data-rail-row][tabindex="0"]`)
            ?? rail.querySelector<HTMLElement>(`[role="listbox"][aria-label="${label}"] [data-rail-row]`);
          const at = document.activeElement;
          const within = (label: string) =>
            !!at && !!rail.querySelector(`[role="listbox"][aria-label="${label}"]`)?.contains(at);
          if (within('computers')) {
            const next = rowIn('agents');
            if (next) next.focus();
            else if (activePane) panesRef.current.get(activePane.id)?.handle.focus?.();
            return;
          }
          if (within('agents')) {
            if (activePane) panesRef.current.get(activePane.id)?.handle.focus?.();
            return;
          }
          (rowIn('computers') ?? rowIn('agents'))?.focus();
          return;
        }
        case 'toggle-broadcast':
          if (workspace) setScope((v) => (v === 'all' ? 'focused' : 'all'));
          else setBroadcast((v) => !v);
          return;
        case 'help': setShowHelp((v) => !v); return;
        // Esc from the rail returns to the panes first — leaving the rail
        // and leaving the lab are different sizes of "get me out", and
        // collapsing them means an overlay closes under someone who only
        // meant to put the keyboard back in a shell. Inline, there is
        // nothing further to exit to — Esc past the rail does nothing rather
        // than unmounting the page's own content.
        case 'exit': {
          if (railRef.current?.contains(document.activeElement)) {
            if (activePane) panesRef.current.get(activePane.id)?.handle.focus?.();
            return;
          }
          if (variant === 'overlay') onClose();
          return;
        }
      }
    },
    [layout, splitWith, cycleActiveKind, onClose, variant, activePane, workspace],
  );

  // Capture phase, because xterm swallows nearly everything once a terminal
  // has focus. Without it the lab is unreachable from inside its own panes —
  // which is every pane, most of the time.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      // An armed leader owns the next keystroke outright — nothing may reach
      // a pane, or the letter is typed into a shell as well as being a
      // command.
      if (leaderArmed) {
        event.preventDefault();
        event.stopPropagation();
        setLeaderArmed(false);
        const viaLeader = matchLeaderBinding(keymap, event);
        if (viaLeader) run(viaLeader);
        return;
      }

      if (isLeaderKey(leader, event)) {
        event.preventDefault();
        event.stopPropagation();
        setLeaderArmed(true);
        return;
      }

      const command = matchBinding(keymap, event);
      if (!command) return;

      // Escape is the exception: inside a terminal it belongs to whatever is
      // running there, and in the prompt bar it should dismiss the bar. Only
      // from the lab's own chrome does it mean "leave".
      if (command === 'exit') {
        const target = event.target as HTMLElement | null;
        if (target?.closest?.('.xterm')) return;
        if (target === composerRef.current) { composerRef.current?.blur(); event.preventDefault(); return; }
        if (showChooser || showHelp) { setShowChooser(false); setShowHelp(false); event.preventDefault(); return; }
      }

      event.preventDefault();
      event.stopPropagation();
      run(command);
    };
    globalThis.addEventListener('keydown', onKey, true);
    return () => globalThis.removeEventListener('keydown', onKey, true);
  }, [open, keymap, leader, leaderArmed, run, showChooser, showHelp]);

  // An armed leader that never receives its second key must disarm itself, or
  // the next ordinary keystroke silently becomes a command.
  useEffect(() => {
    if (!leaderArmed) return;
    const timer = setTimeout(() => setLeaderArmed(false), leader?.timeoutMs ?? 3_000);
    return () => clearTimeout(timer);
  }, [leaderArmed, leader?.timeoutMs]);

  if (!open) return null;

  const chord = (command: LabCommand) => labelFor(keymap, command);
  const chromeVars = chromeVarsFor(chromeTone);
  const isApp = chromeTone === 'app';
  // Inline, the lab is one panel among several on a page that already spends
  // height on its own header and nav. Overlay owns the viewport and can afford
  // the looser rhythm it was designed at.
  const dense = variant === 'inline';

  // One composer element serves both bars: a second textarea would be a
  // second focus target for the `focus-composer` / `leave-pane` commands.
  const instructionPlaceholder = instructMode === 'type'
    ? `Type into ${scopedPanes.length} ${scopedPanes.length === 1 ? 'pane' : 'panes'} — ⏎ to send`
    : scope === 'focused'
      ? `Instruction for ${activeComputer?.label ?? 'the focused computer'} — ⏎ to send`
      : `Instruction for ${scopedComputers.length} ${scopedComputers.length === 1 ? 'computer' : 'computers'} — ⏎ to send`;
  const composer = (
    <textarea
      ref={composerRef}
      rows={1}
      value={broadcastText}
      onChange={(e) => setBroadcastText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (workspace) void sendInstruction();
          else sendBroadcast();
        }
        if (e.key === 'Escape') e.currentTarget.blur();
      }}
      placeholder={
        workspace
          ? instructionPlaceholder
          : broadcast
            ? `instruction for all ${targets.length} panes — ⏎ to send`
            : `instruction for ${activeComputer?.label ?? 'the focused pane'} — ⏎ to send`
      }
      aria-label={workspace ? 'Instruction' : 'Broadcast instruction'}
      disabled={workspace && instructing}
      className={cn(
        'flex-1 min-w-0 resize-none bg-transparent border-none outline-none text-[12px] leading-6',
        workspace
          ? 'font-mono text-text-primary caret-primary placeholder:text-text-tertiary disabled:opacity-60'
          : 'text-code-text caret-code-blue placeholder:text-code-raised',
      )}
    />
  );

  if (workspace) {
    const summary = summarizeFleet(computers);
    const paneComputer = (pane: PaneLeaf) => byId.get(pane.computerId) ?? null;
    const paneKindOf = (pane: PaneLeaf): PaneKind | null => {
      const computer = paneComputer(pane);
      const resolved = resolveKind(paneKinds, pane.kindId);
      if (resolved && computer && resolved.appliesTo && !resolved.appliesTo(computer)) {
        return defaultKindFor(paneKinds, computer);
      }
      return resolved;
    };
    const windowSections: DropdownMenuSection[] = [
      {
        label: 'Windows',
        items: [
          ...layout.windows.map((w, i) => ({
            label: w.name ?? `Window ${i + 1}`,
            active: w.id === layout.activeWindow?.id,
            onSelect: () => layout.selectWindow(w.id),
          })),
          {
            label: 'New window',
            disabled: !activePane,
            onSelect: () => {
              if (activePane) layout.newWindow(activePane.computerId, kindIdFor(byId.get(activePane.computerId)));
            },
          },
        ],
      },
      {
        items: [
          { label: 'Jump to a computer…', trailing: chord('jump') ?? undefined, onSelect: () => setShowChooser(true) },
          { label: 'Arrange side by side', onSelect: () => layout.arrange('columns') },
          { label: 'Keyboard shortcuts', trailing: chord('help') ?? undefined, onSelect: () => setShowHelp(true) },
        ],
      },
    ];
    const scopeLabel: Record<LabInstructionScope, string> = {
      focused: 'Focused pane',
      selected: 'Selected',
      all: 'All computers',
    };
    const scopeCount: Record<LabInstructionScope, number> = {
      focused: activeComputer ? 1 : 0,
      selected: selectedIds.size,
      all: computers.length,
    };
    const targetCount = instructMode === 'type' ? scopedPanes.length : scopedComputers.length;
    const scopedIds = new Set(scopedComputers.map((c) => c.id));

    return (
      <LabInstructContext.Provider value={paneInstruct}>
      <div
        ref={rootRef}
        {...(variant === 'overlay'
          ? { role: 'dialog' as const, 'aria-modal': true }
          : { role: 'region' as const })}
        aria-label="Computer Lab"
        data-appearance="workspace"
        style={chromeVars}
        className={cn(
          'flex flex-col bg-surface text-text-primary',
          variant === 'overlay'
            ? 'fixed inset-0 z-[150]'
            : 'relative h-full min-h-0 w-full rounded-lg border border-border overflow-hidden',
          className,
        )}
      >
        <LabHeader
          title={title}
          summary={summary}
          statusFilter={statusFilter}
          onStatusFilter={setStatusFilter}
          canCreate={canManage}
          onCreate={() => provision()}
          onKeys={() => setShowHelp((v) => !v)}
          keysOpen={showHelp}
          keysChord={chord('help')}
          actions={(
            <>
              {headerActions}
              {variant === 'overlay' && (
                <button
                  type="button"
                  onClick={onClose}
                  title={`Leave the lab${chord('exit') ? ` · ${chord('exit')}` : ''}`}
                  className="text-[12px] text-text-tertiary bg-transparent border-none cursor-pointer hover:text-danger"
                >
                  ✕
                </button>
              )}
            </>
          )}
          leaderLabel={leaderArmed && leader ? leader.label : null}
        />

        <div className="flex flex-1 min-h-0">
          <div ref={railRef} className="contents">
            <LabFleetRail
              className="w-[224px] xl:w-[300px] shrink-0"
              computers={computers}
              activeComputerId={activeComputer?.id ?? null}
              openComputerIds={layout.openComputerIds}
              selectedIds={selectedIds}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onCreate={canManage ? () => provision() : undefined}
              onSelect={(computer, { toggle }) => {
                if (toggle) {
                  setSelectedIds((prev) => {
                    const next = new Set(prev);
                    if (next.has(computer.id)) next.delete(computer.id); else next.add(computer.id);
                    return next;
                  });
                  return;
                }
                // Already on screen: go to it rather than duplicating it here.
                const existing = layout.panes.find((p) => p.computerId === computer.id);
                if (existing) { layout.focusPane(existing.id); return; }
                if (activePane) retarget(activePane.id, computer);
              }}
              onOpenInPane={(computer) => layout.split('row', computer.id, kindForNewPane(computer))}
            />
          </div>

          <div className="flex flex-col flex-1 min-w-0 min-h-0 bg-surface-inset">
            <LabPaneToolbar
              panes={layout.panes.map((p) => ({
                id: p.id,
                label: byId.get(p.computerId)?.label ?? 'gone',
                kind: paneKindOf(p)?.title ?? paneKindOf(p)?.label ?? p.kindId,
                active: p.id === layout.activePaneId,
              }))}
              onFocusPane={layout.focusPane}
              onAddPane={() => splitWith(layout.panes.length % 2 === 1 ? 'row' : 'column')}
              canAddPane={!!activePane}
              shellsOpen={shellPanes}
              maxShells={MAX_SHELLS}
              onArrange={layout.arrange}
              zoomed={!!layout.zoomedPaneId}
              onToggleZoom={layout.toggleZoom}
              moreSections={windowSections}
            />

            <div className="flex-1 min-h-0 flex px-2 pb-2">
              {layout.activeWindow && activePane ? (
                <PaneTreeView
                  className="flex-1 h-full"
                  gutter="roomy"
                  node={layout.activeWindow.root}
                  activePaneId={layout.activePaneId}
                  zoomedPaneId={layout.zoomedPaneId}
                  onRatioChange={layout.resize}
                  renderLeaf={(pane) => {
                    const computer = paneComputer(pane);
                    const kind = paneKindOf(pane);
                    const isActive = pane.id === layout.activePaneId;
                    if (!computer || !kind) {
                      return (
                        <div className="flex-1 flex items-center justify-center rounded-lg border border-border bg-surface text-[12px] text-text-tertiary">
                          {computer ? 'No pane kind is registered.' : 'This computer is gone.'}
                        </div>
                      );
                    }
                    return (
                      <WorkspacePane
                        key={pane.id}
                        computer={computer}
                        kind={kind}
                        kinds={kindsFor(paneKinds, computer)}
                        onSwitchKind={(target) => {
                          layout.focusPane(pane.id);
                          switchKind(pane.id, kind.id, target);
                        }}
                        active={isActive}
                        zoomed={layout.zoomedPaneId === pane.id}
                        broadcasting={scope !== 'focused' && scopedIds.has(computer.id)}
                        models={models}
                        onFocus={() => { if (!isActive) layout.focusPane(pane.id); }}
                        onClose={() => {
                          layout.focusPane(pane.id);
                          layout.closeActivePane();
                        }}
                        onToggleZoom={() => {
                          layout.focusPane(pane.id);
                          layout.toggleZoom();
                        }}
                        moreSections={[{
                          items: [
                            { label: 'Split right', onSelect: () => layout.split('row', computer.id, kind.id) },
                            { label: 'Split down', onSelect: () => layout.split('column', computer.id, kind.id) },
                            { label: 'Open in a new window', onSelect: () => layout.newWindow(computer.id, kind.id) },
                          ],
                        }]}
                      >
                        <WorkspacePaneBody
                          kind={kind}
                          paneId={pane.id}
                          computer={computer}
                          active={isActive}
                          onRegisterPane={registerPane}
                          onSettled={() => void refresh()}
                        />
                      </WorkspacePane>
                    );
                  }}
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center rounded-lg border border-dashed border-border">
                  <div className="text-[14px] font-semibold text-text-primary">No computers in the lab</div>
                  <div className="text-[12px] text-text-secondary max-w-sm">
                    {canManage
                      ? 'Start a computer and it opens here in a pane.'
                      : 'Nothing in the fleet is shared with you yet.'}
                  </div>
                </div>
              )}
            </div>

            <div
              data-testid="lab-instruction-bar"
              className="shrink-0 border-t border-border bg-surface px-2 pt-1.5 pb-1"
            >
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-1.5 py-1 focus-within:border-primary">
                <DropdownMenu
                  trigger={<span className="text-[12px] font-semibold">{instructMode === 'nudge' ? 'Nudge' : 'Type'} ▾</span>}
                  triggerLabel="Instruction mode"
                  triggerVariant="link"
                  triggerTestId="lab-instruct-mode"
                  sections={[{
                    items: [
                      {
                        label: 'Nudge',
                        description: "An instruction for each computer's agent",
                        active: instructMode === 'nudge',
                        disabled: !canManage && !onInstruct,
                        disabledReason: 'Needs permission to run work on these computers',
                        onSelect: () => setInstructMode('nudge'),
                      },
                      {
                        label: 'Type',
                        description: 'Keystrokes into the panes open on them',
                        active: instructMode === 'type',
                        onSelect: () => setInstructMode('type'),
                      },
                    ],
                  }]}
                />
                <span aria-hidden="true" className="h-4 w-px bg-border" />
                <DropdownMenu
                  trigger={<span className="text-[12px] tabular-nums">{scopeLabel[scope]} · {scopeCount[scope]} ▾</span>}
                  triggerLabel="Instruction targets"
                  triggerVariant="link"
                  triggerTestId="lab-instruct-scope"
                  sections={[{
                    label: 'Send to',
                    items: (['focused', 'selected', 'all'] as const).map((value) => ({
                      label: `${scopeLabel[value]} · ${scopeCount[value]}`,
                      active: scope === value,
                      ...(value === 'selected' && selectedIds.size === 0
                        ? { disabled: true, disabledReason: '⌘-click computers in the rail to select them' }
                        : {}),
                      onSelect: () => setScope(value),
                    })),
                  }]}
                />
                <span aria-hidden="true" className="font-mono text-[12px] text-text-tertiary pl-1">&gt;</span>
                {composer}
                <button
                  type="button"
                  onClick={() => void sendInstruction()}
                  disabled={!broadcastText.trim() || targetCount === 0 || instructing}
                  aria-label="Send instruction"
                  title="Send · ⏎"
                  className="shrink-0 h-6.5 px-2 rounded-md border-none bg-primary text-on-primary text-[12px] cursor-pointer hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ⏎
                </button>
              </div>
              <div data-testid="lab-instruction-caption" className="px-1 pt-0.5 text-[11px] text-text-tertiary tabular-nums">
                {instructMode === 'type' ? 'Shell input' : 'Agent instruction'} · {targetCount} {targetCount === 1 ? 'target' : 'targets'}
                {instructing && ' · sending…'}
              </div>
            </div>
          </div>
        </div>

        <LabChooser
          open={showChooser}
          onClose={() => setShowChooser(false)}
          chrome={chromeTone}
          computers={computers}
          panes={layout.panes}
          onJumpToPane={layout.focusPane}
          onRetarget={(computer) => { if (activePane) retarget(activePane.id, computer); }}
          onOpenInSplit={(computer) => layout.split('row', computer.id, kindForNewPane(computer))}
          projects={projects}
          onSelectProject={(project) => {
            const first = project.computers[0];
            if (first) { if (activePane) retarget(activePane.id, first); return; }
            if (canManage) provision(project.id);
          }}
        />

        {showHelp && (
          <ShortcutSheet keymap={keymap} leader={leader} chrome={chromeTone} onClose={() => setShowHelp(false)} />
        )}
      </div>
      </LabInstructContext.Provider>
    );
  }

  return (
    <LabInstructContext.Provider value={paneInstruct}>
    <div
      ref={rootRef}
      {...(variant === 'overlay'
        ? { role: 'dialog' as const, 'aria-modal': true }
        : { role: 'region' as const })}
      aria-label="Computer Lab"
      // In app tone the remap sits on the ROOT and inherits everywhere —
      // panes included. That is the point now, not a hazard: the terminal
      // follows day and night with the app (an explicit product decision
      // reversing the earlier always-dark pane doctrine), and the
      // --color-terminal-* ramp flips its canvas in step. `code` remains the
      // opt-in permanently-dark lab.
      style={chromeVars}
      className={cn(
        'flex flex-col',
        isApp ? 'bg-surface text-text-primary' : 'bg-code-bg text-code-text',
        variant === 'overlay'
          ? 'fixed inset-0 z-[150]'
          // `relative` is load-bearing inline, not decoration. The chooser and
          // the shortcut sheet are `absolute inset-0`; an overlay root is
          // `fixed` and so already a containing block, but an inline root was
          // not, and both dialogs resolved against whatever ancestor of the
          // HOST happened to be positioned — landing over the app's own nav.
          //
          // The border and radius are the other half of "not an iframe": an
          // edgeless dark region bleeding to the container reads as an embed,
          // whereas a panel with the same edge as every other panel on the
          // page reads as part of the page. `overflow-hidden` keeps the two
          // dialogs and the pane field inside that radius.
          : cn(
              'relative h-full min-h-0 w-full',
              isApp && 'rounded-lg border border-border overflow-hidden',
            ),
        className,
      )}
    >
      {/* ── Top bar: identity, window tabs, budget, exit ── */}
      <div
        className={cn(
          'flex items-center gap-3 px-3 shrink-0 border-b border-code-border bg-code-panel',
          dense ? 'h-9' : 'h-10',
        )}
      >
        <span className="text-[11px] font-mono font-semibold tracking-wide text-code-mauve select-none">LAB</span>
        <span data-testid="lab-summary" className="text-[10px] font-mono text-code-muted tabular-nums">
          {computers.length} {computers.length === 1 ? 'computer' : 'computers'} · {layout.panes.length} {layout.panes.length === 1 ? 'pane' : 'panes'}
        </span>

        <div className="flex items-center gap-1 ml-2">
          {layout.windows.map((window, index) => {
            const isActive = window.id === layout.activeWindow?.id;
            return (
              <button
                key={window.id}
                type="button"
                onClick={() => layout.selectWindow(window.id)}
                title={`Window ${index + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'px-2 py-0.5 rounded-sm text-[11px] font-mono cursor-pointer border-none transition-colors',
                  isActive ? 'bg-code-blue text-code-bg font-semibold' : 'bg-code-surface text-code-muted hover:text-code-text',
                )}
              >
                {window.name ?? index + 1}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => activePane && layout.newWindow(activePane.computerId, kindIdFor(byId.get(activePane.computerId)))}
            disabled={!activePane}
            title="New window"
            aria-label="New window"
            // Faded rather than recoloured when disabled. `code-raised` is a
            // near-invisible grey on the terminal ground and an ordinary text
            // grey once remapped, so it stopped reading as "off" the moment the
            // chrome went light — the same reason the send button changed.
            className="px-1.5 py-0.5 text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text disabled:opacity-40 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        <span className="flex-1" />

        {/* The quota that actually bites. Agent panes are free; terminals are not. */}
        <DotMeter
          label="shells"
          value={shellPanes / MAX_SHELLS}
          segments={MAX_SHELLS}
          showPercent={false}
          note={`${shellPanes} of ${MAX_SHELLS} open`}
          warnAbove={0.74}
          // Given the real tone rather than left to inherit the remap. The
          // meter's UNSPENT segments are `bg-code-raised`, and `raised` is the
          // one token in the family that is a background here and a dim
          // foreground everywhere else — the remap has to send it to a text
          // grey (see chromeTokens), which turned the empty dots into dark
          // ones and made a quiet lab look like a full one.
          tone={isApp ? 'surface' : 'code'}
          className="hidden md:flex"
        />

        {leaderArmed && leader && (
          <span
            data-testid="leader-armed"
            className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-semibold bg-code-peach text-code-bg animate-pulse"
          >
            {leader.label} …
          </span>
        )}

        <button
          type="button"
          onClick={() => setShowHelp((v) => !v)}
          aria-pressed={showHelp}
          title={`Shortcuts${chord('help') ? ` · ${chord('help')}` : ''}`}
          className="text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text"
        >
          ?
        </button>
        {/* No exit when the lab IS the page: a ✕ that leads nowhere is worse
            than no ✕, and the host's own nav is the way out. Esc is dropped
            for the same reason — see the keymap handler. */}
        {variant === 'overlay' && (
          <button
            type="button"
            onClick={onClose}
            title={`Leave the lab${chord('exit') ? ` · ${chord('exit')}` : ''}`}
            className="text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Body: rail + panes ── */}
      <div className="flex flex-1 min-h-0">
        {/* `contents` so the remap reaches the rail without adding a box to
            the flex row — custom properties inherit through it. The ref is
            how the keyboard knows focus is in the rail: display:contents
            removes the layout box, not the DOM node, so contains() works. */}
        <div ref={railRef} className="contents">
        <LabRail
          className="w-[210px] shrink-0"
          computers={computers}
          activeComputerId={activeComputer?.id ?? null}
          openComputerIds={layout.openComputerIds}
          showAllActivity={showAllActivity}
          onToggleShowAll={() => setShowAllActivity((v) => !v)}
          canManage={canManage}
          models={models}
          onCreate={() => provision()}
          onOpenMenu={() => setShowHelp((v) => !v)}
          onSelect={(computer) => {
            // Retarget the focused pane rather than opening another one: the
            // rail is navigation, and a rail that spawns a pane per click
            // fills the window in six clicks.
            if (activePane) retarget(activePane.id, computer);
          }}
          onOpenInPane={(computer) => layout.split('row', computer.id, kindForNewPane(computer))}
          // Watching opens a TAIL pane, not another shell. The activity list is
          // boxes something else is driving, so the question is what it is
          // doing — and a tail costs no shell against the runtime's quota, so
          // several can stay open while you work in a terminal elsewhere.
          //
          // Reuses a tail already pointed at that computer rather than stacking
          // duplicates: clicking twice should mean "show me", not "show me
          // twice". Falls back to retargeting when the registry has no tail
          // kind, so a host that replaced the registry degrades to the old
          // behaviour instead of doing nothing.
          onWatch={(computer) => {
            const tailKind = paneKinds.find((k) => k.id === 'tail');
            if (!tailKind) { if (activePane) retarget(activePane.id, computer); return; }
            const existing = layout.panes.find(
              (p) => p.computerId === computer.id && p.kindId === tailKind.id,
            );
            if (existing) { layout.focusPane(existing.id); return; }
            layout.split('row', computer.id, tailKind.id);
          }}
        />
        </div>

        {/* The field the panes sit on. Explicitly toned rather than left to
            inherit from the root: it is the one large surface where the app
            side and the pane side actually meet, and the gutter reads as the
            page's own paper against the greyer chrome either side of it —
            which is what stops a window of dark panes reading as one dark
            region with things drawn on it.

            NOT remapped. The panes are in here, and the remap inherits. */}
        <div
          className={cn(
            'flex-1 min-w-0 min-h-0',
            dense ? 'p-1.5' : 'p-2',
            isApp ? 'bg-surface' : 'bg-code-bg',
          )}
        >
          {layout.activeWindow && activePane ? (
            <PaneTreeView
              className="flex-1 h-full"
              node={layout.activeWindow.root}
              activePaneId={layout.activePaneId}
              zoomedPaneId={layout.zoomedPaneId}
              onRatioChange={layout.resize}
              renderLeaf={(pane) => {
                const computer = byId.get(pane.computerId);
                const isActive = pane.id === layout.activePaneId;
                return (
                  <LabPane
                    key={pane.id}
                    pane={pane}
                    computer={computer ?? null}
                    active={isActive}
                    broadcasting={broadcast}
                    idleWindowMs={idleWindowMs}
                    zoomed={layout.zoomedPaneId === pane.id}
                    onFocus={() => layout.focusPane(pane.id)}
                    onClose={() => {
                      layout.focusPane(pane.id);
                      layout.closeActivePane();
                    }}
                    kinds={paneKinds}
                    onToggleKind={() => {
                      layout.focusPane(pane.id);
                      switchKind(pane.id, pane.kindId, nextKind(paneKinds, pane.kindId, computer));
                    }}
                    onRegisterPane={registerPane}
                    onSettled={() => void refresh()}
                  />
                );
              }}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
              <div className="text-[13px] font-mono text-code-subtle">No computers to lab</div>
              <div className="text-[11px] font-mono text-code-muted max-w-sm">
                Computer Lab multiplexes a fleet. Provision at least one computer and it will open in a pane.
              </div>
              {canManage && (
                <button
                  type="button"
                  onClick={() => provision()}
                  // Same tinted treatment as `send`. This is the only thing to
                  // do on an empty lab, so it cannot be the faintest mark on
                  // the screen — which a bare pastel-green word on white is.
                  className="text-[11px] font-mono rounded px-3 py-1 cursor-pointer border border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30"
                >
                  + new computer
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Command line: broadcast. The reason to be in this mode. ── */}
      <div
        className={cn(
          'flex items-center gap-2 px-3 shrink-0 border-t font-mono transition-colors',
          dense ? 'py-1' : 'py-1.5',
          // The composer is a bare `outline-none` textarea with no field of its
          // own — right for a command line, and on dark chrome the caret alone
          // was enough of a focus cue. On light chrome it is not: nothing on
          // the row changed when it took focus, so ⌘-to-composer looked like it
          // had done nothing. The rule the row already draws doubles as the
          // indicator rather than adding a box the idiom does not want.
          broadcast
            ? 'border-code-peach bg-code-peach/10'
            : 'border-code-border bg-code-panel focus-within:border-code-blue',
        )}
      >
        <button
          type="button"
          onClick={() => setBroadcast((v) => !v)}
          aria-pressed={broadcast}
          title={`Send the prompt to every pane${chord('toggle-broadcast') ? ` · ${chord('toggle-broadcast')}` : ''}`}
          className={cn(
            'text-[10px] px-1.5 py-0.5 rounded-sm cursor-pointer border transition-colors shrink-0',
            broadcast
              // Filled, not just recoloured. Armed broadcast is the one state
              // in the lab where a stray ⏎ reaches every pane at once, so it
              // has to be legible at a glance on a light row too — a peach
              // word on near-white was the weakest mark on the surface.
              // /25 against the row's own /10 wash: at the same strength the
              // toggle disappeared into the bar it is meant to stand on.
              ? 'border-code-peach bg-code-peach/25 text-code-peach font-semibold'
              : 'border-code-border text-code-muted bg-transparent hover:text-code-text',
          )}
        >
          {broadcast ? '▶▶ all panes' : '▶ focused pane'}
        </button>

        <span className="text-[10px] text-code-muted tabular-nums shrink-0 hidden sm:inline">
          {targets.length} {targets.length === 1 ? 'target' : 'targets'}
        </span>

        {composer}

        <button
          type="button"
          onClick={sendBroadcast}
          disabled={!broadcastText.trim() || targets.length === 0}
          // Tinted rather than a bare coloured word. `send` is the only
          // committing control on the row and it was previously the lowest
          // contrast thing on it; a fill carries the affordance so the label's
          // colour does not have to do all the work. Disabled fades the whole
          // button instead of swapping to a dim text token, because the dim
          // token maps to ordinary secondary text on the app side and stopped
          // reading as "off".
          className={cn(
            'shrink-0 text-[11px] px-2 py-0.5 rounded-sm border cursor-pointer transition-colors',
            'border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30',
            'disabled:border-code-border disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          send
        </button>
      </div>

      <LabChooser
        open={showChooser}
        onClose={() => setShowChooser(false)}
        chrome={chromeTone}
        computers={computers}
        panes={layout.panes}
        onJumpToPane={layout.focusPane}
        onRetarget={(computer) => {
          if (activePane) retarget(activePane.id, computer);
        }}
        onOpenInSplit={(computer) => layout.split('row', computer.id, kindForNewPane(computer))}
        projects={projects}
        onSelectProject={(project) => {
          // A project with computers means "show me one of them". A project
          // with none means the thing you actually wanted was to start one
          // there — charged to it, which is the whole point of picking a
          // project rather than a box.
          const first = project.computers[0];
          if (first) {
            if (activePane) retarget(activePane.id, first);
            return;
          }
          if (!canManage) {
            notify({
              tone: 'info',
              title: `${project.name} has no computers`,
              detail: 'You do not have permission to start one.',
            });
            return;
          }
          provision(project.id);
        }}
      />

      {showHelp && (
        <ShortcutSheet
          keymap={keymap}
          leader={leader}
          chrome={chromeTone}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
    </LabInstructContext.Provider>
  );
}

// ── One pane ────────────────────────────────────────────────────────────────

interface LabPaneProps {
  pane: PaneLeaf;
  computer: Computer | null;
  active: boolean;
  broadcasting: boolean;
  zoomed: boolean;
  idleWindowMs: number;
  kinds: PaneKindRegistry;
  onFocus: () => void;
  onClose: () => void;
  onToggleKind: () => void;
  onRegisterPane: (paneId: string, kind: PaneKind, handle: PaneHandle | null) => void;
  onSettled: () => void;
}

function LabPane({
  pane, computer, active, broadcasting, zoomed, idleWindowMs, kinds,
  onFocus, onClose, onToggleKind, onRegisterPane, onSettled,
}: LabPaneProps) {
  // A saved layout can hold a kind that does not apply to this computer (a
  // terminal pane later pointed at a laptop): render its default instead.
  const resolved = resolveKind(kinds, pane.kindId);
  const kind = resolved && computer && resolved.appliesTo && !resolved.appliesTo(computer)
    ? defaultKindFor(kinds, computer)
    : resolved;

  // Bound to the kind so a pane that changes kind republishes: the sinks take
  // input differently (a PTY wants a line, an agent wants a prompt), and a
  // stale one would deliver a prompt to a terminal.
  const registerPane = useCallback(
    (handle: PaneHandle | null) => {
      if (kind) onRegisterPane(pane.id, kind, handle);
    },
    [onRegisterPane, pane.id, kind],
  );

  if (!computer || !kind) {
    return (
      <TitledFrame title="unbound" active={active} className="flex-1 min-w-0" onActivate={onFocus}>
        {/* `code-raised` is a mid-grey the family uses for separators and
            disabled marks; as the only text in an otherwise empty pane it read
            at 1.9:1 against the terminal surface. This is a sentence explaining
            why the pane is blank — it has to be readable. */}
        <div className="h-full flex items-center justify-center text-[11px] font-mono text-code-subtle">
          {computer ? 'no pane kind registered' : 'this computer is gone'}
        </div>
      </TitledFrame>
    );
  }

  const status = statusOf(computer);
  const meta = COMPUTE_STATUS[status];

  return (
    // `tone="code"` (the default) even when the surrounding chrome is the
    // host's, and it was tried the other way first.
    //
    // `tone="surface"` paints `palette.frame` on the frame background AND on
    // the strips behind the title and the title action — and that frame
    // background is exactly what shows through the 8px band above the xterm
    // canvas. On a light host that band becomes a white bar sitting between the
    // pane's title and its first line of output, with the status line dark
    // again underneath: two seams bought in exchange for a lighter border.
    //
    // The rule the whole pass follows instead: the frame IS the boundary.
    // Title row, canvas and status line are pane-side and stay on the code
    // family; the top bar, rail, command line, field and dialogs are app-side.
    // Nothing straddles, so there is exactly one colour change to look at per
    // pane and it lands on the border where a multiplexer expects it.
    <TitledFrame
      active={active}
      onActivate={onFocus}
      className="flex-1 min-w-0"
      bodyClassName="flex flex-col min-h-0"
      title={
        <span className="inline-flex items-center gap-1.5">
          <StatusDot size="xs" color={meta.color} pulse={meta.pulse} aria-label={meta.label} />
          {computer.label}
          {zoomed && <span className="text-code-peach" title="Zoomed">⤢</span>}
        </span>
      }
      titleAction={
        <span className="inline-flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleKind}
            title={nextKind(kinds, pane.kindId)?.description ?? 'Switch pane kind'}
            className="text-[9px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text"
          >
            {kind.label}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close pane ${computer.label}`}
            className="text-[10px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red leading-none"
          >
            ×
          </button>
        </span>
      }
    >
      <div className="flex-1 min-h-0">
        {kind.render({ computer, paneId: pane.id, active, registerPane, onSettled })}
      </div>

      <PaneStatusLine
        // The frame is `rounded` (4px) with a 1px border, so the inner radius
        // is 3px. Left square, the status line's darker panel painted over both
        // bottom corners as small nubs — invisible on a dark page, obvious
        // against a light gutter, and exactly the kind of edge that makes a
        // surface read as pasted on rather than drawn.
        className="rounded-b-[3px]"
        computer={computer}
        idleWindowMs={idleWindowMs}
        broadcasting={broadcasting}
        mode={kind.statusMode ?? kind.label}
      />
    </TitledFrame>
  );
}

// ── Workspace pane body ─────────────────────────────────────────────────────

/** A kind's body, publishing its handle under the kind it was rendered as. */
function WorkspacePaneBody({
  kind, paneId, computer, active, onRegisterPane, onSettled,
}: {
  kind: PaneKind;
  paneId: string;
  computer: Computer;
  active: boolean;
  onRegisterPane: (paneId: string, kind: PaneKind, handle: PaneHandle | null) => void;
  onSettled: () => void;
}) {
  const registerPane = useCallback(
    (handle: PaneHandle | null) => onRegisterPane(paneId, kind, handle),
    [onRegisterPane, paneId, kind],
  );
  return <>{kind.render({ computer, paneId, active, registerPane, onSettled })}</>;
}

// ── Key reference ───────────────────────────────────────────────────────────

/**
 * The shortcut sheet, generated from the keymap.
 *
 * Rendering the live bindings rather than a hand-written table means a
 * rebinding host gets a correct sheet for free, and the sheet can never drift
 * from what the keys actually do — which is the usual fate of documented
 * shortcuts.
 */
function ShortcutSheet({
  keymap,
  leader,
  chrome: chromeTone = 'app',
  onClose,
}: {
  keymap: readonly KeyBinding[];
  leader: LeaderConfig | null;
  chrome?: ChromeTone;
  onClose: () => void;
}) {
  const GROUP_LABEL: Record<KeyBinding['group'], string> = {
    panes: 'Panes',
    navigate: 'Getting around',
    lab: 'The lab',
  };

  return (
    // The scrim stays on the code family in BOTH tones, deliberately. It is
    // not chrome — it is the dark a modal puts over everything, panes included,
    // and remapping it to `surface` would wash a light film over the terminals
    // rather than dimming them. The card is where the host's theme belongs: a
    // permanently dark keyboard reference popping out of a light application is
    // the single loudest "this is an embedded thing" tell in the surface.
    <div
      role="dialog"
      aria-label="Keyboard shortcuts"
      className="absolute inset-0 z-10 flex items-center justify-center bg-code-bg/80"
      onClick={onClose}
    >
      <div
        style={chromeVarsFor(chromeTone)}
        onClick={(e) => e.stopPropagation()}
        className="w-[560px] max-w-[92vw] max-h-[80vh] overflow-y-auto rounded-lg border border-code-border bg-code-panel p-5 shadow-2xl"
      >
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[13px] font-semibold text-code-text">Keyboard shortcuts</span>
          {leader && (
            <span className="text-[10px] font-mono text-code-muted">
              {leader.label} prefix is on
            </span>
          )}
          <span className="flex-1" />
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text"
          >
            esc
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {groupBindings(keymap).map(({ group, bindings }) => (
            <div key={group}>
              <div className="text-[10px] uppercase tracking-wide text-code-mauve mb-1.5">
                {GROUP_LABEL[group]}
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 m-0">
                {bindings.map((binding) => (
                  <Fragment key={`${binding.command}-${binding.label}`}>
                    <dt className="m-0 font-mono text-[11px] text-code-green whitespace-nowrap">
                      {binding.label}
                      {/* Both models are live at once when a leader is set, so
                          the sheet shows both rather than picking one. */}
                      {leader && binding.leaderKey && (
                        <span className="text-code-muted">
                          {' or '}
                          {leader.label} {binding.leaderKey}
                        </span>
                      )}
                    </dt>
                    <dd className="m-0 text-[11px] text-code-subtle">{binding.description}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-code-border text-[10px] text-code-muted leading-relaxed">
          ⌘T, ⌘N and ⌘W are not available — the browser keeps those for its own tabs
          and windows, and never forwards them to a page. Agent panes stream over SSE
          and are free to keep open; terminal panes hold a real shell against the
          runtime&apos;s limit of {MAX_SHELLS}, which is the meter in the top bar.
        </div>
      </div>
    </div>
  );
}
