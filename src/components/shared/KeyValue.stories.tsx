import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack as LayoutStack, Inline } from '../ui/Stack';
import { Text as T } from './Text';
import { Button } from '../ui/Button';
import { DetailSection } from './DetailSection';
import { StatusPill } from './StatusPill';
import { KeyValue } from './KeyValue';

const meta = {
  title: 'Shared/KeyValue',
  component: KeyValue,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
  args: {
    items: [
      { label: 'Input', value: '13 run notes' },
      { label: 'Output', value: '4 patterns' },
      { label: 'Duration', value: '2 min' },
      { label: 'Cost', value: '$0.0039' },
    ],
  },
} satisfies Meta<typeof KeyValue>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The run inspector's facts (Activity mockup). */
export const Row: Story = {};

export const Stack: Story = { args: { layout: 'stack' } };

export const Grid: Story = { args: { layout: 'grid' } };

export const MonoWithTooltip: Story = {
  args: {
    items: [
      { label: 'Job id', value: 'cmp-2026-09-24-0007-l1', mono: true, title: 'cmp-2026-09-24-0007-l1' },
      { label: 'Digest', value: '9f3c2a7be01d44c8a2d1f0e3b7c6a5d4', mono: true, title: '9f3c2a7be01d44c8a2d1f0e3b7c6a5d4' },
      { label: 'Model', value: 'amazon.nova-pro-v1:0', mono: true },
    ],
    labelWidth: 'w-16',
  },
};

export const Dark: Story = {
  render: (args) => (
    <div data-theme="dark" className="bg-surface p-4">
      <KeyValue {...args} />
    </div>
  ),
};

/** A compact facts pane: labeled values, a named next action, and no nested cards. */
export const InitiativeOverview: Story = {
  render: () => <LayoutStack gap="lg">
    <T size="sm" tone="secondary" wrap>Shared model serving, warm pools and canary rollouts.</T>
    <KeyValue labelWidth="w-20" items={[
      { label: 'Status', value: <StatusPill label="In progress" tone="info" variant="text" /> },
      { label: 'Sprint', value: 'No active sprint', muted: true },
      { label: 'Owner', value: 'Paolo Mancini' },
      { label: 'SMEs', value: <LayoutStack gap="xs"><T size="sm" wrap>Caleb Turner</T><T size="sm" wrap>Briana Patel</T></LayoutStack> },
    ]} />
    <DetailSection title="Next work item" variant="heading" as="h2">
      <LayoutStack gap="sm">
        <T size="sm" weight="medium" wrap>Cold-start latency after scale-to-zero</T>
        <T size="xs" tone="secondary" wrap>ORG-INF-4 · Paolo Mancini · 3 points</T>
        <Inline><Button size="sm" variant="secondary">Open ORG-INF-4</Button></Inline>
      </LayoutStack>
    </DetailSection>
    <Inline className="border-t border-border pt-3"><Button size="sm" variant="ghost">Docs and files</Button><Button size="sm" variant="ghost">Activity</Button></Inline>
  </LayoutStack>,
};
