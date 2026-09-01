export interface DiagnosticsPageProps {
    diagnostics?: Record<string, unknown>;
    rates?: Record<string, unknown>;
    dlq?: Array<{
        id: string;
        payload: unknown;
        error: string;
        failedAt: string;
        retryCount: number;
    }>;
    onRedrive: (id: string) => Promise<void>;
    onPurge: (id: string) => Promise<void>;
    onRefresh: () => void;
    loading?: boolean;
}
export declare function DiagnosticsPage({ diagnostics, rates, dlq, onRedrive, onPurge, onRefresh, loading, }: DiagnosticsPageProps): import("react").JSX.Element;
//# sourceMappingURL=DiagnosticsPage.d.ts.map