export interface ApplicationPoolFormPageProps {
    onSubmit: (data: {
        clientName: string;
        poolName: string;
        redirectUris: string[];
        grantTypes?: string[];
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}
export declare function ApplicationPoolFormPage({ onSubmit, onCancel, error }: ApplicationPoolFormPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ApplicationPoolFormPage.d.ts.map