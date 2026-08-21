import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import UserPicker from './UserPicker';
import { PresenceProvider } from '../../contexts/PresenceContext';
import { IdentityProvider } from '../../contexts/IdentityContext';

// Driven by mocked context shapes — no realtime-modules runtime needed
// (same pattern as the Wrapped* integration stories).
const PRESENCE = {
  presenceUsers: [
    { clientId: 'c1', status: 'online', metadata: { displayName: 'Alex Chen', userId: 'u-alex' } },
    { clientId: 'c2', status: 'online', metadata: { displayName: 'Bo Diaz', userId: 'u-bo' } },
    { clientId: 'c3', status: 'idle', metadata: { displayName: 'Cai Lund', userId: 'u-cai' } },
  ],
  currentClientId: 'c1',
  setTyping: () => {},
};

const IDENTITY = {
  userId: 'u-alex',
  displayName: 'Alex Chen',
  userEmail: 'alex@example.com',
  idToken: null,
  onSignOut: () => {},
};

const meta = {
  title: 'Shared/UserPicker',
  component: UserPicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof UserPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { value: [], onChange: () => {} },
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <PresenceProvider value={PRESENCE}>
        <IdentityProvider value={IDENTITY}>
          <div className="w-80">
            <UserPicker value={value} onChange={setValue} placeholder="Add reviewers…" />
          </div>
        </IdentityProvider>
      </PresenceProvider>
    );
  },
};

export const MaxTwo: Story = {
  args: { value: [], onChange: () => {}, maxSelect: 2 },
  render: () => {
    const [value, setValue] = useState<string[]>(['u-alex', 'u-bo']);
    return (
      <PresenceProvider value={PRESENCE}>
        <IdentityProvider value={IDENTITY}>
          <div className="w-80">
            <UserPicker value={value} onChange={setValue} maxSelect={2} />
          </div>
        </IdentityProvider>
      </PresenceProvider>
    );
  },
};
