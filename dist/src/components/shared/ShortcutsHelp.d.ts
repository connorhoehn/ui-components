/** One row: a key combination and what it does. */
export interface ShortcutsHelpRow {
    /**
     * The combination. A string is rendered as a single key cap exactly as
     * written (`'⌘/Ctrl + S'`); an array renders one cap per element
     * (`['⌘', 'S']`), which is what a host that stores its bindings
     * structurally already has in hand.
     */
    keys: string | string[];
    /** What the shortcut does. `label` is an accepted alias. */
    action?: string;
    /** Alias for `action`. */
    label?: string;
    /** Documented but not wired: rendered dimmed, struck through, tagged. */
    planned?: boolean;
}
export interface ShortcutsHelpSection {
    title: string;
    /** The rows. `shortcuts` is an accepted alias. */
    rows?: ShortcutsHelpRow[];
    /** Alias for `rows`. */
    shortcuts?: ShortcutsHelpRow[];
}
export interface ShortcutsHelpProps {
    open: boolean;
    onClose: () => void;
    /**
     * The bindings to document. Defaults to this library's own rows.
     *
     * It has to be a prop because the built-in list is a list of THIS
     * library's shortcuts, and a host's keys are not those keys. A consumer
     * whose bindings differed had no way to say so, so it kept a whole second
     * copy of this overlay rather than tell its users the wrong thing about
     * their own keyboard — which is the worse of the two failures, and the
     * reason the default is left exactly as it was.
     */
    sections?: ShortcutsHelpSection[];
}
export default function ShortcutsHelp({ open, onClose, sections }: ShortcutsHelpProps): import("react").JSX.Element;
//# sourceMappingURL=ShortcutsHelp.d.ts.map