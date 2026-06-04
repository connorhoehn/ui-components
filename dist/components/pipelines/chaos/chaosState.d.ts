export interface ChaosState {
    /** Additional milliseconds added to every sleep in the executor. */
    injectedLatencyMs: number;
    /** Extra failure probability stacked on top of the base per-node rate (0..1). */
    injectedFailureRate: number;
    /** When true, the executor polls rather than advancing. */
    paused: boolean;
}
export declare function getChaosState(): ChaosState;
export declare function setChaosState(patch: Partial<ChaosState>): void;
export declare function resetChaosState(): void;
export declare function subscribeChaosState(listener: (s: ChaosState) => void): () => void;
//# sourceMappingURL=chaosState.d.ts.map