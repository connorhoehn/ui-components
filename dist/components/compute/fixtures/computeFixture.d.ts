import type { Computer, ComputeModel, ComputeProject, ComputeRuntimeStatus, MachineNode, WorkspaceSnapshot } from '../types';
export declare const fixtureComputers: Computer[];
/**
 * Sample projects. Deliberately uneven — one comfortably inside its budget,
 * one where the recurring upkeep has eaten most of the allocation, and one
 * with no budget at all — because a demo where every meter reads 40% teaches
 * nothing about what the meters are for.
 */
export declare const fixtureProjects: ComputeProject[];
export declare const fixtureRuntimeStatus: ComputeRuntimeStatus;
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
/**
 * Sample machines for MachinePresenceMenu. Deliberately uneven, like the
 * projects above: one healthy machine mixing local and platform models, and
 * one stale workstation whose sidecar is queuing offline — the two states the
 * menu exists to distinguish.
 */
export declare const fixtureMachines: MachineNode[];
export declare const fixtureWorkspace: WorkspaceSnapshot;
//# sourceMappingURL=computeFixture.d.ts.map