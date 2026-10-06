/** Reject `onSend` with this to show `message` in the composer's alert. */
export declare class ComposerSendError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}
/**
 * The person-facing reason carried by a rejected send, or null for the
 * generic alert. Matched by `name`, not `instanceof`: a host and the library
 * can load two copies of this module (a lazy chunk, a linked package), and a
 * reason must survive that.
 */
export declare function composerSendErrorReason(error: unknown): string | null;
//# sourceMappingURL=composerSendError.d.ts.map