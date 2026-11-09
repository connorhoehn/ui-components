import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SelectionBar } from './SelectionBar';
import { Select } from '../forms/Select';
import Switch from './Switch';
import { Inline } from '../ui/Stack';
import { Text } from './Text';

const meta = {
  title: 'Shared/SelectionBar',
  component: SelectionBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SelectionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

function Slicing() {
  const [grid, setGrid] = useState('4x4');
  const [show, setShow] = useState(true);
  const [trim, setTrim] = useState(false);
  return (
    <>
      <Select
        aria-label="Thumbnail slicing"
        size="sm"
        value={grid}
        onChange={(e) => setGrid(e.target.value)}
        options={[{ value: '2x2', label: '2 × 2 (4 tiles)' }, { value: '3x3', label: '3 × 3 (9 tiles)' }, { value: '4x4', label: '4 × 4 (16 tiles)' }]}
      />
      <Inline gap="xs" align="center"><Switch checked={show} onChange={setShow} size="sm" aria-label="Show grid" /><Text size="xs" tone="secondary">Show grid</Text></Inline>
      <Inline gap="xs" align="center"><Switch checked={trim} onChange={setTrim} size="sm" aria-label="Trim padding" /><Text size="xs" tone="secondary">Trim padding</Text></Inline>
    </>
  );
}

/** Concepts §3: one concept chosen, the slicing controls, "Select character" and "Approve" (confirmed in place). */
export const PickOne: Story = {
  args: {
    count: 1,
    label: 'Concept 03',
    description: 'Toby · Main character · v1.0',
    thumbnail: { src: 'https://picsum.photos/seed/toby-03/400/600', alt: 'Concept 03' },
    controls: <Slicing />,
    onClear: noop,
    secondary: { label: 'Select character', onAction: noop },
    primary: { label: 'Approve', question: 'Approve concept 03 for Toby?', onAction: () => new Promise((r) => setTimeout(r, 1000)) },
  },
};

/** Several chosen: the count, Reject (confirmed in place, destructive) and the primary. */
export const Many: Story = {
  args: {
    count: 3,
    onClear: noop,
    reject: { label: 'Reject', question: 'Reject 3 concepts?', onAction: noop },
    primary: { label: 'Vary these', actionKind: 'spend', question: 'Spend credits on 3 variations?', onAction: noop },
  },
};

export const NothingSelected: Story = {
  args: { count: 0, onClear: noop, primary: { label: 'Approve', onAction: noop } },
};

/** At phone width the bar wraps: what is chosen, then the controls, then the decision. */
export const Narrow: Story = {
  args: PickOne.args as Story['args'],
  decorators: [(S) => <div className="max-w-[390px]"><S /></div>],
};
