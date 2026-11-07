import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpecLeaf } from './render';
import type { LeafSpec } from './types';

const meta: Meta<typeof SpecLeaf> = {
  title: 'PageSpec/Leaves',
  component: SpecLeaf,
};
export default meta;
type Story = StoryObj<typeof SpecLeaf>;

/** A primary button: `variant` is required on every button leaf. */
export const ButtonLeaf: Story = { args: { leaf: { kind: 'button', variant: 'primary', label: 'New run' } } };

/** Labelled facts. */
export const KeyValues: Story = {
  args: { leaf: { kind: 'key-values', items: [{ label: 'Model', value: 'nova-pro' }, { label: 'Duration', value: '2 min' }, { label: 'Cost', value: '$0.0039' }] } },
};

/** A StatCard grid. */
export const Stats: Story = {
  args: { leaf: { kind: 'stats', columns: 3, items: [{ label: 'Runs', value: '42' }, { label: 'Failures', value: '3', danger: true }, { label: 'Spend', value: '$41' }] } },
};

const tabs: LeafSpec = {
  kind: 'tabs', label: 'Views', items: [
    { id: 'open', label: 'Open', badge: 2, content: [{ kind: 'list', variant: 'action-rows', 'aria-label': 'Open', items: [{ id: 'a', title: 'Rotate API keys' }, { id: 'b', title: 'Review alerts' }] }] },
    { id: 'done', label: 'Done', content: [{ kind: 'empty', title: 'Nothing done yet', size: 'sm' }] },
  ],
};

/** Tabs with leaves in each panel. */
export const TabsLeaf: Story = { args: { leaf: tabs } };

/** The audited escape hatch: its reason is on the `data-page-spec-custom` marker. */
export const Custom: Story = {
  args: { leaf: { kind: 'custom', reason: 'story: shows the marker', render: () => <SpecLeaf leaf={{ kind: 'text', text: 'Rendered by a custom leaf' }} /> } },
};
