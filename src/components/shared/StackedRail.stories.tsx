import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StackedRail, type StackedRailGroup } from './StackedRail';
import { SubNavLayout } from './SubNavLayout';
import { PresenceAvatars } from './PresenceAvatars';
import { DropdownMenu } from './DropdownMenu';
import { MoreIcon, PlusIcon, RepeatIcon, UploadIcon } from '../ui/Icons';

const meta = {
  title: 'Shared/StackedRail',
  component: StackedRail,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StackedRail>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A group heading's ⋯ — the host's own node in `actions`. */
const groupMenu = (label: string, testId: string) => (
  <DropdownMenu
    trigger={<MoreIcon size={14} />}
    triggerLabel={`Actions for ${label}`}
    triggerTestId={testId}
    align="end"
    sections={[{ items: [{ label: 'New page', onSelect: () => {} }, { label: 'Rename…', onSelect: () => {} }] }]}
  />
);

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
            { id: 'onboarding', label: 'Onboarding', meta: '2d', open: true, onSelect: pick('onboarding'), menu: rowMenu('Onboarding'), children: [
              { id: 'day-one', label: 'Day one', meta: '5d', onSelect: pick('day-one') },
            ] },
            { id: 'oncall', label: 'On-call', meta: '1w', onSelect: pick('oncall'), pending: true },
          ],
        },
        {
          id: 'runbooks', label: 'Runbooks', meta: '6h', onSelect: pick('runbooks'), menu: rowMenu('Runbooks'),
          // Who has this page open: a small stack after the age, clear of the text column.
          trailing: <PresenceAvatars size={20} maxVisible={2} users={[{ id: 'u1', name: 'Ada Lovelace' }, { id: 'u3', name: 'Alan Turing' }]} />,
        },
      ],
    },
    {
      // A long label + presence + a ⋯: at 220px the ⋯ waits for hover/focus
      // so the label reads whole.
      id: 'drafts', title: 'Workspace drafts', count: 0,
      trailing: <PresenceAvatars size={20} maxVisible={2} users={[{ id: 'u2', name: 'Grace Hopper' }, { id: 'u3', name: 'Alan Turing' }]} />,
      actions: groupMenu('Workspace drafts', 'story-drafts-menu'),
      rows: [],
      emptyLabel: 'No drafts yet.',
    },
    {
      // A folded folder with presence.
      id: 'auth', title: 'Auth migration', count: 4, open: false,
      trailing: <PresenceAvatars size={20} maxVisible={2} users={[{ id: 'u1', name: 'Ada Lovelace' }]} />,
      actions: groupMenu('Auth migration', 'story-auth-menu'),
      rows: [{ id: 'auth-plan', label: 'Rollout plan', meta: '1d', onSelect: pick('auth-plan') }],
    },
    {
      id: 'activity', title: 'Activity', collapsible: false,
      rows: [{ id: 'activity-confluence', label: 'Confluence activity', meta: 7, onSelect: pick('activity-confluence') }],
    },
  ];
  return (
    <StackedRail title="Documents" count={187} aria-label="Documents" currentStyle="tint" selectedId={selected} groups={groups}
      actions={[
        { label: 'New document', icon: <PlusIcon size={14} />, onClick: () => {}, 'data-testid': 'story-title-new' },
        { label: 'Import', icon: <UploadIcon size={14} />, onClick: () => {}, 'data-testid': 'story-title-import' },
        { label: 'Refresh', icon: <RepeatIcon size={14} />, onClick: () => {}, 'data-testid': 'story-title-refresh' },
      ]} />
  );
}

/**
 * The documents case beside the Org rail (SubNavLayout, the reference), both
 * 220px. Three levels open (Engineering handbook → Onboarding → Day one) and
 * a row with an age plus a presence stack (Runbooks), so the 36px pitch, the
 * indent step and the caret column can be measured
 * (tests/storybook/stacked-rail-geometry.spec.ts). The caption carries a
 * 3-digit count and three actions, and two headings a long label + presence
 * + a ⋯ (Workspace drafts, and Auth migration folded) — the 220px chrome
 * budget (tests/storybook/stacked-rail-actions.spec.ts).
 */
export const Documents: Story = {
  args: { groups: [] },
  render: () => (
    <div className="flex items-start gap-8">
      <div className="w-[220px] bg-surface" data-testid="story-stacked">
        <DocumentsRail />
      </div>
      <div className="h-[420px] w-[440px]" data-testid="story-subnav">
        <SubNavLayout title="Agent library" items={[
          { path: '#all', label: 'All documents', count: 14 },
          { path: '#recent', label: 'Recent' },
          { path: '#reviewer', label: 'Code reviewer', count: 4, group: 'Kind' },
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
