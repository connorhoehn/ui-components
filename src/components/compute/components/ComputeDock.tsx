// ComputeDock — shells that stay alive above the app while you work.
//
// The library already owned the dock *store* (`lib/dockStore.ts`) but not the
// dock, which left every host to re-hand-roll the chrome around it. This is
// that chrome, and it is the piece that makes the store usable.
//
// Mount it once, outside the router outlet. That placement is the whole point:
// navigating must not unmount a terminal. For the same reason inactive tabs are
// hidden with CSS rather than unmounted — unmounting drops the socket, and
// reattaching costs a round trip and the local scrollback even though the PTY
// itself survives server-side.
//
// Four layouts, because "several terminals" means different things:
//
//   docked    a strip pinned to the bottom, tabbed — working in one shell
//   floating  a draggable window parked over the page
//   grid      every shell tiled at once, tmux-style — watching
//   stack     a narrow column down the side, the page still usable beside it
//
// ComputerLab is the other half of this pair and answers a different question.
// The lab is a place you go to work across a fleet; the dock is a terminal you
// keep to hand while doing something else. Both read the same fleet, and a
// shell opened in one is not a shell in the other.

import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { APP_CHROME_VARS } from '../lib/chromeTokens';
import { FloatingPanel } from '../../shared/FloatingPanel';
import { ShellTerminal } from './ShellTerminal';
import { SHELL_STATUS } from '../lib/status';
import { useComputeOptional } from '../context/ComputeContext';
import {
  subscribeDock, getDock, closeShell, focusShell, cycleShell, selectShellByIndex,
  setMode, cycleLayout, showsAllPanes, reportShellStatus, reconcileDock,
  setDockVisible, MAX_SHELLS, type DockMode, type DockShell,
} from '../lib/dockStore';

export interface ComputeDockProps {
  /**
   * Bindings for the dock's own keys. Defaults on; pass false where the host
   * owns the keyboard, or where the dock is embedded in a surface that already
   * binds these chords.
   */
  hotkeys?: boolean;
  /**
   * Reconcile open tabs against the live fleet. Default true when a
   * ComputeProvider is above; a tab whose computer no longer exists can never
   * connect, and it sits there failing in a way indistinguishable from a
   * service problem.
   */
  reconcile?: boolean;
  className?: string;
}

const MODE_GLYPH: Record<Exclude<DockMode, 'hidden'>, string> = {
  docked: '▭', grid: '▦', stack: '▤', floating: '▢',
};

/**
 * Global shortcuts, in capture phase.
 *
 * xterm swallows most keystrokes once focused, so these must be seen before it
 * gets them or the dock becomes unreachable from inside its own terminal.
 *
 * One constraint worth knowing: the browser reserves a lot of ⌘ combos a page
 * cannot intercept — ⌘1–9 and ⌘⇧[ ] switch browser tabs, ⌘J opens Downloads,
 * ⌘[ ] are back/forward. So the dock uses ⌘' (free) and numeric tab jumps use
 * ⌥, which is not taken. Ctrl aliases keep editor muscle memory working.
 */
function useDockHotkeys(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      const cmd = e.metaKey || e.ctrlKey;

      // ⌘'  show / hide      ⌘⇧'  cycle layout
      if (cmd && (e.key === "'" || e.key === '"')) {
        e.preventDefault(); e.stopPropagation();
        if (e.shiftKey) cycleLayout();
        else setDockVisible(getDock().mode === 'hidden');
        return;
      }
      if (getDock().mode === 'hidden') return;

      // ⌥1–9 jump to a tab by position.
      if (e.altKey && !cmd && /^[1-9]$/.test(e.key)) {
        e.preventDefault(); e.stopPropagation();
        selectShellByIndex(Number(e.key) - 1);
        return;
      }
      // ⌃⇥ / ⌃⇧⇥ walk tabs, the way a browser or an editor does.
      if (e.ctrlKey && e.key === 'Tab') {
        e.preventDefault(); e.stopPropagation();
        cycleShell(e.shiftKey ? -1 : 1);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [enabled]);
}

