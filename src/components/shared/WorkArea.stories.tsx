import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkArea } from './WorkArea';
import { Breadcrumbs } from './Breadcrumbs';
import { Toolbar, ToolbarGroup, ToolbarLabel } from './Toolbar';
import { Button } from '../ui/Button';
import { ComposerSurface } from './ComposerSurface';
import { ContextComposer } from '../social/ContextComposer';

const meta = {
  title: 'Shared/WorkArea',
  component: WorkArea,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="h-[420px]">{S()}</div>],
} satisfies Meta<typeof WorkArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const LongBody = () => (
  <div className="flex flex-col gap-3">
    {Array.from({ length: 24 }, (_, i) => (
      <div key={i} className="rounded-md border border-border bg-surface px-3 py-2 text-sm">
        Row {i + 1} — scroll: the trail and the toolbar stay put.
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    breadcrumbs: (
      <Breadcrumbs
        items={[
          { label: 'Operate' },
          { label: 'Health', href: '/health' },
          { label: 'Runs' },
        ]}
      />
    ),
    toolbar: (
      <Toolbar aria-label="Run actions" end={<Button size="sm" variant="ghost">Refresh</Button>}>
        <ToolbarGroup>
          <Button size="sm" variant="primary">Replay</Button>
          <Button size="sm" variant="ghost">Export</Button>
        </ToolbarGroup>
        <ToolbarGroup divided>
          <ToolbarLabel>Last 24h</ToolbarLabel>
        </ToolbarGroup>
      </Toolbar>
    ),
    status: <span>1,204 spans · projected 2m ago</span>,
    children: <LongBody />,
  },
};

export const BodyOnly: Story = {
  name: 'No chrome — a shallow page',
  args: { children: <LongBody /> },
};

export const FullBleed: Story = {
  name: 'padded={false} — a canvas or nested rails',
  args: {
    padded: false,
    breadcrumbs: <Breadcrumbs items={[{ label: 'Build' }, { label: 'Pipelines' }]} />,
    children: (
      <div className="h-full bg-surface-inset p-4 text-sm text-text-tertiary">
        A canvas takes the full width; the parent does not frame it twice.
      </div>
    ),
  },
};

export const CodeTone: Story = {
  name: 'tone="code" — terminal chrome',
  args: {
    tone: 'code',
    toolbar: (
      <Toolbar tone="code" aria-label="Terminal actions">
        <ToolbarGroup tone="code">
          <Button size="sm" variant="ghost" tone="code">Split</Button>
          <Button size="sm" variant="ghost" tone="code">Broadcast</Button>
        </ToolbarGroup>
      </Toolbar>
    ),
    status: <span>box-4f2a · connected</span>,
    children: (
      <pre className="font-mono text-[12px] text-code-green">$ pytest -q{'\n'}42 passed in 3.2s</pre>
    ),
  },
};

export const ComposerFooter: Story = {
  name: 'Full-bleed composer footer',
  args: { padded: false, children: <LongBody />, footer: <ComposerSurface compact><ContextComposer context={{ kind: "initiative", id: "story", title: "Story production" }} modes={["agent"]} defaultMode="agent" console={false} expanded allowAttachments={false} allowEmoji={false} workflows={[{ id: "inspect", label: "Inspect inputs" }]} onSend={() => false} /></ComposerSurface> },
};
