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
/**
 * What a pane exposes back to the lab.
 *
 * One extensible object rather than a second `registerFocus` channel: pane
 * kinds will need more of these over time (refit, clear, scroll-to-end), and
 * a new parallel registration per capability does not scale. Every field is
 * optional — a read-only pane has no `send`, and a pane with nothing focusable
 * has no `focus`.
 */
export interface PaneHandle {
    /**
     * Deliver text as if the operator had typed it. Used by broadcast.
     *
     * Returns false when the pane cannot currently accept input — a terminal
     * whose socket is not open, an agent already running. The caller counts
     * refusals so "sent to 3 of 5 panes" is true rather than hopeful.
     */
    send?: PaneInput;
    /**
     * Put the keyboard in this pane.
     *
     * Without this, moving pane focus repaints the border and leaves the cursor
     * where it was, so every keyboard move had to be finished with a mouse
     * click — which defeats the point of moving by keyboard at all.
     */
    focus?: () => void;
}
export interface PaneKindContext {
    computer: Computer;
    /** Stable pane id. Doubles as the shell id, so a reload reattaches. */
    paneId: string;
    active: boolean;
    /**
     * Publish (or withdraw, with null) this pane's handle. Call it in an effect
     * and withdraw on cleanup, or the lab keeps a handle to a pane that has
     * been unmounted or changed kind — and a stale one delivers a prompt to a
     * terminal.
     */
    registerPane: (handle: PaneHandle | null) => void;
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
    /**
     * Glyph for the kind, shown before its label in the workspace pane header
     * and its kind menu. Optional — a kind without one is named by label alone.
     */
    icon?: ReactNode;
    /**
     * Header label in the workspace lab, when it should read differently from
     * the short `label` the classic frame and the cycle order use — `Bot logs`
     * rather than `logs`. Defaults to `label`.
     */
    title?: string;
    /**
     * Whether this kind can render this computer at all.
     *
     * Absent means "any computer". A terminal answers false for a paired laptop
     * (no PTY), so a new pane on a laptop lands on the first kind that does
     * apply, the kind menu leaves the terminal out, and retargeting a terminal
     * pane at a laptop switches it rather than painting `error · Forbidden`.
     */
    appliesTo?: (computer: Computer) => boolean;
    render: (context: PaneKindContext) => ReactNode;
}
export type PaneKindRegistry = readonly PaneKind[];
/** Look up a kind, falling back to the first registered one. */
export declare function resolveKind(registry: PaneKindRegistry, id: string): PaneKind | null;
/** Kinds that can render this computer, in registration order. */
export declare function kindsFor(registry: PaneKindRegistry, computer: Computer | null | undefined): PaneKind[];
/**
 * The kind a new pane on this computer gets: the first registered kind that
 * applies to it, falling back to the first kind outright so a registry whose
 * every kind refuses still renders something rather than a blank frame.
 */
export declare function defaultKindFor(registry: PaneKindRegistry, computer: Computer | null | undefined): PaneKind | null;
/** The next kind in registration order — what the toggle key cycles through. */
export declare function nextKind(registry: PaneKindRegistry, id: string, computer?: Computer | null): PaneKind | null;
/** How many panes in a window consume a given quota. */
export declare function quotaUsage(registry: PaneKindRegistry, paneKindIds: readonly string[], quota: PaneQuota): number;
//# sourceMappingURL=paneKinds.d.ts.map