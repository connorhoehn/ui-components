import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginPage } from './LoginPage';

// The page is fully prop-driven: every action is an async callback the host
// supplies, so the stories just resolve/reject to drive the visible state.
const resolve = () => Promise.resolve();
const reject = (message: string) => () => Promise.reject(new Error(message));

const meta = {
  title: 'Identity/Auth/LoginPage',
  component: LoginPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    uid: 'interaction-7f3a2c',
    interactionUrl: '/interaction/7f3a2c',
    onLogin: resolve,
    onRegister: resolve,
    onForgotPassword: resolve,
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All three tabs available — the default OIDC interaction screen. */
export const Default: Story = {};

/** Branded by the relying party: logo + client name in the header. */
export const Branded: Story = {
  args: {
    clientName: 'Northwind Analytics',
    logoUrl:
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="currentColor"/><path d="M18 40l14-20 14 20z" fill="white"/></svg>',
      ),
  },
};

/**
 * Server-side error passed down after a failed POST — rendered above the tabs
 * and not cleared by tab switching (that only clears the local error).
 */
export const WithServerError: Story = {
  args: {
    clientName: 'Northwind Analytics',
    error: 'Incorrect email or password.',
  },
};

/**
 * Sign-in only. With registration and password recovery disabled the tab bar
 * collapses to a single tab — the shape a corporate SSO pool ships.
 */
export const SignInOnly: Story = {
  args: {
    clientName: 'Northwind Internal',
    registrationEnabled: false,
    forgotPasswordEnabled: false,
  },
};

/**
 * Opened straight on the registration form via `defaultTab` — the shape an
 * OIDC host renders for a `?screen_hint=signup` deep link. The prop is
 * initial-only, so the tab bar still switches away from it.
 */
export const RegisterTab: Story = {
  args: { clientName: 'Northwind Analytics', defaultTab: 'register' },
};

/** Opened straight on the password-recovery form via `defaultTab`. */
export const ForgotPasswordTab: Story = {
  args: { clientName: 'Northwind Analytics', defaultTab: 'forgot' },
};

/**
 * `defaultTab` never wins over the `*Enabled` flags: a disabled tab is
 * ignored and the page falls back to sign-in.
 */
export const DisabledDefaultTabFallsBack: Story = {
  args: {
    clientName: 'Northwind Internal',
    defaultTab: 'register',
    registrationEnabled: false,
  },
};

/**
 * Submitting rejects, so the form surfaces the thrown message as its local
 * error. Type anything and press Sign In.
 */
export const RejectsOnSubmit: Story = {
  args: {
    onLogin: reject('Account is locked. Contact your administrator.'),
    onRegister: reject('That email is already registered.'),
    onForgotPassword: reject('Email delivery is currently unavailable.'),
  },
};
