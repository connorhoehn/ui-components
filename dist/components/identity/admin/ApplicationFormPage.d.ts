export interface ApplicationFormPageProps {
    application?: {
        clientId?: string;
        clientName: string;
        poolId: string;
        redirectUris: string[];
        postLogoutRedirectUris?: string[];
        grantTypes: string[];
        responseTypes?: string[];
        scope?: string;
    };
    isEdit: boolean;
    pools: Array<{
        poolId: string;
        poolName: string;
    }>;
    onSubmit: (data: {
        clientName: string;
        poolId: string;
        redirectUris: string[];
        postLogoutRedirectUris: string[];
        grantTypes: string[];
        responseTypes: string[];
        scope: string;
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}
export declare function ApplicationFormPage({ application, isEdit, pools, onSubmit, onCancel, error, }: ApplicationFormPageProps): import("react").JSX.Element;
//# sourceMappingURL=ApplicationFormPage.d.ts.map