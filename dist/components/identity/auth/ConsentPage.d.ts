export interface ConsentPageProps {
    clientName: string;
    scopes: string[];
    redirectUri?: string;
    onAuthorize: () => Promise<void>;
    onDeny: () => Promise<void>;
    logoUrl?: string;
}
export declare function ConsentPage({ clientName, scopes, redirectUri, onAuthorize, onDeny, logoUrl, }: ConsentPageProps): import("react/jsx-runtime").JSX.Element;
export default ConsentPage;
//# sourceMappingURL=ConsentPage.d.ts.map