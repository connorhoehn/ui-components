import type { Meta, StoryObj } from '@storybook/react-vite';
import Sparkline from './Sparkline';

const meta = {
  title: 'Shared/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: [3, 5, 4, 7, 6, 8, 9, 7, 10, 12] },
};

export const Falling: Story = {
  args: { data: [12, 11, 10, 9, 8, 6, 5, 4, 3, 2], color: 'var(--color-danger)' },
};

export const Wide: Story = {
  args: { data: [3, 5, 4, 7, 6, 8, 9, 7, 10, 12, 11, 14, 13, 16], width: 200 },
};

export const Empty: Story = {
  args: { data: [] },
};
