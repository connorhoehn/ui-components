import type { Meta, StoryObj } from '@storybook/react-vite';
import SkeletonCard from './SkeletonCard';

const meta = {
  title: 'Shared/SkeletonCard',
  component: SkeletonCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SkeletonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: { height: 32 },
};

export const Tall: Story = {
  args: { height: 200 },
};

export const FixedWidth: Story = {
  args: { width: 240, height: 80 },
};
