import type { Meta, StoryObj } from '@storybook/react-vite';
import { CitedRecordList, type CitedRecordItem } from './CitedRecordList';

const records: CitedRecordItem[] = [
  { n: 1, id: 'p-auth-migration', type: 'initiative', title: 'Auth Migration', href: '#auth' },
  { n: 2, id: 'w-2', type: 'work', title: 'Logout leaves the legacy shim cookie alive', subtitle: 'Vera Green', status: 'open', href: '#w2' },
  { n: 3, id: 'w-1', type: 'work', title: 'Tenant-by-tenant cutover', subtitle: 'Nora Chang', status: 'blocked', href: '#w1' },
  { n: 4, id: 'p-001', type: 'person', title: 'Vera Green', subtitle: 'Owner', description: 'Owns Auth Migration and the open logout-cookie bug.', citations: [1, 2], href: '#vera' },
  { n: 5, id: 'p-002', type: 'person', title: 'Nora Chang', subtitle: 'SME', description: 'Assigned to the blocked tenant-by-tenant cutover.', citations: [1, 3], href: '#nora' },
  { n: 6, id: 'p-003', type: 'person', title: 'Nora DaSilva', subtitle: 'SME', description: 'Listed as an initiative subject-matter expert.', citations: [1], href: '#nds' },
];

const meta = {
  title: 'Search/CitedRecordList', component: CitedRecordList, tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { records, onOpen: () => {}, onViewConnections: () => {}, footnote: 'Based on project roles and linked work.' },
} satisfies Meta<typeof CitedRecordList>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Under an assistant answer: people, work to coordinate, numbered sources. */
export const Default: Story = {};
/** An answer that cites people only: no work section, sources still listed. */
export const NoWork: Story = { args: { records: records.filter((r) => r.type !== 'work') } };
export const Dark: Story = { decorators: [(Story) => <div data-theme="dark" className="bg-surface p-4"><Story /></div>] };
