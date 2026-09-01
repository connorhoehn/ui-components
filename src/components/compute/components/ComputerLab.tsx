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

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import { StatusDot } from '../../shared/StatusDot';
import { TitledFrame } from '../../shared/TitledFrame';
import { DotMeter } from '../../shared/DotMeter';
import { useCompute } from '../context/ComputeContext';
import { useLabLayout } from '../hooks/useLabLayout';
import { COMPUTE_STATUS, statusOf } from '../lib/status';
import { MAX_SHELLS } from '../lib/dockStore';
import { nextKind, quotaUsage, resolveKind, type PaneHandle, type PaneKind, type PaneKindRegistry } from '../lib/paneKinds';
import {
  DEFAULT_KEYMAP, groupBindings, isLeaderKey, labelFor, matchBinding, matchLeaderBinding,
  type KeyBinding, type LabCommand, type LeaderConfig,
} from '../lib/keymap';
import type { Direction, PaneLeaf } from '../lib/paneTree';
import { LabRail } from './LabRail';
import { LabChooser } from './LabChooser';
import { PaneTreeView } from './PaneTreeView';
import { PaneStatusLine, DEFAULT_IDLE_WINDOW_MS } from './PaneStatusLine';
import type { Computer } from '../types';

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
   */
  chrome?: 'code' | 'app';
  className?: string;
}

/**
 * Re-point the code family at the host's app tokens.
 *
 * Only the structural tokens — backgrounds, borders, text. The accents
 * (green/red/peach/blue) stay put: they carry meaning (a running pane, an
 * expiring session, a broadcast armed) and they read on both themes, so
 * translating them would cost the meaning and buy nothing.
 */
const APP_CHROME_VARS = {
  '--color-code-bg': 'var(--color-surface)',
  '--color-code-panel': 'var(--color-surface-panel)',
  '--color-code-surface': 'var(--color-surface-hover)',
  '--color-code-border': 'var(--color-border)',
  // The text ramp, darkest to faintest. `raised` is a mid-grey in the dark
  // family that doubles as a dim foreground, and it is used almost entirely as
  // one here — placeholders, separators, "nothing here", counts. Mapping it to
  // a background token (surface-emphasis) was the first attempt and made half
  // the rail invisible on white: #e2e8f0 text on #ffffff is not text.
  '--color-code-text': 'var(--color-text-primary)',
  '--color-code-subtle': 'var(--color-text-secondary)',
  '--color-code-muted': 'var(--color-text-secondary)',
  '--color-code-comment': 'var(--color-text-tertiary)',
  '--color-code-raised': 'var(--color-text-tertiary)',
} as React.CSSProperties;

