import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageFromSpec, definePage } from './PageFromSpec';

const meta: Meta<typeof PageFromSpec> = {
  title: 'PageSpec/PageFromSpec',
  component: PageFromSpec,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-[800px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof PageFromSpec>;

interface Run { id: string; name: string; agent: string; status: string }
const runs: Run[] = [
  { id: 'r1', name: 'Nightly import', agent: 'ingest', status: 'Succeeded' },
  { id: 'r2', name: 'Backfill March', agent: 'ingest', status: 'Failed' },
  { id: 'r3', name: 'Summarise tickets', agent: 'triage', status: 'Running' },
];
const trail = [{ label: 'Workspace', href: '#' }, { label: 'Runs' }];

/** A collection: header action, the toolbar's search in the header row, a striped table. */
export const Collection: Story = {
  render: function CollectionStory() {
    const [query, setQuery] = useState('');
    const data = runs.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));
    return (
      <PageFromSpec spec={definePage({
        template: 'collection', title: 'Runs', breadcrumbs: trail,
        actions: [{ kind: 'button', variant: 'primary', label: 'New run' }],
        toolbar: { label: 'Run controls', search: { value: query, onChange: setQuery, placeholder: 'Search runs' } },
        table: { data, keyField: (r: Run) => r.id, columns: [{ key: 'name', header: 'Name' }, { key: 'agent', header: 'Agent' }, { key: 'status', header: 'Status' }], staticRows: 'story fixture' },
        empty: { title: 'No runs match', description: 'Clear the search to see every run.' },
      })} />
    );
  },
};

/** A list rail beside the selected record. */
export const MasterDetail: Story = {
  render: function MasterDetailStory() {
    const [selected, setSelected] = useState<string | null>('r1');
    const run = runs.find((r) => r.id === selected);
    return (
      <PageFromSpec spec={{
        template: 'master-detail', title: run?.name ?? 'Runs', breadcrumbs: trail,
        list: {
          label: 'runs', title: 'Recent', count: runs.length,
          body: [{
            kind: 'list', variant: 'grouped', groups: [{ id: 'all', title: 'All runs' }], currentId: selected,
            rows: runs.map((r) => ({ id: r.id, groupId: 'all', title: r.name, subline: r.agent })),
            onOpenRow: (row) => setSelected(row.id),
          }],
        },
        detail: run ? [
          { title: 'Summary', body: [{ kind: 'key-values', items: [{ label: 'Agent', value: run.agent }, { label: 'Status', value: run.status }] }] },
          { title: 'Activity', body: [{ kind: 'activity', events: [{ id: 'e1', kind: 'run', at: Date.now() - 60_000, text: 'started the run', actor: 'Layla Hassan' }] }] },
        ] : null,
        emptyDetail: [{ kind: 'empty', title: 'Pick a run' }],
      }} />
    );
  },
};

/** One record: status badge, a meta line, tabs instead of stacked cards. */
export const Detail: Story = {
  args: {
    spec: {
      template: 'detail', title: 'Nightly import', breadcrumbs: trail,
      badge: { kind: 'status', tone: 'success', label: 'Succeeded' },
      meta: { kind: 'meta', items: ['ingest', 'nova-pro', '2 min'] },
      actions: [
        { kind: 'button', variant: 'secondary', label: 'Re-run' },
        { kind: 'menu', trigger: 'More', triggerLabel: 'More actions', sections: [{ items: [{ label: 'Archive' }, { label: 'Delete', danger: true }] }] },
      ],
      tabs: [
        { id: 'summary', label: 'Summary', content: [
          { title: 'Inputs', body: [{ kind: 'key-values', items: [{ label: 'Source', value: 's3://imports/nightly' }, { label: 'Rows', value: '13,204' }] }] },
          { title: 'Cost', body: [{ kind: 'stat-strip', items: [{ label: 'Tokens', value: '41k' }, { label: 'Spend', value: '$0.39' }] }] },
        ] },
        { id: 'logs', label: 'Logs', badge: 2, content: [
          { body: [{ kind: 'banner', variant: 'warning', title: 'Two rows skipped', message: 'Rows 88 and 1,204 had no id.' }] },
        ] },
      ],
    },
  },
};

/** Stats, then a grid of panels on one screen. */
export const Dashboard: Story = {
  args: {
    spec: {
      template: 'dashboard', title: 'Observability', breadcrumbs: trail,
      stats: [{ label: 'Invocations', value: '12.4k' }, { label: 'Error rate', value: '0.8%', tone: 'danger' }, { label: 'p95', value: '2.1s' }],
      panels: [
        { id: 'latency', title: 'Latency', span: 2, content: [{ kind: 'chart', type: 'sparkline', label: 'p95 latency, last 12 hours', points: [3, 4, 3.5, 5, 4.2, 6, 5.1, 4.8, 4, 3.9, 4.4, 4.1], width: 480, height: 96, showFill: true }] },
        { id: 'health', title: 'Health', content: [{ kind: 'key-values', items: [{ label: 'Gateway', value: 'ok' }, { label: 'Workers', value: '12 / 12' }] }] },
        { id: 'next', title: 'Next up', span: 3, content: [{ kind: 'list', variant: 'action-rows', 'aria-label': 'Next up', items: [{ id: 'a', title: 'Rotate API keys', description: 'Due Friday' }, { id: 'b', title: 'Review spend alerts' }] }] },
      ],
    },
  },
};

/** Settings in sections, a form per section. */
export const Settings: Story = {
  render: function SettingsStory() {
    const [name, setName] = useState('Acme');
    const [region, setRegion] = useState('us');
    const [audit, setAudit] = useState(true);
    return (
      <PageFromSpec spec={{
        template: 'settings', title: 'Workspace', breadcrumbs: [{ label: 'Workspace', href: '#' }, { label: 'Settings' }],
        dirty: name !== 'Acme', onSave: () => {}, onCancel: () => setName('Acme'),
        sections: [
          { id: 'general', label: 'General', content: [{ title: 'Profile', body: [{ kind: 'form', fields: [
            { control: 'input', label: 'Name', value: name, onChange: setName },
            { control: 'select', label: 'Region', value: region, onChange: setRegion, options: [{ value: 'us', label: 'US East' }, { value: 'eu', label: 'EU West' }] },
            { control: 'toggle', label: 'Audit log', hint: 'Keeps 90 days of events.', checked: audit, onChange: setAudit },
          ] }] }] },
          { id: 'danger', label: 'Danger zone', content: [{ title: 'Delete workspace', body: [{ kind: 'button', variant: 'danger', label: 'Delete workspace' }] }] },
        ],
      }} />
    );
  },
};

/** A form page in PageFrame, its save bar docked under the body. */
export const Frame: Story = {
  render: function FrameStory() {
    const [name, setName] = useState('');
    return (
      <PageFromSpec spec={{
        template: 'frame', title: 'New connector', breadcrumbs: [{ label: 'Connectors', href: '#' }, { label: 'New' }],
        sections: [
          { title: 'Details', body: [{ kind: 'form', fields: [
            { control: 'input', label: 'Name', value: name, onChange: setName, required: true },
            { control: 'number', label: 'Batch size', value: 100, onChange: () => {}, min: 1 },
          ] }] },
          { title: 'Access', body: [{ kind: 'banner', variant: 'info', message: 'The connector reads with the workspace service role.' }] },
        ],
        footer: [{ kind: 'button-group', label: 'Save', items: [
          { kind: 'button', variant: 'ghost', label: 'Cancel' },
          { kind: 'button', variant: 'primary', label: 'Create connector', disabled: !name },
        ] }],
      }} />
    );
  },
};
