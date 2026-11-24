import type { Meta, StoryObj } from '@storybook/react-vite';
import { RowActions } from './RowActions';
import { DataTable } from './DataTable';
import { CheckIcon, RedoIcon, ArrowRightIcon, PlayCircleIcon } from '../ui/Icons';

const meta = {
  title: 'Shared/RowActions',
  component: RowActions,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RowActions>;

export default meta;
type Story = StoryObj<typeof meta>;

const log = (what: string) => () => console.log(what);

/** Up to three icon buttons (the label is the tooltip), then the "…" menu. */
export const Default: Story = {
  args: {
    name: 'Take 2a',
    actions: [
      { icon: <CheckIcon />, label: 'Approve', onClick: log('approve'), primary: true },
      { icon: <RedoIcon />, label: 'Make again', onClick: log('again') },
    ],
    menu: [{ label: 'Open', onSelect: log('open') }, { label: 'Delete', onSelect: log('delete') }, { label: 'Archive', onSelect: log('archive'), disabled: true }],
  },
};

/** Only the menu. */
export const MenuOnly: Story = { args: { name: 'Wall clock', menu: [{ label: 'Open', onSelect: log('open') }] } };

const RUNS = [
  { id: 'r1', name: 'Rented #3', status: 'Waiting for review' },
  { id: 'r2', name: 'Preview #1', status: 'Waiting for review' },
  { id: 'r3', name: 'Rented #1', status: 'Cancelled' },
];

/** At the end of a `DataTable` row: pressing an action never opens the row. */
export const InATable: Story = {
  render: () => (
    <DataTable data={RUNS} columns={[{ key: 'name', header: 'Run' }, { key: 'status', header: 'Status' }]} keyField={(r) => r.id}
      size="sm" headerCase="sentence" rowActionsHeader="Operations" onRowClick={(r) => console.log('row', r.id)}
      rowActions={(r) => (
        <RowActions name={r.name}
          actions={[
            r.status === 'Waiting for review' && { icon: <PlayCircleIcon />, label: 'Watch', onClick: log('watch') },
            { icon: <ArrowRightIcon />, label: 'Open', onClick: log('open') },
          ]}
          menu={[{ label: 'Cancel run', onSelect: log('cancel') }]} />
      )} />
  ),
} as unknown as Story;

/** A menu item that asks in place before it runs, and a disabled one that says why (since 2.545.0). */
export const ConfirmAndDisabledReason: Story = {
  args: {
    name: 'Take 2a',
    actions: [{ icon: <CheckIcon />, label: 'Approve', onClick: log('approve'), primary: true }],
    menu: [
      { label: 'Archive', onSelect: log('archive'), disabled: true, disabledReason: 'It is in the current cut' },
      { label: 'Delete', danger: true, onSelect: log('delete'), confirm: { question: 'Delete Take 2a?', confirmLabel: 'Delete', tone: 'destructive' } },
    ],
  },
};
