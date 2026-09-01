/**
 * What a computer is doing, as the fleet reports it.
 *
 * `waiting` is the one that is not obvious: the last agent run ended by asking
 * the operator a question, so the box is idle but the work is not finished.
 * It reads as a distinct state because the action it wants — reply — is
 * different from the action an `idle` box wants.
 */
export type ComputeStatus = 'idle' | 'running' | 'waiting' | 'stopped' | 'error';
/** Outcome of the last agent run on a box. */
export interface ComputeRunResult {
    subtype: string;
    turns: number;
    durationMs: number;
    costUsd: number;
}
export interface Computer {
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
/** Runtime-wide state — one per deployment, not per computer. */
export interface ComputeRuntimeStatus {
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
 * A project a computer can be charged to.
 *
 * Budgets live here rather than on the box because a project outlives any
 * individual computer: boxes are provisioned, reaped on idle and re-created
 * constantly, and a budget that died with the box would be useless. The
 * numbers are all optional because a host may know some and not others —
 * render what you have and say nothing about the rest, rather than showing a
 * confident zero.
 */
export interface ComputeProject {
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
/** A model the box will accept for an agent task. */
export interface ComputeModel {
    /** Sent verbatim to the container — a Bedrock inference-profile id. */
    id: string;
    label: string;
    hint: string;
}
/** One node of the workspace tree. */
export interface WorkspaceNode {
    name: string;
    path: string;
    kind: 'dir' | 'file';
    /** Directory deliberately not descended into (`.git`, `node_modules`, …). */
    pruned?: boolean;
    children: WorkspaceNode[];
}
export interface WorkspaceSnapshot {
    tree: WorkspaceNode[];
    /** Git one-liners: recent log plus short status. Empty when not a repo. */
    git: string[];
    /** The listing hit its cap, so the tree is not the whole workspace. */
    truncated: boolean;
}
/** What a shell is doing, as far as the client can tell from frame traffic. */
export type ShellStatus = 'connecting' | 'ready' | 'busy' | 'detached' | 'error';
/**
 * Where the fleet on screen came from.
 *
 * `'fixture'` means synthetic sample data — surface it, never let invented
 * boxes look like a live fleet.
 */
export type ComputeSource = 'fixture' | 'remote' | 'provided';
//# sourceMappingURL=types.d.ts.map