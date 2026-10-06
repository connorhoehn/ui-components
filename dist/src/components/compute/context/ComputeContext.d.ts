import { type ReactNode } from 'react';
import { type ComputeClient, type ComputeClientOptions, type CreateComputerInput } from '../lib/computeClient';
import { type ProjectRollup } from '../hooks/useComputeProjects';
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
export declare function ComputeProvider({ children, client: providedClient, clientOptions, computers: providedComputers, useFixtures, pollIntervalMs, canManage, enabled, models: providedModels, projects: providedProjects, paneKinds, onNotify, }: ComputeProviderProps): import("react").JSX.Element;
export declare function useCompute(): ComputeContextValue;
/** Non-throwing variant, for components that are optional inside the surface. */
export declare function useComputeOptional(): ComputeContextValue | null;
//# sourceMappingURL=ComputeContext.d.ts.map