/** Server→client: 1, 2, 3. Client→server: 0, 4, 5. Either direction: 0xff. */
export declare const SHELL_CHANNEL: {
    readonly STDIN: 0;
    readonly STDOUT: 1;
    readonly STDERR: 2;
    readonly STATUS: 3;
    readonly RESIZE: 4;
    readonly HEARTBEAT: 5;
    readonly CLOSE: 255;
};
/** Frames above this are rejected by the service with close code 1009. */
export declare const MAX_FRAME_BYTES = 65536;
/** Ctrl-] detaches: drop the socket, leave the shell alive. */
export declare const DETACH_BYTE = 29;
export declare const HEARTBEAT_MS = 30000;
/** Bounded, because a quota rejection never clears by retrying. */
export declare const MAX_RETRIES = 5;
/** Prefix a payload with its channel byte. */
export declare function encodeFrame(channel: number, payload?: Uint8Array): Uint8Array<ArrayBuffer>;
export declare function encodeResize(cols: number, rows: number): Uint8Array<ArrayBuffer>;
/**
 * What to do about a close code, and what to tell the operator.
 *
 * Two must NOT retry: 1003 means we sent text on a binary-only socket, so
 * reconnecting repeats the mistake; 4000 means another client claimed this
 * shell, and retrying would have two operators fighting over one terminal.
 */
export declare function closeAdvice(code: number): {
    retry: boolean;
    text: string;
};
/**
 * A spent 1006 is almost always the shell quota.
 *
 * A runtime already holding ten shells rejects the WebSocket upgrade, and a
 * failed upgrade reaches the browser as 1006 — indistinguishable from a
 * dropped network. Retrying can never clear a quota, so once the attempts are
 * spent, say what it probably is.
 */
export declare function exhaustedAdvice(code: number, retries: number): string | null;
/** Shape of a `STATUS` frame, as far as we read it. */
export interface ShellStatusFrame {
    metadata?: {
        shellId?: string;
        reconnected?: boolean;
        bytesDropped?: number;
    };
    details?: {
        causes?: Array<{
            reason?: string;
            message?: string;
        }>;
    };
}
/** Pull the exit code out of a status frame, or null when it carries none. */
export declare function exitCodeOf(frame: ShellStatusFrame): number | null;
//# sourceMappingURL=shellProtocol.d.ts.map