export function ComputerLab({
  open,
  onClose,
  focusComputerId = null,
  variant = 'overlay',
  chrome: chromeTone = variant === 'inline' ? 'app' : 'code',
  keymap = DEFAULT_KEYMAP,
  leader = null,
  idleWindowMs = DEFAULT_IDLE_WINDOW_MS,
  className,
}: ComputerLabProps) {
  const { computers, canManage, create, models, notify, refresh, paneKinds, projects } = useCompute();
  const defaultKindId = paneKinds[0]?.id ?? 'agent';
  const layout = useLabLayout();

  const [broadcast, setBroadcast] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showChooser, setShowChooser] = useState(false);
  const [leaderArmed, setLeaderArmed] = useState(false);

  const panesRef = useRef(new Map<string, { handle: PaneHandle; kind: PaneKind }>());
  const composerRef = useRef<HTMLTextAreaElement>(null);
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
  useEffect(() => {
    if (!open || hasWindows || !firstComputerId) return;
    layout.ensureSeeded(firstComputerId, defaultKindId);
  }, [open, hasWindows, firstComputerId, defaultKindId, layout.ensureSeeded]);

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

  const registerPane = useCallback((paneId: string, kind: PaneKind, handle: PaneHandle | null) => {
    if (handle) panesRef.current.set(paneId, { handle, kind });
    else panesRef.current.delete(paneId);
  }, []);

  /** Panes broadcast reaches. Everything in the window, or just the focused one. */
  const targets = broadcast ? layout.panes : activePane ? [activePane] : [];

  const sendBroadcast = useCallback(() => {
    const text = broadcastText.trim();
    if (!text || targets.length === 0) return;
    let delivered = 0;
    for (const pane of targets) {
      const entry = panesRef.current.get(pane.id);
      if (!entry?.handle.send) continue;
      // Whether the text needs a trailing newline is a property of the kind
      // (a PTY does, an agent prompt must not), so it is declared there
      // rather than branched on here.
      if (entry.handle.send(`${text}${entry.kind.inputSuffix ?? ''}`)) delivered += 1;
    }
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
  }, [broadcastText, targets, notify]);

  const splitWith = useCallback(
    (direction: 'row' | 'column') => {
      const computerId = activePane?.computerId ?? computers[0]?.id;
      if (!computerId) return;
      layout.split(direction, computerId, activePane?.kindId ?? defaultKindId);
    },
    [activePane, computers, layout, defaultKindId],
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
    switchKind(activePane.id, activePane.kindId, nextKind(paneKinds, activePane.kindId));
  }, [activePane, paneKinds, switchKind]);

  const provision = useCallback((projectId?: string) => {
    void create(projectId ? { projectId } : undefined)
      .then((box) => {
        layout.newWindow(box.id, defaultKindId);
        notify({ tone: 'success', title: `${box.label} ready`, detail: 'microVM session live · workspace persists' });
      })
      .catch((err: unknown) => {
        notify({
          tone: 'error',
          title: 'Provisioning failed',
          detail: err instanceof Error ? err.message : undefined,
        });
      });
  }, [create, layout, notify, defaultKindId]);

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
        case 'toggle-broadcast': setBroadcast((v) => !v); return;
        case 'help': setShowHelp((v) => !v); return;
        // Inline, there is nothing to exit to — Esc would either do nothing
        // (confusing) or unmount the page's own content (worse).
        case 'exit': if (variant === 'overlay') onClose(); return;
      }
    },
    [layout, splitWith, cycleActiveKind, onClose, variant],
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
  const chromeVars = chromeTone === 'app' ? APP_CHROME_VARS : undefined;

  return (
    <div
      ref={rootRef}
      {...(variant === 'overlay'
        ? { role: 'dialog' as const, 'aria-modal': true }
        : { role: 'region' as const })}
      aria-label="Computer Lab"
      className={cn(
        'flex flex-col',
        // The root takes a real class rather than the variable remap, because
        // custom properties inherit: setting them here would repaint the panes
        // too, and a light terminal is not a terminal.
        chromeTone === 'app' ? 'bg-surface text-text-primary' : 'bg-code-bg text-code-text',
        variant === 'overlay' ? 'fixed inset-0 z-[150]' : 'h-full min-h-0 w-full',
        className,
      )}
    >
      {/* ── Top bar: identity, window tabs, budget, exit ── */}
      <div
        style={chromeVars}
        className="flex items-center gap-3 px-3 h-10 shrink-0 border-b border-code-border bg-code-panel"
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
            onClick={() => activePane && layout.newWindow(activePane.computerId, defaultKindId)}
            disabled={!activePane}
            title="New window"
            aria-label="New window"
            className="px-1.5 py-0.5 text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text disabled:text-code-raised disabled:cursor-not-allowed"
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
            the flex row — custom properties inherit through it. */}
        <div style={chromeVars} className="contents">
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
            if (activePane) layout.setPaneComputer(activePane.id, computer.id);
          }}
          onOpenInPane={(computer) => layout.split('row', computer.id, activePane?.kindId ?? defaultKindId)}
        />
        </div>

        <div className="flex-1 min-w-0 min-h-0 p-2">
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
                      switchKind(pane.id, pane.kindId, nextKind(paneKinds, pane.kindId));
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
                  className="text-[11px] font-mono text-code-green border border-code-border rounded px-3 py-1 bg-transparent cursor-pointer hover:bg-code-surface"
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
        style={chromeVars}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 shrink-0 border-t font-mono',
          broadcast ? 'border-code-peach bg-code-peach/10' : 'border-code-border bg-code-panel',
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
              ? 'border-code-peach text-code-peach font-semibold'
              : 'border-code-border text-code-muted bg-transparent hover:text-code-text',
          )}
        >
          {broadcast ? '▶▶ all panes' : '▶ focused pane'}
        </button>

        <span className="text-[10px] text-code-muted tabular-nums shrink-0 hidden sm:inline">
          {targets.length} {targets.length === 1 ? 'target' : 'targets'}
        </span>

        <textarea
          ref={composerRef}
          rows={1}
          value={broadcastText}
          onChange={(e) => setBroadcastText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendBroadcast();
            }
            if (e.key === 'Escape') e.currentTarget.blur();
          }}
          placeholder={
            broadcast
              ? `instruction for all ${targets.length} panes — ⏎ to send`
              : `instruction for ${activeComputer?.label ?? 'the focused pane'} — ⏎ to send`
          }
          aria-label="Broadcast instruction"
          className="flex-1 min-w-0 resize-none bg-transparent border-none outline-none text-[12px] leading-6 text-code-text placeholder:text-code-raised"
        />

        <button
          type="button"
          onClick={sendBroadcast}
          disabled={!broadcastText.trim() || targets.length === 0}
          className="shrink-0 text-[11px] px-2 py-0.5 rounded-sm border border-code-border text-code-green bg-transparent cursor-pointer hover:bg-code-surface disabled:text-code-raised disabled:cursor-not-allowed"
        >
          send
        </button>
      </div>

      <LabChooser
        open={showChooser}
        onClose={() => setShowChooser(false)}
        computers={computers}
        panes={layout.panes}
        onJumpToPane={layout.focusPane}
        onRetarget={(computer) => {
          if (activePane) layout.setPaneComputer(activePane.id, computer.id);
        }}
        onOpenInSplit={(computer) => layout.split('row', computer.id, activePane?.kindId ?? defaultKindId)}
        projects={projects}
        onSelectProject={(project) => {
          // A project with computers means "show me one of them". A project
          // with none means the thing you actually wanted was to start one
          // there — charged to it, which is the whole point of picking a
          // project rather than a box.
          const first = project.computers[0];
          if (first) {
            if (activePane) layout.setPaneComputer(activePane.id, first.id);
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

      {showHelp && <ShortcutSheet keymap={keymap} leader={leader} onClose={() => setShowHelp(false)} />}
    </div>
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
  const kind = resolveKind(kinds, pane.kindId);

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
        <div className="h-full flex items-center justify-center text-[11px] font-mono text-code-raised">
          {computer ? 'no pane kind registered' : 'this computer is gone'}
        </div>
      </TitledFrame>
    );
  }

  const status = statusOf(computer);
  const meta = COMPUTE_STATUS[status];

  return (
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
        computer={computer}
        idleWindowMs={idleWindowMs}
        broadcasting={broadcasting}
        mode={kind.statusMode ?? kind.label}
      />
    </TitledFrame>
  );
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
  onClose,
}: {
  keymap: readonly KeyBinding[];
  leader: LeaderConfig | null;
  onClose: () => void;
}) {
  const GROUP_LABEL: Record<KeyBinding['group'], string> = {
    panes: 'Panes',
    navigate: 'Getting around',
    lab: 'The lab',
  };

  return (
    <div
      role="dialog"
      aria-label="Keyboard shortcuts"
      className="absolute inset-0 z-10 flex items-center justify-center bg-code-bg/80"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[560px] max-w-[92vw] max-h-[80vh] overflow-y-auto rounded-lg border border-code-border bg-code-panel p-5"
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
