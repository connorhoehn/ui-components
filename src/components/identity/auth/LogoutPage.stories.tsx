import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoutPage } from './LogoutPage';

const meta = {
  title: 'Identity/Auth/LogoutPage',
  component: LogoutPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    onConfirm: () => console.log('signed out'),
  },
} satisfies Meta<typeof LogoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * No `onCancel`, so sign-out is the only way forward — the shape used when
 * the RP has already ended its own session and only the IdP remains.
 */
export const ConfirmOnly: Story = {};

/** Both actions, the usual end-session prompt. */
export const WithCancel: Story = {
  args: { onCancel: () => console.log('cancelled') },
};

/** Names the relying party being signed out of. */
export const ScopedToClient: Story = {
  args: {
    clientName: 'Northwind Analytics',
    onCancel: () => console.log('cancelled'),
  },
};
