// The seam between this module and whatever serves the fleet.
//
// Everything that touches the network goes through `ComputeClient`, so the
// components stay honest about their inputs and a host can swap in its own
// transport (a different base path, auth headers, a mock in Storybook)
// without forking a component. `createComputeClient` is the reference
// implementation against the AgentCore devbox routes.

import type { Computer, ComputeRuntimeStatus } from '../types';

/** A decoded SSE frame. Frames that are not JSON are dropped, not thrown. */
export type StreamEvent = Record<string, unknown>;

export interface ComputeClient {
  /** Runtime-wide deployment state. */
  getStatus(signal?: AbortSignal): Promise<ComputeRuntimeStatus>;
  /** The whole fleet, server-owned. */
  listComputers(signal?: AbortSignal): Promise<Computer[]>;
  /** Mint a new session (microVM + workspace). */
  createComputer(label?: string): Promise<Computer>;
  /** Re-adopt a session the server has forgotten but the client still knows. */
  adoptComputer(input: { sessionId: string; label: string; createdAt: string }): Promise<void>;
  renameComputer(id: string, label: string): Promise<void>;
  /** Drop the box from the registry. The workspace survives until idle expiry. */
  removeComputer(id: string): Promise<void>;
  /**
   * Stop the session. The workspace persists; the next invoke resumes it.
   *
   * Takes the runtime **session id**, not the registry id. The server rejects
   * anything under 33 characters, and a `Computer.id` passed here (it is the
   * last 8 characters of the session) fails with a 400 that reads like a
   * server bug.
   */
  stopSession(sessionId: string): Promise<void>;
  /** Run an agent task. Resolves when the stream ends. */
  runTask(
    sessionId: string,
    body: { prompt: string; resume: boolean; model?: string },
    onEvent: (ev: StreamEvent) => void,
    signal?: AbortSignal,
  ): Promise<void>;
  /**
   * Run a shell command and stream its output. Resolves when it exits.
   *
   * `mode` is the server's vocabulary: `safe` runs only the allowlisted
   * commands, `full` runs a real shell. Anything needing a pipe, a quote, a
   * redirect or a subshell — which includes the workspace-listing commands in
   * `workspaceTree.ts` — requires `full`, and a deployment can disable full
   * mode entirely, so handle the 400.
   */
  runCommand(
    sessionId: string,
    body: { command: string; mode?: ExecMode; cwd?: string },
    onEvent: (ev: StreamEvent) => void,
    signal?: AbortSignal,
  ): Promise<void>;
  /** Presigned WebSocket URL for an interactive PTY. */
  getShellUrl(sessionId: string, shellId?: string): Promise<ShellUrl>;
  /**
   * How to tail a box's run events.
   *
   * Not a bare string, because `EventSource` cannot carry headers: a host
   * authenticating with `headers` would get a 401 here while every other
   * route worked. `withCredentials` is what a cookie-authenticated
   * deployment needs; `headers` is returned so a host using header auth knows
   * it must tail some other way rather than silently failing.
   */
  tail(boxId: string): TailTarget;
}

/** Server-side execution mode. Mirrors the middleware's own union. */
export type ExecMode = 'safe' | 'full';

export interface ShellUrl {
  url: string;
  shellId?: string;
  /**
   * Seconds the presigned URL stays valid (the server clamps to 30–900).
   * A connection must be opened inside this window; it does not bound the
   * life of the shell once attached.
   */
  expiresIn?: number;
  /**
   * Largest frame the service will accept. Authoritative — prefer it over the
   * client-side constant, which is only a fallback for a server that omits it.
   */
  maxFrameBytes?: number;
}

export interface TailTarget {
  url: string;
  /** Pass to `new EventSource(url, { withCredentials })`. */
  withCredentials: boolean;
  /** Headers the client was configured with; `EventSource` cannot send them. */
  headers: Record<string, string>;
}

export interface ComputeClientOptions {
  /** Base path of the fleet API. Default `/api/devbox`. */
  baseUrl?: string;
  /** Extra headers on every request — auth, tenant, tracing. */
  headers?: Record<string, string>;
  /**
   * Cookie policy. Default `'include'`, because the reference backend gates
   * every route on a session cookie.
   */
  credentials?: RequestCredentials;
  /** Swappable for tests. Defaults to the global `fetch`. */
  fetchImpl?: typeof fetch;
}

