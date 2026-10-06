export interface KeyboardShortcut {
    /** Key to match (case-insensitive, e.g., 's', 'Enter', 'Escape') */
    key: string;
    /** Require Cmd/Ctrl modifier */
    meta?: boolean;
    /** Require Shift modifier */
    shift?: boolean;
    /** Require Alt/Option modifier */
    alt?: boolean;
    /** Callback to invoke when shortcut matches */
    handler: (e: KeyboardEvent) => void;
    /** Prevent default browser action (default: true) */
    preventDefault?: boolean;
}
/**
 * Register keyboard shortcuts with automatic cleanup.
 * Shortcuts are skipped when typing in input/textarea/contentEditable elements.
 *
 * @example
 * useKeyboardShortcuts([
 *   { key: 's', meta: true, handler: save },
 *   { key: 'Enter', meta: true, handler: run },
 *   { key: 'Escape', handler: clearSelection, preventDefault: false },
 * ]);
 */
export declare function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void;
//# sourceMappingURL=useKeyboardShortcuts.d.ts.map