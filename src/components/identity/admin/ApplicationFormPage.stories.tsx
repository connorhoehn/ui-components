import type { Meta, StoryObj } from '@storybook/react-vite';
import { ApplicationFormPage } from './ApplicationFormPage';

const POOLS = [
  { poolId: 'pool-7f3a2c', poolName: 'Northwind Employees' },
  { poolId: 'pool-3b7e10', poolName: 'Northwind Customers' },
  { poolId: 'pool-c04d99', poolName: 'Partner Portal' },
];

const WEB_APP = {
  clientId: 'cli-9a21',
  clientName: 'Northwind Analytics',
  poolId: 'pool-7f3a2c',
  redirectUris: [
    'https://analytics.northwind.example/oauth/callback',
    'http://localhost:5173/oauth/callback',
  ],
  postLogoutRedirectUris: ['https://analytics.northwind.example/'],
  grantTypes: ['authorization_code', 'refresh_token'],
  responseTypes: ['code'],
  scope: 'openid profile email offline_access',
};

const meta = {
  title: 'Identity/Admin/ApplicationFormPage',
  component: ApplicationFormPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    isEdit: false,
    pools: POOLS,
    onSubmit: () => Promise.resolve(),
    onCancel: () => console.log('cancel'),
  },
} satisfies Meta<typeof ApplicationFormPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Create: one blank redirect URI, `authorization_code` + `code`, and the
 * default `openid profile email` scope.
 */
export const Create: Story = {};

/** Edit a browser app: multiple redirect URIs and refresh-token support. */
export const EditWebApp: Story = {
  args: { application: WEB_APP, isEdit: true },
};

/**
 * A machine-to-machine client: no redirect URIs, `client_credentials` only,
 * and a non-OIDC scope — the grant/response checkbox groups carry the shape.
 */
export const MachineToMachine: Story = {
  args: {
    isEdit: true,
    application: {
      clientId: 'cli-1f05',
      clientName: 'Warehouse Sync Job',
      poolId: 'pool-c04d99',
      redirectUris: [],
      grantTypes: ['client_credentials'],
      responseTypes: [],
      scope: 'warehouse:read warehouse:write',
    },
  },
};

/** Validation failure returned by the server. */
export const WithError: Story = {
  args: {
    application: WEB_APP,
    isEdit: true,
    error: 'redirect_uri must use https outside of localhost.',
  },
};
