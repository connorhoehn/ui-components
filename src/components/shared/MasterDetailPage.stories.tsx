import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MasterDetailPage } from './MasterDetailPage';
import { GroupedList } from './GroupedList';
import { KeyValue } from './KeyValue';
import { Button } from '../ui/Button';
import { ColumnDock } from '../layout/DockedColumn';
import { PageSection } from '../ui/PageSection';

const REQUESTS = Array.from({ length: 24 }, (_, i) => ({ id: `r${i}`, title: `Access request ${i + 1}`, who: ['Ana', 'Raj', 'Lee'][i % 3]!, group: i % 4 === 0 ? 'urgent' : 'pending' }));

const meta: Meta<typeof MasterDetailPage> = {
  title: 'Templates/MasterDetailPage',
  component: MasterDetailPage,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-[600px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof MasterDetailPage>;

/** A list rail you pick from and the picked record beside it; nothing picked shows the empty state. */
export const Requests: Story = {
  render: () => {
    const [id, setId] = useState<string | null>(null);
    const current = REQUESTS.find((r) => r.id === id) ?? null;
    return (
      <MasterDetailPage
        title={current?.title ?? 'Access requests'}
        breadcrumbs={[{ label: 'Access', href: '#' }, { label: current?.title ?? 'Requests' }]}
        actions={current ? <Button size="sm">Approve</Button> : undefined}
        list={{
          label: 'requests', title: 'Requests', count: REQUESTS.length,
          body: <GroupedList groups={[{ id: 'urgent', title: 'Urgent' }, { id: 'pending', title: 'Pending' }]}
            rows={REQUESTS.map((r) => ({ id: r.id, groupId: r.group, title: r.title, subline: r.who }))}
            currentId={id} onOpenRow={(row) => setId(row.id)} />,
        }}
      >
        {current && <KeyValue items={[{ label: 'Requester', value: current.who }, { label: 'Queue', value: current.group }]} />}
      </MasterDetailPage>
    );
  },
};

/**
 * `body="docked"`: a catalog whose overview (nothing selected) docks its command composer at the record column's
 * bottom through `ColumnDock`; picking a row swaps in the record, and `footer` docks there too.
 */
export const DockedOverview: Story = {
  render: () => {
    const [id, setId] = useState<string | null>(null);
    const current = REQUESTS.find((r) => r.id === id) ?? null;
    return (
      <MasterDetailPage
        title={current?.title ?? 'Access requests'}
        breadcrumbs={[{ label: 'Access', href: '#' }, { label: current?.title ?? 'Requests' }]}
        body="docked"
        list={{
          label: 'requests', title: 'Requests', count: REQUESTS.length,
          body: <GroupedList groups={[{ id: 'urgent', title: 'Urgent' }, { id: 'pending', title: 'Pending' }]}
            rows={REQUESTS.map((r) => ({ id: r.id, groupId: r.group, title: r.title, subline: r.who }))}
            currentId={id} onOpenRow={(row) => setId(row.id)} />,
        }}
        emptyDetail={<>
          <KeyValue items={[{ label: 'Open', value: String(REQUESTS.length) }, { label: 'Urgent', value: String(REQUESTS.filter((r) => r.group === 'urgent').length) }]} />
          <ColumnDock>
            <PageSection title="Command" className="border-t border-border px-[var(--ui-page-gutter,1.5rem)] py-3">The overview's composer, docked at the column's bottom.</PageSection>
          </ColumnDock>
        </>}
      >
        {current && <KeyValue items={[{ label: 'Requester', value: current.who }, { label: 'Queue', value: current.group }]} />}
      </MasterDetailPage>
    );
  },
};
