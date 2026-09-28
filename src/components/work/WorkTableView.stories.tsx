import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkTableView } from './WorkTableView';
import type { WorkListItem } from './WorkListView';

const groups = [
  { id: 'next', title: 'Next up' },
  { id: 'progress', title: 'In progress' },
  { id: 'done', title: 'Done', defaultOpen: false },
];
const items: WorkListItem[] = [
  { id: 'bug', groupId: 'next', title: 'Breaking prop rename slipped through', kindLabel: 'Bug', points: 3, owner: { id: 'iv', name: 'Isabel Vasquez' } },
  { id: 'task', groupId: 'progress', title: 'Publish typed component contracts', kindLabel: 'Task', points: 5, owner: { id: 'bo', name: 'Ben Okafor' } },
  { id: 'release', groupId: 'done', title: 'Publish stable release', kindLabel: 'Task', points: 2, done: true },
];

const meta = {
  title: 'Work/WorkTableView', component: WorkTableView, tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { items, groups, query: '', onQueryChange: () => {}, onOpenItem: () => {}, groupColors: { done: 'var(--color-success)' } },
} satisfies Meta<typeof WorkTableView>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Full-width counterpart to WorkListView. Data, filtering, sorting and writes
 * stay in the host; grouping and row disclosures stay in the component. */
export const Default: Story = {
  render: (args) => {
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('title');
    const [selected, setSelected] = useState<string | null>(null);
    const visible = items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'points' ? (b.points ?? 0) - (a.points ?? 0) : a.title.localeCompare(b.title));
    return <WorkTableView {...args} items={visible} count={items.length} query={query} onQueryChange={setQuery}
      currentId={selected} onOpenItem={(item) => setSelected(item.id)} sort={sort} onSortChange={setSort}
      sortOptions={[{ value: 'title', label: 'Title' }, { value: 'points', label: 'Points' }]} />;
  },
};
export const Narrow: Story = { decorators: [(Story) => <div className="max-w-md"><Story /></div>] };
export const Dark: Story = { decorators: [(Story) => <div data-theme="dark" className="bg-surface"><Story /></div>] };
export const Loading: Story = { args: { loading: true } };
export const FailedRead: Story = { args: { error: 'The work list could not be read.', onRetry: () => {} } };
export const Empty: Story = { args: { items: [], emptyLabel: 'No work matches these filters' } };
export const Editable: Story = { args: { onToggleDone: () => {} } };
