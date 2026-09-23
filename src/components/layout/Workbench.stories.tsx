import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Workbench } from './Workbench';
import { AgentTaskCard } from './AgentTaskCard';
import { MoreContextDisclosure } from './MoreContextDisclosure';
import { Button } from '../ui/Button';
import EmptyState from '../shared/EmptyState';
import { ActivityIcon, DocumentIcon, HistoryIcon } from '../ui/Icons';

const meta = {
  title: 'Layout/Workbench',
  component: Workbench,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-[640px] w-80 border-l border-border"><Story /></div>],
} satisfies Meta<typeof Workbench>;

export default meta;
type Story = StoryObj<typeof meta>;

function Details() {
  return (
    <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
      <dt className="text-text-tertiary">Type</dt><dd className="m-0 text-text-primary">Presentation · 5 slides</dd>
      <dt className="text-text-tertiary">Owner</dt><dd className="m-0 text-text-primary">Connor Hoehn</dd>
      <dt className="text-text-tertiary">Revisions</dt><dd className="m-0 text-text-primary">4 revisions</dd>
      <dt className="text-text-tertiary">Built from</dt><dd className="m-0 text-text-primary">Release plan v2, Planning sync transcript</dd>
    </dl>
  );
}

const TABS = [
  { id: 'comments', label: 'Comments', content: <EmptyState title="No comments on decks yet" body="Comments on presentations arrive in a later pass." /> },
  { id: 'activity', label: 'Activity', content: <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-xs text-text-secondary"><li>Alex added a comment · 1d ago</li><li>Connor updated risks · 2h ago</li></ul> },
  { id: 'details', label: 'Details', content: <Details /> },
];

const MORE = (
  <MoreContextDisclosure
    items={[
      { id: 'sources', label: 'Sources', count: 2, icon: <DocumentIcon size={12} />, onSelect: () => {} },
      { id: 'versions', label: 'Versions', count: 4, icon: <HistoryIcon size={12} />, onSelect: () => {} },
      { id: 'activity', label: 'Collaborators', count: 3, icon: <ActivityIcon size={12} /> },
    ]}
  />
);

/** The deck workbench with a running task: phase only, no invented percentage. */
export const PresentationRunning: Story = {
  args: { title: 'Sprint review', tabs: TABS },
  render: () => {
    const [tab, setTab] = useState('activity');
    return (
      <Workbench
        title="Sprint review"
        subtitle="Presentation · Sprint planning"
        kind="presentation"
        onClose={() => {}}
        task={
          <AgentTaskCard
            title="Build risk outlook slide"
            status="running"
            phase="Editing slide 4"
            startedLabel="Started 2m ago"
            description="Creating slide 4 from the release plan, transcript, and approved brand theme."
          />
        }
        tabs={TABS}
        activeTab={tab}
        onTabChange={setTab}
        moreContext={MORE}
        footer={<><Button size="sm" className="flex-1">Open run</Button><Button size="sm" variant="secondary">More</Button></>}
      />
    );
  },
};

/** A page with no agent task: the task section is simply absent. */
export const PageNoTask: Story = {
  args: { title: 'Release plan', tabs: TABS },
  render: () => (
    <Workbench
      title="Release plan"
      subtitle="Page · Sprint planning"
      kind="page"
      tabs={[{ ...TABS[0]!, count: 2, content: <p className="m-0 text-xs">Two open threads.</p> }, TABS[1]!, TABS[2]!]}
      moreContext={MORE}
    />
  ),
};
