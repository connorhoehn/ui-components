export interface ApplicationListPageProps {
    applications: Array<{
        clientId: string;
        clientName: string;
        poolId: string;
        poolName?: string;
        redirectUris: string[];
    }>;
    onCreateApp: () => void;
    onCreateAppWithPool: () => void;
    onEditApp: (clientId: string) => void;
    onDeleteApp: (clientId: string) => Promise<void>;
    loading?: boolean;
}
export declare function ApplicationListPage({ applications, onCreateApp, onCreateAppWithPool, onEditApp, onDeleteApp, loading, }: ApplicationListPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ApplicationListPage.d.ts.map