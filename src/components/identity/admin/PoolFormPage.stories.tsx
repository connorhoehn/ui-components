import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoolFormPage } from './PoolFormPage';

const EXISTING_POOL = {
  poolId: 'pool-7f3a2c',
  poolName: 'Northwind Employees',
  customAttributes: {
    department: 'string',
    employeeNumber: 'number',
  },
  settings: {
    mfaConfiguration: 'REQUIRED' as const,
    passwordPolicy: {
      minLength: 14,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
    },
    accountRecovery: { email: true, sms: false },
  },
};

const meta = {
  title: 'Identity/Admin/PoolFormPage',
  component: PoolFormPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    isEdit: false,
    onSubmit: () => Promise.resolve(),
    onCancel: () => console.log('cancel'),
  },
} satisfies Meta<typeof PoolFormPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Create: empty name, MFA off, and the default password policy. */
export const Create: Story = {};

/**
 * Edit: the form seeds its state from `pool` on mount, so a stricter policy
 * and two custom attributes come through pre-filled.
 */
export const Edit: Story = {
  args: { pool: EXISTING_POOL, isEdit: true },
};

/** A server-side failure surfaced above the form. */
export const WithError: Story = {
  args: {
    pool: EXISTING_POOL,
    isEdit: true,
    error: 'A pool named "Northwind Employees" already exists.',
  },
};

/**
 * Submit never resolves — press Save and the buttons stay in their pending
 * state instead of flicking back.
 */
export const SubmitPending: Story = {
  args: {
    pool: EXISTING_POOL,
    isEdit: true,
    onSubmit: () => new Promise<void>(() => {}),
  },
};