/**
 * Pull the server's error message out of a failed response.
 *
 * A bare `HTTP 403` is the least useful thing to put in front of an operator
 * when the body says "requires the ManageDevbox capability".
 */
async function failure(res: Response): Promise<Error> {
  let message = `HTTP ${res.status}`;
  try {
    const body = (await res.json()) as { error?: string; message?: string };
    message = body.error ?? body.message ?? message;
  } catch {
    /* not JSON — the status is all we have */
  }
  return new Error(message);
}

export function createComputeClient(options: ComputeClientOptions = {}): ComputeClient {
  const {
    baseUrl = '/api/devbox',
    headers = {},
    credentials = 'include',
    fetchImpl,
  } = options;

  // Resolved per call rather than captured, so a host that installs a fetch
  // wrapper after this client is built still gets it.
  const http = (input: RequestInfo | URL, init?: RequestInit) =>
    (fetchImpl ?? globalThis.fetch)(input, init);

  const json = async <T,>(path: string, init?: RequestInit): Promise<T> => {
    const res = await http(`${baseUrl}${path}`, {
      credentials,
      ...init,
      headers: { ...headers, ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...init?.headers },
    });
    if (!res.ok) throw await failure(res);
    return (await res.json()) as T;
  };

  const send = async (path: string, init: RequestInit): Promise<void> => {
    const res = await http(`${baseUrl}${path}`, {
      credentials,
      ...init,
      headers: { ...headers, ...(init.body ? { 'Content-Type': 'application/json' } : {}), ...init.headers },
    });
    if (!res.ok) throw await failure(res);
  };

  /**
   * Read an SSE stream opened with POST.
   *
   * Not `EventSource`: that is GET-only, and every streaming route here needs
   * a request body. Frames are split on the blank-line delimiter and parsed
   * individually — a partial or non-JSON frame is skipped rather than
   * killing a stream that is otherwise fine.
   */
  const stream = async (
    path: string,
    body: unknown,
    onEvent: (ev: StreamEvent) => void,
    signal?: AbortSignal,
  ): Promise<void> => {
    const res = await http(`${baseUrl}${path}`, {
      method: 'POST',
      credentials,
      headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream', ...headers },
      body: JSON.stringify(body),
      ...(signal ? { signal } : {}),
    });
    if (!res.ok) throw await failure(res);
    if (!res.body) throw new Error('empty response body');

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const frames = buffer.split('\n\n');
      // The tail is whatever arrived after the last delimiter — an incomplete
      // frame. It stays buffered until the rest of it turns up.
      buffer = frames.pop() ?? '';
      for (const frame of frames) {
        const line = frame.trim();
        if (!line.startsWith('data:')) continue;
        try {
          onEvent(JSON.parse(line.slice(5).trim()) as StreamEvent);
        } catch {
          /* partial or non-JSON frame */
        }
      }
    }
  };

  return {
    getStatus: (signal) =>
      json<ComputeRuntimeStatus>('/status', signal ? { signal } : {}),

    listComputers: async (signal) => {
      const { boxes } = await json<{ boxes: Computer[] }>('/boxes', signal ? { signal } : {});
      return boxes;
    },

    createComputer: (label) =>
      json<Computer>('/boxes', { method: 'POST', body: JSON.stringify(label ? { label } : {}) }),

    adoptComputer: (input) =>
      send('/boxes', { method: 'POST', body: JSON.stringify(input) }),

    renameComputer: (id, label) =>
      send(`/boxes/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ label }) }),

    removeComputer: (id) =>
      send(`/boxes/${encodeURIComponent(id)}`, { method: 'DELETE' }),

    stopSession: (sessionId) =>
      send(`/${encodeURIComponent(sessionId)}`, { method: 'DELETE' }),

    runTask: (sessionId, body, onEvent, signal) =>
      stream(`/${encodeURIComponent(sessionId)}/task`, body, onEvent, signal),

    runCommand: (sessionId, body, onEvent, signal) =>
      stream(`/${encodeURIComponent(sessionId)}/command`, body, onEvent, signal),

    getShellUrl: (sessionId, shellId) =>
      json<ShellUrl>(`/${encodeURIComponent(sessionId)}/shell-url`, {
        method: 'POST',
        body: JSON.stringify(shellId ? { shellId } : {}),
      }),

    tail: (boxId) => ({
      url: `${baseUrl}/boxes/${encodeURIComponent(boxId)}/tail`,
      withCredentials: credentials === 'include',
      headers,
    }),
  };
}
