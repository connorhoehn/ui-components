import type { Meta, StoryObj } from '@storybook/react-vite';
import KPICard from './KPICard';

const meta = {
  title: 'Observability/KPICard',
  component: KPICard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { title: 'Runs today', value: 1284 },
  decorators: [
    (Story) => (
      <div className="w-[240px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof KPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Numbers are locale-formatted; strings pass through verbatim. */
export const Plain: Story = {};

export const WithSparkline: Story = {
  args: { sparklineData: [4, 9, 6, 12, 8, 15, 11, 18] },
};

export const TrendingUp: Story = {
  args: { delta: { value: 12, direction: 'up' } },
};

export const TrendingDown: Story = {
  args: { title: 'Failed (24h)', value: 13, delta: { value: 4, direction: 'down' } },
};

/** Clickable cards draw a primary border on hover and expose `role="button"`. */
export const Clickable: Story = {
  args: { title: 'Pending approvals', value: 2, onClick: () => {} },
};

/**
 * A null metric arrives as the em-dash string — never coerced to 0, so an
 * operator can tell "nothing reported" from "nothing happened".
 */
export const UnknownValue: Story = {
  args: { title: 'Avg first-token latency', value: '—' },
};
