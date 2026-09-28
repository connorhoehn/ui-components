import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SuggestionRow } from './SuggestionRow';

const meta = {
  title: 'Shared/SuggestionRow',
  component: SuggestionRow,
  tags: ['autodocs'],
  args: { active: false, onPick: () => {}, primary: 'Nora Chang', secondary: 'Engineer · Platform Engineering' },
  decorators: [(Story) => <div role="listbox" aria-label="Matches" className="w-[290px] rounded-lg border border-border bg-surface py-1"><Story /></div>],
} satisfies Meta<typeof SuggestionRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };

/** A list where the cursor follows the pointer, as a combobox drives it. */
export const List: Story = {
  render: () => {
    const [cursor, setCursor] = useState(0);
    const rows = [['Nora Chang', 'Engineer · Platform'], ['Nora DaSilva', 'SME · ML / AI'], ['Kubernetes', '5 people']];
    return <>{rows.map(([p, s], i) => (
      <SuggestionRow key={p} active={cursor === i} onHighlight={() => setCursor(i)} onPick={() => {}} primary={p} secondary={s} />
    ))}</>;
  },
};
