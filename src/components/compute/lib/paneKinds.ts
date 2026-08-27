// What a pane can be, as a registry rather than an enumeration.
//
// The first version of this was a closed union — `'shell' | 'agent'` — and a
// `renderPane` escape hatch bolted on beside it. That is two overlapping
// seams and neither one is enough: a host that wants a third kind of pane (a
// run timeline it already owns, a workspace tree, a diff, a metrics strip)
// could override the *body* of a pane but could not give that kind a name, a
// place in the toggle order, or a quota. It could not be a pane kind; it
// could only impersonate one.
//
// So kinds are registered. The built-in two are ordinary entries in the
// default list, and a host adds to it or replaces it outright. Everything the
// multiplexer needs to know about a kind — what to call it, what it costs,
// how input reaches it — is declared here rather than special-cased in the
// component.

import type { ReactNode } from 'react';
import type { Computer } from '../types';

/**
 * A pane's input sink, published by the kind so broadcast can reach it.
 *
 * Returns false when the pane cannot currently accept input — a terminal
 * whose socket is not open, an agent already running. The caller counts
 * refusals so "sent to 3 of 5 panes" is a true statement rather than a hope.
 */
export type PaneInput = (text: string) => boolean;

export interface PaneKindContext {
  computer: Computer;
  /** Stable pane id. Doubles as the shell id, so a reload reattaches. */
  paneId: string;
  active: boolean;
  /**
   * Publish (or withdraw, with null) this pane's input sink. Call it in an
   * effect; withdraw on cleanup, or broadcast will keep a handle to a pane
   * that has been unmounted or changed kind.
   */
  registerInput: (input: PaneInput | null) => void;
  /** Tell the surface something finished, so the fleet can be re-read. */
  onSettled: () => void;
}

/**
 * Scarce resources a pane kind can consume.
 *
 * Only shells are scarce today: a runtime allows ten concurrent PTYs, and a
 * window of terminal panes can spend the whole quota just to watch. Declaring
 * it here is what lets the multiplexer meter and refuse generically, instead
 * of `if (view === 'shell')` in three places.
 */
export type PaneQuota = 'shell';

export interface PaneKind {
  /** Stable id. Persisted in the saved layout, so do not rename casually. */
  id: string;
  /** Short label for the pane's toggle and the cycle order. */
  label: string;
  /** Tooltip on the toggle — say what switching to this kind gets you. */
  description?: string;
  quota?: PaneQuota;
  /**
   * Appended to broadcast input before it is delivered.
   *
   * A PTY needs the newline or the text sits at the prompt un-submitted,
   * which looks exactly like nothing happened. An agent prompt must not have
   * one. This is the whole difference, and it belongs with the kind.
   */
  inputSuffix?: string;
  /** Right-hand text in the pane's status line, e.g. `pty` or `resume on`. */
  statusMode?: string;
  render: (context: PaneKindContext) => ReactNode;
}

export type PaneKindRegistry = readonly PaneKind[];

/** Look up a kind, falling back to the first registered one. */
export function resolveKind(registry: PaneKindRegistry, id: string): PaneKind | null {
  // A saved layout can name a kind the current registry no longer has — the
  // host changed its registration between sessions. Falling back beats
  // rendering an unexplained blank pane.
  return registry.find((kind) => kind.id === id) ?? registry[0] ?? null;
}

/** The next kind in registration order — what the toggle key cycles through. */
export function nextKind(registry: PaneKindRegistry, id: string): PaneKind | null {
  if (registry.length === 0) return null;
  const index = registry.findIndex((kind) => kind.id === id);
  return registry[(index + 1) % registry.length] ?? null;
}

/** How many panes in a window consume a given quota. */
export function quotaUsage(
  registry: PaneKindRegistry,
  paneKindIds: readonly string[],
  quota: PaneQuota,
): number {
  return paneKindIds.filter((id) => resolveKind(registry, id)?.quota === quota).length;
}
