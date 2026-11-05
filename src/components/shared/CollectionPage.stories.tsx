import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CollectionPage } from './CollectionPage';
import { Button } from '../ui/Button';
import { StatusPill } from './StatusPill';

interface Bot { id: string; name: string; owner: string; state: 'success' | 'warning' | 'error' }
const BOTS: Bot[] = Array.from({ length: 40 }, (_, i) => ({
  id: `bot-${i}`, name: `Support bot ${i + 1}`, owner: ['Ana', 'Raj', 'Lee'][i % 3]!, state: (['success', 'warning', 'error'] as const)[i % 3]!,
}));
const COLUMNS = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'owner', header: 'Owner' },
  { key: 'state', header: 'State', render: (b: Bot) => <StatusPill state={b.state} label={b.state} /> },
];
const TRAIL = [{ label: 'Build', href: '#' }, { label: 'Bots' }];

const meta: Meta<typeof CollectionPage> = {
  title: 'Templates/CollectionPage',
  component: CollectionPage,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-[640px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof CollectionPage>;

/** Header, toolbar, a striped table that scrolls under them, and the clicked row in a SidePane. */
export const TableWithDetail: Story = {
  render: () => {
    const [q, setQ] = useState('');
    const [selected, setSelected] = useState<Bot | null>(null);
    const rows = BOTS.filter((b) => b.name.toLowerCase().includes(q.toLowerCase()));
    return (
      <CollectionPage
        gutter="page" title="Bots" breadcrumbs={TRAIL} headerActions={<Button size="sm">New bot</Button>}
        toolbar={{ label: 'Bot filters', search: { value: q, onChange: setQ, placeholder: 'Search bots' }, summary: `${rows.length} bots` }}
        table={{ data: rows, columns: COLUMNS, keyField: (b) => b.id, onRowClick: setSelected }}
        empty={{ title: 'No bots match', description: 'Clear the search to see every bot.' }}
        detail={selected ? { title: selected.name, subtitle: `Owned by ${selected.owner}`, onClose: () => setSelected(null), content: <p className="m-0 p-4 text-sm text-text-secondary">Bot settings and recent runs.</p> } : null}
      />
    );
  },
};

export const Loading: Story = { render: () => <CollectionPage gutter="page" title="Bots" loading table={{ data: [], columns: COLUMNS, keyField: (b: Bot) => b.id }} /> };
export const Empty: Story = { render: () => <CollectionPage gutter="page" title="Bots" table={{ data: [], columns: COLUMNS, keyField: (b: Bot) => b.id }} empty={{ title: 'No bots yet', action: <Button size="sm">New bot</Button> }} /> };
export const Failed: Story = { render: () => <CollectionPage gutter="page" title="Bots" error="The bots service did not answer." onRetry={() => {}} table={{ data: BOTS, columns: COLUMNS, keyField: (b: Bot) => b.id }} /> };
