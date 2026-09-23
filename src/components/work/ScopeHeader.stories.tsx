import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScopeHeader, type ScopeHeaderProps } from './ScopeHeader';

const meta: Meta<typeof ScopeHeader> = {
  title: 'Work/ScopeHeader',
  component: ScopeHeader,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof ScopeHeader>;

const OWNERS = [
  { id: 'nd', name: 'Nora DaSilva' },
  { id: 'lh', name: 'Layla Hassan' },
];

function Live(props: Omit<ScopeHeaderProps, 'activeTab' | 'onTabChange'>) {
  const [tab, setTab] = useState('work');
  return <ScopeHeader {...props} activeTab={tab} onTabChange={setTab} />;
}

const MOCKUP: Omit<ScopeHeaderProps, 'activeTab' | 'onTabChange'> = {
  breadcrumbs: [{ label: 'Plan', onClick: () => {} }, { label: 'Initiatives', onClick: () => {} }, { label: 'Observability' }],
  title: 'Observability Platform',
  status: { label: 'In progress', tone: 'info' },
  progress: { done: 18, total: 52 },
  spentUsd: 1.46,
  people: [{ label: 'Owner', people: OWNERS }],
  menu: [{ items: [{ label: 'Rename' }, { label: 'Share…' }, { label: 'Move to…' }] }],
  tabs: [
    { id: 'work', label: 'Work' },
    { id: 'decisions', label: 'Decisions', count: 2 },
    { id: 'agents', label: 'Agents', count: 2 },
  ],
};

export const Mockup: Story = { render: () => <div className="w-[1592px] bg-surface-panel"><Live {...MOCKUP} /></div> };

/** A scope with no tracked children yet: nothing on the stats line, no placeholder numbers. */
export const NoData: Story = {
  render: () => (
    <div className="w-[1592px] bg-surface-panel">
      <Live title="Research" breadcrumbs={[{ label: 'Pages', onClick: () => {} }, { label: 'Research' }]} progress={{ done: 0, total: 0 }} tabs={[{ id: 'work', label: 'Work' }]} />
    </div>
  ),
};

export const Dark: Story = {
  render: () => (
    <div data-theme="dark" className="w-[1592px] bg-surface-panel">
      <Live {...MOCKUP} />
    </div>
  ),
};
