import type { Meta, StoryObj } from '@storybook/react-vite';
import { EntityTable, type Column, type EntityTableProps } from './EntityTable';
import { StatusBadge } from './StatusBadge';
import { Button } from '../../ui/Button';

interface UserRow extends Record<string, unknown> {
  userId: string;
  email: string;
  givenName: string;
  status: string;
  createdAt: string;
}

const USERS: UserRow[] = [
  { userId: 'u-001', email: 'dana@northwind.example', givenName: 'Dana', status: 'CONFIRMED', createdAt: '2026-01-14' },
  { userId: 'u-002', email: 'raul@northwind.example', givenName: 'Raul', status: 'UNCONFIRMED', createdAt: '2026-02-02' },
  { userId: 'u-003', email: 'mei@northwind.example', givenName: 'Mei', status: 'FORCE_CHANGE_PASSWORD', createdAt: '2026-03-21' },
  { userId: 'u-004', email: 'omar@northwind.example', givenName: 'Omar', status: 'DISABLED', createdAt: '2026-04-08' },
  { userId: 'u-005', email: 'sofia@northwind.example', givenName: 'Sofia', status: 'CONFIRMED', createdAt: '2026-05-30' },
];

const columns: Column<UserRow>[] = [
  { key: 'email', header: 'Email', sortable: true },
  { key: 'givenName', header: 'Name', sortable: true },
  {
    key: 'status',
    header: 'Status',
    width: '200px',
    render: (item) => <StatusBadge status={item.status} />,
  },
  { key: 'createdAt', header: 'Created', sortable: true, align: 'right' },
];

// Storybook can't carry a generic through `Meta<typeof EntityTable>`, so we
// declare a non-generic wrapper specialised to UserRow (same trick as
// shared/DataTable.stories.tsx).
function UserEntityTable(props: EntityTableProps<UserRow>) {
  return <EntityTable<UserRow> {...props} />;
}

const meta = {
  title: 'Identity/Shared/EntityTable',
  component: UserEntityTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { columns, data: USERS, keyField: 'userId' },
} satisfies Meta<typeof UserEntityTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sortable columns, a rendered cell, and a right-aligned column. */
export const Default: Story = {};

/** Rows are clickable and each carries an action cluster. */
export const WithRowActions: Story = {
  args: {
    onRowClick: (item: UserRow) => console.log('open', item.userId),
    actions: (item: UserRow) => (
      <>
        <Button variant="ghost" size="sm" onClick={() => console.log('edit', item.userId)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => console.log('delete', item.userId)}>
          Delete
        </Button>
      </>
    ),
  },
};

/**
 * The empty state is identity's own contract — a Card with an emoji and a
 * message, not an in-table row.
 */
export const Empty: Story = {
  args: {
    data: [],
    emptyIcon: '👤',
    emptyMessage: 'No users in this pool yet. Create one to get started.',
  },
};

/** Loading wins over the empty branch, so skeleton rows render instead. */
export const Loading: Story = {
  args: { data: [], loading: true },
};
