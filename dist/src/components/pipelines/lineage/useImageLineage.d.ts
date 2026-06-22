export interface ImageLineageEntry {
    imageId: string;
    producedByStepId: string;
    producedByNodeKind: string;
    parentImageId?: string;
    width: number;
    height: number;
    mimeType: string;
    bbox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    at: string;
}
export interface UseImageLineageResult {
    entries: ImageLineageEntry[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}
export declare function clearImageLineageCache(): void;
export declare function useImageLineage(runId: string | null | undefined, pipelineId: string | null | undefined): UseImageLineageResult;
export default useImageLineage;
//# sourceMappingURL=useImageLineage.d.ts.map