function StatusDot({ status }: { status: DockShell['status'] }) {
  const meta = SHELL_STATUS[status];
  return (
    <span
      aria-hidden="true"
      title={meta.help}
      className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.pulse ? 'animate-pulse' : ''}`}
      style={{ background: meta.color }}
    />
  );
}

/** One shell, always mounted. Visibility is the only thing that changes. */
function ShellPane({ shell, active, labelled }: {
  shell: DockShell; active: boolean; labelled: boolean;
}) {
  return (
    <div className="flex flex-col min-h-0 h-full">
      {labelled && (
        <div className="flex items-center gap-1.5 px-2 py-1 border-b shrink-0 bg-code-surface border-code-border">
          <StatusDot status={shell.status} />
          <span className="text-[10px] font-mono text-code-muted">{shell.label}</span>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => closeShell(shell.id)}
            aria-label={`Close ${shell.label}`}
            className="text-[10px] bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red"
          >
            ×
          </button>
        </div>
      )}
      <div className="flex-1 min-h-0">
        <ShellTerminal
          sessionId={shell.sessionId}
          shellId={shell.id}
          label={shell.label}
          {...(shell.cwd ? { cwd: shell.cwd } : {})}
          chrome={false}
          fillHeight
          // Only the visible pane dials out. A hidden tab that auto-connected
          // would burn one of the ten shells a runtime allows on something
          // nobody is looking at.
          autoConnect={active}
          onStatus={(st, sawOutput) => reportShellStatus(shell.id, st, sawOutput)}
        />
      </div>
    </div>
  );
}

export function ComputeDock({ hotkeys = true, reconcile = true, className = '' }: ComputeDockProps) {
  const dock = useSyncExternalStore(subscribeDock, getDock, getDock);
  const compute = useComputeOptional();
  useDockHotkeys(hotkeys);

  // Drop tabs whose computer is gone. Guarded on having a fleet at all: an
  // empty list during the first poll would otherwise close every tab.
  const liveSessionIds = useMemo(
    () => (compute?.computers ?? []).map((c) => c.sessionId),
    [compute?.computers],
  );
  useEffect(() => {
    if (!reconcile || liveSessionIds.length === 0) return;
    reconcileDock(liveSessionIds);
  }, [reconcile, liveSessionIds]);

  if (dock.mode === 'hidden' || dock.shells.length === 0) return null;

  const tiled = showsAllPanes(dock.mode);

  const body = (
    // The dock dresses for the app's day or night, the same way the lab does:
    // the code-token remap inherits from here, and the terminal ramp flips
    // the canvases. Follows the product decision that killed the always-dark
    // pane; a dock that stayed midnight over a light page was the loudest
    // leftover of it.
    <div style={APP_CHROME_VARS} className="flex flex-col h-full min-h-0">
      {/* Tab strip. Not a <button> wrapping a <button>: nesting interactive
          elements is invalid HTML and leaves the inner control unreachable by
          keyboard, so close is a sibling of select, not a child. */}
      {/* bg-terminal-bg, not bg-code-bg: ShellPane below mounts ShellTerminal
          with chrome={false}, so this strip's background is the only thing
          that shows through around the xterm canvas and must match it. */}
      <div className="flex items-center gap-1 px-1.5 py-1 border-b shrink-0 overflow-x-auto bg-terminal-bg border-code-border">
        {dock.shells.map((s, i) => {
          const active = s.id === dock.activeId;
          return (
            <div
              key={s.id}
              className={`group flex items-center gap-1.5 pl-2 pr-1 py-1 rounded shrink-0 ${
                active ? 'bg-code-surface' : 'bg-transparent hover:bg-code-surface/60'}`}
            >
              <button
                type="button"
                onClick={() => focusShell(s.id)}
                title={`${s.label} · ⌥${i + 1}`}
                aria-current={active ? 'true' : undefined}
                className={`flex items-center gap-1.5 text-[11px] font-mono cursor-pointer border-none bg-transparent p-0 ${
                  active ? 'text-code-text' : 'text-code-muted hover:text-code-text'}`}
              >
                <StatusDot status={s.status} />
                {s.label}
                {s.unread && !active && (
                  <span
                    className="w-1 h-1 rounded-full bg-code-blue"
                    title="new output while you were away"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => closeShell(s.id)}
                aria-label={`Close ${s.label}`}
                title={`Close ${s.label} — the shell is killed`}
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red"
              >
                ×
              </button>
            </div>
          );
        })}

        <div className="flex-1" />

        {dock.shells.length >= MAX_SHELLS && (
          <span
            className="text-[10px] mr-1 shrink-0 text-code-peach"
            title="AgentCore allows 10 shells per runtime"
          >
            max shells
          </span>
        )}
        <div className="flex rounded border overflow-hidden mr-1 shrink-0 border-code-border">
          {(Object.keys(MODE_GLYPH) as Exclude<DockMode, 'hidden'>[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              title={`${m} layout — ⌘⇧' cycles`}
              aria-pressed={dock.mode === m}
              className={`px-1.5 py-0.5 text-[10px] cursor-pointer border-none ${
                dock.mode === m
                  ? 'bg-code-border text-code-text'
                  : 'bg-transparent text-code-muted hover:text-code-text'}`}
            >
              {MODE_GLYPH[m]}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setDockVisible(false)}
          title="Hide — ⌘'. The shells keep running."
          className="text-[11px] px-1.5 py-0.5 bg-transparent border-none cursor-pointer shrink-0 text-code-muted hover:text-code-text"
        >
          ▾
        </button>
      </div>

      {/* ONE list of panes for every layout, not a branch per layout.
          The obvious shape — `tiled ? <grid>…</grid> : <tabs>…</tabs>` — puts
          each terminal in a different position in the element tree per mode, so
          React unmounts and remounts every one on a layout switch. That drops
          the socket and the scrollback, which is precisely what this component
          exists to prevent. Keeping the container and the children in fixed
          positions and changing only their classes means a mode switch is a
          restyle, and the PTYs never notice. */}
      <div
        className={`flex-1 min-h-0 ${
          tiled
            ? `p-1.5 gap-1.5 overflow-auto ${
                dock.mode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 auto-rows-fr'
                  : 'flex flex-col'}`
            : 'relative'
        }`}
      >
        {dock.shells.map((s) => {
          const active = s.id === dock.activeId;
          return (
            <div
              key={s.id}
              onMouseDown={() => focusShell(s.id)}
              aria-hidden={!tiled && !active}
              className={tiled
                ? `min-h-[160px] rounded border overflow-hidden flex flex-col ${
                    active ? 'border-code-green/50' : 'border-code-border'}`
                : 'absolute inset-0'}
              style={tiled ? undefined : { visibility: active ? 'visible' : 'hidden' }}
            >
              {/* Tiled panes label themselves — with several on screen the tab
                  strip no longer says which is which. */}
              <ShellPane shell={s} active={tiled || active} labelled={tiled} />
            </div>
          );
        })}
      </div>
    </div>
  );

  // Floating rides FloatingPanel — snapping, anchor persistence and
  // focus-to-front are already solved there, and a second drag implementation
  // is a second set of bugs.
  if (dock.mode === 'floating') {
    return (
      <FloatingPanel
        open
        onClose={() => setDockVisible(false)}
        title="Terminals"
        defaultPosition="bottom-right"
        persistKey="ui-components.computeDock.anchor.v1"
        widthClassName="w-[46rem] max-w-[92vw]"
        heightClassName="h-[26rem]"
        tone="dark"
        className={className}
        data-testid="compute-dock-floating"
      >
        {body}
      </FloatingPanel>
    );
  }

  const shell = dock.mode === 'stack'
    ? 'fixed top-0 right-0 bottom-0 w-[26rem] max-w-[92vw] border-l'
    : 'fixed left-0 right-0 bottom-0 border-t';

  return (
    <div
      data-testid="compute-dock"
      // bg-terminal-bg: this is the dock's own frame around the docked
      // ShellTerminal (chrome={false}) — same seam rule as the tab strip above.
      className={`${shell} z-[120] flex flex-col bg-terminal-bg border-code-border ${className}`}
      // The remap must sit on THIS element too, not only the body inside it —
      // the root paints its own tokens, and vars do not reach up. Height stays
      // inline regardless: a persisted, user-dragged pixel value.
      style={dock.mode === 'stack' ? APP_CHROME_VARS : { ...APP_CHROME_VARS, height: dock.geometry.dockHeight }}
    >
      {body}
    </div>
  );
}
