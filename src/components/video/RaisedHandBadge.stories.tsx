import type { Meta, StoryObj } from '@storybook/react-vite';
import { RaisedHandBadge } from './RaisedHandBadge';

const meta = {
  title: 'Video/RaisedHandBadge',
  component: RaisedHandBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RaisedHandBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Raised: Story = { args: { raised: true } };
export const SecondInLine: Story = { args: { raised: 2, size: 'md' } };
export const OnATile: Story = {
  args: { raised: 1, tone: 'overlay' },
  decorators: [(Story) => <div className="rounded bg-video-tile p-3"><Story /></div>],
};
