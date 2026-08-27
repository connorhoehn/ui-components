// One provider for the whole compute surface.
//
// Everything below it — the page, the lab multiplexer, the dock, the
// quick-switch — reads the same fleet, the same client and the same
// capability answer, so two panes can never disagree about whether a box
// exists or whether you are allowed to stop it.

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createComputeClient, type ComputeClient, type ComputeClientOptions, type CreateComputerInput } from '../lib/computeClient';
import { useComputeFleet } from '../hooks/useComputeFleet';
import { rollUpProjects, useComputeProjects, type ProjectRollup } from '../hooks/useComputeProjects';
import { reconcileDock } from '../lib/dockStore';
import { fixtureComputers, fixtureModels, fixtureRuntimeStatus } from '../fixtures/computeFixture';
import { DEFAULT_PANE_KINDS } from '../components/defaultPaneKinds';
import type { PaneKindRegistry } from '../lib/paneKinds';
import type { Computer, ComputeModel, ComputeProject, ComputeRuntimeStatus, ComputeSource } from '../types';

export interface ComputeNotice {
  tone: 'success' | 'error' | 'info';
  title: string;
  detail?: string;
}

export interface ComputeContextValue {
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

const ComputeContext = createContext<ComputeContextValue | null>(null);

export interface ComputeProviderProps {
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

export function ComputeProvider({
  children,
  client: providedClient,
  clientOptions,
  computers: providedComputers,
  useFixtures = true,
  pollIntervalMs = 5_000,
  canManage = false,
  enabled = true,
  models: providedModels,
  projects: providedProjects,
  paneKinds = DEFAULT_PANE_KINDS,
  onNotify,
}: ComputeProviderProps) {
  // Rebuilt only when the options actually change — a fresh client every
  // render would re-run every effect keyed on it, which is a poll loop that
  // never settles.
  const client = useMemo(
    () => providedClient ?? createComputeClient(clientOptions),
    [providedClient, clientOptions],
  );

  const fleet = useComputeFleet({
    client,
    // Zero disables the poll loop and the initial read alike.
    pollIntervalMs: enabled ? pollIntervalMs : 0,
    enabled,
    ...(providedComputers ? { computers: providedComputers } : {}),
    ...(useFixtures ? { fixtures: fixtureComputers } : {}),
  });

  const projectSource = useComputeProjects({
    client,
    enabled,
    ...(providedProjects ? { projects: providedProjects } : {}),
  });

  // Joined here rather than in the hook so the fleet and the projects stay
  // independently refreshable — the fleet polls every few seconds, budgets
  // every minute, and re-reading one should never force the other.
  const projects = useMemo(
    () => rollUpProjects(projectSource.projects, fleet.computers),
    [projectSource.projects, fleet.computers],
  );

  const [runtime, setRuntime] = useState<ComputeRuntimeStatus | null>(
    useFixtures && !providedClient ? null : null,
  );
  const [runtimeError, setRuntimeError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setRuntime(null);
      setRuntimeError(null);
      return;
    }
    let cancelled = false;
    client
      .getStatus()
      .then((status) => {
        if (!cancelled) {
          setRuntime(status);
          setRuntimeError(null);
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setRuntimeError(err instanceof Error ? err.message : 'Runtime status unavailable');
        // Fixtures make the surface explorable with no backend at all, but
        // only when the host asked for them — otherwise a real deployment
        // whose status route is down would claim to be deployed.
        if (useFixtures) setRuntime(fixtureRuntimeStatus);
      });
    return () => {
      cancelled = true;
    };
  }, [client, useFixtures, enabled]);

  // Tabs restored from a previous session can point at boxes that no longer
  // exist. The dock cannot know that — it deliberately holds no fleet — so
  // the reconciliation happens here, once the real list has arrived.
  useEffect(() => {
    if (fleet.source === 'fixture' || fleet.isLoading) return;
    reconcileDock(fleet.computers.map((c) => c.sessionId));
  }, [fleet.computers, fleet.source, fleet.isLoading]);

  const catalogue = providedModels ?? fixtureModels;
  const models = useMemo(() => {
    // An unfiltered picker is worse than none: the container falls back to its
    // default for anything off the allowlist *without saying so*, so an
    // un-honoured choice looks exactly like an honoured one.
    const allowed = runtime?.allowedModels;
    if (!allowed || allowed.length === 0) return catalogue;
    return catalogue.filter((m) => allowed.includes(m.id));
  }, [catalogue, runtime?.allowedModels]);

  const value = useMemo<ComputeContextValue>(
    () => ({
      client,
      computers: fleet.computers,
      source: fleet.source,
      isLoading: fleet.isLoading,
      error: fleet.error,
      runtime,
      runtimeError,
      models,
      projects,
      projectsAbsent: projectSource.absent,
      canManage,
      paneKinds,
      refresh: fleet.refresh,
      create: fleet.create,
      rename: fleet.rename,
      remove: fleet.remove,
      stop: fleet.stop,
      notify: onNotify ?? (() => {}),
    }),
    [client, fleet, runtime, runtimeError, models, projects, projectSource.absent, canManage, paneKinds, onNotify],
  );

  return <ComputeContext.Provider value={value}>{children}</ComputeContext.Provider>;
}

export function useCompute(): ComputeContextValue {
  const ctx = useContext(ComputeContext);
  if (!ctx) throw new Error('useCompute must be used within a ComputeProvider');
  return ctx;
}

/** Non-throwing variant, for components that are optional inside the surface. */
export function useComputeOptional(): ComputeContextValue | null {
  return useContext(ComputeContext);
}
