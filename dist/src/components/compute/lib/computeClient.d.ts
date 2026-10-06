import type { Computer, ComputeProject, ComputeRuntimeStatus } from '../types';
export interface CreateComputerInput {
    label?: string;
    /** Project to charge this computer to. */
    projectId?: string;
}
/** A decoded SSE frame. Frames that are not JSON are dropped, not thrown. */
export type StreamEvent = Record<string, unknown>;
export interface ComputeClient {
    /** Runtime-wide deployment state. */
    getStatus(signal?: AbortSignal): Promise<ComputeRuntimeStatus>;
    /** The whole fleet, server-owned. */
    listComputers(signal?: AbortSignal): Promise<Computer[]>;
    /**
     * Mint a new session (microVM + workspace).
     *
     * Takes an object rather than a bare label because `projectId` is the field
     * that matters: a computer created without one is an anonymous charge
     * against the account, which is exactly what cost-centre tracking exists to
     * avoid.
     */
    createComputer(input?: CreateComputerInput): Promise<Computer>;
    /**
     * Projects a computer can be charged to, with their budgets.
     *
     * Optional: a deployment with no notion of projects simply omits it, and the
     * surface groups by computer as before rather than showing an empty rail.
     */
    listProjects?(signal?: AbortSignal): Promise<ComputeProject[]>;
    /** Re-adopt a session the server has forgotten but the client still knows. */
    adoptComputer(input: {
        sessionId: string;
        label: string;
        createdAt: string;
    }): Promise<void>;
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
    runTask(sessionId: string, body: {
        prompt: string;
        resume: boolean;
        model?: string;
    }, onEvent: (ev: StreamEvent) => void, signal?: AbortSignal): Promise<void>;
    /**
     * Run a shell command and stream its output. Resolves when it exits.
     *
     * `mode` is the server's vocabulary: `safe` runs only the allowlisted
     * commands, `full` runs a real shell. Anything needing a pipe, a quote, a
     * redirect or a subshell — which includes the workspace-listing commands in
     * `workspaceTree.ts` — requires `full`, and a deployment can disable full
     * mode entirely, so handle the 400.
     */
    runCommand(sessionId: string, body: {
        command: string;
        mode?: ExecMode;
        cwd?: string;
    }, onEvent: (ev: StreamEvent) => void, signal?: AbortSignal): Promise<void>;
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
export declare function createComputeClient(options?: ComputeClientOptions): ComputeClient;
//# sourceMappingURL=computeClient.d.ts.map