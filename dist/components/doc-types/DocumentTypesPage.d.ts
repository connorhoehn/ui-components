export interface DocumentTypesPageProps {
    /**
     * Cognito ID token. When provided, saves dual-write to the new server-side
     * `/api/document-types` endpoint (Phase A.5). Without it, the wizard
     * remains the localStorage-only flow that shipped pre-Phase A.5.
     */
    idToken?: string | null;
}
export declare function DocumentTypesPage({ idToken }?: DocumentTypesPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DocumentTypesPage.d.ts.map