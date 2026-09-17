import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThinkingDots } from './ThinkingDots';

const meta = {
  title: 'Shared/ThinkingDots',
  component: ThinkingDots,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ThinkingDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };

// Colour comes from the text around it, the way every other glyph here works.
export const Toned: Story = { args: { className: 'text-primary' } };
