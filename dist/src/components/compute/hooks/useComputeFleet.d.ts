import type { ComputeClient, CreateComputerInput } from '../lib/computeClient';
import type { Computer, ComputeSource } from '../types';
export interface UseComputeFleetOptions {
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
export interface UseComputeFleetResult {
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
export declare function useComputeFleet({ client, pollIntervalMs, computers: provided, fixtures, enabled, readopt, }: UseComputeFleetOptions): UseComputeFleetResult;
//# sourceMappingURL=useComputeFleet.d.ts.map