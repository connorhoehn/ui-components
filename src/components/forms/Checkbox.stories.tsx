import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { checked: false, onChange: () => {}, 'aria-label': 'Select row' },
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox checked={checked} onChange={setChecked} aria-label="Select row" />;
  },
};

export const SelectAllIndeterminate: Story = {
  name: 'Select-all (indeterminate)',
  args: { checked: false, onChange: () => {}, 'aria-label': 'Select all' },
  render: () => {
    const [rows, setRows] = useState([true, false, true]);
    const all = rows.every(Boolean);
    const some = rows.some(Boolean);
    return (
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
          <Checkbox
            checked={all}
            indeterminate={some && !all}
            onChange={(next) => setRows(rows.map(() => next))}
            aria-label="Select all"
          />
          Select all
        </label>
        {rows.map((checked, i) => (
          <label key={i} className="ml-5 flex items-center gap-2 text-sm text-text-secondary">
            <Checkbox
              checked={checked}
              onChange={(next) => setRows(rows.map((r, j) => (j === i ? next : r)))}
              aria-label={`Row ${i + 1}`}
            />
            Row {i + 1}
          </label>
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { checked: true, disabled: true, onChange: () => {}, 'aria-label': 'Locked' },
};

/** The round tone-coloured status toggle — still a real checkbox underneath. */
export const Round: Story = {
  args: { checked: true, onChange: () => {} },
  render: () => (
    <div className="flex items-center gap-3">
      <Checkbox shape="round" tone="warning" checked={false} onChange={() => {}} aria-label="Pending" />
      <Checkbox shape="round" tone="info" checked onChange={() => {}} aria-label="Acknowledged" />
      <Checkbox shape="round" tone="success" checked onChange={() => {}} aria-label="Done" />
      <Checkbox shape="round" tone="danger" checked={false} onChange={() => {}} aria-label="Rejected" />
    </div>
  ),
};
