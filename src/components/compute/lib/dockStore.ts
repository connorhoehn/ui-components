// Store for the shell dock — the lab of terminals that floats above the app.
//
// Lives outside the router so terminals survive navigation. That is the whole
// point: open a shell, keep working, switch pages, and the shell is still
// there with its socket attached and its scrollback intact. Rendering
// terminals inside a page unmounts them on every route change; the shell
// itself survives server-side, but you pay a reconnect and lose the local
// buffer every time you follow a link.
//
// `useSyncExternalStore`-shaped, no state library. A module singleton because
// there is one dock per application — the same reason `document.body` is not
// injected.

import { DOCK_STORAGE_KEY } from './storage';
import type { ShellStatus } from '../types';

/**
 * Layouts, because "several terminals" means different things:
 *   docked   — one pane pinned to the bottom, tabbed. Working in one shell.
 *   floating — a draggable window parked over the page.
 *   grid     — every shell tiled and visible at once, tmux-style. Watching.
 *   stack    — a narrow column down the right, page still usable beside it.
 */
export type DockMode = 'hidden' | 'docked' | 'floating' | 'grid' | 'stack';

export interface DockShell {
  /** Stable per-tab id; also the AgentCore shellId, so reattach works. */
  id: string;
  sessionId: string;
  /**
   * Directory to start in.
   *
   * A PTY opens at `/`, which is right for a bare box and wrong when the
   * shell was opened from a specific file or checkout — landing at the
   * filesystem root is a shell you have to orient yourself in before you can
   * use it.
   */
  cwd?: string;
  /** Computer label for the tab. */
  label: string;
  status: ShellStatus;
  /** Output arrived while you were looking at a different tab. */
  unread: boolean;
}

export interface DockGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Height of the docked panel; kept separate from the floating window's. */
  dockHeight: number;
}

export interface DockState {
  mode: DockMode;
  shells: DockShell[];
  activeId: string | null;
  geometry: DockGeometry;
}

/** AgentCore allows 10 concurrent shells per runtime; stop short of the wall. */
export const MAX_SHELLS = 8;

const DEFAULT_GEOMETRY: DockGeometry = { x: 120, y: 120, width: 860, height: 480, dockHeight: 360 };

function restore(): DockState {
  const base: DockState = { mode: 'hidden', shells: [], activeId: null, geometry: DEFAULT_GEOMETRY };
  try {
    const raw = globalThis.localStorage?.getItem(DOCK_STORAGE_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw) as Partial<DockState>;
    return {
      // Never restore as visible: a terminal springing open on load, before
      // anyone asked for one, is startling and costs a shell slot.
      mode: 'hidden',
      shells: (Array.isArray(saved.shells) ? saved.shells : [])
        .filter((s): s is DockShell => Boolean(s) && typeof s.sessionId === 'string')
        .map((s) => ({ ...s, status: 'connecting' as ShellStatus, unread: false }))
        .slice(0, MAX_SHELLS),
      activeId: saved.activeId ?? null,
      geometry: { ...DEFAULT_GEOMETRY, ...(saved.geometry ?? {}) },
    };
  } catch {
    return base;
  }
}

let state: DockState = restore();
const listeners = new Set<() => void>();

function emit(): void {
  try {
    globalThis.localStorage?.setItem(
      DOCK_STORAGE_KEY,
      JSON.stringify({ shells: state.shells, activeId: state.activeId, geometry: state.geometry }),
    );
  } catch {
    /* private mode, quota — the dock still works, it just forgets */
  }
  for (const listener of listeners) listener();
}

function set(patch: Partial<DockState>): void {
  state = { ...state, ...patch };
  emit();
}

