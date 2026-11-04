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

export const Default: Story = {};
/** Zebra rows on `surface-inset`, DataTable's stripe; hover stays darker than the stripe. */
export const Striped: Story = { args: { striped: true, items: [
  ...meta.args.items,
  { id: 'traces', title: 'Trace sampling rules', description: 'ORG-OBS-14', meta: '3 pts' },
  { id: 'retention', title: 'Log retention tiers', description: 'ORG-OBS-15', meta: '8 pts', disabled: true, disabledReason: 'Waiting on the storage review' },
] } };
export const StripedWithColumns: Story = { args: { striped: true, size: 'sm',
  columns: [{ id: 'owner', width: 'lg', label: 'Owner' }, { id: 'points', width: 'xs', align: 'end', label: 'Points' }],
  items: meta.args.items.map((item, index) => ({ ...item, meta: undefined, cells: { owner: ['Layla Hassan', 'Ken Ito', 'Ana Ruiz'][index], points: item.meta } })),
} };
export const StripedWithStatus: Story = { args: { striped: true,
  items: meta.args.items.map((item, index) => index === 1 ? { ...item, tone: 'warning', description: 'ORG-OBS-10 · Blocked' } : item),
} };
export const Dark: Story = { ...StripedWithStatus,
  decorators: [(Story) => <div data-theme="dark" className="bg-surface p-4"><Story /></div>],
};
