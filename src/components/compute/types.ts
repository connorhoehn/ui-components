// Compute — types for the microVM developer-box surface.
//
// A "computer" is one AgentCore Runtime *session*: its own Firecracker microVM
// with a persistent `/mnt/workspace`. The fleet is server-owned; this module
// renders it and drives it through a `ComputeClient`.

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
  /**
   * What sort of computer this is. Absent means `microvm`, the provisioned
   * AgentCore box every field above was written for.
   *
   * `local` is a developer's paired machine riding the same fleet: it can take
   * work and stream a log, but it has no PTY and is never provisioned or
   * stopped from here. Pane kinds read this through `appliesTo` so a laptop is
   * never handed a terminal it cannot back, and the workspace rail draws it
   * with a laptop glyph instead of a status dot.
   */
  kind?: ComputerKind;
}

/** See `Computer.kind`. */
export type ComputerKind = 'microvm' | 'local';

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

// ─── Machine presence — a developer's own machine in the fleet ───────────────
// Distinct from `Computer` on purpose: a Computer is a microVM the platform
// provisions and can open a shell into; a machine is someone's laptop that
// only ever dials OUT, announcing what its local agent sessions are doing.
// Folding them into one type would invite affordances (shells, stop buttons)
// the machine can't serve. Named "machine", not "presence": in this library
// presence already means human collaborators (PresenceAvatars).

/** Derived server-side from heartbeat age — never claimed by the machine. */
export type MachinePresenceStatus = 'connected' | 'stale' | 'offline';

/** How the machine's local memory sidecar stands against the shared mesh. */
export type MachineMemoryMode = 'synced' | 'pending' | 'offline' | 'disabled';

export interface MachineMemoryState {
  mode: MachineMemoryMode;
  /** Records queued locally, awaiting upload (the sidecar's outbox depth). */
  pendingOps?: number;
  /** How stale the machine's read replica is, in seconds. */
  pullCursorAgeS?: number;
  /** Context packs the sidecar has imported, e.g. `capability-registry`. */
  importedPacks?: string[];
}

/** One live agent session on a machine. */
export interface MachineSession {
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

/** A paired machine and its live sessions. */
export interface MachineNode {
  id: string;
  label: string;
  status: MachinePresenceStatus;
  /** `darwin/arm64` — shown as a caption, never parsed. */
  platform?: string;
  sessions: MachineSession[];
}