export function subscribeDock(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getDock(): DockState {
  return state;
}

/**
 * Drop restored tabs whose computer no longer exists.
 *
 * The store cannot check this itself — it deliberately knows nothing about
 * the fleet — so the provider calls this once the real list arrives. A
 * restored tab pointing at a deleted session can never connect: it sits there
 * failing, indistinguishable from a service problem.
 */
export function reconcileDock(liveSessionIds: readonly string[]): void {
  const live = new Set(liveSessionIds);
  const kept = state.shells.filter((s) => live.has(s.sessionId));
  if (kept.length === state.shells.length) return;
  set({
    shells: kept,
    activeId: kept.some((s) => s.id === state.activeId) ? state.activeId : (kept[kept.length - 1]?.id ?? null),
    mode: kept.length === 0 ? 'hidden' : state.mode,
  });
}

export type OpenShellOutcome = { ok: true; id: string } | { ok: false; reason: 'at-capacity' };

/**
 * Open a shell for a computer, or focus the one already open for it.
 *
 * Reusing the existing tab rather than stacking duplicates matters: each tab
 * is a real PTY against a quota of ten, and two tabs on one shellId would
 * fight — the second connection kicks the first with close code 4000.
 */
export function openShell(box: { id: string; label: string; sessionId: string; cwd?: string }): OpenShellOutcome {
  const existing = state.shells.find((s) => s.sessionId === box.sessionId);
  if (existing) {
    set({
      activeId: existing.id,
      mode: state.mode === 'hidden' ? 'docked' : state.mode,
      ...(box.cwd && box.cwd !== existing.cwd
        ? { shells: state.shells.map((s) => (s.id === existing.id ? { ...s, cwd: box.cwd } : s)) }
        : {}),
    });
    return { ok: true, id: existing.id };
  }

  if (state.shells.length >= MAX_SHELLS) {
    // Refuse rather than let the service reject the upgrade with an opaque
    // close code. The caller reports it — silently doing nothing when a
    // button is pressed reads as a broken button.
    set({ mode: state.mode === 'hidden' ? 'docked' : state.mode });
    return { ok: false, reason: 'at-capacity' };
  }

  const shell: DockShell = {
    // Time-based suffix so reopening a closed tab for the same box gets a
    // fresh shellId rather than reattaching to the PTY that was just killed.
    id: `dock-${box.id}-${Date.now().toString(36)}`,
    sessionId: box.sessionId,
    label: box.label,
    ...(box.cwd ? { cwd: box.cwd } : {}),
    status: 'connecting',
    unread: false,
  };
  set({
    shells: [...state.shells, shell],
    activeId: shell.id,
    mode: state.mode === 'hidden' ? 'docked' : state.mode,
  });
  return { ok: true, id: shell.id };
}

export function closeShell(id: string): void {
  const remaining = state.shells.filter((s) => s.id !== id);
  set({
    shells: remaining,
    activeId: state.activeId === id ? (remaining[remaining.length - 1]?.id ?? null) : state.activeId,
    mode: remaining.length === 0 ? 'hidden' : state.mode,
  });
}

export function focusShell(id: string): void {
  // Looking at a tab clears its unread marker — that is what unread means.
  set({
    activeId: id,
    shells: state.shells.map((s) => (s.id === id ? { ...s, unread: false } : s)),
  });
}

/**
 * Report what a shell is doing.
 *
 * `sawOutput` is true when the call was triggered by bytes arriving, which is
 * what marks an unattended tab unread — so a grid or a stack shows which pane
 * moved while your attention was elsewhere.
 */
export function reportShellStatus(id: string, status: ShellStatus, sawOutput = false): void {
  let changed = false;
  const shells = state.shells.map((s) => {
    if (s.id !== id) return s;
    const unread = sawOutput && state.activeId !== id ? true : s.unread;
    if (s.status === status && s.unread === unread) return s;
    changed = true;
    return { ...s, status, unread };
  });
  if (changed) set({ shells });
}

/** Cycle tabs, tmux-style. `delta` of 1 is next, -1 is previous. */
export function cycleShell(delta: number): void {
  if (state.shells.length < 2) return;
  const index = state.shells.findIndex((s) => s.id === state.activeId);
  const next = state.shells[(index + delta + state.shells.length) % state.shells.length];
  if (next) focusShell(next.id);
}

export function selectShellByIndex(index: number): void {
  const shell = state.shells[index];
  if (shell) focusShell(shell.id);
}

export function setMode(mode: DockMode): void {
  set({ mode });
}

/** Show/hide without discarding the shells — the sockets stay attached. */
export function setDockVisible(visible: boolean): void {
  set({ mode: visible ? (state.mode === 'hidden' ? 'docked' : state.mode) : 'hidden' });
}

export function toggleFloating(): void {
  set({ mode: state.mode === 'floating' ? 'docked' : 'floating' });
}

/** Cycle docked → grid → stack → floating, so one key reaches every layout. */
export function cycleLayout(): void {
  const order: DockMode[] = ['docked', 'grid', 'stack', 'floating'];
  const index = order.indexOf(state.mode);
  set({ mode: order[(index + 1) % order.length] ?? 'docked' });
}

/** True when every shell is visible at once and tabs are not the navigation. */
export function showsAllPanes(mode: DockMode): boolean {
  return mode === 'grid' || mode === 'stack';
}

export function setGeometry(patch: Partial<DockGeometry>): void {
  set({ geometry: { ...state.geometry, ...patch } });
}
