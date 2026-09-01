export type LabCommand = 'focus-left' | 'focus-right' | 'focus-up' | 'focus-down' | 'split-right' | 'split-down' | 'close-pane' | 'zoom-pane' | 'next-kind' | 'jump' | 'toggle-broadcast' | 'focus-composer' | 'focus-rail' | 'help' | 'exit';
export interface KeyBinding {
    command: LabCommand;
    /** `KeyboardEvent.key`, compared case-insensitively. */
    key: string;
    meta?: boolean;
    shift?: boolean;
    alt?: boolean;
    ctrl?: boolean;
    /** How the chord is written in the UI. */
    label: string;
    /** One line for the help sheet. */
    description: string;
    /** Grouping in the help sheet. */
    group: 'panes' | 'navigate' | 'lab';
    /**
     * When a leader is configured, this command also answers to
     * `leader → leaderKey`. Ignored entirely when there is no leader, so a
     * binding can carry it unconditionally.
     */
    leaderKey?: string;
}
/**
 * An optional prefix key. Off by default.
 *
 * `⌃B` is tmux's own, and for tmux's reason: `⌃A` is readline's
 * beginning-of-line, and taking it from every shell in the lab to save one
 * keystroke is a bad trade.
 */
export interface LeaderConfig {
    key: string;
    ctrl?: boolean;
    meta?: boolean;
    alt?: boolean;
    /** How the prefix is written in the UI, e.g. `⌃B`. */
    label: string;
    /** Milliseconds an armed leader waits before giving up. Default 3000. */
    timeoutMs?: number;
}
/** tmux's prefix, for a host that wants to switch leader mode on. */
export declare const TMUX_LEADER: LeaderConfig;
/**
 * The defaults.
 *
 * ⌘ and ⌃ are accepted interchangeably so the same bindings work on a
 * non-Mac keyboard without a second table.
 */
export declare const DEFAULT_KEYMAP: readonly KeyBinding[];
/** Does this keystroke arm the leader? */
export declare function isLeaderKey(leader: LeaderConfig | null | undefined, event: KeyboardEvent): boolean;
/**
 * Which command follows an armed leader, or null.
 *
 * Modifier-free by design: after the prefix, a bare letter is the command, so
 * `⌃B |` and `⌃B ⇧\` both reach split-right without a second modifier table.
 */
export declare function matchLeaderBinding(keymap: readonly KeyBinding[], event: KeyboardEvent): LabCommand | null;
/**
 * Which command a keystroke means, or null.
 *
 * Modifiers are matched exactly. Without that, `⌘⇧←` and `⌘←` both match a
 * binding that only checks for the meta key, and the unshifted chord — which
 * the browser uses for history navigation — silently moves pane focus.
 */
export declare function matchBinding(keymap: readonly KeyBinding[], event: KeyboardEvent): LabCommand | null;
/** Bindings grouped for the help sheet, in the order groups are declared. */
export declare function groupBindings(keymap: readonly KeyBinding[]): Array<{
    group: KeyBinding['group'];
    bindings: KeyBinding[];
}>;
/** Look up a chord's display label, for a button's tooltip. */
export declare function labelFor(keymap: readonly KeyBinding[], command: LabCommand): string | null;
//# sourceMappingURL=keymap.d.ts.map