export interface PipelineDefSummary {
    id: string;
    name: string;
    status?: string;
    icon?: string;
}
export interface UsePipelineDefsReturn {
    pipelines: PipelineDefSummary[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}
export declare function usePipelineDefs(): UsePipelineDefsReturn;
//# sourceMappingURL=usePipelineDefs.d.ts.map