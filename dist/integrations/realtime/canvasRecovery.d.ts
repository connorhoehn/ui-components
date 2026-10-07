export interface CanvasRecovery {
    version: 1;
    savedAt: string;
    snapshot: string;
}
/** Storage key partitioned by verified identity and document; a grant is never stored. */
export declare function canvasRecoveryKey(tenant: string, subject: string, documentId: string, prefix?: string): string;
export declare function encodeCanvasRecovery(bytes: Uint8Array): CanvasRecovery;
export declare function decodeCanvasRecovery(value: unknown): Uint8Array | null;
//# sourceMappingURL=canvasRecovery.d.ts.map