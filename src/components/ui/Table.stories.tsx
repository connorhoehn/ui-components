import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from './Table';

const ROWS = [
  { id: 'r-001', pipeline: 'ingest.events', owner: 'connor' },
  { id: 'r-002', pipeline: 'transform.users', owner: 'aliya' },
  { id: 'r-003', pipeline: 'export.warehouse', owner: 'kim' },
  { id: 'r-004', pipeline: 'enrich.geo', owner: 'connor' },
];

function RunsTable({ striped }: { striped?: boolean }) {
  return (
    <Table>
      <TableHead>
        <TableRow><TableTh>Run</TableTh><TableTh>Pipeline</TableTh><TableTh>Owner</TableTh></TableRow>
      </TableHead>
      <TableBody striped={striped}>
        {ROWS.map((row) => (
          <TableRow key={row.id} clickable>
            <TableTd>{row.id}</TableTd><TableTd>{row.pipeline}</TableTd><TableTd>{row.owner}</TableTd>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const meta: Meta<typeof RunsTable> = { title: 'UI/Table', component: RunsTable, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof RunsTable>;

/** Hand-composed rows stripe by default (since 2.501.0), with the DataTable band. */
export const Striped: Story = {};
/** `TableBody striped={false}` opts out. */
export const Unstriped: Story = { args: { striped: false } };
