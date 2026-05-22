import type { Meta, StoryObj } from '@storybook/react-vite';
import { PresenceAvatars, type PresenceUser } from './PresenceAvatars';

const meta = {
  title: 'Shared/PresenceAvatars',
  component: PresenceAvatars,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PresenceAvatars>;

export default meta;
type Story = StoryObj<typeof meta>;

const makeUsers = (count: number, allOnline = true): PresenceUser[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `user-${i}`,
    name: ['Alice Johnson', 'Bob Smith', 'Carol White', 'Dave Lee', 'Eve Davis',
           'Frank Miller', 'Grace Kim', 'Henry Park', 'Iris Chen', 'Jack Brown',
           'Kara Wilson', 'Leo Martinez', 'Mia Taylor', 'Noah Anderson', 'Olivia Thomas',
           'Paul Jackson', 'Quinn Harris', 'Rose Lewis', 'Sam Clark', 'Tara Hall'][i % 20],
    online: allOnline ? true : i % 3 !== 0,
  }));

export const Three: Story = {
  args: { users: makeUsers(3), size: 32 },
};

export const Five: Story = {
  args: { users: makeUsers(5), size: 32 },
};

export const Ten: Story = {
  args: { users: makeUsers(10), maxVisible: 5, size: 32 },
};

export const Twenty: Story = {
  args: { users: makeUsers(20), maxVisible: 7, size: 32 },
};

export const MixedOnline: Story = {
  args: { users: makeUsers(8, false), maxVisible: 5, size: 32 },
};

export const LargeAvatars: Story = {
  args: { users: makeUsers(4), size: 44 },
};
