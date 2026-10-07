export interface PipelineDefSummary {
    id: string;
    name: string;
    status?: string;
    icon?: string;
}
export interface UsePipelineDefsOptions {
    /** Wins over this library's `useIdentityContext().idToken`. */
    idToken?: string | null;
    /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export interface UsePipelineDefsReturn {
    pipelines: PipelineDefSummary[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}
export declare function usePipelineDefs(options?: UsePipelineDefsOptions): UsePipelineDefsReturn;
//# sourceMappingURL=usePipelineDefs.d.ts.map