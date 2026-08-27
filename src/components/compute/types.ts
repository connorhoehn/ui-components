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
   * What this box is working on — the repository or initiative its workspace
   * was bootstrapped with, e.g. `Project A` or `acme/api`.
   *
   * The single most useful field on a pane you are not looking at. A fleet of
   * boxes named `computer-1..6` is unreadable; the same fleet labelled by what
   * each one is checked out against is a dashboard.
   */
  project?: string;
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
