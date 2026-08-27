// The AgentCore shell wire format, browser-side.
//
// Kubernetes' `v5.channel.k8s.io`: one channel byte, then the payload. The
// AWS SDK's framer is Node-only (it uses Buffer), and the format is a single
// leading byte, so a browser-native version is smaller than the polyfill.
//
// Source of truth is `src/runtime/shell/protocol.ts` in
// aws/bedrock-agentcore-sdk-typescript. If a frame ever decodes wrong, diff
// against that file first.

/** Server→client: 1, 2, 3. Client→server: 0, 4, 5. Either direction: 0xff. */
export const SHELL_CHANNEL = {
  STDIN: 0x00,
  STDOUT: 0x01,
  STDERR: 0x02,
  STATUS: 0x03,
  RESIZE: 0x04,
  HEARTBEAT: 0x05,
  CLOSE: 0xff,
} as const;

/** Frames above this are rejected by the service with close code 1009. */
export const MAX_FRAME_BYTES = 65_536;

/** Ctrl-] detaches: drop the socket, leave the shell alive. */
export const DETACH_BYTE = 0x1d;

export const HEARTBEAT_MS = 30_000;

/** Bounded, because a quota rejection never clears by retrying. */
export const MAX_RETRIES = 5;

/** Prefix a payload with its channel byte. */
export function encodeFrame(channel: number, payload?: Uint8Array): Uint8Array {
  const body = payload ?? new Uint8Array(0);
  const out = new Uint8Array(body.length + 1);
  out[0] = channel;
  out.set(body, 1);
  return out;
}

export function encodeResize(cols: number, rows: number): Uint8Array {
  return encodeFrame(
    SHELL_CHANNEL.RESIZE,
    new TextEncoder().encode(JSON.stringify({ width: cols, height: rows })),
  );
}

/**
 * What to do about a close code, and what to tell the operator.
 *
 * Two must NOT retry: 1003 means we sent text on a binary-only socket, so
 * reconnecting repeats the mistake; 4000 means another client claimed this
 * shell, and retrying would have two operators fighting over one terminal.
 */
export function closeAdvice(code: number): { retry: boolean; text: string } {
  switch (code) {
    case 1000: return { retry: false, text: 'shell exited' };
    case 1001: return { retry: true, text: 'server going away — reconnecting' };
    case 1003: return { retry: false, text: 'protocol error (binary frames only)' };
    case 1006: return { retry: true, text: 'connection lost — reconnecting' };
    case 1008: return { retry: true, text: 'session limit reached — reconnecting' };
    case 1009: return { retry: false, text: 'frame too large — paste under 64 KB' };
    case 1011: return { retry: true, text: 'server error — reconnecting' };
    case 4000: return { retry: false, text: 'attached from another client' };
    default: return { retry: false, text: `closed (${code})` };
  }
}

/**
 * A spent 1006 is almost always the shell quota.
 *
 * A runtime already holding ten shells rejects the WebSocket upgrade, and a
 * failed upgrade reaches the browser as 1006 — indistinguishable from a
 * dropped network. Retrying can never clear a quota, so once the attempts are
 * spent, say what it probably is.
 */
export function exhaustedAdvice(code: number, retries: number): string | null {
  if (code === 1006 && retries >= MAX_RETRIES) {
    return 'could not connect — the runtime may already hold 10 shells; close one and retry';
  }
  return null;
}

/** Shape of a `STATUS` frame, as far as we read it. */
export interface ShellStatusFrame {
  metadata?: { shellId?: string; reconnected?: boolean; bytesDropped?: number };
  details?: { causes?: Array<{ reason?: string; message?: string }> };
}

/** Pull the exit code out of a status frame, or null when it carries none. */
export function exitCodeOf(frame: ShellStatusFrame): number | null {
  const raw = (frame.details?.causes ?? []).find((c) => c.reason === 'ExitCode')?.message;
  if (raw == null) return null;
  const code = Number.parseInt(raw, 10);
  return Number.isNaN(code) ? null : code;
}
