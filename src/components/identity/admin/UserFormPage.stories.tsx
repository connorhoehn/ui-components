import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserFormPage } from './UserFormPage';

const EXISTING_USER = {
  userId: 'u-001',
  email: 'dana@northwind.example',
  givenName: 'Dana',
  familyName: 'Okafor',
  nickname: 'dee',
  picture: 'https://cdn.northwind.example/avatars/dana.png',
  website: 'https://dana.example',
  customAttributes: { department: 'Platform', employeeNumber: 4471 },
};

const CUSTOM_ATTRS = {
  department: 'string',
  employeeNumber: 'number',
  costCentre: 'string',
};

const meta = {
  title: 'Identity/Admin/UserFormPage',
  component: UserFormPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    isEdit: false,
    poolId: 'pool-7f3a2c',
    onSubmit: () => Promise.resolve(),
    onCancel: () => console.log('cancel'),
  },
} satisfies Meta<typeof UserFormPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Create: standard OIDC profile claims only. */
export const Create: Story = {};

/** Edit: the form seeds from `user`, and the password field stays blank. */
export const Edit: Story = {
  args: { user: EXISTING_USER, isEdit: true },
};

/**
 * The pool declares custom attributes, so extra fields are appended and
 * coerced per the declared type before they reach `onSubmit`.
 */
export const WithCustomAttributes: Story = {
  args: {
    user: EXISTING_USER,
    isEdit: true,
    customAttributeDefinitions: CUSTOM_ATTRS,
  },
};

/** Server-side rejection surfaced above the form. */
export const WithError: Story = {
  args: {
    isEdit: false,
    error: 'A user with that email already exists in this pool.',
  },
};
