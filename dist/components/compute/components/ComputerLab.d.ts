import { type KeyBinding, type LeaderConfig } from '../lib/keymap';
import { type ChromeTone } from '../lib/chromeTokens';
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
    className?: string;
}
export declare function ComputerLab({ open, onClose, focusComputerId, variant, chrome: chromeTone, keymap, leader, idleWindowMs, className, }: ComputerLabProps): import("react").JSX.Element | null;
//# sourceMappingURL=ComputerLab.d.ts.map