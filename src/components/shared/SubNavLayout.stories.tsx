import type { Meta, StoryObj } from '@storybook/react-vite';
import { SubNavLayout } from './SubNavLayout';

const meta = {
  title: 'Shared/SubNavLayout',
  component: SubNavLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SubNavLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Flat: Story = {
  args: {
    title: 'Ingest',
    items: [
      { path: '#summary', label: 'Summary' },
      { path: '#runs', label: 'Runs', count: 12 },
      { path: '#conflicts', label: 'Conflicts', count: 2, hint: 'needs review' },
      { path: 'halt', label: 'Halt sync', onClick: () => {}, accent: 'danger' },
    ],
    children: <div className="p-6 text-sm text-text-secondary">Main content</div>,
  },
  render: (args) => (
    <div className="h-[360px]">
      <SubNavLayout {...args} />
    </div>
  ),
};

export const Grouped: Story = {
  args: {
    title: 'Capabilities',
    storageKey: 'sb-subnav',
    items: [
      { path: '#chat', label: 'Chat', group: 'Realtime' },
      { path: '#presence', label: 'Presence', group: 'Realtime' },
      { path: '#docs', label: 'Documents', group: 'Content' },
      { path: '#files', label: 'Files', group: 'Content', count: 4 },
    ],
    children: <div className="p-6 text-sm text-text-secondary">Main content</div>,
  },
  render: (args) => (
    <div className="h-[360px]">
      <SubNavLayout {...args} />
    </div>
  ),
};

/**
 * A host that already sits inside its own shell `<main id="main-content">`
 * (Observability, Ingest, Identity, Distillation…) passes `contentAs="section"`
 * with `contentLabel` so the content pane names itself instead of adding a
 * second `<main>` landmark. `railLabel` gives the rail nav its own name too.
 */
export const NamedLandmarks: Story = {
  args: {
    title: 'Distillation',
    railLabel: 'Distillation sections',
    contentAs: 'section',
    contentLabel: 'Distillation',
    items: [
      { path: '#observations', label: 'Observations' },
      { path: '#artifacts', label: 'Artifacts', count: 8 },
    ],
    children: <div className="p-6 text-sm text-text-secondary">Main content</div>,
  },
  render: (args) => (
    <div className="h-[360px]">
      <SubNavLayout {...args} />
    </div>
  ),
};

export const CompactExplorer: Story = {
  args: { title: 'Voices', items: [], compactHeader: true, railWidth: 260, contentPadding: 'none', railContent: <div className="p-3">Host-owned searchable explorer</div>, children: <div className="p-4">One content gutter</div> },
  render: args => <div className="h-[360px]"><SubNavLayout {...args} /></div>,
};
