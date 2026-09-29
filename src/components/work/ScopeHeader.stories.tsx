import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScopeHeader, type ScopeHeaderProps } from './ScopeHeader';
import { Select } from '../forms/Select';
import { DropdownMenu } from '../shared/DropdownMenu';

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

/**
 * A module header (Distillation): tabs carry a count and an attention dot,
 * and a repository selector sits in the `controls` slot before the link.
 */
export const DotsAndControls: Story = {
  render: () => (
    <div className="w-[1440px] bg-surface-panel">
      <Live
        title="Distillation"
        tabs={[
          { id: 'work', label: 'Knowledge' },
          { id: 'review', label: 'Review', count: 7 },
          { id: 'activity', label: 'Activity', dot: 'warning' },
        ]}
        controls={
          <Select
            size="md"
            aria-label="Repository"
            defaultValue="all"
            options={[
              { value: 'all', label: 'All repositories' },
              { value: 'orgiq-auth-service', label: 'orgiq-auth-service' },
            ]}
          />
        }
        link={{ label: 'Open Library', href: '#library' }}
      />
    </div>
  ),
};

/**
 * 2.389.0 — `variant="crumbs"`: just the crumb line, with the repository
 * select and the Library link hung between it and the record headline below.
 */
export const CrumbsOnly: Story = {
  render: () => (
    <div className="w-[960px] bg-surface">
      <ScopeHeader
        variant="crumbs"
        breadcrumbs={[{ label: 'Build', href: '#' }, { label: 'Distillation', href: '#' }, { label: 'Knowledge' }]}
        controls={
          <Select
            size="md"
            aria-label="Repository"
            defaultValue="all"
            options={[{ value: 'all', label: 'All repositories' }]}
          />
        }
        link={{ label: 'Open Library ↗', href: '#library' }}
      />
      <h1 className="m-0 px-6 pt-3 text-[26px] font-semibold leading-8 text-text-primary">Cut one tenant over from SAML to Cognito</h1>
    </div>
  ),
};

/**
 * 2.405.2 — `variant="inline"`: crumbs, the title as the emphasised last
 * segment, the view tabs and a compact control on ONE 48px row, so the body
 * below (a graph) takes the height a four-row header used to.
 */
export const InlineCrumbsTitleTabsControls: Story = {
  name: 'Inline: crumbs + title + tabs + controls',
  render: () => {
    const [tab, setTab] = useState('connections');
    return (
      <div className="w-[1160px] bg-surface">
        <ScopeHeader
          variant="inline"
          breadcrumbs={[{ label: 'Org' }, { label: 'Search', href: '#' }]}
          title="People & connections"
          tabs={[
            { id: 'results', label: 'Results', count: 25 },
            { id: 'answer', label: 'Answer' },
            { id: 'connections', label: 'Connections' },
          ]}
          activeTab={tab}
          onTabChange={setTab}
          controls={
            <DropdownMenu
              align="end"
              triggerLabel="Sort results"
              trigger={<span className="text-sm">Relevance ▾</span>}
              sections={[{ items: [{ label: 'Relevance', active: true }, { label: 'Recent' }] }]}
            />
          }
          className="border-b border-border"
        />
      </div>
    );
  },
};

