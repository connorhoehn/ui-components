import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkItemMetaBar, type WorkMetaOption, type WorkPerson } from './WorkItemMetaBar';

const STATUS: WorkMetaOption[] = [
  { value: 'open', label: 'Open', tone: 'info' },
  { value: 'in-progress', label: 'In progress', tone: 'accent' },
  { value: 'in-review', label: 'In review', tone: 'warning' },
  { value: 'done', label: 'Done', tone: 'success' },
];
const PRIORITY: WorkMetaOption[] = [
  { value: 'high', label: 'High', tone: 'danger' },
  { value: 'medium', label: 'Medium', tone: 'warning' },
  { value: 'low', label: 'Low', tone: 'neutral' },
];
const PEOPLE: WorkPerson[] = [
  { id: 'lh', name: 'Layla Hassan' },
  { id: 'eg', name: 'Eli Garcia' },
  { id: 'nd', name: 'Nora DaSilva' },
];
const searchPeople = (q: string) =>
  new Promise<WorkPerson[]>((r) => setTimeout(() => r(PEOPLE.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))), 200));

function Live({ initial }: { initial: { status: string | null; points: number | null; owner: WorkPerson | null; priority: string | null } }) {
  const [s, setS] = useState(initial);
  return (
    <div className="max-w-[640px]">
      <WorkItemMetaBar
        status={{ value: s.status, options: STATUS, onChange: (status) => setS({ ...s, status }) }}
        points={{ value: s.points, onChange: (points) => setS({ ...s, points }), max: 100 }}
        owner={{ value: s.owner, onSearchPeople: searchPeople, onChange: (owner) => setS({ ...s, owner }) }}
        priority={{ value: s.priority, options: PRIORITY, onChange: (priority) => setS({ ...s, priority }) }}
      />
    </div>
  );
}

const MOCKUP = { status: 'open', points: 5, owner: PEOPLE[0], priority: 'high' };

const meta = {
  title: 'Work/WorkItemMetaBar',
  component: WorkItemMetaBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof WorkItemMetaBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Open ▾ · 5 points · (LH) Layla Hassan · Priority: High ▾" — all editable. */
export const Default: Story = { render: () => <Live initial={MOCKUP} /> };

/** Every field unset, and every one still editable. */
export const Empty: Story = {
  render: () => <Live initial={{ status: null, points: null, owner: null, priority: null }} />,
};

export const ReadOnlyAndPending: Story = {
  render: () => (
    <div className="max-w-[640px]">
      <WorkItemMetaBar
        status={{ value: 'open', options: STATUS, onChange: () => {}, pending: true }}
        points={{ value: 5, readOnlyReason: 'Points are locked once a sprint starts' }}
        owner={{ value: PEOPLE[0], readOnlyReason: 'Only an admin can reassign' }}
        priority={{ value: 'high', options: PRIORITY }}
      />
    </div>
  ),
};

export const Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-surface p-4">
      <Live initial={MOCKUP} />
    </div>
  ),
};
