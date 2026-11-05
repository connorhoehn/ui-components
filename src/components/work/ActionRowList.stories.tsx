import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionRowList } from './ActionRowList';

const meta = {
  title: 'Work/ActionRowList', component: ActionRowList, tags: ['autodocs'],
  args: { items: [
    { id: 'alerts', title: 'Group duplicate alerts', description: 'ORG-OBS-11', meta: '2 pts' },
    { id: 'dashboards', title: 'Error-budget dashboards', description: 'ORG-OBS-10', meta: '3 pts' },
    { id: 'metrics', title: 'Metric cardinality budgets', description: 'ORG-OBS-13', meta: '5 pts' },
  ] },
} satisfies Meta<typeof ActionRowList>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Striped by default since 2.501.0. */
export const Default: Story = {};
export const Unstriped: Story = { args: { striped: false } };
export const Striped: Story = { args: { striped: true } };
export const StripedWithStatus: Story = { args: { striped: true,
  items: meta.args.items.map((item, index) => index === 1 ? { ...item, tone: 'warning', description: 'ORG-OBS-10 · Blocked' } : item),
} };
export const Dark: Story = { ...StripedWithStatus,
  decorators: [(Story) => <div data-theme="dark" className="bg-surface p-4"><Story /></div>],
};
