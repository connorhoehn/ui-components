export type PipelineModuleDashboardSource = 'bridge' | 'stub' | 'error';
export interface PipelineModuleDashboardSummary {
    totalResources: number;
    healthyResources: number;
    activeConnections: number;
    throughput: number;
}
export interface PipelineModuleDashboardChart {
    title: string;
    type: 'line' | 'bar' | 'pie' | 'gauge';
    data: unknown;
}
export interface PipelineModuleDashboardAlert {
    level: 'info' | 'warning' | 'error' | 'critical';
    message: string;
    timestamp: number;
}
export interface PipelineModuleDashboard {
    moduleId: string;
    moduleName: string;
    state: string;
    summary: PipelineModuleDashboardSummary;
    charts: PipelineModuleDashboardChart[];
    alerts?: PipelineModuleDashboardAlert[];
    source: PipelineModuleDashboardSource;
}
export interface UsePipelineModuleDashboardResult {
    data: PipelineModuleDashboard | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}
export declare function usePipelineModuleDashboard(): UsePipelineModuleDashboardResult;
export default usePipelineModuleDashboard;
//# sourceMappingURL=usePipelineModuleDashboard.d.ts.map