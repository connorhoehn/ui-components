import type { Meta, StoryObj } from '@storybook/react-vite';
import PresenceDot from './PresenceDot';

const meta = {
  title: 'Shared/PresenceDot',
  component: PresenceDot,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    state: {
      control: 'radio',
      options: ['online', 'away', 'busy', 'offline', 'unknown'],
    },
    size: { control: 'radio', options: ['xs', 'sm', 'md'] },
    pulse: { control: 'boolean' },
  },
} satisfies Meta<typeof PresenceDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = { args: { state: 'online' } };
export const Away: Story = { args: { state: 'away' } };
export const Busy: Story = { args: { state: 'busy' } };
export const Offline: Story = { args: { state: 'offline' } };
export const WithLabel: Story = { args: { state: 'online', label: 'In a meeting' } };
export const Large: Story = { args: { state: 'online', size: 'md' } };

export const Gallery: Story = {
  args: { state: 'online' },
  render: () => (
    <div className="flex flex-col gap-2">
      <PresenceDot state="online" label="Online" />
      <PresenceDot state="away" label="Away — 5m" />
      <PresenceDot state="busy" label="In a meeting" />
      <PresenceDot state="offline" label="Offline" />
      <PresenceDot state="unknown" label="Last seen unknown" />
    </div>
  ),
};
