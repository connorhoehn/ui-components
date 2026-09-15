// Keyboard bindings for the lab.
//
// Deliberately NOT tmux. A leader key (⌃B, then a letter) is what you want
// when you already know tmux; it is a tax when you do not, because every
// command is two keystrokes and none of them are guessable. This is a UI for
// running agent shells, not a terminal multiplexer someone has spent years in,
// so the bindings are ordinary Mac chords you can guess and a help sheet lists
// all of them.
//
// ── What the browser will not let us have ──────────────────────────────────
// A page cannot intercept every chord. On macOS the browser keeps, and never
// forwards: ⌘T (new tab), ⌘N (new window), ⌘W (close tab), ⌘⇧T (reopen tab),
// ⌘L (address bar), ⌘D (bookmark), ⌘⇧N, ⌘Q, and ⌘1–9 (tab switching) in
// Chrome. So the obvious "⌘T for a new pane" is not available at any price —
// binding it produces a new browser tab and an operator who thinks the app is
// broken. The defaults below are chosen from what actually reaches us:
// ⌘⏎, ⌘⌫, ⌘K, ⌘/ and ⌘⇧-anything are all safe.
//
// ── Leader mode ────────────────────────────────────────────────────────────
// A tmux-style leader (press ⌃B, then a key) is genuinely good once you know
// it: it costs one modifier instead of three, it cannot collide with anything
// the browser or the shell wants, and it scales to far more commands than
// there are free chords. It is only bad as a *default*, because nothing about
// it is guessable.
//
// So both models exist and neither is privileged. With no leader configured
// the bindings are direct chords. Configure one and any binding marked
// `viaLeader` additionally answers to `leader → key`, which lets a host offer
// the tmux-shaped bindings to people who want them without taking the plain
// chords away from people who do not.
//
// Everything here is overridable. A host that wants different keys passes its
// own bindings; nothing in the component hardcodes a chord.

export type LabCommand =
  | 'focus-left'
  | 'focus-right'
  | 'focus-up'
  | 'focus-down'
  | 'split-right'
  | 'split-down'
  | 'close-pane'
  | 'zoom-pane'
  | 'next-kind'
  | 'jump'
  | 'toggle-broadcast'
  | 'focus-composer'
  | 'focus-rail'
  | 'leave-pane'
  | 'help'
  | 'exit';

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
export const TMUX_LEADER: LeaderConfig = { key: 'b', ctrl: true, label: '⌃B' };

/**
 * The defaults.
 *
 * ⌘ and ⌃ are accepted interchangeably so the same bindings work on a
 * non-Mac keyboard without a second table.
 */
export const DEFAULT_KEYMAP: readonly KeyBinding[] = [
  // Arrows for movement, because the panes are laid out in space and the
  // arrow keys are the only thing that means "over there" to everyone.
  { command: 'focus-left', leaderKey: 'h', key: 'ArrowLeft', meta: true, shift: true, label: '⌘⇧←', description: 'Focus the pane to the left', group: 'navigate' },
  { command: 'focus-right', leaderKey: 'l', key: 'ArrowRight', meta: true, shift: true, label: '⌘⇧→', description: 'Focus the pane to the right', group: 'navigate' },
  { command: 'focus-up', leaderKey: 'k', key: 'ArrowUp', meta: true, shift: true, label: '⌘⇧↑', description: 'Focus the pane above', group: 'navigate' },
  { command: 'focus-down', leaderKey: 'j', key: 'ArrowDown', meta: true, shift: true, label: '⌘⇧↓', description: 'Focus the pane below', group: 'navigate' },

  // ⌘T is what this wants to be and the browser will not give it up.
  { command: 'split-right', leaderKey: '|', key: 'Enter', meta: true, label: '⌘⏎', description: 'New pane beside this one', group: 'panes' },
  { command: 'split-down', leaderKey: '-', key: 'Enter', meta: true, shift: true, label: '⌘⇧⏎', description: 'New pane below this one', group: 'panes' },
  { command: 'close-pane', leaderKey: 'x', key: 'Backspace', meta: true, label: '⌘⌫', description: 'Close the focused pane', group: 'panes' },
  { command: 'zoom-pane', leaderKey: 'z', key: 'f', meta: true, shift: true, label: '⌘⇧F', description: 'Zoom the focused pane to fill the lab', group: 'panes' },
  { command: 'next-kind', leaderKey: 'e', key: 'e', meta: true, shift: true, label: '⌘⇧E', description: 'Switch this pane between shell, agent and anything else registered', group: 'panes' },

  { command: 'jump', leaderKey: 'w', key: 'k', meta: true, label: '⌘K', description: 'Jump to a computer or pane by name', group: 'navigate' },
  { command: 'focus-composer', leaderKey: ':', key: 'l', meta: true, shift: true, label: '⌘⇧L', description: 'Jump to the prompt bar', group: 'navigate' },
  // One key, three stops: panes → the computers list → the agents list →
  // panes. A cycle instead of a chord per list because the question it
  // answers — "get me to the rail" — is one question, and the second press is
  // cheaper to learn than a second chord. ⌘⇧U is unclaimed by Chrome
  // (view-source is ⌘⌥U); leader `r` for rail.
  { command: 'focus-rail', leaderKey: 'r', key: 'u', meta: true, shift: true, label: '⌘⇧U', description: 'Focus the rail — again for the agents list, again back to the panes', group: 'navigate' },

  // The keyboard's way OUT of a terminal. A shell consumes Tab (completion)
  // and Escape (vim, readline), so a keyboard user who tabbed into a pane had
  // no exit at all — WCAG 2.1.2, No Keyboard Trap. ⇧esc is what a shell never
  // wants, and it lands on the prompt bar because that is the control the
  // lab exists for; from there Tab walks the chrome as usual.
  { command: 'leave-pane', leaderKey: 'q', key: 'Escape', shift: true, label: '⇧esc', description: 'Leave the focused pane for the prompt bar — the keyboard way out of a terminal', group: 'navigate' },
  { command: 'toggle-broadcast', leaderKey: 's', key: 'b', meta: true, shift: true, label: '⌘⇧B', description: 'Send the prompt bar to every pane at once', group: 'lab' },
  { command: 'help', leaderKey: '?', key: '/', meta: true, label: '⌘/', description: 'Show these shortcuts', group: 'lab' },
  { command: 'exit', leaderKey: 'd', key: 'Escape', label: 'esc', description: 'Leave the lab', group: 'lab' },
];

