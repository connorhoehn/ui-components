import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SlideForm } from './SlideForm';
import { makeSlide, type DeckSlide, type SlideLayout } from './deckSpec';

/**
 * The slide form for the layouts added in 2.547.0, each starting from the
 * smallest payload the engine accepts (`makeSlide`). Every list shows its
 * count against the engine's cap, and Add / Remove stop at the limits.
 */
const meta = {
  title: 'DocEditor/SlideForm',
  component: SlideForm,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SlideForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const SOURCES = [{ documentId: 'doc-1', title: 'Quarterly notes' }];

function Form({ layout, patch }: { layout: SlideLayout; patch?: Partial<DeckSlide> }) {
  const [slide, setSlide] = useState<DeckSlide>({ ...makeSlide('s1', layout), title: 'A slide', sources: SOURCES, ...patch });
  return (
    <div className="max-w-3xl">
      <SlideForm slide={slide} onChange={setSlide} sources={SOURCES} testIdPrefix="story" showSources={false} showNotes={false} />
    </div>
  );
}

const args = { slide: makeSlide('s1'), onChange: () => {}, sources: [], testIdPrefix: 'story' };

export const KeyFigures: Story = { args, render: () => <Form layout="key-figures" patch={{ figures: [{ value: '42%', label: 'Adoption', delta: '+8 pts' }, { value: '$1.2M', label: 'Saved this year' }] }} /> };
export const TableGrid: Story = { args, render: () => <Form layout="table" patch={{ table: { header: ['Team', 'Owner', 'Status'], rows: [['Search', 'Ada', 'Shipped'], ['Billing', 'Lin', 'In review']] } }} /> };
export const Comparison: Story = { args, render: () => <Form layout="comparison" /> };
export const Timeline: Story = { args, render: () => <Form layout="timeline" /> };
export const Agenda: Story = { args, render: () => <Form layout="agenda" patch={{ agenda: { items: ['Where we are', 'What changed', 'Asks'], current: 1 } }} /> };
export const Closing: Story = { args, render: () => <Form layout="closing" /> };
export const PieChart: Story = {
  args,
  render: () => <Form layout="chart" patch={{ chart: { kind: 'pie', labels: ['Search', 'Billing', 'Other'], series: [{ name: 'Share', values: [5, 3, 2] }] } }} />,
};
