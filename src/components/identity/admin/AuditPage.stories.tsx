import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuditPage } from './AuditPage';

const now = Date.UTC(2026, 7, 20, 14, 0, 0);
const minutes = (n: number) => now - n * 60_000;

const RECORDS = [
  { timestamp: minutes(2), actor: { id: 'u-001', email: 'ops@northwind.example' }, entityType: 'user', entityId: 'u-014', operation: 'create' },
  { timestamp: minutes(9), actor: { id: 'u-001', email: 'ops@northwind.example' }, entityType: 'user', entityId: 'u-014', operation: 'update' },
  { timestamp: minutes(31), actor: 'system', entityType: 'pool', entityId: 'pool-7f3a2c', operation: 'update' },
  { timestamp: minutes(88), actor: { email: 'dana@northwind.example' }, entityType: 'client', entityId: 'cli-9a21', operation: 'delete' },
  { timestamp: minutes(240), actor: 'migration-job', entityType: 'group', entityId: 'grp-004', operation: 'create' },
];

// Annotated so `satisfies Meta<…>` keeps the nullable return type — otherwise
// the "no snapshot" story cannot supply `null`.
const replaySnapshot = (): Promise<Record<string, unknown> | null> =>
  Promise.resolve({
    userId: 'u-014',
    email: 'new.hire@northwind.example',
    status: 'UNCONFIRMED',
    givenName: 'New',
  });

const meta = {
  title: 'Identity/Admin/AuditPage',
  component: AuditPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    records: RECORDS,
    totalRecords: RECORDS.length,
    onQuery: () => Promise.resolve(),
    onViewEntity: (type: string, id: string) => console.log('view', type, id),
    onReplay: replaySnapshot,
  },
} satisfies Meta<typeof AuditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A mixed log: object actors (id + email), bare string actors for machine
 * principals, and all three operations.
 */
export const Default: Story = {};

/**
 * Point-in-time replay returns no snapshot — the entity did not exist at the
 * requested timestamp. Fill the replay fields and submit to see it.
 */
export const ReplayReturnsNothing: Story = {
  args: { onReplay: () => Promise.resolve(null) },
};

/** No records match the current filters. */
export const NoResults: Story = {
  args: { records: [], totalRecords: 0 },
};

export const Loading: Story = {
  args: { records: [], loading: true },
};
