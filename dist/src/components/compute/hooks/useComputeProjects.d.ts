import type { ComputeClient } from '../lib/computeClient';
import type { Computer, ComputeProject } from '../types';
export interface UseComputeProjectsOptions {
    client: ComputeClient;
    /** Host-supplied projects. Wins over the client. */
    projects?: ComputeProject[];
    /** Budgets move slowly; polling them at fleet cadence is waste. Default 60s. */
    pollIntervalMs?: number;
    enabled?: boolean;
}
/** A project with the live fleet folded in. */
export interface ProjectRollup extends ComputeProject {
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
export interface UseComputeProjectsResult {
    projects: ComputeProject[];
    /** Projects joined to the fleet, plus a synthetic bucket for unassigned boxes. */
    rollups: ProjectRollup[];
    /** True when the deployment has no projects at all — group by computer instead. */
    absent: boolean;
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}
/** Boxes with no project are still real; they get a bucket rather than vanishing. */
export declare const UNASSIGNED_PROJECT_ID = "__unassigned__";
export declare function useComputeProjects({ client, projects: provided, pollIntervalMs, enabled, }: UseComputeProjectsOptions): UseComputeProjectsResult;
/**
 * Join projects to the fleet.
 *
 * Separate from the hook so a surface that already has both can roll them up
 * without another subscription, and so the join is testable on plain data.
 */
export declare function rollUpProjects(projects: readonly ComputeProject[], computers: readonly Computer[]): ProjectRollup[];
/** `84.2k`, `1.3M` — a token count is scale, not an exact figure. */
export declare function formatTokens(tokens: number): string;
/** Convenience: the rollup for one project id. */
export declare function useProjectRollups(projects: readonly ComputeProject[], computers: readonly Computer[]): ProjectRollup[];
//# sourceMappingURL=useComputeProjects.d.ts.map