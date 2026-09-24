import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatStrip } from './StatStrip';

const meta = {
  title: 'Shared/StatStrip',
  component: StatStrip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    items: [
      { label: 'Agents active', value: 8, hint: '11 in flight' },
      { label: 'Open work', value: 75, tone: 'danger' },
      { label: 'Spend today', value: '$4.12', tone: 'accent' },
    ],
  },
} satisfies Meta<typeof StatStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The Distillation tier flow: counts joined by labelled arrows, with health lines. */
export const TierFlow: Story = {
  args: {
    'aria-label': 'Distillation tiers',
    items: [
      { label: 'L0 Run notes', value: 89, hint: '12 sessions writing' },
      { label: 'L1 Patterns', value: 22, status: { label: '50m behind', tone: 'warning' }, title: 'Last compaction 50 minutes ago' },
      { label: 'L2 Guides', value: 11, status: { label: 'Stalled', tone: 'danger' } },
      { label: 'Library', value: 7, hint: 'linked', href: '#library' },
    ],
    connectors: [{ label: 'Compact' }, { label: 'Compact', tone: 'warning' }, { label: 'Publish' }],
  },
};

export const FramelessFlow: Story = {
  args: { ...TierFlow.args, frameless: true },
};

export const Dark: Story = {
  args: TierFlow.args,
  render: (args) => (
    <div data-theme="dark" className="bg-surface p-4">
      <StatStrip {...args} />
    </div>
  ),
};
