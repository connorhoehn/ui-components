import type { Meta, StoryObj } from '@storybook/react-vite';
import { PersonHoverCard } from './PersonHoverCard';
import { Button } from '../ui/Button';

// Hover the name and wait ~450ms. Then move the pointer INTO the card — it
// must survive the trip, or the actions inside are decorative.

const meta: Meta<typeof PersonHoverCard> = {
  title: 'Shared/PersonHoverCard',
  component: PersonHoverCard,
  decorators: [
    (Story) => (
      <div style={{ padding: 80, maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PersonHoverCard>;

const NORA = {
  displayName: 'Nora DaSilva',
  title: 'Staff Engineer',
  department: 'Platform · Realtime',
  email: 'nora.dasilva@example.com',
  localTime: '3:42 PM',
  online: true,
  statusText: 'In a meeting until 4',
};

export const InProse: Story = {
  name: 'Inline in a sentence',
  args: {
    person: NORA,
    children: 'Nora DaSilva',
    actions: (
      <>
        <Button size="sm" variant="primary">Message</Button>
        <Button size="sm" variant="secondary">Call</Button>
      </>
    ),
  },
  render: (args) => (
    <p style={{ fontSize: 14, lineHeight: 1.7 }}>
      Run by <PersonHoverCard {...args} /> — the card opens on hover after a
      beat, and on focus immediately.
    </p>
  ),
};

/** Nothing but a name: no title, no email, no status. */
export const Sparse: Story = {
  args: { person: { displayName: 'Sam Ruiz' }, children: 'Sam Ruiz' },
};

export const Offline: Story = {
  args: {
    person: { ...NORA, online: false, statusText: undefined },
    children: 'Nora DaSilva',
  },
};
