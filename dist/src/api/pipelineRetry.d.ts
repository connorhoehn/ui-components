export interface RetryFromNodeResponse {
    newRunId: string;
    originalRunId: string;
    pipelineId: string;
    retryFromNodeId: string;
    skippedNodes: string[];
    at: string;
}
export interface ForceFailResponse {
    runId: string;
    status: string;
    hint: string;
    at: string;
}
export declare function forceFail(pipelineId: string, runId: string): Promise<ForceFailResponse>;
export declare function retryFromNode(pipelineId: string, runId: string, nodeId: string, inputs?: Record<string, unknown>, snapshotInput?: boolean): Promise<RetryFromNodeResponse>;
//# sourceMappingURL=pipelineRetry.d.ts.map