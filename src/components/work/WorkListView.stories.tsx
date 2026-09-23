import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkListView, type WorkListGroup, type WorkListItem } from './WorkListView';
import { Checkbox } from '../forms/Checkbox';

const LAYLA = { id: 'lh', name: 'Layla Hassan' };
const ELI = { id: 'eg', name: 'Eli Garcia' };
const NORA = { id: 'nd', name: 'Nora DaSilva' };

const GROUPS: WorkListGroup[] = [
  { id: 'next', title: 'Next up', emptyLabel: 'Nothing up next' },
  { id: 'progress', title: 'In progress', emptyLabel: 'Nothing in progress' },
  { id: 'review', title: 'In review', emptyLabel: 'Nothing waiting for review' },
  { id: 'done', title: 'Done', defaultOpen: false, emptyLabel: 'Nothing done yet' },
];

/** The mockup's eleven items: Next up 4 / In progress 2 / In review 1 / Done 4. */
const ITEMS: WorkListItem[] = [
  { id: 'wi-obs-e1-s4', groupId: 'next', title: 'Decommission legacy StatsD bridge', points: 5, owner: LAYLA },
  { id: 'wi-obs-e2-s1', groupId: 'next', title: 'Set SLO alert thresholds', points: 5, owner: ELI },
  { id: 'wi-obs-e3-s2', groupId: 'next', title: 'Configure retention policies', points: 3, owner: LAYLA },
  { id: 'wi-obs-b1', groupId: 'next', title: 'Fix dropped span exports', owner: ELI, chips: [{ label: 'Bug', tone: 'danger' }] },
  { id: 'wi-obs-e1-s2', groupId: 'progress', title: 'Span-metrics connector', owner: LAYLA, signal: { state: 'running', label: 'Agent running' } },
  { id: 'wi-obs-e2-s3', groupId: 'progress', title: 'Tune tail sampling', owner: ELI, signal: { state: 'running', label: 'Agent running' } },
  { id: 'wi-obs-e3-s1', groupId: 'review', title: 'Cost-aware retention', owner: NORA, signal: { state: 'review', label: 'Awaiting review' } },
  { id: 'wi-obs-e1-s1', groupId: 'done', title: 'Collector fleet rollout', points: 8, owner: ELI, done: true },
  { id: 'wi-obs-e1-s3', groupId: 'done', title: 'Instrument checkout service', points: 5, owner: LAYLA, done: true },
  { id: 'wi-obs-e2-s2', groupId: 'done', title: 'Dashboard parity audit', points: 3, owner: NORA, done: true },
  { id: 'wi-obs-e4-s1', groupId: 'done', title: 'ADR: tail-sampling policy', points: 2, owner: NORA, done: true },
];

const SORT_OPTIONS = [
  { value: 'priority', label: 'Priority ↓' },
  { value: 'status', label: 'Status' },
  { value: 'updated', label: 'Updated' },
  { value: 'title', label: 'Title' },
];

/** A host: owns query, sort, filters, done state and order. */
function Host({ initial = ITEMS, loading = false }: { initial?: WorkListItem[]; loading?: boolean }) {
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('priority');
  const [mine, setMine] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>('wi-obs-e1-s4');
  return (
    <WorkListView
      groups={GROUPS}
      items={mine ? items.filter((i) => i.owner?.id === 'lh') : items}
      count={items.length}
      currentId={currentId}
      query={query}
      onQueryChange={setQuery}
      sort={sort}
      sortOptions={SORT_OPTIONS}
      onSortChange={setSort}
      filters={<Checkbox checked={mine} onChange={setMine} aria-label="Only Layla's work" />}
      activeFilterCount={mine ? 1 : 0}
      onClearFilters={() => setMine(false)}
      onCreate={() => {}}
      onCollapse={() => {}}
      onOpenItem={(item) => setCurrentId(item.id)}
      onToggleDone={(item, done) =>
        setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, done, groupId: done ? 'done' : 'next' } : p)))
      }
      onReorder={(id, toGroupId, index) =>
        setItems((prev) => {
          const moving = { ...prev.find((p) => p.id === id)!, groupId: toGroupId };
          const rest = prev.filter((p) => p.id !== id);
          const target = rest.filter((p) => p.groupId === toGroupId);
          const at =
            index < target.length
              ? rest.indexOf(target[index])
              : target.length
                ? rest.indexOf(target[target.length - 1]) + 1
                : rest.length;
          return [...rest.slice(0, at), moving, ...rest.slice(at)];
        })
      }
      loading={loading}
      emptyLabel="No work planned yet"
    />
  );
}

const meta = {
  title: 'Work/WorkListView',
  component: WorkListView,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { groups: GROUPS, items: ITEMS, query: '', onQueryChange: () => {} },
} satisfies Meta<typeof WorkListView>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pane 2 of the mockup at the rail's 368px: tick, open, drag or Alt+arrow to reorder. */
export const Default: Story = {
  render: () => (
    <div className="h-[860px] w-[368px] bg-surface p-4">
      <Host />
    </div>
  ),
};

export const Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-surface p-4">
      <div className="h-[860px] w-[368px]">
        <Host />
      </div>
    </div>
  ),
};

/** No work at all: the honest empty state, with every group label gone. */
export const Empty: Story = {
  render: () => (
    <div className="h-[480px] w-[368px] bg-surface p-4">
      <Host initial={[]} />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="h-[480px] w-[368px] bg-surface p-4">
      <Host initial={[]} loading />
    </div>
  ),
};

/** `chrome="embedded"`: the host shows "Work 11" in its own rail header. */
export const Embedded: Story = {
  render: () => (
    <div className="h-[860px] w-[368px] bg-surface p-4">
      <WorkListView chrome="embedded" groups={GROUPS} items={ITEMS} query="" onQueryChange={() => {}} currentId="wi-obs-e1-s4" />
    </div>
  ),
};
