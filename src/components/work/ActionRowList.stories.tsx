import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionRowList } from './ActionRowList';
import { Button } from '../ui/Button';

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

/** Striped by default since 2.504.0. */
export const Default: Story = {};
export const Unstriped: Story = { args: { striped: false } };
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

const NEEDS_ME = [
  { id: 'storyboard', title: 'Episode 2 storyboard is waiting for your approval', description: 'Storyboard · 12 shots' },
  { id: 'voice', title: 'Narrator voice take', description: 'Dialogue · 3 lines' },
  { id: 'notes', title: 'Director notes on the alley plate', description: 'Recorded direction' },
].map((item) => ({
  ...item,
  trailing: item.id === 'notes' ? undefined : (
    <>
      <Button size="sm" variant="secondary" data-testid={`approve-${item.id}`}>Approve</Button>
      <Button size="sm" variant="secondary" data-testid={`reject-${item.id}`}>Request changes</Button>
    </>
  ),
}));

/**
 * `trailing` (2.509.0): the row's own buttons beside its button, not in it.
 * Wide they sit at the row's end; below a 35rem row they wrap under the title.
 */
export const TrailingControls: Story = {
  args: { items: NEEDS_ME },
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="w-[960px]">
        <ActionRowList tone="warning" accent="bar" items={NEEDS_ME.map((item) => ({ ...item, cells: { state: 'Review', updated: '2m ago' } }))} onOpen={() => {}} data-testid="wide"
          columns={[{ id: 'state', width: 'md', label: 'State' }, { id: 'updated', width: 'sm', align: 'end', label: 'Updated' }]} />
      </div>
      <div className="w-[390px]">
        <ActionRowList tone="warning" accent="bar" items={NEEDS_ME} onOpen={() => {}} data-testid="narrow" />
      </div>
    </div>
  ),
};
