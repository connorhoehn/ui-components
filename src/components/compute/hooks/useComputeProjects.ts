// Projects a computer can be charged to.
//
// Kept apart from the fleet because the two have different lifetimes and
// different failure modes. Boxes churn constantly — provisioned, reaped on
// idle, re-created — while a project and its budget outlive all of that. And
// a deployment with no notion of projects simply has no `listProjects` on its
// client, in which case the surface groups by computer exactly as before
// rather than rendering an empty rail.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
export const UNASSIGNED_PROJECT_ID = '__unassigned__';

export function useComputeProjects({
  client,
  projects: provided,
  pollIntervalMs = 60_000,
  enabled = true,
}: UseComputeProjectsOptions): UseComputeProjectsResult {
  const [projects, setProjects] = useState<ComputeProject[]>(provided ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const supported = Boolean(client.listProjects);

  const refresh = useCallback(async () => {
    if (provided || !enabled || !client.listProjects) return;
    const requestId = ++requestIdRef.current;
    setIsLoading(true);
    try {
      const next = await client.listProjects();
      if (requestIdRef.current !== requestId) return;
      setProjects(next);
      setError(null);
    } catch (err) {
      // The previous list stands. Budgets going stale for a minute is far
      // better than a rail that empties itself on one failed poll.
      if (requestIdRef.current === requestId) {
        setError(err instanceof Error ? err.message : 'Failed to list projects');
      }
    } finally {
      if (requestIdRef.current === requestId) setIsLoading(false);
    }
  }, [client, provided, enabled]);

  useEffect(() => {
    if (provided) {
      setProjects(provided);
      return;
    }
    if (!enabled || !supported) return;
    void refresh();
    if (pollIntervalMs <= 0) return;
    const interval = setInterval(() => void refresh(), pollIntervalMs);
    return () => {
      clearInterval(interval);
      requestIdRef.current += 1;
    };
  }, [refresh, provided, enabled, supported, pollIntervalMs]);

  return {
    projects,
    rollups: [],
    absent: !supported && !provided,
    isLoading,
    error,
    refresh,
  };
}

/**
 * Join projects to the fleet.
 *
 * Separate from the hook so a surface that already has both can roll them up
 * without another subscription, and so the join is testable on plain data.
 */
export function rollUpProjects(
  projects: readonly ComputeProject[],
  computers: readonly Computer[],
): ProjectRollup[] {
  const byProject = new Map<string, Computer[]>();
  for (const computer of computers) {
    const key = computer.projectId ?? UNASSIGNED_PROJECT_ID;
    const bucket = byProject.get(key);
    if (bucket) bucket.push(computer);
    else byProject.set(key, [computer]);
  }

  const build = (project: ComputeProject): ProjectRollup => {
    const mine = byProject.get(project.id) ?? [];
    const deadlines = mine
      .map((c) => c.stopsInMs)
      .filter((ms): ms is number => typeof ms === 'number');
    return {
      ...project,
      computers: mine,
      activeCount: mine.filter((c) => c.status === 'running' || c.status === 'waiting').length,
      soonestExpiryMs: deadlines.length > 0 ? Math.min(...deadlines) : null,
      liveSpendUsd: mine.reduce((total, c) => total + (c.spendUsd ?? 0), 0),
      liveTokens: mine.reduce((total, c) => total + (c.tokensUsed ?? 0), 0),
    };
  };

  const rollups = projects.map(build);

  // Unassigned boxes are still real and still cost money. Hiding them because
  // they lack a cost centre is how a fleet quietly grows an untracked tail.
  const orphans = byProject.get(UNASSIGNED_PROJECT_ID) ?? [];
  if (orphans.length > 0) {
    rollups.push(build({ id: UNASSIGNED_PROJECT_ID, name: 'No project' }));
  }

  return rollups;
}

/** `84.2k`, `1.3M` — a token count is scale, not an exact figure. */
export function formatTokens(tokens: number): string {
  if (!Number.isFinite(tokens) || tokens < 0) return '—';
  if (tokens < 1_000) return String(Math.round(tokens));
  if (tokens < 1_000_000) return `${(tokens / 1_000).toFixed(tokens < 10_000 ? 1 : 0)}k`;
  return `${(tokens / 1_000_000).toFixed(1)}M`;
}

/** Convenience: the rollup for one project id. */
export function useProjectRollups(
  projects: readonly ComputeProject[],
  computers: readonly Computer[],
): ProjectRollup[] {
  return useMemo(() => rollUpProjects(projects, computers), [projects, computers]);
}
