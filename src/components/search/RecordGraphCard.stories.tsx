import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecordGraphCard } from './RecordGraphCard';
import type { RecordGraphEdge, RecordGraphRecord } from '../graph/recordGraphLayout';

const records: RecordGraphRecord[] = [
  { id: 'p-001', type: 'person', title: 'Vera Green', subtitle: 'Owner', href: '#vera' },
  { id: 'p-002', type: 'person', title: 'Nora Chang', subtitle: 'SME', href: '#nora' },
  { id: 'p-003', type: 'person', title: 'Nora DaSilva', subtitle: 'SME', href: '#nds' },
  { id: 'p-auth-migration', type: 'initiative', title: 'Auth Migration', status: 'in_progress', href: '#auth' },
  { id: 'w-1', type: 'work', title: 'Tenant-by-tenant cutover', status: 'blocked', href: '#w1' },
  { id: 'w-2', type: 'work', title: 'Logout leaves the legacy shim cookie alive', status: 'open', href: '#w2' },
  { id: 'd-1', type: 'decision', title: 'Cognito over a self-hosted IdP', href: '#d1' },
  { id: 'k-1', type: 'knowledge', title: 'Cut one tenant over from SAML to Cognito', href: '#k1' },
];
const edges: RecordGraphEdge[] = [
  { id: 'e1', source: 'person:p-001', target: 'initiative:p-auth-migration', label: 'owns' },
  { id: 'e2', source: 'person:p-002', target: 'initiative:p-auth-migration', label: 'SME on' },
  { id: 'e3', source: 'person:p-003', target: 'initiative:p-auth-migration', label: 'SME on' },
  { id: 'e4', source: 'work:w-1', target: 'initiative:p-auth-migration', label: 'part of' },
  { id: 'e5', source: 'work:w-2', target: 'initiative:p-auth-migration', label: 'part of' },
  { id: 'e6', source: 'person:p-002', target: 'work:w-1', label: 'assigned' },
  { id: 'e7', source: 'person:p-001', target: 'work:w-2', label: 'assigned' },
  { id: 'e8', source: 'decision:d-1', target: 'initiative:p-auth-migration', label: 'decided for' },
  { id: 'e9', source: 'knowledge:k-1', target: 'work:w-1', label: 'guides' },
];

const meta = {
  title: 'Search/RecordGraphCard', component: RecordGraphCard, tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { records, edges, onOpen: () => {} },
  decorators: [(Story) => <div className="w-[760px]"><Story /></div>],
} satisfies Meta<typeof RecordGraphCard>;
export default meta;
type Story = StoryObj<typeof meta>;

/** One row under an answer: the best-connected records' marks, Expand and Open graph. */
export const Collapsed: Story = {};

/** Expanded inline: the full RecordGraph at 320px, the conversation below undisturbed. */
export const Expanded: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [expanded, setExpanded] = useState(true);
    return <RecordGraphCard {...args} expanded={expanded} onToggleExpanded={setExpanded}
      selectedKeys={selected} onSelectionChange={setSelected} onAskSelection={() => {}} onOpenRecord={() => {}} />;
  },
};

/** A selection shared with the Results tab: its marks in the header, framed when expanded. */
export const WithSelection: Story = {
  args: { selectedKeys: ['person:p-001', 'work:w-2'], summary: '2 selected · 8 records · 9 connections' },
};

/** No connections among the records: the card says so and offers no Expand. */
export const NoConnections: Story = { args: { edges: [] } };
