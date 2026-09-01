/**
 * Modes that survive a reload. Canonical vocabulary ('window', not the
 * pre-2.106 'docked') — see ./callWidgetMode. The value written to
 * localStorage keeps the LEGACY spelling so a rollback to an older build
 * still reads back the window state it wrote; the translation happens at
 * the storage boundary only.
 */
export type PersistedWidgetMode = 'mini' | 'window';
export interface PersistedWidgetState {
    mode: PersistedWidgetMode;
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface UseCallWidgetPersistenceOptions {
    /** localStorage key. When undefined, the hook is a no-op (state lives
     *  only in memory) — useful for tests and for ephemeral consumers. */
    persistKey: string | undefined;
    /** Defaults written if no key exists yet (or storage is empty). */
    defaults: PersistedWidgetState;
    /** Debounce window for writes. Default 200ms. */
    debounceMs?: number;
}
export declare function useCallWidgetPersistence({ persistKey, defaults, debounceMs, }: UseCallWidgetPersistenceOptions): {
    state: PersistedWidgetState;
    setState: (next: Partial<PersistedWidgetState>) => void;
};
//# sourceMappingURL=useCallWidgetPersistence.d.ts.map