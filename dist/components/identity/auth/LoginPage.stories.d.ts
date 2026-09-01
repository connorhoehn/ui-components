import type { StoryObj } from '@storybook/react-vite';
import { LoginPage } from './LoginPage';
declare const meta: {
    title: string;
    component: typeof LoginPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        uid: string;
        interactionUrl: string;
        onLogin: () => Promise<void>;
        onRegister: () => Promise<void>;
        onForgotPassword: () => Promise<void>;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** All three tabs available — the default OIDC interaction screen. */
export declare const Default: Story;
/** Branded by the relying party: logo + client name in the header. */
export declare const Branded: Story;
/**
 * Server-side error passed down after a failed POST — rendered above the tabs
 * and not cleared by tab switching (that only clears the local error).
 */
export declare const WithServerError: Story;
/**
 * Sign-in only. With registration and password recovery disabled the tab bar
 * collapses to a single tab — the shape a corporate SSO pool ships.
 */
export declare const SignInOnly: Story;
/**
 * Opened straight on the registration form via `defaultTab` — the shape an
 * OIDC host renders for a `?screen_hint=signup` deep link. The prop is
 * initial-only, so the tab bar still switches away from it.
 */
export declare const RegisterTab: Story;
/** Opened straight on the password-recovery form via `defaultTab`. */
export declare const ForgotPasswordTab: Story;
/**
 * `defaultTab` never wins over the `*Enabled` flags: a disabled tab is
 * ignored and the page falls back to sign-in.
 */
export declare const DisabledDefaultTabFallsBack: Story;
/**
 * Submitting rejects, so the form surfaces the thrown message as its local
 * error. Type anything and press Sign In.
 */
export declare const RejectsOnSubmit: Story;
//# sourceMappingURL=LoginPage.stories.d.ts.map