// How the lab's chrome borrows the host's palette.
//
// The lab is written once, in the code family (Catppuccin), because that is
// what a terminal multiplexer is. Dropped inline into a light application it
// then reads as a dark slab someone embedded — the "feels like an iframe"
// complaint. Rather than fork every class string into a light and a dark
// spelling, the *variables* are re-pointed on the chrome containers and every
// `text-code-*` / `bg-code-*` class in there resolves to an app token instead.
//
// WHERE THIS MAY BE APPLIED is the whole design. Custom properties inherit, so
// this must go on the chrome — top bar, rail, command line, the two dialogs —
// and never on the lab's root or on the pane field, or it repaints the
// terminals too and a light terminal is not a terminal. The rule that keeps it
// straight: the pane frame IS the theme boundary. Everything inside a
// TitledFrame (title row, canvas, status line) is pane-side and stays on the
// code family; everything outside it is app-side.
//
// Extracted from ComputerLab so the chooser and the shortcut sheet — which
// render as siblings of the chrome, not children of it — can apply the same
// map without importing back into the component that renders them.

import type { CSSProperties } from 'react';

/** Which palette a lab surface paints in. */
export type ChromeTone = 'code' | 'app';

export const APP_CHROME_VARS = {
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

  // ── Accents ──────────────────────────────────────────────────────────────
  //
  // The first pass deliberately left these alone, on the reasoning that they
  // carry meaning (running / error / expiring / broadcast) and translating
  // them would cost the meaning. Half of that holds and half does not.
  //
  // What holds: inside a PANE the accents are status, and they are read
  // against `terminal-bg`, so they stay Catppuccin — PaneStatusLine and the
  // pane frames sit outside every remapped container for exactly that reason.
  //
  // What does not: inside the CHROME the accents are not status at all. Nothing
  // in the top bar, the rail or the command line reports a computer's state
  // through them — the status dots read `COMPUTE_STATUS.color` and the chips
  // take a design-system `tone`, both of which already flip with the host
  // theme. What the code accents actually colour here is affordances: `send`,
  // `new`, `connect`, the armed-broadcast border, the selected window tab, the
  // LAB wordmark. Catppuccin's accents are pastels tuned for a near-black
  // ground, and on #f8fafc chrome every one of them lands between 1.4:1 and
  // 1.9:1 — the send button was, measurably, the least legible thing on the
  // command line.
  //
  // So the accents are re-pointed at the semantic tone scale, which preserves
  // the *meaning* (green go, orange armed, blue selected, red destructive)
  // while inheriting contrast that was chosen per theme. The two used as fills
  // with `text-code-bg` on top — the active window tab and the leader pill —
  // stay legible in both directions because `code-bg` remaps to `surface`,
  // which is light where the tone is dark and dark where the tone is light.
  '--color-code-green': 'var(--color-success)',
  '--color-code-red': 'var(--color-danger)',
  '--color-code-blue': 'var(--color-info)',
  '--color-code-peach': 'var(--color-caution)',
  // Mauve is the family's identity colour — the LAB wordmark, the shortcut
  // sheet's group headings, the selected project's rule. `--color-primary`
  // rather than the semantic `accent` purple on purpose: those are the marks
  // that say whose surface this is, and the answer inline is "the host's". A
  // lab that signs itself in the app's own brand colour is a lab that belongs
  // to the app.
  '--color-code-mauve': 'var(--color-primary)',
  '--color-code-yellow': 'var(--color-warning)',
} as CSSProperties;

/**
 * The remap for a tone, or `undefined` to leave the code family alone.
 *
 * Returning `undefined` rather than an empty object matters: React skips the
 * `style` attribute entirely, so a `code`-toned lab carries no inline custom
 * properties at all and the tests can assert on their absence.
 */
export function chromeVarsFor(tone: ChromeTone): CSSProperties | undefined {
  return tone === 'app' ? APP_CHROME_VARS : undefined;
}
