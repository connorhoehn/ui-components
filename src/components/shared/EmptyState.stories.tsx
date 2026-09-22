import type { Meta, StoryObj } from '@storybook/react-vite';
import EmptyState from './EmptyState';

const meta = {
  title: 'Shared/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    icon: '📭',
    title: 'No notifications yet',
    body: 'When something needs your attention, it will show up here.',
  },
};

export const WithAction: Story = {
  args: {
    icon: '📊',
    title: 'No dashboards',
    body: 'Create your first dashboard to start tracking metrics.',
    actionLabel: 'Create dashboard',
    onAction: () => alert('create dashboard'),
  },
};

export const RichDescription: Story = {
  args: {
    icon: '⚙️',
    title: 'No pipelines',
    description: (
      <span>
        Try the <strong>quickstart template</strong> or build one from scratch.
      </span>
    ),
    actionLabel: 'Start from template',
    onAction: () => {},
  },
};

export const CustomAction: Story = {
  args: {
    icon: '🔍',
    title: 'No results',
    description: 'Try a different search query.',
    action: (
      <div className="flex gap-2">
        <button type="button" className="rounded border border-border-emphasis px-3 py-1 text-sm">Clear filters</button>
        <button type="button" className="rounded bg-info px-3 py-1 text-sm font-semibold text-white">Browse all</button>
      </div>
    ),
  },
};

export const WithGuidedActions: Story = {
  name: 'With guided actions (multi-step + copyable code)',
  args: {
    icon: '🤖',
    title: 'No invocations yet',
    description: 'Once agents start running, traces will show up here. Try one of these to get started.',
    actions: [
      {
        label: 'Run a test invocation',
        onClick: () => alert('navigate to /admin/agents/invoke'),
        variant: 'primary',
        code: "agentcore invoke --agent orgiq-supervisor --prompt 'hello world'",
      },
      {
        label: 'Read the AgentCore docs',
        href: 'https://docs.aws.amazon.com/bedrock/agentcore/',
        external: true,
        variant: 'secondary',
      },
    ],
  },
};

/** `tone="code"` for the empty state of a terminal or debugger surface.
 *  Note the 220px min-height: if the region is smaller than that — a rail
 *  section, a filtered list, a quarter-window pane — reach for
 *  `InlinePlaceholder` instead of shrinking this. */
export const CodeTone: Story = {
  name: 'Code tone (terminal surfaces)',
  args: {
    tone: 'code',
    icon: '🖥',
    title: 'No computers to lab',
    description:
      'Computer Lab multiplexes a fleet. Provision at least one computer and it will open in a pane.',
    className: 'bg-code-bg rounded',
    actions: [
      {
        label: '+ new computer',
        onClick: () => {},
        variant: 'primary',
        code: 'lab provision --kind devbox',
      },
    ],
  },
};

/** One quiet line inside a section that already has a heading. */
export const Compact: Story = {
  args: {
    title: 'No items.',
    density: 'compact',
    className: 'italic',
  },
};
