import type { Meta, StoryObj } from '@storybook/react-vite';
import UserChip from './UserChip';

const meta = {
  title: 'Shared/UserChip',
  component: UserChip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    presence: {
      control: 'select',
      options: [undefined, 'online', 'away', 'busy', 'offline', 'unknown'],
    },
    avatarSize: { control: { type: 'number', min: 16, max: 40, step: 2 } },
  },
} satisfies Meta<typeof UserChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NameOnly: Story = { args: { name: 'Alice Wong' } };
export const WithHandle: Story = {
  args: { name: 'Alice Wong', label: '@alice' },
};
export const Online: Story = { args: { name: 'Alice Wong', presence: 'online' } };
export const Clickable: Story = {
  args: {
    name: 'Alice Wong',
    presence: 'online',
    onClick: () => console.log('opened Alice profile'),
  },
};

export const Roster: Story = {
  args: { name: 'placeholder' },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <UserChip name="Alice Wong" presence="online" />
      <UserChip name="Bob Lin" presence="away" />
      <UserChip name="Charlie Kim" presence="busy" />
      <UserChip name="Dana Park" presence="offline" />
      <UserChip name="Connor" label="@connor" />
    </div>
  ),
};