/** Does this keystroke arm the leader? */
export function isLeaderKey(leader: LeaderConfig | null | undefined, event: KeyboardEvent): boolean {
  if (!leader) return false;
  if (leader.key.toLowerCase() !== event.key.toLowerCase()) return false;
  return (
    Boolean(leader.ctrl) === event.ctrlKey &&
    Boolean(leader.meta) === event.metaKey &&
    Boolean(leader.alt) === event.altKey
  );
}

/**
 * Which command follows an armed leader, or null.
 *
 * Modifier-free by design: after the prefix, a bare letter is the command, so
 * `⌃B |` and `⌃B ⇧\` both reach split-right without a second modifier table.
 */
export function matchLeaderBinding(
  keymap: readonly KeyBinding[],
  event: KeyboardEvent,
): LabCommand | null {
  const key = event.key.toLowerCase();
  return keymap.find((b) => b.leaderKey && b.leaderKey.toLowerCase() === key)?.command ?? null;
}

/**
 * Which command a keystroke means, or null.
 *
 * Modifiers are matched exactly. Without that, `⌘⇧←` and `⌘←` both match a
 * binding that only checks for the meta key, and the unshifted chord — which
 * the browser uses for history navigation — silently moves pane focus.
 */
export function matchBinding(
  keymap: readonly KeyBinding[],
  event: KeyboardEvent,
): LabCommand | null {
  // ⌘ on a Mac, ⌃ elsewhere. Treated as one modifier so a single table serves
  // both, at the cost of ⌃-chords also firing on a Mac — which is fine,
  // because none of the defaults collide with a terminal's ⌃ keys.
  const commandKey = event.metaKey || event.ctrlKey;
  for (const binding of keymap) {
    if (binding.key.toLowerCase() !== event.key.toLowerCase()) continue;
    if (Boolean(binding.meta || binding.ctrl) !== commandKey) continue;
    if (Boolean(binding.shift) !== event.shiftKey) continue;
    if (Boolean(binding.alt) !== event.altKey) continue;
    return binding.command;
  }
  return null;
}

/** Bindings grouped for the help sheet, in the order groups are declared. */
export function groupBindings(
  keymap: readonly KeyBinding[],
): Array<{ group: KeyBinding['group']; bindings: KeyBinding[] }> {
  const order: Array<KeyBinding['group']> = ['panes', 'navigate', 'lab'];
  return order
    .map((group) => ({ group, bindings: keymap.filter((b) => b.group === group) }))
    .filter((entry) => entry.bindings.length > 0);
}

/** Look up a chord's display label, for a button's tooltip. */
export function labelFor(keymap: readonly KeyBinding[], command: LabCommand): string | null {
  return keymap.find((b) => b.command === command)?.label ?? null;
}
