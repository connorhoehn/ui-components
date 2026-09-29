import { ForwardRefExoticComponent } from 'react';
import { JSX } from 'react';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';

/**
 * Build a tree from `find -printf "%y %p"` output.
 *
 * Markers: `d` directory, `f` (and anything else) file, `p` a directory that
 * was pruned. Pruned entries are kept as unexpandable stubs so `node_modules`
 * shows as present-but-not-listed rather than silently vanishing — a missing
 * directory and an unlisted one look identical otherwise.
 */
export declare function buildWorkspaceTree(lines: string[]): WorkspaceNode[];

export declare type ChooserRow = {
    kind: 'pane';
    id: string;
    pane: PaneLeaf;
    computer: Computer;
} | {
    kind: 'computer';
    id: string;
    computer: Computer;
} | {
    kind: 'project';
    id: string;
    project: ProjectRollup;
};

/** Which palette a lab surface paints in. */
declare type ChromeTone = 'code' | 'app';

/** Clear everything this module persists. For a tenant or account switch. */
export declare function clearComputeStorage(): void;

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
 * Remove a pane; its sibling takes the split's place.
 *
 * Returns the root unchanged when `paneId` is the only pane — a window with
 * no panes has nothing to render and no way back, so the last one is not
 * closeable. The caller closes the window instead.
 */
export declare function closePane(root: PaneNode, paneId: string): PaneNode;

export declare function closeShell(id: string): void;

export declare const COMPUTE_STATUS: Record<ComputeStatus, StatusMeta>;

/**
 * All of them. Enumerate this rather than listing keys by hand — a key added
 * in a later version is then cleared without the host changing anything.
 */
export declare const COMPUTE_STORAGE_KEYS: readonly string[];

