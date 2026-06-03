import { type ReactNode } from 'react';
export interface Command {
    id: string;
    label: string;
    group?: string;
    hint?: string;
    keywords?: string[];
    icon?: ReactNode;
    /** Display-only shortcut glyphs rendered right-aligned in the item. */
    shortcut?: string[];
    /**
     * Active global hotkey that invokes `run()` without opening the palette.
     * Format: `[mod+|cmd+|meta+|ctrl+|shift+|alt+]<key>`. `mod` resolves to
     * cmd on macOS and ctrl elsewhere. The key portion is matched against
     * `KeyboardEvent.key` lowercased — so `?`, `/`, `k`, `arrowdown` all
     * work; multi-key chords are not supported in v1.
     */
    hotkey?: string;
    /** Visibility predicate — when returns false, the command is filtered out. */
    when?: () => boolean;
    /** Action invoked when the item is selected. */
    run: () => void | Promise<void>;
}
export interface CommandPaletteProviderProps {
    /**
     * Static command list. Optional: pure-registry consumers can pass
     * nothing and have pages contribute commands via `useRegisterCommand`.
     */
    commands?: Command[];
    /**
     * Synchronous derivation hook for query-dependent commands (URL paste,
     * UUID detection, etc.). Results are merged with the static `commands`
     * list before cmdk runs its own filter.
     */
    getDynamicCommands?: (query: string) => Command[];
    /**
     * Future hook — currently the keybinding is always cmd/ctrl + K. Accepted
     * for API forward-compat; ignored in v1.
     */
    toggleShortcut?: string[];
    /**
     * localStorage key for the most-recently-used command id list. Pass
     * `null` to disable persistence (useful for tests and SSR). Defaults
     * to `'cui:command-palette:recents'`.
     */
    recentsKey?: string | null;
    /** Maximum number of recent command ids to remember. Default: 5. */
    recentsLimit?: number;
    children: ReactNode;
}
export interface CommandPaletteProps {
    placeholder?: string;
    emptyState?: ReactNode;
    className?: string;
}
export interface CommandPaletteHintProps {
    className?: string;
}
export interface CommandPaletteController {
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpen: boolean;
    query: string;
}
export declare function useCommandPalette(): CommandPaletteController;
export declare function matchHotkey(e: KeyboardEvent, spec: string): boolean;
export declare function CommandPaletteProvider({ commands, getDynamicCommands, recentsKey, recentsLimit, children, }: CommandPaletteProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Register a command into the active CommandPaletteProvider for the lifetime
 * of the calling component. Registers on mount, unregisters on unmount.
 *
 * Re-registers whenever the `command` reference changes — wrap in `useMemo`
 * (or define the command outside the component) to avoid churn.
 */
export declare function useRegisterCommand(command: Command): void;
export declare function CommandPalette({ placeholder, emptyState, className, }?: CommandPaletteProps): import("react/jsx-runtime").JSX.Element;
export declare function CommandPaletteHint({ className }?: CommandPaletteHintProps): import("react/jsx-runtime").JSX.Element;
export default CommandPalette;
//# sourceMappingURL=CommandPalette.d.ts.map