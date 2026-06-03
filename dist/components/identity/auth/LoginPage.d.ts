export interface LoginPageProps {
    uid: string;
    interactionUrl: string;
    clientName?: string;
    logoUrl?: string;
    error?: string | null;
    onLogin: (email: string, password: string) => Promise<void>;
    onRegister: (data: {
        email: string;
        password: string;
        givenName?: string;
        familyName?: string;
        enableMfa?: boolean;
    }) => Promise<void>;
    onForgotPassword: (email: string) => Promise<void>;
    registrationEnabled?: boolean;
    forgotPasswordEnabled?: boolean;
}
export declare function LoginPage({ uid, interactionUrl, clientName, logoUrl, error, onLogin, onRegister, onForgotPassword, registrationEnabled, forgotPasswordEnabled, }: LoginPageProps): import("react/jsx-runtime").JSX.Element;
export default LoginPage;
//# sourceMappingURL=LoginPage.d.ts.map