export declare interface ComputeClient {
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

export declare interface ComputeClientOptions {
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

export declare interface ComputeContextValue {
    client: ComputeClient;
    computers: Computer[];
    /** `'fixture'` means the fleet on screen is sample data. Say so in the UI. */
    source: ComputeSource;
    isLoading: boolean;
    error: string | null;
    runtime: ComputeRuntimeStatus | null;
    runtimeError: string | null;
    /** Models offered in the composer, already filtered by the runtime allowlist. */
    models: ComputeModel[];
    /**
     * Projects a computer can be charged to, joined to the live fleet.
     *
     * Empty when the deployment has no notion of projects — surfaces should
     * fall back to grouping by computer rather than rendering an empty rail.
     */
    projects: ProjectRollup[];
    /** True when projects are unavailable here, as opposed to merely none existing. */
    projectsAbsent: boolean;
    /**
     * Whether the operator may mutate anything — provision, stop, remove, run.
     * The reference deployment gates these on a `ManageDevbox` capability;
     * read-only viewers still get the whole surface, minus the buttons.
     */
    canManage: boolean;
    /**
     * Pane kinds available in the multiplexer, in toggle order. The first is
     * what a new pane gets.
     */
    paneKinds: PaneKindRegistry;
    refresh: () => Promise<void>;
    create: (input?: CreateComputerInput) => Promise<Computer>;
    rename: (id: string, label: string) => Promise<void>;
    remove: (id: string) => Promise<void>;
    stop: (sessionId: string) => Promise<void>;
    /** Host-supplied toast sink. Defaults to a no-op. */
    notify: (notice: ComputeNotice) => void;
}

export declare function ComputeDock({ hotkeys, reconcile, className }: ComputeDockProps): JSX.Element | null;

export declare interface ComputeDockProps {
    /**
     * Bindings for the dock's own keys. Defaults on; pass false where the host
     * owns the keyboard, or where the dock is embedded in a surface that already
     * binds these chords.
     */
    hotkeys?: boolean;
    /**
     * Reconcile open tabs against the live fleet. Default true when a
     * ComputeProvider is above; a tab whose computer no longer exists can never
     * connect, and it sits there failing in a way indistinguishable from a
     * service problem.
     */
    reconcile?: boolean;
    className?: string;
}

/** A model the box will accept for an agent task. */
export declare interface ComputeModel {
    /** Sent verbatim to the container — a Bedrock inference-profile id. */
    id: string;
    label: string;
    hint: string;
}

export declare interface ComputeNotice {
    tone: 'success' | 'error' | 'info';
    title: string;
    detail?: string;
}

/**
 * A project a computer can be charged to.
 *
 * Budgets live here rather than on the box because a project outlives any
 * individual computer: boxes are provisioned, reaped on idle and re-created
 * constantly, and a budget that died with the box would be useless. The
 * numbers are all optional because a host may know some and not others —
 * render what you have and say nothing about the rest, rather than showing a
 * confident zero.
 */
export declare interface ComputeProject {
    id: string;
    name: string;
    /** Allocated for the current period. */
    budgetUsd?: number;
    /** Spent against `budgetUsd` so far this period. */
    spentUsd?: number;
    /**
     * Recurring cost of simply keeping this project's automation running — the
     * floor an allocation has to clear before any new work fits inside it. Shown
     * against the budget because "60% spent" means something very different when
     * half of it is a floor nobody chose this month.
     */
    maintenanceUsd?: number;
    /** Tokens consumed this period, and the ceiling if the host enforces one. */
    tokensUsed?: number;
    tokenBudget?: number;
    /** Automations attached to this project. */
    botCount?: number;
    /** ISO date the budget period resets, for the meter's note. */
    periodResetsAt?: string;
}

export declare function ComputeProvider({ children, client: providedClient, clientOptions, computers: providedComputers, useFixtures, pollIntervalMs, canManage, enabled, models: providedModels, projects: providedProjects, paneKinds, onNotify, }: ComputeProviderProps): JSX.Element;

export declare interface ComputeProviderProps {
    children: ReactNode;
    /** Bring your own transport. Overrides `clientOptions`. */
    client?: ComputeClient;
    /** Configure the reference client — base path, headers, credentials. */
    clientOptions?: ComputeClientOptions;
    /** Host-supplied fleet. Wins over the network; useful for stories. */
    computers?: Computer[];
    /** Render sample data when nothing real is available. Default true. */
    useFixtures?: boolean;
    /** Poll interval for the fleet. 0 disables. Default 5s. */
    pollIntervalMs?: number;
    /** Default false is deliberate: never render mutating controls on a guess. */
    canManage?: boolean;
    /**
     * Whether to talk to the backend at all. Default true.
     *
     * Set false for a viewer who cannot reach the API. A deployment is very
     * likely to gate the whole compute router on one capability — the reference
     * one gates every route on `ManageDevbox` — and a provider mounted high in
     * an app shell polls on a timer for *every* user on *every* page. Without
     * this, that is a 403 every few seconds per unauthorized user, plus one
     * status call per mount, and it is invisible in development because the
     * developer is always authorized.
     *
     * Disabled, the provider fetches nothing and reports an empty fleet, so the
     * surface can still mount and render its own empty state.
     */
    enabled?: boolean;
    /** Full model catalogue; intersected with the runtime's allowlist. */
    models?: ComputeModel[];
    /** Host-supplied projects. Wins over the client's `listProjects`. */
    projects?: ComputeProject[];
    /**
     * Replace or extend the pane kinds. Defaults to the built-in agent and
     * terminal panes; pass `[...DEFAULT_PANE_KINDS, myKind]` to add one, or an
     * entirely different list to take over. Order is the toggle order, and the
     * first entry is the default kind for a new pane.
     */
    paneKinds?: PaneKindRegistry;
    onNotify?: (notice: ComputeNotice) => void;
}

export declare interface Computer {
    /** Short registry id — the handle every route and query string uses. */
    id: string;
    /** Operator-facing name, e.g. `computer-1`. */
    label: string;
    /** AgentCore runtimeSessionId. Must be ≥33 chars; this is the real address. */
    sessionId: string;
    /** ISO timestamp. */
    createdAt: string;
    status?: ComputeStatus;
    lastActivityAt?: string;
    /**
     * Milliseconds until the reaper stops this box — the sooner of the two
     * deadlines below.
     *
     * Absent on a box just returned from a create or a rename: the server
     * attaches the countdown only when listing the fleet. Treat "no deadline"
     * as unknown, never as "never expires".
     */
    stopsInMs?: number;
    /** Milliseconds of idleness left before the reaper stops it. */
    idleMsLeft?: number;
    /** Milliseconds until the hard lifetime ceiling, regardless of activity. */
    lifetimeMsLeft?: number;
    /** One-line description of the run in flight, when there is one. */
    currentTask?: string;
    lastResult?: ComputeRunResult;
    /**
     * The project this box is charged to.
     *
     * This is what makes a computer a cost centre rather than an anonymous
     * charge against the account. It is also the single most useful field on a
     * pane you are not looking at: a fleet named `computer-1..6` is unreadable,
     * and the same fleet grouped by what each one is working on is a dashboard.
     */
    projectId?: string;
    /** Display name for `projectId`, denormalised so a row renders without a join. */
    project?: string;
    /** Dollars charged to this box so far, across every run on it. */
    spendUsd?: number;
    /** Tokens consumed by this box so far. Tracked apart from dollars — see `ComputeProject`. */
    tokensUsed?: number;
    /** Absolute path the workspace was cloned into, when the host knows it. */
    workspace?: string;
    /**
     * Fraction (0–1) of the agent's context window in use on this box.
     *
     * Optional because it is only known when the runtime reports it — a box
     * that has never run, or an older image, simply has no number, and the
     * status line omits the field rather than showing a confident zero.
     */
    contextUsed?: number;
    /** Model the last (or current) run resolved to, as reported by the runtime. */
    activeModel?: string;
}

export declare function ComputerLab({ open, onClose, focusComputerId, variant, chrome: chromeTone, keymap, leader, idleWindowMs, className, }: ComputerLabProps): JSX.Element | null;

export declare interface ComputerLabProps {
    open: boolean;
    onClose: () => void;
    /**
     * Keyboard bindings. Defaults to `DEFAULT_KEYMAP` — plain Mac chords, chosen
     * from the ones a browser actually forwards to the page. Pass your own to
     * rebind; nothing in the component hardcodes a chord.
     */
    keymap?: readonly KeyBinding[];
    /**
     * Optional tmux-style prefix key. Off by default.
     *
     * When set, every binding that carries a `leaderKey` *also* answers to
     * `leader → key`, on top of its direct chord. Both models work at once, so
     * turning this on takes nothing away — pass `TMUX_LEADER` to try it.
     */
    leader?: LeaderConfig | null;
    /** Denominator for the per-pane expiry meters. */
    idleWindowMs?: number;
    /**
     * Open with this computer in focus — a deep link's landing spot.
     *
     * Applied ONCE per distinct value, not held: it places you and then gets out
     * of the way, so moving to another pane afterwards is not undone on the next
     * render. If the computer already has a pane in the active window that pane
     * is focused; otherwise the focused pane is retargeted to it, which keeps a
     * deliberate split from being torn down by a link.
     *
     * An id that is not in the fleet is ignored rather than cleared: it usually
     * means the fleet has not loaded yet, and blanking the pane on the way to
     * finding out is a worse answer than doing nothing.
     */
    focusComputerId?: string | null;
    /**
     * How the lab occupies the page.
     *
     * `overlay` (default) covers the viewport — the lab as a mode you enter,
     * which is right when it is summoned over whatever you were doing.
     *
     * `inline` fills its container instead, so a host that routes to the lab as
     * a *page* keeps its own nav and header around it. The difference is not
     * only cosmetic: an overlay is `role="dialog" aria-modal`, which tells a
     * screen reader the rest of the page is inert. That is a lie when the lab is
     * the page's content and the app's navigation is still right there, so the
     * inline variant drops both.
     */
    variant?: 'overlay' | 'inline';
    /**
     * Which palette the lab's *chrome* uses — top bar, rail, command line.
     *
     * `code` is the terminal family (Catppuccin, permanently dark). Right for an
     * overlay, which is a place you enter and where the whole viewport is the
     * lab.
     *
     * `app` re-points the same tokens at the host's surface/border/text, so the
     * chrome takes the host's theme and flips with it. Without this the lab is a
     * dark slab dropped into a light page — it reads as an embedded widget
     * rather than part of the app, which is exactly the "feels like an iframe"
     * complaint.
     *
     * Panes are NOT affected either way: a terminal is dark, and the remap is
     * applied to the chrome containers rather than the root precisely so it does
     * not inherit into them. Defaults to `app` for an inline lab and `code` for
     * an overlay, which is what each is usually for.
     *
     * @see `../lib/chromeTokens` for the map itself and where it may be applied.
     */
    chrome?: ChromeTone;
    className?: string;
}

/** Outcome of the last agent run on a box. */
export declare interface ComputeRunResult {
    subtype: string;
    turns: number;
    durationMs: number;
    costUsd: number;
}

/** Runtime-wide state — one per deployment, not per computer. */
export declare interface ComputeRuntimeStatus {
    deployed: boolean;
    runtimeArn: string | null;
    runtimeName: string;
    /** Commands the restricted (non-full-exec) command API will run. */
    commandAllowlist: string[];
    fullExecEnabled?: boolean;
    /**
     * True only when the DEPLOYED image understands a per-task model. An older
     * image silently ignores the field, so offering the picker anyway would let
     * an operator choose Opus and quietly get the default.
     */
    perTaskModel?: boolean;
    defaultModel?: string | null;
    allowedModels?: string[];
    /** Absolute path of the persistent workspace, e.g. `/mnt/workspace`. */
    workspace?: string;
}

/**
 * Where the fleet on screen came from.
 *
 * `'fixture'` means synthetic sample data — surface it, never let invented
 * boxes look like a live fleet.
 */
export declare type ComputeSource = 'fixture' | 'remote' | 'provided';

/**
 * What a computer is doing, as the fleet reports it.
 *
 * `waiting` is the one that is not obvious: the last agent run ended by asking
 * the operator a question, so the box is idle but the work is not finished.
 * It reads as a distinct state because the action it wants — reply — is
 * different from the action an `idle` box wants.
 */
export declare type ComputeStatus = 'idle' | 'running' | 'waiting' | 'stopped' | 'error';

/** Total descendants, for the collapsed-directory count. */
export declare function countDescendants(node: WorkspaceNode): number;

export declare function countPanes(node: PaneNode): number;

export declare function createComputeClient(options?: ComputeClientOptions): ComputeClient;

export declare interface CreateComputerInput {
    label?: string;
    /** Project to charge this computer to. */
    projectId?: string;
}

/** Cycle docked → grid → stack → floating, so one key reaches every layout. */
export declare function cycleLayout(): void;

/** Next / previous pane in layout order — the `⌃a o` cycle. */
export declare function cyclePane(root: PaneNode, paneId: string, delta: number): string | null;

/** Cycle tabs, tmux-style. `delta` of 1 is next, -1 is previous. */
export declare function cycleShell(delta: number): void;

/**
 * Denominator for the expiry meter.
 *
 * The reaper's idle window is server policy and is not reported, so the meter
 * needs an assumed full scale. An hour matches the reference deployment; a
 * host running a different policy passes its own rather than watching every
 * box render as permanently nearly-full.
 */
export declare const DEFAULT_IDLE_WINDOW_MS: number;

/**
 * The defaults.
 *
 * ⌘ and ⌃ are accepted interchangeably so the same bindings work on a
 * non-Mac keyboard without a second table.
 */
export declare const DEFAULT_KEYMAP: readonly KeyBinding[];

export declare const DEFAULT_PANE_KINDS: readonly PaneKind[];

/** Ctrl-] detaches: drop the socket, leave the shell alive. */
export declare const DETACH_BYTE = 29;

export declare type Direction = 'left' | 'right' | 'up' | 'down';

/** Dock tabs, layout mode and geometry. */
export declare const DOCK_STORAGE_KEY = "ui-components.computeDock.v1";

export declare interface DockGeometry {
    x: number;
    y: number;
    width: number;
    height: number;
    /** Height of the docked panel; kept separate from the floating window's. */
    dockHeight: number;
}

/**
 * Layouts, because "several terminals" means different things:
 *   docked   — one pane pinned to the bottom, tabbed. Working in one shell.
 *   floating — a draggable window parked over the page.
 *   grid     — every shell tiled and visible at once, tmux-style. Watching.
 *   stack    — a narrow column down the right, page still usable beside it.
 */
export declare type DockMode = 'hidden' | 'docked' | 'floating' | 'grid' | 'stack';

export declare interface DockShell {
    /** Stable per-tab id; also the AgentCore shellId, so reattach works. */
    id: string;
    sessionId: string;
    /**
     * Directory to start in.
     *
     * A PTY opens at `/`, which is right for a bare box and wrong when the
     * shell was opened from a specific file or checkout — landing at the
     * filesystem root is a shell you have to orient yourself in before you can
     * use it.
     */
    cwd?: string;
    /** Computer label for the tab. */
    label: string;
    status: ShellStatus;
    /** Output arrived while you were looking at a different tab. */
    unread: boolean;
}

export declare interface DockState {
    mode: DockMode;
    shells: DockShell[];
    activeId: string | null;
    geometry: DockGeometry;
}

/** The split whose child contains `paneId` along `axis` — the one a resize moves. */
export declare function enclosingSplit(root: PaneNode, paneId: string, axis: SplitDirection): {
    splitId: string;
    onA: boolean;
} | null;

/** Prefix a payload with its channel byte. */
export declare function encodeFrame(channel: number, payload?: Uint8Array): Uint8Array<ArrayBuffer>;

export declare function encodeResize(cols: number, rows: number): Uint8Array<ArrayBuffer>;

/** Server-side execution mode. Mirrors the middleware's own union. */
declare type ExecMode = 'safe' | 'full';

/**
 * A spent 1006 is almost always the shell quota.
 *
 * A runtime already holding ten shells rejects the WebSocket upgrade, and a
 * failed upgrade reaches the browser as 1006 — indistinguishable from a
 * dropped network. Retrying can never clear a quota, so once the attempts are
 * spent, say what it probably is.
 */
export declare function exhaustedAdvice(code: number, retries: number): string | null;

/** Pull the exit code out of a status frame, or null when it carries none. */
export declare function exitCodeOf(frame: ShellStatusFrame): number | null;

/**
 * How close a box is to being reaped, as a 0–1 fraction, plus whether that is
 * worth drawing attention to.
 *
 * `stopsInMs` alone is a number with no scale — "stops in 4m" means nothing
 * without knowing whether the window was five minutes or an hour. The meter
 * needs a denominator, so callers pass the policy window they know about.
 */
export declare function expiryPressure(stopsInMs: number, windowMs: number): {
    fraction: number;
    urgent: boolean;
};

export declare function findLeaf(node: PaneNode, paneId: string): PaneLeaf | null;

export declare const fixtureComputers: Computer[];

/**
 * Sample machines for MachinePresenceMenu. Deliberately uneven, like the
 * projects above: one healthy machine mixing local and platform models, and
 * one stale workstation whose sidecar is queuing offline — the two states the
 * menu exists to distinguish.
 */
export declare const fixtureMachines: MachineNode[];

/**
 * Models the reference container accepts.
 *
 * These are Bedrock inference-profile ids, not first-party model names: the
 * box runs the agent with `CLAUDE_CODE_USE_BEDROCK=1`, so `--model` goes
 * straight to Bedrock. The ids must match the runtime's allowlist exactly —
 * anything off it falls back to the default *silently*, so a mismatch is
 * invisible: you pick the expensive model and quietly get the cheap one.
 */
export declare const fixtureModels: ComputeModel[];

export declare const fixtureRuntimeStatus: ComputeRuntimeStatus;

export declare const fixtureWorkspace: WorkspaceSnapshot;

/** Mirror of the server-owned fleet, for first paint and re-adoption. */
export declare const FLEET_STORAGE_KEY = "ui-components.computeFleet.v1";

export declare function focusShell(id: string): void;

/** `84.2k`, `1.3M` — a token count is scale, not an exact figure. */
export declare function formatTokens(tokens: number): string;

/** One scripted frame. `afterMs` is relative to the previous frame. */
declare interface Frame {
    afterMs: number;
    data: Record<string, unknown>;
}

/**
 * Subsequence match, the thing every fuzzy finder actually does.
 *
 * `dba` matches `demo-bravo`. Returns a score where lower is better, so a
 * prefix match beats a match scattered across the whole string — otherwise
 * `demo-alpha` and `demo-bravo` are equally good answers to `da` and the
 * order is whatever the array happened to be in.
 */
export declare function fuzzyScore(text: string, query: string): number | null;

export declare function getDock(): DockState;

/** Bindings grouped for the help sheet, in the order groups are declared. */
export declare function groupBindings(keymap: readonly KeyBinding[]): Array<{
    group: KeyBinding['group'];
    bindings: KeyBinding[];
}>;

export declare const HEARTBEAT_MS = 30000;

/**
 * Route `mock-shell:` URLs to the simulator and leave every other URL alone.
 *
 * Returns the uninstall. Call it on unmount: a demo that swaps the global
 * WebSocket and never puts it back breaks every other live surface on the
 * page, which is a far worse bug than a dead terminal.
 */
export declare function installMockShellSocket(options?: MockShellOptions): () => void;

/**
 * Route `mock-tail:` URLs to the simulator and leave every other URL alone.
 *
 * Returns the uninstall, refcounted so nested consumers do not fight. Call it
 * on unmount: a story that swaps the global EventSource and never puts it back
 * breaks every other live surface on the page, which is a worse bug than an
 * empty pane.
 */
export declare function installMockTailSource(options?: MockTailOptions): () => void;

/** Does this keystroke arm the leader? */
export declare function isLeaderKey(leader: LeaderConfig | null | undefined, event: KeyboardEvent): boolean;

export declare interface KeyBinding {
    command: LabCommand;
    /** `KeyboardEvent.key`, compared case-insensitively. */
    key: string;
    meta?: boolean;
    shift?: boolean;
    alt?: boolean;
    ctrl?: boolean;
    /** How the chord is written in the UI. */
    label: string;
    /** One line for the help sheet. */
    description: string;
    /** Grouping in the help sheet. */
    group: 'panes' | 'navigate' | 'lab';
    /**
     * When a leader is configured, this command also answers to
     * `leader → leaderKey`. Ignored entirely when there is no leader, so a
     * binding can carry it unconditionally.
     */
    leaderKey?: string;
}

/** Lab windows and their pane trees. */
export declare const LAB_LAYOUT_STORAGE_KEY = "ui-components.computerLab.v1";

export declare function LabChooser({ open, onClose, computers, panes, onJumpToPane, onRetarget, onOpenInSplit, projects, onSelectProject, chrome: chromeTone, }: LabChooserProps): JSX.Element | null;

export declare interface LabChooserProps {
    open: boolean;
    onClose: () => void;
    computers: Computer[];
    panes: PaneLeaf[];
    /** Jump focus to a pane already on screen. */
    onJumpToPane: (paneId: string) => void;
    /** Bind the focused pane to this computer — the cheap "look at that" move. */
    onRetarget: (computer: Computer) => void;
    /** Open in a new split — the "watch both" move. Bound to ⇧⏎. */
    onOpenInSplit: (computer: Computer) => void;
    /**
     * Projects, so the chooser answers "take me to that project's computers"
     * and not only "take me to that box". Omit where there are none.
     */
    projects?: readonly ProjectRollup[];
    /** Focus a project's first computer, or offer to make one if it has none. */
    onSelectProject?: (project: ProjectRollup) => void;
    /**
     * Which palette the chooser card paints in. `code` (default) keeps the
     * terminal family; `app` re-points it at the host's tokens, the way the
     * lab's own chrome does — see `../lib/chromeTokens`.
     *
     * The scrim is NOT affected either way. It covers the panes as well as the
     * chrome, and a light film over a terminal dims nothing.
     */
    chrome?: ChromeTone;
}

export declare type LabCommand = 'focus-left' | 'focus-right' | 'focus-up' | 'focus-down' | 'split-right' | 'split-down' | 'close-pane' | 'zoom-pane' | 'next-kind' | 'jump' | 'toggle-broadcast' | 'focus-composer' | 'focus-rail' | 'leave-pane' | 'help' | 'exit';

/** Look up a chord's display label, for a button's tooltip. */
export declare function labelFor(keymap: readonly KeyBinding[], command: LabCommand): string | null;

export declare function LabRail({ computers, activeComputerId, openComputerIds, onSelect, onOpenInPane, onWatch, onCreate, onOpenMenu, showAllActivity, onToggleShowAll, canManage, models, className, }: LabRailProps): JSX.Element;

export declare interface LabRailProps {
    computers: Computer[];
    /** Computer bound to the focused pane. */
    activeComputerId: string | null;
    /** Computers currently on screen in some pane — marked as mounted. */
    openComputerIds: readonly string[];
    onSelect: (computer: Computer) => void;
    /** Open this computer in a new pane rather than retargeting the current one. */
    onOpenInPane?: (computer: Computer) => void;
    /**
     * Watch this computer read-only — offered on the activity rows only.
     *
     * Selecting an activity row retargets a pane the way selecting a computer
     * does, which lands you in a shell. That is the wrong verb for this list:
     * the boxes here are ones something ELSE is driving (a cron bot, the job
     * dispatcher, another operator), and the question is what it is doing, not
     * what you want to type at it. Watching costs no shell slot, so you can
     * keep several open.
     */
    onWatch?: (computer: Computer) => void;
    onCreate?: () => void;
    onOpenMenu?: () => void;
    /** Show every box in the activity list, not just the active ones. */
    showAllActivity: boolean;
    onToggleShowAll: () => void;
    canManage?: boolean;
    models?: ComputeModel[];
    className?: string;
}

export declare interface LabWindow {
    id: string;
    /** Display name. Defaults to the window's index. */
    name?: string;
    root: PaneNode;
}

/** Flatten the tree into leaf rectangles in unit space. */
export declare function layoutRects(node: PaneNode, frame?: {
    x: number;
    y: number;
    width: number;
    height: number;
}): PaneRect[];

/**
 * An optional prefix key. Off by default.
 *
 * `⌃B` is tmux's own, and for tmux's reason: `⌃A` is readline's
 * beginning-of-line, and taking it from every shell in the lab to save one
 * keystroke is a bad trade.
 */
export declare interface LeaderConfig {
    key: string;
    ctrl?: boolean;
    meta?: boolean;
    alt?: boolean;
    /** How the prefix is written in the UI, e.g. `⌃B`. */
    label: string;
    /** Milliseconds an armed leader waits before giving up. Default 3000. */
    timeoutMs?: number;
}

export declare function listLeaves(node: PaneNode): PaneLeaf[];

/** How the machine's local memory sidecar stands against the shared mesh. */
export declare type MachineMemoryMode = 'synced' | 'pending' | 'offline' | 'disabled';

export declare interface MachineMemoryState {
    mode: MachineMemoryMode;
    /** Records queued locally, awaiting upload (the sidecar's outbox depth). */
    pendingOps?: number;
    /** How stale the machine's read replica is, in seconds. */
    pullCursorAgeS?: number;
    /** Context packs the sidecar has imported, e.g. `capability-registry`. */
    importedPacks?: string[];
}

/** A paired machine and its live sessions. */
export declare interface MachineNode {
    id: string;
    label: string;
    status: MachinePresenceStatus;
    /** `darwin/arm64` — shown as a caption, never parsed. */
    platform?: string;
    sessions: MachineSession[];
}

export declare function MachinePresenceMenu({ nodes, models, onOpenLab, onManage, className, 'data-testid': testId, }: MachinePresenceMenuProps): JSX.Element | null;

export declare interface MachinePresenceMenuProps {
    /** The user's paired machines with their live sessions. Empty → renders null. */
    nodes: MachineNode[];
    /** Known platform models, so Bedrock ids shorten the way the lab shortens them. */
    models?: ComputeModel[];
    /** Wire to deep-link into the Computer Lab. Omitted → no lab affordance. */
    onOpenLab?: () => void;
    /** Wire to the machines settings surface (pairing, revoke). */
    onManage?: () => void;
    className?: string;
    'data-testid'?: string;
}

/** Derived server-side from heartbeat age — never claimed by the machine. */
export declare type MachinePresenceStatus = 'connected' | 'stale' | 'offline';

/** One live agent session on a machine. */
export declare interface MachineSession {
    id: string;
    /** Which harness: `claude-code`, `cursor`, ... Informational. */
    harness?: string;
    projectId?: string;
    /** Denormalised for display — a bare `p-realtime` means nothing to a reader. */
    projectName?: string;
    repo?: string;
    branch?: string;
    /** Checkout path on the machine — tooltip detail, owner-visible data. */
    worktree?: string;
    /** One distilled line of what the session is doing — never raw prompt text. */
    intent?: string;
    /** `bedrock`, `ollama`, `vllm`, `lmstudio`, ... The vendor axis `Computer`
     *  never needed, because a microVM's provider is always the platform's. */
    modelProvider?: string;
    model?: string;
    /** Fraction (0–1) of the model's context window in use. */
    contextUsed?: number;
    memory?: MachineMemoryState;
    startedAt?: number;
}

export declare function makeLeaf(id: string, computerId: string, kindId: string): PaneLeaf;

/**
 * Which command a keystroke means, or null.
 *
 * Modifiers are matched exactly. Without that, `⌘⇧←` and `⌘←` both match a
 * binding that only checks for the meta key, and the unshifted chord — which
 * the browser uses for history navigation — silently moves pane focus.
 */
export declare function matchBinding(keymap: readonly KeyBinding[], event: KeyboardEvent): LabCommand | null;

/**
 * Which command follows an armed leader, or null.
 *
 * Modifier-free by design: after the prefix, a bare letter is the command, so
 * `⌃B |` and `⌃B ⇧\` both reach split-right without a second modifier table.
 */
export declare function matchLeaderBinding(keymap: readonly KeyBinding[], event: KeyboardEvent): LabCommand | null;

/** Frames above this are rejected by the service with close code 1009. */
export declare const MAX_FRAME_BYTES = 65536;

export declare const MAX_RATIO = 0.9;

/** Bounded, because a quota rejection never clears by retrying. */
export declare const MAX_RETRIES = 5;

/** AgentCore allows 10 concurrent shells per runtime; stop short of the wall. */
export declare const MAX_SHELLS = 8;

/**
 * One line for the session's memory-sync state. Exported for tests and for
 * hosts that render the same state elsewhere (a settings page, a lab pane).
 *
 *   synced   → "● synced"
 *   pending  → "◐ 14 pending"      (the sidecar's outbox is draining)
 *   offline  → "○ offline — queuing" (writes queue locally; nothing is lost)
 *   disabled → "— sync off"
 */
export declare function memorySummary(memory: MachineMemoryState | undefined): string;

/** Panes below this get unreadable; splitting further is refused. */
export declare const MIN_RATIO = 0.1;

/** URLs with this scheme are simulated; everything else is dialled for real. */
export declare const MOCK_SHELL_SCHEME = "mock-shell:";

/** URLs beginning with this are answered by the simulator. */
export declare const MOCK_TAIL_SCHEME = "mock-tail:";

export declare const MOCK_TAIL_SCRIPTS: MockTailScript[];

export declare interface MockShellOptions {
    /** URL prefix routed to the simulator. Default `mock-shell:`. */
    scheme?: string;
}

/**
 * Build the value a mock `getShellUrl` should resolve to.
 *
 * The shell id rides in the query because `ShellTerminal` puts it nowhere
 * else: it hands the id to the client and then opens whatever URL comes back,
 * so this is the only channel through which the simulator can learn which
 * shell it is meant to be.
 */
export declare function mockShellUrl(sessionId: string, shellId?: string): {
    url: string;
    shellId: string;
};

export declare interface MockTailOptions {
    /** URL prefix routed to the simulator. Default `mock-tail:`. */
    scheme?: string;
}

/**
 * A run with a shape worth watching: it starts, thinks, uses tools, and lands
 * somewhere — including one that ends by asking a question, because `waiting`
 * is a real status the rail sorts to the top and it needs to be reachable.
 */
export declare interface MockTailScript {
    id: string;
    label: string;
    frames: Frame[];
}

/** The URL a mock client should hand back from `tail(boxId)`. */
export declare function mockTailUrl(boxId: string, scriptId?: string): string;

/**
 * The pane in a given direction, tmux's `select-pane -L/-R/-U/-D`.
 *
 * Candidates are panes that actually lie that way *and* overlap on the other
 * axis — without the overlap test, pressing "right" from a tall left-hand
 * pane could land in a pane sitting well above or below it, which feels like
 * the focus teleported. Among the survivors, the nearest edge wins.
 */
export declare function neighborPane(root: PaneNode, paneId: string, direction: Direction): string | null;

/** The next kind in registration order — what the toggle key cycles through. */
export declare function nextKind(registry: PaneKindRegistry, id: string): PaneKind | null;

/**
 * Open a shell for a computer, or focus the one already open for it.
 *
 * Reusing the existing tab rather than stacking duplicates matters: each tab
 * is a real PTY against a quota of ten, and two tabs on one shellId would
 * fight — the second connection kicks the first with close code 4000.
 */
export declare function openShell(box: {
    id: string;
    label: string;
    sessionId: string;
    cwd?: string;
}): OpenShellOutcome;

export declare type OpenShellOutcome = {
    ok: true;
    id: string;
} | {
    ok: false;
    reason: 'at-capacity';
};

/**
 * What a pane exposes back to the lab.
 *
 * One extensible object rather than a second `registerFocus` channel: pane
 * kinds will need more of these over time (refit, clear, scroll-to-end), and
 * a new parallel registration per capability does not scale. Every field is
 * optional — a read-only pane has no `send`, and a pane with nothing focusable
 * has no `focus`.
 */
export declare interface PaneHandle {
    /**
     * Deliver text as if the operator had typed it. Used by broadcast.
     *
     * Returns false when the pane cannot currently accept input — a terminal
     * whose socket is not open, an agent already running. The caller counts
     * refusals so "sent to 3 of 5 panes" is true rather than hopeful.
     */
    send?: PaneInput;
    /**
     * Put the keyboard in this pane.
     *
     * Without this, moving pane focus repaints the border and leaves the cursor
     * where it was, so every keyboard move had to be finished with a mouse
     * click — which defeats the point of moving by keyboard at all.
     */
    focus?: () => void;
}

/**
 * A pane's input sink, published by the kind so broadcast can reach it.
 *
 * Returns false when the pane cannot currently accept input — a terminal
 * whose socket is not open, an agent already running. The caller counts
 * refusals so "sent to 3 of 5 panes" is a true statement rather than a hope.
 */
export declare type PaneInput = (text: string) => boolean;

export declare interface PaneKind {
    /** Stable id. Persisted in the saved layout, so do not rename casually. */
    id: string;
    /** Short label for the pane's toggle and the cycle order. */
    label: string;
    /** Tooltip on the toggle — say what switching to this kind gets you. */
    description?: string;
    quota?: PaneQuota;
    /**
     * Appended to broadcast input before it is delivered.
     *
     * A PTY needs the newline or the text sits at the prompt un-submitted,
     * which looks exactly like nothing happened. An agent prompt must not have
     * one. This is the whole difference, and it belongs with the kind.
     */
    inputSuffix?: string;
    /** Right-hand text in the pane's status line, e.g. `pty` or `resume on`. */
    statusMode?: string;
    render: (context: PaneKindContext) => ReactNode;
}

export declare interface PaneKindContext {
    computer: Computer;
    /** Stable pane id. Doubles as the shell id, so a reload reattaches. */
    paneId: string;
    active: boolean;
    /**
     * Publish (or withdraw, with null) this pane's handle. Call it in an effect
     * and withdraw on cleanup, or the lab keeps a handle to a pane that has
     * been unmounted or changed kind — and a stale one delivers a prompt to a
     * terminal.
     */
    registerPane: (handle: PaneHandle | null) => void;
    /** Tell the surface something finished, so the fleet can be re-read. */
    onSettled: () => void;
}

export declare type PaneKindRegistry = readonly PaneKind[];

export declare interface PaneLeaf {
    kind: 'leaf';
    id: string;
    /** The computer this pane is bound to. */
    computerId: string;
    /**
     * Which registered pane kind renders this pane.
     *
     * A string, not a union: kinds come from a registry the host controls (see
     * `paneKinds.ts`), so the set is open. It is persisted in the saved layout,
     * and `resolveKind` handles an id the current registry no longer knows.
     */
    kindId: string;
}

export declare type PaneNode = PaneLeaf | PaneSplit;

/**
 * Scarce resources a pane kind can consume.
 *
 * Only shells are scarce today: a runtime allows ten concurrent PTYs, and a
 * window of terminal panes can spend the whole quota just to watch. Declaring
 * it here is what lets the multiplexer meter and refuse generically, instead
 * of `if (view === 'shell')` in three places.
 */
export declare type PaneQuota = 'shell';

export declare interface PaneRect {
    id: string;
    /** All in 0–1 of the window, so the caller picks the pixel units. */
    x: number;
    y: number;
    width: number;
    height: number;
}

export declare interface PaneSplit {
    kind: 'split';
    id: string;
    /** `row` puts children side by side; `column` stacks them. */
    direction: SplitDirection;
    /** Fraction of the axis taken by `a`. Clamped to [0.1, 0.9]. */
    ratio: number;
    a: PaneNode;
    b: PaneNode;
}

export declare function PaneStatusLine({ computer, modelId, models, idleWindowMs, broadcasting, mode, className, 'data-testid': testId, }: PaneStatusLineProps): JSX.Element;

export declare interface PaneStatusLineProps {
    computer: Computer;
    /** Model this pane is set to run with, if the runtime honours per-task models. */
    modelId?: string | null;
    models?: ComputeModel[];
    /** Denominator for the expiry meter. */
    idleWindowMs?: number;
    /** True when this pane is one of the broadcast targets. */
    broadcasting?: boolean;
    /** Right-hand mode text, e.g. `resume on`. */
    mode?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function PaneTreeView({ node, activePaneId, zoomedPaneId, renderLeaf, onRatioChange, className, }: PaneTreeViewProps): JSX.Element;

export declare interface PaneTreeViewProps {
    node: PaneNode;
    activePaneId: string | null;
    /**
     * When set, only this pane renders — tmux's `resize-pane -Z`. The rest of
     * the tree stays mounted-in-state but unrendered, so unzooming restores the
     * exact layout rather than rebuilding a guess at it.
     */
    zoomedPaneId?: string | null;
    renderLeaf: (leaf: PaneLeaf) => ReactNode;
    onRatioChange: (splitId: string, ratio: number) => void;
    className?: string;
}

/** A project with the live fleet folded in. */
export declare interface ProjectRollup extends ComputeProject {
    computers: Computer[];
    /** Boxes currently doing something — running, or waiting on an answer. */
    activeCount: number;
    /**
     * Milliseconds until the first of this project's boxes is reaped, or null
     * when none of them report a deadline. The roll-up matters because "two
     * computers, both gone within the hour" is a thing you want to see without
     * opening either one.
     */
    soonestExpiryMs: number | null;
    /** Dollars charged to this project's live boxes, where the host reports it. */
    liveSpendUsd: number;
    /** Tokens consumed by this project's live boxes. */
    liveTokens: number;
}

export declare function ProjectSummary({ project, showMeter, className, 'data-testid': testId, }: ProjectSummaryProps): JSX.Element;

export declare interface ProjectSummaryProps {
    project: ProjectRollup;
    /** Render the budget meter. Off in tight spaces like a rail row. */
    showMeter?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** `ollama · qwen2.5-coder:14b` / `bedrock · nova-pro`. Bedrock ids go
 *  through the same shortener the pane status line uses. */
export declare function providerSummary(session: MachineSession, models?: ComputeModel[]): string;

/** How many panes in a window consume a given quota. */
export declare function quotaUsage(registry: PaneKindRegistry, paneKindIds: readonly string[], quota: PaneQuota): number;

export declare function ratioOf(root: PaneNode, splitId: string): number | null;

/**
 * Drop restored tabs whose computer no longer exists.
 *
 * The store cannot check this itself — it deliberately knows nothing about
 * the fleet — so the provider calls this once the real list arrives. A
 * restored tab pointing at a deleted session can never connect: it sits there
 * failing, indistinguishable from a service problem.
 */
export declare function reconcileDock(liveSessionIds: readonly string[]): void;

/**
 * Report what a shell is doing.
 *
 * `sawOutput` is true when the call was triggered by bytes arriving, which is
 * what marks an unattended tab unread — so a grid or a stack shows which pane
 * moved while your attention was elsewhere.
 */
export declare function reportShellStatus(id: string, status: ShellStatus, sawOutput?: boolean): void;

/** Look up a kind, falling back to the first registered one. */
export declare function resolveKind(registry: PaneKindRegistry, id: string): PaneKind | null;

/**
 * Join projects to the fleet.
 *
 * Separate from the hook so a surface that already has both can roll them up
 * without another subscription, and so the join is testable on plain data.
 */
export declare function rollUpProjects(projects: readonly ComputeProject[], computers: readonly Computer[]): ProjectRollup[];

export declare function selectShellByIndex(index: number): void;

/** Show/hide without discarding the shells — the sockets stay attached. */
export declare function setDockVisible(visible: boolean): void;

export declare function setGeometry(patch: Partial<DockGeometry>): void;

export declare function setMode(mode: DockMode): void;

export declare function setRatio(root: PaneNode, splitId: string, ratio: number): PaneNode;

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

/**
 * A real terminal. Costs one of the runtime's ten shell slots, which is why
 * the lab meters them and refuses the ninth.
 */
export declare const SHELL_PANE_KIND: PaneKind;

export declare const SHELL_STATUS: Record<ShellStatus, StatusMeta>;

/** What a shell is doing, as far as the client can tell from frame traffic. */
export declare type ShellStatus = 'connecting' | 'ready' | 'busy' | 'detached' | 'error';

/** Shape of a `STATUS` frame, as far as we read it. */
export declare interface ShellStatusFrame {
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

export declare const ShellTerminal: ForwardRefExoticComponent<ShellTerminalProps & RefAttributes<ShellTerminalHandle>>;

export declare interface ShellTerminalHandle {
    /** Type into the PTY as if the operator had. Used by broadcast input. */
    send: (text: string) => boolean;
    /** Drop the socket, leave the shell running server-side. */
    detach: () => void;
    /** Kill the PTY. Permanent — it cannot be reattached after this. */
    kill: () => void;
    focus: () => void;
    /** Re-fit to the container. Call after a resize the component cannot see. */
    refit: () => void;
    connect: () => void;
}

export declare interface ShellTerminalProps {
    sessionId: string;
    /** Stable id so a reload reattaches to the same PTY. */
    shellId?: string;
    label?: string;
    /** Directory to land in once the PTY is live. */
    cwd?: string;
    onExit?: (code: number | null) => void;
    /** Fixed height in px. Ignored when `fillHeight`. */
    height?: number;
    /** Draw the built-in header. Off when the container labels the pane itself. */
    chrome?: boolean;
    /** Fill the parent rather than using a fixed height. */
    fillHeight?: boolean;
    /** Connect on mount rather than waiting for a click. */
    autoConnect?: boolean;
    /** `sawOutput` is true when bytes arriving triggered the call. */
    onStatus?: (status: ShellStatus, sawOutput?: boolean) => void;
    /**
     * Background for this terminal, overriding `--color-terminal-bg`.
     *
     * Any CSS colour. Set it for the one pane that should look different; to
     * restyle every terminal in an app, re-point the token instead.
     */
    background?: string;
    className?: string;
}

declare interface ShellUrl {
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

/** `us.anthropic.claude-sonnet-5` is not a name anyone wants in a status line. */
export declare function shortModelName(id: string | null | undefined, models?: ComputeModel[]): string;

/** True when every shell is visible at once and tabs are not the navigation. */
export declare function showsAllPanes(mode: DockMode): boolean;

export declare type SplitDirection = 'row' | 'column';

/** Replace one leaf with a split holding it and a new sibling. */
export declare function splitPane(root: PaneNode, paneId: string, direction: SplitDirection, newPane: PaneLeaf, splitId: string): PaneNode;

export declare interface StatusMeta {
    /** Short word for chips and dots. */
    label: string;
    /**
     * Design-system tone, for any primitive that takes one.
     *
     * Carried here so the status → colour decision is made once. It was
     * previously re-derived as a four-way ternary in the rail, the pane status
     * line and the chooser, which is three places to forget to update.
     */
    tone: Tone;
    /** A sentence an operator can act on — tooltips and empty states. */
    help: string;
    /** CSS colour for `StatusDot`, taken from the theme's tokens. */
    color: string;
    /** Animate the dot. Reserved for states that are genuinely in motion. */
    pulse: boolean;
}

/** Normalise a possibly-absent status. The server omits it for a fresh box. */
export declare function statusOf(computer: {
    status?: ComputeStatus;
} | null | undefined): ComputeStatus;

/** A decoded SSE frame. Frames that are not JSON are dropped, not thrown. */
export declare type StreamEvent = Record<string, unknown>;

export declare function subscribeDock(listener: () => void): () => void;

/**
 * One-line summary of a tool call.
 *
 * Tool inputs are unbounded — a `Write` carries an entire file — so a raw
 * dump of the arguments makes the stream unreadable exactly when it is
 * moving fastest. The interesting field is almost always the target.
 */
export declare function summarizeTool(name: string, input: Record<string, unknown>): string;

/**
 * Read-only stream of whatever is running on the box. Free — it is an SSE
 * tail — so a window full of these costs nothing and watches everything.
 */
export declare const TAIL_PANE_KIND: PaneKind;

export declare function TailPane({ computer, registerPane, className }: TailPaneProps): JSX.Element;

export declare interface TailPaneProps {
    computer: Computer;
    /** Publish a handle so the lab can put the keyboard here. */
    registerPane?: PaneKindContext['registerPane'];
    className?: string;
}

declare interface TailTarget {
    url: string;
    /** Pass to `new EventSource(url, { withCredentials })`. */
    withCredentials: boolean;
    /** Headers the client was configured with; `EventSource` cannot send them. */
    headers: Record<string, string>;
}

export declare interface TaskStep {
    kind: TaskStepKind;
    text: string;
    /** Tool name, for `kind: 'tool'`. */
    tool?: string;
    /** `job` only: the dispatcher's job kind (e.g. `devbox:task`) — the banner's subtitle. */
    jobKind?: string;
    /** `job_end` only: whether the job closed clean. Drives the closing tone. */
    jobOk?: boolean;
    /** `result` only: the structured tally, so the view renders cost chips instead of re-parsing `text`. */
    result?: ComputeRunResult;
    at: number;
}

export declare type TaskStepKind = 'text' | 'tool' | 'result' | 'error' | 'meta' | 'job' | 'job_end';

/** tmux's prefix, for a host that wants to switch leader mode on. */
export declare const TMUX_LEADER: LeaderConfig;

export declare function toggleFloating(): void;

declare type Tone = (typeof TONES)[number];

declare const TONES: readonly ["neutral", "success", "warning", "danger", "info", "caution", "accent"];

/** Boxes with no project are still real; they get a bucket rather than vanishing. */
export declare const UNASSIGNED_PROJECT_ID = "__unassigned__";

export declare function updateLeaf(root: PaneNode, paneId: string, patch: Partial<Omit<PaneLeaf, 'kind' | 'id'>>): PaneNode;

export declare function useCompute(): ComputeContextValue;

export declare function useComputeFleet({ client, pollIntervalMs, computers: provided, fixtures, enabled, readopt, }: UseComputeFleetOptions): UseComputeFleetResult;

export declare interface UseComputeFleetOptions {
    client: ComputeClient;
    /** Poll interval for status dots. 0 disables polling. Default 5s. */
    pollIntervalMs?: number;
    /** Host-supplied fleet. Wins over both the mirror and the server. */
    computers?: Computer[];
    /** Sample data when there is no client-visible fleet at all. */
    fixtures?: Computer[];
    /** Talk to the backend at all. False reports an empty fleet and fetches nothing. */
    enabled?: boolean;
    /**
     * Re-POST mirrored boxes when the server reports an empty fleet.
     *
     * On by default, and only ever fires on an *empty* server response, so it
     * cannot resurrect a box someone deliberately removed.
     */
    readopt?: boolean;
}

export declare interface UseComputeFleetResult {
    computers: Computer[];
    source: ComputeSource;
    /** True while the first load is in flight — not while polling. */
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    create: (input?: CreateComputerInput) => Promise<Computer>;
    rename: (id: string, label: string) => Promise<void>;
    remove: (id: string) => Promise<void>;
    stop: (sessionId: string) => Promise<void>;
}

/** Non-throwing variant, for components that are optional inside the surface. */
export declare function useComputeOptional(): ComputeContextValue | null;

export declare function useComputeProjects({ client, projects: provided, pollIntervalMs, enabled, }: UseComputeProjectsOptions): UseComputeProjectsResult;

export declare interface UseComputeProjectsOptions {
    client: ComputeClient;
    /** Host-supplied projects. Wins over the client. */
    projects?: ComputeProject[];
    /** Budgets move slowly; polling them at fleet cadence is waste. Default 60s. */
    pollIntervalMs?: number;
    enabled?: boolean;
}

export declare interface UseComputeProjectsResult {
    projects: ComputeProject[];
    /** Projects joined to the fleet, plus a synthetic bucket for unassigned boxes. */
    rollups: ProjectRollup[];
    /** True when the deployment has no projects at all — group by computer instead. */
    absent: boolean;
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export declare function useComputeTail({ client, boxId, maxSteps, enabled, }: UseComputeTailOptions): UseComputeTailResult;

export declare interface UseComputeTailOptions {
    client: ComputeClient;
    /** Registry id of the box to tail. Null closes any open stream. */
    boxId: string | null;
    /** Retained steps. Older ones drop — this is a live view, not a log store. */
    maxSteps?: number;
    enabled?: boolean;
}

export declare interface UseComputeTailResult {
    steps: TaskStep[];
    /** True once the stream is open. */
    connected: boolean;
    /** A run is in flight on the box, as far as the stream has said. */
    running: boolean;
    result: ComputeRunResult | null;
    error: string | null;
}

export declare function useComputeTask({ client, maxSteps, onEvent, }: UseComputeTaskOptions): UseComputeTaskResult;

export declare interface UseComputeTaskOptions {
    client: ComputeClient;
    /** Cap on retained steps. Older ones are dropped — this is a live view. */
    maxSteps?: number;
    /** Raw frames, for hosts that render their own timeline. */
    onEvent?: (event: StreamEvent) => void;
}

export declare interface UseComputeTaskResult {
    steps: TaskStep[];
    isRunning: boolean;
    /** Tool calls made so far in the run in flight. */
    toolCount: number;
    result: ComputeRunResult | null;
    error: string | null;
    run: (sessionId: string, input: {
        prompt: string;
        resume: boolean;
        model?: string;
    }) => Promise<void>;
    cancel: () => void;
    clear: () => void;
    push: (step: Omit<TaskStep, 'at'>) => void;
}

export declare function useLabLayout(): UseLabLayoutResult;

export declare interface UseLabLayoutResult {
    windows: LabWindow[];
    activeWindow: LabWindow | null;
    activePaneId: string | null;
    zoomedPaneId: string | null;
    /** Panes in the active window, in layout order. */
    panes: ReturnType<typeof listLeaves>;
    /** Every computer bound to a pane in the active window. */
    openComputerIds: string[];
    focusPane: (paneId: string) => void;
    split: (direction: SplitDirection, computerId: string, kindId: string) => void;
    closeActivePane: () => void;
    setPaneComputer: (paneId: string, computerId: string) => void;
    setPaneKind: (paneId: string, kindId: string) => void;
    resize: (splitId: string, ratio: number) => void;
    move: (direction: Direction) => void;
    cycle: (delta: number) => void;
    toggleZoom: () => void;
    newWindow: (computerId: string, kindId: string) => void;
    closeWindow: (windowId: string) => void;
    selectWindow: (windowId: string) => void;
    stepWindow: (delta: number) => void;
    /** Seed the first window when the lab opens with nothing in it. */
    ensureSeeded: (computerId: string | null, kindId: string) => void;
    /** Drop panes bound to computers that no longer exist. */
    reconcile: (liveComputerIds: readonly string[]) => void;
}

/** Convenience: the rollup for one project id. */
export declare function useProjectRollups(projects: readonly ComputeProject[], computers: readonly Computer[]): ProjectRollup[];

/**
 * Flatten to the rows currently visible, so the tree can be a single
 * roving-tabindex list.
 *
 * A nested set of focusable elements is the reason tree widgets are usually
 * unreachable by keyboard: every row becomes its own tab stop. One flat,
 * ordered array of visible rows makes arrow-key navigation a matter of
 * index arithmetic.
 */
export declare function visibleRows(nodes: WorkspaceNode[], expanded: ReadonlySet<string>, depth?: number): Array<{
    node: WorkspaceNode;
    depth: number;
}>;

/** The cap in `WORKSPACE_FIND_COMMAND`; a full page means the listing was cut. */
export declare const WORKSPACE_ENTRY_CAP = 400;

/**
 * Depth-3 listing, noise directories pruned but still announced.
 *
 * **Requires `mode: 'full'`.** It uses a pipe, quotes, a subshell and a
 * redirect, every one of which the server's safe mode rejects — and `find` is
 * not on the safe allowlist either way. A deployment can also disable full
 * mode outright, so handle the 400 rather than assuming this always runs.
 */
export declare const WORKSPACE_FIND_COMMAND: string;

/** Recent history plus short status. Also requires `mode: 'full'` (`;`, `|`). */
export declare const WORKSPACE_GIT_COMMAND = "git log --oneline -3 2>/dev/null; git status --short 2>/dev/null | head -5";

/** One node of the workspace tree. */
export declare interface WorkspaceNode {
    name: string;
    path: string;
    kind: 'dir' | 'file';
    /** Directory deliberately not descended into (`.git`, `node_modules`, …). */
    pruned?: boolean;
    children: WorkspaceNode[];
}

export declare interface WorkspaceSnapshot {
    tree: WorkspaceNode[];
    /** Git one-liners: recent log plus short status. Empty when not a repo. */
    git: string[];
    /** The listing hit its cap, so the tree is not the whole workspace. */
    truncated: boolean;
}

export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare global {
    interface Window {
        /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
        __pipelineEditor?: unknown;
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}
