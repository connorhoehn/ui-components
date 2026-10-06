export interface SetupGuidePageProps {
    status: {
        hasUserPools: boolean;
        poolCount: number;
        hasClients: boolean;
        clientCount: number;
        hasAdminUser: boolean;
        totalUsers: number;
        adminEmails: string[];
        smtpConfigured: boolean;
        smtpHost?: string;
        issuer: string;
        issuerConfigured: boolean;
        wellKnownUrl?: string;
        firstPoolId?: string;
        firstClientId?: string;
    };
    onNavigate: (path: string) => void;
}
export declare function SetupGuidePage({ status, onNavigate }: SetupGuidePageProps): import("react").JSX.Element;
//# sourceMappingURL=SetupGuidePage.d.ts.map