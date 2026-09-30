import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StackedRail, type StackedRailGroup } from './StackedRail';
import { RailNavList } from './RailNavList';
import { PresenceAvatars } from './PresenceAvatars';
import { DropdownMenu } from './DropdownMenu';
import { MoreIcon, PlusIcon, RepeatIcon } from '../ui/Icons';

const meta = {
  title: 'Shared/StackedRail',
  component: StackedRail,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StackedRail>;

export default meta;
type Story = StoryObj<typeof meta>;

const rowMenu = (label: string) => (
  <DropdownMenu
    trigger={<MoreIcon size={14} />}
    triggerLabel={`Actions for ${label}`}
    align="end"
    sections={[{ items: [{ label: 'Open', onSelect: () => {} }, { label: 'Rename…', onSelect: () => {} }] }]}
  />
);

/** The documents rail: Views, two sources with a page tree, then Activity. */
function DocumentsRail() {
  const [selected, setSelected] = useState('onboarding');
  const [pulling, setPulling] = useState(false);
  const pick = (id: string) => () => setSelected(id);
  const groups: StackedRailGroup[] = [
    {
      id: 'views', title: 'Views', collapsible: false,
      rows: [
        { id: 'all', label: 'All documents', meta: 14, onSelect: pick('all') },
        { id: 'recent', label: 'Recent', onSelect: pick('recent') },
        { id: 'shared', label: 'Shared with me', meta: 0, onSelect: pick('shared') },
      ],
    },
    {
      id: 'confluence', title: 'Confluence · Platform', count: 5, pending: pulling,
      trailing: <PresenceAvatars size={20} maxVisible={3} users={[{ id: 'u1', name: 'Ada Lovelace' }, { id: 'u2', name: 'Grace Hopper' }]} />,
      actions: [
        { label: 'Pull Confluence · Platform', icon: <RepeatIcon size={14} />, onClick: () => { setPulling(true); setTimeout(() => setPulling(false), 1500); } },
      ],
      rows: [
        {
          id: 'handbook', label: 'Engineering handbook', meta: '3h', open: true, onSelect: pick('handbook'), menu: rowMenu('Engineering handbook'),
          children: [
            { id: 'onboarding', label: 'Onboarding', meta: '2d', onSelect: pick('onboarding'), menu: rowMenu('Onboarding'), children: [
              { id: 'day-one', label: 'Day one', meta: '5d', onSelect: pick('day-one') },
            ] },
            { id: 'oncall', label: 'On-call', meta: '1w', onSelect: pick('oncall'), pending: true },
          ],
        },
        { id: 'runbooks', label: 'Runbooks', meta: '6h', onSelect: pick('runbooks'), menu: rowMenu('Runbooks') },
      ],
    },
    {
      id: 'drafts', title: 'Workspace drafts', count: 0,
      actions: [{ label: 'New page', icon: <PlusIcon size={14} />, onClick: () => {} }],
      rows: [],
      emptyLabel: 'No drafts yet.',
    },
    {
      id: 'activity', title: 'Activity', collapsible: false,
      rows: [{ id: 'activity-confluence', label: 'Confluence activity', meta: 7, onSelect: pick('activity-confluence') }],
    },
  ];
  return (
    <StackedRail title="Documents" count={14} aria-label="Documents" currentStyle="tint" selectedId={selected} groups={groups}
      actions={[{ label: 'New document', icon: <PlusIcon size={14} />, onClick: () => {} }]} />
  );
}

/** The documents case beside a RailNavList, at the rail's ~220px width. */
export const Documents: Story = {
  args: { groups: [] },
  render: () => (
    <div className="flex items-start gap-8">
      <div className="w-[220px] bg-surface" data-testid="story-stacked">
        <DocumentsRail />
      </div>
      <div className="w-[220px] bg-surface" data-testid="story-rail-nav-list">
        <RailNavList currentStyle="tint" aria-label="Views" items={[
          { id: 'all', label: 'All documents', count: 14 },
          { id: 'recent', label: 'Recent', current: true },
          { id: 'shared', label: 'Shared with me', count: 0 },
        ]} />
      </div>
    </div>
  ),
};

/** The Agent library shape: one caption, kind groups with plain counts. */
export const Catalog: Story = {
  args: {
    title: 'Agent library',
    currentStyle: 'tint',
    selectedId: 'reviewer',
    groups: [
      { id: 'kind', title: 'Kind', count: 3, rows: [
        { id: 'reviewer', label: 'Code reviewer', meta: 4 },
        { id: 'triage', label: 'Bug triage', meta: 2 },
        { id: 'planner', label: 'Sprint planner', meta: 0 },
      ] },
      { id: 'status', title: 'Status', count: 2, open: false, rows: [
        { id: 'draft', label: 'Draft' },
        { id: 'published', label: 'Published' },
      ] },
    ],
  },
  render: (args) => <div className="w-[220px] bg-surface"><StackedRail {...args} /></div>,
};
