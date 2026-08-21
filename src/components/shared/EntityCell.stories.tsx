import type { Meta, StoryObj } from '@storybook/react-vite';
import { EntityCell } from './EntityCell';

const meta = {
  title: 'Shared/EntityCell',
  component: EntityCell,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof EntityCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Orders pipeline', id: 'pipe_8f3a21' },
};

export const AsLink: Story = {
  args: { label: 'Orders pipeline', id: 'pipe_8f3a21', href: '#' },
};
