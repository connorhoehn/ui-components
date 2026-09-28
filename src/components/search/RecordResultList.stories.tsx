import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecordResultList } from './RecordResultList';
import { recordResultKey, type RecordResultItem } from './recordMarks';

const people: RecordResultItem[] = [
  { id: 'p-001', type: 'person', title: 'Vera Green', subtitle: 'Owner · Auth Migration', matchReason: 'Matched through initiative membership', href: '#vera' },
  { id: 'p-002', type: 'person', title: 'Nora Chang', subtitle: 'SME · Auth Migration', matchReason: 'Matched through initiative membership', href: '#nora' },
  { id: 'p-003', type: 'person', title: 'Nora DaSilva', subtitle: 'SME · Auth Migration', matchReason: 'Matched through initiative membership', href: '#nds' },
];
const initiative: RecordResultItem = { id: 'p-auth-migration', type: 'initiative', title: 'Auth Migration', description: 'Consolidate login onto Cognito + BFF OIDC and retire the legacy SAML shim.', subtitle: 'Owner: Vera Green', status: 'in_progress', href: '#auth' };
const work: RecordResultItem[] = [
  { id: 'w-1', type: 'work', title: 'Tenant-by-tenant cutover', subtitle: 'Auth Migration · Nora Chang', status: 'blocked', href: '#w1' },
  { id: 'w-2', type: 'work', title: 'Logout leaves the legacy shim cookie alive', subtitle: 'Auth Migration · Vera Green · Bug', status: 'open', href: '#w2' },
];
const knowledge: RecordResultItem[] = [
  { id: 'k-1', type: 'knowledge', title: 'Bring SSO up on a new origin', subtitle: 'Guide · Published', href: '#k1' },
  { id: 'k-2', type: 'knowledge', title: 'Cut one tenant over from SAML to Cognito', subtitle: 'Guide · Draft', href: '#k2' },
];

const groups = [
  { id: 'person', label: 'People', count: 3, records: people },
  { id: 'initiative', label: 'Initiatives', count: 1, records: [initiative] },
  { id: 'work', label: 'Work', count: 4, records: work, seeAllHref: '#work' },
  { id: 'knowledge', label: 'Knowledge', count: 2, records: knowledge },
  { id: 'decision', label: 'Decisions', count: 2, records: [], collapsed: true, onSeeAll: () => {} },
];

const meta = {
  title: 'Search/RecordResultList', component: RecordResultList, tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { groups, selectedKeys: [], onToggleSelect: () => {}, onOpen: () => {}, hint: 'Select results to ask about them or view their connections.' },
} satisfies Meta<typeof RecordResultList>;
export default meta;
type Story = StoryObj<typeof meta>;

/** The Results tab: grouped by type, selectable, with See all where the host holds more. */
export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return <RecordResultList {...args} selectedKeys={selected}
      onToggleSelect={(r) => setSelected((keys) => keys.includes(recordResultKey(r)) ? keys.filter((k) => k !== recordResultKey(r)) : [...keys, recordResultKey(r)])} />;
  },
};

/** Entered from an initiative: matched terms marked, labelled open links, a scope footer. */
export const ScopedWithHighlights: Story = {
  args: {
    highlightTerms: ['component contracts'],
    selectedKeys: ['work:w-4'],
    openLabel: (r) => (r.type === 'work' ? 'Open work item' : 'Open initiative'),
    footer: '2 results in Design System API',
    hint: undefined,
    groups: [
      { id: 'work', label: 'Work', count: 1, records: [{ id: 'w-4', type: 'work', title: 'Publish typed component contracts', subtitle: 'Design System API · Ben Okafor', status: 'in_progress', href: '#w4' }] },
      { id: 'initiative', label: 'Initiatives', count: 1, records: [{ id: 'p-dsapi', type: 'initiative', title: 'Design System API', description: 'Programmatic access to the design system: typed component contracts, versioned release channels, and codemod-assisted upgrades.', subtitle: 'Isabel Vasquez', status: 'in_progress', href: '#dsapi' }] },
    ],
  },
};
export const Loading: Story = { args: { loading: true } };
export const FailedRead: Story = { args: { error: 'The search service did not answer.', onRetry: () => {} } };
export const Empty: Story = { args: { groups: [], emptyState: { title: 'No matching records', description: 'Try another phrase or clear a filter.' } } };
export const CollapsedGroup: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState<string[]>(['work', 'decision']);
    return <RecordResultList {...args} groups={args.groups.map((g) => ({ ...g, collapsed: collapsed.includes(g.id) }))}
      onToggleGroup={(g) => setCollapsed((ids) => ids.includes(g.id) ? ids.filter((id) => id !== g.id) : [...ids, g.id])} />;
  },
};
export const Dark: Story = { decorators: [(Story) => <div data-theme="dark" className="bg-surface p-4"><Story /></div>] };
