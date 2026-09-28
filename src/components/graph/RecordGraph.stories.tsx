import { useRef, useState } from 'react';
import { Button } from '../ui/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecordGraph, type RecordGraphHandle } from './RecordGraph';
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

// The portal's search result that read at 46% before 2.403.2: three people,
// two initiatives, thirteen work items, two decisions and five knowledge
// records — 25 records and 56 connections.
const WORK_TITLES = ['Session cookie hardening', 'JWKS verification with kid rotation', 'mTLS rollout plan', 'Legacy SSO decommission',
  'Refresh loop when a grant is revoked', 'BFF authorization-code + PKCE flow', 'Cognito consolidation', 'Logout leaves the legacy shim cookie',
  'Tenant-by-tenant cutover runbook', 'Segmentation blueprint', 'Service identity inventory', 'Tail-sampling policy', 'Cost-aware telemetry'];
const MANY: RecordGraphRecord[] = [
  { id: 'vera', type: 'person', title: 'Vera Green', subtitle: 'Principal Engineer', href: '/people/vera' },
  { id: 'nora-c', type: 'person', title: 'Nora Chang', subtitle: 'Senior Security Engineer', href: '/people/nora-c' },
  { id: 'nora-d', type: 'person', title: 'Nora DaSilva', subtitle: 'Senior Engineer', href: '/people/nora-d' },
  { id: 'auth', type: 'initiative', title: 'Auth Migration', status: 'in_progress', href: '/initiatives/auth' },
  { id: 'ztn', type: 'initiative', title: 'Zero Trust Network', status: 'planning', href: '/initiatives/ztn' },
  ...WORK_TITLES.map((title, i): RecordGraphRecord => ({
    id: `w${i}`, type: 'work', title, status: i === 8 ? 'blocked' : ['open', 'in_progress', 'done'][i % 3]!, href: `/work/w${i}`,
  })),
  { id: 'd1', type: 'decision', title: 'Policy engine selection ADR', status: 'open', href: '/decisions/d1' },
  { id: 'd2', type: 'decision', title: 'Cognito over Auth0', status: 'accepted', href: '/decisions/d2' },
  ...['SAML to Cognito guide', 'Bring SSO up on a new origin', 'SLOs and error budgets', 'OpenTelemetry everywhere', 'Error-budget dashboard']
    .map((title, i): RecordGraphRecord => ({ id: `k${i}`, type: 'knowledge', title, href: `/knowledge/k${i}` })),
];
const MANY_KEY = MANY.map((record) => `${record.type}:${record.id}`);
const MANY_EDGES: RecordGraphEdge[] = [
  ...MANY_KEY.slice(5).map((key, i) => ({ id: `inc-${i}`, source: MANY_KEY[3 + (i % 2)]!, target: key, label: 'includes' })),
  ...MANY_KEY.slice(5).map((key, i) => ({ id: `asg-${i}`, source: MANY_KEY[i % 3]!, target: key, label: 'assigned to' })),
  ...MANY_KEY.slice(5, 21).map((key, i) => ({ id: `rel-${i}`, source: key, target: MANY_KEY[9 + i]!, label: 'related to' })),
];

/**
 * Twenty-five records and 56 connections in the search page's 1160 × 418
 * canvas, with the three people selected and passed as `focusKeys`: the view
 * frames them and their neighbours at a readable zoom (never below 80%), the
 * rest is a pan away, and Fit frames everything at the same floor. Switch to
 * Hierarchy for longest-path columns wrapped to the canvas height.
 */
export const ManyRecords: Story = {
  name: 'Search result (25 records)',
  args: { records: MANY, edges: MANY_EDGES },
  decorators: [(Story) => <div className="flex h-[470px] w-[1160px] max-w-full flex-col border border-border"><Story /></div>],
  render: (args) => {
    const [selected, setSelected] = useState(['person:vera', 'person:nora-c', 'person:nora-d']);
    const [layout, setLayout] = useState<RecordGraphLayout>('force');
    return (
      <RecordGraph {...args} selectedKeys={selected} onSelectionChange={setSelected} focusKeys={selected}
        layout={layout} onLayoutChange={setLayout} />
    );
  },
};

/**
 * The portal's journey defect (2.403.4): the host's answer strip opens under
 * the canvas and takes 50px from it. The graph re-fits on the canvas resize
 * and, at the 80% floor, keeps the three selected people fully in view. Fit
 * re-centres on the selection; pressed again it frames the whole graph from
 * the top-left. The host buttons drive the `RecordGraphHandle` ref.
 */
export const StripOpens: Story = {
  name: '25 records, strip opens',
  args: { records: MANY, edges: MANY_EDGES },
  decorators: [(Story) => <div className="flex h-[520px] w-[1160px] max-w-full flex-col border border-border"><Story /></div>],
  render: (args) => {
    const [selected, setSelected] = useState(['person:vera', 'person:nora-c', 'person:nora-d']);
    const [strip, setStrip] = useState(false);
    const graph = useRef<RecordGraphHandle>(null);
    return (
      <>
        <RecordGraph {...args} ref={graph} selectedKeys={selected} onSelectionChange={setSelected} focusKeys={selected}
          onAskSelection={() => setStrip(true)} />
        {strip && (
          <div className="flex h-[50px] shrink-0 items-center border-t border-border bg-surface-panel px-3 text-sm text-text-secondary">
            Org Assistant · I found relevant information about auth …
          </div>
        )}
        <div className="flex shrink-0 gap-2 border-t border-border p-2">
          <Button size="sm" variant="secondary" onClick={() => setStrip((open) => !open)}>{strip ? 'Close strip' : 'Open strip'}</Button>
          <Button size="sm" variant="secondary" onClick={() => graph.current?.fitToFocus()}>fitToFocus()</Button>
          <Button size="sm" variant="secondary" onClick={() => graph.current?.fitAll()}>fitAll()</Button>
        </div>
      </>
    );
  },
};

/** Nothing to draw — no records, or a type filter that leaves none. */
export const Empty: Story = { args: { records: [], edges: [] } };

/** Records with no connections among them (a lone person): the empty label, not a cloud of nodes. */
export const Unconnected: Story = { args: { edges: [] } };

/** `showIsolated`: draw unconnected records anyway. */
export const ShowIsolated: Story = { args: { edges: [], showIsolated: true } };

export const Dark: Story = {
  decorators: [(Story) => <div data-theme="dark" className="flex h-full flex-col bg-surface"><Story /></div>],
};
