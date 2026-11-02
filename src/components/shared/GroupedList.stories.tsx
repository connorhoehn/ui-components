import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { GroupedList, type GroupedListGroup, type GroupedListRow } from './GroupedList';
import { FileKindMark } from './FileKindMark';
import { StatusPill } from './StatusPill';
import { Button } from '../ui/Button';
import { Checkbox } from '../forms/Checkbox';
import { Avatar } from './Avatar';

const GROUPS: GroupedListGroup[] = [
  { id: 'documents', title: 'Documents & presentations', count: 3, icon: <FileKindMark kind="folder" variant="plain" /> },
  { id: 'agents', title: 'Agents & experiments', count: 2, icon: <FileKindMark kind="folder" variant="plain" /> },
  { id: 'empty', title: 'Other', count: 0, icon: <FileKindMark kind="folder" variant="plain" />, defaultOpen: false },
];

const open = <Button variant="secondary" size="sm">Open</Button>;

const ROWS: GroupedListRow[] = [
  {
    id: 'doc-edit',
    groupId: 'documents',
    icon: <FileKindMark kind="page" variant="plain" />,
    title: 'Document agent edit',
    pill: <StatusPill variant="text" state="success" label="Published" />,
    subline: 'Edit a document from an instruction',
    hoverSubline: '/doc → Read → Plan → Approval → Suggestions',
    hoverActions: open,
  },
  {
    id: 'deck-edit',
    groupId: 'documents',
    icon: <FileKindMark kind="presentation" variant="plain" />,
    title: 'Presentation edit',
    pill: <StatusPill variant="text" state="warning" label="1 of 5 failed" meta="29m ago" />,
    subline: 'Edit a presentation from a request',
    hoverSubline: '/deck → Read → Plan → Approval → Apply',
    hoverActions: open,
  },
  {
    id: 'diagram',
    groupId: 'documents',
    icon: <FileKindMark kind="diagram" variant="plain" />,
    title: 'Diagram from a description',
    pill: <StatusPill variant="text" state="neutral" label="Draft" />,
    subline: 'Turn a description into a diagram',
    hoverActions: open,
  },
  {
    id: 'agent-loop',
    groupId: 'agents',
    icon: <FileKindMark kind="agent" variant="plain" />,
    title: 'Agent loop',
    pill: <StatusPill variant="text" state="danger" label="Failed" meta="10h ago" />,
    subline: 'Run an agent on a work item',
    trailing: <Button variant="link" size="sm">View run</Button>,
    hoverActions: open,
  },
  {
    id: 'scratch',
    groupId: 'agents',
    icon: <FileKindMark kind="experiment" variant="plain" />,
    title: 'ZZ scratch live output test',
    pill: <StatusPill variant="text" state="neutral" label="Draft" />,
    subline: 'Test live output',
    hoverActions: open,
  },
];

const MENU = (row: GroupedListRow) => [
  { items: [{ label: 'Open' }, { label: 'Run' }, { label: 'Duplicate' }] },
  { items: [{ label: `Archive ${row.title}`, danger: true }] },
];

