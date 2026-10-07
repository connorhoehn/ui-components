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
    /**
     * Tab the page opens on. Optional and **initial-only** — the page still
     * owns the tab afterwards, so the tab bar keeps working unchanged. Omit it
     * and the page opens on `'signin'`, which is the historical behaviour.
     *
     * It exists because the register and forgot-password forms were previously
     * reachable only by clicking their tab: an OIDC host cannot honour a
     * `?screen_hint=signup` deep link, a story cannot show either form, and a
     * test has to click a tab before it can assert on the form behind it.
     *
     * A tab that the corresponding `*Enabled` flag has switched off is ignored
     * and `'signin'` is used instead, so this prop can never render a form the
     * host has disabled.
     */
    defaultTab?: LoginTab;
}
/** The three authentication forms the page can show. */
export type LoginTab = 'signin' | 'register' | 'forgot';
export declare function LoginPage({ uid, interactionUrl, clientName, logoUrl, error, onLogin, onRegister, onForgotPassword, registrationEnabled, forgotPasswordEnabled, defaultTab, }: LoginPageProps): import("react").JSX.Element;
export default LoginPage;
//# sourceMappingURL=LoginPage.d.ts.map