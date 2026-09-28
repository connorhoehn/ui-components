import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecordGraph } from './RecordGraph';
import type { RecordGraphEdge, RecordGraphLayout, RecordGraphRecord, RecordGraphType } from './recordGraphLayout';

// The search-connections mockup's cast: "Who can help finish Auth Migration?"
const RECORDS: RecordGraphRecord[] = [
  { id: 'auth', type: 'initiative', title: 'Auth Migration', status: 'in_progress', href: '/initiatives/auth' },
  { id: 'vera', type: 'person', title: 'Vera Green', subtitle: 'Owner', href: '/people/vera' },
  { id: 'nora-c', type: 'person', title: 'Nora Chang', subtitle: 'SME', href: '/people/nora-c' },
  { id: 'nora-d', type: 'person', title: 'Nora DaSilva', subtitle: 'SME', href: '/people/nora-d' },
  { id: 'cutover', type: 'work', title: 'Tenant-by-tenant cutover', status: 'blocked', href: '/work/cutover' },
  { id: 'cookie', type: 'work', title: 'Logout cookie bug', status: 'open', href: '/work/cookie' },
  { id: 'sso', type: 'knowledge', title: 'Bring SSO up on a new origin', href: '/knowledge/sso' },
  { id: 'saml', type: 'knowledge', title: 'SAML to Cognito guide', href: '/knowledge/saml' },
  { id: 'adr', type: 'decision', title: 'Cognito over Auth0', status: 'accepted', href: '/decisions/adr' },
];
const EDGES: RecordGraphEdge[] = [
  { id: 'owns', source: 'person:vera', target: 'initiative:auth', label: 'owns' },
  { id: 'sme-1', source: 'person:nora-c', target: 'initiative:auth', label: 'SME' },
  { id: 'sme-2', source: 'person:nora-d', target: 'initiative:auth', label: 'SME' },
  { id: 'inc-1', source: 'initiative:auth', target: 'work:cutover', label: 'includes' },
  { id: 'inc-2', source: 'initiative:auth', target: 'work:cookie', label: 'includes' },
  { id: 'asg-1', source: 'person:nora-c', target: 'work:cutover', label: 'assigned to' },
  { id: 'asg-2', source: 'person:vera', target: 'work:cookie', label: 'assigned to' },
  { id: 'rel-1', source: 'knowledge:sso', target: 'initiative:auth', label: 'Related result' },
  { id: 'rel-2', source: 'knowledge:saml', target: 'initiative:auth', label: 'Related result' },
  { id: 'dec', source: 'decision:adr', target: 'initiative:auth', label: 'decided for' },
];

const meta = {
  title: 'Graph/RecordGraph',
  component: RecordGraph,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    records: RECORDS,
    edges: EDGES,
    selectedKeys: [],
    onSelectionChange: () => {},
    onAskSelection: () => {},
    onOpenRecord: () => {},
  },
  decorators: [(Story) => <div className="flex h-[640px] w-full flex-col"><Story /></div>],
} satisfies Meta<typeof RecordGraph>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Force layout with three people selected, as in the mockup. Selection,
 *  layout and type filter are held by the story as a host would hold them. */
export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(['person:vera', 'person:nora-c', 'person:nora-d']);
    const [layout, setLayout] = useState<RecordGraphLayout>('force');
    const [type, setType] = useState<RecordGraphType | 'all'>('all');
    return (
      <RecordGraph {...args} selectedKeys={selected} onSelectionChange={setSelected}
        layout={layout} onLayoutChange={setLayout} typeFilter={type} onTypeFilterChange={setType} />
    );
  },
};

/** Breadth-first ranks left to right: owners and SMEs, then the initiative, then its work. */
export const Hierarchy: Story = { args: { layout: 'hierarchy' } };

/** Radial rings around the most-connected record. */
export const Radial: Story = { args: { layout: 'radial' } };

/** Nothing to draw — no records, or a type filter that leaves none. */
export const Empty: Story = { args: { records: [], edges: [] } };

/** Records with no connections among them (a lone person): the empty label, not a cloud of nodes. */
export const Unconnected: Story = { args: { edges: [] } };

/** `showIsolated`: draw unconnected records anyway. */
export const ShowIsolated: Story = { args: { edges: [], showIsolated: true } };

export const Dark: Story = {
  decorators: [(Story) => <div data-theme="dark" className="flex h-full flex-col bg-surface"><Story /></div>],
};
