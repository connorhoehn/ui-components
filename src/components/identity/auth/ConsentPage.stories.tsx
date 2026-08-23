import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConsentPage } from './ConsentPage';

const resolve = () => Promise.resolve();

const meta = {
  title: 'Identity/Auth/ConsentPage',
  component: ConsentPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    clientName: 'Northwind Analytics',
    scopes: ['openid', 'profile', 'email'],
    onAuthorize: resolve,
    onDeny: resolve,
  },
} satisfies Meta<typeof ConsentPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The standard three-scope OIDC grant. */
export const Default: Story = {};

/** Only identity verification is requested. */
export const MinimalScope: Story = {
  args: { scopes: ['openid'] },
};

/**
 * Unknown scopes fall through to the `Access: <scope>` wording, so custom
 * API scopes still read sensibly without a description table entry.
 */
export const CustomScopes: Story = {
  args: {
    scopes: [
      'openid',
      'profile',
      'email',
      'offline_access',
      'warehouse:read',
      'warehouse:write',
    ],
    redirectUri: 'https://analytics.northwind.example/oauth/callback',
  },
};

/** Full trust prompt: logo, redirect disclosure, and long-lived access. */
export const Branded: Story = {
  args: {
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    redirectUri: 'https://analytics.northwind.example/oauth/callback',
    logoUrl:
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="currentColor"/><circle cx="32" cy="32" r="14" fill="white"/></svg>',
      ),
  },
};
