import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar, ToolbarGroup, ToolbarLabel } from './Toolbar';
import { Button } from '../ui/Button';

const meta = {
  title: 'Shared/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Run actions',
    children: (
      <>
        <ToolbarGroup aria-label="Execution">
          <Button size="sm" variant="primary">Run</Button>
          <Button size="sm" variant="ghost">Stop</Button>
        </ToolbarGroup>
        <ToolbarGroup divided aria-label="Scope">
          <Button size="sm" variant="ghost">Last 24h</Button>
          <Button size="sm" variant="ghost">All agents</Button>
        </ToolbarGroup>
      </>
    ),
    end: <Button size="sm" variant="ghost">Refresh</Button>,
  },
};

export const WithStatusLabel: Story = {
  name: 'Status text in the row',
  args: {
    'aria-label': 'Selection actions',
    children: (
      <>
        <ToolbarLabel>12 runs selected</ToolbarLabel>
        <ToolbarGroup divided>
          <Button size="sm" variant="ghost">Export</Button>
          <Button size="sm" variant="danger">Delete</Button>
        </ToolbarGroup>
      </>
    ),
  },
};

export const Medium: Story = {
  name: 'size="md" — a toolbar that owns its pane',
  args: {
    size: 'md',
    'aria-label': 'Canvas actions',
    children: (
      <ToolbarGroup>
        <Button size="sm" variant="ghost">Fit</Button>
        <Button size="sm" variant="ghost">Zoom in</Button>
        <Button size="sm" variant="ghost">Zoom out</Button>
      </ToolbarGroup>
    ),
    end: <ToolbarLabel>100%</ToolbarLabel>,
  },
};

export const CodeTone: Story = {
  name: 'tone="code" — terminal chrome',
  parameters: { backgrounds: { default: 'dark' } },
  args: {
    tone: 'code',
    'aria-label': 'Terminal actions',
    children: (
      <>
        <ToolbarGroup tone="code">
          <Button size="sm" variant="ghost" tone="code">Split</Button>
          <Button size="sm" variant="ghost" tone="code">Broadcast</Button>
        </ToolbarGroup>
        <ToolbarGroup tone="code" divided>
          <ToolbarLabel tone="code">box-4f2a · us-east-1</ToolbarLabel>
        </ToolbarGroup>
      </>
    ),
    end: <Button size="sm" variant="ghost" tone="code">Detach</Button>,
  },
};