const meta = {
  title: 'Shared/GroupedList',
  component: GroupedList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof GroupedList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three groups, one collapsed; the second row is `current`. */
export const Directory: Story = {
  args: { groups: GROUPS, rows: ROWS },
  render: () => (
    <div className="w-[960px]">
      <GroupedList groups={GROUPS} rows={ROWS} currentId="doc-edit" rowMenu={MENU} onOpenRow={() => {}} />
    </div>
  ),
};

/** Controlled expansion: the host owns which groups are open. */
export const Controlled: Story = {
  args: { groups: GROUPS, rows: ROWS },
  render: () => {
    const [openGroups, setOpenGroups] = useState<string[]>(['agents']);
    return (
      <div className="w-[960px]">
        <p className="m-0 mb-2 text-xs text-text-tertiary">Open: {openGroups.join(', ') || 'none'}</p>
        <GroupedList
          groups={GROUPS}
          rows={ROWS}
          openGroups={openGroups}
          onToggleGroup={(id, isOpen) =>
            setOpenGroups((prev) => (isOpen ? [...prev, id] : prev.filter((g) => g !== id)))
          }
          rowMenu={MENU}
        />
      </div>
    );
  },
};

/** No menu, no hover actions, no pills — the bare two-line rows. */
export const Plain: Story = {
  args: { groups: GROUPS, rows: ROWS },
  render: () => (
    <div className="w-[640px]">
      <GroupedList
        groups={GROUPS.slice(0, 2)}
        rows={ROWS.map(({ pill: _pill, hoverActions: _a, trailing: _t, ...row }) => row)}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// leading + meta + reorder — the Work column's row shape
// ---------------------------------------------------------------------------

const WORK_GROUPS: GroupedListGroup[] = [
  { id: 'next', title: 'Next up' },
  { id: 'progress', title: 'In progress' },
  { id: 'done', title: 'Done', defaultOpen: false, emptyLabel: 'Nothing done yet' },
];

const WORK_SEED = [
  { id: 's4', groupId: 'next', title: 'Decommission legacy StatsD bridge', pts: 5, owner: 'Layla Hassan' },
  { id: 's5', groupId: 'next', title: 'Set SLO alert thresholds', pts: 5, owner: 'Eli Garcia' },
  { id: 's6', groupId: 'next', title: 'Configure retention policies', pts: 3, owner: 'Layla Hassan' },
  { id: 's2', groupId: 'progress', title: 'Span-metrics connector', pts: 8, owner: 'Layla Hassan' },
];

/**
 * A checkbox in `leading` (ticking it never opens the row), a `meta` line, and
 * `onReorder`: drag the grip handle, or focus a row and press Alt+↑/↓ (within the
 * group) or Alt+←/→ (to the end of the neighbouring group).
 */
export const LeadingMetaReorder: Story = {
  args: { groups: WORK_GROUPS, rows: [] },
  render: () => {
    const [items, setItems] = useState(WORK_SEED.map((w) => ({ ...w, done: false })));
    const rows: GroupedListRow[] = items.map((w) => ({
      id: w.id,
      groupId: w.groupId,
      title: w.title,
      leading: (
        <Checkbox
          checked={w.done}
          aria-label={`Mark ${w.title} done`}
          onChange={(done) => setItems((prev) => prev.map((p) => (p.id === w.id ? { ...p, done } : p)))}
        />
      ),
      meta: (
        <>
          <Avatar name={w.owner} size={16} title={null} />
          <span className="truncate">{`${w.pts} pts · ${w.owner}`}</span>
        </>
      ),
    }));
    return (
      <div className="w-[368px]">
        <GroupedList
          groups={WORK_GROUPS}
          rows={rows}
          currentId="s4"
          onOpenRow={() => {}}
          onReorder={(id, toGroupId, index) =>
            setItems((prev) => {
              const moving = { ...prev.find((p) => p.id === id)!, groupId: toGroupId };
              const rest = prev.filter((p) => p.id !== id);
              const target = rest.filter((p) => p.groupId === toGroupId);
              const at = index < target.length ? rest.indexOf(target[index]) : target.length ? rest.indexOf(target[target.length - 1]) + 1 : rest.length;
              return [...rest.slice(0, at), moving, ...rest.slice(at)];
            })
          }
        />
      </div>
    );
  },
};

/** 2.389.0 — time-band groups as section labels, flat rows with no icon, and the current row barred. */
export const LabelHeadingsBarCurrent: Story = {
  args: { groups: [], rows: [] },
  render: () => (
    <div className="w-[320px] bg-surface">
      <GroupedList
        groupHeading="label"
        currentStyle="bar"
        currentId="saml"
        onOpenRow={() => {}}
        groups={[
          { id: 'recent', title: 'Recently updated', count: 3 },
          { id: 'week', title: 'Earlier this week', count: 2 },
        ]}
        rows={[
          { id: 'idle', groupId: 'recent', title: 'Propose an idle-capacity teardown', subline: 'Procedure · Published · 16h' },
          { id: 'sso', groupId: 'recent', title: 'Bring SSO up on a new origin', subline: 'Procedure · Published · 18h' },
          { id: 'saml', groupId: 'recent', title: 'Cut one tenant over from SAML to Cognito', subline: 'Procedure · Draft · 20h' },
          { id: 'fargate', groupId: 'week', title: 'Collector-fleet Fargate tasks are AWS-managed', subline: 'Insight · Published · 1d' },
          { id: 'aurora', groupId: 'week', title: 'Recover a cold Aurora Data API with retries', subline: 'Runbook · Published · 2d' },
        ]}
      />
    </div>
  ),
};

export const DesignRecordRail: Story = {
  args: { size: 'md', rowStyle: 'ruled', currentStyle: 'bar', groupHeading: 'title', currentId: 'dashboards',
    groups: [{ id: 'input', title: 'Needs input', count: 1 }, { id: 'ideating', title: 'Ideating', count: 1 }],
    rows: [{ id: 'tokens', groupId: 'input', title: 'Session token rotation on tenant switch' }, { id: 'dashboards', groupId: 'ideating', title: 'RED dashboards from span metrics' }], onOpenRow: () => {} },
  decorators: [Story => <div className="w-80 bg-surface"><Story /></div>],
};
