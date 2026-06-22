export type PersistedWidgetMode = 'mini' | 'docked';
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