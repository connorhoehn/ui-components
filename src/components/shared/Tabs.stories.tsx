import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabPanel, type TabItem } from './Tabs';

const meta = {
  title: 'Shared/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['underline', 'pill', 'segmented'] },
    size: { control: 'radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS: TabItem[] = [
  { id: 'runs', label: 'Runs' },
  { id: 'config', label: 'Config' },
  { id: 'history', label: 'History', badge: 12 },
  { id: 'logs', label: 'Logs', disabled: true },
];

function Wrapper(args: { variant?: 'underline' | 'pill' | 'segmented'; size?: 'sm' | 'md' }) {
  const [val, setVal] = useState('runs');
  return (
    <div>
      <Tabs items={ITEMS} value={val} onValueChange={setVal} idPrefix="ex" {...args} />
      <div className="mt-3 text-sm">
        <TabPanel id="runs" when={val} idPrefix="ex">Runs content</TabPanel>
        <TabPanel id="config" when={val} idPrefix="ex">Config content</TabPanel>
        <TabPanel id="history" when={val} idPrefix="ex">History content (12 items)</TabPanel>
      </div>
    </div>
  );
}

export const Underline: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { items: ITEMS, value: 'runs', onValueChange: () => {}, variant: 'underline' },
};

export const Pill: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { items: ITEMS, value: 'runs', onValueChange: () => {}, variant: 'pill' },
};

export const Segmented: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { items: ITEMS, value: 'runs', onValueChange: () => {}, variant: 'segmented' },
};

export const Small: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { items: ITEMS, value: 'runs', onValueChange: () => {}, variant: 'underline', size: 'sm' },
};

export const WithBadgeAndDisabled: Story = {
  args: {
    items: ITEMS,
    value: 'history',
    onValueChange: () => {},
    variant: 'underline',
  },
};

const TESTID_ITEMS: TabItem[] = [
  { id: 'runs', label: 'Runs', testId: 'tabs-runs' },
  { id: 'config', label: 'Config', testId: 'tabs-config' },
  { id: 'history', label: 'History', badge: 12 },
];

function TestIdWrapper() {
  const [val, setVal] = useState('runs');
  return (
    <div>
      <Tabs
        items={TESTID_ITEMS}
        value={val}
        onValueChange={setVal}
        idPrefix="ex"
        getItemTestId={(item) => `tabs-fallback-${item.id}`}
      />
      <div className="mt-3 text-sm">
        <TabPanel id="runs" when={val} idPrefix="ex">Runs content</TabPanel>
        <TabPanel id="config" when={val} idPrefix="ex">Config content</TabPanel>
        <TabPanel id="history" when={val} idPrefix="ex">History content (12 items)</TabPanel>
      </div>
    </div>
  );
}

export const WithTestIds: Story = {
  render: () => <TestIdWrapper />,
  args: { items: TESTID_ITEMS, value: 'runs', onValueChange: () => {} },
  parameters: {
    docs: {
      description: {
        story:
          'Explicit `testId` on the first two items wins; `history` has none so `getItemTestId` supplies `tabs-fallback-history`. Panels get `data-testid="ex-panel-<id>"` automatically from `idPrefix`.',
      },
    },
  },
};
