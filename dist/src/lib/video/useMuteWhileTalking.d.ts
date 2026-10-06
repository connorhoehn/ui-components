interface UseMuteWhileTalkingOptions {
    localStream: MediaStream | null;
    isMuted: boolean;
    /** dB threshold for "talking". Default -45 — well above ambient. */
    threshold?: number;
    /** Sustained talking duration (ms) before the toast fires. Default 1500. */
    triggerMs?: number;
    /** Cool-down between toast fires (ms). Default 6000. */
    cooldownMs?: number;
}
export declare function useMuteWhileTalking({ localStream, isMuted, threshold, triggerMs, cooldownMs, }: UseMuteWhileTalkingOptions): boolean;
export {};
//# sourceMappingURL=useMuteWhileTalking.d.ts.map