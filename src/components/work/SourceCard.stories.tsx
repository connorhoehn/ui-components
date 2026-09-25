import type { Meta, StoryObj } from '@storybook/react-vite';
import { SourceCard, SourceList } from './SourceCard';

const HOUR = 3_600_000;
const NOW = Date.parse('2026-09-24T18:00:00Z');

const ITEMS = [
  { id: 'n1', title: 'Tests collide in parallel', timestamp: NOW - 9 * HOUR, excerpt: 'Both tests bind to the same local port. Each passes on its own.' },
  { id: 'n2', title: 'Rerunning separates the causes', timestamp: NOW - 9 * HOUR, excerpt: 'Compare repeated failures before calling a test flaky.' },
  { id: 'n3', title: 'Skipping a test hid a bug', timestamp: NOW - 9 * HOUR, excerpt: 'The skipped test was failing because of a real code change.' },
];

const meta = {
  title: 'Work/SourceCard',
  component: SourceCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
  args: { ...ITEMS[0]!, now: NOW, onOpen: () => {} },
} satisfies Meta<typeof SourceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {};

export const Current: Story = { args: { current: true } };

export const AsLink: Story = { args: { onOpen: undefined, href: '#n1' } };

/** The Knowledge record's Sources panel, List view (mockup). */
export const List: Story = {
  render: () => <SourceList items={ITEMS} now={NOW} onOpen={() => {}} />,
};

export const EmptyList: Story = {
  render: () => <SourceList items={[]} emptyLabel="This guide has no recorded sources" />,
};

export const Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-surface p-4">
      <SourceList items={ITEMS} now={NOW} onOpen={() => {}} />
    </div>
  ),
};

/** 2.389.0 — a "Based on" row: whole-row control, tiled mark, meta line, chevron. */
export const BasedOnRow: Story = {
  render: () => (
    <SourceList
      layout="row"
      aria-label="Based on"
      onOpen={() => {}}
      items={[{ id: 'cl-010', title: 'Retire the SAML shim tenant by tenant', meta: 'Source pattern · auth-service' }]}
    />
  ),
};
